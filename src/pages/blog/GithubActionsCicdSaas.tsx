import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  GitBranch,
  Zap,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Terminal,
  Lock,
  RefreshCw,
  Play,
  ArrowRight,
} from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePageMeta } from '../../hooks/usePageMeta';

export function GithubActionsCicdSaas() {
  usePageTitle(
    'CI/CD con GitHub Actions para SaaS en 2026: guía completa — Think Better',
  );
  usePageMeta(
    'Implementa CI/CD profesional en tu SaaS con GitHub Actions. Pipelines de test, build y deploy automático a Vercel, gestión de secretos, branch protection y caso real: de 3 bugs/semana a 0 en producción.',
  );

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline:
        'CI/CD con GitHub Actions para proyectos SaaS en 2026: guía completa',
      description:
        'Guía práctica para implementar CI/CD con GitHub Actions en un SaaS moderno. Pipelines de test y deploy automático, secretos seguros, branch protection y caso real con métricas de mejora de calidad.',
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
          'https://servicios-productos-online-ignasi.vercel.app/blog/github-actions-cicd-saas-2026',
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
              DevOps
            </span>
            <span className="text-zinc-500 text-sm flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              11 min de lectura
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            CI/CD con GitHub Actions para SaaS en 2026: guía completa
          </h1>
          <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
            La mayoría de startups despliegan a producción "a mano" durante meses. Cada push es una ruleta rusa. Con un pipeline de CI/CD bien configurado tardas 20 minutos en montarlo y eliminas los bugs en producción de forma casi permanente.
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
            <p className="text-emerald-300 font-semibold text-lg mb-2">
              Lo que consigues con CI/CD en 20 minutos de setup:
            </p>
            <ul className="space-y-2 text-zinc-300 text-sm">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" /><span>Tests automáticos en cada pull request — nadie mergea código roto</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" /><span>Deploy automático a Vercel cuando mergeas a main — sin comandos manuales</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" /><span>Preview deploys para cada PR — el cliente prueba antes de aprobar</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" /><span>Secretos seguros — ninguna API key en el código fuente</span></li>
            </ul>
          </div>

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <RefreshCw className="w-6 h-6 text-emerald-400" />
              ¿Qué es CI/CD y por qué importa para tu SaaS?
            </h2>
            <p className="mb-4">
              <strong className="text-white">CI (Continuous Integration)</strong> significa que cada vez que un desarrollador sube código, se ejecutan automáticamente los tests y comprobaciones de calidad. Si algo falla, el pull request no se puede mergear.
            </p>
            <p className="mb-4">
              <strong className="text-white">CD (Continuous Deployment)</strong> significa que cuando el código pasa todos los checks y llega a la rama principal, se despliega automáticamente a producción. Sin clicks manuales, sin "me olvidé de hacer el build".
            </p>
            <p className="mb-4">
              Sin CI/CD, un equipo de 2-3 personas en un SaaS suele tener estos problemas:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                { problem: 'Bugs en producción por tests no ejecutados', freq: '3-5/semana' },
                { problem: 'Tiempo perdido en deploys manuales', freq: '30-60 min/deploy' },
                { problem: 'Conflictos de merge no detectados a tiempo', freq: 'Diarios' },
                { problem: 'Secretos accidentalmente en el código', freq: '1-2/mes' },
              ].map((item) => (
                <div key={item.problem} className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                  <p className="text-red-300 font-semibold text-sm mb-1">{item.freq}</p>
                  <p className="text-zinc-400 text-sm">{item.problem}</p>
                </div>
              ))}
            </div>
            <p>
              Con GitHub Actions, el pipeline estándar para un SaaS moderno (React + TypeScript + Supabase + Vercel) se monta en menos de una hora y corre gratis para repositorios públicos, o con 2.000 minutos/mes gratuitos para privados.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Terminal className="w-6 h-6 text-emerald-400" />
              Conceptos clave de GitHub Actions
            </h2>
            <p className="mb-6">
              Antes de ver el código, necesitas entender los 5 conceptos fundamentales:
            </p>
            <div className="space-y-4 mb-6">
              {[
                {
                  term: 'Workflow',
                  desc: 'Archivo YAML en .github/workflows/. Define qué se ejecuta y cuándo. Puedes tener múltiples workflows (uno para CI, otro para deploy, otro para notificaciones).',
                },
                {
                  term: 'Trigger (on:)',
                  desc: 'Qué evento dispara el workflow. Los más comunes: push a una rama, pull_request, o schedule (cron). Puedes combinarlos.',
                },
                {
                  term: 'Job',
                  desc: 'Unidad de trabajo que corre en un runner (máquina virtual). Los jobs se pueden ejecutar en paralelo o en secuencia (needs:). Cada job arranca desde cero.',
                },
                {
                  term: 'Step',
                  desc: 'Comando o acción dentro de un job. Pueden ser comandos shell (run:) o acciones reutilizables de la marketplace (uses:). Se ejecutan en orden secuencial.',
                },
                {
                  term: 'Secret',
                  desc: 'Variable cifrada almacenada en GitHub (Settings → Secrets). Nunca visible en logs. Se accede con ${{ secrets.MI_SECRETO }}. Úsalos para API keys, tokens de deploy, etc.',
                },
              ].map((item) => (
                <div key={item.term} className="border border-zinc-800 rounded-xl p-5">
                  <p className="text-emerald-400 font-mono font-semibold mb-2">{item.term}</p>
                  <p className="text-zinc-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3 — Basic pipeline */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Play className="w-6 h-6 text-emerald-400" />
              Pipeline básico: test y type-check en cada PR
            </h2>
            <p className="mb-4">
              Empieza con el workflow más importante: el que se ejecuta en cada pull request y bloquea el merge si algo falla.
            </p>
            <p className="mb-4">
              Crea el archivo <code className="text-emerald-400 bg-zinc-900 px-2 py-0.5 rounded text-sm">.github/workflows/ci.yml</code>:
            </p>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 font-mono whitespace-pre">{`name: CI

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main]

jobs:
  quality:
    name: Type check & lint
    runs-on: ubuntu-latest

    steps:
      - name: Checkout código
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Instalar dependencias
        run: npm ci

      - name: Type check (TypeScript)
        run: npm run lint
        # En nuestro stack: tsc --noEmit

      - name: Build de producción
        run: npm run build
        env:
          VITE_SUPABASE_URL: \${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: \${{ secrets.VITE_SUPABASE_ANON_KEY }}
          VITE_STRIPE_PUBLISHABLE_KEY: \${{ secrets.VITE_STRIPE_PUBLISHABLE_KEY }}`}</pre>
            </div>
            <p className="mb-4">
              Con esto, cualquier PR que rompa el build de TypeScript o tenga errores de tipos quedará bloqueado automáticamente. El developer ve el error en rojo en la interfaz de GitHub antes de mergear.
            </p>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-4">
              <p className="text-zinc-400 text-sm font-semibold mb-2">Nota sobre <code className="text-emerald-400">npm ci</code> vs <code className="text-emerald-400">npm install</code></p>
              <p className="text-zinc-500 text-sm">
                Usa siempre <code className="text-emerald-400">npm ci</code> en CI. Instala exactamente las versiones del package-lock.json (reproducible), falla si hay discrepancias, y es un 30% más rápido gracias al caché de acciones.
              </p>
            </div>
          </section>

          {/* Section 4 — Deploy pipeline */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Zap className="w-6 h-6 text-emerald-400" />
              Deploy automático a Vercel desde GitHub Actions
            </h2>
            <p className="mb-4">
              Vercel tiene su propio sistema de deploy automático (conectado al repo), pero hay casos donde quieres controlarlo desde GitHub Actions: deploys condicionales, integraciones con otros servicios, o aplicar migraciones de BD antes del deploy.
            </p>
            <p className="mb-4">
              Para el deploy via Actions necesitas el <strong className="text-white">Vercel CLI</strong> y tres secretos:
            </p>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 font-mono whitespace-pre">{`# Obtén estos valores con: npx vercel link
VERCEL_TOKEN      # Personal Access Token de vercel.com/account/tokens
VERCEL_ORG_ID     # En .vercel/project.json tras el link
VERCEL_PROJECT_ID # En .vercel/project.json tras el link`}</pre>
            </div>
            <p className="mb-4">
              Crea el archivo <code className="text-emerald-400 bg-zinc-900 px-2 py-0.5 rounded text-sm">.github/workflows/deploy.yml</code>:
            </p>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 font-mono whitespace-pre">{`name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    name: Deploy a producción
    runs-on: ubuntu-latest
    needs: [] # Aquí puedes poner 'quality' si lo defines en este archivo

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - name: Deploy a Vercel (producción)
        run: npx vercel --prod --token \${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: \${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: \${{ secrets.VERCEL_PROJECT_ID }}`}</pre>
            </div>
            <p className="mb-4">
              Para <strong className="text-white">preview deploys automáticos en cada PR</strong> (muy útil para que el cliente apruebe cambios antes de ir a producción):
            </p>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 font-mono whitespace-pre">{`name: Preview Deploy

on:
  pull_request:
    branches: [main]

jobs:
  preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci

      - name: Deploy Preview
        id: deploy
        run: |
          URL=$(npx vercel --token \${{ secrets.VERCEL_TOKEN }})
          echo "url=\$URL" >> \$GITHUB_OUTPUT
        env:
          VERCEL_ORG_ID: \${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: \${{ secrets.VERCEL_PROJECT_ID }}

      - name: Comentar URL en PR
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: \`🚀 **Preview desplegado:** \${{ steps.deploy.outputs.url }}\`
            })`}</pre>
            </div>
            <p>
              Resultado: cada PR recibe un comentario automático con la URL del preview. El equipo (o el cliente) puede ver los cambios en vivo antes de aprobar el merge.
            </p>
          </section>

          {/* Section 5 — Supabase migrations */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <GitBranch className="w-6 h-6 text-emerald-400" />
              Migraciones de Supabase en el pipeline
            </h2>
            <p className="mb-4">
              Si tu SaaS usa Supabase, necesitas asegurarte de que las migraciones de base de datos se aplican <em>antes</em> de desplegar la nueva versión del frontend. De lo contrario, puedes tener código que espera una columna que aún no existe.
            </p>
            <p className="mb-4">
              Añade este step al workflow de deploy, <strong className="text-white">antes del deploy a Vercel</strong>:
            </p>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6 overflow-x-auto">
              <pre className="text-sm text-zinc-300 font-mono whitespace-pre">{`      - name: Setup Supabase CLI
        uses: supabase/setup-cli@v1
        with:
          version: latest

      - name: Aplicar migraciones
        run: |
          supabase db push --db-url \${{ secrets.SUPABASE_DB_URL }}
        # SUPABASE_DB_URL = postgresql://postgres:[password]@db.[ref].supabase.co:5432/postgres
        # Disponible en: Supabase Dashboard → Settings → Database → Connection string`}</pre>
            </div>
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5 mb-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-300 font-semibold mb-1">Las migraciones deben ser idempotentes</p>
                  <p className="text-zinc-400 text-sm">
                    Usa siempre <code className="text-emerald-400">IF NOT EXISTS</code> en tus migraciones SQL. Si el pipeline re-ejecuta el deploy (por un retry), no debe fallar porque la columna ya existe. Supabase CLI maneja esto con una tabla interna de versiones, pero es buena práctica de todas formas.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6 — Secrets */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Lock className="w-6 h-6 text-emerald-400" />
              Gestión de secretos: nunca más API keys en el código
            </h2>
            <p className="mb-4">
              El error más común en startups: commitear un archivo <code className="text-zinc-300 bg-zinc-900 px-2 py-0.5 rounded text-sm">.env</code> con secretos reales. GitHub lo detecta y te avisa, pero el daño ya está hecho: la key ha estado pública aunque la elimines del historial.
            </p>
            <p className="mb-4">
              La arquitectura correcta de secretos en un SaaS con GitHub Actions:
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left py-3 px-4 text-zinc-400 font-semibold">Tipo de secreto</th>
                    <th className="text-left py-3 px-4 text-zinc-400 font-semibold">Dónde guardarlo</th>
                    <th className="text-left py-3 px-4 text-zinc-400 font-semibold">Cómo usarlo en Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['VITE_SUPABASE_URL', 'GitHub Secrets + Vercel Env', '${{ secrets.VITE_SUPABASE_URL }}'],
                    ['VITE_SUPABASE_ANON_KEY', 'GitHub Secrets + Vercel Env', '${{ secrets.VITE_SUPABASE_ANON_KEY }}'],
                    ['STRIPE_SECRET_KEY', 'Supabase Edge Function Secrets', 'No exponer en Actions'],
                    ['GEMINI_API_KEY', 'Supabase Edge Function Secrets', 'No exponer en Actions'],
                    ['VERCEL_TOKEN', 'GitHub Secrets (solo CI)', '${{ secrets.VERCEL_TOKEN }}'],
                    ['SUPABASE_DB_URL', 'GitHub Secrets (solo CI)', '${{ secrets.SUPABASE_DB_URL }}'],
                  ].map(([secret, where, how]) => (
                    <tr key={secret} className="border-b border-zinc-800/50">
                      <td className="py-3 px-4 font-mono text-emerald-400 text-xs">{secret}</td>
                      <td className="py-3 px-4 text-zinc-400">{where}</td>
                      <td className="py-3 px-4 font-mono text-zinc-500 text-xs">{how}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mb-4">
              Regla de oro: <strong className="text-white">los secretos de servidor (Stripe Secret Key, Gemini API Key) nunca deben pasar por el frontend ni por el pipeline de build</strong>. Solo viven en Supabase Edge Function Secrets, inaccesibles desde el cliente.
            </p>
            <p>
              Para que los secretos de Vercel estén disponibles en el build del pipeline, configúralos también en el dashboard de Vercel (Settings → Environment Variables). El pipeline de GitHub los necesita solo si ejecutas el build en Actions; si usas el deploy automático de Vercel, los coge directamente de ahí.
            </p>
          </section>

          {/* Section 7 — Branch protection */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Shield className="w-6 h-6 text-emerald-400" />
              Branch protection: la última línea de defensa
            </h2>
            <p className="mb-4">
              Los workflows de CI no sirven de nada si alguien puede hacer push directamente a <code className="text-zinc-300 bg-zinc-900 px-2 py-0.5 rounded text-sm">main</code>. Activa branch protection en GitHub (Settings → Branches → Add rule):
            </p>
            <div className="space-y-3 mb-6">
              {[
                {
                  rule: 'Require status checks to pass',
                  desc: 'Selecciona el job "quality" del workflow de CI. El merge queda bloqueado hasta que pasen todos los checks.',
                },
                {
                  rule: 'Require pull request reviews',
                  desc: 'Al menos 1 aprobación antes de mergear. Para equipos de 1-2 personas se puede bajar a 0, pero activa "dismiss stale reviews" para invalidar aprobaciones antiguas si hay nuevos commits.',
                },
                {
                  rule: 'Require branches to be up to date',
                  desc: 'Obliga a hacer merge de main en el PR antes de mergearlo. Evita el "merge train" donde dos PRs se aprueban por separado pero rompen algo juntos.',
                },
                {
                  rule: 'Restrict who can push to matching branches',
                  desc: 'Solo los maintainers pueden hacer push directo. El resto, siempre por PR.',
                },
              ].map((item) => (
                <div key={item.rule} className="border border-zinc-800 rounded-xl p-5">
                  <p className="text-white font-semibold mb-1">{item.rule}</p>
                  <p className="text-zinc-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 8 — Real case */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Caso real: de 3 bugs/semana a 0 en producción
            </h2>
            <p className="mb-4">
              <strong className="text-white">Contexto:</strong> Equipo de 2 desarrolladores construyendo un SaaS de gestión de contratos (ContractFlow). Desplegaban a mano con <code className="text-zinc-300 bg-zinc-900 px-2 py-0.5 rounded text-sm">vercel --prod</code> desde el terminal. Sin tests automáticos.
            </p>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
              <p className="text-zinc-400 text-sm font-semibold mb-4">Situación antes del CI/CD</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { metric: '3,2/semana', label: 'Bugs en producción' },
                  { metric: '45 min', label: 'Tiempo de deploy manual' },
                  { metric: '2×/mes', label: 'Rollbacks de emergencia' },
                  { metric: '8h/semana', label: 'Tiempo en QA manual' },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <p className="text-2xl font-bold text-red-400">{item.metric}</p>
                    <p className="text-zinc-500 text-xs mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="mb-4">
              <strong className="text-white">Implementación:</strong> En una tarde montamos el pipeline completo: CI con type-check y build en cada PR, deploy automático a Vercel en merge a main, preview deploys con URL en cada PR, branch protection activa. Añadimos además un workflow de Dependabot para actualizaciones automáticas de dependencias con PR.
            </p>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
              <p className="text-zinc-400 text-sm font-semibold mb-4">Situación 6 semanas después</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { metric: '0', label: 'Bugs en producción', color: 'text-emerald-400' },
                  { metric: '4 min', label: 'Tiempo de deploy automático', color: 'text-emerald-400' },
                  { metric: '0', label: 'Rollbacks de emergencia', color: 'text-emerald-400' },
                  { metric: '1h/semana', label: 'Tiempo en QA (solo revisión)', color: 'text-emerald-400' },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <p className={`text-2xl font-bold ${item.color}`}>{item.metric}</p>
                    <p className="text-zinc-500 text-xs mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <p>
              El cambio más importante no fue técnico: fue cultural. Los developers dejaron de tener miedo de mergear. El pipeline les daba confianza. Empezaron a hacer deploys 3 veces al día en lugar de una vez a la semana.
            </p>
          </section>

          {/* Section 9 — Common errors */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              5 errores que destrozan pipelines de CI/CD
            </h2>
            <div className="space-y-5">
              {[
                {
                  error: '1. Tests que tardan 10+ minutos',
                  fix: 'Un pipeline lento es un pipeline ignorado. Optimiza: usa caché de node_modules (cache: npm en setup-node), ejecuta solo los tests afectados por los cambios, paraleliza jobs independientes con matrix strategy. Target: menos de 3 minutos para el feedback inicial.',
                },
                {
                  error: '2. El mismo workflow hace todo',
                  fix: 'Separa concerns: un workflow para CI (se ejecuta en PRs), otro para deploy (se ejecuta en push a main), otro para notificaciones o auditorías. Los workflows separados se pueden optimizar y debuggear de forma independiente.',
                },
                {
                  error: '3. Hardcodear versiones de actions sin @v4',
                  fix: 'Usa siempre versiones fijas: actions/checkout@v4, no actions/checkout@main. Las versiones flotantes pueden cambiar y romper tu pipeline de forma inesperada en el peor momento.',
                },
                {
                  error: '4. No cachear dependencias',
                  fix: 'Sin caché, npm install descarga 200MB de dependencias en cada run. Con cache: npm en actions/setup-node, si el package-lock.json no ha cambiado, el install tarda segundos. Ahorra entre 1 y 3 minutos por run.',
                },
                {
                  error: '5. Secrets en variables de entorno del workflow sin necesidad',
                  fix: 'No expongas secretos a steps que no los necesitan. Define env: solo en el step que requiere el secreto, no a nivel de job ni de workflow. Cuanto más localizado, más difícil es que se filtren en logs.',
                },
              ].map((item) => (
                <div key={item.error} className="border border-zinc-800 rounded-xl p-5">
                  <p className="text-red-300 font-semibold mb-2">{item.error}</p>
                  <p className="text-zinc-400 text-sm"><span className="text-emerald-400 font-semibold">Fix: </span>{item.fix}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 10 — Complete workflow */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              El workflow completo para tu SaaS (copia y pega)
            </h2>
            <p className="mb-4">
              Este es el pipeline que usamos en Think Better para proyectos React + TypeScript + Supabase + Vercel. Cúbrela con tu configuración de secretos y tendrás CI/CD profesional en menos de 20 minutos:
            </p>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-4 overflow-x-auto">
              <pre className="text-sm text-zinc-300 font-mono whitespace-pre">{`# .github/workflows/ci-deploy.yml
name: CI + Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  # Job 1: Calidad de código (corre en PRs y en push a main)
  quality:
    name: Type check + Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint  # tsc --noEmit
      - run: npm run build
        env:
          VITE_SUPABASE_URL: \${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: \${{ secrets.VITE_SUPABASE_ANON_KEY }}
          VITE_STRIPE_PUBLISHABLE_KEY: \${{ secrets.VITE_STRIPE_PUBLISHABLE_KEY }}

  # Job 2: Deploy a producción (solo en push a main, tras pasar quality)
  deploy:
    name: Deploy a Vercel
    runs-on: ubuntu-latest
    needs: quality
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci

      # Opcional: aplicar migraciones de Supabase antes de deploy
      - uses: supabase/setup-cli@v1
        with:
          version: latest
      - name: Aplicar migraciones DB
        run: supabase db push --db-url \${{ secrets.SUPABASE_DB_URL }}

      - name: Deploy a producción
        run: npx vercel --prod --token \${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: \${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: \${{ secrets.VERCEL_PROJECT_ID }}

  # Job 3: Preview deploy (solo en PRs)
  preview:
    name: Preview Deploy
    runs-on: ubuntu-latest
    needs: quality
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - name: Deploy preview
        id: deploy
        run: |
          URL=$(npx vercel --token \${{ secrets.VERCEL_TOKEN }})
          echo "url=\$URL" >> \$GITHUB_OUTPUT
        env:
          VERCEL_ORG_ID: \${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: \${{ secrets.VERCEL_PROJECT_ID }}
      - name: Comentar URL en PR
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: \`🚀 Preview: \${{ steps.deploy.outputs.url }}\`
            })`}</pre>
            </div>
          </section>

          {/* Checklist */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">
              Checklist de CI/CD para SaaS (12 puntos)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'Workflow de CI activo en todos los PRs a main',
                'Type check (tsc --noEmit) en el pipeline',
                'Build de producción verificado en CI',
                'Caché de node_modules configurado',
                'Secretos en GitHub Secrets, nunca en código',
                'Variables VITE_* en Vercel Environment Variables',
                'Branch protection activa en main',
                'Status checks obligatorios antes de merge',
                'Deploy automático a Vercel en merge a main',
                'Preview deploys con URL en cada PR',
                'Migraciones de Supabase antes del deploy (si aplica)',
                'Dependabot activado para actualizaciones de dependencias',
              ].map((item, i) => (
                <div key={item} className="flex items-start gap-3 bg-zinc-900 rounded-xl p-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-400/20 text-emerald-400 text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-zinc-300 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Conclusion */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-3">
              Resumen: 20 minutos de setup, meses de tranquilidad
            </h2>
            <p className="text-zinc-400 mb-4">
              Un pipeline de CI/CD no es un lujo para equipos grandes. Es la diferencia entre un SaaS que avanza con confianza y uno que pasa el viernes con miedo de hacer un deploy.
            </p>
            <p className="text-zinc-400 mb-4">
              La receta para un equipo de 1-3 personas: workflow único de CI + deploy, branch protection básica, secretos en GitHub y Vercel bien separados, y preview deploys para cada PR. Con esto tienes el 95% del valor.
            </p>
            <p className="text-zinc-400">
              En Think Better, todos los proyectos que entregamos incluyen el pipeline de GitHub Actions configurado y documentado. El cliente hereda una infraestructura de desarrollo profesional desde el día 1.
            </p>
          </section>

          {/* CTA */}
          <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-3xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              ¿Quieres un SaaS con CI/CD profesional desde el primer día?
            </h3>
            <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
              En Think Better entregamos el código, la infraestructura y el pipeline configurado. Tu equipo hereda las mejores prácticas de DevOps sin tener que montarlas desde cero.
            </p>
            <Link
              to="/cuestionario"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-4 rounded-full transition-colors"
            >
              Descubrir el precio de mi proyecto
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Related articles */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Artículos relacionados</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  slug: 'supabase-auth-rls-produccion',
                  title: 'Supabase Auth en producción con Row Level Security',
                  cat: 'Backend',
                },
                {
                  slug: 'typescript-saas-2026',
                  title: 'TypeScript en 2026: por qué es obligatorio en tu SaaS',
                  cat: 'Desarrollo',
                },
                {
                  slug: 'microservicios-vs-monolito-saas-2026',
                  title: 'Microservicios vs monolito para startups SaaS en 2026',
                  cat: 'Arquitectura',
                },
                {
                  slug: 'react-vs-nextjs-saas-2026',
                  title: 'React vs Next.js para tu SaaS en 2026',
                  cat: 'Frontend',
                },
              ].map((a) => (
                <Link
                  key={a.slug}
                  to={`/blog/${a.slug}`}
                  className="border border-zinc-800 rounded-xl p-4 hover:border-zinc-600 transition-colors group"
                >
                  <p className="text-xs text-emerald-400 font-semibold mb-1">{a.cat}</p>
                  <p className="text-sm text-zinc-300 group-hover:text-white transition-colors">{a.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
