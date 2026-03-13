# Think Better - Autonomous Agent Index

> Persistent context for the autonomous improvement agent.
> Read this file FIRST at the start of every execution.
> Last updated: 2026-03-13

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
| `src/components/Process.tsx` | 3-step process visualization |
| `src/components/Team.tsx` | 3 team members with roles |
| `src/components/FAQ.tsx` | 9-question accordion FAQ |
| `src/components/Footer.tsx` | Contact section (`id="contact"`) + legal links |
| `index.html` | HTML entry point |
| `vite.config.ts` | Vite config with React, Tailwind, path aliases |
| `package.json` | Dependencies and scripts |

## Architecture
**Current state**: Single-page React landing. No routing, no backend, no database.

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
