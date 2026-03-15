// Supabase Edge Function: send-email
// Generic transactional email sender via Resend API.
// Used by emailNotifications.ts for all platform emails.
// Deploy with: supabase functions deploy send-email
// Required env: RESEND_API_KEY

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailRequest {
  to: string;
  toName?: string;
  subject: string;
  body: string;          // plain text
  trigger?: string;
  projectId?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const payload: EmailRequest = await req.json();
    const { to, toName, subject, body, trigger } = payload;

    if (!to?.trim() || !subject?.trim() || !body?.trim()) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: to, subject, body' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const resendKey = Deno.env.get('RESEND_API_KEY');
    if (!resendKey) {
      console.warn('[send-email] RESEND_API_KEY not set — skipping send. trigger:', trigger);
      return new Response(
        JSON.stringify({ success: true, dev: true, messageId: `dev-${Date.now()}` }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // Convert plain text body to simple HTML
    const htmlBody = body
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .split('\n')
      .map((line) => line.trim() === '' ? '<br>' : `<p style="margin:0 0 12px;color:#e4e4e7;font-size:14px;line-height:1.6">${line}</p>`)
      .join('');

    const html = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#09090b;color:#fff;padding:32px;border-radius:12px;border:1px solid #27272a">
        <div style="margin-bottom:24px">
          <span style="font-size:18px;font-weight:700;color:#fff">Think Better</span>
        </div>
        <div style="background:#18181b;border-radius:8px;padding:24px;margin-bottom:24px">
          ${htmlBody}
        </div>
        <div style="padding-top:20px;border-top:1px solid #27272a">
          <p style="color:#52525b;font-size:12px;margin:0">© Think Better · Barcelona · <a href="https://thinkbetter.dev" style="color:#4ade80;text-decoration:none">thinkbetter.dev</a></p>
        </div>
      </div>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Think Better <onboarding@resend.dev>',
        to: [to],
        subject,
        html,
        text: body,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[send-email] Resend error:', err);
      return new Response(
        JSON.stringify({ error: 'Failed to send email' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const data = await res.json();
    return new Response(
      JSON.stringify({ success: true, messageId: data.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    console.error('[send-email] error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
