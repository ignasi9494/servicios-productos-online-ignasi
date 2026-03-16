# Think Better - Autonomous Agent Index

> Persistent context for the autonomous improvement agent.
> Read this file FIRST at the start of every execution.
> Last updated: 2026-03-16 (execution #062)

## Project
- **Name**: Think Better - Servicios & Productos Online
- **Description**: SaaS platform for AI-first development consultancy in Barcelona. Plans: Starter 2000€/Pro 3500€/Growth 7000€. Subscriptions: Mantener 199€/Mejorar 499€/Escalar 999€/mes. Full client dashboard, admin panel, AI questionnaire, Stripe payments.
- **Production URL**: https://servicios-productos-online-ignasi.vercel.app/
- **Stack**: React 19 + TypeScript + Vite + Tailwind CSS v4 + Framer Motion (motion/react) + Lucide Icons
- **Repo**: https://github.com/ignasi9494/servicios-productos-online-ignasi.git
- **Deploy**: Auto-deploy on git push to main (Vercel)
- **Language**: UI in Spanish (es)

## Key Files
| File | Description |
|------|-------------|
| `src/App.tsx` | Main app component, renders all sections in order |
| `src/main.tsx` | React entry point |
| `src/index.css` | Global CSS (Tailwind import + smooth scroll) |
| `src/components/Navbar.tsx` | Fixed nav bar + mobile hamburger menu |
| `src/components/Hero.tsx` | Hero section with main CTA |
| `src/components/SocialProof.tsx` | Project case study cards (3 projects) |
| `src/components/Benefits.tsx` | 4 benefit cards in grid |
| `src/components/Pricing.tsx` | 3 pricing plans (Launch/Build/Scale) with `id="pricing"` |
| `src/components/AddOns.tsx` | 7 add-on service cards with prices |
| `src/components/Retainer.tsx` | 3 monthly retainer plans (Basic/Pro/Premium) |
| `src/pages/dashboard/Documentos.tsx` | Document manager with upload, filter, preview |
| `src/pages/dashboard/Iteraciones.tsx` | Iteration request system with counter and form |
| `src/pages/dashboard/Preview.tsx` | App preview iframe with device toggle (desktop/tablet/mobile) |
| `src/pages/dashboard/Entrega.tsx` | Export/delivery flow: ZIP download or hosting subscription plans |
| `src/pages/admin/AdminLayout.tsx` | Admin sidebar layout with admin-only guard |
| `src/pages/admin/AdminHome.tsx` | Admin home: KPIs, pipeline, recent projects, quick actions |
| `src/pages/admin/AdminProjects.tsx` | Admin project list with search + status filter |
| `src/pages/admin/AdminProjectDetail.tsx` | Admin project detail: questionnaire viewer, proposal editor, status changer, payments |
| `src/pages/admin/AdminClients.tsx` | Admin client grid with search |
| `src/pages/admin/AdminMensajes.tsx` | Admin messaging: 2-column UI (conversation list + thread), mock+Supabase |
| `src/pages/admin/AdminAnalytics.tsx` | Admin analytics: KPIs, bar chart (revenue), pipeline funnel, conversion funnel |
| `src/pages/ResetPassword.tsx` | Password reset page at /reset-password, listens for PASSWORD_RECOVERY event |
| `supabase/functions/send-email/index.ts` | Generic transactional email EF via Resend (used by emailNotifications.ts) |
| `src/components/Maintenance.tsx` | Maintenance/hosting plans section (49€/99€/199€) |
| `src/components/CookieBanner.tsx` | GDPR cookie consent banner with granular preferences |
| `src/lib/mockDemoData.ts` | Mock demo data (8 projects, 6 clients) for admin panel when VITE_MOCK_ROLE=admin |
| `src/lib/pendingProject.ts` | Pending project helper: save/read/create project from questionnaire for unauthenticated users |
| `supabase/functions/send-contact-email/index.ts` | Edge Function: sends contact form emails via Resend API |
| `src/components/ScrollToTop.tsx` | Floating scroll-to-top button (appears after 300px scroll) |
| `src/components/Testimonials.tsx` | 6 testimonials section with name, role, avatar initials, stars |
| `src/lib/emailNotifications.ts` | Email notification module with 4 trigger types + mock fallback |
| `src/contexts/ToastContext.tsx` | Global toast notification provider (useToast hook) |
| `src/pages/NotFound.tsx` | 404 page (registered as catch-all route) |
| `src/components/Process.tsx` | 3-step process visualization |
| `src/components/Team.tsx` | 3 team members with roles |
| `src/components/FAQ.tsx` | 9-question accordion FAQ |
| `src/components/Footer.tsx` | Contact section (`id="contact"`) + legal links |
| `index.html` | HTML entry point |
| `vite.config.ts` | Vite config with React, Tailwind, path aliases |
| `package.json` | Dependencies and scripts |

## Architecture
**Current state**: Full SaaS client dashboard platform with auth, AI questionnaire, proposals, internal chat, documents, iteration requests, payments, app preview, export/delivery flow, toast notifications, and admin panel (home + projects + clients).

**Target state (in progress)**: Full SaaS platform with:
- **Frontend**: React 19 + react-router-dom, Vite, Tailwind v4, Framer Motion
- **Backend**: Supabase (Auth, PostgreSQL, Storage, Edge Functions, Realtime)
- **Payments**: Stripe (one-time + subscriptions)
- **AI**: Claude/OpenAI API for proposal generation
- **Email**: Resend/SendGrid for transactional emails
- **Deploy**: Vercel auto-deploy on push

**User flow**:
Landing → Cuestionario (6 pasos) → Precio estimado (IA) → Registro →
→ [24h] Propuesta definitiva en dashboard → Acepta? →
→ Firma + Pago entrada → Desarrollo → Preview + Iteraciones →
→ App terminada → Exportar (pago final) O Hosting mensual

**Modules**:
1. Landing publica (existing, improving)
2. Cuestionario de cualificacion (6 steps, file upload, audio)
3. Auth system (Supabase, email/password, roles: client/admin)
4. Client dashboard (chat, proposals, iterations, payments, preview)
5. Admin panel (project management, AI proposal generator)
6. Payment system (Stripe: deposits, final, subscriptions)

## Build & Deploy Commands
```bash
npm run build        # Vite build

# For code changes (triggers Vercel deploy):
git add -A && git commit -m "Agent: <description>" && git push

# For log-only updates (PLAN.md, INDEX.md, executions/ — NO code changed):
# IMPORTANT: add [skip ci] to avoid consuming Vercel deploy quota
git add agent/ && git commit -m "Agent: update PLAN/INDEX for execution #NNN [skip ci]" && git push
```

## UI/Design Patterns
- **Colors**: Dark theme - zinc-950 bg, emerald-500 accent, cyan-400 gradient accent, white text
- **Typography**: System font stack (font-sans)
- **Layout**: max-w-7xl centered, px-6 lg:px-8 padding
- **Components**: Rounded cards (rounded-3xl), borders (border-zinc-800), motion animations on scroll
- **Buttons**: Rounded-full for CTAs, rounded-xl for card buttons
- **Sections**: py-24 vertical padding, text-center headers

## Skills Created by Agent
- **think-better-autofix**: Hourly scheduled task that tests all flows with Preview MCP, fixes bugs, and picks improvements from BACKLOG.md

## Agent Plan
See `agent/PLAN.md` for live status of every feature.

## Completed Executions
| # | Date | Summary | Commit | Log File |
|---|------|---------|--------|----------|
| 1 | 2026-03-13 | Fix broken WhatsApp link + Gemini API key exposure (P0 #001 #002) | 45d46a6 | executions/2026-03-13-001.md |
| 2 | 2026-03-13 | Fix dead-end #contact CTA loop → #questionnaire (P0 #003) | 5bb5df7 | executions/2026-03-13-002.md |
| 3 | 2026-03-13 | Add legal pages + vercel.json SPA rewrite (P0 #004) | 9c34710 | executions/2026-03-13-003.md |
| 4 | 2026-03-13 | Expand routing with platform pages (#100) | b4807e2 | executions/2026-03-13-004.md |
| 5 | 2026-03-13 | Set up Supabase project and database schema (#101) | 385667e | executions/2026-03-13-005.md |
| 6 | 2026-03-13 | Implement Supabase Auth with email/password (#102) | 10efd31 | executions/2026-03-13-006.md |
| 7 | 2026-03-13 | Add automatic price calculator engine (#206) | 312c3e2 | executions/2026-03-13-007.md |
| 8 | 2026-03-13 | Set up Stripe integration for payments (#103) | 6649e35 | executions/2026-03-13-008.md |
| 9 | 2026-03-13 | Create AI chatbot UI shell and /cuestionario page (#200) | 1b9dbeb | executions/2026-03-13-009.md |
| 10 | 2026-03-13 | Create deterministic UI components for chat embedding (#201) | d7d0fd6 | executions/2026-03-13-010.md |
| 11 | 2026-03-13 | Create Gemini API integration and chat engine (#202) | b893773 | executions/2026-03-13-011.md |
| 12 | 2026-03-13 | Write MASTER system prompt for questionnaire (#203) | ebdc6d9 | executions/2026-03-13-012.md |
| 13 | 2026-03-13 | Implement chat message rendering with embedded components (#204) | 90af3f5 | executions/2026-03-13-013.md |
| 14 | 2026-03-13 | Questionnaire completion flow and price reveal (#205) | 332a7d4 | executions/2026-03-13-014.md |
| 15 | 2026-03-13 | Enhance client dashboard home with project status (#300) | e6cde6d | executions/2026-03-13-015.md |
| 16 | 2026-03-13 | Create project status tracker component (#301) | 52a8da9 | executions/2026-03-13-016.md |
| 17 | 2026-03-13 | Build internal chat system for client dashboard (#302) | 9d02e44 | executions/2026-03-13-017.md |
| 18 | 2026-03-13 | Build proposal viewer and acceptance flow (#303) | 0549820 | executions/2026-03-13-018.md |
| 19 | 2026-03-14 | Document manager, iteration requests, toast system, 404 (#304 #305 #602) | f96de52 | executions/2026-03-14-019.md |
| 20 | 2026-03-14 | Preview, Entrega, Admin panel, Pagos CTA, Landing CTAs (#306 #307 #308 #400 #600) | 1700fe9 | executions/2026-03-14-020.md |
| 21 | 2026-03-14 | Admin project detail, pricing redesign, add-ons, maintenance, FAQ, cookie banner (#207 #401 #500 #501 #502 #503 #601) | 1254edd | executions/2026-03-14-021.md |
| 22 | 2026-03-14 | AI proposal generator, email notifications, responsive fixes, section IDs, scroll-to-top, JSON-LD, testimonials, page transitions (#402 #403 #603 #011 #017 #018 #019 #022) | 20b041e | executions/2026-03-14-022.md |
| 23 | 2026-03-14 | Questionnaire session recovery, Twitter Card meta tags, micro-interactions on cards, #testimonios navbar link, #casos ID (#208 #011 #018 #019 #022 #603) | 9d2e7a6 | executions/2026-03-14-023.md |
| 24 | 2026-03-14 | Code splitting React.lazy (846kB→445kB), og-image.png, route-level AnimatePresence transitions (#700 #701 #702) | c6339a3 | executions/2026-03-14-024.md |
| 25 | 2026-03-14 | Per-page titles (SEO), Ajustes settings form, typos, progress bar fix, session recovery fix, VITE_MOCK_ROLE (#800-#805) | af324c2 | executions/2026-03-14-025.md |
| 26 | 2026-03-14 | Legal page titles, cookie banner flash fix, contact form on landing, #contacto nav link (#806 #901 #900) | 8aad88f | executions/2026-03-14-026.md |
| 27 | 2026-03-14 | Navbar lg breakpoint, admin demo data (8 projects/6 clients), ContactForm Edge Function (#1000 #1001 #1003) | 8411a7b | executions/2026-03-14-027.md |
| 28 | 2026-03-14 | AdminProjectDetail mock data — all 8 demo projects fully navigable with proposals, payments, questionnaire (#1004) | fe86fd5 | executions/2026-03-14-028.md |
| 29 | 2026-03-14 | Dashboard overflow fix, client mock data (Resumen/Mensajes/Propuestas/Pagos), AdminHome Facturado KPI (#1005 #1006 #1007) | 0153b3a | executions/2026-03-14-029.md |
| 30 | 2026-03-14 | send-email EF, Resumen real query, Admin KPIs, password recovery, AdminMensajes, AdminAnalytics (#1008 #1009 #1013 #1021 #1014 #1016) | 4223398 | executions/2026-03-14-030.md |
| 31 | 2026-03-14 | AdminPagos, AdminConfiguracion, Ajustes security section, react-markdown for proposals (#1015 #1017 #1022 #1023) | fecffcc | executions/2026-03-14-031.md |
| 32 | 2026-03-14 | Fix post-login stuck loading — retry fetchProfile on 401 JWT race condition | 6370de2 | executions/2026-03-14-032.md |
| 33 | 2026-03-15 | Pricing overhaul (Starter/Pro/Growth fixed prices), payment simplification (full payment), subscriptions (Mantener/Mejorar/Escalar), autonomous agent setup | 7391137 | executions/2026-03-15-033.md |
| 34 | 2026-03-15 | #1031 react-markdown renderer for questionnaire bot messages (emerald bold, zinc bullets, gfm support) | 9d7ce81 | executions/2026-03-15-034.md |
| 35 | 2026-03-15 | #1028 notifications bell in DashboardLayout + fix sitemap/robots.txt URLs. All 6 flows tested OK | e8af6f8 | executions/2026-03-15-035.md |
| 36 | 2026-03-15 | #1008 mock data for Iteraciones (2 requests) + Documentos (4 files) in demo mode. All flows tested OK | 516d9fb | executions/2026-03-15-036.md |
| 37 | 2026-03-15 | #1026 pagination admin panel + #1029 contact rate limit + AdminProjectDetail title fix | da882b1 | executions/2026-03-15-037.md |
| 38 | 2026-03-15 | #1032 resend email confirmation button in Registro with 60s cooldown | a281ed0 | executions/2026-03-15-038.md |
| 39 | 2026-03-15 | #1033 Stripe Customer Portal — create-portal-session EF, Pagos banner, Entrega real Stripe calls, migration 007 | 85805b0 | executions/2026-03-15-039.md |
| 40 | 2026-03-15 | #1019 pending project flow: questionnaire → Registro/Login creates project in Supabase | 6844355 | executions/2026-03-15-040.md |
| 41 | 2026-03-15 | #1027 Realtime AdminMensajes — Supabase channel, browser notifications, "En vivo" badge | cf8feae | executions/2026-03-15-041.md |
| 42 | 2026-03-15 | #1030 PostHog analytics — funnel events for questionnaire, proposals, payments | 266ef2a | executions/2026-03-15-042.md |
| 43 | 2026-03-15 | #1020 Storage error handling — validation, toasts, progress bar + HMR createRoot fix | 07265b9 | executions/2026-03-15-043.md |
| 44 | 2026-03-15 | #1011 admin preview_url input in Entrega tab — admins can now set staging URL for client preview iframe | da3f1dc | executions/2026-03-15-044.md |
| 45 | 2026-03-15 | #1035 admin payment request creation in project payments tab + fix Cobrado KPI cents/euros bug | 2aaa67b | executions/2026-03-15-045.md |
| 46 | 2026-03-15 | #1010 Entrega.tsx pay-to-export Stripe CTA — fetches pending payment, shows "Pagar y descargar" button | fe8388b | executions/2026-03-15-046.md |
| 47 | 2026-03-15 | #1036 email notification on payment request + fix AdminPagos stale 50% labels + update mock data | a12bab3 | executions/2026-03-15-047.md |
| 48 | 2026-03-15 | #1037 email notification on project status change — notifyStatusChange() for client-facing milestones | 1ee920b | executions/2026-03-15-048.md |
| 49 | 2026-03-15 | #1038 email notification on new chat message — client→admin + admin→client | 47d1d58 | executions/2026-03-15-049.md |
| 50 | 2026-03-15 | Blog artículo #2 — agencia vs freelancer vs no-code, .article-body CSS, sitemap update | ef5d9af | executions/2026-03-15-050.md |
| 51 | 2026-03-15 | Blog artículo #3 — Cómo lanzar un SaaS en Barcelona en 30 días (stack, proceso, caso real) | f5d24a0 | executions/2026-03-15-051.md |
| 52 | 2026-03-15 | Blog artículo #4 — ¿Qué es un MVP y por qué tu startup lo necesita primero? (framework hipótesis, 5 tipos, 6 errores, caso LeadHunter) | 5c92c11 | executions/2026-03-15-052.md |
| 53 | 2026-03-15 | Blog artículo #5 — Automatización con IA para empresas: qué es, cuánto cuesta y por dónde empezar (6 procesos ROI, tabla costes, caso real distribuidor, plan 4 semanas) | 839a7cf | executions/2026-03-15-053.md |
| 54 | 2026-03-15 | Blog artículo #6 — Stripe vs PayPal vs Redsys: pasarelas de pago en España 2026 (SCA, Bizum, tabla comisiones, árbol decisión, caso real +23% conversión, 3 errores frecuentes) | e6d3e4a | executions/2026-03-15-054.md |
| 55 | 2026-03-16 | Blog artículo #7 — SEO técnico para SaaS en España 2026: guía completa con checklist (Core Web Vitals, indexación SPAs, schema markup, hreflang, arquitectura URLs, checklist 32 puntos) | ba07205 | executions/2026-03-16-055.md |
| 56 | 2026-03-16 | Blog artículo #8 — Supabase vs Firebase para startups en 2026: comparativa completa (SQL vs NoSQL, GDPR/EU data, precios reales, RLS auth, caso real migración -40% cost, árbol decisión 5 preguntas) | 8fe17a9 | executions/2026-03-16-056.md |
| 57 | 2026-03-16 | Blog artículo #9 — Cómo hacer un pitch técnico que convenza a inversores + fix Blog.tsx missing article #8 (5-block structure, investor metrics table, 4-quadrant slide template, DataFlow case study 400K€ seed, 5 fatal errors, 10 investor questions) | 5ac7754 | executions/2026-03-16-057.md |
| 58 | 2026-03-16 | Blog artículo #10 — React vs Next.js para SaaS en 2026 (CSR vs SSR cards, 8-row metrics table, 5 use cases each, PlanFlow migration case study, hybrid architecture pattern, 5-question decision tree) | ee1608f | executions/2026-03-16-058.md |
| 59 | 2026-03-16 | Blog artículo #11 — Cómo validar una idea de negocio SaaS antes de gastar un euro (3-hipótesis framework, entrevistas de problema script 20min, smoke test tools table, Concierge MVP, unit economics calculator LTV/CAC, 7 red flags, ClinicFlow case study 14d 0€ LTV/CAC 79x, checklist 10 puntos) | da879dd | executions/2026-03-16-059.md |
| 60 | 2026-03-16 | Blog artículo #12 — Tailwind CSS vs CSS tradicional 2026 (tabla 8 dimensiones, 5 ventajas/4 desventajas, árbol decisión 4 preguntas, híbrido Tailwind+Modules, caso real CatalogueFlow 847KB→11KB LCP 4.2s→1.8s, Tailwind v4 novedades, checklist 12 puntos) | e900821 | executions/2026-03-16-060.md |
| 61 | 2026-03-16 | Blog artículo #13 — TypeScript en 2026 para SaaS (78% adopción stat, 5 ventajas, tabla TS vs JS 10 dimensiones, guía migración 4 días, tsconfig esencial con strict, caso real logística -71% bugs, 5 errores frecuentes, árbol decisión 4 preguntas, checklist 10 puntos) | 2f90452 | executions/2026-03-16-061.md |
| 62 | 2026-03-16 | Blog artículo #14 — Cómo estructurar un equipo de desarrollo 2-5 personas para SaaS (5 roles esenciales, roadmap contratación 3 fases, tabla contratar vs externalizar 8 funciones, 5 errores costosos, caso real LogiFlow 0→120k€ ARR, 6 rituales equipo, checklist 10 puntos) | 6654fb8 | executions/2026-03-16-062.md |
