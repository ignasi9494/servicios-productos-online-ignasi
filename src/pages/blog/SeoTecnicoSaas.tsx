import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  TrendingUp,
  Zap,
  Code2,
  Globe,
  BarChart3,
} from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePageMeta } from '../../hooks/usePageMeta';

export function SeoTecnicoSaas() {
  usePageTitle('SEO técnico para SaaS en España 2026: guía completa — Think Better');
  usePageMeta(
    'Guía práctica de SEO técnico para SaaS en España 2026. Core Web Vitals, indexación, hreflang, schema markup, arquitectura de URLs y errores críticos que destruyen tu posicionamiento. Con checklist descargable.',
  );

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'SEO técnico para SaaS en España 2026: guía completa con checklist',
      description:
        'Guía práctica de SEO técnico para SaaS en España 2026. Core Web Vitals, indexación, hreflang, schema markup, arquitectura de URLs y errores críticos que destruyen tu posicionamiento.',
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
          'https://servicios-productos-online-ignasi.vercel.app/blog/seo-tecnico-saas-espana-2026',
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
        {/* Back link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors text-sm mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al blog
        </Link>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              SEO
            </span>
            <span className="text-zinc-500 text-sm">16 mar 2026</span>
            <span className="text-zinc-500 text-sm">·</span>
            <span className="text-zinc-500 text-sm">11 min de lectura</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-4">
            SEO técnico para SaaS en España 2026: guía completa con checklist
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            El 90% de los SaaS españoles pierden tráfico orgánico por errores técnicos que se resuelven en un
            sprint. Core Web Vitals, indexación, hreflang, schema markup y arquitectura de URLs: todo lo que
            necesitas para rankear en Google en 2026.
          </p>
        </motion.header>

        <motion.div
          className="article-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* TL;DR */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-10">
            <p className="text-emerald-400 font-bold text-sm uppercase tracking-wide mb-3">TL;DR</p>
            <ul className="space-y-2 text-zinc-300 text-sm">
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /><span>Core Web Vitals son factor de ranking confirmado: LCP &lt;2.5s, FID &lt;100ms, CLS &lt;0.1</span></li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /><span>El 60% de SaaS españoles tienen problemas de indexación por JavaScript no renderizado o rutas SPA mal configuradas</span></li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /><span>Schema markup multiplica hasta x3 el CTR en SERPs españoles cuando se implementa correctamente</span></li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /><span>Una arquitectura de URLs limpia desde el día 1 evita deuda técnica SEO que luego cuesta meses reparar</span></li>
            </ul>
          </div>

          {/* Intro */}
          <p>
            Cuando lanzas un SaaS en España tienes dos opciones para conseguir usuarios: pagas por cada clic
            (Google Ads, Meta) o construyes un activo que trabaje solo. El SEO técnico es la base de ese
            activo, y la mayoría de equipos lo ignoran hasta que ya tienen deuda técnica acumulada y decenas
            de páginas desindexadas.
          </p>
          <p>
            En esta guía vamos a lo concreto: qué errores matan el posicionamiento de un SaaS español, cómo
            diagnosticarlos con herramientas gratuitas y cómo resolverlos paso a paso. Sin teoría, con
            ejemplos reales y métricas.
          </p>

          {/* Section 1 */}
          <h2>
            <Search className="inline w-5 h-5 text-emerald-400 mr-2 -mt-0.5" />
            Por qué el SEO técnico importa más que el contenido en 2026
          </h2>
          <p>
            Google procesa más de 8.500 millones de búsquedas al día. En España, el 92% del tráfico de
            búsqueda pasa por Google, y el primer resultado orgánico captura el 27,6% de los clics. Pero hay
            un matiz que se pasa por alto:
          </p>
          <p>
            <strong>Si Google no puede leer tu SaaS correctamente, no puede posicionarlo.</strong> Y la
            mayoría de SaaS españoles cometen errores técnicos que impiden que Googlebot entienda su
            contenido, incluso cuando ese contenido es excelente.
          </p>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 my-8">
            <p className="text-amber-400 font-bold text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Los 5 errores técnicos más frecuentes en SaaS españoles
            </p>
            <div className="space-y-3">
              {[
                { rank: '1', error: 'SPA sin SSR/SSG — Googlebot ve una página en blanco', severity: 'Crítico' },
                { rank: '2', error: 'Missing canonical tags — páginas duplicadas compiten entre sí', severity: 'Alto' },
                { rank: '3', error: 'Imágenes sin lazy loading ni formato WebP/AVIF', severity: 'Alto' },
                { rank: '4', error: 'Sitemap.xml desactualizado o con URLs erróneas', severity: 'Medio' },
                { rank: '5', error: 'hreflang ausente en productos con versión ES/LATAM', severity: 'Medio' },
              ].map(({ rank, error, severity }) => (
                <div key={rank} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{rank}</span>
                  <div className="flex-1 flex items-start justify-between gap-4">
                    <span className="text-zinc-300 text-sm">{error}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${severity === 'Crítico' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : severity === 'Alto' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-zinc-800 text-zinc-400'}`}>{severity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2 */}
          <h2>
            <Zap className="inline w-5 h-5 text-emerald-400 mr-2 -mt-0.5" />
            Core Web Vitals en 2026: las métricas que Google usa para rankear
          </h2>
          <p>
            Desde 2021, Google utiliza los Core Web Vitals como señal de ranking. En 2026 pesan más que nunca
            porque la adopción de buenas prácticas ha aumentado y la diferenciación entre sitios lentos y
            rápidos es ahora un factor desempate real.
          </p>

          <h3>Las tres métricas clave</h3>

          <div className="grid gap-4 my-6">
            {[
              {
                metric: 'LCP',
                name: 'Largest Contentful Paint',
                good: '< 2.5s',
                bad: '> 4.0s',
                description: 'Tiempo hasta que el elemento más grande de la página es visible. Afecta principalmente a hero images, banners de precios y cabeceras de producto.',
                icon: TrendingUp,
                tip: 'Usa next/image o el atributo fetchpriority="high" en la imagen del hero. Sirve imágenes desde CDN (Cloudflare, Vercel Edge Network).',
              },
              {
                metric: 'INP',
                name: 'Interaction to Next Paint',
                good: '< 200ms',
                bad: '> 500ms',
                description: 'Reemplazó a FID en 2024. Mide el tiempo de respuesta a cualquier interacción del usuario (clic, tap, tecla). El más difícil de optimizar en SPAs.',
                icon: Zap,
                tip: 'Evita trabajo pesado en el hilo principal. Usa Web Workers para cálculos, defer JS no crítico y React.memo en componentes caros.',
              },
              {
                metric: 'CLS',
                name: 'Cumulative Layout Shift',
                good: '< 0.1',
                bad: '> 0.25',
                description: 'Suma de desplazamientos visuales inesperados. Los anuncios sin dimensiones reservadas y las fuentes web mal cargadas son los culpables habituales.',
                icon: BarChart3,
                tip: 'Define width y height en todas las imágenes. Usa font-display: swap y preload en fuentes críticas. Reserva espacio para elementos que cargan async.',
              },
            ].map(({ metric, name, good, bad, description, icon: Icon, tip }) => (
              <div key={metric} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-bold text-white">{metric}</p>
                      <p className="text-zinc-400 text-xs">{name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-400 text-sm font-semibold">{good} ✓</p>
                    <p className="text-red-400 text-xs">{bad} ✗</p>
                  </div>
                </div>
                <p className="text-zinc-400 text-sm mb-3">{description}</p>
                <div className="bg-zinc-800 rounded-lg p-3">
                  <p className="text-zinc-300 text-xs"><span className="text-emerald-400 font-semibold">Tip:</span> {tip}</p>
                </div>
              </div>
            ))}
          </div>

          <p>
            Para medir tus Core Web Vitals en producción usa <strong>Google Search Console</strong> (datos
            reales de usuarios) y <strong>PageSpeed Insights</strong> (laboratorio + campo). No confundas
            los datos de laboratorio con los datos de campo: un SaaS puede tener 95 en Lighthouse en local
            y 60 en producción por el contenido dinámico y los scripts de terceros.
          </p>

          {/* Section 3 */}
          <h2>
            <Code2 className="inline w-5 h-5 text-emerald-400 mr-2 -mt-0.5" />
            El problema de indexación en SPAs con React/Vue/Angular
          </h2>
          <p>
            El error más costoso que cometen los SaaS construidos con React, Vue o Angular es desplegar una
            SPA pura (Single Page Application) sin renderizado del lado del servidor.
          </p>
          <p>
            <strong>El problema:</strong> Googlebot, cuando rastrea una SPA pura, recibe un HTML casi vacío
            con algo así:
          </p>
          <pre className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 overflow-x-auto text-sm text-zinc-300 my-4">
{`<html>
  <body>
    <div id="root"></div>
    <script src="/assets/index-abc123.js"></script>
  </body>
</html>`}
          </pre>
          <p>
            Googlebot tiene que ejecutar JavaScript para ver el contenido real, y aunque Google dice que lo
            hace, el proceso tiene un retraso de horas o días y es menos fiable que el HTML estático. El
            resultado: tus páginas de pricing, blog y landing se indexan tarde, mal o directamente no se
            indexan.
          </p>

          <h3>La solución: SSR o SSG según el tipo de página</h3>
          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-3 px-4 text-zinc-400 font-semibold">Tipo de página</th>
                  <th className="text-left py-3 px-4 text-zinc-400 font-semibold">Estrategia</th>
                  <th className="text-left py-3 px-4 text-zinc-400 font-semibold">Herramienta</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: 'Landing / Marketing', strategy: 'SSG (Static Site Generation)', tool: 'Vite + react-snap, Next.js, Astro' },
                  { type: 'Blog / Documentación', strategy: 'SSG', tool: 'Astro, Next.js App Router' },
                  { type: 'Páginas de producto dinámicas', strategy: 'SSR (Server-Side Rendering)', tool: 'Next.js, Remix' },
                  { type: 'Dashboard autenticado', strategy: 'CSR (no necesita indexarse)', tool: 'Vite SPA (está bien aquí)' },
                  { type: 'Precios / Checkout', strategy: 'SSG o SSR', tool: 'Next.js ISR' },
                ].map((row, i) => (
                  <tr key={i} className={`border-b border-zinc-900 ${i % 2 === 0 ? 'bg-zinc-900/30' : ''}`}>
                    <td className="py-3 px-4 text-zinc-300">{row.type}</td>
                    <td className="py-3 px-4 text-emerald-400 font-medium">{row.strategy}</td>
                    <td className="py-3 px-4 text-zinc-400">{row.tool}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5 my-6">
            <p className="text-amber-400 font-bold text-sm mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Caso real: SaaS de RRHH en Barcelona
            </p>
            <p className="text-zinc-400 text-sm">
              Un cliente llegó a nosotros con 0 tráfico orgánico tras 8 meses. Su app era una Vite SPA pura.
              Googlebot veía HTML vacío. Migramos las páginas de marketing a Astro con SSG en 2 semanas.
              Resultado: <strong className="text-white">de 0 a 1.200 impresiones/mes</strong> en 6 semanas
              sin crear nuevo contenido, solo con el mismo texto renderizado correctamente.
            </p>
          </div>

          {/* Section 4 */}
          <h2>
            <Globe className="inline w-5 h-5 text-emerald-400 mr-2 -mt-0.5" />
            Arquitectura de URLs: hazlo bien desde el día 1
          </h2>
          <p>
            Una arquitectura de URLs bien diseñada ayuda a Google a entender la jerarquía de tu sitio y
            distribuye la autoridad de dominio de forma eficiente. Hacerlo mal crea deuda técnica SEO que
            luego cuesta meses de redireccionamientos y pérdida de link juice.
          </p>

          <h3>Estructura recomendada para un SaaS español</h3>
          <pre className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 overflow-x-auto text-sm text-zinc-300 my-4">
{`tudominio.com/                    ← Landing principal
tudominio.com/precios/            ← Página de pricing
tudominio.com/funcionalidades/    ← Features overview
tudominio.com/funcionalidades/[feature]/  ← Feature individual
tudominio.com/blog/               ← Blog índice
tudominio.com/blog/[slug]/        ← Artículo individual
tudominio.com/casos/              ← Casos de estudio
tudominio.com/comparar/[vs]/      ← Páginas de comparativa (alto valor SEO)
tudominio.com/app/                ← Dashboard (no indexar)
tudominio.com/legal/              ← Legales (no indexar o baja prioridad)`}
          </pre>

          <h3>Reglas para URLs limpias</h3>
          <ul>
            <li><strong>Todo en minúsculas:</strong> <code>/Blog</code> y <code>/blog</code> son URLs distintas para Google.</li>
            <li><strong>Guiones, no guiones bajos:</strong> <code>como-lanzar-saas</code> no <code>como_lanzar_saas</code>.</li>
            <li><strong>Sin parámetros UTM en URLs canónicas:</strong> Los parámetros de tracking deben ir solo en campañas.</li>
            <li><strong>Canonical en cada página:</strong> Evita que versiones con/sin trailing slash, con/sin www, compitan entre sí.</li>
            <li><strong>Páginas del dashboard fuera del sitemap:</strong> Usa <code>noindex</code> o simplemente no las incluyas.</li>
          </ul>

          {/* Section 5 */}
          <h2>Schema Markup: haz que Google entienda tu contenido</h2>
          <p>
            El schema markup (datos estructurados) le dice a Google exactamente qué es cada elemento de tu
            página. En SaaS españoles hay cuatro tipos de schema que marcan diferencia real:
          </p>

          <div className="space-y-4 my-6">
            {[
              {
                schema: 'SoftwareApplication',
                cuando: 'Página de producto / landing',
                impacto: 'Rich snippet con rating, precio y sistema operativo. CTR +15-40%',
                ejemplo: 'Muestra estrellas de valoración y precio en los resultados de búsqueda.',
              },
              {
                schema: 'FAQPage',
                cuando: 'Sección de preguntas frecuentes',
                impacto: 'Las preguntas se despliegan directamente en los SERPs. Ocupa más espacio visual.',
                ejemplo: 'Tu FAQ aparece expandida en Google sin que el usuario entre a tu web.',
              },
              {
                schema: 'Article / BlogPosting',
                cuando: 'Artículos de blog',
                impacto: 'Acceso a Top Stories en Google News y Search. Fecha de publicación visible.',
                ejemplo: 'Artículos aparecen en el carrusel de noticias con imagen y fecha.',
              },
              {
                schema: 'BreadcrumbList',
                cuando: 'Páginas con jerarquía (blog/[artículo], funcionalidades/[feature])',
                impacto: 'La URL en los SERPs muestra la jerarquía legible. Mejora CTR un 2-5%.',
                ejemplo: 'Think Better › Blog › Guía SEO aparece en lugar de la URL cruda.',
              },
            ].map(({ schema, cuando, impacto, ejemplo }) => (
              <div key={schema} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-bold text-emerald-400 font-mono text-sm">{schema}</p>
                  <span className="text-xs text-zinc-500">{cuando}</span>
                </div>
                <p className="text-zinc-300 text-sm mb-1"><strong>Impacto:</strong> {impacto}</p>
                <p className="text-zinc-500 text-xs italic">{ejemplo}</p>
              </div>
            ))}
          </div>

          <p>
            Para validar tu schema markup usa la{' '}
            <strong>herramienta de prueba de resultados enriquecidos de Google</strong> (
            search.google.com/test/rich-results). Te dirá exactamente si el schema es válido y qué tipo de
            rich snippet activará.
          </p>

          {/* Section 6 */}
          <h2>hreflang para SaaS con mercado España + LATAM</h2>
          <p>
            Si tu SaaS tiene usuarios tanto en España como en Latinoamérica, necesitas hreflang. Sin él,
            Google puede mostrar la versión incorrecta según el país, o peor: penalizarte por contenido
            duplicado cuando tienes el mismo texto con pequeñas diferencias regionales.
          </p>

          <h3>Implementación correcta</h3>
          <pre className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 overflow-x-auto text-sm text-zinc-300 my-4">
{`<!-- En el <head> de cada página -->
<link rel="alternate" hreflang="es-ES" href="https://tudominio.com/es/" />
<link rel="alternate" hreflang="es-MX" href="https://tudominio.com/mx/" />
<link rel="alternate" hreflang="es-AR" href="https://tudominio.com/ar/" />
<link rel="alternate" hreflang="es"    href="https://tudominio.com/es/" />
<link rel="alternate" hreflang="x-default" href="https://tudominio.com/" />`}
          </pre>

          <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5 my-6">
            <p className="text-red-400 font-bold text-sm mb-2 flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              Errores frecuentes con hreflang
            </p>
            <ul className="space-y-1.5 text-zinc-400 text-sm">
              <li className="flex gap-2"><span className="text-red-400 font-bold">✗</span> No incluir el tag en ambas páginas (si A apunta a B, B debe apuntar a A)</li>
              <li className="flex gap-2"><span className="text-red-400 font-bold">✗</span> Usar códigos de idioma incorrectos (<code>es-SP</code> no existe, es <code>es-ES</code>)</li>
              <li className="flex gap-2"><span className="text-red-400 font-bold">✗</span> Olvidar el <code>x-default</code> para usuarios de países sin versión específica</li>
              <li className="flex gap-2"><span className="text-red-400 font-bold">✗</span> Implementar hreflang en el sitemap en lugar del HTML cuando las páginas son dinámicas</li>
            </ul>
          </div>

          {/* Section 7 */}
          <h2>
            <TrendingUp className="inline w-5 h-5 text-emerald-400 mr-2 -mt-0.5" />
            Checklist SEO técnico completo para SaaS
          </h2>
          <p>
            Esta es la lista que usamos en Think Better cada vez que auditamos o lanzamos un nuevo SaaS.
            Divídela en cuatro sprints de una semana:
          </p>

          {[
            {
              sprint: 'Sprint 1: Rastreabilidad e indexación',
              items: [
                'robots.txt correcto: permite Googlebot, bloquea /app/ y /admin/',
                'sitemap.xml generado automáticamente y enviado a Search Console',
                'No hay páginas importantes con noindex accidentalmente',
                'Todas las páginas tienen canonical tag apuntando a la URL canónica',
                'Redirección www → no-www (o viceversa) configurada en servidor',
                'Redirección 301 para trailing slash consistente',
                'Versión HTTPS activa y certificado SSL válido',
                'Las rutas SPA tienen SSR o SSG en páginas de marketing',
              ],
            },
            {
              sprint: 'Sprint 2: Core Web Vitals',
              items: [
                'LCP < 2.5s en móvil y desktop (medir en PageSpeed Insights)',
                'INP < 200ms — no hay trabajo pesado en el hilo principal',
                'CLS < 0.1 — imágenes con width/height definidos, sin layout shifts',
                'Imágenes en formato WebP o AVIF con lazy loading',
                'Imagen hero con fetchpriority="high" para mejorar LCP',
                'Fuentes web con font-display: swap o preload de fuentes críticas',
                'Código JS dividido con code splitting (dynamic import)',
                'CDN activo para assets estáticos (Vercel, Cloudflare)',
              ],
            },
            {
              sprint: 'Sprint 3: On-page técnico',
              items: [
                'Cada página tiene <title> único de menos de 60 caracteres',
                'Cada página tiene meta description única de 120-160 caracteres',
                'Open Graph tags (og:title, og:description, og:image) en todas las páginas',
                'Twitter Card meta tags implementados',
                'H1 único por página, H2-H6 en jerarquía correcta',
                'URLs en minúsculas con guiones (no guiones bajos)',
                'Breadcrumbs en páginas de artículo con schema BreadcrumbList',
                'Imágenes con atributo alt descriptivo',
              ],
            },
            {
              sprint: 'Sprint 4: Schema y datos estructurados',
              items: [
                'Schema Organization en homepage con logo, contactPoint, sameAs (redes)',
                'Schema SoftwareApplication en página de producto',
                'Schema FAQPage en sección de preguntas frecuentes',
                'Schema Article/BlogPosting en cada artículo del blog',
                'Schema BreadcrumbList en páginas con jerarquía',
                'Validado con Rich Results Test de Google sin errores',
                'hreflang implementado si tienes versiones multi-país',
                'Google Search Console verificado y sin errores de cobertura',
              ],
            },
          ].map(({ sprint, items }) => (
            <div key={sprint} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 my-6">
              <p className="text-emerald-400 font-bold mb-4">{sprint}</p>
              <ul className="space-y-2">
                {items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-zinc-300 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-zinc-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Section 8: Herramientas */}
          <h2>Herramientas gratuitas para auditar tu SEO técnico</h2>
          <p>No necesitas pagar una herramienta cara para hacer una auditoría técnica decente. Este es el stack que usamos:</p>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-3 px-4 text-zinc-400 font-semibold">Herramienta</th>
                  <th className="text-left py-3 px-4 text-zinc-400 font-semibold">Para qué</th>
                  <th className="text-left py-3 px-4 text-zinc-400 font-semibold">Precio</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { tool: 'Google Search Console', use: 'Indexación, cobertura, Core Web Vitals en campo, palabras clave', price: 'Gratis' },
                  { tool: 'PageSpeed Insights', use: 'Core Web Vitals de laboratorio y campo', price: 'Gratis' },
                  { tool: 'Rich Results Test', use: 'Validación de schema markup', price: 'Gratis' },
                  { tool: 'Screaming Frog (free)', use: 'Rastreo de 500 URLs, errores 404, redirects, duplicados', price: 'Gratis (hasta 500 URLs)' },
                  { tool: 'Ahrefs Webmaster Tools', use: 'Backlinks, errores técnicos básicos, keywords', price: 'Gratis (verificando sitio)' },
                  { tool: 'Bing Webmaster Tools', use: 'SEO técnico para Bing (4-5% de búsquedas en España)', price: 'Gratis' },
                  { tool: 'Chrome DevTools', use: 'Análisis de rendimiento, waterfall de carga, LCP/INP manual', price: 'Gratis' },
                  { tool: 'Semrush / Ahrefs (de pago)', use: 'Auditorías completas, seguimiento de posiciones, análisis de competencia', price: '100-400€/mes' },
                ].map((row, i) => (
                  <tr key={i} className={`border-b border-zinc-900 ${i % 2 === 0 ? 'bg-zinc-900/30' : ''}`}>
                    <td className="py-3 px-4 text-zinc-300 font-medium">{row.tool}</td>
                    <td className="py-3 px-4 text-zinc-400">{row.use}</td>
                    <td className={`py-3 px-4 font-medium ${row.price === 'Gratis' || row.price.startsWith('Gratis') ? 'text-emerald-400' : 'text-zinc-400'}`}>{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 9: SEO técnico en Vite/React */}
          <h2>SEO técnico con Vite + React: cómo lo resolvemos en Think Better</h2>
          <p>
            Este mismo SaaS está construido con Vite + React. ¿Cómo resolvemos el problema de indexación
            de una SPA sin migrar a Next.js?
          </p>

          <div className="space-y-4 my-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <p className="text-white font-bold mb-2">1. Pre-rendering con react-snap o vite-plugin-ssg</p>
              <p className="text-zinc-400 text-sm">
                Para páginas de marketing que no cambian con frecuencia, usamos pre-rendering en build time.
                El resultado es HTML estático que Googlebot puede leer sin ejecutar JavaScript.
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <p className="text-white font-bold mb-2">2. React Helmet o usePageTitle/usePageMeta custom hooks</p>
              <p className="text-zinc-400 text-sm">
                Gestionamos los meta tags dinámicamente con hooks custom. Cada página actualiza el title,
                description y Open Graph de forma independiente. Clave para que cada URL tenga su propio
                snippet en Google.
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <p className="text-white font-bold mb-2">3. JSON-LD inyectado en useEffect</p>
              <p className="text-zinc-400 text-sm">
                El schema markup se inyecta en el head como un script JSON-LD en cada componente de página.
                Se limpia al desmontar el componente para evitar duplicados en la navegación SPA.
              </p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <p className="text-white font-bold mb-2">4. vercel.json con rewrite rules para SPA</p>
              <p className="text-zinc-400 text-sm">
                Configuramos <code>{"\"rewrites\": [{\"source\": \"/(.*)\", \"destination\": \"/index.html\"}]"}</code>
                para que todas las rutas funcionen correctamente. Sin esto, un refresco en <code>/blog/articulo</code> daría 404.
              </p>
            </div>
          </div>

          {/* Conclusión */}
          <h2>Conclusión: el SEO técnico es una inversión, no un coste</h2>
          <p>
            Dedicar dos semanas a resolver los errores técnicos de tu SaaS tiene un ROI difícil de igualar.
            No necesitas crear nuevo contenido, no necesitas backlinks, no necesitas gastar en Ads. Solo
            necesitas que Google pueda leer y entender lo que ya tienes.
          </p>
          <p>
            La secuencia correcta es: primero técnico, luego on-page, luego contenido, luego link building.
            Muchos SaaS españoles hacen blog posts mientras tienen 50 páginas desindexadas. Es como regar
            un jardín con la manguera cortada.
          </p>
          <p>
            El checklist de arriba cubre el 95% de los problemas que encontramos en auditorías. Empieza por
            el Sprint 1 esta semana: rastreabilidad e indexación. Con Google Search Console verificado y un
            sitemap correcto ya estarás por delante de la mitad de tu competencia.
          </p>

          {/* CTA */}
          <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-8 mt-12 text-center">
            <p className="text-2xl font-extrabold text-white mb-3">
              ¿Tu SaaS tiene problemas de SEO técnico?
            </p>
            <p className="text-zinc-400 mb-6">
              En Think Better auditamos el SEO técnico de todos los proyectos que desarrollamos. Si ya tienes
              un producto o estás planificando uno, cuéntanos y te decimos por dónde empezar.
            </p>
            <Link
              to="/cuestionario"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 transition-colors"
            >
              Hablar con el equipo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Back */}
          <div className="mt-12 pt-8 border-t border-zinc-800">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Ver todos los artículos
            </Link>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
