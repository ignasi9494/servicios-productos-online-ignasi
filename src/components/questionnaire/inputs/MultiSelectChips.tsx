import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronDown } from 'lucide-react';

export interface ChipOption {
  value: string;
  label: string;
}

interface MultiSelectChipsProps {
  options: ChipOption[];
  /** Max visible before "ver más" */
  maxVisible?: number;
  onComplete: (values: string[]) => void;
  disabled?: boolean;
}

export function MultiSelectChips({ options: rawOptions, maxVisible = 8, onComplete, disabled }: MultiSelectChipsProps) {
  const options = rawOptions ?? [];
  const [selected, setSelected] = useState<string[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const visibleOptions = expanded ? options : options.slice(0, maxVisible);
  const hasMore = options.length > maxVisible;

  function toggle(value: string) {
    if (submitted || disabled) return;
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  function handleSubmit() {
    if (selected.length === 0 || submitted) return;
    setSubmitted(true);
    onComplete(selected);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {visibleOptions.map((opt) => {
            const isSelected = selected.includes(opt.value);
            return (
              <motion.button
                key={opt.value}
                type="button"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileTap={!submitted ? { scale: 0.95 } : undefined}
                onClick={() => toggle(opt.value)}
                disabled={submitted || disabled}
                aria-pressed={isSelected}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full border transition-colors ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-500/15 text-emerald-300'
                    : 'border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-500'
                } ${submitted ? 'opacity-70 cursor-default' : 'cursor-pointer'}`}
              >
                {isSelected && <Check className="w-3 h-3" />}
                {opt.label}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {hasMore && !expanded && !submitted && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-300 transition-colors"
        >
          <ChevronDown className="w-3.5 h-3.5" />
          Ver más ({options.length - maxVisible})
        </button>
      )}

      {!submitted && (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={selected.length === 0}
          className="px-4 py-2 text-sm rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Confirmar ({selected.length})
        </button>
      )}
    </div>
  );
}
