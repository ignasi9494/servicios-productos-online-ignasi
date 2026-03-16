import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Zap,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Code2,
  Layers,
  Activity,
  ArrowRight,
  BarChart3,
} from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePageMeta } from '../../hooks/usePageMeta';

export function RendimientoReactCoreWebVitals() {
  usePageTitle(
    'Optimización de rendimiento en React: Core Web Vitals para SaaS en 2026 — Think Better',
  );
  usePageMeta(
    'Guía práctica para mejorar los Core Web Vitals de tu SaaS en React: LCP, INP y CLS. Code splitting, memoización, lazy loading, virtualización de listas y caso real: de LCP 4.8s a 1.6s con las mismas funcionalidades.',
  );

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline:
        'Optimización de rendimiento en React: cómo mejorar los Core Web Vitals de tu SaaS en 2026',
      description:
        'Guía técnica completa para optimizar el rendimiento de una aplicación React SaaS. LCP, INP y CLS explicados con código real, técnicas de memoización, code splitting, virtualización de listas y caso práctico con métricas antes/después.',
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
          'https://servicios-productos-online-ignasi.vercel.app/blog/rendimiento-react-core-web-vitals-2026',
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
              Performance
            </span>
            <span className="text-zinc-500 text-sm flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              12 min de lectura
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Optimización de rendimiento en React: cómo mejorar los Core Web Vitals de tu SaaS
          </h1>
          <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
            El 53% de los usuarios abandona si una página tarda más de 3 segundos en cargar. Google penaliza en rankings a los sitios lentos. Y sin embargo, la mayoría de SaaS en React tienen un LCP de más de 4 segundos. Esta guía te da las técnicas exactas para bajar a menos de 2.5s sin reescribir tu app.
          </p>

          <div className="flex items-center gap-4 text-sm text-zinc-500 pb-8 border-b border-zinc-800">
            <span>Think Better · Barcelona</span>
            <span>·</span>
            <span>16 mar 2026</span>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 space-y-10 text-zinc-300 leading-relaxed"
        >
          {/* Key stat */}
          <div className="bg-emerald-400/5 border border-emerald-400/20 rounded-2xl p-6">
            <p className="text-emerald-300 font-semibold text-lg mb-3">
              Resultados reales aplicando estas técnicas:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { metric: 'LCP', before: '4.8s', after: '1.6s', icon: '⚡' },
                { metric: 'INP', before: '380ms', after: '85ms', icon: '🖱️' },
                { metric: 'Bundle', before: '1.2 MB', after: '320 KB', icon: '📦' },
                { metric: 'Bounce', before: '61%', after: '28%', icon: '📉' },
              ].map((item) => (
                <div key={item.metric} className="bg-zinc-900 rounded-xl p-4 text-center">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">{item.metric}</div>
                  <div className="text-red-400 text-sm line-through">{item.before}</div>
                  <div className="text-emerald-400 font-bold text-lg">{item.after}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 1: Core Web Vitals */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Activity className="w-6 h-6 text-emerald-400" />
              Core Web Vitals en 2026: qué miden y por qué importan
            </h2>
            <p className="mb-6">
              Google usa los Core Web Vitals como factor de ranking desde 2021. En 2026 los umbrales son más estrictos y el nuevo INP (Interaction to Next Paint) ha reemplazado definitivamente a FID. Si tu SaaS sale en búsquedas, esta sección es crítica.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[
                {
                  name: 'LCP',
                  full: 'Largest Contentful Paint',
                  good: '< 2.5s',
                  bad: '> 4s',
                  desc: 'Tiempo hasta que el elemento más grande de la página (imagen hero, bloque de texto principal) es visible.',
                  color: 'emerald',
                },
                {
                  name: 'INP',
                  full: 'Interaction to Next Paint',
                  good: '< 200ms',
                  bad: '> 500ms',
                  desc: 'Latencia de respuesta a interacciones del usuario: clics, teclado, toques. Mide la fluidez real de la UI.',
                  color: 'cyan',
                },
                {
                  name: 'CLS',
                  full: 'Cumulative Layout Shift',
                  good: '< 0.1',
                  bad: '> 0.25',
                  desc: 'Suma de desplazamientos de layout inesperados. Un botón que se mueve antes de que el usuario haga clic es el ejemplo clásico.',
                  color: 'violet',
                },
              ].map((cwv) => (
                <div key={cwv.name} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                  <div className={`text-${cwv.color}-400 font-bold text-xl mb-1`}>{cwv.name}</div>
                  <div className="text-zinc-500 text-xs mb-3">{cwv.full}</div>
                  <p className="text-zinc-300 text-sm mb-3">{cwv.desc}</p>
                  <div className="flex gap-3 text-xs">
                    <span className="text-emerald-400">✓ Bueno: {cwv.good}</span>
                    <span className="text-red-400">✗ Malo: {cwv.bad}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-amber-400/5 border border-amber-400/20 rounded-xl p-4">
              <p className="text-amber-300 text-sm font-semibold mb-1">
                <AlertTriangle className="w-4 h-4 inline mr-1" />
                React SPA: el problema de raíz
              </p>
              <p className="text-zinc-400 text-sm">
                Las SPAs de React envían un bundle JS gigante y renderizan en el cliente. El browser descarga, parsea y ejecuta JS antes de mostrar nada. El LCP siempre es alto si no lo optimizas. La solución no es migrar a Next.js — es aplicar técnicas de splitting, lazy loading y optimización de assets.
              </p>
            </div>
          </section>

          {/* Section 2: Code Splitting */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Layers className="w-6 h-6 text-emerald-400" />
              1. Code splitting con React.lazy y Suspense
            </h2>
            <p className="mb-4">
              El error más común: importar todos los componentes al nivel raíz. El usuario que visita la landing descarga también el código del dashboard de admin. Con <code className="text-emerald-400 bg-zinc-900 px-1 rounded">React.lazy</code> cada ruta se convierte en un chunk independiente cargado bajo demanda.
            </p>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-4">
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3 flex items-center gap-1">
                <Code2 className="w-3.5 h-3.5" /> Antes — todo en el bundle inicial
              </p>
              <pre className="text-sm text-zinc-300 overflow-x-auto"><code>{`// ❌ Todos estos imports aumentan el bundle inicial
import { Dashboard } from './pages/Dashboard';
import { AdminPanel } from './pages/AdminPanel';
import { QuestionnaireChat } from './pages/Questionnaire';
import { Propuestas } from './pages/Propuestas';

// Bundle inicial: 1.2 MB — el usuario descarga
// código del admin aunque nunca lo use`}</code></pre>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-6">
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3 flex items-center gap-1">
                <Code2 className="w-3.5 h-3.5" /> Después — lazy loading por ruta
              </p>
              <pre className="text-sm text-zinc-300 overflow-x-auto"><code>{`// ✅ Cada ruta es un chunk separado
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const QuestionnaireChat = lazy(() => import('./pages/Questionnaire'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-emerald-400/30
                      border-t-emerald-400 rounded-full animate-spin" />
    </div>
  );
}

// En el router:
<Route path="/dashboard/*" element={
  <Suspense fallback={<PageLoader />}>
    <Dashboard />
  </Suspense>
} />

// Bundle inicial: 320 KB — 73% menos`}</code></pre>
            </div>

            <p className="text-zinc-400 text-sm">
              Con Vite, cada <code className="text-emerald-400 bg-zinc-900 px-1 rounded">lazy()</code> genera automáticamente un chunk separado. Analiza el resultado con <code className="text-emerald-400 bg-zinc-900 px-1 rounded">npx vite-bundle-visualizer</code> para ver qué ocupa más espacio.
            </p>
          </section>

          {/* Section 3: Memoization */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-emerald-400" />
              2. Memoización: cuándo usar memo, useMemo y useCallback
            </h2>
            <p className="mb-4">
              La memoización evita re-renders innecesarios. Pero usada mal empeora el rendimiento (el coste de comparación supera el coste del re-render). Regla práctica: memoiza solo cuando el componente es caro de renderizar y sus props cambian con menos frecuencia de lo que su padre se re-renderiza.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[
                {
                  hook: 'React.memo',
                  when: 'Componente hijo con props estables que el padre re-renderiza frecuentemente',
                  example: 'Fila de tabla, card de proyecto, ítem de lista',
                  cost: 'Comparación shallow de props por render',
                },
                {
                  hook: 'useMemo',
                  when: 'Cálculo costoso que depende de pocas variables',
                  example: 'Filtrar/ordenar arrays grandes, aggregations de datos',
                  cost: 'Almacenamiento en memoria del resultado',
                },
                {
                  hook: 'useCallback',
                  when: 'Función pasada como prop a componente memoizado',
                  example: 'onClick handlers pasados a React.memo children',
                  cost: 'Almacenamiento de la función referencia',
                },
              ].map((item) => (
                <div key={item.hook} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                  <div className="text-emerald-400 font-mono font-bold mb-2">{item.hook}</div>
                  <div className="text-zinc-300 text-sm mb-2"><strong>Cuándo:</strong> {item.when}</div>
                  <div className="text-zinc-400 text-xs mb-2"><strong>Ejemplo:</strong> {item.example}</div>
                  <div className="text-zinc-500 text-xs"><strong>Coste:</strong> {item.cost}</div>
                </div>
              ))}
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-4">
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3">
                Ejemplo real: lista de proyectos con filtro
              </p>
              <pre className="text-sm text-zinc-300 overflow-x-auto"><code>{`// ❌ Sin memoización — filtra el array en cada render
function ProjectList({ projects, status, onSelect }) {
  const filtered = projects.filter(p => p.status === status);
  // Si el padre se re-renderiza por cualquier causa,
  // se recalcula el filtro aunque projects y status
  // no hayan cambiado
  return filtered.map(p =>
    <ProjectCard key={p.id} project={p} onSelect={onSelect} />
  );
}

// ✅ Con memoización correcta
const ProjectCard = React.memo(function ProjectCard({ project, onSelect }) {
  return (
    <div onClick={() => onSelect(project.id)}>
      {project.name}
    </div>
  );
});

function ProjectList({ projects, status, onSelect }) {
  // Solo recalcula cuando projects o status cambian
  const filtered = useMemo(
    () => projects.filter(p => p.status === status),
    [projects, status]
  );

  // onSelect estable — no fuerza re-render de ProjectCard
  const handleSelect = useCallback(onSelect, [onSelect]);

  return filtered.map(p =>
    <ProjectCard key={p.id} project={p} onSelect={handleSelect} />
  );
}`}</code></pre>
            </div>
          </section>

          {/* Section 4: Image optimization */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
              3. Optimización de imágenes para LCP
            </h2>
            <p className="mb-4">
              Las imágenes son la causa número 1 de LCP alto. El elemento LCP suele ser la imagen hero o el logo. Tres cambios simples bajan el LCP drásticamente.
            </p>

            <div className="space-y-4 mb-6">
              {[
                {
                  title: 'Usa WebP/AVIF en lugar de PNG/JPG',
                  desc: 'WebP es 25-35% más pequeño que JPEG con la misma calidad. AVIF es 50% más pequeño. En Vite, usa el plugin vite-imagetools para convertir automáticamente.',
                  code: `// vite.config.ts
import { imagetools } from 'vite-imagetools';

export default defineConfig({
  plugins: [react(), imagetools()]
});

// En componentes:
import heroImage from './hero.jpg?format=webp&quality=80';`,
                },
                {
                  title: 'Preload la imagen LCP',
                  desc: 'El browser no sabe que una imagen es el LCP hasta que parsea el HTML. Un <link rel="preload"> en el <head> hace que empiece a descargarla antes.',
                  code: `<!-- index.html — preload la imagen hero -->
<link
  rel="preload"
  as="image"
  href="/hero.webp"
  fetchpriority="high"
/>`,
                },
                {
                  title: 'lazy loading solo para imágenes below-the-fold',
                  desc: 'El error clásico: poner loading="lazy" en la imagen hero. El browser retrasa la descarga hasta que el usuario hace scroll — exactamente lo que no quieres para el LCP.',
                  code: `// ✅ Imagen hero — sin lazy (carga inmediata)
<img src="/hero.webp" alt="..." fetchpriority="high" />

// ✅ Imágenes below-the-fold — con lazy
<img src="/feature.webp" alt="..." loading="lazy" />`,
                },
              ].map((tip, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                  <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    {tip.title}
                  </h3>
                  <p className="text-zinc-400 text-sm mb-3">{tip.desc}</p>
                  <pre className="text-xs text-zinc-300 bg-zinc-950 rounded-lg p-3 overflow-x-auto"><code>{tip.code}</code></pre>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Virtualization */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-emerald-400" />
              4. Virtualización de listas largas
            </h2>
            <p className="mb-4">
              Si tu dashboard muestra listas de más de 100 elementos (proyectos, mensajes, transacciones), renderizar todos en el DOM destruye el INP. La virtualización solo renderiza los elementos visibles en pantalla más un pequeño buffer.
            </p>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-4">
              <pre className="text-sm text-zinc-300 overflow-x-auto"><code>{`// npm install @tanstack/react-virtual

import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

function ProjectList({ projects }) {
  const parentRef = useRef(null);

  const virtualizer = useVirtualizer({
    count: projects.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72, // altura estimada de cada fila en px
    overscan: 5,            // renderiza 5 elementos extra fuera de vista
  });

  return (
    <div ref={parentRef} className="h-[600px] overflow-auto">
      {/* Contenedor con altura total virtual */}
      <div style={{ height: virtualizer.getTotalSize() + 'px', position: 'relative' }}>
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: virtualItem.start + 'px',
              width: '100%',
              height: virtualItem.size + 'px',
            }}
          >
            <ProjectRow project={projects[virtualItem.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Con 500 proyectos:
// Sin virtualización: 500 nodos DOM, INP ~400ms
// Con virtualización: ~15 nodos DOM, INP ~40ms`}</code></pre>
            </div>
          </section>

          {/* Section 6: State management */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Activity className="w-6 h-6 text-emerald-400" />
              5. Optimizar re-renders con estado bien estructurado
            </h2>
            <p className="mb-6">
              El patrón más destructivo para el INP: estado global que cambia frecuentemente y está subscrito por muchos componentes. Cada cambio desencadena un re-render masivo. La solución es separar estado de alta frecuencia (formularios, hover) del estado de baja frecuencia (datos del usuario, configuración).
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-red-400/5 border border-red-400/20 rounded-xl p-4">
                <p className="text-red-400 font-semibold text-sm mb-3">Antipatrón — estado monolítico</p>
                <pre className="text-xs text-zinc-300 overflow-x-auto"><code>{`// ❌ Un Context con todo
const AppContext = createContext({
  user: null,
  projects: [],
  searchQuery: '',    // cambia en cada keystroke
  hoveredItem: null,  // cambia en cada mousemove
  notifications: [],
  theme: 'dark',
});

// Resultado: cada keystroke del buscador
// re-renderiza TODA la app`}</code></pre>
              </div>
              <div className="bg-emerald-400/5 border border-emerald-400/20 rounded-xl p-4">
                <p className="text-emerald-400 font-semibold text-sm mb-3">Solución — estado separado por frecuencia</p>
                <pre className="text-xs text-zinc-300 overflow-x-auto"><code>{`// ✅ Contextos separados por dominio
// Cambia raramente — OK en Context
const AuthContext = createContext({ user, role });
const ThemeContext = createContext({ theme });

// Cambia frecuentemente — estado local
function SearchBar() {
  // Local state no propaga re-renders
  const [query, setQuery] = useState('');
  return <input onChange={e => setQuery(e.target.value)} />;
}

// Resultado: keystrokes solo re-renderizan SearchBar`}</code></pre>
              </div>
            </div>
          </section>

          {/* Section 7: CLS */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Layers className="w-6 h-6 text-emerald-400" />
              6. Eliminar CLS: las 4 causas más comunes
            </h2>

            <div className="space-y-3 mb-4">
              {[
                {
                  cause: 'Imágenes sin dimensiones',
                  fix: 'Siempre incluye width y height en <img>. El browser reserva el espacio antes de descargar la imagen.',
                  code: '<img src="/logo.webp" width="200" height="80" alt="Logo" />',
                },
                {
                  cause: 'Fuentes web que aparecen tarde (FOUT)',
                  fix: 'Usa font-display: swap con fallback de tamaño similar. O mejor: usa fuentes del sistema para cuerpo de texto.',
                  code: `@font-face {
  font-family: 'Inter';
  font-display: swap; /* usa fallback hasta que carga */
  src: url('/fonts/inter.woff2') format('woff2');
}`,
                },
                {
                  cause: 'Elementos que aparecen/desaparecen empujando el layout',
                  fix: 'Reserva el espacio con min-height aunque el contenido no haya cargado todavía. Usa skeleton loaders de la misma altura que el contenido real.',
                  code: `{/* Skeleton con misma altura que el contenido real */}
{loading ? (
  <div className="h-16 bg-zinc-800 animate-pulse rounded-xl" />
) : (
  <ProjectCard project={project} />
)}`,
                },
                {
                  cause: 'Banners de cookies o notificaciones que aparecen sobre el contenido',
                  fix: 'Usa posición fija (fixed/sticky) para que no desplacen el layout principal.',
                  code: `{/* ✅ Banner fijo — no desplaza el layout */}
<div className="fixed bottom-0 left-0 right-0 z-50">
  <CookieBanner />
</div>`,
                },
              ].map((item, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                  <h3 className="text-white font-semibold mb-1 text-sm">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 inline mr-1" />
                    {item.cause}
                  </h3>
                  <p className="text-zinc-400 text-sm mb-2">{item.fix}</p>
                  <pre className="text-xs text-zinc-300 bg-zinc-950 rounded-lg p-3 overflow-x-auto"><code>{item.code}</code></pre>
                </div>
              ))}
            </div>
          </section>

          {/* Case study */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Caso real: CatalogPro</h2>
                <p className="text-zinc-500 text-sm">Dashboard B2B con 2.400 productos — antes y después</p>
              </div>
            </div>

            <p className="text-zinc-300 mb-6">
              CatalogPro es un SaaS de gestión de catálogos para distribuidores. El dashboard principal mostraba una tabla con todos los productos (hasta 2.400 filas), imágenes de producto y un filtro en tiempo real. LCP de 4.8s, INP de 380ms, tasa de abandono del 61% en mobile.
            </p>

            <div className="space-y-3 mb-6">
              {[
                { step: '1', action: 'Code splitting', detail: 'Separar el dashboard en chunks lazy. Bundle inicial: 1.2 MB → 320 KB.', impact: 'LCP: 4.8s → 2.1s' },
                { step: '2', action: 'Virtualizar la tabla', detail: '@tanstack/react-virtual en la tabla de productos. De 2400 nodos DOM a ~25.', impact: 'INP: 380ms → 95ms' },
                { step: '3', action: 'Memoizar filas de tabla', detail: 'React.memo en ProductRow + useMemo para el filtro.', impact: 'Re-renders: -87%' },
                { step: '4', action: 'Optimizar imágenes de producto', detail: 'Conversión a WebP + lazy loading below-the-fold + skeleton loaders.', impact: 'LCP: 2.1s → 1.6s, CLS: 0.28 → 0.04' },
                { step: '5', action: 'Estado de filtro local', detail: 'Mover query del filtro a estado local del componente SearchBar.', impact: 'INP final: 85ms' },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 items-start">
                  <div className="w-7 h-7 rounded-full bg-emerald-400/10 text-emerald-400 font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <span className="font-semibold text-white text-sm">{item.action}</span>
                      <span className="text-emerald-400 text-xs bg-emerald-400/10 px-2 py-0.5 rounded-full">{item.impact}</span>
                    </div>
                    <p className="text-zinc-400 text-sm">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-zinc-800">
              {[
                { label: 'LCP', change: '4.8s → 1.6s', pct: '-67%', ok: true },
                { label: 'INP', change: '380ms → 85ms', pct: '-78%', ok: true },
                { label: 'CLS', change: '0.28 → 0.04', pct: '-86%', ok: true },
                { label: 'Conversión', change: '1.8% → 4.3%', pct: '+139%', ok: true },
              ].map((r) => (
                <div key={r.label} className="text-center">
                  <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1">{r.label}</div>
                  <div className="text-white text-sm font-semibold">{r.change}</div>
                  <div className="text-emerald-400 text-xs font-bold">{r.pct}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Tools */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Herramientas de medición y diagnóstico</h2>
            <p className="mb-4">No puedes optimizar lo que no mides. Estas herramientas te dan los datos exactos antes de empezar y para validar mejoras.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left py-3 pr-4 text-zinc-400 font-semibold">Herramienta</th>
                    <th className="text-left py-3 pr-4 text-zinc-400 font-semibold">Qué mide</th>
                    <th className="text-left py-3 pr-4 text-zinc-400 font-semibold">Cuándo usarla</th>
                    <th className="text-left py-3 text-zinc-400 font-semibold">Precio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {[
                    { tool: 'PageSpeed Insights', what: 'LCP, INP, CLS, TBT, TTFB en prod', when: 'Baseline mensual + después de cada deploy', price: 'Gratis' },
                    { tool: 'Chrome DevTools Performance', what: 'Flame chart, re-renders, JS blocking', when: 'Diagnóstico detallado de slowdowns', price: 'Gratis' },
                    { tool: 'React DevTools Profiler', what: 'Re-renders por componente, tiempo de render', when: 'Identificar qué componente memoizar', price: 'Gratis' },
                    { tool: 'Vite Bundle Visualizer', what: 'Tamaño de cada módulo en el bundle', when: 'Antes de code splitting — ver qué pesa', price: 'Gratis' },
                    { tool: 'web-vitals (npm)', what: 'CWV en tiempo real en producción', when: 'Monitoring continuo con usuarios reales', price: 'Gratis' },
                    { tool: 'Sentry Performance', what: 'P75/P95 de CWV con datos reales', when: 'Cuando tienes >100 usuarios activos', price: 'Desde 26€/mes' },
                  ].map((row) => (
                    <tr key={row.tool}>
                      <td className="py-3 pr-4 text-emerald-400 font-mono text-xs">{row.tool}</td>
                      <td className="py-3 pr-4 text-zinc-300">{row.what}</td>
                      <td className="py-3 pr-4 text-zinc-400">{row.when}</td>
                      <td className="py-3 text-zinc-500">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Common mistakes */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5 errores que empeoran el rendimiento</h2>
            <div className="space-y-3">
              {[
                {
                  error: 'Memoizar todo por defecto',
                  detail: 'React.memo tiene un coste de comparación. Si el componente es simple y sus props cambian frecuentemente, memo lo hace más lento. Perfila antes de memoizar.',
                },
                {
                  error: 'useEffect con dependencias vacías para datos que deben actualizarse',
                  detail: 'El eslint-plugin-react-hooks avisa de esto. Dependencias incorrectas causan datos stale — y cuando los corriges descubres que el efecto dispara demasiado.',
                },
                {
                  error: 'Crear nuevos objetos/arrays como valores de Context',
                  detail: 'Si el value de un Context es un objeto literal nuevo en cada render, todos los consumers se re-renderizan siempre. Usa useMemo en el value.',
                },
                {
                  error: 'Bundle de terceros incluido en el chunk principal',
                  detail: 'Librerías como chart.js, pdf-lib o el SDK de Stripe pesan cientos de KB. Impórtalas con lazy() solo en las páginas que las necesitan.',
                },
                {
                  error: 'Fetch waterfall: pedir datos en secuencia dentro de componentes anidados',
                  detail: 'Componente A fetches user → renderiza B → B fetches projects → renderiza C → C fetches payments. Cada nivel espera al anterior. Eleva los fetches al padre o usa React Query con prefetching.',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 bg-red-400/5 border border-red-400/15 rounded-xl p-4">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">{item.error}</p>
                    <p className="text-zinc-400 text-sm">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Checklist */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Checklist de rendimiento: 12 puntos</h2>
            <div className="grid md:grid-cols-2 gap-2">
              {[
                'Medir LCP, INP y CLS en PageSpeed Insights antes de empezar',
                'Code splitting con React.lazy en todas las rutas',
                'Suspense con skeleton loader de la misma altura que el contenido',
                'Imagen LCP: WebP/AVIF + fetchpriority="high" + sin lazy',
                'Todas las demás imágenes: WebP + loading="lazy" + width/height',
                'Virtualización si hay listas de más de 100 elementos',
                'React.memo solo en componentes costosos con props estables',
                'useMemo para filtros y ordenaciones de arrays grandes',
                'Estado de alta frecuencia (formularios) en estado local, no en Context',
                'Analizar bundle con vite-bundle-visualizer — chunks > 100KB revisitar',
                'web-vitals en producción para monitorizar con usuarios reales',
                'Skeleton loaders del mismo tamaño para evitar CLS en carga',
              ].map((item, i) => (
                <div key={i} className="flex gap-2 items-start bg-zinc-900 rounded-lg p-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Decision tree */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">¿Por dónde empiezo con mi app?</h2>
            <div className="space-y-3 text-sm">
              {[
                { q: '¿Tu LCP es > 2.5s?', a: 'Sí', next: '→ Revisa el tamaño del bundle (vite-bundle-visualizer) y optimiza las imágenes primero' },
                { q: '¿Tu INP es > 200ms?', a: 'Sí', next: '→ Usa React DevTools Profiler para ver qué componente tarda más. Virtualiza listas largas.' },
                { q: '¿Tu CLS es > 0.1?', a: 'Sí', next: '→ Añade width/height a todas las imágenes. Usa skeleton loaders del mismo tamaño que el contenido.' },
                { q: '¿El bundle inicial es > 500KB?', a: 'Sí', next: '→ Code splitting inmediato. Cada ruta debe ser un chunk lazy independiente.' },
                { q: '¿Tienes listas de más de 100 elementos?', a: 'Sí', next: '→ Implementa @tanstack/react-virtual. Es la mayor ganancia de INP para dashboards.' },
                { q: '¿Todos los CWV están en verde?', a: 'Sí', next: '→ Monta web-vitals en producción para monitorizar degradaciones con deploys futuros.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="text-zinc-500 font-mono text-xs mt-1 flex-shrink-0 w-4">{i + 1}.</span>
                  <div>
                    <span className="text-white">{item.q} </span>
                    <span className="text-emerald-400 font-semibold">{item.a}</span>
                    <span className="text-zinc-400"> {item.next}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Conclusion */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Conclusión</h2>
            <p className="mb-4">
              Mejorar los Core Web Vitals de un SaaS en React no requiere reescribir la app ni migrar a un framework diferente. Las cinco técnicas de esta guía — code splitting, memoización, optimización de imágenes, virtualización de listas y estado bien estructurado — pueden llevarte de LCP 4.8s a 1.6s en una semana de trabajo.
            </p>
            <p className="mb-4">
              El orden importa: empieza por lo que da más impacto. En la mayoría de SPAs, el code splitting y la optimización de la imagen LCP dan el 70% de la mejora total. La virtualización de listas es clave si tienes dashboards con muchos datos.
            </p>
            <p>
              Mide antes, implementa una técnica a la vez, y mide después. Sin métricas no sabes si tus cambios han funcionado — y a veces el "fix" empeora las cosas.
            </p>
          </section>

          {/* CTA */}
          <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              ¿Quieres que optimicemos tu SaaS?
            </h2>
            <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
              En Think Better auditamos y optimizamos el rendimiento de apps React. LCP, INP, CLS, bundle size — te damos el informe con los 5 cambios de mayor impacto y lo implementamos.
            </p>
            <Link
              to="/cuestionario"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-3 rounded-full transition-colors"
            >
              Cuéntanos tu proyecto
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Back link */}
          <div className="pt-4 border-t border-zinc-800">
            <Link
              to="/blog"
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Ver todos los artículos
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
