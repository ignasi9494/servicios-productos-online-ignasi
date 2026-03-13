import { ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer id="questionnaire" className="border-t border-zinc-900 bg-zinc-950 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Cuéntanos tu proyecto</h2>
        <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
          30 minutos para evaluar tu proyecto. Si no ves claro el encaje, te enviamos un documento con la arquitectura técnica de tu idea. Tuyo, sin compromiso.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
          <a
            href="mailto:hola@thinkbetter.dev?subject=Quiero%20hablar%20de%20mi%20proyecto"
            className="px-8 py-4 rounded-full bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2"
          >
            Empezar ahora
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="mailto:hola@thinkbetter.dev"
            className="px-8 py-4 rounded-full bg-zinc-900 text-white font-medium border border-zinc-800 hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
          >
            <Mail className="w-5 h-5" />
            Enviar email
          </a>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} Think Better. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link to="/privacidad" className="hover:text-zinc-300 transition-colors">Política de privacidad</Link>
            <Link to="/legal" className="hover:text-zinc-300 transition-colors">Aviso legal</Link>
            <Link to="/cookies" className="hover:text-zinc-300 transition-colors">Cookies</Link>
          </div>
          <div className="flex gap-6">
            <a href="mailto:hola@thinkbetter.dev" className="hover:text-zinc-300 transition-colors">hola@thinkbetter.dev</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
