import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  MessageSquare, FileText, CreditCard,
  ArrowRight, AlertCircle, Rocket,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { ProjectStatus } from '../../components/dashboard/ProjectStatus';
import { usePageTitle } from '../../hooks/usePageTitle';

export function Resumen() {
  usePageTitle('Mi panel | Think Better');
  const { profile } = useAuth();
  const firstName = profile?.full_name?.split(' ')[0] ?? 'usuario';

  // TODO: Replace with real data from Supabase
  const hasProject = false;

  if (!hasProject) {
    return <EmptyDashboard firstName={firstName} />;
  }

  return <ProjectDashboard firstName={firstName} />;
}

function EmptyDashboard({ firstName }: { firstName: string }) {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-2">
        Hola, {firstName}
      </h1>
      <p className="text-zinc-400 mb-8">Bienvenido a tu panel de cliente</p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center"
      >
        <Rocket className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">Empieza tu proyecto</h2>
        <p className="text-zinc-400 text-sm mb-6 max-w-md mx-auto">
          Completa nuestro cuestionario inteligente para recibir un presupuesto estimado
          y una propuesta personalizada en menos de 24 horas.
        </p>
        <Link
          to="/cuestionario"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors"
        >
          Iniciar cuestionario
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>

      <div className="grid sm:grid-cols-3 gap-4 mt-6">
        <QuickAction
          icon={MessageSquare}
          title="Mensajes"
          description="Sin mensajes nuevos"
          href="/dashboard/mensajes"
          delay={0.1}
        />
        <QuickAction
          icon={FileText}
          title="Propuestas"
          description="Sin propuestas"
          href="/dashboard/propuestas"
          delay={0.2}
        />
        <QuickAction
          icon={CreditCard}
          title="Pagos"
          description="Sin pagos pendientes"
          href="/dashboard/pagos"
          delay={0.3}
        />
      </div>
    </div>
  );
}

function ProjectDashboard({ firstName }: { firstName: string }) {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-2">
        Hola, {firstName}
      </h1>
      <p className="text-zinc-400 mb-8">Aqui tienes el resumen de tu proyecto</p>

      {/* Project status */}
      <div className="mb-6">
        <ProjectStatus status="proposal_sent" />
      </div>

      {/* Action required */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-4 mb-6 flex items-start gap-3"
      >
        <AlertCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-white">Accion requerida</p>
          <p className="text-sm text-zinc-400 mt-0.5">Tu propuesta esta lista para revisar. Revisa los detalles y aceptala para continuar.</p>
          <Link
            to="/dashboard/propuestas"
            className="inline-flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 mt-2 transition-colors"
          >
            Ver propuesta <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.div>

      {/* Quick stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <QuickAction
          icon={MessageSquare}
          title="Mensajes"
          description="2 mensajes nuevos"
          href="/dashboard/mensajes"
          delay={0.2}
          badge={2}
        />
        <QuickAction
          icon={FileText}
          title="Propuestas"
          description="1 propuesta pendiente"
          href="/dashboard/propuestas"
          delay={0.3}
          badge={1}
        />
        <QuickAction
          icon={CreditCard}
          title="Pagos"
          description="Sin pagos pendientes"
          href="/dashboard/pagos"
          delay={0.4}
        />
      </div>
    </div>
  );
}

function QuickAction({ icon: Icon, title, description, href, delay = 0, badge }: {
  icon: typeof MessageSquare;
  title: string;
  description: string;
  href: string;
  delay?: number;
  badge?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.025 }}
      transition={{ delay, scale: { duration: 0.15 } }}
    >
      <Link
        to={href}
        className="block bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors group"
      >
        <div className="flex items-center justify-between mb-2">
          <Icon className="w-5 h-5 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
          {badge && badge > 0 && (
            <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </div>
        <h3 className="text-sm font-medium text-white">{title}</h3>
        <p className="text-xs text-zinc-500 mt-0.5">{description}</p>
      </Link>
    </motion.div>
  );
}
