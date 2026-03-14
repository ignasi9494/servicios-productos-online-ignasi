// Think Better - Questionnaire Analytics
// Tracks sessions, handles abandonment logic, and gathers metrics.

import { supabase, supabaseConfigured } from './supabase';

const ABANDONMENT_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
const STORAGE_KEY = 'tb_questionnaire_engine';

export interface SessionData {
  messages: any[];
  progress: number;
}

export class QuestionnaireAnalytics {
  /**
   * Checks if there's an incomplete session in localStorage.
   */
  static getPendingSession(): SessionData | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      
      const parsed = JSON.parse(raw);
      if (!parsed.isComplete && Array.isArray(parsed.history) && parsed.history.length > 0) {
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Tracks when a user abandons a session by checking the last update time.
   * If a session is incomplete and older than ABANDONMENT_TIMEOUT_MS, it is marked as abandoned in the DB.
   * Currently, this relies on the engine saving timestamps or on the DB's updated_at trigger, 
   * but we can explicitly call this function via a cron or on app load to clean up old stray rows.
   */
  static async cleanupAbandonedSessions() {
    if (!supabaseConfigured) return;

    try {
      const thirtyMinsAgo = new Date(Date.now() - ABANDONMENT_TIMEOUT_MS).toISOString();
      await supabase
        .from('questionnaire_conversations')
        .update({ status: 'abandoned' as const })
        .eq('status', 'in_progress')
        .lt('started_at', thirtyMinsAgo);
    } catch (err) {
      console.warn('[QuestionnaireAnalytics] Failed to cleanup abandoned sessions:', err);
    }
  }
}
