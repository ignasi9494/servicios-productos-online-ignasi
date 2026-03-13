import { Link } from 'react-router-dom';
import { ArrowLeft, Terminal } from 'lucide-react';
import { ChatUI } from '../components/questionnaire/ChatUI';
import { ErrorBoundary } from '../components/ErrorBoundary';

export function Cuestionario() {
  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-emerald-500/30 flex flex-col">
      {/* Minimal top nav */}
      <nav className="shrink-0 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-lg z-10">
        <div className="max-w-3xl mx-auto px-4 flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-sm">
            <Terminal className="w-4 h-4 text-emerald-500" />
            Think Better
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Volver al inicio
          </Link>
        </div>
      </nav>

      {/* Chat takes the rest of the screen */}
      <div className="flex-1 min-h-0">
        <ErrorBoundary fallbackTitle="Error en el cuestionario">
          <ChatUI />
        </ErrorBoundary>
      </div>
    </div>
  );
}
