# Think Better - Autonomous Agent Index

> Persistent context for the autonomous improvement agent.
> Read this file FIRST at the start of every execution.
> Last updated: 2026-03-14

## Project
- **Name**: Think Better - Servicios & Productos Online
- **Description**: Landing page de servicios de consultora/estudio de desarrollo AI-first en Barcelona. Muestra planes de precios (Launch/Build/Scale), add-ons, retainers mensuales, equipo, proceso y FAQ.
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
| `src/components/Maintenance.tsx` | Maintenance/hosting plans section (49€/99€/199€) |
| `src/components/CookieBanner.tsx` | GDPR cookie consent banner with granular preferences |
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
git add -A && git commit -m "Agent: <description>" && git push
# Vercel auto-deploys on push to main
```

## UI/Design Patterns
- **Colors**: Dark theme - zinc-950 bg, emerald-500 accent, cyan-400 gradient accent, white text
- **Typography**: System font stack (font-sans)
- **Layout**: max-w-7xl centered, px-6 lg:px-8 padding
- **Components**: Rounded cards (rounded-3xl), borders (border-zinc-800), motion animations on scroll
- **Buttons**: Rounded-full for CTAs, rounded-xl for card buttons
- **Sections**: py-24 vertical padding, text-center headers

## Skills Created by Agent
(None yet)

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
