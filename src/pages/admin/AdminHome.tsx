import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  FileText, Users, CreditCard, MessageSquare, ArrowRight,
  TrendingUp, Clock, CheckCircle, AlertCircle, RefreshCw,
  BarChart2, Zap,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { usePageTitle } from '../../hooks/usePageTitle';
import { MOCK_PROJECTS, MOCK_CLIENTS, shouldUseMockData } from '../../lib/mockDemoData';

interface AdminStats {
  totalProjects: number;
  pendingProposals: number;
  inDevelopment: number;
  completedProjects: number;
  totalClients: number;
  unreadMessages: number;
  pendingPayments: number;
  questionnairesThisWeek: number;
}

interface RecentProject {
  id: string;
  name: string;
  status: string;
  client_name: string;
  plan: string;
  created_at: string;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  questionnaire: { label: 'Cuestionario', color: 'text-zinc-400 bg-zinc-800' },
  pending_proposal: { label: 'Sin propuesta', color: 'text-amber-400 bg-amber-400/10' },
  proposal_sent: { label: 'Propuesta enviada', color: 'text-blue-400 bg-blue-400/10' },
  proposal_accepted: { label: 'Aceptada', color: 'text-emerald-400 bg-emerald-400/10' },
  in_development: { label: 'En desarrollo', color: 'text-purple-400 bg-purple-400/10' },
  in_review: { label: 'En revisión', color: 'text-orange-400 bg-orange-400/10' },
  completed: { label: 'Completado', color: 'text-emerald-400 bg-emerald-400/10' },
  delivered: { label: 'Entregado', color: 'text-zinc-400 bg-zinc-800' },
};

const PIPELINE_STATUSES = [
  { key: 'pending_proposal', label: 'Sin propuesta', color: 'bg-amber-500' },
  { key: 'proposal_sent', label: 'Propuesta enviada', color: 'bg-blue-500' },
  { key: 'proposal_accepted', label: 'Aceptadas', color: 'bg-emerald-500' },
  { key: 'in_development', label: 'En desarrollo', color: 'bg-purple-500' },
  { key: 'in_review', label: 'En revisión', color: 'bg-orange-500' },
];

export function AdminHome() {
  usePageTitle('Panel admin | Think Better');
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [projects, setProjects] = useState<RecentProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    setLoading(true);

    try {
      // Load all projects
      const { data: projectsData } = await supabase
        .from('projects')
        .select('id, name, status, plan, client_id, created_at')
        .order('created_at', { ascending: false })
        .limit(50);

      // Load profiles for client names
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, full_name, role');

      const profileMap: Record<string, string> = {};
      (profilesData ?? []).forEach((p) => {
        profileMap[p.id] = p.full_name;
      });

      const allProjects = shouldUseMockData((projectsData ?? []).length)
        ? MOCK_PROJECTS
        : (projectsData ?? []);
      const clientProfiles = shouldUseMockData((profilesData ?? []).length)
        ? MOCK_CLIENTS
        : (profilesData ?? []).filter((p) => p.role === 'client');

      const enrichedProjects: RecentProject[] = allProjects.slice(0, 8).map((p) => ({
        id: p.id,
        name: p.name || 'Proyecto sin nombre',
        status: p.status,
        client_name: (p as { client_name?: string }).client_name ?? profileMap[p.client_id] ?? 'Cliente desconocido',
        plan: p.plan ?? 'build',
        created_at: p.created_at,
      }));

      // Compute stats
      const computedStats: AdminStats = {
        totalProjects: allProjects.length,
        pendingProposals: allProjects.filter((p) => p.status === 'pending_proposal').length,
        inDevelopment: allProjects.filter((p) => p.status === 'in_development').length,
        completedProjects: allProjects.filter((p) => ['completed', 'delivered'].includes(p.status)).length,
        totalClients: clientProfiles.length,
        unreadMessages: 0, // TODO: implement unread count
        pendingPayments: 0, // TODO: implement pending payment count
        questionnairesThisWeek: allProjects.filter((p) => {
          const date = new Date(p.created_at);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return date > weekAgo;
        }).length,
      };

      setStats(computedStats);
      setProjects(enrichedProjects);
    } catch (e) {
      console.error('Error loading admin data:', e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Vista general</h1>
          <p className="text-zinc-400 text-sm mt-0.5">Panel de gestión de Think Better</p>
        </div>
        <button
          onClick={loadDashboardData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Actualizar
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="w-8 h-8 text-zinc-600 animate-spin" />
        </div>
      ) : (
        <>
          {/* KPI cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                icon: FileText,
                label: 'Proyectos totales',
                value: stats?.totalProjects ?? 0,
                color: 'text-emerald-400',
                bg: 'bg-emerald-500/10',
                href: '/admin/proyectos',
              },
              {
                icon: AlertCircle,
                label: 'Sin propuesta',
                value: stats?.pendingProposals ?? 0,
                color: 'text-amber-400',
                bg: 'bg-amber-500/10',
                href: '/admin/proyectos',
              },
              {
                icon: Zap,
                label: 'En desarrollo',
                value: stats?.inDevelopment ?? 0,
                color: 'text-purple-400',
                bg: 'bg-purple-500/10',
                href: '/admin/proyectos',
              },
              {
                icon: Users,
                label: 'Clientes',
                value: stats?.totalClients ?? 0,
                color: 'text-blue-400',
                bg: 'bg-blue-500/10',
                href: '/admin/clientes',
              },
            ].map(({ icon: Icon, label, value, color, bg, href }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Link
                  to={href}
                  className="block p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors group"
                >
                  <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">{value}</p>
                  <p className="text-xs text-zinc-500">{label}</p>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Quick stats row */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center">
              <TrendingUp className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
              <p className="text-lg font-bold text-white">{stats?.questionnairesThisWeek ?? 0}</p>
              <p className="text-xs text-zinc-500">Cuestionarios esta semana</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center">
              <MessageSquare className="w-5 h-5 text-blue-400 mx-auto mb-2" />
              <p className="text-lg font-bold text-white">{stats?.unreadMessages ?? 0}</p>
              <p className="text-xs text-zinc-500">Mensajes sin responder</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center">
              <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
              <p className="text-lg font-bold text-white">{stats?.completedProjects ?? 0}</p>
              <p className="text-xs text-zinc-500">Proyectos completados</p>
            </div>
          </div>

          {/* Pipeline */}
          <div className="mb-8 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-emerald-400" />
                Pipeline de proyectos
              </h2>
              <Link to="/admin/proyectos" className="text-xs text-zinc-500 hover:text-emerald-400 transition-colors flex items-center gap-1">
                Ver todos <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="flex gap-2 flex-wrap">
              {PIPELINE_STATUSES.map(({ key, label, color }) => {
                const count = projects.filter((p) => p.status === key).length;
                return (
                  <div
                    key={key}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-800 text-xs"
                  >
                    <div className={`w-2 h-2 rounded-full ${color}`} />
                    <span className="text-zinc-300">{label}</span>
                    <span className="font-bold text-white">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent projects */}
          <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Proyectos recientes</h2>
              <Link
                to="/admin/proyectos"
                className="text-xs text-zinc-500 hover:text-emerald-400 transition-colors flex items-center gap-1"
              >
                Ver todos <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {projects.length === 0 ? (
              <div className="py-12 text-center text-zinc-500 text-sm">
                No hay proyectos todavía
              </div>
            ) : (
              <div className="divide-y divide-zinc-800/50">
                {projects.map((project) => {
                  const statusInfo = STATUS_LABELS[project.status] ?? { label: project.status, color: 'text-zinc-400 bg-zinc-800' };
                  const date = new Date(project.created_at).toLocaleDateString('es-ES', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  });
                  return (
                    <Link
                      key={project.id}
                      to={`/admin/proyectos/${project.id}`}
                      className="flex items-center gap-4 px-6 py-4 hover:bg-zinc-800/30 transition-colors group"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate group-hover:text-emerald-400 transition-colors">
                          {project.name}
                        </p>
                        <p className="text-xs text-zinc-500 truncate">
                          {project.client_name} · {date}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium capitalize text-zinc-300 bg-zinc-800">
                          {project.plan}
                        </span>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick actions */}
          <div>
            <h2 className="text-sm font-semibold text-white mb-3">Acciones rápidas</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                {
                  icon: FileText,
                  label: 'Crear propuesta',
                  description: 'Genera o escribe una nueva propuesta para un cliente',
                  href: '/admin/proyectos',
                  color: 'text-emerald-400',
                },
                {
                  icon: MessageSquare,
                  label: 'Ver mensajes',
                  description: 'Responde a los mensajes de clientes pendientes',
                  href: '/admin/mensajes',
                  color: 'text-blue-400',
                },
                {
                  icon: Clock,
                  label: 'Actualizar estado',
                  description: 'Cambia el estado de proyectos en curso',
                  href: '/admin/proyectos',
                  color: 'text-amber-400',
                },
              ].map(({ icon: Icon, label, description, href, color }) => (
                <Link
                  key={label}
                  to={href}
                  className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors group"
                >
                  <Icon className={`w-5 h-5 ${color} shrink-0 mt-0.5`} />
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">
                      {label}
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5">{description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
