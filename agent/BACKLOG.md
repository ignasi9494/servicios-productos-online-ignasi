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

### [ ] 900 - Add contact form to landing (or rename #contacto section)
- **Where**: `/` — Footer/Maintenance section has `id="contacto"` but contains hosting plans
- **What**: Either (a) add real contact form at bottom of landing, or (b) rename section to #mantenimiento and update any links
- **Impact**: Users have no direct contact channel except the questionnaire
- **Size**: S

### [ ] 901 - Fix cookie banner flash on dismiss
- **Where**: `src/components/CookieBanner.tsx`
- **What**: Banner should disappear immediately on accept/reject, not flash before hiding
- **Size**: S

### [ ] 902 - Legal pages titles (Privacidad, AvisoLegal, Cookies)
- **Where**: `src/pages/Privacidad.tsx`, `src/pages/AvisoLegal.tsx`, `src/pages/Cookies.tsx`
- **What**: Add usePageTitle to legal pages
- **Size**: S
