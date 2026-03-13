import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Gift, ChevronDown, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PlanFeature {
  label: string;
  included: boolean;
  detail?: string;
}

interface Plan {
  name: string;
  target: string;
  description: string;
  price: string;
  priceMax: string;
  delivery: string;
  idealFor: string;
  cta: string;
  bonus: string;
  popular?: boolean;
  included: PlanFeature[];
  notIncluded: PlanFeature[];
  meta: { pages: string; iterations: string; support: string };
}

const plans: Plan[] = [
  {
    name: 'Launch',
    target: 'Autónomos y negocios locales',
    description: 'Landing page o web corporativa profesional para establecer tu presencia online.',
    price: '1.500€',
    priceMax: '2.500€',
    delivery: '5-7 días laborables',
    idealFor: 'Landing pages, webs corporativas, portfolios profesionales',
    cta: 'Empezar mi web',
    bonus: 'Google Analytics incluido',
    meta: { pages: 'Hasta 5 páginas', iterations: '1 revisión', support: '30 días de soporte' },
    included: [
      { label: 'Web profesional a medida (sin plantillas)', included: true },
      { label: 'Diseño responsive (móvil, tablet, desktop)', included: true },
      { label: 'SEO básico: meta tags, Open Graph, sitemap', included: true },
      { label: 'Formulario de contacto', included: true },
      { label: 'Deploy en producción con dominio', included: true },
      { label: 'Código 100% tuyo desde la entrega', included: true },
      { label: '30 días de corrección de bugs', included: true },
    ],
    notIncluded: [
      { label: 'Sistema de autenticación (login/registro)', included: false },
      { label: 'Base de datos / backend propio', included: false },
      { label: 'Panel de administración', included: false },
      { label: 'Pagos con Stripe o similar', included: false },
      { label: 'Blog/CMS gestionable', included: false, detail: 'Disponible como extra (+500€)' },
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
    bonus: 'Documentación técnica completa',
    meta: { pages: 'Hasta 10 pantallas', iterations: '2 revisiones', support: '30 días de soporte' },
    included: [
      { label: 'Todo lo del plan Launch', included: true },
      { label: 'Sistema de autenticación (email + contraseña)', included: true },
      { label: 'Base de datos relacional escalable (Supabase)', included: true },
      { label: 'Panel de administración básico', included: true },
      { label: 'Integración con Stripe (pagos únicos)', included: true },
      { label: 'API REST para tu lógica de negocio', included: true },
      { label: 'Entorno de staging para pruebas', included: true },
      { label: '2 revisiones de diseño incluidas', included: true },
    ],
    notIncluded: [
      { label: 'App móvil nativa (iOS/Android)', included: false, detail: 'Disponible como extra (+3.000€/plataforma)' },
      { label: 'Integraciones complejas con ERP/CRM', included: false, detail: 'Disponible como extra (+1.000€)' },
      { label: 'IA integrada (chatbot, análisis docs)', included: false, detail: 'Disponible como extra (+1.500€)' },
      { label: 'Multi-idioma', included: false, detail: 'Disponible como extra (+400€/idioma)' },
    ],
  },
  {
    name: 'Scale',
    target: 'Empresas y Scale-ups',
    description: 'Software a medida complejo con integraciones IA y múltiples roles de usuario.',
    price: '12.000€',
    priceMax: '25.000€',
    delivery: '6-8 semanas',
    idealFor: 'ERPs a medida, plataformas multi-tenant, sistemas con IA integrada',
    cta: 'Hablar con el equipo',
    bonus: 'Sesión de estrategia de lanzamiento',
    meta: { pages: 'Pantallas ilimitadas', iterations: '3 revisiones', support: '60 días de soporte' },
    included: [
      { label: 'Todo lo del plan Build', included: true },
      { label: 'IA integrada: chatbot, análisis de documentos', included: true },
      { label: 'Múltiples roles de usuario y permisos', included: true },
      { label: 'Suscripciones recurrentes con Stripe', included: true },
      { label: 'Notificaciones email y push', included: true },
      { label: 'Integraciones con APIs externas (CRM, ERP...)', included: true },
      { label: 'Arquitectura multi-tenant (varios clientes)', included: true },
      { label: 'Optimización de rendimiento y escalabilidad', included: true },
      { label: '60 días de soporte post-lanzamiento', included: true },
    ],
    notIncluded: [
      { label: 'Creación de contenido (textos y fotos)', included: false, detail: 'Disponible como extra (+300€)' },
      { label: 'Migración de datos desde sistema antiguo', included: false, detail: 'Disponible como extra (+500€)' },
    ],
  },
];

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  const [expanded, setExpanded] = useState(false);

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

      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
        <p className="text-sm text-emerald-400 font-medium mb-3">{plan.target}</p>
        <p className="text-zinc-400 text-sm">{plan.description}</p>
      </div>

      {/* Price */}
      <div className="mb-5">
        <div className="flex items-baseline gap-2">
          <span className="text-zinc-500 text-sm">desde</span>
          <span className="text-4xl font-bold text-white">{plan.price}</span>
        </div>
        <p className="text-sm text-zinc-500 mt-1">hasta {plan.priceMax} según complejidad</p>
        <p className="text-sm text-zinc-500 mt-1">Entrega en {plan.delivery}</p>
      </div>

      {/* Meta chips */}
      <div className="flex flex-wrap gap-2 mb-5">
        {Object.values(plan.meta).map((v) => (
          <span key={v} className="text-xs px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
            {v}
          </span>
        ))}
      </div>

      {/* Ideal for */}
      <p className="text-xs text-zinc-500 mb-5 border-t border-zinc-800 pt-4">{plan.idealFor}</p>

      {/* Included features */}
      <ul className="space-y-3 mb-4 flex-1">
        {plan.included.map((feat) => (
          <li key={feat.label} className="flex items-start gap-3 text-sm text-zinc-300">
            <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <span>{feat.label}</span>
          </li>
        ))}
      </ul>

      {/* Expandable: not included */}
      <div className="mb-5">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors w-full"
        >
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          {expanded ? 'Ocultar' : 'Ver'} qué no está incluido
        </button>
        <AnimatePresence>
          {expanded && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden mt-3 space-y-2"
            >
              {plan.notIncluded.map((feat) => (
                <li key={feat.label} className="flex items-start gap-3 text-sm text-zinc-600">
                  <X className="w-4 h-4 text-zinc-700 shrink-0 mt-0.5" />
                  <div>
                    <span>{feat.label}</span>
                    {feat.detail && (
                      <span className="block text-xs text-zinc-600 mt-0.5">{feat.detail}</span>
                    )}
                  </div>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* Bonus */}
      <div className="flex items-center gap-2 mb-6 px-3 py-2 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
        <Gift className="w-4 h-4 text-emerald-400 shrink-0" />
        <span className="text-emerald-400 text-sm font-medium">{plan.bonus} incluido</span>
      </div>

      {/* CTA */}
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

const comparisonRows = [
  { label: 'Páginas / Pantallas', launch: '5', build: '10', scale: 'Ilimitadas' },
  { label: 'Revisiones incluidas', launch: '1', build: '2', scale: '3' },
  { label: 'Soporte post-entrega', launch: '30 días', build: '30 días', scale: '60 días' },
  { label: 'Autenticación de usuarios', launch: false, build: true, scale: true },
  { label: 'Base de datos propia', launch: false, build: true, scale: true },
  { label: 'Panel de administración', launch: false, build: 'Básico', scale: 'Avanzado' },
  { label: 'Pagos con Stripe', launch: false, build: 'Únicos', scale: 'Únicos + Suscripciones' },
  { label: 'IA integrada', launch: false, build: false, scale: true },
  { label: 'Múltiples roles de usuario', launch: false, build: false, scale: true },
  { label: 'Integraciones externas (CRM...)', launch: false, build: false, scale: true },
];

function ComparisonCell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="w-5 h-5 text-emerald-500 mx-auto" />;
  if (value === false) return <X className="w-4 h-4 text-zinc-700 mx-auto" />;
  return <span className="text-xs text-zinc-300 text-center block">{value}</span>;
}

export function Pricing() {
  const [showComparison, setShowComparison] = useState(false);

  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Precios transparentes, sin sorpresas</h2>
          <p className="text-zinc-400 text-lg">
            Elige el plan que encaje con tu proyecto. Todos incluyen: código 100% tuyo, deploy en producción y 30 días de soporte post-lanzamiento.
          </p>
        </div>

        {/* Plan cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PlanCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>

        {/* Comparison table toggle */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-sm text-zinc-300 transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            {showComparison ? 'Ocultar' : 'Ver'} tabla comparativa de planes
            <ChevronDown className={`w-4 h-4 transition-transform ${showComparison ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <AnimatePresence>
          {showComparison && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-8 rounded-2xl border border-zinc-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-zinc-800 bg-zinc-900/80">
                        <th className="text-left px-5 py-4 text-zinc-400 font-medium w-1/2">Característica</th>
                        {plans.map((p) => (
                          <th key={p.name} className={`px-4 py-4 text-center font-semibold ${p.popular ? 'text-emerald-400' : 'text-white'}`}>
                            {p.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50">
                      {comparisonRows.map((row) => (
                        <tr key={row.label} className="hover:bg-zinc-900/30 transition-colors">
                          <td className="px-5 py-3 text-zinc-400">{row.label}</td>
                          <td className="px-4 py-3 text-center"><ComparisonCell value={row.launch} /></td>
                          <td className="px-4 py-3 text-center"><ComparisonCell value={row.build} /></td>
                          <td className="px-4 py-3 text-center"><ComparisonCell value={row.scale} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer notes */}
        <div className="text-center mt-10 space-y-2">
          <p className="text-zinc-500 text-sm">
            Todos los precios son sin IVA. Pago: 50% al inicio, 50% a la entrega.
          </p>
          <p className="text-zinc-400 text-sm font-medium">
            Aceptamos un máximo de 3 proyectos nuevos al mes para garantizar la calidad de cada entrega.
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
