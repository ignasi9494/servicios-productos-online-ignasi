// Supabase Edge Function: stripe-webhook
// Handles Stripe webhook events and updates payment records in Supabase.
// Deploy with: supabase functions deploy stripe-webhook
// Register endpoint in Stripe Dashboard → Developers → Webhooks

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2?target=deno';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
};

// Manual Stripe webhook signature verification using Deno WebCrypto
// Avoids Stripe SDK constructEvent which has issues in Deno ESM environment
async function verifyStripeSignature(
  body: string,
  header: string,
  secret: string,
  tolerance = 600,
): Promise<boolean> {
  const parts = header.split(',');
  const timestampPart = parts.find((p) => p.startsWith('t='));
  const signatures = parts.filter((p) => p.startsWith('v1=')).map((p) => p.slice(3));

  if (!timestampPart || !signatures.length) return false;

  const timestamp = timestampPart.slice(2);
  const now = Math.floor(Date.now() / 1000);
  if (tolerance > 0 && Math.abs(now - parseInt(timestamp)) > tolerance) return false;

  const payload = `${timestamp}.${body}`;
  const encoder = new TextEncoder();

  // Strip whsec_ prefix if present
  const rawSecret = secret.startsWith('whsec_') ? secret.slice(6) : secret;

  // Decode base64 secret
  const keyBytes = Uint8Array.from(atob(rawSecret), (c) => c.charCodeAt(0));

  const key = await crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );

  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  const hex = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return signatures.some((s) => s === hex);
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

  if (!webhookSecret || !supabaseUrl || !supabaseServiceKey) {
    return new Response('Configuración de servidor incompleta', { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return new Response('Firma Stripe faltante', { status: 400 });
  }

  const body = await req.text();

  const valid = await verifyStripeSignature(body, signature, webhookSecret, 600);
  if (!valid) {
    console.error('[stripe-webhook] Signature verification failed. sig header:', signature.slice(0, 60));
    return new Response('Firma Stripe inválida', { status: 400 });
  }

  // Parse event body directly (no Stripe SDK needed after verification)
  let event: { type: string; data: { object: Record<string, unknown> } };
  try {
    event = JSON.parse(body);
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as {
        metadata?: { project_id?: string; payment_type?: string };
        payment_intent?: string;
        id: string;
        amount_total?: number;
        currency?: string;
      };
      const projectId = session.metadata?.project_id;
      const paymentType = session.metadata?.payment_type as 'deposit' | 'final' | 'full' | 'maintenance';
      const amountTotal = session.amount_total ?? 0;

      if (projectId && paymentType) {
        const { error: insertError } = await supabase.from('payments').insert({
          project_id: projectId,
          stripe_payment_id: (session.payment_intent as string) ?? session.id,
          amount: amountTotal,
          currency: session.currency?.toUpperCase() ?? 'EUR',
          type: paymentType,
          status: 'succeeded',
        });

        if (insertError) {
          console.error('[stripe-webhook] payments insert error:', insertError);
        }

        // Update project status based on payment type
        if (paymentType === 'full' || paymentType === 'deposit') {
          await supabase.from('projects')
            .update({ status: 'in_development' })
            .eq('id', projectId);
        } else if (paymentType === 'final') {
          await supabase.from('projects')
            .update({ status: 'delivered' })
            .eq('id', projectId);
        }
      }
      break;
    }

    case 'payment_intent.payment_failed': {
      const pi = event.data.object as { id: string };
      await supabase.from('payments')
        .update({ status: 'failed' })
        .eq('stripe_payment_id', pi.id);
      break;
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object as { metadata?: { project_id?: string } };
      const projectId = sub.metadata?.project_id;
      if (projectId) {
        await supabase.from('payments')
          .update({ status: 'refunded' })
          .eq('project_id', projectId)
          .eq('type', 'maintenance')
          .eq('status', 'succeeded')
          .order('created_at', { ascending: false })
          .limit(1);
      }
      break;
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
