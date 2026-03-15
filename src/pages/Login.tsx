import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Terminal, Mail, Lock, Loader2, AlertCircle, CheckCircle2, ArrowLeft, FileText } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { usePageTitle } from '../hooks/usePageTitle';
import { usePageMeta } from '../hooks/usePageMeta';
import { hasPendingProject, getPendingProject, createProjectFromPending } from '../lib/pendingProject';

type Mode = 'login' | 'forgot';

export function Login() {
  usePageTitle('Iniciar sesión | Think Better');
  usePageMeta('Accede a tu panel de cliente Think Better. Gestiona tu proyecto, revisa propuestas y sigue el progreso de tu app en tiempo real.');
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const { signIn, user, profile, loading, profileLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname;
  // Check if user arrived here from the questionnaire with pending project
  const fromQuestionnaire = new URLSearchParams(location.search).get('from') === 'cuestionario';
  const pendingProject = fromQuestionnaire ? getPendingProject() : null;

  // Redirect once auth + profile are fully resolved.
  // Works for both: (a) fresh login, (b) already-authenticated user visiting /login.
  // Does NOT require profile to be non-null — if profile failed to load we still
  // redirect (admin requires profile, so null → defaults to /dashboard safely).
  useEffect(() => {
    if (loading || profileLoading) return; // still resolving
    if (!user) return;                     // not logged in

    // If there's a pending project from the questionnaire, create it first
    if (hasPendingProject()) {
      createProjectFromPending(user.id).then(() => {
        let destination: string;
        if (profile?.role === 'admin') {
          destination = '/admin';
        } else {
          destination = '/dashboard';
        }
        navigate(destination, { replace: true });
      });
      return;
    }

    let destination: string;
    if (profile?.role === 'admin') {
      // Admins always go to /admin — never to /dashboard
      destination = '/admin';
    } else {
      // Clients go back to where they were, or /dashboard as default
      destination = (from && from.startsWith('/dashboard')) ? from : '/dashboard';
    }
    navigate(destination, { replace: true });
  }, [loading, profileLoading, user, profile, from, navigate]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const { error: err } = await signIn(email, password);
      if (err) {
        setError(err);
        setSubmitting(false); // re-enable on error
      }
      // On success: leave submitting=true (shows "Entrando...") until the
      // useEffect above fires and navigates away. This prevents double-submit.
    } catch {
      setError('Error de conexión. Inténtalo de nuevo.');
      setSubmitting(false);
    }
  }

  async function handleForgotPassword(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setSubmitting(false);

    if (err) {
      setError('No hemos podido enviar el email. Verifica la dirección e inténtalo de nuevo.');
    } else {
      setForgotSent(true);
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

          {/* ── Login form ── */}
          {mode === 'login' && (
            <>
              <h1 className="text-2xl font-bold text-white text-center mb-2">Iniciar sesión</h1>
              <p className="text-zinc-400 text-center mb-6">Accede a tu panel de cliente</p>

              {/* Pending project banner from questionnaire */}
              {pendingProject && (
                <div className="flex items-start gap-3 p-3 mb-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                  <FileText className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">{pendingProject.projectName}</p>
                    <p className="text-emerald-500/70 text-xs mt-0.5">
                      Plan {pendingProject.plan === 'launch' ? 'Starter' : pendingProject.plan === 'build' ? 'Pro' : 'Growth'} · {pendingProject.totalPrice.toLocaleString('es-ES')}€ estimado
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                  <label htmlFor="email" className="block text-sm text-zinc-400 mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="password" className="text-sm text-zinc-400">Contraseña</label>
                    <button
                      type="button"
                      onClick={() => { setMode('forgot'); setError(''); }}
                      className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 text-zinc-950 font-medium hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    'Entrar'
                  )}
                </button>
              </form>

              <p className="text-sm text-zinc-500 text-center mt-6">
                ¿No tienes cuenta?{' '}
                <Link to="/registro" className="text-emerald-400 hover:text-emerald-300">
                  Regístrate
                </Link>
              </p>
            </>
          )}

          {/* ── Forgot password form ── */}
          {mode === 'forgot' && !forgotSent && (
            <>
              <button
                onClick={() => { setMode('login'); setError(''); }}
                className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver al inicio de sesión
              </button>

              <h1 className="text-2xl font-bold text-white mb-2">Recuperar contraseña</h1>
              <p className="text-zinc-400 text-sm mb-8">
                Introduce tu email y te enviaremos un enlace para restablecer tu contraseña.
              </p>

              {error && (
                <div className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleForgotPassword}>
                <div>
                  <label htmlFor="forgot-email" className="block text-sm text-zinc-400 mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      id="forgot-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 text-zinc-950 font-medium hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    'Enviar enlace de recuperación'
                  )}
                </button>
              </form>
            </>
          )}

          {/* ── Success state ── */}
          {mode === 'forgot' && forgotSent && (
            <div className="text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">Email enviado</h1>
              <p className="text-zinc-400 text-sm mb-6">
                Hemos enviado un enlace de recuperación a <span className="text-white">{email}</span>.
                Revisa tu bandeja de entrada y sigue las instrucciones.
              </p>
              <button
                onClick={() => { setMode('login'); setForgotSent(false); setError(''); }}
                className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Volver al inicio de sesión
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
