import { motion } from 'motion/react';
import { MessageSquare, DollarSign, FileText, Monitor, Download } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    step: '01',
    title: 'Cuestionario de 10 min',
    description: 'Nuestro asistente de IA actúa como un consultor senior. Te hace las preguntas exactas para entender tu proyecto: funcionalidades, usuarios, integraciones y presupuesto.',
    timing: '~10 minutos',
    color: 'emerald',
  },
  {
    icon: DollarSign,
    step: '02',
    title: 'Precio exacto al instante',
    description: 'Al terminar el cuestionario, la plataforma calcula y te muestra el precio exacto de tu proyecto. Sin esperas, sin llamadas previas, sin rangos ambiguos.',
    timing: 'Al momento',
    color: 'cyan',
  },
  {
    icon: FileText,
    step: '03',
    title: 'Propuesta técnica en 24h',
    description: 'En menos de 24 horas recibes en tu dashboard un documento con el alcance exacto, la arquitectura técnica, el precio cerrado y el calendario de entrega. Sin letra pequeña.',
    timing: 'Menos de 24h',
    color: 'blue',
  },
  {
    icon: Monitor,
    step: '04',
    title: 'Desarrollo en tiempo real',
    description: 'Desde la primera semana tienes acceso a una versión de staging. Ves tu producto crecer en el dashboard. Comunícate con el equipo directamente desde la plataforma.',
    timing: '1-4 semanas',
    color: 'purple',
  },
  {
    icon: Download,
    step: '05',
    title: 'El código es 100% tuyo',
    description: 'Descarga todo el código fuente en un ZIP. O continúa con un plan de mantenimiento mensual. Sin lock-in, sin dependencias. Es tu activo digital, tuyo para siempre.',
    timing: 'Entrega final',
    color: 'emerald',
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
};

export function Process() {
  return (
    <section id="como-funciona" className="py-24 bg-zinc-900/30 border-y border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Del briefing al código en semanas</h2>
          <p className="text-zinc-400 text-lg">
            Nuestro proceso está diseñado para eliminar la incertidumbre. Sabes el precio antes de empezar, ves el progreso en tiempo real y el código es tuyo desde el día 1.
          </p>
        </div>

        {/* Steps: vertical timeline on mobile, horizontal grid on desktop */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div className="hidden lg:block absolute top-14 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, index) => {
              const colors = colorMap[step.color];
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step icon */}
                  <div className={`relative z-10 w-28 h-28 rounded-2xl ${colors.bg} border ${colors.border} flex flex-col items-center justify-center mb-5 shadow-xl`}>
                    <step.icon className={`w-8 h-8 ${colors.text} mb-1`} />
                    <span className="text-xs text-zinc-600 font-mono">{step.step}</span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-3">{step.description}</p>

                  {/* Timing badge */}
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text} border ${colors.border}`}>
                    {step.timing}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
