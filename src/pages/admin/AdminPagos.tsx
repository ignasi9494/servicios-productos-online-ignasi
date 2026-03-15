import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import {
  CreditCard, TrendingUp, Clock, CheckCircle2,
  Search, Filter, Download, ExternalLink, RefreshCw,
  ChevronUp, ChevronDown, Euro,
} from 'lucide-react';
import { supabase, supabaseConfigured } from '../../lib/supabase';
import { usePageTitle } from '../../hooks/usePageTitle';
import { isMockDemo } from '../../lib/mockDemoData';

interface Payment {
  id: string;
  project_id: string;
  project_name: string;
  client_name: string;
  concept: string;
  amount: number; // cents
  status: 'pending' | 'succeeded' | 'failed' | 'refunded';
  stripe_payment_intent_id: string | null;
  created_at: string;
}

type SortField = 'created_at' | 'amount' | 'status' | 'client_name';
type SortDir = 'asc' | 'desc';

// ─── Mock data ────────────────────────────────────────────────────────────────
const now = new Date();
const daysAgo = (n: number) => new Date(now.getTime() - n * 86400000).toISOString();

const MOCK_PAYMENTS: Payment[] = [
  { id: 'pay-001', project_id: 'mock-proj-1', project_name: 'Web corporativa + CRM interno', client_name: 'María García', concept: 'Pago único', amount: 350000, status: 'succeeded', stripe_payment_intent_id: 'pi_mock_001', created_at: daysAgo(38) },
  { id: 'pay-002', project_id: 'mock-proj-2', project_name: 'Plataforma SaaS de gestión de reservas', client_name: 'Carlos Martínez', concept: 'Pago único', amount: 700000, status: 'succeeded', stripe_payment_intent_id: 'pi_mock_002', created_at: daysAgo(33) },
  { id: 'pay-003', project_id: 'mock-proj-3', project_name: 'Tienda online ropa y complementos', client_name: 'Laura Sánchez', concept: 'Pago único', amount: 350000, status: 'pending', stripe_payment_intent_id: null, created_at: daysAgo(5) },
  { id: 'pay-004', project_id: 'mock-proj-5', project_name: 'Landing + App pedidos restaurante', client_name: 'Ana Torres', concept: 'Pago único', amount: 200000, status: 'succeeded', stripe_payment_intent_id: 'pi_mock_004', created_at: daysAgo(10) },
  { id: 'pay-005', project_id: 'mock-proj-7', project_name: 'Dashboard BI para retail', client_name: 'Elena Morales', concept: 'Pago único', amount: 700000, status: 'succeeded', stripe_payment_intent_id: 'pi_mock_005', created_at: daysAgo(60) },
  { id: 'pay-006', project_id: 'mock-proj-7', project_name: 'Dashboard BI para retail', client_name: 'Elena Morales', concept: 'Mantenimiento mensual', amount: 19900, status: 'succeeded', stripe_payment_intent_id: 'pi_mock_006', created_at: daysAgo(30) },
  { id: 'pay-007', project_id: 'mock-proj-7', project_name: 'Dashboard BI para retail', client_name: 'Elena Morales', concept: 'Mantenimiento mensual', amount: 19900, status: 'succeeded', stripe_payment_intent_id: 'pi_mock_007', created_at: daysAgo(1) },
  { id: 'pay-008', project_id: 'mock-proj-8', project_name: 'App de gestión de inventario', client_name: 'Pedro Ruiz', concept: 'Pago único', amount: 350000, status: 'failed', stripe_payment_intent_id: 'pi_mock_008', created_at: daysAgo(7) },
  { id: 'pay-009', project_id: 'mock-proj-8', project_name: 'App de gestión de inventario', client_name: 'Pedro Ruiz', concept: 'Pago único', amount: 350000, status: 'succeeded', stripe_payment_intent_id: 'pi_mock_009', created_at: daysAgo(6) },
];

function formatCents(cents: number) {
  return (cents / 100).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const STATUS_LABELS: Record<Payment['status'], string> = {
  succeeded: 'Cobrado',
  pending: 'Pendiente',
  failed: 'Fallido',
  refunded: 'Reembolsado',
};

const STATUS_COLORS: Record<Payment['status'], string> = {
  succeeded: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  pending: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  failed: 'bg-red-500/15 text-red-400 border-red-500/20',
  refunded: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/20',
};

export function AdminPagos() {
  usePageTitle('Pagos | Admin Think Better');
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<Payment['status'] | 'all'>('all');
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const load = useCallback(async () => {
    setLoading(true);
    if (!supabaseConfigured || isMockDemo()) {
      setPayments(MOCK_PAYMENTS);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('payments')
      .select(`
        id, project_id, type, amount, status, stripe_payment_id, created_at,
        projects(id, name, client_id)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[AdminPagos] load error:', error);
      setLoading(false);
      return;
    }

    if (data && data.length > 0) {
      // Fetch profiles for all client_ids in one query
      const clientIds = [...new Set(
        data
          .map((p: Record<string, unknown>) => (p.projects as Record<string, unknown>)?.client_id as string)
          .filter(Boolean),
      )];
      const { data: profilesData } = clientIds.length > 0
        ? await supabase.from('profiles').select('user_id, full_name').in('user_id', clientIds)
        : { data: [] as { user_id: string; full_name: string }[] };

      const profileMap: Record<string, string> = Object.fromEntries(
        (profilesData ?? []).map((p) => [p.user_id, p.full_name]),
      );

      const typeLabels: Record<string, string> = {
        deposit: 'Pago de entrada',
        final: 'Pago final',
        full: 'Pago único',
        maintenance: 'Mantenimiento mensual',
      };

      const mapped: Payment[] = data.map((p: Record<string, unknown>) => {
        const project = p.projects as Record<string, unknown>;
        const clientId = project?.client_id as string;
        return {
          id: p.id as string,
          project_id: p.project_id as string,
          project_name: (project?.name as string) ?? '—',
          client_name: profileMap[clientId] ?? '—',
          concept: typeLabels[p.type as string] ?? (p.type as string) ?? 'Pago',
          amount: p.amount as number,
          status: p.status as Payment['status'],
          stripe_payment_intent_id: (p.stripe_payment_id as string) ?? null,
          created_at: p.created_at as string,
        };
      });
      setPayments(mapped);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  // ── KPIs ──────────────────────────────────────────────────────────────────
  const succeeded = payments.filter((p) => p.status === 'succeeded');
  const pending = payments.filter((p) => p.status === 'pending');
  const monthAgo = new Date(now.getTime() - 30 * 86400000).toISOString();
  const thisMonth = succeeded.filter((p) => p.created_at >= monthAgo);
  const totalRevenue = succeeded.reduce((s, p) => s + p.amount, 0);
  const monthRevenue = thisMonth.reduce((s, p) => s + p.amount, 0);
  const pendingAmount = pending.reduce((s, p) => s + p.amount, 0);

  // ── Filter + Sort ─────────────────────────────────────────────────────────
  const filtered = payments
    .filter((p) => {
      const q = search.toLowerCase();
      const matchesSearch = !q || p.client_name.toLowerCase().includes(q) || p.project_name.toLowerCase().includes(q) || p.concept.toLowerCase().includes(q);
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let cmp = 0;
      if (sortField === 'created_at') cmp = a.created_at.localeCompare(b.created_at);
      else if (sortField === 'amount') cmp = a.amount - b.amount;
      else if (sortField === 'status') cmp = a.status.localeCompare(b.status);
      else if (sortField === 'client_name') cmp = a.client_name.localeCompare(b.client_name);
      return sortDir === 'asc' ? cmp : -cmp;
    });

  function toggleSort(field: SortField) {
    if (sortField === field) setSortDir((d) => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('desc'); }
  }

  function SortIcon({ field }: { field: SortField }) {
    if (sortField !== field) return <ChevronUp className="w-3 h-3 text-zinc-600" />;
    return sortDir === 'asc' ? <ChevronUp className="w-3 h-3 text-emerald-400" /> : <ChevronDown className="w-3 h-3 text-emerald-400" />;
  }

  // ── CSV export ────────────────────────────────────────────────────────────
  function exportCSV() {
    const rows = [
      ['ID', 'Cliente', 'Proyecto', 'Concepto', 'Importe (€)', 'Estado', 'Fecha', 'Stripe ID'],
      ...filtered.map((p) => [
        p.id,
        p.client_name,
        p.project_name,
        p.concept,
        formatCents(p.amount),
        STATUS_LABELS[p.status],
        new Date(p.created_at).toLocaleDateString('es-ES'),
        p.stripe_payment_intent_id ?? '',
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pagos-think-better-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ── Mark as paid ──────────────────────────────────────────────────────────
  async function markAsPaid(id: string) {
    if (supabaseConfigured && !isMockDemo()) {
      await supabase.from('payments').update({ status: 'succeeded' }).eq('id', id);
    }
    setPayments((prev) => prev.map((p) => p.id === id ? { ...p, status: 'succeeded' } : p));
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Pagos</h1>
          <p className="text-sm text-zinc-500 mt-0.5">Historial y gestión de todos los cobros</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={load} className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors" title="Actualizar">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-sm text-zinc-300 hover:text-white transition-colors">
            <Download className="w-4 h-4" />
            Exportar CSV
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiCard icon={<TrendingUp className="w-5 h-5 text-emerald-400" />} label="Este mes (cobrado)" value={`${formatCents(monthRevenue)} €`} sub={`${thisMonth.length} transacciones`} color="emerald" />
        <KpiCard icon={<Euro className="w-5 h-5 text-cyan-400" />} label="Total histórico" value={`${formatCents(totalRevenue)} €`} sub={`${succeeded.length} pagos completados`} color="cyan" />
        <KpiCard icon={<Clock className="w-5 h-5 text-amber-400" />} label="Pendiente de cobro" value={`${formatCents(pendingAmount)} €`} sub={`${pending.length} pagos pendientes`} color="amber" />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Buscar por cliente, proyecto o concepto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-zinc-500 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as Payment['status'] | 'all')}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
          >
            <option value="all">Todos los estados</option>
            <option value="succeeded">Cobrado</option>
            <option value="pending">Pendiente</option>
            <option value="failed">Fallido</option>
            <option value="refunded">Reembolsado</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-zinc-500">
            <RefreshCw className="w-5 h-5 animate-spin mr-2" />
            Cargando pagos...
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-zinc-500">
            <CreditCard className="w-8 h-8 mb-3 opacity-30" />
            <p className="text-sm">No se encontraron pagos</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  {[
                    { label: 'Cliente', field: 'client_name' as SortField },
                    { label: 'Proyecto / Concepto', field: null },
                    { label: 'Importe', field: 'amount' as SortField },
                    { label: 'Estado', field: 'status' as SortField },
                    { label: 'Fecha', field: 'created_at' as SortField },
                    { label: 'Acciones', field: null },
                  ].map(({ label, field }) => (
                    <th
                      key={label}
                      onClick={() => field && toggleSort(field)}
                      className={`px-4 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider ${field ? 'cursor-pointer hover:text-zinc-300 select-none' : ''}`}
                    >
                      <span className="flex items-center gap-1">
                        {label}
                        {field && <SortIcon field={field} />}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="px-4 py-3.5">
                      <p className="text-sm font-medium text-white">{p.client_name}</p>
                    </td>
                    <td className="px-4 py-3.5 max-w-[220px]">
                      <p className="text-sm text-zinc-300 truncate">{p.project_name}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">{p.concept}</p>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="text-sm font-semibold text-white">{formatCents(p.amount)} €</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${STATUS_COLORS[p.status]}`}>
                        {p.status === 'succeeded' && <CheckCircle2 className="w-3 h-3" />}
                        {p.status === 'pending' && <Clock className="w-3 h-3" />}
                        {STATUS_LABELS[p.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-sm text-zinc-400">
                      {new Date(p.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        {p.status === 'pending' && (
                          <button
                            onClick={() => markAsPaid(p.id)}
                            className="text-xs px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 border border-emerald-600/30 transition-colors"
                          >
                            Marcar pagado
                          </button>
                        )}
                        {p.stripe_payment_intent_id && (
                          <a
                            href={`https://dashboard.stripe.com/payments/${p.stripe_payment_intent_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-600 hover:text-zinc-300 transition-colors"
                            title="Ver en Stripe"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-xs text-zinc-600 text-center">
        {filtered.length} de {payments.length} pagos · Importes en euros, IVA incluido
      </p>
    </motion.div>
  );
}

function KpiCard({ icon, label, value, sub, color }: { icon: React.ReactNode; label: string; value: string; sub: string; color: 'emerald' | 'cyan' | 'amber' }) {
  const ring: Record<string, string> = { emerald: 'border-emerald-500/20', cyan: 'border-cyan-500/20', amber: 'border-amber-500/20' };
  return (
    <div className={`bg-zinc-900 border rounded-2xl p-5 ${ring[color]}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-xl bg-zinc-800 flex items-center justify-center">{icon}</div>
        <span className="text-xs text-zinc-500 font-medium">{label}</span>
      </div>
      <p className="text-2xl font-bold text-white mb-0.5">{value}</p>
      <p className="text-xs text-zinc-500">{sub}</p>
    </div>
  );
}
