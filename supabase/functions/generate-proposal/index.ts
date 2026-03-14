// Supabase Edge Function: generate-proposal
// Uses Gemini to generate a professional project proposal from questionnaire data.
// Deploy with: supabase functions deploy generate-proposal
// Required env: GEMINI_API_KEY

import { GoogleGenAI } from 'https://esm.sh/@google/genai@1?target=deno';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ProposalRequest {
  projectId: string;
  projectContext: string;
  questionnaireContext: string;
}

const PROPOSAL_SYSTEM_PROMPT = `Eres un consultor senior de Think Better, un estudio de desarrollo AI-first en Barcelona. Tu trabajo es redactar propuestas de desarrollo profesionales, detalladas y convincentes.

REGLAS:
- Escribe siempre en español (castellano)
- Usa Markdown para formatear
- Sé profesional pero cercano
- La propuesta debe ser detallada y específica al proyecto — NO genérica
- Incluye detalles técnicos concretos basados en el cuestionario
- Los precios y plazos vienen dados — no los inventes, usa los del contexto
- Adapta las funcionalidades y el stack tecnológico al tipo de proyecto

ESTRUCTURA OBLIGATORIA de la propuesta:

# Propuesta para [Nombre del Proyecto]

**Preparada para:** [Nombre del cliente] ([Empresa])
**Plan seleccionado:** [Plan]
**Fecha:** [Fecha actual]

---

## 1. Resumen ejecutivo
(3-5 párrafos explicando qué se va a construir, por qué es importante, y qué valor aporta al negocio del cliente. Personalizado según el cuestionario.)

---

## 2. Alcance del proyecto
(Descripción detallada de lo que incluye el proyecto. Lista específica de funcionalidades organizadas por módulos/secciones.)

### 2.1 Funcionalidades principales
(Lista detallada con descripción de cada funcionalidad)

### 2.2 Funcionalidades secundarias
(Funcionalidades de soporte)

### 2.3 Fuera de alcance
(Lo que NO incluye esta versión — importante para gestionar expectativas)

---

## 3. Stack tecnológico
(Stack concreto adaptado al proyecto. Explica brevemente por qué cada tecnología.)

**Frontend:** (ej. React/Next.js + TypeScript, Tailwind CSS...)
**Backend:** (ej. Supabase con PostgreSQL, Edge Functions...)
**IA:** (si aplica — qué modelos y para qué)
**Infraestructura:** (hosting, CI/CD, monitorización)

---

## 4. Diseño y UX
(Basado en las preferencias del cuestionario: estilo visual, colores, referencias)

---

## 5. Metodología y sprints
(Desglose en sprints concretos de 1-2 semanas cada uno, con entregables específicos por sprint)

| Sprint | Duración | Entregables |
|--------|----------|-------------|
| Sprint 1 | X semanas | ... |
| Sprint 2 | X semanas | ... |
| ... | ... | ... |

---

## 6. Desglose económico

| Concepto | Importe |
|----------|---------|
| Desarrollo (Plan X) | X.XXX € |
| Extras: [detalle] | X.XXX € |
| **Total** | **X.XXX €** |

**Forma de pago:**
- 50% al inicio del proyecto (X.XXX €)
- 50% en la entrega final (X.XXX €)

---

## 7. Plazos de entrega

**Plazo estimado:** X días laborables
**Inicio estimado:** A convenir tras aceptación
**Iteraciones incluidas:** X revisiones sin coste adicional

---

## 8. Garantías y condiciones

- El código fuente es 100% propiedad del cliente desde el primer día
- Garantía de bugs de 30 días tras la entrega sin coste adicional
- Revisiones adicionales: 250 €/iteración
- Despliegue a producción incluido
- Documentación técnica incluida
- Mantenimiento opcional disponible

---

## 9. Próximos pasos

1. Aceptar esta propuesta desde tu panel
2. Realizar el pago de entrada del 50%
3. Reunión de kick-off para validar prioridades
4. ¡Empezamos a construir!

---

*Think Better · Estudio de desarrollo acelerado por IA · Barcelona*
*www.thinkbetter.dev*

IMPORTANTE:
- NO inventes precios — usa EXACTAMENTE los números del contexto del proyecto
- Sé muy específico con las funcionalidades — NO listas genéricas
- Los sprints deben ser realistas y detallados
- Si hay datos de IA (chatbot, automatización), dedica una sección específica
- Si hay e-commerce, detalla flujo de compra, pagos, inventario, etc.
- Si hay multi-idioma, especifica qué idiomas y cómo se gestionan`;

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

    const body: ProposalRequest = await req.json();
    const { projectContext, questionnaireContext } = body;

    if (!projectContext) {
      return new Response(
        JSON.stringify({ error: 'Se requiere projectContext' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    console.log(`[generate-proposal] Generating proposal for project ${body.projectId}`);

    const genai = new GoogleGenAI({ apiKey: geminiKey });

    const userPrompt = `Genera una propuesta de desarrollo profesional para el siguiente proyecto.

CONTEXTO DEL PROYECTO:
${projectContext}

DATOS DEL CUESTIONARIO:
${questionnaireContext}

Genera la propuesta completa en Markdown siguiendo la estructura indicada. Sé específico y detallado, usa los datos reales del cuestionario para personalizar cada sección.`;

    const response = await genai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      config: {
        systemInstruction: PROPOSAL_SYSTEM_PROMPT,
        temperature: 0.7,
        maxOutputTokens: 16384,
      },
    });

    const content = response.text ?? '';

    if (!content) {
      return new Response(
        JSON.stringify({ error: 'Gemini no generó contenido' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    console.log(`[generate-proposal] Generated ${content.length} chars for project ${body.projectId}`);

    return new Response(
      JSON.stringify({ content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    console.error('generate-proposal error:', err);
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
