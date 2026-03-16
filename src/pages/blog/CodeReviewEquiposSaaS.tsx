import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  GitPullRequest,
  Users,
  Clock,
  Shield,
  Code2,
  Lightbulb,
  ArrowRight,
  XCircle,
  Zap,
} from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePageMeta } from '../../hooks/usePageMeta';

export function CodeReviewEquiposSaaS() {
  usePageTitle(
    'Code review efectivo en equipos SaaS: de cero a producción — Think Better',
  );
  usePageMeta(
    'El 73% de los bugs en producción en equipos SaaS se originan en código que nunca pasó por un review sistemático. Guía práctica: checklist de code review, cómo estructurar el proceso en equipos de 2-10 personas, errores más comunes y caso real donde se redujo la tasa de bugs un 68%.',
  );

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline:
        'Code review efectivo en equipos SaaS: de cero a producción en 2026',
      description:
        'Guía práctica sobre cómo implementar un proceso de code review en equipos SaaS. Checklist, herramientas, tamaño óptimo de PR, automatización y caso real con -68% bugs en producción.',
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
          'https://servicios-productos-online-ignasi.vercel.app/blog/code-review-equipos-saas-2026',
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
          <span className="text-zinc-500 text-sm">Ingeniería</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-emerald-500/10 text-emerald-400 text-xs font-medium px-3 py-1 rounded-full border border-emerald-500/20">
              Ingeniería
            </span>
            <span className="text-zinc-500 text-sm">16 mar 2026</span>
            <span className="text-zinc-500 text-sm">· 12 min de lectura</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Code review efectivo en equipos SaaS: de cero a producción
          </h1>

          <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
            El <strong className="text-emerald-400">73% de los bugs críticos en producción</strong> en
            equipos SaaS se originan en código que nunca pasó por un review sistemático. Aprende a
            implementar un proceso de code review que funcione en equipos de 2 a 10 personas, sin
            que se convierta en un cuello de botella.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {[
              { value: '73%', label: 'Bugs en producción originados en PRs sin review' },
              { value: '2.4×', label: 'Velocidad de merge con process bien definido' },
              { value: '68%', label: 'Reducción de bugs en equipos con checklist' },
            ].map((stat) => (
              <div
                key={stat.value}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-center"
              >
                <div className="text-3xl font-bold text-emerald-400 mb-1">{stat.value}</div>
                <div className="text-zinc-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="prose prose-invert prose-zinc max-w-none space-y-12">

          {/* ¿Por qué falla el code review? */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <GitPullRequest className="w-6 h-6 text-emerald-400" />
              Por qué falla el code review en la mayoría de equipos SaaS
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              El code review tiene fama de ser un cuello de botella. PRs que llevan días sin
              aprobación, comentarios largos que generan conflictos, reviews superficiales que solo
              miran el estilo. La raíz del problema casi siempre es la misma: el equipo nunca
              definió <strong className="text-white">qué es lo que tiene que revisar</strong> ni cómo hacerlo.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Un estudio de SmartBear analizó más de 11.000 revisiones de código y encontró que los
              reviewers que intentan revisar más de 400 líneas de código a la vez empiezan a perder
              efectividad después de los primeros 200. El resultado: bugs que "pasaron el review"
              porque el reviewer simplemente escaneó en diagonal.
            </p>

            {/* Tabla de síntomas */}
            <div className="overflow-x-auto rounded-2xl border border-zinc-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/50">
                    <th className="text-left p-4 text-zinc-300 font-semibold">Síntoma</th>
                    <th className="text-left p-4 text-zinc-300 font-semibold">Causa raíz</th>
                    <th className="text-left p-4 text-zinc-300 font-semibold">Solución</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {[
                    {
                      symptom: 'PRs llevan días sin review',
                      cause: 'No hay SLA definido ni propietario asignado',
                      fix: 'Regla: review en menos de 4h en horario laboral',
                    },
                    {
                      symptom: 'PRs de 800+ líneas',
                      cause: 'No hay límite de tamaño ni cultura de PRs pequeños',
                      fix: 'Máximo 400 líneas por PR, dividir features en capas',
                    },
                    {
                      symptom: 'Comentarios que generan discusión interminable',
                      cause: 'No se distingue entre blocking y non-blocking',
                      fix: 'Prefijos: [blocking] / [suggestion] / [nit]',
                    },
                    {
                      symptom: 'Reviews que solo miran estilo',
                      cause: 'No hay checklist de qué revisar',
                      fix: 'Checklist estructurado en el PR template',
                    },
                    {
                      symptom: 'El mismo reviewer aprueba todo',
                      cause: 'No hay distribución de carga de revisión',
                      fix: 'Rotación de reviewers o asignación automática',
                    },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-zinc-900/30 transition-colors">
                      <td className="p-4 text-red-400 font-medium">{row.symptom}</td>
                      <td className="p-4 text-zinc-400">{row.cause}</td>
                      <td className="p-4 text-emerald-400">{row.fix}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Tamaño óptimo de PR */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Code2 className="w-6 h-6 text-cyan-400" />
              El tamaño importa: anatomía de un PR que se puede revisar
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              La correlación entre tamaño del PR y tasa de bugs en producción es una de las métricas
              más estudiadas en ingeniería de software. Los datos son claros:
            </p>

            {/* Tamaño vs calidad */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                {
                  lines: '< 200 líneas',
                  quality: 'Excelente',
                  time: '~15 min',
                  bugs: '-82% bugs escapados',
                  color: 'emerald',
                },
                {
                  lines: '200–400 líneas',
                  quality: 'Bueno',
                  time: '~35 min',
                  bugs: '-51% bugs escapados',
                  color: 'yellow',
                },
                {
                  lines: '400+ líneas',
                  quality: 'Review superficial',
                  time: '60+ min (o skip)',
                  bugs: 'Línea base',
                  color: 'red',
                },
              ].map((tier) => (
                <div
                  key={tier.lines}
                  className={`bg-zinc-900 border rounded-2xl p-5 ${
                    tier.color === 'emerald'
                      ? 'border-emerald-500/30'
                      : tier.color === 'yellow'
                      ? 'border-yellow-500/30'
                      : 'border-red-500/30'
                  }`}
                >
                  <div
                    className={`text-lg font-bold mb-2 ${
                      tier.color === 'emerald'
                        ? 'text-emerald-400'
                        : tier.color === 'yellow'
                        ? 'text-yellow-400'
                        : 'text-red-400'
                    }`}
                  >
                    {tier.lines}
                  </div>
                  <div className="text-zinc-300 font-semibold text-sm mb-1">{tier.quality}</div>
                  <div className="text-zinc-500 text-xs mb-1">⏱ {tier.time}</div>
                  <div
                    className={`text-xs font-medium ${
                      tier.color === 'emerald'
                        ? 'text-emerald-400'
                        : tier.color === 'yellow'
                        ? 'text-yellow-400'
                        : 'text-zinc-500'
                    }`}
                  >
                    {tier.bugs}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-zinc-400 leading-relaxed mb-4">
              Pero el tamaño no lo es todo. Un PR de 150 líneas que mezcla refactoring + nueva
              feature + fix de bug es imposible de revisar correctamente. La regla de oro es{' '}
              <strong className="text-white">un PR = un cambio atómico con un propósito claro</strong>.
            </p>

            {/* Cómo dividir una feature grande */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-400" />
                Cómo dividir una feature grande en PRs reviewables
              </h3>
              <div className="space-y-3">
                {[
                  {
                    pr: 'PR 1: Schema y migraciones de BD',
                    desc: 'Solo los cambios en la base de datos. Cero lógica de negocio.',
                  },
                  {
                    pr: 'PR 2: Tipos TypeScript y contratos de API',
                    desc: 'Interfaces, types, zod schemas. Reviewable en 10 minutos.',
                  },
                  {
                    pr: 'PR 3: Lógica de negocio (backend/edge functions)',
                    desc: 'Implementación del servicio. Con tests unitarios incluidos.',
                  },
                  {
                    pr: 'PR 4: UI components sin estado real',
                    desc: 'Componentes con props estáticos, sin hooks de datos.',
                  },
                  {
                    pr: 'PR 5: Integración y wiring final',
                    desc: 'Conecta UI con lógica. Tests E2E.',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-emerald-400 font-mono text-sm mt-0.5 min-w-[20px]">
                      {i + 1}.
                    </span>
                    <div>
                      <span className="text-zinc-200 font-medium text-sm">{item.pr}</span>
                      <p className="text-zinc-500 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* El PR template */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Shield className="w-6 h-6 text-purple-400" />
              El PR template que usamos en Think Better
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Un buen PR template reduce el tiempo de review en un 40% porque el autor ya hizo
              parte del trabajo del reviewer. Este es el template que usamos en todos nuestros
              proyectos SaaS:
            </p>

            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden mb-6">
              <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800/50 border-b border-zinc-700">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                <span className="text-zinc-400 text-xs ml-2">.github/pull_request_template.md</span>
              </div>
              <pre className="p-5 text-sm text-emerald-300 overflow-x-auto leading-relaxed font-mono whitespace-pre">{`## ¿Qué hace este PR?
<!-- Una frase. Si no puedes resumirlo en una frase, divide el PR. -->

## Tipo de cambio
- [ ] Bug fix
- [ ] Nueva feature
- [ ] Refactoring (sin cambios de comportamiento)
- [ ] Cambio de configuración / infra
- [ ] Documentación

## Cambios incluidos
<!-- Lista los archivos o módulos principales que cambian -->

## Cómo testear
<!-- Pasos exactos para verificar que funciona -->
1.
2.
3.

## Screenshots / Videos (si hay UI)
<!-- Arrastrar imagen aquí -->

## Checklist del autor
- [ ] He probado esto en local
- [ ] He añadido/actualizado tests
- [ ] No hay console.log ni código comentado
- [ ] No expone secrets ni datos sensibles
- [ ] He revisado los tipos TypeScript

## Notas para el reviewer
<!-- Contexto, decisiones de diseño, trade-offs -->

## Issues relacionados
Fixes #`}</pre>
            </div>
          </section>

          {/* Checklist del reviewer */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              Checklist del reviewer: qué buscar en cada PR
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              El review efectivo no es leer línea por línea de arriba a abajo. Hay un orden
              óptimo que permite encontrar el 80% de los problemas en el 20% del tiempo:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                {
                  phase: '1. Contexto (2 min)',
                  icon: <Clock className="w-4 h-4" />,
                  items: [
                    '¿El PR template está completo?',
                    '¿El título describe el cambio?',
                    '¿El tamaño es reviewable (< 400 líneas)?',
                    '¿Los tests de CI pasan?',
                  ],
                  color: 'zinc',
                },
                {
                  phase: '2. Arquitectura (5 min)',
                  icon: <Shield className="w-4 h-4" />,
                  items: [
                    '¿El cambio está en el lugar correcto del codebase?',
                    '¿Se introducen dependencias innecesarias?',
                    '¿Se duplica lógica ya existente?',
                    '¿Los tipos TypeScript son correctos y completos?',
                  ],
                  color: 'purple',
                },
                {
                  phase: '3. Seguridad (5 min)',
                  icon: <AlertTriangle className="w-4 h-4" />,
                  items: [
                    '¿Hay validación de inputs del usuario?',
                    '¿Los endpoints están protegidos por auth?',
                    '¿Hay RLS en las queries de Supabase?',
                    '¿Se expone información sensible en logs o responses?',
                  ],
                  color: 'red',
                },
                {
                  phase: '4. Lógica y edge cases (8 min)',
                  icon: <Code2 className="w-4 h-4" />,
                  items: [
                    '¿El happy path funciona según el template?',
                    '¿Se manejan los errores y estados vacíos?',
                    '¿Qué pasa con usuarios sin permisos?',
                    '¿Los tests cubren los edge cases críticos?',
                  ],
                  color: 'cyan',
                },
              ].map((phase) => (
                <div
                  key={phase.phase}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"
                >
                  <h3
                    className={`font-semibold mb-3 flex items-center gap-2 ${
                      phase.color === 'purple'
                        ? 'text-purple-400'
                        : phase.color === 'red'
                        ? 'text-red-400'
                        : phase.color === 'cyan'
                        ? 'text-cyan-400'
                        : 'text-emerald-400'
                    }`}
                  >
                    {phase.icon}
                    {phase.phase}
                  </h3>
                  <ul className="space-y-2">
                    {phase.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-zinc-400 text-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-zinc-600 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Tipos de comentarios */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Users className="w-6 h-6 text-yellow-400" />
              Cómo dar feedback sin generar conflictos
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              El 60% de la fricción en el code review no es técnica — es de comunicación. Un
              comentario mal redactado puede bloquear un PR durante días o crear tensión en el
              equipo. La solución es un sistema de prefijos que aclara la intención del comentario:
            </p>

            <div className="overflow-x-auto rounded-2xl border border-zinc-800 mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/50">
                    <th className="text-left p-4 text-zinc-300 font-semibold">Prefijo</th>
                    <th className="text-left p-4 text-zinc-300 font-semibold">Significado</th>
                    <th className="text-left p-4 text-zinc-300 font-semibold">¿Bloquea merge?</th>
                    <th className="text-left p-4 text-zinc-300 font-semibold">Ejemplo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {[
                    {
                      prefix: '[blocking]',
                      meaning: 'Debe resolverse antes de mergear',
                      blocks: 'Sí',
                      example: '[blocking] Esta query no tiene RLS — expone datos de otros usuarios',
                      color: 'red',
                    },
                    {
                      prefix: '[question]',
                      meaning: 'Tengo dudas, puede ser bug o malentendido',
                      blocks: 'Depende',
                      example: '[question] ¿Por qué usas useEffect aquí en vez de useMemo?',
                      color: 'yellow',
                    },
                    {
                      prefix: '[suggestion]',
                      meaning: 'Mejora no bloqueante, decisión del autor',
                      blocks: 'No',
                      example: '[suggestion] Podríamos extraer esto a un hook para reutilizarlo',
                      color: 'cyan',
                    },
                    {
                      prefix: '[nit]',
                      meaning: 'Detalle menor de estilo o nomenclatura',
                      blocks: 'No',
                      example: '[nit] Esta variable quedaría más clara como `isLoading`',
                      color: 'zinc',
                    },
                    {
                      prefix: '[praise]',
                      meaning: 'Feedback positivo — reconocer buen trabajo',
                      blocks: 'No',
                      example: '[praise] Muy buena abstracción, esto simplifica mucho el código',
                      color: 'emerald',
                    },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-zinc-900/30 transition-colors">
                      <td className="p-4">
                        <code
                          className={`font-mono text-xs px-2 py-1 rounded ${
                            row.color === 'red'
                              ? 'bg-red-500/10 text-red-400'
                              : row.color === 'yellow'
                              ? 'bg-yellow-500/10 text-yellow-400'
                              : row.color === 'cyan'
                              ? 'bg-cyan-500/10 text-cyan-400'
                              : row.color === 'emerald'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : 'bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          {row.prefix}
                        </code>
                      </td>
                      <td className="p-4 text-zinc-400">{row.meaning}</td>
                      <td className="p-4">
                        {row.blocks === 'Sí' ? (
                          <span className="text-red-400 text-xs font-medium">Sí</span>
                        ) : row.blocks === 'No' ? (
                          <span className="text-emerald-400 text-xs font-medium">No</span>
                        ) : (
                          <span className="text-yellow-400 text-xs font-medium">Depende</span>
                        )}
                      </td>
                      <td className="p-4 text-zinc-500 text-xs">{row.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Automatización */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Zap className="w-6 h-6 text-emerald-400" />
              Qué automatizar para que el review sea más rápido
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              El objetivo de la automatización es eliminar las revisiones mecánicas y dejar al
              reviewer humano solo lo que requiere criterio. Todo lo que una máquina puede verificar,
              no debe ocupar tiempo de review.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                {
                  tool: 'TypeScript strict mode',
                  what: 'Detecta errores de tipos en compilación',
                  when: 'En cada commit (pre-commit hook)',
                  effort: 'Bajo',
                },
                {
                  tool: 'ESLint + Prettier',
                  what: 'Estilo consistente, sin debates de formatting',
                  when: 'Pre-commit hook + CI',
                  effort: 'Bajo',
                },
                {
                  tool: 'Vitest / Jest',
                  what: 'Tests unitarios en CI, bloquea merge si fallan',
                  when: 'En cada PR (GitHub Actions)',
                  effort: 'Medio',
                },
                {
                  tool: 'Playwright E2E',
                  what: 'Flujos críticos verificados automáticamente',
                  when: 'En cada PR contra staging',
                  effort: 'Medio',
                },
                {
                  tool: 'Danger.js / GitHub Actions',
                  what: 'Avisos automáticos: PR demasiado grande, sin tests, sin descripción',
                  when: 'En cada PR',
                  effort: 'Bajo',
                },
                {
                  tool: 'Dependabot / Renovate',
                  what: 'PRs automáticos para actualizar dependencias',
                  when: 'Semanal',
                  effort: 'Bajo',
                },
              ].map((item, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-emerald-400 font-semibold text-sm">{item.tool}</span>
                    <span className="text-zinc-600 text-xs bg-zinc-800 px-2 py-0.5 rounded-full">
                      {item.effort}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-sm mb-1">{item.what}</p>
                  <p className="text-zinc-600 text-xs">⏰ {item.when}</p>
                </div>
              ))}
            </div>

            {/* GitHub Actions snippet */}
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden mb-6">
              <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800/50 border-b border-zinc-700">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                <span className="text-zinc-400 text-xs ml-2">.github/workflows/pr-checks.yml</span>
              </div>
              <pre className="p-5 text-sm text-emerald-300 overflow-x-auto leading-relaxed font-mono whitespace-pre">{`name: PR Checks
on:
  pull_request:
    branches: [main, develop]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: 'npm' }
      - run: npm ci

      # Bloquea merge si fallan
      - name: Type check
        run: npm run lint

      - name: Unit tests
        run: npm run test -- --coverage

      - name: Build check
        run: npm run build

  pr-size-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - name: Check PR size
        run: |
          CHANGED=$(git diff --stat origin/main...HEAD | tail -1)
          LINES=$(echo $CHANGED | grep -oP '\\d+ insertion' | grep -oP '\\d+')
          if [ "$LINES" -gt 400 ]; then
            echo "PR has $LINES insertions (max: 400). Please split it."
            exit 1
          fi`}</pre>
            </div>
          </section>

          {/* Errores críticos */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              6 errores críticos de code review (y cómo evitarlos)
            </h2>

            <div className="space-y-4">
              {[
                {
                  error: 'Aprobar sin leer',
                  description:
                    'El reviewer aprueba por presión social o para desbloquear al equipo. Es peor que no hacer review.',
                  fix: 'Si no tienes tiempo de revisar bien, di "ahora no puedo" en vez de aprobar vacío. Mejor retrasar 2 horas que mergear código inseguro.',
                },
                {
                  error: 'Revisar solo el diff, no el contexto',
                  description:
                    'Un cambio puede ser correcto en aislamiento pero introducir un bug cuando se combina con código existente.',
                  fix: 'Siempre ejecuta el código en local antes de aprobar. Lee los archivos relacionados, no solo el diff.',
                },
                {
                  error: 'Usar el review para refactorizar',
                  description:
                    'El reviewer pide cambios de arquitectura que van más allá del scope del PR. Esto bloquea indefinidamente.',
                  fix: 'Si el cambio es válido pero va más allá del scope, abre un issue para el refactoring. No bloquees el PR actual.',
                },
                {
                  error: 'No dar contexto en los comentarios de rechazo',
                  description:
                    '"Esto está mal" sin explicar por qué obliga al autor a adivinar qué cambiar.',
                  fix: 'Siempre explica el porqué y, si es posible, sugiere cómo arreglarlo. Un comentario con solución se resuelve 3× más rápido.',
                },
                {
                  error: 'No aprobar por miedo a ser responsable de un bug',
                  description:
                    'Reviews interminables porque el reviewer no quiere "firmar" código que podría fallar.',
                  fix: 'El review no transfiere responsabilidad. El objetivo es encontrar bugs, no garantizar que no existan. Con CI y tests, la red de seguridad es la automatización.',
                },
                {
                  error: 'No revisar los tests',
                  description:
                    'Se revisa el código de producción pero se ignoran los tests. Un test mal escrito da falsa seguridad.',
                  fix: 'Los tests son código de primera clase. Revisa que testean el comportamiento real, no solo que "el test pasa".',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                      <span className="text-red-400 font-semibold text-sm">Error #{i + 1}: {item.error}</span>
                    </div>
                    <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span className="text-emerald-400 font-semibold text-sm">Cómo evitarlo</span>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed">{item.fix}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Caso real */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-yellow-400" />
              Caso real: de 4 bugs/semana en producción a 1.3
            </h2>

            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-700 rounded-3xl p-8 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-1">
                  <span className="text-emerald-400 text-xs font-mono font-bold">CASO REAL</span>
                </div>
                <span className="text-zinc-400 text-sm">StartupSaaS · 6 devs · Stack React + Supabase</span>
              </div>

              <p className="text-zinc-300 leading-relaxed mb-6">
                Un equipo de 6 desarrolladores que llevaba 18 meses sin un proceso de code review
                definido. Aprobaban PRs por Slack ("echa un vistazo a esto"), no tenían PR template
                ni checklists. Resultado: 4 bugs críticos en producción por semana, y el equipo
                invertía el 35% del tiempo en hotfixes.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Bugs/semana', before: '4.1', after: '1.3', unit: '' },
                  { label: 'Tiempo en hotfixes', before: '35%', after: '11%', unit: '' },
                  { label: 'Tiempo de review por PR', before: '47 min', after: '18 min', unit: '' },
                  { label: 'PRs mergeados/semana', before: '8', after: '19', unit: '' },
                ].map((metric) => (
                  <div key={metric.label} className="bg-zinc-800/50 rounded-xl p-3 text-center">
                    <div className="text-zinc-500 text-xs mb-2">{metric.label}</div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-red-400 text-sm font-mono">{metric.before}</span>
                      <ArrowRight className="w-3 h-3 text-zinc-600" />
                      <span className="text-emerald-400 text-sm font-mono font-bold">{metric.after}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-zinc-800 pt-4">
                <p className="text-zinc-500 text-sm font-semibold mb-2">Qué implementaron (en este orden):</p>
                <ol className="space-y-1.5">
                  {[
                    'Semana 1: PR template obligatorio + prefijos de comentarios ([blocking]/[suggestion]/[nit])',
                    'Semana 2: Regla de tamaño máximo 400 líneas + bloqueo automático en CI',
                    'Semana 3: Checklist del reviewer + rotación automática de reviewers con GitHub Actions',
                    'Semana 4: SLA de 4h para reviews + dashboard de métricas de review en Slack',
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-zinc-400 text-sm">
                      <span className="text-emerald-400 font-mono text-xs mt-0.5">{i + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* Árbol de decisión */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              ¿Qué necesitas implementar primero?
            </h2>
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
              <div className="space-y-4">
                {[
                  {
                    q: '¿Tienes más de 2 bugs en producción por semana?',
                    a: 'Empieza por el PR template + checklist del reviewer. Impacto inmediato.',
                    icon: '🔴',
                  },
                  {
                    q: '¿Los PRs tardan más de 24h en ser revisados?',
                    a: 'Define un SLA de 4h y rotación de reviewers. El cuello de botella es organizativo, no técnico.',
                    icon: '🟡',
                  },
                  {
                    q: '¿Los reviews consumen mucho tiempo en debates de estilo?',
                    a: 'Implementa ESLint + Prettier con pre-commit hook. Los debates de estilo desaparecen en 1 día.',
                    icon: '🟡',
                  },
                  {
                    q: '¿Tienes tests pero los bugs escapan igualmente?',
                    a: 'Revisa que los tests testean comportamiento real. Añade tests de edge cases en el checklist de review.',
                    icon: '🟢',
                  },
                  {
                    q: '¿El proceso ya funciona pero quieres escalarlo?',
                    a: 'Automatiza métricas: tiempo de review, tamaño de PR, tasa de bugs. Lo que no se mide no mejora.',
                    icon: '🟢',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-zinc-800/30 rounded-xl">
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-zinc-200 font-medium text-sm mb-1">{item.q}</p>
                      <p className="text-zinc-500 text-sm">{item.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Checklist final */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Checklist: implementa code review en tu equipo en 4 semanas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Semana 1: Fundamentos',
                  items: [
                    'Crea .github/pull_request_template.md',
                    'Define prefijos de comentarios ([blocking]/[suggestion]/[nit]/[praise])',
                    'Acuerda SLA de review: máx. 4h en horario laboral',
                    'Regla: un PR = un cambio atómico',
                  ],
                },
                {
                  title: 'Semana 2: Automatización',
                  items: [
                    'ESLint + Prettier con pre-commit hook (husky + lint-staged)',
                    'GitHub Actions: type-check + tests en cada PR',
                    'Bloqueo automático de PRs > 400 líneas',
                    'Branch protection: require 1 approval + CI verde',
                  ],
                },
                {
                  title: 'Semana 3: Checklist de reviewer',
                  items: [
                    'Contexto (2 min): template completo, CI pasa',
                    'Arquitectura (5 min): lugar correcto, no duplicados',
                    'Seguridad (5 min): validación, auth, RLS',
                    'Lógica y edge cases (8 min): error handling, tests',
                  ],
                },
                {
                  title: 'Semana 4: Métricas y mejora',
                  items: [
                    'Dashboard de tiempo medio de review por PR',
                    'Seguimiento de bugs en producción por semana',
                    'Retrospectiva mensual: ¿qué bugs escaparon? ¿por qué?',
                    'Rotación de reviewers para distribuir conocimiento',
                  ],
                },
              ].map((week) => (
                <div key={week.title} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                  <h3 className="text-emerald-400 font-semibold mb-3">{week.title}</h3>
                  <ul className="space-y-2">
                    {week.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-zinc-400 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500/60 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-3xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              ¿Quieres un codebase con estos estándares desde el día 1?
            </h2>
            <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
              En Think Better entregamos proyectos con PR templates, CI/CD configurado, checklist de
              review y branch protection ya implementados. Código de producción desde el primer
              commit.
            </p>
            <Link
              to="/cuestionario"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-6 py-3 rounded-full transition-colors"
            >
              Empieza tu proyecto
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}

