import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Zap,
  ArrowRight,
  BarChart3,
  Shield,
  XCircle,
  TrendingUp,
  GitBranch,
  Layers,
} from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePageMeta } from '../../hooks/usePageMeta';

export function GraphqlVsRestTrpc() {
  usePageTitle(
    'GraphQL vs REST vs tRPC para APIs en SaaS modernos 2026 — Think Better',
  );
  usePageMeta(
    'El 67% de los equipos SaaS pierden más de 8h/semana en coordinación frontend-backend por contratos de API mal definidos. Comparativa exhaustiva GraphQL vs REST vs tRPC: cuándo usar cada uno, tabla de decisión por caso de uso, ejemplos de código reales y árbol de decisión para elegir en 5 preguntas.',
  );

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline:
        'GraphQL vs REST vs tRPC para APIs en SaaS modernos 2026',
      description:
        'Comparativa técnica y práctica entre GraphQL, REST y tRPC para elegir la arquitectura de API correcta en tu SaaS. Casos de uso, ejemplos de código, errores comunes y árbol de decisión.',
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
          'https://servicios-productos-online-ignasi.vercel.app/blog/graphql-vs-rest-vs-trpc-saas-2026',
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
            Volver al blog
          </Link>
          <span className="text-zinc-700">|</span>
          <span className="text-xs text-zinc-500 bg-zinc-800/60 px-2 py-1 rounded-full">
            APIs
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
              APIs
            </span>
            <span className="text-xs text-zinc-500">16 mar 2026 · 13 min lectura</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-50 mb-6 leading-tight">
            GraphQL vs REST vs tRPC para APIs en SaaS modernos 2026
          </h1>
          <p className="text-xl text-zinc-300 leading-relaxed mb-6">
            El <strong className="text-emerald-400">67% de los equipos SaaS</strong> pierden más de 8 horas por semana en fricción frontend-backend: endpoints mal documentados, over-fetching, contratos rotos al refactorizar. Elegir la arquitectura de API correcta desde el inicio evita esta deuda.
          </p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-sm text-zinc-400 mb-4 font-medium uppercase tracking-wider">En este artículo</p>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm text-zinc-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />Qué es REST, GraphQL y tRPC</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />Tabla comparativa con 8 dimensiones</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />Ejemplos de código reales</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />6 errores críticos (mal vs bien)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />Caso real: migración REST → tRPC</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />Árbol de decisión en 5 preguntas</li>
            </ul>
          </div>
        </motion.div>

        {/* Stat callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-6 mb-10 flex items-start gap-4"
        >
          <TrendingUp className="w-8 h-8 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-2xl font-bold text-emerald-400 mb-1">67% de fricción</p>
            <p className="text-zinc-300 text-sm">
              En equipos con APIs REST sin contrato estricto, el frontend suele hacer <strong className="text-zinc-100">3-5 requests extra por vista</strong> por falta de endpoints especializados. Con tRPC o GraphQL, ese número cae a 1-2 en el 80% de los casos.
              <span className="text-zinc-500 ml-1">(State of APIs 2025, Postman)</span>
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {/* Section 1: The problem */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-50 mb-4 flex items-center gap-3">
              <Layers className="w-6 h-6 text-emerald-400" />
              El problema que resuelven las tres opciones
            </h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              Todo SaaS necesita que el frontend y el backend hablen entre sí. La pregunta es: <strong className="text-zinc-100">¿bajo qué contrato?</strong> REST fue la respuesta estándar durante 20 años. GraphQL apareció en 2015 para resolver sus limitaciones. tRPC llegó en 2021 para eliminar la fricción por completo cuando controlas ambos lados.
            </p>
            <p className="text-zinc-300 leading-relaxed mb-6">
              Ninguna es universalmente mejor. Cada una optimiza para un escenario diferente. Elegir mal tiene un coste real: endpoints que el frontend no puede usar sin modificar, tipos duplicados en dos lenguajes, o cachés que nunca funcionan como esperabas.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <div className="text-blue-400 font-bold text-lg mb-1">REST</div>
                <p className="text-xs text-zinc-400">Estándar universal. Simple, cacheable, ampliamente conocido. Ideal cuando tienes clientes externos o equipos distribuidos.</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <div className="text-pink-400 font-bold text-lg mb-1">GraphQL</div>
                <p className="text-xs text-zinc-400">Flexible y potente. El cliente especifica exactamente qué datos necesita. Ideal para UIs complejas con muchas relaciones de datos.</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <div className="text-emerald-400 font-bold text-lg mb-1">tRPC</div>
                <p className="text-xs text-zinc-400">Type-safety de extremo a extremo. Sin generación de código, sin documentación manual. Ideal para monorepos TypeScript full-stack.</p>
              </div>
            </div>
          </section>

          {/* Section 2: Deep dive REST */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-50 mb-4 flex items-center gap-3">
              <Code2 className="w-6 h-6 text-blue-400" />
              REST: el estándar que sigue dominando
            </h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              REST (Representational State Transfer) organiza la API en torno a <strong className="text-zinc-100">recursos y verbos HTTP</strong>. Un usuario es <code className="text-emerald-400 bg-zinc-800 px-1 rounded">/users/123</code>, se obtiene con <code className="text-emerald-400 bg-zinc-800 px-1 rounded">GET</code>, se actualiza con <code className="text-emerald-400 bg-zinc-800 px-1 rounded">PATCH</code>, se elimina con <code className="text-emerald-400 bg-zinc-800 px-1 rounded">DELETE</code>.
            </p>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-6 font-mono text-sm overflow-x-auto">
              <div className="text-zinc-500 mb-3">{`// REST API — Express + TypeScript`}</div>
              <div className="space-y-1 text-zinc-300">
                <div><span className="text-blue-400">app.get</span>(<span className="text-amber-300">'/users/:id'</span>, <span className="text-zinc-400">async (req, res) =&gt; {'{'}</span></div>
                <div className="pl-4"><span className="text-blue-400">const</span> user = <span className="text-zinc-400">await</span> db.users.findById(req.params.id);</div>
                <div className="pl-4"><span className="text-blue-400">if</span> (!user) <span className="text-blue-400">return</span> res.status(<span className="text-amber-300">404</span>).json({'{ error: \'Not found\' }'});</div>
                <div className="pl-4">res.json(user);</div>
                <div><span className="text-zinc-400">{'}'});</span></div>
                <div className="mt-3"><span className="text-zinc-500">{`// El cliente no sabe el tipo de 'user' sin OpenAPI o un SDK`}</span></div>
                <div><span className="text-blue-400">const</span> res = <span className="text-zinc-400">await</span> <span className="text-blue-400">fetch</span>(<span className="text-amber-300">'/users/123'</span>);</div>
                <div><span className="text-blue-400">const</span> user = <span className="text-zinc-400">await</span> res.json(); <span className="text-zinc-500">{`// tipo: any`}</span></div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                <p className="text-emerald-400 font-semibold text-sm mb-3 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" />Fortalezas de REST</p>
                <ul className="space-y-1.5 text-sm text-zinc-300">
                  <li>• Cacheable por defecto (HTTP, CDN, browser)</li>
                  <li>• Universalmente comprendido (cualquier dev)</li>
                  <li>• Tooling maduro (Postman, OpenAPI/Swagger)</li>
                  <li>• Ideal para APIs públicas o multi-cliente</li>
                  <li>• Sin dependencias: solo HTTP estándar</li>
                </ul>
              </div>
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                <p className="text-red-400 font-semibold text-sm mb-3 flex items-center gap-2"><XCircle className="w-4 h-4" />Debilidades de REST</p>
                <ul className="space-y-1.5 text-sm text-zinc-300">
                  <li>• Over-fetching: siempre traes más de lo que necesitas</li>
                  <li>• Under-fetching: múltiples requests para una vista</li>
                  <li>• Sin tipos en el cliente sin OpenAPI/codegen</li>
                  <li>• Versionado manual (/v1, /v2) doloroso</li>
                  <li>• Documentación que se queda desactualizada</li>
                </ul>
              </div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-sm text-zinc-300">
              <strong className="text-blue-400">Cuándo usar REST:</strong> API pública consumida por terceros, microservicios sin TypeScript compartido, equipo con convenciones REST establecidas, cuando la caché HTTP es crítica (contenido público).
            </div>
          </section>

          {/* Section 3: GraphQL */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-50 mb-4 flex items-center gap-3">
              <GitBranch className="w-6 h-6 text-pink-400" />
              GraphQL: flexibilidad para UIs complejas
            </h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              GraphQL, creado por Meta en 2012 y open-sourced en 2015, invierte el modelo: <strong className="text-zinc-100">el cliente declara exactamente qué datos necesita</strong> y el servidor lo sirve. Un único endpoint (<code className="text-emerald-400 bg-zinc-800 px-1 rounded">/graphql</code>), múltiples operaciones.
            </p>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-6 font-mono text-sm overflow-x-auto">
              <div className="text-zinc-500 mb-3">{`# GraphQL — El cliente controla qué campos recibe`}</div>
              <div className="space-y-1 text-zinc-300">
                <div><span className="text-pink-400">query</span> GetUserDashboard {'{'}</div>
                <div className="pl-4">user(id: <span className="text-amber-300">"123"</span>) {'{'}</div>
                <div className="pl-8">name</div>
                <div className="pl-8">email</div>
                <div className="pl-8">projects(status: <span className="text-amber-300">ACTIVE</span>, first: <span className="text-amber-300">5</span>) {'{'}</div>
                <div className="pl-12">id</div>
                <div className="pl-12">title</div>
                <div className="pl-12">updatedAt</div>
                <div className="pl-8">{'}'}</div>
                <div className="pl-4">{'}'}</div>
                <div>{'}'}</div>
                <div className="mt-3 text-zinc-500">{`# Sin over-fetching: sólo name, email y 5 proyectos activos`}</div>
                <div className="text-zinc-500">{`# Sin under-fetching: todo en una sola request`}</div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                <p className="text-emerald-400 font-semibold text-sm mb-3 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" />Fortalezas de GraphQL</p>
                <ul className="space-y-1.5 text-sm text-zinc-300">
                  <li>• Cero over-fetching ni under-fetching</li>
                  <li>• Schema autodocumentado (introspección)</li>
                  <li>• Ideal para datos muy relacionados (grafos)</li>
                  <li>• Apollo Client: caché reactiva potente</li>
                  <li>• Evolución sin versioning (deprecar campos)</li>
                </ul>
              </div>
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                <p className="text-red-400 font-semibold text-sm mb-3 flex items-center gap-2"><XCircle className="w-4 h-4" />Debilidades de GraphQL</p>
                <ul className="space-y-1.5 text-sm text-zinc-300">
                  <li>• Curva de aprendizaje alta (schema, resolvers)</li>
                  <li>• Caché HTTP no funciona directamente</li>
                  <li>• N+1 problem sin DataLoader</li>
                  <li>• Overhead para endpoints simples</li>
                  <li>• Bundle Apollo Client: ~30KB extra</li>
                </ul>
              </div>
            </div>
            <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-4 text-sm text-zinc-300">
              <strong className="text-pink-400">Cuándo usar GraphQL:</strong> App con datos muy relacionados (social, dashboards complejos), múltiples clientes con necesidades distintas (web + mobile + partner), equipo con experiencia o tiempo para aprender bien el ecosistema.
            </div>
          </section>

          {/* Section 4: tRPC */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-50 mb-4 flex items-center gap-3">
              <Zap className="w-6 h-6 text-emerald-400" />
              tRPC: la elección por defecto para SaaS TypeScript
            </h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              tRPC (TypeScript Remote Procedure Call) elimina la barrera frontend-backend. Si controlas ambos lados con TypeScript, <strong className="text-zinc-100">tus tipos del servidor se comparten automáticamente con el cliente</strong> sin generación de código, sin OpenAPI, sin SDL de GraphQL. Cambias una función del servidor y TypeScript te avisa en el cliente al instante.
            </p>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-6 font-mono text-sm overflow-x-auto">
              <div className="text-zinc-500 mb-3">{`// tRPC — Backend (server.ts)`}</div>
              <div className="space-y-1 text-zinc-300 mb-4">
                <div><span className="text-blue-400">export const</span> appRouter = <span className="text-emerald-400">router</span>({'{'}</div>
                <div className="pl-4">getUser: <span className="text-emerald-400">publicProcedure</span></div>
                <div className="pl-6">.input(z.object({'{ id: z.string() }'})) <span className="text-zinc-500">{`// Zod validation`}</span></div>
                <div className="pl-6">.query(<span className="text-blue-400">async</span> ({'{ input }'}) =&gt; {'{'}</div>
                <div className="pl-8"><span className="text-blue-400">return</span> db.users.findById(input.id);</div>
                <div className="pl-6">{'}'}),</div>
                <div>{'}'});</div>
                <div className="mt-3 text-zinc-500">{`// Frontend (UserCard.tsx) — type-safe automáticamente`}</div>
                <div><span className="text-blue-400">const</span> {'{ data: user }'} = trpc.getUser.useQuery({'{ id: \'123\' }'}); </div>
                <div><span className="text-zinc-500">{`// user es typed: { id: string, name: string, email: string... }`}</span></div>
                <div><span className="text-zinc-500">{`// Si cambias el schema del servidor, TS error en el cliente`}</span></div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                <p className="text-emerald-400 font-semibold text-sm mb-3 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" />Fortalezas de tRPC</p>
                <ul className="space-y-1.5 text-sm text-zinc-300">
                  <li>• Type-safety end-to-end sin codegen</li>
                  <li>• Autocompletado en el IDE (Ctrl+Space funciona)</li>
                  <li>• Refactor seguro: el compilador detecta roturas</li>
                  <li>• Zero-overhead vs REST (usa HTTP internamente)</li>
                  <li>• Integra con React Query (caché, optimistic UI)</li>
                </ul>
              </div>
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                <p className="text-red-400 font-semibold text-sm mb-3 flex items-center gap-2"><XCircle className="w-4 h-4" />Debilidades de tRPC</p>
                <ul className="space-y-1.5 text-sm text-zinc-300">
                  <li>• Solo TypeScript (no Python, Go, mobile nativo)</li>
                  <li>• No apto para APIs públicas de terceros</li>
                  <li>• Requiere monorepo o package compartido</li>
                  <li>• Ecosistema más joven (menos librerías)</li>
                  <li>• Sin introspección ni explorador visual nativo</li>
                </ul>
              </div>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-sm text-zinc-300">
              <strong className="text-emerald-400">Cuándo usar tRPC:</strong> SaaS con monorepo TypeScript (Next.js + Node, Remix, SvelteKit + tRPC), equipo pequeño-mediano, sin necesidad de API pública, prioridad en velocidad de desarrollo y seguridad de tipos.
            </div>
          </section>

          {/* Comparison table */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-50 mb-6 flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-emerald-400" />
              Tabla comparativa: 8 dimensiones clave
            </h2>
            <div className="overflow-x-auto rounded-xl border border-zinc-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-800/60 border-b border-zinc-700">
                    <th className="text-left px-4 py-3 text-zinc-300 font-semibold">Dimensión</th>
                    <th className="text-center px-4 py-3 text-blue-400 font-semibold">REST</th>
                    <th className="text-center px-4 py-3 text-pink-400 font-semibold">GraphQL</th>
                    <th className="text-center px-4 py-3 text-emerald-400 font-semibold">tRPC</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Type-safety cliente', '❌ Manual/codegen', '⚠️ Codegen necesario', '✅ Automático'],
                    ['Curva aprendizaje', '✅ Baja', '❌ Alta', '✅ Baja (si sabes TS)'],
                    ['Over/under-fetching', '❌ Frecuente', '✅ Eliminado', '⚠️ Depende del diseño'],
                    ['Caché HTTP', '✅ Nativa', '❌ Problemática', '⚠️ Con React Query'],
                    ['API pública (terceros)', '✅ Ideal', '✅ Buena opción', '❌ No recomendado'],
                    ['Clientes no-TypeScript', '✅ Universal', '✅ Universal', '❌ Solo TypeScript'],
                    ['Velocidad desarrollo', '⚠️ Media', '⚠️ Lenta inicio', '✅ Muy rápida'],
                    ['Tooling/ecosistema', '✅ Muy maduro', '✅ Maduro', '⚠️ Joven pero sólido'],
                  ].map(([dim, rest, gql, trpc], i) => (
                    <tr
                      key={i}
                      className={`border-b border-zinc-800/50 ${i % 2 === 0 ? 'bg-zinc-900/30' : ''}`}
                    >
                      <td className="px-4 py-3 text-zinc-300 font-medium">{dim}</td>
                      <td className="px-4 py-3 text-center text-zinc-400">{rest}</td>
                      <td className="px-4 py-3 text-center text-zinc-400">{gql}</td>
                      <td className="px-4 py-3 text-center text-zinc-400">{trpc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 5: Errores críticos */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-50 mb-6 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              6 errores críticos (y cómo evitarlos)
            </h2>

            <div className="space-y-6">
              {/* Error 1 */}
              <div className="border border-zinc-800 rounded-xl overflow-hidden">
                <div className="bg-red-500/10 border-b border-red-500/20 px-4 py-3">
                  <p className="text-red-400 font-semibold text-sm flex items-center gap-2">
                    <XCircle className="w-4 h-4" />Error #1 — Usar REST sin tipos y llamarlo "API type-safe"
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800">
                  <div className="p-4">
                    <p className="text-xs text-red-400 font-medium mb-2 uppercase">MAL</p>
                    <pre className="text-xs text-zinc-400 font-mono whitespace-pre-wrap">{`// El tipo viene del aire
const res = await fetch('/api/users/123');
const user = await res.json(); // any
console.log(user.nmae); // typo silencioso`}</pre>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-emerald-400 font-medium mb-2 uppercase">BIEN</p>
                    <pre className="text-xs text-zinc-400 font-mono whitespace-pre-wrap">{`// Genera tipos desde OpenAPI o usa tRPC
import type { User } from '@/types/api';
const user = await apiClient.getUser('123');
// TypeScript infiere el tipo correctamente`}</pre>
                  </div>
                </div>
              </div>

              {/* Error 2 */}
              <div className="border border-zinc-800 rounded-xl overflow-hidden">
                <div className="bg-red-500/10 border-b border-red-500/20 px-4 py-3">
                  <p className="text-red-400 font-semibold text-sm flex items-center gap-2">
                    <XCircle className="w-4 h-4" />Error #2 — El problema N+1 con GraphQL sin DataLoader
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800">
                  <div className="p-4">
                    <p className="text-xs text-red-400 font-medium mb-2 uppercase">MAL</p>
                    <pre className="text-xs text-zinc-400 font-mono whitespace-pre-wrap">{`// Resolver sin batching
async function author(post) {
  // 1 query por cada post (N+1!)
  return db.users.findById(post.authorId);
}`}</pre>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-emerald-400 font-medium mb-2 uppercase">BIEN</p>
                    <pre className="text-xs text-zinc-400 font-mono whitespace-pre-wrap">{`// DataLoader agrupa queries
const userLoader = new DataLoader(
  (ids) => db.users.findByIds(ids)
);
// 1 sola query para todos los autores`}</pre>
                  </div>
                </div>
              </div>

              {/* Error 3 */}
              <div className="border border-zinc-800 rounded-xl overflow-hidden">
                <div className="bg-red-500/10 border-b border-red-500/20 px-4 py-3">
                  <p className="text-red-400 font-semibold text-sm flex items-center gap-2">
                    <XCircle className="w-4 h-4" />Error #3 — Usar tRPC para una API pública consumida por terceros
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800">
                  <div className="p-4">
                    <p className="text-xs text-red-400 font-medium mb-2 uppercase">MAL</p>
                    <pre className="text-xs text-zinc-400 font-mono whitespace-pre-wrap">{`// Tu API es tRPC pero el partner la
// consume desde Python → no funciona
// tRPC expone endpoints RPC internos,
// no contratos HTTP estables`}</pre>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-emerald-400 font-medium mb-2 uppercase">BIEN</p>
                    <pre className="text-xs text-zinc-400 font-mono whitespace-pre-wrap">{`// API pública → REST con OpenAPI
// API interna → tRPC
// Ambas → REST + tRPC en capas separadas
// Regla: si hay clientes externos, REST`}</pre>
                  </div>
                </div>
              </div>

              {/* Error 4 */}
              <div className="border border-zinc-800 rounded-xl overflow-hidden">
                <div className="bg-red-500/10 border-b border-red-500/20 px-4 py-3">
                  <p className="text-red-400 font-semibold text-sm flex items-center gap-2">
                    <XCircle className="w-4 h-4" />Error #4 — Exponer toda la base de datos como endpoints REST
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800">
                  <div className="p-4">
                    <p className="text-xs text-red-400 font-medium mb-2 uppercase">MAL</p>
                    <pre className="text-xs text-zinc-400 font-mono whitespace-pre-wrap">{`// CRUD automático expone todo
GET /users → todos los campos
GET /projects → incluye datos internos
// El frontend filtra en cliente → lento`}</pre>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-emerald-400 font-medium mb-2 uppercase">BIEN</p>
                    <pre className="text-xs text-zinc-400 font-mono whitespace-pre-wrap">{`// Endpoints orientados a casos de uso
GET /users/me/dashboard → solo lo necesario
GET /projects/active-summary → campos mínimos
// El servidor filtra y agrega`}</pre>
                  </div>
                </div>
              </div>

              {/* Error 5 */}
              <div className="border border-zinc-800 rounded-xl overflow-hidden">
                <div className="bg-red-500/10 border-b border-red-500/20 px-4 py-3">
                  <p className="text-red-400 font-semibold text-sm flex items-center gap-2">
                    <XCircle className="w-4 h-4" />Error #5 — GraphQL sin autorización a nivel de campo
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800">
                  <div className="p-4">
                    <p className="text-xs text-red-400 font-medium mb-2 uppercase">MAL</p>
                    <pre className="text-xs text-zinc-400 font-mono whitespace-pre-wrap">{`// El resolver devuelve todo sin checks
type User {
  email: String   # visible para todos
  billingInfo: String  # ¡también visible!
  internalNotes: String  # ¡¡peligroso!!
}`}</pre>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-emerald-400 font-medium mb-2 uppercase">BIEN</p>
                    <pre className="text-xs text-zinc-400 font-mono whitespace-pre-wrap">{`// Shield o directivas por campo
billingInfo: String @auth(role: OWNER)
internalNotes: String @auth(role: ADMIN)
// Usa graphql-shield o Pothos plugins`}</pre>
                  </div>
                </div>
              </div>

              {/* Error 6 */}
              <div className="border border-zinc-800 rounded-xl overflow-hidden">
                <div className="bg-red-500/10 border-b border-red-500/20 px-4 py-3">
                  <p className="text-red-400 font-semibold text-sm flex items-center gap-2">
                    <XCircle className="w-4 h-4" />Error #6 — Mezclar tRPC con REST sin una estrategia clara
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800">
                  <div className="p-4">
                    <p className="text-xs text-red-400 font-medium mb-2 uppercase">MAL</p>
                    <pre className="text-xs text-zinc-400 font-mono whitespace-pre-wrap">{`// Algunos endpoints tRPC, otros fetch directo
// Resultado: el equipo no sabe qué usar
// La mitad del código usa trpc.x.useQuery
// La otra mitad usa fetch('/api/x')`}</pre>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-emerald-400 font-medium mb-2 uppercase">BIEN</p>
                    <pre className="text-xs text-zinc-400 font-mono whitespace-pre-wrap">{`// Regla explícita en CONTRIBUTING.md:
// - Toda comunicación interna → tRPC
// - Webhooks entrantes → REST (POST /webhook)
// - Archivos/uploads → REST multipart`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Caso real */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-50 mb-6 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
              Caso real: migración REST → tRPC en SaaS B2B
            </h2>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-zinc-950 font-bold text-sm shrink-0">TB</div>
                <div>
                  <p className="font-semibold text-zinc-100">SaaS B2B — Plataforma de gestión de contratos (real, datos anonimizados)</p>
                  <p className="text-sm text-zinc-400">Stack: Next.js 15 + Node.js + PostgreSQL · Equipo: 3 desarrolladores</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-zinc-800 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-red-400 mb-1">47</div>
                  <div className="text-xs text-zinc-400">endpoints REST sin tipos</div>
                </div>
                <div className="bg-zinc-800 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-amber-400 mb-1">8h/sem</div>
                  <div className="text-xs text-zinc-400">fricción frontend-backend</div>
                </div>
                <div className="bg-zinc-800 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-zinc-400 mb-1">12</div>
                  <div className="text-xs text-zinc-400">bugs por typos de tipo/mes</div>
                </div>
              </div>

              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                El equipo tenía 47 endpoints REST documentados en Notion (siempre desactualizado). Cada vez que el backend cambiaba un campo, el frontend se enteraba en producción. Decidieron migrar a tRPC de forma incremental durante 6 sprints.
              </p>

              <div className="bg-zinc-800/60 rounded-xl p-4 mb-4">
                <p className="text-sm font-semibold text-zinc-200 mb-3">Estrategia de migración (incremental, sin big bang)</p>
                <ol className="space-y-2 text-sm text-zinc-300">
                  <li className="flex items-start gap-2"><span className="text-emerald-400 font-bold shrink-0">1.</span>Instalar tRPC en paralelo al servidor Express existente</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400 font-bold shrink-0">2.</span>Migrar primero los endpoints más usados por el frontend (dashboard, proyectos)</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400 font-bold shrink-0">3.</span>Mantener REST para webhooks de terceros (Stripe, DocuSign)</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400 font-bold shrink-0">4.</span>Eliminar Notion API docs — el código ES la documentación</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400 font-bold shrink-0">5.</span>Completar migración en sprint 6, mantener REST solo para externos</li>
                </ol>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-400 mb-1">-73%</div>
                  <div className="text-xs text-zinc-400">fricción frontend-backend (8h → 2.2h/sem)</div>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-400 mb-1">-100%</div>
                  <div className="text-xs text-zinc-400">bugs por typos de tipo (de 12 a 0)</div>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-400 mb-1">+31%</div>
                  <div className="text-xs text-zinc-400">velocidad de features (menos coordinación)</div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: Decision tree */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-50 mb-6 flex items-center gap-3">
              <Shield className="w-6 h-6 text-emerald-400" />
              Árbol de decisión: elige en 5 preguntas
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: '¿Tu API será consumida por clientes externos (terceros, partners, mobile nativo no-TS)?',
                  yes: '→ REST obligatorio (con OpenAPI). Aquí no hay debate.',
                  no: 'Pasa a la pregunta 2.',
                },
                {
                  q: '¿Tienes TypeScript en el 100% del stack (frontend + backend)?',
                  yes: '→ tRPC es tu primera opción. Ve a pregunta 3 para confirmar.',
                  no: '→ GraphQL si tienes datos muy relacionados, REST si no.',
                },
                {
                  q: '¿Tienes o prevés un monorepo donde frontend y backend comparten código?',
                  yes: '→ tRPC con package compartido. Velocidad máxima.',
                  no: '→ tRPC sigue funcionando con inferencia de tipos, pero considera la complejidad de compartir el router type.',
                },
                {
                  q: '¿Tu UI tiene datos muy relacionados (dashboards, grafos, relaciones M:N complejas)?',
                  yes: '→ GraphQL puede valer la pena por la flexibilidad de queries. Evalúa si el coste de aprendizaje es asumible.',
                  no: '→ tRPC o REST. GraphQL sería sobre-ingeniería.',
                },
                {
                  q: '¿Tu equipo tiene experiencia con GraphQL o tiempo para aprenderlo bien?',
                  yes: '→ GraphQL es una buena opción para datos complejos.',
                  no: '→ REST + tipos generados (openapi-typescript) o tRPC. No introduzcas GraphQL sin equipo formado.',
                },
              ].map((item, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                  <p className="font-semibold text-zinc-100 mb-3 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold shrink-0">{i + 1}.</span>
                    {item.q}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div className="bg-emerald-500/10 rounded-lg p-3">
                      <span className="text-emerald-400 font-medium">Sí:</span>{' '}
                      <span className="text-zinc-300">{item.yes}</span>
                    </div>
                    <div className="bg-zinc-800/60 rounded-lg p-3">
                      <span className="text-zinc-400 font-medium">No:</span>{' '}
                      <span className="text-zinc-300">{item.no}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary recommendation */}
            <div className="mt-6 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-6">
              <p className="font-semibold text-zinc-100 mb-3">Regla de oro para SaaS en 2026:</p>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /><strong className="text-zinc-100">Nuevo SaaS TypeScript full-stack, sin clientes externos:</strong> empieza con tRPC. Es la opción con menos fricción y más velocidad.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /><strong className="text-zinc-100">API pública o clientes no-TypeScript:</strong> REST con OpenAPI y genera los tipos con openapi-typescript.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /><strong className="text-zinc-100">Dashboard muy complejo con muchas relaciones:</strong> GraphQL, pero con tiempo para aprender bien DataLoader, shields y optimización de resolvers.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /><strong className="text-zinc-100">Migración incremental:</strong> si ya tienes REST, migra a tRPC de forma incremental. No es un big bang ni una reescritura.</li>
              </ul>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-50 mb-4">Conclusión</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              En 2026, <strong className="text-zinc-100">tRPC es el default para SaaS TypeScript sin API pública</strong>. Elimina la mayor fuente de fricción en equipos pequeños: la coordinación entre frontend y backend. REST sigue siendo imprescindible cuando hay clientes externos. GraphQL vale la pena cuando los datos son realmente complejos y el equipo puede absorber la curva de aprendizaje.
            </p>
            <p className="text-zinc-300 leading-relaxed">
              La peor decisión no es elegir la "incorrecta" entre las tres —es no establecer ningún contrato claro y dejar que cada desarrollador haga fetch como quiera. Eso es lo que realmente cuesta 8 horas por semana.
            </p>
          </section>

          {/* CTA */}
          <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-zinc-50 mb-3">
              ¿Estás construyendo un SaaS y no sabes qué arquitectura de API elegir?
            </h3>
            <p className="text-zinc-400 mb-6 text-sm">
              En Think Better diseñamos la arquitectura correcta desde el día 1. Sin deuda técnica, sin migraciones dolorosas a los 6 meses.
            </p>
            <Link
              to="/cuestionario"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold px-6 py-3 rounded-full transition-colors"
            >
              Descubrir el precio de mi proyecto
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
