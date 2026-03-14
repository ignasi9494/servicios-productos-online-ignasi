import { motion } from 'motion/react';
import {
  Brain, Smartphone, Workflow, LayoutDashboard, Link as LinkIcon,
  Search, DatabaseZap, Globe, ShoppingCart, BellRing, FileText, Palette,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Addon {
  name: string;
  description: string;
  price: string;
  priceNote?: string;
  icon: React.ElementType;
  category: string;
  complexity: 'Baja' | 'Media' | 'Alta';
}

const addons: Addon[] = [
  {
    name: 'Integración IA',
    description: 'Chatbot, análisis de documentos o automatización inteligente con modelos de lenguaje.',
    price: '+1.500 - 3.000€',
    priceNote: 'Según tipo de IA',
    icon: Brain,
    category: 'IA y Automatización',
    complexity: 'Alta',
  },
  {
    name: 'Automatizaciones (n8n)',
    description: 'Automatiza flujos entre tus herramientas: email, CRM, ERP, Slack, Notion...',
    price: '+800 - 2.000€',
    priceNote: 'Según nº de flujos',
    icon: Workflow,
    category: 'IA y Automatización',
    complexity: 'Media',
  },
  {
    name: 'App móvil (PWA o nativa)',
    description: 'Tu app accesible desde iOS y Android. PWA sin tienda o nativa para máximo rendimiento.',
    price: '+2.000 - 5.000€',
    priceNote: 'Por plataforma',
    icon: Smartphone,
    category: 'Móvil',
    complexity: 'Alta',
  },
  {
    name: 'Panel admin avanzado',
    description: 'Gestiona usuarios, proyectos, pagos y configuración desde un dashboard completo.',
    price: '+1.200 - 2.500€',
    icon: LayoutDashboard,
    category: 'Gestión',
    complexity: 'Media',
  },
  {
    name: 'E-commerce completo',
    description: 'Catálogo, carrito, checkout con Stripe, gestión de pedidos e inventario.',
    price: '+1.500 - 3.000€',
    icon: ShoppingCart,
    category: 'Gestión',
    complexity: 'Alta',
  },
  {
    name: 'Integración CRM/ERP',
    description: 'Conecta tu app con Salesforce, HubSpot, Odoo, SAP u otras herramientas.',
    price: '+1.000 - 3.000€',
    priceNote: 'Según integración',
    icon: LinkIcon,
    category: 'Integraciones',
    complexity: 'Alta',
  },
  {
    name: 'Multi-idioma',
    description: 'Traduce toda la interfaz y el contenido a otros idiomas con i18n.',
    price: '+400€',
    priceNote: 'Por idioma adicional',
    icon: Globe,
    category: 'Internacionalización',
    complexity: 'Baja',
  },
  {
    name: 'Notificaciones push y email',
    description: 'Avisa a tus usuarios de novedades, acciones o eventos desde dentro y fuera de la app.',
    price: '+400 - 800€',
    icon: BellRing,
    category: 'Comunicación',
    complexity: 'Baja',
  },
  {
    name: 'Blog / CMS gestionable',
    description: 'Sistema de contenido para publicar artículos, noticias o páginas sin tocar código.',
    price: '+500€',
    icon: FileText,
    category: 'Contenido',
    complexity: 'Baja',
  },
  {
    name: 'SEO + Copywriting',
    description: 'Aparece en Google: keyword research, meta tags, contenido optimizado y sitemap.',
    price: '+500 - 1.500€',
    icon: Search,
    category: 'Marketing',
    complexity: 'Baja',
  },
  {
    name: 'Migración de datos',
    description: 'Importa tus datos del sistema antiguo sin pérdidas: CSV, Excel, BD, APIs...',
    price: '+500 - 2.000€',
    priceNote: 'Según volumen',
    icon: DatabaseZap,
    category: 'Infraestructura',
    complexity: 'Media',
  },
  {
    name: 'Diseño UI/UX custom',
    description: 'Diseño de identidad visual, prototipo en Figma y sistema de componentes propio.',
    price: '+500 - 1.500€',
    icon: Palette,
    category: 'Diseño',
    complexity: 'Media',
  },
];

const COMPLEXITY_COLOR: Record<string, string> = {
  Baja: 'text-emerald-400 bg-emerald-400/10',
  Media: 'text-amber-400 bg-amber-400/10',
  Alta: 'text-orange-400 bg-orange-400/10',
};

export function AddOns() {
  return (
    <section id="addons" className="py-24 bg-zinc-900/30 border-y border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Extras y add-ons</h2>
          <p className="text-zinc-400 text-lg">
            Añade funcionalidades extra a cualquier plan. Cada extra tiene un precio fijo orientativo — el cuestionario calcula el coste exacto según tu proyecto.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {addons.map((addon, index) => (
            <motion.div
              key={addon.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
              className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                  <addon.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-white font-semibold text-sm">{addon.name}</h3>
                    <span className={`text-xs px-1.5 py-0.5 rounded-md font-medium shrink-0 ${COMPLEXITY_COLOR[addon.complexity]}`}>
                      {addon.complexity}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-xs mb-2 leading-relaxed">{addon.description}</p>
                  <div>
                    <span className="text-emerald-400 text-sm font-semibold">{addon.price}</span>
                    {addon.priceNote && (
                      <span className="text-zinc-600 text-xs ml-1">({addon.priceNote})</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center space-y-2">
          <p className="text-zinc-500 text-sm">
            Los precios son orientativos sin IVA. El precio exacto se calcula en el cuestionario según la complejidad real.
          </p>
          <p className="text-zinc-400 text-sm">
            <Link to="/cuestionario" className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
              Inicia el cuestionario gratuito
            </Link>{' '}
            y obtén un presupuesto con todos los extras que necesitas.
          </p>
        </div>
      </div>
    </section>
  );
}
