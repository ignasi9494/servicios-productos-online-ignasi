import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Users,
  Code2,
  Palette,
  TrendingUp,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Clock,
  Star,
} from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePageMeta } from '../../hooks/usePageMeta';

export function EquipoDesarrolloSaas() {
  usePageTitle('Cómo estructurar un equipo de desarrollo de 2-5 personas para un SaaS — Think Better');
  usePageMeta(
    'Guía práctica para montar el equipo de desarrollo mínimo viable para un SaaS. Roles, responsabilidades, cuándo contratar, qué externalizar y cómo evitar los errores más costosos de los primeros equipos.',
  );

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Cómo estructurar un equipo de desarrollo de 2-5 personas para un SaaS',
      description:
        'Guía completa para montar un equipo de desarrollo de 2 a 5 personas para un SaaS. Roles esenciales, cuándo contratar cada perfil, qué externalizar, errores frecuentes y caso real de equipo que pasó de 1 a 5 personas en 6 meses.',
      datePublished: '2026-03-16',
      dateModified: '2026-03-16',
      author: {
        '@type': 'Organization',
        name: 'Think Better',
        url: 'https://servicios-productos-online-ignasi.vercel.app/',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Think Better',
        logo: {
          '@type': 'ImageObject',
          url: 'https://servicios-productos-online-ignasi.vercel.app/favicon.svg',
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id':
          'https://servicios-productos-online-ignasi.vercel.app/blog/equipo-desarrollo-saas-2-5-personas',
      },
    };
    const script = document.createElement('script');
    script.id = 'article-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      const existing = document.getElementById('article-schema');
      if (existing) existing.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-sm border-b border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-emerald-400 font-semibold text-lg">
            Think Better
          </Link>
          <Link
            to="/blog"
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al blog
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">
              Equipos
            </span>
            <span className="text-zinc-500 text-sm flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              11 min de lectura
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Cómo estructurar un equipo de desarrollo de{' '}
            <span className="text-emerald-400">2-5 personas</span> para un SaaS
          </h1>

          <p className="text-xl text-zinc-300 leading-relaxed mb-8">
            La mayoría de founders contratan mal los primeros perfiles: o contratan demasiado pronto,
            o en el orden equivocado, o mezclan roles que no deberían mezclarse. En esta guía te
            explicamos exactamente cómo montar el equipo mínimo viable para un SaaS, cuándo escalar
            y qué errores cuestan más caro.
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-zinc-400 mb-12 pb-12 border-b border-zinc-800">
            <span>Think Better Studio · Barcelona</span>
            <span>·</span>
            <span>16 de marzo de 2026</span>
            <span>·</span>
            <span>Basado en +30 proyectos SaaS entregados</span>
          </div>
        </motion.div>

        {/* Intro stat */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-8 mb-12"
        >
          <p className="text-2xl font-bold text-emerald-400 mb-3">
            El 68% de los SaaS que fracasan en su primer año tienen un problema de equipo,
            no de producto.
          </p>
          <p className="text-zinc-300 leading-relaxed">
            Según datos de CBInsights 2025, la segunda causa de muerte de startups tech es
            "el equipo equivocado". Antes del problema de mercado, antes de quedarse sin caja.
            Contratar los perfiles correctos en el momento correcto puede ser la diferencia entre
            llegar al product-market fit y no llegar.
          </p>
        </motion.div>

        {/* Section 1 */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Users className="w-6 h-6 text-emerald-400 shrink-0" />
            Los 5 roles de un equipo SaaS de 2-5 personas
          </h2>
          <p className="text-zinc-300 leading-relaxed mb-6">
            No existe un equipo perfecto universal, pero sí existe un conjunto de{' '}
            <strong className="text-white">capacidades mínimas</strong> que todo SaaS necesita
            cubrir para funcionar. El secreto en equipos pequeños está en saber cuáles puedes
            combinar en una misma persona y cuáles no.
          </p>

          <div className="space-y-4 mb-8">
            {[
              {
                icon: Code2,
                role: 'Full-stack Lead (o CTO técnico)',
                must: true,
                description:
                  'El perfil más crítico. Toma decisiones de arquitectura, escribe la mayor parte del código y conoce el sistema de punta a punta. No puede ser solo backend o solo frontend en fases tempranas.',
                canCombine: 'Puede asumir DevOps básico (CI/CD, deploys) y revisiones de código.',
                cantCombine: 'No puede ser también el responsable de ventas o producto.',
              },
              {
                icon: Palette,
                role: 'Product Designer (UI/UX)',
                must: true,
                description:
                  'Responsable de que el producto sea usable y coherente. En equipos muy pequeños puede ser el propio founder si tiene sensibilidad de diseño, o un freelance en fases MVP.',
                canCombine: 'Puede encargarse de la comunicación visual de marketing.',
                cantCombine: 'No puede ser también el desarrollador principal en productos de cierta complejidad.',
              },
              {
                icon: TrendingUp,
                role: 'Growth / Product Manager',
                must: false,
                description:
                  'Prioriza el backlog, habla con clientes y conecta negocio con tecnología. En equipos de 2-3 personas suele ser el founder CEO. Se vuelve crítico a partir de las 4-5 personas.',
                canCombine: 'Puede asumir customer success y onboarding en fases tempranas.',
                cantCombine: 'No puede ser también el desarrollador principal.',
              },
              {
                icon: Shield,
                role: 'Backend / Data Engineer',
                must: false,
                description:
                  'Necesario cuando el producto tiene lógica de negocio compleja, pipelines de datos o integraciones con sistemas externos. En SaaS simples el Full-stack Lead lo cubre bien.',
                canCombine: 'Puede gestionar infraestructura y bases de datos.',
                cantCombine: 'No es un rol para equipos menores de 4 personas salvo producto muy técnico.',
              },
              {
                icon: Star,
                role: 'Frontend Especialista',
                must: false,
                description:
                  'Relevante cuando la UX es altamente interactiva (dashboards complejos, visualización de datos, apps móviles). En un SaaS estándar, el Full-stack Lead cubre el frontend hasta el equipo de 5+.',
                canCombine: 'Puede colaborar con el designer en sistema de diseño y componentes.',
                cantCombine: 'No vale la pena antes de tener tracción real con usuarios activos.',
              },
            ].map((item) => (
              <div key={item.role} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-white">{item.role}</h3>
                      {item.must ? (
                        <span className="text-xs font-semibold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                          Esencial desde el día 1
                        </span>
                      ) : (
                        <span className="text-xs font-semibold bg-zinc-700 text-zinc-400 px-2 py-0.5 rounded-full">
                          Opcional / fase posterior
                        </span>
                      )}
                    </div>
                    <p className="text-zinc-300 text-sm leading-relaxed mb-3">{item.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <p className="text-xs text-emerald-400 bg-emerald-500/5 rounded-lg px-3 py-2">
                        ✓ {item.canCombine}
                      </p>
                      <p className="text-xs text-red-400 bg-red-500/5 rounded-lg px-3 py-2">
                        ✗ {item.cantCombine}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Roadmap de contratación */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Clock className="w-6 h-6 text-emerald-400 shrink-0" />
            El roadmap de contratación por fase
          </h2>
          <p className="text-zinc-300 leading-relaxed mb-8">
            Contratar en el orden equivocado es tan peligroso como no contratar. Aquí está el
            patrón que hemos visto funcionar en más de 30 proyectos SaaS:
          </p>

          <div className="space-y-6">
            {[
              {
                phase: 'Fase 1',
                label: 'Pre-PMF: 0-6 meses',
                size: '1-2 personas',
                color: 'cyan',
                focus: 'Velocidad de aprendizaje y producto mínimo',
                team: [
                  { role: 'Founder técnico (Full-stack)', note: 'Construye, aprende, pivota' },
                  { role: 'Co-founder o early hire de producto', note: 'Habla con clientes, prioriza' },
                ],
                what: 'Externaliza: diseño (freelance o plantilla), infraestructura (Supabase/Vercel), legal.',
                risk: 'Riesgo: construir sin validar. El equipo debe salir a hablar con clientes, no solo codear.',
              },
              {
                phase: 'Fase 2',
                label: 'PMF: 6-18 meses',
                size: '3-4 personas',
                color: 'emerald',
                focus: 'Calidad del producto y primeros clientes de pago',
                team: [
                  { role: 'Full-stack Lead + CTO', note: 'Arquitectura y velocidad' },
                  { role: 'Product Designer (tiempo completo)', note: 'Sistema de diseño coherente' },
                  { role: 'Segundo desarrollador o PM', note: 'Escalar capacidad técnica o producto' },
                ],
                what: 'Externaliza: marketing de contenidos, contabilidad, soporte técnico especializado.',
                risk: 'Riesgo: contratar demasiado rápido y perder cultura. Cada nueva persona diluye el contexto.',
              },
              {
                phase: 'Fase 3',
                label: 'Escala inicial: 18-36 meses',
                size: '5 personas',
                color: 'violet',
                focus: 'Ejecución fiable y crecimiento predecible',
                team: [
                  { role: 'CTO / Tech Lead', note: 'Decisiones técnicas, mentoring' },
                  { role: 'Backend + Frontend especialistas', note: 'División por dominio' },
                  { role: 'Product Designer', note: 'Diseño de sistema y user research' },
                  { role: 'PM / Head of Product', note: 'Estrategia de producto y roadmap' },
                  { role: 'Customer Success / Growth', note: 'Retención y expansión de ingresos' },
                ],
                what: 'Internaliza: marketing digital, data analytics.',
                risk: 'Riesgo: silos de comunicación. 5 personas ya necesitan rituales de equipo: dailies, demos, retros.',
              },
            ].map((phase) => (
              <div key={phase.phase} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                      phase.color === 'cyan'
                        ? 'bg-cyan-500/15 text-cyan-400'
                        : phase.color === 'emerald'
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : 'bg-violet-500/15 text-violet-400'
                    }`}
                  >
                    {phase.phase}
                  </span>
                  <h3 className="font-bold text-lg text-white">{phase.label}</h3>
                  <span className="text-zinc-500 text-sm">({phase.size})</span>
                </div>
                <p className="text-sm text-zinc-400 mb-4 italic">Foco: {phase.focus}</p>
                <div className="space-y-2 mb-4">
                  {phase.team.map((member) => (
                    <div key={member.role} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>
                        <strong className="text-white">{member.role}</strong>
                        <span className="text-zinc-400"> — {member.note}</span>
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-emerald-400 bg-emerald-500/5 rounded-lg px-3 py-2 mb-2">
                  📦 {phase.what}
                </p>
                <p className="text-xs text-amber-400 bg-amber-500/5 rounded-lg px-3 py-2">
                  ⚠️ {phase.risk}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Tabla comparativa contratar vs externalizar */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Zap className="w-6 h-6 text-emerald-400 shrink-0" />
            Contratar vs externalizar: la tabla definitiva
          </h2>
          <p className="text-zinc-300 leading-relaxed mb-6">
            Una de las decisiones más costosas en equipos pequeños: ¿cuándo tiene sentido contratar
            y cuándo es mejor externalizar? La regla general es simple —{' '}
            <strong className="text-white">internaliza lo que es ventaja competitiva</strong>,
            externaliza lo que es commodity.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-zinc-800 mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900">
                  <th className="text-left px-5 py-4 font-semibold text-zinc-300">Función</th>
                  <th className="text-left px-5 py-4 font-semibold text-emerald-400">Contratar</th>
                  <th className="text-left px-5 py-4 font-semibold text-cyan-400">Externalizar</th>
                  <th className="text-left px-5 py-4 font-semibold text-zinc-300">Cuándo cambiar</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    func: 'Desarrollo core del producto',
                    hire: '✓ Siempre',
                    ext: '✗ Solo MVP inicial',
                    when: 'Internaliza en cuanto tengas caja para el primer dev',
                  },
                  {
                    func: 'Diseño UI/UX',
                    hire: '✓ Desde fase 2',
                    ext: '✓ Freelance en fase 1',
                    when: 'Internaliza cuando el diseño es diferenciador (+ 500 DAU)',
                  },
                  {
                    func: 'Infraestructura / DevOps',
                    hire: '✗ Hasta 10+ devs',
                    ext: '✓ Vercel + Supabase + managed services',
                    when: 'Internaliza solo si tienes compliance muy estricto o escala masiva',
                  },
                  {
                    func: 'Marketing de contenidos',
                    hire: '✓ En fase 3',
                    ext: '✓ Agencia o freelance',
                    when: 'Internaliza cuando el contenido sea canal principal de adquisición',
                  },
                  {
                    func: 'Customer support',
                    hire: '✓ Con + de 100 clientes activos',
                    ext: '✓ Founder en fases tempranas',
                    when: 'Internaliza: el soporte en fases tempranas da información de producto valiosísima',
                  },
                  {
                    func: 'Legal y fiscal',
                    hire: '✗ Casi nunca',
                    ext: '✓ Siempre',
                    when: 'Solo internaliza si eres una scaleup con regulación muy específica',
                  },
                  {
                    func: 'Data / Analytics',
                    hire: '✓ Fase 3 con + MRR',
                    ext: '✓ Herramientas (PostHog, Mixpanel)',
                    when: 'Internaliza cuando los datos sean ventaja competitiva real',
                  },
                  {
                    func: 'QA / Testing',
                    hire: '✗ Hasta escala',
                    ext: '✓ Tests automatizados internos + revisiones',
                    when: 'Internaliza si el producto tiene regulación (salud, finanzas) o SLA críticos',
                  },
                ].map((row, i) => (
                  <tr key={row.func} className={i % 2 === 0 ? 'bg-zinc-900/50' : 'bg-zinc-950'}>
                    <td className="px-5 py-3 font-medium text-white">{row.func}</td>
                    <td className="px-5 py-3 text-emerald-400">{row.hire}</td>
                    <td className="px-5 py-3 text-cyan-400">{row.ext}</td>
                    <td className="px-5 py-3 text-zinc-400 text-xs">{row.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Los 5 errores más caros */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0" />
            Los 5 errores de equipo que más caro cuestan
          </h2>

          <div className="space-y-4">
            {[
              {
                n: '01',
                title: 'Contratar un "10x developer" antes de definir el producto',
                detail:
                  'Un desarrollador senior con salario de 70-90k€/año que no tiene qué construir porque el producto no está definido es el error más caro de la fase pre-PMF. Primero valida, luego escala el equipo técnico.',
                cost: 'Coste estimado: 6-12 meses de salario + coste de oportunidad por slowdown de pivots',
              },
              {
                n: '02',
                title: 'No tener ningún perfil técnico en el equipo fundador',
                detail:
                  'Un SaaS construido 100% por externos puede funcionar para el MVP, pero sin técnico interno en el equipo fundador la velocidad de iteración cae un 60-70% y la deuda técnica se acumula sin control.',
                cost: 'Coste estimado: +3-6 meses de time-to-market + dependencia de terceros indefinida',
              },
              {
                n: '03',
                title: 'Mezclar el rol de CTO con el de CEO',
                detail:
                  'En proyectos de 1-2 personas es inevitable, pero a partir de la fase 2 el fundador que es a la vez CEO y CTO no hace bien ninguno de los dos roles. El negocio sufre si está codificando y el producto sufre si está vendiendo.',
                cost: 'Coste estimado: burnout del founder + velocidad reducida en ambas áreas',
              },
              {
                n: '04',
                title: 'Contratar a alguien más senior de lo necesario para la fase',
                detail:
                  'Un VP of Engineering cuando tienes 3 clientes pagando no tiene qué gestionar. Los perfiles muy senior en fases tempranas suelen frustrarse porque no hay suficiente caos estructurado en el que brillar.',
                cost: 'Coste estimado: churn del perfil senior en 6-12 meses + disruption del equipo',
              },
              {
                n: '05',
                title: 'No documentar ningún proceso porque "somos pocos"',
                detail:
                  'El "somos pocos, todo está en nuestras cabezas" es una bomba de relojería. Cuando llega la quinta persona (o cuando uno de los dos primeros cae enfermo 2 semanas), el equipo se paraliza.',
                cost: 'Coste estimado: 2-4 semanas de onboarding por cada nuevo perfil + bugs por contexto perdido',
              },
            ].map((err) => (
              <div key={err.n} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-black text-zinc-700 leading-none mt-1 w-8 shrink-0">
                    {err.n}
                  </span>
                  <div>
                    <h3 className="font-semibold text-white mb-2">{err.title}</h3>
                    <p className="text-zinc-300 text-sm leading-relaxed mb-3">{err.detail}</p>
                    <p className="text-xs text-amber-400 bg-amber-500/5 rounded-lg px-3 py-2">
                      💸 {err.cost}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Caso real */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-emerald-400 shrink-0" />
            Caso real: de 1 a 5 personas en 18 meses sin morir en el intento
          </h2>

          <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-700 rounded-2xl p-8">
            <p className="text-sm text-zinc-500 uppercase tracking-widest mb-4">
              Caso real — Barcelona, 2024-2025
            </p>

            <p className="text-zinc-300 leading-relaxed mb-6">
              <strong className="text-white">LogiFlow</strong> es una plataforma SaaS B2B de gestión
              logística para pymes. Empezaron con 2 personas: un founder CEO con perfil de negocio
              y un desarrollador full-stack. El primer año lo construyeron todo los dos.
            </p>

            <div className="space-y-4 mb-6">
              {[
                {
                  month: 'Mes 1-3',
                  action: 'Solo el founder + 1 freelance dev',
                  result: 'MVP funcional con 5 clientes beta, sin pagar. Validaron el flujo básico.',
                  tag: 'Validación',
                  color: 'cyan',
                },
                {
                  month: 'Mes 4-6',
                  action: 'Contratan 1 dev full-stack a tiempo completo',
                  result: 'Primer cliente de pago (249€/mes). Velocidad de desarrollo x2.',
                  tag: 'Primer ingreso',
                  color: 'emerald',
                },
                {
                  month: 'Mes 7-12',
                  action: 'Suman designer/PM híbrido (una persona)',
                  result: 'Tasa de churn baja del 22% al 8%. NPS pasa de 31 a 54.',
                  tag: 'Producto mejorado',
                  color: 'emerald',
                },
                {
                  month: 'Mes 13-15',
                  action: 'Contratan 1 especialista en backend / integraciones',
                  result: 'Integran con 4 ERPs del mercado español. ARR cruza los 80k€.',
                  tag: 'Escala técnica',
                  color: 'violet',
                },
                {
                  month: 'Mes 16-18',
                  action: 'Incorporan Customer Success (primera persona no técnica)',
                  result: 'Churn mensual baja al 2.4%. Expansión de ingresos por upsell +35%.',
                  tag: 'Retención',
                  color: 'violet',
                },
              ].map((step) => (
                <div key={step.month} className="flex items-start gap-4">
                  <div className="text-xs font-mono text-zinc-500 w-20 shrink-0 pt-1">
                    {step.month}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <p className="text-sm font-semibold text-white">{step.action}</p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          step.color === 'cyan'
                            ? 'bg-cyan-500/15 text-cyan-400'
                            : step.color === 'emerald'
                              ? 'bg-emerald-500/15 text-emerald-400'
                              : 'bg-violet-500/15 text-violet-400'
                        }`}
                      >
                        {step.tag}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400">{step.result}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-zinc-800">
              {[
                { label: 'Equipo al mes 18', value: '5 personas' },
                { label: 'ARR alcanzado', value: '~120k€' },
                { label: 'Churn mensual', value: '2.4%' },
                { label: 'Tiempo medio de contratación', value: '45 días' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-emerald-400 mb-1">{stat.value}</p>
                  <p className="text-xs text-zinc-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Rituales de equipo */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6">
            Los rituales de equipo que no pueden faltar
          </h2>
          <p className="text-zinc-300 leading-relaxed mb-6">
            Un equipo de 5 personas sin estructura es caos. Un equipo de 5 personas con demasiada
            estructura es burocracia. El punto óptimo para un SaaS en crecimiento:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                freq: 'Diario (15 min)',
                name: 'Daily standup asíncrono',
                detail: 'Slack o Loom: qué hice ayer, qué haré hoy, algún bloqueo. Sin reunión en tiempo real si el equipo es remoto.',
              },
              {
                freq: 'Semanal (1h)',
                name: 'Product review',
                detail: 'Demo de lo construido en la semana. Todo el equipo. Genera alineamiento y orgullo de equipo.',
              },
              {
                freq: 'Quincenal (45 min)',
                name: 'Retrospectiva',
                detail: 'Qué funcionó, qué no y un único action item de mejora. Más de uno no se ejecuta.',
              },
              {
                freq: 'Mensual (2h)',
                name: 'Revisión de métricas y roadmap',
                detail: 'MRR, churn, NPS, velocidad de entrega. Ajuste de prioridades del trimestre.',
              },
              {
                freq: 'Trimestral (medio día)',
                name: 'Team offsite',
                detail: 'Planificación de objetivos del siguiente trimestre. Fuera de la oficina habitual. Crucial para cohesión.',
              },
              {
                freq: 'Continuo',
                name: 'Documentación en Notion / Confluence',
                detail: 'Decisiones de arquitectura, procesos de onboarding, playbooks de cliente. Sin esto, escalar duele.',
              },
            ].map((ritual) => (
              <div key={ritual.name} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <p className="text-xs text-emerald-400 font-semibold mb-2">{ritual.freq}</p>
                <h3 className="font-semibold text-white mb-2">{ritual.name}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{ritual.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Checklist */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
            Checklist: ¿estás listo para contratar tu primer dev?
          </h2>
          <p className="text-zinc-300 leading-relaxed mb-6">
            Antes de publicar esa oferta de trabajo, responde estas 10 preguntas. Si tienes menos
            de 7 respuestas afirmativas, el problema no es el equipo — es otra cosa.
          </p>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="space-y-3">
              {[
                'Tengo al menos 1 cliente pagando (aunque sea poco)',
                'Sé exactamente qué construirá este desarrollador en los próximos 3 meses',
                'Tengo caja para cubrir al menos 12 meses de este salario',
                'He definido cómo será el onboarding técnico (accesos, docs, contexto)',
                'Sé qué métricas va a mover esta contratación',
                'El equipo actual no puede simplemente trabajar más horas para cubrir la necesidad',
                'He validado que el problema no se resuelve externalizando',
                'Tengo claro el "stack" tecnológico y el nuevo dev puede contribuir desde la semana 1',
                'He hablado con al menos 3 candidatos y sé qué perfil específico necesito',
                'Tengo un proceso de evaluación técnica justo y definido (no improvisado)',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded border border-zinc-600 shrink-0 mt-0.5 flex items-center justify-center">
                    <span className="text-zinc-600 text-xs">{i + 1}</span>
                  </div>
                  <p className="text-zinc-300 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-3xl p-10 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            ¿Necesitas el primer desarrollador de tu SaaS?
          </h2>
          <p className="text-zinc-300 max-w-xl mx-auto mb-8 leading-relaxed">
            En Think Better actuamos como el equipo técnico externo que necesitas en fases tempranas:
            full-stack, diseño y arquitectura. Sin contratar, sin riesgo, con precio cerrado y código
            100% tuyo desde el día 1.
          </p>
          <Link
            to="/cuestionario"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold px-8 py-4 rounded-full transition-colors"
          >
            Cuéntanos tu proyecto
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-zinc-500 text-sm mt-4">
            Cuestionario de 10 min · Propuesta en 24h · Sin compromiso
          </p>
        </motion.div>

        {/* Back to blog */}
        <div className="mt-12 pt-8 border-t border-zinc-800 flex items-center justify-between">
          <Link
            to="/blog"
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Ver todos los artículos
          </Link>
          <Link
            to="/cuestionario"
            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors text-sm font-medium"
          >
            Empezar proyecto
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
