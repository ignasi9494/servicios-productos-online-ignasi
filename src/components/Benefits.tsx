import { motion } from 'motion/react';
import { Zap, Users, ShieldCheck, TrendingUp } from 'lucide-react';

const benefits = [
  {
    icon: Zap,
    title: 'Entrega en semanas, no en meses',
    body: 'Tu primera versión funcional en la primera semana. Producto completo en 3-4 semanas. Mientras otros todavía están planificando, tú ya estás vendiendo.',
    stat: 'Primera versión: semana 1',
  },
  {
    icon: Users,
    title: 'Hablas con los que construyen',
    body: 'Cero project managers. Cero reuniones innecesarias. Tú hablas directamente con el ingeniero que escribe tu código. Tu dedicación: 1-2 horas por semana.',
    stat: 'Tu tiempo: 1-2h/semana',
  },
  {
    icon: ShieldCheck,
    title: 'Presupuesto cerrado antes de empezar',
    body: 'En 48 horas tienes un documento con el alcance exacto, el precio final y el calendario de entrega. Si no te convence, te llevas el documento con la arquitectura técnica de tu proyecto. Sin coste.',
    stat: 'Propuesta en 48h',
  },
  {
    icon: TrendingUp,
    title: 'Crece sin límites técnicos',
    body: 'Construimos sobre tecnología que soporta desde tus primeros 10 usuarios hasta 100.000. Sin migraciones, sin reconstruir. Tu negocio crece, tu producto crece con él.',
    stat: 'De 10 a 100.000 usuarios',
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Lo que consigues trabajando con nosotros</h2>
          <p className="text-zinc-400 text-lg">
            Lo que nos diferencia de agencias tradicionales y freelancers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-5">
                <benefit.icon className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
              <p className="text-zinc-400 mb-4">{benefit.body}</p>
              <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-sm font-medium">
                {benefit.stat}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
