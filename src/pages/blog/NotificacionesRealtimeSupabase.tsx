import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Bell,
  Zap,
  Database,
  ArrowRight,
  Code2,
  Users,
  Radio,
  XCircle,
  Shield,
} from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePageMeta } from '../../hooks/usePageMeta';

export function NotificacionesRealtimeSupabase() {
  usePageTitle(
    'Notificaciones en tiempo real con Supabase Realtime: guía completa — Think Better',
  );
  usePageMeta(
    'El 78% de los usuarios abandonan apps que no muestran actualizaciones en tiempo real. Aprende a construir un sistema de notificaciones completo con Supabase Realtime: canales, Broadcast, Presence, PostgreSQL Changes, caso real con latencia <200ms y checklist de producción.',
  );

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline:
        'Cómo construir un sistema de notificaciones en tiempo real con Supabase Realtime',
      description:
        'Guía práctica para implementar notificaciones en tiempo real en SaaS con Supabase Realtime. Canales, Broadcast, Presence, PostgreSQL Changes, ejemplos de código y caso real con latencia media de 180ms.',
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
          'https://servicios-productos-online-ignasi.vercel.app/blog/notificaciones-tiempo-real-supabase-realtime',
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
          <span className="text-zinc-400 text-sm">Backend</span>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 text-sm text-zinc-500 mb-4">
            <span>16 mar 2026</span>
            <span>· 11 min de lectura</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-6">
            Cómo construir un sistema de notificaciones en tiempo real con{' '}
            <span className="text-emerald-400">Supabase Realtime</span>
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed mb-10">
            El{' '}
            <strong className="text-white">
              78% de los usuarios abandonan apps que no muestran actualizaciones
              en tiempo real
            </strong>{' '}
            cuando esperan respuesta inmediata. Aprende a construir un sistema
            de notificaciones completo: canales, Broadcast, Presence y
            PostgreSQL Changes, con ejemplos de código listos para producción.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            {[
              { value: '78%', label: 'Usuarios que esperan actualizaciones en tiempo real' },
              { value: '<200ms', label: 'Latencia media de Supabase Realtime en Europa' },
              { value: '3 tipos', label: 'De canales: Broadcast, Presence y DB Changes' },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-center"
              >
                <div className="text-2xl font-bold text-emerald-400 mb-1">
                  {s.value}
                </div>
                <div className="text-xs text-zinc-500">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="article-body space-y-12">
          {/* Section 1 */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Por qué el tiempo real ya no es opcional en SaaS
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Cuando un cliente envía un mensaje en tu SaaS y tiene que recargar
              la página para ver la respuesta, ya has perdido. Las expectativas
              de los usuarios en 2026 están moldeadas por WhatsApp, Slack,
              Figma y Notion. <strong className="text-zinc-200">Actualizaciones instantáneas
              son la norma, no un lujo.</strong>
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6">
              El problema es que implementar WebSockets desde cero es complejo:
              tienes que gestionar reconexiones, autenticación, escalado
              horizontal y consistencia de estado. Supabase Realtime resuelve
              todo esto con una API de alto nivel construida sobre Phoenix
              Channels (Elixir), capaz de manejar millones de conexiones
              concurrentes.
            </p>

            {/* Casos de uso */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-emerald-400" />
                Casos de uso más comunes en SaaS
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { icon: '💬', label: 'Chat interno entre cliente y equipo' },
                  { icon: '🔔', label: 'Notificaciones push en el dashboard' },
                  { icon: '📊', label: 'KPIs y métricas en tiempo real' },
                  { icon: '🤝', label: 'Colaboración simultánea (cursores, edición)' },
                  { icon: '📦', label: 'Estado de pedidos y entregas en vivo' },
                  { icon: '🚨', label: 'Alertas de sistema y errores críticos' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 text-zinc-400">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Section 2: Los 3 tipos de canales */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Los 3 tipos de canales en Supabase Realtime
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Supabase Realtime ofrece tres mecanismos distintos. Elegir el
              correcto para cada caso marca la diferencia entre una
              implementación elegante y un sistema frágil.
            </p>

            <div className="space-y-4 mb-8">
              {[
                {
                  icon: <Radio className="w-5 h-5 text-emerald-400" />,
                  name: 'Broadcast',
                  desc: 'Mensajes efímeros en tiempo real entre clientes conectados. No persisten en base de datos. Ideal para: cursores en tiempo real, typing indicators, presencia ligera.',
                  when: 'Usa cuando: no necesitas historial, el mensaje solo importa ahora mismo.',
                  color: 'emerald',
                },
                {
                  icon: <Users className="w-5 h-5 text-blue-400" />,
                  name: 'Presence',
                  desc: 'Estado sincronizado de quién está conectado y qué está haciendo. Perfecto para: mostrar usuarios activos, indicadores "online", colaboración en tiempo real.',
                  when: 'Usa cuando: necesitas saber el estado actual de múltiples usuarios simultáneamente.',
                  color: 'blue',
                },
                {
                  icon: <Database className="w-5 h-5 text-purple-400" />,
                  name: 'PostgreSQL Changes',
                  desc: 'Escucha cambios en tablas de tu base de datos (INSERT, UPDATE, DELETE). Los eventos se disparan automáticamente cuando cambia el dato. Ideal para notificaciones persistentes.',
                  when: 'Usa cuando: quieres que la UI reaccione a cambios en la BD sin polling.',
                  color: 'purple',
                },
              ].map((channel) => (
                <div
                  key={channel.name}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    {channel.icon}
                    <h3 className="text-lg font-bold text-white">{channel.name}</h3>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                    {channel.desc}
                  </p>
                  <p className="text-xs text-emerald-400 font-medium">
                    {channel.when}
                  </p>
                </div>
              ))}
            </div>

            {/* Tabla comparativa */}
            <div className="overflow-x-auto rounded-2xl border border-zinc-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-900 border-b border-zinc-800">
                    <th className="text-left p-4 text-zinc-300 font-semibold">Dimensión</th>
                    <th className="text-left p-4 text-emerald-400 font-semibold">Broadcast</th>
                    <th className="text-left p-4 text-blue-400 font-semibold">Presence</th>
                    <th className="text-left p-4 text-purple-400 font-semibold">DB Changes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {[
                    ['Persistencia', 'No', 'No', 'Sí (en BD)'],
                    ['Latencia', '~50ms', '~80ms', '~180ms'],
                    ['RLS aplicada', 'No', 'No', 'Sí'],
                    ['Escala con usuarios', 'Alto', 'Medio', 'Alto'],
                    ['Caso típico', 'Cursores live', 'Online badge', 'Notificaciones'],
                    ['Requiere autenticación', 'Opcional', 'Recomendado', 'Sí'],
                  ].map(([dim, b, p, db]) => (
                    <tr key={dim} className="bg-zinc-950 hover:bg-zinc-900 transition-colors">
                      <td className="p-4 text-zinc-300 font-medium">{dim}</td>
                      <td className="p-4 text-zinc-400">{b}</td>
                      <td className="p-4 text-zinc-400">{p}</td>
                      <td className="p-4 text-zinc-400">{db}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Section 3: Implementación paso a paso */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Implementación paso a paso: sistema de notificaciones completo
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Vamos a construir un sistema de notificaciones funcional para un
              SaaS de gestión de proyectos. El objetivo: cuando el admin cambia
              el estado de un proyecto, el cliente recibe una notificación en
              tiempo real sin recargar la página.
            </p>

            {/* Paso 1 */}
            <div className="space-y-6">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
                    1
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    Schema de la tabla notifications
                  </h3>
                </div>
                <p className="text-zinc-400 text-sm mb-4">
                  Primero creamos la tabla que almacenará las notificaciones.
                  Supabase Realtime escuchará los INSERTs en esta tabla.
                </p>
                <pre className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-emerald-300 overflow-x-auto">
{`-- migrations/008_notifications.sql
create table notifications (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references profiles(id) on delete cascade,
  title       text not null,
  body        text,
  type        text not null default 'info',
  read        boolean not null default false,
  link        text,
  created_at  timestamptz not null default now()
);

-- Índice para consultas por usuario
create index idx_notifications_user_id
  on notifications(user_id, created_at desc);

-- RLS: cada usuario solo ve sus notificaciones
alter table notifications enable row level security;

create policy "Users can read own notifications"
  on notifications for select
  using (auth.uid() = user_id);

create policy "System can insert notifications"
  on notifications for insert
  with check (true);  -- Edge Functions usan service_role

create policy "Users can update own notifications"
  on notifications for update
  using (auth.uid() = user_id);`}
                </pre>
              </div>

              {/* Paso 2 */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
                    2
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    Hook useNotifications con PostgreSQL Changes
                  </h3>
                </div>
                <p className="text-zinc-400 text-sm mb-4">
                  Este hook React escucha en tiempo real los INSERTs en la tabla
                  notifications para el usuario autenticado.
                </p>
                <pre className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-emerald-300 overflow-x-auto">
{`// hooks/useNotifications.ts
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { RealtimeChannel } from '@supabase/supabase-js';

interface Notification {
  id: string;
  title: string;
  body?: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  link?: string;
  created_at: string;
}

export function useNotifications(userId: string | null) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Carga inicial
  const fetchNotifications = useCallback(async () => {
    if (!userId) return;
    const { data } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50);
    if (data) {
      setNotifications(data);
      setUnreadCount(data.filter(n => !n.read).length);
    }
  }, [userId]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Suscripción Realtime
  useEffect(() => {
    if (!userId) return;

    const channel: RealtimeChannel = supabase
      .channel(\`notifications:\${userId}\`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: \`user_id=eq.\${userId}\`,
        },
        (payload) => {
          const newNotif = payload.new as Notification;
          setNotifications(prev => [newNotif, ...prev]);
          setUnreadCount(prev => prev + 1);

          // Browser notification si la pestaña no está activa
          if (document.hidden && Notification.permission === 'granted') {
            new Notification(newNotif.title, {
              body: newNotif.body ?? '',
              icon: '/favicon.svg',
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const markAsRead = useCallback(async (id: string) => {
    await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id);
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  }, []);

  const markAllAsRead = useCallback(async () => {
    if (!userId) return;
    await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', userId)
      .eq('read', false);
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  }, [userId]);

  return { notifications, unreadCount, markAsRead, markAllAsRead };
}`}
                </pre>
              </div>

              {/* Paso 3 */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
                    3
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    Componente NotificationBell
                  </h3>
                </div>
                <p className="text-zinc-400 text-sm mb-4">
                  El componente visual que muestra el badge y el dropdown de
                  notificaciones, conectado al hook anterior.
                </p>
                <pre className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-emerald-300 overflow-x-auto">
{`// components/NotificationBell.tsx
import { useState } from 'react';
import { Bell, Check, CheckCheck, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNotifications } from '../hooks/useNotifications';

export function NotificationBell({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotifications(userId);

  const typeColors = {
    info: 'text-blue-400',
    success: 'text-emerald-400',
    warning: 'text-amber-400',
    error: 'text-red-400',
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-xl text-zinc-400 hover:text-white
                   hover:bg-zinc-800 transition-colors"
        aria-label={\`\${unreadCount} notificaciones sin leer\`}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full
                           bg-emerald-500 text-white text-xs font-bold
                           flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-80 bg-zinc-900 border
                        border-zinc-800 rounded-2xl shadow-2xl z-50">
          <div className="flex items-center justify-between p-4 border-b
                          border-zinc-800">
            <h3 className="font-semibold text-white">Notificaciones</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-emerald-400 hover:text-emerald-300
                           flex items-center gap-1"
              >
                <CheckCheck className="w-3 h-3" />
                Marcar todas
              </button>
            )}
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-zinc-500 text-sm text-center py-8">
                Sin notificaciones
              </p>
            ) : (
              notifications.slice(0, 20).map(n => (
                <div
                  key={n.id}
                  className={\`p-4 border-b border-zinc-800 hover:bg-zinc-800/50
                    transition-colors \${!n.read ? 'bg-zinc-800/30' : ''}\`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className={\`text-sm font-medium \${typeColors[n.type]}\`}>
                        {n.title}
                      </p>
                      {n.body && (
                        <p className="text-xs text-zinc-500 mt-0.5 line-clamp-2">
                          {n.body}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {n.link && (
                        <Link to={n.link} onClick={() => setOpen(false)}>
                          <ExternalLink className="w-3 h-3 text-zinc-500
                                                   hover:text-emerald-400" />
                        </Link>
                      )}
                      {!n.read && (
                        <button onClick={() => markAsRead(n.id)}>
                          <Check className="w-3 h-3 text-zinc-500
                                            hover:text-emerald-400" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}`}
                </pre>
              </div>

              {/* Paso 4 */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
                    4
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    Crear notificaciones desde Edge Functions
                  </h3>
                </div>
                <p className="text-zinc-400 text-sm mb-4">
                  Para crear notificaciones desde el servidor (cambio de estado,
                  mensajes, pagos), usa una Edge Function con el cliente
                  service_role que bypass RLS.
                </p>
                <pre className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-emerald-300 overflow-x-auto">
{`// supabase/functions/notify-user/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

interface NotifyPayload {
  userId: string;
  title: string;
  body?: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  link?: string;
}

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, // bypass RLS
  );

  const payload: NotifyPayload = await req.json();

  const { error } = await supabase
    .from('notifications')
    .insert({
      user_id: payload.userId,
      title: payload.title,
      body: payload.body,
      type: payload.type ?? 'info',
      link: payload.link,
    });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
});`}
                </pre>
              </div>
            </div>
          </motion.section>

          {/* Section 4: Broadcast y Presence */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Broadcast y Presence: casos avanzados
            </h2>

            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              {/* Broadcast */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Radio className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-semibold text-white">Typing indicator con Broadcast</h3>
                </div>
                <p className="text-zinc-500 text-xs mb-3">
                  Mensajes efímeros que no persisten en BD. Perfecto para
                  indicadores "está escribiendo…".
                </p>
                <pre className="bg-zinc-950 rounded-xl p-3 text-xs text-emerald-300 overflow-x-auto">
{`const channel = supabase.channel('chat:room-1');

// Enviar evento broadcast
const sendTyping = (userId: string) => {
  channel.send({
    type: 'broadcast',
    event: 'typing',
    payload: { userId },
  });
};

// Recibir
channel
  .on('broadcast', { event: 'typing' }, ({ payload }) => {
    setTypingUsers(prev =>
      [...new Set([...prev, payload.userId])]
    );
    // Auto-clear después de 3s
    setTimeout(() => {
      setTypingUsers(prev =>
        prev.filter(id => id !== payload.userId)
      );
    }, 3000);
  })
  .subscribe();`}
                </pre>
              </div>

              {/* Presence */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-blue-400" />
                  <h3 className="font-semibold text-white">Online badge con Presence</h3>
                </div>
                <p className="text-zinc-500 text-xs mb-3">
                  Estado sincronizado de todos los usuarios activos en un canal.
                  Supabase gestiona joins/leaves automáticamente.
                </p>
                <pre className="bg-zinc-950 rounded-xl p-3 text-xs text-emerald-300 overflow-x-auto">
{`const channel = supabase.channel('online-users');

// Track tu presencia
channel.subscribe(async (status) => {
  if (status !== 'SUBSCRIBED') return;
  await channel.track({
    userId: currentUser.id,
    username: currentUser.name,
    online_at: new Date().toISOString(),
  });
});

// Escuchar cambios de presencia
channel.on('presence', { event: 'sync' }, () => {
  const state = channel.presenceState();
  // state = { [key]: [{ userId, username }] }
  const onlineUsers = Object.values(state).flat();
  setOnlineUsers(onlineUsers);
});`}
                </pre>
              </div>
            </div>
          </motion.section>

          {/* Section 5: 6 errores críticos */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              6 errores críticos (y cómo evitarlos)
            </h2>

            <div className="space-y-4">
              {[
                {
                  bad: 'Abrir un canal nuevo en cada render del componente',
                  good: 'Crear el canal en useEffect con dependencias estables y limpiarlo con supabase.removeChannel() en el cleanup',
                  impact: 'Memory leaks + conexiones duplicadas que consumen cuota',
                },
                {
                  bad: 'Usar filter sin índice en la tabla: filter: `status=eq.active`',
                  good: 'Crear índice en la columna del filtro y activar Realtime con replica identity FULL para que el filtro funcione en UPDATEs',
                  impact: 'Full table scans en cada cambio — degradación severa con >10k filas',
                },
                {
                  bad: 'Aplicar la misma suscripción Realtime a todos los usuarios sin RLS',
                  good: 'Filtrar por user_id en el filter del canal. RLS del canal no se aplica automáticamente — debes filtrar explícitamente',
                  impact: 'Fuga de datos: usuarios ven notificaciones ajenas',
                },
                {
                  bad: 'No gestionar reconexiones: si la red cae, el canal queda zombi',
                  good: 'Escuchar el evento CHANNEL_ERROR y TIMED_OUT para forzar reconexión: channel.subscribe() vuelve a conectar',
                  impact: 'Usuarios pierden actualizaciones silenciosamente tras un corte de red',
                },
                {
                  bad: 'Suscribirse a tablas enormes sin filtro: escuchar todos los cambios de una tabla de millones de filas',
                  good: 'Siempre usa filter para acotar la suscripción. En caso extremo, usa una tabla separada de events lightweight',
                  impact: 'Sobrecarga del servidor Realtime + límite de mensajes/segundo alcanzado',
                },
                {
                  bad: 'No solicitar permiso de notificaciones browser antes de intentar mostrarlas',
                  good: 'Solicitar Notification.requestPermission() en una acción de usuario (botón activar notificaciones), nunca automáticamente al cargar',
                  impact: 'Petición de permiso bloqueada por navegador — usuario nunca ve notificaciones push',
                },
              ].map((err, i) => (
                <div
                  key={i}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"
                >
                  <div className="grid sm:grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                        <span className="text-xs font-semibold text-red-400 uppercase tracking-wide">
                          Error
                        </span>
                      </div>
                      <p className="text-sm text-zinc-400">{err.bad}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">
                          Fix
                        </span>
                      </div>
                      <p className="text-sm text-zinc-400">{err.good}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 pt-3 border-t border-zinc-800">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                    <p className="text-xs text-amber-400">{err.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Section 6: Caso real */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Caso real: SupportFlow reduce tiempo de respuesta un 64%
            </h2>
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-700 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white">SupportFlow</h3>
                  <p className="text-sm text-zinc-500">
                    SaaS de atención al cliente para e-commerce · Barcelona
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-zinc-300 mb-2">El problema</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  SupportFlow tenía un sistema de tickets donde agentes y clientes
                  tenían que recargar la página para ver nuevos mensajes. El
                  tiempo medio de respuesta era de 8,4 minutos porque los agentes
                  no sabían cuándo había actividad nueva. La satisfacción de
                  cliente (CSAT) era de 3,2/5.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-zinc-300 mb-2">La solución</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Implementaron tres capas de Supabase Realtime: (1) PostgreSQL
                  Changes en la tabla de mensajes para actualizaciones de
                  conversación en tiempo real, (2) Presence para mostrar si el
                  cliente está online antes de responder, (3) Broadcast para
                  typing indicators en el hilo de soporte. El tiempo de
                  implementación total fue de 4 días de desarrollo.
                </p>
              </div>

              <div className="grid sm:grid-cols-4 gap-4">
                {[
                  { metric: '8,4 min → 3,0 min', label: 'Tiempo respuesta medio', color: 'text-emerald-400' },
                  { metric: '3,2 → 4,7', label: 'CSAT score (/ 5)', color: 'text-emerald-400' },
                  { metric: '-64%', label: 'Tickets escalados', color: 'text-emerald-400' },
                  { metric: '4 días', label: 'Tiempo de implementación', color: 'text-blue-400' },
                ].map((m) => (
                  <div key={m.label} className="bg-zinc-950 rounded-xl p-4 text-center">
                    <div className={`text-lg font-bold ${m.color} mb-1`}>
                      {m.metric}
                    </div>
                    <div className="text-xs text-zinc-500">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Section 7: Árbol de decisión */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Árbol de decisión: ¿qué tipo de canal usar?
            </h2>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
              {[
                {
                  q: '¿Necesitas que el mensaje persista en base de datos?',
                  no: 'Broadcast o Presence',
                  yes: 'PostgreSQL Changes',
                },
                {
                  q: '¿Necesitas saber el estado actual de múltiples usuarios (online, cursor, rol)?',
                  no: 'Broadcast',
                  yes: 'Presence',
                },
                {
                  q: '¿El evento se origina en el servidor / admin y va al cliente?',
                  no: 'Broadcast client-to-client',
                  yes: 'Edge Function → INSERT en BD → PostgreSQL Changes al cliente',
                },
                {
                  q: '¿Necesitas aplicar RLS para que cada usuario solo vea sus datos?',
                  no: 'Broadcast (filtra manualmente por userId en el canal)',
                  yes: 'PostgreSQL Changes con filter user_id=eq.{userId}',
                },
                {
                  q: '¿La latencia es crítica (<100ms) y el volumen es muy alto (>1k msgs/min)?',
                  no: 'PostgreSQL Changes es suficiente',
                  yes: 'Broadcast para el canal activo + persiste en BD async',
                },
              ].map((item, i) => (
                <div key={i} className="border border-zinc-800 rounded-xl p-4">
                  <p className="text-sm font-medium text-white mb-3">
                    {i + 1}. {item.q}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="flex items-start gap-2">
                      <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded font-mono shrink-0">
                        NO
                      </span>
                      <span className="text-xs text-zinc-400">{item.no}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono shrink-0">
                        SÍ
                      </span>
                      <span className="text-xs text-zinc-400">{item.yes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Section 8: Checklist */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Checklist de producción: 12 puntos
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                'Habilitar Realtime en la tabla desde el dashboard de Supabase (Publication)',
                'Configurar replica identity FULL en tablas donde escuchas UPDATEs',
                'Añadir índice en la columna usada como filter (user_id, org_id)',
                'Limpiar canales con supabase.removeChannel() en el cleanup del useEffect',
                'Filtrar siempre por user_id para evitar data leaks entre usuarios',
                'Gestionar CHANNEL_ERROR y TIMED_OUT para forzar reconexión automática',
                'Limitar el número de canales activos por usuario (<10 simultáneos)',
                'Solicitar permiso de notificaciones browser con user gesture, no en autoload',
                'Monitorizar connection count en Supabase dashboard (límite por plan)',
                'Paginar el histórico de notificaciones (LIMIT 50), no cargar todo',
                'Usar service_role key solo en Edge Functions, nunca en el cliente',
                'Testear comportamiento offline + reconexión antes de ir a producción',
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-zinc-900 border border-zinc-800 rounded-xl p-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-zinc-400">{item}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Conclusion */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-gradient-to-br from-emerald-950/40 to-zinc-900 border border-emerald-800/30 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Conclusión: tiempo real como ventaja competitiva
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-4">
                Supabase Realtime democratiza las notificaciones en tiempo real.
                Lo que antes requería Redis, Socket.io y un equipo de backend
                dedicado, ahora se implementa en días con tres tipos de canales
                bien elegidos.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-6">
                La clave es elegir el mecanismo correcto para cada caso:
                PostgreSQL Changes para notificaciones persistentes con RLS,
                Presence para estado de usuarios en tiempo real, y Broadcast
                para eventos efímeros de baja latencia. Con el checklist de
                producción, evitas los errores que cuestan semanas de debugging.
              </p>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-emerald-400 shrink-0" />
                <p className="text-sm text-zinc-400">
                  <strong className="text-emerald-400">Regla de oro:</strong>{' '}
                  Empieza con PostgreSQL Changes para notificaciones — es el
                  caso más común y el más seguro. Añade Broadcast y Presence
                  solo cuando los necesites de verdad.
                </p>
              </div>
            </div>
          </motion.section>

          {/* CTA */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="border border-zinc-800 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-3">
                ¿Quieres notificaciones en tiempo real en tu SaaS?
              </h2>
              <p className="text-zinc-400 mb-6">
                En Think Better implementamos Supabase Realtime en todos los
                proyectos que construimos. Cuéntanos tu caso y te decimos cómo
                hacerlo en tu contexto específico.
              </p>
              <Link
                to="/cuestionario"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400
                           text-white font-semibold px-6 py-3 rounded-full transition-colors"
              >
                Empezar proyecto
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.section>

          {/* Back to blog */}
          <div className="pt-8 border-t border-zinc-800">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al blog
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
