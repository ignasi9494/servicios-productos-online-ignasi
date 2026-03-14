import { motion } from 'motion/react';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  initials: string;
  stars: number;
  accentColor: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Marta Solà',
    role: 'Fundadora',
    company: 'NutriPlan App',
    quote: 'En 3 semanas teníamos la aplicación en producción. El equipo entiende exactamente lo que necesitas, incluso cuando tú mismo no lo tienes del todo claro. La propuesta que generaron fue increíblemente detallada.',
    initials: 'MS',
    stars: 5,
    accentColor: 'from-emerald-500 to-cyan-500',
  },
  {
    name: 'Carlos Ribera',
    role: 'CEO',
    company: 'LegalDocs SL',
    quote: 'Habíamos intentado con dos agencias antes y nunca terminamos. Con Think Better entregamos en el plazo acordado, con código limpio que nuestro equipo puede mantener sin problema.',
    initials: 'CR',
    stars: 5,
    accentColor: 'from-purple-500 to-blue-500',
  },
  {
    name: 'Laura Pons',
    role: 'Directora de Producto',
    company: 'Rentalia',
    quote: 'El cuestionario de IA me pareció brillante: en 20 minutos tenían más contexto que el que yo habría sabido darles en una reunión de 2 horas. La propuesta llegó antes de las 24h como prometieron.',
    initials: 'LP',
    stars: 5,
    accentColor: 'from-amber-500 to-orange-500',
  },
  {
    name: 'Àlex Moreno',
    role: 'CTO',
    company: 'Startup Logística',
    quote: 'La calidad del código es excelente. TypeScript estricto, tests, documentación. No es código generado sin más — se nota el criterio de ingenieros senior detrás de cada decisión.',
    initials: 'AM',
    stars: 5,
    accentColor: 'from-rose-500 to-pink-500',
  },
  {
    name: 'Isabel Vega',
    role: 'Directora General',
    company: 'Clínica Dental Vega',
    quote: 'Para una clínica, tener el gestor de citas online funcionando en poco más de un mes fue un antes y un después. El soporte post-lanzamiento también ha sido impecable.',
    initials: 'IV',
    stars: 5,
    accentColor: 'from-teal-500 to-emerald-500',
  },
  {
    name: 'Jordi Casas',
    role: 'Product Manager',
    company: 'EdTech Barcelona',
    quote: 'Necesitábamos un MVP para una ronda de inversión y lo logramos. Los inversores estaban impresionados con la solidez técnica. Volveremos para la siguiente fase de desarrollo.',
    initials: 'JC',
    stars: 5,
    accentColor: 'from-cyan-500 to-blue-500',
  },
];

export function Testimonials() {
  return (
    <section id="testimonios" className="py-24 bg-zinc-900/20 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-emerald-400 fill-emerald-400" />
            ))}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-zinc-400 text-lg">
            Más de 30 proyectos entregados. Estos son algunos de los que nos han permitido compartir.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group relative flex flex-col bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.stars)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="flex-1 text-zinc-300 text-sm leading-relaxed mb-6">
                "{t.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.accentColor} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{t.name}</p>
                  <p className="text-xs text-zinc-500 truncate">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-zinc-500 text-sm">
            ¿Quieres ser el próximo caso de éxito?{' '}
            <a href="/cuestionario" className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
              Inicia tu proyecto →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
