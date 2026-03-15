import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Clock,
  Calendar,
  ArrowLeft,
  CheckCircle2,
  Zap,
  TrendingUp,
  AlertCircle,
  DollarSign,
  Cpu,
} from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePageMeta } from '../../hooks/usePageMeta';

export function AutomatizacionIaEmpresas() {
  usePageTitle('Automatización con IA para empresas: qué es, cuánto cuesta y por dónde empezar — Think Better');
  usePageMeta(
    'Guía práctica de automatización con inteligencia artificial para empresas en España. Casos reales, costes, herramientas y cómo identificar los procesos con más ROI para automatizar primero.',
  );

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Automatización con IA para empresas: qué es, cuánto cuesta y por dónde empezar',
      description:
        'Guía práctica de automatización con inteligencia artificial para empresas en España. Casos reales, costes, herramientas y cómo identificar los procesos con más ROI para automatizar primero.',
      datePublished: '2026-03-15',
      dateModified: '2026-03-15',
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
          'https://servicios-productos-online-ignasi.vercel.app/blog/automatizacion-ia-empresas-espana',
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
            Descubrir precio de mi proyecto
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
        {/* Back */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al blog
        </Link>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 text-sm text-zinc-500 mb-4">
            <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 text-xs font-medium">
              Automatización
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              15 mar 2026
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              9 min de lectura
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            Automatización con IA para empresas: qué es, cuánto cuesta y por dónde empezar
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            El 80% de las empresas que nos contactan pierden entre 10 y 30 horas semanales en tareas
            repetitivas que se podrían automatizar hoy mismo. Te explicamos cómo identificar esas tareas,
            cuánto cuesta automatizarlas y qué ROI esperar.
          </p>
        </motion.header>

        {/* Body */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="article-body"
        >
          <p>
            En los últimos dos años, la automatización con inteligencia artificial ha dejado de ser un
            privilegio de las grandes corporaciones para convertirse en una ventaja competitiva real para
            pymes y startups. El problema es que muchas empresas no saben por dónde empezar, o peor, invierten
            en las herramientas equivocadas y no ven resultados.
          </p>
          <p>
            En Think Better hemos implementado más de 40 automatizaciones con IA para empresas de entre 5 y
            200 empleados en España. Esta guía recoge lo que hemos aprendido: qué funciona, qué no, cuánto
            cuesta y cómo medir si merece la pena.
          </p>

          <h2>Qué es realmente la automatización con IA (y qué no es)</h2>
          <p>
            La automatización tradicional —macros de Excel, bots de scraping, scripts de importación— lleva
            décadas existiendo. La automatización con IA es diferente porque puede manejar{' '}
            <strong>tareas no estructuradas</strong>: leer un email y entender el contexto, revisar un contrato
            y detectar cláusulas problemáticas, escuchar una llamada y extraer los puntos de acción, generar
            un informe a partir de datos sin plantilla fija.
          </p>
          <p>
            La clave es esta distinción:
          </p>

          {/* Comparison table */}
          <div className="not-prose my-8 overflow-hidden rounded-xl border border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-800/60">
                  <th className="px-4 py-3 text-left text-zinc-300 font-semibold">Automatización clásica</th>
                  <th className="px-4 py-3 text-left text-zinc-300 font-semibold">Automatización con IA</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Sigue reglas fijas (if-else)', 'Interpreta contexto y matices'],
                  ['Solo datos estructurados', 'Texto, audio, imágenes, PDFs'],
                  ['Falla con excepciones', 'Maneja variabilidad con gracia'],
                  ['Cero aprendizaje', 'Mejora con más datos y feedback'],
                  ['Coste: horas de programación', 'Coste: integración + llamadas a API'],
                ].map(([left, right], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-zinc-900/40' : 'bg-zinc-900/20'}>
                    <td className="px-4 py-2.5 text-zinc-400">{left}</td>
                    <td className="px-4 py-2.5 text-zinc-300">{right}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p>
            Dicho esto, la IA no reemplaza a la automatización clásica: la complementa. Un buen sistema
            combina ambas: reglas deterministas para lo predecible, IA para lo ambiguo.
          </p>

          <h2>Los 6 procesos empresariales con mayor ROI para automatizar</h2>
          <p>
            No todos los procesos tienen el mismo potencial. Estos son los que, en nuestra experiencia,
            generan el retorno más rápido:
          </p>

          {/* ROI process cards */}
          <div className="not-prose my-8 space-y-4">
            {[
              {
                icon: <Zap className="w-5 h-5 text-emerald-400" />,
                title: '1. Atención al cliente y soporte',
                roi: 'ROI típico: 3-6 meses',
                description:
                  'Un chatbot con IA puede resolver el 60-80% de las consultas repetitivas sin intervención humana. No estamos hablando del chatbot de reglas de 2018: un agente con acceso a tu base de conocimiento resuelve preguntas complejas, escala los casos difíciles y aprende de cada interacción.',
                savings: 'Ahorro típico: 15-25h/semana en equipos de 2-5 personas de soporte',
              },
              {
                icon: <DollarSign className="w-5 h-5 text-cyan-400" />,
                title: '2. Procesamiento de facturas y contabilidad',
                roi: 'ROI típico: 1-3 meses',
                description:
                  'Extraer datos de facturas en PDF, validar importes, categorizar gastos y volcarlos al ERP. Sin humanos mirando PDFs. Este es el caso de automatización con IA de mayor ROI y menor riesgo que existe hoy para una pyme.',
                savings: 'Ahorro típico: 10-20h/semana en empresas con más de 100 facturas/mes',
              },
              {
                icon: <TrendingUp className="w-5 h-5 text-violet-400" />,
                title: '3. Generación y cualificación de leads',
                roi: 'ROI típico: 2-4 meses',
                description:
                  'Automatizar el enriquecimiento de leads (empresa, sector, tamaño, LinkedIn), la cualificación inicial con un bot conversacional y la asignación al comercial correcto. Algunas empresas han reducido el tiempo de respuesta de 48h a 5 minutos.',
                savings: 'Ahorro típico: 8-15h/semana en equipos comerciales de 3+ personas',
              },
              {
                icon: <Cpu className="w-5 h-5 text-amber-400" />,
                title: '4. Generación de informes y reporting',
                roi: 'ROI típico: 1-2 meses',
                description:
                  'Un agente que cada lunes a las 8h conecta a tu base de datos, genera el informe semanal con análisis en lenguaje natural, lo formatea en PDF y lo envía al equipo directivo. Sin que nadie toque Excel el domingo por la tarde.',
                savings: 'Ahorro típico: 4-8h/semana en equipos que hacen reporting manual',
              },
              {
                icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
                title: '5. Onboarding de clientes y empleados',
                roi: 'ROI típico: 3-5 meses',
                description:
                  'Automatizar la recogida de documentación, la verificación de identidad (KYC), la generación de contratos personalizados y el envío de bienvenida con la información relevante para cada perfil. Proceso de semanas comprimido a horas.',
                savings: 'Ahorro típico: 3-6h por nuevo cliente/empleado incorporado',
              },
              {
                icon: <AlertCircle className="w-5 h-5 text-rose-400" />,
                title: '6. Monitorización y alertas inteligentes',
                roi: 'ROI típico: inmediato (prevención de pérdidas)',
                description:
                  'Sistemas que monitorizan en tiempo real: reseñas negativas en Google y redes sociales, menciones de la competencia, anomalías en métricas de negocio, fallos en infraestructura. La IA filtra el ruido y solo te notifica lo que realmente importa.',
                savings: 'Valor: prevención de crisis + respuesta 10x más rápida',
              },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-white mb-1">{item.title}</h3>
                    <span className="inline-block text-xs font-semibold text-emerald-400 mb-2">
                      {item.roi}
                    </span>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-2">{item.description}</p>
                    <p className="text-xs text-zinc-500 italic">{item.savings}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2>Cuánto cuesta automatizar un proceso con IA en España</h2>
          <p>
            Esta es la pregunta que más nos hacen. La respuesta honesta es: depende. Pero podemos darte rangos
            reales basados en proyectos que hemos entregado:
          </p>

          {/* Cost table */}
          <div className="not-prose my-8 overflow-hidden rounded-xl border border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-800/60">
                  <th className="px-4 py-3 text-left text-zinc-300 font-semibold">Tipo de automatización</th>
                  <th className="px-4 py-3 text-left text-zinc-300 font-semibold">Coste de desarrollo</th>
                  <th className="px-4 py-3 text-left text-zinc-300 font-semibold">Coste mensual operativo</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Chatbot simple (FAQ + escalado)', '800–1.500€', '50–150€/mes'],
                  ['Procesamiento de facturas/docs', '1.500–3.000€', '100–300€/mes'],
                  ['Agente de generación de informes', '2.000–4.000€', '80–200€/mes'],
                  ['Pipeline de cualificación de leads', '2.500–5.000€', '150–400€/mes'],
                  ['Sistema multiagente complejo', '5.000–15.000€', '300–800€/mes'],
                ].map(([type, dev, monthly], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-zinc-900/40' : 'bg-zinc-900/20'}>
                    <td className="px-4 py-2.5 text-zinc-400">{type}</td>
                    <td className="px-4 py-2.5 text-zinc-300 font-medium">{dev}</td>
                    <td className="px-4 py-2.5 text-zinc-400">{monthly}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p>
            El coste operativo mensual viene principalmente de las llamadas a APIs de modelos de IA (OpenAI,
            Anthropic, Google Gemini) y de la infraestructura de procesamiento. Con un volumen moderado
            (miles de documentos al mes o cientos de conversaciones diarias), los costes son muy asumibles
            para la mayoría de pymes.
          </p>

          {/* Callout box */}
          <div className="not-prose my-8 p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <p className="text-sm text-emerald-300 font-semibold mb-1">
              Regla práctica para calcular el ROI
            </p>
            <p className="text-sm text-zinc-400">
              Si el proceso que quieres automatizar consume más de <strong className="text-zinc-300">5 horas semanales</strong> de
              alguien con un coste empresa de 25-40€/hora, el ROI de automatizarlo con IA es positivo en
              menos de 6 meses. Multiplica las horas por el coste/hora, multiplica por 52 semanas y compara
              con el coste de desarrollo.
            </p>
          </div>

          <h2>El framework para priorizar qué automatizar primero</h2>
          <p>
            Antes de elegir una herramienta o contratar a alguien, haz este ejercicio con tu equipo. Para
            cada proceso candidato, puntúa del 1 al 5:
          </p>

          <div className="not-prose my-8 space-y-3">
            {[
              {
                step: '1',
                title: 'Frecuencia',
                desc: '¿Con qué frecuencia se realiza? Diario = 5, semanal = 3, mensual = 1.',
              },
              {
                step: '2',
                title: 'Tiempo consumido',
                desc: 'Horas totales por semana en toda la empresa. Más de 10h = 5, 5-10h = 3, menos de 5h = 1.',
              },
              {
                step: '3',
                title: 'Nivel de estandarización',
                desc: '¿Siempre se hace igual? Proceso idéntico = 5, algunas variaciones = 3, muy variable = 1.',
              },
              {
                step: '4',
                title: 'Impacto en cliente o negocio',
                desc: 'Un error en este proceso, ¿genera quejas o pérdida de dinero? Sí directo = 5, indirecto = 3, no = 1.',
              },
              {
                step: '5',
                title: 'Datos disponibles',
                desc: '¿Tienes ejemplos del proceso documentados? Cientos = 5, decenas = 3, sin ejemplos = 1.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-3 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center">
                  {item.step}
                </span>
                <div>
                  <p className="font-semibold text-white text-sm">{item.title}</p>
                  <p className="text-zinc-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p>
            Suma las puntuaciones. Los procesos con 18-25 puntos son candidatos claros para automatizar ya.
            Los de 12-17, en una segunda fase. Los de menos de 12, probablemente no merezca la pena todavía.
          </p>

          <h2>Las herramientas más usadas en 2026</h2>
          <p>
            El ecosistema de automatización con IA ha madurado enormemente. Estas son las herramientas que más
            usamos en proyectos reales:
          </p>

          <div className="not-prose my-8 grid md:grid-cols-2 gap-4">
            {[
              {
                category: 'Flujos y pipelines',
                tools: ['n8n (self-hosted, muy recomendado)', 'Make (Integromat)', 'Zapier (para equipos no técnicos)'],
                note: 'Para automatizaciones basadas en eventos y conexión entre apps',
              },
              {
                category: 'Agentes de IA',
                tools: ['LangChain / LangGraph', 'OpenAI Assistants API', 'Vertex AI (Google)'],
                note: 'Para agentes que razonan, usan herramientas y mantienen memoria',
              },
              {
                category: 'Procesamiento de documentos',
                tools: ['Mistral OCR + extracción', 'Azure Document Intelligence', 'LlamaParse'],
                note: 'Para facturas, contratos, formularios y PDFs en general',
              },
              {
                category: 'Chatbots empresariales',
                tools: ['Botpress (open-source)', 'Voiceflow', 'Custom con Next.js + Supabase'],
                note: 'Para atención al cliente, soporte interno y onboarding',
              },
            ].map((group, i) => (
              <div key={i} className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <h3 className="font-bold text-white text-sm mb-2">{group.category}</h3>
                <ul className="space-y-1 mb-3">
                  {group.tools.map((t) => (
                    <li key={t} className="text-zinc-400 text-xs flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="text-zinc-600 text-xs italic">{group.note}</p>
              </div>
            ))}
          </div>

          <h2>Caso real: cómo automatizamos el procesamiento de pedidos de una distribuidora</h2>
          <p>
            Una distribuidora de alimentación en Barcelona recibía pedidos por email, WhatsApp y teléfono.
            Tres personas dedicaban entre 12 y 15 horas semanales a leer mensajes, transcribir pedidos al
            ERP y responder confirmaciones. Errores frecuentes. Retrasos. Clientes insatisfechos.
          </p>
          <p>
            El sistema que construimos en 3 semanas:
          </p>

          <div className="not-prose my-6 space-y-2">
            {[
              'Un agente recibe emails de pedido → extrae productos, cantidades y cliente con IA → valida contra el catálogo → inserta en el ERP automáticamente',
              'Un bot de WhatsApp Business recibe mensajes de pedido → misma extracción → confirmación automática al cliente con detalle del pedido',
              'Los pedidos telefónicos se graban → transcripción automática → misma extracción',
              'Dashboard en tiempo real con todos los pedidos del día y alertas de excepciones para revisión humana',
            ].map((step, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p className="text-zinc-300 text-sm">{step}</p>
              </div>
            ))}
          </div>

          <p>
            <strong>Resultado a los 2 meses:</strong> de 14h/semana a 2h/semana de trabajo manual (solo
            revisión de excepciones). Reducción del 85% en errores de pedido. ROI positivo en el primer mes.
            Coste total del proyecto: 3.800€ + 180€/mes en infraestructura y APIs.
          </p>

          <h2>Los 5 errores más frecuentes al automatizar con IA</h2>

          <div className="not-prose my-8 space-y-4">
            {[
              {
                error: 'Empezar por la herramienta, no por el problema',
                desc: '"Queremos usar IA" no es una estrategia. Identifica primero el proceso con más ROI, luego elige la herramienta que mejor lo resuelve. No al revés.',
              },
              {
                error: 'Automatizar procesos mal definidos',
                desc: 'Si el proceso que realizan tus empleados no está documentado y varía según quién lo hace, automatizarlo primero es un error. Estandariza y documenta antes de automatizar.',
              },
              {
                error: 'Esperar el 100% de precisión desde el día 1',
                desc: 'Los sistemas de IA mejoran con tiempo y feedback. Un chatbot con el 75% de resolución en el primer mes puede llegar al 90% en tres meses con los ajustes correctos. El objetivo inicial no es la perfección sino superar el coste del trabajo manual.',
              },
              {
                error: 'No medir el baseline antes de automatizar',
                desc: 'Si no sabes cuántas horas dedicas hoy al proceso, no podrás demostrar el ROI después. Mide antes: horas, errores, coste, tiempo de respuesta.',
              },
              {
                error: 'Olvidar el change management',
                desc: 'Las automatizaciones fracasan cuando el equipo no las adopta. Las personas que hacían ese proceso manualmente necesitan entender cómo cambia su rol, no sentir que la IA los reemplaza sino que los libera de lo tedioso.',
              },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800">
                <p className="font-semibold text-rose-400 text-sm mb-1">
                  Error {i + 1}: {item.error}
                </p>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2>Por dónde empezar: el plan de acción en 4 semanas</h2>
          <p>
            Si quieres pasar de "queremos automatizar" a "tenemos una primera automatización funcionando" en
            un mes, este es el camino más corto:
          </p>

          <div className="not-prose my-8 space-y-3">
            {[
              {
                week: 'Semana 1',
                title: 'Mapear y priorizar',
                tasks: [
                  'Entrevista a cada área: ¿qué tareas repetitivas consumen más tiempo?',
                  'Puntúa cada proceso con el framework de las 5 dimensiones',
                  'Selecciona el proceso ganador (puntuación más alta)',
                  'Documenta el proceso paso a paso: inputs, outputs, excepciones',
                ],
              },
              {
                week: 'Semana 2',
                title: 'Definir el MVP de la automatización',
                tasks: [
                  'Define el alcance mínimo: ¿qué parte del proceso automatizar primero?',
                  'Identifica las integraciones necesarias (ERP, CRM, email...)',
                  'Establece los criterios de éxito y el baseline a mejorar',
                  'Elige las herramientas: ¿n8n + OpenAI? ¿Custom con Python?',
                ],
              },
              {
                week: 'Semana 3',
                title: 'Construir y probar',
                tasks: [
                  'Construye la primera versión con datos reales (no de demo)',
                  'Prueba con el equipo que actualmente hace el proceso manual',
                  'Documenta los casos de fallo y las excepciones frecuentes',
                  'Itera hasta alcanzar una precisión aceptable (>70%)',
                ],
              },
              {
                week: 'Semana 4',
                title: 'Lanzar y medir',
                tasks: [
                  'Despliega en producción con monitorización activa',
                  'Forma al equipo: cómo revisar excepciones, cómo dar feedback',
                  'Mide: horas ahorradas, errores reducidos, tiempo de respuesta',
                  'Define la segunda automatización a implementar',
                ],
              },
            ].map((phase, i) => (
              <div key={i} className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold">
                    {phase.week}
                  </span>
                  <h3 className="font-bold text-white text-sm">{phase.title}</h3>
                </div>
                <ul className="space-y-1.5">
                  {phase.tasks.map((task, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-zinc-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 flex-shrink-0 mt-1.5" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h2>Conclusión</h2>
          <p>
            La automatización con IA no es un proyecto de futuro. Es algo que empresas de todos los tamaños
            están implementando hoy en España, con retornos medibles en semanas. El obstáculo no es
            tecnológico: es saber por dónde empezar y tener a alguien que haya hecho esto antes.
          </p>
          <p>
            Si tienes un proceso que consume tiempo valioso de tu equipo, probablemente sea automatizable.
            El primer paso es la conversación correcta: no "¿qué herramienta usamos?" sino "¿qué problema
            estamos resolviendo y cuánto vale resolverlo?"
          </p>

          {/* CTA */}
          <div className="not-prose mt-12 p-6 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wide mb-2">
              Automatización con IA
            </p>
            <h3 className="text-xl font-bold text-white mb-3">
              ¿Cuánto te costaría automatizar tu proceso?
            </h3>
            <p className="text-zinc-400 text-sm mb-5">
              Cuéntanos qué proceso quieres automatizar. En 10 minutos te damos un precio exacto y un plan
              de implementación.
            </p>
            <Link
              to="/cuestionario"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 text-zinc-950 font-bold text-sm hover:bg-emerald-400 transition-colors"
            >
              Calcular coste de automatización
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </article>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 text-center text-zinc-600 text-sm mt-8">
        <p>
          © 2026 Think Better — Estudio AI-first de desarrollo de software en Barcelona
          {' · '}
          <Link to="/" className="hover:text-zinc-400 transition-colors">
            Inicio
          </Link>
          {' · '}
          <Link to="/blog" className="hover:text-zinc-400 transition-colors">
            Blog
          </Link>
          {' · '}
          <Link to="/privacidad" className="hover:text-zinc-400 transition-colors">
            Privacidad
          </Link>
        </p>
      </footer>
    </div>
  );
}
