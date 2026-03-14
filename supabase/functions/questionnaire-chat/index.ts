// Supabase Edge Function: questionnaire-chat
// Proxies messages to Google Gemini API for the questionnaire chatbot.
// Deploy with: supabase functions deploy questionnaire-chat
// Required env: GEMINI_API_KEY

import { GoogleGenAI } from 'https://esm.sh/@google/genai@1?target=deno';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatRequest {
  sessionId: string;
  userMessage: string;
  selectedOption?: string | string[];
  uploadedFiles?: { name: string; size: number; type: string }[];
  conversationHistory: { role: 'user' | 'model'; parts: { text: string }[] }[];
  systemPrompt: string;
}

interface ChatResponse {
  botMessage: string;
  componentToRender?: string;
  componentProps?: Record<string, unknown>;
  isComplete: boolean;
  extractedData?: Record<string, unknown>;
  progressPercent: number;
}

// Security: In-memory Rate Limiting (per isolate)
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 60;
const ipRequestCounts = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = ipRequestCounts.get(ip);
  if (!record || record.resetAt < now) {
    ipRequestCounts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  record.count += 1;
  return false;
}

// Security: Input Sanitization (strip HTML/Scripts)
function sanitizeHtml(text: string): string {
  if (!text) return text;
  return text.replace(/<\/?[^>]+(>|$)/g, "");
}

const MAX_CONVERSATION_LENGTH = 50;

function safeJsonParse(s: string): Record<string, unknown> | undefined {
  try { return JSON.parse(s); } catch { return undefined; }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const geminiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiKey) {
      return new Response(
        JSON.stringify({ error: 'GEMINI_API_KEY no configurada' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const body: ChatRequest = await req.json();
    const { userMessage, conversationHistory, systemPrompt } = body;

    // Rate Limiting Check
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    if (isRateLimited(ip)) {
      console.warn(`[Security] Rate limit exceeded for IP: ${ip} on session ${body.sessionId}`);
      return new Response(
        JSON.stringify({ error: 'Has superado el límite de mensajes. Por favor, inténtalo más tarde.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    if (!userMessage && !body.selectedOption) {
      return new Response(
        JSON.stringify({ error: 'Se requiere userMessage o selectedOption' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    console.log(`[Chat] Processing message for session ${body.sessionId} from IP ${ip}. Message length: ${userMessage?.length || 0}`);

    // Build the user content from message + optional context and SANITIZE
    let userContent = sanitizeHtml(userMessage ?? '');
    
    if (body.selectedOption) {
      const sel = Array.isArray(body.selectedOption)
        ? body.selectedOption.map(s => sanitizeHtml(s)).join(', ')
        : sanitizeHtml(body.selectedOption);
      userContent = userContent
        ? `${userContent}\n[Seleccion del usuario: ${sel}]`
        : `[Seleccion del usuario: ${sel}]`;
    }
    if (body.uploadedFiles && body.uploadedFiles.length > 0) {
      const fileList = body.uploadedFiles.map((f) => `${f.name} (${f.type})`).join(', ');
      userContent += `\n[Archivos subidos: ${fileList}]`;
    }

    const genai = new GoogleGenAI({ apiKey: geminiKey });

    // Enforce Max Conversation Length and add output formatting rules
    let finalSystemPrompt = systemPrompt + `\n\nCRITICAL OUTPUT RULES:
- The "botMessage" field must contain ONLY plain text for the user. NEVER put JSON inside botMessage.
- Fill each schema field separately: botMessage (text), isComplete (boolean), progressPercent (number), componentProps (object or null), extractedData (object or null).
- Do NOT nest the entire response JSON inside the botMessage field.`;
    if (conversationHistory.length >= MAX_CONVERSATION_LENGTH) {
      console.log(`[Chat] Session ${body.sessionId} hit max length of ${MAX_CONVERSATION_LENGTH}. Forcing closure.`);
      finalSystemPrompt += `\n\nEMERGENCY INSTRUCTION: THE CONVERSATION HAS REACHED ITS MAXIMUM LENGTH OF ${MAX_CONVERSATION_LENGTH} MESSAGES. YOU MUST IMMEDIATELY SUMMARIZE THE PROJECT BASED ON EXISTING DATA, RETURN "isComplete": true, AND GENERATE THE "extractedData" JSON IGNORING ANY MISSING FIELDS. DO NOT ASK ANY MORE QUESTIONS.`;
    }

    // Append current user message to history
    const history = [...conversationHistory, { role: 'user' as const, parts: [{ text: userContent }] }];

    const response = await genai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: history,
      config: {
        systemInstruction: finalSystemPrompt,
        temperature: 0.7,
        maxOutputTokens: 8192,
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'object',
          properties: {
            botMessage: { type: 'string', description: 'The bot response text shown to the user. Plain text only, NOT JSON.' },
            componentToRender: { type: 'string', nullable: true, description: 'Component name to render: CardSelector, MultiSelect, FileUpload, URLInput, ColorPicker, Slider, RatingScale, AudioRecorder, TextArea, or null' },
            componentProps: {
              type: 'object', nullable: true,
              description: 'Props for the component. For CardSelector/MultiSelect: {options: [{value, label, description?}]}. For Slider: {min, max, step, minLabel, maxLabel}. For TextArea: {placeholder, maxLength}. For URLInput: {placeholder, max}. Null if no component.',
            },
            isComplete: { type: 'boolean', description: 'True when questionnaire is finished and all required info has been gathered' },
            extractedData: {
              type: 'object', nullable: true,
              description: 'Structured data extracted from the conversation when isComplete=true. Null when isComplete=false.',
              properties: {
                projectType: { type: 'string', description: 'landing|web_corporativa|ecommerce|saas|app_movil|automatizacion|dashboard|marketplace|otro' },
                isNew: { type: 'boolean', description: 'True if new project, false if redesign/improvement' },
                existingUrl: { type: 'string', nullable: true },
                objective: { type: 'string', description: 'Main objective of the project' },
                targetAudience: {
                  type: 'object',
                  properties: {
                    type: { type: 'string', description: 'B2B|B2C|ambos' },
                    description: { type: 'string' },
                  },
                },
                features: {
                  type: 'object',
                  properties: {
                    auth: { type: 'string', description: 'none|basic|roles' },
                    authSocial: { type: 'boolean' },
                    payments: { type: 'string', description: 'none|one-time|recurring' },
                    admin: { type: 'string', description: 'none|basic|advanced' },
                    database: { type: 'string', description: 'none|simple|complex' },
                    integrations: { type: 'array', items: { type: 'string' } },
                    ai: { type: 'array', items: { type: 'string' } },
                    languages: { type: 'number' },
                    blog: { type: 'boolean' },
                    ecommerce: { type: 'boolean' },
                    inventory: { type: 'boolean' },
                    shipping: { type: 'boolean' },
                    pushNotifications: { type: 'boolean' },
                    seo: { type: 'boolean' },
                    mobilePlatforms: { type: 'number' },
                    pages: { type: 'number' },
                    screens: { type: 'number' },
                  },
                },
                design: {
                  type: 'object',
                  properties: {
                    hasIdentity: { type: 'boolean' },
                    colors: { type: 'array', items: { type: 'object', properties: { role: { type: 'string' }, hex: { type: 'string' } } } },
                    references: { type: 'array', items: { type: 'string' } },
                    referenceNotes: { type: 'string', nullable: true },
                    style: { type: 'string', description: 'minimalista|corporativo|moderno_bold|tech_dark|colorido|premium' },
                  },
                },
                content: {
                  type: 'object',
                  properties: {
                    hasContent: { type: 'boolean' },
                    needsCreation: { type: 'boolean' },
                  },
                },
                competition: {
                  type: 'object',
                  properties: {
                    competitors: { type: 'array', items: { type: 'string' } },
                    differentiators: { type: 'string' },
                  },
                },
                timeline: {
                  type: 'object',
                  properties: {
                    deadline: { type: 'string', description: 'Date or "flexible"' },
                    urgentDeadline: { type: 'boolean' },
                  },
                },
                budget: {
                  type: 'object',
                  properties: {
                    min: { type: 'number' },
                    max: { type: 'number' },
                    flexible: { type: 'boolean' },
                    preferQuoteFirst: { type: 'boolean' },
                  },
                },
                decisionMaker: { type: 'string', description: 'solo yo|socio|jefe|inversor|comite' },
                additionalNotes: { type: 'string', nullable: true },
                userName: { type: 'string' },
                companyName: { type: 'string' },
                aiSummary: { type: 'string', description: 'Executive summary of 3-5 sentences describing the project' },
              },
              required: ['projectType', 'isNew', 'objective', 'targetAudience', 'features', 'design', 'timeline', 'budget', 'userName', 'companyName', 'aiSummary'],
            },
            progressPercent: { type: 'number', description: 'Estimated completion progress from 0 to 100' },
          },
          required: ['botMessage', 'isComplete', 'progressPercent'],
        },
      },
    });

    const text = response.text ?? '';

    let parsed: ChatResponse;
    try {
      const raw = JSON.parse(text);

      // Guard: Gemini double-encoding bug — sometimes nests entire response inside botMessage
      if (typeof raw.botMessage === 'string' && raw.botMessage.trim().startsWith('{')) {
        try {
          const inner = JSON.parse(raw.botMessage);
          if (inner && typeof inner.botMessage === 'string') {
            Object.assign(raw, inner);
          }
        } catch {
          // Inner JSON truncated/malformed — extract fields from original raw text
          // The raw `text` still has proper JSON escaping, so regex works reliably
          console.warn('[questionnaire-chat] Double-encoded botMessage detected, extracting from raw text');

          // Find the INNER botMessage value (escaped) within the raw text
          // Pattern: \"botMessage\" : \"<captured>\" (inside the outer botMessage string)
          const innerMsgMatch = text.match(/\\"botMessage\\"\s*:\s*\\"((?:[^\\]|\\[^"])*)\\"/);
          if (innerMsgMatch) {
            raw.botMessage = innerMsgMatch[1]
              .replace(/\\\\n/g, '\n')
              .replace(/\\\\"/g, '"')
              .replace(/\\\\\\\\/g, '\\')
              .replace(/\\n/g, '\n')
              .replace(/\\"/g, '"');
          }

          // Extract isComplete — use the LAST match (inner value, not outer)
          const completeMatches = [...text.matchAll(/"isComplete"\s*:\s*(true|false)/g)];
          if (completeMatches.length > 0) {
            raw.isComplete = completeMatches[completeMatches.length - 1][1] === 'true';
          }

          // Extract progressPercent — use the LAST match
          const progressMatches = [...text.matchAll(/"progressPercent"\s*:\s*(\d+)/g)];
          if (progressMatches.length > 0) {
            raw.progressPercent = parseInt(progressMatches[progressMatches.length - 1][1], 10);
          }
        }
      }

      // componentProps and extractedData are now objects (not strings) thanks to the schema change
      // But handle legacy string format just in case
      const componentProps = raw.componentProps
        ? (typeof raw.componentProps === 'string' ? safeJsonParse(raw.componentProps) : raw.componentProps)
        : undefined;

      const extractedData = raw.extractedData
        ? (typeof raw.extractedData === 'string' ? (safeJsonParse(raw.extractedData) ?? { _raw: raw.extractedData, aiSummary: raw.botMessage }) : raw.extractedData)
        : undefined;

      parsed = {
        botMessage: raw.botMessage ?? '',
        isComplete: raw.isComplete ?? false,
        progressPercent: raw.progressPercent ?? Math.min(95, conversationHistory.length * 3),
        componentToRender: raw.componentToRender ?? undefined,
        componentProps,
        extractedData,
      };
    } catch {
      // If Gemini doesn't return valid JSON, wrap the text as botMessage
      parsed = {
        botMessage: text,
        isComplete: false,
        progressPercent: Math.min(95, conversationHistory.length * 3),
      };
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    console.error('questionnaire-chat error:', err);
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
