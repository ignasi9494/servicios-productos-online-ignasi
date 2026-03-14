import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText, Loader2, Check, ChevronRight, MessageSquare,
  Clock, CheckCircle2, XCircle, AlertTriangle,
} from 'lucide-react';
import { supabase, supabaseConfigured } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { createCheckoutSession } from '../../lib/stripe';
import { usePageTitle } from '../../hooks/usePageTitle';
import { isMockDemo, MOCK_CLIENT_PROPOSAL, MOCK_CLIENT_PROJECT } from '../../lib/mockDemoData';

interface Proposal {
  id: string;
  project_id: string;
  version: number;
  content_md: string;
  stack_description: string | null;
  price_breakdown_json: Record<string, unknown> | null;
  timeline_description: string | null;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  sent_at: string | null;
  responded_at: string | null;
  created_at: string;
}

interface Project {
  id: string;
  name: string;
  plan: string | null;
  total_price: number | null;
  base_price: number | null;
}

type ViewState = 'list' | 'detail' | 'accept';

export function Propuestas() {
  usePageTitle('Propuestas | Think Better');
  const { user } = useAuth();
  const navigate = useNavigate();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [viewState, setViewState] = useState<ViewState>('list');
  const [acceptChecked, setAcceptChecked] = useState(false);
  const [accepting, setAccepting] = useState(false);

  useEffect(() => {
    if (!user || !supabaseConfigured) {
      setLoading(false);
      return;
    }

    async function load() {
      const { data: projects } = await supabase
        .from('projects')
        .select('id, name, plan, total_price, base_price')
        .eq('client_id', user!.id)
        .order('created_at', { ascending: false })
        .limit(1);

      if (projects && projects.length > 0) {
        const proj = projects[0] as unknown as Project;
        setProject(proj);

        const { data: props } = await supabase
          .from('proposals')
          .select('*')
          .eq('project_id', proj.id)
          .in('status', ['sent', 'accepted', 'rejected'])
          .order('version', { ascending: false });

        if (props) {
          setProposals(props as unknown as Proposal[]);
          const latest = (props as unknown as Proposal[]).find((p) => p.status === 'sent');
          if (latest) {
            setSelectedProposal(latest);
            setViewState('detail');
          }
        }
      }

      setLoading(false);
    }

    load();
  }, [user]);

  const handleAcceptProposal = useCallback(async () => {
    if (!selectedProposal || !project || accepting) return;
    setAccepting(true);

    await supabase
      .from('proposals')
      .update({ status: 'accepted', responded_at: new Date().toISOString() })
      .eq('id', selectedProposal.id);

    await supabase
      .from('projects')
      .update({ status: 'proposal_accepted', contract_signed_at: new Date().toISOString() })
      .eq('id', project.id);

    const depositAmount = (project.total_price ?? 0) * 0.4;
    if (depositAmount > 0) {
      const result = await createCheckoutSession({
        projectId: project.id,
        paymentType: 'deposit',
        amount: depositAmount,
        projectName: project.name,
      });

      if (result.url) {
        window.location.href = result.url;
        return;
      }
    }

    setAccepting(false);
    navigate('/dashboard');
  }, [selectedProposal, project, accepting, navigate]);

  const handleRequestChanges = useCallback(() => {
    navigate('/dashboard/mensajes');
  }, [navigate]);

  if (loading && !isMockDemo()) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-zinc-500 animate-spin" />
      </div>
    );
  }

  const displayProposals = isMockDemo() ? [MOCK_CLIENT_PROPOSAL as unknown as Proposal] : proposals;
  const displayProject = isMockDemo()
    ? { id: MOCK_CLIENT_PROJECT.id, name: MOCK_CLIENT_PROJECT.name, plan: MOCK_CLIENT_PROJECT.plan, total_price: MOCK_CLIENT_PROJECT.total_price, base_price: MOCK_CLIENT_PROJECT.base_price }
    : project;

  if (!supabaseConfigured && !isMockDemo() || displayProposals.length === 0) {
    return <EmptyProposals />;
  }

  // Swap live state for mock when in demo mode
  const activeProposals = isMockDemo() ? displayProposals : proposals;
  const activeProject = isMockDemo() ? displayProject : project;
  const activeSelected = isMockDemo() ? displayProposals[0] : selectedProposal;
  const activeView: ViewState = isMockDemo() ? 'detail' : viewState;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-2xl font-bold text-white mb-6">Propuestas</h1>

      {activeProposals.length > 1 && activeView !== 'accept' && (
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {activeProposals.map((p) => (
            <button
              key={p.id}
              onClick={() => { setSelectedProposal(p); setViewState('detail'); }}
              className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeSelected?.id === p.id
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <ProposalStatusIcon status={p.status} />
              Version {p.version}
            </button>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {activeView === 'detail' && activeSelected && (
          <ProposalDetail
            key="detail"
            proposal={activeSelected}
            onAccept={() => setViewState('accept')}
            onRequestChanges={handleRequestChanges}
          />
        )}

        {activeView === 'accept' && activeSelected && activeProject && (
          <AcceptanceFlow
            key="accept"
            proposal={activeSelected}
            project={activeProject}
            checked={acceptChecked}
            onToggleCheck={() => setAcceptChecked(!acceptChecked)}
            onConfirm={handleAcceptProposal}
            onBack={() => { setViewState('detail'); setAcceptChecked(false); }}
            loading={accepting}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ProposalStatusIcon({ status }: { status: string }) {
  switch (status) {
    case 'sent':
      return <Clock className="w-3.5 h-3.5 text-amber-400" />;
    case 'accepted':
      return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />;
    case 'rejected':
      return <XCircle className="w-3.5 h-3.5 text-red-400" />;
    default:
      return <FileText className="w-3.5 h-3.5 text-zinc-500" />;
  }
}

function ProposalDetail({
  proposal,
  onAccept,
  onRequestChanges,
}: {
  proposal: Proposal;
  onAccept: () => void;
  onRequestChanges: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="space-y-6"
    >
      {proposal.status === 'sent' && (
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-white">Propuesta pendiente de revision</p>
            <p className="text-sm text-zinc-400 mt-0.5">
              Revisa los detalles y acepta la propuesta para continuar con tu proyecto.
            </p>
          </div>
        </div>
      )}

      {proposal.status === 'accepted' && (
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-sm font-medium text-emerald-400">
            Propuesta aceptada{proposal.responded_at ? ` el ${formatDate(proposal.responded_at)}` : ''}
          </p>
        </div>
      )}

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-white">Propuesta v{proposal.version}</h2>
            {proposal.sent_at && (
              <p className="text-xs text-zinc-500 mt-0.5">Enviada el {formatDate(proposal.sent_at)}</p>
            )}
          </div>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
            proposal.status === 'sent' ? 'bg-amber-500/10 text-amber-400' :
            proposal.status === 'accepted' ? 'bg-emerald-500/10 text-emerald-400' :
            'bg-red-500/10 text-red-400'
          }`}>
            {proposal.status === 'sent' ? 'Pendiente' : proposal.status === 'accepted' ? 'Aceptada' : 'Rechazada'}
          </span>
        </div>

        <div className="px-6 py-6">
          <MarkdownRenderer content={proposal.content_md} />
        </div>

        {proposal.price_breakdown_json && (
          <div className="px-6 py-4 border-t border-zinc-800">
            <h3 className="text-sm font-medium text-zinc-300 mb-3">Desglose de precios</h3>
            <PriceBreakdown data={proposal.price_breakdown_json} />
          </div>
        )}

        {proposal.timeline_description && (
          <div className="px-6 py-4 border-t border-zinc-800">
            <h3 className="text-sm font-medium text-zinc-300 mb-2">Timeline</h3>
            <p className="text-sm text-zinc-400">{proposal.timeline_description}</p>
          </div>
        )}

        {proposal.stack_description && (
          <div className="px-6 py-4 border-t border-zinc-800">
            <h3 className="text-sm font-medium text-zinc-300 mb-2">Stack tecnologico</h3>
            <p className="text-sm text-zinc-400">{proposal.stack_description}</p>
          </div>
        )}
      </div>

      {proposal.status === 'sent' && (
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onAccept}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors"
          >
            <Check className="w-4 h-4" />
            Aceptar propuesta
          </button>
          <button
            onClick={onRequestChanges}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-white text-sm transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            Solicitar cambios
          </button>
        </div>
      )}
    </motion.div>
  );
}

function AcceptanceFlow({
  proposal,
  project,
  checked,
  onToggleCheck,
  onConfirm,
  onBack,
  loading,
}: {
  proposal: Proposal;
  project: Project;
  checked: boolean;
  onToggleCheck: () => void;
  onConfirm: () => void;
  onBack: () => void;
  loading: boolean;
}) {
  const depositAmount = (project.total_price ?? 0) * 0.4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="space-y-6"
    >
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Resumen del contrato</h2>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Proyecto</span>
            <span className="text-white font-medium">{project.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Plan</span>
            <span className="text-white font-medium capitalize">{project.plan ?? '-'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Propuesta</span>
            <span className="text-white font-medium">Version {proposal.version}</span>
          </div>
          <div className="h-px bg-zinc-800" />
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Precio total</span>
            <span className="text-white font-semibold">{formatPrice(project.total_price ?? 0)}€</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Pago de entrada (40%)</span>
            <span className="text-emerald-400 font-semibold">{formatPrice(depositAmount)}€</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Pago final (60%)</span>
            <span className="text-zinc-300">{formatPrice((project.total_price ?? 0) - depositAmount)}€</span>
          </div>
        </div>

        <label className="flex items-start gap-3 cursor-pointer group">
          <div
            className={`w-5 h-5 rounded border shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
              checked
                ? 'bg-emerald-600 border-emerald-500'
                : 'border-zinc-600 group-hover:border-zinc-500'
            }`}
            onClick={onToggleCheck}
          >
            {checked && <Check className="w-3 h-3 text-white" />}
          </div>
          <span className="text-sm text-zinc-400 leading-relaxed" onClick={onToggleCheck}>
            He leido y acepto los terminos de la propuesta v{proposal.version}. Entiendo que al firmar se
            procesara un pago de entrada de <strong className="text-white">{formatPrice(depositAmount)}€</strong> y
            el equipo comenzara el desarrollo.
          </span>
        </label>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onConfirm}
          disabled={!checked || loading}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-sm transition-colors ${
            checked && !loading
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
              : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
          }`}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
          {loading ? 'Procesando...' : 'Firmar y proceder al pago'}
        </button>
        <button
          onClick={onBack}
          disabled={loading}
          className="flex-1 py-3.5 px-6 rounded-xl border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-white text-sm transition-colors"
        >
          Volver a la propuesta
        </button>
      </div>
    </motion.div>
  );
}

function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('# ')) {
      elements.push(<h1 key={i} className="text-xl font-bold text-white mt-6 mb-3">{line.slice(2)}</h1>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="text-lg font-semibold text-white mt-5 mb-2">{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="text-base font-medium text-zinc-200 mt-4 mb-2">{line.slice(4)}</h3>);
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      elements.push(
        <li key={i} className="text-sm text-zinc-400 ml-4 list-disc">{renderInline(line.slice(2))}</li>,
      );
    } else if (line.startsWith('---')) {
      elements.push(<hr key={i} className="border-zinc-800 my-4" />);
    } else if (line.trim() === '') {
      elements.push(<div key={i} className="h-2" />);
    } else {
      elements.push(<p key={i} className="text-sm text-zinc-400 leading-relaxed">{renderInline(line)}</p>);
    }
  }

  return <>{elements}</>;
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="text-white font-medium">{part}</strong> : part,
  );
}

function PriceBreakdown({ data }: { data: Record<string, unknown> }) {
  const items = Array.isArray(data.items)
    ? (data.items as { name: string; price: number }[])
    : Object.entries(data).map(([name, price]) => ({ name, price: Number(price) || 0 }));

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex justify-between text-sm">
          <span className="text-zinc-400">{item.name}</span>
          <span className="text-zinc-200">{formatPrice(item.price)}€</span>
        </div>
      ))}
      <div className="h-px bg-zinc-700 my-2" />
      <div className="flex justify-between text-sm font-semibold">
        <span className="text-zinc-200">Total</span>
        <span className="text-emerald-400">{formatPrice(total)}€</span>
      </div>
    </div>
  );
}

function EmptyProposals() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Propuestas</h1>
      <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-8 text-center">
        <FileText className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
        <p className="text-zinc-400 mb-2">Aún no tienes propuestas.</p>
        <p className="text-sm text-zinc-500 mb-6">
          Completa el cuestionario y recibirás una propuesta detallada en menos de 24 horas.
        </p>
        <Link
          to="/cuestionario"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors"
        >
          Iniciar cuestionario
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatPrice(n: number): string {
  return n.toLocaleString('es-ES');
}
