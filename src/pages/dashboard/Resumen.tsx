import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  MessageSquare, FileText, CreditCard,
  ArrowRight, AlertCircle, Rocket,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { ProjectStatus } from '../../components/dashboard/ProjectStatus';
import { usePageTitle } from '../../hooks/usePageTitle';
import { isMockDemo, MOCK_CLIENT_PROJECT } from '../../lib/mockDemoData';

interface ProjectData {
  id: string;
  name: string;
  status: string;
  unread_messages: number;
  pending_proposals: number;
}

export function Resumen() {
  usePageTitle('Mi panel | Think Better');
  const { user, profile } = useAuth();
  const firstName = profile?.full_name?.split(' ')[0] ?? 'usuario';

  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isMockDemo()) {
      // Demo mode: use mock data immediately
      setProject({
        id: MOCK_CLIENT_PROJECT.id,
        name: MOCK_CLIENT_PROJECT.name,
        status: MOCK_CLIENT_PROJECT.status,
        unread_messages: 2,
        pending_proposals: 1,
      });
      setLoading(false);
      return;
    }

    if (!user) {
      setLoading(false);
      return;
    }

    async function loadProject() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('id, name, status')
          .eq('client_id', user!.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          // Count unread messages and pending proposals in parallel
          const [messagesResult, proposalsResult] = await Promise.all([
            supabase
              .from('messages')
              .select('id', { count: 'exact', head: true })
              .eq('project_id', data.id)
              .is('read_at', null)
              .neq('sender_role', 'client'),
            supabase
              .from('proposals')
              .select('id', { count: 'exact', head: true })
              .eq('project_id', data.id)
              .eq('status', 'sent'),
          ]);

          setProject({
            id: data.id,
            name: data.name,
            status: data.status,
            unread_messages: messagesResult.count ?? 0,
            pending_proposals: proposalsResult.count ?? 0,
          });
        }
      } catch (e) {
        console.error('Error loading project:', e);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [user]);

  if (loading) {
    return <ResumenSkeleton />;
  }

  if (!project) {
    return <EmptyDashboard firstName={firstName} />;
  }

  return <ProjectDashboard firstName={firstName} project={project} />;
}

function ResumenSkeleton() {
  return (
    <div className="max-w-4xl mx-auto animate-pulse">
      <div className="h-7 w-48 bg-zinc-800 rounded mb-2" />
      <div className="h-4 w-64 bg-zinc-800/60 rounded mb-8" />
      <div className="h-32 bg-zinc-800/40 rounded-2xl mb-6" />
      <div className="grid sm:grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-20 bg-zinc-800/40 rounded-xl" />
        ))}
      </div>
    </div>
  );
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

function ProjectDashboard({ firstName, project }: { firstName: string; project: ProjectData }) {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-2">
        Hola, {firstName}
      </h1>
      <p className="text-zinc-400 mb-8">Aquí tienes el resumen de tu proyecto</p>

      {/* Project status */}
      <div className="mb-6">
        <ProjectStatus status={project.status as 'proposal_sent'} />
      </div>

      {/* Action required banner when proposal is waiting */}
      {project.pending_proposals > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-4 mb-6 flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-white">Acción requerida</p>
            <p className="text-sm text-zinc-400 mt-0.5">Tu propuesta está lista para revisar. Revisa los detalles y acéptala para continuar.</p>
            <Link
              to="/dashboard/propuestas"
              className="inline-flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 mt-2 transition-colors"
            >
              Ver propuesta <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      )}

      {/* Quick stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <QuickAction
          icon={MessageSquare}
          title="Mensajes"
          description={project.unread_messages > 0 ? `${project.unread_messages} mensaje${project.unread_messages > 1 ? 's' : ''} nuevo${project.unread_messages > 1 ? 's' : ''}` : 'Sin mensajes nuevos'}
          href="/dashboard/mensajes"
          delay={0.2}
          badge={project.unread_messages > 0 ? project.unread_messages : undefined}
        />
        <QuickAction
          icon={FileText}
          title="Propuestas"
          description={project.pending_proposals > 0 ? `${project.pending_proposals} propuesta pendiente` : 'Sin propuestas pendientes'}
          href="/dashboard/propuestas"
          delay={0.3}
          badge={project.pending_proposals > 0 ? project.pending_proposals : undefined}
        />
        <QuickAction
          icon={CreditCard}
          title="Pagos"
          description="Ver historial de pagos"
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
