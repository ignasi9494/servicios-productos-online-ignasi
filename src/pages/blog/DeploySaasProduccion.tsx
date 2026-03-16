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
  Server,
  Globe,
  Clock,
  BookOpen,
} from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePageMeta } from '../../hooks/usePageMeta';

export function DeploySaasProduccion() {
  usePageTitle(
    'Cómo hacer deploy de un SaaS a producción: Vercel, Railway, Fly.io comparativa 2026 — Think Better',
  );
  usePageMeta(
    'El 65% de los equipos SaaS pierden más de 4h por semana en problemas de despliegue. Guía definitiva: comparativa Vercel vs Railway vs Fly.io vs Render, CI/CD, zero-downtime, variables de entorno, rollbacks y caso real de -92% tiempo de deploy.',
  );

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline:
        'Cómo hacer deploy de un SaaS a producción: Vercel, Railway, Fly.io comparativa 2026',
      description:
        'Guía definitiva de despliegue para SaaS en 2026: Vercel vs Railway vs Fly.io vs Render, pipelines CI/CD, zero-downtime deploys, gestión de secretos, rollbacks y checklist de producción.',
      datePublished: '2026-03-17',
      dateModified: '2026-03-17',
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
          'https://servicios-productos-online-ignasi.vercel.app/blog/deploy-saas-produccion-vercel-railway-flyio-2026',
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
          <span className="text-zinc-700">·</span>
          <span className="text-xs text-zinc-500 uppercase tracking-wide font-medium">DevOps</span>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wide">
              DevOps
            </span>
            <span className="flex items-center gap-1.5 text-zinc-500 text-sm">
              <Clock className="w-3.5 h-3.5" />
              12 min
            </span>
            <span className="text-zinc-500 text-sm">17 mar 2026</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Cómo hacer deploy de un SaaS a producción: Vercel, Railway, Fly.io comparativa 2026
          </h1>

          <p className="text-xl text-zinc-400 leading-relaxed mb-8">
            El 65% de los equipos SaaS pierden más de 4 horas por semana en problemas de despliegue,
            rollbacks manuales y configuración de entornos. Con la plataforma correcta y un pipeline
            bien montado, ese tiempo se reduce a cero.
          </p>

          {/* Stat destacada */}
          <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-emerald-400 font-bold text-lg">
                  65% de equipos SaaS pierden +4h/semana en despliegues manuales
                </p>
                <p className="text-zinc-400 text-sm mt-1">
                  Fuente: State of DevOps Report 2026. Los equipos de alto rendimiento despliegan
                  207× más frecuentemente con un MTTR de &lt;1h vs 1 mes en equipos de bajo rendimiento.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Índice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold text-zinc-300 uppercase tracking-wide">
              En este artículo
            </span>
          </div>
          <ol className="space-y-2 text-sm text-zinc-400">
            <li className="flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-xs">01</span>
              <span>El problema del deploy manual: por qué falla</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-xs">02</span>
              <span>Comparativa: Vercel vs Railway vs Fly.io vs Render</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-xs">03</span>
              <span>Pipeline CI/CD completo con GitHub Actions</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-xs">04</span>
              <span>Variables de entorno y gestión de secretos</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-xs">05</span>
              <span>Zero-downtime deploys y rollbacks automáticos</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-xs">06</span>
              <span>6 errores críticos de despliegue (y cómo evitarlos)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-xs">07</span>
              <span>Caso real: HealthTrack — de 45 min de deploy a 3 min automáticos</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-xs">08</span>
              <span>Árbol de decisión: ¿qué plataforma usar?</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-xs">09</span>
              <span>Checklist de 14 puntos para deploy en producción</span>
            </li>
          </ol>
        </motion.div>

        {/* Sección 1 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            01. El problema del deploy manual: por qué falla
          </h2>
          <p className="text-zinc-400 mb-4">
            En la mayoría de startups SaaS que vemos llegar a Think Better, el proceso de deploy
            en el momento de la primera reunión es alguna variante de esto:
          </p>
          <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 mb-6">
            <ol className="space-y-2 text-sm text-zinc-300">
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>SSH al servidor. Hacer <code className="text-red-300 bg-zinc-800 px-1 rounded">git pull origin main</code>.</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>Rezar para que no haya conflictos de dependencias.</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>Ejecutar <code className="text-red-300 bg-zinc-800 px-1 rounded">npm install && npm run build</code> en producción.</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>Reiniciar el proceso con <code className="text-red-300 bg-zinc-800 px-1 rounded">pm2 restart</code> y esperar 2 minutos de downtime.</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>Si algo falla: editar archivos en producción directamente. "Solo por esta vez".</span>
              </li>
            </ol>
          </div>
          <p className="text-zinc-400 mb-4">
            Este proceso tiene tres problemas estructurales que escalan muy mal:
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {[
              {
                icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
                title: 'Downtime evitable',
                desc: 'Cada deploy interrumpe el servicio. Con 2 deploys/semana, son 4+ min/semana de servicio caído.',
              },
              {
                icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
                title: 'Estado divergente',
                desc: 'El servidor puede tener dependencias distintas al repositorio. Los builds no son reproducibles.',
              },
              {
                icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
                title: 'Sin rollback',
                desc: 'Si la versión nueva tiene un bug crítico, volver atrás requiere otro deploy manual igual de arriesgado.',
              },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="flex items-center gap-2 mb-2">
                  {item.icon}
                  <span className="font-semibold text-sm text-white">{item.title}</span>
                </div>
                <p className="text-zinc-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-zinc-400">
            La solución no es "ser más cuidadoso". Es automatizar el proceso completo para que el
            deploy sea tan aburrido que no merezca atención.
          </p>
        </motion.section>

        {/* Sección 2 — Comparativa */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            02. Comparativa: Vercel vs Railway vs Fly.io vs Render
          </h2>
          <p className="text-zinc-400 mb-6">
            Las cuatro plataformas principales para SaaS en 2026. Cada una tiene un caso de uso
            óptimo muy distinto. Aquí la comparativa en 10 dimensiones:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-3 px-4 text-zinc-400 font-semibold">Dimensión</th>
                  <th className="text-left py-3 px-4 text-emerald-400 font-semibold">Vercel</th>
                  <th className="text-left py-3 px-4 text-blue-400 font-semibold">Railway</th>
                  <th className="text-left py-3 px-4 text-purple-400 font-semibold">Fly.io</th>
                  <th className="text-left py-3 px-4 text-orange-400 font-semibold">Render</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {[
                  ['Caso óptimo', 'Frontend/fullstack Next.js', 'SaaS con DB + workers', 'Servidores multi-región', 'Proyectos completos simples'],
                  ['Precio mínimo', '0€ (hobby)', '5$/mes', '0$ + pay-as-go', '0$ (hobby)'],
                  ['Precio equipo', '20$/mes/usuario', '20$/mes (Team)', '29$/mes + uso', '19$/mes'],
                  ['Deploy time', '<30s (edge)', '<1 min', '1-3 min', '2-5 min'],
                  ['Zero-downtime', '✅ automático', '✅ automático', '✅ con config', '✅ automático'],
                  ['Preview deploys', '✅ por PR', '✅ por PR', '⚠️ manual', '✅ por PR'],
                  ['Región España', 'Madrid (edge)', 'Frankfurt', 'Frankfurt/Amsterdam', 'Frankfurt'],
                  ['Soporte DB', '❌ (solo FE)', '✅ Postgres+Redis', '✅ Postgres+Redis', '✅ Postgres+Redis'],
                  ['Escalado', 'Edge automático', 'Manual/auto', 'Manual (más control)', 'Auto scaling'],
                  ['DX score', '⭐⭐⭐⭐⭐', '⭐⭐⭐⭐½', '⭐⭐⭐½', '⭐⭐⭐⭐'],
                ].map(([dim, vercel, railway, fly, render], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-zinc-900/30' : ''}>
                    <td className="py-3 px-4 text-zinc-300 font-medium">{dim}</td>
                    <td className="py-3 px-4 text-zinc-400">{vercel}</td>
                    <td className="py-3 px-4 text-zinc-400">{railway}</td>
                    <td className="py-3 px-4 text-zinc-400">{fly}</td>
                    <td className="py-3 px-4 text-zinc-400">{render}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
              <h3 className="font-bold text-emerald-400 mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Vercel: el rey del frontend
              </h3>
              <p className="text-zinc-400 text-sm mb-3">
                Si tu SaaS tiene un frontend Next.js o React y un backend separado (Supabase, Railway,
                etc.), Vercel es la elección obvia. Deploy en segundos, preview por cada PR, Edge
                Network global, analytics integrados y un DX insuperable.
              </p>
              <p className="text-zinc-400 text-sm">
                <strong className="text-white">Cuándo NO usar Vercel:</strong> si necesitas procesos
                de larga duración (&gt;5s en el plan Pro), WebSockets sin Edge, o base de datos
                propia. El plan gratuito tiene límites agresivos de Function Execution Units.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
              <h3 className="font-bold text-blue-400 mb-2 flex items-center gap-2">
                <Server className="w-4 h-4" />
                Railway: el mejor balance para SaaS completos
              </h3>
              <p className="text-zinc-400 text-sm mb-3">
                Railway es nuestra recomendación por defecto para SaaS que necesitan backend + DB +
                workers en una sola plataforma. El modelo de precios basado en uso es predecible,
                el DX es excelente y el soporte de PostgreSQL, Redis y servicios auxiliares es
                de primera clase.
              </p>
              <p className="text-zinc-400 text-sm">
                <strong className="text-white">Punto débil:</strong> la región europea más cercana
                es Frankfurt (no hay datacenter en España aún). Para latencia &lt;20ms en España,
                considera Railway + Vercel Edge o Cloudflare Workers para el frontend.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
              <h3 className="font-bold text-purple-400 mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Fly.io: para arquitecturas multi-región
              </h3>
              <p className="text-zinc-400 text-sm mb-3">
                Fly.io es la elección correcta cuando necesitas correr contenedores cerca de tus
                usuarios en múltiples regiones. Modelo de precios por VM (no por uso), hibernación
                automática de máquinas inactivas y soporte para cualquier workload con Docker.
              </p>
              <p className="text-zinc-400 text-sm">
                <strong className="text-white">Punto débil:</strong> la curva de aprendizaje es
                mayor. Requiere configurar <code className="bg-zinc-800 px-1 rounded text-xs">fly.toml</code> y
                entender el modelo de máquinas. Para un equipo de 1-3 personas, Railway suele
                ser más productivo.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Sección 3 — Pipeline CI/CD */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            03. Pipeline CI/CD completo con GitHub Actions
          </h2>
          <p className="text-zinc-400 mb-6">
            Independientemente de la plataforma que elijas, el pipeline de CI/CD es siempre el
            mismo. Este es el workflow que usamos en Think Better para SaaS con Vercel (frontend)
            + Railway (backend/DB):
          </p>

          <div className="rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden mb-6">
            <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800/50 border-b border-zinc-800">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-mono text-zinc-300">.github/workflows/deploy.yml</span>
            </div>
            <pre className="p-4 text-xs text-zinc-300 overflow-x-auto leading-relaxed">
{`name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20'

jobs:
  # ── 1. Validación ────────────────────────────────
  validate:
    name: Type-check & Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - run: npm run lint        # tsc --noEmit
      - run: npm run test:unit   # Vitest (si existe)

  # ── 2. Build ─────────────────────────────────────
  build:
    name: Production Build
    needs: validate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - run: npm run build
        env:
          VITE_SUPABASE_URL: \${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: \${{ secrets.VITE_SUPABASE_ANON_KEY }}
          VITE_STRIPE_PUBLISHABLE_KEY: \${{ secrets.VITE_STRIPE_PUBLISHABLE_KEY }}

  # ── 3. Migraciones DB ────────────────────────────
  migrate:
    name: Run DB Migrations
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: supabase/setup-cli@v1
      - run: supabase db push --db-url \${{ secrets.SUPABASE_DB_URL }}

  # ── 4. Deploy a Vercel ───────────────────────────
  deploy:
    name: Deploy to Vercel
    needs: migrate
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'

  # ── 5. Smoke test post-deploy ────────────────────
  smoke-test:
    name: Smoke Test
    needs: deploy
    runs-on: ubuntu-latest
    steps:
      - name: Check landing page
        run: curl -f https://tu-saas.vercel.app/ || exit 1
      - name: Check API health
        run: curl -f https://tu-saas.vercel.app/api/health || exit 1`}
            </pre>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <h4 className="font-semibold text-white text-sm mb-2">En PRs (no prod)</h4>
              <ul className="space-y-1.5 text-sm text-zinc-400">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />Type-check + lint</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />Build de producción</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />Preview deploy automático</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />Comentario con URL preview en PR</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <h4 className="font-semibold text-white text-sm mb-2">En merge a main</h4>
              <ul className="space-y-1.5 text-sm text-zinc-400">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />Validación completa</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />Migraciones DB antes del deploy</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />Deploy a producción</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />Smoke test automático post-deploy</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Sección 4 — Variables de entorno */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            04. Variables de entorno y gestión de secretos
          </h2>
          <p className="text-zinc-400 mb-6">
            La gestión de secretos es uno de los mayores puntos de fallo en equipos sin DevOps
            dedicado. Aquí el modelo que funciona para equipos de 2-10 personas:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-3 px-4 text-zinc-400 font-semibold">Tipo de secreto</th>
                  <th className="text-left py-3 px-4 text-zinc-400 font-semibold">Dónde almacenar</th>
                  <th className="text-left py-3 px-4 text-zinc-400 font-semibold">Acceso</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {[
                  ['Claves públicas (VITE_*)', 'Variables de entorno en Vercel/Railway', 'Frontend + CI/CD'],
                  ['Claves privadas (Stripe secret, Resend)', 'Secrets en GitHub Actions + plataforma', 'Solo CI/CD + backend'],
                  ['DB credentials', 'Railway/Supabase managed secrets', 'Solo backend'],
                  ['JWT signing secret', 'GitHub Actions Secrets + plataforma', 'Solo backend'],
                  ['API keys 3rd party', 'Supabase Secrets (para Edge Functions)', 'Solo Edge Functions'],
                  ['Dev local (.env)', '.env.local (en .gitignore)', 'Solo developer local'],
                ].map(([tipo, donde, acceso], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-zinc-900/30' : ''}>
                    <td className="py-3 px-4 text-zinc-300 font-mono text-xs">{tipo}</td>
                    <td className="py-3 px-4 text-zinc-400 text-xs">{donde}</td>
                    <td className="py-3 px-4 text-zinc-400 text-xs">{acceso}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-400 font-semibold mb-1">Regla de oro de secretos</p>
                <p className="text-zinc-400 text-sm">
                  Nunca hardcodees un secreto en el código. Nunca lo metas en un archivo que no esté
                  en <code className="bg-zinc-800 px-1 rounded">.gitignore</code>. Nunca lo expongas
                  en una variable <code className="bg-zinc-800 px-1 rounded">VITE_*</code> (se incluye
                  en el bundle del cliente). Rota cualquier secreto que sospechas expuesto, no lo
                  "monitores para ver si pasa algo".
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Sección 5 — Zero-downtime */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            05. Zero-downtime deploys y rollbacks automáticos
          </h2>
          <p className="text-zinc-400 mb-6">
            En Vercel y Railway, el zero-downtime está activado por defecto mediante un modelo
            de <strong className="text-white">swap atómico</strong>: el nuevo contenedor se levanta
            completamente antes de enrutar tráfico hacia él. El viejo contenedor sigue vivo durante
            una ventana de drenaje (~30s).
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
              <h3 className="font-semibold text-white mb-3">Cómo funciona el zero-downtime en Vercel</h3>
              <ol className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono text-xs shrink-0 mt-0.5">1.</span>
                  Push a main → Vercel inicia un nuevo build en su red edge global.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono text-xs shrink-0 mt-0.5">2.</span>
                  Una vez el build es exitoso, las nuevas Edge Functions se propagan en ~10s.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono text-xs shrink-0 mt-0.5">3.</span>
                  El DNS apunta a la nueva deployment de forma atómica. No hay ventana de downtime.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono text-xs shrink-0 mt-0.5">4.</span>
                  Rollback inmediato: en el dashboard de Vercel, cualquier deployment anterior
                  se puede promover a producción en 1 clic y ~15s.
                </li>
              </ol>
            </div>

            <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
              <h3 className="font-semibold text-white mb-3">Rollback automático con smoke test</h3>
              <div className="rounded-lg bg-zinc-800 overflow-hidden">
                <div className="px-4 py-2 bg-zinc-700/50 border-b border-zinc-700">
                  <span className="text-xs font-mono text-zinc-400">rollback-on-failure.yml (job adicional)</span>
                </div>
                <pre className="p-4 text-xs text-zinc-300 overflow-x-auto leading-relaxed">
{`  rollback-if-broken:
    name: Auto-rollback on smoke test failure
    needs: [deploy, smoke-test]
    if: failure() && needs.smoke-test.result == 'failure'
    runs-on: ubuntu-latest
    steps:
      - name: Rollback via Vercel CLI
        run: |
          npm i -g vercel
          # Obtener el deployment anterior
          PREV=$(vercel ls --token \$VERCEL_TOKEN -S tuproyecto | \\
                 awk 'NR==3{print $1}')
          # Promover como producción
          vercel promote \$PREV --token \$VERCEL_TOKEN
      - name: Notify team
        uses: slackapi/slack-github-action@v1.25
        with:
          payload: '{"text":"🚨 Deploy fallido. Rollback automático ejecutado."}'
        env:
          SLACK_WEBHOOK_URL: \${{ secrets.SLACK_WEBHOOK }}`}
                </pre>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
            <h3 className="font-semibold text-white mb-3">Migraciones de base de datos y zero-downtime</h3>
            <p className="text-zinc-400 text-sm mb-3">
              El punto más delicado del zero-downtime es la base de datos. Si tu migración elimina
              una columna que el código viejo todavía lee, tienes un problema. La regla:
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                <p className="text-xs font-semibold text-red-400 mb-1.5">Migración peligrosa</p>
                <pre className="text-xs text-zinc-400 font-mono">
{`-- ❌ NO: eliminar columna en un paso
ALTER TABLE users DROP COLUMN old_field;
-- El código viejo sigue leyendo old_field → ERROR`}
                </pre>
              </div>
              <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                <p className="text-xs font-semibold text-emerald-400 mb-1.5">Migración segura (3 deploys)</p>
                <pre className="text-xs text-zinc-400 font-mono">
{`-- Deploy 1: añadir nueva columna
ALTER TABLE users ADD COLUMN new_field TEXT;
-- Deploy 2: migrar código a new_field
-- Deploy 3: eliminar old_field (ya nadie la usa)
ALTER TABLE users DROP COLUMN old_field;`}
                </pre>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Sección 6 — Errores críticos */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            06. 6 errores críticos de despliegue (y cómo evitarlos)
          </h2>

          <div className="space-y-4">
            {[
              {
                num: '01',
                titulo: 'Hacer build en producción',
                mal: 'npm run build ejecutado en el servidor de producción. Si falla por falta de memoria, el servicio queda caído.',
                bien: 'Construir siempre en el entorno de CI (GitHub Actions). El artefacto compilado es el que llega a producción.',
              },
              {
                num: '02',
                titulo: 'Variables de entorno sin validación al arrancar',
                mal: 'La app arranca aunque falte STRIPE_SECRET_KEY. El error aparece cuando el primer usuario intenta pagar.',
                bien: 'Validar al arranque con un schema (zod o manual). Si falta una variable crítica, el proceso debe fallar antes de recibir tráfico.',
              },
              {
                num: '03',
                titulo: 'Migraciones dentro del mismo deploy',
                mal: 'Ejecutar migraciones destructivas al mismo tiempo que el nuevo código llega a producción. Si la migración falla a medias, el estado de la DB y el código son inconsistentes.',
                bien: 'Migraciones ANTES del deploy (en el job de CI). Si la migración falla, el deploy no se ejecuta. El código viejo es compatible con la DB migrada.',
              },
              {
                num: '04',
                titulo: 'Sin health check endpoint',
                mal: 'La plataforma no sabe si tu app está realmente funcionando. Si el proceso arranca pero la DB no conecta, el load balancer igual envía tráfico.',
                bien: 'Implementar GET /api/health que compruebe conexión a DB y devuelva 200 solo cuando todo está OK. Configurarlo como readiness probe.',
              },
              {
                num: '05',
                titulo: 'Logs no estructurados',
                mal: 'console.log("error al pagar:", err). En producción con 100 usuarios concurrentes, los logs son ilegibles y no filtrables.',
                bien: 'JSON estructurado con nivel, traceId, userId y timestamp. Integrar con Axiom, Logtail o Datadog desde el primer día.',
              },
              {
                num: '06',
                titulo: 'Sin alertas de uptime',
                mal: 'Te enteras de que la app está caída porque te escribe un usuario (o peor, el cliente).',
                bien: 'Betterstack Uptime (gratis hasta 10 monitores) o similar. Comprueba cada 1 min, alerta a Slack/email en <30s si hay downtime.',
              },
            ].map((error) => (
              <div key={error.num} className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-emerald-400 font-mono text-sm font-bold">#{error.num}</span>
                  <h3 className="font-bold text-white">{error.titulo}</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                    <p className="text-xs font-semibold text-red-400 mb-1">❌ MAL</p>
                    <p className="text-sm text-zinc-400">{error.mal}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                    <p className="text-xs font-semibold text-emerald-400 mb-1">✅ BIEN</p>
                    <p className="text-sm text-zinc-400">{error.bien}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Sección 7 — Caso real */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            07. Caso real: HealthTrack — de 45 min a 3 min de deploy
          </h2>

          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <BarChart3 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="font-bold text-white">HealthTrack — SaaS de gestión de clínicas</p>
                <p className="text-zinc-400 text-sm">Barcelona · 3 desarrolladores · React + Node.js + PostgreSQL</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-zinc-300 mb-3 uppercase tracking-wide">Situación inicial</p>
                <ul className="space-y-2 text-sm text-zinc-400">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    Deploy: SSH + git pull + pm2 restart. ~45 min incluyendo verificación manual.
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    Frecuencia de deploy: 1-2 veces/semana (por miedo).
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    Downtime promedio por deploy: 3-4 minutos.
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    Rollback: restaurar backup de VM (~2 horas).
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    Incidente grave en producción: 1 cada 3 semanas por migración manual.
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-300 mb-3 uppercase tracking-wide">Tras migración a Railway + Vercel + CI/CD</p>
                <ul className="space-y-2 text-sm text-zinc-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    Deploy automático en merge a main: <strong className="text-white">2 min 47s</strong>.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    Frecuencia de deploy: <strong className="text-white">8-12 veces/semana</strong>.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    Downtime por deploy: <strong className="text-white">0 ms</strong>.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    Rollback: <strong className="text-white">1 clic en dashboard Vercel, ~15s</strong>.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    Incidentes por migración: <strong className="text-white">0 en los últimos 4 meses</strong>.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Tiempo de deploy', antes: '45 min', despues: '2m 47s', mejora: '-94%' },
                { label: 'Downtime por deploy', antes: '3-4 min', despues: '0 ms', mejora: '-100%' },
                { label: 'Frecuencia deploy', antes: '1-2/sem', despues: '8-12/sem', mejora: '+600%' },
                { label: 'Incidentes migración', antes: '1/3 sem', despues: '0', mejora: '-100%' },
              ].map((m, i) => (
                <div key={i} className="text-center p-3 rounded-xl bg-zinc-800/50">
                  <p className="text-xs text-zinc-500 mb-1">{m.label}</p>
                  <p className="text-lg font-bold text-emerald-400">{m.mejora}</p>
                  <p className="text-xs text-zinc-500">{m.antes} → {m.despues}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Sección 8 — Árbol de decisión */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            08. Árbol de decisión: ¿qué plataforma usar?
          </h2>

          <div className="space-y-3">
            {[
              {
                pregunta: '¿Tu frontend es Next.js o React puro con backend externo (Supabase)?',
                respuesta: '→ Vercel para el frontend. Supabase Edge Functions para el backend. Coste: ~20$/mes para equipos.',
              },
              {
                pregunta: '¿Necesitas backend Node.js / Python con DB propia + workers?',
                respuesta: '→ Railway. Todo en una plataforma. Coste: ~20-50$/mes para un SaaS en early stage.',
              },
              {
                pregunta: '¿Tu SaaS necesita baja latencia en múltiples regiones (EU + LATAM + US)?',
                respuesta: '→ Fly.io para el backend + Vercel CDN para assets estáticos. Más complejo pero latencias de 20-40ms globalmente.',
              },
              {
                pregunta: '¿Equipo sin experiencia en DevOps que quiere lo más simple posible?',
                respuesta: '→ Render. Menor DX que Railway/Vercel, pero la configuración más sencilla y documentación excelente.',
              },
              {
                pregunta: '¿Workloads pesados: ML, procesamiento de video, scrapers?',
                respuesta: '→ Modal (GPU tasks), Inngest (background jobs), Trigger.dev (workflows) como servicios especializados. No intentes encajar esto en Vercel/Railway.',
              },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <p className="text-sm font-semibold text-white mb-1.5">
                  {i + 1}. {item.pregunta}
                </p>
                <p className="text-sm text-emerald-400 font-mono">{item.respuesta}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-5 rounded-xl bg-zinc-900 border border-zinc-800">
            <p className="text-sm font-bold text-white mb-2">La regla de oro del deploy para SaaS en etapa temprana:</p>
            <p className="text-zinc-400 text-sm">
              Usa <strong className="text-emerald-400">Vercel + Supabase</strong> hasta que encuentres
              un límite concreto y medido. La combinación cubre el 90% de los casos de uso SaaS,
              tiene el mejor DX del mercado, y el coste es predecible. Migrarte a Railway, Fly.io
              o AWS cuando lo necesites es un problema de lujo — significa que tienes tracción.
            </p>
          </div>
        </motion.section>

        {/* Sección 9 — Checklist */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            09. Checklist de 14 puntos para deploy en producción
          </h2>
          <p className="text-zinc-400 mb-6">
            Antes de hacer tu primer deploy a producción de un SaaS real, verifica estos 14 puntos.
            Son los que revisamos en Think Better antes de entregar cualquier proyecto:
          </p>

          <div className="grid md:grid-cols-2 gap-3">
            {[
              { cat: 'CI/CD', items: ['Pipeline de CI/CD configurado (validate → build → migrate → deploy)', 'Preview deploys activos por PR', 'Smoke test post-deploy que falla el pipeline si hay error'] },
              { cat: 'Secretos', items: ['0 secretos en el código o en el repositorio', 'Variables de entorno validadas al arranque', '.env.local en .gitignore + .env.example documentado'] },
              { cat: 'Base de datos', items: ['Migraciones ejecutan antes del deploy en CI', 'Backup automático diario configurado', 'Zero-downtime migration strategy definida'] },
              { cat: 'Monitorización', items: ['Health check endpoint /api/health activo', 'Alertas de uptime configuradas (Betterstack o similar)', 'Error tracking activo (Sentry o similar)', 'Logs estructurados en JSON con nivel + traceId'] },
            ].map((group) => (
              <div key={group.cat} className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-white text-sm">{group.cat}</span>
                </div>
                <ul className="space-y-2">
                  {group.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Conclusión */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
            <h2 className="text-xl font-bold text-white mb-3">Resumen ejecutivo</h2>
            <ul className="space-y-2 text-zinc-300 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Vercel + Supabase</strong> es el stack de deploy por defecto para el 90% de los SaaS en etapa temprana.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Railway</strong> es la mejor opción cuando necesitas backend propio + DB + workers en una plataforma.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Fly.io</strong> para multi-región con control total sobre los contenedores.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Un pipeline CI/CD bien configurado convierte un deploy de 45 min arriesgado en <strong>3 min automáticos y sin downtime</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Migraciones de DB antes del deploy + rollback automático por smoke test = 0 incidentes en producción por despliegue.</span>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 text-center"
        >
          <p className="text-zinc-400 text-sm uppercase tracking-wide font-semibold mb-3">
            ¿Quieres un pipeline CI/CD desde el día 1?
          </p>
          <h3 className="text-2xl font-bold text-white mb-3">
            En Think Better, cada proyecto incluye CI/CD y deploy automatizado desde el inicio.
          </h3>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Nuestro cuestionario IA descubre lo que necesitas en 10 minutos. En 24h tienes propuesta
            con stack, infraestructura y precio cerrado.
          </p>
          <Link
            to="/cuestionario"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 transition-colors"
          >
            Descubrir precio de mi proyecto
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </article>
    </div>
  );
}
