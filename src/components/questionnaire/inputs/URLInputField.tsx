import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, Plus, X, ExternalLink } from 'lucide-react';

interface URLEntry {
  id: string;
  url: string;
}

interface URLInputFieldProps {
  placeholder?: string;
  /** Max URLs allowed */
  max?: number;
  onComplete: (urls: string[]) => void;
  disabled?: boolean;
}

function isValidURL(str: string): boolean {
  try {
    const url = new URL(str.startsWith('http') ? str : `https://${str}`);
    return !!url.hostname.includes('.');
  } catch {
    return false;
  }
}

function normalizeURL(str: string): string {
  return str.startsWith('http') ? str : `https://${str}`;
}

export function URLInputField({ placeholder = 'ejemplo.com', max = 5, onComplete, disabled }: URLInputFieldProps) {
  const [urls, setUrls] = useState<URLEntry[]>([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function addURL() {
    setError(null);
    const trimmed = input.trim();
    if (!trimmed) return;
    if (!isValidURL(trimmed)) {
      setError('URL no válida');
      return;
    }
    if (urls.length >= max) {
      setError(`Máximo ${max} URLs`);
      return;
    }
    const normalized = normalizeURL(trimmed);
    if (urls.some((u) => u.url === normalized)) {
      setError('URL ya añadida');
      return;
    }
    setUrls((prev) => [...prev, { id: `${Date.now()}`, url: normalized }]);
    setInput('');
  }

  function removeURL(id: string) {
    if (submitted) return;
    setUrls((prev) => prev.filter((u) => u.id !== id));
  }

  function handleSubmit() {
    if (urls.length === 0 || submitted) return;
    setSubmitted(true);
    onComplete(urls.map((u) => u.url));
  }

  function handleSkip() {
    if (submitted) return;
    setSubmitted(true);
    onComplete([]);
  }

  return (
    <div className="space-y-3">
      {!submitted && (
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(null); }}
              onKeyDown={(e) => e.key === 'Enter' && addURL()}
              placeholder={placeholder}
              disabled={submitted || disabled}
              className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-200 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none transition-colors"
              aria-label="Añadir URL"
            />
          </div>
          <button
            type="button"
            onClick={addURL}
            disabled={!input.trim() || submitted || disabled}
            className="px-3 py-2 rounded-lg border border-zinc-700 text-zinc-300 hover:border-emerald-500 hover:text-emerald-400 disabled:opacity-40 transition-colors"
            aria-label="Añadir URL"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      )}

      {error && <p className="text-xs text-red-400">{error}</p>}

      <AnimatePresence>
        {urls.map((entry) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2"
          >
            <ExternalLink className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="flex-1 text-sm text-zinc-300 truncate">{entry.url}</span>
            {!submitted && (
              <button
                type="button"
                onClick={() => removeURL(entry.id)}
                className="text-zinc-500 hover:text-red-400 transition-colors"
                aria-label={`Eliminar ${entry.url}`}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {!submitted && (
        <div className="flex gap-2">
          {urls.length > 0 && (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 text-sm rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-colors"
            >
              Confirmar ({urls.length})
            </button>
          )}
          <button
            type="button"
            onClick={handleSkip}
            className="px-4 py-2 text-sm rounded-lg border border-zinc-700 text-zinc-400 hover:text-zinc-300 hover:border-zinc-500 transition-colors"
          >
            {urls.length > 0 ? 'No tengo más' : 'No tengo referencias'}
          </button>
        </div>
      )}
    </div>
  );
}
