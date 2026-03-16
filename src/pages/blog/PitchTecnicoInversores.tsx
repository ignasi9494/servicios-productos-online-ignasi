import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Target,
  Zap,
  Shield,
  Users,
  BarChart3,
} from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePageMeta } from '../../hooks/usePageMeta';

export function PitchTecnicoInversores() {
  usePageTitle('Cómo hacer un pitch técnico que convenza a inversores — Think Better');
  usePageMeta(
    'Los inversores no son técnicos pero detectan la falta de rigor al instante. Guía completa con estructura, métricas clave, errores fatales y plantilla de slide técnico para rondas seed y serie A.',
  );

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Cómo hacer un pitch técnico que convenza a inversores',
      description:
        'Los inversores no son técnicos pero detectan la falta de rigor al instante. Guía completa con estructura, métricas clave, errores fatales y plantilla de slide técnico para rondas seed y serie A.',
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
          'https://servicios-productos-online-ignasi.vercel.app/blog/pitch-tecnico-inversores-2026',
      },
    };
    const script = document.createElement('script');
    script.id = 'article-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      document.getElementById('article-schema')?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      {/* Navbar */}
      <nav className="border-b border-zinc-900 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-white font-bold text-lg hover:text-emerald-400 transition-colors">
            Think Better
          </Link>
          <Link
            to="/cuestionario"
            className="px-4 py-2 rounded-full bg-emerald-500 text-zinc-950 font-bold text-sm hover:bg-emerald-400 transition-colors flex items-center gap-1.5"
          >
            Calcular precio de mi proyecto
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors text-sm mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al blog
          </Link>

          {/* Header */}
          <div className="mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
              Startup
            </span>
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
              Cómo hacer un pitch técnico que convenza a inversores
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed mb-6">
              Los inversores no son técnicos, pero detectan la falta de rigor al instante. Guía completa con
              estructura, métricas clave, errores fatales y plantilla de slide técnico para rondas seed y serie A.
            </p>
            <div className="flex items-center gap-4 text-sm text-zinc-500">
              <span>16 mar 2026</span>
              <span>·</span>
              <span>10 min de lectura</span>
              <span>·</span>
              <span>Think Better</span>
            </div>
          </div>

          <div className="article-body space-y-8">

            {/* Intro */}
            <p>
              Has pasado seis meses construyendo el producto. Sabes exactamente cómo funciona cada microservicio,
              por qué elegiste PostgreSQL en lugar de MongoDB y qué hace especial tu modelo de ML.
              El problema: tienes 12 minutos para explicárselo a alguien que invierte en 30 startups al año,
              no sabe la diferencia entre REST y GraphQL, y ha escuchado la misma historia doscientas veces.
            </p>
            <p>
              El pitch técnico no es un examen de arquitectura. Es una narrativa de <strong>ventaja competitiva
              y escalabilidad</strong>. En este artículo te explicamos cómo construirla.
            </p>

            {/* Section 1 */}
            <h2>Por qué el 80% de los pitches técnicos fallan</h2>
            <p>
              Después de revisar más de 50 decks de startups tecnológicas en España, hemos identificado
              tres patrones que matan un pitch antes de que el inversor pase de la diapositiva 3:
            </p>

            <div className="grid gap-4">
              {[
                {
                  icon: <XCircle className="w-5 h-5 text-red-400" />,
                  title: 'Hablan de tecnología, no de ventaja',
                  desc: '"Usamos microservicios con Kubernetes" no es una ventaja competitiva. "Nuestra arquitectura nos permite incorporar nuevos mercados en 2 días en lugar de 3 meses" sí lo es.',
                },
                {
                  icon: <XCircle className="w-5 h-5 text-red-400" />,
                  title: 'Demasiado detalle técnico, cero contexto de negocio',
                  desc: 'Un inversor de serie A no necesita saber el esquema de tu base de datos. Necesita saber que tu tech stack te permite operar con 3 ingenieros lo que la competencia hace con 15.',
                },
                {
                  icon: <XCircle className="w-5 h-5 text-red-400" />,
                  title: 'No responden a los miedos implícitos del inversor',
                  desc: 'El inversor siempre está pensando: ¿Esto escala? ¿Qué pasa si el CTO se va? ¿Pueden copiar esto en 6 meses? Si tu pitch no responde estas preguntas, lo hace el silencio.',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
                  <div className="mt-0.5 shrink-0">{item.icon}</div>
                  <div>
                    <p className="font-semibold text-white mb-1">{item.title}</p>
                    <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Section 2 */}
            <h2>La estructura que funciona: el pitch técnico en 5 bloques</h2>
            <p>
              Hemos destilado la estructura que usan los founders que consiguen cerrar rondas seed y serie A
              en España. No es un deck de 40 diapositivas; es una narrativa de 5 bloques que responde
              exactamente lo que el inversor necesita saber.
            </p>

            <div className="space-y-4">
              {[
                {
                  num: '01',
                  icon: <Target className="w-5 h-5 text-emerald-400" />,
                  title: 'El problema y la brecha técnica',
                  content:
                    'Empieza por el problema real, no por la solución. Luego muestra que el problema existe porque la tecnología actual no puede resolverlo de la forma correcta. Esto es la "brecha técnica" que tu startup llena.',
                  example:
                    'Ejemplo: "El 73% de las clínicas en España siguen usando Excel para gestionar citas. No porque no existan software de gestión, sino porque ninguno se integra con el sistema de prescripción electrónica del SNS. Nosotros sí."',
                },
                {
                  num: '02',
                  icon: <Zap className="w-5 h-5 text-emerald-400" />,
                  title: 'La ventaja técnica diferencial',
                  content:
                    'Aquí describes QUÉ hace tu tech de forma diferente, pero siempre en términos de resultado de negocio. Responde: ¿qué puedes hacer tú que un competidor con 10x tu equipo tardaría años en replicar?',
                  example:
                    'Ejemplo: "Nuestro modelo de NLP está entrenado con 2 millones de notas clínicas reales (anonimizadas, con consentimiento). El siguiente competidor tendría que conseguir ese dataset antes de poder entrenar. Eso nos da 18 meses de ventaja mínima."',
                },
                {
                  num: '03',
                  icon: <BarChart3 className="w-5 h-5 text-emerald-400" />,
                  title: 'Las métricas de escalabilidad',
                  content:
                    'Los inversores quieren saber que el negocio puede crecer 10x sin que los costes crezcan 10x. Muestra cómo tu arquitectura soporta el crecimiento. Datos concretos, no vagueadas sobre "escalar en la nube".',
                  example: '',
                },
                {
                  num: '04',
                  icon: <Shield className="w-5 h-5 text-emerald-400" />,
                  title: 'Las barreras de entrada (moat técnico)',
                  content:
                    'El moat técnico es lo que hace que sea difícil para un competidor copiarte. Puede ser datos propietarios, efectos de red, integraciones costosas de replicar, patentes, o simplemente la velocidad de tu equipo.',
                  example: '',
                },
                {
                  num: '05',
                  icon: <Users className="w-5 h-5 text-emerald-400" />,
                  title: 'El equipo técnico y la ejecución',
                  content:
                    'Termina con por qué VOSOTROS podéis ejecutar esto. No es solo el CV del CTO. Es la combinación de experiencia técnica + conocimiento del dominio + velocidad de entrega demostrada.',
                  example: '',
                },
              ].map((block) => (
                <div key={block.num} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl font-black text-zinc-700">{block.num}</span>
                    <div className="flex items-center gap-2">
                      {block.icon}
                      <h3 className="font-bold text-white">{block.title}</h3>
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-3">{block.content}</p>
                  {block.example && (
                    <div className="mt-3 p-3 rounded-xl bg-zinc-800 border-l-2 border-emerald-500">
                      <p className="text-zinc-300 text-sm leading-relaxed italic">{block.example}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Section 3 */}
            <h2>Las métricas técnicas que los inversores realmente miden</h2>
            <p>
              No todas las métricas técnicas son iguales. Los inversores de early stage y los de growth
              miran cosas distintas. Aquí la tabla de lo que importa en cada fase:
            </p>

            <div className="overflow-x-auto rounded-2xl border border-zinc-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900">
                    <th className="text-left p-4 text-zinc-400 font-semibold">Métrica</th>
                    <th className="text-center p-4 text-zinc-400 font-semibold">Pre-seed / Seed</th>
                    <th className="text-center p-4 text-zinc-400 font-semibold">Serie A</th>
                    <th className="text-center p-4 text-zinc-400 font-semibold">Por qué importa</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Tiempo de ciclo de desarrollo', '✓ Crítico', '✓ Importante', 'Velocidad de iteración = ventaja competitiva'],
                    ['Coste por usuario activo (infra)', '✓ Crítico', '✓ Crítico', 'Determina los unit economics reales'],
                    ['Disponibilidad (uptime)', '○ Opcional', '✓ Crítico', 'Clientes enterprise exigen SLAs'],
                    ['Deuda técnica estimada', '✓ Crítico', '✓ Crítico', 'Señal de calidad del equipo'],
                    ['Tiempo hasta primer valor (TTFV)', '✓ Crítico', '✓ Importante', 'Predictor de retención temprana'],
                    ['Cobertura de tests', '○ Opcional', '✓ Importante', 'Señal de ingeniería madura'],
                    ['Ratio CAC técnico / CAC total', '○ Opcional', '✓ Crítico', 'Escalabilidad del modelo de distribución'],
                    ['Latencia P95', '○ Opcional', '✓ Importante', 'Experiencia de usuario en producción'],
                  ].map(([metric, seed, serieA, why], i) => (
                    <tr key={i} className={`border-b border-zinc-800/50 ${i % 2 === 0 ? 'bg-zinc-900/30' : ''}`}>
                      <td className="p-4 text-zinc-300 font-medium">{metric}</td>
                      <td className="p-4 text-center">
                        <span className={seed.includes('Crítico') ? 'text-emerald-400' : 'text-zinc-500'}>{seed}</span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={serieA.includes('Crítico') ? 'text-emerald-400' : 'text-zinc-500'}>{serieA}</span>
                      </td>
                      <td className="p-4 text-zinc-400 text-xs">{why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Section 4 */}
            <h2>Plantilla: el slide técnico perfecto</h2>
            <p>
              Muchos founders meten un diagrama de arquitectura incomprensible y llaman "slide técnico"
              a eso. Un buen slide técnico tiene exactamente cuatro elementos:
            </p>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    label: 'TOP LEFT',
                    color: 'border-emerald-500/50',
                    title: '¿Qué hace diferente nuestra tecnología?',
                    content: '1-2 frases. Sin jerga. En términos de resultado: "Procesamos datos 40x más rápido que el estándar de la industria porque..."',
                  },
                  {
                    label: 'TOP RIGHT',
                    color: 'border-cyan-500/50',
                    title: '¿Por qué es difícil de copiar?',
                    content: 'El moat. Datos propietarios, efectos de red, tiempo de entrenamiento, integraciones críticas, patentes pendientes.',
                  },
                  {
                    label: 'BOTTOM LEFT',
                    color: 'border-purple-500/50',
                    title: 'La métrica de escala',
                    content: 'Un dato concreto que demuestre que el coste marginal decrece. Ej: "Cada nuevo cliente reduce en 2% el coste de infra por usuario."',
                  },
                  {
                    label: 'BOTTOM RIGHT',
                    color: 'border-amber-500/50',
                    title: 'Prueba de ejecución',
                    content: 'La demostración de que podéis construirlo. Tiempo hasta MVP, iteraciones en producción, clientes actuales en vivo.',
                  },
                ].map((q) => (
                  <div key={q.label} className={`p-4 rounded-xl border ${q.color} bg-zinc-800/50`}>
                    <span className="text-xs text-zinc-600 font-mono mb-2 block">{q.label}</span>
                    <p className="text-white text-sm font-semibold mb-2">{q.title}</p>
                    <p className="text-zinc-400 text-xs leading-relaxed">{q.content}</p>
                  </div>
                ))}
              </div>
              <p className="text-zinc-500 text-xs mt-4 text-center">
                Si necesitas más de una diapositiva para explicar tu ventaja técnica, probablemente no la tienes clara tú mismo.
              </p>
            </div>

            {/* Section 5 — Case study */}
            <h2>Caso real: de "no lo entendemos" a ronda cerrada en 6 semanas</h2>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
              <div className="flex items-start gap-3 mb-4">
                <TrendingUp className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-white font-semibold">DataFlow Analytics — Barcelona, 2025</p>
                  <p className="text-zinc-500 text-sm">Pipeline de datos para pymes industriales</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-zinc-400 text-sm font-semibold mb-1">Situación inicial</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    El equipo llevaba 3 meses en conversaciones con inversores. La respuesta siempre era la misma:
                    "Es complicado, necesitamos pensarlo." Su deck tenía 8 diapositivas de arquitectura técnica
                    y ninguna que explicara por qué era un buen negocio.
                  </p>
                </div>
                <div>
                  <p className="text-zinc-400 text-sm font-semibold mb-1">El problema real</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Tenían una ventaja técnica real (procesamiento de datos industriales sin ETL personalizado)
                    pero la explicaban como un problema de ingeniería, no como una ventaja de negocio.
                    Los inversores no entendían por qué eso les importaba.
                  </p>
                </div>
                <div>
                  <p className="text-zinc-400 text-sm font-semibold mb-1">El cambio</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Reescribieron su slide técnico con la estructura de los 4 cuadrantes. La ventaja pasó de
                    ser "arquitectura serverless con procesamiento en streaming" a ser "una empresa de 50
                    empleados puede conectar sus máquinas de fábrica a un dashboard analítico en 48 horas,
                    sin un equipo de IT dedicado". El moat: su conector universal compatible con los 12
                    PLCs más usados en España (3 años de ingeniería acumulada).
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  {[
                    { label: 'Tiempo hasta cierre', value: '6 semanas', color: 'text-emerald-400' },
                    { label: 'Ronda cerrada', value: '400.000€', color: 'text-emerald-400' },
                    { label: 'Reuniones necesarias', value: '3', color: 'text-emerald-400' },
                  ].map((s) => (
                    <div key={s.label} className="text-center p-3 rounded-xl bg-zinc-800">
                      <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
                      <p className="text-zinc-500 text-xs mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 6 — Errores fatales */}
            <h2>Los 5 errores fatales del pitch técnico</h2>

            <div className="space-y-3">
              {[
                {
                  num: 1,
                  title: 'Demostrar el producto antes de establecer el problema',
                  desc: 'Si el inversor no entiende por qué existe el problema, la demo no tiene contexto y no impresiona. Siempre problema → brecha → solución.',
                },
                {
                  num: 2,
                  title: 'Usar benchmarks que nadie conoce',
                  desc: '"Somos 3x más rápidos que la media del sector" es vacío si no defines la media. Usa comparaciones con competidores conocidos o con el proceso manual actual.',
                },
                {
                  num: 3,
                  title: 'Prometer "escalabilidad infinita" sin números',
                  desc: 'Todos los founders dicen que su producto escala. Los que convencen dicen: "Nuestro coste de infra por usuario baja de 8€ a 0,40€ cuando llegamos a 10.000 usuarios, según nuestros benchmarks actuales."',
                },
                {
                  num: 4,
                  title: 'El slide de "competencia" con ventajas inventadas',
                  desc: 'La tabla de ✓ y ✗ donde tú tienes todos los ✓ es una red flag inmediata. Los inversores lo ven constantemente. Sé honesto: "En precio somos más caros que X, pero nuestro tiempo de integración es 10x menor."',
                },
                {
                  num: 5,
                  title: 'No tener respuesta para "¿qué pasa si Google lo copia?"',
                  desc: 'Es la pregunta trampa más común. La respuesta correcta no es "no pueden". Es: "Si Google lo copiara mañana, necesitarían 3 años para tener nuestros datos de entrenamiento / nuestras integraciones / nuestros contratos enterprise."',
                },
              ].map((e) => (
                <div key={e.num} className="flex gap-4 p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
                  <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                    <span className="text-red-400 text-sm font-bold">{e.num}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">{e.title}</p>
                    <p className="text-zinc-400 text-sm leading-relaxed">{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Section 7 — Preguntas que hacen los inversores */}
            <h2>Las 10 preguntas técnicas que siempre hacen los inversores</h2>
            <p>
              Prepara respuestas de menos de 2 minutos para cada una de estas. Si tartamudeas en alguna,
              el inversor asume que hay un problema que no has querido mencionar.
            </p>

            <div className="space-y-3">
              {[
                {
                  q: '¿Por qué este stack tecnológico y no otro?',
                  a: 'Explica el tradeoff concreto. No digas "porque es el mejor". Di "elegimos X porque necesitábamos Y y la alternativa Z habría triplicado el tiempo de desarrollo para esta funcionalidad específica".',
                },
                {
                  q: '¿Cuánto cuesta vuestra infraestructura al mes con X usuarios?',
                  a: 'Ten los números exactos. Si no los tienes, el inversor asume que no controlas tus unit economics. Bonus: muestra la curva de cómo baja el coste con el volumen.',
                },
                {
                  q: '¿Qué pasa si vuestro CTO se va mañana?',
                  a: 'La respuesta no es "no se va a ir". Es: "El conocimiento está documentado en X, el equipo ya tiene Y personas que dominan Z parte del sistema, y en 30 días podríamos incorporar un sustituto porque...".',
                },
                {
                  q: '¿Cómo gestionáis la seguridad de los datos?',
                  a: 'Si manejas datos sensibles (salud, financiero, legal), tienes que tener esto impecable: GDPR, cifrado en reposo y tránsito, auditorías, política de acceso. Sin esto, ningún cliente enterprise te comprará.',
                },
                {
                  q: '¿Cuánto tiempo llevaría a un equipo de 5 ingenieros replicar vuestro producto?',
                  a: 'Es la pregunta del moat. Si la respuesta es "6 meses", tienes un problema. Necesitas que sea "nunca, porque necesitarían X que nosotros hemos acumulado durante Y años".',
                },
                {
                  q: '¿Cuál es vuestra mayor deuda técnica?',
                  a: 'Sé honesto. Los inversores esperan deuda técnica en una startup early stage. Lo que no esperan es que no sepas cuál es. Nombrala, cuantifícala en esfuerzo, y explica cuándo y cómo la resolveréis.',
                },
                {
                  q: '¿Cómo saben los clientes que el producto funciona?',
                  a: 'Métricas de SLA, dashboard de status público, alertas automáticas, caso de estudio de incidente resuelto. La transparencia ante fallos genera más confianza que la promesa de no fallar nunca.',
                },
                {
                  q: '¿Qué integración es la más crítica para el cliente y cómo la protegéis?',
                  a: 'Identifica el punto de dependencia más vulnerable. Un inversor que hace due diligence va a encontrarlo. Mejor que lo descubra por tu boca con un plan de mitigación que por la suya como un riesgo oculto.',
                },
                {
                  q: '¿Qué parte del producto es imposible de construir externamente?',
                  a: 'Esta es tu IP real. Si la respuesta es "ninguna", puede que no tengas un negocio tecnológico, sino un servicio de consultoría con un interfaz bonito.',
                },
                {
                  q: '¿Cómo escala el equipo técnico para pasar de 100 a 10.000 clientes?',
                  a: 'Ten un plan concreto: qué se automatiza, qué necesita más personas, qué se externaliza. "Contrataremos más ingenieros" no es un plan de escalabilidad.',
                },
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800">
                  <p className="font-semibold text-white mb-2 flex items-start gap-2">
                    <span className="text-emerald-400 shrink-0">{i + 1}.</span>
                    {item.q}
                  </p>
                  <p className="text-zinc-400 text-sm leading-relaxed pl-5">{item.a}</p>
                </div>
              ))}
            </div>

            {/* Section 8 — Checklist */}
            <h2>Checklist: tu pitch técnico está listo si...</h2>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
              <div className="space-y-3">
                {[
                  'Puedo explicar mi ventaja técnica en 30 segundos sin usar jerga técnica',
                  'Tengo el coste de infraestructura por usuario a escala (100 / 1.000 / 10.000 clientes)',
                  'Puedo nombrar y cuantificar mi mayor deuda técnica',
                  'Tengo una respuesta a "¿cuánto tarda un competidor en copiarte?" de más de 12 meses',
                  'Mi slide técnico tiene los 4 cuadrantes: ventaja, moat, métricas de escala y prueba de ejecución',
                  'He practicado responder las 10 preguntas técnicas en menos de 2 minutos cada una',
                  'El diagrama técnico (si lo incluyo) puede entenderlo alguien sin background técnico',
                  'Tengo un caso de uso concreto que ilustra la ventaja en términos de negocio',
                  'Mi plan de equipo técnico cubre qué pasa si el CTO no está disponible',
                  'He hecho al menos 5 simulacros de pitch con alguien que haga preguntas difíciles',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <p className="text-zinc-300 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning box */}
            <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-300 font-semibold mb-1">El error de timing más común</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    La mayoría de los founders empiezan a preparar el pitch técnico cuando ya tienen reuniones
                    programadas. Ese es el peor momento. El pitch técnico debería surgir de la claridad
                    interna del equipo sobre su ventaja competitiva. Si no puedes explicarla antes de hablar
                    con inversores, hay un problema estratégico que el pitch no puede resolver.
                  </p>
                </div>
              </div>
            </div>

            {/* Conclusion */}
            <h2>Conclusión: la tecnología no convence, la ventaja sí</h2>
            <p>
              Un inversor que no entiende tu código puede perfectamente entender que tu empresa puede
              incorporar nuevos mercados en 2 días mientras la competencia tarda 3 meses. Puede entender
              que cada nuevo cliente reduce tu coste marginal de infraestructura. Puede entender que tienes
              un dataset de 3 años que ningún competidor puede replicar en menos de 5.
            </p>
            <p>
              Ese es el trabajo del pitch técnico: traducir la excelencia de ingeniería en ventaja competitiva
              sostenible. No se trata de simplificar la tecnología; se trata de elevarla al nivel de
              la estrategia de negocio.
            </p>
            <p>
              Si estás construyendo tu producto digital y quieres asegurarte de que la arquitectura que
              elegimos hoy te dé el moat técnico que necesitas para levantar ronda mañana,{' '}
              <Link to="/cuestionario" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2">
                cuéntanos tu proyecto
              </Link>
              . En 10 minutos de cuestionario, entendemos si lo que quieres construir tiene la base técnica
              para ser defensible a largo plazo.
            </p>

            {/* CTA */}
            <div className="mt-12 p-8 rounded-3xl bg-zinc-900 border border-zinc-800 text-center">
              <h3 className="text-2xl font-black text-white mb-3">
                ¿Construyendo el producto que vas a pitchear?
              </h3>
              <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
                Ayudamos a startups en España a construir productos técnicamente defensibles con stack moderno,
                código propio y documentación que supera cualquier due diligence técnica.
              </p>
              <Link
                to="/cuestionario"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 transition-colors"
              >
                Descubrir precio de mi proyecto
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
