import { motion } from 'motion/react';
import { Check, Server, Shield, Headphones, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Mantener',
    price: '199€',
    period: '/mes',
    description: 'Tu software siempre en marcha, seguro y actualizado.',
    features: [
      'Hosting gestionado (Vercel + Supabase)',
      'Copias de seguridad diarias',
      'Certificado SSL renovado automáticamente',
      'Monitorización de uptime 24/7',
      'Corrección de bugs y vulnerabilidades',
      'Actualizaciones de dependencias',
      'Soporte técnico (respuesta en 48h)',
    ],
    cta: 'Activar plan',
    highlight: false,
  },
  {
    name: 'Mejorar',
    price: '499€',
    period: '/mes',
    hours: '5h desarrollo/mes',
    description: 'Mantén tu software y mejóralo cada mes con nuevas features.',
    features: [
      'Todo lo del plan Mantener',
      '5 horas de desarrollo mensual',
      'Nuevas funcionalidades y mejoras',
      'Soporte prioritario (respuesta en 24h)',
      'Reunión quincenal de seguimiento',
      'Panel de métricas y analytics',
    ],
    cta: 'Activar plan',
    highlight: true,
  },
  {
    name: 'Escalar',
    price: '999€',
    period: '/mes',
    hours: '15h desarrollo/mes',
    description: 'Desarrollo continuo para escalar tu producto al siguiente nivel.',
    features: [
      'Todo lo del plan Mejorar',
      '15 horas de desarrollo mensual',
      'Desarrollo continuo de nuevas features',
      'Soporte el mismo día (respuesta en 4h)',
      'SLA 99.9% de uptime',
      'Reunión semanal de progreso',
      'Tu proyecto siempre en primera posición',
    ],
    cta: 'Activar plan',
    highlight: false,
  },
];

const usps = [
  {
    icon: Server,
    title: 'Infraestructura gestionada',
    description: 'Nos encargamos de Vercel, Supabase y todo el stack. Tú te centras en tu negocio.',
  },
  {
    icon: Shield,
    title: 'Copias de seguridad diarias',
    description: 'Tu base de datos y código siempre protegidos, con backups automáticos cada 24h.',
  },
  {
    icon: Zap,
    title: 'Rendimiento optimizado',
    description: 'CDN global, caché inteligente y edge functions para que tu app vuele.',
  },
  {
    icon: Headphones,
    title: 'Soporte técnico directo',
    description: 'Canal directo con el equipo que construyó tu app. Sin tickets ni intermediarios.',
  },
];

export function Maintenance() {
  return (
    <section id="mantenimiento" className="py-24 bg-zinc-900/20 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Suscripciones mensuales
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tu equipo de desarrollo, sin contratar a nadie
          </h2>
          <p className="text-zinc-400 text-lg">
            Mantén tu software actualizado, mejóralo cada mes o escálalo con desarrollo continuo.
            Sin permanencia, cancela cuando quieras.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {usps.map((usp, i) => (
            <motion.div
              key={usp.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                <usp.icon className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">{usp.title}</h3>
              <p className="text-xs text-zinc-500">{usp.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative p-8 rounded-3xl border flex flex-col ${
                plan.highlight
                  ? 'border-emerald-500/50 bg-emerald-950/10'
                  : 'border-zinc-800 bg-zinc-900/50'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-zinc-950 text-xs font-bold uppercase tracking-wider rounded-full">
                  Recomendado
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                {plan.hours && (
                  <p className="text-sm text-emerald-400 font-medium">{plan.hours}</p>
                )}
                <p className="text-sm text-zinc-400 mt-1">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-zinc-500 text-sm">{plan.period}</span>
                </div>
                <p className="text-xs text-zinc-600 mt-1">sin IVA · cancela cuando quieras</p>
              </div>

              <ul className="space-y-3 mb-6 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3 text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/cuestionario"
                className={`w-full py-3 rounded-xl font-medium transition-colors text-center block text-sm ${
                  plan.highlight
                    ? 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400'
                    : 'bg-zinc-800 text-white hover:bg-zinc-700'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-zinc-600 text-sm mt-10">
          Las suscripciones se activan tras la entrega del proyecto. Las horas no usadas no se acumulan. El código siempre es tuyo.
        </p>
      </div>
    </section>
  );
}
