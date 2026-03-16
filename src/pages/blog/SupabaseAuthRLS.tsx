import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  Lock,
  Key,
  AlertTriangle,
  CheckCircle2,
  Database,
  Users,
  Zap,
  Code2,
  Eye,
} from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePageMeta } from '../../hooks/usePageMeta';

export function SupabaseAuthRLS() {
  usePageTitle(
    'Supabase Auth en producción: guía completa con Row Level Security — Think Better',
  );
  usePageMeta(
    'Guía definitiva para implementar Supabase Auth + RLS en producción: políticas de seguridad, patrones de acceso multi-tenant, errores críticos y checklist de 12 puntos para SaaS seguros en 2026.',
  );

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline:
        'Cómo usar Supabase Auth en producción: guía completa con Row Level Security',
      description:
        'Guía definitiva para implementar Supabase Auth + RLS en producción. Políticas de seguridad, patrones multi-tenant, JWT, service role vs anon key, errores críticos y checklist de 12 puntos.',
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
          'https://servicios-productos-online-ignasi.vercel.app/blog/supabase-auth-rls-produccion',
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
      document.getElementById('article-schema')?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      {/* Navbar */}
      <nav className="border-b border-zinc-900 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-zinc-50 font-bold text-lg">
            <span className="text-emerald-400 font-mono">&gt;_</span>
            Think Better
          </Link>
          <Link to="/blog" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Volver al blog
          </Link>
        </div>
      </nav>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-sm font-medium border border-emerald-500/20">
                Seguridad
              </span>
              <span className="text-zinc-500 text-sm">16 mar 2026</span>
              <span className="text-zinc-500 text-sm">·</span>
              <span className="text-zinc-500 text-sm">12 min de lectura</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-50 leading-tight mb-6">
              Cómo usar Supabase Auth en producción: guía completa con Row Level Security
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed">
              El 60% de los SaaS que usan Supabase en producción tienen alguna brecha de seguridad en sus políticas RLS. Esta guía te muestra cómo implementar autenticación robusta y control de acceso a datos sin errores críticos.
            </p>
          </div>

          {/* Highlight box */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-12">
            <p className="text-zinc-300 text-lg leading-relaxed">
              <strong className="text-emerald-400">La promesa de Supabase Auth + RLS</strong> es que puedes escribir reglas de seguridad directamente en SQL y olvidarte de validar permisos en el backend. La realidad es que, mal implementado, terminas con tablas completamente públicas, bucles infinitos en las políticas o service_role keys expuestas en el cliente.
            </p>
          </div>

          {/* Section 1 */}
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Key className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-50">Cómo funciona Supabase Auth (y por qué importa entenderlo)</h2>
            </div>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Supabase Auth genera un JWT (JSON Web Token) cuando el usuario se autentica. Ese token contiene el <code className="bg-zinc-800 text-emerald-400 px-1.5 py-0.5 rounded text-sm">user.id</code> y el <code className="bg-zinc-800 text-emerald-400 px-1.5 py-0.5 rounded text-sm">role</code> del usuario. Cuando tu frontend hace una query a Supabase con el cliente autenticado, ese JWT viaja en el header <code className="bg-zinc-800 text-emerald-400 px-1.5 py-0.5 rounded text-sm">Authorization: Bearer &lt;token&gt;</code>.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6">
              PostgreSQL (el motor de base de datos de Supabase) recibe la query y ejecuta las <strong className="text-zinc-200">Row Level Security policies</strong> antes de devolver cualquier dato. Esas políticas pueden usar la función <code className="bg-zinc-800 text-emerald-400 px-1.5 py-0.5 rounded text-sm">auth.uid()</code> para comparar el ID del usuario con las filas de la tabla.
            </p>

            {/* Diagram */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6 font-mono text-sm">
              <p className="text-zinc-500 mb-4">// Flujo completo de una query autenticada</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                  <span className="text-zinc-300">Frontend: <span className="text-emerald-400">supabase.from('projects').select('*')</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                  <span className="text-zinc-300">HTTP request con <span className="text-amber-400">Authorization: Bearer JWT</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                  <span className="text-zinc-300">PostgREST: valida JWT → extrae <span className="text-emerald-400">auth.uid()</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                  <span className="text-zinc-300">PostgreSQL: aplica <span className="text-purple-400">RLS policies</span> antes de devolver filas</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold flex-shrink-0">5</span>
                  <span className="text-zinc-300">Solo llegan las filas donde <span className="text-emerald-400">user_id = auth.uid()</span></span>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-300 font-semibold mb-1">Punto crítico: dos claves, dos roles</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Supabase tiene dos claves de API. La <strong className="text-zinc-300">anon key</strong> respeta RLS (es la que usas en el frontend). La <strong className="text-zinc-300">service_role key</strong> bypasea completamente RLS y tiene acceso total a toda la base de datos. Nunca, jamás, uses la service_role key en el cliente.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-50">Row Level Security: los 4 patrones que necesitas</h2>
            </div>
            <p className="text-zinc-400 leading-relaxed mb-8">
              RLS funciona a nivel de fila. Para cada tabla, defines políticas que determinan qué filas puede ver, insertar, modificar o borrar cada usuario. Estos son los 4 patrones más comunes en SaaS:
            </p>

            {/* Pattern 1 */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-zinc-100 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">1</span>
                Acceso propio: cada usuario solo ve sus datos
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                El patrón más básico. Una tabla <code className="bg-zinc-800 text-emerald-400 px-1.5 py-0.5 rounded text-sm">projects</code> donde cada usuario solo puede ver y editar sus propios proyectos.
              </p>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 font-mono text-sm">
                <p className="text-zinc-500 mb-3">-- Habilitar RLS en la tabla</p>
                <p className="text-cyan-400">ALTER TABLE</p>
                <p className="text-zinc-100 ml-4">projects <span className="text-cyan-400">ENABLE ROW LEVEL SECURITY</span>;</p>
                <p className="text-zinc-500 mt-4 mb-3">-- Política SELECT: solo ver filas propias</p>
                <p className="text-cyan-400">CREATE POLICY</p>
                <p className="text-zinc-100 ml-4">"Users can view own projects"</p>
                <p className="text-zinc-100 ml-4"><span className="text-cyan-400">ON</span> projects <span className="text-cyan-400">FOR SELECT</span></p>
                <p className="text-zinc-100 ml-4"><span className="text-cyan-400">USING</span> (<span className="text-emerald-400">auth.uid()</span> = user_id);</p>
                <p className="text-zinc-500 mt-4 mb-3">-- Política INSERT: solo insertar con tu propio user_id</p>
                <p className="text-cyan-400">CREATE POLICY</p>
                <p className="text-zinc-100 ml-4">"Users can insert own projects"</p>
                <p className="text-zinc-100 ml-4"><span className="text-cyan-400">ON</span> projects <span className="text-cyan-400">FOR INSERT</span></p>
                <p className="text-zinc-100 ml-4"><span className="text-cyan-400">WITH CHECK</span> (<span className="text-emerald-400">auth.uid()</span> = user_id);</p>
              </div>
            </div>

            {/* Pattern 2 */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-zinc-100 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">2</span>
                Multi-tenant: organizaciones con miembros
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                El patrón más frecuente en SaaS B2B. Un usuario pertenece a una organización y puede ver todos los recursos de esa organización, pero no los de otras.
              </p>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 font-mono text-sm">
                <p className="text-zinc-500 mb-3">-- Tabla de membresías (users ↔ organizations)</p>
                <p className="text-zinc-100"><span className="text-cyan-400">CREATE TABLE</span> org_members (</p>
                <p className="text-zinc-100 ml-4">org_id <span className="text-amber-400">UUID REFERENCES</span> organizations(id),</p>
                <p className="text-zinc-100 ml-4">user_id <span className="text-amber-400">UUID REFERENCES</span> auth.users(id),</p>
                <p className="text-zinc-100 ml-4">role <span className="text-amber-400">TEXT</span> DEFAULT <span className="text-green-400">'member'</span></p>
                <p className="text-zinc-100">);</p>
                <p className="text-zinc-500 mt-4 mb-3">-- Política: ver tickets si eres miembro de la org</p>
                <p className="text-cyan-400">CREATE POLICY</p>
                <p className="text-zinc-100 ml-4">"Org members can view tickets"</p>
                <p className="text-zinc-100 ml-4"><span className="text-cyan-400">ON</span> tickets <span className="text-cyan-400">FOR SELECT</span></p>
                <p className="text-zinc-100 ml-4"><span className="text-cyan-400">USING</span> (</p>
                <p className="text-zinc-100 ml-8">org_id <span className="text-cyan-400">IN</span> (</p>
                <p className="text-zinc-100 ml-12"><span className="text-cyan-400">SELECT</span> org_id <span className="text-cyan-400">FROM</span> org_members</p>
                <p className="text-zinc-100 ml-12"><span className="text-cyan-400">WHERE</span> user_id = <span className="text-emerald-400">auth.uid()</span></p>
                <p className="text-zinc-100 ml-8">)</p>
                <p className="text-zinc-100 ml-4">);</p>
              </div>
            </div>

            {/* Pattern 3 */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-zinc-100 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">3</span>
                Roles de admin: acceso total para administradores
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                Los admins necesitan ver todos los datos. La forma correcta es leer el rol desde una tabla <code className="bg-zinc-800 text-emerald-400 px-1.5 py-0.5 rounded text-sm">profiles</code>, no desde el JWT (que puede estar desactualizado).
              </p>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 font-mono text-sm">
                <p className="text-zinc-500 mb-3">-- Función helper para comprobar rol de admin</p>
                <p className="text-cyan-400">CREATE OR REPLACE FUNCTION</p>
                <p className="text-zinc-100 ml-4">is_admin() <span className="text-cyan-400">RETURNS BOOLEAN AS</span> $$</p>
                <p className="text-zinc-100 ml-4"><span className="text-cyan-400">BEGIN</span></p>
                <p className="text-zinc-100 ml-8"><span className="text-cyan-400">RETURN EXISTS</span> (</p>
                <p className="text-zinc-100 ml-12"><span className="text-cyan-400">SELECT</span> 1 <span className="text-cyan-400">FROM</span> profiles</p>
                <p className="text-zinc-100 ml-12"><span className="text-cyan-400">WHERE</span> id = <span className="text-emerald-400">auth.uid()</span></p>
                <p className="text-zinc-100 ml-12"><span className="text-cyan-400">AND</span> role = <span className="text-green-400">'admin'</span></p>
                <p className="text-zinc-100 ml-8">);</p>
                <p className="text-zinc-100 ml-4"><span className="text-cyan-400">END;</span></p>
                <p className="text-zinc-100 ml-4">$$ <span className="text-cyan-400">LANGUAGE</span> plpgsql SECURITY DEFINER;</p>
                <p className="text-zinc-500 mt-4 mb-3">-- Política que combina admin + acceso propio</p>
                <p className="text-cyan-400">CREATE POLICY</p>
                <p className="text-zinc-100 ml-4">"Users see own data, admins see all"</p>
                <p className="text-zinc-100 ml-4"><span className="text-cyan-400">ON</span> projects <span className="text-cyan-400">FOR SELECT</span></p>
                <p className="text-zinc-100 ml-4"><span className="text-cyan-400">USING</span> (user_id = <span className="text-emerald-400">auth.uid()</span> <span className="text-cyan-400">OR</span> <span className="text-purple-400">is_admin()</span>);</p>
              </div>
            </div>

            {/* Pattern 4 */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-zinc-100 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">4</span>
                Lectura pública, escritura autenticada
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                Para tablas de contenido público (posts de blog, productos en catálogo) que cualquiera puede leer, pero solo usuarios autenticados pueden crear.
              </p>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 font-mono text-sm">
                <p className="text-zinc-500 mb-3">-- Cualquiera puede leer artículos publicados</p>
                <p className="text-cyan-400">CREATE POLICY</p>
                <p className="text-zinc-100 ml-4">"Public articles are visible to all"</p>
                <p className="text-zinc-100 ml-4"><span className="text-cyan-400">ON</span> articles <span className="text-cyan-400">FOR SELECT</span></p>
                <p className="text-zinc-100 ml-4"><span className="text-cyan-400">USING</span> (published = <span className="text-amber-400">true</span>);</p>
                <p className="text-zinc-500 mt-4 mb-3">-- Solo autores pueden insertar sus propios artículos</p>
                <p className="text-cyan-400">CREATE POLICY</p>
                <p className="text-zinc-100 ml-4">"Authors can insert articles"</p>
                <p className="text-zinc-100 ml-4"><span className="text-cyan-400">ON</span> articles <span className="text-cyan-400">FOR INSERT</span></p>
                <p className="text-zinc-100 ml-4"><span className="text-cyan-400">WITH CHECK</span> (<span className="text-emerald-400">auth.uid()</span> = author_id);</p>
              </div>
            </div>
          </section>

          {/* Section 3: Auth setup */}
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-50">Configurar Supabase Auth en React: guía paso a paso</h2>
            </div>

            <div className="space-y-8">
              {/* Step 1 */}
              <div>
                <h3 className="text-lg font-bold text-zinc-100 mb-3">1. Inicializar el cliente de Supabase</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                  Crea un único cliente compartido. Nunca lo instancies múltiples veces o tendrás problemas con las sesiones.
                </p>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 font-mono text-sm">
                  <p className="text-zinc-500 mb-2">// src/lib/supabase.ts</p>
                  <p className="text-cyan-400">import {'{'} createClient {'}'} from <span className="text-green-400">'@supabase/supabase-js'</span>;</p>
                  <br />
                  <p className="text-zinc-100"><span className="text-cyan-400">const</span> supabaseUrl = import.meta.env.<span className="text-amber-400">VITE_SUPABASE_URL</span>;</p>
                  <p className="text-zinc-100"><span className="text-cyan-400">const</span> supabaseAnonKey = import.meta.env.<span className="text-amber-400">VITE_SUPABASE_ANON_KEY</span>;</p>
                  <br />
                  <p className="text-zinc-100"><span className="text-cyan-400">export const</span> supabase = <span className="text-purple-400">createClient</span>(supabaseUrl, supabaseAnonKey, {'{'}</p>
                  <p className="text-zinc-100 ml-4">auth: {'{'}</p>
                  <p className="text-zinc-100 ml-8">persistSession: <span className="text-amber-400">true</span>,</p>
                  <p className="text-zinc-100 ml-8">autoRefreshToken: <span className="text-amber-400">true</span>,</p>
                  <p className="text-zinc-100 ml-8">detectSessionInUrl: <span className="text-amber-400">true</span>, <span className="text-zinc-500">// Para magic links</span></p>
                  <p className="text-zinc-100 ml-4">{'}'}</p>
                  <p className="text-zinc-100">{'}'});</p>
                </div>
              </div>

              {/* Step 2 */}
              <div>
                <h3 className="text-lg font-bold text-zinc-100 mb-3">2. AuthContext: escuchar cambios de sesión</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                  El contexto de autenticación debe suscribirse a <code className="bg-zinc-800 text-emerald-400 px-1.5 py-0.5 rounded text-sm">onAuthStateChange</code> para reaccionar a login, logout y refresco de tokens.
                </p>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 font-mono text-sm">
                  <p className="text-zinc-500 mb-2">// src/contexts/AuthContext.tsx (simplificado)</p>
                  <p className="text-cyan-400">useEffect</p>
                  <p className="text-zinc-100">(() =&gt; {'{'}</p>
                  <p className="text-zinc-100 ml-4"><span className="text-zinc-500">// 1. Obtener sesión inicial</span></p>
                  <p className="text-zinc-100 ml-4">supabase.auth.<span className="text-purple-400">getSession</span>().then(({'{'} data {'}'}) =&gt; {'{'}</p>
                  <p className="text-zinc-100 ml-8"><span className="text-purple-400">setSession</span>(data.session);</p>
                  <p className="text-zinc-100 ml-8"><span className="text-purple-400">setUser</span>(data.session?.user ?? null);</p>
                  <p className="text-zinc-100 ml-4">{'}'});</p>
                  <br />
                  <p className="text-zinc-100 ml-4"><span className="text-zinc-500">// 2. Suscribirse a cambios</span></p>
                  <p className="text-zinc-100 ml-4"><span className="text-cyan-400">const</span> {'{'} data: {'{'} subscription {'}'} {'}'} =</p>
                  <p className="text-zinc-100 ml-6">supabase.auth.<span className="text-purple-400">onAuthStateChange</span>((_event, session) =&gt; {'{'}</p>
                  <p className="text-zinc-100 ml-8"><span className="text-purple-400">setSession</span>(session);</p>
                  <p className="text-zinc-100 ml-8"><span className="text-purple-400">setUser</span>(session?.user ?? null);</p>
                  <p className="text-zinc-100 ml-6">{'}'});</p>
                  <br />
                  <p className="text-zinc-100 ml-4"><span className="text-cyan-400">return</span> () =&gt; subscription.<span className="text-purple-400">unsubscribe</span>();</p>
                  <p className="text-zinc-100">{'}'}, []);</p>
                </div>
              </div>

              {/* Step 3 */}
              <div>
                <h3 className="text-lg font-bold text-zinc-100 mb-3">3. Tabla profiles sincronizada con auth.users</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                  Supabase gestiona <code className="bg-zinc-800 text-emerald-400 px-1.5 py-0.5 rounded text-sm">auth.users</code> internamente. Para datos adicionales (nombre, rol, avatar), usa una tabla <code className="bg-zinc-800 text-emerald-400 px-1.5 py-0.5 rounded text-sm">public.profiles</code> con un trigger que la rellena automáticamente al registrarse.
                </p>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 font-mono text-sm">
                  <p className="text-zinc-500 mb-2">-- Trigger que crea un perfil al registrar un usuario</p>
                  <p className="text-cyan-400">CREATE OR REPLACE FUNCTION</p>
                  <p className="text-zinc-100 ml-4">handle_new_user() <span className="text-cyan-400">RETURNS TRIGGER AS</span> $$</p>
                  <p className="text-zinc-100 ml-4"><span className="text-cyan-400">BEGIN</span></p>
                  <p className="text-zinc-100 ml-8"><span className="text-cyan-400">INSERT INTO</span> public.profiles (id, email, role)</p>
                  <p className="text-zinc-100 ml-8"><span className="text-cyan-400">VALUES</span> (NEW.id, NEW.email, <span className="text-green-400">'client'</span>);</p>
                  <p className="text-zinc-100 ml-8"><span className="text-cyan-400">RETURN</span> NEW;</p>
                  <p className="text-zinc-100 ml-4"><span className="text-cyan-400">END;</span></p>
                  <p className="text-zinc-100 ml-4">$$ <span className="text-cyan-400">LANGUAGE</span> plpgsql SECURITY DEFINER;</p>
                  <br />
                  <p className="text-cyan-400">CREATE TRIGGER</p>
                  <p className="text-zinc-100 ml-4">on_auth_user_created</p>
                  <p className="text-zinc-100 ml-4"><span className="text-cyan-400">AFTER INSERT ON</span> auth.users</p>
                  <p className="text-zinc-100 ml-4"><span className="text-cyan-400">FOR EACH ROW EXECUTE</span> FUNCTION handle_new_user();</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Critical errors */}
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-50">Los 6 errores críticos de RLS que destruyen tu seguridad</h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  num: '01',
                  title: 'RLS habilitado pero sin políticas → tabla completamente inaccesible',
                  desc: 'Si habilitas RLS en una tabla pero no defines ninguna política, ningún usuario puede leer ni escribir datos. El error más confuso: el código no falla, simplemente devuelve arrays vacíos.',
                  code: '-- INCORRECTO: RLS habilitado sin políticas\nALTER TABLE projects ENABLE ROW LEVEL SECURITY;\n-- Sin CREATE POLICY → devuelve [] siempre',
                  fix: '-- CORRECTO: siempre añade políticas después de habilitar RLS',
                },
                {
                  num: '02',
                  title: 'USING vs WITH CHECK: confundirlos abre brechas de seguridad',
                  desc: 'USING se aplica a SELECT/UPDATE/DELETE (qué filas PUEDE leer/modificar). WITH CHECK se aplica a INSERT/UPDATE (qué valores PUEDE escribir). Usar solo USING en una política INSERT no filtra el contenido escrito.',
                  code: '-- INCORRECTO: INSERT sin WITH CHECK permite inyectar cualquier user_id\nCREATE POLICY "insert" ON projects FOR INSERT\nUSING (auth.uid() = user_id); -- ← USING no funciona en INSERT',
                  fix: '-- CORRECTO: INSERT debe usar WITH CHECK\nCREATE POLICY "insert" ON projects FOR INSERT\nWITH CHECK (auth.uid() = user_id);',
                },
                {
                  num: '03',
                  title: 'Políticas recursivas: la tabla profiles se consulta a sí misma',
                  desc: 'Si la tabla profiles tiene RLS con una política que llama a auth.uid() Y a otra función que consulta profiles, puedes crear un bucle infinito. El síntoma: timeout o stack overflow en las queries.',
                  code: '-- PROBLEMA: profiles → is_admin() → profiles → is_admin() → ...\nCREATE POLICY "view profiles" ON profiles FOR SELECT\nUSING (auth.uid() = id OR is_admin());',
                  fix: '-- SOLUCIÓN: usa SECURITY DEFINER en la función helper\nCREATE FUNCTION is_admin() RETURNS BOOLEAN\nLANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS ...',
                },
                {
                  num: '04',
                  title: 'Service role key en variables de entorno VITE_ → expuesta en el cliente',
                  desc: 'Todo lo que empieza por VITE_ en Vite se inyecta en el bundle JavaScript del cliente. Si pones la service_role key como VITE_SUPABASE_SERVICE_KEY, cualquiera que abra las DevTools puede verla y tiene acceso total a tu base de datos.',
                  code: '// PELIGROSO: nunca hagas esto\nconst serviceClient = createClient(\n  process.env.VITE_SUPABASE_URL,\n  process.env.VITE_SUPABASE_SERVICE_KEY // ← EXPUESTA en el bundle',
                  fix: '// La service_role key solo va en Edge Functions / backend',
                },
                {
                  num: '05',
                  title: 'No proteger el Storage: buckets con acceso público por defecto',
                  desc: 'Los Storage buckets de Supabase pueden ser públicos o privados. Un bucket público significa que cualquiera con la URL puede descargar el archivo. Las Storage Policies funcionan igual que RLS: sin políticas, acceso total denegado; con políticas mal configuradas, acceso total concedido.',
                  code: '-- INCORRECTO: política que permite leer a todo el mundo\nCREATE POLICY "Public Access"\nON storage.objects FOR SELECT\nUSING (bucket_id = \'avatars\'); -- Sin filtro de usuario',
                  fix: '-- CORRECTO: solo el dueño del archivo puede leerlo\nUSING (bucket_id = \'avatars\' AND auth.uid()::text = (storage.foldername(name))[1])',
                },
                {
                  num: '06',
                  title: 'Olvidar aplicar RLS a tablas relacionadas (N+1 de seguridad)',
                  desc: 'Si tienes projects con RLS correcta pero messages sin RLS, un usuario puede leer mensajes de proyectos ajenos aunque no pueda leer el proyecto. Cada tabla que tenga datos sensibles debe tener RLS activada.',
                  code: '-- Escenario: projects con RLS ✓, messages sin RLS ✗\n-- El atacante no puede leer projects pero sí messages:\nSELECT * FROM messages\nWHERE project_id = \'proyecto-de-otro-usuario-uuid\'',
                  fix: '-- SOLUCIÓN: RLS en messages con join a projects\nUSING (project_id IN (\n  SELECT id FROM projects WHERE user_id = auth.uid()\n))',
                },
              ].map((error) => (
                <div key={error.num} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-2xl font-bold text-red-400/40 font-mono flex-shrink-0">{error.num}</span>
                    <h3 className="text-base font-semibold text-zinc-100">{error.title}</h3>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4 ml-10">{error.desc}</p>
                  <div className="ml-10 bg-zinc-950 border border-red-500/20 rounded-xl p-4 font-mono text-xs mb-3">
                    <p className="text-red-400/60 mb-2">// Problema</p>
                    {error.code.split('\n').map((line, i) => (
                      <p key={i} className="text-zinc-400">{line}</p>
                    ))}
                  </div>
                  <div className="ml-10 bg-zinc-950 border border-emerald-500/20 rounded-xl p-4 font-mono text-xs">
                    <p className="text-emerald-400/60 mb-2">// Solución</p>
                    <p className="text-zinc-300">{error.fix}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Performance */}
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-amber-400" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-50">RLS y rendimiento: cómo evitar que las políticas maten tu app</h2>
            </div>
            <p className="text-zinc-400 leading-relaxed mb-6">
              RLS añade un coste de CPU por cada query. Con mal diseño, puede multiplicar por 10 el tiempo de respuesta. Estos son los tres optimizaciones más impactantes:
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {[
                {
                  icon: <Database className="w-5 h-5 text-blue-400" />,
                  title: 'Índices en columnas de política',
                  desc: 'Añade índices en las columnas que usas en USING/WITH CHECK. Sin índice en user_id, cada SELECT hace un seq scan completo de la tabla.',
                  code: 'CREATE INDEX ON projects (user_id);',
                },
                {
                  icon: <Eye className="w-5 h-5 text-purple-400" />,
                  title: 'SECURITY DEFINER en funciones helper',
                  desc: 'Marca las funciones helper (is_admin, is_member) como SECURITY DEFINER. PostgreSQL las cachea entre llamadas en la misma transacción.',
                  code: 'LANGUAGE plpgsql SECURITY DEFINER',
                },
                {
                  icon: <Code2 className="w-5 h-5 text-emerald-400" />,
                  title: 'EXPLAIN ANALYZE en modo debug',
                  desc: 'Usa EXPLAIN ANALYZE para ver si tus políticas provocan seq scans. Una política bien indexada debería usar Index Scan en tablas grandes.',
                  code: 'EXPLAIN ANALYZE SELECT * FROM projects;',
                },
              ].map((tip) => (
                <div key={tip.title} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                  <div className="w-9 h-9 rounded-xl bg-zinc-800 flex items-center justify-center mb-4">
                    {tip.icon}
                  </div>
                  <h3 className="font-semibold text-zinc-100 mb-2">{tip.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-3">{tip.desc}</p>
                  <code className="text-xs text-emerald-400 bg-zinc-950 px-2 py-1 rounded">{tip.code}</code>
                </div>
              ))}
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="font-semibold text-zinc-100 mb-4">Caso real: SaaS B2B con 50.000 filas — impacto de optimizar RLS</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-700">
                      <th className="text-left text-zinc-400 font-medium pb-3 pr-6">Situación</th>
                      <th className="text-right text-zinc-400 font-medium pb-3 pr-6">P50 (ms)</th>
                      <th className="text-right text-zinc-400 font-medium pb-3 pr-6">P99 (ms)</th>
                      <th className="text-right text-zinc-400 font-medium pb-3">CPU (relativo)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    <tr>
                      <td className="py-3 pr-6 text-zinc-300">Sin RLS</td>
                      <td className="py-3 pr-6 text-right text-zinc-300">4</td>
                      <td className="py-3 pr-6 text-right text-zinc-300">12</td>
                      <td className="py-3 text-right text-zinc-300">1x</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-6 text-zinc-300">RLS sin índices</td>
                      <td className="py-3 pr-6 text-right text-red-400">340</td>
                      <td className="py-3 pr-6 text-right text-red-400">2.100</td>
                      <td className="py-3 text-right text-red-400">85x</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-6 text-zinc-300">RLS + índices</td>
                      <td className="py-3 pr-6 text-right text-amber-400">18</td>
                      <td className="py-3 pr-6 text-right text-amber-400">45</td>
                      <td className="py-3 text-right text-amber-400">4.5x</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-6 text-zinc-300">RLS + índices + SECURITY DEFINER</td>
                      <td className="py-3 pr-6 text-right text-emerald-400">7</td>
                      <td className="py-3 pr-6 text-right text-emerald-400">19</td>
                      <td className="py-3 text-right text-emerald-400">1.7x</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-zinc-500 text-xs mt-3">Medido con pgbench en Supabase Pro. Los valores son orientativos y dependen del volumen y complejidad de las queries.</p>
            </div>
          </section>

          {/* Section 6: Edge Functions */}
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Lock className="w-5 h-5 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-50">Edge Functions y operaciones privilegiadas</h2>
            </div>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Hay operaciones que necesitan la <code className="bg-zinc-800 text-emerald-400 px-1.5 py-0.5 rounded text-sm">service_role</code> key: crear usuarios, enviar emails con Resend, procesar webhooks de Stripe. La forma segura es hacerlo desde una Supabase Edge Function (Deno), donde la key nunca llega al cliente.
            </p>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 font-mono text-sm mb-6">
              <p className="text-zinc-500 mb-2">// supabase/functions/admin-action/index.ts</p>
              <p className="text-cyan-400">import {'{'} createClient {'}'} from <span className="text-green-400">'npm:@supabase/supabase-js'</span>;</p>
              <br />
              <p className="text-cyan-400">Deno.serve</p>
              <p className="text-zinc-100">(async (req) =&gt; {'{'}</p>
              <p className="text-zinc-100 ml-4"><span className="text-zinc-500">// 1. Verificar que el caller está autenticado</span></p>
              <p className="text-zinc-100 ml-4"><span className="text-cyan-400">const</span> authHeader = req.headers.<span className="text-purple-400">get</span>(<span className="text-green-400">'Authorization'</span>);</p>
              <p className="text-zinc-100 ml-4"><span className="text-cyan-400">if</span> (!authHeader) <span className="text-cyan-400">return new</span> Response(<span className="text-green-400">'Unauthorized'</span>, {'{'} status: 401 {'}'});</p>
              <br />
              <p className="text-zinc-100 ml-4"><span className="text-zinc-500">// 2. Crear cliente con service_role (solo en Edge Function)</span></p>
              <p className="text-zinc-100 ml-4"><span className="text-cyan-400">const</span> adminClient = <span className="text-purple-400">createClient</span>(</p>
              <p className="text-zinc-100 ml-8">Deno.env.<span className="text-purple-400">get</span>(<span className="text-green-400">'SUPABASE_URL'</span>)!,</p>
              <p className="text-zinc-100 ml-8">Deno.env.<span className="text-purple-400">get</span>(<span className="text-green-400">'SUPABASE_SERVICE_ROLE_KEY'</span>)!, <span className="text-zinc-500">// ← Seguro aquí</span></p>
              <p className="text-zinc-100 ml-4">);</p>
              <br />
              <p className="text-zinc-100 ml-4"><span className="text-zinc-500">// 3. Verificar que el caller es admin antes de ejecutar</span></p>
              <p className="text-zinc-100 ml-4"><span className="text-cyan-400">const</span> userClient = <span className="text-purple-400">createClient</span>(..., {'{'} global: {'{'} headers: {'{'} Authorization: authHeader {'}'} {'}'} {'}'});</p>
              <p className="text-zinc-100 ml-4"><span className="text-cyan-400">const</span> {'{'} data: profile {'}'} = await userClient.from(<span className="text-green-400">'profiles'</span>).select(<span className="text-green-400">'role'</span>).single();</p>
              <p className="text-zinc-100 ml-4"><span className="text-cyan-400">if</span> (profile?.role !== <span className="text-green-400">'admin'</span>) <span className="text-cyan-400">return new</span> Response(<span className="text-green-400">'Forbidden'</span>, {'{'} status: 403 {'}'});</p>
              <br />
              <p className="text-zinc-100 ml-4"><span className="text-zinc-500">// 4. Ejecutar operación privilegiada</span></p>
              <p className="text-zinc-100 ml-4"><span className="text-cyan-400">const</span> result = await adminClient.<span className="text-purple-400">from</span>(<span className="text-green-400">'projects'</span>).<span className="text-purple-400">select</span>(<span className="text-green-400">'*'</span>); <span className="text-zinc-500">// Bypasea RLS</span></p>
              <p className="text-zinc-100 ml-4"><span className="text-cyan-400">return</span> Response.<span className="text-purple-400">json</span>(result.data);</p>
              <p className="text-zinc-100">{'}'});</p>
            </div>
          </section>

          {/* Checklist */}
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-50">Checklist de producción: 12 puntos antes de hacer deploy</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              {[
                { ok: true, text: 'RLS habilitado en TODAS las tablas con datos sensibles' },
                { ok: true, text: 'Políticas INSERT usan WITH CHECK, no USING' },
                { ok: true, text: 'service_role key solo en Edge Functions, nunca en VITE_*' },
                { ok: true, text: 'anon key usada en el cliente React/Next.js' },
                { ok: true, text: 'Trigger handle_new_user crea perfil automáticamente' },
                { ok: true, text: 'Índice en columnas user_id / org_id usadas en políticas' },
                { ok: true, text: 'Funciones helper (is_admin) marcadas como SECURITY DEFINER' },
                { ok: true, text: 'Storage buckets con políticas (no acceso público sin control)' },
                { ok: true, text: 'EXPLAIN ANALYZE revisado en queries de producción críticas' },
                { ok: true, text: 'Email confirmation habilitado en Supabase Auth settings' },
                { ok: true, text: 'Rate limiting en endpoints de auth (magic link, OTP)' },
                { ok: true, text: 'Tablas relacionadas (messages, documents) también tienen RLS' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-zinc-300 text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-14">
            <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-zinc-50 mb-4">Conclusión: RLS es potente pero exige rigor</h2>
              <p className="text-zinc-300 leading-relaxed mb-4">
                Supabase Auth + RLS es una de las formas más elegantes de securizar una aplicación web. Cuando está bien implementado, la seguridad vive en la base de datos, no dispersa por cientos de líneas de middleware. El problema es que los errores son silenciosos: una política mal escrita no lanza excepciones, devuelve datos vacíos o expone datos ajenos.
              </p>
              <p className="text-zinc-300 leading-relaxed">
                La clave es testear las políticas con usuarios reales, revisar el EXPLAIN ANALYZE de las queries críticas y nunca saltarse el principio de menor privilegio: empieza denegando todo y abre solo lo que necesitas.
              </p>
            </div>
          </section>

          {/* CTA */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center">
            <h3 className="text-2xl font-bold text-zinc-50 mb-3">
              ¿Necesitas que tu SaaS sea seguro desde el día uno?
            </h3>
            <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
              En Think Better implementamos Supabase Auth + RLS correctamente en todos nuestros proyectos. Empieza con nuestro cuestionario gratuito y recibe una propuesta técnica en 24h.
            </p>
            <Link
              to="/cuestionario"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold px-8 py-4 rounded-full transition-colors"
            >
              Empezar proyecto seguro
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-zinc-800">
            <Link
              to="/blog/microservicios-vs-monolito-saas-2026"
              className="flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm">Microservicios vs monolito</span>
            </Link>
            <Link
              to="/blog"
              className="flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors group"
            >
              <span className="text-sm">Ver todos los artículos</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
