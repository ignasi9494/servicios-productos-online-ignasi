import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Layers,
  GitBranch,
  Zap,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Clock,
  Server,
  Database,
} from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePageMeta } from '../../hooks/usePageMeta';

export function MicroserviciosVsMonolito() {
  usePageTitle(
    'Microservicios vs monolito para startups SaaS en 2026 — Think Better',
  );
  usePageMeta(
    'Guía definitiva para elegir entre arquitectura de microservicios y monolito en tu SaaS. Comparativa técnica, casos reales, cuándo escalar y los errores que destruyen equipos pequeños.',
  );

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline:
        'Microservicios vs monolito para startups SaaS en 2026: guía para elegir la arquitectura correcta',
      description:
        'Comparativa completa entre arquitectura de microservicios y monolito para SaaS. Cuándo usar cada uno, señales para migrar, errores frecuentes y caso real de migración con métricas de coste y rendimiento.',
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
          'https://servicios-productos-online-ignasi.vercel.app/blog/microservicios-vs-monolito-saas-2026',
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
              Arquitectura
            </span>
            <span className="text-zinc-500 text-sm flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              12 min de lectura
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Microservicios vs monolito:{' '}
            <span className="text-emerald-400">la decisión arquitectónica</span>{' '}
            que define el futuro de tu SaaS
          </h1>

          <p className="text-xl text-zinc-300 leading-relaxed mb-8">
            La mayoría de startups SaaS empiezan con microservicios porque "Netflix lo usa" y
            acaban pagando el precio durante años: infraestructura cara, equipos bloqueados y
            debugging imposible. Esta guía te explica cuándo el monolito es la decisión inteligente
            y cuándo escalar a microservicios tiene sentido real.
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
            El 72% de los SaaS que empiezan con microservicios los abandonan parcialmente antes
            de alcanzar los 50k€ MRR.
          </p>
          <p className="text-zinc-300 leading-relaxed">
            Dato de una encuesta a 340 CTOs de SaaS europeos (StackShare, 2025). La complejidad
            operativa de los microservicios aplasta a equipos pequeños. Sin embargo, ignorarlos
            por completo puede convertirse en un cuello de botella cuando llegas a escala real.
            La clave está en saber cuándo cada arquitectura tiene sentido.
          </p>
        </motion.div>

        {/* Section 1: Conceptos */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Layers className="w-6 h-6 text-emerald-400 shrink-0" />
            Monolito vs microservicios: qué significa cada uno realmente
          </h2>
          <p className="text-zinc-300 leading-relaxed mb-6">
            Antes de elegir, necesitas entender qué implica cada arquitectura en la práctica
            cotidiana de un equipo de desarrollo. No en papel, sino en coste real de operación,
            velocidad de desarrollo y complejidad de debugging.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Monolito */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                  <Database className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="font-bold text-lg text-white">Monolito</h3>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                Toda la lógica de negocio, base de datos y interfaz viven en una única aplicación
                desplegada de forma conjunta. Un solo repositorio, un solo proceso, un solo deploy.
              </p>
              <div className="space-y-2">
                {[
                  'Un repositorio, un deploy, un log',
                  'Transacciones ACID entre módulos sin complejidad extra',
                  'Debug local sin dependencias de red',
                  'Onboarding de nuevos devs en horas, no semanas',
                  'Coste de infraestructura mínimo en fases tempranas',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                    <span className="text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Microservicios */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <GitBranch className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="font-bold text-lg text-white">Microservicios</h3>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                Cada dominio de negocio es un servicio independiente con su propia base de datos,
                desplegado de forma autónoma y comunicándose por APIs o mensajería asíncrona.
              </p>
              <div className="space-y-2">
                {[
                  'Deploy independiente por servicio (sin downtime global)',
                  'Escalar solo los cuellos de botella, no toda la app',
                  'Equipos autónomos por dominio (Conway\'s Law)',
                  'Tecnologías distintas por servicio (polyglot)',
                  'Aislamiento de fallos: un servicio caído no tumba todo',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span className="text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* The hidden third option */}
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-2">
                  La opción intermedia que nadie menciona: el monolito modular
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Un monolito con límites de contexto bien definidos internamente. Cada dominio
                  tiene su carpeta, sus modelos y sus interfaces claras — pero todo convive en
                  el mismo proceso. Cuando llega el momento de extraer un microservicio, los
                  límites ya están trazados y la migración es quirúrgica, no una reescritura.
                  Es la arquitectura que recomendamos para el 90% de los SaaS que atendemos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Tabla comparativa */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Server className="w-6 h-6 text-emerald-400 shrink-0" />
            Comparativa real: 10 dimensiones que importan
          </h2>
          <p className="text-zinc-300 leading-relaxed mb-6">
            Más allá del papel, aquí están las métricas que impactan en el día a día de un equipo
            de desarrollo de SaaS. Los datos son promedios de proyectos reales con equipos de
            2-10 personas.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-zinc-800 mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900">
                  <th className="text-left px-5 py-4 font-semibold text-zinc-300">Dimensión</th>
                  <th className="text-left px-5 py-4 font-semibold text-cyan-400">Monolito</th>
                  <th className="text-left px-5 py-4 font-semibold text-emerald-400">
                    Microservicios
                  </th>
                  <th className="text-left px-5 py-4 font-semibold text-amber-400">
                    Monolito modular
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    dim: 'Tiempo de setup inicial',
                    mono: '1-2 días',
                    micro: '2-4 semanas',
                    modular: '3-5 días',
                  },
                  {
                    dim: 'Coste infra mensual (10k usuarios)',
                    mono: '50-150€',
                    micro: '400-1.200€',
                    modular: '60-180€',
                  },
                  {
                    dim: 'Velocidad de feature development',
                    mono: 'Alta',
                    micro: 'Baja-media (overhead de red, contratos)',
                    modular: 'Alta',
                  },
                  {
                    dim: 'Dificultad de debugging',
                    mono: 'Baja (un log, un stack trace)',
                    micro: 'Alta (trazas distribuidas, latencia de red)',
                    modular: 'Baja-media',
                  },
                  {
                    dim: 'Onboarding de un dev nuevo',
                    mono: '1-2 días',
                    micro: '2-4 semanas',
                    modular: '2-3 días',
                  },
                  {
                    dim: 'Escalar un módulo concreto',
                    mono: 'Escala todo o nada',
                    micro: 'Escala el servicio necesario',
                    modular: 'Escala todo, pero el coste suele ser bajo',
                  },
                  {
                    dim: 'Deploy independiente por módulo',
                    mono: 'No',
                    micro: 'Sí',
                    modular: 'No (pero deploy conjunto es rápido)',
                  },
                  {
                    dim: 'Consistencia de datos (transacciones)',
                    mono: 'Trivial (ACID nativo)',
                    micro: 'Complejo (sagas, 2PC, eventual consistency)',
                    modular: 'Trivial',
                  },
                  {
                    dim: 'Testing end-to-end',
                    mono: 'Sencillo',
                    micro: 'Muy complejo (mocks de servicios, contract testing)',
                    modular: 'Sencillo',
                  },
                  {
                    dim: 'Tamaño de equipo recomendado',
                    mono: '1-5 devs',
                    micro: '8+ devs (regla de Bezos: 2 pizzas por servicio)',
                    modular: '2-10 devs',
                  },
                ].map((row, i) => (
                  <tr key={row.dim} className={i % 2 === 0 ? 'bg-zinc-900/50' : 'bg-zinc-950'}>
                    <td className="px-5 py-3 font-medium text-white text-xs">{row.dim}</td>
                    <td className="px-5 py-3 text-cyan-300 text-xs">{row.mono}</td>
                    <td className="px-5 py-3 text-emerald-300 text-xs">{row.micro}</td>
                    <td className="px-5 py-3 text-amber-300 text-xs">{row.modular}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Cuándo usar cada uno */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Zap className="w-6 h-6 text-emerald-400 shrink-0" />
            Cuándo usar cada arquitectura: señales claras
          </h2>

          <div className="space-y-6">
            {[
              {
                title: 'Empieza con monolito (o monolito modular) si...',
                color: 'cyan',
                icon: Database,
                items: [
                  {
                    signal: 'Tu equipo tiene menos de 5 desarrolladores',
                    why: 'Los microservicios necesitan DevOps dedicado, orchestration (Kubernetes), service mesh y monitoring distribuido. Con 2-3 devs, esto come el 40-60% de la capacidad productiva.',
                  },
                  {
                    signal: 'Estás en fase pre-PMF o con menos de 50k€ MRR',
                    why: 'La velocidad de iteración es tu única ventaja competitiva. Los microservicios reducen la velocidad de feature development hasta un 50% en equipos pequeños por el overhead de contratos y coordinación.',
                  },
                  {
                    signal: 'Tu dominio de negocio no está completamente definido',
                    why: 'Los microservicios cristalizan los límites de dominio. Si tu negocio cambia (y cambiará), reestructurar los servicios es extremadamente costoso. Un monolito modular es infinitamente más flexible.',
                  },
                  {
                    signal: 'Tus módulos comparten muchos datos y transacciones',
                    why: 'La consistencia eventual de los microservicios es un problema real cuando los módulos son altamente interdependientes. Gestionar sagas distribuidas para lo que en un monolito es un commit ACID es meses de trabajo.',
                  },
                ],
              },
              {
                title: 'Considera microservicios cuando...',
                color: 'emerald',
                icon: GitBranch,
                items: [
                  {
                    signal: 'Tienes 2+ equipos independientes y Conway\'s Law está en juego',
                    why: 'La arquitectura debe reflejar la estructura de equipos (o viceversa). Si tienes equipos de producto independientes, los microservicios les dan autonomía real para desplegar sin coordinación.',
                  },
                  {
                    signal: 'Un módulo específico tiene requisitos de escala muy diferentes',
                    why: 'Si tu servicio de procesamiento de vídeo necesita 20x más recursos que el resto de la app, extraerlo como microservicio tiene sentido económico claro. Sin ese caso específico, no.',
                  },
                  {
                    signal: 'Necesitas SLAs de disponibilidad por módulo (99.9%+ en partes críticas)',
                    why: 'El aislamiento de fallos de los microservicios es una ventaja real cuando el uptime de partes específicas del sistema tiene impacto económico directo (pagos, autenticación).',
                  },
                  {
                    signal: 'Has superado los 500k€ ARR y tienes al menos 8 devs',
                    why: 'Con tracción real y un equipo capaz de gestionar la complejidad operativa, los microservicios empiezan a pagar su coste. Por debajo de este umbral, el ROI raramente se justifica.',
                  },
                ],
              },
            ].map((group) => (
              <div
                key={group.title}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      group.color === 'cyan' ? 'bg-cyan-500/10' : 'bg-emerald-500/10'
                    }`}
                  >
                    <group.icon
                      className={`w-5 h-5 ${group.color === 'cyan' ? 'text-cyan-400' : 'text-emerald-400'}`}
                    />
                  </div>
                  <h3 className="font-bold text-white">{group.title}</h3>
                </div>
                <div className="space-y-4">
                  {group.items.map((item) => (
                    <div key={item.signal} className="pl-4 border-l-2 border-zinc-700">
                      <p
                        className={`font-semibold text-sm mb-1 ${
                          group.color === 'cyan' ? 'text-cyan-300' : 'text-emerald-300'
                        }`}
                      >
                        {item.signal}
                      </p>
                      <p className="text-zinc-400 text-sm leading-relaxed">{item.why}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Árbol de decisión */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6">Árbol de decisión: 5 preguntas</h2>
          <p className="text-zinc-300 leading-relaxed mb-6">
            Si no tienes claro qué arquitectura elegir, responde estas 5 preguntas en orden. La
            primera respuesta afirmativa determina tu decisión.
          </p>

          <div className="space-y-3">
            {[
              {
                n: '01',
                question: '¿Tu equipo de desarrollo tiene menos de 6 personas?',
                answer: 'SÍ',
                result: '→ Monolito modular. Sin excepciones.',
                color: 'cyan',
              },
              {
                n: '02',
                question: '¿Tienes menos de 50.000 usuarios activos o 200k€ ARR?',
                answer: 'SÍ',
                result: '→ Monolito modular. La complejidad añadida no tiene ROI a esta escala.',
                color: 'cyan',
              },
              {
                n: '03',
                question:
                  '¿Existe un módulo con requisitos de escala 10x diferentes al resto?',
                answer: 'SÍ',
                result:
                  '→ Extrae SOLO ese módulo como microservicio. El resto sigue siendo monolito.',
                color: 'amber',
              },
              {
                n: '04',
                question:
                  '¿Tienes equipos de producto completamente independientes (+8 devs en total)?',
                answer: 'SÍ',
                result:
                  '→ Migración incremental a microservicios siguiendo los límites de dominio del monolito modular.',
                color: 'emerald',
              },
              {
                n: '05',
                question:
                  '¿Tienes SLAs contractuales de disponibilidad por módulo y presupuesto para Platform Engineering?',
                answer: 'SÍ',
                result:
                  '→ Microservicios con infraestructura gestionada (EKS, GKE, service mesh). Necesitarás al menos 1 SRE dedicado.',
                color: 'emerald',
              },
            ].map((step) => (
              <div
                key={step.n}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex items-start gap-4"
              >
                <span className="text-2xl font-black text-zinc-700 leading-none mt-0.5 w-8 shrink-0">
                  {step.n}
                </span>
                <div className="flex-1">
                  <p className="text-white font-medium mb-2">{step.question}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        step.color === 'cyan'
                          ? 'bg-cyan-500/15 text-cyan-400'
                          : step.color === 'amber'
                            ? 'bg-amber-500/15 text-amber-400'
                            : 'bg-emerald-500/15 text-emerald-400'
                      }`}
                    >
                      {step.answer}
                    </span>
                    <p className="text-zinc-400 text-sm">{step.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Errores frecuentes */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0" />
            Los 5 errores de arquitectura que destruyen equipos SaaS
          </h2>

          <div className="space-y-4">
            {[
              {
                n: '01',
                title: 'Distributed monolith: lo peor de los dos mundos',
                detail:
                  'Empezar con microservicios sin respetar los límites de dominio genera un "distributed monolith": servicios que parecen independientes pero tienen acoplamiento tan fuerte que un deploy de uno requiere actualizar cinco. Toda la complejidad de los microservicios, cero de sus ventajas.',
                cost: 'Coste: ciclos de deploy de horas, debugging imposible, imposibilidad de escalar equipos.',
              },
              {
                n: '02',
                title: 'Sincronizar la base de datos entre microservicios',
                detail:
                  'La base de datos compartida entre microservicios es el patrón más frecuente y el más destructivo. Elimina el aislamiento de datos, crea acoplamiento entre servicios y hace imposibles los deploys independientes. Cada microservicio DEBE tener su propia base de datos.',
                cost: 'Coste: imposibilidad de hacer cambios de esquema sin coordinación global de todos los equipos.',
              },
              {
                n: '03',
                title: 'Empezar a refactorizar el monolito sin extraer primero los límites',
                detail:
                  'Migrar un monolito spaghetti directamente a microservicios sin haber definido primero los dominios es como construir habitaciones en un edificio sin planos. El resultado es una arquitectura que refleja la deuda técnica del monolito original.',
                cost: 'Coste: 6-18 meses de migración que pueden terminar abortándose a mitad del proceso.',
              },
              {
                n: '04',
                title: 'Infraestructura de microservicios sin equipo de Platform Engineering',
                detail:
                  'Kubernetes, Istio, distributed tracing, circuit breakers, API gateway... Los microservicios necesitan una capa de plataforma que en empresas medianas ocupa a 2-4 personas. Sin ese equipo, los developers pasan más tiempo gestionando infra que construyendo producto.',
                cost: 'Coste: 30-50% del tiempo de los developers en tareas de infraestructura y no en producto.',
              },
              {
                n: '05',
                title: 'Olvidarse de la observabilidad distribuida desde el día 1',
                detail:
                  'En un monolito, un stack trace te dice exactamente qué pasó. En microservicios, un request puede pasar por 8 servicios antes de fallar. Sin distributed tracing (Jaeger, Zipkin, Datadog APM) implementado desde el primer día, un bug de producción puede tardar días en diagnosticarse.',
                cost: 'Coste: MTTR (Mean Time To Recovery) 5-10x mayor que en arquitecturas monolíticas bien mantenidas.',
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
                      ⚠️ {err.cost}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Caso real */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-emerald-400 shrink-0" />
            Caso real: de microservicios prematuros a monolito modular y vuelta a crecer
          </h2>

          <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-700 rounded-2xl p-8">
            <p className="text-sm text-zinc-500 uppercase tracking-widest mb-4">
              Caso real — Madrid, 2024-2025
            </p>

            <p className="text-zinc-300 leading-relaxed mb-6">
              <strong className="text-white">DataFlow</strong> es una plataforma SaaS de
              inteligencia de negocio para distribuidores. Arrancaron con una arquitectura de
              microservicios desde el día 1, influenciados por un CTO anterior con experiencia
              en empresas de +500 empleados. El equipo era de 4 personas.
            </p>

            <div className="space-y-4 mb-6">
              {[
                {
                  phase: 'Mes 1-6',
                  situation: 'Microservicios desde cero con 4 devs',
                  result:
                    '8 servicios, Kubernetes en GKE, RabbitMQ para mensajería. El 60% del tiempo del equipo fue en infraestructura. Solo lanzaron 3 features en 6 meses.',
                  tag: 'Crisis',
                  color: 'red',
                },
                {
                  phase: 'Mes 7',
                  situation: 'Decisión: vuelta al monolito modular',
                  result:
                    'Fusionaron los 8 servicios en 1 monolito modular (NestJS + PostgreSQL). Mantuvieron los límites de dominio de los servicios pero eliminaron la infraestructura distribuida. Migración: 3 semanas.',
                  tag: 'Pivote arquitectónico',
                  color: 'amber',
                },
                {
                  phase: 'Mes 8-12',
                  situation: 'Monolito modular en Vercel + Supabase',
                  result:
                    'Velocidad de features x4. Infraestructura mensual: de 1.800€ a 210€. Primeros 40 clientes de pago. ARR: 85k€.',
                  tag: 'Tracción',
                  color: 'emerald',
                },
                {
                  phase: 'Mes 18',
                  situation: 'Extracción del módulo de ML como microservicio',
                  result:
                    'El módulo de predicción de demanda tenía requisitos de GPU y escala 20x el resto. Lo extrajeron quirúrgicamente. El monolito siguió siendo monolito.',
                  tag: 'Microservicio justificado',
                  color: 'emerald',
                },
                {
                  phase: 'Mes 24',
                  situation: 'Arquitectura híbrida consolidada',
                  result:
                    'Monolito modular (95% del código) + 1 microservicio de ML. ARR: 320k€. Equipo: 7 personas. MTTR bajó de 4h a 25 minutos.',
                  tag: 'Éxito',
                  color: 'emerald',
                },
              ].map((step) => (
                <div key={step.phase} className="flex items-start gap-4">
                  <div className="text-xs font-mono text-zinc-500 w-16 shrink-0 pt-1">
                    {step.phase}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <p className="text-sm font-semibold text-white">{step.situation}</p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          step.color === 'red'
                            ? 'bg-red-500/15 text-red-400'
                            : step.color === 'amber'
                              ? 'bg-amber-500/15 text-amber-400'
                              : 'bg-emerald-500/15 text-emerald-400'
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
                { label: 'Reducción coste infra', value: '-88%' },
                { label: 'Aumento velocidad features', value: '4x' },
                { label: 'ARR mes 24', value: '320k€' },
                { label: 'MTTR (producción)', value: '25 min' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-emerald-400 mb-1">{stat.value}</p>
                  <p className="text-xs text-zinc-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7: Guía de migración incremental */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <GitBranch className="w-6 h-6 text-emerald-400 shrink-0" />
            Cómo migrar un monolito a microservicios sin parar el negocio
          </h2>
          <p className="text-zinc-300 leading-relaxed mb-6">
            Si llegas al punto en que la migración está justificada, el patrón Strangler Fig es
            el más seguro. No hay big-bang rewrites. Extraes servicio a servicio, validando en
            producción cada paso.
          </p>

          <div className="space-y-4">
            {[
              {
                step: 'Paso 1',
                name: 'Mapear dominios bounded contexts',
                duration: '1-2 semanas',
                detail:
                  'Antes de tocar código, dibuja el mapa de contextos de tu monolito: qué módulos existen, qué datos poseen, qué contratos tienen entre sí. Esta fase define el éxito de todo lo demás.',
                output: 'Diagrama de contextos delimitados + matriz de dependencias entre módulos',
              },
              {
                step: 'Paso 2',
                name: 'Limpiar el monolito: módulos con interfaces claras',
                duration: '2-4 semanas',
                detail:
                  'Refactoriza el monolito para que cada dominio tenga su propia carpeta, sus modelos aislados y se comunique con el resto solo a través de interfaces definidas. Este paso es obligatorio antes de extraer nada.',
                output: 'Monolito modular con límites de dominio explícitos',
              },
              {
                step: 'Paso 3',
                name: 'Extraer el servicio con menos dependencias primero',
                duration: '3-6 semanas',
                detail:
                  'Elige el dominio con menos coupling con el resto (normalmente notificaciones, emails o un módulo de reporting). Impleméntalo como servicio independiente y redirige el tráfico gradualmente usando el patrón Strangler.',
                output: 'Primer microservicio en producción recibiendo tráfico real',
              },
              {
                step: 'Paso 4',
                name: 'Instrumentar observabilidad distribuida',
                duration: '1-2 semanas',
                detail:
                  'Antes de extraer más servicios: distributed tracing (Datadog, Jaeger o similar), correlation IDs en todos los logs, alertas de latencia por servicio. Sin esto, el debugging en producción es inmanejable.',
                output: 'Dashboard de trazas distribuidas y SLOs por servicio',
              },
              {
                step: 'Paso 5',
                name: 'Extraer servicios incrementalmente, validando en producción',
                duration: 'Meses-años',
                detail:
                  'Continúa extrayendo dominios uno a uno, siempre con criterio claro: ¿qué problema resuelve esta extracción? El monolito puede convivir indefinidamente con los microservicios ya extraídos.',
                output: 'Arquitectura híbrida estable optimizada para el tamaño real del equipo',
              },
            ].map((step, i) => (
              <div key={step.step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                    <span className="text-emerald-400 text-xs font-bold">{i + 1}</span>
                  </div>
                  {i < 4 && <div className="w-px flex-1 bg-zinc-800 mt-2" />}
                </div>
                <div className="flex-1 pb-6">
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-semibold text-white">{step.name}</h3>
                      <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-3">{step.detail}</p>
                    <p className="text-xs text-emerald-400 bg-emerald-500/5 rounded-lg px-3 py-2">
                      Output: {step.output}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Checklist */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
            Checklist: antes de adoptar microservicios
          </h2>
          <p className="text-zinc-300 leading-relaxed mb-6">
            Si no puedes marcar al menos 8 de estos 10 puntos, los microservicios te costarán
            más de lo que te ahorran.
          </p>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="space-y-3">
              {[
                'Mi monolito ya tiene módulos con límites de dominio claros y bien definidos',
                'El equipo tiene al menos 8 desarrolladores con experiencia en sistemas distribuidos',
                'Hay al menos 1 persona dedicada a Platform Engineering / SRE',
                'Tenemos distributed tracing implementado y funcionando en producción',
                'Existe un API gateway o BFF (Backend for Frontend) definido',
                'Los límites de cada servicio propuesto están justificados por necesidad real de escala o autonomía de equipo',
                'Cada servicio tiene su propia base de datos (sin base de datos compartida)',
                'Tenemos CI/CD independiente por servicio y pipelines automatizados',
                'El equipo entiende event-driven architecture y eventual consistency',
                'El coste de infraestructura adicional está justificado por el ahorro operativo o el incremento de velocidad',
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
            ¿Necesitas ayuda con la arquitectura de tu SaaS?
          </h2>
          <p className="text-zinc-300 max-w-xl mx-auto mb-8 leading-relaxed">
            En Think Better diseñamos arquitecturas que escalan sin matar la velocidad de tu
            equipo. Empezamos con monolito modular, extraemos microservicios cuando hay justificación
            real. Precio cerrado, código 100% tuyo desde el día 1.
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
