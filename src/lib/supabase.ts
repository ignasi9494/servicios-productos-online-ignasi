import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** Whether Supabase env vars are configured */
export const supabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

if (!supabaseConfigured) {
  console.warn('[Think Better] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY not set — auth & database features disabled');
}

// Create a real client when configured, otherwise a safe stub so the landing page still works
export const supabase: SupabaseClient<Database> = supabaseConfigured
  ? createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        storageKey: 'think-better-auth',   // unique key — avoids localStorage conflicts with other Supabase apps
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : createStubClient();

/**
 * Minimal stub that prevents the app from crashing when Supabase is not configured.
 * Auth calls return null/empty, DB queries return empty arrays.
 */
function createStubClient(): SupabaseClient<Database> {
  const noop = () => Promise.resolve({ data: null, error: null });
  const chainable: Record<string, unknown> = {};
  const handler: ProxyHandler<Record<string, unknown>> = {
    get(_t, prop) {
      if (prop === 'auth') {
        return {
          getSession: () => Promise.resolve({ data: { session: null }, error: null }),
          onAuthStateChange: (_cb: unknown) => ({ data: { subscription: { unsubscribe: () => {} } } }),
          signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: { message: 'Supabase no configurado' } }),
          signUp: () => Promise.resolve({ data: { user: null, session: null }, error: { message: 'Supabase no configurado' } }),
          signOut: noop,
        };
      }
      if (prop === 'from') {
        return () => new Proxy(chainable, {
          get() {
            // Every query method returns a chainable that resolves to empty
            return (..._args: unknown[]) => new Proxy(chainable, {
              get() { return (..._a: unknown[]) => Promise.resolve({ data: [], error: null }); },
              then(resolve: (v: unknown) => void) { resolve({ data: [], error: null }); },
            });
          },
        });
      }
      return undefined;
    },
  };
  return new Proxy({} as SupabaseClient<Database>, handler);
}
