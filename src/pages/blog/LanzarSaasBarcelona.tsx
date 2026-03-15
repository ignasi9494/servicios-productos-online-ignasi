import { useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Clock, Calendar, ArrowLeft, CheckCircle2, Rocket, Layers, Zap, Shield } from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePageMeta } from '../../hooks/usePageMeta';

export function LanzarSaasBarcelona() {
  usePageTitle('Cómo lanzar un SaaS en Barcelona en menos de 30 días — Think Better');
  usePageMeta(
    'El stack técnico, el proceso y las herramientas que usamos para entregar SaaS completos en 3-4 semanas. Casos reales de proyectos entregados desde Barcelona.',
  );

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Cómo lanzar un SaaS en Barcelona en menos de 30 días',
      description:
        'El stack técnico, el proceso y las herramientas que usamos para entregar SaaS completos en 3-4 semanas. Casos reales de proyectos entregados.',
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
        '@id': 'https://servicios-productos-online-ignasi.vercel.app/blog/como-lanzar-saas-barcelona-30-dias',
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
            <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 text-xs font-medium">Casos de estudio</span>
            <span className="flex items-center gap-1.5 text-zinc-500 text-xs">
              <Calendar className="w-3.5 h-3.5" />
              15 mar 2026
            </span>
            <span className="flex items-center gap-1.5 text-zinc-500 text-xs">
              <Clock className="w-3.5 h-3.5" />
              10 min de lectura
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Cómo lanzar un SaaS en Barcelona en menos de 30 días
          </h1>

          <p className="text-xl text-zinc-400 leading-relaxed mb-10 max-w-3xl">
            El stack, el proceso y las decisiones clave que nos permiten entregar plataformas SaaS completas en 3-4
            semanas. Sin recortar funcionalidades. Sin deuda técnica.
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
              Cuando le decimos a un founder que podemos tener su SaaS funcionando en producción en menos de un mes,
              la reacción habitual es escepticismo. "Eso es imposible sin recortar funcionalidades", nos dicen.
            </p>
            <p>
              Pues bien: en los últimos dos años hemos entregado más de 30 proyectos desde Barcelona —landing pages,
              plataformas SaaS, apps de gestión, e-commerces— con un tiempo medio de entrega de 22 días. Con código
              real, escalable, y 100% propiedad del cliente.
            </p>
            <p>
              En este artículo te explicamos exactamente cómo lo hacemos: el stack técnico, el proceso de trabajo y
              las decisiones que marcan la diferencia.
            </p>
          </Section>

          {/* Why 30 days is possible */}
          <h2>Por qué 30 días es posible (y por qué antes no lo era)</h2>
          <p>
            Hace cinco años, construir un SaaS completo —con autenticación, base de datos, pagos, panel de
            administración y API— requería semanas solo de configuración de infraestructura. Hoy, las herramientas
            han cambiado radicalmente.
          </p>
          <p>
            La combinación de plataformas BaaS (Backend as a Service), herramientas AI-first para acelerar el
            desarrollo, y un proceso de trabajo muy afinado ha comprimido los tiempos de manera que habría parecido
            imposible en 2020.
          </p>

          <Callout type="info">
            <strong>La clave real:</strong> no es trabajar más rápido. Es eliminar el tiempo que antes se dedicaba
            a configuración, boilerplate y trabajo repetitivo. Nosotros dedicamos el 80% del tiempo a las
            funcionalidades que dan valor al negocio, no a la infraestructura.
          </Callout>

          {/* The stack */}
          <h2>El stack técnico que usamos</h2>
          <p>
            Después de experimentar con múltiples combinaciones, hemos convergido en un stack que maximiza la
            velocidad sin sacrificar calidad:
          </p>

          <div className="my-8 space-y-4">
            <StackLayer
              icon={<Layers className="w-5 h-5 text-cyan-400" />}
              layer="Frontend"
              tech="React 19 + TypeScript + Vite + Tailwind CSS v4"
              why="Tipado estricto elimina errores en producción. Tailwind v4 con compilación instantánea. React 19 con Concurrent Mode para UX fluida."
            />
            <StackLayer
              icon={<Shield className="w-5 h-5 text-emerald-400" />}
              layer="Backend / BaaS"
              tech="Supabase (PostgreSQL + Auth + Storage + Realtime + Edge Functions)"
              why="Elimina semanas de configuración de infraestructura. Auth completo en minutos. PostgreSQL real (no Firebase) con RLS para seguridad a nivel de fila."
            />
            <StackLayer
              icon={<Zap className="w-5 h-5 text-amber-400" />}
              layer="Pagos"
              tech="Stripe (checkout sessions + webhooks + Customer Portal)"
              why="El estándar del sector. Integración en horas, no días. Soporta pagos únicos, suscripciones y facturación automática."
            />
            <StackLayer
              icon={<Rocket className="w-5 h-5 text-purple-400" />}
              layer="Deploy"
              tech="Vercel (frontend) + Supabase Cloud (backend)"
              why="Deploy en segundos con cada push. CDN global, SSL automático, previews por rama. Sin ops, sin DevOps, sin servidores que gestionar."
            />
          </div>

          <p>
            <strong className="text-white">¿Por qué no Next.js?</strong> Para la mayoría de los SaaS que construimos,
            el SSR no aporta suficiente valor para justificar la complejidad añadida. React + Vite + Supabase nos da
            velocidad de desarrollo superior y bundle sizes más pequeños para apps autenticadas donde el SEO no es
            el factor crítico.
          </p>

          <p>
            <strong className="text-white">¿Por qué Supabase y no Firebase?</strong> PostgreSQL real. Row Level Security.
            Migraciones versionadas. Edge Functions en Deno. Y sin vendor lock-in: puedes exportar tu base de datos
            en cualquier momento.
          </p>

          {/* The process */}
          <h2>El proceso de trabajo: semana a semana</h2>
          <p>
            El stack es importante, pero el proceso es lo que realmente marca la diferencia. Así funciona una entrega
            típica de 4 semanas:
          </p>

          <div className="my-8 space-y-4">
            {[
              {
                week: 'Semana 1',
                title: 'Diseño y arquitectura',
                tasks: [
                  'Cuestionario AI inicial (10-15 preguntas sobre el negocio)',
                  'Propuesta definitiva con alcance exacto y precio cerrado',
                  'Diseño de la base de datos y flujos de usuario',
                  'Setup del proyecto: repositorio, CI/CD, entornos dev/prod',
                  'Primeras pantallas de la app (autenticación, layout principal)',
                ],
              },
              {
                week: 'Semana 2',
                title: 'Core del producto',
                tasks: [
                  'Funcionalidades principales del producto (el "core loop")',
                  'Integraciones clave (Stripe, email, storage)',
                  'Panel de administración básico',
                  'Primera demo al cliente: URL de preview funcional',
                ],
              },
              {
                week: 'Semana 3',
                title: 'Features secundarias + pulido',
                tasks: [
                  'Features secundarias del backlog priorizado',
                  'Optimizaciones de UX y feedback del cliente',
                  'Testing de flujos críticos (pago, registro, core actions)',
                  'SEO básico: meta tags, OG, sitemap, robots.txt',
                ],
              },
              {
                week: 'Semana 4',
                title: 'Preparación para lanzamiento',
                tasks: [
                  'Revisión de seguridad (RLS policies, env vars, CORS)',
                  'Configuración de dominio custom + certificados SSL',
                  'Documentación técnica básica para el equipo del cliente',
                  'Entrega del repositorio + credenciales + handoff',
                  'Soporte post-lanzamiento los primeros 7 días',
                ],
              },
            ].map(({ week, title, tasks }) => (
              <WeekCard key={week} week={week} title={title} tasks={tasks} />
            ))}
          </div>

          {/* What makes it fast */}
          <h2>Las 5 decisiones que comprimen el tiempo</h2>
          <p>
            Después de entregar más de 30 proyectos, hemos identificado los factores que más impactan en la velocidad:
          </p>

          <div className="my-6 space-y-4">
            {[
              {
                num: '1',
                title: 'Alcance bien definido antes de empezar',
                desc: 'El mayor asesino de timelines es el scope creep. Antes de escribir una sola línea de código, el alcance está documentado y firmado. Cada funcionalidad tiene criterios de aceptación claros.',
              },
              {
                num: '2',
                title: 'Un único punto de contacto por proyecto',
                desc: 'Sin juntas de revisión con cinco personas. Sin aprobaciones en cadena. El cliente tiene un interlocutor directo que también es quien construye. Las decisiones se toman en minutos, no en días.',
              },
              {
                num: '3',
                title: 'Preview URL desde el día 5',
                desc: 'El cliente ve el producto funcionando desde la primera semana. Esto elimina la brecha entre expectativas y realidad, y permite ajustes tempranos antes de que sean caros.',
              },
              {
                num: '4',
                title: 'Feedback asíncrono por defecto',
                desc: 'No esperamos una reunión semanal para incorporar feedback. El cliente comenta en la plataforma en cualquier momento, y lo incorporamos en el mismo sprint.',
              },
              {
                num: '5',
                title: 'Stack sin sorpresas',
                desc: 'Usamos el mismo stack en todos los proyectos. No reinventamos la rueda. Cada proyecto se beneficia de las soluciones que descubrimos en los anteriores.',
              },
            ].map(({ num, title, desc }) => (
              <div key={num} className="flex gap-4 p-5 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-sm flex items-center justify-center">
                  {num}
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">{title}</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* What a SaaS needs */}
          <h2>¿Qué necesita un SaaS mínimo viable?</h2>
          <p>
            Una pregunta que nos hacen constantemente: ¿qué funcionalidades son imprescindibles para lanzar y cuáles
            pueden esperar? Después de varios proyectos, hemos establecido este checklist:
          </p>

          <div className="my-6 grid md:grid-cols-2 gap-4">
            <ChecklistCard
              title="MVP indispensable"
              items={[
                'Autenticación (registro, login, recuperación de contraseña)',
                'Roles de usuario (cliente / admin)',
                'Core feature del producto (la razón por la que existe)',
                'Panel de administración básico',
                'Pasarela de pago (si el modelo es SaaS)',
                'Email transaccional (confirmaciones, notificaciones)',
                'Deploy en dominio propio con SSL',
              ]}
              color="emerald"
            />
            <ChecklistCard
              title="Para la v2 (semana 5+)"
              items={[
                'Analytics avanzados y dashboards',
                'Integraciones con terceros (CRM, ERP, APIs externas)',
                'App móvil nativa',
                'Multi-idioma',
                'API pública para desarrolladores',
                'SSO (SAML, OAuth enterprise)',
                'Facturación automática avanzada',
              ]}
              color="zinc"
            />
          </div>

          <Callout type="warning">
            <strong>El error más frecuente:</strong> querer construir la v2 en el MVP. Hemos visto proyectos que
            llevan 8 meses en desarrollo porque el cliente quería "todo" desde el principio. Un SaaS que lleva 8
            meses sin lanzar es un SaaS sin clientes, sin feedback real, y sin ingresos. Lanza la v1 en 4 semanas
            y mejora con feedback real.
          </Callout>

          {/* Case study */}
          <h2>Caso real: plataforma de gestión para consultoría</h2>
          <p>
            Para que no sea todo teoría, un ejemplo concreto. Un cliente de Barcelona nos contactó con el objetivo
            de digitalizar la gestión de proyectos de su consultoría: propuestas, seguimiento, pagos y comunicación
            con clientes.
          </p>

          <div className="my-6 p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { label: 'Tiempo de entrega', value: '26 días' },
                { label: 'Presupuesto', value: '3.500 €' },
                { label: 'Pantallas entregadas', value: '18' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-2xl font-bold text-emerald-400">{value}</p>
                  <p className="text-zinc-500 text-xs mt-1">{label}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-zinc-800 pt-4">
              <p className="text-zinc-400 text-sm leading-relaxed">
                <strong className="text-white">Funcionalidades entregadas:</strong> Auth con roles (admin/cliente),
                dashboard de proyectos con estados, chat interno con notificaciones en tiempo real, generación de
                propuestas con IA, gestión de pagos con Stripe, vista previa de la app en desarrollo, y exportación
                del código al cierre del proyecto. Todo en 26 días.
              </p>
            </div>
          </div>

          {/* Barcelona ecosystem */}
          <h2>El ecosistema SaaS en Barcelona en 2026</h2>
          <p>
            Barcelona es el hub tecnológico más activo de España y uno de los principales de Europa. El ecosistema
            ha madurado mucho: hay capital disponible, talento técnico, y una comunidad de founders cada vez más
            sofisticada.
          </p>
          <p>
            Lo que también ha crecido es la competencia. En 2026, un SaaS con mal diseño, lentitud o experiencia
            de usuario mediocre tiene pocas posibilidades. Los usuarios esperan calidad desde el día 1, incluso
            en una beta privada.
          </p>
          <p>
            Por eso el stack importa más que nunca. No porque las tecnologías sean mágicas, sino porque las
            herramientas correctas te permiten dedicar tiempo a lo que realmente importa: entender a tus usuarios
            y construir lo que necesitan.
          </p>

          {/* Conclusion */}
          <h2>Conclusión</h2>
          <p>
            Lanzar un SaaS en menos de 30 días no es una promesa vacía. Es el resultado de combinar el stack
            correcto, un proceso bien definido, y la disciplina de no construir lo que no necesitas aún.
          </p>
          <p>
            Si tienes una idea de SaaS y quieres saber exactamente cuánto costaría y cuánto tardaríamos, nuestro
            asistente IA te da un precio estimado en 10 minutos. Sin compromiso y sin reuniones previas.
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
          <h2 className="text-2xl font-bold text-white mb-3">¿Tienes una idea de SaaS?</h2>
          <p className="text-zinc-400 mb-6 max-w-md mx-auto">
            Cuéntanos tu proyecto y en 10 minutos sabes cuánto cuesta y en cuánto tiempo lo tendríamos listo.
          </p>
          <Link
            to="/cuestionario"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 transition-colors"
          >
            Calcular precio de mi SaaS
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Related */}
        <div className="mt-12 pt-8 border-t border-zinc-800">
          <h3 className="text-zinc-400 text-sm font-medium mb-4">Artículos relacionados</h3>
          <div className="space-y-3">
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
            <Link
              to="/blog/agencia-vs-freelancer-vs-nocode-2026"
              className="group flex items-center justify-between p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 hover:bg-zinc-900 transition-all"
            >
              <div>
                <p className="text-white font-medium group-hover:text-emerald-400 transition-colors text-sm">
                  Agencia vs freelancer vs no-code: ¿cuál elegir en 2026?
                </p>
                <p className="text-zinc-500 text-xs mt-1">Comparativa · 6 min</p>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 transition-colors flex-shrink-0" />
            </Link>
          </div>
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

function Callout({ type, children }: { type: 'info' | 'warning'; children: ReactNode }) {
  const colors =
    type === 'warning'
      ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
      : 'bg-blue-500/10 border-blue-500/30 text-blue-200';
  return (
    <div className={`my-6 p-5 rounded-xl border ${colors} text-sm leading-relaxed`}>{children}</div>
  );
}

function StackLayer({
  icon,
  layer,
  tech,
  why,
}: {
  icon: ReactNode;
  layer: string;
  tech: string;
  why: string;
}) {
  return (
    <div className="flex gap-4 p-5 rounded-xl bg-zinc-900 border border-zinc-800">
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div>
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-0.5">{layer}</p>
        <p className="text-white font-semibold text-sm mb-1">{tech}</p>
        <p className="text-zinc-400 text-sm leading-relaxed">{why}</p>
      </div>
    </div>
  );
}

function WeekCard({ week, title, tasks }: { week: string; title: string; tasks: string[] }) {
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden">
      <div className="px-5 py-4 border-b border-zinc-800 flex items-center gap-3">
        <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">{week}</span>
        <span className="text-white font-semibold">{title}</span>
      </div>
      <ul className="p-5 space-y-2">
        {tasks.map((task) => (
          <li key={task} className="flex items-start gap-2.5 text-sm text-zinc-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-500/60 flex-shrink-0 mt-0.5" />
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChecklistCard({
  title,
  items,
  color,
}: {
  title: string;
  items: string[];
  color: 'emerald' | 'zinc';
}) {
  const headerColors = color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-800 text-zinc-400';
  const iconColor = color === 'emerald' ? 'text-emerald-500' : 'text-zinc-600';
  return (
    <div className="rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden">
      <div className={`px-5 py-3 text-sm font-semibold ${headerColors}`}>{title}</div>
      <ul className="p-5 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-400">
            <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${iconColor}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
