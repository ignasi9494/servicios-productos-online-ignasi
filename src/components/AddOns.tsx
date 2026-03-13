import { motion } from 'motion/react';
import { Brain, Smartphone, Workflow, LayoutDashboard, Link, Search, DatabaseZap } from 'lucide-react';

const addons = [
  {
    name: 'Integración IA',
    description: 'Responde a tus clientes 24/7 y automatiza tareas repetitivas.',
    price: '+1.500 - 3.000€',
    icon: Brain,
  },
  {
    name: 'App móvil (PWA)',
    description: 'Tus usuarios acceden desde el móvil sin descargar nada.',
    price: '+3.000 - 5.000€',
    icon: Smartphone,
  },
  {
    name: 'Automatizaciones',
    description: 'Deja de hacer manualmente lo que una máquina puede hacer por ti.',
    price: '+800 - 2.000€',
    icon: Workflow,
  },
  {
    name: 'Panel admin avanzado',
    description: 'Controla todo tu negocio desde un solo dashboard.',
    price: '+1.500 - 2.500€',
    icon: LayoutDashboard,
  },
  {
    name: 'Integración CRM/ERP',
    description: 'Sincroniza datos con las herramientas que ya usas.',
    price: '+1.000 - 3.000€',
    icon: Link,
  },
  {
    name: 'SEO + Copywriting',
    description: 'Aparece en Google y convierte visitantes en clientes.',
    price: '+500 - 1.500€',
    icon: Search,
  },
  {
    name: 'Migración de datos',
    description: 'Pasa tus datos del sistema antiguo sin perder nada.',
    price: '+500 - 2.000€',
    icon: DatabaseZap,
  },
];

export function AddOns() {
  return (
    <section className="py-24 bg-zinc-900/30 border-y border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Potencia tu proyecto con extras</h2>
          <p className="text-zinc-400 text-lg">
            Añade funcionalidades extra a cualquier plan.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {addons.map((addon, index) => (
            <motion.div
              key={addon.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <addon.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-1">{addon.name}</h3>
                  <p className="text-zinc-400 text-sm mb-2">{addon.description}</p>
                  <span className="text-emerald-400 text-sm font-medium">{addon.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-zinc-500 text-sm mt-10">
          <a href="#contact" className="text-emerald-400 hover:text-emerald-300 transition-colors">
            Consulta con nosotros
          </a>{' '}
          qué complementos necesita tu proyecto.
        </p>
      </div>
    </section>
  );
}
