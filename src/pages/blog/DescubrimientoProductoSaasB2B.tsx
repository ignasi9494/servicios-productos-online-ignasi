import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  Users,
  Target,
  Search,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Clock,
  FileText,
  Zap,
} from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePageMeta } from '../../hooks/usePageMeta';

export function DescubrimientoProductoSaasB2B() {
  usePageTitle(
    'De idea a producto: descubrimiento de producto para SaaS B2B — Think Better',
  );
  usePageMeta(
    'El proceso completo de product discovery para SaaS B2B: cómo pasar de una idea a un producto validado sin quemar presupuesto. Entrevistas, Jobs to Be Done, prototipos y métricas de validación con casos reales.',
  );

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline:
        'De idea a producto: el proceso de descubrimiento de producto para SaaS B2B',
      description:
        'Guía completa del proceso de product discovery para SaaS B2B. Cómo pasar de una idea a un producto validado: Jobs to Be Done, entrevistas de cliente, opportunity scoring, prototipos y métricas.',
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
          'https://servicios-productos-online-ignasi.vercel.app/blog/descubrimiento-producto-saas-b2b',
      },
    };
    const script = document.createElement('script');
    script.id = 'article-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById('article-schema');
      if (el) el.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      {/* Navbar */}
      <nav className="border-b border-zinc-900 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="text-white font-bold text-lg hover:text-emerald-400 transition-colors"
          >
            Think Better
          </Link>
          <Link
            to="/cuestionario"
            className="px-4 py-2 rounded-full bg-emerald-500 text-zinc-950 font-bold text-sm hover:bg-emerald-400 transition-colors flex items-center gap-1.5"
          >
            Descubrir precio de mi proyecto
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors text-sm mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al blog
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium">
              Product Management
            </span>
            <span className="text-zinc-500 text-sm flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              12 min de lectura
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            De idea a producto: el proceso de descubrimiento de producto para
            SaaS B2B
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            El 85% de los SaaS B2B fracasan por construir lo que el fundador
            quiere, no lo que el mercado necesita. Product discovery es el
            proceso sistemático que separa los productos que triunfan de los
            que queman el presupuesto.
          </p>
          <div className="mt-6 pt-6 border-t border-zinc-800 flex items-center gap-4 text-sm text-zinc-500">
            <span>Think Better · Barcelona</span>
            <span>·</span>
            <span>16 mar 2026</span>
          </div>
        </motion.header>

        <div className="article-body space-y-10">
          {/* Intro callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-violet-500/5 border border-violet-500/20 rounded-2xl p-6"
          >
            <p className="text-zinc-300 leading-relaxed">
              <strong className="text-violet-400">El escenario más caro del desarrollo de software</strong> no es
              contratar al equipo equivocado ni elegir la tecnología
              incorrecta. Es construir el producto correcto de forma perfecta
              para un problema que nadie tiene urgencia de resolver.
              Product discovery es el antídoto.
            </p>
          </motion.div>

          {/* Section 1 — Qué es */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-violet-400 flex-shrink-0" />
              ¿Qué es product discovery y por qué existe?
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Product discovery es la fase que precede al desarrollo. Su objetivo
              es responder a una única pregunta:{' '}
              <strong className="text-zinc-200">
                ¿Merece la pena construir esto?
              </strong>{' '}
              No en términos de si es técnicamente posible (casi todo lo es),
              sino en términos de si existe demanda real, si los clientes
              pagarán por ello y si el equipo puede construirlo de forma rentable.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-4">
              El término fue popularizado por Marty Cagan en{' '}
              <em>Inspired: How to Create Tech Products Customers Love</em>, y
              hoy es el estándar en empresas como Spotify, Intercom o Notion.
              Para SaaS B2B, donde los ciclos de venta son largos y el coste
              de adquisición de cliente (CAC) es alto, la fase de discovery no
              es un lujo: es una obligación económica.
            </p>

            {/* Stat box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
              {[
                { stat: '85%', label: 'de SaaS B2B fallan por construir lo que no necesita el mercado', color: 'text-red-400' },
                { stat: '6×', label: 'más caro corregir un error en producción que en discovery', color: 'text-amber-400' },
                { stat: '3-4 sem', label: 'duración media de un buen proceso de discovery B2B', color: 'text-emerald-400' },
              ].map(({ stat, label, color }) => (
                <div
                  key={stat}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-center"
                >
                  <p className={`text-3xl font-bold mb-2 ${color}`}>{stat}</p>
                  <p className="text-zinc-400 text-sm leading-snug">{label}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Section 2 — Las 4 fases */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Target className="w-6 h-6 text-violet-400 flex-shrink-0" />
              Las 4 fases del product discovery para SaaS B2B
            </h2>

            {[
              {
                num: '01',
                title: 'Definir el problema (Problem Framing)',
                icon: <Search className="w-5 h-5" />,
                desc: 'Antes de hablar con clientes necesitas una hipótesis clara. Define el segmento de cliente objetivo (ICP), el dolor que crees que tienen y el contexto en el que ocurre. Sin esto, las entrevistas no tienen dirección.',
                items: [
                  'Escribe tu hipótesis en formato Jobs to Be Done: "Cuando [situación], quiero [motivación] para [resultado esperado]"',
                  'Define 3 asunciones críticas que, si son falsas, invalidan todo el negocio',
                  'Mapea las alternativas actuales del cliente (Excel, proceso manual, competidor)',
                  'Identifica quién tiene presupuesto: el usuario final raramente es quien paga en B2B',
                ],
                color: 'violet',
              },
              {
                num: '02',
                title: 'Investigación cualitativa (Customer Interviews)',
                icon: <MessageSquare className="w-5 h-5" />,
                desc: 'Las entrevistas de problema son la herramienta más potente y más infrautilizada del product discovery. No son demos de producto ni sesiones de validación: son conversaciones para entender el mundo del cliente.',
                items: [
                  'Habla con mínimo 8-12 potenciales clientes del mismo segmento ICP',
                  'Pregunta sobre el pasado, no sobre el futuro ("¿Cuándo fue la última vez que...?")',
                  'Nunca preguntes "¿Usarías este producto?" — siempre miente el sesgo de cortesía',
                  'Busca comportamientos, no opiniones: los workarounds que ya usan son oro puro',
                  'Script base: 5 min contexto → 10 min problema actual → 5 min consecuencias → 5 min alternativas',
                ],
                color: 'blue',
              },
              {
                num: '03',
                title: 'Síntesis y oportunidad (Opportunity Scoring)',
                icon: <TrendingUp className="w-5 h-5" />,
                desc: 'Con las entrevistas transcritas, el trabajo es extraer patrones. El framework de Opportunity Scoring de Tony Ulwick puntúa cada problema según importancia y satisfacción actual para priorizar qué construir.',
                items: [
                  'Lista todos los "jobs" y dolores detectados en las entrevistas',
                  'Puntúa importancia (1-10) y satisfacción actual (1-10) para cada uno',
                  'Fórmula de oportunidad: Importancia + max(0, Importancia − Satisfacción)',
                  'Prioriza los jobs con puntuación >10 y satisfacción <6',
                  'Valida que al menos 3 de cada 5 entrevistados comparten el problema top',
                ],
                color: 'emerald',
              },
              {
                num: '04',
                title: 'Prototipado y validación (Prototype & Test)',
                icon: <Zap className="w-5 h-5" />,
                desc: 'Antes de escribir una línea de código, valida la solución con el menor esfuerzo posible. En B2B, un prototipo puede ser desde un Figma clickable hasta una hoja de cálculo con un proceso manual.',
                items: [
                  'Prototipo de papel: 2-4h para un wireframe clickable en Figma o Whimsical',
                  'Concierge MVP: haz el trabajo manualmente para los primeros 3-5 clientes',
                  'Smoke test: landing con formulario + precio antes de construir el producto',
                  'Objetivo: 1-2 clientes dispuestos a pagar por el prototipo antes de construir',
                  'Señal de parada: si nadie firma un LOI (Letter of Intent) después de 10 demos, revisar hipótesis',
                ],
                color: 'amber',
              },
            ].map(({ num, title, icon, desc, items, color }) => (
              <div
                key={num}
                className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-5"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl bg-${color}-500/10 border border-${color}-500/20 flex items-center justify-center text-${color}-400 flex-shrink-0`}
                  >
                    {icon}
                  </div>
                  <div>
                    <span className={`text-xs font-mono text-${color}-400`}>
                      FASE {num}
                    </span>
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                  </div>
                </div>
                <p className="text-zinc-400 leading-relaxed mb-4">{desc}</p>
                <ul className="space-y-2">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-400">
                      <CheckCircle2 className={`w-4 h-4 text-${color}-400 flex-shrink-0 mt-0.5`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.section>

          {/* Section 3 — Jobs to Be Done */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <FileText className="w-6 h-6 text-violet-400 flex-shrink-0" />
              Jobs to Be Done: el framework que cambia cómo defines tu producto
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Jobs to Be Done (JTBD) es la forma más potente de entender qué compran
              realmente tus clientes. La premisa: los clientes no compran
              productos, contratan soluciones para hacer un trabajo (job). Cuando
              entiendes el job con precisión, el diseño del producto se vuelve obvio.
            </p>

            {/* JTBD Examples Table */}
            <div className="overflow-x-auto rounded-2xl border border-zinc-800 mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/50">
                    <th className="text-left px-4 py-3 text-zinc-400 font-medium">Producto SaaS B2B</th>
                    <th className="text-left px-4 py-3 text-zinc-400 font-medium">Lo que el cliente cree comprar</th>
                    <th className="text-left px-4 py-3 text-zinc-400 font-medium">El job real (JTBD)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      product: 'Software de RRHH',
                      surface: 'Gestionar nóminas y contratos',
                      real: 'Evitar sanciones legales y perder talento por errores administrativos',
                    },
                    {
                      product: 'CRM para pymes',
                      surface: 'Organizar contactos y pipelines',
                      real: 'No perder oportunidades de venta porque el equipo no sabe en qué estado están',
                    },
                    {
                      product: 'Herramienta de reporting',
                      surface: 'Crear dashboards y gráficas',
                      real: 'Convencer al consejo de administración de que las decisiones son correctas',
                    },
                    {
                      product: 'Software de logística',
                      surface: 'Optimizar rutas y almacén',
                      real: 'No recibir llamadas de clientes enfadados por retrasos en la entrega',
                    },
                    {
                      product: 'Plataforma de formación',
                      surface: 'Hospedar cursos y hacer seguimiento',
                      real: 'Demostrar a auditorías externas que el equipo cumple con certificaciones obligatorias',
                    },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className={`border-b border-zinc-800/50 ${i % 2 === 0 ? 'bg-zinc-900/20' : ''}`}
                    >
                      <td className="px-4 py-3 text-white font-medium">{row.product}</td>
                      <td className="px-4 py-3 text-zinc-400">{row.surface}</td>
                      <td className="px-4 py-3 text-emerald-400">{row.real}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-zinc-500 text-sm italic">
              El job real (columna verde) es lo que diferencia un producto mediocre de uno
              que genera NPS +60 y expansión de cuenta. Pregunte siempre: ¿qué pasa si
              este problema no se resuelve? La consecuencia es el job.
            </p>
          </motion.section>

          {/* Section 4 — Entrevistas de cliente */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Users className="w-6 h-6 text-violet-400 flex-shrink-0" />
              Script de entrevista de cliente B2B: 30 minutos que valen 30.000€
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Las entrevistas son la actividad de mayor ROI en product discovery.
              Hablar con 10 potenciales clientes durante 30 minutos te da más
              información que 6 meses de analítica de producto. Aquí el script
              exacto que usamos en Think Better antes de iniciar cualquier
              proyecto B2B.
            </p>

            <div className="space-y-4">
              {[
                {
                  time: '0–3 min',
                  phase: 'Contexto y rapport',
                  questions: [
                    '"¿Puedes contarme un poco sobre tu rol y en qué consiste tu día a día?"',
                    '"¿Cuál es el proceso que más tiempo te consume en [área del problema]?"',
                  ],
                  tip: 'Escucha activa. No interrumpas. Toma notas literales, no resúmenes.',
                  color: 'bg-violet-500/10 border-violet-500/20',
                  textColor: 'text-violet-400',
                },
                {
                  time: '3–12 min',
                  phase: 'Problema actual',
                  questions: [
                    '"¿Cuándo fue la última vez que tuviste este problema? ¿Puedes llevarme paso a paso por lo que pasó?"',
                    '"¿Qué hiciste para resolverlo? ¿Usaste alguna herramienta o lo hiciste manualmente?"',
                    '"¿Cuánto tiempo tardaste? ¿Cuántas personas estuvieron involucradas?"',
                  ],
                  tip: 'Busca comportamientos concretos, no hipótesis. "La última vez que..." es más valioso que "normalmente..."',
                  color: 'bg-blue-500/10 border-blue-500/20',
                  textColor: 'text-blue-400',
                },
                {
                  time: '12–20 min',
                  phase: 'Impacto y consecuencias',
                  questions: [
                    '"¿Qué pasa cuando este problema no se resuelve a tiempo?"',
                    '"¿Cómo afecta a otras personas del equipo o a otras áreas de la empresa?"',
                    '"¿Has intentado buscar una solución mejor? ¿Por qué no la encontraste o por qué no te convenció?"',
                  ],
                  tip: 'Las consecuencias revelan el job real. Si no hay consecuencias graves, el problema no es prioritario.',
                  color: 'bg-amber-500/10 border-amber-500/20',
                  textColor: 'text-amber-400',
                },
                {
                  time: '20–28 min',
                  phase: 'Presupuesto y decisión',
                  questions: [
                    '"¿Cuánto estáis gastando actualmente en resolver esto (herramientas + tiempo de equipo)?"',
                    '"Si existiera una solución perfecta, ¿quién sería el que toma la decisión de comprarla?"',
                    '"¿Qué haría que no comprarais algo así, aunque fuera perfecto?"',
                  ],
                  tip: 'En B2B el usuario y el comprador son personas diferentes. Identifica a ambos.',
                  color: 'bg-emerald-500/10 border-emerald-500/20',
                  textColor: 'text-emerald-400',
                },
                {
                  time: '28–30 min',
                  phase: 'Cierre y red',
                  questions: [
                    '"¿Hay algo que te parezca importante sobre este tema que no te haya preguntado?"',
                    '"¿Conoces a alguien más que tenga este problema con quien debería hablar?"',
                  ],
                  tip: 'El 40% de las mejores entrevistas vienen de referidos de entrevistas anteriores.',
                  color: 'bg-zinc-700/30 border-zinc-700',
                  textColor: 'text-zinc-400',
                },
              ].map(({ time, phase, questions, tip, color, textColor }) => (
                <div
                  key={phase}
                  className={`border rounded-2xl p-5 ${color}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-zinc-300">{phase}</span>
                    <span className={`text-xs font-mono ${textColor}`}>{time}</span>
                  </div>
                  <ul className="space-y-2 mb-3">
                    {questions.map((q, i) => (
                      <li key={i} className="text-sm text-zinc-300 italic">
                        {q}
                      </li>
                    ))}
                  </ul>
                  <p className={`text-xs ${textColor}`}>
                    <strong>Nota:</strong> {tip}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Section 5 — Señales de validación */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-violet-400 flex-shrink-0" />
              Señales de validación: cuándo discovery dice "adelante"
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              El mayor error en product discovery es confundir entusiasmo con
              validación. Un cliente diciendo "me parece una idea genial" no
              vale nada. Estas son las únicas señales que importan:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {[
                {
                  signal: 'Preguntan por el precio sin que tú lo menciones',
                  strength: 'Alta',
                  color: 'text-emerald-400',
                  bg: 'bg-emerald-500/5 border-emerald-500/20',
                },
                {
                  signal: 'Preguntan cuándo estará disponible',
                  strength: 'Alta',
                  color: 'text-emerald-400',
                  bg: 'bg-emerald-500/5 border-emerald-500/20',
                },
                {
                  signal: 'Piden ser betatesters o primeros clientes',
                  strength: 'Alta',
                  color: 'text-emerald-400',
                  bg: 'bg-emerald-500/5 border-emerald-500/20',
                },
                {
                  signal: 'Firman una Letter of Intent (LOI)',
                  strength: 'Definitiva',
                  color: 'text-violet-400',
                  bg: 'bg-violet-500/5 border-violet-500/20',
                },
                {
                  signal: '"Es una buena idea" sin seguir la conversación',
                  strength: 'Ninguna',
                  color: 'text-red-400',
                  bg: 'bg-red-500/5 border-red-500/20',
                },
                {
                  signal: '"Lo usaría si fuera gratis"',
                  strength: 'Negativa',
                  color: 'text-red-400',
                  bg: 'bg-red-500/5 border-red-500/20',
                },
                {
                  signal: 'Hacen preguntas técnicas detalladas sobre integración',
                  strength: 'Media-alta',
                  color: 'text-amber-400',
                  bg: 'bg-amber-500/5 border-amber-500/20',
                },
                {
                  signal: 'Te presentan a su jefe o al departamento de compras',
                  strength: 'Alta',
                  color: 'text-emerald-400',
                  bg: 'bg-emerald-500/5 border-emerald-500/20',
                },
              ].map(({ signal, strength, color, bg }) => (
                <div
                  key={signal}
                  className={`border rounded-xl p-4 ${bg}`}
                >
                  <p className="text-zinc-300 text-sm leading-snug mb-1.5">{signal}</p>
                  <span className={`text-xs font-medium ${color}`}>
                    Validación: {strength}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5">
              <p className="text-amber-300 font-medium mb-1">
                Regla de los 3 LOI
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                En Think Better no iniciamos desarrollo sin al menos 3 Letters of
                Intent firmadas (o 1 cliente de pago para el Concierge MVP). No
                importa cuánto entusiasmo hayas visto en las entrevistas: el dinero
                —o la firma— es la única señal que cuenta. Todo lo demás es
                educación.
              </p>
            </div>
          </motion.section>

          {/* Section 6 — Caso real */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.33 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-violet-400 flex-shrink-0" />
              Caso real: CertifyFlow — de idea a 8 clientes en 5 semanas
            </h2>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden mb-6">
              <div className="bg-violet-500/10 border-b border-zinc-800 px-6 py-4">
                <p className="text-violet-400 font-medium text-sm">CASO DE ESTUDIO</p>
                <p className="text-white font-bold">
                  CertifyFlow — Plataforma de gestión de certificaciones laborales
                </p>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-zinc-500 text-xs font-medium uppercase tracking-wide mb-1">
                    La hipótesis inicial
                  </p>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    El fundador (exdirector de RRHH) creía que las empresas necesitaban
                    una herramienta para gestionar los cursos de formación obligatoria.
                    Tenía clara la funcionalidad: catálogo de cursos, asignación por
                    departamento, tracking de progreso.
                  </p>
                </div>
                <div>
                  <p className="text-zinc-500 text-xs font-medium uppercase tracking-wide mb-1">
                    Lo que revelaron las entrevistas
                  </p>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    Tras 11 entrevistas con directores de RRHH de empresas de 50-500
                    empleados, el patrón fue inequívoco: el dolor no era gestionar
                    cursos sino{' '}
                    <strong className="text-emerald-400">
                      demostrar cumplimiento en auditorías
                    </strong>
                    . El 9 de cada 11 entrevistados mencionó espontáneamente el "pánico
                    pre-auditoría": buscar manualmente certificados en carpetas de email
                    durante días.
                  </p>
                </div>
                <div>
                  <p className="text-zinc-500 text-xs font-medium uppercase tracking-wide mb-1">
                    El pivote de discovery
                  </p>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    En lugar de un LMS (Learning Management System) —categoría saturada y
                    con competidores con millones en financiación—, construimos un
                    <strong className="text-white"> "Audit-Ready Dashboard"</strong>: un
                    repositorio centralizado de certificaciones con alertas de vencimiento,
                    generación automática de informes de cumplimiento y firma digital.
                    El LMS era secundario.
                  </p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {[
                    { metric: '11', label: 'entrevistas realizadas', color: 'text-violet-400' },
                    { metric: '4 sem', label: 'duración del discovery', color: 'text-blue-400' },
                    { metric: '5 LOI', label: 'firmadas antes de construir', color: 'text-amber-400' },
                    { metric: '8 clientes', label: 'en la primera semana de beta', color: 'text-emerald-400' },
                  ].map(({ metric, label, color }) => (
                    <div
                      key={label}
                      className="bg-zinc-800/50 rounded-xl p-3 text-center"
                    >
                      <p className={`text-xl font-bold ${color}`}>{metric}</p>
                      <p className="text-zinc-500 text-xs leading-snug mt-1">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                  <p className="text-emerald-400 text-sm font-medium mb-1">
                    Resultado final
                  </p>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Think Better construyó el MVP en 18 días (plan Pro). En la primera
                    semana de beta cerrada, 8 de las 11 empresas entrevistadas se
                    convirtieron en clientes de pago a 199€/mes. ARR inicial: 19.104€.
                    Sin el proceso de discovery, habrían construido un LMS más que
                    compite directamente con Cornerstone (200M€+ en inversión).
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 7 — 5 errores */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.36 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0" />
              5 errores de product discovery que destruyen proyectos B2B
            </h2>

            <div className="space-y-4">
              {[
                {
                  num: '01',
                  title: 'Entrevistar a amigos y familia',
                  desc: 'Las personas de tu entorno te dirán lo que quieres escuchar. Las entrevistas de discovery deben hacerse con extraños que coincidan exactamente con tu ICP. Si no tienes acceso a ellos, es la primera señal de que el go-to-market no está pensado.',
                },
                {
                  num: '02',
                  title: 'Hacer demo en vez de escuchar',
                  desc: 'El error más común: llegar a la entrevista con un Figma o un prototipo y enseñarlo en los primeros 5 minutos. Esto contamina completamente los datos. La entrevista de problema es para entender el problema, no para vender la solución.',
                },
                {
                  num: '03',
                  title: 'Preguntar sobre el futuro hipotético',
                  desc: '"¿Usarías esto?" es la peor pregunta de discovery. Los humanos son pésimos prediciendo su comportamiento futuro. Pregunta siempre sobre comportamientos pasados: "¿Cuándo fue la última vez...?", "¿Cómo lo resolviste entonces?"',
                },
                {
                  num: '04',
                  title: 'Confundir entusiasmo con intención de pago',
                  desc: 'B2B está lleno de "me parece genial" que nunca compran. En B2B, el entusiasmo y el presupuesto están en personas distintas. Siempre pregunta: "¿Quién firmaría la orden de compra?" y habla con esa persona.',
                },
                {
                  num: '05',
                  title: 'Hacer discovery una sola vez',
                  desc: 'Discovery no es una fase, es una práctica continua. Los mejores equipos de producto dedican el 20% de su tiempo a discovery incluso cuando ya tienen product-market fit. Los mercados cambian, los dolores evolucionan y los competidores aparecen.',
                },
              ].map(({ num, title, desc }) => (
                <div
                  key={num}
                  className="flex gap-4 bg-red-500/5 border border-red-500/20 rounded-2xl p-5"
                >
                  <span className="text-2xl font-bold text-red-500/40 font-mono flex-shrink-0">
                    {num}
                  </span>
                  <div>
                    <p className="text-white font-semibold mb-1">{title}</p>
                    <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Section 8 — Árbol de decisión */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Search className="w-6 h-6 text-violet-400 flex-shrink-0" />
              ¿Cuánto discovery necesita tu proyecto? Árbol de decisión
            </h2>

            <div className="space-y-3">
              {[
                {
                  q: '¿Tienes al menos 3 clientes actuales que pagan por el problema que resuelves?',
                  yes: 'Discovery ligero: 5 entrevistas de profundización. Enfócate en expansion revenue.',
                  no: 'Sigue al siguiente',
                  color: 'border-emerald-500/30',
                },
                {
                  q: '¿Tienes experiencia directa trabajando en el sector durante más de 3 años?',
                  yes: 'Discovery acelerado (2 semanas): 8 entrevistas + 1 Concierge MVP rápido.',
                  no: 'Sigue al siguiente',
                  color: 'border-blue-500/30',
                },
                {
                  q: '¿Tienes acceso directo a más de 10 potenciales clientes del ICP?',
                  yes: 'Discovery estándar (3-4 semanas): 12 entrevistas + prototipo + smoke test.',
                  no: 'Sigue al siguiente',
                  color: 'border-amber-500/30',
                },
                {
                  q: '¿Tu mercado objetivo es un segmento nuevo sin competidores directos?',
                  yes: 'Discovery extenso (6-8 semanas): requiere investigación de mercado primaria. Riesgo alto.',
                  no: 'Discovery estándar con análisis competitivo profundo: 12 entrevistas + comparativa de alternativas + posicionamiento diferencial.',
                  color: 'border-violet-500/30',
                },
              ].map(({ q, yes, no, color }, i) => (
                <div
                  key={i}
                  className={`border rounded-2xl p-5 ${color} bg-zinc-900/30`}
                >
                  <p className="text-zinc-200 font-medium mb-3 text-sm">{q}</p>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold flex-shrink-0">SÍ →</span>
                      <span className="text-zinc-400">{yes}</span>
                    </div>
                    {no !== 'Sigue al siguiente' ? (
                      <div className="flex items-start gap-2">
                        <span className="text-red-400 font-bold flex-shrink-0">NO →</span>
                        <span className="text-zinc-400">{no}</span>
                      </div>
                    ) : (
                      <div className="flex items-start gap-2">
                        <span className="text-zinc-500 font-bold flex-shrink-0">NO →</span>
                        <span className="text-zinc-500 italic">{no}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Section 9 — Checklist */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-violet-400 flex-shrink-0" />
              Checklist de discovery: 12 puntos antes de empezar a construir
            </h2>

            <div className="grid sm:grid-cols-2 gap-3">
              {[
                'ICP definido con precisión: sector, tamaño, rol y situación',
                'Hipótesis principal escrita en formato JTBD',
                '3 asunciones críticas identificadas y priorizadas',
                'Mínimo 8 entrevistas completadas (no demos)',
                'Ninguna entrevista hecha a amigos, familiares o compañeros',
                'Patrones de problema confirmados en al menos 6/8 entrevistas',
                'Job real identificado (no el surface-level feature)',
                'Comprador (budget holder) identificado y entrevistado',
                'Alternativas actuales del cliente mapeadas',
                'Prototipo o smoke test completado con retroalimentación real',
                'Al menos 3 LOI firmadas o 1 cliente de pago del Concierge MVP',
                'Scope del MVP acotado a máximo 3 funcionalidades del job principal',
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-zinc-900/50 border border-zinc-800 rounded-xl p-4"
                >
                  <div className="w-6 h-6 rounded-full border-2 border-violet-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-violet-400 text-xs font-bold">
                      {(i + 1).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <p className="text-zinc-300 text-sm leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Conclusion */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.42 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8"
          >
            <h2 className="text-xl font-bold text-white mb-4">
              Discovery no frena el desarrollo: lo acelera
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              El argumento más común contra product discovery es "perdemos tiempo
              que podríamos usar en construir". Es el razonamiento más caro del
              ecosistema startup. Cada semana de discovery bien ejecutada elimina
              meses de desarrollo de funcionalidades que nadie usa.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              En Think Better integramos discovery en el proceso de cualquier
              proyecto: el cuestionario inicial es discovery estructurado, las
              llamadas previas son entrevistas de problema y la propuesta es el
              documento que cierra la hipótesis de negocio antes de escribir la
              primera línea de código.
            </p>
          </motion.section>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.44 }}
            className="bg-gradient-to-br from-violet-500/10 to-emerald-500/10 border border-violet-500/20 rounded-3xl p-8 text-center"
          >
            <p className="text-zinc-400 text-sm font-medium uppercase tracking-wider mb-3">
              ¿Tienes una idea de SaaS B2B?
            </p>
            <h3 className="text-2xl font-bold text-white mb-3">
              Hacemos el discovery contigo antes de construir
            </h3>
            <p className="text-zinc-400 mb-6 max-w-md mx-auto leading-relaxed">
              Nuestro cuestionario gratuito actúa como primera fase de discovery:
              en 10 minutos estructuramos tu idea, identificamos el ICP y estimamos
              el alcance del MVP. Propuesta en menos de 24h.
            </p>
            <Link
              to="/cuestionario"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-500 text-zinc-950 font-bold text-base hover:bg-emerald-400 transition-colors"
            >
              Iniciar discovery gratuito
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-zinc-900 px-6 py-8 mt-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/blog" className="text-zinc-400 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Más artículos
          </Link>
          <p className="text-zinc-600 text-sm">
            © 2026 Think Better · Barcelona
          </p>
          <Link
            to="/cuestionario"
            className="text-emerald-400 hover:text-emerald-300 transition-colors text-sm flex items-center gap-2"
          >
            Empezar proyecto
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
