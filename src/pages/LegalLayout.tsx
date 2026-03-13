import { Link, Outlet } from 'react-router-dom';
import { ArrowLeft, Terminal } from 'lucide-react';

export function LegalLayout() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-emerald-500/30">
      <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-lg">
            <Terminal className="w-5 h-5 text-emerald-500" />
            Think Better
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      <footer className="border-t border-zinc-900 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} Think Better. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link to="/privacidad" className="hover:text-zinc-300 transition-colors">Privacidad</Link>
            <Link to="/legal" className="hover:text-zinc-300 transition-colors">Aviso legal</Link>
            <Link to="/cookies" className="hover:text-zinc-300 transition-colors">Cookies</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
