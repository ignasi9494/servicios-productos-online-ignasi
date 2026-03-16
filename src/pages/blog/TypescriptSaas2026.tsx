import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Code2,
  Zap,
  Shield,
  TrendingUp,
  BookOpen,
  Terminal,
} from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePageMeta } from '../../hooks/usePageMeta';

export function TypescriptSaas2026() {
  usePageTitle('TypeScript en 2026: por qué es imprescindible para SaaS y cómo empezar — Think Better');
  usePageMeta(
    'TypeScript vs JavaScript para SaaS en 2026. Por qué el 78% de los proyectos profesionales usan TypeScript, cuándo compensa el coste de adoptarlo y guía práctica para empezar en menos de una semana.',
  );

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'TypeScript en 2026: por qué es imprescindible para SaaS y cómo empezar',
      description:
        'TypeScript vs JavaScript para proyectos SaaS en 2026. Ventajas reales, coste de adopción, errores frecuentes y guía paso a paso para empezar con TypeScript en un proyecto existente.',
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
          'https://servicios-productos-online-ignasi.vercel.app/blog/typescript-saas-2026',
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
            Calcular precio de mi proyecto
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Back */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-emerald-400 text-sm mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al blog
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 text-xs text-zinc-500 mb-4">
              <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">Tecnología</span>
              <span>16 mar 2026</span>
              <span>·</span>
              <span>11 min de lectura</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              TypeScript en 2026: por qué es imprescindible para SaaS y cómo empezar
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed">
              El debate JavaScript vs TypeScript está cerrado en el mundo profesional. El 78% de los proyectos
              de producción usan TypeScript hoy. Esta guía explica por qué, cuándo compensa el coste de
              adoptarlo y cómo migrar un proyecto existente en menos de una semana.
            </p>
          </div>

          {/* Key stat */}
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-12">
            <p className="text-emerald-400 font-semibold text-lg mb-1">Dato clave 2026</p>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Según el State of JS Survey 2025, el <strong className="text-white">78% de los desarrolladores
              profesionales</strong> usa TypeScript en producción. En proyectos con equipos de más de 3
              personas, ese porcentaje sube al <strong className="text-white">91%</strong>. No es una moda:
              es el estándar de la industria.
            </p>
          </div>

          <div className="article-body space-y-12">

            {/* Section 1 */}
            <section>
              <h2>El problema real de JavaScript en proyectos SaaS</h2>
              <p>
                JavaScript es un lenguaje dinámico diseñado en los 90 para scripts de páginas web sencillas.
                En 2026, lo usamos para construir plataformas con millones de usuarios, lógica de negocio
                compleja y equipos de 5-50 desarrolladores. La fricción es inevitable.
              </p>
              <p>
                Cuando construimos un SaaS en JavaScript puro, los errores más costosos no son errores
                de lógica —esos los detectamos en las pruebas. Son errores de <strong>tipo</strong>: pasar
                un string donde se esperaba un número, acceder a una propiedad que no existe en el objeto,
                llamar a una función con los argumentos en orden incorrecto. Estos errores son silenciosos
                en desarrollo y explotan en producción.
              </p>

              {/* Bug examples */}
              <div className="grid md:grid-cols-2 gap-4 my-8">
                <div className="p-5 rounded-xl bg-red-500/5 border border-red-500/20">
                  <div className="flex items-center gap-2 text-red-400 font-semibold text-sm mb-3">
                    <XCircle className="w-4 h-4" />
                    JavaScript — falla en producción
                  </div>
                  <pre className="text-xs text-zinc-400 leading-relaxed overflow-x-auto whitespace-pre-wrap">{`// getUser() puede devolver null
const user = getUser(id);
// TypeError en producción:
// Cannot read properties of null
sendEmail(user.email, template);`}</pre>
                </div>
                <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-3">
                    <CheckCircle2 className="w-4 h-4" />
                    TypeScript — error en compile time
                  </div>
                  <pre className="text-xs text-zinc-400 leading-relaxed overflow-x-auto whitespace-pre-wrap">{`const user = getUser(id);
// TS error antes de deployar:
// Object is possibly 'null'
if (user) {
  sendEmail(user.email, template);
}`}</pre>
                </div>
              </div>

              <p>
                La diferencia no es trivial. Un TypeError en producción puede interrumpir el servicio para
                todos los usuarios. Un error de TypeScript lo detectas en tu editor antes de escribir el
                siguiente caracter.
              </p>
            </section>

            {/* Section 2: Benefits */}
            <section>
              <h2>Las 5 ventajas reales de TypeScript para SaaS</h2>
              <p>
                No todas las ventajas de TypeScript son igual de importantes. Estas son las cinco que más
                impacto tienen en proyectos SaaS reales, ordenadas por valor práctico:
              </p>

              <div className="space-y-4 my-8">
                {[
                  {
                    icon: Shield,
                    color: 'emerald',
                    title: '1. Detección de errores antes de producción',
                    body: 'TypeScript convierte errores de runtime en errores de compilación. En proyectos medianos, esto elimina entre el 15% y el 38% de los bugs que llegarían a producción (datos del estudio de Airbnb sobre su migración). El ROI es inmediato.',
                  },
                  {
                    icon: Code2,
                    color: 'cyan',
                    title: '2. Autocompletado e IntelliSense brutal',
                    body: 'Con TypeScript, tu editor conoce la forma exacta de cada objeto, los métodos disponibles y los parámetros que espera cada función. El tiempo de desarrollo real disminuye porque buscas menos en la documentación. Para SaaS con APIs complejas (Stripe, Supabase, etc.), la diferencia es enorme.',
                  },
                  {
                    icon: BookOpen,
                    color: 'purple',
                    title: '3. El código se documenta solo',
                    body: 'Los tipos son documentación ejecutable. Una función con tipo User → Promise<Invoice> comunica exactamente qué espera y qué devuelve, sin necesidad de comentarios adicionales. Cuando un nuevo desarrollador entra al equipo, empieza a ser productivo mucho más rápido.',
                  },
                  {
                    icon: TrendingUp,
                    color: 'amber',
                    title: '4. Refactoring seguro a gran escala',
                    body: 'Cambiar el nombre de un campo en la base de datos o la firma de una función en JavaScript es arriesgado: puedes romper 40 sitios sin darte cuenta hasta que un cliente te lo reporta. Con TypeScript, el compilador te señala cada punto afectado instantáneamente.',
                  },
                  {
                    icon: Zap,
                    color: 'rose',
                    title: '5. Mejor colaboración en equipos',
                    body: 'En un equipo de 3+ personas, nadie recuerda el contrato exacto de cada función. TypeScript fuerza a definir ese contrato explícitamente. Las code reviews se centran en lógica de negocio en lugar de "¿este campo puede ser null aquí?"',
                  },
                ].map(({ icon: Icon, color, title, body }) => (
                  <div key={title} className={`p-5 rounded-xl bg-${color}-500/5 border border-${color}-500/20`}>
                    <div className={`flex items-start gap-3`}>
                      <Icon className={`w-5 h-5 text-${color}-400 mt-0.5 shrink-0`} />
                      <div>
                        <p className="font-semibold text-white mb-1">{title}</p>
                        <p className="text-zinc-400 text-sm leading-relaxed">{body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3: Comparison table */}
            <section>
              <h2>TypeScript vs JavaScript: tabla comparativa para equipos SaaS</h2>
              <p>
                La comparativa honesta. TypeScript no es perfecta en todos los contextos:
              </p>

              <div className="overflow-x-auto my-8 rounded-xl border border-zinc-800">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-800 bg-zinc-900">
                      <th className="text-left px-4 py-3 text-zinc-400 font-semibold">Dimensión</th>
                      <th className="text-left px-4 py-3 text-emerald-400 font-semibold">TypeScript</th>
                      <th className="text-left px-4 py-3 text-yellow-400 font-semibold">JavaScript</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {[
                      ['Curva de aprendizaje inicial', 'Moderada (1-2 semanas)', 'Nula'],
                      ['Detección de errores', 'Compile time + runtime', 'Solo runtime'],
                      ['Productividad (corto plazo)', 'Menor al principio', 'Alta desde el día 1'],
                      ['Productividad (largo plazo)', 'Mucho mayor', 'Decrece con tamaño'],
                      ['Mantenibilidad', 'Excelente', 'Compleja en proyectos grandes'],
                      ['Onboarding de nuevos devs', 'Rápido (tipos como docs)', 'Lento (necesita contexto)'],
                      ['Refactoring', 'Seguro y guiado', 'Arriesgado'],
                      ['Build time', '+2-10s (tsc)', 'Ninguno'],
                      ['Tamaño ideal del equipo', 'Cualquiera, especialmente 3+', 'Proyectos pequeños / solos'],
                      ['Adopción en industria 2026', '78% proyectos profesionales', '22% (suele ser legacy)'],
                    ].map(([dim, ts, js]) => (
                      <tr key={dim} className="hover:bg-zinc-900/50 transition-colors">
                        <td className="px-4 py-3 text-zinc-300 font-medium">{dim}</td>
                        <td className="px-4 py-3 text-zinc-400">{ts}</td>
                        <td className="px-4 py-3 text-zinc-400">{js}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-amber-400 mb-1">La trampa del corto plazo</p>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      La razón principal por la que equipos evitan TypeScript es el coste inicial. Es real:
                      los primeros días vas más lento mientras te acostumbras al sistema de tipos. Pero
                      en cualquier proyecto que dure más de 2 meses, el breakeven llega pronto y luego
                      TypeScript te ahorra más tiempo del que te costó.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: When NOT to use */}
            <section>
              <h2>¿Cuándo NO usar TypeScript?</h2>
              <p>
                Siendo honestos, hay casos en los que TypeScript añade más fricción que valor:
              </p>
              <ul>
                <li>
                  <strong>Scripts de un solo uso</strong>: un script que ejecutas una vez para migrar datos.
                  No merece la pena configurar TS para eso.
                </li>
                <li>
                  <strong>Prototipos de 24h</strong>: si estás validando si una idea técnica funciona en
                  un día, JavaScript puede ser más ágil.
                </li>
                <li>
                  <strong>Proyectos que ya funcionan bien en JS sin bugs</strong>: si tienes una base de código
                  JavaScript pequeña, estable y sin problemas de tipos, migrar solo por "modernizar" no
                  aporta ROI inmediato.
                </li>
              </ul>
              <p>
                Para cualquier SaaS que planeas mantener más de 3 meses, con un equipo de más de una persona,
                o con lógica de negocio no trivial: TypeScript es la elección correcta.
              </p>
            </section>

            {/* Section 5: Migration guide */}
            <section>
              <h2>Guía práctica: migrar un proyecto JavaScript a TypeScript en una semana</h2>
              <p>
                La migración gradual es la estrategia correcta. No necesitas convertir todo de golpe.
                TypeScript y JavaScript pueden coexistir en el mismo proyecto durante el proceso de
                migración.
              </p>

              <div className="space-y-4 my-8">
                {[
                  {
                    day: 'Día 1',
                    title: 'Configuración inicial',
                    steps: [
                      'npm install -D typescript @types/node',
                      'Crear tsconfig.json con allowJs: true y strict: false (empezamos suave)',
                      'Renombrar index.js a index.ts para probar que compila',
                      'Añadir "tsc --noEmit" al pipeline de CI',
                    ],
                  },
                  {
                    day: 'Día 2-3',
                    title: 'Tipos para las entidades principales',
                    steps: [
                      'Definir interfaces para los modelos de base de datos (User, Project, Invoice...)',
                      'Tipar las respuestas de las APIs externas (Stripe, Supabase, etc.)',
                      'Empezar por los módulos más usados: auth, database, payments',
                      'Usar "any" donde no estés seguro — ya lo refinarás después',
                    ],
                  },
                  {
                    day: 'Día 4-5',
                    title: 'Migrar ficheros críticos',
                    steps: [
                      'Convertir los archivos con más lógica de negocio de .js a .ts',
                      'Resolver los errores del compilador uno a uno',
                      'Reemplazar "any" por tipos concretos donde sea obvio',
                      'Añadir tipos de retorno a las funciones principales',
                    ],
                  },
                  {
                    day: 'Día 6-7',
                    title: 'Activar strict mode gradualmente',
                    steps: [
                      'Activar "noImplicitAny: true" y resolver los errores',
                      'Activar "strictNullChecks: true" — aquí es donde más bugs aparecen',
                      'Documentar los casos donde usas "as Type" (type assertions) para revisión futura',
                      'Actualizar el README con las convenciones de tipos del proyecto',
                    ],
                  },
                ].map(({ day, title, steps }) => (
                  <div key={day} className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-bold">
                        {day}
                      </span>
                      <p className="font-semibold text-white">{title}</p>
                    </div>
                    <ul className="space-y-1.5">
                      {steps.map((step) => (
                        <li key={step} className="flex items-start gap-2 text-sm text-zinc-400">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500/60 mt-0.5 shrink-0" />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 6: tsconfig essentials */}
            <section>
              <h2>tsconfig.json esencial para proyectos SaaS</h2>
              <p>
                La configuración de TypeScript que usamos en Think Better para proyectos React + Node/Deno:
              </p>

              <div className="my-8 rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/80">
                  <Terminal className="w-4 h-4 text-zinc-500" />
                  <span className="text-xs text-zinc-500 font-mono">tsconfig.json</span>
                </div>
                <pre className="p-5 text-xs text-zinc-400 leading-relaxed overflow-x-auto">{`{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",

    /* Strict mode — actívalo desde el inicio */
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,

    /* Calidad de código */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,

    /* Paths */
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },

    /* Output */
    "noEmit": true,  /* Vite/ESBuild se encarga del build */
    "isolatedModules": true,
    "allowImportingTsExtensions": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`}</pre>
              </div>

              <p>
                Los flags más importantes para un SaaS:
              </p>
              <ul>
                <li>
                  <code className="text-emerald-400 text-sm">strictNullChecks</code>: obliga a manejar
                  los casos en que un valor puede ser null o undefined. Elimina la mayoría de TypeErrors
                  en producción.
                </li>
                <li>
                  <code className="text-emerald-400 text-sm">noUncheckedIndexedAccess</code>: cuando accedes
                  a un array por índice, TypeScript te advierte que el resultado puede ser undefined.
                  Crítico para bucles con datos de base de datos.
                </li>
                <li>
                  <code className="text-emerald-400 text-sm">noUnusedLocals / noUnusedParameters</code>: mantiene
                  el código limpio automáticamente. Las variables no usadas son código muerto o bugs latentes.
                </li>
              </ul>
            </section>

            {/* Section 7: Real case study */}
            <section>
              <h2>Caso real: SaaS con 3.000 usuarios, migración de JS a TS en 8 días</h2>
              <p>
                Un cliente llegó a Think Better con una plataforma de gestión de logística construida
                en JavaScript puro. Tenían 3.200 usuarios activos, 47.000 líneas de código y un equipo
                de 4 desarrolladores. El problema: cada deploy de producción provocaba entre 2 y 5 bugs
                críticos detectados por usuarios.
              </p>

              <div className="grid md:grid-cols-3 gap-4 my-8">
                {[
                  { label: 'Líneas de código', value: '47.000', sub: 'en JavaScript puro' },
                  { label: 'Tiempo de migración', value: '8 días', sub: 'con el equipo existente' },
                  { label: 'Reducción de bugs', value: '-71%', sub: 'en los primeros 30 días' },
                ].map(({ label, value, sub }) => (
                  <div key={label} className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
                    <p className="text-3xl font-bold text-emerald-400 mb-1">{value}</p>
                    <p className="text-white font-semibold text-sm mb-1">{label}</p>
                    <p className="text-zinc-500 text-xs">{sub}</p>
                  </div>
                ))}
              </div>

              <p>
                El proceso fue gradual. Primero definimos los tipos de las 12 entidades principales de
                la base de datos. Luego migramos los módulos de autenticación y pagos, que concentraban
                el 60% de los bugs reportados. En 4 días, sin parar el desarrollo de features.
              </p>
              <p>
                Los días 5 al 8 migramos el resto del código y activamos <code className="text-emerald-400 text-sm">strict: true</code>.
                El compilador señaló 234 potenciales errores. De esos, 41 eran bugs reales que habrían
                llegado a producción en las próximas semanas. Los resolveríamos antes de que un usuario
                los descubriera.
              </p>
              <p>
                El equipo tardó aproximadamente 3 semanas en sentirse totalmente cómodo con TypeScript.
                A los 30 días, los bugs reportados por usuarios habían caído un 71%. A los 90 días,
                nadie quería volver a JavaScript.
              </p>
            </section>

            {/* Section 8: Common mistakes */}
            <section>
              <h2>Los 5 errores más frecuentes al empezar con TypeScript</h2>

              <div className="space-y-4 my-8">
                {[
                  {
                    error: 'Usar "any" en todas partes',
                    fix: 'any desactiva el sistema de tipos. Si usas any masivamente, tienes TypeScript sin sus ventajas. Usa "unknown" si no sabes el tipo y luego nárrowea, o "as Type" cuando estés seguro pero el compilador no.',
                  },
                  {
                    error: 'Empezar con strict: true en un proyecto grande',
                    fix: 'Si migras un proyecto existente grande, empieza con strict: false y activa los flags uno a uno. Empezar con strict en un proyecto grande genera cientos de errores que desmotivan al equipo.',
                  },
                  {
                    error: 'Definir tipos inline en lugar de interfaces reutilizables',
                    fix: 'function foo(user: { name: string; email: string }) es peor que crear interface User y usarla en todas partes. Los tipos centralizados facilitan los cambios globales.',
                  },
                  {
                    error: 'No tipar las respuestas de APIs externas',
                    fix: 'Si llamas a una API y guardas la respuesta como "any" o sin tipo, pierdes la mitad del valor de TypeScript. Usa los tipos que proveen las SDKs oficiales (Stripe tiene @stripe/stripe-js, Supabase tiene supabase-js con generación automática de tipos).',
                  },
                  {
                    error: 'Ignorar los errores con @ts-ignore',
                    fix: '@ts-ignore suprime un error pero no lo resuelve. Si usas muchos @ts-ignore, es señal de que el diseño de los tipos necesita revisión. Úsalo excepcionalmente, con un comentario explicativo.',
                  },
                ].map(({ error, fix }) => (
                  <div key={error} className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
                    <div className="flex items-start gap-3 mb-2">
                      <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      <p className="font-semibold text-red-400 text-sm">{error}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <p className="text-zinc-400 text-sm leading-relaxed">{fix}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 9: Decision tree */}
            <section>
              <h2>Árbol de decisión: ¿TypeScript o JavaScript?</h2>
              <p>
                Responde estas 4 preguntas para saber si TypeScript compensa en tu proyecto:
              </p>

              <div className="space-y-3 my-8">
                {[
                  {
                    q: '¿El proyecto durará más de 2 meses?',
                    yes: 'Continúa',
                    no: 'JavaScript puede ser suficiente',
                    color: 'zinc',
                  },
                  {
                    q: '¿Trabajan más de 2 personas en el código?',
                    yes: 'Continúa — TypeScript muy recomendado',
                    no: 'Continúa',
                    color: 'zinc',
                  },
                  {
                    q: '¿Hay lógica de negocio compleja (pagos, permisos, transformaciones de datos)?',
                    yes: 'Continúa — TypeScript casi obligatorio',
                    no: 'JavaScript puede ser suficiente',
                    color: 'zinc',
                  },
                  {
                    q: '¿Usas APIs externas (Stripe, Supabase, Auth0, etc.)?',
                    yes: 'TypeScript: usa los tipos de sus SDKs',
                    no: 'TypeScript igualmente recomendado',
                    color: 'zinc',
                  },
                ].map(({ q, yes, no }, i) => (
                  <div key={q} className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
                    <p className="text-white font-semibold mb-3">
                      <span className="text-emerald-400 mr-2">{i + 1}.</span>
                      {q}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">SÍ</span>
                        <span className="text-zinc-400 text-sm">{yes}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded bg-zinc-700 text-zinc-400 font-bold">NO</span>
                        <span className="text-zinc-400 text-sm">{no}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                <p className="text-emerald-400 font-semibold mb-2">Veredicto para SaaS en 2026</p>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Si estás construyendo un SaaS real —con usuarios, pagos, y equipo— TypeScript no es
                  opcional. El coste de adoptarlo es bajo (1-2 semanas de curva de aprendizaje) y el
                  beneficio es alto (menos bugs en producción, mejor mantenibilidad, onboarding más
                  rápido). En Think Better, todos nuestros proyectos se construyen con TypeScript en
                  strict mode desde el día 1.
                </p>
              </div>
            </section>

            {/* Checklist */}
            <section>
              <h2>Checklist: TypeScript para SaaS — 10 puntos clave</h2>
              <div className="grid md:grid-cols-2 gap-3 my-8">
                {[
                  'tsconfig.json con strict: true activado',
                  'Interfaces para todos los modelos de BD',
                  'Tipos de respuesta para todas las APIs externas',
                  'No usar "any" salvo casos muy justificados',
                  'Tipos de retorno explícitos en funciones críticas',
                  'Usar "unknown" en lugar de "any" para inputs externos',
                  'Generación automática de tipos desde el schema de BD (Supabase CLI)',
                  'ESLint con @typescript-eslint configurado',
                  'Pre-commit hook que ejecuta tsc --noEmit',
                  'CI/CD que falla si hay errores de TypeScript',
                ].map((item, i) => (
                  <div key={item} className="flex items-start gap-2.5 p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                    <div className="w-5 h-5 rounded border-2 border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-emerald-400 text-xs font-bold">{i + 1}</span>
                    </div>
                    <p className="text-zinc-300 text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* CTA */}
          <div className="mt-16 p-8 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
            <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wide mb-3">
              Think Better — Estudio AI-first en Barcelona
            </p>
            <h3 className="text-2xl font-bold text-white mb-3">
              ¿Quieres que construyamos tu SaaS con TypeScript desde el día 1?
            </h3>
            <p className="text-zinc-400 mb-6 text-sm">
              Todos nuestros proyectos usan TypeScript en strict mode, tests automatizados y CI/CD.
              Precio cerrado en 10 minutos.
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
          <div className="mt-10 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-zinc-500 hover:text-emerald-400 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Ver todos los artículos
            </Link>
          </div>
        </motion.div>
      </article>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 text-center text-zinc-600 text-sm">
        <p>
          © 2026 Think Better — Estudio AI-first de desarrollo de software en Barcelona
          {' · '}
          <Link to="/" className="hover:text-zinc-400 transition-colors">Inicio</Link>
          {' · '}
          <Link to="/privacidad" className="hover:text-zinc-400 transition-colors">Privacidad</Link>
        </p>
      </footer>
    </div>
  );
}
