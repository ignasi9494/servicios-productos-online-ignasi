import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackLandingFaqExpand } from '../lib/analytics';

const faqs = [
  {
    q: '¿Cómo funciona el cuestionario de cualificación?',
    a: 'Es una conversación con nuestro asistente de IA que actúa como un consultor senior. Te hace entre 15 y 22 preguntas adaptadas al tipo de proyecto que quieres construir: tipo de app, funcionalidades, diseño, público objetivo, integraciones, presupuesto y plazos. Al terminar, recibes una estimación de precio orientativa y en menos de 24h te enviamos la propuesta definitiva.',
  },
  {
    q: '¿Qué pasa después del cuestionario?',
    a: 'En menos de 24 horas recibes la propuesta definitiva en tu dashboard de cliente. Podrás revisarla, pedir cambios o aceptarla directamente. Al aceptar, firmas el contrato digitalmente y realizas el pago. Desde ese momento arranca el desarrollo.',
  },
  {
    q: '¿Tenéis alguna garantía o política de devolución?',
    a: 'Sí. Si la entrega no cumple el alcance acordado por escrito, lo corregimos sin coste adicional. Además, incluimos 30 días (o 60 días en el plan Growth) de corrección de bugs tras la entrega. Si antes de empezar el desarrollo decides no continuar, te devolvemos el pago.',
  },
  {
    q: '¿Puedo exportar el código y salir de la plataforma?',
    a: 'Por supuesto. El código es 100% tuyo desde el primer día. Al finalizar el proyecto puedes descargarlo completo en un archivo ZIP. También puedes optar por un plan de mantenimiento mensual donde nosotros gestionamos la infraestructura. En cualquier momento puedes exportar y hospedar el proyecto donde quieras.',
  },
  {
    q: '¿Qué incluyen las iteraciones/revisiones?',
    a: 'Las revisiones son cambios de diseño, texto o ajustes menores sobre el proyecto entregado. Cada plan incluye un número de revisiones (Starter: 1, Pro: 2, Growth: 3). Las iteraciones NO incluyen nuevas funcionalidades fuera del alcance firmado. Para mejoras adicionales, puedes contratar una suscripción mensual.',
  },
  {
    q: '¿Por qué usáis React/Supabase y no WordPress?',
    a: 'WordPress es genial para blogs, pero limitante para productos digitales. React y Supabase nos permiten crear aplicaciones web modernas, ultrarrápidas, seguras y escalables desde el día 1, sin depender de plugins frágiles. Menos deuda técnica desde el principio.',
  },
  {
    q: '¿Incluye el hosting y mantenimiento?',
    a: 'El deploy inicial en producción está incluido en todos los planes. Después, puedes optar por una suscripción mensual (desde 199€/mes) donde gestionamos hosting, base de datos, backups y soporte. O te entregamos el código y te lo montas donde prefieras — la decisión es tuya.',
  },
  {
    q: '¿Cómo lográis ser tan rápidos?',
    a: 'Utilizamos herramientas avanzadas de desarrollo asistido por inteligencia artificial que nos permiten automatizar tareas repetitivas como testing, documentación y refactorización. Esto nos libera para centrarnos en la lógica de negocio y entregar en semanas lo que otros tardan meses.',
  },
  {
    q: '¿Quién es el propietario del código?',
    a: 'Tú. Al 100%. Al finalizar el proyecto te entregamos todo el código fuente, accesos a la infraestructura y documentación técnica. No hay lock-in ni dependencia de nosotros para seguir operando. Es tu activo digital, construido para durar.',
  },
  {
    q: '¿Cómo son las condiciones de pago?',
    a: 'Pago único al aceptar la propuesta. Sin splits, sin hitos intermedios. Aceptamos tarjeta de crédito/débito vía Stripe. Simple y transparente.',
  },
  {
    q: '¿Qué política de datos aplicáis?',
    a: 'Toda la información que compartes en el cuestionario y en el dashboard se almacena de forma segura en servidores europeos (Supabase EU). No compartimos tus datos con terceros. Cumplimos con el RGPD. Puedes solicitar la eliminación de tus datos en cualquier momento escribiéndonos a nuestro email.',
  },
  {
    q: '¿Puedo ver el progreso durante el desarrollo?',
    a: 'Sí. Desplegamos versiones de prueba desde la primera semana y tienes acceso a un entorno de staging en tu dashboard donde puedes ver y probar tu producto en tiempo real mientras lo construimos. También puedes comunicarte con el equipo directamente desde la plataforma.',
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
      transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
      className="border-b border-zinc-800"
    >
      <h3>
        <button
          id={headingId}
          onClick={() => {
            if (!open) trackLandingFaqExpand(faq.q);
            setOpen(!open);
          }}
          aria-expanded={open}
          aria-controls={panelId}
          className="w-full flex items-center justify-between py-5 text-left"
        >
          <span className="text-base font-semibold text-white pr-4">{faq.q}</span>
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
            <p className="text-zinc-400 pb-5 text-sm leading-relaxed">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  // Inject FAQPage schema for SEO
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    };
    const script = document.createElement('script');
    script.id = 'faq-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      document.getElementById('faq-schema')?.remove();
    };
  }, []);

  return (
    <section id="faq" className="py-24 bg-zinc-900/30 border-t border-zinc-900">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4">Preguntas frecuentes</h2>
        <p className="text-zinc-400 text-center mb-12">
          ¿Tienes más dudas?{' '}
          <Link to="/cuestionario" className="text-emerald-400 hover:text-emerald-300 transition-colors">
            Pregúntanos directamente en el cuestionario
          </Link>
        </p>
        <div>
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
