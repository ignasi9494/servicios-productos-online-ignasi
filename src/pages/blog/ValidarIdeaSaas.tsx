import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Lightbulb,
  Target,
  Users,
  TrendingUp,
  DollarSign,
  Clock,
  Zap,
} from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePageMeta } from '../../hooks/usePageMeta';

export function ValidarIdeaSaas() {
  usePageTitle('Cómo validar una idea de negocio SaaS antes de gastar un euro — Think Better');
  usePageMeta(
    'El 90% de los SaaS fracasan por construir algo que nadie quiere. Guía completa de validación: framework de hipótesis, entrevistas de problema, smoke tests, métricas clave y caso real de validación en 2 semanas.',
  );

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Cómo validar una idea de negocio SaaS antes de gastar un euro',
      description:
        'El 90% de los SaaS fracasan por construir algo que nadie quiere. Guía completa de validación: framework de hipótesis, entrevistas de problema, smoke tests, métricas clave y caso real de validación en 2 semanas.',
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
          'https://servicios-productos-online-ignasi.vercel.app/blog/validar-idea-negocio-saas',
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
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-lg font-bold tracking-tight">
            Think Better
          </Link>
          <Link
            to="/cuestionario"
            className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold px-4 py-2 rounded-full text-sm transition-colors flex items-center gap-2"
          >
            Calcular precio de mi proyecto <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-200 text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al blog
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block bg-amber-500/10 text-amber-400 text-xs font-semibold px-3 py-1 rounded-full border border-amber-500/20 mb-4 uppercase tracking-wider">
            Startup
          </span>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6">
            Cómo validar una idea de negocio SaaS antes de gastar un euro
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed mb-6">
            El 90% de los SaaS fracasan no por problemas técnicos, sino por construir algo que
            nadie quiere pagar. La validación previa al desarrollo no es opcional: es lo que
            separa los productos que escalan de los que mueren con 12 usuarios.
          </p>
          <div className="flex items-center gap-4 text-sm text-zinc-500 mb-12">
            <span>16 mar 2026</span>
            <span>·</span>
            <span>10 min de lectura</span>
            <span>·</span>
            <span>Think Better</span>
          </div>
        </motion.div>

        <div className="article-body space-y-12">

          {/* Intro */}
          <section>
            <p className="text-lg text-zinc-300 leading-relaxed">
              Cada semana recibimos consultas de founders que ya han gastado entre 15.000€ y
              80.000€ construyendo un SaaS… y descubren en el lanzamiento que el mercado no
              responde. El problema no era el código. Era que nunca validaron la hipótesis central.
            </p>
            <p className="text-zinc-400 leading-relaxed mt-4">
              La buena noticia: validar una idea de SaaS no cuesta dinero. Cuesta tiempo, humildad
              y un método. En este artículo te damos el mismo framework que usamos internamente
              antes de aceptar un proyecto, y que recomendamos a todos nuestros clientes antes de
              escribir la primera línea de código.
            </p>
          </section>

          {/* Por qué fracasan los SaaS */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Por qué fracasan realmente los SaaS</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              CB Insights analiza cada año las autopsias de startups fallidas. El dato de 2025 es
              contundente:
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[
                {
                  pct: '42%',
                  reason: 'No había necesidad real en el mercado',
                  color: 'text-red-400',
                  bg: 'bg-red-500/10 border-red-500/20',
                },
                {
                  pct: '29%',
                  reason: 'Se quedaron sin dinero antes de encontrar product-market fit',
                  color: 'text-amber-400',
                  bg: 'bg-amber-500/10 border-amber-500/20',
                },
                {
                  pct: '23%',
                  reason: 'No era el equipo correcto para ese mercado',
                  color: 'text-orange-400',
                  bg: 'bg-orange-500/10 border-orange-500/20',
                },
              ].map((item) => (
                <div key={item.pct} className={`rounded-2xl border p-6 ${item.bg}`}>
                  <div className={`text-4xl font-black mb-2 ${item.color}`}>{item.pct}</div>
                  <p className="text-zinc-300 text-sm leading-relaxed">{item.reason}</p>
                </div>
              ))}
            </div>

            <p className="text-zinc-400 leading-relaxed">
              Los tres primeros motivos (que suman el 94%) son{' '}
              <strong className="text-zinc-200">evitables con validación temprana</strong>. La
              tecnología es el último problema. El primero siempre es el mercado.
            </p>
          </section>

          {/* El framework de hipótesis */}
          <section>
            <h2 className="text-2xl font-bold mb-2">El framework de las 3 hipótesis</h2>
            <p className="text-zinc-500 text-sm mb-6">Valida estas tres antes de abrir Figma</p>

            <div className="space-y-4">
              {[
                {
                  num: '01',
                  title: 'Hipótesis del problema',
                  question: '¿El problema existe y duele suficiente?',
                  description:
                    'Tu cliente objetivo pierde tiempo, dinero o oportunidades por este problema de forma recurrente. No es un «estaría bien tener» — es algo que les quita el sueño.',
                  validacion: 'Entrevistas de problema (mínimo 20). Sin mencionar tu solución.',
                  icon: AlertCircle,
                  color: 'text-red-400',
                  bg: 'bg-red-500/10 border-red-500/20',
                },
                {
                  num: '02',
                  title: 'Hipótesis de la solución',
                  question: '¿Tu solución es la que el mercado elegiría?',
                  description:
                    'Existen alternativas: hojas de cálculo, herramientas genéricas, procesos manuales. Tu SaaS tiene que ser significativamente mejor en algo concreto, no marginalmente mejor en todo.',
                  validacion: 'Smoke test + demo con mockup. ¿Pagarían por esto?',
                  icon: Lightbulb,
                  color: 'text-amber-400',
                  bg: 'bg-amber-500/10 border-amber-500/20',
                },
                {
                  num: '03',
                  title: 'Hipótesis del modelo de negocio',
                  question: '¿Los números tienen sentido a escala?',
                  description:
                    'El precio que el cliente pagaría tiene que cubrir tu CAC + costes operativos + margen. Muchos SaaS B2C mueren porque el LTV es 30€ y el CAC es 80€.',
                  validacion: 'Unit economics: LTV, CAC, churn rate, payback period.',
                  icon: DollarSign,
                  color: 'text-emerald-400',
                  bg: 'bg-emerald-500/10 border-emerald-500/20',
                },
              ].map((item) => (
                <div key={item.num} className={`rounded-2xl border p-6 ${item.bg}`}>
                  <div className="flex items-start gap-4">
                    <div className={`text-3xl font-black ${item.color} opacity-30`}>{item.num}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                        <h3 className="font-bold text-lg">{item.title}</h3>
                      </div>
                      <p className={`font-semibold text-sm mb-2 ${item.color}`}>{item.question}</p>
                      <p className="text-zinc-400 text-sm leading-relaxed mb-3">{item.description}</p>
                      <div className="bg-zinc-950/50 rounded-xl px-4 py-2 text-xs text-zinc-400">
                        <strong className="text-zinc-300">Cómo validar: </strong>{item.validacion}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Paso 1: Entrevistas de problema */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Paso 1: Las entrevistas de problema</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Es la técnica más poderosa y la más ignorada. Una entrevista de problema bien
              ejecutada te da más información que 3 meses de análisis de mercado.
            </p>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-400" />
                Las reglas de la entrevista de problema
              </h3>
              <div className="space-y-3">
                {[
                  {
                    ok: true,
                    text: 'Habla SOLO del pasado. «¿Cómo resolviste esto la última vez que pasó?»',
                  },
                  {
                    ok: true,
                    text: 'Pregunta por comportamiento real, no por intenciones. «¿Qué hiciste?» no «¿Qué harías?»',
                  },
                  {
                    ok: true,
                    text: 'Busca la emoción. El tono de voz al describir un problema frustrante es más valioso que sus palabras.',
                  },
                  {
                    ok: true,
                    text: 'Pregunta por el workaround actual. Si no tienen ninguno, el problema no duele tanto.',
                  },
                  {
                    ok: false,
                    text: 'NO menciones tu solución. Si lo haces, contaminas la entrevista.',
                  },
                  {
                    ok: false,
                    text: 'NO preguntes «¿usarías una app que…?». Las respuestas hipotéticas son basura.',
                  },
                  {
                    ok: false,
                    text: 'NO hagas encuestas con escala del 1 al 5. Los números dan falsa precisión.',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    {item.ok ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                    )}
                    <span className="text-sm text-zinc-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900 border border-emerald-500/20 rounded-2xl p-6">
              <h3 className="font-bold text-emerald-400 mb-3">Script de 20 minutos (probado)</h3>
              <ol className="space-y-3 text-sm text-zinc-300">
                <li className="flex gap-3">
                  <span className="text-emerald-400 font-bold w-6 shrink-0">1.</span>
                  <span><strong>Contexto (2 min):</strong> «Cuéntame sobre tu rol y cómo es un día normal en [área del problema].»</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400 font-bold w-6 shrink-0">2.</span>
                  <span><strong>Problema (5 min):</strong> «¿Cuál es la parte más frustrante de [área]? ¿Cuándo fue la última vez que te pasó?»</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400 font-bold w-6 shrink-0">3.</span>
                  <span><strong>Workaround (5 min):</strong> «¿Cómo lo resolves ahora? ¿Qué herramientas usas? ¿Cuánto tiempo te lleva?»</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400 font-bold w-6 shrink-0">4.</span>
                  <span><strong>Impacto (5 min):</strong> «¿Cuánto te cuesta (en tiempo o dinero) este problema cada mes? ¿Has intentado resolverlo? ¿Por qué no funcionó?»</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400 font-bold w-6 shrink-0">5.</span>
                  <span><strong>Cierre (3 min):</strong> «¿Conoces a otras personas con este problema? ¿Puedo contactarte cuando tenga algo que mostrarte?»</span>
                </li>
              </ol>
            </div>

            <div className="mt-4 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl">
              <p className="text-sm text-zinc-400">
                <strong className="text-zinc-200">Señal de validación:</strong> Si al menos 15 de 20 entrevistados describen el mismo problema espontáneamente, sin que tú lo menciones, tienes hipótesis del problema validada.
              </p>
            </div>
          </section>

          {/* Paso 2: Smoke test */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Paso 2: El smoke test (sin código)</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Un smoke test es una landing page que describe tu solución y mide si la gente está
              dispuesta a dar un paso real (email, pago, reserva). Sin código de producto. Sin
              diseño elaborado.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  Qué incluir en el smoke test
                </h3>
                <ul className="space-y-2 text-sm text-zinc-400">
                  {[
                    'Headline con el problema que resuelves (no tu nombre)',
                    '3 beneficios concretos con números si es posible',
                    'Precio aproximado visible (no lo escondas)',
                    'CTA: «Reservar acceso anticipado» o «Unirme a la lista»',
                    'Formulario de email o pago simbólico (1€)',
                    'Sin FAQ, sin «sobre nosotros», sin nada más',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-cyan-400" />
                  Métricas que medir
                </h3>
                <div className="space-y-3">
                  {[
                    { metric: 'Tasa de conversión landing', good: '> 15%', bad: '< 5%' },
                    { metric: 'Coste por lead (si pagas ads)', good: '< 3€', bad: '> 15€' },
                    { metric: 'Emails verificados en 2 semanas', good: '> 50', bad: '< 10' },
                    { metric: 'Pre-pagos (si usas Stripe)', good: '> 5', bad: '0' },
                  ].map((row) => (
                    <div key={row.metric} className="text-xs">
                      <div className="text-zinc-300 font-medium mb-1">{row.metric}</div>
                      <div className="flex gap-3">
                        <span className="text-emerald-400">✓ Sigue: {row.good}</span>
                        <span className="text-red-400">✗ Pivota: {row.bad}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="font-bold mb-4">Herramientas para el smoke test (sin código)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-zinc-500 border-b border-zinc-800">
                      <th className="text-left py-2 pr-4">Herramienta</th>
                      <th className="text-left py-2 pr-4">Para qué</th>
                      <th className="text-left py-2 pr-4">Coste</th>
                      <th className="text-left py-2">Tiempo setup</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-400">
                    {[
                      ['Carrd.co', 'Landing page no-code', '19€/año', '1h'],
                      ['Tally.so', 'Formularios y encuestas', 'Gratis', '30 min'],
                      ['Stripe + Carrd', 'Pre-venta simbólica (1€)', 'Gratis + comisiones', '2h'],
                      ['Typeform', 'Formulario de waitlist', 'Gratis (básico)', '30 min'],
                      ['Google Ads', 'Tráfico de prueba', '50-200€ budget', '1 día'],
                      ['Lemlist / Apollo', 'Outreach a ICP', '99€/mes', '1 día'],
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-zinc-900">
                        <td className="py-2 pr-4 font-medium text-zinc-300">{row[0]}</td>
                        <td className="py-2 pr-4">{row[1]}</td>
                        <td className="py-2 pr-4">{row[2]}</td>
                        <td className="py-2">{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Paso 3: El Concierge MVP */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Paso 3: El Concierge MVP</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Si el smoke test da señales positivas, el siguiente paso no es construir el SaaS. Es
              hacer manualmente lo que el SaaS haría automáticamente. El Concierge MVP valida que
              la solución funciona y que los clientes la valoran, antes de automatizarla.
            </p>

            <div className="bg-zinc-900 border border-amber-500/20 rounded-2xl p-6 mb-4">
              <h3 className="font-bold text-amber-400 mb-3">Ejemplo real: SaaS de reporting financiero</h3>
              <div className="space-y-3 text-sm text-zinc-300">
                <div className="flex gap-3">
                  <span className="text-amber-400 font-bold shrink-0">Idea:</span>
                  <span>Plataforma SaaS que genera automáticamente el informe mensual de P&L para pymes.</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-amber-400 font-bold shrink-0">Concierge:</span>
                  <span>En vez de construir la app, el founder pedía acceso al Excel de contabilidad al cliente y generaba el informe manualmente en Google Sheets. Tardaba 3h por cliente.</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-amber-400 font-bold shrink-0">Resultado:</span>
                  <span>5 clientes pagando 199€/mes. Demostró willingness-to-pay real. Identificó 3 formatos de informe que no había previsto. Construyó la app con ese conocimiento.</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-emerald-400 font-bold shrink-0">Coste:</span>
                  <span>0€ en desarrollo. 15h de trabajo manual. 995€ en ingresos el primer mes.</span>
                </div>
              </div>
            </div>

            <p className="text-zinc-400 leading-relaxed">
              El Concierge MVP es incómodo porque requiere hacer cosas que no escalan. Eso es
              exactamente el punto: aprender rápido y barato antes de construir algo que sí escale.
            </p>
          </section>

          {/* Unit economics antes del desarrollo */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Los unit economics: el filtro más honesto</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Antes de escribir código, los números tienen que cuadrar al menos en el escenario
              optimista. Si en el escenario optimista el modelo no es viable, el producto no lo es.
            </p>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                La calculadora rápida (hazla en 30 minutos)
              </h3>
              <div className="space-y-4 text-sm">
                {[
                  {
                    label: 'ARPU mensual (precio que pagarán)',
                    example: 'Ej: 49€/mes en plan básico',
                    note: 'Basado en las entrevistas. Si dicen «no sé» o «depende», no tienes precio validado.',
                  },
                  {
                    label: 'Churn mensual estimado',
                    example: 'Ej: 5%/mes (sector típico B2B SMB)',
                    note: 'Un 5% mensual = LTV de solo 20 meses. Un 2% = 50 meses. La diferencia es brutal.',
                  },
                  {
                    label: 'LTV = ARPU / Churn',
                    example: 'Ej: 49€ / 0.05 = 980€ LTV',
                    note: 'Este es el techo de lo que puedes gastar para adquirir un cliente y seguir siendo rentable.',
                  },
                  {
                    label: 'CAC estimado (coste adquisición cliente)',
                    example: 'Ej: 150€ (SEO+outreach) o 400€ (paid)',
                    note: 'LTV/CAC > 3x = negocio viable. LTV/CAC < 1x = modelo roto.',
                  },
                  {
                    label: 'Payback period = CAC / ARPU',
                    example: 'Ej: 150€ / 49€ = 3 meses',
                    note: 'Si el payback es > 12 meses, necesitas mucho capital antes de ser cash-flow positivo.',
                  },
                ].map((item, i) => (
                  <div key={i} className="border-b border-zinc-800 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-emerald-400 font-bold">{i + 1}.</span>
                      <span className="text-zinc-200 font-medium">{item.label}</span>
                    </div>
                    <div className="text-zinc-400 ml-4 mb-1">{item.example}</div>
                    <div className="text-zinc-500 text-xs ml-4">{item.note}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  ratio: 'LTV/CAC > 3x',
                  label: 'Modelo sano',
                  desc: 'Puedes crecer de forma sostenible con cualquier canal de adquisición.',
                  color: 'text-emerald-400',
                  bg: 'bg-emerald-500/10 border-emerald-500/20',
                },
                {
                  ratio: 'LTV/CAC 1-3x',
                  label: 'Zona de riesgo',
                  desc: 'Necesitas optimizar precio o CAC antes de escalar. Funciona con funding.',
                  color: 'text-amber-400',
                  bg: 'bg-amber-500/10 border-amber-500/20',
                },
                {
                  ratio: 'LTV/CAC < 1x',
                  label: 'Modelo roto',
                  desc: 'Cada cliente que ganas te cuesta más de lo que genera. No construyas.',
                  color: 'text-red-400',
                  bg: 'bg-red-500/10 border-red-500/20',
                },
              ].map((item) => (
                <div key={item.ratio} className={`rounded-2xl border p-5 ${item.bg}`}>
                  <div className={`text-xl font-black mb-1 ${item.color}`}>{item.ratio}</div>
                  <div className="font-bold text-sm mb-2">{item.label}</div>
                  <p className="text-zinc-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Señales de que NO debes construir */}
          <section>
            <h2 className="text-2xl font-bold mb-6">7 señales de que NO debes construir todavía</h2>

            <div className="space-y-3">
              {[
                {
                  signal: 'Nadie ha pagado nada, ni simbólicamente',
                  detail: 'Si 50 personas se apuntaron a la lista pero cero han pagado 1€, no tienes validación. Tienes amabilidad.',
                },
                {
                  signal: 'Solo tus amigos y familia dicen que es buena idea',
                  detail: 'El sesgo de confirmación es inevitable con personas que te quieren. Necesitas extraños que no te conozcan.',
                },
                {
                  signal: 'No puedes describir quién es tu ICP en una frase',
                  detail: '«Todo el mundo» no es un ICP. «Directores de operaciones de distribuidoras con 10-50 empleados en España» sí lo es.',
                },
                {
                  signal: 'El problema que resuelves es «interesante» pero no «urgente»',
                  detail: 'La gente paga por resolver problemas que les quitan el sueño, no por mejorar cosas que funcionan bien.',
                },
                {
                  signal: 'No conoces a 3 personas que pagarían mañana si existiera',
                  detail: 'Si no tienes 3 early adopters identificados con nombre y teléfono, el mercado no está listo o no lo has buscado.',
                },
                {
                  signal: 'El competidor directo cerró el año pasado',
                  detail: 'No siempre es una oportunidad. A veces es una señal de que el mercado no tiene suficiente willingness-to-pay.',
                },
                {
                  signal: 'Solo tienes validación de grandes empresas, pero tu precio es SMB',
                  detail: 'Las enterprise tienen necesidades distintas y ciclos de venta de 6-18 meses. No valides con quien no va a comprar.',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 bg-zinc-900/50 border border-red-500/10 rounded-xl">
                  <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-zinc-200 mb-1">{item.signal}</div>
                    <div className="text-sm text-zinc-400">{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Caso real: validación en 2 semanas */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Caso real: validación en 14 días, 0€</h2>
            <div className="bg-zinc-900 border border-cyan-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="font-bold text-lg">ClinicFlow — Gestión de citas para clínicas privadas</div>
                  <div className="text-zinc-500 text-sm">Barcelona, 2025</div>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <div className="text-zinc-500 text-xs uppercase tracking-wide mb-1">Semana 1 — Entrevistas de problema</div>
                  <p className="text-zinc-300">
                    El founder (médico reconvertido a emprendedor) hizo 22 entrevistas a dueños de
                    clínicas de fisioterapia y psicología en LinkedIn y por contactos directos.
                    Descubrió que el problema principal no era la gestión de citas (ya usaban Calendly)
                    sino las <strong>cancelaciones de última hora</strong> y la gestión del cobro
                    asociado. Cambió el enfoque antes de empezar.
                  </p>
                </div>

                <div>
                  <div className="text-zinc-500 text-xs uppercase tracking-wide mb-1">Semana 2 — Smoke test</div>
                  <p className="text-zinc-300">
                    Carrd landing en 4 horas: «Reduce tus cancelaciones de última hora un 60% o te
                    devolvemos el dinero». CTA: acceso anticipado por 79€/mes. 200€ en Google Ads
                    segmentando a propietarios de clínicas en España.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-4">
                  {[
                    { label: 'Visitas landing', value: '847' },
                    { label: 'Registros waitlist', value: '63' },
                    { label: 'Pre-pagos (79€)', value: '11' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-zinc-950 rounded-xl p-3 text-center">
                      <div className="text-2xl font-black text-cyan-400">{stat.value}</div>
                      <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="text-zinc-500 text-xs uppercase tracking-wide mb-1">Resultado</div>
                  <p className="text-zinc-300">
                    869€ en pre-ventas. 200€ invertidos en ads. LTV estimado (79€ × 18 meses
                    promedio churn B2B SMB) = 1.422€. CAC demostrado = 18€. LTV/CAC = 79x.
                    Construyó el SaaS con Think Better en 5 semanas. Lanzó con 11 clientes de pago
                    el primer día.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* El checklist final */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Checklist: ¿estás listo para construir?</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Antes de contratar a alguien para desarrollar tu SaaS, responde estas preguntas.
              Si la mayoría son «sí», estás listo. Si la mayoría son «no» o «no lo sé», sigue
              validando.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h3 className="font-bold mb-4 text-emerald-400">Validación de problema</h3>
                <div className="space-y-2 text-sm">
                  {[
                    'He hecho +20 entrevistas de problema con clientes potenciales reales',
                    'Al menos 15 de ellos describieron el mismo problema sin que yo lo mencionara',
                    'Tengo documentados los workarounds actuales y sus costes',
                    'Sé cuánto les cuesta el problema (en € o en horas)',
                    'Tengo identificado un ICP específico en una frase',
                  ].map((item, i) => (
                    <label key={i} className="flex items-start gap-2 cursor-pointer">
                      <input type="checkbox" className="mt-0.5 accent-emerald-500" />
                      <span className="text-zinc-300">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h3 className="font-bold mb-4 text-cyan-400">Validación de solución y negocio</h3>
                <div className="space-y-2 text-sm">
                  {[
                    'He hecho un smoke test con landing real y CTA de acción',
                    'Al menos 5 personas han dado su email o pagado algo simbólico',
                    'Conozco a 3+ early adopters que esperan el producto',
                    'Los unit economics dan LTV/CAC > 3x incluso con estimaciones conservadoras',
                    'He validado el precio con al menos 10 personas reales',
                  ].map((item, i) => (
                    <label key={i} className="flex items-start gap-2 cursor-pointer">
                      <input type="checkbox" className="mt-0.5 accent-cyan-500" />
                      <span className="text-zinc-300">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA final */}
          <section className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800 rounded-3xl p-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold mb-3">¿Tu idea ya está validada?</h2>
            <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
              Si tienes las señales correctas y estás listo para construir, cuéntanos tu proyecto.
              Te damos un precio exacto en 10 minutos y empezamos en días, no meses.
            </p>
            <Link
              to="/cuestionario"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 transition-colors"
            >
              Calcular precio de mi proyecto
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 text-center text-zinc-600 text-sm mt-16">
        <p>
          © 2026 Think Better — Estudio AI-first de desarrollo de software en Barcelona
          {' · '}
          <Link to="/" className="hover:text-zinc-400 transition-colors">Inicio</Link>
          {' · '}
          <Link to="/blog" className="hover:text-zinc-400 transition-colors">Blog</Link>
          {' · '}
          <Link to="/privacidad" className="hover:text-zinc-400 transition-colors">Privacidad</Link>
        </p>
      </footer>
    </div>
  );
}
