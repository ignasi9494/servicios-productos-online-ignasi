import { useState } from 'react';
import { motion } from 'motion/react';

interface RatingScaleProps {
  /** Number of options (5 or 10) */
  scale?: 5 | 10;
  minLabel?: string;
  maxLabel?: string;
  onComplete: (value: number) => void;
  disabled?: boolean;
}

export function RatingScale({
  scale = 5, minLabel = 'Poco', maxLabel = 'Mucho',
  onComplete, disabled,
}: RatingScaleProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSelect(value: number) {
    if (submitted || disabled) return;
    setSelected(value);
    setSubmitted(true);
    onComplete(value);
  }

  const items = Array.from({ length: scale }, (_, i) => i + 1);

  return (
    <div className="space-y-2">
      <div className="flex gap-1.5 justify-center">
        {items.map((n) => (
          <motion.button
            key={n}
            type="button"
            whileHover={!submitted ? { scale: 1.1 } : undefined}
            whileTap={!submitted ? { scale: 0.95 } : undefined}
            onClick={() => handleSelect(n)}
            disabled={submitted || disabled}
            className={`w-10 h-10 rounded-lg border text-sm font-medium transition-colors ${
              selected === n
                ? 'border-emerald-500 bg-emerald-500 text-white'
                : selected !== null && n <= selected
                  ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300'
                  : 'border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200'
            } ${submitted ? 'cursor-default' : 'cursor-pointer'}`}
            aria-label={`${n} de ${scale}`}
          >
            {n}
          </motion.button>
        ))}
      </div>
      <div className="flex justify-between px-1">
        <span className="text-xs text-zinc-500">{minLabel}</span>
        <span className="text-xs text-zinc-500">{maxLabel}</span>
      </div>
    </div>
  );
}
