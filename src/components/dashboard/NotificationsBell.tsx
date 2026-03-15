import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, MessageSquare, FileText, CreditCard, Layers, CheckCircle2, X } from 'lucide-react';
import { supabase, supabaseConfigured } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface Notification {
  id: string;
  type: string;
  title: string;
  body: string | null;
  read: boolean;
  project_id: string | null;
  created_at: string;
}

function getIcon(type: string) {
  if (type === 'new_message') return MessageSquare;
  if (type === 'proposal_sent') return FileText;
  if (type === 'payment_received') return CreditCard;
  if (type === 'iteration_completed') return Layers;
  return CheckCircle2;
}

function getNavTarget(type: string): string {
  if (type === 'new_message') return '/dashboard/mensajes';
  if (type === 'proposal_sent') return '/dashboard/propuestas';
  if (type === 'payment_received') return '/dashboard/pagos';
  if (type === 'iteration_completed') return '/dashboard/iteraciones';
  return '/dashboard';
}

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'ahora mismo';
  if (mins < 60) return `hace ${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `hace ${hrs}h`;
  const days = Math.floor(hrs / 24);
  return `hace ${days}d`;
}

// Mock notifications shown when Supabase not yet configured / no real data
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'mock-1',
    type: 'proposal_sent',
    title: 'Propuesta lista',
    body: 'Tu propuesta definitiva está lista para revisar.',
    read: false,
    project_id: null,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'mock-2',
    type: 'new_message',
    title: 'Nuevo mensaje',
    body: 'El equipo de Think Better te ha enviado un mensaje.',
    read: false,
    project_id: null,
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'mock-3',
    type: 'project_update',
    title: 'Proyecto actualizado',
    body: 'Tu proyecto ha pasado a fase de desarrollo.',
    read: true,
    project_id: null,
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

export function NotificationsBell() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unread, setUnread] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const loadNotifications = useCallback(async () => {
    if (!supabaseConfigured || !user) {
      setNotifications(MOCK_NOTIFICATIONS);
      setUnread(MOCK_NOTIFICATIONS.filter((n) => !n.read).length);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      const list = data ?? [];
      setNotifications(list);
      setUnread(list.filter((n) => !n.read).length);
    } catch {
      // Fallback to mock if table not yet set up
      setNotifications(MOCK_NOTIFICATIONS);
      setUnread(MOCK_NOTIFICATIONS.filter((n) => !n.read).length);
    }
  }, [user]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  // Supabase Realtime subscription for instant updates
  useEffect(() => {
    if (!supabaseConfigured || !user) return;

    const channel = supabase
      .channel(`notifications-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const newNotif = payload.new as Notification;
          setNotifications((prev) => [newNotif, ...prev].slice(0, 10));
          setUnread((prev) => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  async function markAllRead() {
    if (!supabaseConfigured || !user) {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnread(0);
      return;
    }
    try {
      await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', user.id)
        .eq('read', false);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnread(0);
    } catch {
      // Optimistic update already applied
    }
  }

  async function handleNotificationClick(notif: Notification) {
    setOpen(false);

    // Mark as read
    if (!notif.read) {
      if (supabaseConfigured && user) {
        supabase.from('notifications').update({ read: true }).eq('id', notif.id).then(() => {});
      }
      setNotifications((prev) =>
        prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
      );
      setUnread((prev) => Math.max(0, prev - 1));
    }

    navigate(getNavTarget(notif.type));
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        aria-label={`Notificaciones${unread > 0 ? ` (${unread} sin leer)` : ''}`}
      >
        <Bell className="w-5 h-5" />
        <AnimatePresence>
          {unread > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-emerald-500 text-zinc-950 text-[10px] font-bold rounded-full flex items-center justify-center"
            >
              {unread > 9 ? '9+' : unread}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 top-12 z-50 w-80 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
              <h3 className="text-sm font-semibold text-white">Notificaciones</h3>
              <div className="flex items-center gap-2">
                {unread > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    Marcar todo leído
                  </button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors"
                  aria-label="Cerrar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Notification list */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <Bell className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                  <p className="text-sm text-zinc-500">Sin notificaciones</p>
                </div>
              ) : (
                notifications.map((notif) => {
                  const Icon = getIcon(notif.type);
                  return (
                    <button
                      key={notif.id}
                      onClick={() => handleNotificationClick(notif)}
                      className={`w-full text-left px-4 py-3 flex gap-3 hover:bg-zinc-800 transition-colors border-b border-zinc-800/50 last:border-0 ${
                        !notif.read ? 'bg-zinc-800/40' : ''
                      }`}
                    >
                      <div
                        className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          !notif.read
                            ? 'bg-emerald-500/15 text-emerald-400'
                            : 'bg-zinc-700/50 text-zinc-500'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-sm font-medium leading-tight ${!notif.read ? 'text-white' : 'text-zinc-300'}`}>
                            {notif.title}
                          </p>
                          {!notif.read && (
                            <span className="mt-1 w-2 h-2 bg-emerald-500 rounded-full shrink-0" />
                          )}
                        </div>
                        {notif.body && (
                          <p className="text-xs text-zinc-500 mt-0.5 line-clamp-2">{notif.body}</p>
                        )}
                        <p className="text-xs text-zinc-600 mt-1">{timeAgo(notif.created_at)}</p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="px-4 py-2.5 border-t border-zinc-800 text-center">
                <button
                  onClick={() => setOpen(false)}
                  className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Ver todas las notificaciones
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
