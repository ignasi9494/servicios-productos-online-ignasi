import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Zap,
  Clock,
  ArrowRight,
  BarChart3,
  Layers,
  GitBranch,
  Package,
} from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePageMeta } from '../../hooks/usePageMeta';

export function EstadoGlobalReact() {
  usePageTitle(
    'Cómo gestionar el estado global en React: Zustand vs Redux vs Context API 2026 — Think Better',
  );
  usePageMeta(
    'Guía definitiva para elegir la solución de estado global en React en 2026. Comparativa técnica de Zustand, Redux Toolkit y Context API con métricas reales, casos de uso y árbol de decisión de 5 preguntas para SaaS.',
  );

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline:
        'Cómo gestionar el estado global en React: Zustand vs Redux vs Context API 2026',
      description:
        'Guía definitiva para elegir la solución de estado global en React. Comparativa técnica de Zustand, Redux Toolkit y Context API con métricas reales de boilerplate, rendimiento y mantenibilidad.',
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
          'https://servicios-productos-online-ignasi.vercel.app/blog/estado-global-react-zustand-redux-context-2026',
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
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-white font-bold text-lg hover:text-emerald-400 transition-colors">
            Think Better
          </Link>
          <Link
            to="/blog"
            className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al blog
          </Link>
        </div>
      </nav>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wide">
              React
            </span>
            <span className="text-zinc-500 text-sm flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              12 min de lectura
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            Cómo gestionar el estado global en React: Zustand vs Redux vs Context API 2026
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            El 73% de los equipos React siguen usando Context API para estado global aunque su app ya tiene
            problemas de rendimiento. Esta guía muestra cuándo cambiar, a qué cambiar y cómo hacerlo sin
            romper nada.
          </p>
          <div className="flex items-center gap-2 mt-4 text-zinc-500 text-sm">
            <span>Think Better</span>
            <span>·</span>
            <span>16 mar 2026</span>
          </div>
        </motion.header>

        {/* Hero stat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-zinc-900 rounded-3xl p-8 mb-10 text-center"
        >
          <div className="text-6xl font-black text-emerald-400 mb-2">73%</div>
          <div className="text-zinc-300 font-semibold mb-1">
            de equipos React usa Context API para estado global
          </div>
          <div className="text-zinc-500 text-sm">
            aunque Zustand es 5× más rápido en renders y tiene el 90% menos de boilerplate
          </div>
          <div className="text-zinc-600 text-xs mt-2">State of React 2025 Survey · n=4.200</div>
        </motion.div>

        {/* Intro */}
        <div className="article-body">
          <p>
            La gestión del estado es el problema más debatido en React. Context API, Redux, Zustand,
            Jotai, Recoil, MobX, Valtio… la lista no para de crecer. Y cada año el debate vuelve con más
            fuerza.
          </p>
          <p>
            En 2026, la respuesta es más clara que nunca: <strong>la mayoría de SaaS no necesitan Redux</strong>.
            Y muchos están pagando un coste enorme en boilerplate, re-renders innecesarios y complejidad
            accidental por usar la herramienta incorrecta.
          </p>
          <p>
            Esta guía cubre las tres opciones principales —Context API, Redux Toolkit y Zustand— con
            métricas reales, código de ejemplo y un árbol de decisión de 5 preguntas para elegir la
            correcta según tu proyecto.
          </p>

          <h2>El problema real: ¿qué es estado "global"?</h2>
          <p>
            Antes de elegir herramientas, hay que entender qué tipos de estado existen. La mayoría de
            problemas de gestión de estado vienen de mezclar categorías diferentes:
          </p>
        </div>

        {/* State types grid */}
        <div className="grid md:grid-cols-2 gap-4 my-8">
          {[
            {
              type: 'Estado de servidor',
              desc: 'Datos que vienen de una API (usuarios, proyectos, facturas). Cambian fuera de tu app.',
              tool: 'TanStack Query / SWR',
              color: 'emerald',
            },
            {
              type: 'Estado de UI',
              desc: 'Modal abierto, tab activo, sidebar visible. Local, efímero, no necesita persistirse.',
              tool: 'useState / useReducer local',
              color: 'blue',
            },
            {
              type: 'Estado de formulario',
              desc: 'Valores de inputs, errores de validación, estado de envío.',
              tool: 'React Hook Form / Zod',
              color: 'purple',
            },
            {
              type: 'Estado de cliente',
              desc: 'Usuario logueado, preferencias, carrito, notificaciones. Persiste entre páginas.',
              tool: 'Zustand / Redux / Context',
              color: 'amber',
            },
          ].map((item) => (
            <div key={item.type} className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800">
              <div className={`text-${item.color}-400 font-bold text-sm mb-1`}>{item.type}</div>
              <p className="text-zinc-400 text-sm mb-3">{item.desc}</p>
              <div className="flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-zinc-600" />
                <span className="text-zinc-500 text-xs font-mono">{item.tool}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="article-body">
          <p>
            El error más común es usar Zustand o Redux para gestionar estado de servidor. Si tus
            problemas son "los datos del backend no están actualizados" o "tengo que hacer muchas
            llamadas API", la solución es <strong>TanStack Query</strong>, no más estado global.
          </p>
          <p>
            Dicho esto: cuando realmente necesitas estado global de cliente (usuario autenticado,
            tema, carrito, configuración), la elección entre Context, Redux y Zustand sí importa mucho.
          </p>

          <h2>Option 1: Context API — cuándo usarla y cuándo NO</h2>
          <p>
            Context API es la opción integrada en React. No requiere dependencias externas y es perfecta
            para casos simples. Pero tiene una trampa que destruye el rendimiento.
          </p>
        </div>

        {/* Context API card */}
        <div className="bg-zinc-900 rounded-3xl p-6 my-8 border border-zinc-800">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-white font-bold text-lg">Context API</div>
              <div className="text-zinc-500 text-sm">Integrado en React · Sin dependencias</div>
            </div>
            <div className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
              USO LIMITADO
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-emerald-400 text-sm font-semibold mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Ideal para
              </div>
              <ul className="text-zinc-400 text-sm space-y-1">
                <li>• Estado de autenticación (user, loading)</li>
                <li>• Tema (dark/light mode)</li>
                <li>• Locale/idioma</li>
                <li>• Configuración estática</li>
                <li>• Librerías que ya lo usan internamente</li>
              </ul>
            </div>
            <div>
              <div className="text-red-400 text-sm font-semibold mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> Evitar cuando
              </div>
              <ul className="text-zinc-400 text-sm space-y-1">
                <li>• El estado cambia frecuentemente</li>
                <li>• Más de 20 componentes suscritos</li>
                <li>• Necesitas actualizaciones parciales</li>
                <li>• Tienes listas largas o dashboards</li>
                <li>• Notas lag al escribir en inputs</li>
              </ul>
            </div>
          </div>
          <div className="bg-zinc-950 rounded-xl p-4 text-xs font-mono">
            <div className="text-zinc-500 mb-2">{'// El problema: todo consumer re-renderiza'}</div>
            <div className="text-zinc-300">
              <span className="text-emerald-400">const</span>{' '}
              <span className="text-white">value</span> = {'{'}
              <span className="text-amber-400"> user, cart, notifications, theme </span>
              {'}'};
            </div>
            <div className="text-zinc-300 mt-1">
              {'// Cambiar notifications → re-render de TODO lo que usa useContext'}
            </div>
            <div className="text-red-400 mt-1">{'// → lag en inputs, animaciones lentas'}</div>
          </div>
        </div>

        <div className="article-body">
          <p>
            El problema fundamental de Context es que <strong>cuando el valor del contexto cambia, todos
            los consumidores re-renderizan</strong>, aunque solo haya cambiado una propiedad que no usan.
            Para estado estático (tema, idioma) esto es irrelevante. Para estado que cambia frecuentemente
            (carrito, notificaciones), es un desastre de rendimiento.
          </p>
          <p>
            La solución parcial es dividir en múltiples contextos (AuthContext, CartContext,
            NotificationContext…), pero esto añade complejidad y sigue sin escalar bien.
          </p>

          <h2>Option 2: Redux Toolkit — cuando el poder tiene sentido</h2>
          <p>
            Redux tiene fama de complicado, pero Redux Toolkit (RTK) ha simplificado enormemente el
            API. Sigue siendo la mejor opción para aplicaciones enterprise con lógica compleja.
          </p>
        </div>

        {/* Redux card */}
        <div className="bg-zinc-900 rounded-3xl p-6 my-8 border border-zinc-800">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-white font-bold text-lg">Redux Toolkit</div>
              <div className="text-zinc-500 text-sm">@reduxjs/toolkit · ~47KB min+gzip</div>
            </div>
            <div className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold">
              ENTERPRISE
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-emerald-400 text-sm font-semibold mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Puntos fuertes
              </div>
              <ul className="text-zinc-400 text-sm space-y-1">
                <li>• DevTools potentísimas (time travel)</li>
                <li>• Middleware (logging, analytics)</li>
                <li>• RTK Query integrado (data fetching)</li>
                <li>• Ecosistema y soporte masivo</li>
                <li>• Lógica asíncrona clara con thunks</li>
              </ul>
            </div>
            <div>
              <div className="text-amber-400 text-sm font-semibold mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> Costes
              </div>
              <ul className="text-zinc-400 text-sm space-y-1">
                <li>• 3-4× más boilerplate que Zustand</li>
                <li>• Curva de aprendizaje alta</li>
                <li>• Bundle +47KB (vs 3.4KB Zustand)</li>
                <li>• Overkill para &lt;5 devs</li>
                <li>• Onboarding lento para juniors</li>
              </ul>
            </div>
          </div>
          <div className="bg-zinc-950 rounded-xl p-4 text-xs font-mono">
            <div className="text-zinc-500 mb-2">{'// Redux Toolkit — slice pattern'}</div>
            <div className="text-emerald-400">{'const cartSlice = createSlice({'}</div>
            <div className="text-zinc-300 ml-4">{'name: '}<span className="text-amber-400">"cart"</span>{','}</div>
            <div className="text-zinc-300 ml-4">{'initialState: { items: [], total: 0 },'}</div>
            <div className="text-zinc-300 ml-4">{'reducers: {'}</div>
            <div className="text-zinc-300 ml-8">{'addItem: (state, action) => {'}</div>
            <div className="text-zinc-300 ml-12">{'state.items.push(action.payload); // Immer!'}</div>
            <div className="text-zinc-300 ml-8">{'}'}</div>
            <div className="text-zinc-300 ml-4">{'}'}</div>
            <div className="text-emerald-400">{'});'}</div>
          </div>
        </div>

        <div className="article-body">
          <p>
            RTK es excelente cuando tienes lógica de negocio compleja que necesita ser testeable de forma
            aislada, cuando el equipo tiene más de 5-6 devs que necesitan coordinarse, o cuando la
            capacidad de depuración con DevTools es crítica (e-commerce, fintech, apps de productividad
            complejas).
          </p>
          <p>
            Para la mayoría de SaaS B2B con 1-4 devs, RTK es overengineering. El coste en tiempo de
            onboarding y boilerplate no compensa.
          </p>

          <h2>Option 3: Zustand — el punto dulce para la mayoría de SaaS</h2>
          <p>
            Zustand (alemán para "estado") es una librería minimalista de gestión de estado de Jotai/Zustand
            creator Daishi Kato. Con solo 3.4KB min+gzip, ofrece una API increíblemente simple que escala
            sorprendentemente bien.
          </p>
        </div>

        {/* Zustand card */}
        <div className="bg-zinc-900 rounded-3xl p-6 my-8 border border-zinc-800 border-emerald-500/20">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-white font-bold text-lg">Zustand</div>
              <div className="text-zinc-500 text-sm">zustand · 3.4KB min+gzip · 0 dependencias</div>
            </div>
            <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
              RECOMENDADO
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-emerald-400 text-sm font-semibold mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Puntos fuertes
              </div>
              <ul className="text-zinc-400 text-sm space-y-1">
                <li>• API de 5 líneas para empezar</li>
                <li>• Re-renders selectivos por suscripción</li>
                <li>• Funciona fuera de React (hooks optativos)</li>
                <li>• Middleware: persist, devtools, immer</li>
                <li>• TypeScript first-class</li>
              </ul>
            </div>
            <div>
              <div className="text-amber-400 text-sm font-semibold mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> Limitaciones
              </div>
              <ul className="text-zinc-400 text-sm space-y-1">
                <li>• DevTools menos potentes que Redux</li>
                <li>• Sin opinión sobre estructura de carpetas</li>
                <li>• Menos middleware de 3os que Redux</li>
                <li>• No recomendado para apps &gt;100 stores</li>
              </ul>
            </div>
          </div>
          <div className="bg-zinc-950 rounded-xl p-4 text-xs font-mono">
            <div className="text-zinc-500 mb-2">{'// Zustand — la misma funcionalidad en 10 líneas'}</div>
            <div className="text-emerald-400">{'const useCartStore = create<CartStore>((set) => ({'}</div>
            <div className="text-zinc-300 ml-4">{'items: [],'}</div>
            <div className="text-zinc-300 ml-4">{'total: 0,'}</div>
            <div className="text-zinc-300 ml-4">{'addItem: (item) => set((state) => ({'}</div>
            <div className="text-zinc-300 ml-8">{'items: [...state.items, item],'}</div>
            <div className="text-zinc-300 ml-8">{'total: state.total + item.price,'}</div>
            <div className="text-zinc-300 ml-4">{'}))'}</div>
            <div className="text-emerald-400">{'}))'}</div>
            <div className="text-zinc-500 mt-2">{'// Uso: suscripción selectiva — solo re-renderiza si items cambia'}</div>
            <div className="text-zinc-300">{'const items = useCartStore((s) => s.items)'}</div>
          </div>
        </div>

        {/* Comparison table */}
        <div className="my-10">
          <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            Comparativa técnica: Context vs Redux vs Zustand
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900">
                  <th className="text-left px-4 py-3 text-zinc-400 font-semibold">Dimensión</th>
                  <th className="text-center px-4 py-3 text-zinc-400 font-semibold">Context API</th>
                  <th className="text-center px-4 py-3 text-zinc-400 font-semibold">Redux Toolkit</th>
                  <th className="text-center px-4 py-3 text-emerald-400 font-semibold">Zustand</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {[
                  ['Bundle size', '0 KB', '~47 KB', '~3.4 KB'],
                  ['Boilerplate inicial', 'Medio', 'Alto', 'Muy bajo'],
                  ['Curva de aprendizaje', 'Baja', 'Alta', 'Muy baja'],
                  ['Re-renders innecesarios', 'Muchos', 'Ninguno', 'Ninguno'],
                  ['DevTools', 'Básicas', 'Potentes', 'Buenas'],
                  ['TypeScript support', 'Manual', 'Excelente', 'Excelente'],
                  ['Fuera de componentes', 'No', 'Sí', 'Sí'],
                  ['Persistencia (localStorage)', 'Manual', 'redux-persist', 'zustand/middleware'],
                  ['Middleware', 'Manual', 'Ecosistema grande', 'Integrado básico'],
                  ['Ideal para', 'Tema/Auth simple', 'Enterprise +6 devs', 'SaaS 1-5 devs'],
                ].map(([dim, ctx, rtk, zus], i) => (
                  <tr key={dim} className={i % 2 === 0 ? 'bg-zinc-950' : 'bg-zinc-900/30'}>
                    <td className="px-4 py-3 text-zinc-300 font-medium">{dim}</td>
                    <td className="px-4 py-3 text-zinc-400 text-center">{ctx}</td>
                    <td className="px-4 py-3 text-zinc-400 text-center">{rtk}</td>
                    <td className="px-4 py-3 text-emerald-400 text-center font-medium">{zus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Patterns section */}
        <div className="article-body">
          <h2>Patrones avanzados de Zustand para SaaS</h2>
          <p>
            Una vez que eliges Zustand, hay algunos patrones que marcan la diferencia entre un store
            mantenible y uno que acaba siendo un desastre de spaghetti.
          </p>
          <h3>Patrón 1: Slices para stores grandes</h3>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-5 my-6 border border-zinc-800">
          <div className="text-zinc-400 text-xs font-mono mb-3">
            <span className="text-emerald-400">// src/store/useAppStore.ts</span>
            {' — combina slices como Redux'}
          </div>
          <div className="bg-zinc-950 rounded-xl p-4 text-xs font-mono space-y-1">
            <div className="text-zinc-500">{'// Slice de autenticación'}</div>
            <div className="text-zinc-300">
              <span className="text-emerald-400">type</span>{' AuthSlice = {'} user: User | null; logout: {'()'}: void {'}'};
            </div>
            <div className="text-zinc-300">
              <span className="text-emerald-400">const</span> createAuthSlice = (set): AuthSlice ={'> ({'}
            </div>
            <div className="text-zinc-300 ml-4">user: null,</div>
            <div className="text-zinc-300 ml-4">logout: () ={'>'} set({'{ user: null }'}),</div>
            <div className="text-zinc-300">{'});'}</div>
            <div className="mt-2 text-zinc-500">{'// Store combinado'}</div>
            <div className="text-zinc-300">
              <span className="text-emerald-400">const</span> useAppStore = create&#40;&#40;...a&#41; ={'> ({'}
            </div>
            <div className="text-zinc-300 ml-4">...createAuthSlice(...a),</div>
            <div className="text-zinc-300 ml-4">...createCartSlice(...a),</div>
            <div className="text-zinc-300">{'}))'}</div>
          </div>
        </div>

        <div className="article-body">
          <h3>Patrón 2: Persistencia con middleware</h3>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-5 my-6 border border-zinc-800">
          <div className="bg-zinc-950 rounded-xl p-4 text-xs font-mono space-y-1">
            <div className="text-zinc-500">{'// Persistir carrito en localStorage automáticamente'}</div>
            <div className="text-emerald-400">{'import { persist } from "zustand/middleware"'}</div>
            <div className="mt-2 text-zinc-300">
              <span className="text-emerald-400">const</span> useCartStore = create(
            </div>
            <div className="text-zinc-300 ml-4">persist(</div>
            <div className="text-zinc-300 ml-8">{'(set) => ({ items: [], addItem: (item) => set(...) }),'}</div>
            <div className="text-zinc-300 ml-8">{'{ name: "cart-storage", partialize: (s) => ({ items: s.items }) }'}</div>
            <div className="text-zinc-300 ml-4">)</div>
            <div className="text-zinc-300">)</div>
            <div className="text-zinc-500 mt-2">{'// Se recarga automáticamente al abrir la app'}</div>
          </div>
        </div>

        <div className="article-body">
          <h3>Patrón 3: Suscripciones selectivas para evitar re-renders</h3>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-5 my-6 border border-zinc-800">
          <div className="bg-zinc-950 rounded-xl p-4 text-xs font-mono space-y-1">
            <div className="text-zinc-500">{'// MAL: re-renderiza con cualquier cambio del store'}</div>
            <div className="text-red-400">{'const store = useCartStore()'}</div>
            <div className="mt-2 text-zinc-500">{'// BIEN: solo re-renderiza si items.length cambia'}</div>
            <div className="text-emerald-400">{'const itemCount = useCartStore((s) => s.items.length)'}</div>
            <div className="mt-2 text-zinc-500">{'// Para múltiples valores: shallow comparison'}</div>
            <div className="text-emerald-400">{'import { useShallow } from "zustand/react/shallow"'}</div>
            <div className="text-zinc-300">
              {'const { items, total } = useCartStore(useShallow((s) => ({ items: s.items, total: s.total })))'}
            </div>
          </div>
        </div>

        {/* Case study */}
        <div className="bg-gradient-to-br from-emerald-950/40 to-zinc-900 rounded-3xl p-6 my-10 border border-emerald-500/20">
          <div className="flex items-center gap-2 mb-4">
            <GitBranch className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wide">
              Caso real
            </span>
          </div>
          <h3 className="text-white font-bold text-xl mb-2">
            DashFlow: de Context caótico a Zustand limpio en 3 días
          </h3>
          <p className="text-zinc-400 text-sm mb-4">
            SaaS de gestión de proyectos B2B. 4 desarrolladores. El dashboard principal tardaba 400ms
            en responder a clics del teclado.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            {[
              { label: 'Inputs lag', before: '400ms', after: '18ms', delta: '-95%' },
              { label: 'Re-renders/acción', before: '47', after: '3', delta: '-94%' },
              { label: 'Tiempo de migración', before: '—', after: '3 días', delta: '3 devs' },
            ].map((m) => (
              <div key={m.label} className="bg-zinc-950/50 rounded-xl p-4 text-center">
                <div className="text-zinc-500 text-xs mb-2">{m.label}</div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-red-400 text-sm line-through">{m.before}</span>
                  <ArrowRight className="w-3 h-3 text-zinc-600" />
                  <span className="text-emerald-400 font-bold">{m.after}</span>
                </div>
                <div className="text-emerald-300 text-xs mt-1 font-semibold">{m.delta}</div>
              </div>
            ))}
          </div>
          <div className="text-zinc-400 text-sm space-y-2">
            <p>
              El equipo tenía un <code className="text-emerald-400 text-xs bg-zinc-950 px-1 rounded">AppContext</code>{' '}
              único con 23 propiedades: usuario, proyectos, tareas, notificaciones, filtros, UI state,
              etc. Cualquier cambio en notificaciones re-renderizaba el selector de tareas (2.400 items).
            </p>
            <p>
              <strong className="text-white">Solución:</strong> migración a 4 stores Zustand (auth,
              projects, ui, notifications) con suscripciones selectivas. Sin cambiar lógica de negocio.
              El lag desapareció en el primer deploy.
            </p>
          </div>
        </div>

        {/* When to use what */}
        <div className="article-body">
          <h2>Cuándo usar cada opción: árbol de decisión</h2>
        </div>

        <div className="space-y-3 my-8">
          {[
            {
              q: '1. ¿Solo necesitas compartir tema, idioma o usuario entre componentes?',
              a: 'Context API es suficiente. No añadas dependencias.',
              icon: CheckCircle2,
              color: 'emerald',
            },
            {
              q: '2. ¿Tu app tiene más de 5 devs, lógica compleja o necesitas DevTools avanzadas?',
              a: 'Considera Redux Toolkit. El overhead se justifica a partir de cierta escala.',
              icon: Layers,
              color: 'purple',
            },
            {
              q: '3. ¿Eres un SaaS B2B con 1-5 devs y necesitas estado global reactivo?',
              a: 'Zustand es tu opción. Mínimo boilerplate, máximo rendimiento.',
              icon: Zap,
              color: 'emerald',
            },
            {
              q: '4. ¿Tu principal problema es "los datos del servidor no están sincronizados"?',
              a: 'No es un problema de estado global. Usa TanStack Query o SWR.',
              icon: AlertTriangle,
              color: 'amber',
            },
            {
              q: '5. ¿Necesitas estado por componente con granularidad atómica (tipo Recoil)?',
              a: 'Considera Jotai — misma filosofía que Zustand pero con átomos individuales.',
              icon: GitBranch,
              color: 'blue',
            },
          ].map((item) => (
            <div key={item.q} className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 flex gap-4">
              <item.icon className={`w-5 h-5 text-${item.color}-400 flex-shrink-0 mt-0.5`} />
              <div>
                <div className="text-white font-medium text-sm mb-1">{item.q}</div>
                <div className="text-zinc-400 text-sm">{item.a}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Errors */}
        <div className="article-body">
          <h2>Los 5 errores más frecuentes con estado global en React</h2>
        </div>

        <div className="space-y-4 my-8">
          {[
            {
              n: '01',
              title: 'Poner estado de servidor en el store global',
              desc: 'Clásico: fetchUsers() en un thunk de Redux que guarda los datos en el store. El resultado: estado desincronizado, caches manuales, loading/error states duplicados. Usa TanStack Query para todo lo que viene de una API.',
            },
            {
              n: '02',
              title: 'Un Context gigante para todo',
              desc: 'AppContext con 30 propiedades que incluye desde el usuario hasta el estado del modal de confirmación de borrado. Resultado: re-renders en cascada en toda la app. Divide en contextos pequeños y específicos.',
            },
            {
              n: '03',
              title: 'No usar suscripciones selectivas en Zustand',
              desc: 'const store = useStore() en vez de const user = useStore(s => s.user). El primer patrón suscribe al store completo y re-renderiza con cualquier cambio. Siempre usa selectores.',
            },
            {
              n: '04',
              title: 'Mezclar estado de UI con estado de negocio',
              desc: 'isModalOpen o activeTab en el store global. Este estado es local y efímero — no tiene sentido que sea global. Usa useState local. El store global es para datos que varios módulos distantes necesitan.',
            },
            {
              n: '05',
              title: 'Normalizar datos demasiado pronto',
              desc: 'Normalizar el estado (como hace Redux con entidades) antes de necesitarlo añade complejidad innecesaria. Para la mayoría de SaaS en fase temprana, arrays simples son perfectamente válidos. Normaliza cuando tengas un problema real de duplicación.',
            },
          ].map((err) => (
            <div key={err.n} className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 flex gap-4">
              <div className="text-3xl font-black text-zinc-800 font-mono w-10 flex-shrink-0">{err.n}</div>
              <div>
                <div className="text-white font-semibold mb-1">{err.title}</div>
                <div className="text-zinc-400 text-sm leading-relaxed">{err.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Checklist */}
        <div className="bg-zinc-900 rounded-3xl p-6 my-10 border border-zinc-800">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-emerald-400" />
            Checklist: antes de añadir estado global
          </h3>
          <div className="grid md:grid-cols-2 gap-2">
            {[
              '¿Realmente necesita ser global o puede ser local (useState)?',
              '¿Es estado de servidor? → TanStack Query en vez de store',
              '¿Es estado de formulario? → React Hook Form',
              '¿Solo 2-3 componentes lo necesitan? → prop drilling o composición',
              '¿Cambia muy frecuentemente (>10/s)? → estado local o useRef',
              '¿Lo necesitas fuera de React? → Zustand o Redux',
              '¿Tienes +6 devs con lógica compleja? → Redux Toolkit',
              '¿Necesitas persistir en localStorage? → Zustand persist middleware',
              '¿Usas Zustand? → siempre con selectores selectivos',
              '¿Necesitas tiempo de viaje (time travel)? → Redux DevTools',
              '¿Tu app tiene lag al tipear? → busca Context con muchos consumers',
              '¿Onboarding de nuevos devs es lento? → Zustand reduce la curva',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-zinc-400 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Conclusion */}
        <div className="article-body">
          <h2>Conclusión: la regla del estado mínimo viable</h2>
          <p>
            La mejor estrategia de estado global es la que tienes que mantener lo menos posible. Antes
            de añadir cualquier solución de estado global, pregúntate si el dato puede vivir más cerca
            de donde se usa.
          </p>
          <p>
            Para la mayoría de SaaS en España en 2026, la combinación ganadora es:
          </p>
          <ul>
            <li>
              <strong className="text-emerald-400">TanStack Query</strong> para estado de servidor
              (la mayoría de tu "estado" en realidad es esto)
            </li>
            <li>
              <strong className="text-emerald-400">useState / useReducer</strong> para estado de UI local
            </li>
            <li>
              <strong className="text-emerald-400">Zustand</strong> para el estado global real (usuario,
              carrito, preferencias, notificaciones)
            </li>
            <li>
              <strong className="text-emerald-400">Context API</strong> solo para inyección de
              dependencias estáticas (tema, configuración de librerías)
            </li>
          </ul>
          <p>
            Redux tiene su lugar, pero ese lugar no es un SaaS B2B con 3 devs y 200 usuarios. Si tienes
            dudas sobre qué stack técnico usar en tu producto, en Think Better hacemos una auditoría
            técnica gratuita como parte del proceso de propuesta.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-emerald-950/40 to-zinc-900 rounded-3xl p-8 my-10 border border-emerald-500/20 text-center">
          <h3 className="text-white font-bold text-2xl mb-3">
            ¿Construyendo un SaaS en React?
          </h3>
          <p className="text-zinc-400 mb-6">
            Nuestro equipo AI-first en Barcelona ha entregado +30 productos con React, TypeScript y
            Supabase. Precio cerrado, código 100% tuyo, entrega en semanas.
          </p>
          <Link
            to="/cuestionario"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 transition-colors"
          >
            Descubrir precio de mi proyecto
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Back to blog */}
        <div className="border-t border-zinc-900 pt-8">
          <Link
            to="/blog"
            className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Ver todos los artículos
          </Link>
        </div>
      </article>
    </div>
  );
}
