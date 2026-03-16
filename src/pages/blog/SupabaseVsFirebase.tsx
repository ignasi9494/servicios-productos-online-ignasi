import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Database,
  Shield,
  Zap,
  Globe,
  TrendingUp,
} from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePageMeta } from '../../hooks/usePageMeta';

export function SupabaseVsFirebase() {
  usePageTitle('Supabase vs Firebase para startups en 2026: comparativa completa — Think Better');
  usePageMeta(
    'Supabase vs Firebase: comparativa completa para startups en 2026. SQL vs NoSQL, precios, auth, tiempo real, GDPR y cuándo usar cada uno. Basado en +30 proyectos SaaS reales.',
  );

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Supabase vs Firebase para startups en 2026: comparativa completa con casos reales',
      description:
        'Supabase vs Firebase: comparativa completa para startups en 2026. SQL vs NoSQL, precios, auth, tiempo real, GDPR y cuándo usar cada uno. Basado en +30 proyectos SaaS reales.',
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
          'https://servicios-productos-online-ignasi.vercel.app/blog/supabase-vs-firebase-startups-2026',
      },
    };
    const script = document.createElement('script');
    script.id = 'article-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      document.getElementById('article-schema')?.remove();
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

      <article className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
        {/* Back link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al blog
        </Link>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 text-xs text-zinc-500 mb-4">
            <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">Infraestructura</span>
            <span>·</span>
            <span>16 mar 2026</span>
            <span>·</span>
            <span>9 min de lectura</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            Supabase vs Firebase para startups en 2026: comparativa completa con casos reales
          </h1>
          <p className="text-zinc-400 text-xl leading-relaxed">
            Hemos construido +30 SaaS con ambas plataformas. Esta es la guía honesta que nos hubiera
            ahorrado meses de trabajo — con precios reales, casos de uso y el árbol de decisión que
            usamos con cada cliente.
          </p>
        </motion.header>

        {/* TL;DR */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-10"
        >
          <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">TL;DR</p>
          <ul className="space-y-2 text-zinc-300 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <span><strong className="text-white">Supabase</strong> = PostgreSQL gestionado + auth + storage + edge functions. SQL, open-source, GDPR-ready con región EU. Ideal para SaaS con datos relacionales.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <span><strong className="text-white">Firebase</strong> = NoSQL (Firestore) + auth + storage + Functions. Ecosistema Google maduro. Ideal para apps móviles y proyectos con datos no estructurados.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <span>En 2026 <strong className="text-white">Supabase es el stack por defecto para SaaS B2B en España</strong> por GDPR, SQL y ausencia de vendor lock-in.</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
              <span>Firebase sigue siendo mejor para apps Android/iOS nativas y proyectos donde la escalabilidad automática sin gestión es prioritaria.</span>
            </li>
          </ul>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-invert prose-zinc max-w-none"
        >
          <p className="text-zinc-300 text-lg leading-relaxed">
            En Think Better llevamos desde 2023 construyendo SaaS para startups y pymes españolas. En ese
            tiempo hemos usado ambas plataformas en producción, hemos migrado proyectos de Firebase a
            Supabase (y viceversa) y hemos visto cómo la elección de backend puede acelerar o bloquear
            un lanzamiento.
          </p>
          <p className="text-zinc-300 leading-relaxed">
            Esta guía no es una comparativa de marketing. Es la documentación interna que hemos convertido
            en artículo para que cualquier founder pueda tomar la decisión correcta en 15 minutos.
          </p>

          {/* Section 1: Qué son */}
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Qué son exactamente (sin rodeos)</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Database className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="font-bold text-white text-base">Supabase</h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Alternativa open-source a Firebase. Backend-as-a-Service construido sobre PostgreSQL.
                Fundada en 2020, financiada con $116M. Servidores en EU (Frankfurt). Tu base de datos
                es Postgres estándar — puedes migrarla a cualquier sitio en cualquier momento.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {['PostgreSQL', 'Open-source', 'EU servers', 'REST + GraphQL'].map(tag => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">{tag}</span>
                ))}
              </div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-amber-400" />
                </div>
                <h3 className="font-bold text-white text-base">Firebase</h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                BaaS de Google, lanzado en 2011 y adquirido en 2014. Usa Firestore (NoSQL) como base
                de datos principal. Ecosistema maduro, excelente integración con el stack Android/iOS.
                Datos residen en servidores de Google (EE.UU. por defecto, EU disponible en plan Blaze).
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {['NoSQL', 'Google Cloud', 'Android/iOS nativo', 'Tiempo real'].map(tag => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Comparativa */}
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Comparativa feature por feature</h2>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-3 pr-4 text-zinc-500 font-medium">Feature</th>
                  <th className="text-left py-3 px-4 text-emerald-400 font-medium">Supabase</th>
                  <th className="text-left py-3 pl-4 text-amber-400 font-medium">Firebase</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {[
                  ['Base de datos', 'PostgreSQL (relacional, SQL)', 'Firestore (NoSQL, documentos)'],
                  ['Tiempo real', 'Realtime (WebSockets, Row-Level)', 'Firestore listeners (excelente)'],
                  ['Autenticación', 'Auth completo (email, OAuth, magic link)', 'Firebase Auth (email, OAuth, phone)'],
                  ['Storage', 'S3-compatible con RLS', 'Cloud Storage con reglas'],
                  ['Funciones server', 'Edge Functions (Deno, global)', 'Cloud Functions (Node.js)'],
                  ['SDK móvil', 'Bueno (JS, Flutter, Swift, Kotlin)', 'Excelente (nativo Android/iOS)'],
                  ['Queries complejas', 'SQL completo + joins + vistas', 'Limitado (sin joins nativos)'],
                  ['Vendor lock-in', 'Muy bajo (Postgres estándar)', 'Alto (API propietaria de Google)'],
                  ['Open-source', 'Sí (MIT + Apache)', 'No'],
                  ['Servidores EU', 'Sí (Frankfurt por defecto)', 'Sí (requiere plan de pago)'],
                  ['Precio free tier', 'Generoso (500MB DB, 1GB storage)', 'Generoso (1GB Firestore, 5GB storage)'],
                ].map(([feature, supabase, firebase]) => (
                  <tr key={feature}>
                    <td className="py-3 pr-4 text-zinc-300 font-medium">{feature}</td>
                    <td className="py-3 px-4 text-zinc-400">{supabase}</td>
                    <td className="py-3 pl-4 text-zinc-400">{firebase}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 3: El debate SQL vs NoSQL */}
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">El debate real: SQL vs NoSQL en 2026</h2>
          <p className="text-zinc-300 leading-relaxed">
            La elección entre Supabase y Firebase es fundamentalmente la elección entre SQL y NoSQL. Y en
            2026, para la mayoría de SaaS B2B, la respuesta es clara: <strong className="text-white">SQL gana</strong>.
          </p>

          <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5 my-6">
            <p className="text-amber-300 font-medium text-sm mb-2">¿Por qué ganó NoSQL el hype de los 2010s?</p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Firestore y MongoDB prometieron escalabilidad infinita sin esquemas rígidos. Eso era
              válido en 2012 cuando escalar PostgreSQL era complejo. En 2026, con PlanetScale, Supabase,
              Neon y Aurora Serverless, escalar Postgres es tan fácil como Firestore — y te llevas SQL,
              joins y transacciones ACID sin coste adicional.
            </p>
          </div>

          <p className="text-zinc-300 leading-relaxed">
            El problema de Firestore para SaaS B2B es concreto: cuando tienes relaciones entre entidades
            (usuarios → proyectos → tareas → comentarios), las queries se vuelven complejas. Firestore
            no soporta joins nativos. Para obtener un proyecto con todos sus usuarios, tareas y últimos
            comentarios necesitas múltiples round-trips o denormalizar datos — lo que multiplica la
            complejidad de escritura y el riesgo de inconsistencias.
          </p>

          <p className="text-zinc-300 leading-relaxed">
            Con Supabase (PostgreSQL), esa misma query es una línea de SQL con JOINs.
          </p>

          {/* Código ejemplo */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 my-6 font-mono text-sm">
            <p className="text-zinc-500 text-xs mb-3">-- Supabase: obtener proyecto con equipo y tareas en una query</p>
            <p className="text-emerald-400">SELECT</p>
            <p className="text-zinc-300 ml-4">p.id, p.name, p.status,</p>
            <p className="text-zinc-300 ml-4">json_agg(DISTINCT u.*) AS team_members,</p>
            <p className="text-zinc-300 ml-4">json_agg(DISTINCT t.*) AS tasks</p>
            <p className="text-emerald-400">FROM</p>
            <p className="text-zinc-300 ml-4">projects p</p>
            <p className="text-zinc-300 ml-4">JOIN project_members pm ON pm.project_id = p.id</p>
            <p className="text-zinc-300 ml-4">JOIN users u ON u.id = pm.user_id</p>
            <p className="text-zinc-300 ml-4">LEFT JOIN tasks t ON t.project_id = p.id</p>
            <p className="text-emerald-400">WHERE</p>
            <p className="text-zinc-300 ml-4">p.org_id = $1</p>
            <p className="text-emerald-400">GROUP BY</p>
            <p className="text-zinc-300 ml-4">p.id;</p>
            <div className="border-t border-zinc-800 mt-4 pt-4">
              <p className="text-zinc-500 text-xs">// Firebase: necesitarías 3+ queries + merging en cliente</p>
            </div>
          </div>

          {/* Section 4: Precios */}
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Precios reales (no los del marketing)</h2>
          <p className="text-zinc-300 leading-relaxed">
            Ambas plataformas tienen free tiers generosos. Las diferencias importantes aparecen al
            escalar. Aquí los números reales para un SaaS con ~1.000 usuarios activos:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="font-bold text-emerald-400 mb-4">Supabase</h3>
              <div className="space-y-3">
                {[
                  { plan: 'Free', precio: '0€/mes', limite: '500MB DB, 1GB storage, 50.000 auth users' },
                  { plan: 'Pro', precio: '25$/mes', limite: '8GB DB, 100GB storage, bandwidth ilimitado' },
                  { plan: 'Team', precio: '599$/mes', limite: 'Multi-proyecto, SSO, SLA 99.9%' },
                ].map(({ plan, precio, limite }) => (
                  <div key={plan} className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-white text-sm font-medium">{plan}</p>
                      <p className="text-zinc-500 text-xs">{limite}</p>
                    </div>
                    <span className="text-emerald-400 font-bold text-sm shrink-0">{precio}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-800">
                <p className="text-zinc-500 text-xs">
                  Para 1.000 usuarios activos con uso normal: <span className="text-white font-medium">~25$/mes</span>
                </p>
              </div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="font-bold text-amber-400 mb-4">Firebase</h3>
              <div className="space-y-3">
                {[
                  { plan: 'Spark (Free)', precio: '0€/mes', limite: '1GB Firestore, 5GB storage, 10GB transfer' },
                  { plan: 'Blaze (Pay-as-go)', precio: 'Variable', limite: 'Ilimitado, pagas por uso real' },
                  { plan: 'Firebase App Check', precio: 'Incluido', limite: 'Protección contra abuso' },
                ].map(({ plan, precio, limite }) => (
                  <div key={plan} className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-white text-sm font-medium">{plan}</p>
                      <p className="text-zinc-500 text-xs">{limite}</p>
                    </div>
                    <span className="text-amber-400 font-bold text-sm shrink-0">{precio}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-800">
                <p className="text-zinc-500 text-xs">
                  Para 1.000 usuarios activos con uso normal: <span className="text-white font-medium">~20-60$/mes</span> (variable)
                </p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 my-6">
            <p className="text-sm font-medium text-white mb-2">La trampa del precio variable de Firebase</p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              El modelo pay-as-you-go de Firebase puede sorprenderte. Un bug en producción que genera
              lecturas en bucle puede costarte cientos de euros en una noche. Con Supabase Pro (precio
              fijo) tienes predictibilidad total. Para startups con inversión limitada, la previsibilidad
              del gasto es un factor crítico.
            </p>
          </div>

          {/* Section 5: GDPR */}
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">
            <span className="flex items-center gap-2">
              <Globe className="w-6 h-6 text-emerald-400" />
              GDPR y datos en Europa: la ventaja de Supabase
            </span>
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            Si tu SaaS procesa datos de ciudadanos europeos (que es prácticamente cualquier startup
            española), el GDPR no es opcional. Y aquí Supabase tiene una ventaja estructural.
          </p>

          <div className="space-y-3 my-6">
            {[
              {
                icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
                title: 'Supabase: servidores en Frankfurt por defecto',
                desc: 'Tus datos nunca salen de la UE sin que lo configures explícitamente. El DPA (Data Processing Agreement) está disponible desde el plan Pro. PostgreSQL te permite implementar column-level encryption y RLS (Row Level Security) nativamente.',
              },
              {
                icon: <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />,
                title: 'Firebase: requiere configuración específica',
                desc: 'Por defecto Firebase usa servidores en EE.UU. Para cumplir GDPR necesitas seleccionar región EU (Belgium o Finland) en Firestore — solo disponible en plan Blaze. El DPA de Google está disponible pero el proceso es más complejo. Además, los datos siguen bajo jurisdicción de Google.',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3 bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                {icon}
                <div>
                  <p className="text-white font-medium text-sm">{title}</p>
                  <p className="text-zinc-400 text-sm mt-1 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-zinc-300 leading-relaxed">
            Para SaaS B2B que vende a empresas medianas y grandes en España, el origen de la
            infraestructura aparece en los cuestionarios de seguridad de los clientes. "¿Tus datos
            están en Europa?" es una pregunta estándar. Con Supabase la respuesta es sí por defecto.
            Con Firebase hay que explicar la configuración — y eso genera fricción en el proceso de venta.
          </p>

          {/* Section 6: Auth */}
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Autenticación: empate técnico, ventaja práctica Supabase</h2>
          <p className="text-zinc-300 leading-relaxed">
            Ambas plataformas ofrecen autenticación robusta. Las diferencias son sutiles pero importantes
            en producción:
          </p>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-3 pr-4 text-zinc-500 font-medium">Feature auth</th>
                  <th className="text-left py-3 px-4 text-emerald-400 font-medium">Supabase</th>
                  <th className="text-left py-3 pl-4 text-amber-400 font-medium">Firebase</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {[
                  ['Email/password', '✓', '✓'],
                  ['OAuth (Google, GitHub...)', '✓ (20+ providers)', '✓ (15+ providers)'],
                  ['Magic link (passwordless)', '✓', '✗ (email link es diferente)'],
                  ['Phone auth / SMS', '✓', '✓ (muy sólido)'],
                  ['SSO / SAML', '✓ (desde plan Pro)', '✓ (Identity Platform)'],
                  ['Roles y permisos', 'RLS en DB directamente', 'Custom claims en JWT'],
                  ['Multi-tenant', '✓ native con organizations', 'Manual con custom claims'],
                  ['Emails personalizados', '✓ (template editor)', '✓ (limitado)'],
                ].map(([feature, supabase, firebase]) => (
                  <tr key={feature}>
                    <td className="py-3 pr-4 text-zinc-300">{feature}</td>
                    <td className="py-3 px-4 text-zinc-400">{supabase}</td>
                    <td className="py-3 pl-4 text-zinc-400">{firebase}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-zinc-300 leading-relaxed">
            La ventaja de Supabase aquí es la integración entre auth y base de datos mediante{' '}
            <strong className="text-white">Row Level Security (RLS)</strong>. Puedes escribir políticas
            de acceso directamente en SQL:
          </p>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 my-6 font-mono text-sm">
            <p className="text-zinc-500 text-xs mb-3">-- Un usuario solo puede leer sus propios proyectos</p>
            <p className="text-purple-400">CREATE POLICY</p>
            <p className="text-zinc-300 ml-2">"users_own_projects" ON projects</p>
            <p className="text-purple-400 ml-2">FOR SELECT USING</p>
            <p className="text-zinc-300 ml-2">(auth.uid() = user_id);</p>
            <div className="border-t border-zinc-800 mt-4 pt-4">
              <p className="text-zinc-500 text-xs">-- La lógica de seguridad vive en la DB, no en el cliente</p>
            </div>
          </div>

          <p className="text-zinc-300 leading-relaxed">
            Con Firebase, la lógica de acceso se define en Firestore Rules — un lenguaje propio que
            hay que aprender, y que no tiene la expresividad de SQL para casos complejos. El resultado
            es que los sistemas de permisos complejos (multi-tenant, roles granulares) son más simples
            de implementar en Supabase.
          </p>

          {/* Section 7: Caso real */}
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">
            <span className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
              Caso real: migración de Firebase a Supabase en 6 días
            </span>
          </h2>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 my-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-white font-bold mb-1">Cliente: SaaS de gestión documental para despachos legales</p>
                <p className="text-zinc-500 text-xs mb-4">Barcelona · Plan Pro · 230 usuarios activos</p>
                <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                  El cliente tenía su MVP en Firebase Firestore. Funcionaba bien para el prototipo, pero al
                  añadir roles granulares (socio / abogado asociado / administrativo / cliente) con acceso
                  diferencial a documentos por expediente, las Firestore Rules se convirtieron en código
                  imposible de mantener.
                </p>
                <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                  Otro problema: sus clientes corporativos (dos bufetes del IBEX 35) exigían que los
                  documentos estuvieran alojados en servidores europeos con auditoría de accesos.
                  Firebase requería plan Blaze + configuración específica. Con Supabase, Frankfurt era
                  el default.
                </p>
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {[
                    { label: 'Duración migración', value: '6 días' },
                    { label: 'Líneas de Rules eliminadas', value: '847 → 12' },
                    { label: 'Reducción coste mensual', value: '-40%' },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-zinc-800 rounded-lg p-3 text-center">
                      <p className="text-emerald-400 font-bold text-lg">{value}</p>
                      <p className="text-zinc-500 text-xs mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 8: Cuándo usar Firebase */}
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Cuándo Firebase sigue siendo la mejor opción</h2>
          <p className="text-zinc-300 leading-relaxed">
            Firebase no ha perdido la guerra. Tiene casos de uso donde sigue ganando:
          </p>

          <div className="space-y-3 my-6">
            {[
              {
                title: 'Apps móviles nativas (Android/iOS)',
                desc: 'Los SDKs nativos de Firebase para iOS y Android son más maduros. Google Sign-In, Firebase Analytics, Crashlytics y Remote Config crean un ecosistema sin fricción para apps móviles.',
              },
              {
                title: 'Prototipos ultra-rápidos',
                desc: 'Si necesitas un MVP funcional en 48 horas y el modelo de datos es simple, Firebase te permite empezar a escribir a tu BD desde el cliente en minutos, sin esquemas ni migraciones.',
              },
              {
                title: 'Datos no estructurados o con esquema muy variable',
                desc: 'Catálogos de productos con atributos variables, sistemas de configuración flexible, o cualquier caso donde el esquema cambie constantemente — Firestore brilla aquí.',
              },
              {
                title: 'Proyectos ya en Firebase con equipo formado',
                desc: 'El coste de migración no siempre merece la pena. Si tu equipo conoce Firebase y el sistema funciona, la continuidad tiene valor.',
              },
            ].map(({ title, desc }) => (
              <div key={title} className="flex items-start gap-3 bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <CheckCircle2 className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-white font-medium text-sm">{title}</p>
                  <p className="text-zinc-400 text-sm mt-1 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Section 9: Árbol de decisión */}
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Árbol de decisión: elige en 5 preguntas</h2>

          <div className="space-y-4 my-6">
            {[
              {
                q: '1. ¿Tus datos tienen relaciones complejas (usuarios ↔ proyectos ↔ tareas ↔ documentos)?',
                si: 'Supabase — SQL hace esto simple',
                no: 'Cualquiera, continúa →',
              },
              {
                q: '2. ¿Vendes a empresas en España/Europa que pedirán cumplimiento GDPR y datos en EU?',
                si: 'Supabase — Frankfurt por defecto',
                no: 'Cualquiera, continúa →',
              },
              {
                q: '3. ¿Tu producto principal es una app móvil nativa (no web)?',
                si: 'Firebase — SDKs nativos superiores',
                no: 'Supabase para web/SaaS, continúa →',
              },
              {
                q: '4. ¿Necesitas precios predecibles sin sorpresas al final del mes?',
                si: 'Supabase — plan Pro fijo a 25$/mes',
                no: 'Firebase pay-as-you-go puede ser más económico con uso muy bajo',
              },
              {
                q: '5. ¿Quieres evitar el vendor lock-in y poder migrar a un Postgres propio algún día?',
                si: 'Supabase — es Postgres estándar',
                no: 'Firebase puede ser perfectamente válido para tu caso',
              },
            ].map(({ q, si, no }) => (
              <div key={q} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <p className="text-white text-sm font-medium mb-3">{q}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-emerald-500/10 rounded-lg p-2.5">
                    <p className="text-emerald-400 text-xs font-bold mb-0.5">SÍ →</p>
                    <p className="text-zinc-300 text-xs">{si}</p>
                  </div>
                  <div className="bg-zinc-800 rounded-lg p-2.5">
                    <p className="text-zinc-500 text-xs font-bold mb-0.5">NO →</p>
                    <p className="text-zinc-300 text-xs">{no}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Conclusión */}
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Nuestra conclusión (y la que damos a clientes)</h2>

          <p className="text-zinc-300 leading-relaxed">
            En Think Better, desde 2024 usamos <strong className="text-white">Supabase como stack por defecto</strong>{' '}
            para todos los proyectos SaaS nuevos. Las razones son prácticas, no ideológicas:
          </p>

          <div className="space-y-2 my-6">
            {[
              'SQL es un conocimiento transferible — cualquier desarrollador lo entiende sin formación específica',
              'RLS simplifica radicalmente los sistemas de permisos complejos',
              'Frankfurt por defecto = GDPR sin fricción = less friction en ventas B2B',
              'Precio fijo y predecible — critical para startups con runway limitado',
              'Postgres estándar = sin lock-in = decisión que no bloquea el futuro',
            ].map(reason => (
              <div key={reason} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <p className="text-zinc-300 text-sm">{reason}</p>
              </div>
            ))}
          </div>

          <p className="text-zinc-300 leading-relaxed">
            Firebase no es una mala opción. Es una opción diferente, óptima para casos de uso concretos.
            Pero para el SaaS B2B promedio que construimos — plataformas web con auth, datos relacionales,
            pagos y panel de administración — Supabase gana en casi todos los vectores que importan en 2026.
          </p>

          <p className="text-zinc-300 leading-relaxed">
            Si todavía no tienes claro qué necesita exactamente tu proyecto, nuestro cuestionario
            gratuito analiza tus requisitos y te da una recomendación de stack personalizada en
            10 minutos.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-3xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-3">
            ¿Quieres saber qué stack necesita tu proyecto?
          </h3>
          <p className="text-zinc-400 mb-6 max-w-md mx-auto">
            Completa nuestro cuestionario gratuito. En 10 minutos analizamos tus requisitos y te damos
            recomendación de stack, precio estimado y propuesta técnica — sin compromiso.
          </p>
          <Link
            to="/cuestionario"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 transition-colors"
          >
            Analizar mi proyecto gratis
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-zinc-600 text-xs mt-4">Sin tarjeta de crédito · Propuesta en 24h · Sin compromiso</p>
        </motion.div>

        {/* Related articles */}
        <div className="mt-16 pt-8 border-t border-zinc-800">
          <h3 className="text-lg font-bold text-white mb-6">Artículos relacionados</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                to: '/blog/cuanto-cuesta-desarrollar-una-app-en-espana-2026',
                tag: 'Precios',
                title: '¿Cuánto cuesta desarrollar una app en España en 2026?',
              },
              {
                to: '/blog/como-lanzar-saas-barcelona-30-dias',
                tag: 'SaaS',
                title: 'Cómo lanzar un SaaS en Barcelona en 30 días',
              },
            ].map(({ to, tag, title }) => (
              <Link
                key={to}
                to={to}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors group"
              >
                <span className="text-xs text-zinc-500 uppercase tracking-wider">{tag}</span>
                <p className="text-white font-medium mt-1 group-hover:text-emerald-400 transition-colors text-sm leading-snug">
                  {title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
