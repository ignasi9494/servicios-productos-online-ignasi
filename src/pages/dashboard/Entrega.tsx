import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Download, Server, CheckCircle, Lock, Sparkles,
  Zap, Shield, Headphones, ArrowRight, Info,
  Package, CreditCard, Star, Settings,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../../hooks/usePageTitle';
import { createCheckoutSession, createPortalSession } from '../../lib/stripe';
import { useAuth } from '../../contexts/AuthContext';
import { trackPaymentInitiated } from '../../lib/analytics';

type DeliveryOption = 'export' | 'hosting' | null;

type HostingPlan = 'basico' | 'pro' | 'premium';

interface HostingPlanConfig {
  id: HostingPlan;
  name: string;
  price: number;
  description: string;
  features: string[];
  highlighted?: boolean;
}

const HOSTING_PLANS: HostingPlanConfig[] = [
  {
    id: 'basico',
    name: 'Básico',
    price: 49,
    description: 'Para proyectos pequeños con tráfico bajo',
    features: [
      'Hosting en servidor dedicado',
      'SSL gratuito incluido',
      'Backups semanales',
      'Soporte por email (48h)',
      'Hasta 10 GB de almacenamiento',
      'Base de datos incluida',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 99,
    description: 'Para negocios en crecimiento',
    features: [
      'Todo lo del plan Básico',
      'Backups diarios',
      'Soporte prioritario (24h)',
      'Hasta 50 GB de almacenamiento',
      'CDN global incluido',
      'Monitorización 24/7',
      'Actualizaciones de seguridad',
    ],
    highlighted: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 199,
    description: 'Para aplicaciones críticas de alto tráfico',
    features: [
      'Todo lo del plan Pro',
      'Soporte telefónico inmediato',
      'Hasta 200 GB de almacenamiento',
      'Escalado automático',
      'SLA del 99.9% de uptime',
      '1 hora de desarrollo al mes incluida',
      'Revisión de rendimiento mensual',
    ],
  },
];

// Mock: project is completed = true for demo. In production, check project.status === 'completed'
const PROJECT_COMPLETED = true;
const FINAL_PAYMENT_PENDING = true;
const FINAL_PAYMENT_AMOUNT = 1800; // euros (not cents)

export function Entrega() {
  usePageTitle('Entrega | Think Better');
  const { user } = useAuth();
  const [selectedOption, setSelectedOption] = useState<DeliveryOption>(null);
  const [selectedPlan, setSelectedPlan] = useState<HostingPlan>('pro');
  const [loading, setLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);

  if (!PROJECT_COMPLETED) {
    return <NotReadyState />;
  }

  async function handleExport() {
    if (!user) {
      alert('Debes iniciar sesión para continuar.');
      return;
    }
    setLoading(true);
    trackPaymentInitiated('export', FINAL_PAYMENT_AMOUNT, 'full');
    // If final payment pending, initiate Stripe Checkout. Otherwise, delivery_url will be shown.
    const { url, error: err } = await createCheckoutSession({
      projectId: 'current', // In production: real project ID from DB
      paymentType: 'final',
      amount: FINAL_PAYMENT_AMOUNT,
      projectName: 'Proyecto Think Better',
    });
    setLoading(false);
    if (err || !url) {
      alert(err ?? 'Error creando sesión de pago. Contacta con el equipo.');
      return;
    }
    window.location.href = url;
  }

  async function handleSubscribe() {
    if (!user) {
      alert('Debes iniciar sesión para continuar.');
      return;
    }
    setLoading(true);
    const plan = HOSTING_PLANS.find((p) => p.id === selectedPlan);
    trackPaymentInitiated(selectedPlan ?? 'unknown', plan?.price ?? 0, 'subscription');
    const { url, error: err } = await createCheckoutSession({
      projectId: 'current', // In production: real project ID from DB
      paymentType: 'maintenance',
      amount: plan?.price ?? 99,
      projectName: `Plan ${plan?.name ?? 'Pro'} - Mantenimiento mensual`,
    });
    setLoading(false);
    if (err || !url) {
      alert(err ?? 'Error creando sesión de suscripción. Contacta con el equipo.');
      return;
    }
    window.location.href = url;
  }

  async function handleOpenPortal() {
    setPortalLoading(true);
    const { url, error: err } = await createPortalSession();
    setPortalLoading(false);
    if (err || !url) {
      alert(err ?? 'Error abriendo el portal. Contacta con el equipo.');
      return;
    }
    window.location.href = url;
  }

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Tu proyecto está listo</h1>
            <p className="text-zinc-400 text-sm">Elige cómo quieres recibir tu entrega</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-sm text-emerald-300">
          <CheckCircle className="w-4 h-4 shrink-0" />
          El equipo de Think Better ha completado el desarrollo de tu proyecto.
          <strong className="font-semibold">¡Enhorabuena!</strong>
        </div>
      </div>

      {/* Option cards */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {/* Option A: Export */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          onClick={() => setSelectedOption('export')}
          className={`text-left p-6 rounded-2xl border-2 transition-all ${
            selectedOption === 'export'
              ? 'border-emerald-500 bg-emerald-500/5'
              : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
          }`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center">
              <Download className="w-6 h-6 text-white" />
            </div>
            {selectedOption === 'export' && (
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            )}
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Exportar código</h3>
          <p className="text-zinc-400 text-sm mb-4">
            Descarga el código fuente completo en un ZIP. El código es 100% tuyo.
            Puedes alojarlo donde quieras.
          </p>
          <div className="space-y-1.5">
            {['Código fuente completo', 'Documentación de despliegue', 'Variables de entorno', 'Código 100% tuyo'].map((f) => (
              <div key={f} className="flex items-center gap-2 text-xs text-zinc-300">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                {f}
              </div>
            ))}
          </div>
          {FINAL_PAYMENT_PENDING && (
            <div className="mt-4 flex items-center gap-2 text-xs text-amber-400">
              <Lock className="w-3.5 h-3.5" />
              Requiere pago final de {FINAL_PAYMENT_AMOUNT.toLocaleString('es-ES')} €
            </div>
          )}
        </motion.button>

        {/* Option B: Hosting */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          onClick={() => setSelectedOption('hosting')}
          className={`text-left p-6 rounded-2xl border-2 transition-all ${
            selectedOption === 'hosting'
              ? 'border-cyan-500 bg-cyan-500/5'
              : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
          }`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center">
              <Server className="w-6 h-6 text-white" />
            </div>
            {selectedOption === 'hosting' && (
              <CheckCircle className="w-5 h-5 text-cyan-400" />
            )}
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">Mantener en nuestra plataforma</h3>
          <p className="text-zinc-400 text-sm mb-4">
            Nos encargamos del hosting, mantenimiento, seguridad y actualizaciones.
            Tú solo céntrate en tu negocio.
          </p>
          <div className="space-y-1.5">
            {['Hosting gestionado', 'SSL y dominio', 'Backups automáticos', 'Soporte técnico continuo'].map((f) => (
              <div key={f} className="flex items-center gap-2 text-xs text-zinc-300">
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                {f}
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-cyan-400 font-medium">
            Desde 49 €/mes · Sin compromiso de permanencia
          </div>
        </motion.button>
      </div>

      {/* Option A: Export detail */}
      <AnimatePresence>
        {selectedOption === 'export' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="mb-8 p-6 rounded-2xl bg-zinc-900 border border-zinc-800"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-emerald-400" />
              Exportar código fuente
            </h3>

            {FINAL_PAYMENT_PENDING ? (
              <>
                <p className="text-zinc-400 text-sm mb-5">
                  Para descargar el código, es necesario completar el pago final del proyecto.
                  Una vez procesado, recibirás el enlace de descarga por email y estará disponible aquí.
                </p>
                <div className="bg-zinc-800/50 rounded-xl p-4 mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-zinc-400">Pago final pendiente</span>
                    <span className="text-xl font-bold text-white">
                      {FINAL_PAYMENT_AMOUNT.toLocaleString('es-ES')} €
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500">
                    Incluye IVA. Pago único, sin cargos adicionales.
                  </p>
                </div>
                <button
                  onClick={handleExport}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-sm transition-colors"
                >
                  {loading ? (
                    <span className="animate-spin">⏳</span>
                  ) : (
                    <CreditCard className="w-4 h-4" />
                  )}
                  Pagar y descargar código
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button
                onClick={handleExport}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                Descargar código (ZIP)
              </button>
            )}

            <div className="mt-4 flex items-start gap-2 text-xs text-zinc-500">
              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              El código es 100% tuyo y siempre podrás exportarlo. No hay ningún tipo de bloqueo.
              Incluye instrucciones de despliegue para varios proveedores (Vercel, Railway, etc.).
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Option B: Hosting plans */}
      <AnimatePresence>
        {selectedOption === 'hosting' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="mb-8"
          >
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <Server className="w-5 h-5 text-cyan-400" />
              Elige tu plan de mantenimiento
            </h3>
            <p className="text-zinc-400 text-sm mb-6">
              Todos los planes incluyen el código alojado, SSL, dominio y backups.
              Puedes cancelar cuando quieras.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {HOSTING_PLANS.map((plan) => (
                <motion.button
                  key={plan.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`text-left p-5 rounded-2xl border-2 transition-all relative ${
                    selectedPlan === plan.id
                      ? plan.id === 'pro'
                        ? 'border-cyan-500 bg-cyan-500/5'
                        : 'border-emerald-500 bg-emerald-500/5'
                      : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-500 text-xs font-semibold text-white">
                        <Star className="w-3 h-3" />
                        Más popular
                      </span>
                    </div>
                  )}

                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-white">{plan.name}</span>
                      {selectedPlan === plan.id && (
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      )}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-white">{plan.price} €</span>
                      <span className="text-xs text-zinc-500">/mes</span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-500 mb-3">{plan.description}</p>

                  <div className="space-y-1.5">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                        {f}
                      </div>
                    ))}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Subscribe button */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-semibold text-sm transition-colors"
              >
                {loading ? (
                  <span className="animate-spin">⏳</span>
                ) : (
                  <Zap className="w-4 h-4" />
                )}
                Activar plan {HOSTING_PLANS.find((p) => p.id === selectedPlan)?.name} —{' '}
                {HOSTING_PLANS.find((p) => p.id === selectedPlan)?.price} €/mes
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-xs text-zinc-500">Sin compromiso. Cancela en cualquier momento.</p>
            </div>

            {/* Features highlight */}
            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              {[
                { icon: Shield, title: 'Seguridad', description: 'SSL, backups, actualizaciones de seguridad automáticas' },
                { icon: Zap, title: 'Rendimiento', description: 'CDN global, optimización de imágenes, caché inteligente' },
                { icon: Headphones, title: 'Soporte', description: 'Equipo técnico disponible para resolver cualquier incidencia' },
              ].map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                  <Icon className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white mb-1">{title}</p>
                    <p className="text-xs text-zinc-500">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No selection yet */}
      {!selectedOption && (
        <div className="text-center py-8 text-zinc-600 text-sm">
          Selecciona una opción de entrega para continuar
        </div>
      )}

      {/* Footer note */}
      <div className="mt-6 flex items-start gap-2 rounded-xl bg-zinc-900/30 border border-zinc-800 px-5 py-4">
        <Info className="w-4 h-4 text-zinc-600 shrink-0 mt-0.5" />
        <p className="text-xs text-zinc-500 leading-relaxed">
          Independientemente de la opción que elijas, el código siempre es 100% tuyo.
          Si empiezas con hosting y más adelante quieres exportarlo, podrás hacerlo sin coste adicional.
          Para cualquier duda, contacta con nosotros en el{' '}
          <Link to="/dashboard/mensajes" className="text-emerald-400 hover:text-emerald-300 underline">
            chat interno
          </Link>.
        </p>
      </div>

      {/* Subscription management link */}
      <div className="mt-4 flex items-center justify-between rounded-xl bg-zinc-900/30 border border-zinc-800 px-5 py-3">
        <p className="text-xs text-zinc-500">
          ¿Ya tienes un plan de mantenimiento activo?
        </p>
        <button
          onClick={handleOpenPortal}
          disabled={portalLoading}
          className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors disabled:opacity-50"
        >
          {portalLoading ? (
            <span className="inline-block w-3 h-3 border border-cyan-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Settings className="w-3.5 h-3.5" />
          )}
          Gestionar suscripción
        </button>
      </div>
    </div>
  );
}

function NotReadyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center text-center py-20"
    >
      <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
        <Package className="w-8 h-8 text-zinc-600" />
      </div>
      <h2 className="text-xl font-semibold text-white mb-2">
        Tu proyecto está en desarrollo
      </h2>
      <p className="text-zinc-400 text-sm max-w-md mb-6">
        La sección de entrega estará disponible cuando el equipo marque el proyecto como completado.
        Puedes seguir el progreso en la sección de inicio.
      </p>
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium transition-colors"
      >
        Ver estado del proyecto
        <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  );
}
