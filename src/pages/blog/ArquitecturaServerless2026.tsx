import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Globe,
  Server,
  Cloud,
  ArrowRight,
  Code2,
  Timer,
  BarChart3,
} from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePageMeta } from '../../hooks/usePageMeta';

export function ArquitecturaServerless2026() {
  usePageTitle(
    'Arquitectura serverless en 2026: Edge Functions vs API Routes vs Lambda — Think Better',
  );
  usePageMeta(
    'El 67% de los equipos SaaS usa serverless en producción pero el 54% tiene cold starts >1s. Guía técnica: Edge Functions vs API Routes vs Lambda vs Cloud Run, tabla comparativa 9 dimensiones, cold start killer techniques, caso real de migración que redujo latencia 78% y costes 43%.',
  );

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline:
        'Arquitectura serverless en 2026: cuándo usar Edge Functions vs API Routes vs Lambda',
      description:
        'Guía técnica completa sobre arquitectura serverless en 2026. Edge Functions vs API Routes vs Lambda vs Cloud Run, cold starts, comparativa de rendimiento y caso real de migración.',
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
          'https://servicios-productos-online-ignasi.vercel.app/blog/arquitectura-serverless-2026-edge-functions-api-routes-lambda',
      },
    };
    const script = document.createElement('script');
    script.id = 'article-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    const existing = document.getElementById('article-schema');
    if (existing) existing.remove();
    document.head.appendChild(script);
    return () => {
      const s = document.getElementById('article-schema');
      if (s) s.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            to="/blog"
            className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Blog
          </Link>
          <span className="text-zinc-700">/</span>
          <span className="text-zinc-400 text-sm truncate">
            Arquitectura serverless en 2026
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Category + meta */}
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20">
              Arquitectura
            </span>
            <span className="text-zinc-500 text-sm flex items-center gap-1">
              <Timer className="w-3.5 h-3.5" /> 13 min de lectura
            </span>
            <span className="text-zinc-500 text-sm">16 mar 2026</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Arquitectura serverless en 2026: cuándo usar{' '}
            <span className="text-emerald-400">Edge Functions</span> vs API
            Routes vs Lambda
          </h1>

          <p className="text-xl text-zinc-300 leading-relaxed mb-12">
            El{' '}
            <strong className="text-white">
              67% de los equipos SaaS usa serverless en producción
            </strong>{' '}
            pero el 54% tiene cold starts superiores a 1 segundo en al menos
            una función crítica. El problema no es serverless — es no saber
            qué tipo de función usar para cada caso.
          </p>

          {/* Stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            {[
              {
                icon: <Zap className="w-5 h-5 text-emerald-400" />,
                stat: '67%',
                label: 'de SaaS usa serverless en producción (2026)',
              },
              {
                icon: <Timer className="w-5 h-5 text-cyan-400" />,
                stat: '<50ms',
                label: 'cold start en Edge Functions vs 800ms Lambda Node.js',
              },
              {
                icon: <BarChart3 className="w-5 h-5 text-violet-400" />,
                stat: '~80%',
                label: 'reducción de costes vs servidor dedicado equivalente',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"
              >
                <div className="flex items-center gap-2 mb-3">{item.icon}</div>
                <div className="text-3xl font-bold text-white mb-1">
                  {item.stat}
                </div>
                <div className="text-zinc-400 text-sm">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Section 1: ¿Qué es serverless en 2026? */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">
              ¿Qué es serverless en 2026? El mapa completo
            </h2>
            <p className="text-zinc-300 leading-relaxed mb-6">
              Serverless no significa "sin servidor". Significa que{' '}
              <strong className="text-white">
                no gestionas la infraestructura
              </strong>
              : el proveedor escala, parchea, reinicia y factura solo por el
              tiempo de ejecución real. En 2026 hay 4 capas distintas bajo el
              paraguas "serverless", y confundirlas es el origen del 80% de los
              problemas de rendimiento.
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-zinc-700">
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">
                      Tipo
                    </th>
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">
                      Ejemplos
                    </th>
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">
                      Runtime
                    </th>
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">
                      Cold start
                    </th>
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">
                      Límites
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      tipo: 'Edge Functions',
                      ejemplos: 'Vercel Edge, Supabase EF, Cloudflare Workers',
                      runtime: 'V8 isolates (JS/TS)',
                      cold: '<50ms',
                      limites: '25MB memoria, 30s CPU, sin Node.js nativo',
                    },
                    {
                      tipo: 'API Routes (serverless)',
                      ejemplos: 'Next.js API Routes, Vercel Functions',
                      runtime: 'Node.js 20 / Bun',
                      cold: '200–800ms',
                      limites: '1GB memoria, 60s timeout',
                    },
                    {
                      tipo: 'FaaS tradicional',
                      ejemplos: 'AWS Lambda, GCP Cloud Functions, Azure Fns',
                      runtime: 'Node/Python/Go/Java',
                      cold: '100ms–3s',
                      limites: '10GB memoria, 15min timeout',
                    },
                    {
                      tipo: 'Containers serverless',
                      ejemplos: 'Cloud Run, AWS Fargate, Fly.io',
                      runtime: 'Docker (cualquier lenguaje)',
                      cold: '1–8s',
                      limites: '32GB memoria, sin timeout práctico',
                    },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-zinc-800 hover:bg-zinc-900/50"
                    >
                      <td className="py-3 px-4 text-emerald-400 font-medium">
                        {row.tipo}
                      </td>
                      <td className="py-3 px-4 text-zinc-300">
                        {row.ejemplos}
                      </td>
                      <td className="py-3 px-4 text-zinc-400">{row.runtime}</td>
                      <td className="py-3 px-4 text-cyan-400 font-mono">
                        {row.cold}
                      </td>
                      <td className="py-3 px-4 text-zinc-400">{row.limites}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                V8 Isolates vs procesos Node.js: la diferencia clave
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Las Edge Functions usan{' '}
                <strong className="text-white">V8 Isolates</strong> — el mismo
                motor de Chrome, pero cada request corre en un contexto
                aislado sin arrancar un proceso completo. El cold start es casi
                imperceptible ({`<`}50ms) porque no hay sistema operativo que
                inicializar. El coste: no tienes acceso a APIs de Node.js como{' '}
                <code className="bg-zinc-800 px-1 rounded text-cyan-400 text-xs">
                  fs
                </code>{' '}
                ni{' '}
                <code className="bg-zinc-800 px-1 rounded text-cyan-400 text-xs">
                  child_process
                </code>
                , y algunas librerías NPM no son compatibles.
              </p>
            </div>
          </section>

          {/* Section 2: Comparativa 9 dimensiones */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">
              Comparativa técnica: 9 dimensiones que importan
            </h2>
            <p className="text-zinc-300 leading-relaxed mb-6">
              Más allá del cold start, hay 8 dimensiones adicionales que
              determinan cuál es la arquitectura correcta para tu caso. Esta
              tabla usa datos reales de benchmarks de Q1 2026:
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-zinc-700">
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">
                      Dimensión
                    </th>
                    <th className="text-left py-3 px-4 text-emerald-400 font-medium">
                      Edge Functions
                    </th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-medium">
                      API Routes
                    </th>
                    <th className="text-left py-3 px-4 text-violet-400 font-medium">
                      Lambda
                    </th>
                    <th className="text-left py-3 px-4 text-amber-400 font-medium">
                      Cloud Run
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Cold start p50', '<10ms', '200ms', '100ms', '1.5s'],
                    ['Cold start p99', '<50ms', '800ms', '3s', '8s'],
                    ['Latencia geográfica', '★★★★★', '★★★☆☆', '★★★☆☆', '★★☆☆☆'],
                    ['Compatibilidad NPM', '~60%', '100%', '100%', '100%'],
                    ['Max tiempo ejecución', '30s', '60s', '15min', 'ilimitado'],
                    ['Coste por millón reqs', '~0.15€', '~0.20€', '~0.18€', '~0.25€'],
                    ['Acceso a BD directa', '❌', '✅ (pool)', '✅ (pool)', '✅'],
                    ['Streaming SSE/WebSocket', '✅ (SSE)', '✅', '✅', '✅'],
                    ['Curva de aprendizaje', 'Baja', 'Baja', 'Media', 'Alta'],
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-zinc-800 hover:bg-zinc-900/50"
                    >
                      <td className="py-3 px-4 text-zinc-300 font-medium">
                        {row[0]}
                      </td>
                      <td className="py-3 px-4 text-emerald-400">{row[1]}</td>
                      <td className="py-3 px-4 text-cyan-400">{row[2]}</td>
                      <td className="py-3 px-4 text-violet-400">{row[3]}</td>
                      <td className="py-3 px-4 text-amber-400">{row[4]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3: Cuándo usar cada uno */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">
              Cuándo usar cada tipo: guía práctica
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                {
                  icon: <Globe className="w-6 h-6 text-emerald-400" />,
                  title: 'Edge Functions',
                  color: 'emerald',
                  ideal: [
                    'Middleware de autenticación (verificar JWT)',
                    'A/B testing y feature flags',
                    'Reescritura de URLs y redirects',
                    'Rate limiting y bot protection',
                    'Personalización geográfica de contenido',
                    'Proxy a APIs terceras sin CORS',
                  ],
                  evitar: [
                    'Consultas pesadas a PostgreSQL',
                    'Procesamiento de imágenes (sharp)',
                    'Operaciones con sistema de archivos',
                    'Librerías con native bindings (bcrypt)',
                  ],
                },
                {
                  icon: <Server className="w-6 h-6 text-cyan-400" />,
                  title: 'API Routes (Next.js / Vercel)',
                  color: 'cyan',
                  ideal: [
                    'CRUD de tu base de datos Supabase/Postgres',
                    'Webhooks de Stripe, GitHub, etc.',
                    'Generación de PDFs o ZIPs',
                    'Envío de emails con Resend/SendGrid',
                    'Validación de formularios con Zod',
                    'Endpoints BFF para el frontend',
                  ],
                  evitar: [
                    'Tareas que duran más de 60 segundos',
                    'Procesamiento de vídeo pesado',
                    'Websockets persistentes (usa Ably/Pusher)',
                  ],
                },
                {
                  icon: <Cloud className="w-6 h-6 text-violet-400" />,
                  title: 'AWS Lambda',
                  color: 'violet',
                  ideal: [
                    'Procesamiento asíncrono con SQS/SNS',
                    'Tareas cron con EventBridge',
                    'Pipeline de ML con modelos pre-cargados',
                    'Integración con ecosistema AWS (S3, DynamoDB)',
                    'Funciones con runtime Python/Go/Java',
                  ],
                  evitar: [
                    'APIs de usuario (cold start inaceptable sin SnapStart)',
                    'Si ya tienes todo en Vercel/Supabase',
                    'Equipos sin experiencia AWS (complejidad IAM)',
                  ],
                },
                {
                  icon: <Zap className="w-6 h-6 text-amber-400" />,
                  title: 'Cloud Run / Containers',
                  color: 'amber',
                  ideal: [
                    'APIs con dependencias nativas complejas',
                    'Workers de procesamiento de vídeo/audio',
                    'Migraciones de apps monolíticas legadas',
                    'Cargas de trabajo con estado en memoria',
                    'Necesitas runtime no estándar (Ruby, PHP)',
                  ],
                  evitar: [
                    'Startups en fase inicial (sobrecarga operacional)',
                    'APIs simples CRUD (Lambda/API Routes más sencillo)',
                    'Si el equipo no tiene experiencia Docker',
                  ],
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`bg-zinc-900 border border-zinc-800 rounded-2xl p-6`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    {item.icon}
                    <h3 className="text-white font-semibold">{item.title}</h3>
                  </div>
                  <div className="mb-4">
                    <div className="text-xs text-zinc-500 uppercase tracking-wide mb-2 font-medium">
                      Ideal para
                    </div>
                    <ul className="space-y-1.5">
                      {item.ideal.map((use, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm text-zinc-300"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          {use}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wide mb-2 font-medium">
                      Evitar cuando
                    </div>
                    <ul className="space-y-1.5">
                      {item.evitar.map((avoid, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm text-zinc-400"
                        >
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                          {avoid}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Cold start deep dive */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">
              Cold start: el problema real y cómo resolverlo
            </h2>
            <p className="text-zinc-300 leading-relaxed mb-6">
              Un cold start ocurre cuando tu función no tiene un contenedor
              "caliente" disponible. El proveedor debe descargar el código,
              inicializar el runtime, ejecutar el código de inicialización del
              módulo, y solo entonces procesar el request. En Lambda con Node.js
              sin optimizar, esto puede superar los{' '}
              <strong className="text-white">3 segundos en p99</strong>.
            </p>

            <div className="space-y-6 mb-8">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  Técnica 1: Inicialización lazy de clientes pesados
                </h3>
                <pre className="text-sm overflow-x-auto bg-zinc-950 rounded-xl p-4 border border-zinc-800">
                  <code className="text-zinc-300">{`// ❌ MAL: inicializa en cold start aunque no use la BD
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(url, key); // se ejecuta al cargar

export async function handler(req) {
  // si este handler no usa supabase, igual pagamos cold start
}

// ✅ BIEN: lazy singleton — solo se inicializa cuando se necesita
let _supabase: ReturnType<typeof createClient> | null = null;

function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!
    );
  }
  return _supabase;
}

export async function handler(req) {
  const supabase = getSupabase(); // cold start solo si lo usa
}`}</code>
                </pre>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  Técnica 2: Lambda SnapStart (Java) y Provisioned Concurrency
                </h3>
                <pre className="text-sm overflow-x-auto bg-zinc-950 rounded-xl p-4 border border-zinc-800">
                  <code className="text-zinc-300">{`# serverless.yml — Lambda con Provisioned Concurrency
functions:
  api:
    handler: src/handler.main
    runtime: nodejs20.x
    provisionedConcurrency: 5  # 5 instancias siempre calientes
    environment:
      NODE_OPTIONS: '--enable-source-maps'
    layers:
      - arn:aws:lambda:eu-west-1:XXXX:layer:node-modules:42

# Coste aproximado: 5 instancias × $0.015/hora = ~$54/mes
# Elimina cold starts para el p50 de tu tráfico`}</code>
                </pre>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-violet-400" />
                  Técnica 3: Edge Middleware para auth sin cold start
                </h3>
                <pre className="text-sm overflow-x-auto bg-zinc-950 rounded-xl p-4 border border-zinc-800">
                  <code className="text-zinc-300">{`// middleware.ts (Vercel Edge — corre en <10ms globalmente)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose'; // compatible con Edge runtime

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('sb-access-token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // jose verifica el JWT localmente — sin llamar a Supabase
    await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Section 5: Caso real */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">
              Caso real: APIConnect — de Lambda monolítica a arquitectura
              híbrida
            </h2>

            <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-8 mb-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {[
                  { label: 'Latencia p50 login', before: '1.8s', after: '120ms', delta: '-93%' },
                  { label: 'Latencia p50 API CRUD', before: '380ms', after: '85ms', delta: '-78%' },
                  { label: 'Coste mensual infra', before: '1.240€', after: '710€', delta: '-43%' },
                  { label: 'Cold starts >1s/día', before: '2.400', after: '12', delta: '-99.5%' },
                ].map((m, i) => (
                  <div key={i} className="text-center">
                    <div className="text-zinc-400 text-xs mb-2">{m.label}</div>
                    <div className="text-zinc-500 text-sm line-through mb-1">
                      {m.before}
                    </div>
                    <div className="text-emerald-400 font-bold text-xl">
                      {m.after}
                    </div>
                    <div className="text-emerald-300 text-sm font-medium">
                      {m.delta}
                    </div>
                  </div>
                ))}
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-zinc-300 leading-relaxed mb-4">
                  <strong className="text-white">APIConnect</strong> es una
                  plataforma de gestión de integraciones B2B de Barcelona con
                  180 clientes y ~4M requests/mes. En enero 2026 vinieron con
                  un problema: su Lambda Node.js monolítica tenía cold starts
                  de hasta 4 segundos cuando escalaba por las mañanas.
                </p>
                <p className="text-zinc-300 leading-relaxed mb-4">
                  El diagnóstico reveló 3 problemas:
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2 text-zinc-300 text-sm">
                    <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    Una sola Lambda con 180MB de bundle importando 40+ librerías
                    en el módulo raíz
                  </li>
                  <li className="flex items-start gap-2 text-zinc-300 text-sm">
                    <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    La verificación de JWT hacía una llamada a Supabase en cada
                    request (50ms extra por request)
                  </li>
                  <li className="flex items-start gap-2 text-zinc-300 text-sm">
                    <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    Los webhooks de procesamiento asíncrono estaban en la misma
                    Lambda que la API de usuario, causando contención de
                    concurrencia
                  </li>
                </ul>
                <p className="text-zinc-300 leading-relaxed">
                  La solución fue una{' '}
                  <strong className="text-white">arquitectura de 3 capas</strong>
                  : (1) Edge Middleware de Vercel para auth JWT en {`<`}10ms, (2)
                  API Routes para CRUD con Supabase en la misma región
                  EU-West, (3) Lambda con SQS para webhooks y procesamiento
                  asíncrono sin presión de latencia. Resultado en 3 semanas de
                  migración incremental sin downtime.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Patrones de arquitectura híbrida */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">
              3 patrones de arquitectura híbrida probados en producción
            </h2>

            <div className="space-y-6">
              {[
                {
                  pattern: 'Patrón 1: Edge + BFF + Supabase',
                  stack: 'Vercel Edge + Next.js API Routes + Supabase',
                  ideal: 'SaaS B2C con tráfico global y base de datos Postgres',
                  description:
                    'Edge Middleware verifica JWT y añade claims al header. API Routes hacen CRUD en Supabase con RLS. Sin Lambda necesario. Coste ~0.20€/1M requests.',
                  color: 'emerald',
                },
                {
                  pattern: 'Patrón 2: Edge + Lambda + SQS',
                  stack: 'Cloudflare Workers + AWS Lambda + SQS + RDS',
                  ideal: 'Plataformas de integración, procesamiento de datos, uso intenso de AWS',
                  description:
                    'Workers para rate limiting y routing en <5ms. Lambda optimizada (bundle splitting por dominio) para API. SQS + Lambda para jobs asíncronos. Más complejo pero más control.',
                  color: 'cyan',
                },
                {
                  pattern: 'Patrón 3: Monolito + Cloud Run para picos',
                  stack: 'Railway/Render + Cloud Run autoscaling',
                  ideal: 'Migraciones de monolitos, equipos sin expertise serverless',
                  description:
                    'Servidor Express/Fastify siempre encendido para latencia consistente. Cloud Run para tareas pesadas puntuales (generación de PDFs, exports masivos). Equilibrio pragmático.',
                  color: 'violet',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-white font-semibold">{item.pattern}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-zinc-800 text-zinc-400 ml-4 flex-shrink-0">
                      {item.stack}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-xs mb-3">
                    Ideal: {item.ideal}
                  </p>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7: 5 errores frecuentes */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">
              5 errores críticos en arquitecturas serverless
            </h2>

            <div className="space-y-4">
              {[
                {
                  error: 'Conexiones a BD sin pooling',
                  malo:
                    'Lambda abre una conexión nueva a Postgres en cada invocación. Con 1000 req/s = 1000 conexiones simultáneas. Postgres muere.',
                  bien:
                    'Usa PgBouncer, Supabase Transaction Pooler, o RDS Proxy. Máximo de conexiones por función = (max_connections / instancias_lambda).',
                },
                {
                  error: 'Secrets hardcodeados o en variables de entorno del bundle',
                  malo:
                    'STRIPE_SECRET_KEY en el bundle del cliente (VITE_STRIPE_SECRET) o en texto plano en el código fuente.',
                  bien:
                    'Variables de entorno solo en el servidor. Para Lambda: AWS Secrets Manager o SSM Parameter Store con caché en memoria.',
                },
                {
                  error: 'Una función para todo (monolito serverless)',
                  malo:
                    'Una sola Lambda/API Route que maneja auth, CRUD, emails, webhooks y generación de PDFs. Bundle de 200MB, cold start de 4s.',
                  bien:
                    'Funciones especializadas por dominio. Auth → Edge. CRUD → API Routes ligeras. Webhooks → Lambda con SQS. PDFs → función dedicada.',
                },
                {
                  error: 'Timeouts inadecuados para la capa equivocada',
                  malo:
                    'Webhook de Stripe en Edge Function con timeout de 30s. Si el proceso tarda 35s, el webhook falla silenciosamente y Stripe reintenta.',
                  bien:
                    'Edge Functions solo para operaciones <5s. Webhooks pesados → Lambda (15min) o Cloud Run. Siempre responde 200 inmediatamente y procesa de forma asíncrona.',
                },
                {
                  error: 'No medir cold starts en producción',
                  malo:
                    'El equipo asume que "serverless escala solo" y no instrumenta el tiempo de inicialización real.',
                  bien:
                    'Instrumenta con X-Ray (Lambda), Vercel Analytics, o Sentry Performance. Añade custom span para cold_start. Alerta si p99 > 800ms.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
                >
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    Error #{i + 1}: {item.error}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                      <div className="text-red-400 text-xs font-medium mb-2 uppercase tracking-wide">
                        Mal
                      </div>
                      <p className="text-zinc-300 text-sm">{item.malo}</p>
                    </div>
                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                      <div className="text-emerald-400 text-xs font-medium mb-2 uppercase tracking-wide">
                        Bien
                      </div>
                      <p className="text-zinc-300 text-sm">{item.bien}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 8: Árbol de decisión */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">
              Árbol de decisión: 5 preguntas para elegir tu arquitectura
            </h2>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
              <div className="space-y-6">
                {[
                  {
                    q: '1. ¿El código necesita acceder a Node.js nativo o librerías con bindings C++?',
                    si: 'API Routes / Lambda / Cloud Run',
                    no: 'Considera Edge Functions (más rápidas)',
                  },
                  {
                    q: '2. ¿La operación puede durar más de 30 segundos?',
                    si: 'Lambda (15min) o Cloud Run (sin límite)',
                    no: 'Edge Functions o API Routes suficientes',
                  },
                  {
                    q: '3. ¿El código hace consultas directas a PostgreSQL?',
                    si: 'API Routes con pooler en misma región que BD',
                    no: 'Edge Functions son viables (API externa o KV)',
                  },
                  {
                    q: '4. ¿Necesitas integración profunda con ecosistema AWS (S3, SQS, DynamoDB)?',
                    si: 'Lambda — aprovecha la integración nativa y roles IAM',
                    no: 'Vercel API Routes o Supabase EF son más simples',
                  },
                  {
                    q: '5. ¿El equipo tiene menos de 3 personas o es la primera versión del producto?',
                    si: 'Vercel + Supabase Edge Functions — mínima fricción operacional',
                    no: 'Puedes introducir Lambda o Cloud Run para casos específicos',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="border-l-2 border-zinc-700 pl-6"
                  >
                    <p className="text-white font-medium mb-3">{item.q}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400 text-xs font-bold mt-0.5">
                          SÍ →
                        </span>
                        <span className="text-zinc-300 text-sm">{item.si}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-cyan-400 text-xs font-bold mt-0.5">
                          NO →
                        </span>
                        <span className="text-zinc-300 text-sm">{item.no}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 9: Checklist */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">
              Checklist de producción: 12 puntos antes de desplegar
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'Bundle de cada función analizado con source-map-explorer',
                'Lazy initialization de todos los clientes pesados (BD, mailer)',
                'Pooler de conexiones configurado (PgBouncer / Supabase pooler)',
                'Secrets en gestor de secretos, no en variables de entorno del bundle',
                'Timeouts configurados adecuadamente para cada tipo de función',
                'Retry logic con backoff exponencial para operaciones críticas',
                'Health check endpoint separado de la lógica de negocio',
                'Instrumentación de cold starts en Sentry/Datadog/CloudWatch',
                'CORS configurado restrictivamente (no * en producción)',
                'Rate limiting en Edge o API Gateway activado',
                'Alerta configurada si p99 latencia supera umbral (ej. 800ms)',
                'Revisión de costes proyectados antes de launch (calculadora oficial)',
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-zinc-900 border border-zinc-800 rounded-xl p-4"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-zinc-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Conclusión: no hay una arquitectura "ganadora"
              </h2>
              <p className="text-zinc-300 leading-relaxed mb-4">
                La pregunta no es "¿serverless o no serverless?" sino "¿cuál de
                los 4 tipos de serverless encaja con este caso de uso?". En
                proyectos Think Better el 90% de los casos se resuelve con{' '}
                <strong className="text-white">
                  Vercel Edge + Supabase Edge Functions
                </strong>
                : latencia global mínima, zero ops y un coste operacional por
                debajo de 50€/mes para la mayoría de SaaS hasta 50k usuarios.
              </p>
              <p className="text-zinc-300 leading-relaxed">
                Lambda y Cloud Run entran solo cuando hay un requisito concreto
                que justifica la complejidad adicional: procesamiento asíncrono
                pesado, integración con ecosistema AWS existente, o cargas de
                trabajo que necesitan más de 60 segundos de ejecución. El error
                más común es{' '}
                <strong className="text-white">
                  añadir complejidad antes de necesitarla
                </strong>
                .
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="mb-8">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-3">
                ¿Necesitas ayuda para diseñar tu arquitectura serverless?
              </h2>
              <p className="text-zinc-400 mb-6">
                En Think Better diseñamos y construimos la arquitectura correcta
                para tu SaaS desde el principio. Sin over-engineering, sin
                costes innecesarios.
              </p>
              <Link
                to="/cuestionario"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold transition-colors"
              >
                Cuéntanos tu proyecto
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* Back */}
          <div className="pt-8 border-t border-zinc-800">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al blog
            </Link>
          </div>
        </motion.article>
      </main>
    </div>
  );
}
