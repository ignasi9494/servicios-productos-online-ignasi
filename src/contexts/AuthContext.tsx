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
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, fullName: string, company?: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// MOCK USER ID that matches the one created in the database
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

const mockRole: UserRole = (import.meta.env.VITE_MOCK_ROLE === 'admin' ? 'admin' : 'client') as UserRole;

const mockProfile: Profile = {
  id: MOCK_USER_ID,
  user_id: MOCK_USER_ID,
  full_name: mockRole === 'admin' ? 'Admin Think Better' : 'Usuario de Prueba',
  company: mockRole === 'admin' ? 'Think Better' : 'Test Inc',
  phone: null,
  sector: null,
  role: mockRole,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  // Hardcode the state to be logged in
  const [user, setUser] = useState<User | null>(mockUser);
  const [session, setSession] = useState<Session | null>(mockSession);
  const [profile, setProfile] = useState<Profile | null>(mockProfile);
  const [loading, setLoading] = useState(false);

  // Always keep them logged in, disable real fetching
  useEffect(() => {
    setLoading(false);
  }, []);

  async function signIn(email: string, password: string) {
    console.log('[Mock Auth] Signing in', { email, password });
    setUser(mockUser);
    setSession(mockSession);
    setProfile(mockProfile);
    return { error: null };
  }

  async function signUp(email: string, password: string, fullName: string, company?: string) {
    console.log('[Mock Auth] Signing up', { email, password, fullName, company });
    return { error: null };
  }

  async function signOut() {
    console.log('[Mock Auth] Signing out initially blocked to force tests');
    // We intentionally don't clear the state here so testing is easier
    // If we need to test logged-out state, we could uncomment these:
    // setUser(null);
    // setSession(null);
    // setProfile(null);
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

function translateAuthError(msg: string): string {
  if (msg.includes('Invalid login credentials')) return 'Email o contraseña incorrectos';
  if (msg.includes('Email not confirmed')) return 'Confirma tu email antes de iniciar sesión';
  if (msg.includes('User already registered')) return 'Ya existe una cuenta con este email';
  if (msg.includes('Password should be at least')) return 'La contraseña debe tener al menos 6 caracteres';
  if (msg.includes('Unable to validate email')) return 'El email no es válido';
  if (msg.includes('Email rate limit exceeded')) return 'Demasiados intentos. Espera unos minutos';
  return msg;
}
