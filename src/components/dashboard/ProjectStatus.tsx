import { motion } from 'motion/react';
import {
  CheckCircle2, Clock, FileText, FileSignature, CreditCard,
  Code2, Eye, PartyPopper, Server,
} from 'lucide-react';

export interface StageInfo {
  key: string;
  label: string;
  icon: typeof CheckCircle2;
  completedAt?: string; // ISO date string
}

const ALL_STAGES: StageInfo[] = [
  { key: 'questionnaire', label: 'Cuestionario completado', icon: CheckCircle2 },
  { key: 'proposal_sent', label: 'Propuesta enviada', icon: FileText },
  { key: 'proposal_accepted', label: 'Propuesta aceptada', icon: FileSignature },
  { key: 'deposit_paid', label: 'Pago de entrada', icon: CreditCard },
  { key: 'in_development', label: 'En desarrollo', icon: Code2 },
  { key: 'in_review', label: 'En revision', icon: Eye },
  { key: 'completed', label: 'Completado', icon: PartyPopper },
  { key: 'delivered', label: 'Entregado / Mantenimiento', icon: Server },
];

/** Maps project_status enum from DB to a stage index (0-based) */
const STATUS_TO_INDEX: Record<string, number> = {
  questionnaire: -1,       // hasn't completed questionnaire yet
  pending_proposal: 0,     // questionnaire done, waiting for proposal
  proposal_sent: 1,
  proposal_accepted: 2,
  in_development: 4,
  in_review: 5,
  completed: 6,
  delivered: 7,
};

export interface ProjectStatusProps {
  /** DB project_status enum value */
  status: string;
  /** Dates for completed stages keyed by stage key */
  stageDates?: Record<string, string>;
  /** Current development progress (0-100), only shown for in_development */
  devProgress?: number;
  /** Current iteration info, only shown for in_review */
  iterationInfo?: { current: number; total: number };
  /** Whether to animate on mount */
  animate?: boolean;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
}

export function ProjectStatus({
  status,
  stageDates = {},
  devProgress,
  iterationInfo,
  animate = true,
}: ProjectStatusProps) {
  const currentIndex = STATUS_TO_INDEX[status] ?? -1;

  const Wrapper = animate ? motion.div : 'div';
  const wrapperProps = animate
    ? { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } }
    : {};

  return (
    <Wrapper
      {...(wrapperProps as Record<string, unknown>)}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
    >
      <h2 className="text-sm font-medium text-zinc-400 mb-5">Estado del proyecto</h2>

      {/* Desktop: horizontal timeline */}
      <div className="hidden sm:block">
        <div className="flex items-start">
          {ALL_STAGES.map((stage, i) => {
            const isCompleted = i <= currentIndex;
            const isCurrent = i === currentIndex + 1 || (i === currentIndex && status !== 'delivered');
            const StageIcon = stage.icon;
            const date = stageDates[stage.key];

            return (
              <div key={stage.key} className="flex-1 relative">
                {/* Connector line */}
                {i > 0 && (
                  <div
                    className={`absolute top-4 right-1/2 left-0 h-0.5 -translate-y-1/2 ${
                      i <= currentIndex ? 'bg-emerald-500/40' : 'bg-zinc-700'
                    }`}
                    style={{ left: '-50%', right: '50%', width: '100%' }}
                  />
                )}

                {/* Node */}
                <div className="flex flex-col items-center relative">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                      isCompleted
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : isCurrent
                          ? 'bg-cyan-500/15 text-cyan-400 ring-2 ring-cyan-500/30'
                          : 'bg-zinc-800 text-zinc-500'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : isCurrent ? (
                      <Clock className="w-4 h-4" />
                    ) : (
                      <StageIcon className="w-4 h-4" />
                    )}
                  </div>

                  <span
                    className={`text-xs mt-2 text-center leading-tight ${
                      isCompleted
                        ? 'text-emerald-400 font-medium'
                        : isCurrent
                          ? 'text-cyan-400 font-medium'
                          : 'text-zinc-500'
                    }`}
                  >
                    {stage.label}
                  </span>

                  {date && (
                    <span className="text-[10px] text-zinc-500 mt-0.5">
                      {formatDate(date)}
                    </span>
                  )}

                  {/* Dev progress bar */}
                  {stage.key === 'in_development' && isCurrent && devProgress != null && (
                    <div className="w-full max-w-[60px] mt-1.5">
                      <div className="h-1 bg-zinc-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan-400 rounded-full transition-all"
                          style={{ width: `${devProgress}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-cyan-400">{devProgress}%</span>
                    </div>
                  )}

                  {/* Iteration info */}
                  {stage.key === 'in_review' && isCurrent && iterationInfo && (
                    <span className="text-[10px] text-cyan-400 mt-1">
                      Iteracion {iterationInfo.current}/{iterationInfo.total}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="sm:hidden space-y-0">
        {ALL_STAGES.map((stage, i) => {
          const isCompleted = i <= currentIndex;
          const isCurrent = i === currentIndex + 1 || (i === currentIndex && status !== 'delivered');
          const StageIcon = stage.icon;
          const date = stageDates[stage.key];

          return (
            <div key={stage.key} className="flex gap-3">
              {/* Vertical connector + node */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    isCompleted
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : isCurrent
                        ? 'bg-cyan-500/15 text-cyan-400 ring-2 ring-cyan-500/30'
                        : 'bg-zinc-800 text-zinc-500'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : isCurrent ? (
                    <Clock className="w-3.5 h-3.5" />
                  ) : (
                    <StageIcon className="w-3.5 h-3.5" />
                  )}
                </div>
                {i < ALL_STAGES.length - 1 && (
                  <div
                    className={`w-0.5 flex-1 min-h-[20px] ${
                      i < currentIndex ? 'bg-emerald-500/40' : 'bg-zinc-700'
                    }`}
                  />
                )}
              </div>

              {/* Label + date */}
              <div className="pb-4">
                <span
                  className={`text-sm leading-tight ${
                    isCompleted
                      ? 'text-emerald-400 font-medium'
                      : isCurrent
                        ? 'text-cyan-400 font-medium'
                        : 'text-zinc-500'
                  }`}
                >
                  {stage.label}
                </span>
                {date && (
                  <span className="text-xs text-zinc-500 ml-2">{formatDate(date)}</span>
                )}

                {stage.key === 'in_development' && isCurrent && devProgress != null && (
                  <div className="mt-1 w-24">
                    <div className="h-1 bg-zinc-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-400 rounded-full transition-all"
                        style={{ width: `${devProgress}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-cyan-400">{devProgress}%</span>
                  </div>
                )}

                {stage.key === 'in_review' && isCurrent && iterationInfo && (
                  <span className="text-[10px] text-cyan-400 block mt-0.5">
                    Iteracion {iterationInfo.current}/{iterationInfo.total}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
}
