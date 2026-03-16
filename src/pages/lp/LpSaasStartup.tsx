/**
 * Landing Variant #1 — /lp/saas-startup
 * ICP: Founder técnico / solo founder con idea de SaaS
 * Ángulo: VELOCIDAD + SIN EQUIPO NECESARIO + CÓDIGO TUYO
 * Experimento: vs landing principal (/)
 */
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  Code2,
  Shield,
  Clock,
  Star,
  TrendingUp,
  Users,
  MessageSquare,
} from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePageMeta } from '../../hooks/usePageMeta';

const STATS = [
  { value: '+30', label: 'SaaS entregados' },
  { value: '3 sem', label: 'tiempo medio' },
  { value: '100%', label: 'código tuyo' },
  { value: '0', label: 'sorpresas de precio' },
];

const CASES = [
  {
    name: 'LeadHunter',
    desc: 'SaaS de prospección B2B con IA',
    result: '+200 leads/mes automatizados desde semana 1',
    plan: 'Pro · 3.500€',
  },
  {
    name: 'ContractFlow',
    desc: 'Firma digital + gestión de contratos',
    result: 'De 0 contratos digitales a 100% en 3 semanas',
    plan: 'Starter · 2.000€',
  },
  {
    name: 'ReciclaSaaS',
    desc: 'Plataforma SaaS de reporting medioambiental',
    result: '-15h/semana en trabajo manual del equipo',
    plan: 'Growth · 7.000€',
  },
];

const STEPS = [
  {
    n: '01',
    title: '10 min: describe tu idea',
    detail: 'Nuestro AI te hace las preguntas correctas. Sin formularios. Sin reuniones previas.',
  },
  {
    n: '02',
    title: '24h: propuesta + precio exacto',
    detail: 'Recibes un documento completo: funcionalidades, stack, calendario y precio cerrado.',
  },
  {
    n: '03',
    title: '1-3 semanas: tu SaaS en producción',
    detail: 'Construimos, desplegamos y te entregamos el código. Tú controlas todo.',
  },
];

export function LpSaasStartup() {
  usePageTitle('Lanza tu SaaS en 3 semanas — Think Better Barcelona');
  usePageMeta(
    'Convierte tu idea de SaaS en producto en producción en 3 semanas. Precio cerrado desde 2.000€. Código 100% tuyo. Sin equipo que contratar. Think Better, estudio AI-first en Barcelona.',
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Minimal nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-800/40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-bold text-lg">
            Think <span className="text-emerald-400">Better</span>
          </Link>
          <Link
            to="/cuestionario"
            className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm px-5 py-2.5 rounded-full transition-colors flex items-center gap-1.5"
          >
            Empezar gratis
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* HERO — Ángulo: velocidad + precio fijo */}
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium px-4 py-2 rounded-full mb-8">
              <Zap className="w-4 h-4" />
              Estudio AI-first · Barcelona · +30 SaaS entregados
            </div>

            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-[1.1] tracking-tight">
              Tu SaaS en producción
              <br />
              <span className="text-emerald-400">en 3 semanas.</span>
              <br />
              <span className="text-zinc-400">Sin equipo. Sin sustos.</span>
            </h1>

            <p className="text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-4">
              Tienes la idea. Nosotros construimos el producto.{' '}
              <strong className="text-white">Precio cerrado desde 2.000€.</strong> Código 100% tuyo
              desde el día 1. Deploy en Vercel incluido.
            </p>

            <p className="text-zinc-500 text-base mb-10">
              No necesitas saber programar. No necesitas contratar devs. No necesitas esperar meses.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Link
                to="/cuestionario"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-lg px-8 py-4 rounded-full transition-colors w-full sm:w-auto justify-center"
              >
                Descubrir precio de mi SaaS
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/#precios"
                className="inline-flex items-center gap-2 text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-500 px-8 py-4 rounded-full transition-colors w-full sm:w-auto justify-center text-base"
              >
                Ver planes y precios
              </Link>
            </div>

            <p className="text-zinc-600 text-sm">
              ✓ Sin tarjeta · ✓ Respuesta en 24h · ✓ Sin compromiso
            </p>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
          >
            {STATS.map((s) => (
              <div key={s.label} className="bg-zinc-900 border border-zinc-800 rounded-2xl py-5 px-4 text-center">
                <p className="text-3xl font-black text-emerald-400 mb-1">{s.value}</p>
                <p className="text-zinc-500 text-sm">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROBLEMA — El coste de esperar */}
      <section className="py-16 px-6 border-y border-zinc-800/50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-2xl font-bold text-white mb-4">
            Cada semana sin tu SaaS en producción son clientes que van a la competencia.
          </p>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Contratar un dev senior lleva 2-3 meses y 50.000€/año. Una agencia cobra 15-30k€ y
            tarda 6 meses. El no-code te limita cuando escales. Nosotros somos la tercera opción:{' '}
            <span className="text-emerald-400 font-semibold">velocidad de estudio, calidad de producto.</span>
          </p>
        </div>
      </section>

      {/* PROCESO */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">De idea a SaaS en 3 pasos</h2>
            <p className="text-zinc-400">Sin reuniones innecesarias. Sin burocracia.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((step) => (
              <div key={step.n} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative">
                <span className="text-5xl font-black text-zinc-800 absolute top-4 right-5 leading-none">
                  {step.n}
                </span>
                <h3 className="font-bold text-white mb-2 text-lg pr-8">{step.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUÉ INCLUYE */}
      <section className="py-20 px-6 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Todo lo que necesita un SaaS real</h2>
            <p className="text-zinc-400">No un prototipo. Un producto en producción desde el día 1.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: Code2, label: 'React + TypeScript', sub: 'Stack moderno y escalable' },
              { icon: Shield, label: 'Auth completa', sub: 'Login, roles, recuperación' },
              { icon: TrendingUp, label: 'Base de datos', sub: 'Supabase PostgreSQL' },
              { icon: Star, label: 'Pagos integrados', sub: 'Stripe checkout y suscripciones' },
              { icon: Zap, label: 'Deploy incluido', sub: 'Vercel + dominio personalizado' },
              { icon: MessageSquare, label: 'Panel de admin', sub: 'Gestión de usuarios y datos' },
              { icon: Clock, label: 'Emails transaccionales', sub: 'Bienvenida, reset, alertas' },
              { icon: Users, label: 'Diseño responsive', sub: 'Mobile-first por defecto' },
              { icon: CheckCircle2, label: 'Código 100% tuyo', sub: 'Sin lock-in, sin licencias' },
            ].map((f) => (
              <div key={f.label} className="flex items-start gap-3 bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <f.icon className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{f.label}</p>
                  <p className="text-zinc-500 text-xs">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASOS DE USO */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">SaaS que hemos lanzado</h2>
            <p className="text-zinc-400">Proyectos reales, resultados medibles.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CASES.map((c) => (
              <div key={c.name} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <p className="font-bold text-white text-lg mb-1">{c.name}</p>
                <p className="text-zinc-500 text-sm mb-4">{c.desc}</p>
                <p className="text-emerald-400 font-semibold text-sm mb-4">✓ {c.result}</p>
                <p className="text-xs text-zinc-600 border-t border-zinc-800 pt-3">{c.plan}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRECIOS */}
      <section className="py-20 px-6 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Precio fijo. Sin sorpresas.</h2>
            <p className="text-zinc-400">Pagas una vez. El código es tuyo para siempre.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Starter',
                price: '2.000€',
                delivery: '5-7 días',
                desc: 'MVP y apps sencillas',
                features: ['Hasta 5 pantallas', 'Auth + base de datos', 'Deploy incluido', '1 ronda de revisiones', '30 días soporte'],
              },
              {
                name: 'Pro',
                price: '3.500€',
                delivery: '2-3 semanas',
                desc: 'SaaS y plataformas',
                features: ['Hasta 12 pantallas', 'Panel admin + roles', 'Stripe integrado', 'API + emails', '2 rondas de revisiones'],
                popular: true,
              },
              {
                name: 'Growth',
                price: '7.000€',
                delivery: '3-4 semanas',
                desc: 'Software complejo con IA',
                features: ['Pantallas ilimitadas', 'IA integrada', 'Multi-tenant', 'Integraciones API', '3 rondas + 60 días soporte'],
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-6 border ${plan.popular ? 'border-emerald-500 bg-emerald-500/5' : 'border-zinc-800 bg-zinc-900'}`}
              >
                {plan.popular && (
                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">
                    Más popular
                  </p>
                )}
                <p className="font-bold text-white text-xl mb-1">{plan.name}</p>
                <p className="text-zinc-500 text-sm mb-4">{plan.desc}</p>
                <p className="text-4xl font-black text-white mb-1">{plan.price}</p>
                <p className="text-emerald-400 text-sm mb-6">Entrega en {plan.delivery}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/cuestionario"
                  className={`block text-center py-3 rounded-full font-semibold text-sm transition-colors ${plan.popular ? 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950' : 'border border-zinc-700 hover:border-zinc-500 text-white'}`}
                >
                  Empezar con {plan.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OBJECIONES */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {[
              {
                q: '¿Y si no estoy satisfecho con el resultado?',
                a: 'Hacemos revisiones hasta que el producto sea exactamente lo que acordamos en la propuesta. La propuesta es el contrato.',
              },
              {
                q: '¿Puedo escalar el código después?',
                a: 'Sí. Usamos stacks estándar (React, TypeScript, Supabase) con buenas prácticas. Cualquier developer puede coger el código y continuar.',
              },
              {
                q: '¿Cuánto tiempo me requiere el proyecto?',
                a: 'Entre 1 y 2 horas por semana para revisar avances y dar feedback. Nada más.',
              },
              {
                q: '¿Qué pasa si el proyecto crece y necesito más funcionalidades?',
                a: 'Tenemos planes de mantenimiento desde 199€/mes que incluyen hosting, soporte y nuevas funcionalidades. O puedes contratar a cualquier desarrollador con el código que te entregamos.',
              },
            ].map((faq) => (
              <div key={faq.q} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <p className="font-semibold text-white mb-2">{faq.q}</p>
                <p className="text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-3xl p-10"
          >
            <h2 className="text-4xl font-black mb-4">
              Tu SaaS puede estar en producción en{' '}
              <span className="text-emerald-400">3 semanas.</span>
            </h2>
            <p className="text-zinc-300 mb-8 leading-relaxed">
              Dinos en qué consiste tu idea. En 10 minutos sabes si encaja con lo que hacemos y
              cuánto costaría. Sin reuniones, sin compromiso.
            </p>
            <Link
              to="/cuestionario"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-lg px-10 py-4 rounded-full transition-colors"
            >
              Calcular precio gratis
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-zinc-600 text-sm mt-4">Respuesta garantizada en menos de 24h</p>
          </motion.div>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="border-t border-zinc-800 py-8 px-6 text-center">
        <p className="text-zinc-600 text-sm">
          © 2026 Think Better · Estudio AI-first · Barcelona ·{' '}
          <Link to="/privacidad" className="hover:text-zinc-400 transition-colors">
            Privacidad
          </Link>
        </p>
      </footer>
    </div>
  );
}
