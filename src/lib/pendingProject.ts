// Think Better - Pending project creation helper
// Used by Registro.tsx and Login.tsx to create a project in Supabase
// after the user authenticates, when they came from the questionnaire.

import { supabase, supabaseConfigured } from './supabase';

export interface PendingProjectData {
  projectName: string;
  plan: string;
  basePrice: number;
  extrasTotal: number;
  totalPrice: number;
  deliveryDays: number;
  maxIterations: number;
  sessionId: string | null;
}

export const PENDING_PROJECT_KEY = 'tb_pending_project';

/**
 * If the user arrives at Registro/Login from the questionnaire,
 * their pending project data is stored in localStorage.
 * Call this after successful auth to create the project row.
 *
 * Returns the new project id on success, null otherwise.
 */
export async function createProjectFromPending(userId: string): Promise<string | null> {
  if (!supabaseConfigured) return null;

  const raw = localStorage.getItem(PENDING_PROJECT_KEY);
  if (!raw) return null;

  let pending: PendingProjectData;
  try {
    pending = JSON.parse(raw) as PendingProjectData;
  } catch {
    localStorage.removeItem(PENDING_PROJECT_KEY);
    return null;
  }

  try {
    const { data: project, error } = await supabase
      .from('projects')
      .insert({
        client_id: userId,
        name: pending.projectName,
        status: 'pending_proposal',
        plan: pending.plan,
        base_price: pending.basePrice,
        extras_price: pending.extrasTotal,
        total_price: pending.totalPrice,
        delivery_days: pending.deliveryDays,
        max_iterations: pending.maxIterations,
      })
      .select('id')
      .single();

    if (error) {
      console.error('[pendingProject] Failed to create project:', error);
      return null;
    }

    // Link the questionnaire session to this project
    if (pending.sessionId && project?.id) {
      await supabase
        .from('questionnaire_conversations')
        .update({ project_id: project.id })
        .eq('session_id', pending.sessionId)
        .then(() => {
          // fire-and-forget — non-critical
        });
    }

    // Clean up localStorage now that the project is created
    localStorage.removeItem(PENDING_PROJECT_KEY);
    // Also clear the questionnaire engine state so a new questionnaire starts fresh
    localStorage.removeItem('tb_questionnaire_engine');
    localStorage.removeItem('tb_questionnaire_chat');

    return project?.id ?? null;
  } catch (err) {
    console.error('[pendingProject] Unexpected error:', err);
    return null;
  }
}

/** Check if there's a pending project waiting to be created */
export function hasPendingProject(): boolean {
  return localStorage.getItem(PENDING_PROJECT_KEY) !== null;
}

/** Get the pending project data for display purposes */
export function getPendingProject(): PendingProjectData | null {
  const raw = localStorage.getItem(PENDING_PROJECT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as PendingProjectData;
  } catch {
    return null;
  }
}
