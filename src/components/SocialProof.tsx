import { motion } from 'motion/react';
import { Target, Recycle, FileSignature } from 'lucide-react';

const projects = [
  {
    name: 'LeadHunter',
    icon: Target,
    description: 'Plataforma de prospección comercial automatizada con IA para equipos de ventas.',
    result: 'Automatiza la prospección y genera +200 leads cualificados/mes',
    color: 'emerald',
  },
  {
    name: 'ReciclaSaaS',
    icon: Recycle,
    description: 'SaaS de gestión de residuos y reciclaje con reporting automatizado.',
    result: 'Reduce 15h/semana en gestión administrativa de residuos',
    color: 'blue',
  },
  {
    name: 'ContractFlow',
    icon: FileSignature,
    description: 'Sistema de gestión de contratos con firma digital y seguimiento de estados.',
    result: 'De firma manual a digital en 3 semanas. 0 contratos perdidos',
    color: 'purple',
  },
];

const colorMap: Record<string, string> = {
  emerald: 'bg-emerald-500/10 text-emerald-400',
  blue: 'bg-blue-500/10 text-blue-400',
  purple: 'bg-purple-500/10 text-purple-400',
};

export function SocialProof() {
  return (
    <section id="casos" className="py-20 border-y border-zinc-900 bg-zinc-950/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-zinc-500 mb-12 uppercase tracking-wider">
          Resultados reales de proyectos que hemos construido
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6 hover:border-zinc-700 transition-colors cursor-default"
            >
              <div className={`w-12 h-12 rounded-xl ${colorMap[project.color]} flex items-center justify-center mb-4`}>
                <project.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{project.name}</h3>
              <p className="text-zinc-400 text-sm mb-4">{project.description}</p>
              <p className="text-emerald-400 text-sm font-medium">{project.result}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
