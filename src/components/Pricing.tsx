import { motion } from 'motion/react';
import { Check, Gift } from 'lucide-react';

const plans = [
  {
    name: 'Launch',
    target: 'Autónomos y negocios locales',
    description: 'Landing page o web corporativa profesional para establecer tu presencia online.',
    price: '1.500€',
    priceMax: '2.500€',
    delivery: '5-7 días laborables',
    idealFor: 'Landing pages, webs corporativas, portfolios profesionales',
    cta: 'Empezar mi web',
    bonus: 'Setup de Google Analytics incluido',
    features: [
      'Web profesional a medida (no plantillas)',
      'Hasta 5 páginas con el contenido que necesites',
      'Se ve perfecto en móvil y aparece en Google',
      'Tus clientes te contactan desde el primer día',
      'Online y funcionando desde la entrega',
      'Código tuyo al 100% — sin dependencias',
    ],
  },
  {
    name: 'Build',
    target: 'Startups y Pymes',
    description: 'MVP de aplicación web o SaaS para digitalizar procesos o lanzar productos.',
    price: '5.000€',
    priceMax: '9.000€',
    delivery: '3-4 semanas',
    idealFor: 'MVPs, plataformas SaaS, portales de clientes, dashboards',
    popular: true,
    cta: 'Lanzar mi producto',
    bonus: 'Documentación técnica completa incluida',
    features: [
      'Tu producto completo: hasta 10 pantallas funcionales',
      'Tus usuarios se registran y acceden de forma segura',
      'Panel de control para gestionar tu negocio',
      'Base de datos escalable que crece contigo',
      'Interfaz rápida y profesional',
      'Cobra a tus clientes con Stripe o conecta tu API favorita',
      'Listo para recibir usuarios reales desde el día 1',
    ],
  },
  {
    name: 'Scale',
    target: 'Empresas y Scale-ups',
    description: 'Software a medida complejo con integraciones IA y múltiples roles.',
    price: '12.000€',
    priceMax: '25.000€',
    delivery: '6-8 semanas',
    idealFor: 'ERPs a medida, plataformas multi-tenant, sistemas con IA integrada',
    cta: 'Hablar con el equipo',
    bonus: 'Sesión de estrategia de lanzamiento incluida',
    features: [
      'Experiencia de usuario diseñada para convertir',
      'Todas las pantallas que tu negocio necesite',
      'IA integrada: chatbots, análisis de docs, automatización',
      'Cada usuario ve solo lo que le corresponde',
      'Conectado con tus herramientas (CRM, email, pagos)',
      '30 días de soporte incluidos tras la entrega',
      'Preparado para escalar a miles de usuarios',
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Precios transparentes, sin sorpresas</h2>
          <p className="text-zinc-400 text-lg">
            Elige el plan que encaje con tu proyecto. Todos incluyen: código 100% tuyo, deploy en producción y 30 días de soporte post-lanzamiento.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
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
                  Más popular
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-emerald-400 font-medium mb-3">{plan.target}</p>
                <p className="text-zinc-400 text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-zinc-500 text-sm">desde</span>
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                </div>
                <p className="text-sm text-zinc-500 mt-1">hasta {plan.priceMax} según complejidad</p>
                <p className="text-sm text-zinc-500 mt-1">Entrega en {plan.delivery}</p>
              </div>

              <p className="text-xs text-zinc-500 mb-6 border-t border-zinc-800 pt-4">
                {plan.idealFor}
              </p>

              <ul className="space-y-4 mb-6 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-zinc-300">
                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 mb-8 px-3 py-2 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                <Gift className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-emerald-400 text-sm font-medium">{plan.bonus}</span>
              </div>

              <a
                href="#questionnaire"
                className={`w-full py-3 rounded-xl font-medium transition-colors text-center block ${plan.popular ? 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10 space-y-2">
          <p className="text-zinc-500 text-sm">
            Todos los precios son sin IVA. Pago: 50% al inicio, 50% a la entrega.
          </p>
          <p className="text-zinc-400 text-sm font-medium">
            Aceptamos un máximo de 3 proyectos nuevos al mes para garantizar la calidad de cada entrega.
          </p>
        </div>
      </div>
    </section>
  );
}
