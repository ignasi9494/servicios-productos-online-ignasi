import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';
import { usePageMeta } from '../hooks/usePageMeta';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  ready: boolean;
}

const posts: BlogPost[] = [
  {
    slug: 'cuanto-cuesta-desarrollar-una-app-en-espana-2026',
    title: 'Cuánto cuesta desarrollar una app en España en 2026',
    description:
      'Guía completa con precios reales. Comparativa entre agencias, freelancers y estudios AI-first. Rangos por tipo de proyecto y consejos para reducir costes.',
    category: 'Guía de precios',
    date: '15 mar 2026',
    readTime: '8 min',
    ready: true,
  },
  {
    slug: 'agencia-vs-freelancer-vs-nocode-2026',
    title: 'Agencia vs freelancer vs no-code: ¿cuál elegir en 2026?',
    description:
      'Análisis honesto de las tres opciones para construir tu producto digital. Cuándo tiene sentido cada una y cuándo Think Better es la alternativa correcta.',
    category: 'Comparativa',
    date: '15 mar 2026',
    readTime: '6 min',
    ready: true,
  },
  {
    slug: 'como-lanzar-saas-barcelona-30-dias',
    title: 'Cómo lanzar un SaaS en Barcelona en menos de 30 días',
    description:
      'El stack técnico, el proceso y las herramientas que usamos para entregar SaaS completos en 3-4 semanas. Casos reales de proyectos entregados.',
    category: 'Casos de estudio',
    date: '15 mar 2026',
    readTime: '10 min',
    ready: true,
  },
  {
    slug: 'que-es-un-mvp-startup',
    title: '¿Qué es un MVP y por qué tu startup lo necesita primero?',
    description:
      'El error más caro que cometen los founders es construir demasiado demasiado pronto. Cómo definir el MVP correcto y validar antes de invertir en el producto completo.',
    category: 'Startup',
    date: '15 mar 2026',
    readTime: '7 min',
    ready: true,
  },
  {
    slug: 'automatizacion-ia-empresas-espana',
    title: 'Automatización con IA para empresas: qué es, cuánto cuesta y por dónde empezar',
    description:
      'El 80% de las empresas pierden entre 10 y 30 horas semanales en tareas automatizables. Guía práctica con casos reales, costes y framework de priorización para 2026.',
    category: 'Automatización',
    date: '15 mar 2026',
    readTime: '9 min',
    ready: true,
  },
  {
    slug: 'pagos-online-espana-stripe-paypal-redsys-2026',
    title: 'Stripe, PayPal o Redsys: cómo aceptar pagos en tu app en España en 2026',
    description:
      'Comparativa definitiva de pasarelas de pago para el mercado español: comisiones reales, Bizum, tiempo de integración y cuál elegir según tu tipo de negocio. Con caso real de +23% conversión.',
    category: 'Pagos',
    date: '15 mar 2026',
    readTime: '8 min',
    ready: true,
  },
  {
    slug: 'seo-tecnico-saas-espana-2026',
    title: 'SEO técnico para SaaS en España 2026: guía completa con checklist',
    description:
      'El 90% de los SaaS españoles pierden tráfico orgánico por errores técnicos resolubles en un sprint. Core Web Vitals, indexación de SPAs, schema markup y arquitectura de URLs con checklist de 32 puntos.',
    category: 'SEO',
    date: '16 mar 2026',
    readTime: '11 min',
    ready: true,
  },
  {
    slug: 'supabase-vs-firebase-startups-2026',
    title: 'Supabase vs Firebase para startups en 2026: comparativa completa',
    description:
      'SQL vs NoSQL, precios reales, GDPR, autenticación y tiempo real. Qué backend-as-a-service elegir para tu SaaS en 2026 con casos reales de migración y árbol de decisión de 5 preguntas.',
    category: 'Tecnología',
    date: '16 mar 2026',
    readTime: '9 min',
    ready: true,
  },
  {
    slug: 'pitch-tecnico-inversores-2026',
    title: 'Cómo hacer un pitch técnico que convenza a inversores',
    description:
      'Los inversores no son técnicos pero detectan la falta de rigor al instante. Guía completa con estructura, métricas clave, errores fatales y plantilla de slide técnico para rondas seed y serie A.',
    category: 'Startup',
    date: '16 mar 2026',
    readTime: '10 min',
    ready: true,
  },
  {
    slug: 'react-vs-nextjs-saas-2026',
    title: 'React vs Next.js para SaaS: cuándo usar cada uno en 2026',
    description:
      'React puro o Next.js para tu SaaS en 2026: comparativa completa con casos reales. CSR vs SSR, rendimiento, SEO, coste de desarrollo y árbol de decisión de 5 preguntas. Basado en +30 proyectos SaaS.',
    category: 'Tecnología',
    date: '16 mar 2026',
    readTime: '9 min',
    ready: true,
  },
  {
    slug: 'validar-idea-negocio-saas',
    title: 'Cómo validar una idea de negocio SaaS antes de gastar un euro',
    description:
      'El 90% de los SaaS fracasan por construir algo que nadie quiere pagar. Framework completo de validación: entrevistas de problema, smoke test, Concierge MVP, unit economics y checklist de 10 puntos.',
    category: 'Startup',
    date: '16 mar 2026',
    readTime: '10 min',
    ready: true,
  },
  {
    slug: 'tailwind-css-vs-css-tradicional-2026',
    title: 'Tailwind CSS vs CSS tradicional: guía completa para elegir en 2026',
    description:
      'Comparativa definitiva utility-first vs BEM/Sass/Módulos CSS. Bundle size real, velocidad de desarrollo, mantenibilidad, Tailwind v4 y caso real de migración de 847 KB → 11 KB. Con árbol de decisión y checklist.',
    category: 'CSS / Frontend',
    date: '16 mar 2026',
    readTime: '10 min',
    ready: true,
  },
  {
    slug: 'typescript-saas-2026',
    title: 'TypeScript en 2026: por qué es imprescindible para SaaS y cómo empezar',
    description:
      'El 78% de los proyectos profesionales usan TypeScript. Por qué el sistema de tipos elimina el 15-38% de bugs antes de producción, comparativa completa con JS, guía de migración en 8 días y caso real con -71% de bugs en 30 días.',
    category: 'Tecnología',
    date: '16 mar 2026',
    readTime: '11 min',
    ready: true,
  },
  {
    slug: 'equipo-desarrollo-saas-2-5-personas',
    title: 'Cómo estructurar un equipo de desarrollo de 2-5 personas para un SaaS',
    description:
      'Guía práctica para montar el equipo de desarrollo mínimo viable para un SaaS. Roles esenciales, roadmap de contratación por fase, qué externalizar, los 5 errores más caros y caso real de 0 a 120k€ ARR con 5 personas.',
    category: 'Equipos',
    date: '16 mar 2026',
    readTime: '11 min',
    ready: true,
  },
  {
    slug: 'microservicios-vs-monolito-saas-2026',
    title: 'Microservicios vs monolito para startups SaaS en 2026',
    description:
      'El 72% de los SaaS que empiezan con microservicios los abandonan antes de 50k€ MRR. Comparativa técnica completa, árbol de decisión de 5 preguntas, guía de migración incremental y caso real de -88% coste infra con arquitectura híbrida.',
    category: 'Arquitectura',
    date: '16 mar 2026',
    readTime: '12 min',
    ready: true,
  },
  {
    slug: 'supabase-auth-rls-produccion',
    title: 'Cómo usar Supabase Auth en producción: guía completa con Row Level Security',
    description:
      'El 60% de los SaaS con Supabase tienen brechas de seguridad en sus políticas RLS. Guía definitiva con los 4 patrones de acceso, los 6 errores críticos, optimización de rendimiento y checklist de 12 puntos para producción.',
    category: 'Seguridad',
    date: '16 mar 2026',
    readTime: '12 min',
    ready: true,
  },
  {
    slug: 'descubrimiento-producto-saas-b2b',
    title: 'De idea a producto: el proceso de descubrimiento de producto para SaaS B2B',
    description:
      'El 85% de los SaaS B2B fallan por construir lo que el fundador quiere, no lo que el mercado necesita. Guía completa de product discovery: Jobs to Be Done, entrevistas de cliente, opportunity scoring, 5 errores fatales y caso real de 0 a 19.104€ ARR en 5 semanas.',
    category: 'Product Management',
    date: '16 mar 2026',
    readTime: '12 min',
    ready: true,
  },
  {
    slug: 'github-actions-cicd-saas-2026',
    title: 'CI/CD con GitHub Actions para SaaS en 2026: guía completa',
    description:
      'La mayoría de startups despliegan a mano durante meses. Con un pipeline de CI/CD bien configurado tardas 20 minutos en montarlo y eliminas los bugs en producción de forma casi permanente. Pipeline completo: type-check, build, deploy a Vercel, migraciones de Supabase y preview deploys por PR.',
    category: 'DevOps',
    date: '16 mar 2026',
    readTime: '11 min',
    ready: true,
  },
  {
    slug: 'rendimiento-react-core-web-vitals-2026',
    title: 'Optimización de rendimiento en React: cómo mejorar los Core Web Vitals de tu SaaS',
    description:
      'El 53% de los usuarios abandona si una página tarda más de 3 segundos. Guía técnica completa: code splitting, memoización, virtualización de listas, optimización de imágenes y CLS. Caso real: LCP 4.8s → 1.6s, INP 380ms → 85ms, conversión +139%.',
    category: 'Performance',
    date: '16 mar 2026',
    readTime: '12 min',
    ready: true,
  },
  {
    slug: 'modelo-precios-saas-freemium-trial-suscripcion',
    title: 'Cómo elegir el modelo de precios para tu SaaS: freemium, trial, suscripción o pago único',
    description:
      'El 87% de los SaaS que fracasan tienen un buen producto. Lo que fallan es el modelo de monetización. Comparativa completa: freemium vs free trial vs suscripción vs pago único vs usage-based. Métricas reales de conversión, LTV, churn y caso real de ARR ×3 en 90 días.',
    category: 'Negocio SaaS',
    date: '16 mar 2026',
    readTime: '11 min',
    ready: true,
  },
  {
    slug: 'testing-react-vitest-testing-library',
    title: 'Testing en React con Vitest y Testing Library: guía práctica para equipos SaaS',
    description:
      'El 68% de los bugs en producción los encuentran primero los usuarios. Guía completa: cómo configurar Vitest + Testing Library, la pirámide de testing para SaaS, unit tests, integration tests, mocking de Supabase y Stripe con MSW, y caso real de 0 a 81% de cobertura en 2 semanas.',
    category: 'Testing',
    date: '16 mar 2026',
    readTime: '13 min',
    ready: true,
  },
];

export function Blog() {
  usePageTitle('Blog — Think Better | Desarrollo de Software en Barcelona');
  usePageMeta(
    'Guías, comparativas y casos de estudio sobre desarrollo de software, precios de apps y SaaS en España. Por el equipo de Think Better, estudio AI-first en Barcelona.',
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      {/* Navbar */}
      <nav className="border-b border-zinc-900 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
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

      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wide mb-4">
            Blog
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Recursos para builders y founders
          </h1>
          <p className="text-zinc-400 text-xl max-w-2xl">
            Guías prácticas sobre desarrollo de software, precios reales y estrategias para lanzar productos
            digitales en España.
          </p>
        </motion.div>

        {/* Posts grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              {post.ready ? (
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col h-full p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 hover:bg-zinc-900 transition-all"
                >
                  <PostCard post={post} />
                </Link>
              ) : (
                <div className="flex flex-col h-full p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 opacity-60">
                  <PostCard post={post} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 p-8 rounded-2xl bg-zinc-900 border border-zinc-800 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-3">¿Quieres saber cuánto cuesta tu proyecto?</h2>
          <p className="text-zinc-400 mb-6">
            10 minutos. Precio exacto. Sin compromiso.
          </p>
          <Link
            to="/cuestionario"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 transition-colors"
          >
            Calcular precio de mi proyecto
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 text-center text-zinc-600 text-sm">
        <p>
          © 2026 Think Better — Estudio AI-first de desarrollo de software en Barcelona
          {' · '}
          <Link to="/" className="hover:text-zinc-400 transition-colors">Inicio</Link>
          {' · '}
          <Link to="/privacidad" className="hover:text-zinc-400 transition-colors">Privacidad</Link>
        </p>
      </footer>
    </div>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <>
      <div className="flex items-center gap-3 text-xs text-zinc-500 mb-3">
        <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">{post.category}</span>
        {!post.ready && (
          <span className="px-2 py-0.5 rounded-full bg-zinc-800/50 text-zinc-600">Próximamente</span>
        )}
      </div>
      <h2 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors leading-snug">
        {post.title}
      </h2>
      <p className="text-zinc-400 text-sm leading-relaxed flex-1 mb-4">{post.description}</p>
      <div className="flex items-center gap-4 text-xs text-zinc-600 mt-auto">
        <span className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          {post.date}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {post.readTime}
        </span>
        {post.ready && (
          <span className="ml-auto flex items-center gap-1 text-emerald-400 font-medium">
            Leer <ArrowRight className="w-3.5 h-3.5" />
          </span>
        )}
      </div>
    </>
  );
}
