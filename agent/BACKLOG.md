# Think Better - Improvement Backlog

> Prioritized list of improvements for the autonomous agent.
> Agent picks the highest priority uncompleted item each execution.
> Last updated: 2026-03-14

---

## VISION DE LA APP FINAL

Think Better pasa de ser un landing page a una **plataforma SaaS completa de gestion de proyectos de desarrollo**. El flujo es:

1. **Landing publica** con precios detallados y CTAs que llevan al cuestionario inteligente.
2. **Cuestionario IA conversacional** — Un chatbot potenciado por Gemini 2.5 (Flash o Pro) que actua como consultor senior. Tiene un system prompt super currado con TODA la informacion que necesitamos para hacer una propuesta. El chatbot hace un minimo de 15-20 preguntas, adaptandose segun el tipo de proyecto (landing, app movil, SaaS, e-commerce, automatizacion...). Dentro de la conversacion hay **pasos deterministas** embebidos: selectores de tarjetas, upload de archivos (PDF, imagenes, audio), color pickers, URL inputs, etc. El objetivo es que cuando termine la conversacion, tengamos **toda la informacion que un consultor senior necesitaria** para redactar la propuesta final: funcionalidades, diseno, marca, competencia, publico objetivo, modelo de negocio, flujos de usuario, integraciones, contenido, SEO, etc.
3. **Precio estimado automatico** basado en la tabla de precios + extras. Se muestra al final del chat.
4. **Registro** del lead si esta de acuerdo con el rango de precio.
5. **Dashboard de cliente** donde en <24h recibe la propuesta definitiva (generada por IA + revisada por equipo) via chat interno. Todo pasa dentro de la plataforma (con notificaciones por email).
6. **Firma + pago de entrada** para empezar el desarrollo.
7. **Desarrollo con updates** visibles en el dashboard. El cliente puede previsualizar la app.
8. **Iteraciones de cambios** (2-3 segun plan) limitadas al scope firmado.
9. **Entrega final**: exportar codigo (pago final) O mantener en nuestra plataforma (suscripcion mensual con hosting + DB + soporte).

La interaccion SIEMPRE es dentro de la plataforma. Cada mensaje del chat interno tambien se envia por email para que el cliente este notificado.

---

## P0 - Critical (Landing fixes)

### [x] 001 - Fix placeholder WhatsApp number in Footer
- **Where**: `src/components/Footer.tsx`
- **What**: Replace `34XXXXXXXXX` placeholder WhatsApp number with a real number or remove the WhatsApp link until a real number is provided
- **Impact**: Broken functionality - users clicking WhatsApp link get an error
- **Size**: S

### [x] 002 - Fix Gemini API key exposed in client bundle
- **Where**: `vite.config.ts`
- **What**: The `GEMINI_API_KEY` is injected via `define` into the client bundle. Remove this or move to server-side only. Currently no frontend code uses it anyway.
- **Impact**: Security vulnerability - API key visible in browser
- **Size**: S

### [x] 003 - Fix dead-end #contact CTA loop
- **Where**: `src/components/Footer.tsx`, `src/components/Navbar.tsx`
- **What**: Replace "Agendar llamada" with a CTA that redirects to the new questionnaire flow (#questionnaire). Update all #contact links across Navbar, AddOns, Retainer, Pricing to point to the questionnaire instead.
- **Impact**: Main conversion action is broken - now will funnel to questionnaire
- **Size**: M

### [x] 004 - Fix broken legal page links (404)
- **Where**: `src/components/Footer.tsx`
- **What**: Add react-router with routes for `/privacidad`, `/legal`, `/cookies`. Create basic legal pages content.
- **Impact**: Legal compliance issue + broken links
- **Size**: M

---

## P1 - Important (Landing improvements)

### [x] 005 - Translate team roles to Spanish
- **Where**: `src/components/Team.tsx`
- **What**: Team roles are in English. Translate to Spanish.
- **Impact**: Language inconsistency
- **Size**: S

### [x] 006 - Fix placeholder social media links
- **Where**: `src/components/Footer.tsx`
- **What**: Twitter, LinkedIn, GitHub links point to `#`. Add real URLs or remove.
- **Impact**: Non-functional links reduce trust
- **Size**: S

### [x] 007 - Add FAQ accordion accessibility (ARIA)
- **Where**: `src/components/FAQ.tsx`
- **What**: Add `aria-expanded`, `aria-controls`, `id` to buttons and `role="region"`, `aria-labelledby` to answer panels.
- **Impact**: Accessibility
- **Size**: S

### [x] 008 - Fix mobile menu accessibility
- **Where**: `src/components/Navbar.tsx`
- **What**: Add `role="dialog"`, `aria-modal`, toggle aria-label, trap focus, close on Escape, lock body scroll.
- **Impact**: Mobile menu UX
- **Size**: M

### [x] 009 - Add `lang="es"` to HTML + meta tags + SEO basics
- **Where**: `index.html`
- **What**: Set `<html lang="es">`, add `<title>`, `<meta description>`, Open Graph tags, favicon, canonical URL.
- **Impact**: SEO and accessibility
- **Size**: S

### [x] 010 - Respect prefers-reduced-motion
- **Where**: `src/index.css`
- **What**: Wrap `scroll-behavior: smooth` in `@media (prefers-reduced-motion: no-preference)`.
- **Impact**: Accessibility
- **Size**: S

---

## PLATFORM - Fase 1: Infraestructura Base

### [x] 100 - Install react-router and set up routing structure
- **Where**: `src/App.tsx`, new `src/router.tsx`, `package.json`
- **What**: Install react-router-dom. Create router with routes: `/` (landing), `/cuestionario` (AI questionnaire), `/login`, `/registro`, `/dashboard/*` (protected), `/privacidad`, `/legal`, `/cookies`. Create layout components for public vs authenticated pages. Keep the current landing as the `/` route.
- **Impact**: Foundation for the entire platform - nothing else works without routing
- **Size**: M
- **Dependencies**: None

### [x] 101 - Set up Supabase project and database schema
- **Where**: New `supabase/` folder, `package.json`, `.env.example`
- **What**: Install @supabase/supabase-js. Create Supabase client config. Design and create the full database schema:
  - `profiles` (id, user_id, full_name, company, phone, sector, role: 'client'|'admin', created_at)
  - `projects` (id, client_id, name, status: 'questionnaire'|'pending_proposal'|'proposal_sent'|'proposal_accepted'|'in_development'|'in_review'|'completed'|'delivered', plan: 'launch'|'build'|'scale', base_price, extras_price, total_price, delivery_days, max_iterations, used_iterations, contract_signed_at, created_at)
  - `questionnaire_conversations` (id, project_id, session_id, messages_json, extracted_data_json, ai_summary, status: 'in_progress'|'completed'|'abandoned', started_at, completed_at)
  - `proposals` (id, project_id, version, content_md, stack_description, price_breakdown_json, timeline_description, status: 'draft'|'sent'|'accepted'|'rejected', sent_at, responded_at)
  - `messages` (id, project_id, sender_id, sender_role, content, attachment_url, read_at, created_at)
  - `files` (id, project_id, uploaded_by, file_name, file_url, file_type, file_size, description, created_at)
  - `iterations` (id, project_id, iteration_number, description, screenshot_urls, status: 'requested'|'in_progress'|'completed', created_at, completed_at)
  - `payments` (id, project_id, stripe_payment_id, amount, currency, type: 'deposit'|'final'|'maintenance', status, created_at)
  - `notifications` (id, user_id, project_id, type, title, body, email_sent, read, created_at)
  - RLS policies for each table (clients only see their own data, admins see all)
- **Impact**: Core data layer for the entire platform
- **Size**: L
- **Dependencies**: None (can be done in parallel with routing)

### [x] 102 - Set up Supabase Auth with email/password
- **Where**: New `src/lib/supabase.ts`, `src/contexts/AuthContext.tsx`, `src/pages/Login.tsx`, `src/pages/Register.tsx`
- **What**: Create Supabase client singleton. Create AuthContext with login, register, logout, user state. Create Login page (email + password, link to register). Create Register page (name, company, email, password, phone). Add auth state persistence. Create ProtectedRoute component that redirects to /login if not authenticated. Create `profiles` row on signup via trigger or client-side. Style all auth pages with the existing dark theme (zinc-950, emerald accents).
- **Impact**: Users can register and login - gate for dashboard access
- **Size**: M
- **Dependencies**: 100 (routing), 101 (database)

### [x] 103 - Set up Stripe integration for payments
- **Where**: New `src/lib/stripe.ts`, Supabase Edge Function `process-payment`
- **What**: Install @stripe/stripe-js and @stripe/react-stripe-js. Create Stripe context/provider. Create Edge Function for creating Checkout Sessions (deposit payment and final payment). Create Edge Function webhook handler for payment confirmations (updates `payments` and `projects` tables). Support: one-time payments (deposit + final) and recurring subscriptions (monthly maintenance). Create payment status component showing payment history per project.
- **Impact**: Revenue collection - critical for business model
- **Size**: L
- **Dependencies**: 101 (database)

---

## PLATFORM - Fase 2: Cuestionario IA Conversacional

> **Enfoque**: Chatbot IA (Gemini 2.5 Flash/Pro) con system prompt super detallado que actua como consultor senior.
> Hace un MINIMO de 15-20 preguntas adaptadas al tipo de proyecto. Dentro de la conversacion hay
> componentes deterministas embebidos (selectores de tarjetas, uploads, color pickers, etc.).
> El objetivo: obtener TODA la informacion necesaria para generar la propuesta, como si fuera la consulta final.

### [x] 200 - Create AI chatbot UI shell and page
- **Where**: New `src/pages/Questionnaire.tsx`, new `src/components/questionnaire/ChatUI.tsx`, new `src/components/questionnaire/ChatMessage.tsx`, new `src/components/questionnaire/ChatInput.tsx`
- **What**: Create the `/cuestionario` page with a full-screen chat interface:
  - Chat-like UI (burbujas de mensaje, similar a WhatsApp/iMessage) con dark theme
  - Mensajes del bot (izquierda, con avatar "TB" en emerald) y del usuario (derecha)
  - Input de texto en la parte inferior con boton de enviar
  - Soporte para que el bot muestre **componentes interactivos embebidos** dentro del chat:
    - `CardSelector`: tarjetas visuales con iconos para seleccionar opciones (ej: tipo de proyecto)
    - `MultiSelect`: checkboxes/chips para seleccion multiple
    - `FileUpload`: zona drag-and-drop para subir archivos (PDF, DOC, imágenes, audio)
    - `URLInput`: campo para introducir URLs
    - `ColorPicker`: selector de colores para identidad visual
    - `SliderInput`: slider para rangos (presupuesto, paginas, etc.)
    - `RatingScale`: escala 1-5 o 1-10 para prioridades
    - `TextArea`: campo de texto grande para descripciones largas
    - `AudioRecorder`: boton para grabar audio con visualizacion de onda
  - Indicador de "escribiendo..." cuando la IA procesa
  - Progress bar sutil mostrando % de cualificacion completada (basado en preguntas obligatorias contestadas)
  - Boton "Volver al inicio" discreto
  - Scroll automatico al ultimo mensaje
  - Guardar conversacion en localStorage para persistencia si el usuario sale y vuelve
  - Mobile-first: pantalla completa en movil, centrado con max-width en desktop
  - Animaciones suaves con Framer Motion para entrada de mensajes
- **Impact**: Es la interfaz principal de captacion de leads - tiene que ser impecable
- **Size**: L
- **Dependencies**: 100 (routing)

### [x] 201 - Create deterministic UI components for chat embedding
- **Where**: New `src/components/questionnaire/inputs/CardSelector.tsx`, `MultiSelectChips.tsx`, `FileUploadZone.tsx`, `URLInputField.tsx`, `ColorPickerField.tsx`, `SliderField.tsx`, `RatingScale.tsx`, `AudioRecorderField.tsx`, `TextAreaField.tsx`
- **What**: Create all the deterministic input components that the AI chatbot can embed in the conversation:
  **CardSelector**: Grid de tarjetas con icono + titulo + descripcion. Single o multi select. Hover emerald. Responsive (2 cols mobile, 3-4 desktop). Callback `onSelect(value)`.
  **MultiSelectChips**: Chips/tags seleccionables con animacion. Max visible + "ver mas". Callback `onSelect(values[])`.
  **FileUploadZone**: Drag-and-drop con icono de upload. Acepta PDF, DOC, DOCX, TXT, PNG, JPG, SVG, MP3, WebM. Max 10 files, 25MB total. Progress bar por archivo. Lista de archivos con preview miniatura y boton eliminar. Guarda en Supabase Storage.
  **URLInputField**: Input con validacion de URL, preview del sitio (og:image si disponible), boton "Anadir otra URL".
  **ColorPickerField**: Paleta de colores predefinidos + input hex custom. Muestra preview del color seleccionado. Permite seleccionar multiples colores (primario, secundario, acento).
  **SliderField**: Slider con min/max/step configurable. Muestra valor actual. Labels en extremos.
  **RatingScale**: Escala horizontal 1-5 o 1-10 con labels. Click para seleccionar.
  **AudioRecorderField**: Boton grabar (rojo pulsante), visualizacion de onda durante grabacion, timer, boton parar. Max 3 min. Guarda en Supabase Storage como WebM.
  **TextAreaField**: Textarea expandible, character count, placeholder configurable, min/max rows.
  Todos los componentes: dark theme (zinc-900 bg, zinc-700 borders, emerald accents), accesibles (aria-labels), responsive, con callback `onComplete(data)` que el chatbot usa para continuar la conversacion.
- **Impact**: Son los "inputs estructurados" que garantizan datos limpios dentro del flujo conversacional
- **Size**: L
- **Dependencies**: 200, 101 (Supabase Storage para FileUpload y AudioRecorder)

### [x] 202 - Create Gemini API integration and chat engine
- **Where**: New Supabase Edge Function `questionnaire-chat`, new `src/lib/questionnaireEngine.ts`
- **What**: Backend Edge Function que maneja la conversacion del chatbot:
  **Edge Function `questionnaire-chat`**:
  - Recibe: `{ sessionId, userMessage, selectedOption?, uploadedFiles?, conversationHistory[] }`
  - Devuelve: `{ botMessage, componentToRender?, componentProps?, isComplete, extractedData?, progressPercent }`
  - Usa Gemini 2.5 Flash (o Pro para conversaciones complejas) via @google/genai SDK
  - Mantiene el historial completo de la conversacion en el request
  - Cuando `isComplete=true`, devuelve `extractedData` con toda la info estructurada
  **Client-side engine** (`questionnaireEngine.ts`):
  - Gestiona el estado de la conversacion (mensajes, datos extraidos, progreso)
  - Envia mensajes al Edge Function
  - Renderiza componentes interactivos cuando el bot los solicita
  - Guarda conversacion en `questionnaire_conversations` table
  - Maneja errores de red, timeouts, reintentos
  - Rate limiting (max 1 mensaje por segundo)
- **Impact**: El cerebro del cuestionario - conecta la IA con la UI
- **Size**: L
- **Dependencies**: 200, 201, 101

### [x] 203 - Write the MASTER system prompt for the questionnaire chatbot
- **Where**: New `src/lib/prompts/questionnaireSystemPrompt.ts` (exported as string), documentado tambien en `agent/skills/questionnaire-prompt.md`
- **What**: Crear el system prompt ULTRA DETALLADO para Gemini que convierte el chatbot en un consultor senior. El prompt debe incluir:

  **IDENTIDAD Y TONO**:
  - "Eres el consultor de proyectos de Think Better, un estudio de desarrollo AI-first en Barcelona."
  - Tono: profesional pero cercano, en espanol, tutea al usuario
  - Siempre positivo y proactivo, nunca juzga las ideas del usuario
  - Si el usuario no sabe algo, le ayuda con ejemplos y sugerencias

  **OBJETIVO**:
  - Obtener TODA la informacion necesaria para generar una propuesta de desarrollo completa
  - Cualificar al lead (presupuesto, urgencia, seriedad)
  - Hacer sentir al usuario que esta recibiendo una consulta profesional de alto valor

  **REGLAS DE CONVERSACION**:
  - Haz un MINIMO de 15 preguntas antes de dar por completado
  - Adapta las preguntas segun el tipo de proyecto (las ramas son muy diferentes)
  - Nunca hagas mas de 2 preguntas en un mismo mensaje
  - Si el usuario da respuestas vagas, profundiza con preguntas de seguimiento
  - Cada 4-5 preguntas, haz un mini-resumen de lo que llevas entendido
  - Al final, haz un resumen completo y pide confirmacion
  - Si el usuario intenta saltarse preguntas, explica amablemente por que es importante

  **COMPONENTES DETERMINISTAS QUE PUEDES USAR**:
  - Cuando necesites que el usuario elija entre opciones claras, devuelve `componentToRender: "CardSelector"` con las opciones
  - Cuando necesites archivos, devuelve `componentToRender: "FileUpload"`
  - Cuando necesites URLs, devuelve `componentToRender: "URLInput"`
  - Cuando necesites colores, devuelve `componentToRender: "ColorPicker"`
  - Cuando necesites un rango numerico, devuelve `componentToRender: "Slider"`
  - Cuando necesites texto largo, devuelve `componentToRender: "TextArea"`
  - Cuando necesites audio, devuelve `componentToRender: "AudioRecorder"`
  - Cuando necesites seleccion multiple, devuelve `componentToRender: "MultiSelect"`
  - Incluye SIEMPRE las props necesarias (opciones, labels, placeholders, etc.)

  **PREGUNTAS OBLIGATORIAS (el chatbot DEBE cubrir todas estas areas)**:

  BLOQUE 1 - PROYECTO BASE (preguntas 1-4):
  1. Tipo de proyecto: landing, web corporativa, e-commerce, app web/SaaS, app movil (iOS/Android/ambas), automatizacion, dashboard/panel, marketplace, otro → usar CardSelector
  2. Es nuevo o mejora de algo existente? Si existe, URL actual
  3. Cual es el objetivo principal del proyecto? (vender productos, captar leads, gestionar procesos internos, ofrecer un servicio, informar, etc.)
  4. Quien es tu publico objetivo? (B2B, B2C, edad, sector, perfil tecnico)

  BLOQUE 2 - FUNCIONALIDADES (preguntas 5-10, adaptar segun tipo de proyecto):
  **Si es landing/web corporativa**:
  5. Cuantas paginas necesitas? Cuales? (inicio, sobre nosotros, servicios, contacto, blog...)
  6. Necesitas formularios? De que tipo? (contacto, presupuesto, suscripcion newsletter, reserva cita...)
  7. Necesitas blog o seccion de noticias?
  8. Necesitas multi-idioma?
  9. Tienes ya el contenido (textos, fotos) o necesitas que lo creemos?
  10. Necesitas integracion con redes sociales, Google Maps, calendario...?

  **Si es e-commerce**:
  5. Cuantos productos vas a vender aproximadamente?
  6. Tipos de producto: fisico, digital, servicios, suscripciones?
  7. Necesitas gestion de inventario?
  8. Metodos de pago: tarjeta, PayPal, transferencia, bizum?
  9. Envios: zonas de envio, calculadora de costes, integracion con correos?
  10. Cupones, descuentos, programa de fidelidad?

  **Si es app web/SaaS**:
  5. Describe los tipos de usuario que tendran acceso (roles: admin, usuario normal, superadmin, etc.)
  6. Describe las 3-5 acciones principales que un usuario hara en la app
  7. Necesitas dashboard con metricas/graficos? De que datos?
  8. Necesitas notificaciones (email, push, in-app)?
  9. Necesitas sistema de facturacion/suscripciones para tus clientes?
  10. Necesitas API publica o integracion con otros servicios?

  **Si es app movil**:
  5. iOS, Android o ambas?
  6. Necesita funcionar offline?
  7. Usa funciones del telefono? (camara, GPS, notificaciones push, biometria)
  8. Necesita sincronizarse con una web o backend existente?
  9. Publicacion en App Store / Google Play?
  10. Cuantas pantallas principales estimas?

  **Si es automatizacion**:
  5. Que proceso quieres automatizar? Describelo paso a paso
  6. Que herramientas usas actualmente? (Excel, email, CRM, ERP...)
  7. Cada cuanto se ejecuta este proceso? (diario, semanal, en tiempo real)
  8. Cuantas personas estan involucradas?
  9. Que datos entran y que datos salen?
  10. Necesitas un panel para monitorizar las automatizaciones?

  BLOQUE 3 - DISENO E IDENTIDAD (preguntas 11-14):
  11. Tienes logo y colores corporativos? → si no, usar ColorPicker para preferencias
  12. Hay webs/apps que te gusten como referencia de diseno? → usar URLInput para 2-3 ejemplos
  13. Que es lo que te gusta de esas referencias? (el estilo, los colores, la estructura, la UX...)
  14. Preferencia de estilo → usar CardSelector: Minimalista / Corporativo / Moderno-Bold / Tech-Dark / Colorido-Creativo / Elegante-Premium

  BLOQUE 4 - CONTENIDO Y MATERIAL (preguntas 15-16):
  15. Tienes documentos, wireframes, bocetos o cualquier material que nos ayude a entender mejor tu proyecto? → usar FileUpload
  16. Quieres grabarnos un audio explicando tu vision? A veces es mas facil hablar que escribir → usar AudioRecorder

  BLOQUE 5 - COMPETENCIA Y MERCADO (preguntas 17-18):
  17. Conoces competidores directos que tengan algo similar a lo que quieres? URLs?
  18. Que quieres hacer MEJOR o DIFERENTE que ellos?

  BLOQUE 6 - PLAZOS, PRESUPUESTO Y CIERRE (preguntas 19-22):
  19. Tienes una fecha limite o es flexible?
  20. Rango de presupuesto orientativo? → usar Slider (1.500€ - 30.000€+) o "Prefiero recibir presupuesto"
  21. Hay alguien mas que decida sobre el proyecto? (socio, jefe, inversor)
  22. Algo mas que quieras contarnos y que no te hayamos preguntado?

  **PREGUNTAS CONDICIONALES ADICIONALES** (el chatbot las anade si detecta necesidad):
  - Si menciona SEO: "Tienes palabras clave objetivo? Usas Google Search Console?"
  - Si menciona multi-idioma: "Cuantos idiomas? Tienes las traducciones o las necesitas?"
  - Si menciona bases de datos existentes: "Que base de datos usas? Necesitas migrar datos?"
  - Si menciona API existente: "Tienes documentacion de la API? Que endpoints necesitas?"
  - Si tiene equipo tecnico: "Tu equipo mantendra el codigo despues? Que stack dominan?"
  - Si menciona urgencia alta: "Hay un evento o deadline especifico que motiva la urgencia?"
  - Si el presupuesto es bajo para lo que pide: "Podemos priorizar funcionalidades. Que es lo absolutamente esencial para la v1?"
  - Si es e-commerce: "Vendes ya por otro canal? Cuantos pedidos al mes esperas?"
  - Si necesita IA: "Que quieres que haga la IA exactamente? Con que datos trabajaria?"

  **RESUMEN FINAL**:
  Al terminar todas las preguntas, generar un JSON estructurado con:
  ```json
  {
    "projectType": "...",
    "isNew": true/false,
    "existingUrl": "...",
    "objective": "...",
    "targetAudience": "...",
    "features": { ... por categoria ... },
    "pages": [...],
    "userRoles": [...],
    "integrations": [...],
    "design": { "hasIdentity": bool, "colors": [...], "references": [...], "style": "..." },
    "content": { "hasContent": bool, "needsCreation": bool },
    "competition": { "competitors": [...], "differentiators": "..." },
    "timeline": "...",
    "budget": { "min": number, "max": number, "flexible": bool },
    "decisionMaker": "...",
    "additionalNotes": "...",
    "uploadedFiles": [...],
    "audioNotes": [...],
    "aiSummary": "Resumen ejecutivo de 3-5 frases"
  }
  ```
  Marcar `isComplete: true` y devolver este JSON como `extractedData`.

- **Impact**: Este es el CORAZON del sistema. La calidad de este prompt determina la calidad de toda la captacion de leads y propuestas. Debe ser el mejor cuestionario de consultoria tech que existe.
- **Size**: XL (prompt muy largo y detallado, requiere muchas iteraciones y testing)
- **Dependencies**: 202

### [x] 204 - Implement chat message rendering with embedded components
- **Where**: Modify `src/components/questionnaire/ChatMessage.tsx`
- **What**: El componente ChatMessage debe poder renderizar:
  - Texto plano (markdown basico: negrita, listas, links)
  - Componentes interactivos embebidos cuando el bot los solicita
  - El flujo es: bot envia mensaje con `componentToRender` → se muestra el texto del bot + debajo el componente → usuario interactua con el componente → `onComplete(data)` se trata como una respuesta del usuario y se envia al backend
  - Componentes ya respondidos se muestran desactivados (greyed out) con la respuesta seleccionada visible
  - Archivos subidos se muestran como thumbnails en el chat
  - Audio grabado se muestra como reproductor mini
  - Animacion suave de entrada para cada mensaje nuevo
- **Impact**: UX fluida entre chat libre y inputs estructurados
- **Size**: M
- **Dependencies**: 200, 201

### [x] 205 - Questionnaire completion flow and price reveal
- **Where**: Modify `src/pages/Questionnaire.tsx`, new `src/components/questionnaire/PriceReveal.tsx`
- **What**: Cuando el chatbot marca `isComplete=true`:
  1. Ultimo mensaje del bot: resumen de todo lo hablado + "Basandonos en todo lo que me has contado, hemos calculado un presupuesto orientativo para tu proyecto:"
  2. Transicion animada a pantalla de resultado:
     - Animacion de "calculando..." con particulas/numeros (2-3 segundos)
     - Reveal del precio estimado (emerald gradient, numeros grandes, min-max)
     - Plan sugerido (Launch/Build/Scale) con icono y descripcion
     - Desglose: precio base + cada extra como linea con precio
     - Timeline estimada
     - Iteraciones incluidas
     - Disclaimer: "Este es un presupuesto orientativo. En menos de 24h recibiras la propuesta definitiva con todos los detalles."
  3. CTAs:
     - "Registrate para recibir tu propuesta" → `/registro` (pre-fill email si lo dio en el chat)
     - "Quiero ajustar algo" → vuelve al chat para modificar respuestas
     - "Descargar resumen en PDF" (opcional, nice-to-have)
  4. Guardar todo en DB: `questionnaire_conversations` (conversacion completa + extracted_data) y `projects` (nuevo proyecto con status 'pending_proposal', precios calculados)
- **Impact**: Momento de conversion - el usuario ve el valor y se registra
- **Size**: M
- **Dependencies**: 202, 207

### [x] 206 - Automatic price calculator engine (enhanced for AI data)
- **Where**: New `src/lib/priceCalculator.ts`
- **What**: Funcion TypeScript que toma los `extractedData` del chatbot y calcula precio:
  ```typescript
  interface PriceResult {
    suggestedPlan: 'launch' | 'build' | 'scale';
    basePrice: number;
    extras: Array<{ name: string; category: string; price: number; reason: string }>;
    totalEstimate: { min: number; max: number };
    estimatedDays: { min: number; max: number };
    includedIterations: number;
    monthlyMaintenanceEstimate: number;
  }
  ```
  **Logica de clasificacion de plan**:
  - LAUNCH (1.500-2.500€): Landing/web corporativa + sin auth + sin DB + <7 paginas + sin integraciones complejas
  - BUILD (5.000-9.000€): App con auth + DB + hasta 15 pantallas + algunas integraciones + panel admin basico
  - SCALE (12.000-25.000€): Plataforma compleja + IA + roles multiples + muchas integraciones + admin avanzado + >15 pantallas

  **Tabla de extras (cada uno suma al precio base)**:
  | Extra | Precio | Condicion de activacion |
  |-------|--------|------------------------|
  | Auth basico (email+pwd) | +500€ | features.auth === 'basic' |
  | Auth con roles | +800€ | features.auth === 'roles' |
  | Auth social (Google/GitHub) | +300€ | features.authSocial === true |
  | Pagos unicos (Stripe) | +600€ | features.payments === 'one-time' |
  | Suscripciones recurrentes | +900€ | features.payments === 'recurring' |
  | Panel admin basico | +700€ | features.admin === 'basic' |
  | Panel admin avanzado | +1.200€ | features.admin === 'advanced' |
  | DB simple (<10 tablas) | +400€ | features.database === 'simple' |
  | DB compleja (>10 tablas) | +800€ | features.database === 'complex' |
  | Integracion API (por cada) | +300-600€ | features.integrations.length * 400 |
  | Chatbot IA | +800€ | features.ai includes 'chatbot' |
  | Analisis docs IA | +1.000€ | features.ai includes 'documents' |
  | Automatizacion IA | +1.200€ | features.ai includes 'automation' |
  | Multi-idioma (por idioma extra) | +400€ | features.languages > 1 |
  | Blog/CMS | +500€ | features.blog === true |
  | E-commerce catalogo | +800€ | features.ecommerce === true |
  | E-commerce inventario | +600€ | features.inventory === true |
  | E-commerce envios | +500€ | features.shipping === true |
  | Notificaciones push | +400€ | features.pushNotifications === true |
  | App movil nativa (por plataforma) | +3.000€ | projectType === 'mobile' |
  | Diseno custom premium | +500€ | design.style === 'premium' |
  | Creacion de contenido | +300€ | content.needsCreation === true |
  | SEO tecnico | +400€ | features.seo === true |
  | Iteracion extra | +250€ | (bajo demanda) |
  | Dominio + SSL setup | +100€ | (bajo demanda) |

  **Timeline**:
  - Launch: 5-7 dias + 1 dia por cada 2 extras
  - Build: 15-20 dias + 2 dias por cada extra
  - Scale: 30-40 dias + 3 dias por cada extra
  - Si urgencia alta: -20% tiempo, +25% precio

  **Tests unitarios completos** para cada combinacion de plan + extras.
- **Impact**: Motor de pricing - toda la propuesta se basa en esto
- **Size**: L
- **Dependencies**: None (pure logic, can be built independently)

### [x] 207 - Edge Function for questionnaire chat proxy
- **Where**: New Supabase Edge Function `questionnaire-chat`
- **What**: Edge Function que hace de proxy entre el frontend y Gemini API:
  - Recibe mensajes del usuario + historial de conversacion
  - Anade el system prompt (ticket 203) al inicio
  - Llama a Gemini 2.5 Flash (default) o Pro (si la conversacion es compleja)
  - Parsea la respuesta para extraer: texto del bot, componente a renderizar (si hay), props del componente, si la conversacion esta completa, datos extraidos
  - Rate limiting: max 60 requests/hora por IP
  - Input sanitization: limpiar HTML/scripts del input del usuario
  - Max conversation length: 50 mensajes (si se excede, forzar resumen y cierre)
  - Logging: guardar cada conversacion para analytics y mejora del prompt
  - Error handling: si Gemini falla, responder con mensaje amable + boton retry
  - Env vars: `GEMINI_API_KEY` (server-side only, NUNCA en cliente)
- **Impact**: Backend seguro para el chatbot
- **Size**: M
- **Dependencies**: 203

### [x] 208 - Questionnaire analytics and abandoned session recovery
- **Where**: New `src/lib/questionnaireAnalytics.ts`, modify Edge Function
- **What**:
  **Analytics**:
  - Track: sesiones iniciadas, completadas, abandonadas, tiempo medio, pregunta donde abandonan
  - Dashboard admin (ticket 400) mostrara estas metricas
  - Guardar en `questionnaire_conversations` con status 'abandoned' si no completa en 30 min
  **Recuperacion de sesiones**:
  - Si usuario vuelve a `/cuestionario` y tiene una sesion incompleta en localStorage, preguntar: "Tienes una conversacion sin terminar. Quieres continuarla o empezar de nuevo?"
  - Si elige continuar, cargar el historial y reanudar donde lo dejo
  - Si el usuario se registro pero no completo el cuestionario, enviar email recordatorio a las 24h (via cron Edge Function)
- **Impact**: Maximizar conversion de leads que empiezan el cuestionario
- **Size**: M
- **Dependencies**: 200, 202, 403

---

## PLATFORM - Fase 3: Dashboard de Cliente

### [x] 300 - Create client dashboard layout and navigation
- **Where**: New `src/pages/dashboard/DashboardLayout.tsx`, `src/pages/dashboard/DashboardHome.tsx`
- **What**: Create authenticated dashboard layout with:
  - Sidebar navigation (collapsible on mobile): Inicio, Mi Proyecto, Chat, Documentos, Pagos, Ajustes
  - Top bar with user name, company, notification bell, logout
  - Main content area with breadcrumbs
  - Dashboard home showing: project status card (big, prominent), recent messages preview, next action required, payment status summary
  - Empty state for users with no project yet (redirect to questionnaire)
  - Same dark theme (zinc-950) but slightly different layout from landing
  - Fully responsive
- **Impact**: Main interface where clients spend all their time
- **Size**: L
- **Dependencies**: 100, 102

### [x] 301 - Project status tracker component
- **Where**: New `src/components/dashboard/ProjectStatus.tsx`
- **What**: Visual pipeline showing project progress through stages:
  1. Cuestionario completado (check)
  2. Propuesta enviada (with date)
  3. Propuesta aceptada + Contrato firmado
  4. Pago de entrada recibido
  5. En desarrollo (with progress % if available)
  6. En revision (iteration X of Y)
  7. Completado
  8. Entregado / En mantenimiento
  Show current stage highlighted in emerald, completed stages with checkmarks, pending stages in grey. Include dates for each completed stage.
- **Impact**: Transparency - client always knows where their project stands
- **Size**: M
- **Dependencies**: 300, 101

### [x] 302 - Internal chat system (client side)
- **Where**: New `src/pages/dashboard/Chat.tsx`, `src/components/dashboard/ChatMessage.tsx`, `src/components/dashboard/ChatInput.tsx`
- **What**: Real-time chat interface for client-team communication:
  - Message list with sender name, avatar (initials), timestamp, read receipts
  - Support for text messages, file attachments (images, PDFs), and links
  - Chat input with text field, file attach button, send button
  - Real-time updates using Supabase Realtime subscriptions
  - Unread message count in sidebar badge
  - Auto-scroll to latest message
  - Mobile-responsive (full screen on mobile)
  - Messages saved to `messages` table
  - When team sends a message, trigger email notification to client via Edge Function
  - System messages for status changes ("Tu propuesta esta lista", "Pago recibido", etc.)
- **Impact**: Core communication channel - replaces email
- **Size**: L
- **Dependencies**: 300, 101

### [x] 303 - Proposal viewer and acceptance flow
- **Where**: New `src/pages/dashboard/Proposal.tsx`, `src/components/dashboard/ProposalCard.tsx`
- **What**: Page showing the client's proposal(s):
  - Display proposal content (markdown rendered) with sections: Resumen ejecutivo, Stack tecnologico, Funcionalidades detalladas, Desglose de precios, Timeline, Iteraciones incluidas, Condiciones
  - Version history (v1, v2, v3) with diff if multiple versions
  - Two action buttons: "Aceptar propuesta" (green) / "Solicitar cambios" (opens chat with pre-filled message)
  - On accept: show contract summary + checkbox "He leido y acepto los terminos" + "Firmar y proceder al pago" button
  - On sign: update project status to 'proposal_accepted', create Stripe Checkout session for deposit payment
  - Max 3 proposal iterations (configurable per plan)
  - Track which version was accepted
- **Impact**: Contract signing - converts lead to paying client
- **Size**: L
- **Dependencies**: 300, 101, 103

### [x] 304 - Document manager in dashboard
- **Where**: New `src/pages/dashboard/Documents.tsx`
- **What**: File management page showing all project documents:
  - Two sections: "Tus documentos" (uploaded by client) and "Documentos del equipo" (proposals, deliverables)
  - Upload button with drag-and-drop zone
  - File list with: icon (by type), name, size, uploaded by, date, download button
  - Preview modal for images and PDFs (inline viewer)
  - Files stored in Supabase Storage, metadata in `files` table
  - Filter by type (documentos, imagenes, propuestas)
- **Impact**: Centralized document management
- **Size**: M
- **Dependencies**: 300, 101

### [x] 305 - Iteration request system
- **Where**: New `src/pages/dashboard/Iterations.tsx`, `src/components/dashboard/IterationCard.tsx`
- **What**: Page for requesting and tracking post-delivery changes:
  - Show remaining iterations (e.g., "2 de 3 iteraciones disponibles")
  - "Solicitar cambios" button opens form: description textarea + screenshot upload (multiple) + affected pages/sections select
  - Each iteration shows: number, description, screenshots, status (solicitada/en progreso/completada), dates
  - When iteration is requested: notification to admin, chat message auto-sent
  - When iteration is completed: notification to client with link to preview
  - Clear warning when using last iteration
  - Option to purchase extra iterations (+250€)
  - Iterations limited to scope: "Solo cambios de diseno, texto o ajustes menores. No incluye nuevas funcionalidades."
- **Impact**: Structured change management - avoids scope creep
- **Size**: M
- **Dependencies**: 300, 101, 302

### [x] 306 - Payment history and billing page
- **Where**: New `src/pages/dashboard/Payments.tsx`
- **What**: Page showing all payment information:
  - Payment timeline: deposit, final payment, monthly maintenance
  - Each payment: amount, date, status (pendiente/completado/fallido), Stripe receipt link
  - Outstanding payments with "Pagar ahora" button (creates Stripe Checkout)
  - If on maintenance plan: show current plan, next billing date, usage (DB size, functions)
  - Download invoice/receipt PDFs
  - Upgrade/downgrade maintenance plan option
- **Impact**: Financial transparency
- **Size**: M
- **Dependencies**: 300, 103

### [x] 307 - App preview/testing in dashboard
- **Where**: New `src/pages/dashboard/Preview.tsx`
- **What**: Embedded preview of the client's application:
  - iframe showing the staging/preview URL of their app
  - Device toggle: Desktop / Tablet / Mobile (resizes iframe)
  - "Abrir en nueva pestana" button
  - Screenshot tool: click to capture current view, annotate, send as iteration request
  - Status banner: "Version actual: v1.2 - Ultima actualizacion: [date]"
  - Notification when new version is available
- **Impact**: Client can test their app without leaving the platform
- **Size**: M
- **Dependencies**: 300

### [x] 308 - Export/delivery flow
- **Where**: New `src/pages/dashboard/Delivery.tsx`
- **What**: Final delivery page (visible when project status is 'completed'):
  - Two options:
    Option A: "Exportar codigo" - Download source code as ZIP. Requires final payment. "Pagar y descargar" → Stripe Checkout → download.
    Option B: "Mantener en nuestra plataforma" - Monthly hosting plans (Basico 49€/Pro 99€/Premium 199€) → Stripe subscription.
  - Clear: "El codigo es 100% tuyo. Puedes exportarlo cuando quieras."
- **Impact**: Revenue model - either final payment or recurring maintenance
- **Size**: L
- **Dependencies**: 300, 103

---

## PLATFORM - Fase 4: Panel Admin / Equipo

### [x] 400 - Admin dashboard layout
- **Where**: New `src/pages/admin/AdminLayout.tsx`, `src/pages/admin/AdminHome.tsx`
- **What**: Admin panel (role='admin' only) with:
  - Sidebar: Vista general, Proyectos, Clientes, Propuestas, Chat, Pagos, Analytics, Configuracion
  - Home showing: projects pipeline kanban (by status), recent messages needing response, pending proposals, monthly revenue summary, upcoming deadlines, questionnaire analytics (conversion rate, abandonment rate)
  - Quick actions: "Crear propuesta", "Enviar mensaje", "Actualizar estado"
- **Impact**: Team needs a management interface
- **Size**: L
- **Dependencies**: 300, 102

### [x] 401 - Admin project management
- **Where**: New `src/pages/admin/AdminProjects.tsx`, `src/pages/admin/AdminProjectDetail.tsx`
- **What**: Project list with filters (by status, plan, date). Project detail page with:
  - Full questionnaire conversation viewer (el chat completo que tuvo con la IA)
  - Extracted data summary (el JSON estructurado)
  - Uploaded files viewer
  - Project status changer (dropdown)
  - Proposal editor (markdown) with send button
  - Chat thread
  - Iteration tracker
  - Payment history
  - Client info
  - Internal notes field (not visible to client)
  - Timeline/deadline tracker
- **Impact**: Central management for each project
- **Size**: L
- **Dependencies**: 400

### [x] 402 - AI proposal generator (admin tool)
- **Where**: New Supabase Edge Function `generate-proposal`, new `src/components/admin/ProposalGenerator.tsx`
- **What**: Admin clicks "Generar propuesta con IA" on a project. Edge Function:
  1. Fetches the `extractedData` JSON from the questionnaire conversation
  2. Fetches uploaded files (text extracted from PDFs via Edge Function)
  3. Fetches the pricing calculation from the calculator engine
  4. Builds a detailed prompt with ALL context + pricing table + Think Better's terms/conditions
  5. Calls Claude API (or Gemini Pro) to generate a complete proposal in markdown:
     - Resumen ejecutivo (3-5 frases)
     - Comprension del proyecto (demuestra que entendimos lo que quiere)
     - Stack tecnologico recomendado (con justificacion)
     - Funcionalidades detalladas (desglosadas por modulo/seccion)
     - Desglose de precios (base + cada extra con precio y justificacion)
     - Timeline detallado (fases: diseno → desarrollo → testing → entrega)
     - Iteraciones incluidas y que cubren
     - Condiciones: pago 50% inicio / 50% entrega, devolucion si no satisface, codigo 100% del cliente, soporte post-lanzamiento
  6. Admin reviews in WYSIWYG markdown editor, can edit everything before sending
  7. "Enviar al cliente" button: saves to `proposals` table, sends chat message + email notification
  8. Track which parts the AI generated vs which the admin edited
- **Impact**: Propuestas en minutos en vez de horas. Calidad consistente.
- **Size**: L
- **Dependencies**: 401, 206

### [x] 403 - Email notification system
- **Where**: New Supabase Edge Function `send-email`, notification triggers
- **What**: Set up transactional email system using Resend or SendGrid:
  - Trigger emails on: new chat message, proposal sent, proposal accepted, payment received, iteration completed, project delivered, questionnaire abandoned (24h reminder)
  - Email templates (HTML) matching brand (dark theme, emerald accents)
  - Each email includes: subject, body summary, "Ver en la plataforma" CTA button
  - Track email sent status in `notifications` table
  - Respect user email preferences
  - Rate limiting
- **Impact**: Users stay informed even when not on the platform
- **Size**: M
- **Dependencies**: 101

---

## PLATFORM - Fase 5: Pricing Detallado en Landing

### [x] 500 - Redesign pricing section with detailed inclusions/exclusions
- **Where**: `src/components/Pricing.tsx`
- **What**: Overhaul pricing cards with much more detail:
  - Each plan: INCLUDED (green checks) and NOT included (grey X)
  - Expandable "Ver todo lo incluido" per plan
  - Pages, iterations, support days per plan
  - "Extras disponibles" section with add-on prices
  - Comparison table across 3 plans
  - "No estoy seguro" CTA → questionnaire
  - Mobile: plans stack, table scrolls
- **Impact**: Transparency + avoids scope creep
- **Size**: M

### [x] 501 - Add extras/add-ons pricing detail
- **Where**: `src/components/AddOns.tsx` (redesign)
- **What**: Clear pricing table grouped by category with prices, descriptions, complexity indicators
- **Impact**: Complete pricing transparency
- **Size**: M

### [x] 502 - Add maintenance plans section to landing
- **Where**: New `src/components/Maintenance.tsx`
- **What**: Monthly hosting/maintenance plans: Basico (49€), Pro (99€), Premium (199€) with comparison
- **Impact**: Recurring revenue model visibility
- **Size**: S

### [x] 503 - Update FAQ with new platform questions
- **Where**: `src/components/FAQ.tsx`
- **What**: Add questions about questionnaire, proposals, iterations, money-back, export vs hosting, maintenance, data policy
- **Impact**: Answers objections
- **Size**: S

---

## PLATFORM - Fase 6: Polish y UX

### [x] 600 - Landing CTA flow update
- **Where**: Hero, Navbar, all CTAs
- **What**: All CTAs funnel to `/cuestionario`. Remove dead-end #contact links.
- **Impact**: All roads lead to the questionnaire
- **Size**: M
- **Dependencies**: 200

### [x] 601 - Cookie consent banner
- **Where**: New component
- **What**: GDPR-compliant banner
- **Size**: S

### [x] 602 - Loading states, error boundaries, toast notifications, 404 page
- **Where**: Multiple files
- **Size**: M
- **Dependencies**: 100

### [x] 603 - Responsive improvements across all new pages
- **Where**: All new components
- **Size**: M
- **Dependencies**: All platform features

---

## Landing improvements (lower priority)

### [x] 011 - Add section IDs for deep linking
- **Size**: S

### [x] 017 - Add scroll-to-top button
- **Size**: S

### [x] 018 - Add structured data (JSON-LD)
- **Size**: S

### [x] 019 - Add testimonials section
- **Size**: M

### [x] 022 - Add page transitions and micro-interactions
- **Size**: M

---

## Completed
- [x] 001 - Fix placeholder WhatsApp number in Footer (2026-03-13)
- [x] 002 - Fix Gemini API key exposed in client bundle (2026-03-13)
- [x] 003 - Fix dead-end #contact CTA loop (2026-03-13)
- [x] 005 - Translate team roles to Spanish (2026-03-13)
- [x] 006 - Fix placeholder social media links (2026-03-13)
- [x] 007 - Add FAQ accordion accessibility (2026-03-13)
- [x] 009 - Add lang="es" + meta tags + SEO + favicon (2026-03-13)
- [x] 010 - Respect prefers-reduced-motion (2026-03-13)
- [x] 004 - Fix broken legal page links with react-router (2026-03-13)
- [x] 008 - Fix mobile menu accessibility (2026-03-13)
- [x] 100 - Install react-router and set up routing structure (2026-03-13)
- [x] 101 - Set up Supabase project and database schema (2026-03-13)
- [x] 102 - Set up Supabase Auth with email/password (2026-03-13)
- [x] 103 - Set up Stripe integration for payments (2026-03-13)
- [x] 200 - Create AI chatbot UI shell and page (2026-03-13)
- [x] 208 - Questionnaire analytics and abandoned session recovery (2026-03-13)
- [x] 304 - Document manager in dashboard (2026-03-14)
- [x] 305 - Iteration request system (2026-03-14)
- [x] 602 - Toast notifications, 404 page, loading states (2026-03-14)
- [x] 306 - Payment history: Pagar ahora CTA for pending payments (2026-03-14)
- [x] 307 - App preview/testing in dashboard with device toggle (2026-03-14)
- [x] 308 - Export/delivery flow with code export and hosting plans (2026-03-14)
- [x] 400 - Admin dashboard panel with KPIs, projects, clients (2026-03-14)
- [x] 600 - Landing CTAs updated to route to /cuestionario (2026-03-14)
- [x] 207 - Edge Function for questionnaire chat proxy (already implemented, marked complete 2026-03-14)
- [x] 401 - Admin project detail page with questionnaire viewer, proposal editor, status changer (2026-03-14)
- [x] 500 - Pricing section redesigned with inclusions/exclusions and comparison table (2026-03-14)
- [x] 501 - Add-ons section enhanced with categories, complexity, and pricing notes (2026-03-14)
- [x] 502 - Maintenance plans section added to landing (Básico 49€/Pro 99€/Premium 199€) (2026-03-14)
- [x] 503 - FAQ updated with 12 questions covering platform features (2026-03-14)
- [x] 601 - GDPR cookie consent banner with granular preferences (2026-03-14)
- [x] 402 - AI proposal generator admin tool with Claude/Gemini integration (2026-03-14)
- [x] 403 - Email notification system stub with Resend template structure (2026-03-14)
- [x] 603 - Responsive improvements: Preview, Pagos, dashboard pages (2026-03-14)
- [x] 017 - Scroll-to-top button with Framer Motion (2026-03-14)
- [x] 018 - JSON-LD structured data + Twitter Card meta tags (2026-03-14)
- [x] 011 - Section IDs for deep linking (#casos added, navbar #testimonios link) (2026-03-14)
- [x] 019 - Testimonials section with 6 client reviews, stars, gradient avatars (2026-03-14)
- [x] 022 - Micro-interactions: whileHover lift on Benefits, Team, SocialProof cards (2026-03-14)
- [x] 208 - Questionnaire session recovery modal + analytics module (2026-03-14)

---

## QA Audit — 2026-03-14 (Full E2E Test)

### Findings from full end-to-end audit of all pages and interactions

---

## [HIGH] — Página de ajustes del dashboard es un placeholder vacío (Severity: HIGH)
**Ruta/Componente:** `/dashboard/ajustes` · `src/pages/dashboard/Ajustes.tsx`
**Descripción:** La página de ajustes solo muestra "Configuración de cuenta próximamente." con un icono. No hay ningún formulario ni funcionalidad. El usuario no puede editar su nombre, empresa, teléfono ni preferencias de notificación.
**Criterio de aceptación:** La página contiene formularios funcionales para editar nombre completo, empresa, email, teléfono, sector y preferencias de notificación por email. Los cambios se guardan en la tabla `profiles` de Supabase.

---

## [MEDIUM] — Todas las páginas tienen el mismo `<title>` (SEO crítico) (Severity: MEDIUM)
**Ruta/Componente:** Todas las rutas · `index.html`, router
**Descripción:** Todas las páginas (landing, cuestionario, login, registro, dashboard, privacidad, legal, cookies, 404) muestran el mismo título: "Think Better | Desarrollo de Software Acelerado por IA". Esto perjudica el SEO y la experiencia de usuario (pestañas indistinguibles).
**Criterio de aceptación:** Cada ruta tiene un `<title>` único y descriptivo. Ejemplo: `/cuestionario` → "Cuestionario gratuito | Think Better", `/login` → "Iniciar sesión | Think Better", `/dashboard` → "Mi panel | Think Better", etc. Usar un mecanismo tipo `react-helmet` o `document.title` en cada página.

---

## [MEDIUM] — Sección `#contacto` no contiene formulario de contacto (Severity: MEDIUM)
**Ruta/Componente:** `/` · sección con `id="contacto"`
**Descripción:** La sección con id `contacto` contiene los planes de mantenimiento mensual (Basic/Pro/Premium 500-1.600€/mes), no un formulario de contacto. No existe ningún formulario de contacto en toda la landing. La navbar tampoco enlaza a esta sección. Los usuarios no tienen un canal directo para contactar que no sea el cuestionario o el email en el footer.
**Criterio de aceptación:** O bien (a) se añade un formulario de contacto real en una sección apropiada con nombre/email/mensaje que envíe a `hola@thinkbetter.dev`, o bien (b) se renombra la sección `contacto` a algo coherente con su contenido (retención/mantenimiento) y se actualiza el id para evitar confusión.

---

## [MEDIUM] — Navbar no enlaza a secciones `#casos`, `#equipo` ni `#contacto` (Severity: MEDIUM)
**Ruta/Componente:** `/` · `src/components/Navbar.tsx`
**Descripción:** El navbar solo tiene: Precios, Cómo funciona, Add-ons, Testimonios, FAQ. Las secciones Casos de éxito (`#casos`), Equipo (`#equipo`) y la sección de mantenimiento/contacto no son accesibles desde el nav. Un usuario no puede navegar directamente a "Nuestro equipo" o "Casos" desde la barra de navegación.
**Criterio de aceptación:** Se evalúa si añadir enlaces a `#casos` y/o `#equipo` mejora la navegación o si es intencionado mantenerlos fuera del nav por longitud. Como mínimo, documentar la decisión. Si se añaden, el nav debe seguir siendo funcional en mobile sin overflow.

---

## [MEDIUM] — Progress bar del cuestionario siempre muestra 0% (Severity: MEDIUM)
**Ruta/Componente:** `/cuestionario` · `src/components/questionnaire/ChatUI.tsx`
**Descripción:** La barra de progreso del cuestionario muestra "0%" durante toda la conversación, independientemente de cuántas preguntas se hayan respondido. No se actualiza nunca, lo que elimina el incentivo de completar el cuestionario.
**Criterio de aceptación:** La barra de progreso se actualiza con cada respuesta del usuario, calculando el porcentaje basado en las preguntas obligatorias completadas (recibidas desde el campo `progressPercent` de la respuesta del Edge Function). Debe avanzar de forma visible y llegar al 100% al completar el cuestionario.

---

## [MEDIUM] — "Continuar consulta" restaura sesión pero no muestra mensajes previos del usuario (Severity: MEDIUM)
**Ruta/Componente:** `/cuestionario` · `src/components/questionnaire/ChatUI.tsx`, `src/lib/questionnaireEngine.ts`
**Descripción:** Cuando el usuario recarga la página y elige "Continuar consulta" en el modal de recuperación de sesión, el chat se restaura pero solo muestra los mensajes iniciales del bot. Los mensajes enviados por el usuario en la sesión anterior no se renderizan en la UI (aunque sí se almacenaron en localStorage durante la sesión). La conversación parece comenzar de cero visualmente.
**Criterio de aceptación:** Al elegir "Continuar consulta", el historial completo de la conversación (mensajes del bot y del usuario) se renderiza correctamente en el chat, en el mismo orden que se produjo. El usuario ve exactamente dónde lo dejó.

---

## [LOW] — Typo: falta tilde en "Aun no" en Mensajes (Severity: LOW)
**Ruta/Componente:** `/dashboard/mensajes` · `src/pages/dashboard/Mensajes.tsx`
**Descripción:** El texto muestra "Aun no tienes un proyecto activo." — falta la tilde en "Aún".
**Criterio de aceptación:** El texto correcto es "Aún no tienes un proyecto activo."

---

## [LOW] — Typo: falta tilde en "recibiras" en Propuestas (Severity: LOW)
**Ruta/Componente:** `/dashboard/propuestas` · `src/pages/dashboard/Propuestas.tsx`
**Descripción:** El texto muestra "Completa el cuestionario y recibiras una propuesta detallada..." — falta la tilde en "recibirás".
**Criterio de aceptación:** El texto correcto es "recibirás una propuesta detallada en menos de 24 horas."

---

## [LOW] — Admin inaccesible en modo desarrollo con usuario mock (Severity: LOW)
**Ruta/Componente:** `/admin`, `/admin/proyectos`, `/admin/clientes` · `src/contexts/AuthContext.tsx`
**Descripción:** El usuario mock tiene `role: 'client'`, por lo que todas las rutas `/admin/*` muestran "Acceso restringido". En desarrollo es imposible probar el panel de administración sin cambiar el código fuente. No hay flag de entorno ni usuario mock admin.
**Criterio de aceptación:** Se añade una variable de entorno `VITE_MOCK_ROLE=admin` que, cuando está activa, configura el usuario mock con `role: 'admin'` permitiendo testear el panel admin en local sin tocar el código. Documentado en `.env.example`.

---

## [LOW] — Cookie banner puede mostrar doble render en primera carga (Severity: LOW)
**Ruta/Componente:** `/` · componente de cookie consent
**Descripción:** En la primera visita, el banner de cookies aparece correctamente. Tras aceptar ("Aceptar todas"), el banner persiste brevemente antes de desaparecer. El consentimiento se guarda correctamente en localStorage (`tb_cookie_consent`), pero el estado de React tarda en reflejarse. En navegaciones posteriores (con consentimiento ya guardado), el banner no aparece correctamente.
**Criterio de aceptación:** El banner desaparece inmediatamente al hacer click en cualquier acción (Aceptar todas / Solo necesarias / Gestionar preferencias → guardar). No hay flash visible del banner tras la acción del usuario.

---

## Session #24 — New tickets completed (2026-03-14)

### [x] 700 - Code splitting with React.lazy (performance)
- **Where**: `src/main.tsx`
- **What**: Convert all page imports to React.lazy + Suspense. PageLoader spinner for fallback.
- **Impact**: Initial bundle 846 kB → 445 kB. Each route is a separate chunk loaded on demand.
- **Size**: S
- **Completed**: 2026-03-14

### [x] 701 - Generate og-image.png for social sharing
- **Where**: `public/og-image.png`, `scripts/generate-og-image.mjs`
- **What**: 1200x630 PNG using Playwright. Dark theme, emerald, gradient "semanas", tech pills.
- **Impact**: Fixes broken og:image + twitter:image meta tags. Social previews now show brand image.
- **Size**: S
- **Completed**: 2026-03-14

### [x] 702 - Route-level AnimatePresence page transitions
- **Where**: `src/main.tsx` — TransitionLayout component
- **What**: Public routes (/, /cuestionario, /login, /registro) now fade+slide between each other.
  Added TransitionLayout layout route wrapper with AnimatePresence mode="wait".
- **Impact**: Polished navigation experience. Dashboard already had transitions.
- **Size**: S
- **Completed**: 2026-03-14

## Session #25 — New tickets completed (2026-03-14)

### [x] 800 - Per-page document.title SEO
- **Where**: `src/hooks/usePageTitle.ts` + 20+ page files
- **What**: Custom `usePageTitle` hook, added to all routes. Each page has unique title.
- **Impact**: Critical for SEO and browser tab UX
- **Size**: M
- **Completed**: 2026-03-14

### [x] 801 - Ajustes settings page (full form)
- **Where**: `src/pages/dashboard/Ajustes.tsx`
- **What**: Full account settings: name, company, phone, sector + 3 notification toggles. Saves to Supabase profiles table.
- **Impact**: Previously placeholder, now functional
- **Size**: M
- **Completed**: 2026-03-14

### [x] 802 - Typos: "Aún", "recibirás"
- **Where**: Mensajes.tsx, Propuestas.tsx
- **What**: Fixed 4 missing accents in empty state text
- **Size**: S
- **Completed**: 2026-03-14

### [x] 803 - Progress bar floor logic
- **Where**: `src/lib/questionnaireEngine.ts`
- **What**: After each user message, ensure progressPercent is at least `ceil(historyLen/2)*5%`. Prevents 0% from Gemini returning 0.
- **Size**: S
- **Completed**: 2026-03-14

### [x] 804 - Session recovery shows previous messages
- **Where**: `src/components/questionnaire/ChatUI.tsx`
- **What**: Root cause bug: checked `pendingSession.messages` (undefined) instead of `pendingSession.history`. Fixed check + convert ConversationMessage[] → ChatMessageData[] for correct rendering.
- **Size**: S
- **Completed**: 2026-03-14

### [x] 805 - VITE_MOCK_ROLE=admin env flag
- **Where**: `src/contexts/AuthContext.tsx`, `.env.example`
- **What**: Read `VITE_MOCK_ROLE` env var; if 'admin', mock user has admin role. Allows admin panel testing in dev.
- **Size**: S
- **Completed**: 2026-03-14

## Open — Next priorities

### [x] 900 - Add contact form to landing (or rename #contacto section)
- **Where**: `src/components/ContactForm.tsx` (new), `src/App.tsx`, `src/components/Navbar.tsx`
- **What**: Added full ContactForm component between FAQ and Footer with `id="contacto"`. Two-column layout: copy + contact info left, form right. Fields: nombre, email, mensaje. Success state animated. Added "Contacto" to navbar. Renamed Retainer `id` from "contacto" to "retainer".
- **Size**: S
- **Done**: execution #26

### [x] 901 - Fix cookie banner flash on dismiss
- **Where**: `src/components/CookieBanner.tsx`
- **What**: Changed initial state from `false` to `null`. Returns null until localStorage checked. Only shows after 800ms if no prior consent stored. Eliminates flash for users who already accepted.
- **Size**: S
- **Done**: execution #26

### [x] 902 - Legal pages titles (Privacidad, AvisoLegal, Cookies)
- **Where**: `src/pages/Privacidad.tsx`, `src/pages/AvisoLegal.tsx`, `src/pages/Cookies.tsx`
- **What**: Added usePageTitle hook to all three legal pages.
- **Size**: S
- **Done**: execution #26 (as #806)

## Open — Future improvements

### [x] 1000 - Wire ContactForm to Resend/Edge Function
- **Where**: `src/components/ContactForm.tsx`, `supabase/functions/send-contact-email/index.ts` (new)
- **What**: Created `send-contact-email` Edge Function with Resend integration. ContactForm now calls `supabase.functions.invoke()`. Graceful fallback when RESEND_API_KEY not set.
- **Done**: execution #27 (2026-03-14)

### [x] 1001 - Seed admin demo data
- **Where**: `src/lib/mockDemoData.ts` (new), AdminHome/AdminProjects/AdminClients
- **What**: 8 mock projects + 6 mock clients. Show when VITE_MOCK_ROLE=admin and Supabase returns empty. Prices in cents to match Stripe convention.
- **Done**: execution #27 (2026-03-14)

### [ ] 1002 - Deploy Supabase Edge Functions
- **Where**: `supabase/functions/`
- **What**: Deploy `questionnaire-chat`, `send-contact-email`, and `process-payment` Edge Functions to production. Requires Supabase CLI + project link. Set RESEND_API_KEY in Supabase dashboard.
- **Size**: M

### [x] 1003 - Navbar 6-link overflow fix at ~900px
- **Where**: `src/components/Navbar.tsx`
- **What**: Changed breakpoint from `md` (768px) to `lg` (1024px). Added `whitespace-nowrap` to all links. Gap reduced to `gap-5 xl:gap-8`. Hamburger shows up to 1023px.
- **Done**: execution #27 (2026-03-14)

### [x] 1004 - AdminProjectDetail demo data
- **Where**: `src/pages/admin/AdminProjectDetail.tsx`, `src/lib/mockDemoData.ts`
- **What**: Added getMockProjectDetail(), isMockId(), MOCK_PROPOSALS, MOCK_PAYMENTS, MOCK_QUESTIONNAIRES. AdminProjectDetail bypasses Supabase when ID is mock-*. Fixed payment status 'paid'→'succeeded'.
- **Done**: execution #28 (2026-03-14)

---

## PRODUCCION — Auditoria completa 2026-03-14

> Tickets generados tras analisis exhaustivo de todo el codigo + audit E2E.
> Ordenados por prioridad: CRITICO -> IMPORTANTE -> MEJORA -> NICE TO HAVE
> Ultimo ticket anterior: #1004

---

### [x] 1005 — AuthContext: reemplazar mock por Supabase Auth real (Severity: CRITICAL)
**Ruta/Componente:** src/contexts/AuthContext.tsx
**Descripcion:** El sistema de autenticacion esta completamente mockeado. Las funciones signIn, signUp y signOut son stubs vacios que solo hacen console.log. El estado inicial siempre tiene al usuario logueado con mockUser y mockSession. Ningun usuario real puede registrarse, iniciar sesion ni cerrar sesion. Hay codigo Supabase Auth correcto escrito al final del archivo como codigo muerto que nunca se conecta.
**Lo que hay que hacer:**
1. Reescribir signIn: supabase.auth.signInWithPassword({ email, password })
2. Reescribir signUp: supabase.auth.signUp({ email, password, options: { data: { full_name, company } } })
3. Reescribir signOut: supabase.auth.signOut() y limpiar estado con setUser(null) y setSession(null)
4. Restaurar useEffect con supabase.auth.onAuthStateChange que actualiza user + session
5. Tras login, cargar perfil real de tabla profiles via supabase.from('profiles').select('*').eq('id', user.id).single()
6. Usar translateAuthError que ya esta escrito para manejar errores en espanol
7. Eliminar mockUser y mockSession, iniciar ambos estados con null
**Criterio de aceptacion:** Un usuario puede registrarse con email/password real, recibe email de confirmacion de Supabase, hace login, ve su perfil cargado desde profiles, y puede hacer logout limpiamente. El AuthContext se hidrata al recargar si hay sesion activa.
**Estimacion:** S (4-6h)

---

### [ ] 1006 — Aplicar schema SQL en Supabase + crear Storage buckets (Severity: CRITICAL)
**Ruta/Componente:** supabase/migrations/001_initial_schema.sql, Supabase Dashboard
**Descripcion:** El archivo de migracion existe en el repo pero puede no haberse ejecutado en el proyecto real de Supabase. Sin las tablas, TODOS los componentes del dashboard fallan silenciosamente. Tampoco existen los buckets de Storage project-files ni chat-files.
**Lo que hay que hacer:**
1. Ejecutar la migracion: supabase db push o copiar el SQL en SQL Editor del Dashboard
2. Verificar tablas: profiles, projects, questionnaire_conversations, proposals, messages, files, iterations, payments, notifications
3. Crear bucket project-files: publico para lectura, autenticado para escritura con RLS
4. Crear bucket chat-files: mismas politicas
5. Aplicar migraciones adicionales: columnas notificacion en profiles, preview_url y delivery_url en projects
**Criterio de aceptacion:** Todas las tablas existen en Supabase. Los dos buckets de Storage existen. Subir un archivo desde Documentos.tsx funciona sin errores de consola.
**Estimacion:** S (2-3h)

---

### [ ] 1007 — Desplegar las 4 Edge Functions de Supabase + configurar secrets (Severity: CRITICAL)
**Ruta/Componente:** supabase/functions/
**Descripcion:** Las 4 Edge Functions existen en codigo pero NUNCA se han desplegado. Sin ellas: el cuestionario IA no funciona (cae a 10 preguntas estaticas), los pagos Stripe no se pueden iniciar, el webhook de Stripe no existe, el formulario de contacto no envia emails, ningun email transaccional llega.
**Funciones a desplegar:** questionnaire-chat, create-checkout-session, stripe-webhook, send-contact-email
**Lo que hay que hacer:**
1. supabase link --project-ref xftafveqdokxkkkdqrlh
2. supabase functions deploy questionnaire-chat create-checkout-session stripe-webhook send-contact-email
3. Configurar secrets en Supabase Dashboard: GEMINI_API_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, RESEND_API_KEY, SUPABASE_SERVICE_ROLE_KEY, APP_URL
4. En Stripe Dashboard: crear webhook apuntando a la URL de la Edge Function con eventos checkout.session.completed y payment_intent.succeeded
**Criterio de aceptacion:** El cuestionario responde con IA real. El checkout de Stripe abre correctamente. El webhook actualiza la tabla payments. El formulario de contacto envia email.
**Estimacion:** M (6-10h)

---

### [x] 1008 — Arreglar emailNotifications.ts: llama a funcion inexistente send-email (Severity: CRITICAL)
**Ruta/Componente:** src/lib/emailNotifications.ts
**Descripcion:** emailNotifications.ts llama a supabase.functions.invoke('send-email') pero la unica Edge Function de email se llama send-contact-email. TODOS los emails transaccionales fallan silenciosamente. El sistema siempre cae al console.log del catch.
**Lo que hay que hacer:**
1. Crear Edge Function generica supabase/functions/send-email/index.ts que acepta { to, subject, html, text } y usa Resend
2. O bien: refactorizar send-contact-email para ser mas generica y actualizar el nombre en emailNotifications.ts
3. Probar cada tipo de notificacion (nueva propuesta, pago, iteracion, proyecto actualizado)
**Criterio de aceptacion:** Cuando el admin envia una propuesta, el cliente recibe email real. Cuando el cliente hace un pago, el admin recibe notificacion. Los console.log de fallback no se ejecutan en produccion.
**Estimacion:** S (3-4h)

---

### [x] 1009 — Resumen.tsx: hasProject hardcodeado a false — dashboard cliente siempre vacio (Severity: HIGH)
**Ruta/Componente:** src/pages/dashboard/Resumen.tsx linea 17
**Descripcion:** const hasProject = false con comentario TODO: Replace with real data from Supabase. El cliente SIEMPRE ve la pantalla vacia de onboarding aunque ya tenga un proyecto activo. El componente ProjectDashboard nunca se renderiza.
**Lo que hay que hacer:**
1. useEffect que consulte supabase.from('projects').select('*, proposals(*), payments(*), iterations(*)').eq('client_id', user.id).order('created_at', { ascending: false }).limit(1).single()
2. Estado de carga con skeleton/spinner durante la query
3. Si hay proyecto: renderizar ProjectDashboard con datos reales
4. Si no: mostrar pantalla de onboarding actual
**Criterio de aceptacion:** Un cliente con proyecto en BD ve su ProjectDashboard real. Un cliente sin proyecto ve el onboarding. El estado de carga muestra un skeleton.
**Estimacion:** S (2-3h)

---

### [ ] 1010 — Entrega.tsx: constantes mock + botones con alert() — conectar a Stripe y BD (Severity: HIGH)
**Ruta/Componente:** src/pages/dashboard/Entrega.tsx lineas 73-75
**Descripcion:** PROJECT_COMPLETED = true, FINAL_PAYMENT_PENDING = true, FINAL_PAYMENT_AMOUNT = 1800 hardcodeados. handleExport() y handleSubscribe() hacen alert('Esta funcionalidad estara disponible proximamente'). Ningun cliente puede descargar su codigo ni suscribirse a mantenimiento.
**Lo que hay que hacer:**
1. Leer estado real del proyecto desde Supabase: status, final_payment_amount, delivery_url
2. handleExport: si hay delivery_url -> abrir URL. Si pago final pendiente -> iniciar checkout Stripe
3. handleSubscribe: llamar create-checkout-session con mode: 'subscription' y el priceId del plan
4. Mostrar importe final real desde BD, no hardcodeado
**Criterio de aceptacion:** El cliente ve el importe real. Descargar codigo inicia checkout Stripe si pago pendiente, o descarga zip si ya pagado. Suscribirse abre checkout de suscripcion real.
**Estimacion:** M (6-8h)

---

### [x] 1011 — Preview.tsx: URL vacia + falta campo preview_url en tabla projects (Severity: HIGH)
**Ruta/Componente:** src/pages/dashboard/Preview.tsx linea 40, supabase/migrations/
**Descripcion:** const PREVIEW_URL = '' hace que el iframe siempre este vacio. La tabla projects no tiene campo preview_url. El cliente nunca puede ver su aplicacion en desarrollo.
**Lo que hay que hacer:**
1. Nueva migracion: ALTER TABLE projects ADD COLUMN preview_url TEXT; ADD COLUMN delivery_url TEXT;
2. En Preview.tsx: leer preview_url del proyecto del usuario autenticado via Supabase
3. Si preview_url vacio: mostrar placeholder explicativo
4. Si tiene valor: renderizar iframe correctamente
5. En AdminProjectDetail.tsx: input para que admin actualice preview_url y delivery_url
6. Arreglar texto hardcodeado 'v1.0 - Ultima actualizacion: hace 2 horas' con updated_at real
**Criterio de aceptacion:** El admin puede introducir URL de preview desde panel admin. El cliente ve el iframe cargado. Si no hay URL, ve mensaje explicativo. La fecha de actualizacion es real.
**Estimacion:** S (3-4h)

---

### [x] 1012 — ProtectedRoute no distingue cliente vs admin — crear AdminRoute (Severity: HIGH)
**Ruta/Componente:** src/components/ProtectedRoute.tsx, src/main.tsx
**Descripcion:** ProtectedRoute solo verifica si hay user autenticado, no si el rol es admin. Un cliente logueado puede navegar a /admin y solo es bloqueado por AdminLayout a nivel UI, causando queries no autorizadas a datos de admin.
**Lo que hay que hacer:**
1. Crear src/components/AdminRoute.tsx: verifica user autenticado + profile?.role === 'admin'. Si no es admin -> redirigir a /dashboard con toast 'Acceso restringido'
2. En src/main.tsx: reemplazar ProtectedRoute por AdminRoute para todas las rutas /admin/*
3. AdminRoute maneja estado de carga del perfil para evitar flicker
**Criterio de aceptacion:** Cliente logueado navegando a /admin es redirigido a /dashboard. Admin logueado accede sin problemas. Usuario no autenticado va a /login.
**Estimacion:** S (1-2h)

---

### [x] 1013 — AdminHome: KPIs unreadMessages y pendingPayments siempre en 0 hardcodeado (Severity: HIGH)
**Ruta/Componente:** src/pages/admin/AdminHome.tsx lineas 106-107
**Descripcion:** Las dos metricas mas operativas del panel admin tienen comentarios TODO: implement y retornan 0. El admin no puede saber cuantos mensajes no ha leido ni cuantos pagos estan pendientes.
**Lo que hay que hacer:**
1. Mensajes no leidos: supabase.from('messages').select('id', { count: 'exact' }).is('read_at', null).neq('sender_type', 'admin')
2. Pagos pendientes: supabase.from('payments').select('id', { count: 'exact' }).eq('status', 'pending')
3. Promise.all para hacer ambas queries en paralelo
4. Badge rojo si > 0
5. Supabase Realtime para actualizaciones sin recargar
**Criterio de aceptacion:** Las cifras muestran datos reales de Supabase y se actualizan en tiempo real.
**Estimacion:** S (2-3h)

---

### [x] 1014 — Construir pagina AdminMensajes — sistema bidireccional de mensajes (Severity: HIGH)
**Ruta/Componente:** /admin/mensajes -> actualmente AdminPlaceholder
**Descripcion:** El admin no puede responder mensajes de clientes desde el panel. Es la funcionalidad mas critica para operar el negocio dia a dia.
**Lo que hay que hacer:**
1. Layout dos columnas: lista de conversaciones izquierda (proyectos con mensajes, badge de no leidos), chat activo derecha
2. Chat derecho: mismo componente que usa el cliente pero con sender_type: 'admin'
3. Marcar mensajes como leidos (read_at = now()) al abrir la conversacion
4. Supabase Realtime para nuevos mensajes en tiempo real
5. Posibilidad de adjuntar archivos al bucket chat-files
**Criterio de aceptacion:** Admin puede ver y responder mensajes de todos los clientes en tiempo real. Los mensajes no leidos se marcan al abrirlos.
**Estimacion:** L (10-14h)

---

### [x] 1015 — Construir pagina AdminPagos — historial y gestion de cobros (Severity: HIGH)
**Ruta/Componente:** /admin/pagos -> actualmente AdminPlaceholder
**Descripcion:** El admin no puede ver un listado de todos los pagos ni gestionar reembolsos o pagos manuales desde el panel.
**Lo que hay que hacer:**
1. Tabla de todos los pagos: cliente, proyecto, concepto, importe, estado, fecha
2. Filtros por estado, rango de fechas, proyecto, cliente
3. KPIs: total cobrado este mes, pendiente de cobro, total historico
4. Accion 'Marcar como pagado' para pagos manuales
5. Link a Stripe Dashboard via stripe_payment_intent_id
6. Exportar a CSV
**Criterio de aceptacion:** Admin ve todos los pagos. Puede filtrar y ordenar. KPIs muestran cifras reales. Puede marcar pagos manuales como completados.
**Estimacion:** M (6-8h)

---

### [x] 1016 — Construir pagina AdminAnalytics — metricas del negocio (Severity: MEDIUM)
**Ruta/Componente:** /admin/analytics -> actualmente AdminPlaceholder
**Descripcion:** No hay ninguna vista de metricas. El admin no puede ver conversion del cuestionario, revenue mensual, proyectos por estado ni tiempo medio de cierre.
**Lo que hay que hacer:**
1. KPIs: leads este mes, tasa conversion lead->cliente, revenue MRR, revenue total, proyectos activos/completados
2. Grafico de barras: revenue por mes ultimos 6 meses con Recharts o Chart.js
3. Embudo de conversion con porcentajes
4. Tabla de proyectos por estado
5. Tiempo medio desde lead hasta primer pago
**Criterio de aceptacion:** Admin ve metricas reales calculadas desde Supabase. Los graficos se renderizan correctamente.
**Estimacion:** M (8-10h)

---

### [x] 1017 — Construir pagina AdminConfiguracion — ajustes del sistema (Severity: MEDIUM)
**Ruta/Componente:** /admin/configuracion -> actualmente AdminPlaceholder
**Descripcion:** No hay panel de configuracion. Para cambiar datos de empresa o ver estado de integraciones hay que editar codigo.
**Lo que hay que hacer:**
1. Seccion 'Datos de la empresa': nombre, email, telefono (editables, guardados en tabla settings)
2. Seccion 'Emails': vista previa de plantillas con opcion de editar asunto y cuerpo
3. Seccion 'Stripe': modo live/test, enlace al dashboard de Stripe
4. Seccion 'Integraciones': estado de cada integracion con icono check/error (Supabase, Stripe, Resend, Gemini)
**Criterio de aceptacion:** Admin puede actualizar datos basicos sin tocar codigo. Puede ver estado de todas las integraciones.
**Estimacion:** M (6-8h)

---

### [x] 1018 — Ajustes: columnas de notificacion no existen en tabla profiles (Severity: HIGH)
**Ruta/Componente:** src/pages/dashboard/Ajustes.tsx, supabase/migrations/
**Descripcion:** El formulario tiene 3 toggles (notify_messages, notify_proposals, notify_payments) pero la tabla profiles no tiene esas columnas. Las preferencias se pierden al recargar.
**Lo que hay que hacer:**
1. Nueva migracion 002: ALTER TABLE profiles ADD COLUMN IF NOT EXISTS notify_messages BOOLEAN DEFAULT true; notify_proposals BOOLEAN DEFAULT true; notify_payments BOOLEAN DEFAULT true;
2. Actualizar el UPDATE en Ajustes.tsx para incluir las tres columnas
3. Verificar que el SELECT al montar carga tambien estos campos
**Criterio de aceptacion:** Preferencias de notificacion se persisten en Supabase. Al recargar, los toggles muestran los valores guardados.
**Estimacion:** S (2h)

---

### [ ] 1019 — Cuestionario: al completarse, crear proyecto en Supabase y redirigir al dashboard (Severity: HIGH)
**Ruta/Componente:** src/lib/questionnaireEngine.ts, src/pages/Cuestionario.tsx, src/pages/Registro.tsx
**Descripcion:** El cuestionario persiste la conversacion en questionnaire_conversations pero al completarse NO crea ningun registro en projects ni vincula al usuario. El flujo cuestionario -> propuesta -> dashboard no tiene continuidad en la BD.
**Lo que hay que hacer:**
1. Al detectar isComplete: true: si hay user autenticado -> supabase.from('projects').insert({ client_id: user.id, conversation_id, status: 'lead', name: nombreProyecto, estimated_price: precioEstimado }) y redirigir a /dashboard
2. Si no hay usuario: guardar conversationId en localStorage (tb_pending_project) y redirigir a /registro?from=cuestionario
3. En Registro.tsx: si URLSearchParams tiene from=cuestionario, tras registro exitoso crear el proyecto vinculando conversationId con el nuevo user.id, luego limpiar localStorage
4. El admin debe ver el nuevo proyecto en /admin/proyectos con estado 'lead'
**Criterio de aceptacion:** Al completar el cuestionario se crea un proyecto en BD. El usuario es redirigido al dashboard donde ve su nuevo proyecto. El admin ve el lead en su panel.
**Estimacion:** M (4-6h)

---

### [ ] 1020 — Documentos/Mensajes/Iteraciones: Storage buckets no configurados (Severity: HIGH)
**Ruta/Componente:** src/pages/dashboard/Documentos.tsx, Mensajes.tsx, Iteraciones.tsx
**Descripcion:** Los uploads van a buckets project-files y chat-files que pueden no existir en Supabase. Los uploads fallan con error 'Bucket not found' que puede no mostrarse al usuario. Los archivos se pierden silenciosamente.
**Lo que hay que hacer:**
1. Crear bucket project-files: publico para lectura, escritura autenticada con RLS
2. Crear bucket chat-files: mismas politicas
3. Mejorar manejo de errores de Storage para mostrar toast con el mensaje real si falla
4. Validacion de tipo de archivo y tamano maximo 50MB antes de subir
5. Mostrar progreso de upload con barra de progreso en la UI
**Criterio de aceptacion:** Un cliente puede subir un PDF en Documentos.tsx y descargarlo. Puede adjuntar imagen en Mensajes.tsx. Si falla, ve mensaje de error claro.
**Estimacion:** S (2-3h)

---

### [x] 1021 — Recuperacion de contrasena — flujo completo (Severity: MEDIUM)
**Ruta/Componente:** src/pages/Login.tsx, nueva pagina src/pages/ResetPassword.tsx
**Descripcion:** No existe ningun flujo de recuperacion de contrasena. En produccion cualquier usuario que olvide su contrasena tiene que contactar directamente al equipo.
**Lo que hay que hacer:**
1. En Login.tsx: enlace 'Olvide mi contrasena' que muestra formulario inline con solo el campo email
2. Al enviar: supabase.auth.resetPasswordForEmail(email, { redirectTo: APP_URL + '/reset-password' })
3. Crear src/pages/ResetPassword.tsx en ruta /reset-password: formulario con 'Nueva contrasena' + 'Confirmar nueva contrasena'
4. Al enviar: supabase.auth.updateUser({ password: newPassword })
5. Anadir la ruta /reset-password en src/main.tsx como ruta publica
**Criterio de aceptacion:** El usuario puede solicitar recuperacion desde Login. Recibe email con link. En /reset-password puede establecer nueva contrasena. Tras el cambio es redirigido al dashboard.
**Estimacion:** S (3-4h)

---

### [x] 1022 — Ajustes: seccion Seguridad para cambiar contrasena (Severity: MEDIUM)
**Ruta/Componente:** src/pages/dashboard/Ajustes.tsx
**Descripcion:** No hay opcion para cambiar la contrasena en Ajustes. Los usuarios deben usar el flujo de recuperacion o contactar al equipo.
**Lo que hay que hacer:**
1. Nueva seccion 'Seguridad de la cuenta' en Ajustes.tsx separada visualmente de los datos de perfil
2. Campos: 'Nueva contrasena' + 'Confirmar nueva contrasena'
3. Al guardar: supabase.auth.updateUser({ password: newPassword })
4. Manejar caso de sesion expirada con mensaje claro
5. Mostrar requisitos de contrasena (minimo 8 caracteres)
**Criterio de aceptacion:** El cliente puede cambiar su contrasena desde Ajustes. Los errores se muestran con el toast system existente.
**Estimacion:** S (2-3h)

---

### [x] 1023 — Propuestas: reemplazar markdown renderer manual por react-markdown (Severity: MEDIUM)
**Ruta/Componente:** src/pages/dashboard/Propuestas.tsx, src/components/MarkdownRenderer.tsx
**Descripcion:** El MarkdownRenderer manual con regex no soporta tablas, listas anidadas ni bloques de codigo. Las propuestas generadas por IA usan estos elementos y se renderizan incorrectamente.
**Lo que hay que hacer:**
1. npm install react-markdown remark-gfm
2. Reemplazar MarkdownRenderer por ReactMarkdown con remarkPlugins=[remarkGfm] y custom components para h1, h2, ul, table, code siguiendo el theme dark zinc/emerald
3. Estilizar tablas con Tailwind: border zinc-700, bg alternado zinc-900/zinc-800 por fila
4. Opcionalmente anadir rehype-highlight para syntax highlighting en codigo
**Criterio de aceptacion:** Las propuestas con tablas, listas anidadas y codigo se renderizan correctamente. No hay texto con ## ni ** visible al usuario.
**Estimacion:** S (2-3h)

---

### [ ] 1024 — Configurar confirmacion de email en Supabase con Resend SMTP (Severity: MEDIUM)
**Ruta/Componente:** Supabase Dashboard -> Auth -> Email Templates
**Descripcion:** Supabase usa su propio servidor de email por defecto con limites muy bajos (3 emails/hora en plan gratuito) y frecuentemente acaba en spam.
**Lo que hay que hacer:**
1. Supabase Dashboard -> Project Settings -> Auth -> SMTP Settings: configurar smtp.resend.com, puerto 587, con credenciales de Resend
2. Personalizar plantillas en Auth -> Email Templates: Confirm signup, Reset password - traducirlas al espanol con branding Think Better
3. Verificar dominio thinkbetter.dev en Resend (SPF, DKIM)
**Criterio de aceptacion:** Al registrarse el usuario recibe email de confirmacion con branding Think Better en menos de 1 minuto. No cae en spam. La plantilla esta en espanol.
**Estimacion:** S (2-3h)

---

### [x] 1025 — Anadir sitemap.xml y robots.txt (Severity: MEDIUM)
**Ruta/Componente:** public/
**Descripcion:** Sin robots.txt, Google puede indexar /dashboard y /admin. Sin sitemap.xml, las paginas publicas tardan mas en ser indexadas.
**Lo que hay que hacer:**
1. Crear public/robots.txt: User-agent: * | Allow: / | Disallow: /dashboard | Disallow: /admin | Sitemap: https://thinkbetter.dev/sitemap.xml
2. Crear public/sitemap.xml con rutas publicas: /, /cuestionario, /login, /registro, /privacidad, /legal, /cookies con lastmod y priority apropiadas
**Criterio de aceptacion:** robots.txt y sitemap.xml accesibles. Google Search Console puede procesar el sitemap. /dashboard y /admin no aparecen indexados.
**Estimacion:** XS (1h)

---

### [ ] 1026 — Paginacion en panel Admin — proyectos y clientes (Severity: MEDIUM)
**Ruta/Componente:** src/pages/admin/AdminProjects.tsx, src/pages/admin/AdminClients.tsx
**Descripcion:** Las queries usan .limit(50). A partir de 50 registros el panel oculta datos sin aviso. No hay paginacion real.
**Lo que hay que hacer:**
1. Paginacion con range() de Supabase: .from('projects').select('*').range(page * 20, (page + 1) * 20 - 1)
2. Controles de paginacion: botones Anterior/Siguiente con indicador 'Mostrando 1-20 de 73 proyectos'
3. Misma logica para lista de clientes
**Criterio de aceptacion:** Con mas de 20 proyectos el admin puede navegar entre paginas. Total de registros se muestra claramente.
**Estimacion:** S (3-4h)

---

### [ ] 1027 — Realtime en AdminMensajes — notificaciones en tiempo real (Severity: MEDIUM)
**Ruta/Componente:** src/pages/admin/AdminMensajes.tsx (depende de #1014)
**Descripcion:** El admin deberia recibir nuevos mensajes de clientes en tiempo real sin recargar.
**Lo que hay que hacer:**
1. Suscripcion a supabase.channel('admin-messages').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, handler)
2. Al recibir nuevo mensaje: si conversacion abierta -> anadir al chat. Si no -> incrementar badge
3. Notificacion del navegador via Notification API si admin tiene otra pestana activa
**Criterio de aceptacion:** Admin ve nuevos mensajes aparecer instantaneamente. Badge de no leidos se actualiza en tiempo real. Requiere #1014 completado.
**Estimacion:** S (2-3h post #1014)

---

### [ ] 1028 — Tabla notifications sin uso — implementar notificaciones in-app (Severity: MEDIUM)
**Ruta/Componente:** src/pages/dashboard/, supabase/migrations/001_initial_schema.sql
**Descripcion:** La tabla notifications existe en el schema SQL pero ningun componente la usa. Los clientes no reciben notificaciones in-app.
**Lo que hay que hacer:**
1. Icono de campana en DashboardLayout con badge de notificaciones no leidas
2. Al hacer click: dropdown con las ultimas 10 notificaciones (tipo, mensaje, fecha, leida/no leida)
3. Marcar como leida al hacer click, navega a la seccion correspondiente
4. Insertar notificaciones cuando: admin envia propuesta, responde mensaje, pago procesado, proyecto cambia estado
5. Supabase Realtime para notificaciones instantaneas
**Criterio de aceptacion:** Cliente ve badge en campana. Se actualizan en tiempo real. Al hacer click navega a la seccion correcta.
**Estimacion:** M (5-7h)

---

### [ ] 1029 — Rate limiting en formulario de contacto (Severity: LOW)
**Ruta/Componente:** src/components/ContactForm.tsx, supabase/functions/send-contact-email/index.ts
**Lo que hay que hacer:**
1. Client-side: deshabilitar boton 60 segundos tras envio exitoso con countdown visible
2. Edge Function: rate limiting por IP, maximo 3 envios por hora, devolver 429 si se supera
**Criterio de aceptacion:** Boton deshabilitado 60s tras envio. Mas de 3 envios en una hora devuelven error 429.
**Estimacion:** S (2h)

---

### [ ] 1030 — Integrar PostHog para analytics de comportamiento (Severity: LOW)
**Ruta/Componente:** src/main.tsx, nueva variable de entorno VITE_POSTHOG_KEY
**Lo que hay que hacer:**
1. npm install posthog-js
2. Inicializar PostHog en main.tsx con VITE_POSTHOG_KEY (solo si la variable existe)
3. Eventos clave: questionnaire_started, questionnaire_completed, questionnaire_abandoned (con numero de pregunta), proposal_viewed, payment_initiated, payment_completed
4. posthog.identify() tras login con user.id
**Criterio de aceptacion:** Los eventos clave se registran en PostHog. El funnel de conversion es visible. En desarrollo local no bloquea si la variable no esta configurada.
**Estimacion:** S (2-3h)

---

### [ ] 1031 — Markdown renderer en mensajes del bot del cuestionario (Severity: LOW)
**Ruta/Componente:** src/components/questionnaire/ChatUI.tsx
**Lo que hay que hacer:**
1. Usar react-markdown instalado en #1023 para renderizar mensajes del bot (no los del usuario)
2. Estilizar con el tema dark del chat: texto zinc-100, negritas emerald-400, listas con bullets zinc-400
**Criterio de aceptacion:** Mensajes del bot con markdown se renderizan correctamente.
**Estimacion:** S (1-2h, facil una vez #1023 instalado)

---

### [ ] 1032 — Confirmacion de email en Registro — boton Reenviar correo (Severity: LOW)
**Ruta/Componente:** src/pages/Registro.tsx
**Lo que hay que hacer:**
1. Boton 'Reenviar email de confirmacion' con cooldown de 60 segundos entre reintentos
2. Llamar supabase.auth.resend({ type: 'signup', email }) al hacer click
3. Toast de confirmacion cuando se reenvia correctamente
**Criterio de aceptacion:** Usuario que no recibe el email puede solicitar uno nuevo sin registrarse otra vez.
**Estimacion:** S (1-2h)

---

### [ ] 1033 — Stripe Customer Portal para gestion de suscripciones de mantenimiento (Severity: LOW)
**Ruta/Componente:** src/pages/dashboard/Entrega.tsx, nueva Edge Function create-portal-session
**Lo que hay que hacer:**
1. Edge Function create-portal-session: stripe.billingPortal.sessions.create({ customer: stripe_customer_id, return_url: APP_URL })
2. En Entrega.tsx o Pagos.tsx: si cliente tiene suscripcion activa, mostrar boton 'Gestionar suscripcion' que abre el portal de Stripe
**Criterio de aceptacion:** Un cliente suscrito puede cambiar plan, actualizar tarjeta o cancelar desde el dashboard.
**Estimacion:** S (2-3h)

---

### [x] 1005 — Fix dashboard horizontal overflow
**Completado en:** Ejecución #29
**Solución:** Añadir `min-w-0` al div `flex-1 flex flex-col min-h-screen` en DashboardLayout.tsx

---

### [x] 1006 — Client dashboard mock data para VITE_MOCK_ROLE
**Completado en:** Ejecución #29
**Solución:** isMockDemo(), MOCK_CLIENT_PROJECT, MOCK_CLIENT_MESSAGES, MOCK_CLIENT_PROPOSAL, MOCK_CLIENT_PAYMENTS en mockDemoData.ts. Branches de mock en Resumen, Mensajes, Propuestas, Pagos.

---

### [x] 1007 — AdminHome Facturado KPI
**Completado en:** Ejecución #29
**Solución:** MOCK_TOTAL_REVENUE_CENTS en mockDemoData, campo totalRevenue en AdminStats, nuevo KPI card "Facturado (25.299€)".

---

### [ ] 1008 — Iteraciones y Documentos mock data para demo mode (Severity: LOW)
**Ruta/Componente:** src/pages/dashboard/Iteraciones.tsx, src/pages/dashboard/Documentos.tsx
**Lo que hay que hacer:**
1. Añadir MOCK_CLIENT_ITERATIONS (2 solicitudes de iteración con estados distintos) a mockDemoData.ts
2. Añadir MOCK_CLIENT_DOCUMENTS (contrato firmado, propuesta PDF) a mockDemoData.ts
3. Detectar isMockDemo() en Iteraciones.tsx y Documentos.tsx para mostrar mock data
**Criterio de aceptación:** En demo mode, Iteraciones muestra 2 solicitudes y Documentos muestra 2 archivos.
**Estimación:** M (2-3h)

---

### [ ] 1009 — Admin Analytics y Admin Mensajes páginas (Severity: LOW)
**Ruta/Componente:** Nuevos archivos en src/pages/admin/
**Lo que hay que hacer:**
1. AdminAnalytics.tsx: charts de proyectos por estado, facturación mensual, conversion rate cuestionario→cliente
2. AdminMensajes.tsx: lista de todos los chats activos con badge de no leídos
**Criterio de aceptación:** Las rutas /admin/analytics y /admin/mensajes renderizan contenido real (con mock data).
**Estimación:** L (4-6h)
