import { motion } from 'motion/react';
import { Linkedin, Github } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  experience: string;
  stack: string[];
  quote: string;
  gradient: string;
  linkedin?: string;
  github?: string;
}

const team: TeamMember[] = [
  {
    name: 'Ignasi',
    role: 'Desarrollador Full-stack',
    description: 'Especialista en interfaces de usuario y arquitecturas frontend de alto rendimiento. Diseña y construye desde la primera pantalla hasta el deploy en producción.',
    experience: '+10 años',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind'],
    quote: '"Me gusta que el cliente pueda ver el progreso en tiempo real. Eso es lo que cambia la relación con el producto."',
    gradient: 'from-emerald-500 to-cyan-500',
    linkedin: 'https://linkedin.com/in/ignasi',
  },
  {
    name: 'Roberto',
    role: 'Ingeniero Backend e IA',
    description: 'Experto en backend, bases de datos e integración de inteligencia artificial. Construye la arquitectura que hace que todo funcione a escala.',
    experience: '+12 años',
    stack: ['Supabase', 'PostgreSQL', 'Gemini AI', 'Deno'],
    quote: '"La IA no reemplaza el criterio del ingeniero — lo multiplica. Eso es lo que hacemos aquí."',
    gradient: 'from-blue-500 to-purple-500',
    linkedin: 'https://linkedin.com/in/roberto',
  },
  {
    name: 'Javier',
    role: 'Ingeniero de Producto',
    description: 'Enfocado en diseño de producto, experiencia de usuario y automatización de procesos. Convierte ideas complejas en flujos simples y funcionales.',
    experience: '+8 años',
    stack: ['UX Design', 'Figma', 'Stripe', 'Resend'],
    quote: '"Un buen producto es el que el usuario entiende sin manual. Eso es lo que construimos."',
    gradient: 'from-amber-500 to-orange-500',
    linkedin: 'https://linkedin.com/in/javier',
  },
];

export function Team() {
  return (
    <section id="equipo" className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">El equipo que construye tu producto</h2>
          <p className="text-zinc-400 text-lg">
            No somos una agencia con decenas de managers. Somos 3 ingenieros senior que usan IA para entregar en semanas lo que otros tardan meses. Hablas directamente con quien escribe el código.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors flex flex-col"
            >
              {/* Avatar + name */}
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-xl font-bold text-white shrink-0`}>
                  {member.name[0]}
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-white">{member.name}</h3>
                  <p className="text-emerald-400 text-xs font-medium">{member.role}</p>
                  <p className="text-zinc-500 text-xs">{member.experience} de experiencia</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-zinc-400 text-sm mb-4 flex-1">{member.description}</p>

              {/* Stack pills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {member.stack.map((tech) => (
                  <span key={tech} className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-zinc-500 text-xs italic border-l-2 border-zinc-700 pl-3 mb-4">
                {member.quote}
              </blockquote>

              {/* LinkedIn / GitHub */}
              <div className="flex items-center gap-3 pt-3 border-t border-zinc-800">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-blue-400 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    LinkedIn
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    GitHub
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
