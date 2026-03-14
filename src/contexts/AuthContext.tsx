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
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null; role?: string }>;
  signUp: (email: string, password: string, fullName: string, company?: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ---------------------------------------------------------------------------
// Mock mode — only active when VITE_MOCK_ROLE env var is set.
// Allows running the app without a real Supabase account during development.
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
// Translate Supabase English error messages to Spanish
// ---------------------------------------------------------------------------
function translateAuthError(msg: string): string {
  if (msg.includes('Invalid login credentials')) return 'Email o contraseña incorrectos';
  if (msg.includes('Email not confirmed')) return 'Confirma tu email antes de iniciar sesión';
  if (msg.includes('User already registered')) return 'Ya existe una cuenta con este email';
  if (msg.includes('Password should be at least')) return 'La contraseña debe tener al menos 6 caracteres';
  if (msg.includes('Unable to validate email')) return 'El email no es válido';
  if (msg.includes('Email rate limit exceeded')) return 'Demasiados intentos. Espera unos minutos';
  return msg;
}

// ---------------------------------------------------------------------------
// Load profile from the profiles table for a given user id
// ---------------------------------------------------------------------------
async function fetchProfile(userId: string, attempt = 1): Promise<Profile | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    if (error) {
      // AbortError from Supabase lock conflicts — retry after a short delay
      if (attempt < 3 && error.message?.includes('AbortError')) {
        await new Promise(r => setTimeout(r, 400 * attempt));
        return fetchProfile(userId, attempt + 1);
      }
      console.warn('[AuthContext] Could not load profile:', error.message);
      return null;
    }
    return data as Profile;
  } catch (e) {
    // Real JS exception (e.g. AbortError thrown directly) — retry or give up
    if (attempt < 3) {
      await new Promise(r => setTimeout(r, 400 * attempt));
      return fetchProfile(userId, attempt + 1);
    }
    console.warn('[AuthContext] fetchProfile exception:', e);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(MOCK_ENABLED ? mockUser : null);
  const [session, setSession] = useState<Session | null>(MOCK_ENABLED ? mockSession : null);
  const [profile, setProfile] = useState<Profile | null>(MOCK_ENABLED ? mockProfile : null);
  const [loading, setLoading] = useState(!MOCK_ENABLED);

  useEffect(() => {
    if (MOCK_ENABLED) return; // skip real auth when mocking

    // Use ONLY onAuthStateChange for session hydration.
    // Supabase fires INITIAL_SESSION immediately on listener setup, which
    // replaces the separate getSession() call.  Having BOTH caused two
    // concurrent fetchProfile() calls → AbortError lock conflict → loading
    // stuck forever (especially visible with admin users due to RLS checks).
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, s) => {
        setSession(s);
        setUser(s?.user ?? null);
        if (s?.user) {
          const p = await fetchProfile(s.user.id);
          setProfile(p);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  async function signIn(email: string, password: string): Promise<{ error: string | null; role?: string }> {
    if (MOCK_ENABLED) {
      setUser(mockUser);
      setSession(mockSession);
      setProfile(mockProfile);
      return { error: null, role: mockProfile.role };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { error: translateAuthError(error.message) };

      // Query ONLY the role for the redirect decision.
      // Do NOT call fetchProfile here — onAuthStateChange fires simultaneously
      // and two concurrent fetchProfile calls cause AbortError conflicts.
      let role: string = 'client';
      if (data.user) {
        const { data: roleData } = await supabase
          .from('profiles')
          .select('role')
          .eq('user_id', data.user.id)
          .single();
        if (roleData?.role) role = roleData.role;
      }
      return { error: null, role };
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
    if (MOCK_ENABLED) {
      return { error: null };
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, company: company ?? null },
      },
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

    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
  }

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
