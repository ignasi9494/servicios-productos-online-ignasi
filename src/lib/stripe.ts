import { loadStripe } from '@stripe/stripe-js';
import { supabase } from './supabase';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// Lazy-loaded Stripe instance
let stripePromise: ReturnType<typeof loadStripe> | null = null;

export function getStripe() {
  if (!stripePublishableKey) return null;
  if (!stripePromise) {
    stripePromise = loadStripe(stripePublishableKey);
  }
  return stripePromise;
}

export type CheckoutPaymentType = 'deposit' | 'final' | 'full' | 'maintenance';

export interface CreateCheckoutParams {
  projectId: string;
  paymentType: CheckoutPaymentType;
  amount: number; // in euros (e.g. 1500.00)
  projectName: string;
}

export interface CheckoutResult {
  url: string | null;
  error: string | null;
}

/**
 * Calls the Supabase Edge Function to create a Stripe Checkout session.
 * Returns the checkout URL to redirect to.
 */
export async function createCheckoutSession(params: CreateCheckoutParams): Promise<CheckoutResult> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return { url: null, error: 'No autenticado' };

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const response = await fetch(`${supabaseUrl}/functions/v1/create-checkout-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const text = await response.text();
    return { url: null, error: text || 'Error creando sesión de pago' };
  }

  const data = await response.json();
  return { url: data.url ?? null, error: data.error ?? null };
}

/** Format amount in cents to locale string (e.g. 150000 → "1.500,00 €") */
export function formatAmount(amountCents: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amountCents / 100);
}

export interface PortalResult {
  url: string | null;
  error: string | null;
}

/**
 * Calls the Supabase Edge Function to create a Stripe Customer Portal session.
 * Returns the portal URL to redirect to (lets client manage their subscription).
 */
export async function createPortalSession(): Promise<PortalResult> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return { url: null, error: 'No autenticado' };

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const response = await fetch(`${supabaseUrl}/functions/v1/create-portal-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    return { url: null, error: data.error ?? 'Error abriendo el portal de suscripción' };
  }

  const data = await response.json();
  return { url: data.url ?? null, error: data.error ?? null };
}

/** Map payment type to Spanish label */
export function paymentTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    full: 'Pago total del proyecto',
    deposit: 'Pago de entrada',
    final: 'Pago final',
    maintenance: 'Suscripción mensual',
  };
  return labels[type] ?? type;
}

/** Map payment status to Spanish label and color */
export function paymentStatusInfo(status: string): { label: string; color: string } {
  const map: Record<string, { label: string; color: string }> = {
    pending: { label: 'Pendiente', color: 'text-amber-400' },
    processing: { label: 'Procesando', color: 'text-blue-400' },
    succeeded: { label: 'Completado', color: 'text-emerald-400' },
    failed: { label: 'Fallido', color: 'text-red-400' },
    refunded: { label: 'Reembolsado', color: 'text-zinc-400' },
  };
  return map[status] ?? { label: status, color: 'text-zinc-400' };
}
