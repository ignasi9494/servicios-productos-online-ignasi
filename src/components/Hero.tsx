import { motion } from 'motion/react';
import { ArrowRight, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackLandingHeroCtaClick } from '../lib/analytics';

export function Hero() {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-zinc-950 -z-10" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-400 mb-8"
        >
          <Terminal className="w-4 h-4 text-emerald-500" />
          <span>Estudio AI-first · Barcelona · +30 proyectos entregados</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
        >
          Tu app, con{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            precio cerrado
          </span>
          {' '}y código 100% tuyo, en menos de un mes
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10"
        >
          Nuestro AI descubre lo que necesitas en 10 minutos. En 24h tienes propuesta y precio exacto. En 3 semanas, tu producto funcionando en producción.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/cuestionario" onClick={trackLandingHeroCtaClick} className="px-8 py-4 rounded-full bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2">
            Descubrir precio de mi proyecto
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="#precios" className="px-8 py-4 rounded-full bg-zinc-900 text-white font-medium border border-zinc-800 hover:bg-zinc-800 transition-colors flex items-center justify-center">
            Ver precios
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-sm text-zinc-500 mt-4"
        >
          ✓ Sin tarjeta de crédito &nbsp;·&nbsp; ✓ Precio en 10 minutos &nbsp;·&nbsp; ✓ Sin compromiso de compra
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-sm text-zinc-600 mt-2"
        >
          Propuesta definitiva en menos de 24h · Código 100% tuyo desde el día 1
        </motion.p>
      </div>
    </section>
  );
}
