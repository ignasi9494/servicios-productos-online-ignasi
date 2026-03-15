/**
 * PostHog analytics wrapper for Think Better.
 * All events are no-ops if VITE_POSTHOG_KEY is not set (local dev / CI).
 *
 * Key funnel events:
 *   questionnaire_started
 *   questionnaire_message_sent   (with question_number)
 *   questionnaire_completed      (with plan, estimated_price)
 *   questionnaire_abandoned      (with question_number, progress_pct)
 *   proposal_viewed              (with proposal_id, proposal_version)
 *   payment_initiated            (with plan, amount, type: 'full'|'subscription')
 *   payment_completed            (with plan, amount, session_id)
 */

import posthog from 'posthog-js';

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const POSTHOG_HOST = (import.meta.env.VITE_POSTHOG_HOST as string | undefined) ?? 'https://eu.i.posthog.com';

let initialized = false;

/** Call once at app startup (main.tsx). Safe to call multiple times. */
export function initAnalytics() {
  if (initialized || !POSTHOG_KEY) return;
  initialized = true;
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    // Don't auto-capture all clicks — we fire specific events
    autocapture: false,
    // Respect user privacy: disable session recording unless opted-in
    disable_session_recording: true,
    // Persist across page reloads
    persistence: 'localStorage+cookie',
  });
}

/** Associate a known user with PostHog after login. */
export function identifyUser(userId: string, properties?: Record<string, unknown>) {
  if (!POSTHOG_KEY) return;
  posthog.identify(userId, properties);
}

/** Reset PostHog identity on logout. */
export function resetAnalytics() {
  if (!POSTHOG_KEY) return;
  posthog.reset();
}

/** Generic event capture. Used by all specific helpers below. */
function capture(event: string, properties?: Record<string, unknown>) {
  if (!POSTHOG_KEY) return;
  posthog.capture(event, properties);
}

// ─── Questionnaire funnel ────────────────────────────────────────────────────

export function trackQuestionnaireStarted() {
  capture('questionnaire_started');
}

export function trackQuestionnaireMsgSent(questionNumber: number) {
  capture('questionnaire_message_sent', { question_number: questionNumber });
}

export function trackQuestionnaireCompleted(plan: string, estimatedPrice: number) {
  capture('questionnaire_completed', {
    plan,
    estimated_price: estimatedPrice,
  });
}

export function trackQuestionnaireAbandoned(questionNumber: number, progressPct: number) {
  capture('questionnaire_abandoned', {
    question_number: questionNumber,
    progress_pct: progressPct,
  });
}

// ─── Proposal funnel ─────────────────────────────────────────────────────────

export function trackProposalViewed(proposalId: string, version: number) {
  capture('proposal_viewed', { proposal_id: proposalId, proposal_version: version });
}

// ─── Payment funnel ──────────────────────────────────────────────────────────

export function trackPaymentInitiated(plan: string, amount: number, type: 'full' | 'subscription') {
  capture('payment_initiated', { plan, amount, type });
}

export function trackPaymentCompleted(plan: string, amount: number, sessionId: string) {
  capture('payment_completed', { plan, amount, session_id: sessionId });
}
