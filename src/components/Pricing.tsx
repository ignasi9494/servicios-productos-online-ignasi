import { motion } from 'motion/react';
import { Check, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Plan {
  name: string;
  target: string;
  description: string;
  price: string;
  delivery: string;
  cta: string;
  popular?: boolean;
  included: string[];
  meta: { screens: string; iterations: string; support: string };
}

const plans: Plan[] = [
  {
    name: 'Starter',
    target: 'MVP y apps sencillas',
    description: 'App web funcional con autenticación y base de datos. Ideal para validar tu idea rápido.',
    price: '2.000€',
    delivery: '5-7 días',
    cta: 'Empezar proyecto',
    meta: { screens: 'Hasta 5 pantallas', iterations: '1 revisión', support: '30 días soporte' },
    included: [
      'App web a medida (React + TypeScript)',
      'Autenticación de usuarios (email/contraseña)',
      'Base de datos relacional (Supabase)',
      'Diseño responsive (móvil, tablet, desktop)',
      'Deploy en producción con dominio',
      'Código 100% tuyo desde la entrega',
      '30 días de corrección de bugs',
    ],
  },
  {
    name: 'Pro',
    target: 'SaaS y plataformas',
    description: 'Software completo con pagos, panel admin y lógica de negocio. Para startups y Pymes.',
    price: '3.500€',
    delivery: '2-3 semanas',
    popular: true,
    cta: 'Lanzar mi SaaS',
    meta: { screens: 'Hasta 12 pantallas', iterations: '2 revisiones', support: '30 días soporte' },
    included: [
      'Todo lo del plan Starter',
      'Roles de usuario y permisos',
      'Panel de administración completo',
      'Pagos con Stripe (únicos o recurrentes)',
      'API REST para tu lógica de negocio',
      'Notificaciones por email',
      'Entorno de staging para pruebas',
      'Documentación técnica',
    ],
  },
  {
    name: 'Growth',
    target: 'Software complejo',
    description: 'Plataforma avanzada con IA, integraciones y arquitectura escalable. Para empresas.',
    price: '7.000€',
    delivery: '4-6 semanas',
    cta: 'Construir plataforma',
    meta: { screens: 'Pantallas ilimitadas', iterations: '3 revisiones', support: '60 días soporte' },
    included: [
      'Todo lo del plan Pro',
      'IA integrada (chatbot, análisis documentos)',
      'Integraciones con APIs externas (CRM, ERP...)',
      'Suscripciones recurrentes con Stripe',
      'Arquitectura multi-tenant',
      'Notificaciones push y email',
      'Optimización de rendimiento',
      'Sesión de estrategia de lanzamiento',
      '60 días de soporte post-lanzamiento',
    ],
  },
];

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  return (
    <motion.div
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

      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
        <p className="text-sm text-emerald-400 font-medium mb-3">{plan.target}</p>
        <p className="text-zinc-400 text-sm">{plan.description}</p>
      </div>

      <div className="mb-5">
        <span className="text-4xl font-bold text-white">{plan.price}</span>
        <p className="text-sm text-zinc-500 mt-1">Entrega en {plan.delivery}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {Object.values(plan.meta).map((v) => (
          <span key={v} className="text-xs px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
            {v}
          </span>
        ))}
      </div>

      <ul className="space-y-3 mb-6 flex-1">
        {plan.included.map((feat) => (
          <li key={feat} className="flex items-start gap-3 text-sm text-zinc-300">
            <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <span>{feat}</span>
          </li>
        ))}
      </ul>

      <Link
        to="/cuestionario"
        className={`w-full py-3 rounded-xl font-medium transition-colors text-center block ${
          plan.popular
            ? 'bg-emerald-500 text-zinc-950 hover:bg-emerald-400'
            : 'bg-zinc-800 text-white hover:bg-zinc-700'
        }`}
      >
        {plan.cta}
      </Link>
    </motion.div>
  );
}

export function Pricing() {
  return (
    <section id="precios" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Precios fijos
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Software a precio cerrado</h2>
          <p className="text-zinc-400 text-lg">
            Sin sorpresas, sin rangos, sin letra pequeña. Elige tu plan, paga y empezamos a construir.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PlanCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>

        <div className="text-center mt-10 space-y-2">
          <p className="text-zinc-500 text-sm">
            Todos los precios son sin IVA. Pago único al aceptar la propuesta. Código 100% tuyo.
          </p>
          <p className="text-zinc-400 text-sm font-medium">
            Aceptamos un máximo de 3 proyectos nuevos al mes para garantizar la calidad.
          </p>
          <p className="text-zinc-500 text-sm">
            ¿No sabes qué plan necesitas?{' '}
            <Link to="/cuestionario" className="text-emerald-400 hover:text-emerald-300 transition-colors">
              Completa el cuestionario gratuito
            </Link>{' '}
            y te orientamos.
          </p>
        </div>
      </div>
    </section>
  );
}
