// Supabase Edge Function: stripe-webhook
// Handles Stripe webhook events and updates payment records in Supabase.
// Deploy with: supabase functions deploy stripe-webhook
// Register endpoint in Stripe Dashboard → Developers → Webhooks

import Stripe from 'https://esm.sh/stripe@14?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2?target=deno';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!stripeSecretKey || !webhookSecret || !supabaseUrl || !supabaseServiceKey) {
    return new Response('Configuración de servidor incompleta', { status: 500 });
  }

  const stripe = new Stripe(stripeSecretKey, { apiVersion: '2024-06-20' });
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return new Response('Firma Stripe faltante', { status: 400 });
  }

  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return new Response('Firma Stripe inválida', { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const projectId = session.metadata?.project_id;
      const paymentType = session.metadata?.payment_type as 'deposit' | 'final' | 'full' | 'maintenance';
      const amountTotal = session.amount_total ?? 0;

      if (projectId && paymentType) {
        await supabase.from('payments').insert({
          project_id: projectId,
          stripe_payment_id: session.payment_intent as string ?? session.id,
          amount: amountTotal,
          currency: session.currency?.toUpperCase() ?? 'EUR',
          type: paymentType,
          status: 'succeeded',
        });

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
      const pi = event.data.object as Stripe.PaymentIntent;
      // Update existing pending payment to failed
      await supabase.from('payments')
        .update({ status: 'failed' })
        .eq('stripe_payment_id', pi.id);
      break;
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription;
      const projectId = sub.metadata?.project_id;
      if (projectId) {
        // Mark last maintenance payment as refunded/cancelled
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
