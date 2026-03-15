import { useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Clock, Calendar, ArrowLeft, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePageMeta } from '../../hooks/usePageMeta';

export function AgenciaVsFreelancer() {
  usePageTitle('Agencia vs freelancer vs no-code: ¿cuál elegir en 2026? — Think Better');
  usePageMeta(
    'Análisis honesto de las tres opciones para construir tu producto digital en 2026. Pros, contras, precios reales y cuándo tiene sentido cada opción. Por el equipo de Think Better.',
  );

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Agencia vs freelancer vs no-code: ¿cuál elegir en 2026?',
      description:
        'Análisis honesto de las tres opciones para construir tu producto digital en 2026. Cuándo tiene sentido cada una y cuándo Think Better es la alternativa correcta.',
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
          'https://servicios-productos-online-ignasi.vercel.app/blog/agencia-vs-freelancer-vs-nocode-2026',
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
      {/* Navbar minimal */}
      <nav className="border-b border-zinc-900 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
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

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 py-16 lg:px-8">
        {/* Back */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al blog
        </Link>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 text-xs font-medium">Comparativa</span>
            <span className="flex items-center gap-1.5 text-zinc-500 text-xs">
              <Calendar className="w-3.5 h-3.5" />
              15 mar 2026
            </span>
            <span className="flex items-center gap-1.5 text-zinc-500 text-xs">
              <Clock className="w-3.5 h-3.5" />
              6 min de lectura
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Agencia vs freelancer vs no-code: ¿cuál elegir en 2026?
          </h1>

          <p className="text-xl text-zinc-400 leading-relaxed mb-10 max-w-3xl">
            Cada año, miles de founders y empresas en España enfrentan la misma pregunta antes de lanzar su producto
            digital. La respuesta correcta depende de tres variables que casi nadie menciona.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="article-body"
        >
          {/* Intro */}
          <Section>
            <p>
              La decisión de cómo construir tu producto digital es probablemente una de las más importantes que vas a
              tomar en los próximos meses. Y sin embargo, la mayoría de founders la toman sin información suficiente.
            </p>
            <p>
              Hemos hablado con más de 80 clientes antes de trabajar con nosotros. El 70% había pasado por al menos una
              mala experiencia previa: un freelancer que desapareció, una agencia que multiplicó el presupuesto por
              tres, o una herramienta no-code que se quedó pequeña cuando el negocio empezó a escalar.
            </p>
            <p>En este artículo te explicamos cuándo tiene sentido cada opción y cuándo no.</p>
          </Section>

          {/* Option 1: No-code */}
          <h2>1. Herramientas no-code y low-code</h2>
          <p>
            Bubble, Webflow, Glide, Softr, Notion + Zapier... Hay decenas de plataformas que prometen que puedes
            construir tu producto sin saber programar. Y es verdad: puedes.
          </p>

          <ComparisonCard
            title="No-code / Low-code"
            pros={[
              'Coste inicial muy bajo (desde 0€)',
              'Velocidad para prototipos y MVP simples',
              'Sin dependencia de desarrolladores',
              'Perfecto para validar hipótesis rápido',
            ]}
            cons={[
              'Límites técnicos cuando el producto crece',
              'Suscripciones mensuales que se acumulan (200-2.000€/mes)',
              'Migración cara si necesitas funcionalidades avanzadas',
              'Rendimiento limitado con grandes volúmenes de datos',
              'Poco control sobre la experiencia de usuario',
            ]}
            verdict="neutral"
            verdictText="Ideal para validar, mal para escalar"
          />

          <p>
            <strong className="text-white">El problema real del no-code:</strong> no es que sea malo, es que tiene
            fecha de caducidad. Funciona perfecto hasta que llegas a 500 usuarios, necesitas una integración custom, o
            quieres un diseño que sea realmente tuyo. A partir de ahí, migrar cuesta más que haber construido bien desde
            el principio.
          </p>

          <Callout type="warning">
            <strong>Cuándo tiene sentido:</strong> Tienes una idea sin validar, presupuesto menor a 500€ y quieres
            probar el mercado antes de invertir. Usa Bubble o Webflow para el MVP, valida, y después construye la versión
            real.
          </Callout>

          {/* Option 2: Freelancer */}
          <h2>2. Freelancers</h2>
          <p>
            Un desarrollador freelance independiente. Puedes encontrarlos en Malt, Upwork, LinkedIn o por referidos.
            Los precios varían mucho: desde 20€/hora un junior de Europa del Este hasta 120€/hora un senior senior en
            España.
          </p>

          <ComparisonCard
            title="Freelancer"
            pros={[
              'Más económico que una agencia (50-80€/hora típico en España)',
              'Comunicación directa con quien construye',
              'Flexibilidad de horario y dedicación',
              'Buenos perfiles para proyectos bien definidos',
            ]}
            cons={[
              'Un solo perfil = un solo conjunto de habilidades',
              'Riesgo de abandono o baja disponibilidad',
              'Sin garantía de mantenimiento a largo plazo',
              'Sin proceso estructurado ni control de calidad',
              'Difícil gestionar si el proyecto crece',
            ]}
            verdict="neutral"
            verdictText="Bueno para tareas concretas, arriesgado para proyectos críticos"
          />

          <p>
            <strong className="text-white">El problema real del freelancer:</strong> la disponibilidad y continuidad.
            Hemos visto proyectos parados 3 meses porque el freelancer cogió otro cliente, o productos abandonados
            porque el dev decidió cambiar de carrera. Cuando tu negocio depende de un solo desarrollador que no tienes
            contratado, estás asumiendo un riesgo importante.
          </p>

          <Callout type="warning">
            <strong>Cuándo tiene sentido:</strong> Tareas muy concretas y bien definidas (rediseñar una pantalla,
            integrar una API, corregir un bug específico), presupuesto ajustado, y tienes capacidad técnica para
            supervisar el trabajo.
          </Callout>

          {/* Option 3: Agencia */}
          <h2>3. Agencia de desarrollo tradicional</h2>
          <p>
            Una empresa con equipo propio: project managers, diseñadores, frontend, backend, QA. Ofrecen proceso,
            garantías y continuidad. Y cobran en consecuencia.
          </p>

          <ComparisonCard
            title="Agencia tradicional"
            pros={[
              'Equipo multidisciplinar completo',
              'Proceso estructurado y documentado',
              'Mayor seguridad y continuidad',
              'Capacidad para proyectos grandes y complejos',
            ]}
            cons={[
              'Presupuesto mínimo de 15.000-80.000€',
              'Tiempos de entrega de 3-12 meses',
              'Mucha burocracia y reuniones innecesarias',
              'A menudo hablas con un PM, no con quien construye',
              'Overhead de estructura que pagas tú',
            ]}
            verdict="negative"
            verdictText="Justificado solo para proyectos enterprise o muy complejos"
          />

          <p>
            <strong className="text-white">El problema real de las agencias:</strong> el coste de la estructura. Cuando
            contratas una agencia grande, pagas al comercial que te vendió el proyecto, al PM que lo gestiona, al
            arquitecto que lo supervisa, y después al dev que lo construye. Ese overhead puede representar el 40-60%
            del presupuesto.
          </p>

          <Callout type="warning">
            <strong>Cuándo tiene sentido:</strong> Empresa consolidada con presupuesto +30.000€, proyecto con
            requisitos regulatorios o de seguridad muy exigentes, o cuando necesitas integrar con sistemas legacy
            complejos.
          </Callout>

          {/* The gap */}
          <h2>El hueco que nadie cubría (hasta ahora)</h2>
          <p>
            Fíjate en la situación: si eres una startup o PYME con 2.000-10.000€ de presupuesto y quieres un producto
            real (no un prototipo no-code), tienes un problema. El freelancer es arriesgado, la agencia está fuera de
            precio, y el no-code se queda corto.
          </p>

          <div className="my-8 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="text-left py-3 px-4 text-zinc-400 font-medium"></th>
                  <th className="text-center py-3 px-4 text-zinc-400 font-medium">No-code</th>
                  <th className="text-center py-3 px-4 text-zinc-400 font-medium">Freelancer</th>
                  <th className="text-center py-3 px-4 text-zinc-400 font-medium">Agencia</th>
                  <th className="text-center py-3 px-4 text-emerald-400 font-medium">Think Better</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {[
                  ['Precio', '0-200€/mes', '3.000-20.000€', '15.000-80.000€', '2.000-7.000€'],
                  ['Tiempo de entrega', '1-2 semanas', '2-6 meses', '3-12 meses', '3-4 semanas'],
                  ['Código propio', '✗', '✓', '✓', '✓'],
                  ['Escalable', '✗', 'Variable', '✓', '✓'],
                  ['Continuidad garantizada', '✗', '✗', '✓', '✓'],
                  ['Precio cerrado', '✓', '✗', 'Raro', '✓'],
                  ['Contacto directo con quien construye', '—', '✓', '✗', '✓'],
                ].map(([label, nocode, freelancer, agencia, tb]) => (
                  <tr key={label} className="hover:bg-zinc-900/50 transition-colors">
                    <td className="py-3 px-4 text-zinc-300 font-medium">{label}</td>
                    <td className="py-3 px-4 text-center text-zinc-500">{nocode}</td>
                    <td className="py-3 px-4 text-center text-zinc-500">{freelancer}</td>
                    <td className="py-3 px-4 text-center text-zinc-500">{agencia}</td>
                    <td className="py-3 px-4 text-center text-emerald-400 font-medium">{tb}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Think Better option */}
          <h2>El estudio AI-first: la cuarta opción</h2>
          <p>
            En Think Better somos un equipo pequeño y especializado que usa IA para multiplicar nuestra capacidad de
            entrega. Esto nos permite ofrecer lo que antes solo tenían las agencias grandes, a precios accesibles para
            startups y PYMEs.
          </p>

          <ComparisonCard
            title="Think Better (estudio AI-first)"
            pros={[
              'Precio desde 2.000€, cerrado antes de empezar',
              'Entrega en 3-4 semanas (no meses)',
              'Código 100% tuyo desde el día 1',
              'Hablas con quien construye, sin PM intermediario',
              'Proceso estructurado: propuesta en 24h, actualizaciones semanales',
              'Escalable: stack tecnológico de nivel enterprise',
            ]}
            cons={[
              'No ideal para proyectos +150.000€ de alcance',
              'Capacidad limitada (máximo 3-4 proyectos simultáneos)',
            ]}
            verdict="positive"
            verdictText="La mejor opción para startups y PYMEs que quieren moverse rápido"
          />

          {/* Decision guide */}
          <h2>Guía de decisión rápida</h2>
          <p>
            Usa este árbol de decisión para saber qué opción encaja con tu situación:
          </p>

          <div className="my-6 space-y-3">
            {[
              {
                condition: '¿Tienes menos de 500€ y quieres validar una idea?',
                answer: '→ No-code (Bubble, Webflow, Glide)',
              },
              {
                condition: '¿Es una tarea puntual y bien definida con alguien técnico supervisando?',
                answer: '→ Freelancer (Malt, Upwork)',
              },
              {
                condition: '¿Es un proyecto enterprise con más de 50.000€ de presupuesto?',
                answer: '→ Agencia tradicional',
              },
              {
                condition: '¿Quieres un producto real, código propio, entrega rápida y precio cerrado?',
                answer: '→ Think Better',
              },
            ].map(({ condition, answer }) => (
              <div key={condition} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <p className="text-zinc-300 text-sm font-medium mb-1">{condition}</p>
                <p className="text-emerald-400 text-sm font-bold">{answer}</p>
              </div>
            ))}
          </div>

          {/* Conclusion */}
          <h2>Conclusión</h2>
          <p>
            No hay una respuesta universal. Cada opción tiene su lugar. La clave está en entender bien dónde estás:
            cuánto presupuesto tienes, qué nivel de riesgo puedes asumir, y qué tan crítico es el producto para tu
            negocio.
          </p>
          <p>
            Si estás en el rango de 2.000-10.000€, quieres código real que escale, y necesitas que alguien de
            confianza lo entregue en semanas —no en meses— entonces vale la pena que hablemos.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-3">¿Listo para saber cuánto cuesta tu proyecto?</h2>
          <p className="text-zinc-400 mb-6 max-w-md mx-auto">
            Nuestro asistente IA analiza tu proyecto en 10 minutos y te da un precio exacto. Sin compromiso.
          </p>
          <Link
            to="/cuestionario"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 transition-colors"
          >
            Calcular precio de mi proyecto
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Related */}
        <div className="mt-12 pt-8 border-t border-zinc-800">
          <h3 className="text-zinc-400 text-sm font-medium mb-4">Artículos relacionados</h3>
          <Link
            to="/blog/cuanto-cuesta-desarrollar-una-app-en-espana-2026"
            className="group flex items-center justify-between p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 hover:bg-zinc-900 transition-all"
          >
            <div>
              <p className="text-white font-medium group-hover:text-emerald-400 transition-colors text-sm">
                Cuánto cuesta desarrollar una app en España en 2026
              </p>
              <p className="text-zinc-500 text-xs mt-1">Guía de precios · 8 min</p>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 transition-colors flex-shrink-0" />
          </Link>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 text-center text-zinc-600 text-sm">
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

/* ─── Sub-components ──────────────────────────────────────── */

function Section({ children }: { children: ReactNode }) {
  return <div className="mb-8 space-y-4 text-zinc-300 leading-relaxed">{children}</div>;
}

function ComparisonCard({
  title,
  pros,
  cons,
  verdict,
  verdictText,
}: {
  title: string;
  pros: string[];
  cons: string[];
  verdict: 'positive' | 'neutral' | 'negative';
  verdictText: string;
}) {
  const verdictColors = {
    positive: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    neutral: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    negative: 'bg-red-500/10 border-red-500/30 text-red-400',
  };

  return (
    <div className="my-6 rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden">
      <div className="px-6 pt-5 pb-4 border-b border-zinc-800">
        <h3 className="text-white font-bold text-lg">{title}</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
        <div className="p-5">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">Ventajas</p>
          <ul className="space-y-2">
            {pros.map((pro) => (
              <li key={pro} className="flex items-start gap-2.5 text-sm text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-5">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">Inconvenientes</p>
          <ul className="space-y-2">
            {cons.map((con) => (
              <li key={con} className="flex items-start gap-2.5 text-sm text-zinc-300">
                <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={`px-6 py-3 border-t border-zinc-800 rounded-b-2xl ${verdictColors[verdict]}`}>
        <p className="text-sm font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {verdictText}
        </p>
      </div>
    </div>
  );
}

function Callout({ type, children }: { type: 'info' | 'warning'; children: ReactNode }) {
  const colors =
    type === 'warning'
      ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
      : 'bg-blue-500/10 border-blue-500/30 text-blue-200';
  return (
    <div className={`my-6 p-5 rounded-xl border ${colors} text-sm leading-relaxed`}>{children}</div>
  );
}
