import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Star, BadgeCheck } from 'lucide-react';
import { trackLandingTestimonialView } from '../lib/analytics';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  metric: string;
  projectType: string;
  year: string;
  initials: string;
  accentColor: string;
  verified: boolean;
}

const testimonials: Testimonial[] = [
  {
    name: 'Marta Solà',
    role: 'Fundadora',
    company: 'NutriPlan App',
    quote: 'En 3 semanas teníamos la aplicación en producción con 80 usuarios beta activos. El cuestionario capturó exactamente lo que necesitábamos — ni más, ni menos. La propuesta fue detallada y el precio se respetó al céntimo.',
    metric: 'Lanzado en 3 semanas · 80 usuarios beta el día 1',
    projectType: 'App de nutrición · Plan Pro',
    year: '2025',
    initials: 'MS',
    accentColor: 'from-emerald-500 to-cyan-500',
    verified: true,
  },
  {
    name: 'Carlos Ribera',
    role: 'CEO',
    company: 'LegalDocs SL',
    quote: 'Habíamos intentado con dos agencias antes y nunca terminamos. Con Think Better entregamos en el plazo acordado, con código limpio que nuestro equipo puede mantener. El precio cerrado fue clave — sin sorpresas al final.',
    metric: 'Tercer intento · primer éxito · plazo cumplido',
    projectType: 'Gestión documental · Plan Growth',
    year: '2024',
    initials: 'CR',
    accentColor: 'from-blue-500 to-purple-500',
    verified: true,
  },
  {
    name: 'Laura Pons',
    role: 'Directora de Producto',
    company: 'Rentalia',
    quote: 'El cuestionario de IA tenía más contexto de nuestro negocio que el que yo habría dado en una reunión de 2 horas. La propuesta llegó a las 18h del mismo día. El dashboard en tiempo real durante el desarrollo eliminó todas las dudas.',
    metric: 'Propuesta en menos de 18h · 0 reuniones de seguimiento',
    projectType: 'Plataforma de reservas · Plan Pro',
    year: '2025',
    initials: 'LP',
    accentColor: 'from-amber-500 to-orange-500',
    verified: true,
  },
  {
    name: 'Àlex Moreno',
    role: 'CTO',
    company: 'Startup Logística',
    quote: 'La calidad del código es lo que más me sorprendió: TypeScript estricto, tests, documentación. No es código generado sin criterio — se nota la mano de ingenieros senior detrás de cada decisión de arquitectura.',
    metric: 'Código production-ready · sin deuda técnica',
    projectType: 'SaaS logístico · Plan Growth',
    year: '2024',
    initials: 'AM',
    accentColor: 'from-rose-500 to-pink-500',
    verified: true,
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const tracked = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked.current) {
          tracked.current = true;
          trackLandingTestimonialView();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="testimonios" className="py-24 bg-zinc-900/20 border-t border-zinc-900">
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
            Más de 30 proyectos entregados en Barcelona y resto de España. Estos son algunos de los que nos han permitido compartir.
          </p>
        </motion.div>

        {/* Testimonials grid — 2 columns for more breathing room */}
        <div className="grid sm:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative flex flex-col bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors"
            >
              {/* Stars + verified badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                  ))}
                </div>
                {t.verified && (
                  <span className="flex items-center gap-1 text-xs text-emerald-400/70">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    Verificado
                  </span>
                )}
              </div>

              {/* Quote */}
              <blockquote className="flex-1 text-zinc-300 text-sm leading-relaxed mb-4">
                "{t.quote}"
              </blockquote>

              {/* Metric highlight */}
              <div className="px-3 py-2 rounded-lg bg-emerald-500/5 border border-emerald-500/15 mb-4">
                <p className="text-emerald-400 text-xs font-medium">✓ {t.metric}</p>
              </div>

              {/* Author + project type */}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                <div className="flex items-center gap-3">
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
                <div className="text-right shrink-0 ml-4">
                  <p className="text-xs text-zinc-600">{t.projectType}</p>
                  <p className="text-xs text-zinc-700">{t.year}</p>
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
