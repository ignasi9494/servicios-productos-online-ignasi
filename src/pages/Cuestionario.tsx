import { Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare } from 'lucide-react';

export function Cuestionario() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-emerald-500/30 flex flex-col">
      <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-lg">
            <MessageSquare className="w-5 h-5 text-emerald-500" />
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

      <main className="flex-1 flex items-center justify-center pt-16">
        <div className="text-center px-6">
          <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-8">
            <MessageSquare className="w-10 h-10 text-emerald-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Cuestionario inteligente
          </h1>
          <p className="text-lg text-zinc-400 max-w-md mx-auto mb-8">
            Nuestro asistente de IA te hará las preguntas necesarias para entender tu proyecto y preparar una propuesta personalizada.
          </p>
          <p className="text-sm text-zinc-500">
            Próximamente disponible. Mientras tanto, escríbenos a{' '}
            <a href="mailto:hola@thinkbetter.dev" className="text-emerald-400 hover:text-emerald-300">
              hola@thinkbetter.dev
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
