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

    if (!userMessage && !body.selectedOption) {
      return new Response(
        JSON.stringify({ error: 'Se requiere userMessage o selectedOption' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // Build the user content from message + optional context
    let userContent = userMessage ?? '';
    if (body.selectedOption) {
      const sel = Array.isArray(body.selectedOption)
        ? body.selectedOption.join(', ')
        : body.selectedOption;
      userContent = userContent
        ? `${userContent}\n[Seleccion del usuario: ${sel}]`
        : `[Seleccion del usuario: ${sel}]`;
    }
    if (body.uploadedFiles && body.uploadedFiles.length > 0) {
      const fileList = body.uploadedFiles.map((f) => `${f.name} (${f.type})`).join(', ');
      userContent += `\n[Archivos subidos: ${fileList}]`;
    }

    const genai = new GoogleGenAI({ apiKey: geminiKey });

    // Append current user message to history
    const history = [...conversationHistory, { role: 'user' as const, parts: [{ text: userContent }] }];

    const response = await genai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: history,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
        maxOutputTokens: 2048,
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'object',
          properties: {
            botMessage: { type: 'string', description: 'The bot response text shown to the user' },
            componentToRender: { type: 'string', nullable: true, description: 'Component name to render: CardSelector, MultiSelect, FileUpload, URLInput, ColorPicker, Slider, RatingScale, AudioRecorder, TextArea, or null' },
            componentProps: { type: 'object', nullable: true, description: 'Props for the component' },
            isComplete: { type: 'boolean', description: 'True when questionnaire is finished' },
            extractedData: { type: 'object', nullable: true, description: 'Structured data extracted from the conversation when isComplete=true' },
            progressPercent: { type: 'number', description: 'Estimated progress 0-100' },
          },
          required: ['botMessage', 'isComplete', 'progressPercent'],
        },
      },
    });

    const text = response.text ?? '';

    let parsed: ChatResponse;
    try {
      parsed = JSON.parse(text);
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
