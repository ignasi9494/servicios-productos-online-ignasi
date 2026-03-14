import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';
import type { UserRole } from '../lib/database.types';

interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  company: string | null;
  phone: string | null;
  sector: string | null;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  /** True until the initial session check is complete. */
  loading: boolean;
  /** True while the profile row is being fetched (after user is known). */
  profileLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, fullName: string, company?: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ---------------------------------------------------------------------------
// Mock mode — only active when VITE_MOCK_ROLE env var is set
// ---------------------------------------------------------------------------
const MOCK_ROLE = import.meta.env.VITE_MOCK_ROLE as string | undefined;
const MOCK_ENABLED = Boolean(MOCK_ROLE);
const MOCK_USER_ID = '11111111-1111-1111-1111-111111111111';

const mockUser: User = {
  id: MOCK_USER_ID,
  app_metadata: {},
  user_metadata: { full_name: 'Usuario de Prueba', company: 'Test Inc' },
  aud: 'authenticated',
  created_at: new Date().toISOString(),
  email: 'test@example.com',
};
const mockSession: Session = {
  access_token: 'mock-token',
  token_type: 'bearer',
  expires_in: 3600,
  refresh_token: 'mock-refresh',
  user: mockUser,
};
const mockProfile: Profile = {
  id: MOCK_USER_ID,
  user_id: MOCK_USER_ID,
  full_name: MOCK_ROLE === 'admin' ? 'Admin Think Better' : 'Usuario de Prueba',
  company: MOCK_ROLE === 'admin' ? 'Think Better' : 'Test Inc',
  phone: null,
  sector: null,
  role: (MOCK_ROLE === 'admin' ? 'admin' : 'client') as UserRole,
};

// ---------------------------------------------------------------------------
// Error translation
// ---------------------------------------------------------------------------
function translateAuthError(msg: string): string {
  if (msg.includes('Invalid login credentials')) return 'Email o contraseña incorrectos';
  if (msg.includes('Email not confirmed'))        return 'Confirma tu email antes de iniciar sesión';
  if (msg.includes('User already registered'))    return 'Ya existe una cuenta con este email';
  if (msg.includes('Password should be at least')) return 'La contraseña debe tener al menos 6 caracteres';
  if (msg.includes('Unable to validate email'))   return 'El email no es válido';
  if (msg.includes('Email rate limit exceeded'))  return 'Demasiados intentos. Espera unos minutos';
  return msg;
}

// ---------------------------------------------------------------------------
// Profile fetch — 4 attempts with exponential back-off.
// Handles the JWT-propagation delay that causes 401s right after login.
// Uses AbortController so in-flight fetches are cancelled on user change.
// ---------------------------------------------------------------------------
async function fetchProfileWithRetry(
  userId: string,
  signal: AbortSignal,
): Promise<Profile | null> {
  const retryDelays = [0, 700, 1800, 3500]; // ms before each attempt

  for (let attempt = 0; attempt < retryDelays.length; attempt++) {
    if (signal.aborted) return null;

    // Wait before retry (skip delay before first attempt)
    if (attempt > 0) {
      const aborted = await new Promise<boolean>(resolve => {
        const timer = setTimeout(() => resolve(false), retryDelays[attempt]);
        signal.addEventListener('abort', () => { clearTimeout(timer); resolve(true); }, { once: true });
      });
      if (aborted) return null;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (!error) return data as Profile;

      const status   = (error as { status?: number }).status;
      const is401    = status === 401 || error.code === 'PGRST301';
      const isAbort  = error.message?.includes('AbortError');

      if (is401 || isAbort) {
        // Transient — retry
        console.warn(`[Auth] profile attempt ${attempt + 1} retryable (${is401 ? '401' : 'abort'})`);
        continue;
      }

      // Non-retryable DB error
      console.warn('[Auth] profile fetch error:', error.message);
      return null;

    } catch (err) {
      if (signal.aborted) return null;
      console.warn(`[Auth] profile exception (attempt ${attempt + 1}):`, err);
      // Network error — continue to next attempt
    }
  }

  console.warn('[Auth] fetchProfile: all attempts exhausted for', userId);
  return null;
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,           setUser]           = useState<User    | null>(MOCK_ENABLED ? mockUser    : null);
  const [session,        setSession]        = useState<Session | null>(MOCK_ENABLED ? mockSession : null);
  const [profile,        setProfile]        = useState<Profile | null>(MOCK_ENABLED ? mockProfile : null);
  const [loading,        setLoading]        = useState(!MOCK_ENABLED); // true until first session known
  const [profileLoading, setProfileLoading] = useState(false);

  // ── STEP 1: Auth state listener — purely synchronous, no async work ──────
  // onAuthStateChange fires: INITIAL_SESSION (on mount), SIGNED_IN, SIGNED_OUT,
  // TOKEN_REFRESHED, PASSWORD_RECOVERY, etc.
  // We only update user/session here. Profile loading is handled separately
  // in Step 2 to avoid concurrent fetches from rapid event sequences.
  useEffect(() => {
    if (MOCK_ENABLED) return;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);

      if (!s?.user) {
        // Logged out — clear profile immediately, mark auth resolved
        setProfile(null);
        setProfileLoading(false);
        setLoading(false);
      }
      // If user present: profile is loaded by Step 2 below (keyed on user.id)
    });

    return () => subscription.unsubscribe();
  }, []);

  // ── STEP 2: Profile loader — runs only when the authenticated user changes ─
  // Keyed on user?.id so it:
  //   • doesn't re-run on TOKEN_REFRESHED (same user id)
  //   • cancels in-flight fetch when user logs out or switches account
  //   • deduplicates: only one fetchProfile runs at any time
  useEffect(() => {
    if (MOCK_ENABLED) return;
    if (!user) return; // null user is handled by the auth listener above

    const controller = new AbortController();
    setProfileLoading(true);

    fetchProfileWithRetry(user.id, controller.signal).then(p => {
      if (controller.signal.aborted) return;
      setProfile(p);
      setProfileLoading(false);
      setLoading(false); // auth + profile fully resolved
    });

    return () => {
      controller.abort(); // cancel if user changes before fetch completes
    };
  }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Auth actions ──────────────────────────────────────────────────────────

  async function signIn(email: string, password: string): Promise<{ error: string | null }> {
    if (MOCK_ENABLED) {
      setUser(mockUser);
      setSession(mockSession);
      setProfile(mockProfile);
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { error: translateAuthError(error.message) };
      // Success: onAuthStateChange (SIGNED_IN) will fire → setUser → Step 2 fetches profile
      return { error: null };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes('AbortError') || msg.includes('abort')) {
        return { error: 'La solicitud fue interrumpida. Inténtalo de nuevo.' };
      }
      return { error: 'Error de conexión. Inténtalo de nuevo.' };
    }
  }

  async function signUp(
    email: string,
    password: string,
    fullName: string,
    company?: string,
  ): Promise<{ error: string | null }> {
    if (MOCK_ENABLED) return { error: null };

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, company: company ?? null } },
    });
    if (error) return { error: translateAuthError(error.message) };
    return { error: null };
  }

  async function signOut(): Promise<void> {
    if (MOCK_ENABLED) {
      setUser(null);
      setSession(null);
      setProfile(null);
      return;
    }
    // Clear state immediately for instant UI feedback, then confirm with Supabase
    setUser(null);
    setSession(null);
    setProfile(null);
    await supabase.auth.signOut();
  }

  return (
    <AuthContext.Provider value={{
      user, session, profile,
      loading, profileLoading,
      signIn, signUp, signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
