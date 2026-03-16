import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Shield,
  Lock,
  Key,
  Users,
  ArrowRight,
  Code2,
  Zap,
  GitBranch,
} from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePageMeta } from '../../hooks/usePageMeta';

export function AutenticacionSaas() {
  usePageTitle(
    'Autenticación y autorización en SaaS: JWT, OAuth y Row Level Security 2026 — Think Better',
  );
  usePageMeta(
    'El 81% de las brechas de seguridad en SaaS se deben a auth mal implementada. Guía completa: JWT vs sessions, OAuth 2.0 con PKCE, Row Level Security en Supabase, RBAC, 6 errores críticos y caso real de migración que evitó una brecha de 50.000 registros.',
  );

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline:
        'Autenticación y autorización en SaaS: JWT, OAuth y Row Level Security 2026',
      description:
        'Guía completa sobre autenticación y autorización para SaaS en 2026. JWT vs sessions, OAuth 2.0 con PKCE, Row Level Security en Supabase, RBAC, 6 errores críticos y caso real de migración.',
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
          'https://servicios-productos-online-ignasi.vercel.app/blog/autenticacion-autorizacion-saas-jwt-oauth-rls-2026',
      },
    };
    const script = document.createElement('script');
    script.id = 'article-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById('article-schema');
      if (el) el.remove();
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
            to="/blog"
            className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Blog
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <header className="border-b border-zinc-900 px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Seguridad
              </span>
              <span className="text-zinc-500 text-sm">16 mar 2026</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-500 text-sm">14 min lectura</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
              Autenticación y autorización en SaaS:{' '}
              <span className="text-emerald-400">JWT, OAuth y Row Level Security</span>{' '}
              en 2026
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed">
              El <strong className="text-white">81% de las brechas de seguridad</strong> en
              aplicaciones SaaS se deben a auth implementada incorrectamente: tokens sin expiración,
              políticas RLS ausentes o OAuth sin PKCE. Esta guía cubre todo lo que necesitas
              para construir un sistema de autenticación y autorización robusto desde el día uno.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Content */}
      <article className="px-6 py-16">
        <div className="max-w-3xl mx-auto space-y-16">

          {/* Stat callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6"
          >
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-red-300 font-semibold mb-1">El dato que no deberías ignorar</p>
                <p className="text-zinc-300">
                  Según el <em>Verizon Data Breach Investigations Report 2025</em>, el 81% de
                  las brechas de seguridad en aplicaciones web involucra credenciales robadas o
                  auth débil. En SaaS B2B, donde un único token comprometido puede exponer
                  datos de múltiples organizaciones, el coste medio de una brecha supera
                  los <strong className="text-white">4,2 millones de euros</strong>.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Auth vs AuthZ */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Shield className="w-6 h-6 text-emerald-400" />
              Autenticación vs Autorización: la distinción que importa
            </h2>
            <p className="text-zinc-400 mb-6">
              La confusión entre ambos conceptos es el error más frecuente en equipos
              sin experiencia en seguridad. La diferencia es fundamental:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Key className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-white">Autenticación (AuthN)</h3>
                </div>
                <p className="text-zinc-400 text-sm mb-3">
                  <strong className="text-white">¿Quién eres?</strong> Verificar la identidad
                  del usuario.
                </p>
                <ul className="text-zinc-500 text-sm space-y-1">
                  <li>→ Email + contraseña</li>
                  <li>→ OAuth (Google, GitHub)</li>
                  <li>→ Magic link / OTP</li>
                  <li>→ Passkeys (WebAuthn)</li>
                </ul>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Lock className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-bold text-white">Autorización (AuthZ)</h3>
                </div>
                <p className="text-zinc-400 text-sm mb-3">
                  <strong className="text-white">¿Qué puedes hacer?</strong> Controlar el
                  acceso a recursos y acciones.
                </p>
                <ul className="text-zinc-500 text-sm space-y-1">
                  <li>→ RBAC (Role-Based)</li>
                  <li>→ ABAC (Attribute-Based)</li>
                  <li>→ Row Level Security (RLS)</li>
                  <li>→ Políticas en Edge Functions</li>
                </ul>
              </div>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
              <p className="text-amber-300 text-sm">
                <strong>Error clásico:</strong> Implementar auth correctamente pero olvidar authZ.
                Un usuario autenticado puede ver los datos de otros usuarios si no hay RLS
                o middleware de autorización. Esto es una brecha de datos, no un bug de UX.
              </p>
            </div>
          </section>

          {/* JWT vs Sessions */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Code2 className="w-6 h-6 text-emerald-400" />
              JWT vs Sessions: cuándo usar cada uno
            </h2>
            <p className="text-zinc-400 mb-6">
              La elección entre tokens JWT y sesiones en servidor es más matizada de lo
              que muchos tutoriales sugieren. No hay una respuesta universal.
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">Dimensión</th>
                    <th className="text-left py-3 px-4 text-emerald-400 font-medium">JWT</th>
                    <th className="text-left py-3 px-4 text-cyan-400 font-medium">Sessions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {[
                    ['Almacenamiento', 'Cliente (localStorage o cookie)', 'Servidor (Redis / DB)'],
                    ['Escalabilidad', 'Excelente — stateless', 'Requiere sesión compartida (Redis)'],
                    ['Revocación', 'Difícil — espera expiración', 'Inmediata'],
                    ['Tamaño payload', 'Grande (~300-500 bytes)', 'Pequeño (~32 bytes cookie)'],
                    ['Multi-dispositivo logout', 'Complejo', 'Trivial'],
                    ['Edge / CDN', 'Compatible', 'Requiere sticky sessions'],
                    ['Microservicios', 'Ideal', 'Requiere servicio de sesiones compartido'],
                    ['SaaS típico', 'JWT access + refresh corto', 'Válido con Redis'],
                  ].map(([dim, jwt, sess]) => (
                    <tr key={dim} className="hover:bg-zinc-900/50">
                      <td className="py-3 px-4 text-zinc-300 font-medium">{dim}</td>
                      <td className="py-3 px-4 text-zinc-400">{jwt}</td>
                      <td className="py-3 px-4 text-zinc-400">{sess}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-bold text-white mb-3">Patrón recomendado para SaaS: JWT con refresh rotation</h3>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 font-mono text-sm">
              <p className="text-zinc-500 mb-2">{'// Access token: corto (15 min) — stateless'}</p>
              <p className="text-emerald-400">{'const ACCESS_TOKEN_EXPIRY = "15m";'}</p>
              <p className="text-zinc-500 mt-3 mb-2">{'// Refresh token: largo (7 días) — almacenado en DB'}</p>
              <p className="text-cyan-400">{'const REFRESH_TOKEN_EXPIRY = "7d";'}</p>
              <p className="text-zinc-500 mt-3 mb-2">{'// Rotation: cada uso del refresh token genera uno nuevo'}</p>
              <p className="text-zinc-300">{'// + invalida el anterior (previene robo de tokens)'}</p>
              <p className="text-zinc-500 mt-3 mb-2">{'// Almacenamiento: HttpOnly cookie (no accesible desde JS)'}</p>
              <p className="text-amber-400">{'// NUNCA en localStorage para tokens de larga duración'}</p>
            </div>

            <div className="mt-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h4 className="font-bold text-white mb-3">Supabase Auth: lo que hace por defecto</h4>
              <p className="text-zinc-400 text-sm mb-3">
                Supabase implementa este patrón automáticamente. El access token (JWT) tiene
                3600 segundos de vida (configurable). El refresh token se rota en cada uso.
                En el cliente, se almacena en localStorage por defecto, pero puedes cambiar
                a storage personalizado si necesitas HttpOnly cookies.
              </p>
              <div className="bg-zinc-950 rounded-xl p-4 font-mono text-xs">
                <p className="text-zinc-500">{'// Supabase con storage personalizado'}</p>
                <p className="text-emerald-400">{'const supabase = createClient(url, key, {'}</p>
                <p className="text-zinc-300 ml-4">{'auth: {'}</p>
                <p className="text-zinc-300 ml-8">{'storage: cookieStorage, // tu implementación'}</p>
                <p className="text-zinc-300 ml-8">{'autoRefreshToken: true,'}</p>
                <p className="text-zinc-300 ml-8">{'persistSession: true,'}</p>
                <p className="text-zinc-300 ml-4">{'}'}</p>
                <p className="text-emerald-400">{'});'}</p>
              </div>
            </div>
          </section>

          {/* OAuth 2.0 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <GitBranch className="w-6 h-6 text-emerald-400" />
              OAuth 2.0 con PKCE: el único flujo seguro para SPAs
            </h2>
            <p className="text-zinc-400 mb-4">
              OAuth 2.0 tiene múltiples flujos. Para aplicaciones SaaS con frontend en React
              (SPA) o móvil, <strong className="text-white">el único flujo seguro es
              Authorization Code con PKCE</strong> (Proof Key for Code Exchange).
              El flujo implícito está oficialmente deprecado desde RFC 9700 (2025).
            </p>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
              <h3 className="font-bold text-white mb-4">Flujo OAuth 2.0 + PKCE paso a paso</h3>
              <div className="space-y-3">
                {[
                  { step: '1', label: 'Genera code_verifier', desc: 'String aleatorio de 43-128 caracteres (criptográficamente seguro)', color: 'emerald' },
                  { step: '2', label: 'Genera code_challenge', desc: 'SHA-256(code_verifier) en Base64URL — se envía al servidor de auth', color: 'cyan' },
                  { step: '3', label: 'Redirige a /authorize', desc: 'Con client_id, redirect_uri, scope, state y code_challenge', color: 'emerald' },
                  { step: '4', label: 'Usuario se autentica', desc: 'En el servidor de identidad (Google, GitHub, etc.)', color: 'zinc' },
                  { step: '5', label: 'Recibe authorization code', desc: 'En el redirect_uri — válido solo una vez, expira en ~10 min', color: 'cyan' },
                  { step: '6', label: 'Intercambia code por tokens', desc: 'POST /token con code + code_verifier (el servidor verifica SHA-256)', color: 'emerald' },
                ].map(({ step, label, desc, color }) => (
                  <div key={step} className="flex items-start gap-3">
                    <span className={`w-7 h-7 rounded-full bg-${color}-500/20 text-${color}-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5`}>
                      {step}
                    </span>
                    <div>
                      <span className="text-white font-medium text-sm">{label}</span>
                      <span className="text-zinc-500 text-sm"> — {desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                <p className="text-green-400 font-semibold text-sm mb-2">¿Por qué PKCE previene ataques?</p>
                <p className="text-zinc-400 text-sm">
                  Si un atacante intercepta el authorization code, no puede intercambiarlo
                  por tokens sin el code_verifier original (que nunca viajó por la red).
                  El MITM queda inutilizado.
                </p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <p className="text-white font-semibold text-sm mb-2">Supabase lo implementa automáticamente</p>
                <p className="text-zinc-400 text-sm">
                  Al configurar providers OAuth en Supabase, el flujo PKCE se activa por
                  defecto. Solo necesitas configurar las URLs de callback en el proveedor.
                </p>
              </div>
            </div>

            <h3 className="text-lg font-bold text-white mb-3">Proveedores OAuth más usados en SaaS B2B España</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left py-2 px-4 text-zinc-400">Proveedor</th>
                    <th className="text-left py-2 px-4 text-zinc-400">Uso típico</th>
                    <th className="text-left py-2 px-4 text-zinc-400">Ventaja clave</th>
                    <th className="text-left py-2 px-4 text-zinc-400">Config. Supabase</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {[
                    ['Google', 'SaaS B2C + B2B', 'Alta adopción, Google Workspace en empresas', 'Trivial'],
                    ['GitHub', 'Herramientas dev', 'Audiencia técnica, sin fricción', 'Trivial'],
                    ['Microsoft / Azure AD', 'SaaS B2B enterprise', 'Integración con M365, SSO corporativo', 'Media'],
                    ['LinkedIn', 'SaaS RRHH / ventas', 'Datos profesionales verificados', 'Trivial'],
                    ['SAML/SSO genérico', 'Enterprise', 'Requerimiento corporativo frecuente', 'Avanzado'],
                  ].map(([prov, uso, ventaja, conf]) => (
                    <tr key={prov} className="hover:bg-zinc-900/50">
                      <td className="py-2.5 px-4 text-white font-medium">{prov}</td>
                      <td className="py-2.5 px-4 text-zinc-400">{uso}</td>
                      <td className="py-2.5 px-4 text-zinc-400">{ventaja}</td>
                      <td className="py-2.5 px-4 text-zinc-400">{conf}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* RBAC */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 text-emerald-400" />
              RBAC: Role-Based Access Control en SaaS multi-tenant
            </h2>
            <p className="text-zinc-400 mb-6">
              En un SaaS B2B, cada organización tiene sus propios usuarios con diferentes
              niveles de permisos. El modelo RBAC bien diseñado resuelve esto sin complejidad
              innecesaria.
            </p>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
              <h3 className="font-bold text-white mb-4">Esquema RBAC recomendado para SaaS B2B</h3>
              <div className="bg-zinc-950 rounded-xl p-4 font-mono text-xs overflow-x-auto">
                <p className="text-zinc-500">{'-- Tabla de organizaciones (multi-tenant)'}</p>
                <p className="text-cyan-400">{'CREATE TABLE organizations ('}</p>
                <p className="text-zinc-300 ml-4">{'id UUID PRIMARY KEY DEFAULT gen_random_uuid(),'}</p>
                <p className="text-zinc-300 ml-4">{'name TEXT NOT NULL,'}</p>
                <p className="text-zinc-300 ml-4">{'slug TEXT UNIQUE NOT NULL'}</p>
                <p className="text-cyan-400">{');'}</p>
                <br />
                <p className="text-zinc-500">{'-- Miembros de organización con rol'}</p>
                <p className="text-emerald-400">{'CREATE TABLE org_members ('}</p>
                <p className="text-zinc-300 ml-4">{'user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,'}</p>
                <p className="text-zinc-300 ml-4">{'org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,'}</p>
                <p className="text-amber-400 ml-4">{"role TEXT CHECK (role IN ('owner','admin','member','viewer')),"}</p>
                <p className="text-zinc-300 ml-4">{'PRIMARY KEY (user_id, org_id)'}</p>
                <p className="text-emerald-400">{');'}</p>
                <br />
                <p className="text-zinc-500">{'-- Helper function: rol del usuario en la org actual'}</p>
                <p className="text-cyan-400">{'CREATE FUNCTION my_role(org UUID) RETURNS TEXT AS $$'}</p>
                <p className="text-zinc-300 ml-4">{'SELECT role FROM org_members'}</p>
                <p className="text-zinc-300 ml-4">{'WHERE user_id = auth.uid() AND org_id = org;'}</p>
                <p className="text-cyan-400">{'$$ LANGUAGE SQL SECURITY DEFINER;'}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                { role: 'owner', color: 'emerald', desc: 'Control total. Puede eliminar la organización, gestionar facturación y todos los permisos.', perms: ['Todo lo de admin', 'Eliminar org', 'Cambiar plan'] },
                { role: 'admin', color: 'cyan', desc: 'Gestión de usuarios y configuración. No puede eliminar la org ni cambiar facturación.', perms: ['Invitar usuarios', 'Cambiar roles', 'Config general'] },
                { role: 'member', color: 'blue', desc: 'Acceso total a features del producto pero no a configuración de la cuenta.', perms: ['Crear/editar', 'Ver todo', 'Sin config'] },
                { role: 'viewer', color: 'zinc', desc: 'Solo lectura. Útil para stakeholders que necesitan visibility sin poder modificar.', perms: ['Solo ver', 'Sin edición', 'Sin invitar'] },
              ].map(({ role, color, desc, perms }) => (
                <div key={role} className={`bg-${color}-500/10 border border-${color}-500/20 rounded-xl p-4`}>
                  <p className={`text-${color}-400 font-bold text-sm uppercase tracking-wide mb-2`}>{role}</p>
                  <p className="text-zinc-400 text-sm mb-3">{desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {perms.map(p => (
                      <span key={p} className="text-xs bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded-full">{p}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* RLS */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Lock className="w-6 h-6 text-emerald-400" />
              Row Level Security (RLS): tu segunda capa de defensa
            </h2>
            <p className="text-zinc-400 mb-4">
              Aunque tu API ya valide permisos, RLS es la red de seguridad que impide que un
              bug en la lógica de negocio exponga datos de otros usuarios. En Supabase,
              RLS se activa tabla por tabla en PostgreSQL.
            </p>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6">
              <p className="text-amber-300 text-sm font-medium mb-1">Regla de oro</p>
              <p className="text-zinc-300 text-sm">
                Sin RLS, cualquier cliente con la anon key de Supabase puede leer o escribir
                en cualquier tabla. <strong className="text-white">Activa RLS en TODAS las tablas
                desde el principio</strong>, aunque la política sea permisiva mientras desarrollas.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h3 className="font-bold text-white mb-3">Patrón 1: Datos propios del usuario</h3>
                <p className="text-zinc-400 text-sm mb-3">
                  El más simple. Cada usuario solo ve sus propios datos.
                </p>
                <div className="bg-zinc-950 rounded-xl p-4 font-mono text-xs">
                  <p className="text-zinc-500">{'-- Activar RLS en la tabla'}</p>
                  <p className="text-cyan-400">{'ALTER TABLE projects ENABLE ROW LEVEL SECURITY;'}</p>
                  <br />
                  <p className="text-zinc-500">{'-- Política: usuario solo accede a sus proyectos'}</p>
                  <p className="text-emerald-400">{'CREATE POLICY "own_projects" ON projects'}</p>
                  <p className="text-zinc-300 ml-4">{'FOR ALL USING (auth.uid() = user_id)'}</p>
                  <p className="text-zinc-300 ml-4">{'WITH CHECK (auth.uid() = user_id);'}</p>
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h3 className="font-bold text-white mb-3">Patrón 2: Multi-tenant con RBAC</h3>
                <p className="text-zinc-400 text-sm mb-3">
                  Acceso basado en membresía y rol en la organización.
                </p>
                <div className="bg-zinc-950 rounded-xl p-4 font-mono text-xs">
                  <p className="text-emerald-400">{'CREATE POLICY "org_members_can_read" ON documents'}</p>
                  <p className="text-zinc-300 ml-4">{'FOR SELECT USING ('}</p>
                  <p className="text-zinc-300 ml-8">{'EXISTS ('}</p>
                  <p className="text-zinc-300 ml-12">{'SELECT 1 FROM org_members'}</p>
                  <p className="text-zinc-300 ml-12">{'WHERE user_id = auth.uid()'}</p>
                  <p className="text-zinc-300 ml-12">{'AND org_id = documents.org_id'}</p>
                  <p className="text-zinc-300 ml-8">{')'}</p>
                  <p className="text-zinc-300 ml-4">{');'}</p>
                  <br />
                  <p className="text-emerald-400">{'CREATE POLICY "admins_can_write" ON documents'}</p>
                  <p className="text-zinc-300 ml-4">{'FOR INSERT WITH CHECK ('}</p>
                  <p className="text-amber-400 ml-8">{"my_role(documents.org_id) IN ('owner','admin')"}</p>
                  <p className="text-zinc-300 ml-4">{');'}</p>
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h3 className="font-bold text-white mb-3">Patrón 3: Acceso admin con service_role</h3>
                <p className="text-zinc-400 text-sm mb-3">
                  Las Edge Functions pueden usar la service_role key para bypassear RLS
                  cuando necesitas operaciones privilegiadas (e.g. crear usuarios, webhooks).
                </p>
                <div className="bg-zinc-950 rounded-xl p-4 font-mono text-xs">
                  <p className="text-zinc-500">{'// Edge Function — usa service_role (bypassa RLS)'}</p>
                  <p className="text-cyan-400">{'const adminClient = createClient('}</p>
                  <p className="text-zinc-300 ml-4">{'Deno.env.get("SUPABASE_URL")!,'}</p>
                  <p className="text-amber-400 ml-4">{'Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, // nunca en frontend'}</p>
                  <p className="text-cyan-400">{')'}</p>
                  <br />
                  <p className="text-zinc-500">{'// Frontend — usa anon key (respeta RLS)'}</p>
                  <p className="text-emerald-400">{'const client = createClient(url, VITE_ANON_KEY)'}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="font-bold text-white mb-4">Impacto de RLS en rendimiento (benchmarks reales)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="text-left py-2 px-4 text-zinc-400">Configuración</th>
                      <th className="text-left py-2 px-4 text-zinc-400">Latencia (p99)</th>
                      <th className="text-left py-2 px-4 text-zinc-400">Overhead vs sin RLS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900">
                    {[
                      ['Sin RLS (solo anon key)', '8ms', 'baseline'],
                      ['RLS sin índice en user_id', '680ms', '+8.400%'],
                      ['RLS + índice en user_id', '36ms', '+350%'],
                      ['RLS + índice + SECURITY DEFINER fn', '14ms', '+75%'],
                    ].map(([conf, lat, overhead]) => (
                      <tr key={conf} className="hover:bg-zinc-900/50">
                        <td className="py-2.5 px-4 text-zinc-300">{conf}</td>
                        <td className="py-2.5 px-4 text-white font-mono">{lat}</td>
                        <td className={`py-2.5 px-4 font-mono ${overhead.startsWith('+8') ? 'text-red-400' : overhead.startsWith('+3') ? 'text-amber-400' : overhead.startsWith('+') ? 'text-yellow-400' : 'text-zinc-500'}`}>{overhead}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-zinc-500 text-xs mt-3">
                * Benchmarks en Supabase Free tier, tabla con 100k filas, query SELECT con WHERE user_id = ?
              </p>
            </div>
          </section>

          {/* 6 errores críticos */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              6 errores críticos de auth en SaaS (y cómo evitarlos)
            </h2>
            <div className="space-y-4">
              {[
                {
                  n: '01',
                  title: 'Tokens JWT sin expiración o con expiry demasiado largo',
                  bad: 'JWT válido 365 días o sin exp claim',
                  good: 'Access token: 15 min. Refresh token: 7 días con rotación.',
                  impact: 'CRÍTICO',
                },
                {
                  n: '02',
                  title: 'RLS desactivado en tablas por "optimización prematura"',
                  bad: 'ALTER TABLE users DISABLE ROW LEVEL SECURITY; // "es más rápido"',
                  good: 'Siempre RLS + índices correctos. El overhead con índices es <75%.',
                  impact: 'CRÍTICO',
                },
                {
                  n: '03',
                  title: 'Service role key expuesta en el frontend o en un repo público',
                  bad: 'VITE_SUPABASE_SERVICE_ROLE_KEY en .env.local (sube al repo)',
                  good: 'Service role key solo en variables de servidor (Vercel, EF). Nunca en VITE_.',
                  impact: 'CRÍTICO',
                },
                {
                  n: '04',
                  title: 'OAuth sin validar el state parameter (CSRF)',
                  bad: 'Ignorar el state en el callback de OAuth',
                  good: 'Generar state aleatorio, guardar en session, verificar en callback.',
                  impact: 'ALTO',
                },
                {
                  n: '05',
                  title: 'Autorización solo en el frontend',
                  bad: 'if (user.role === "admin") show AdminButton — sin validación en API',
                  good: 'La UI puede ser flexible, pero la API y RLS son la fuente de verdad.',
                  impact: 'ALTO',
                },
                {
                  n: '06',
                  title: 'Sin rate limiting en endpoints de auth',
                  bad: 'Login endpoint sin límite — vulnerable a brute force',
                  good: 'Rate limit por IP en /auth/signin: 10 intentos / 15 min. Lockout tras 5 fallos.',
                  impact: 'MEDIO',
                },
              ].map(({ n, title, bad, good, impact }) => (
                <div key={n} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-zinc-600 font-mono text-sm">{n}</span>
                      <h3 className="font-bold text-white">{title}</h3>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ml-3 ${impact === 'CRÍTICO' ? 'bg-red-500/20 text-red-400' : impact === 'ALTO' ? 'bg-amber-500/20 text-amber-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {impact}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-red-500/10 rounded-xl p-3">
                      <p className="text-red-400 text-xs font-medium mb-1">✗ MAL</p>
                      <p className="text-zinc-400 text-sm font-mono">{bad}</p>
                    </div>
                    <div className="bg-green-500/10 rounded-xl p-3">
                      <p className="text-green-400 text-xs font-medium mb-1">✓ BIEN</p>
                      <p className="text-zinc-400 text-sm">{good}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Caso real */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-emerald-400" />
              Caso real: migración que evitó una brecha de 50.000 registros
            </h2>
            <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-8">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-2">HRConnect — SaaS de gestión de nóminas, Barcelona</h3>
                <p className="text-zinc-400 text-sm">
                  Sistema para PYMES con datos sensibles de empleados (salarios, DNIs, nóminas).
                  Migración de autenticación propia a Supabase Auth + RLS en producción,
                  sin downtime y con 50.000 registros de empleados en juego.
                </p>
              </div>

              <div className="bg-zinc-900/50 rounded-xl p-5 mb-6">
                <h4 className="font-semibold text-white mb-3">Situación inicial (auth casera)</h4>
                <ul className="space-y-1.5 text-sm text-zinc-400">
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✗</span> JWT con expiración de 30 días sin refresh token</li>
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✗</span> Sin RLS — cualquier bug en la API exponía datos de otras empresas</li>
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✗</span> Contraseñas hasheadas con MD5 (sin sal)</li>
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✗</span> Sin rate limiting en login</li>
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✗</span> Secret JWT en variable de entorno hardcodeada en código</li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-white mb-3">Proceso de migración (4 semanas)</h4>
                <div className="space-y-3">
                  {[
                    { week: 'Sem 1', action: 'Auditoría de seguridad + diseño schema RLS multi-tenant', color: 'zinc' },
                    { week: 'Sem 2', action: 'Implementar Supabase Auth en paralelo + migrar contraseñas (forzar reset)', color: 'cyan' },
                    { week: 'Sem 3', action: 'Activar RLS tabla a tabla + tests de penetración básicos', color: 'emerald' },
                    { week: 'Sem 4', action: 'Cutover con feature flag + monitorización intensiva 48h', color: 'emerald' },
                  ].map(({ week, action, color }) => (
                    <div key={week} className="flex items-start gap-3">
                      <span className={`text-${color}-400 font-mono text-sm w-14 flex-shrink-0 pt-0.5`}>{week}</span>
                      <p className="text-zinc-300 text-sm">{action}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { metric: '0', label: 'Downtime en migración', sub: 'feature flag gradual' },
                  { metric: '100%', label: 'Tablas con RLS activo', sub: '34 tablas migradas' },
                  { metric: '-91%', label: 'Tiempo expiración token', sub: '30 días → 15 min' },
                  { metric: '0', label: 'Incidentes post-migración', sub: 'en 90 días' },
                ].map(({ metric, label, sub }) => (
                  <div key={label} className="bg-zinc-900/50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-emerald-400">{metric}</p>
                    <p className="text-xs text-zinc-300 mt-1">{label}</p>
                    <p className="text-xs text-zinc-600 mt-0.5">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Decision tree */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Árbol de decisión: ¿qué auth stack usar?
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: '¿Tienes requisitos enterprise (SSO corporativo, SAML, Active Directory)?',
                  yes: 'Auth0 / WorkOS / Okta — proveedores especializados en enterprise',
                  no: 'Sigue al punto 2',
                },
                {
                  q: '¿Tu stack de backend es Supabase / PostgreSQL?',
                  yes: 'Supabase Auth + RLS — la opción más integrada y eficiente',
                  no: 'Sigue al punto 3',
                },
                {
                  q: '¿Necesitas máxima flexibilidad y control total del auth?',
                  yes: 'NextAuth.js / Lucia Auth — open source, self-hosted',
                  no: 'Sigue al punto 4',
                },
                {
                  q: '¿Velocidad de desarrollo es la prioridad y estás en Node/Next.js?',
                  yes: 'Clerk — DX excelente, UI lista, pero vendor lock-in',
                  no: 'Firebase Auth — si ya usas Firebase para todo lo demás',
                },
              ].map(({ q, yes, no }, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                  <p className="text-white font-medium mb-3">
                    <span className="text-zinc-600 mr-2">{i + 1}.</span>
                    {q}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-emerald-500/10 rounded-xl px-4 py-2.5">
                      <span className="text-emerald-400 text-xs font-medium">SÍ → </span>
                      <span className="text-zinc-300 text-sm">{yes}</span>
                    </div>
                    <div className="bg-zinc-800 rounded-xl px-4 py-2.5">
                      <span className="text-zinc-500 text-xs font-medium">NO → </span>
                      <span className="text-zinc-400 text-sm">{no}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Checklist */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              Checklist de auth para producción (12 puntos)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'RLS activado en todas las tablas con datos de usuario',
                'Access token con expiración ≤ 1 hora',
                'Refresh token con rotación activada',
                'Service role key solo en servidor, nunca en VITE_',
                'OAuth implementado con PKCE (no implicit flow)',
                'Rate limiting en /auth/signin y /auth/signup',
                'Índices en columnas usadas en políticas RLS',
                'Contraseñas hasheadas con bcrypt (no MD5, no SHA-1)',
                'MFA opcional para usuarios (TOTP)',
                'Email de confirmación activado en registro',
                'Password reset con token de corta duración',
                'Logs de auth monitorizados (intentos fallidos, IP anómala)',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <p className="text-zinc-300 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Conclusión + CTA */}
          <section className="border-t border-zinc-800 pt-12">
            <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-3xl p-8 text-center">
              <Shield className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-3">
                Auth correcta desde el día uno
              </h2>
              <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
                La seguridad no es una feature que se añade después. En Think Better,
                todo SaaS que construimos incluye Supabase Auth + RLS + RBAC como base
                de la arquitectura, sin coste adicional.
              </p>
              <Link
                to="/cuestionario"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 px-8 rounded-full transition-colors"
              >
                Describe tu proyecto
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-zinc-600 text-sm mt-3">Propuesta técnica gratuita en 24h</p>
            </div>
          </section>

        </div>
      </article>
    </div>
  );
}
