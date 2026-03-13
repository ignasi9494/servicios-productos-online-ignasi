import { motion } from 'motion/react';
import { Check } from 'lucide-react';

const retainerPlans = [
  {
    name: 'Basic',
    hours: '10h/mes',
    price: '500€',
    period: '/mes',
    features: [
      'Tu producto siempre funcionando al 100%',
      'Protegido contra vulnerabilidades',
      'Soporte técnico en menos de 48h',
    ],
  },
  {
    name: 'Pro',
    hours: '20h/mes',
    price: '900€',
    period: '/mes',
    popular: true,
    features: [
      'Todo lo de Basic',
      'Nuevas mejoras cada mes',
      'Respuesta garantizada en 24h',
      'Reunión quincenal de seguimiento',
    ],
  },
  {
    name: 'Premium',
    hours: '40h/mes',
    price: '1.600€',
    period: '/mes',
    features: [
      'Todo lo de Pro',
      'Desarrollo continuo de nuevas funcionalidades',
      'Respuesta el mismo día',
      'Reunión semanal de progreso',
      'Tu proyecto siempre en primera posición',
    ],
  },
];

export function Retainer() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tu equipo de desarrollo, sin contratar a nadie</h2>
          <p className="text-zinc-400 text-lg">
            Cada mes tu producto mejora y se adapta a tu negocio. Sin contratar desarrolladores, sin gestionar equipo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {retainerPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative p-8 rounded-3xl border ${plan.popular ? 'border-emerald-500/50 bg-emerald-950/10' : 'border-zinc-800 bg-zinc-900/50'} flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-zinc-950 text-xs font-bold uppercase tracking-wider rounded-full">
                  Recomendado
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-emerald-400 font-medium">{plan.hours}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-zinc-500 text-sm ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#questionnaire"
                className={`w-full py-3 rounded-xl font-medium transition-colors text-center block ${plan.popular ? 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}
              >
                Contratar plan
              </a>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-zinc-500 text-sm mt-10">
          Sin permanencia. Cancela cuando quieras con 30 días de preaviso.
        </p>
      </div>
    </section>
  );
}
