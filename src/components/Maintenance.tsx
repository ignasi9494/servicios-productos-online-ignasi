import { motion } from 'motion/react';
import { Check, Server, Shield, Headphones, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Básico',
    price: '49€',
    period: '/mes',
    description: 'Para proyectos con tráfico bajo y sin cambios frecuentes.',
    features: [
      'Hosting en Vercel (hasta 100GB de ancho de banda)',
      'Base de datos gestionada (hasta 500MB)',
      'Copias de seguridad diarias',
      'Certificado SSL renovado automáticamente',
      'Tiempo de respuesta a incidencias: 48h',
    ],
    notIncluded: [
      'Actualizaciones de funcionalidades',
      'Soporte por chat',
    ],
    cta: 'Activar plan',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '99€',
    period: '/mes',
    description: 'El más elegido para proyectos en producción activa.',
    features: [
      'Todo lo del plan Básico',
      'Base de datos (hasta 2GB)',
      'Funciones serverless sin límite de llamadas',
      'Actualizaciones de dependencias mensuales',
      '1 hora de cambios menores incluida',
      'Soporte por chat (respuesta en 24h)',
      'Panel de métricas y uptime',
    ],
    notIncluded: [],
    cta: 'Activar plan',
    highlight: true,
  },
  {
    name: 'Premium',
    price: '199€',
    period: '/mes',
    description: 'Para empresas que necesitan evolución continua y SLA garantizado.',
    features: [
      'Todo lo del plan Pro',
      'Base de datos (hasta 8GB)',
      '4 horas de desarrollo incluidas',
      'Tiempo de respuesta a incidencias: 4h',
      'SLA 99.9% de uptime',
      'Reunión mensual de revisión (30 min)',
      'Acceso prioritario a nuevas funcionalidades',
    ],
    notIncluded: [],
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
    title: 'Soporte técnico incluido',
    description: 'Canal directo con el equipo que construyó tu app. Sin tickets ni intermediarios.',
  },
];

export function Maintenance() {
  return (
    <section id="mantenimiento" className="py-24 bg-zinc-900/20 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Hosting y mantenimiento
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tu app, siempre en marcha
          </h2>
          <p className="text-zinc-400 text-lg">
            Al terminar el proyecto, puedes exportar el código o dejarlo en nuestra plataforma.
            Gestionamos toda la infraestructura por ti.
          </p>
        </div>

        {/* USP row */}
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

        {/* Plan cards */}
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
                  Más popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-zinc-400">{plan.description}</p>
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

        {/* Footnote */}
        <p className="text-center text-zinc-600 text-sm mt-10">
          Los planes de mantenimiento se activan tras la entrega del proyecto. El código siempre es tuyo — puedes exportarlo y hostear donde quieras.
        </p>
      </div>
    </section>
  );
}
