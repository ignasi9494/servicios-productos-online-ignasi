import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  FileText, ArrowRight, RefreshCw, Search, Filter,
  Plus, AlertCircle,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { usePageTitle } from '../../hooks/usePageTitle';

interface Project {
  id: string;
  name: string;
  status: string;
  plan: string;
  client_id: string;
  client_name: string;
  total_price: number | null;
  created_at: string;
  used_iterations: number;
  max_iterations: number;
}

const STATUS_OPTIONS = [
  { value: '', label: 'Todos los estados' },
  { value: 'pending_proposal', label: 'Sin propuesta' },
  { value: 'proposal_sent', label: 'Propuesta enviada' },
  { value: 'proposal_accepted', label: 'Propuesta aceptada' },
  { value: 'in_development', label: 'En desarrollo' },
  { value: 'in_review', label: 'En revisión' },
  { value: 'completed', label: 'Completado' },
  { value: 'delivered', label: 'Entregado' },
];

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

export function AdminProjects() {
  usePageTitle('Proyectos | Admin | Think Better');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);
    const { data: projectsData } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    const { data: profilesData } = await supabase
      .from('profiles')
      .select('id, full_name');

    const profileMap: Record<string, string> = {};
    (profilesData ?? []).forEach((p) => {
      profileMap[p.id] = p.full_name;
    });

    const enriched = (projectsData ?? []).map((p) => ({
      ...p,
      client_name: profileMap[p.client_id] ?? 'Cliente desconocido',
    }));

    setProjects(enriched);
    setLoading(false);
  }

  const filtered = projects.filter((p) => {
    const matchSearch =
      !search ||
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.client_name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Proyectos</h1>
          <p className="text-zinc-400 text-sm mt-0.5">{projects.length} proyectos en total</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={loadProjects}
            disabled={loading}
            className="p-2 rounded-xl text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors">
            <Plus className="w-4 h-4" />
            Nuevo proyecto
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nombre o cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>
        <div className="relative">
          <Filter className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white appearance-none focus:outline-none focus:border-emerald-500/50"
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 overflow-hidden">
        {loading ? (
          <div className="py-16 text-center">
            <RefreshCw className="w-8 h-8 text-zinc-600 animate-spin mx-auto mb-3" />
            <p className="text-zinc-500 text-sm">Cargando proyectos...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <FileText className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
            <p className="text-zinc-400">No se encontraron proyectos</p>
            {(search || statusFilter) && (
              <button
                onClick={() => { setSearch(''); setStatusFilter(''); }}
                className="mt-3 text-xs text-emerald-400 hover:text-emerald-300"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-zinc-800/50">
            {filtered.map((project, i) => {
              const statusInfo = STATUS_LABELS[project.status] ?? { label: project.status, color: 'text-zinc-400 bg-zinc-800' };
              const date = new Date(project.created_at).toLocaleDateString('es-ES', {
                day: 'numeric', month: 'short', year: 'numeric',
              });
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                >
                  <Link
                    to={`/admin/proyectos/${project.id}`}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-zinc-800/30 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-zinc-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate group-hover:text-emerald-400 transition-colors">
                        {project.name || 'Proyecto sin nombre'}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {project.client_name} · {date}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {project.total_price && (
                        <span className="text-sm font-semibold text-white hidden sm:block">
                          {(project.total_price / 100).toLocaleString('es-ES')} €
                        </span>
                      )}
                      <span className="hidden sm:inline-flex text-xs px-2 py-0.5 rounded-full font-medium capitalize text-zinc-300 bg-zinc-800">
                        {project.plan}
                      </span>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Pending proposals alert */}
      {!loading && projects.filter((p) => p.status === 'pending_proposal').length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-5 flex items-start gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20"
        >
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-white">
              {projects.filter((p) => p.status === 'pending_proposal').length} proyectos necesitan propuesta
            </p>
            <p className="text-xs text-zinc-400 mt-0.5">
              Estos clientes están esperando su propuesta. Intenta responder en menos de 24 horas.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
