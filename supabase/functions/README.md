# Supabase Edge Functions

## Funciones disponibles

### `create-checkout-session`
Crea una sesión de Stripe Checkout para pagos de entrada (40%), pago final (60%) o mantenimiento mensual.

### `stripe-webhook`
Maneja eventos de Stripe webhook y actualiza la tabla `payments` en Supabase.

## Despliegue

```bash
# 1. Instalar Supabase CLI
npm install -g supabase

# 2. Autenticarse
supabase login

# 3. Vincular proyecto
supabase link --project-ref <project-ref>

# 4. Configurar secrets
supabase secrets set STRIPE_SECRET_KEY=sk_test_...
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
supabase secrets set APP_URL=https://servicios-productos-online-ignasi.vercel.app

# 5. Desplegar funciones
supabase functions deploy create-checkout-session
supabase functions deploy stripe-webhook
```

## Configurar webhook en Stripe

1. Ve a Stripe Dashboard → Developers → Webhooks
2. Añade endpoint: `https://<project-ref>.supabase.co/functions/v1/stripe-webhook`
3. Eventos a escuchar:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
   - `customer.subscription.deleted`
4. Copia el webhook secret (`whsec_...`) y añádelo como secret de Supabase
