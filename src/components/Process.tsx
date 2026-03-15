import { motion } from 'motion/react';
import { MessageSquare, FileText, Code2 } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: '1. Briefing gratuito',
    description: 'Llamada de 30 minutos para entender tu negocio y objetivos. Si no ves claro el proyecto, te enviamos igualmente un documento con la arquitectura técnica. Sin coste.'
  },
  {
    icon: FileText,
    title: '2. Propuesta en 24h',
    description: 'En menos de 24 horas recibes un documento con el alcance exacto, precio cerrado y calendario de entrega. Sin letra pequeña.'
  },
  {
    icon: Code2,
    title: '3. Desarrollo y Entrega',
    description: 'Accedes a una versión de prueba desde la primera semana. Ves tu producto crecer en tiempo real hasta la entrega final.'
  }
];

export function Process() {
  return (
    <section id="como-funciona" className="py-24 bg-zinc-900/30 border-y border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Cómo trabajamos</h2>
          <p className="text-zinc-400 text-lg">Un proceso simple, transparente y orientado a resultados.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-zinc-800 via-emerald-500/50 to-zinc-800" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-6 shadow-xl">
                <step.icon className="w-10 h-10 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-zinc-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
