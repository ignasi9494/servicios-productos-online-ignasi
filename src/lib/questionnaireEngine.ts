// Think Better - Questionnaire Chat Engine
// Manages conversation state, sends messages to the Edge Function,
// and handles component rendering/completion.

import { supabase, supabaseConfigured } from './supabase';
import type { ChatMessageData } from '../components/questionnaire/ChatMessage';

// ── Types ──────────────────────────────────────────────────────────
export interface ConversationMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface EngineResponse {
  botMessage: string;
  componentToRender?: string;
  componentProps?: Record<string, unknown>;
  isComplete: boolean;
  extractedData?: Record<string, unknown>;
  progressPercent: number;
}

interface EngineState {
  sessionId: string;
  history: ConversationMessage[];
  extractedData: Record<string, unknown> | null;
  isComplete: boolean;
  progress: number;
}

const STORAGE_KEY = 'tb_questionnaire_engine';
const RATE_LIMIT_MS = 1000; // min 1s between messages

// ── Engine ─────────────────────────────────────────────────────────
export class QuestionnaireEngine {
  private state: EngineState;
  private lastSendTime = 0;
  private systemPrompt: string;
  private edgeFunctionUrl: string | null;

  constructor(systemPrompt: string) {
    this.systemPrompt = systemPrompt;
    this.state = this.loadState() ?? {
      sessionId: crypto.randomUUID(),
      history: [],
      extractedData: null,
      isComplete: false,
      progress: 0,
    };

    // Build Edge Function URL from Supabase config
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    this.edgeFunctionUrl = supabaseUrl
      ? `${supabaseUrl}/functions/v1/questionnaire-chat`
      : null;
  }

  get sessionId() { return this.state.sessionId; }
  get progress() { return this.state.progress; }
  get isComplete() { return this.state.isComplete; }
  get extractedData() { return this.state.extractedData; }
  get history() { return this.state.history; }

  /**
   * Send a user message (text, selection, files) and get the bot response.
   */
  async sendMessage(params: {
    text?: string;
    selectedOption?: string | string[];
    uploadedFiles?: { name: string; size: number; type: string }[];
  }): Promise<EngineResponse> {
    // Rate limiting
    const now = Date.now();
    const wait = RATE_LIMIT_MS - (now - this.lastSendTime);
    if (wait > 0) {
      await delay(wait);
    }
    this.lastSendTime = Date.now();

    const userText = params.text ?? '';

    // Build display text for history
    let historyText = userText;
    if (params.selectedOption) {
      const sel = Array.isArray(params.selectedOption)
        ? params.selectedOption.join(', ')
        : params.selectedOption;
      historyText = historyText ? `${historyText}\n[Seleccion: ${sel}]` : `[Seleccion: ${sel}]`;
    }
    if (params.uploadedFiles?.length) {
      const names = params.uploadedFiles.map((f) => f.name).join(', ');
      historyText += `\n[Archivos: ${names}]`;
    }

    // Try Edge Function first, fall back to local mock
    let response: EngineResponse;
    try {
      response = await this.callEdgeFunction({
        userMessage: userText,
        selectedOption: params.selectedOption,
        uploadedFiles: params.uploadedFiles,
      });
      // Defensive: if botMessage looks like raw JSON, extract the real message
      response = sanitizeEngineResponse(response);
    } catch (err) {
      console.warn('[QuestionnaireEngine] Edge Function failed, using fallback:', err);
      response = this.fallbackResponse(historyText);
    }

    // Update history with user message and model response
    this.state.history.push({ role: 'user', parts: [{ text: historyText }] });
    this.state.history.push({ role: 'model', parts: [{ text: response.botMessage }] });

    // Ensure progressPercent always increases and never stays at 0 after a user message.
    // If AI returns 0 or less than current progress, compute from conversation length instead.
    const minProgress = Math.min(95, Math.ceil(this.state.history.length / 2) * 5);
    if (!response.progressPercent || response.progressPercent < this.state.progress) {
      response = { ...response, progressPercent: Math.max(this.state.progress, minProgress) };
    }

    this.state.progress = response.progressPercent;
    this.state.isComplete = response.isComplete;
    if (response.extractedData) {
      this.state.extractedData = response.extractedData;
    }

    this.saveState();
    this.persistToSupabase();

    return response;
  }

  /**
   * Reset the conversation (start fresh).
   */
  reset() {
    this.state = {
      sessionId: crypto.randomUUID(),
      history: [],
      extractedData: null,
      isComplete: false,
      progress: 0,
    };
    localStorage.removeItem(STORAGE_KEY);
  }

  // ── Private ───────────────────────────────────────────────────

  private async callEdgeFunction(params: {
    userMessage: string;
    selectedOption?: string | string[];
    uploadedFiles?: { name: string; size: number; type: string }[];
  }): Promise<EngineResponse> {
    if (!this.edgeFunctionUrl) {
      throw new Error('Edge Function URL not configured');
    }

    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30_000); // 30s timeout

    try {
      const res = await fetch(this.edgeFunctionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${anonKey}`,
          'apikey': anonKey,
        },
        body: JSON.stringify({
          sessionId: this.state.sessionId,
          userMessage: params.userMessage,
          selectedOption: params.selectedOption,
          uploadedFiles: params.uploadedFiles,
          conversationHistory: this.state.history,
          systemPrompt: this.systemPrompt,
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error(err.error ?? `HTTP ${res.status}`);
      }

      return await res.json();
    } finally {
      clearTimeout(timeout);
    }
  }

  /**
   * Fallback when Edge Function is unavailable.
   * Provides a basic conversational flow using static responses.
   */
  private fallbackResponse(userText: string): EngineResponse {
    const questionNum = Math.floor(this.state.history.length / 2) + 1;
    const progress = Math.min(95, questionNum * 5);

    const fallbackFlows: Record<number, EngineResponse> = {
      1: {
        botMessage: '¡Encantado de conocerte! Para empezar, ¿qué tipo de proyecto tienes en mente?',
        componentToRender: 'CardSelector',
        componentProps: {
          options: [
            { value: 'landing', label: 'Landing Page', description: 'Pagina de presentacion' },
            { value: 'web_corporativa', label: 'Web Corporativa', description: 'Sitio multi-pagina' },
            { value: 'ecommerce', label: 'E-Commerce', description: 'Tienda online' },
            { value: 'saas', label: 'App Web / SaaS', description: 'Plataforma web' },
            { value: 'app_movil', label: 'App Movil', description: 'iOS / Android' },
            { value: 'automatizacion', label: 'Automatizacion', description: 'Procesos y flujos' },
          ],
        },
        isComplete: false,
        progressPercent: progress,
      },
      2: {
        botMessage: '¿Es un proyecto nuevo o una mejora de algo que ya existe? Si existe, compartenos la URL actual.',
        isComplete: false,
        progressPercent: progress,
      },
      3: {
        botMessage: '¿Cual es el objetivo principal del proyecto? (vender productos, captar leads, gestionar procesos, ofrecer un servicio...)',
        isComplete: false,
        progressPercent: progress,
      },
      4: {
        botMessage: '¿Quien es tu publico objetivo? Cuentame sobre el perfil de tus clientes ideales.',
        isComplete: false,
        progressPercent: progress,
      },
      5: {
        botMessage: '¿Cuales son las funcionalidades principales que necesitas?',
        componentToRender: 'MultiSelect',
        componentProps: {
          options: [
            { value: 'auth', label: 'Registro/Login usuarios' },
            { value: 'payments', label: 'Pagos online' },
            { value: 'admin', label: 'Panel de administracion' },
            { value: 'blog', label: 'Blog/Noticias' },
            { value: 'chat', label: 'Chat/Mensajeria' },
            { value: 'notifications', label: 'Notificaciones' },
            { value: 'search', label: 'Buscador' },
            { value: 'analytics', label: 'Analiticas/Dashboard' },
            { value: 'api', label: 'API publica' },
            { value: 'multilang', label: 'Multi-idioma' },
          ],
        },
        isComplete: false,
        progressPercent: progress,
      },
      6: {
        botMessage: '¿Tienes una identidad visual definida (logo, colores corporativos)?',
        componentToRender: 'ColorPicker',
        componentProps: {},
        isComplete: false,
        progressPercent: progress,
      },
      7: {
        botMessage: '¿Hay webs o apps que te gusten como referencia de diseno? Compartenos los enlaces.',
        componentToRender: 'URLInput',
        componentProps: { placeholder: 'https://ejemplo.com', max: 5 },
        isComplete: false,
        progressPercent: progress,
      },
      8: {
        botMessage: '¿Tienes documentos, wireframes o bocetos que nos ayuden a entender mejor tu proyecto?',
        componentToRender: 'FileUpload',
        componentProps: {},
        isComplete: false,
        progressPercent: progress,
      },
      9: {
        botMessage: '¿Cual es tu presupuesto orientativo para este proyecto?',
        componentToRender: 'Slider',
        componentProps: {
          min: 1500, max: 30000, step: 500, defaultValue: 5000,
          minLabel: '1.500€', maxLabel: '30.000€+',
          formatValue: (v: number) => `${v.toLocaleString('es-ES')}€`,
        },
        isComplete: false,
        progressPercent: progress,
      },
      10: {
        botMessage: '¿Tienes una fecha limite o es flexible? ¿Hay algo mas que quieras contarnos?',
        componentToRender: 'TextArea',
        componentProps: { placeholder: 'Cuentanos los detalles adicionales...', maxLength: 2000 },
        isComplete: false,
        progressPercent: progress,
      },
    };

    if (questionNum > 10) {
      return {
        botMessage: 'Gracias por toda la informacion. Estamos preparando tu presupuesto estimado...',
        isComplete: true,
        extractedData: { aiSummary: 'Datos recogidos en modo offline. Se procesaran cuando el servicio este disponible.' },
        progressPercent: 100,
      };
    }

    return fallbackFlows[questionNum] ?? {
      botMessage: 'Gracias por la informacion. Dejame anotar eso. ¿Hay algo mas que quieras anadir?',
      isComplete: false,
      progressPercent: progress,
    };
  }

  private loadState(): EngineState | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  private saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
  }

  /** Persist conversation to Supabase (fire-and-forget) */
  private async persistToSupabase() {
    if (!supabaseConfigured) return;
    try {
      const aiSummary = this.state.extractedData?.aiSummary as string | undefined;
      // Don't persist the offline fallback placeholder as real AI data
      const isOfflineFallback = aiSummary?.startsWith('Datos recogidos en modo offline');
      const realAiSummary = isOfflineFallback ? undefined : aiSummary;
      const realExtractedData = isOfflineFallback ? null : this.state.extractedData;
      await supabase.from('questionnaire_conversations').upsert({
        session_id: this.state.sessionId,
        messages_json: this.state.history,
        ...(realExtractedData !== null ? { extracted_data_json: realExtractedData } : {}),
        ...(realAiSummary ? { ai_summary: realAiSummary } : {}),
        status: this.state.isComplete ? 'completed' : 'in_progress',
        ...(this.state.isComplete ? { completed_at: new Date().toISOString() } : {}),
      }, { onConflict: 'session_id' });
    } catch (err) {
      console.warn('[QuestionnaireEngine] Failed to persist to Supabase:', err);
    }
  }
}

// ── Helpers ────────────────────────────────────────────────────────
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Defensive guard: if the Edge Function fallback returned raw JSON as botMessage
 * (e.g. because inner parsing of extractedData failed), extract the real fields.
 */
function sanitizeEngineResponse(response: EngineResponse): EngineResponse {
  if (
    typeof response.botMessage === 'string' &&
    response.botMessage.trim().startsWith('{')
  ) {
    // Try full JSON parse first
    try {
      const inner = JSON.parse(response.botMessage);
      if (inner && typeof inner.botMessage === 'string') {
        return {
          botMessage: inner.botMessage,
          isComplete: inner.isComplete ?? response.isComplete,
          progressPercent: inner.progressPercent ?? response.progressPercent,
          componentToRender: inner.componentToRender ?? response.componentToRender,
          componentProps: inner.componentProps
            ? (typeof inner.componentProps === 'string' ? tryParse(inner.componentProps) : inner.componentProps)
            : response.componentProps,
          extractedData: inner.extractedData
            ? (typeof inner.extractedData === 'string' ? tryParse(inner.extractedData) : inner.extractedData)
            : response.extractedData,
        };
      }
    } catch {
      // JSON is truncated/malformed — extract fields with regex
      const nestedStr = response.botMessage;
      const msgMatch = nestedStr.match(/"botMessage"\s*:\s*"((?:[^"\\]|\\.)*)"/);
      if (msgMatch) {
        const extracted: EngineResponse = {
          ...response,
          botMessage: msgMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\'),
        };
        const completeMatch = nestedStr.match(/"isComplete"\s*:\s*(true|false)/);
        if (completeMatch) extracted.isComplete = completeMatch[1] === 'true';
        const progressMatch = nestedStr.match(/"progressPercent"\s*:\s*(\d+)/);
        if (progressMatch) extracted.progressPercent = parseInt(progressMatch[1], 10);
        // Try extractedData
        const dataMatch = nestedStr.match(/"extractedData"\s*:\s*"((?:[^"\\]|\\.)*)"/);
        if (dataMatch) {
          extracted.extractedData = tryParse(dataMatch[1].replace(/\\"/g, '"').replace(/\\\\/g, '\\'));
        }
        return extracted;
      }
    }
  }
  return response;
}

function tryParse(s: string): Record<string, unknown> | undefined {
  try { return JSON.parse(s); } catch { return { _raw: s }; }
}

/**
 * Convert engine responses to ChatMessageData for the UI.
 */
export function engineResponseToChatMessage(
  response: EngineResponse,
  onComponentComplete?: (messageId: string, data: unknown) => void,
): ChatMessageData {
  const id = `bot-${Date.now()}`;
  return {
    id,
    role: 'bot',
    content: response.botMessage ?? '',
    timestamp: Date.now(),
    component: response.componentToRender ?? undefined,
    componentProps: response.componentProps ?? undefined,
    onComponentComplete: onComponentComplete
      ? (data: unknown) => onComponentComplete(id, data)
      : undefined,
  };
}
