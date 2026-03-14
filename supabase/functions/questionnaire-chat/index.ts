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

    // Enforce Max Conversation Length
    let finalSystemPrompt = systemPrompt;
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
        maxOutputTokens: 2048,
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'object',
          properties: {
            botMessage: { type: 'string', description: 'The bot response text shown to the user' },
            componentToRender: { type: 'string', nullable: true, description: 'Component name to render: CardSelector, MultiSelect, FileUpload, URLInput, ColorPicker, Slider, RatingScale, AudioRecorder, TextArea, or null' },
            componentProps: { type: 'string', nullable: true, description: 'JSON-serialized string with the props for the component. For CardSelector/MultiSelect, include an "options" array of {value, label, description?} objects. For Slider include {min, max, step, minLabel, maxLabel}. For TextArea include {placeholder, maxLength}. For URLInput include {placeholder, max}. Empty string if no component.' },
            isComplete: { type: 'boolean', description: 'True when questionnaire is finished and all required info has been gathered' },
            extractedData: { type: 'string', nullable: true, description: 'JSON-serialized string with structured data extracted from the conversation when isComplete=true. Must include projectType, objective, targetAudience, features, budget, timeline, aiSummary fields.' },
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
      // Parse string-encoded componentProps and extractedData back to objects
      parsed = {
        ...raw,
        componentProps: raw.componentProps
          ? (typeof raw.componentProps === 'string' ? JSON.parse(raw.componentProps) : raw.componentProps)
          : undefined,
        extractedData: raw.extractedData
          ? (typeof raw.extractedData === 'string' ? JSON.parse(raw.extractedData) : raw.extractedData)
          : undefined,
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
