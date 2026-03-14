import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  RefreshCw as Refresh, GitBranch, CheckCircle2, Clock,
  Loader2, AlertCircle, X, ArrowRight, Plus, Image as ImageIcon,
  AlertTriangle, ShoppingCart,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase, supabaseConfigured } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import type { IterationStatus } from '../../lib/database.types';
import { usePageTitle } from '../../hooks/usePageTitle';

interface Iteration {
  id: string;
  project_id: string;
  iteration_number: number;
  description: string;
  screenshot_urls: string[] | null;
  status: IterationStatus;
  created_at: string;
  completed_at: string | null;
}

interface Project {
  id: string;
  name: string;
  max_iterations: number;
  used_iterations: number;
  status: string;
}

const STATUS_CONFIG: Record<IterationStatus, { label: string; icon: React.ComponentType<{ className?: string }>; color: string; bg: string }> = {
  requested: {
    label: 'Solicitada',
    icon: Clock,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
  },
  in_progress: {
    label: 'En progreso',
    icon: Refresh,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
  },
  completed: {
    label: 'Completada',
    icon: CheckCircle2,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
};

export function Iteraciones() {
  usePageTitle('Iteraciones | Think Better');
  const { user } = useAuth();
  const [iterations, setIterations] = useState<Iteration[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Load project and iterations
  const loadData = useCallback(async () => {
    if (!user || !supabaseConfigured) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const { data: projects } = await supabase
      .from('projects')
      .select('id, name, max_iterations, used_iterations, status')
      .eq('client_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1);

    if (!projects || projects.length === 0) {
      setLoading(false);
      return;
    }

    const proj = projects[0] as Project;
    setProject(proj);

    const { data: iters, error: iterErr } = await supabase
      .from('iterations')
      .select('*')
      .eq('project_id', proj.id)
      .order('iteration_number', { ascending: true });

    if (iterErr) {
      setError('Error cargando iteraciones');
      setLoading(false);
      return;
    }

    const rawIters = (iters ?? []) as unknown as Iteration[];
    setIterations(rawIters.map((it) => ({
      ...it,
      screenshot_urls: Array.isArray(it.screenshot_urls) ? it.screenshot_urls : null,
    })));
    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const remaining = project ? project.max_iterations - project.used_iterations : 0;
  const isLastIteration = remaining === 1;
  const noIterationsLeft = remaining <= 0;

  if (!supabaseConfigured || (!loading && !project)) {
    return <EmptyState />;
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Iteraciones</h1>
          <p className="text-sm text-zinc-500 mt-1">Solicita cambios y mejoras en tu proyecto</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={loadData}
            disabled={loading}
            className="p-2 rounded-xl text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors disabled:opacity-50"
            title="Actualizar"
          >
            <Refresh className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          {!noIterationsLeft && !showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Solicitar cambios
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-3 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-auto"><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Iterations counter */}
      {project && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 rounded-2xl border p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 ${
            noIterationsLeft
              ? 'bg-red-500/5 border-red-500/20'
              : isLastIteration
              ? 'bg-amber-500/5 border-amber-500/20'
              : 'bg-zinc-900/50 border-zinc-800'
          }`}
        >
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
            noIterationsLeft ? 'bg-red-500/10' : isLastIteration ? 'bg-amber-500/10' : 'bg-emerald-500/10'
          }`}>
            <span className={`text-2xl font-bold ${
              noIterationsLeft ? 'text-red-400' : isLastIteration ? 'text-amber-400' : 'text-emerald-400'
            }`}>{remaining}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-white">
              {noIterationsLeft ? 'Sin iteraciones disponibles' : `${remaining} de ${project.max_iterations} iteraciones disponibles`}
            </p>
            <p className="text-sm text-zinc-500 mt-0.5">
              {noIterationsLeft
                ? 'Has agotado las iteraciones de tu plan.'
                : isLastIteration
                ? 'Última iteración. Úsala para los cambios más importantes.'
                : 'Cada iteración cubre cambios de diseño, texto o ajustes menores. No incluye nuevas funcionalidades.'}
            </p>
          </div>
          {noIterationsLeft && (
            <div className="shrink-0">
              <BuyMoreButton />
            </div>
          )}
        </motion.div>
      )}

      {/* Last iteration warning */}
      {isLastIteration && !noIterationsLeft && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 flex items-start gap-3 rounded-xl bg-amber-500/10 border border-amber-500/20 px-4 py-3"
        >
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-300">Esta es tu última iteración</p>
            <p className="text-xs text-zinc-400 mt-0.5">
              Asegúrate de incluir todos los cambios necesarios. Puedes comprar iteraciones adicionales por 250€ cada una.
            </p>
          </div>
        </motion.div>
      )}

      {/* Iteration request form */}
      <AnimatePresence>
        {showForm && project && (
          <IterationForm
            projectId={project.id}
            nextNumber={(project.used_iterations ?? 0) + 1}
            onClose={() => setShowForm(false)}
            onSuccess={() => {
              setShowForm(false);
              loadData();
            }}
          />
        )}
      </AnimatePresence>

      {/* Iterations list */}
      {loading && (
        <div className="py-16 text-center">
          <Loader2 className="w-8 h-8 text-zinc-600 animate-spin mx-auto mb-3" />
          <p className="text-zinc-500 text-sm">Cargando iteraciones...</p>
        </div>
      )}

      {!loading && iterations.length === 0 && !showForm && (
        <div className="py-14 text-center rounded-2xl border border-dashed border-zinc-800">
          <GitBranch className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-400 mb-1">Sin iteraciones aún</p>
          <p className="text-sm text-zinc-600 mb-4">
            Cuando necesites cambios en tu proyecto, solicita una iteración aquí.
          </p>
          {!noIterationsLeft && (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Solicitar primera iteración
            </button>
          )}
        </div>
      )}

      {!loading && iterations.length > 0 && (
        <div className="space-y-3">
          {iterations.map((iter, i) => (
            <IterationCard key={iter.id} iteration={iter} index={i} />
          ))}
        </div>
      )}

      {/* Info box */}
      <div className="mt-6 rounded-xl bg-zinc-900/30 border border-zinc-800 px-5 py-4">
        <p className="text-xs text-zinc-500 leading-relaxed">
          Las iteraciones cubren <strong className="text-zinc-400">cambios de diseño, ajustes de texto y mejoras menores</strong>.
          No incluyen nuevas funcionalidades fuera del alcance original.
          Si necesitas funcionalidades adicionales, podemos preparar un presupuesto aparte.
          Para cualquier duda, escríbenos por <Link to="/dashboard/mensajes" className="text-emerald-400 hover:text-emerald-300">mensajes</Link>.
        </p>
      </div>
    </div>
  );
}

function IterationCard({ iteration, index }: { iteration: Iteration; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = STATUS_CONFIG[iteration.status];
  const StatusIcon = cfg.icon;
  const date = new Date(iteration.created_at).toLocaleDateString('es-ES', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
  const completedDate = iteration.completed_at
    ? new Date(iteration.completed_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`rounded-2xl border ${cfg.bg} overflow-hidden`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 text-left hover:bg-white/5 transition-colors"
      >
        <div className="shrink-0 w-9 h-9 rounded-xl bg-zinc-950/50 flex items-center justify-center">
          <span className="text-sm font-bold text-zinc-400">#{iteration.iteration_number}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">{iteration.description}</p>
          <p className="text-xs text-zinc-500 mt-0.5">Solicitada el {date}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.color} bg-zinc-950/30`}>
            <StatusIcon className="w-3.5 h-3.5" />
            {cfg.label}
          </div>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 border-t border-zinc-800/50 space-y-3">
              <div>
                <p className="text-xs font-medium text-zinc-500 mb-1">Descripción completa</p>
                <p className="text-sm text-zinc-300 leading-relaxed">{iteration.description}</p>
              </div>
              {iteration.screenshot_urls && iteration.screenshot_urls.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-zinc-500 mb-2">Capturas de pantalla</p>
                  <div className="flex gap-2 flex-wrap">
                    {iteration.screenshot_urls.map((url, i) => (
                      <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                        <img
                          src={url}
                          alt={`Captura ${i + 1}`}
                          className="w-20 h-20 rounded-xl object-cover border border-zinc-700 hover:border-zinc-500 transition-colors"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}
              {completedDate && (
                <p className="text-xs text-zinc-500">
                  Completada el <span className="text-emerald-400">{completedDate}</span>
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function IterationForm({
  projectId, nextNumber, onClose, onSuccess,
}: {
  projectId: string;
  nextNumber: number;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { user } = useAuth();
  const [description, setDescription] = useState('');
  const [screenshots, setScreenshots] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim() || !user) return;

    setSubmitting(true);
    setSubmitError(null);

    // Upload screenshots
    const screenshotUrls: string[] = [];
    for (const file of screenshots) {
      const path = `${projectId}/iter-${nextNumber}-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const { data: uploadData } = await supabase.storage
        .from('project-files')
        .upload(path, file);

      if (uploadData) {
        const { data: urlData } = supabase.storage.from('project-files').getPublicUrl(path);
        screenshotUrls.push(urlData.publicUrl);
      }
    }

    // Insert iteration
    const { error: insertErr } = await supabase.from('iterations').insert({
      project_id: projectId,
      iteration_number: nextNumber,
      description: description.trim(),
      screenshot_urls: screenshotUrls.length > 0 ? screenshotUrls : null,
      status: 'requested',
    });

    if (insertErr) {
      setSubmitError('Error al enviar la solicitud. Inténtalo de nuevo.');
      setSubmitting(false);
      return;
    }

    // Update used_iterations count on project
    await supabase
      .from('projects')
      .update({ used_iterations: nextNumber })
      .eq('id', projectId);

    // Send auto-message to team
    await supabase.from('messages').insert({
      project_id: projectId,
      sender_id: user.id,
      sender_role: 'client',
      content: `He solicitado la iteración #${nextNumber}: ${description.trim().slice(0, 100)}${description.length > 100 ? '...' : ''}`,
    });

    setSubmitting(false);
    onSuccess();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="mb-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 overflow-hidden"
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
        <div>
          <h2 className="text-sm font-semibold text-white">Solicitar iteración #{nextNumber}</h2>
          <p className="text-xs text-zinc-500 mt-0.5">Describe los cambios que necesitas con el mayor detalle posible</p>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-2">
            Descripción de los cambios <span className="text-red-400">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="Ej: Cambiar el color del botón principal a azul, ajustar el tamaño de la tipografía en mobile, corregir el espaciado de las tarjetas en la página de inicio..."
            className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 resize-none"
            required
          />
          <p className="text-xs text-zinc-600 mt-1">
            Sé específico: indica las páginas/secciones afectadas, los colores exactos, el texto correcto, etc.
          </p>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-2">
            Capturas de pantalla (opcional)
          </label>
          <div className="space-y-2">
            {screenshots.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {screenshots.map((f, i) => (
                  <div key={i} className="relative">
                    <img
                      src={URL.createObjectURL(f)}
                      alt={f.name}
                      className="w-16 h-16 rounded-xl object-cover border border-zinc-700"
                    />
                    <button
                      type="button"
                      onClick={() => setScreenshots((prev) => prev.filter((_, idx) => idx !== i))}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-zinc-700 hover:border-zinc-500 text-zinc-500 hover:text-zinc-300 text-sm transition-colors w-full justify-center"
            >
              <ImageIcon className="w-4 h-4" />
              Añadir capturas de pantalla
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files) {
                  setScreenshots((prev) => [...prev, ...Array.from(e.target.files!)]);
                }
              }}
            />
          </div>
        </div>

        {submitError && (
          <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 rounded-xl px-4 py-3">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {submitError}
          </div>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 text-sm transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={submitting || !description.trim()}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
            Enviar solicitud
          </button>
        </div>
      </form>
    </motion.div>
  );
}

function BuyMoreButton() {
  return (
    <Link
      to="/dashboard/mensajes"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium transition-colors"
    >
      <ShoppingCart className="w-4 h-4 text-emerald-400" />
      Comprar más (+250€)
    </Link>
  );
}

function EmptyState() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Iteraciones</h1>
      <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-10 text-center">
        <GitBranch className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
        <p className="text-zinc-400 mb-2">Aún no tienes un proyecto activo.</p>
        <p className="text-sm text-zinc-500">
          Completa el cuestionario para desbloquear el sistema de iteraciones.
        </p>
        <Link
          to="/cuestionario"
          className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors"
        >
          Iniciar cuestionario
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
