// Supabase Edge Function: create-checkout-session
// Creates a Stripe Checkout Session for deposit, final, or maintenance payments.
// Deploy with: supabase functions deploy create-checkout-session

import Stripe from 'https://esm.sh/stripe@14?target=deno';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    const appUrl = Deno.env.get('APP_URL') ?? 'https://servicios-productos-online-ignasi.vercel.app';

    if (!stripeSecretKey) {
      return new Response(JSON.stringify({ error: 'STRIPE_SECRET_KEY no configurada' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { projectId, paymentType, amount, projectName } = await req.json();

    if (!projectId || !paymentType || !amount) {
      return new Response(JSON.stringify({ error: 'Faltan parámetros requeridos' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const stripe = new Stripe(stripeSecretKey, { apiVersion: '2024-06-20' });

    // Amount in cents
    const amountCents = Math.round(amount * 100);

    const paymentLabels: Record<string, string> = {
      deposit: 'Pago de entrada (40%)',
      final: 'Pago final (60%)',
      maintenance: 'Mantenimiento mensual',
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: projectName ?? 'Proyecto Think Better',
              description: paymentLabels[paymentType] ?? paymentType,
            },
            unit_amount: amountCents,
            // For maintenance, use recurring
            ...(paymentType === 'maintenance'
              ? { recurring: { interval: 'month' } }
              : {}),
          },
          quantity: 1,
        },
      ],
      mode: paymentType === 'maintenance' ? 'subscription' : 'payment',
      success_url: `${appUrl}/dashboard/pagos?success=1&project=${projectId}`,
      cancel_url: `${appUrl}/dashboard/pagos?cancelled=1`,
      metadata: {
        project_id: projectId,
        payment_type: paymentType,
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
