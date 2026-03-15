# Think Better - Agent Plan (Live Status)

> This file is updated automatically by the autonomous agent after each execution.
> Last updated: 2026-03-15 (execution #039)

## Current Status

### Landing Page
| Feature | Status | Notes |
|---------|--------|-------|
| Pricing (Starter/Pro/Growth) | OK | 2000/3500/7000€ confirmed (exec #035) |
| Subscriptions (Mantener/Mejorar/Escalar) | OK | 199/499/999€/mes confirmed (exec #035) |
| AddOns section | REMOVED | Replaced by subscriptions |
| Retainer section | REMOVED | Replaced by subscriptions |
| Hero + CTAs | OK | Links to /cuestionario |
| FAQ | OK | 9 questions |
| Contact form | OK | Sends via Edge Function |

### Authentication
| Feature | Status | Notes |
|---------|--------|-------|
| Login (email/password) | OK | Mock admin mode confirmed working |
| Registration | OK | Resend email button added (#1032, exec #038) |
| Password reset | PENDING TEST | |
| Role-based routing | OK | Admin mock → /admin confirmed |

### Questionnaire
| Feature | Status | Notes |
|---------|--------|-------|
| AI chat (Gemini) | OK | UI loads, react-markdown rendering active |
| Price reveal | PENDING TEST | Fixed price display (no ranges) |
| Project creation | PENDING TEST | Creates project in DB |
| Welcome message | PENDING TEST | DB trigger |

### Client Dashboard
| Feature | Status | Notes |
|---------|--------|-------|
| Resumen | OK | Loads with project status (exec #035) |
| Mensajes (chat) | OK | Loads with welcome message (exec #035) |
| Propuestas | OK | Empty state, no 40/60 split confirmed (exec #035) |
| Pagos | OK | |
| Ajustes | OK | |
| Notifications bell | OK | #1028 implemented (exec #035) |

### Admin Panel
| Feature | Status | Notes |
|---------|--------|-------|
| Projects list | OK | 2 real projects from Supabase, search + filter + pagination working (exec #037) |
| Project detail | OK | Tabs: Vista general/Cuestionario/Propuesta/Pagos all load. Title now shows project name (exec #037) |
| AI proposal generation | OK | "Generar con IA" button visible in Propuesta tab |
| Questionnaire viewer | OK | Tab loads in project detail |
| Client list | OK | Pagination implemented (exec #037) |
| Analytics | PENDING TEST | |

### Payments
| Feature | Status | Notes |
|---------|--------|-------|
| Stripe checkout (full) | PENDING TEST | New 'full' payment type |
| Webhook handler | OK | Updated to capture stripe_customer_id (exec #039) |
| Subscription mode | PENDING TEST | For maintenance plans |
| Stripe Customer Portal | OK | #1033 implemented (exec #039) — create-portal-session EF, Pagos.tsx banner, Entrega.tsx link |

## Next Actions
1. Test landing page pricing display
2. Test login flows (admin + client)
3. Test questionnaire completion
4. Test admin proposal generation
5. Test payment flow
6. Fix any bugs found
7. Pick next backlog item if all passes

## Bugs Found
(none yet - pending first test run)

## Improvements Made
- [2026-03-15] #1033: Stripe Customer Portal — create-portal-session EF, Pagos.tsx subscription management banner, Entrega.tsx real Stripe checkout + portal link, migration 007 adds stripe_customer_id to payments (exec #039)
- [2026-03-15] Pricing simplified: fixed prices Starter 2000€/Pro 3500€/Growth 7000€
- [2026-03-15] Payments simplified: single full payment instead of 40/60 split
- [2026-03-15] Subscriptions: Mantener 199€/Mejorar 499€/Escalar 999€/mes
- [2026-03-15] Removed AddOns and Retainer sections from landing
- [2026-03-15] #1031: react-markdown renderer for questionnaire bot messages (bold emerald-400, lists zinc-500, links/code styled)
- [2026-03-15] #1028: In-app notifications bell in DashboardLayout (desktop + mobile), Supabase Realtime, mark as read, empty state (exec #035)
- [2026-03-15] #1025: Fixed sitemap.xml and robots.txt URLs to real production URL (exec #035)
- [2026-03-15] #1008: Mock data for Iteraciones (2 requests) + Documentos (4 files) in VITE_MOCK_ROLE demo mode (exec #036)
- [2026-03-15] #1026: Pagination in AdminProjects (PAGE_SIZE=20) + AdminClients (PAGE_SIZE=18) with Previous/Next + page pills (exec #037)
- [2026-03-15] #1029: Contact form 60s client-side rate limiting with live countdown, blocks on success and error (exec #037)
- [2026-03-15] Fix: AdminProjectDetail now calls usePageTitle with dynamic project name (exec #037)
- [2026-03-15] #1032: Resend email confirmation button in Registro with 60s cooldown, success feedback, supabase.auth.resend (exec #038)
