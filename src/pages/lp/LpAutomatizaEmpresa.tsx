/**
 * Landing Variant #2 — /lp/automatiza-tu-empresa
 * ICP: Dueño de pyme / director de operaciones con procesos manuales
 * Ángulo: ROI + AHORRO DE TIEMPO + INVERSIÓN QUE SE AMORTIZA
 * Experimento: vs landing principal (/)
 */
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  TrendingUp,
  AlertTriangle,
  Zap,
  BarChart3,
  FileText,
  Users,
  RefreshCw,
} from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePageMeta } from '../../hooks/usePageMeta';

const PAIN_POINTS = [
  {
    icon: Clock,
    problem: 'Tu equipo pierde horas en Excel',
    solution: 'App a medida que lo hace automático',
    saving: '-12h/semana',
  },
  {
    icon: AlertTriangle,
    problem: 'Errores por procesos manuales',
    solution: 'Flujos automáticos con validación',
    saving: '-85% errores',
  },
  {
    icon: FileText,
    problem: 'Reportes que nadie tiene tiempo de hacer',
    solution: 'Dashboards en tiempo real',
    saving: 'Siempre actualizados',
  },
  {
    icon: Users,
    problem: 'Información dispersa entre herramientas',
    solution: 'Una sola app con todo integrado',
    saving: 'Un único sistema',
  },
];

const CASES = [
  {
    sector: 'Distribución',
    company: 'Distribuidor Barcelona',
    before: '14h/semana en pedidos y albaranes manuales',
    after: '2h/semana. El resto lo hace la app.',
    roi: 'Amortizado en 3 meses',
    plan: 'Pro · 3.500€',
  },
  {
    sector: 'Legal',
    company: 'Despacho de abogados',
    before: 'Contratos en papel, firma presencial obligatoria',
    after: 'Firma digital + gestión de estados. 0 contratos perdidos.',
    roi: 'Amortizado en 6 semanas',
    plan: 'Starter · 2.000€',
  },
  {
    sector: 'Medio ambiente',
    company: 'Empresa de reciclaje',
    before: 'Reporting manual para clientes: 2 días/mes',
    after: 'Informes automáticos. Los clientes los ven en su portal.',
    roi: '+40% satisfacción de clientes',
    plan: 'Growth · 7.000€',
  },
];

export function LpAutomatizaEmpresa() {
  usePageTitle('Software a medida para tu empresa — desde 2.000€ — Think Better');
  usePageMeta(
    'Automatiza los procesos manuales de tu empresa con software a medida. Precio cerrado desde 2.000€, entrega en 3 semanas. ROI en menos de 6 meses. Código 100% tuyo. Think Better Barcelona.',
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-800/40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-bold text-lg">
            Think <span className="text-emerald-400">Better</span>
          </Link>
          <Link
            to="/cuestionario"
            className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm px-5 py-2.5 rounded-full transition-colors flex items-center gap-1.5"
          >
            Calcular precio
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* HERO — Ángulo: ROI / ahorro de tiempo */}
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium px-4 py-2 rounded-full mb-8">
              <TrendingUp className="w-4 h-4" />
              Software a medida · Amortizado en &lt;6 meses · Código 100% tuyo
            </div>

            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-[1.1] tracking-tight">
              ¿Cuántas horas pierde
              <br />
              tu equipo cada semana
              <br />
              <span className="text-emerald-400">en tareas manuales?</span>
            </h1>

            <p className="text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-4">
              Excel, PDFs, emails, copiar y pegar entre herramientas. El 80% de las empresas pierden
              entre 10 y 30 horas semanales en tareas que un software a medida haría en segundos.
            </p>

            <p className="text-zinc-400 text-base mb-10">
              <strong className="text-white">Precio cerrado desde 2.000€.</strong> Entrega en 3
              semanas. Sin sorpresas. Sin licencias mensuales. El código es tuyo.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Link
                to="/cuestionario"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-lg px-8 py-4 rounded-full transition-colors w-full sm:w-auto justify-center"
              >
                Calcular el ROI de mi app
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#casos"
                className="inline-flex items-center gap-2 text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-500 px-8 py-4 rounded-full transition-colors w-full sm:w-auto justify-center text-base"
              >
                Ver casos de empresas reales
              </a>
            </div>

            <p className="text-zinc-600 text-sm">
              ✓ Sin reuniones previas · ✓ Propuesta en 24h · ✓ Precio exacto, no estimado
            </p>
          </motion.div>

          {/* Calculadora mental de ROI */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-16 bg-zinc-900 border border-zinc-700 rounded-3xl p-8"
          >
            <p className="text-center text-zinc-400 text-sm uppercase tracking-widest font-semibold mb-6">
              Calculadora rápida de ROI
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-4xl font-black text-white mb-2">10h</p>
                <p className="text-zinc-500 text-sm">horas/semana en tareas manuales (mínimo)</p>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <div>
                <p className="text-4xl font-black text-emerald-400 mb-2">3 meses</p>
                <p className="text-zinc-500 text-sm">tiempo medio de amortización de un Plan Starter</p>
              </div>
            </div>
            <p className="text-center text-zinc-600 text-xs mt-6">
              Basado en coste medio/hora de 25€ en empresas españolas · 40 semanas laborables/año
            </p>
          </motion.div>
        </div>
      </section>

      {/* PROBLEMAS → SOLUCIONES */}
      <section className="py-20 px-6 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Los problemas que resolvemos</h2>
            <p className="text-zinc-400">Cada empresa tiene sus propios cuellos de botella. Estos son los más comunes.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PAIN_POINTS.map((p) => (
              <div key={p.problem} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                    <p.icon className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm line-through mb-1">{p.problem}</p>
                    <p className="text-white font-semibold mb-2">{p.solution}</p>
                    <span className="text-xs font-bold bg-emerald-500/15 text-emerald-400 px-2.5 py-1 rounded-full">
                      {p.saving}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Cómo es el proceso</h2>
            <p className="text-zinc-400">Sin fricción. Tu tiempo: menos de 2 horas en todo el proyecto.</p>
          </div>
          <div className="space-y-4">
            {[
              {
                step: '1',
                title: 'Cuéntanos el proceso que quieres automatizar',
                detail: 'En 10 minutos con nuestro AI. Sin reunión previa, sin presentación de empresa.',
                time: '10 min',
              },
              {
                step: '2',
                title: 'Recibes propuesta + precio exacto en 24h',
                detail: 'Un documento con funcionalidades, flujo de usuario, stack tecnológico y precio cerrado. Sin sorpresas.',
                time: '24h',
              },
              {
                step: '3',
                title: 'Construimos. Tú revisas. Entregamos.',
                detail: 'Updates semanales. Tú ves el progreso. En 3 semanas tienes el software en producción.',
                time: '3 semanas',
              },
              {
                step: '4',
                title: 'Soporte y evolución incluidos',
                detail: '30-60 días de soporte post-entrega. Si quieres seguir añadiendo funcionalidades, tenemos planes de mantenimiento.',
                time: 'siempre',
              },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 font-bold text-emerald-400">
                  {s.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h3 className="font-bold text-white">{s.title}</h3>
                    <span className="text-xs bg-zinc-800 text-zinc-400 px-2.5 py-1 rounded-full">
                      {s.time}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASOS REALES */}
      <section id="casos" className="py-20 px-6 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Empresas que ya lo han hecho</h2>
            <p className="text-zinc-400">Proyectos reales de empresas españolas.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CASES.map((c) => (
              <div key={c.company} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3">
                  {c.sector}
                </p>
                <p className="font-bold text-white mb-4">{c.company}</p>
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-xs text-zinc-600 mb-1">Antes:</p>
                    <p className="text-sm text-zinc-400 line-through">{c.before}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-600 mb-1">Después:</p>
                    <p className="text-sm text-emerald-400 font-medium">{c.after}</p>
                  </div>
                </div>
                <div className="border-t border-zinc-800 pt-3 flex items-center justify-between">
                  <p className="text-xs text-amber-400 font-semibold">{c.roi}</p>
                  <p className="text-xs text-zinc-600">{c.plan}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIPOS DE SOFTWARE */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">¿Qué tipo de software construimos?</h2>
            <p className="text-zinc-400">Si implica datos, flujos o usuarios, lo construimos.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: BarChart3, label: 'Dashboards y reporting', sub: 'Datos en tiempo real, sin Excel' },
              { icon: RefreshCw, label: 'Automatización de procesos', sub: 'Pedidos, facturas, albaranes' },
              { icon: Users, label: 'Portales de clientes', sub: 'Acceso privado por rol' },
              { icon: FileText, label: 'Gestión documental', sub: 'Contratos, firma digital, estados' },
              { icon: Zap, label: 'Integraciones de sistemas', sub: 'ERP, CRM, APIs externas' },
              { icon: TrendingUp, label: 'SaaS interno', sub: 'Herramientas propias para tu equipo' },
            ].map((t) => (
              <div key={t.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 text-center">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                  <t.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <p className="font-semibold text-white text-sm mb-1">{t.label}</p>
                <p className="text-zinc-500 text-xs">{t.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING simplificado */}
      <section className="py-20 px-6 bg-zinc-900/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">Precio cerrado. Sin sorpresas.</h2>
          <p className="text-zinc-400 mb-10">
            Pagas una vez. El software funciona para siempre. El código es 100% tuyo.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { name: 'Starter', price: '2.000€', note: 'Procesos simples', delivery: '5-7 días' },
              { name: 'Pro', price: '3.500€', note: 'Plataformas completas', delivery: '2-3 semanas', popular: true },
              { name: 'Growth', price: '7.000€', note: 'Software complejo + IA', delivery: '3-4 semanas' },
            ].map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl p-6 border text-left ${p.popular ? 'border-emerald-500 bg-emerald-500/5' : 'border-zinc-800 bg-zinc-900'}`}
              >
                {p.popular && (
                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">Popular</p>
                )}
                <p className="font-bold text-lg text-white">{p.name}</p>
                <p className="text-3xl font-black text-white my-2">{p.price}</p>
                <p className="text-zinc-500 text-sm mb-1">{p.note}</p>
                <p className="text-emerald-400 text-sm">Entrega en {p.delivery}</p>
              </div>
            ))}
          </div>
          <Link
            to="/cuestionario"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-lg px-10 py-4 rounded-full transition-colors"
          >
            Calcular precio de mi proyecto
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* GARANTÍAS */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: CheckCircle2, label: 'Precio cerrado', sub: 'Lo que acordamos es lo que pagas' },
              { icon: Clock, label: 'Entrega garantizada', sub: 'Fechas reales, no estimadas' },
              { icon: Zap, label: 'Código 100% tuyo', sub: 'Sin lock-in, sin licencias' },
              { icon: TrendingUp, label: 'Soporte incluido', sub: '30-60 días post-entrega' },
            ].map((g) => (
              <div key={g.label} className="text-center">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                  <g.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <p className="font-semibold text-white text-sm mb-1">{g.label}</p>
                <p className="text-zinc-500 text-xs">{g.sub}</p>
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
              Para de perder horas.
              <br />
              <span className="text-emerald-400">Empieza a automatizar.</span>
            </h2>
            <p className="text-zinc-300 mb-8 leading-relaxed">
              Cuéntanos qué proceso quieres automatizar. En 10 minutos sabes si podemos ayudarte
              y cuánto costaría. La propuesta es gratis.
            </p>
            <Link
              to="/cuestionario"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-lg px-10 py-4 rounded-full transition-colors"
            >
              Quiero automatizar mi empresa
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-zinc-600 text-sm mt-4">
              10 min · Propuesta en 24h · Precio exacto · Sin compromiso
            </p>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-zinc-800 py-8 px-6 text-center">
        <p className="text-zinc-600 text-sm">
          © 2026 Think Better · Software a medida para empresas · Barcelona ·{' '}
          <Link to="/privacidad" className="hover:text-zinc-400 transition-colors">
            Privacidad
          </Link>
        </p>
      </footer>
    </div>
  );
}
