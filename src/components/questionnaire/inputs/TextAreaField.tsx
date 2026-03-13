import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface TextAreaFieldProps {
  placeholder?: string;
  minRows?: number;
  maxRows?: number;
  maxLength?: number;
  onComplete: (text: string) => void;
  disabled?: boolean;
}

export function TextAreaField({
  placeholder = 'Escribe aquí...', minRows = 3, maxRows = 8,
  maxLength = 2000, onComplete, disabled,
}: TextAreaFieldProps) {
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    const lineHeight = 24;
    const minH = minRows * lineHeight;
    const maxH = maxRows * lineHeight;
    el.style.height = `${Math.min(Math.max(el.scrollHeight, minH), maxH)}px`;
  }, [text, minRows, maxRows]);

  function handleSubmit() {
    const trimmed = text.trim();
    if (!trimmed || submitted) return;
    setSubmitted(true);
    onComplete(trimmed);
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => !submitted && !disabled && setText(e.target.value.slice(0, maxLength))}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder={placeholder}
          disabled={submitted || disabled}
          rows={minRows}
          className={`w-full px-4 py-3 pr-12 text-sm bg-zinc-900 border border-zinc-700 rounded-xl text-zinc-200 placeholder-zinc-500 resize-none focus:border-emerald-500 focus:outline-none transition-colors ${
            submitted ? 'opacity-70' : ''
          }`}
          aria-label={placeholder}
        />
        {!submitted && (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!text.trim()}
            className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-emerald-600 text-white disabled:opacity-30 hover:bg-emerald-500 transition-colors"
            aria-label="Enviar"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      {!submitted && (
        <div className="flex justify-end">
          <span className={`text-xs ${text.length > maxLength * 0.9 ? 'text-amber-400' : 'text-zinc-600'}`}>
            {text.length}/{maxLength}
          </span>
        </div>
      )}
    </div>
  );
}
