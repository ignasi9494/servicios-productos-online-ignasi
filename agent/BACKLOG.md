# Think Better - Improvement Backlog

> Prioritized list of improvements for the autonomous agent.
> Agent picks the highest priority uncompleted item each execution.
> Last updated: 2026-03-13

---

## P0 - Critical (Landing fixes)

### [ ] 001 - Fix placeholder WhatsApp number in Footer
- **Where**: `src/components/Footer.tsx`
- **What**: Replace `34XXXXXXXXX` placeholder WhatsApp number with a real number or remove the WhatsApp link until a real number is provided
- **Impact**: Broken functionality - users clicking WhatsApp link get an error
- **Size**: S

### [ ] 002 - Fix Gemini API key exposed in client bundle
- **Where**: `vite.config.ts`
- **What**: The `GEMINI_API_KEY` is injected via `define` into the client bundle. Remove this or move to server-side only. Currently no frontend code uses it anyway.
- **Impact**: Security vulnerability - API key visible in browser
- **Size**: S

### [ ] 003 - Fix dead-end #contact CTA loop
- **Where**: `src/components/Footer.tsx`, `src/components/Navbar.tsx`
- **What**: Replace "Agendar llamada" with a CTA that redirects to the new questionnaire flow (#questionnaire). Update all #contact links across Navbar, AddOns, Retainer, Pricing to point to the questionnaire instead.
- **Impact**: Main conversion action is broken - now will funnel to questionnaire
- **Size**: M

### [ ] 004 - Fix broken legal page links (404)
- **Where**: `src/components/Footer.tsx`
- **What**: Add react-router with routes for `/privacidad`, `/legal`, `/cookies`. Create basic legal pages content.
- **Impact**: Legal compliance issue + broken links
- **Size**: M

---

## P1 - Important (Landing improvements)

### [ ] 005 - Translate team roles to Spanish
- **Where**: `src/components/Team.tsx`
- **What**: Team roles are in English. Translate to Spanish.
- **Impact**: Language inconsistency
- **Size**: S

### [ ] 006 - Fix placeholder social media links
- **Where**: `src/components/Footer.tsx`
- **What**: Twitter, LinkedIn, GitHub links point to `#`. Add real URLs or remove.
- **Impact**: Non-functional links reduce trust
- **Size**: S

### [ ] 007 - Add FAQ accordion accessibility (ARIA)
- **Where**: `src/components/FAQ.tsx`
- **What**: Add `aria-expanded`, `aria-controls`, `id` to buttons and `role="region"`, `aria-labelledby` to answer panels.
- **Impact**: Accessibility
- **Size**: S

### [ ] 008 - Fix mobile menu accessibility
- **Where**: `src/components/Navbar.tsx`
- **What**: Add `role="dialog"`, `aria-modal`, toggle aria-label, trap focus, close on Escape, lock body scroll.
- **Impact**: Mobile menu UX
- **Size**: M

### [ ] 009 - Add `lang="es"` to HTML + meta tags + SEO basics
- **Where**: `index.html`
- **What**: Set `<html lang="es">`, add `<title>`, `<meta description>`, Open Graph tags, favicon, canonical URL.
- **Impact**: SEO and accessibility
- **Size**: S

### [ ] 010 - Respect prefers-reduced-motion
- **Where**: `src/index.css`
- **What**: Wrap `scroll-behavior: smooth` in `@media (prefers-reduced-motion: no-preference)`.
- **Impact**: Accessibility
- **Size**: S

---

## PLATFORM - Fase 1: Infraestructura Base

### [ ] 100 - Install react-router and set up routing structure
- **Where**: `src/App.tsx`, new `src/router.tsx`, `package.json`
- **What**: Install react-router-dom. Create router with routes: `/` (landing), `/cuestionario` (questionnaire), `/login`, `/registro`, `/dashboard/*` (protected), `/privacidad`, `/legal`, `/cookies`. Create layout components for public vs authenticated pages. Keep the current landing as the `/` route.
- **Impact**: Foundation for the entire platform - nothing else works without routing
- **Size**: M
- **Dependencies**: None

### [ ] 101 - Set up Supabase project and database schema
- **Where**: New `supabase/` folder, `package.json`, `.env.example`
- **What**: Install @supabase/supabase-js. Create Supabase client config. Design and create the full database schema:
  - `profiles` (id, user_id, full_name, company, phone, sector, role: 'client'|'admin', created_at)
  - `projects` (id, client_id, name, status: 'questionnaire'|'pending_proposal'|'proposal_sent'|'proposal_accepted'|'in_development'|'in_review'|'completed'|'delivered', plan: 'launch'|'build'|'scale', base_price, extras_price, total_price, delivery_days, max_iterations, used_iterations, contract_signed_at, created_at)
  - `questionnaire_responses` (id, project_id, step, question_key, answer_text, answer_json, created_at)
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

### [ ] 102 - Set up Supabase Auth with email/password
- **Where**: New `src/lib/supabase.ts`, `src/contexts/AuthContext.tsx`, `src/pages/Login.tsx`, `src/pages/Register.tsx`
- **What**: Create Supabase client singleton. Create AuthContext with login, register, logout, user state. Create Login page (email + password, link to register). Create Register page (name, company, email, password, phone). Add auth state persistence. Create ProtectedRoute component that redirects to /login if not authenticated. Create `profiles` row on signup via trigger or client-side. Style all auth pages with the existing dark theme (zinc-950, emerald accents).
- **Impact**: Users can register and login - gate for dashboard access
- **Size**: M
- **Dependencies**: 100 (routing), 101 (database)

### [ ] 103 - Set up Stripe integration for payments
- **Where**: New `src/lib/stripe.ts`, Supabase Edge Function `process-payment`
- **What**: Install @stripe/stripe-js and @stripe/react-stripe-js. Create Stripe context/provider. Create Edge Function for creating Checkout Sessions (deposit payment and final payment). Create Edge Function webhook handler for payment confirmations (updates `payments` and `projects` tables). Support: one-time payments (deposit + final) and recurring subscriptions (monthly maintenance). Create payment status component showing payment history per project.
- **Impact**: Revenue collection - critical for business model
- **Size**: L
- **Dependencies**: 101 (database)

---

## PLATFORM - Fase 2: Cuestionario de Cualificacion

### [ ] 200 - Create multi-step questionnaire UI shell
- **Where**: New `src/pages/Questionnaire.tsx`, new `src/components/questionnaire/QuestionnaireShell.tsx`
- **What**: Create the questionnaire page accessible from landing CTA and `/cuestionario` route. Build the multi-step shell with: progress bar (step X of 6), back/next navigation, step indicator, animated transitions between steps (Framer Motion). Persist answers in local state (later saved to DB). Mobile-responsive layout. Each step is a separate component rendered inside the shell. Dark theme matching landing.
- **Impact**: Entry point for all new leads
- **Size**: M
- **Dependencies**: 100 (routing)

### [ ] 201 - Questionnaire Step 1: Tipo de proyecto
- **Where**: New `src/components/questionnaire/Step1ProjectType.tsx`
- **What**: Create first step with questions:
  1. "Que tipo de proyecto necesitas?" - Visual card selector with icons: Landing page, Web corporativa, E-commerce, App web/SaaS, App movil, Automatizacion, Otro (text input)
  2. "Es un proyecto nuevo o mejora de algo existente?" - Toggle: Nuevo / Mejora
  3. "Tienes ya una web?" - Si (campo URL) / No
  All cards should have hover effects, emerald accent on selected, and be responsive (2 cols on mobile, 3-4 on desktop).
- **Impact**: Classifies the project type immediately
- **Size**: S
- **Dependencies**: 200

### [ ] 202 - Questionnaire Step 2: Alcance funcional
- **Where**: New `src/components/questionnaire/Step2Scope.tsx`
- **What**: Create second step with questions (each as a styled card/toggle):
  1. "Cuantas paginas/pantallas estimas?" - Selector: 1-5 / 5-10 / 10-20 / 20+ / No lo se
  2. "Necesitas registro/login de usuarios?" - No / Si, basico (email+password) / Si, con roles (admin, usuario, etc.)
  3. "Necesitas pasarela de pago?" - No / Si, pagos unicos / Si, suscripciones recurrentes
  4. "Necesitas panel de administracion?" - No / Si, basico (ver datos) / Si, avanzado (CRUD completo)
  5. "Necesitas base de datos?" - No / Si, simple (pocos datos) / Si, compleja (muchas tablas y relaciones)
  6. "Necesitas integraciones?" - Multi-select checkboxes: CRM (HubSpot, Salesforce), Email (Mailchimp, SendGrid), Pagos (Stripe, PayPal), Calendario, API propia, Otros (text input)
  7. "Necesitas IA integrada?" - No / Chatbot / Analisis de documentos / Automatizacion de tareas / Generacion de contenido / Otro
  Each answer should map to a pricing extra for automatic calculation.
- **Impact**: Defines the scope and enables automatic pricing
- **Size**: M
- **Dependencies**: 200

### [ ] 203 - Questionnaire Step 3: Diseno y marca
- **Where**: New `src/components/questionnaire/Step3Design.tsx`
- **What**: Create third step:
  1. "Tienes identidad visual?" - Si (upload logo, specify colors hex/name, specify fonts) / No, necesito crearla / No, pero tengo preferencias
  2. "Tienes referencia de diseno?" - Campo para 1-3 URLs de webs que le gusten + texto opcional de que les gusta de cada una
  3. "Preferencia de estilo?" - Visual cards con previews: Minimalista (clean, whitespace), Corporativo (profesional, serio), Moderno/Bold (colores fuertes, gradientes), Tech/Dark (como nuestra landing), Otro
  4. "Responsive movil es prioritario?" - Si, imprescindible / Prefiero desktop primero / Ambos igual de importantes
- **Impact**: Design direction for proposals
- **Size**: S
- **Dependencies**: 200

### [ ] 204 - Questionnaire Step 4: Documentacion y archivos
- **Where**: New `src/components/questionnaire/Step4Documentation.tsx`
- **What**: Create fourth step:
  1. "Sube documentos de referencia" - Drag-and-drop file upload zone. Accept: PDF, DOC, DOCX, TXT, PNG, JPG, SVG. Max 10 files, max 25MB total. Show file list with names, sizes, remove button. Store in Supabase Storage bucket `questionnaire-files`.
  2. "Describe tu vision del proyecto" - Large textarea (min 3 rows, max 500 chars) with character count
  3. "Graba un audio explicando tu proyecto (opcional)" - Audio recorder button using MediaRecorder API. Max 3 minutes. Show waveform visualization during recording. Save as WebM/MP3 to Supabase Storage.
  Visual indicators for upload progress, file type icons, accessibility labels.
- **Impact**: Rich context for proposal generation
- **Size**: M
- **Dependencies**: 200, 101 (Supabase Storage)

### [ ] 205 - Questionnaire Step 5: Plazos y presupuesto
- **Where**: New `src/components/questionnaire/Step5Budget.tsx`
- **What**: Create fifth step:
  1. "Cuando necesitas tenerlo?" - Visual timeline: ASAP (1-2 semanas) / Normal (3-4 semanas) / Flexible (1-2 meses) / Sin prisa
  2. "Rango de presupuesto orientativo?" - Slider or cards: 1.500-2.500€ / 5.000-9.000€ / 12.000-25.000€ / +25.000€ / Prefiero recibir presupuesto primero
  3. "Como nos has conocido?" - Select: Google, Redes sociales, Recomendacion, LinkedIn, Otro
- **Impact**: Budget qualification + marketing attribution
- **Size**: S
- **Dependencies**: 200

### [ ] 206 - Questionnaire Step 6: Datos de contacto + envio
- **Where**: New `src/components/questionnaire/Step6Contact.tsx`
- **What**: Create final step:
  1. Nombre completo (required)
  2. Empresa / Proyecto (optional)
  3. Email (required, validated)
  4. Telefono (optional, con prefijo +34 default)
  5. Sector/Industria - Select: Tecnologia, Salud, Educacion, Retail, Finanzas, Inmobiliaria, Hosteleria, Otro
  6. Checkbox: "Acepto la politica de privacidad y los terminos de servicio" (links to /privacidad y /legal)
  Submit button: "Obtener presupuesto estimado"
  On submit: save all questionnaire data to Supabase (questionnaire_responses + create project entry), trigger price calculation, show loading state, redirect to results page.
- **Impact**: Lead capture + conversion point
- **Size**: M
- **Dependencies**: 200, 101 (database)

### [ ] 207 - Automatic price calculator engine
- **Where**: New `src/lib/priceCalculator.ts`
- **What**: Create a pure TypeScript function that takes questionnaire answers and returns a price breakdown:
  ```
  Input: QuestionnaireAnswers
  Output: {
    suggestedPlan: 'launch' | 'build' | 'scale',
    basePrice: number,
    extras: Array<{ name: string, price: number, reason: string }>,
    totalEstimate: { min: number, max: number },
    estimatedDays: { min: number, max: number },
    includedIterations: number
  }
  ```
  Logic:
  - If only landing/web corporativa + no auth + no DB → Launch (1.500-2.500)
  - If app/SaaS + auth + DB + some integrations → Build (5.000-9.000)
  - If complex + IA + multiple roles + many integrations → Scale (12.000-25.000)
  - Add extras: auth +500, payments +600, admin panel +700, DB +400, each API +300, AI +800, etc.
  - Timeline based on plan + extras count
  Full unit tests for the calculator.
- **Impact**: Core business logic - drives all pricing
- **Size**: M
- **Dependencies**: None (pure logic)

### [ ] 208 - Questionnaire results page with estimated price
- **Where**: New `src/pages/QuestionnaireResults.tsx`
- **What**: After questionnaire submission, show results page:
  - Animated reveal of the estimated price range (emerald gradient, big numbers)
  - Suggested plan name (Launch/Build/Scale) with description
  - Price breakdown table: base price + each extra line item with price
  - Estimated delivery timeline
  - Included iterations count
  - Clear disclaimer: "Este es un presupuesto orientativo. En menos de 24h recibiras la propuesta definitiva."
  - CTA button: "Registrarte para recibir tu propuesta" → goes to /registro (pre-fills email if provided in questionnaire)
  - Secondary CTA: "Modificar mis respuestas" → goes back to questionnaire
  - Save results to `projects` table with status 'pending_proposal'
- **Impact**: Conversion moment - user sees value and registers
- **Size**: M
- **Dependencies**: 206, 207

---

## PLATFORM - Fase 3: Dashboard de Cliente

### [ ] 300 - Create client dashboard layout and navigation
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

### [ ] 301 - Project status tracker component
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
  Show current stage highlighted in emerald, completed stages with checkmarks, pending stages in grey. Include dates for each completed stage. Click each stage to see details.
- **Impact**: Transparency - client always knows where their project stands
- **Size**: M
- **Dependencies**: 300, 101

### [ ] 302 - Internal chat system (client side)
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

### [ ] 303 - Proposal viewer and acceptance flow
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

### [ ] 304 - Document manager in dashboard
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

### [ ] 305 - Iteration request system
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

### [ ] 306 - Payment history and billing page
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

### [ ] 307 - App preview/testing in dashboard
- **Where**: New `src/pages/dashboard/Preview.tsx`
- **What**: Embedded preview of the client's application:
  - iframe showing the staging/preview URL of their app
  - Device toggle: Desktop / Tablet / Mobile (resizes iframe)
  - "Abrir en nueva pestana" button
  - Screenshot tool: click to capture current view, annotate, send as iteration request
  - Status banner: "Version actual: v1.2 - Ultima actualizacion: [date]"
  - Notification when new version is available: "Nueva version disponible - Recargar"
- **Impact**: Client can test their app without leaving the platform
- **Size**: M
- **Dependencies**: 300

### [ ] 308 - Export/delivery flow
- **Where**: New `src/pages/dashboard/Delivery.tsx`
- **What**: Final delivery page (visible when project status is 'completed'):
  - Two options clearly presented:
    Option A: "Exportar codigo" - Download all source code as ZIP. Requires final payment. Shows: total remaining amount, what's included (source code, documentation, deployment guide). "Pagar y descargar" button → Stripe Checkout → on success, generate ZIP download link.
    Option B: "Mantener en nuestra plataforma" - Monthly hosting. Shows: maintenance plans (Basico 49€/Basico Pro 99€/Premium 199€), what's included per plan, current usage stats. "Elegir plan" → Stripe subscription.
  - If already on maintenance: show current plan info, option to export anytime
  - Clear explanation: "El codigo es 100% tuyo. Puedes exportarlo cuando quieras."
- **Impact**: Revenue model - either final payment or recurring maintenance
- **Size**: L
- **Dependencies**: 300, 103

---

## PLATFORM - Fase 4: Panel Admin / Equipo

### [ ] 400 - Admin dashboard layout
- **Where**: New `src/pages/admin/AdminLayout.tsx`, `src/pages/admin/AdminHome.tsx`
- **What**: Admin panel (role='admin' only) with:
  - Sidebar: Vista general, Proyectos, Clientes, Propuestas, Chat, Pagos, Configuracion
  - Home showing: projects pipeline kanban (by status), recent messages needing response, pending proposals, monthly revenue summary, upcoming deadlines
  - Quick actions: "Crear propuesta", "Enviar mensaje", "Actualizar estado"
- **Impact**: Team needs a management interface
- **Size**: L
- **Dependencies**: 300, 102

### [ ] 401 - Admin project management
- **Where**: New `src/pages/admin/AdminProjects.tsx`, `src/pages/admin/AdminProjectDetail.tsx`
- **What**: Project list with filters (by status, plan, date). Project detail page with:
  - All questionnaire answers (rendered nicely)
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

### [ ] 402 - AI proposal generator (admin tool)
- **Where**: New Supabase Edge Function `generate-proposal`, new `src/components/admin/ProposalGenerator.tsx`
- **What**: Admin clicks "Generar propuesta con IA" on a project. Edge Function:
  1. Fetches questionnaire answers + uploaded files (text extracted from PDFs)
  2. Builds structured prompt with all project info + pricing table
  3. Calls Claude/OpenAI API to generate a complete proposal in markdown
  4. Returns: executive summary, recommended stack, feature breakdown with prices, timeline, terms
  5. Admin reviews in editor (markdown with live preview), can edit before sending
  6. "Enviar al cliente" button: saves to `proposals` table, sends chat message + email notification
  Include prompt template that ensures consistent output format and Spanish language.
- **Impact**: 24h → minutes for proposal generation. Core differentiator.
- **Size**: L
- **Dependencies**: 401, 101

### [ ] 403 - Email notification system
- **Where**: New Supabase Edge Function `send-email`, notification triggers
- **What**: Set up transactional email system using Resend or SendGrid:
  - Trigger emails on: new chat message, proposal sent, proposal accepted, payment received, iteration completed, project delivered
  - Email templates (HTML) matching brand (dark theme, emerald accents)
  - Each email includes: subject, body summary, "Ver en la plataforma" CTA button linking to relevant dashboard page
  - Track email sent status in `notifications` table
  - Respect user email preferences (can disable non-critical emails)
  - Rate limiting to avoid spam
- **Impact**: Users stay informed even when not on the platform
- **Size**: M
- **Dependencies**: 101

---

## PLATFORM - Fase 5: Pricing Detallado en Landing

### [ ] 500 - Redesign pricing section with detailed inclusions/exclusions
- **Where**: `src/components/Pricing.tsx`
- **What**: Overhaul the pricing cards to show much more detail:
  - Each plan: clear list of what's INCLUDED (green checks) and what's NOT included (grey/red X)
  - Expandable "Ver todo lo incluido" section per plan
  - Show number of pages, iterations, support days for each plan
  - Add "Extras disponibles" section below plans showing add-on prices
  - Comparison table (expandable) showing all features across all 3 plans
  - "No estoy seguro" CTA → links to questionnaire
  - Keep the current visual style but add more information density
  - Mobile: plans stack vertically, comparison table scrolls horizontally
- **Impact**: Transparency + avoids scope creep disputes
- **Size**: M
- **Dependencies**: None

### [ ] 501 - Add extras/add-ons pricing detail
- **Where**: `src/components/AddOns.tsx` (redesign)
- **What**: Redesign add-ons section to be a clear pricing table:
  - Group by category: Autenticacion, Pagos, Admin, Base de datos, Integraciones, IA, Diseno, Soporte
  - Each extra: name, short description, price range, which plans it applies to
  - Visual indicator of complexity (S/M/L icons)
  - Tooltip or expandable with more details on what each extra includes
  - "Esto se calcula automaticamente cuando rellenas el cuestionario" note
- **Impact**: Complete pricing transparency
- **Size**: M
- **Dependencies**: None

### [ ] 502 - Add maintenance plans section to landing
- **Where**: New `src/components/Maintenance.tsx`
- **What**: New section after Retainer showing monthly hosting/maintenance plans:
  - 3 tiers: Basico (49€/mes), Pro (99€/mes), Premium (199€/mes)
  - Include: hosting, DB limits, support level, uptime SLA, backups
  - Comparison table format
  - Explain: "Tu app funciona en nuestra infraestructura. Nos encargamos de todo."
  - VS "Tambien puedes exportar el codigo y gestionarlo tu mismo."
- **Impact**: Recurring revenue model visibility
- **Size**: S
- **Dependencies**: None

### [ ] 503 - Update FAQ with new platform questions
- **Where**: `src/components/FAQ.tsx`
- **What**: Add new FAQ entries:
  - "Como funciona el cuestionario?" → Explains the questionnaire flow
  - "Que pasa despues de rellenar el cuestionario?" → Explains 24h proposal
  - "Puedo hablar con alguien antes de decidir?" → Chat/WhatsApp
  - "Que son las iteraciones de cambios?" → Explains iteration system
  - "Que pasa si no me gusta el resultado?" → Money-back guarantee
  - "Puedo exportar el codigo o tengo que quedarme?" → Both options
  - "Como funciona el mantenimiento mensual?" → Explains plans
  - "Que pasa con mis datos si cancelo?" → Data export + 30 days grace
  Update existing FAQ entries to reference the new platform flow.
- **Impact**: Answers objections, builds trust
- **Size**: S
- **Dependencies**: None

---

## PLATFORM - Fase 6: Polish y UX

### [ ] 600 - Landing CTA flow update
- **Where**: `src/components/Hero.tsx`, `src/components/Navbar.tsx`, all CTA buttons
- **What**: Update all main CTAs across the landing to funnel to the questionnaire:
  - Hero primary CTA: "Calcula tu presupuesto en 3 minutos" → `/cuestionario`
  - Hero secondary CTA: "Ver planes y precios" → `#pricing`
  - Navbar CTA: "Empezar proyecto" → `/cuestionario`
  - Pricing CTAs: "Empezar mi web" / "Lanzar mi producto" / "Hablar con el equipo" → `/cuestionario?plan=launch|build|scale` (pre-selects plan)
  - Footer CTA: "Empezar ahora" → `/cuestionario`
  - Remove all dead-end #contact links
- **Impact**: All roads lead to the questionnaire (lead capture)
- **Size**: M
- **Dependencies**: 200

### [ ] 601 - Add cookie consent banner
- **Where**: New `src/components/CookieConsent.tsx`
- **What**: GDPR-compliant cookie banner with accept/reject/customize.
- **Impact**: Legal compliance for EU users
- **Size**: S
- **Dependencies**: None

### [ ] 602 - Add loading states and error boundaries
- **Where**: Multiple files
- **What**: Add React error boundary wrapping the app. Add skeleton loading states for dashboard pages. Add toast notifications for actions (message sent, file uploaded, etc.). Add 404 page for unknown routes.
- **Impact**: Professional UX
- **Size**: M
- **Dependencies**: 100

### [ ] 603 - Add responsive improvements across all new pages
- **Where**: All new components
- **What**: Review and fix all new pages at 320px, 375px, 768px, 1024px, 1280px widths. Ensure dashboard sidebar collapses to bottom nav on mobile. Ensure chat is full-screen on mobile. Ensure questionnaire is comfortable on mobile with large touch targets.
- **Impact**: Mobile users can use the platform
- **Size**: M
- **Dependencies**: All platform features

---

## Landing improvements (lower priority now)

### [ ] 011 - Add section IDs for deep linking
- **Where**: `src/components/SocialProof.tsx`, `src/components/AddOns.tsx`, `src/components/Retainer.tsx`
- **What**: Add `id` attributes to sections that are missing them
- **Impact**: Better navigation UX
- **Size**: S

### [ ] 017 - Add scroll-to-top button
- **Where**: `src/App.tsx` or new component
- **What**: Floating button after scrolling down
- **Impact**: Navigation UX
- **Size**: S

### [ ] 018 - Add structured data (JSON-LD)
- **Where**: `index.html`
- **What**: Schema.org LocalBusiness structured data
- **Impact**: SEO
- **Size**: S

### [ ] 019 - Add testimonials section
- **Where**: New `src/components/Testimonials.tsx`
- **What**: Client quotes carousel
- **Impact**: Social proof
- **Size**: M

### [ ] 022 - Add page transitions and micro-interactions
- **Where**: Multiple components
- **What**: Enhanced hover states, transitions, button feedback
- **Impact**: Polish
- **Size**: M

---

## Completed
(None yet)
