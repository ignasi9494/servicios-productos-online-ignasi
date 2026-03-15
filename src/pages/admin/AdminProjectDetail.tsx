import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ChevronLeft, RefreshCw, User, Calendar, FileText, MessageSquare,
  CreditCard, Edit3, Save, X, CheckCircle, Clock, AlertCircle,
  ChevronDown, ChevronRight, ExternalLink, Send, Eye, StickyNote, Sparkles, Bell,
  Package, Upload, Download, Link2, Plus,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useToast } from '../../contexts/ToastContext';
import { sendEmail, notifyPaymentRequest, type EmailTrigger } from '../../lib/emailNotifications';
import { isMockId, getMockProjectDetail } from '../../lib/mockDemoData';
import { usePageTitle } from '../../hooks/usePageTitle';

interface Project {
  id: string;
  name: string;
  status: string;
  plan: string;
  client_id: string;
  total_price: number | null;
  base_price: number | null;
  extras_price: number | null;
  delivery_days: number | null;
  max_iterations: number;
  used_iterations: number;
  created_at: string;
  contract_signed_at: string | null;
  internal_notes: string | null;
  delivery_url: string | null;
  preview_url: string | null;
}

interface Profile {
  id: string;
  full_name: string;
  company: string | null;
  phone: string | null;
  sector: string | null;
  email?: string;
}

interface Proposal {
  id: string;
  version: number;
  content_md: string;
  status: string;
  sent_at: string | null;
}

interface Payment {
  id: string;
  amount: number;
  type: string;
  status: string;
  created_at: string;
}

interface Questionnaire {
  id: string;
  messages_json: unknown;
  extracted_data_json: unknown;
  ai_summary: string | null;
  status: string;
  completed_at: string | null;
}

const STATUS_OPTIONS = [
  { value: 'questionnaire', label: 'Cuestionario' },
  { value: 'pending_proposal', label: 'Sin propuesta' },
  { value: 'proposal_sent', label: 'Propuesta enviada' },
  { value: 'proposal_accepted', label: 'Propuesta aceptada' },
  { value: 'in_development', label: 'En desarrollo' },
  { value: 'in_review', label: 'En revisión' },
  { value: 'completed', label: 'Completado' },
  { value: 'delivered', label: 'Entregado' },
];

const STATUS_STYLES: Record<string, string> = {
  questionnaire: 'text-zinc-400 bg-zinc-800',
  pending_proposal: 'text-amber-400 bg-amber-400/10',
  proposal_sent: 'text-blue-400 bg-blue-400/10',
  proposal_accepted: 'text-emerald-400 bg-emerald-400/10',
  in_development: 'text-purple-400 bg-purple-400/10',
  in_review: 'text-orange-400 bg-orange-400/10',
  completed: 'text-emerald-400 bg-emerald-400/10',
  delivered: 'text-zinc-400 bg-zinc-800',
};

type TabId = 'overview' | 'questionnaire' | 'proposal' | 'payments' | 'delivery';

export function AdminProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast: showToast } = useToast();

  const [project, setProject] = useState<Project | null>(null);
  usePageTitle(project ? `${project.name || 'Proyecto'} | Admin | Think Better` : 'Proyecto | Admin | Think Better');
  const [client, setClient] = useState<Profile | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  // Edit states
  const [editingStatus, setEditingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [savingStatus, setSavingStatus] = useState(false);
  const [editingNotes, setEditingNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  // Proposal editor
  const [editingProposal, setEditingProposal] = useState(false);
  const [proposalContent, setProposalContent] = useState('');
  const [savingProposal, setSavingProposal] = useState(false);
  const [proposalExpanded, setProposalExpanded] = useState<string | null>(null);
  const [generatingProposal, setGeneratingProposal] = useState(false);

  // Email notification state
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailMenuOpen, setEmailMenuOpen] = useState(false);

  // Delivery tab state
  const [deliveryUrl, setDeliveryUrl] = useState<string | null>(null);
  const [uploadingDelivery, setUploadingDelivery] = useState(false);
  const [markingDelivered, setMarkingDelivered] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [savingPreviewUrl, setSavingPreviewUrl] = useState(false);

  // Payment creation state
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [newPaymentAmount, setNewPaymentAmount] = useState('');
  const [newPaymentType, setNewPaymentType] = useState<'full' | 'deposit' | 'final' | 'maintenance'>('full');
  const [creatingPayment, setCreatingPayment] = useState(false);

  useEffect(() => {
    if (id) loadAll(id);
  }, [id]);

  async function loadAll(projectId: string) {
    setLoading(true);
    try {
      // Use mock data when ID is a demo mock ID
      if (isMockId(projectId)) {
        const mock = getMockProjectDetail(projectId);
        if (!mock) { navigate('/admin/proyectos'); return; }
        setProject(mock.project);
        setNewStatus(mock.project.status);
        setNotes(mock.project.internal_notes ?? '');
        setDeliveryUrl((mock.project as Project).delivery_url ?? null);
        setPreviewUrl((mock.project as Project).preview_url ?? '');
        setClient(mock.client);
        setProposals(mock.proposals);
        if (mock.proposals.length > 0) {
          setProposalContent(mock.proposals[0].content_md ?? '');
          setProposalExpanded(mock.proposals[0].id);
        }
        setPayments(mock.payments);
        setQuestionnaire(mock.questionnaire);
        return;
      }

      // Project
      const { data: proj } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();
      if (!proj) { navigate('/admin/proyectos'); return; }
      setProject(proj);
      setNewStatus(proj.status);
      setNotes(proj.internal_notes ?? '');
      setDeliveryUrl(proj.delivery_url ?? null);
      setPreviewUrl(proj.preview_url ?? '');

      // Client profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', proj.client_id)
        .single();
      setClient(profile);

      // Proposals
      const { data: props } = await supabase
        .from('proposals')
        .select('*')
        .eq('project_id', projectId)
        .order('version', { ascending: false });
      setProposals(props ?? []);
      if (props && props.length > 0) {
        setProposalContent(props[0].content_md ?? '');
        setProposalExpanded(props[0].id);
      }

      // Payments
      const { data: pays } = await supabase
        .from('payments')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });
      setPayments(pays ?? []);

      // Questionnaire
      const { data: qs } = await supabase
        .from('questionnaire_conversations')
        .select('*')
        .eq('project_id', projectId)
        .order('started_at', { ascending: false })
        .limit(1);
      setQuestionnaire(qs && qs.length > 0 ? qs[0] : null);
    } finally {
      setLoading(false);
    }
  }

  async function saveStatus() {
    if (!project || newStatus === project.status) { setEditingStatus(false); return; }
    setSavingStatus(true);
    const { error } = await supabase
      .from('projects')
      .update({ status: newStatus })
      .eq('id', project.id);
    if (error) {
      showToast('Error al actualizar el estado', 'error');
    } else {
      setProject((prev) => prev ? { ...prev, status: newStatus } : prev);
      showToast('Estado actualizado correctamente', 'success');
    }
    setSavingStatus(false);
    setEditingStatus(false);
  }

  async function saveNotes() {
    if (!project) return;
    setSavingNotes(true);
    const { error } = await supabase
      .from('projects')
      .update({ internal_notes: notes })
      .eq('id', project.id);
    if (error) {
      showToast('Error al guardar las notas', 'error');
    } else {
      showToast('Notas guardadas', 'success');
      setEditingNotes(false);
    }
    setSavingNotes(false);
  }

  async function saveProposal() {
    if (!project) return;
    setSavingProposal(true);
    try {
      if (proposals.length > 0) {
        const { error } = await supabase
          .from('proposals')
          .update({ content_md: proposalContent })
          .eq('id', proposals[0].id);
        if (error) {
          showToast('Error al guardar la propuesta', 'error');
        } else {
          showToast('Propuesta guardada', 'success');
          setEditingProposal(false);
          setProposals((prev) => prev.map((p, i) => i === 0 ? { ...p, content_md: proposalContent } : p));
        }
      } else {
        // Create new proposal
        const { error } = await supabase
          .from('proposals')
          .insert({
            project_id: project.id,
            version: 1,
            content_md: proposalContent,
            status: 'draft',
          });
        if (error) {
          showToast('Error al crear la propuesta', 'error');
        } else {
          showToast('Propuesta creada', 'success');
          setEditingProposal(false);
          await loadAll(project.id);
        }
      }
    } finally {
      setSavingProposal(false);
    }
  }

  async function sendProposal() {
    if (!project || proposals.length === 0) return;
    const { error } = await supabase
      .from('proposals')
      .update({ status: 'sent', sent_at: new Date().toISOString() })
      .eq('id', proposals[0].id);
    if (error) {
      showToast('Error al enviar la propuesta', 'error');
      return;
    }
    await supabase
      .from('projects')
      .update({ status: 'proposal_sent' })
      .eq('id', project.id);
    // Update local state immediately
    setProject((prev) => prev ? { ...prev, status: 'proposal_sent' } : prev);
    setProposals((prev) => prev.map((p, i) => i === 0 ? { ...p, status: 'sent', sent_at: new Date().toISOString() } : p));
    // Send email notification to client
    if (client) {
      const clientEmail = client.email ?? `${client.id}@placeholder.com`;
      await sendEmail({
        trigger: 'proposal_sent',
        to: clientEmail,
        toName: client.full_name,
        projectId: project.id,
        projectName: project.name,
      });
    }
    showToast('Propuesta enviada al cliente', 'success');
  }

  async function sendNotification(trigger: EmailTrigger) {
    if (!project || !client) return;
    setSendingEmail(true);
    setEmailMenuOpen(false);
    try {
      const clientEmail = client.email ?? `${client.id}@placeholder.com`;

      const result = await sendEmail({
        trigger,
        to: clientEmail,
        toName: client.full_name,
        projectId: project.id,
        projectName: project.name,
      });

      if (result.mock) {
        showToast(`Notificación simulada (sin proveedor de email configurado)`, 'success');
      } else if (result.success) {
        showToast('Notificación enviada correctamente', 'success');
      } else {
        showToast(result.error ?? 'Error al enviar la notificación', 'error');
      }
    } catch {
      showToast('Error al enviar la notificación', 'error');
    } finally {
      setSendingEmail(false);
    }
  }

  async function generateWithAI() {
    if (!project) return;
    setGeneratingProposal(true);
    try {
      // Build context from questionnaire data
      const questionnaireContext = questionnaire
        ? `Resumen IA del cuestionario: ${questionnaire.ai_summary ?? 'No disponible'}\n\nDatos extraídos: ${JSON.stringify(questionnaire.extracted_data_json, null, 2)}`
        : 'No hay cuestionario disponible para este proyecto.';

      const clientContext = client
        ? `Cliente: ${client.full_name}${client.company ? ` - ${client.company}` : ''}${client.sector ? ` (${client.sector})` : ''}`
        : '';

      const projectContext = `
Proyecto: ${project.name || 'Sin nombre'}
Plan: ${project.plan}
Precio total estimado: ${project.total_price ? `${project.total_price.toLocaleString('es-ES')} €` : 'Por definir'}
Plazo estimado: ${project.delivery_days ? `${project.delivery_days} días` : 'Por definir'}
Iteraciones incluidas: ${project.max_iterations}
${clientContext}
      `.trim();

      // Call Edge Function (or mock if not available)
      let generatedContent: string;
      try {
        const { data, error } = await supabase.functions.invoke('generate-proposal', {
          body: {
            projectId: project.id,
            projectContext,
            questionnaireContext,
          },
        });
        if (error) throw error;
        generatedContent = data?.content ?? '';
      } catch {
        // Mock generation when Edge Function is not deployed
        generatedContent = generateProposalMock(project, client, questionnaire);
      }

      setProposalContent(generatedContent);
      setEditingProposal(true);
      showToast('Propuesta generada con IA. Revisa y edita antes de guardar.', 'success');
    } catch {
      showToast('Error al generar la propuesta con IA', 'error');
    } finally {
      setGeneratingProposal(false);
    }
  }

  async function handleDeliveryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!project || !e.target.files?.[0]) return;
    const file = e.target.files[0];
    setUploadingDelivery(true);
    const filePath = `${project.id}/delivery/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from('project-files')
      .upload(filePath, file, { upsert: true });
    if (uploadError) {
      showToast('Error al subir el archivo', 'error');
      setUploadingDelivery(false);
      return;
    }
    const { data: { publicUrl } } = supabase.storage.from('project-files').getPublicUrl(filePath);
    const { error: updateError } = await supabase
      .from('projects')
      .update({ delivery_url: publicUrl })
      .eq('id', project.id);
    if (updateError) {
      showToast('Archivo subido pero no se pudo guardar la URL', 'error');
    } else {
      setDeliveryUrl(publicUrl);
      setProject((prev) => prev ? { ...prev, delivery_url: publicUrl } : prev);
      showToast('Archivo de entrega subido correctamente', 'success');
    }
    setUploadingDelivery(false);
    // Reset file input
    e.target.value = '';
  }

  async function handleMarkDelivered() {
    if (!project) return;
    setMarkingDelivered(true);
    const { error } = await supabase
      .from('projects')
      .update({ status: 'delivered' })
      .eq('id', project.id);
    if (error) {
      showToast('Error al marcar como entregado', 'error');
    } else {
      setProject((prev) => prev ? { ...prev, status: 'delivered' } : prev);
      setNewStatus('delivered');
      showToast('Proyecto marcado como entregado', 'success');
    }
    setMarkingDelivered(false);
  }

  async function handleCreatePayment() {
    if (!project) return;
    const amountEuros = parseFloat(newPaymentAmount.replace(',', '.'));
    if (isNaN(amountEuros) || amountEuros <= 0) {
      showToast('Introduce un importe válido', 'error');
      return;
    }
    // Don't use mock mode for real payment creation
    if (isMockId(project.id)) {
      showToast('No se puede crear pagos en modo demo', 'error');
      return;
    }
    setCreatingPayment(true);
    const { data, error } = await supabase
      .from('payments')
      .insert({
        project_id: project.id,
        amount: Math.round(amountEuros * 100), // store in cents
        currency: 'eur',
        type: newPaymentType,
        status: 'pending',
        stripe_payment_id: null,
      })
      .select()
      .single();
    if (error) {
      showToast('Error al crear la solicitud de pago: ' + error.message, 'error');
    } else {
      setPayments((prev) => [data, ...prev]);
      setShowPaymentForm(false);
      setNewPaymentAmount('');
      setNewPaymentType('full');
      showToast(`Solicitud de pago de ${amountEuros.toLocaleString('es-ES')} € creada. El cliente la verá en su panel.`, 'success');

      // Send email notification to client if we have their email
      if (client?.email) {
        notifyPaymentRequest(
          client.email,
          client.full_name ?? '',
          project.id,
          project.name,
          amountEuros,
        ).catch(() => {
          // Email failure is non-blocking
        });
      }
    }
    setCreatingPayment(false);
  }

  async function handleSavePreviewUrl() {
    if (!project) return;
    setSavingPreviewUrl(true);
    const trimmed = previewUrl.trim();
    const { error } = await supabase
      .from('projects')
      .update({ preview_url: trimmed || null })
      .eq('id', project.id);
    if (error) {
      showToast('Error al guardar la URL de preview', 'error');
    } else {
      setProject((prev) => prev ? { ...prev, preview_url: trimmed || null } : prev);
      showToast('URL de preview guardada. El cliente ya puede ver su aplicación.', 'success');
    }
    setSavingPreviewUrl(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <RefreshCw className="w-8 h-8 text-zinc-600 animate-spin" />
      </div>
    );
  }

  if (!project) return null;

  const statusStyle = STATUS_STYLES[project.status] ?? 'text-zinc-400 bg-zinc-800';
  const statusLabel = STATUS_OPTIONS.find((s) => s.value === project.status)?.label ?? project.status;
  const totalRevenue = payments
    .filter((p) => p.status === 'succeeded')
    .reduce((sum, p) => sum + p.amount, 0);

  const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Vista general', icon: Eye },
    { id: 'questionnaire', label: 'Cuestionario', icon: MessageSquare },
    { id: 'proposal', label: 'Propuesta', icon: FileText },
    { id: 'payments', label: 'Pagos', icon: CreditCard },
    { id: 'delivery', label: 'Entrega', icon: Package },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-start gap-3 sm:gap-4 mb-6">
        <Link
          to="/admin/proyectos"
          className="p-2 rounded-xl text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors mt-0.5"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-white truncate">
            {project.name || 'Proyecto sin nombre'}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            {editingStatus ? (
              <div className="flex items-center gap-2">
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
                <button
                  onClick={saveStatus}
                  disabled={savingStatus}
                  className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                >
                  {savingStatus ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => { setEditingStatus(false); setNewStatus(project.status); }}
                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditingStatus(true)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-opacity hover:opacity-80 ${statusStyle}`}
              >
                {statusLabel}
                <Edit3 className="w-3 h-3" />
              </button>
            )}
            <span className="text-zinc-500 text-sm capitalize">{project.plan}</span>
          </div>
        </div>
        {/* Notification button */}
        <div className="relative">
          <button
            onClick={() => setEmailMenuOpen(!emailMenuOpen)}
            disabled={sendingEmail}
            title="Enviar notificación al cliente"
            className="p-2 rounded-xl text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors disabled:opacity-50"
          >
            {sendingEmail ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Bell className="w-4 h-4" />}
          </button>
          {emailMenuOpen && (
            <div className="absolute right-0 top-10 w-56 rounded-xl bg-zinc-900 border border-zinc-800 shadow-xl z-10 overflow-hidden">
              <p className="px-4 py-2 text-xs text-zinc-500 border-b border-zinc-800">Enviar notificación</p>
              {([
                { trigger: 'questionnaire_submitted' as EmailTrigger, label: 'Cuestionario recibido' },
                { trigger: 'proposal_sent' as EmailTrigger, label: 'Propuesta enviada' },
                { trigger: 'payment_received' as EmailTrigger, label: 'Pago recibido' },
                { trigger: 'iteration_requested' as EmailTrigger, label: 'Iteración solicitada' },
              ]).map((item) => (
                <button
                  key={item.trigger}
                  onClick={() => sendNotification(item.trigger)}
                  className="w-full text-left px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={() => loadAll(project.id)}
          className="p-2 rounded-xl text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-zinc-800 overflow-x-auto scrollbar-none -mx-1 px-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap border-b-2 -mb-px ${
              activeTab === tab.id
                ? 'text-emerald-400 border-emerald-500'
                : 'text-zinc-500 border-transparent hover:text-zinc-300'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Precio total', value: project.total_price ? `${project.total_price.toLocaleString('es-ES')} €` : '—', icon: CreditCard, color: 'text-emerald-400' },
                { label: 'Cobrado', value: totalRevenue > 0 ? `${(totalRevenue / 100).toLocaleString('es-ES')} €` : '0 €', icon: CheckCircle, color: 'text-blue-400' },
                { label: 'Iteraciones', value: `${project.used_iterations}/${project.max_iterations}`, icon: RefreshCw, color: 'text-purple-400' },
                { label: 'Plazo', value: project.delivery_days ? `${project.delivery_days} días` : '—', icon: Clock, color: 'text-amber-400' },
              ].map((stat) => (
                <div key={stat.label} className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                  <div className="flex items-center gap-2 mb-1">
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    <span className="text-xs text-zinc-500">{stat.label}</span>
                  </div>
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Proposal status */}
            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-zinc-400" />
                Estado de la propuesta
              </h3>
              {proposals.length === 0 ? (
                <div className="text-center py-6">
                  <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                  <p className="text-sm text-zinc-400">Aún no hay propuesta para este proyecto</p>
                  <button
                    onClick={() => setActiveTab('proposal')}
                    className="mt-3 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    Crear propuesta
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {proposals.map((p) => (
                    <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50">
                      <div>
                        <p className="text-sm font-medium text-white">Versión {p.version}</p>
                        {p.sent_at && (
                          <p className="text-xs text-zinc-500">
                            Enviada: {new Date(p.sent_at).toLocaleDateString('es-ES')}
                          </p>
                        )}
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        p.status === 'accepted' ? 'text-emerald-400 bg-emerald-400/10' :
                        p.status === 'sent' ? 'text-blue-400 bg-blue-400/10' :
                        'text-zinc-400 bg-zinc-800'
                      }`}>
                        {p.status === 'draft' ? 'Borrador' : p.status === 'sent' ? 'Enviada' : p.status === 'accepted' ? 'Aceptada' : p.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Internal notes */}
            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <StickyNote className="w-4 h-4 text-zinc-400" />
                  Notas internas
                  <span className="text-xs text-zinc-600 font-normal">(no visibles al cliente)</span>
                </h3>
                {!editingNotes ? (
                  <button
                    onClick={() => setEditingNotes(true)}
                    className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Editar
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={saveNotes}
                      disabled={savingNotes}
                      className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                    >
                      {savingNotes ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                      Guardar
                    </button>
                    <button
                      onClick={() => { setEditingNotes(false); setNotes(project.internal_notes ?? ''); }}
                      className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
              {editingNotes ? (
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={5}
                  placeholder="Notas internas sobre el proyecto, el cliente, acuerdos, etc."
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 resize-none"
                />
              ) : (
                <p className="text-sm text-zinc-400 whitespace-pre-wrap">
                  {notes || <span className="italic text-zinc-600">Sin notas. Haz clic en editar para añadir.</span>}
                </p>
              )}
            </div>
          </div>

          {/* Right column: Client info */}
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
                <User className="w-4 h-4 text-zinc-400" />
                Información del cliente
              </h3>
              {client ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm shrink-0">
                      {client.full_name?.charAt(0)?.toUpperCase() ?? '?'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{client.full_name}</p>
                      {client.company && <p className="text-xs text-zinc-500">{client.company}</p>}
                    </div>
                  </div>
                  {client.phone && (
                    <div className="text-xs text-zinc-400">
                      <span className="text-zinc-600">Tel: </span>
                      {client.phone}
                    </div>
                  )}
                  {client.sector && (
                    <div className="text-xs text-zinc-400">
                      <span className="text-zinc-600">Sector: </span>
                      {client.sector}
                    </div>
                  )}
                  <Link
                    to="/admin/clientes"
                    className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors mt-2"
                  >
                    Ver perfil completo
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              ) : (
                <p className="text-sm text-zinc-500 italic">Cliente no encontrado</p>
              )}
            </div>

            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-zinc-400" />
                Fechas clave
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Creado</span>
                  <span className="text-zinc-300">{new Date(project.created_at).toLocaleDateString('es-ES')}</span>
                </div>
                {project.contract_signed_at && (
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Contrato firmado</span>
                    <span className="text-zinc-300">{new Date(project.contract_signed_at).toLocaleDateString('es-ES')}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick actions */}
            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <h3 className="text-sm font-semibold text-white mb-4">Acciones rápidas</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('proposal')}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                >
                  <FileText className="w-4 h-4 text-emerald-400" />
                  {proposals.length === 0 ? 'Crear propuesta' : 'Editar propuesta'}
                </button>
                <button
                  onClick={() => setActiveTab('questionnaire')}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-blue-400" />
                  Ver cuestionario
                </button>
                <button
                  onClick={() => setActiveTab('payments')}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                >
                  <CreditCard className="w-4 h-4 text-purple-400" />
                  Ver pagos
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Questionnaire */}
      {activeTab === 'questionnaire' && (
        <div className="space-y-6">
          {!questionnaire ? (
            <div className="py-16 text-center">
              <MessageSquare className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
              <p className="text-zinc-400">No hay datos del cuestionario para este proyecto</p>
            </div>
          ) : (
            <>
              {/* Summary */}
              {questionnaire.ai_summary && (
                <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                  <h3 className="text-sm font-semibold text-emerald-400 mb-2">Resumen IA</h3>
                  <p className="text-sm text-zinc-300">{questionnaire.ai_summary}</p>
                </div>
              )}

              {/* Extracted data */}
              {questionnaire.extracted_data_json && (
                <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800">
                  <h3 className="text-sm font-semibold text-white mb-4">Datos extraídos</h3>
                  <ExtractedDataViewer data={questionnaire.extracted_data_json} />
                </div>
              )}

              {/* Raw conversation */}
              {questionnaire.messages_json && (
                <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800">
                  <button
                    onClick={() => setProposalExpanded(proposalExpanded === 'conv' ? null : 'conv')}
                    className="w-full flex items-center justify-between text-sm font-semibold text-white"
                  >
                    <span>Conversación completa</span>
                    <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${proposalExpanded === 'conv' ? 'rotate-180' : ''}`} />
                  </button>
                  {proposalExpanded === 'conv' && (
                    <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
                      {(Array.isArray(questionnaire.messages_json) ? questionnaire.messages_json : []).map((msg: { role?: string; content?: string }, idx: number) => (
                        <div
                          key={idx}
                          className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          {msg.role !== 'user' && (
                            <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-400 shrink-0">
                              TB
                            </div>
                          )}
                          <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                            msg.role === 'user'
                              ? 'bg-zinc-700 text-zinc-200'
                              : 'bg-zinc-800 text-zinc-300'
                          }`}>
                            {msg.content ?? '—'}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Tab: Proposal */}
      {activeTab === 'proposal' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Propuesta</h2>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={generateWithAI}
                disabled={generatingProposal || editingProposal}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-sm text-purple-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {generatingProposal ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                {generatingProposal ? 'Generando...' : 'Generar con IA'}
              </button>
              {!editingProposal ? (
                <button
                  onClick={() => setEditingProposal(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-sm text-white transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Editar
                </button>
              ) : (
                <>
                  <button
                    onClick={() => { setEditingProposal(false); setProposalContent(proposals[0]?.content_md ?? ''); }}
                    className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-sm text-zinc-400 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={saveProposal}
                    disabled={savingProposal}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-sm text-white transition-colors disabled:opacity-50"
                  >
                    {savingProposal ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Guardar
                  </button>
                </>
              )}
              {proposals.length > 0 && proposals[0].status === 'draft' && !editingProposal && (
                <button
                  onClick={sendProposal}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm text-white transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Enviar al cliente
                </button>
              )}
            </div>
          </div>

          {editingProposal ? (
            <div className="rounded-xl bg-zinc-900/50 border border-zinc-800 overflow-hidden">
              <div className="px-4 py-2 bg-zinc-800/50 border-b border-zinc-800 text-xs text-zinc-500">
                Editor de propuesta (Markdown)
              </div>
              <textarea
                value={proposalContent}
                onChange={(e) => setProposalContent(e.target.value)}
                rows={24}
                placeholder={`# Propuesta para ${project.name || 'el proyecto'}\n\n## Resumen ejecutivo\n...\n\n## Stack tecnológico\n...\n\n## Funcionalidades\n...\n\n## Desglose de precios\n...\n\n## Timeline\n...\n\n## Condiciones\n...`}
                className="w-full bg-zinc-900 px-5 py-4 text-sm text-zinc-300 font-mono focus:outline-none resize-none"
              />
            </div>
          ) : proposals.length === 0 ? (
            <div className="py-16 text-center rounded-xl bg-zinc-900/50 border border-zinc-800">
              <FileText className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
              <p className="text-zinc-400 mb-4">No hay propuesta aún para este proyecto</p>
              <button
                onClick={() => setEditingProposal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-sm text-white transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                Crear propuesta
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {proposals.map((p) => (
                <div key={p.id} className="rounded-xl bg-zinc-900/50 border border-zinc-800 overflow-hidden">
                  <button
                    onClick={() => setProposalExpanded(proposalExpanded === p.id ? null : p.id)}
                    className="w-full flex items-center justify-between px-5 py-4 hover:bg-zinc-800/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-zinc-400" />
                      <span className="text-sm font-medium text-white">Versión {p.version}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        p.status === 'accepted' ? 'text-emerald-400 bg-emerald-400/10' :
                        p.status === 'sent' ? 'text-blue-400 bg-blue-400/10' :
                        'text-zinc-400 bg-zinc-800'
                      }`}>
                        {p.status === 'draft' ? 'Borrador' : p.status === 'sent' ? 'Enviada' : 'Aceptada'}
                      </span>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-zinc-500 transition-transform ${proposalExpanded === p.id ? 'rotate-90' : ''}`} />
                  </button>
                  {proposalExpanded === p.id && (
                    <div className="px-5 pb-5 border-t border-zinc-800">
                      <div className="mt-4 text-sm text-zinc-300 whitespace-pre-wrap font-mono bg-zinc-800/50 rounded-lg p-4 max-h-96 overflow-y-auto">
                        {p.content_md || <span className="italic text-zinc-600">Propuesta vacía</span>}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Delivery */}
      {activeTab === 'delivery' && (
        <div className="max-w-2xl space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Entrega del proyecto</h2>
            {project.status !== 'delivered' && (
              <button
                onClick={handleMarkDelivered}
                disabled={markingDelivered}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-sm text-white font-medium transition-colors"
              >
                {markingDelivered ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                Marcar como entregado
              </button>
            )}
            {project.status === 'delivered' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-emerald-400 bg-emerald-400/10">
                <CheckCircle className="w-3.5 h-3.5" />
                Entregado
              </span>
            )}
          </div>

          {/* Upload ZIP */}
          <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800">
            <h3 className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
              <Upload className="w-4 h-4 text-emerald-400" />
              Subir archivo de entrega (ZIP)
            </h3>
            <p className="text-xs text-zinc-500 mb-5">
              Sube el ZIP con el código fuente del proyecto. El cliente verá el botón de descarga en su dashboard.
            </p>

            {deliveryUrl && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 mb-5">
                <Download className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-emerald-300 font-medium mb-0.5">Archivo actual</p>
                  <p className="text-xs text-zinc-400 truncate">{deliveryUrl}</p>
                </div>
                <a
                  href={deliveryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors shrink-0"
                >
                  <Link2 className="w-3.5 h-3.5" />
                  Abrir
                </a>
              </div>
            )}

            <label className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed cursor-pointer transition-colors ${
              uploadingDelivery
                ? 'border-zinc-700 opacity-50 cursor-not-allowed'
                : 'border-zinc-700 hover:border-emerald-500/50 hover:bg-emerald-500/5'
            }`}>
              <input
                type="file"
                accept=".zip,application/zip,application/x-zip-compressed"
                onChange={handleDeliveryUpload}
                disabled={uploadingDelivery}
                className="hidden"
              />
              {uploadingDelivery ? (
                <RefreshCw className="w-5 h-5 text-zinc-400 animate-spin shrink-0" />
              ) : (
                <Upload className="w-5 h-5 text-zinc-400 shrink-0" />
              )}
              <span className="text-sm text-zinc-400">
                {uploadingDelivery
                  ? 'Subiendo...'
                  : deliveryUrl
                  ? 'Reemplazar archivo ZIP'
                  : 'Seleccionar archivo ZIP'}
              </span>
            </label>
          </div>

          {/* Preview URL */}
          <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800">
            <h3 className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
              <Eye className="w-4 h-4 text-cyan-400" />
              URL de vista previa
            </h3>
            <p className="text-xs text-zinc-500 mb-4">
              Introduce la URL de staging o preview donde el cliente puede ver su aplicación en desarrollo.
              Se mostrará en el iframe de la sección "Vista previa" del dashboard del cliente.
            </p>
            <div className="flex gap-2">
              <input
                type="url"
                value={previewUrl}
                onChange={(e) => setPreviewUrl(e.target.value)}
                placeholder="https://mi-proyecto.vercel.app"
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <button
                onClick={handleSavePreviewUrl}
                disabled={savingPreviewUrl}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-sm text-white font-medium transition-colors shrink-0"
              >
                {savingPreviewUrl ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Guardar
              </button>
            </div>
            {project.preview_url && (
              <div className="mt-3 flex items-center gap-2 text-xs text-cyan-400">
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Preview activa: </span>
                <a
                  href={project.preview_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate hover:text-cyan-300 underline underline-offset-2"
                >
                  {project.preview_url}
                </a>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800 text-xs text-zinc-500 space-y-1.5">
            <p className="font-medium text-zinc-400">Flujo de entrega:</p>
            <p>1. Añade la URL de preview para que el cliente pueda seguir el desarrollo en tiempo real.</p>
            <p>2. Sube el ZIP con el código exportado cuando el proyecto esté terminado.</p>
            <p>3. Haz clic en "Marcar como entregado" para activar la sección de descarga del cliente.</p>
          </div>
        </div>
      )}

      {/* Tab: Payments */}
      {activeTab === 'payments' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Historial de pagos</h2>
            <button
              onClick={() => setShowPaymentForm(!showPaymentForm)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-sm text-white font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Crear solicitud de pago
            </button>
          </div>

          {/* Create payment form */}
          {showPaymentForm && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-xl bg-zinc-900/50 border border-emerald-500/30 space-y-4"
            >
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                Nueva solicitud de pago
              </h3>
              <p className="text-xs text-zinc-500">
                Crea un pago pendiente para este proyecto. El cliente lo verá en su panel y podrá pagar directamente desde allí vía Stripe.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5 font-medium">Importe (€)</label>
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    placeholder={project?.total_price ? String(project.total_price) : 'Ej: 2000'}
                    value={newPaymentAmount}
                    onChange={(e) => setNewPaymentAmount(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5 font-medium">Tipo de pago</label>
                  <select
                    value={newPaymentType}
                    onChange={(e) => setNewPaymentType(e.target.value as 'full' | 'deposit' | 'final' | 'maintenance')}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                  >
                    <option value="full">Pago total del proyecto</option>
                    <option value="deposit">Pago de entrada</option>
                    <option value="final">Pago final</option>
                    <option value="maintenance">Suscripción mensual</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCreatePayment}
                  disabled={creatingPayment || !newPaymentAmount}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-sm text-white font-medium transition-colors"
                >
                  {creatingPayment ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                  {creatingPayment ? 'Creando...' : 'Crear solicitud'}
                </button>
                <button
                  onClick={() => { setShowPaymentForm(false); setNewPaymentAmount(''); setNewPaymentType('full'); }}
                  className="px-4 py-2.5 rounded-xl text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          )}

          {payments.length === 0 ? (
            <div className="py-16 text-center rounded-xl bg-zinc-900/50 border border-zinc-800">
              <CreditCard className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
              <p className="text-zinc-400 mb-2">No hay pagos registrados para este proyecto</p>
              <p className="text-sm text-zinc-600">Crea una solicitud de pago para que el cliente pueda pagar desde su dashboard.</p>
            </div>
          ) : (
            <div className="rounded-xl bg-zinc-900/50 border border-zinc-800 overflow-hidden divide-y divide-zinc-800/50">
              {payments.map((pay) => (
                <motion.div
                  key={pay.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-between px-5 py-4"
                >
                  <div>
                    <p className="text-sm font-medium text-white capitalize">
                      {pay.type === 'full' ? 'Pago total' : pay.type === 'deposit' ? 'Pago de entrada' : pay.type === 'final' ? 'Pago final' : 'Suscripción mensual'}
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {new Date(pay.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-white">
                      {(pay.amount / 100).toLocaleString('es-ES')} €
                    </span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      pay.status === 'succeeded' ? 'text-emerald-400 bg-emerald-400/10' :
                      pay.status === 'pending' ? 'text-amber-400 bg-amber-400/10' :
                      'text-red-400 bg-red-400/10'
                    }`}>
                      {pay.status === 'succeeded' ? 'Cobrado' : pay.status === 'pending' ? 'Pendiente' : 'Fallido'}
                    </span>
                  </div>
                </motion.div>
              ))}
              <div className="px-5 py-3 bg-zinc-800/30 flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-medium">Total cobrado</span>
                <span className="text-sm font-bold text-emerald-400">
                  {(totalRevenue / 100).toLocaleString('es-ES')} €
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function generateProposalMock(
  project: { name: string; plan: string; total_price: number | null; delivery_days: number | null; max_iterations: number },
  client: { full_name: string; company: string | null; sector: string | null } | null,
  questionnaire: { ai_summary: string | null; extracted_data_json: unknown } | null,
): string {
  const price = project.total_price ? `${project.total_price.toLocaleString('es-ES')} €` : 'A determinar';
  const days = project.delivery_days ? `${project.delivery_days} días laborables` : 'A determinar';
  const clientName = client?.full_name ?? 'el cliente';
  const company = client?.company ? ` (${client.company})` : '';
  const sector = client?.sector ? `Sector: ${client.sector}` : '';
  const summary = questionnaire?.ai_summary ?? 'No hay resumen disponible del cuestionario.';

  const extracted = questionnaire?.extracted_data_json as Record<string, string> | null;
  const features = extracted?.features ?? extracted?.funcionalidades ?? 'Por definir según el cuestionario';
  const techStack = extracted?.tech_stack ?? extracted?.tecnologias ?? 'React, TypeScript, Supabase, Vercel';

  return `# Propuesta para ${project.name || 'el Proyecto'}

**Preparada para:** ${clientName}${company}
${sector}
**Plan seleccionado:** ${project.plan.charAt(0).toUpperCase() + project.plan.slice(1)}
**Fecha:** ${new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}

---

## 1. Resumen ejecutivo

Gracias por confiar en Think Better para este proyecto. Tras analizar en detalle tu cuestionario, hemos preparado esta propuesta personalizada.

${summary}

Nuestro equipo de 3 ingenieros senior potenciados por IA construirá tu producto con las mejores prácticas del sector, garantizando velocidad, calidad y escalabilidad desde el primer día.

---

## 2. Funcionalidades incluidas

${features}

---

## 3. Stack tecnológico

${techStack}

**Infraestructura:**
- Hosting: Vercel (frontend) + Supabase (backend)
- CI/CD: GitHub Actions
- Monitorización: Sentry + PostHog

---

## 4. Metodología y proceso

1. **Sprint 1** — Arquitectura, diseño y setup del proyecto
2. **Sprint 2-3** — Desarrollo de funcionalidades core
3. **Sprint 4** — Integraciones, testing y QA
4. **Entrega** — Deploy a producción + documentación

---

## 5. Desglose económico

| Concepto | Importe |
|----------|---------|
| Desarrollo (plan ${project.plan}) | ${price} |
| **Total** | **${price}** |

**Forma de pago:**
- Pago único al aceptar la propuesta

---

## 6. Plazos

**Plazo estimado de entrega:** ${days}

Incluye ${project.max_iterations} iteración${project.max_iterations !== 1 ? 'es' : ''} de revisión sin coste adicional.

---

## 7. Condiciones

- El código fuente es 100% propiedad del cliente desde el primer día.
- Los bugs posteriores a la entrega tienen cobertura de 30 días sin coste.
- Las revisiones adicionales se cobran a 250 €/iteración.
- El proyecto incluye despliegue a producción y documentación básica.

---

*Think Better · Estudio de desarrollo acelerado por IA · Barcelona*
*www.thinkbetter.dev*
`;
}

function ExtractedDataViewer({ data }: { data: unknown }) {
  if (!data || typeof data !== 'object') return <p className="text-sm text-zinc-500 italic">Sin datos</p>;

  const entries = Object.entries(data as Record<string, unknown>).filter(([, v]) => v !== null && v !== undefined && v !== '');

  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {entries.map(([key, value]) => (
        <div key={key} className="p-3 rounded-lg bg-zinc-800/50">
          <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{key}</p>
          <p className="text-sm text-zinc-300">
            {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
          </p>
        </div>
      ))}
    </div>
  );
}
