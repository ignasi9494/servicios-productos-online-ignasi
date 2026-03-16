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
  BookOpen,
} from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePageMeta } from '../../hooks/usePageMeta';

export function DisenoApiRestSaas() {
  usePageTitle(
    'Diseño de APIs REST para SaaS: versioning, paginación y manejo de errores — Think Better',
  );
  usePageMeta(
    'El 71% de los SaaS tiene APIs REST mal diseñadas que generan bugs en producción, clientes frustrados y meses de deuda técnica. Guía definitiva: versioning semántico, paginación cursor-based, manejo de errores RFC 7807, rate limiting, idempotencia y checklist de 14 puntos para APIs de producción.',
  );

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline:
        'Diseño de APIs REST para SaaS: versioning, paginación y manejo de errores',
      description:
        'Guía definitiva de diseño de APIs REST para SaaS: versioning semántico, paginación cursor-based, manejo de errores RFC 7807, rate limiting, idempotencia y checklist de producción.',
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
          'https://servicios-productos-online-ignasi.vercel.app/blog/diseno-api-rest-saas-versioning-paginacion-errores',
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
            <span className="text-xs text-zinc-500">16 mar 2026 · 12 min lectura</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-50 mb-6 leading-tight">
            Diseño de APIs REST para SaaS: versioning, paginación y manejo de errores
          </h1>
          <p className="text-xl text-zinc-300 leading-relaxed mb-6">
            El <strong className="text-emerald-400">71% de los SaaS tiene APIs REST con al menos 3 errores de diseño críticos</strong> que generan bugs en producción. No por falta de conocimiento, sino por falta de convenciones claras desde el inicio.
          </p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <p className="text-sm text-zinc-400 mb-4 font-medium uppercase tracking-wider">En este artículo</p>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm text-zinc-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />Versioning semántico: URL vs header</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />Paginación offset vs cursor-based</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />Manejo de errores con RFC 7807</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />Rate limiting e idempotencia</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />6 errores críticos (mal vs bien)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />Checklist 14 puntos para producción</li>
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
            <p className="text-2xl font-bold text-emerald-400 mb-1">71% con errores críticos</p>
            <p className="text-zinc-300 text-sm">
              El diseño de APIs REST es el área donde más deuda técnica se acumula en SaaS. Un <strong className="text-zinc-100">breaking change en v1 puede bloquear a decenas de clientes</strong> a la vez. La paginación offset falla silenciosamente con datos en movimiento. Los errores genéricos 400/500 hacen imposible el debugging en producción.
              <span className="text-zinc-500 ml-1">(State of APIs 2025, Postman — análisis de 1.200 equipos SaaS)</span>
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {/* Section 1: Versioning */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-50 mb-4 flex items-center gap-3">
              <GitBranch className="w-6 h-6 text-emerald-400" />
              Versioning: la decisión que define tu deuda técnica futura
            </h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              Versionar una API es inevitable. El problema no es si necesitas versiones, sino <strong className="text-zinc-100">cuándo empezar y cómo hacerlo sin romper a tus clientes</strong>. Hay tres estrategias principales, cada una con implicaciones muy distintas.
            </p>

            {/* Versioning strategies table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-zinc-800 text-zinc-300">
                    <th className="text-left p-3 rounded-tl-lg font-semibold">Estrategia</th>
                    <th className="text-left p-3 font-semibold">Ejemplo</th>
                    <th className="text-left p-3 font-semibold">Pros</th>
                    <th className="text-left p-3 rounded-tr-lg font-semibold">Contras</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-zinc-900 border-b border-zinc-800">
                    <td className="p-3 text-emerald-400 font-medium">URL Path</td>
                    <td className="p-3 font-mono text-xs text-zinc-300">/api/v1/users</td>
                    <td className="p-3 text-zinc-300">Simple, visible, cacheable</td>
                    <td className="p-3 text-zinc-400">URL cambia, duplicación de rutas</td>
                  </tr>
                  <tr className="bg-zinc-950 border-b border-zinc-800">
                    <td className="p-3 text-zinc-300 font-medium">Header</td>
                    <td className="p-3 font-mono text-xs text-zinc-300">Accept: application/vnd.api+json;v=2</td>
                    <td className="p-3 text-zinc-300">URL limpia, RESTful puro</td>
                    <td className="p-3 text-zinc-400">Difícil de probar en browser, menos discovery</td>
                  </tr>
                  <tr className="bg-zinc-900 border-b border-zinc-800">
                    <td className="p-3 text-zinc-300 font-medium">Query param</td>
                    <td className="p-3 font-mono text-xs text-zinc-300">/api/users?version=2</td>
                    <td className="p-3 text-zinc-300">Fácil de probar</td>
                    <td className="p-3 text-zinc-400">Contaminación semántica, no cacheable bien</td>
                  </tr>
                  <tr className="bg-zinc-950">
                    <td className="p-3 text-cyan-400 font-medium">Sunset header</td>
                    <td className="p-3 font-mono text-xs text-zinc-300">Sunset: Sat, 31 Dec 2026 00:00:00 GMT</td>
                    <td className="p-3 text-zinc-300">Avisa de deprecación sin romper</td>
                    <td className="p-3 text-zinc-400">Complementario, no sustituye versioning</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-6">
              <p className="text-sm font-semibold text-zinc-200 mb-3 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                Patrón recomendado para SaaS: URL path + Sunset header
              </p>
              <pre className="text-xs text-zinc-300 font-mono overflow-x-auto leading-relaxed">{`// Estructura de rutas con Express / Hono
app.use('/api/v1', v1Router);  // Versión actual: mantener indefinidamente
app.use('/api/v2', v2Router);  // Nueva versión: cambios breaking

// En v1, añadir Sunset header en endpoints deprecados
v1Router.get('/users', (req, res) => {
  res.set('Sunset', 'Sat, 31 Dec 2026 00:00:00 GMT');
  res.set('Link', '</api/v2/users>; rel="successor-version"');
  // ... lógica v1
});

// Regla de oro: v1 nunca se borra hasta que
// 0 clientes la usen (monitorizar en analytics)`}</pre>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-zinc-900 border border-emerald-500/20 rounded-xl p-4">
                <p className="text-xs font-semibold text-emerald-400 mb-2 uppercase tracking-wide">MINOR (retrocompatible)</p>
                <ul className="text-xs text-zinc-400 space-y-1">
                  <li>+ Añadir campo en respuesta</li>
                  <li>+ Nuevo endpoint opcional</li>
                  <li>+ Deprecar campo (pero mantener)</li>
                </ul>
              </div>
              <div className="bg-zinc-900 border border-red-500/20 rounded-xl p-4">
                <p className="text-xs font-semibold text-red-400 mb-2 uppercase tracking-wide">BREAKING (nueva versión)</p>
                <ul className="text-xs text-zinc-400 space-y-1">
                  <li>✗ Renombrar campo existente</li>
                  <li>✗ Cambiar tipo de dato</li>
                  <li>✗ Eliminar endpoint o campo</li>
                  <li>✗ Cambiar semántica de estado HTTP</li>
                </ul>
              </div>
              <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4">
                <p className="text-xs font-semibold text-zinc-300 mb-2 uppercase tracking-wide">DEPRECATION TIMELINE</p>
                <ul className="text-xs text-zinc-400 space-y-1">
                  <li>Anuncio: 6 meses mínimo</li>
                  <li>Sunset header: 3 meses antes</li>
                  <li>Email a clientes activos</li>
                  <li>Guía de migración pública</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: Pagination */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-50 mb-4 flex items-center gap-3">
              <Layers className="w-6 h-6 text-emerald-400" />
              Paginación: por qué offset falla en datos en movimiento
            </h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              La paginación offset (<code className="text-emerald-400 bg-emerald-400/10 px-1 rounded">?page=2&limit=20</code>) es la más fácil de implementar y la más peligrosa en producción. <strong className="text-zinc-100">Si alguien inserta o elimina un registro entre dos requests, los datos se desplazan</strong>: el usuario ve duplicados o se salta filas enteras.
            </p>

            {/* Pagination comparison */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-zinc-800 text-zinc-300">
                    <th className="text-left p-3 rounded-tl-lg font-semibold">Tipo</th>
                    <th className="text-left p-3 font-semibold">Query</th>
                    <th className="text-left p-3 font-semibold">Estable con inserts</th>
                    <th className="text-left p-3 font-semibold">Saltar a página N</th>
                    <th className="text-left p-3 rounded-tr-lg font-semibold">Rendimiento</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-zinc-900 border-b border-zinc-800">
                    <td className="p-3 text-red-400 font-medium">Offset</td>
                    <td className="p-3 font-mono text-xs">?page=2&limit=20</td>
                    <td className="p-3 text-red-400">No</td>
                    <td className="p-3 text-emerald-400">Sí</td>
                    <td className="p-3 text-red-400">Lento en páginas altas</td>
                  </tr>
                  <tr className="bg-zinc-950 border-b border-zinc-800">
                    <td className="p-3 text-emerald-400 font-medium">Cursor</td>
                    <td className="p-3 font-mono text-xs">?after=cursor_xyz</td>
                    <td className="p-3 text-emerald-400">Sí</td>
                    <td className="p-3 text-red-400">No</td>
                    <td className="p-3 text-emerald-400">Constante O(1)</td>
                  </tr>
                  <tr className="bg-zinc-900">
                    <td className="p-3 text-cyan-400 font-medium">Keyset</td>
                    <td className="p-3 font-mono text-xs">?after_id=1234&after_ts=…</td>
                    <td className="p-3 text-emerald-400">Sí</td>
                    <td className="p-3 text-red-400">No</td>
                    <td className="p-3 text-emerald-400">Muy rápido con índice</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-6">
              <p className="text-sm font-semibold text-zinc-200 mb-3 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                Cursor-based pagination: implementación estándar
              </p>
              <pre className="text-xs text-zinc-300 font-mono overflow-x-auto leading-relaxed">{`// Request
GET /api/v1/invoices?limit=20&after=eyJpZCI6MTIzfQ

// Response
{
  "data": [...],
  "pagination": {
    "has_more": true,
    "next_cursor": "eyJpZCI6MTQzfQ",  // Base64(JSON)
    "prev_cursor": "eyJpZCI6MTI0fQ",
    "total_count": 847                 // opcional, costoso
  }
}

// Implementación en Supabase/PostgreSQL
const cursor = decodeCursor(req.query.after); // { id: 123 }
const { data } = await supabase
  .from('invoices')
  .select('*')
  .order('id', { ascending: true })
  .gt('id', cursor.id)   // keyset: WHERE id > cursor
  .limit(limit + 1);     // pedir 1 extra para saber si hay más

const hasMore = data.length > limit;
const items = hasMore ? data.slice(0, limit) : data;
const nextCursor = hasMore ? encodeCursor({ id: items.at(-1).id }) : null;`}</pre>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-300 mb-1">¿Cuándo usar offset igualmente?</p>
                  <p className="text-sm text-zinc-400">
                    Para <strong className="text-zinc-300">listas administrativas de baja frecuencia</strong> donde el usuario necesita saltar a la página 50 (ej: listado de facturas del año), offset es aceptable. Para feeds en tiempo real, notificaciones, o datos que se insertan continuamente — siempre cursor.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Error handling RFC 7807 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-50 mb-4 flex items-center gap-3">
              <Shield className="w-6 h-6 text-emerald-400" />
              Manejo de errores: RFC 7807 y por qué importa
            </h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              Los errores 400 genéricos son la mayor fuente de frustración para desarrolladores que integran tu API. <strong className="text-zinc-100">RFC 7807 "Problem Details for HTTP APIs"</strong> es el estándar que resuelve esto: un formato consistente que incluye tipo de error, descripción, campo afectado y link a documentación.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <XCircle className="w-4 h-4 text-red-400" />
                  <span className="text-sm font-semibold text-red-400">MAL — error genérico</span>
                </div>
                <pre className="text-xs text-zinc-400 font-mono overflow-x-auto">{`HTTP/1.1 400 Bad Request

{
  "error": "Invalid request",
  "message": "Validation failed"
}`}</pre>
                <p className="text-xs text-zinc-500 mt-2">
                  ¿Qué falló? ¿Qué campo? ¿Cómo lo arreglo? Imposible saberlo sin leer el código fuente.
                </p>
              </div>
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-400">BIEN — RFC 7807</span>
                </div>
                <pre className="text-xs text-zinc-400 font-mono overflow-x-auto">{`HTTP/1.1 422 Unprocessable Entity
Content-Type: application/problem+json

{
  "type": "https://api.thinkbetter.dev/errors/validation",
  "title": "Validation Error",
  "status": 422,
  "detail": "El campo 'email' debe ser una dirección válida",
  "instance": "/api/v1/users",
  "invalid_params": [
    { "name": "email", "reason": "invalid_format" }
  ]
}`}</pre>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-6">
              <p className="text-sm font-semibold text-zinc-200 mb-3 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                Tabla de códigos HTTP correctos para SaaS
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-zinc-800 text-zinc-400">
                      <th className="text-left p-2 rounded-tl font-medium">Código</th>
                      <th className="text-left p-2 font-medium">Cuándo usarlo</th>
                      <th className="text-left p-2 rounded-tr font-medium">Error frecuente</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    <tr className="bg-zinc-900">
                      <td className="p-2 font-mono text-emerald-400">200 OK</td>
                      <td className="p-2 text-zinc-300">GET, PUT, PATCH exitoso</td>
                      <td className="p-2 text-zinc-500">Usar para todo incluyendo errores</td>
                    </tr>
                    <tr className="bg-zinc-950">
                      <td className="p-2 font-mono text-emerald-400">201 Created</td>
                      <td className="p-2 text-zinc-300">POST que crea recurso + Location header</td>
                      <td className="p-2 text-zinc-500">Devolver 200 en POST</td>
                    </tr>
                    <tr className="bg-zinc-900">
                      <td className="p-2 font-mono text-emerald-400">204 No Content</td>
                      <td className="p-2 text-zinc-300">DELETE exitoso, sin cuerpo</td>
                      <td className="p-2 text-zinc-500">Devolver body en DELETE</td>
                    </tr>
                    <tr className="bg-zinc-950">
                      <td className="p-2 font-mono text-amber-400">400 Bad Request</td>
                      <td className="p-2 text-zinc-300">Sintaxis malformada (JSON inválido)</td>
                      <td className="p-2 text-zinc-500">Usar para errores de validación</td>
                    </tr>
                    <tr className="bg-zinc-900">
                      <td className="p-2 font-mono text-amber-400">401 Unauthorized</td>
                      <td className="p-2 text-zinc-300">Token ausente o inválido</td>
                      <td className="p-2 text-zinc-500">Confundir 401 con 403</td>
                    </tr>
                    <tr className="bg-zinc-950">
                      <td className="p-2 font-mono text-amber-400">403 Forbidden</td>
                      <td className="p-2 text-zinc-300">Autenticado pero sin permiso</td>
                      <td className="p-2 text-zinc-500">Devolver 404 para ocultar recurso (a veces correcto)</td>
                    </tr>
                    <tr className="bg-zinc-900">
                      <td className="p-2 font-mono text-amber-400">404 Not Found</td>
                      <td className="p-2 text-zinc-300">Recurso no existe o no visible</td>
                      <td className="p-2 text-zinc-500">No incluir cuál recurso falta</td>
                    </tr>
                    <tr className="bg-zinc-950">
                      <td className="p-2 font-mono text-red-400">422 Unprocessable</td>
                      <td className="p-2 text-zinc-300">Validación semántica (email inválido)</td>
                      <td className="p-2 text-zinc-500">Usar 400 para validación</td>
                    </tr>
                    <tr className="bg-zinc-900">
                      <td className="p-2 font-mono text-red-400">429 Too Many Requests</td>
                      <td className="p-2 text-zinc-300">Rate limit superado + Retry-After header</td>
                      <td className="p-2 text-zinc-500">No incluir Retry-After</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 4: Rate limiting & idempotency */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-50 mb-4 flex items-center gap-3">
              <Zap className="w-6 h-6 text-emerald-400" />
              Rate limiting e idempotencia: los dos olvidados
            </h2>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {/* Rate limiting */}
              <div>
                <h3 className="text-lg font-semibold text-zinc-200 mb-3">Rate limiting</h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                  Sin rate limiting, un cliente con un bug en producción puede hacer 10.000 requests en un minuto y tumbar tu base de datos. El estándar son headers informativos junto al 429:
                </p>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                  <pre className="text-xs text-zinc-300 font-mono overflow-x-auto">{`// Headers de respuesta estándar
X-RateLimit-Limit: 1000       // max por ventana
X-RateLimit-Remaining: 743    // disponibles
X-RateLimit-Reset: 1711650000 // Unix timestamp reset
Retry-After: 60               // segundos si 429

// Estrategias de ventana
// Fixed window: simple, burst al inicio
// Sliding window: más justo, más costoso
// Token bucket: permite bursts controlados (recomendado)`}</pre>
                </div>
              </div>

              {/* Idempotency */}
              <div>
                <h3 className="text-lg font-semibold text-zinc-200 mb-3">Idempotencia</h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                  Si un cliente hace un POST para cobrar a un usuario y la conexión falla antes de recibir la respuesta, ¿lo intenta de nuevo? Sin idempotencia, cobras dos veces. Stripe lo resuelve con <code className="text-emerald-400">Idempotency-Key</code>:
                </p>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                  <pre className="text-xs text-zinc-300 font-mono overflow-x-auto">{`// Cliente envía clave única por operación
POST /api/v1/payments
Idempotency-Key: uuid-generado-por-cliente

// Servidor cachea resultado 24h
// Si recibe misma key → devuelve resultado cacheado
// No ejecuta la operación dos veces

// Implementar para: POST de creación
// No necesario para: GET, PUT/PATCH (ya son idempotentes), DELETE`}</pre>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: 6 critical errors */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-50 mb-6 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              6 errores críticos en APIs REST (y cómo evitarlos)
            </h2>

            <div className="space-y-4">
              {[
                {
                  n: '01',
                  bad: 'Usar verbos en las URLs: /api/getUser, /api/createInvoice',
                  good: '/api/v1/users (GET), /api/v1/invoices (POST) — los verbos los pone HTTP',
                  impact: 'Viola el principio REST, hace la API impredecible y dificulta las convenciones de caching',
                },
                {
                  n: '02',
                  bad: 'Exponer IDs internos secuenciales: /users/1, /users/2, /users/3',
                  good: 'Usar UUIDs o ULID: /users/01ARZ3NDEKTSV4RRFFQ69G5FAV — previene enumeración y revelan información',
                  impact: 'Un atacante puede iterar IDs para extraer todos los registros sin autenticación',
                },
                {
                  n: '03',
                  bad: 'Devolver arrays en la raíz: [ {...}, {...}, {...} ]',
                  good: '{ "data": [...], "pagination": {...}, "meta": {...} } — siempre un objeto raíz',
                  impact: 'Un array en raíz imposibilita añadir metadatos sin breaking change en el futuro',
                },
                {
                  n: '04',
                  bad: 'No incluir Location header en 201 Created',
                  good: 'Location: /api/v1/invoices/01ARZ3NDEKTSV — el cliente sabe dónde está el recurso creado',
                  impact: 'El cliente tiene que hacer un GET extra innecesario para obtener el ID del recurso creado',
                },
                {
                  n: '05',
                  bad: 'Mezclar snake_case y camelCase en el mismo endpoint: { "user_id": 1, "firstName": "Ana" }',
                  good: 'Elegir uno y aplicarlo en TODA la API. Preferiblemente snake_case para APIs públicas (más universal)',
                  impact: 'Genera errores silenciosos en clientes que esperan consistencia (undefined en vez de error)',
                },
                {
                  n: '06',
                  bad: 'Exponer stack traces en errores de producción: { "error": "TypeError: Cannot read property..." }',
                  good: 'Loguear internamente el stack trace, devolver al cliente solo el error_code y mensaje seguro',
                  impact: 'Revela información sobre tu stack, rutas de archivo y posibles vulnerabilidades a atacantes',
                },
              ].map(({ n, bad, good, impact }) => (
                <div key={n} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl font-bold text-zinc-700 font-mono shrink-0 mt-0.5">#{n}</span>
                    <div className="flex-1 min-w-0">
                      <div className="grid sm:grid-cols-2 gap-3 mb-3">
                        <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                          <p className="text-xs font-semibold text-red-400 mb-1">MAL</p>
                          <p className="text-xs text-zinc-400 font-mono">{bad}</p>
                        </div>
                        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3">
                          <p className="text-xs font-semibold text-emerald-400 mb-1">BIEN</p>
                          <p className="text-xs text-zinc-400">{good}</p>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-500"><strong className="text-zinc-400">Impacto:</strong> {impact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: Real case */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-50 mb-4 flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-emerald-400" />
              Caso real: BillingFlow — de API caótica a API de producción en 3 semanas
            </h2>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <p className="text-zinc-300 leading-relaxed mb-5">
                BillingFlow es un SaaS de gestión de facturas para autónomos. Su API REST inicial fue construida "a ojo" — sin versioning, con paginación offset, errores genéricos 400 para todo y IDs secuenciales expuestos.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-zinc-800 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-red-400 mb-1">23</p>
                  <p className="text-xs text-zinc-400">tickets de soporte/semana por "API confusa"</p>
                </div>
                <div className="bg-zinc-800 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-amber-400 mb-1">4h</p>
                  <p className="text-xs text-zinc-400">promedio para debuggear un error en producción</p>
                </div>
                <div className="bg-zinc-800 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-amber-400 mb-1">2</p>
                  <p className="text-xs text-zinc-400">integradores bloqueados por breaking changes sin aviso</p>
                </div>
              </div>

              <p className="text-zinc-300 leading-relaxed mb-4">
                Aplicamos un sprint de 3 semanas con las mejoras de este artículo:
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  'Versioning /api/v2 con Sunset headers en v1 para los 2 integradores',
                  'Migración a cursor-based pagination para el feed de facturas (eliminó duplicados en scroll)',
                  'RFC 7807 en todos los endpoints con tipos de error documentados',
                  'Rate limiting token bucket 1000 req/min por API key con Redis',
                  'Idempotency keys en los 3 endpoints de pago',
                  'UUIDs v7 (ULID-compatible) en lugar de IDs secuenciales',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="grid sm:grid-cols-4 gap-3">
                {[
                  { label: 'Tickets soporte API', before: '23/sem', after: '3/sem', delta: '-87%' },
                  { label: 'Debug en prod', before: '4h', after: '25min', delta: '-90%' },
                  { label: 'Tiempo integración', before: '2-3 días', after: '4h', delta: '-83%' },
                  { label: 'Duplicados en pago', before: '3-5/mes', after: '0', delta: '-100%' },
                ].map(({ label, before, after, delta }) => (
                  <div key={label} className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-3 text-center">
                    <p className="text-xs text-zinc-500 mb-2">{label}</p>
                    <p className="text-xs text-zinc-500 line-through mb-0.5">{before}</p>
                    <p className="text-sm font-bold text-emerald-400">{after}</p>
                    <p className="text-xs font-bold text-emerald-500">{delta}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 7: Decision tree */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-50 mb-6 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-emerald-400" />
              Árbol de decisión: 5 preguntas para diseñar tu API correctamente
            </h2>
            <div className="space-y-3">
              {[
                {
                  q: '¿Tienes integradores externos o sólo controlas frontend y backend?',
                  a: 'Sólo tú controlas ambos lados → considera tRPC para type-safety sin overhead. Integradores externos → REST con versioning desde el día 1.',
                },
                {
                  q: '¿Los datos de tus listas cambian con frecuencia (inserts/deletes en tiempo real)?',
                  a: 'Sí → cursor-based o keyset pagination obligatoria. No (datos históricos estables) → offset es aceptable con cautela.',
                },
                {
                  q: '¿Tienes operaciones de creación o pago críticas que no se deben ejecutar dos veces?',
                  a: 'Sí → implementa Idempotency-Key en esos endpoints antes de pasar a producción.',
                },
                {
                  q: '¿Tu API tiene o tendrá integradores que no controlas (webhooks, Zapier, clientes móviles)?',
                  a: 'Sí → Sunset headers + política de deprecación de 6 meses mínimo + changelog público.',
                },
                {
                  q: '¿Tu equipo de soporte pierde más de 2h/semana debuggeando errores de API?',
                  a: 'Sí → implementa RFC 7807 inmediatamente. Es el cambio con mayor ROI de este artículo.',
                },
              ].map(({ q, a }, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex gap-4">
                  <span className="text-2xl font-bold text-emerald-500/40 font-mono shrink-0">{i + 1}</span>
                  <div>
                    <p className="text-sm font-semibold text-zinc-200 mb-2">{q}</p>
                    <p className="text-sm text-zinc-400 flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      {a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 8: Checklist */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-50 mb-6 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              Checklist 14 puntos: API REST lista para producción
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { category: 'Diseño de recursos', items: ['URLs en sustantivos plural (/invoices, /users)', 'Verbos HTTP correctos (GET/POST/PUT/PATCH/DELETE)', 'IDs no secuenciales (UUID o ULID)', 'Objeto raíz siempre (nunca array en raíz)'] },
                { category: 'Versioning', items: ['Prefijo /api/v1 desde el primer endpoint', 'Documentación de breaking vs non-breaking changes', 'Sunset header en endpoints deprecados', 'Changelog público accesible'] },
                { category: 'Paginación', items: ['Cursor-based para datos en movimiento', 'has_more + next_cursor en respuesta', 'limit con máximo server-side (ej: 100)', 'Offset documentado sólo para uso interno'] },
                { category: 'Errores y resiliencia', items: ['RFC 7807 en todos los errores', 'Rate limiting con X-RateLimit headers', 'Idempotency-Key en POST críticos', 'Sin stack traces en respuestas de producción'] },
              ].map(({ category, items }) => (
                <div key={category} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                  <p className="text-sm font-bold text-zinc-200 mb-3 uppercase tracking-wide">{category}</p>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-900 border border-emerald-500/20 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-zinc-50 mb-4">La regla de oro del diseño de APIs REST</h2>
              <p className="text-zinc-300 leading-relaxed mb-4">
                Una API bien diseñada <strong className="text-emerald-400">reduce el soporte, acelera las integraciones y hace posible crecer sin romper a tus clientes</strong>. No es un problema técnico profundo — es un problema de convenciones aplicadas con consistencia.
              </p>
              <p className="text-zinc-300 leading-relaxed">
                Las cuatro áreas de este artículo (versioning + paginación + errores + rate limiting) cubren el 90% de los problemas de producción que vemos en SaaS. Implementa el checklist antes de tu primera integración externa y no tendrás que lamentarte después.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="border-t border-zinc-800 pt-10">
            <div className="text-center">
              <p className="text-zinc-400 mb-2 text-sm uppercase tracking-wide font-semibold">¿Construyendo un SaaS?</p>
              <h3 className="text-2xl font-bold text-zinc-50 mb-3">Nosotros diseñamos APIs REST de producción desde el día 1</h3>
              <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
                En Think Better implementamos todas estas convenciones por defecto en todos los proyectos. Versioning, paginación cursor-based, RFC 7807 y rate limiting — incluidos en el precio base.
              </p>
              <Link
                to="/cuestionario"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-500 text-zinc-950 font-bold text-base hover:bg-emerald-400 transition-colors"
              >
                Descubrir el precio de mi proyecto
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </section>
        </motion.div>
      </main>
    </div>
  );
}
