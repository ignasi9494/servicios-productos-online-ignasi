import { useState } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface CardOption {
  value: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
}

interface CardSelectorProps {
  options: CardOption[];
  /** Allow selecting multiple cards */
  multi?: boolean;
  onComplete: (value: string | string[]) => void;
  disabled?: boolean;
}

export function CardSelector({ options, multi = false, onComplete, disabled }: CardSelectorProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function toggle(value: string) {
    if (submitted || disabled) return;
    setSelected((prev) => {
      if (multi) {
        return prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value];
      }
      return [value];
    });
  }

  function handleSubmit() {
    if (selected.length === 0 || submitted) return;
    setSubmitted(true);
    onComplete(multi ? selected : selected[0]);
  }

  // Auto-submit on single-select
  function handleClick(value: string) {
    if (submitted || disabled) return;
    if (!multi) {
      setSelected([value]);
      setSubmitted(true);
      onComplete(value);
    } else {
      toggle(value);
    }
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {options.map((opt) => {
          const isSelected = selected.includes(opt.value);
          const Icon = opt.icon;
          return (
            <motion.button
              key={opt.value}
              type="button"
              whileHover={!submitted ? { scale: 1.02 } : undefined}
              whileTap={!submitted ? { scale: 0.98 } : undefined}
              onClick={() => handleClick(opt.value)}
              disabled={submitted || disabled}
              aria-pressed={isSelected}
              className={`relative text-left p-3 rounded-xl border transition-colors ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-500/10'
                  : 'border-zinc-700 bg-zinc-900 hover:border-zinc-500'
              } ${submitted ? 'opacity-70 cursor-default' : 'cursor-pointer'}`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              )}
              {Icon && <Icon className="w-5 h-5 text-emerald-400 mb-1.5" />}
              <p className="text-sm font-medium text-zinc-100">{opt.label}</p>
              {opt.description && (
                <p className="text-xs text-zinc-400 mt-0.5">{opt.description}</p>
              )}
            </motion.button>
          );
        })}
      </div>

      {multi && !submitted && (
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
