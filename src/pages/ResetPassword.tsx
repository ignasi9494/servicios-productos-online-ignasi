import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Terminal, Lock, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { usePageTitle } from '../hooks/usePageTitle';

export function ResetPassword() {
  usePageTitle('Nueva contraseña | Think Better');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const navigate = useNavigate();

  // Supabase redirects here with access_token in the URL hash.
  // We need to wait for the auth session to be established.
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setSessionReady(true);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (password !== confirm) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setSubmitting(true);

    const { error: err } = await supabase.auth.updateUser({ password });
    setSubmitting(false);

    if (err) {
      setError('No se pudo actualizar la contraseña. El enlace puede haber caducado. Solicita uno nuevo desde la página de inicio de sesión.');
    } else {
      setDone(true);
      setTimeout(() => navigate('/dashboard', { replace: true }), 3000);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-emerald-500/30 flex flex-col">
      <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-lg">
            <Terminal className="w-5 h-5 text-emerald-500" />
            Think Better
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center pt-16 px-6">
        <div className="w-full max-w-sm">

          {done ? (
            <div className="text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">Contraseña actualizada</h1>
              <p className="text-zinc-400 text-sm mb-4">
                Tu contraseña se ha cambiado correctamente. Serás redirigido a tu panel en unos segundos.
              </p>
              <Link to="/dashboard" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
                Ir al panel ahora
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-white text-center mb-2">Nueva contraseña</h1>
              <p className="text-zinc-400 text-center text-sm mb-8">
                Introduce tu nueva contraseña. Debe tener al menos 8 caracteres.
              </p>

              {!sessionReady && (
                <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  Verificando el enlace de recuperación...
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="new-password" className="block text-sm text-zinc-400 mb-1.5">
                    Nueva contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      id="new-password"
                      type="password"
                      required
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mínimo 8 caracteres"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirm-password" className="block text-sm text-zinc-400 mb-1.5">
                    Confirmar contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      id="confirm-password"
                      type="password"
                      required
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder="Repite la contraseña"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting || !sessionReady}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 text-zinc-950 font-medium hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    'Guardar nueva contraseña'
                  )}
                </button>
              </form>

              <p className="text-sm text-zinc-500 text-center mt-6">
                <Link to="/login" className="text-emerald-400 hover:text-emerald-300">
                  Volver al inicio de sesión
                </Link>
              </p>
            </>
          )}

        </div>
      </main>
    </div>
  );
}
