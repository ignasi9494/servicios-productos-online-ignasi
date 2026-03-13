/**
 * Email Notifications module — Think Better
 *
 * Wraps Supabase Edge Function calls for transactional emails.
 * Implements stub/mock fallback when the Edge Function is not deployed
 * (real provider integration requires Resend/SendGrid API keys).
 */

import { supabase } from './supabase';

// ─── Types ────────────────────────────────────────────────────────────────────

export type EmailTrigger =
  | 'questionnaire_submitted'
  | 'proposal_sent'
  | 'payment_received'
  | 'iteration_requested'
  | 'admin_notification';

export interface EmailPayload {
  trigger: EmailTrigger;
  to: string;
  toName?: string;
  projectId?: string;
  projectName?: string;
  extraData?: Record<string, string | number | boolean>;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
  mock?: boolean;
}

// ─── Email templates (used by mock and Edge Function) ─────────────────────────

const EMAIL_TEMPLATES: Record<EmailTrigger, { subject: string; body: (payload: EmailPayload) => string }> = {
  questionnaire_submitted: {
    subject: '✅ Hemos recibido tu cuestionario — Think Better',
    body: (p) => `
Hola ${p.toName ?? 'ahí'},

Acabamos de recibir tu cuestionario para el proyecto "${p.projectName ?? 'tu proyecto'}".

Nuestro equipo lo está revisando ahora mismo. En menos de 24 horas recibirás la propuesta personalizada en tu dashboard.

Mientras tanto, puedes acceder a tu panel en:
https://servicios-productos-online-ignasi.vercel.app/dashboard

¡Gracias por confiar en Think Better!

—El equipo de Think Better
    `.trim(),
  },

  proposal_sent: {
    subject: '📋 Tu propuesta está lista — Think Better',
    body: (p) => `
Hola ${p.toName ?? 'ahí'},

La propuesta para "${p.projectName ?? 'tu proyecto'}" ya está disponible en tu dashboard.

Puedes revisarla, solicitar cambios o aceptarla directamente desde:
https://servicios-productos-online-ignasi.vercel.app/dashboard/propuestas

Si tienes alguna duda, responde a este email o escríbenos directamente en el chat de tu panel.

—El equipo de Think Better
    `.trim(),
  },

  payment_received: {
    subject: '💳 Pago recibido — Think Better',
    body: (p) => `
Hola ${p.toName ?? 'ahí'},

Hemos recibido tu pago para "${p.projectName ?? 'tu proyecto'}". El importe ha sido procesado correctamente.

Puedes consultar el historial de pagos en:
https://servicios-productos-online-ignasi.vercel.app/dashboard/pagos

¡El desarrollo arranca oficialmente!

—El equipo de Think Better
    `.trim(),
  },

  iteration_requested: {
    subject: '🔄 Solicitud de iteración recibida — Think Better',
    body: (p) => `
Hola ${p.toName ?? 'ahí'},

Hemos recibido tu solicitud de revisión para "${p.projectName ?? 'tu proyecto'}".

Nuestro equipo la revisará en las próximas horas y te actualizará en el dashboard.

—El equipo de Think Better
    `.trim(),
  },

  admin_notification: {
    subject: `[Admin] Notificación de Think Better`,
    body: (p) => `
Notificación interna para el proyecto "${p.projectName ?? 'N/A'}".

${p.extraData ? JSON.stringify(p.extraData, null, 2) : ''}
    `.trim(),
  },
};

// ─── Core send function ────────────────────────────────────────────────────────

/**
 * Sends a transactional email via the Supabase Edge Function `send-email`.
 * Falls back to a mock/console log if the function is not deployed.
 */
export async function sendEmail(payload: EmailPayload): Promise<EmailResult> {
  const template = EMAIL_TEMPLATES[payload.trigger];
  if (!template) {
    return { success: false, error: `Unknown trigger: ${payload.trigger}` };
  }

  const emailData = {
    to: payload.to,
    toName: payload.toName,
    subject: template.subject,
    body: template.body(payload),
    trigger: payload.trigger,
    projectId: payload.projectId,
  };

  try {
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: emailData,
    });

    if (error) throw error;

    return {
      success: true,
      messageId: data?.messageId ?? `mock-${Date.now()}`,
    };
  } catch {
    // Graceful fallback: log to console as mock
    console.info('[EmailNotifications] Mock send (Edge Function not deployed):', emailData);
    return {
      success: true,
      messageId: `mock-${Date.now()}`,
      mock: true,
    };
  }
}

// ─── Trigger helpers ──────────────────────────────────────────────────────────

/** Called when a client submits the questionnaire */
export async function notifyQuestionnaireSubmitted(
  clientEmail: string,
  clientName: string,
  projectId: string,
  projectName: string,
): Promise<EmailResult> {
  return sendEmail({
    trigger: 'questionnaire_submitted',
    to: clientEmail,
    toName: clientName,
    projectId,
    projectName,
  });
}

/** Called when admin sends a proposal to a client */
export async function notifyProposalSent(
  clientEmail: string,
  clientName: string,
  projectId: string,
  projectName: string,
): Promise<EmailResult> {
  return sendEmail({
    trigger: 'proposal_sent',
    to: clientEmail,
    toName: clientName,
    projectId,
    projectName,
  });
}

/** Called when a payment is confirmed (webhook or manual) */
export async function notifyPaymentReceived(
  clientEmail: string,
  clientName: string,
  projectId: string,
  projectName: string,
  amount: number,
): Promise<EmailResult> {
  return sendEmail({
    trigger: 'payment_received',
    to: clientEmail,
    toName: clientName,
    projectId,
    projectName,
    extraData: { amount },
  });
}

/** Called when a client requests an iteration/revision */
export async function notifyIterationRequested(
  clientEmail: string,
  clientName: string,
  projectId: string,
  projectName: string,
): Promise<EmailResult> {
  return sendEmail({
    trigger: 'iteration_requested',
    to: clientEmail,
    toName: clientName,
    projectId,
    projectName,
  });
}
