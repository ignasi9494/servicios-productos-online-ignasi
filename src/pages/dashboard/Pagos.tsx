import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CreditCard, CheckCircle, XCircle, Clock, ExternalLink, RefreshCw, AlertCircle, ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { formatAmount, paymentTypeLabel, paymentStatusInfo, createCheckoutSession } from '../../lib/stripe';
import type { PaymentType, PaymentStatus } from '../../lib/database.types';

interface Payment {
  id: string;
  project_id: string;
  stripe_payment_id: string | null;
  amount: number;
  currency: string;
  type: PaymentType;
  status: PaymentStatus;
  created_at: string;
  project_name?: string;
}

function StatusIcon({ status }: { status: string }) {
  if (status === 'succeeded') return <CheckCircle className="w-4 h-4 text-emerald-400" />;
  if (status === 'failed') return <XCircle className="w-4 h-4 text-red-400" />;
  if (status === 'processing') return <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />;
  return <Clock className="w-4 h-4 text-amber-400" />;
}

export function Pagos() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [payingId, setPayingId] = useState<string | null>(null);

  const justPaid = searchParams.get('success') === '1';
  const cancelled = searchParams.get('cancelled') === '1';

  useEffect(() => {
    if (!user) return;
    loadPayments();
  }, [user]);

  async function loadPayments() {
    setLoading(true);
    setError(null);

    // Get all projects for this user
    const { data: projects, error: projError } = await supabase
      .from('projects')
      .select('id, name')
      .eq('client_id', user!.id);

    if (projError) {
      setError('Error cargando proyectos');
      setLoading(false);
      return;
    }

    if (!projects || projects.length === 0) {
      setPayments([]);
      setLoading(false);
      return;
    }

    const projectIds = projects.map((p) => p.id);
    const projectMap: Record<string, string> = {};
    projects.forEach((p) => { projectMap[p.id] = p.name; });

    const { data: paymentsData, error: payError } = await supabase
      .from('payments')
      .select('*')
      .in('project_id', projectIds)
      .order('created_at', { ascending: false });

    if (payError) {
      setError('Error cargando pagos');
      setLoading(false);
      return;
    }

    const enriched = (paymentsData ?? []).map((p) => ({
      ...p,
      project_name: projectMap[p.project_id] ?? 'Proyecto',
    }));

    setPayments(enriched);
    setLoading(false);
  }

  const total = payments
    .filter((p) => p.status === 'succeeded')
    .reduce((sum, p) => sum + p.amount, 0);

  async function handlePay(payment: Payment) {
    setPayingId(payment.id);
    const { url, error: err } = await createCheckoutSession({
      projectId: payment.project_id,
      paymentType: payment.type as 'deposit' | 'final' | 'maintenance',
      amount: payment.amount / 100,
      projectName: payment.project_name ?? 'Proyecto',
    });
    setPayingId(null);
    if (err || !url) {
      alert(err ?? 'Error creando sesión de pago. Contacta con el equipo.');
      return;
    }
    window.location.href = url;
  }

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-white mb-6">Pagos</h1>

      {/* Feedback banners */}
      {justPaid && (
        <div className="mb-6 flex items-center gap-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 text-emerald-400 text-sm">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span>¡Pago completado correctamente! Tu proyecto ha sido actualizado.</span>
        </div>
      )}
      {cancelled && (
        <div className="mb-6 flex items-center gap-3 rounded-xl bg-amber-500/10 border border-amber-500/30 px-4 py-3 text-amber-400 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>El pago fue cancelado. Puedes intentarlo de nuevo cuando quieras.</span>
        </div>
      )}

      {/* Summary card */}
      {!loading && payments.length > 0 && (
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-5">
            <p className="text-xs text-zinc-500 mb-1">Total pagado</p>
            <p className="text-2xl font-bold text-white">{formatAmount(total)}</p>
          </div>
          <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-5">
            <p className="text-xs text-zinc-500 mb-1">Transacciones</p>
            <p className="text-2xl font-bold text-white">{payments.filter((p) => p.status === 'succeeded').length}</p>
          </div>
          <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-5">
            <p className="text-xs text-zinc-500 mb-1">Pendientes</p>
            <p className="text-2xl font-bold text-white">{payments.filter((p) => p.status === 'pending').length}</p>
          </div>
        </div>
      )}

      {/* Payment history */}
      <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <h2 className="text-sm font-medium text-white">Historial de pagos</h2>
          <button
            onClick={loadPayments}
            disabled={loading}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors disabled:opacity-50"
            title="Actualizar"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {loading && (
          <div className="px-6 py-12 text-center">
            <RefreshCw className="w-8 h-8 text-zinc-600 animate-spin mx-auto mb-3" />
            <p className="text-zinc-500 text-sm">Cargando pagos...</p>
          </div>
        )}

        {error && (
          <div className="px-6 py-8 text-center">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
            <p className="text-zinc-400 text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && payments.length === 0 && (
          <div className="px-6 py-12 text-center">
            <CreditCard className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-400 mb-1">Sin pagos registrados</p>
            <p className="text-sm text-zinc-600">Los pagos aparecerán aquí una vez que se procesen.</p>
          </div>
        )}

        {!loading && !error && payments.length > 0 && (
          <div className="divide-y divide-zinc-800">
            {payments.map((payment) => {
              const statusInfo = paymentStatusInfo(payment.status);
              const date = new Date(payment.created_at).toLocaleDateString('es-ES', {
                year: 'numeric', month: 'short', day: 'numeric',
              });
              return (
                <div key={payment.id} className="px-4 sm:px-6 py-4 flex items-center gap-3 sm:gap-4 flex-wrap sm:flex-nowrap">
                  <div className="shrink-0">
                    <StatusIcon status={payment.status} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {paymentTypeLabel(payment.type)}
                    </p>
                    <p className="text-xs text-zinc-500 truncate">
                      {payment.project_name} · {date}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-white">
                      {formatAmount(payment.amount, payment.currency)}
                    </p>
                    <p className={`text-xs ${statusInfo.color}`}>{statusInfo.label}</p>
                  </div>
                  {payment.status === 'pending' && (
                    <button
                      onClick={() => handlePay(payment)}
                      disabled={payingId === payment.id}
                      className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-medium transition-colors"
                    >
                      {payingId === payment.id ? (
                        <RefreshCw className="w-3 h-3 animate-spin" />
                      ) : (
                        <ArrowRight className="w-3 h-3" />
                      )}
                      Pagar ahora
                    </button>
                  )}
                  {payment.stripe_payment_id && payment.status === 'succeeded' && (
                    <a
                      href={`https://dashboard.stripe.com/payments/${payment.stripe_payment_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 p-1.5 rounded-lg text-zinc-600 hover:text-zinc-400 hover:bg-zinc-800 transition-colors"
                      title="Ver en Stripe"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Info box */}
      <div className="mt-6 rounded-xl bg-zinc-900/30 border border-zinc-800 px-5 py-4">
        <p className="text-xs text-zinc-500 leading-relaxed">
          Los pagos se procesan de forma segura a través de <strong className="text-zinc-400">Stripe</strong>.
          El equipo de Think Better te enviará el enlace de pago cuando corresponda según el avance del proyecto.
          Para cualquier duda sobre facturación, contacta con nosotros por el chat interno.
        </p>
      </div>
    </div>
  );
}
