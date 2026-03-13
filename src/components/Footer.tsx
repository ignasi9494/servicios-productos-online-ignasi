import { ArrowRight, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="border-t border-zinc-900 bg-zinc-950 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Reserva tu briefing gratuito</h2>
        <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
          30 minutos para evaluar tu proyecto. Si no ves claro el encaje, te enviamos un documento con la arquitectura técnica de tu idea. Tuyo, sin compromiso.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
          <a
            href="#contact"
            className="px-8 py-4 rounded-full bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2"
          >
            Agendar llamada
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="mailto:hola@thinkbetter.dev"
            className="px-8 py-4 rounded-full bg-zinc-900 text-white font-medium border border-zinc-800 hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Enviar email
          </a>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} Think Better. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="/privacidad" className="hover:text-zinc-300 transition-colors">Política de privacidad</a>
            <a href="/legal" className="hover:text-zinc-300 transition-colors">Aviso legal</a>
            <a href="/cookies" className="hover:text-zinc-300 transition-colors">Cookies</a>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-300 transition-colors">Twitter</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
