import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Paperclip, Search, RefreshCw, MessageSquare, User, Wifi, WifiOff } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { usePageTitle } from '../../hooks/usePageTitle';
import { shouldUseMockData } from '../../lib/mockDemoData';

interface Conversation {
  projectId: string;
  projectName: string;
  clientName: string;
  clientId: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

interface Message {
  id: string;
  content: string;
  sender_role: 'client' | 'admin';
  sender_name: string;
  created_at: string;
  read_at: string | null;
}

// ── Mock data ────────────────────────────────────────────────────────────────

const hoursAgo = (h: number) => new Date(Date.now() - h * 3600000).toISOString();
const minsAgo = (m: number) => new Date(Date.now() - m * 60000).toISOString();

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    projectId: 'mock-proj-1',
    projectName: 'García Consultoría — CRM interno',
    clientName: 'María García',
    clientId: 'mock-client-1',
    lastMessage: 'Perfecto, quedamos así entonces. ¿Cuándo empezamos?',
    lastMessageAt: minsAgo(23),
    unreadCount: 2,
  },
  {
    projectId: 'mock-proj-2',
    projectName: 'TechStart — App de reservas',
    clientName: 'Carlos Martínez',
    clientId: 'mock-client-2',
    lastMessage: 'He revisado la propuesta, tengo alguna duda sobre los pagos.',
    lastMessageAt: hoursAgo(3),
    unreadCount: 1,
  },
  {
    projectId: 'mock-proj-3',
    projectName: 'Moda Online — E-commerce',
    clientName: 'Laura Sánchez',
    clientId: 'mock-client-3',
    lastMessage: 'Todo bien, gracias por la actualización.',
    lastMessageAt: hoursAgo(18),
    unreadCount: 0,
  },
  {
    projectId: 'mock-proj-4',
    projectName: 'DataFlow — Panel analytics',
    clientName: 'David López',
    clientId: 'mock-client-4',
    lastMessage: 'El diseño me gusta mucho, podemos avanzar.',
    lastMessageAt: hoursAgo(36),
    unreadCount: 0,
  },
];

const MOCK_MESSAGES: Record<string, Message[]> = {
  'mock-proj-1': [
    { id: '1', content: 'Hola, ¿cuándo podemos hablar sobre el módulo de informes?', sender_role: 'client', sender_name: 'María García', created_at: hoursAgo(5), read_at: hoursAgo(4) },
    { id: '2', content: 'Hola María! Podemos revisarlo mañana por la mañana. El módulo de informes está casi listo, solo queda conectar el filtro por fechas.', sender_role: 'admin', sender_name: 'Think Better', created_at: hoursAgo(4), read_at: hoursAgo(4) },
    { id: '3', content: 'Genial. ¿Incluye exportación a PDF o Excel?', sender_role: 'client', sender_name: 'María García', created_at: hoursAgo(3), read_at: null },
    { id: '4', content: 'Perfecto, quedamos así entonces. ¿Cuándo empezamos?', sender_role: 'client', sender_name: 'María García', created_at: minsAgo(23), read_at: null },
  ],
  'mock-proj-2': [
    { id: '5', content: 'He revisado la propuesta, tengo alguna duda sobre los pagos.', sender_role: 'client', sender_name: 'Carlos Martínez', created_at: hoursAgo(3), read_at: null },
  ],
  'mock-proj-3': [
    { id: '6', content: 'El diseño del catálogo está listo para revisar.', sender_role: 'admin', sender_name: 'Think Better', created_at: hoursAgo(20), read_at: hoursAgo(19) },
    { id: '7', content: 'Todo bien, gracias por la actualización.', sender_role: 'client', sender_name: 'Laura Sánchez', created_at: hoursAgo(18), read_at: hoursAgo(17) },
  ],
  'mock-proj-4': [
    { id: '8', content: 'Aquí tienes el primer borrador del panel de analytics.', sender_role: 'admin', sender_name: 'Think Better', created_at: hoursAgo(40), read_at: hoursAgo(38) },
    { id: '9', content: 'El diseño me gusta mucho, podemos avanzar.', sender_role: 'client', sender_name: 'David López', created_at: hoursAgo(36), read_at: hoursAgo(35) },
  ],
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(iso: string) {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'ahora';
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays === 1) return 'ayer';
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
}

// ── Main component ────────────────────────────────────────────────────────────

export function AdminMensajes() {
  usePageTitle('Mensajes | Think Better Admin');
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [realtimeConnected, setRealtimeConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const activeProjectIdRef = useRef<string | null>(null);

  const useMock = shouldUseMockData(0);

  // Keep ref in sync so realtime handler always has current value
  useEffect(() => {
    activeProjectIdRef.current = activeProjectId;
  }, [activeProjectId]);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ── Realtime subscription ────────────────────────────────────────────────
  useEffect(() => {
    if (useMock) return;

    const channel = supabase
      .channel('admin-messages-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        async (payload) => {
          const newMsg = payload.new as {
            id: string;
            project_id: string;
            sender_id: string;
            sender_role: 'client' | 'admin';
            content: string;
            created_at: string;
            read_at: string | null;
          };

          // Resolve sender name
          let senderName = newMsg.sender_role === 'admin' ? 'Think Better' : 'Cliente';
          if (newMsg.sender_id) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('full_name, role')
              .eq('user_id', newMsg.sender_id)
              .maybeSingle();
            if (profile) {
              senderName = (profile as { role?: string; full_name?: string }).role === 'admin'
                ? 'Think Better'
                : ((profile as { full_name?: string }).full_name ?? 'Cliente');
            }
          }

          const msgObj: Message = {
            id: newMsg.id,
            content: newMsg.content,
            sender_role: newMsg.sender_role,
            sender_name: senderName,
            created_at: newMsg.created_at,
            read_at: newMsg.read_at,
          };

          // If this message is for the open conversation, append it directly
          if (newMsg.project_id === activeProjectIdRef.current) {
            setMessages((prev) => {
              // Avoid duplicates (admin's own sent messages are added optimistically)
              if (prev.some((m) => m.id === newMsg.id)) return prev;
              return [...prev, msgObj];
            });
            // Mark as read immediately since admin is looking at it
            if (newMsg.sender_role !== 'admin') {
              supabase
                .from('messages')
                .update({ read_at: new Date().toISOString() })
                .eq('id', newMsg.id)
                .then(() => {});
            }
          } else if (newMsg.sender_role !== 'admin') {
            // Different conversation — increment unread badge
            setConversations((prev) =>
              prev.map((c) =>
                c.projectId === newMsg.project_id
                  ? {
                      ...c,
                      unreadCount: c.unreadCount + 1,
                      lastMessage: newMsg.content,
                      lastMessageAt: newMsg.created_at,
                    }
                  : c
              ).sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime())
            );

            // Browser notification (only if the admin has granted permission)
            if (typeof window !== 'undefined' && Notification.permission === 'granted') {
              const convoName = conversations.find((c) => c.projectId === newMsg.project_id)?.clientName ?? 'Cliente';
              new Notification(`Nuevo mensaje de ${convoName}`, {
                body: newMsg.content.slice(0, 100),
                icon: '/favicon.svg',
              });
            }
          }
        }
      )
      .subscribe((status) => {
        setRealtimeConnected(status === 'SUBSCRIBED');
      });

    // Request notification permission on mount (non-blocking)
    if (typeof window !== 'undefined' && Notification.permission === 'default') {
      Notification.requestPermission().catch(() => {});
    }

    return () => {
      supabase.removeChannel(channel);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useMock]);

  async function loadConversations() {
    setLoading(true);
    try {
      if (useMock) {
        setConversations(MOCK_CONVERSATIONS);
        setActiveProjectId(MOCK_CONVERSATIONS[0]?.projectId ?? null);
        setMessages(MOCK_MESSAGES[MOCK_CONVERSATIONS[0]?.projectId ?? ''] ?? []);
      } else {
        // Real Supabase: load all projects with their last message
        const { data: projects } = await supabase
          .from('projects')
          .select('id, name, client_id, profiles!client_id(full_name)')
          .order('created_at', { ascending: false })
          .limit(50);

        if (!projects?.length) {
          setConversations([]);
          setLoading(false);
          return;
        }

        // For each project, get unread count and last message
        const convos: Conversation[] = await Promise.all(
          projects.map(async (p) => {
            const [unreadResult, lastMsgResult] = await Promise.all([
              supabase
                .from('messages')
                .select('id', { count: 'exact', head: true })
                .eq('project_id', p.id)
                .is('read_at', null)
                .neq('sender_role', 'admin'),
              supabase
                .from('messages')
                .select('content, created_at')
                .eq('project_id', p.id)
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle(),
            ]);

            const profile = Array.isArray(p.profiles) ? p.profiles[0] : p.profiles;
            return {
              projectId: p.id,
              projectName: p.name ?? 'Proyecto sin nombre',
              clientName: (profile as { full_name?: string } | null)?.full_name ?? 'Cliente',
              clientId: p.client_id,
              lastMessage: lastMsgResult.data?.content ?? 'Sin mensajes aún',
              lastMessageAt: lastMsgResult.data?.created_at ?? p.created_at ?? new Date().toISOString(),
              unreadCount: unreadResult.count ?? 0,
            };
          })
        );

        convos.sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());
        setConversations(convos);
        if (convos.length > 0) {
          setActiveProjectId(convos[0].projectId);
          await loadMessages(convos[0].projectId, false);
        }
      }
    } catch (e) {
      console.error('Error loading conversations:', e);
    } finally {
      setLoading(false);
    }
  }

  async function loadMessages(projectId: string, fromClick = true) {
    if (fromClick) setActiveProjectId(projectId);

    if (useMock) {
      setMessages(MOCK_MESSAGES[projectId] ?? []);
      // Mark as read in mock state
      setConversations((prev) =>
        prev.map((c) => c.projectId === projectId ? { ...c, unreadCount: 0 } : c)
      );
      return;
    }

    try {
      const { data } = await supabase
        .from('messages')
        .select('id, content, sender_role, sender_id, created_at, read_at')
        .eq('project_id', projectId)
        .order('created_at', { ascending: true });

      // Fetch sender names separately to avoid FK join failures
      const senderIds = [...new Set((data ?? []).map((m) => m.sender_id))];
      const nameMap: Record<string, string> = {};
      if (senderIds.length > 0) {
        const { data: profiles } = await supabase
          .from('profiles')
          .select('user_id, full_name, role')
          .in('user_id', senderIds);
        for (const p of profiles ?? []) {
          nameMap[p.user_id] = (p as { role?: string; full_name?: string }).role === 'admin'
            ? 'Think Better'
            : ((p as { full_name?: string }).full_name ?? 'Cliente');
        }
      }

      const msgs: Message[] = (data ?? []).map((m) => ({
        id: m.id,
        content: m.content,
        sender_role: m.sender_role,
        sender_name: nameMap[m.sender_id] ?? (m.sender_role === 'admin' ? 'Think Better' : 'Cliente'),
        created_at: m.created_at,
        read_at: m.read_at,
      }));

      setMessages(msgs);

      // Mark unread messages as read
      const unreadIds = msgs
        .filter((m) => m.sender_role !== 'admin' && !m.read_at)
        .map((m) => m.id);

      if (unreadIds.length > 0) {
        await supabase
          .from('messages')
          .update({ read_at: new Date().toISOString() })
          .in('id', unreadIds);

        setConversations((prev) =>
          prev.map((c) => c.projectId === projectId ? { ...c, unreadCount: 0 } : c)
        );
      }
    } catch (e) {
      console.error('Error loading messages:', e);
    }
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!newMessage.trim() || !activeProjectId) return;

    const text = newMessage.trim();
    setNewMessage('');
    setSending(true);

    if (useMock) {
      const mockMsg: Message = {
        id: `mock-${Date.now()}`,
        content: text,
        sender_role: 'admin',
        sender_name: 'Think Better',
        created_at: new Date().toISOString(),
        read_at: null,
      };
      setMessages((prev) => [...prev, mockMsg]);
      setConversations((prev) =>
        prev.map((c) =>
          c.projectId === activeProjectId
            ? { ...c, lastMessage: text, lastMessageAt: new Date().toISOString() }
            : c
        )
      );
      setSending(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          project_id: activeProjectId,
          sender_id: user?.id,
          sender_role: 'admin',
          content: text,
        })
        .select()
        .single();

      if (error) throw error;

      setMessages((prev) => [
        ...prev,
        {
          id: data.id,
          content: data.content,
          sender_role: 'admin',
          sender_name: 'Think Better',
          created_at: data.created_at,
          read_at: null,
        },
      ]);
      setConversations((prev) =>
        prev.map((c) =>
          c.projectId === activeProjectId
            ? { ...c, lastMessage: text, lastMessageAt: data.created_at }
            : c
        )
      );
    } catch (e) {
      console.error('Error sending message:', e);
    } finally {
      setSending(false);
    }
  }

  const filtered = conversations.filter((c) =>
    c.clientName.toLowerCase().includes(search.toLowerCase()) ||
    c.projectName.toLowerCase().includes(search.toLowerCase())
  );

  const activeConvo = conversations.find((c) => c.projectId === activeProjectId);
  const totalUnread = conversations.reduce((sum, c) => sum + c.unreadCount, 0);

  return (
    <div className="flex flex-col h-full -m-6">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-4 shrink-0">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">Mensajes</h1>
            {!useMock && (
              <span
                title={realtimeConnected ? 'Tiempo real activo' : 'Sin conexión en tiempo real'}
                className={`flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full border ${
                  realtimeConnected
                    ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                    : 'text-zinc-500 border-zinc-700 bg-zinc-800/50'
                }`}
              >
                {realtimeConnected ? (
                  <><Wifi className="w-3 h-3" /> En vivo</>
                ) : (
                  <><WifiOff className="w-3 h-3" /> Offline</>
                )}
              </span>
            )}
          </div>
          {totalUnread > 0 && (
            <p className="text-sm text-zinc-400 mt-0.5">
              {totalUnread} mensaje{totalUnread > 1 ? 's' : ''} sin leer
            </p>
          )}
        </div>
        <button
          onClick={loadConversations}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Actualizar
        </button>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-1 min-h-0 border-t border-zinc-800 mx-6 mb-6 rounded-2xl overflow-hidden border">
        {/* Left: conversation list */}
        <div className="w-80 shrink-0 flex flex-col border-r border-zinc-800 bg-zinc-900/50">
          {/* Search */}
          <div className="p-3 border-b border-zinc-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar cliente..."
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          {/* Conversation list */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="w-6 h-6 text-zinc-600 animate-spin" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center px-4">
                <MessageSquare className="w-8 h-8 text-zinc-700 mb-3" />
                <p className="text-zinc-500 text-sm">Sin conversaciones</p>
              </div>
            ) : (
              filtered.map((convo) => (
                <button
                  key={convo.projectId}
                  onClick={() => loadMessages(convo.projectId)}
                  className={`w-full text-left px-4 py-3 border-b border-zinc-800/50 hover:bg-zinc-800/50 transition-colors ${
                    activeProjectId === convo.projectId ? 'bg-zinc-800/70 border-l-2 border-l-emerald-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400 font-semibold text-sm">
                      {convo.clientName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-white truncate">{convo.clientName}</span>
                        <span className="text-xs text-zinc-500 shrink-0">{formatTime(convo.lastMessageAt)}</span>
                      </div>
                      <p className="text-xs text-zinc-500 truncate mt-0.5">{convo.projectName}</p>
                      <div className="flex items-center justify-between gap-2 mt-1">
                        <p className="text-xs text-zinc-600 truncate">{convo.lastMessage}</p>
                        {convo.unreadCount > 0 && (
                          <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center">
                            {convo.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right: message thread */}
        <div className="flex-1 flex flex-col min-w-0 bg-zinc-950">
          {!activeConvo ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
                <p className="text-zinc-500 text-sm">Selecciona una conversación</p>
              </div>
            </div>
          ) : (
            <>
              {/* Thread header */}
              <div className="flex items-center gap-3 px-5 py-3.5 border-b border-zinc-800 shrink-0">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-semibold text-sm shrink-0">
                  {activeConvo.clientName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{activeConvo.clientName}</p>
                  <p className="text-xs text-zinc-500">{activeConvo.projectName}</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15 }}
                      className={`flex gap-2.5 ${msg.sender_role === 'admin' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-semibold ${
                        msg.sender_role === 'admin'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}>
                        {msg.sender_role === 'admin' ? 'TB' : <User className="w-3.5 h-3.5" />}
                      </div>
                      <div className={`max-w-[70%] ${msg.sender_role === 'admin' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                        <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                          msg.sender_role === 'admin'
                            ? 'bg-emerald-600 text-white rounded-tr-sm'
                            : 'bg-zinc-800 text-zinc-200 rounded-tl-sm'
                        }`}>
                          {msg.content}
                        </div>
                        <span className="text-xs text-zinc-600">
                          {formatTime(msg.created_at)}
                          {msg.sender_role === 'client' && !msg.read_at && (
                            <span className="ml-1 text-emerald-500">• sin leer</span>
                          )}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSend} className="flex items-end gap-3 px-4 py-3 border-t border-zinc-800 shrink-0">
                <button
                  type="button"
                  className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors shrink-0"
                  title="Adjuntar archivo (próximamente)"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim() || sending}
                  className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
