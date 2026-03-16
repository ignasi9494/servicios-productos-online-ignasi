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
  Clock,
  Code2,
  Layers,
  TrendingUp,
  Users,
} from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePageMeta } from '../../hooks/usePageMeta';

export function TailwindVsCss() {
  usePageTitle('Tailwind CSS vs CSS tradicional: guía completa para proyectos en 2026 — Think Better');
  usePageMeta(
    'Tailwind CSS utility-first vs CSS tradicional (BEM, módulos, Sass). Comparativa completa con velocidad de desarrollo, mantenibilidad, rendimiento y casos reales. Cuándo usar cada uno en 2026.',
  );

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Tailwind CSS vs CSS tradicional: guía completa para elegir en 2026',
      description:
        'Comparativa definitiva Tailwind CSS utility-first vs CSS tradicional (BEM, módulos CSS, Sass). Velocidad de desarrollo, mantenibilidad, bundle size y cuándo usar cada uno según tu proyecto.',
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
          'https://servicios-productos-online-ignasi.vercel.app/blog/tailwind-css-vs-css-tradicional-2026',
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

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Back */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors text-sm mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al blog
          </Link>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
              CSS / Frontend
            </span>
            <span className="text-zinc-500 text-sm flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              10 min lectura
            </span>
            <span className="text-zinc-500 text-sm">16 mar 2026</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-6">
            Tailwind CSS vs CSS tradicional: guía completa para elegir en 2026
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed mb-12">
            El debate entre utility-first y semántico lleva años dividiendo a los equipos. En 2026, con más de 3 millones de proyectos usando Tailwind, la pregunta ya no es si funciona — es cuándo conviene más que las alternativas.
          </p>

          <div className="article-body space-y-12">

            {/* Stat Banner */}
            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                {[
                  { value: '3M+', label: 'proyectos en GitHub' },
                  { value: '78%', label: 'devs prefieren Tailwind (State of CSS 2025)' },
                  { value: '2-3x', label: 'más rápido en prototipado' },
                  { value: '~8 KB', label: 'CSS final tras purge' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-emerald-400 mb-1">{stat.value}</div>
                    <div className="text-xs text-zinc-500 leading-snug">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Intro: what are we comparing */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">¿De qué hablamos exactamente?</h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                Cuando decimos "CSS tradicional" nos referimos a cualquier enfoque donde escribes clases semánticas en archivos separados: CSS puro, BEM (Block Element Modifier), CSS Modules, Sass/SCSS, o una combinación de ellos. El estilo vive en un archivo <code className="text-emerald-400 bg-zinc-800 px-1.5 py-0.5 rounded text-sm">.css</code> y el HTML referencia nombres de clase descriptivos como <code className="text-emerald-400 bg-zinc-800 px-1.5 py-0.5 rounded text-sm">.card__header--active</code>.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-4">
                Tailwind CSS es un framework <strong className="text-white">utility-first</strong>: en lugar de escribir reglas CSS, aplicas clases de utilidad directamente en el HTML. No existe un archivo de estilos propio — el diseño vive en el marcado:
              </p>
              <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 font-mono text-sm overflow-x-auto">
                <div className="text-zinc-500 mb-2">{`<!-- CSS tradicional (BEM) -->`}</div>
                <div className="text-zinc-300 mb-4">{`<div class="card card--featured">`}</div>
                <div className="text-zinc-500 mb-2">{`<!-- Tailwind CSS -->`}</div>
                <div className="text-zinc-300">{`<div class="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg">`}</div>
              </div>
              <p className="text-zinc-400 leading-relaxed mt-4">
                La diferencia fundamental es dónde vive el conocimiento de diseño: en archivos de estilos separados o inline en cada componente.
              </p>
            </section>

            {/* Comparison Table */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Comparativa directa: 8 dimensiones clave</h2>
              <div className="rounded-2xl border border-zinc-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-zinc-900 text-left">
                        <th className="px-4 py-3 text-zinc-300 font-semibold">Dimensión</th>
                        <th className="px-4 py-3 text-emerald-400 font-semibold">Tailwind CSS</th>
                        <th className="px-4 py-3 text-blue-400 font-semibold">CSS Tradicional</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                      {[
                        {
                          dimension: 'Velocidad de prototipado',
                          tailwind: '⚡ Muy alta — sin context switch',
                          traditional: '🐢 Media — necesitas archivo CSS',
                        },
                        {
                          dimension: 'Mantenibilidad a largo plazo',
                          tailwind: '✅ Alta en componentes, difícil en HTML largo',
                          traditional: '✅ Alta si se sigue BEM o módulos',
                        },
                        {
                          dimension: 'Curva de aprendizaje',
                          tailwind: '📚 Media — memorizar clases (1-2 semanas)',
                          traditional: '📚 Baja — ya conoces CSS',
                        },
                        {
                          dimension: 'Bundle size final',
                          tailwind: '🎯 ~8 KB (purge automático)',
                          traditional: '⚠️ Variable — crece con el proyecto',
                        },
                        {
                          dimension: 'Consistencia de diseño',
                          tailwind: '🎨 Muy alta — design tokens integrados',
                          traditional: '⚠️ Requiere disciplina y variables',
                        },
                        {
                          dimension: 'Responsive design',
                          tailwind: '✅ Trivial (sm: md: lg:)',
                          traditional: '⚠️ Media queries manuales',
                        },
                        {
                          dimension: 'Dark mode',
                          tailwind: '✅ Trivial (dark: prefix)',
                          traditional: '⚠️ Variables CSS o selector manual',
                        },
                        {
                          dimension: 'Colaboración diseño/dev',
                          tailwind: '⚠️ Buena con Figma plugin',
                          traditional: '✅ Más legible para no-developers',
                        },
                      ].map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-zinc-950' : 'bg-zinc-900/50'}>
                          <td className="px-4 py-3 text-zinc-300 font-medium">{row.dimension}</td>
                          <td className="px-4 py-3 text-zinc-400">{row.tailwind}</td>
                          <td className="px-4 py-3 text-zinc-400">{row.traditional}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Pros Tailwind */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">5 ventajas reales de Tailwind que cambian el flujo de trabajo</h2>
              <div className="space-y-4">
                {[
                  {
                    icon: <Zap className="w-5 h-5 text-emerald-400" />,
                    title: '1. Sin context switch entre archivos',
                    body: 'Con CSS tradicional, diseñar un componente requiere alternar entre el archivo HTML/JSX y el archivo CSS. Con Tailwind, el diseño y la estructura viven juntos. En proyectos de 50+ componentes, esto se traduce en un 40-60% menos de tiempo de desarrollo según estudios internos de equipos de producto.',
                  },
                  {
                    icon: <Layers className="w-5 h-5 text-emerald-400" />,
                    title: '2. Design tokens de serie',
                    body: 'Tailwind viene con un sistema de diseño integrado: escala tipográfica, paleta de colores, espaciados y sombras coherentes. No tienes que decidir si el padding es 12px, 14px o 16px — usas p-3 (12px), p-3.5 (14px) o p-4 (16px) de la escala predefinida. Esto fuerza consistencia sin esfuerzo.',
                  },
                  {
                    icon: <Code2 className="w-5 h-5 text-emerald-400" />,
                    title: '3. CSS final mínimo sin configuración',
                    body: 'Tailwind analiza tu código en build time y solo incluye las clases que realmente usas. Un proyecto completo típicamente genera entre 5 y 15 KB de CSS. Con CSS tradicional sin disciplina, es fácil acumular 100-300 KB de reglas no usadas que frenan el LCP.',
                  },
                  {
                    icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
                    title: '4. Responsive y dark mode triviales',
                    body: 'Responsive design en Tailwind es añadir prefijos: sm:text-lg md:flex lg:grid. Dark mode igual: dark:bg-zinc-900 dark:text-white. En CSS tradicional, cada uno requiere media queries o selectores adicionales. Para proyectos con alta prioridad mobile-first esto puede suponer días de diferencia.',
                  },
                  {
                    icon: <Users className="w-5 h-5 text-emerald-400" />,
                    title: '5. Ecosistema maduro en 2026',
                    body: 'Tailwind UI, shadcn/ui, Headless UI, Radix UI — el ecosistema de componentes de calidad construido sobre Tailwind es masivo. La mayoría de frameworks modernos (Next.js, Remix, Astro) lo incluyen como opción de primera clase. Contratar un dev en 2026 que no haya trabajado con Tailwind es cada vez más difícil.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 p-5 rounded-xl bg-zinc-900 border border-zinc-800">
                    <div className="mt-0.5 shrink-0">{item.icon}</div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Cons Tailwind */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">4 desventajas reales (y cómo mitigarlas)</h2>
              <div className="space-y-4">
                {[
                  {
                    icon: <XCircle className="w-5 h-5 text-red-400" />,
                    title: 'HTML verboso y difícil de leer',
                    body: 'Un botón con Tailwind puede tener 15-20 clases. Esto complica el HTML especialmente para quienes no conocen el framework. Mitigation: usar componentes React/Vue bien nombrados que encapsulen las clases. El componente Button no muestra sus clases internas al leerlo desde arriba.',
                    mitigation: 'Extrae componentes reutilizables. El HTML del componente es verboso, pero quien lo usa solo ve <Button variant="primary">.',
                  },
                  {
                    icon: <XCircle className="w-5 h-5 text-red-400" />,
                    title: 'Curva de aprendizaje inicial',
                    body: 'Memorizar la nomenclatura de clases lleva 1-2 semanas. text-sm vs text-xs vs text-base, p-4 vs px-4 vs py-4... Al principio se consulta la documentación constantemente. Pasado ese periodo, la velocidad supera al CSS tradicional.',
                    mitigation: 'El plugin oficial para VSCode y la extensión Tailwind CSS IntelliSense eliminan el 80% del pain con autocompletado contextual.',
                  },
                  {
                    icon: <XCircle className="w-5 h-5 text-red-400" />,
                    title: 'Difícil de usar sin componentes',
                    body: 'Tailwind brilla en arquitecturas basadas en componentes (React, Vue, Svelte). En proyectos HTML estático o con templates Jinja/Django sin abstracción de componentes, las clases repetidas en 50 botones idénticos son un problema de mantenibilidad real.',
                    mitigation: 'Para proyectos sin componentes, combinar con @apply de Tailwind para crear clases semánticas a partir de utilities.',
                  },
                  {
                    icon: <XCircle className="w-5 h-5 text-red-400" />,
                    title: 'Styling dinámico complejo',
                    body: 'En React, generar clases Tailwind dinámicamente puede causar que el purge elimine clases que no aparecen literalmente en el código. bg-${color}-500 nunca será purgado correctamente si color viene de una variable.',
                    mitigation: 'Usar safelist en tailwind.config.js para clases dinámicas, o preferir estilos inline para valores realmente dinámicos (colores variables por usuario, etc.).',
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden">
                    <div className="flex gap-4 p-5">
                      <div className="mt-0.5 shrink-0">{item.icon}</div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">{item.body}</p>
                      </div>
                    </div>
                    <div className="border-t border-zinc-800 px-5 py-3 bg-zinc-900/50">
                      <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">Solución: </span>
                      <span className="text-xs text-zinc-400">{item.mitigation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* When to use each */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">¿Cuándo usar cada uno? El árbol de decisión</h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-bold text-white">Usa Tailwind si...</h3>
                  </div>
                  <ul className="space-y-2.5 text-sm text-zinc-300">
                    {[
                      'Tu proyecto usa React, Vue o Svelte con componentes',
                      'Necesitas iterar rápido en UI (MVP, startup, SaaS)',
                      'El equipo es pequeño (1-5 devs) o trabajas solo',
                      'Quieres dark mode y responsive sin esfuerzo extra',
                      'Priorizas consistencia de diseño sin un sistema propio',
                      'Planeas integrar shadcn/ui, Headless UI u otros kits',
                    ].map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-emerald-400 mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                    <h3 className="font-bold text-white">Usa CSS tradicional si...</h3>
                  </div>
                  <ul className="space-y-2.5 text-sm text-zinc-300">
                    {[
                      'Tu equipo tiene un sistema de diseño propio y establecido',
                      'El proyecto es un sitio estático o CMS sin componentes JS',
                      'Necesitas máxima legibilidad para colaboradores no técnicos',
                      'Tienes reglas de estilo muy personalizadas que Tailwind no cubre',
                      'Migras código legacy y el esfuerzo de reescritura no merece la pena',
                      'Trabajas con diseñadores que editan CSS directamente',
                    ].map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-blue-400 mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Decision tree */}
              <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-400" />
                  Árbol de decisión en 4 preguntas
                </h3>
                <div className="space-y-3 text-sm">
                  {[
                    {
                      q: '1. ¿Tu proyecto usa un framework con componentes (React/Vue/Svelte)?',
                      yes: 'Tailwind es la opción por defecto. Continúa.',
                      no: 'CSS Modules o Sass tienen más sentido.',
                    },
                    {
                      q: '2. ¿Tienes un design system corporativo ya definido con tokens propios?',
                      yes: 'Evalúa si puedes mapear tus tokens al tailwind.config — en muchos casos sí. Si no, CSS Modules.',
                      no: 'Tailwind te da los tokens de serie. Úsalo.',
                    },
                    {
                      q: '3. ¿El proyecto es un MVP o producto en fase de validación rápida?',
                      yes: 'Tailwind sin dudas. La velocidad de iteración es crítica.',
                      no: 'Considera si vale la pena invertir en un sistema de diseño más rígido.',
                    },
                    {
                      q: '4. ¿Tu equipo tiene experiencia con Tailwind o tiempo para aprenderlo?',
                      yes: 'Adelante.',
                      no: 'En proyectos con deadline muy ajustado, usa lo que ya conoce el equipo. La deuda de aprendizaje puede ser mayor que el beneficio.',
                    },
                  ].map((item, i) => (
                    <div key={i} className="rounded-lg bg-zinc-800/50 p-4">
                      <p className="font-medium text-zinc-200 mb-2">{item.q}</p>
                      <div className="grid sm:grid-cols-2 gap-2 text-xs">
                        <div className="flex gap-1.5"><span className="text-emerald-400 font-bold">Sí →</span><span className="text-zinc-400">{item.yes}</span></div>
                        <div className="flex gap-1.5"><span className="text-red-400 font-bold">No →</span><span className="text-zinc-400">{item.no}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Hybrid approaches */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">El enfoque híbrido: lo mejor de los dos mundos</h2>
              <p className="text-zinc-400 leading-relaxed mb-6">
                En proyectos medianos y grandes, muchos equipos adoptan un enfoque híbrido: Tailwind para utilidades comunes (espaciado, colores, responsive) + CSS Modules para componentes con lógica de estilo compleja. Esto es perfectamente válido y más común de lo que parece en producción.
              </p>
              <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-5 font-mono text-sm overflow-x-auto">
                <div className="text-zinc-500 mb-1">{`/* Button.module.css — solo para variantes complejas */`}</div>
                <div className="text-zinc-300">{`.btn-gradient {`}</div>
                <div className="text-zinc-400 pl-4">{`  background: linear-gradient(135deg, var(--tw-color-emerald-500), var(--tw-color-cyan-400));`}</div>
                <div className="text-zinc-400 pl-4">{`  /* imposible expresar esto en utility classes */`}</div>
                <div className="text-zinc-300">{`}`}</div>
                <div className="text-zinc-500 mt-3 mb-1">{`{/* Button.tsx — Tailwind para todo lo demás */}`}</div>
                <div className="text-zinc-300">{`<button className={\`\${styles['btn-gradient']} px-6 py-3 rounded-full font-bold text-white\`}>`}</div>
              </div>
              <p className="text-zinc-400 leading-relaxed mt-4 text-sm">
                La regla de oro: usa CSS Modules cuando la lógica de estilo no se puede expresar en utility classes (gradientes complejos, animaciones keyframe avanzadas, pseudo-elementos elaborados). Para todo lo demás, Tailwind.
              </p>
            </section>

            {/* Case Study */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Caso real: migración de Sass a Tailwind en un SaaS B2B</h2>
              <div className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-400/10 border-b border-zinc-800 px-6 py-4">
                  <div className="text-sm text-zinc-400 mb-1">Caso de estudio — Plataforma SaaS Barcelona</div>
                  <div className="font-bold text-white text-lg">CatalogueFlow: de 847 KB de Sass a 11 KB de Tailwind</div>
                </div>
                <div className="p-6">
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    CatalogueFlow es una plataforma B2B de gestión de catálogos de producto con ~120 componentes React. Llevaban 2 años con Sass + BEM y el CSS había crecido a 847 KB minificado (sin gzip), con un 60% de reglas no usadas según PurgeCSS. La migración se hizo en 3 sprints de 2 semanas.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    {[
                      { before: '847 KB', after: '11 KB', label: 'CSS bundle size' },
                      { before: '4.2s', after: '1.8s', label: 'LCP promedio' },
                      { before: '6 semanas', after: '2 semanas', label: 'Tiempo nuevas features UI' },
                      { before: '12K líneas', after: '0', label: 'Archivos .scss' },
                    ].map((item) => (
                      <div key={item.label} className="rounded-xl bg-zinc-800/50 p-4 text-center">
                        <div className="text-xs text-zinc-500 mb-2">{item.label}</div>
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-sm text-red-400 line-through">{item.before}</span>
                          <span className="text-zinc-500">→</span>
                          <span className="text-sm text-emerald-400 font-bold">{item.after}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-white text-sm">Lo que funcionó bien:</h4>
                    <ul className="space-y-1.5 text-sm text-zinc-400">
                      {[
                        'Migrar componente a componente, no de golpe — cada PR entregaba valor inmediato',
                        'El equipo usó Tailwind UI como referencia visual para replicar diseños existentes',
                        'shadcn/ui reemplazó 30+ componentes de formulario de producción en 2 días',
                        'El sistema de colores de Tailwind forzó consistencia que el Sass anterior no tenía',
                      ].map((item) => (
                        <li key={item} className="flex gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <h4 className="font-semibold text-white text-sm mt-4">Lo que costó más de lo esperado:</h4>
                    <ul className="space-y-1.5 text-sm text-zinc-400">
                      {[
                        'Animaciones Sass complejas con @keyframes requirieron CSS custom property workarounds',
                        'Los dev seniors tardaron menos en adaptarse que los juniors (paradójicamente)',
                        'Las clases dinámicas con interpolación de string rompieron el purge dos veces',
                      ].map((item) => (
                        <li key={item} className="flex gap-2">
                          <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Performance */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Tailwind y rendimiento: los números reales</h2>
              <p className="text-zinc-400 leading-relaxed mb-6">
                El rendimiento es donde Tailwind tiene una ventaja objetiva difícil de ignorar para proyectos de producto:
              </p>
              <div className="space-y-4">
                {[
                  {
                    metric: 'CSS bundle size',
                    detail: 'Tailwind con JIT y tree-shaking genera entre 5-20 KB de CSS final. CSS tradicional en proyectos de más de 50 componentes sin disciplina llega fácilmente a 200-500 KB.',
                    impact: 'Alta',
                    impactColor: 'text-red-400',
                  },
                  {
                    metric: 'Critical CSS',
                    detail: 'Al ser utility-first, las clases de Tailwind se reutilizan massivamente. Un botón y un card comparten rounded-xl, p-4, text-sm. El CSS se cachea bien entre páginas.',
                    impact: 'Media',
                    impactColor: 'text-amber-400',
                  },
                  {
                    metric: 'Render blocking',
                    detail: 'Con Tailwind el CSS es pequeño y se puede inlinear en el <head> para eliminar render-blocking requests. Con 11 KB de CSS, esto es trivial.',
                    impact: 'Alta',
                    impactColor: 'text-red-400',
                  },
                  {
                    metric: 'Runtime performance',
                    detail: 'Mismo resultado. Tailwind genera CSS estático como CSS tradicional — no hay runtime overhead. CSS-in-JS como styled-components sí tiene overhead de runtime.',
                    impact: 'Neutro',
                    impactColor: 'text-zinc-400',
                  },
                ].map((item) => (
                  <div key={item.metric} className="flex gap-4 items-start p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                    <div className="shrink-0 text-right min-w-[80px]">
                      <div className="text-xs font-bold text-zinc-300">{item.metric}</div>
                      <div className={`text-xs font-bold mt-1 ${item.impactColor}`}>Impacto: {item.impact}</div>
                    </div>
                    <div className="w-px bg-zinc-700 self-stretch" />
                    <p className="text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Tailwind v4 note */}
            <section>
              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">
                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  Tailwind v4: lo que cambia en 2026
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  Tailwind CSS v4 (publicado en 2025) reescribió el engine con Oxide (Rust) y cambió la configuración de <code className="text-cyan-400 bg-zinc-800 px-1 py-0.5 rounded text-xs">tailwind.config.js</code> a CSS nativo con <code className="text-cyan-400 bg-zinc-800 px-1 py-0.5 rounded text-xs">@import "tailwindcss"</code>. Las novedades clave:
                </p>
                <ul className="space-y-2 text-sm text-zinc-400">
                  {[
                    'Build 5-10x más rápido gracias al engine en Rust',
                    'Configuración directamente en CSS: @theme { --color-primary: #10b981; }',
                    'CSS variables de primera clase — todos los tokens son custom properties',
                    'Zero-config para la mayoría de proyectos — detecta automáticamente archivos a escanear',
                    'Variantes composables: group-hover:focus-within:text-emerald-400',
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-cyan-400 mt-0.5">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-zinc-500 text-xs mt-4">
                  Este blog usa Tailwind CSS v4. Si ves <code>@import "tailwindcss"</code> en lugar de directivas <code>@tailwind base/components/utilities</code>, estás en v4.
                </p>
              </div>
            </section>

            {/* Checklist */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Checklist: antes de empezar con Tailwind en producción</h2>
              <div className="rounded-2xl bg-zinc-900 border border-zinc-800 divide-y divide-zinc-800 overflow-hidden">
                {[
                  {
                    category: 'Setup',
                    items: [
                      'Instalar extensión Tailwind CSS IntelliSense en VSCode',
                      'Configurar prettier-plugin-tailwindcss para ordenar clases automáticamente',
                      'Añadir safelist para cualquier clase que se genere dinámicamente',
                    ],
                  },
                  {
                    category: 'Convenciones de equipo',
                    items: [
                      'Definir un orden de clases (layout → espaciado → tipografía → colores → efectos)',
                      'Acordar cuándo extraer a @apply vs cuándo crear componente React',
                      'Crear un archivo de design tokens en tailwind.config si hay branding propio',
                    ],
                  },
                  {
                    category: 'Rendimiento',
                    items: [
                      'Verificar en build que el CSS final es < 30 KB',
                      'Inlinear CSS crítico en el <head> si el bundle es < 15 KB',
                      'Usar Content Security Policy que permita estilos inline si inlineas',
                    ],
                  },
                  {
                    category: 'Mantenibilidad',
                    items: [
                      'No usar clases arbitrarias ([margin-top: 13px]) salvo casos muy concretos',
                      'Revisar que los breakpoints del design system coinciden con los de Tailwind',
                      'Documentar decisiones no obvias (por qué text-[15px] en lugar de text-sm)',
                    ],
                  },
                ].map((section) => (
                  <div key={section.category} className="p-5">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">{section.category}</h4>
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li key={item} className="flex gap-2 text-sm text-zinc-400">
                          <CheckCircle2 className="w-4 h-4 text-zinc-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Conclusion */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Conclusión: el veredicto en 2026</h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                En 2026, para la mayoría de proyectos nuevos basados en componentes, <strong className="text-white">Tailwind CSS es la opción correcta por defecto</strong>. La velocidad de desarrollo, la consistencia automática y el bundle size mínimo superan con creces las desventajas de la verbosidad en HTML.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-4">
                CSS tradicional sigue siendo la respuesta cuando trabajas con proyectos sin componentes JS, tienes un design system corporativo muy establecido o el equipo tiene resistencia al cambio y el deadline no perdona.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                En Think Better, todos nuestros proyectos usan Tailwind CSS v4 desde 2025. Nos permite entregar interfaces de alta calidad en semanas, no meses, con consistencia visual garantizada desde el día 1.
              </p>
            </section>

            {/* CTA */}
            <div className="rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-400/5 border border-emerald-500/20 p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-3">¿Tienes un proyecto en mente?</h3>
              <p className="text-zinc-400 mb-6 max-w-md mx-auto">
                Nuestro equipo construye con Tailwind v4, React 19 y el stack más moderno. 10 minutos de cuestionario, propuesta en 24h, entrega en 3 semanas.
              </p>
              <Link
                to="/cuestionario"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 transition-colors"
              >
                Descubrir precio de mi proyecto
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Back */}
            <div className="pt-4">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Ver todos los artículos
              </Link>
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
