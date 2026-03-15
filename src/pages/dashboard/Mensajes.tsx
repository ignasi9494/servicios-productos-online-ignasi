import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Loader2 } from 'lucide-react';
import { supabase, supabaseConfigured } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { ChatBubble, type ChatMessageData } from '../../components/dashboard/ChatBubble';
import { ChatInput } from '../../components/dashboard/ChatInput';
import { usePageTitle } from '../../hooks/usePageTitle';
import { useToast } from '../../contexts/ToastContext';
import { isMockDemo, MOCK_CLIENT_MESSAGES } from '../../lib/mockDemoData';
import { notifyNewMessageFromClient } from '../../lib/emailNotifications';

const CHAT_MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB for chat attachments

interface RawMessage {
  id: string;
  project_id: string;
  sender_id: string;
  sender_role: 'client' | 'admin' | 'system';
  content: string;
  attachment_url: string | null;
  read_at: string | null;
  created_at: string;
}

export function Mensajes() {
  usePageTitle('Mensajes | Think Better');
  const { user, profile } = useAuth();
  const { error: toastError } = useToast();
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [projectId, setProjectId] = useState<string | null>(null);
  const senderNamesRef = useRef<Record<string, string>>({});
  const bottomRef = useRef<HTMLDivElement>(null);

  function toDisplayMessage(raw: RawMessage): ChatMessageData {
    const namesMap = senderNamesRef.current;
    return {
      id: raw.id,
      content: raw.content,
      sender_role: raw.sender_role,
      sender_name: raw.sender_role === 'system' ? 'Sistema' : raw.sender_role === 'admin' ? (namesMap[raw.sender_id] ?? 'Think Better') : (namesMap[raw.sender_id] ?? 'Usuario'),
      attachment_url: raw.attachment_url,
      read_at: raw.read_at,
      created_at: raw.created_at,
      isOwn: raw.sender_id === user?.id,
    };
  }

  // Find the user's project
  useEffect(() => {
    if (!user || !supabaseConfigured) {
      setLoading(false);
      return;
    }

    async function loadProject() {
      const { data } = await supabase
        .from('projects')
        .select('id')
        .eq('client_id', user!.id)
        .order('created_at', { ascending: false })
        .limit(1);

      if (data && data.length > 0) {
        setProjectId((data[0] as { id: string }).id);
      }
      setLoading(false);
    }

    loadProject();
  }, [user]);

  // Load messages for the project
  useEffect(() => {
    if (!projectId || !user) return;

    async function loadMessages() {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('project_id', projectId!)
        .order('created_at', { ascending: true });

      if (data) {
        const raw = data as unknown as RawMessage[];

        // Fetch sender names
        const senderIds = [...new Set(raw.map((m) => m.sender_id))];
        const unknownIds = senderIds.filter((id) => !senderNamesRef.current[id]);

        if (unknownIds.length > 0) {
          const { data: profiles } = await supabase
            .from('profiles')
            .select('user_id, full_name, role')
            .in('user_id', unknownIds);

          if (profiles) {
            for (const p of profiles as { user_id: string; full_name: string; role: string }[]) {
              senderNamesRef.current[p.user_id] = p.role === 'admin' ? `${p.full_name} (Equipo)` : p.full_name;
            }
          }
        }

        setMessages(raw.map((m) => toDisplayMessage(m)));

        // Mark unread messages as read
        const unreadIds = raw
          .filter((m) => !m.read_at && m.sender_id !== user!.id)
          .map((m) => m.id);

        if (unreadIds.length > 0) {
          await supabase
            .from('messages')
            .update({ read_at: new Date().toISOString() })
            .in('id', unreadIds);
        }
      }
    }

    loadMessages();
  }, [projectId, user]);

  // Realtime subscription
  useEffect(() => {
    if (!projectId || !supabaseConfigured || !user) return;

    const channel = supabase
      .channel(`messages:${projectId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `project_id=eq.${projectId}`,
        },
        async (payload) => {
          const msg = payload.new as RawMessage;

          if (!senderNamesRef.current[msg.sender_id]) {
            const { data: profiles } = await supabase
              .from('profiles')
              .select('user_id, full_name, role')
              .eq('user_id', msg.sender_id);

            if (profiles && profiles.length > 0) {
              const p = profiles[0] as { user_id: string; full_name: string; role: string };
              senderNamesRef.current[p.user_id] = p.role === 'admin' ? `${p.full_name} (Equipo)` : p.full_name;
            }
          }

          setMessages((prev) => [...prev, toDisplayMessage(msg)]);

          // Auto-mark as read if from someone else
          if (msg.sender_id !== user.id) {
            await supabase
              .from('messages')
              .update({ read_at: new Date().toISOString() })
              .eq('id', msg.id);
          }
        },
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'messages',
          filter: `project_id=eq.${projectId}`,
        },
        (payload) => {
          const updated = payload.new as RawMessage;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === updated.id ? { ...m, read_at: updated.read_at } : m,
            ),
          );
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId, user]);

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const handleSend = useCallback(
    async (text: string, attachment?: File) => {
      if (!projectId || !user) return;

      let attachmentUrl: string | null = null;

      if (attachment) {
        // Validate file size
        if (attachment.size > CHAT_MAX_FILE_SIZE) {
          toastError(`El archivo "${attachment.name}" supera el límite de 10 MB para adjuntos`);
          return;
        }

        const ext = attachment.name.split('.').pop();
        const path = `${projectId}/${Date.now()}.${ext}`;
        const { data: uploadData, error: uploadErr } = await supabase.storage
          .from('chat-files')
          .upload(path, attachment);

        if (uploadErr || !uploadData) {
          const msg = uploadErr?.message ?? '';
          if (msg.includes('Bucket not found') || msg.includes('not found')) {
            toastError('El almacenamiento de archivos no está configurado. El mensaje se enviará sin adjunto.');
          } else {
            toastError(`Error al subir el adjunto: ${msg || 'error desconocido'}`);
          }
          // Continue sending the message without attachment
        } else {
          const { data: urlData } = supabase.storage
            .from('chat-files')
            .getPublicUrl(path);
          attachmentUrl = urlData.publicUrl;
        }
      }

      const role = profile?.role === 'admin' ? 'admin' : 'client';
      const content = text || (attachment ? `Archivo adjunto: ${attachment.name}` : '');

      // Optimistic update — show message immediately before DB confirms
      const tempId = `temp-${Date.now()}`;
      const optimistic: ChatMessageData = {
        id: tempId,
        content,
        sender_role: role,
        sender_name: profile?.full_name ?? 'Tú',
        attachment_url: attachmentUrl,
        read_at: null,
        created_at: new Date().toISOString(),
        isOwn: true,
      };
      setMessages((prev) => [...prev, optimistic]);

      const { data: inserted } = await supabase.from('messages').insert({
        project_id: projectId,
        sender_id: user.id,
        sender_role: role,
        content,
        attachment_url: attachmentUrl,
      }).select().single();

      // Replace temp with real message once confirmed
      if (inserted) {
        setMessages((prev) =>
          prev.map((m) => m.id === tempId ? toDisplayMessage(inserted as unknown as RawMessage) : m)
        );
      }

      // Notify admin when client sends a message (fire-and-forget)
      if (role === 'client') {
        notifyNewMessageFromClient(
          profile?.full_name ?? 'Cliente',
          projectId,
          'tu proyecto',
          content,
        ).catch(() => {});
      }
    },
    [projectId, user, profile],
  );

  if (loading && !isMockDemo()) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-zinc-500 animate-spin" />
      </div>
    );
  }

  if (isMockDemo()) {
    const mockMsgs: ChatMessageData[] = MOCK_CLIENT_MESSAGES.map((m) => ({
      id: m.id,
      content: m.content,
      sender_role: m.sender_role,
      sender_name: m.sender_name,
      isOwn: m.isOwn,
      created_at: m.created_at,
      attachment_url: m.attachment_url,
      read_at: m.read_at,
    }));
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full">
        <div className="border-b border-zinc-800 px-6 py-4">
          <h1 className="text-lg font-semibold text-white">Mensajes</h1>
          <p className="text-xs text-zinc-500">Chat directo con el equipo de desarrollo</p>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {mockMsgs.map((msg) => <ChatBubble key={msg.id} message={msg} />)}
        </div>
        <ChatInput onSend={async () => {}} />
      </motion.div>
    );
  }

  if (!supabaseConfigured || !projectId) {
    return <EmptyChat hasProject={!!projectId} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full"
    >
      {/* Header */}
      <div className="border-b border-zinc-800 px-6 py-4">
        <h1 className="text-lg font-semibold text-white">Mensajes</h1>
        <p className="text-xs text-zinc-500">Chat directo con el equipo de desarrollo</p>
      </div>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <MessageSquare className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
              <p className="text-sm text-zinc-500">Aún no hay mensajes.</p>
              <p className="text-xs text-zinc-600 mt-1">Envía un mensaje para iniciar la conversación.</p>
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={handleSend} />
    </motion.div>
  );
}

function EmptyChat({ hasProject }: { hasProject: boolean }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Mensajes</h1>
      <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-8 text-center">
        <MessageSquare className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
        {hasProject ? (
          <>
            <p className="text-zinc-400 mb-2">Chat no disponible temporalmente.</p>
            <p className="text-sm text-zinc-500">Estamos configurando tu canal de comunicacion.</p>
          </>
        ) : (
          <>
            <p className="text-zinc-400 mb-2">Aún no tienes un proyecto activo.</p>
            <p className="text-sm text-zinc-500">
              Completa el cuestionario para empezar y desbloquear el chat con el equipo.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
