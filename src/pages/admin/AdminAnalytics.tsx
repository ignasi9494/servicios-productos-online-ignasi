import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Users, FileText, CreditCard, Clock, ArrowUpRight, RefreshCw } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { usePageTitle } from '../../hooks/usePageTitle';
import { shouldUseMockData, MOCK_PROJECTS, MOCK_CLIENTS } from '../../lib/mockDemoData';

// ── Types ────────────────────────────────────────────────────────────────────

interface AnalyticsData {
  leadsThisMonth: number;
  leadsLastMonth: number;
  activeProjects: number;
  completedProjects: number;
  conversionRate: number; // lead -> proposal_accepted %
  mrrCents: number;       // monthly recurring revenue (maintenance)
  totalRevenueCents: number;
  avgDaysToClose: number;
  projectsByStatus: { status: string; label: string; count: number; color: string }[];
  revenueByMonth: { month: string; amount: number }[];
}

// ── Mock analytics ────────────────────────────────────────────────────────────

const MOCK_ANALYTICS: AnalyticsData = {
  leadsThisMonth: 6,
  leadsLastMonth: 4,
  activeProjects: 5,
  completedProjects: 3,
  conversionRate: 62,
  mrrCents: 29800,   // 298€/mes en mantenimiento
  totalRevenueCents: 2529900, // 25.299€
  avgDaysToClose: 11,
  projectsByStatus: [
    { status: 'pending_proposal', label: 'Sin propuesta', count: 2, color: 'bg-amber-500' },
    { status: 'proposal_sent', label: 'Propuesta enviada', count: 2, color: 'bg-blue-500' },
    { status: 'proposal_accepted', label: 'Aceptada', count: 1, color: 'bg-emerald-500' },
    { status: 'in_development', label: 'En desarrollo', count: 2, color: 'bg-purple-500' },
    { status: 'in_review', label: 'En revisión', count: 1, color: 'bg-orange-500' },
    { status: 'completed', label: 'Completado', count: 2, color: 'bg-zinc-500' },
  ],
  revenueByMonth: [
    { month: 'Oct', amount: 1800 },
    { month: 'Nov', amount: 3200 },
    { month: 'Dic', amount: 2100 },
    { month: 'Ene', amount: 4500 },
    { month: 'Feb', amount: 6800 },
    { month: 'Mar', amount: 6900 },
  ],
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmt(cents: number) {
  return (cents / 100).toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
}

function pct(a: number, b: number): number {
  if (b === 0) return 0;
  return Math.round(((a - b) / b) * 100);
}

// ── Bar chart ─────────────────────────────────────────────────────────────────

function BarChart({ data }: { data: { month: string; amount: number }[] }) {
  const max = Math.max(...data.map((d) => d.amount), 1);
  return (
    <div className="flex items-end gap-3 h-36">
      {data.map((d, i) => (
        <motion.div
          key={d.month}
          className="flex-1 flex flex-col items-center gap-1.5"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: i * 0.06, duration: 0.4, ease: 'easeOut' }}
          style={{ transformOrigin: 'bottom' }}
        >
          <span className="text-xs text-zinc-400">{d.amount >= 1000 ? `${(d.amount / 1000).toFixed(1)}k` : d.amount}€</span>
          <div
            className="w-full rounded-t-lg bg-gradient-to-t from-emerald-600 to-emerald-400"
            style={{ height: `${(d.amount / max) * 96}px`, minHeight: 4 }}
          />
          <span className="text-xs text-zinc-500">{d.month}</span>
        </motion.div>
      ))}
    </div>
  );
}

// ── Funnel chart ─────────────────────────────────────────────────────────────

function FunnelStep({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pctWidth = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-zinc-400 w-32 shrink-0 text-right">{label}</span>
      <div className="flex-1 h-6 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${pctWidth}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
      <span className="text-sm font-semibold text-white w-8 shrink-0">{value}</span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function AdminAnalytics() {
  usePageTitle('Analytics | Think Better Admin');
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    setLoading(true);
    try {
      const useMock = shouldUseMockData(0);

      if (useMock) {
        setData(MOCK_ANALYTICS);
        setLoading(false);
        return;
      }

      // Real queries
      const now = new Date();
      const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString();

      const [allProjects, paymentsResult] = await Promise.all([
        supabase.from('projects').select('id, status, created_at, total_price, contract_signed_at').order('created_at', { ascending: false }),
        supabase.from('payments').select('amount, status, created_at, type'),
      ]);

      const projects = allProjects.data ?? [];
      const payments = paymentsResult.data ?? [];

      const leadsThisMonth = projects.filter((p) => p.created_at >= thisMonthStart).length;
      const leadsLastMonth = projects.filter((p) => p.created_at >= lastMonthStart && p.created_at < thisMonthStart).length;
      const activeProjects = projects.filter((p) => ['in_development', 'in_review', 'proposal_accepted', 'proposal_sent'].includes(p.status)).length;
      const completedProjects = projects.filter((p) => ['completed', 'delivered'].includes(p.status)).length;

      const accepted = projects.filter((p) => ['proposal_accepted', 'in_development', 'in_review', 'completed', 'delivered'].includes(p.status)).length;
      const conversionRate = projects.length > 0 ? Math.round((accepted / projects.length) * 100) : 0;

      const totalRevenueCents = payments.filter((p) => p.status === 'succeeded').reduce((s, p) => s + p.amount, 0);
      const mrrCents = payments.filter((p) => p.type === 'maintenance' && p.status === 'succeeded').reduce((s, p) => s + p.amount, 0);

      // Avg days to close: from created_at to contract_signed_at
      const closedProjects = projects.filter((p) => p.contract_signed_at);
      const avgDaysToClose = closedProjects.length > 0
        ? Math.round(
            closedProjects.reduce((s, p) => {
              const days = (new Date(p.contract_signed_at!).getTime() - new Date(p.created_at).getTime()) / 86400000;
              return s + days;
            }, 0) / closedProjects.length
          )
        : 0;

      // Projects by status
      const statusCounts: Record<string, number> = {};
      projects.forEach((p) => { statusCounts[p.status] = (statusCounts[p.status] ?? 0) + 1; });
      const statusRows = [
        { status: 'pending_proposal', label: 'Sin propuesta', color: 'bg-amber-500' },
        { status: 'proposal_sent', label: 'Propuesta enviada', color: 'bg-blue-500' },
        { status: 'proposal_accepted', label: 'Aceptada', color: 'bg-emerald-500' },
        { status: 'in_development', label: 'En desarrollo', color: 'bg-purple-500' },
        { status: 'in_review', label: 'En revisión', color: 'bg-orange-500' },
        { status: 'completed', label: 'Completado', color: 'bg-zinc-500' },
      ].map((s) => ({ ...s, count: statusCounts[s.status] ?? 0 }));

      // Revenue by last 6 months
      const revenueByMonth: { month: string; amount: number }[] = [];
      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        const label = d.toLocaleDateString('es-ES', { month: 'short' });
        const amount = payments
          .filter((p) => p.status === 'succeeded' && p.created_at?.startsWith(monthKey))
          .reduce((s, p) => s + Math.round(p.amount / 100), 0);
        revenueByMonth.push({ month: label, amount });
      }

      setData({
        leadsThisMonth,
        leadsLastMonth,
        activeProjects,
        completedProjects,
        conversionRate,
        mrrCents,
        totalRevenueCents,
        avgDaysToClose,
        projectsByStatus: statusRows,
        revenueByMonth,
      });
    } catch (e) {
      console.error('Error loading analytics:', e);
    } finally {
      setLoading(false);
    }
  }

  if (loading || !data) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-white mb-8">Analytics</h1>
        <div className="flex items-center justify-center py-24">
          <RefreshCw className="w-8 h-8 text-zinc-600 animate-spin" />
        </div>
      </div>
    );
  }

  const leadsGrowth = pct(data.leadsThisMonth, data.leadsLastMonth);
  const maxFunnelCount = Math.max(...data.projectsByStatus.map((s) => s.count), 1);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-zinc-400 text-sm mt-0.5">Métricas del negocio</p>
        </div>
        <button
          onClick={loadAnalytics}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Actualizar
        </button>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <KPICard
          icon={Users}
          label="Leads este mes"
          value={String(data.leadsThisMonth)}
          sub={leadsGrowth !== 0 ? `${leadsGrowth > 0 ? '+' : ''}${leadsGrowth}% vs mes pasado` : 'Sin cambio'}
          positive={leadsGrowth >= 0}
          delay={0}
        />
        <KPICard
          icon={TrendingUp}
          label="Conversión"
          value={`${data.conversionRate}%`}
          sub="lead → aceptada"
          delay={0.05}
        />
        <KPICard
          icon={FileText}
          label="Proyectos activos"
          value={String(data.activeProjects)}
          sub={`${data.completedProjects} completados`}
          delay={0.1}
        />
        <KPICard
          icon={CreditCard}
          label="Revenue total"
          value={fmt(data.totalRevenueCents)}
          sub={`MRR ${fmt(data.mrrCents)}/mes`}
          delay={0.15}
          accent
        />
        <KPICard
          icon={Clock}
          label="Tiempo cierre"
          value={data.avgDaysToClose > 0 ? `${data.avgDaysToClose}d` : 'N/A'}
          sub="desde lead hasta firma"
          delay={0.2}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue chart */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-6">Revenue últimos 6 meses</h2>
          <BarChart data={data.revenueByMonth} />
        </div>

        {/* Pipeline funnel */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-white mb-6">Pipeline de proyectos</h2>
          <div className="space-y-3">
            {data.projectsByStatus.map((s) => (
              <FunnelStep
                key={s.status}
                label={s.label}
                value={s.count}
                max={maxFunnelCount}
                color={s.color}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Conversion funnel */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h2 className="text-base font-semibold text-white mb-1">Embudo de conversión</h2>
        <p className="text-xs text-zinc-500 mb-6">Desde lead hasta cliente de pago</p>
        <div className="flex items-end gap-2">
          {[
            { label: 'Leads totales', value: data.leadsThisMonth + data.leadsLastMonth, color: 'bg-zinc-600' },
            { label: 'Cuestionarios', value: Math.round((data.leadsThisMonth + data.leadsLastMonth) * 0.8), color: 'bg-blue-600' },
            { label: 'Propuestas', value: data.projectsByStatus.reduce((s, p) => s + (['proposal_sent', 'proposal_accepted', 'in_development', 'in_review', 'completed'].includes(p.status) ? p.count : 0), 0), color: 'bg-purple-600' },
            { label: 'Aceptadas', value: data.projectsByStatus.reduce((s, p) => s + (['proposal_accepted', 'in_development', 'in_review', 'completed'].includes(p.status) ? p.count : 0), 0), color: 'bg-emerald-600' },
            { label: 'Pagos rec.', value: data.completedProjects, color: 'bg-emerald-400' },
          ].map((step, i) => {
            const base = data.leadsThisMonth + data.leadsLastMonth || 1;
            const h = Math.max((step.value / base) * 120, 20);
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-sm font-bold text-white">{step.value}</span>
                <motion.div
                  className={`w-full rounded-t-lg ${step.color}`}
                  initial={{ height: 0 }}
                  animate={{ height: h }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}
                />
                <span className="text-xs text-zinc-500 text-center leading-tight">{step.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function KPICard({
  icon: Icon, label, value, sub, delay = 0, accent = false, positive,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  sub?: string;
  delay?: number;
  accent?: boolean;
  positive?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`rounded-2xl p-4 border ${accent ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-zinc-900 border-zinc-800'}`}
    >
      <Icon className={`w-5 h-5 mb-3 ${accent ? 'text-emerald-400' : 'text-zinc-500'}`} />
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-zinc-400 mt-0.5">{label}</p>
      {sub && (
        <p className={`text-xs mt-1.5 flex items-center gap-0.5 ${
          positive === true ? 'text-emerald-400' : positive === false ? 'text-red-400' : 'text-zinc-500'
        }`}>
          {positive !== undefined && <ArrowUpRight className={`w-3 h-3 ${positive === false ? 'rotate-180' : ''}`} />}
          {sub}
        </p>
      )}
    </motion.div>
  );
}
