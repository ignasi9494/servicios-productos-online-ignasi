import { motion } from 'motion/react';

const team = [
  {
    name: 'Ignasi',
    role: 'Desarrollador Full-stack',
    description: 'Especialista en interfaces de usuario y arquitecturas frontend de alto rendimiento.'
  },
  {
    name: 'Roberto',
    role: 'Ingeniero Backend e IA',
    description: 'Experto en backend, bases de datos e integración de inteligencia artificial.'
  },
  {
    name: 'Javier',
    role: 'Ingeniero de Producto',
    description: 'Enfocado en diseño de producto, experiencia de usuario y automatización de procesos.'
  }
];

export function Team() {
  return (
    <section id="team" className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/3">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Un equipo pequeño, ágil y comprometido.</h2>
            <p className="text-zinc-400 text-lg mb-6">
              No somos una agencia tradicional con decenas de managers. Somos 3 ingenieros senior que utilizamos IA para multiplicar nuestra capacidad de entrega.
            </p>
            <p className="text-zinc-400 text-lg">
              Hablas directamente con los que escriben el código. Sin intermediarios, sin burocracia.
            </p>
          </div>

          <div className="md:w-2/3 grid sm:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800"
              >
                <div className="w-16 h-16 rounded-full bg-zinc-800 mb-4 flex items-center justify-center text-xl font-bold text-zinc-500">
                  {member.name[0]}
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                <p className="text-emerald-500 text-sm font-medium mb-3">{member.role}</p>
                <p className="text-zinc-400 text-sm">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
