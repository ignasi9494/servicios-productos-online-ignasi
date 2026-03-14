// Supabase Edge Function: send-contact-email
// Sends contact form submissions via Resend API.
// Deploy with: supabase functions deploy send-contact-email
// Required env: RESEND_API_KEY

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body: ContactRequest = await req.json();

    const { name, email, message } = body;
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const resendKey = Deno.env.get('RESEND_API_KEY');
    if (!resendKey) {
      // No key configured — log and return success so UI doesn't break during dev
      console.warn('RESEND_API_KEY not set, skipping email send');
      return new Response(
        JSON.stringify({ success: true, dev: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Think Better <noreply@thinkbetter.dev>',
        to: ['hola@thinkbetter.dev'],
        reply_to: email,
        subject: `Nuevo mensaje de contacto — ${name}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#09090b;color:#fff;padding:32px;border-radius:12px">
            <div style="margin-bottom:24px">
              <span style="background:#052e16;color:#4ade80;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;letter-spacing:0.05em">NUEVO MENSAJE</span>
            </div>
            <h1 style="font-size:24px;font-weight:700;margin:0 0 8px">Mensaje de contacto</h1>
            <p style="color:#71717a;margin:0 0 24px">Think Better — Formulario de contacto</p>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:12px;background:#18181b;border-radius:8px 8px 0 0;color:#a1a1aa;font-size:13px;width:100px">Nombre</td><td style="padding:12px;background:#18181b;border-radius:0 8px 8px 0;color:#fff;font-size:14px">${name}</td></tr>
              <tr><td style="padding:12px 12px 12px 12px;color:#a1a1aa;font-size:13px">Email</td><td style="padding:12px;color:#4ade80;font-size:14px"><a href="mailto:${email}" style="color:#4ade80">${email}</a></td></tr>
            </table>
            <div style="margin-top:16px;padding:16px;background:#18181b;border-radius:8px;border-left:3px solid #10b981">
              <p style="color:#a1a1aa;font-size:12px;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.05em">Mensaje</p>
              <p style="color:#fff;font-size:14px;line-height:1.6;margin:0;white-space:pre-wrap">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
            </div>
            <div style="margin-top:24px;padding-top:24px;border-top:1px solid #27272a">
              <p style="color:#52525b;font-size:12px;margin:0">Responde directamente a este email para contactar a ${name}.</p>
            </div>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Resend error:', err);
      return new Response(
        JSON.stringify({ error: 'Failed to send email' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    console.error('send-contact-email error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
