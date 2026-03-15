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
  | 'payment_request'
  | 'iteration_requested'
  | 'status_changed'
  | 'new_message'
  | 'admin_notification';

/** Admin notification email — receives alerts when clients act */
export const ADMIN_NOTIFICATION_EMAIL = 'ignasi9494@gmail.com';

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

  payment_request: {
    subject: '💳 Tienes un nuevo pago pendiente — Think Better',
    body: (p) => `
Hola ${p.toName ?? 'ahí'},

El equipo de Think Better ha generado una solicitud de pago para tu proyecto "${p.projectName ?? 'tu proyecto'}".

${p.extraData?.amount ? `Importe: ${Number(p.extraData.amount).toLocaleString('es-ES', { minimumFractionDigits: 2 })} €\n` : ''}Puedes realizar el pago directamente desde tu panel en:
https://servicios-productos-online-ignasi.vercel.app/dashboard/pagos

Si tienes alguna pregunta sobre este pago, puedes escribirnos en el chat de tu proyecto.

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

  status_changed: {
    subject: '🔔 Actualización de tu proyecto — Think Better',
    body: (p) => `
Hola ${p.toName ?? 'ahí'},

Hay una actualización en el estado de tu proyecto "${p.projectName ?? 'tu proyecto'}".

${p.extraData?.statusLabel ? `Nuevo estado: ${p.extraData.statusLabel}\n` : ''}Puedes ver los detalles en tu panel:
https://servicios-productos-online-ignasi.vercel.app/dashboard

Si tienes alguna pregunta, escríbenos directamente en el chat de tu proyecto.

—El equipo de Think Better
    `.trim(),
  },

  new_message: {
    subject: '💬 Nuevo mensaje — Think Better',
    body: (p) => {
      if (p.extraData?.fromAdmin) {
        return `
Hola ${p.toName ?? 'ahí'},

El equipo de Think Better te ha enviado un mensaje en el proyecto "${p.projectName ?? 'tu proyecto'}":

———
${p.extraData?.messagePreview ?? ''}
———

Puedes responder directamente desde tu panel en:
https://servicios-productos-online-ignasi.vercel.app/dashboard/mensajes

—El equipo de Think Better
        `.trim();
      }
      return `
Hola,

${p.extraData?.senderName ?? 'Un cliente'} ha enviado un mensaje en el proyecto "${p.projectName ?? 'un proyecto'}":

———
${p.extraData?.messagePreview ?? ''}
———

Puedes responder directamente desde el panel de administración en:
https://servicios-productos-online-ignasi.vercel.app/admin/mensajes

—Think Better (notificación automática)
      `.trim();
    },
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

/** Called when admin changes project status — notifies client via email */
export async function notifyStatusChange(
  clientEmail: string,
  clientName: string,
  projectId: string,
  projectName: string,
  newStatus: string,
  statusLabel: string,
): Promise<EmailResult> {
  // Only notify for status changes meaningful to the client (skip internal/admin-only transitions)
  const notifiableStatuses = ['proposal_sent', 'in_development', 'in_review', 'completed', 'delivered'];
  if (!notifiableStatuses.includes(newStatus)) return { success: true, mock: true };

  return sendEmail({
    trigger: 'status_changed',
    to: clientEmail,
    toName: clientName,
    projectId,
    projectName,
    extraData: { statusLabel },
  });
}

/** Called when a client sends a chat message — notifies admin via email */
export async function notifyNewMessageFromClient(
  senderName: string,
  projectId: string,
  projectName: string,
  messagePreview: string,
): Promise<EmailResult> {
  return sendEmail({
    trigger: 'new_message',
    to: ADMIN_NOTIFICATION_EMAIL,
    toName: 'Ignasi',
    projectId,
    projectName,
    extraData: { senderName, messagePreview: messagePreview.slice(0, 200), fromAdmin: false },
  });
}

/** Called when an admin sends a chat message — notifies the client via email */
export async function notifyNewMessageFromAdmin(
  clientEmail: string,
  clientName: string,
  projectId: string,
  projectName: string,
  messagePreview: string,
): Promise<EmailResult> {
  return sendEmail({
    trigger: 'new_message',
    to: clientEmail,
    toName: clientName,
    projectId,
    projectName,
    extraData: { messagePreview: messagePreview.slice(0, 200), fromAdmin: true },
  });
}

/** Called when admin creates a payment request — notifies client via email */
export async function notifyPaymentRequest(
  clientEmail: string,
  clientName: string,
  projectId: string,
  projectName: string,
  amountEuros: number,
): Promise<EmailResult> {
  return sendEmail({
    trigger: 'payment_request',
    to: clientEmail,
    toName: clientName,
    projectId,
    projectName,
    extraData: { amount: amountEuros },
  });
}
