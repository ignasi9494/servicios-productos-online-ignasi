import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Zap,
  Globe,
  Lock,
  LayoutDashboard,
  TrendingUp,
  Code2,
} from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePageMeta } from '../../hooks/usePageMeta';

export function ReactVsNextjs() {
  usePageTitle('React vs Next.js para SaaS: cuándo usar cada uno en 2026 — Think Better');
  usePageMeta(
    'React o Next.js para tu SaaS en 2026: comparativa completa con casos reales. CSR vs SSR, SEO, rendimiento, coste de desarrollo y árbol de decisión de 5 preguntas. Basado en +30 proyectos SaaS.',
  );

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'React vs Next.js para SaaS: cuándo usar cada uno en 2026',
      description:
        'React o Next.js para tu SaaS en 2026: comparativa completa con casos reales. CSR vs SSR, SEO, rendimiento, coste de desarrollo y árbol de decisión de 5 preguntas.',
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
          'https://servicios-productos-online-ignasi.vercel.app/blog/react-vs-nextjs-saas-2026',
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
          <span className="inline-block bg-cyan-500/10 text-cyan-400 text-xs font-semibold px-3 py-1 rounded-full border border-cyan-500/20 mb-4 uppercase tracking-wider">
            Tecnología
          </span>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6">
            React vs Next.js para SaaS: cuándo usar cada uno en 2026
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed mb-6">
            La pregunta que todo founder técnico se hace antes de arrancar: ¿React puro con Vite o
            Next.js? La respuesta depende de tu tipo de SaaS, tu equipo y tus objetivos de SEO.
            Aquí tienes la guía definitiva con casos reales.
          </p>
          <div className="flex items-center gap-4 text-sm text-zinc-500 mb-12">
            <span>16 mar 2026</span>
            <span>·</span>
            <span>9 min de lectura</span>
            <span>·</span>
            <span>Think Better</span>
          </div>
        </motion.div>

        <div className="article-body space-y-12">

          {/* Intro */}
          <section>
            <p className="text-lg text-zinc-300 leading-relaxed">
              En 2026, la discusión React vs Next.js sigue siendo una de las más frecuentes en
              proyectos SaaS. No porque no haya una respuesta correcta, sino porque{' '}
              <strong>la respuesta correcta depende de qué estás construyendo</strong>.
            </p>
            <p className="text-zinc-400 leading-relaxed mt-4">
              En Think Better hemos entregado más de 30 proyectos SaaS usando ambas tecnologías. En
              2023 usábamos Next.js para casi todo. En 2024 viramos hacia React + Vite para la
              mayoría de SaaS B2B. En 2025 volvimos a usar Next.js selectivamente. Lo que aprendimos
              en ese camino es lo que te explico en este artículo.
            </p>
          </section>

          {/* Section 1: La diferencia fundamental */}
          <section>
            <h2 className="text-2xl font-bold mb-6">La diferencia fundamental: dónde se renderiza</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Antes de hablar de cuándo usar cada uno, necesitas entender la diferencia de raíz.
              Todo lo demás es consecuencia de esto.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* React */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="font-bold text-lg">React + Vite (CSR)</h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  <strong className="text-zinc-300">Client-Side Rendering.</strong> El servidor
                  envía un HTML vacío con un bundle de JavaScript. El navegador descarga el JS,
                  lo ejecuta y construye la UI en el cliente.
                </p>
                <ul className="space-y-2 text-sm text-zinc-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    Build times ultrarrápidos (Vite: &lt;1s en dev)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    Menos complejidad de configuración
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    Estado global más sencillo (no hay hidratación)
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                    SEO deficiente en páginas públicas
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                    TTFB más alto (el JS bloquea el primer render)
                  </li>
                </ul>
              </div>

              {/* Next.js */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="font-bold text-lg">Next.js (SSR/SSG/ISR)</h3>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  <strong className="text-zinc-300">Server-Side Rendering + más.</strong> El
                  servidor pre-renderiza el HTML antes de enviarlo al cliente. Soporta SSR, SSG
                  (páginas estáticas), ISR (revalidación incremental) y API Routes nativas.
                </p>
                <ul className="space-y-2 text-sm text-zinc-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    Excelente SEO (HTML completo en primer byte)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    API Routes sin backend separado
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    Image optimization y font optimization integrados
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                    Mayor complejidad (Server/Client components)
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                    Lock-in con Vercel para funciones avanzadas
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: Tabla comparativa */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Comparativa técnica: métricas que importan</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left py-3 pr-4 text-zinc-400 font-medium">Métrica</th>
                    <th className="text-left py-3 px-4 text-blue-400 font-medium">React + Vite</th>
                    <th className="text-left py-3 px-4 text-emerald-400 font-medium">Next.js 15</th>
                    <th className="text-left py-3 pl-4 text-zinc-400 font-medium">¿Importa si…?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {[
                    {
                      metric: 'Dev server startup',
                      react: '< 300ms (Vite)',
                      next: '~3-8s (Turbopack)',
                      when: 'DX en equipos grandes',
                    },
                    {
                      metric: 'LCP (Largest Contentful Paint)',
                      react: '2-4s (sin SSR)',
                      next: '0.8-1.5s (SSG/ISR)',
                      when: 'Landing pages públicas',
                    },
                    {
                      metric: 'SEO out-of-the-box',
                      react: 'Deficiente (SPA)',
                      next: 'Excelente (SSR/SSG)',
                      when: 'Necesitas tráfico orgánico',
                    },
                    {
                      metric: 'Bundle size inicial',
                      react: '~80-150kB (tree-shaking)',
                      next: '~120-200kB (runtime)',
                      when: 'Usuarios en móvil/3G',
                    },
                    {
                      metric: 'API Routes / BFF',
                      react: 'Necesitas backend separado',
                      next: 'Integrado (Route Handlers)',
                      when: 'Quieres monorepo simple',
                    },
                    {
                      metric: 'Curva de aprendizaje',
                      react: 'Baja (solo React)',
                      next: 'Media-alta (App Router)',
                      when: 'Equipo pequeño / junior',
                    },
                    {
                      metric: 'Deploy cost (Vercel)',
                      react: 'Gratis (static)',
                      next: 'Pro plan para SSR ($20/mes)',
                      when: 'Presupuesto ajustado',
                    },
                    {
                      metric: 'Testing unitario',
                      react: 'Sencillo (Vitest)',
                      next: 'Complejo (mocking server)',
                      when: 'TDD / alta cobertura',
                    },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-zinc-900/50 transition-colors">
                      <td className="py-3 pr-4 text-zinc-300 font-medium">{row.metric}</td>
                      <td className="py-3 px-4 text-zinc-400">{row.react}</td>
                      <td className="py-3 px-4 text-zinc-400">{row.next}</td>
                      <td className="py-3 pl-4 text-zinc-500 text-xs">{row.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: Cuándo usar React */}
          <section>
            <h2 className="text-2xl font-bold mb-2">Cuándo usar React + Vite</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              En 2026, React puro con Vite es la elección correcta para la{' '}
              <strong>mayoría de SaaS B2B</strong>. Aquí están los cinco escenarios donde gana
              claramente.
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: <Lock className="w-5 h-5 text-emerald-400" />,
                  title: '1. SaaS detrás de login (B2B, herramientas internas)',
                  desc: 'Si el 90% de tu producto está detrás de autenticación, el SEO de esas páginas no importa. Google no puede indexar /dashboard de todos modos. React + Vite te da mejor DX, builds más rápidos y menos complejidad. El 80% de los SaaS B2B entran en esta categoría.',
                },
                {
                  icon: <LayoutDashboard className="w-5 h-5 text-blue-400" />,
                  title: '2. Dashboards y aplicaciones con mucho estado',
                  desc: 'Herramientas analíticas, CRMs, ERPs, paneles de monitorización. Aplicaciones donde el usuario interactúa continuamente y el estado cambia constantemente. En estas apps, el SSR añade complejidad de hidratación sin beneficio real.',
                },
                {
                  icon: <Zap className="w-5 h-5 text-yellow-400" />,
                  title: '3. Prototipado rápido y MVPs',
                  desc: 'Para validar hipótesis en 2-3 semanas, React + Vite es imbatible. Sin configuración de servidor, sin "use client"/"use server" en cada componente, sin pensar en qué datos van al servidor. Solo construyes. Nosotros usamos Vite para todos los MVPs hasta que hay tracción.',
                },
                {
                  icon: <Code2 className="w-5 h-5 text-purple-400" />,
                  title: '4. Apps con backend ya definido (Supabase, Firebase, API externa)',
                  desc: 'Si ya tienes Supabase o un API REST/GraphQL como backend, las API Routes de Next.js son redundantes. React llama directamente a tu API. Menos capas = menos superficie de error = menos coste de mantenimiento.',
                },
                {
                  icon: <TrendingUp className="w-5 h-5 text-cyan-400" />,
                  title: '5. Equipos pequeños o menos experimentados con React',
                  desc: 'El App Router de Next.js (con Server Components, streaming, Suspense, server actions) tiene una curva de aprendizaje real. Hemos visto equipos de 2-3 devs perder 2 semanas resolviendo bugs de hidratación que no existirían en React puro.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Cuándo usar Next.js */}
          <section>
            <h2 className="text-2xl font-bold mb-2">Cuándo usar Next.js</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Next.js brilla en escenarios específicos donde el{' '}
              <strong>rendimiento en el primer byte y el SEO son críticos</strong>. No lo uses
              porque "es lo que hace todo el mundo" — úsalo cuando realmente lo necesitas.
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: <Globe className="w-5 h-5 text-emerald-400" />,
                  title: '1. Landing pages y marketing sites que necesitan SEO',
                  desc: 'Si tu modelo de adquisición incluye SEO orgánico, Next.js con SSG es la opción correcta. Las páginas se generan como HTML estático en build time. Google las indexa perfectamente. LCP < 1.5s. Con React puro tendrías que añadir un servidor de pre-rendering separado (Prerender.io, etc.) con coste extra.',
                },
                {
                  icon: <TrendingUp className="w-5 h-5 text-blue-400" />,
                  title: '2. Páginas de contenido con SEO competitivo (blog, docs, changelog)',
                  desc: 'Si compites por keywords de alto volumen, necesitas que tus artículos estén completamente renderizados en el primer byte. Next.js con ISR (Incremental Static Regeneration) te da lo mejor: páginas estáticas que se regeneran automáticamente cada X minutos cuando el contenido cambia.',
                },
                {
                  icon: <Zap className="w-5 h-5 text-yellow-400" />,
                  title: '3. E-commerce y catálogos de productos',
                  desc: 'Páginas de producto que necesitan indexarse, meta tags dinámicos para Open Graph y Twitter Cards, y tiempos de carga ultrarrápidos para no perder conversiones. Next.js con SSG + ISR genera miles de páginas de producto en segundos y las revalida cuando cambian precios o stock.',
                },
                {
                  icon: <Code2 className="w-5 h-5 text-purple-400" />,
                  title: '4. SaaS con parte pública indexable y parte privada (modelo freemium)',
                  desc: 'Si tienes páginas de usuario públicas (perfil, portfolio, proyecto compartido) que deben indexarse, Next.js es ideal. Puedes usar SSR para las páginas públicas y Client Components para el dashboard privado dentro del mismo proyecto.',
                },
                {
                  icon: <Lock className="w-5 h-5 text-cyan-400" />,
                  title: '5. Cuando necesitas lógica de servidor cerca del frontend (BFF pattern)',
                  desc: 'Si necesitas combinar datos de múltiples APIs, transformar datos sensibles antes de enviarlos al cliente, o implementar rate limiting sin un backend separado, los Route Handlers de Next.js son elegantes y rápidos de implementar.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Caso real */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Caso real: por qué migramos PlanFlow de Next.js a React</h2>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="font-bold">PlanFlow — Herramienta de planificación de proyectos</p>
                  <p className="text-zinc-500 text-sm">SaaS B2B, 450 usuarios activos, Barcelona</p>
                </div>
              </div>

              <div className="space-y-6 text-sm text-zinc-400 leading-relaxed">
                <div>
                  <h3 className="font-semibold text-zinc-200 mb-2">El problema</h3>
                  <p>
                    PlanFlow empezó con Next.js 13 App Router en octubre de 2023, en plena euforia
                    de los Server Components. El equipo (2 frontend devs) tardó 3 semanas en
                    configurar correctamente el sistema de autenticación con NextAuth, las cookies
                    de sesión y el middleware de protección de rutas. El 80% de las páginas eran
                    dashboards de cliente detrás de login — no había ninguna razón técnica para
                    SSR.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-zinc-200 mb-2">Los síntomas</h3>
                  <ul className="space-y-2">
                    {[
                      'Errores de hidratación intermitentes en producción ("Text content does not match server-rendered HTML")',
                      'Dev server tardando 8-12s en arrancar después de cambios en Server Components',
                      'Estado global complejo: Zustand no funcionaba bien mezclado con Server Components',
                      'Tests unitarios rotos tras actualizar Next.js de 13.4 a 14.0 (breaking changes en App Router)',
                    ].map((s, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-zinc-200 mb-2">La migración (3 semanas)</h3>
                  <p>
                    Migramos a React 19 + Vite + React Router v7. Mantuvimos el backend (Supabase).
                    La única parte que se quedó en Next.js fue el blog y la landing page de
                    marketing — exactamente las páginas donde el SEO importa.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 pt-2">
                  {[
                    { label: 'Dev server startup', before: '8-12s', after: '< 400ms', good: true },
                    {
                      label: 'Bugs de hidratación',
                      before: '3-4/semana',
                      after: '0',
                      good: true,
                    },
                    {
                      label: 'Cobertura de tests',
                      before: '31%',
                      after: '67%',
                      good: true,
                    },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="bg-zinc-800 rounded-xl p-4 text-center"
                    >
                      <p className="text-xs text-zinc-500 mb-2">{stat.label}</p>
                      <p className="text-red-400 text-sm line-through mb-1">{stat.before}</p>
                      <p className="text-emerald-400 text-xl font-bold">{stat.after}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                  <p className="text-emerald-300 text-sm">
                    <strong>Conclusión:</strong> El SEO del dashboard nunca importó. La migración
                    eliminó una deuda técnica innecesaria y redujo el tiempo de onboarding de
                    nuevos devs de 3 días a medio día.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: El enfoque híbrido */}
          <section>
            <h2 className="text-2xl font-bold mb-4">El enfoque híbrido que usamos en Think Better</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Para proyectos SaaS con parte pública + parte privada, hay una tercera opción que cada
              vez usamos más:{' '}
              <strong>dos repositorios separados con dos tecnologías distintas</strong>.
            </p>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="w-5 h-5 text-emerald-400" />
                    <span className="font-bold text-emerald-400">Next.js — Parte pública</span>
                  </div>
                  <ul className="space-y-2 text-sm text-zinc-400">
                    {[
                      'Landing page y pricing',
                      'Blog / documentation',
                      'Páginas de producto y comparativas',
                      'Open Graph dinámico',
                      'Sitemap.xml automático',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-zinc-500 mt-4">Deploy: Vercel (Hobby o Pro)</p>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Lock className="w-5 h-5 text-blue-400" />
                    <span className="font-bold text-blue-400">React + Vite — App privada</span>
                  </div>
                  <ul className="space-y-2 text-sm text-zinc-400">
                    {[
                      'Dashboard de usuario',
                      'Panel de administración',
                      'Features tras login',
                      'Onboarding flows',
                      'Settings y configuración',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-zinc-500 mt-4">Deploy: Vercel / Netlify (static)</p>
                </div>
              </div>
              <div className="border-t border-zinc-800 p-4 bg-zinc-950/50">
                <p className="text-xs text-zinc-500 text-center">
                  Ambos comparten el mismo backend (Supabase) y el mismo design system. El coste de
                  infraestructura es idéntico. La complejidad técnica cae significativamente.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7: Árbol de decisión */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Árbol de decisión: 5 preguntas para elegir</h2>

            <div className="space-y-4">
              {[
                {
                  q: '1. ¿El núcleo del producto está detrás de login?',
                  yes: '→ React + Vite. No necesitas SSR para páginas que no indexa Google.',
                  no: '→ Continúa a la pregunta 2.',
                },
                {
                  q: '2. ¿Necesitas posicionarte en Google para adquirir usuarios?',
                  yes: '→ Next.js (o enfoque híbrido con Next.js para el marketing site).',
                  no: '→ Continúa a la pregunta 3.',
                },
                {
                  q: '3. ¿Tu equipo tiene experiencia con Server Components?',
                  yes: '→ Next.js es una opción válida si el equipo lo domina.',
                  no: '→ React + Vite. La curva de aprendizaje de App Router no vale la pena sin experiencia.',
                },
                {
                  q: '4. ¿Tienes páginas de usuario públicas que deben indexarse?',
                  yes: '→ Next.js con SSR dinámico para esas páginas específicas.',
                  no: '→ Continúa a la pregunta 5.',
                },
                {
                  q: '5. ¿Estás construyendo un MVP con tiempo limitado?',
                  yes: '→ React + Vite siempre. Menos fricción, más velocidad de desarrollo.',
                  no: '→ Evalúa si el SEO es relevante y elige según las preguntas anteriores.',
                },
              ].map((item, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <p className="font-semibold text-zinc-200 mb-3">{item.q}</p>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-start gap-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span className="text-zinc-300">
                        <strong className="text-emerald-400">Sí:</strong> {item.yes}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 bg-zinc-800/50 border border-zinc-700 rounded-xl p-3">
                      <AlertCircle className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
                      <span className="text-zinc-400">
                        <strong className="text-zinc-300">No:</strong> {item.no}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 8: El error más común */}
          <section>
            <h2 className="text-2xl font-bold mb-4">El error más común: elegir Next.js por defecto</h2>

            <div className="bg-zinc-900 border border-red-500/20 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <XCircle className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-zinc-200 mb-3">
                    "Usamos Next.js porque es lo que usa todo el mundo"
                  </p>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Este es el error que vemos con más frecuencia. Next.js tiene un excelente
                    marketing y una comunidad muy activa, lo que hace que muchos equipos lo elijan
                    por defecto sin evaluar si realmente lo necesitan.
                  </p>
                  <p className="text-zinc-400 text-sm leading-relaxed mt-3">
                    En nuestra experiencia, aproximadamente el{' '}
                    <strong className="text-zinc-200">60-70% de los SaaS B2B no necesitan SSR</strong>{' '}
                    para su producto principal. Añadir la complejidad de Next.js a un dashboard
                    detrás de login es añadir deuda técnica sin retorno.
                  </p>
                  <p className="text-zinc-400 text-sm leading-relaxed mt-3">
                    La regla práctica:{' '}
                    <strong className="text-zinc-200">
                      si tu página tiene contenido que cambia al hacer login, no necesita SSR
                    </strong>
                    . Si tu página es idéntica para todos los usuarios (landing, blog, docs),
                    probablemente sí.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 9: Nuestra elección para Think Better */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Nuestra elección para este proyecto</h2>

            <div className="bg-zinc-900 border border-emerald-500/20 rounded-2xl p-6">
              <p className="text-zinc-300 leading-relaxed mb-4">
                Think Better — la plataforma que estás usando ahora mismo — está construida con{' '}
                <strong className="text-emerald-400">React 19 + Vite + React Router v7</strong>.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                La mayor parte del valor del producto (cuestionario IA, dashboard de cliente, panel
                de admin, gestión de proyectos) está detrás de autenticación. No hay ninguna razón
                técnica para SSR en esas páginas. La landing pública usa React también, con
                metadatos estáticos suficientes para el SEO básico que necesitamos.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Si en el futuro el blog crece hasta ser un canal de adquisición significativo,
                migraremos ese módulo a Next.js (o lo extraeremos a un site separado). Por ahora,
                la simplicidad de un solo stack nos da más velocidad de entrega.
              </p>
            </div>
          </section>

          {/* Conclusion */}
          <section className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 border border-emerald-500/20 rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-4">Resumen ejecutivo</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="font-semibold text-blue-400 mb-3">Usa React + Vite si…</p>
                <ul className="space-y-2 text-sm text-zinc-400">
                  {[
                    'El producto es B2B y está detrás de login',
                    'Estás en fase de validación o MVP',
                    'Tu equipo es pequeño o poco experienciado con SSR',
                    'Ya tienes un backend definido (Supabase, etc.)',
                    'Necesitas máxima velocidad de desarrollo',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-emerald-400 mb-3">Usa Next.js si…</p>
                <ul className="space-y-2 text-sm text-zinc-400">
                  {[
                    'El SEO es un canal de adquisición clave',
                    'Tienes páginas de contenido público (blog, docs)',
                    'Hay páginas de usuario/producto indexables',
                    'Construyes un e-commerce o catálogo',
                    'El equipo conoce bien el App Router',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              La tecnología correcta es la que te permite entregar valor a tus usuarios lo antes
              posible con el menor coste de mantenimiento a largo plazo. A menudo eso significa
              elegir la opción más simple, no la más popular.
            </p>
          </section>

          {/* CTA */}
          <section className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">¿No sabes qué stack elegir para tu proyecto?</h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Cuéntanos qué estás construyendo y te recomendamos el stack óptimo. En 10 minutos
              sabemos exactamente qué tecnología, qué arquitectura y qué precio tiene tu proyecto.
            </p>
            <Link
              to="/cuestionario"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-8 py-4 rounded-full text-lg transition-colors"
            >
              Empezar cuestionario gratuito <ArrowRight className="w-5 h-5" />
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
