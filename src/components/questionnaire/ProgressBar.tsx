import { motion } from 'motion/react';

interface ProgressBarProps {
  /** 0 to 100 */
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, progress));

  return (
    <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-950/80">
      <div className="max-w-3xl mx-auto flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${clamped}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        <span className="text-xs text-zinc-500 tabular-nums shrink-0">{Math.round(clamped)}%</span>
      </div>
    </div>
  );
}
