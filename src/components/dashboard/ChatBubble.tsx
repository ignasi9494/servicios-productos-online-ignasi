import { Check, CheckCheck, Paperclip } from 'lucide-react';

export interface ChatMessageData {
  id: string;
  content: string;
  sender_role: 'client' | 'admin' | 'system';
  sender_name: string;
  attachment_url?: string | null;
  read_at?: string | null;
  created_at: string;
  isOwn: boolean;
}

interface ChatBubbleProps {
  message: ChatMessageData;
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function ChatBubble({ message }: ChatBubbleProps) {
  if (message.sender_role === 'system') {
    return (
      <div className="flex justify-center py-2">
        <div className="px-4 py-1.5 rounded-full bg-zinc-800/50 border border-zinc-700/50">
          <p className="text-xs text-zinc-400">{message.content}</p>
        </div>
      </div>
    );
  }

  const isOwn = message.isOwn;

  return (
    <div className={`flex gap-2.5 ${isOwn ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold ${
          isOwn
            ? 'bg-emerald-500/15 text-emerald-400'
            : 'bg-cyan-500/15 text-cyan-400'
        }`}
      >
        {getInitials(message.sender_name)}
      </div>

      {/* Bubble */}
      <div className={`max-w-[75%] ${isOwn ? 'items-end' : 'items-start'}`}>
        {!isOwn && (
          <p className="text-xs text-zinc-500 mb-1 px-1">{message.sender_name}</p>
        )}

        <div
          className={`rounded-2xl px-4 py-2.5 ${
            isOwn
              ? 'bg-emerald-600/20 border border-emerald-500/20 rounded-br-md'
              : 'bg-zinc-800 border border-zinc-700 rounded-bl-md'
          }`}
        >
          <p className="text-sm text-zinc-100 whitespace-pre-wrap break-words">
            {message.content}
          </p>

          {message.attachment_url && (
            <a
              href={message.attachment_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 mt-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <Paperclip className="w-3 h-3" />
              Ver adjunto
            </a>
          )}
        </div>

        {/* Time + read status */}
        <div className={`flex items-center gap-1 mt-1 px-1 ${isOwn ? 'justify-end' : ''}`}>
          <span className="text-[10px] text-zinc-500">{formatTime(message.created_at)}</span>
          {isOwn && (
            message.read_at
              ? <CheckCheck className="w-3 h-3 text-cyan-400" />
              : <Check className="w-3 h-3 text-zinc-500" />
          )}
        </div>
      </div>
    </div>
  );
}
