import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: '¿Por qué usáis React/Supabase y no WordPress?',
    a: 'WordPress es genial para blogs, pero limitante para productos digitales. React y Supabase nos permiten crear aplicaciones web modernas, ultrarrápidas, seguras y escalables desde el día 1, sin depender de plugins frágiles.',
  },
  {
    q: '¿Qué pasa si quiero cambios durante el desarrollo?',
    a: 'Trabajamos con un alcance (scope) cerrado para garantizar tiempos y precios. Si surgen nuevas ideas durante el desarrollo, las documentamos para una fase 2 o las incluimos en una bolsa de horas posterior.',
  },
  {
    q: '¿Incluye el hosting y mantenimiento?',
    a: 'El despliegue inicial está incluido. Los costes de infraestructura (Vercel, Supabase) suelen ser gratuitos en la capa inicial y se configuran a tu nombre. Ofrecemos planes de mantenimiento desde 500€/mes para evolución continua — consulta la sección de Mantenimiento para más detalles.',
  },
  {
    q: '¿Cómo lográis ser tan rápidos?',
    a: 'Utilizamos herramientas avanzadas de desarrollo asistido por inteligencia artificial que nos permiten automatizar tareas repetitivas como testing, documentación y refactorización. Esto nos libera para centrarnos en la lógica de negocio y entregar en semanas lo que otros tardan meses. El resultado: tu producto genera valor antes, y tú dejas de esperar.',
  },
  {
    q: '¿Quién es el propietario del código?',
    a: 'Tú. Al 100%. Al finalizar el proyecto te entregamos todo el código fuente, accesos a la infraestructura y documentación técnica. No hay lock-in ni dependencia de nosotros para seguir operando. Es tu activo digital, construido para durar.',
  },
  {
    q: '¿Cómo son las condiciones de pago?',
    a: 'Trabajamos con un modelo simple: 50% al firmar la propuesta y 50% a la entrega del proyecto finalizado. Para proyectos Scale, podemos acordar hitos intermedios de pago.',
  },
  {
    q: '¿Ofrecéis alguna garantía?',
    a: 'Sí. Todos nuestros proyectos incluyen 30 días de corrección de bugs sin coste adicional a partir de la entrega. Si algo no funciona como se acordó en el alcance, lo solucionamos sin coste adicional ni preguntas.',
  },
  {
    q: '¿Puedo ver el progreso durante el desarrollo?',
    a: 'Por supuesto. Desplegamos versiones de prueba desde la primera semana y te damos acceso a un entorno de staging donde puedes ver y probar tu producto en tiempo real mientras lo construimos.',
  },
  {
    q: '¿Qué pasa si no estoy satisfecho con el resultado?',
    a: 'El alcance cerrado (scope) que firmamos antes de empezar protege a ambas partes. Definimos exactamente qué funcionalidades se entregan. Si al final el producto no cumple lo acordado, lo corregimos sin coste adicional.',
  },
];

function FAQItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${index}`;
  const headingId = `faq-heading-${index}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border-b border-zinc-800"
    >
      <h3>
        <button
          id={headingId}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls={panelId}
          className="w-full flex items-center justify-between py-5 text-left"
        >
          <span className="text-lg font-bold text-white pr-4">{faq.q}</span>
          <ChevronDown
            className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </h3>
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={headingId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-zinc-400 pb-5">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-zinc-900/30 border-t border-zinc-900">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Preguntas frecuentes</h2>
        <div>
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
