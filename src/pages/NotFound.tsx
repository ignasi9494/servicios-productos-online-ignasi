import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Terminal, ArrowLeft, Home } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-2 text-white font-bold text-lg mb-12">
          <Terminal className="w-5 h-5 text-emerald-500" />
          Think Better
        </Link>

        {/* 404 */}
        <div className="mb-8">
          <p className="text-[9rem] font-black leading-none bg-gradient-to-br from-emerald-400 to-cyan-400 bg-clip-text text-transparent select-none">
            404
          </p>
          <h1 className="text-2xl font-bold text-white mt-2 mb-3">
            Página no encontrada
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed">
            La página que estás buscando no existe o ha sido movida.
            Comprueba la URL o vuelve al inicio.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver atrás
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors"
          >
            <Home className="w-4 h-4" />
            Ir al inicio
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
