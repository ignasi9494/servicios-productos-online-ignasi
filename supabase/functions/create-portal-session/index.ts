// Supabase Edge Function: create-portal-session
// Creates a Stripe Customer Portal session so clients can manage their subscriptions.
// Deploy with: supabase functions deploy create-portal-session
//
// Required Stripe setup: Enable Customer Portal in Stripe Dashboard → Settings → Billing → Customer portal

import Stripe from 'https://esm.sh/stripe@14?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2?target=deno';

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
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!stripeSecretKey || !supabaseUrl || !supabaseServiceKey) {
      return new Response(
        JSON.stringify({ error: 'Configuración de servidor incompleta' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // Authenticate the request with the user's JWT
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No autenticado' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // Use the user's token to identify them
    const userSupabase = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY') ?? '', {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userError } = await userSupabase.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Token inválido' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // Service client to query payments (bypass RLS)
    const serviceSupabase = createClient(supabaseUrl, supabaseServiceKey);

    // Find the most recent stripe_customer_id for this user's projects
    const { data: projects } = await serviceSupabase
      .from('projects')
      .select('id')
      .eq('client_id', user.id);

    if (!projects || projects.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No se encontraron proyectos para este usuario' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const projectIds = projects.map((p: { id: string }) => p.id);

    const { data: payment } = await serviceSupabase
      .from('payments')
      .select('stripe_customer_id')
      .in('project_id', projectIds)
      .not('stripe_customer_id', 'is', null)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (!payment?.stripe_customer_id) {
      return new Response(
        JSON.stringify({ error: 'No se encontró una suscripción activa. Contacta con el equipo.' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const stripe = new Stripe(stripeSecretKey, { apiVersion: '2024-06-20' });

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: payment.stripe_customer_id,
      return_url: `${appUrl}/dashboard/pagos`,
    });

    return new Response(
      JSON.stringify({ url: portalSession.url }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
