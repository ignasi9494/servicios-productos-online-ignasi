import { Link } from 'react-router-dom';
import { Terminal, Mail, Lock, User, Building2 } from 'lucide-react';

export function Registro() {
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

      <main className="flex-1 flex items-center justify-center pt-16 px-6 py-12">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-white text-center mb-2">Crear cuenta</h1>
          <p className="text-zinc-400 text-center mb-8">Empieza a gestionar tu proyecto</p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="block text-sm text-zinc-400 mb-1.5">Nombre completo</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  id="name"
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                  disabled
                />
              </div>
            </div>

            <div>
              <label htmlFor="company" className="block text-sm text-zinc-400 mb-1.5">Empresa</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  id="company"
                  type="text"
                  placeholder="Tu empresa (opcional)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                  disabled
                />
              </div>
            </div>

            <div>
              <label htmlFor="reg-email" className="block text-sm text-zinc-400 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  id="reg-email"
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                  disabled
                />
              </div>
            </div>

            <div>
              <label htmlFor="reg-password" className="block text-sm text-zinc-400 mb-1.5">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  id="reg-password"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                  disabled
                />
              </div>
            </div>

            <button
              type="submit"
              disabled
              className="w-full py-2.5 rounded-xl bg-emerald-500 text-zinc-950 font-medium hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Crear cuenta
            </button>
          </form>

          <p className="text-sm text-zinc-500 text-center mt-6">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-emerald-400 hover:text-emerald-300">
              Inicia sesión
            </Link>
          </p>

          <p className="text-xs text-zinc-600 text-center mt-4">
            Próximamente disponible
          </p>
        </div>
      </main>
    </div>
  );
}
