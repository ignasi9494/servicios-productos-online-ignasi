import { useState, useRef, type KeyboardEvent } from 'react';
import { Send, Paperclip, X } from 'lucide-react';

interface ChatInputProps {
  onSend: (text: string, attachment?: File) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [text, setText] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const canSend = (text.trim().length > 0 || attachment) && !disabled;

  function handleSend() {
    if (!canSend) return;
    onSend(text.trim(), attachment ?? undefined);
    setText('');
    setAttachment(null);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setAttachment(file);
    e.target.value = '';
  }

  return (
    <div className="border-t border-zinc-800 p-4">
      {attachment && (
        <div className="flex items-center gap-2 mb-2 px-2 py-1.5 bg-zinc-800 rounded-lg text-sm">
          <Paperclip className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          <span className="text-zinc-300 truncate flex-1">{attachment.name}</span>
          <button
            onClick={() => setAttachment(null)}
            className="text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="flex items-end gap-2">
        <button
          onClick={() => fileRef.current?.click()}
          className="shrink-0 p-2 text-zinc-500 hover:text-zinc-300 transition-colors"
          title="Adjuntar archivo"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        <input
          ref={fileRef}
          type="file"
          className="hidden"
          accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
          onChange={handleFileChange}
        />

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe un mensaje..."
          rows={1}
          className="flex-1 resize-none bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 max-h-32"
          style={{ minHeight: '42px' }}
        />

        <button
          onClick={handleSend}
          disabled={!canSend}
          className={`shrink-0 p-2.5 rounded-xl transition-colors ${
            canSend
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
              : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
