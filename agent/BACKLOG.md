# Think Better - Improvement Backlog

> Prioritized list of improvements for the autonomous agent.
> Agent picks the highest priority uncompleted item each execution.
> Last updated: 2026-03-13

---

## P0 - Critical

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
- **What**: The "Agendar llamada" button in the Footer links to `#contact` which is the Footer itself. Add a real Calendly/Cal.com link or create a contact form. Multiple components (Navbar, AddOns, Retainer) link to #contact expecting a real action.
- **Impact**: Main conversion action is broken - users can never actually book a call
- **Size**: M

### [ ] 004 - Fix broken legal page links (404)
- **Where**: `src/components/Footer.tsx`
- **What**: Links to `/privacidad`, `/legal`, `/cookies` will 404 because there's no router. Either add react-router with those pages, or change to anchor sections, or link to external legal page generator.
- **Impact**: Legal compliance issue + broken links
- **Size**: M

---

## P1 - Important

### [ ] 005 - Translate team roles to Spanish
- **Where**: `src/components/Team.tsx`
- **What**: Team roles are in English ("Full-stack Developer", "Backend & AI Engineer", "Product Engineer"). Translate to Spanish to match the rest of the UI.
- **Impact**: Language inconsistency breaks professional appearance
- **Size**: S

### [ ] 006 - Fix placeholder social media links
- **Where**: `src/components/Footer.tsx`
- **What**: Twitter, LinkedIn, and GitHub links all point to `#` (non-functional). Either add real URLs or remove the links until real profiles exist.
- **Impact**: Non-functional links reduce trust
- **Size**: S

### [ ] 007 - Add FAQ accordion accessibility (ARIA)
- **Where**: `src/components/FAQ.tsx`
- **What**: Add `aria-expanded`, `aria-controls`, `id` to buttons and `role="region"`, `aria-labelledby` to answer panels. Fix the `key` prop in FAQItem type.
- **Impact**: Screen readers cannot use the FAQ section
- **Size**: S

### [ ] 008 - Fix mobile menu accessibility
- **Where**: `src/components/Navbar.tsx`
- **What**: Add `role="dialog"`, `aria-modal="true"`, toggle aria-label to "Cerrar menu" when open, trap focus, close on Escape, lock body scroll.
- **Impact**: Mobile menu is inaccessible and has UX bugs
- **Size**: M

### [ ] 009 - Add `lang="es"` to HTML element
- **Where**: `index.html`
- **What**: Set `<html lang="es">` for proper language detection by screen readers and search engines
- **Impact**: SEO and accessibility
- **Size**: S

### [ ] 010 - Respect prefers-reduced-motion
- **Where**: `src/index.css`
- **What**: Wrap `scroll-behavior: smooth` in `@media (prefers-reduced-motion: no-preference)`. Consider adding reduced motion support for Framer Motion animations.
- **Impact**: Accessibility for motion-sensitive users
- **Size**: S

---

## P2 - Improvement

### [ ] 011 - Add section IDs for deep linking
- **Where**: `src/components/SocialProof.tsx`, `src/components/AddOns.tsx`, `src/components/Retainer.tsx`
- **What**: Add `id` attributes to sections that are missing them so nav links work properly
- **Impact**: Better navigation UX
- **Size**: S

### [ ] 012 - Add meta tags and SEO basics
- **Where**: `index.html`
- **What**: Add proper `<title>`, `<meta description>`, Open Graph tags, favicon, canonical URL for SEO
- **Impact**: Discoverability and social sharing
- **Size**: S

### [ ] 013 - Add loading/error boundary
- **Where**: `src/main.tsx`, `src/App.tsx`
- **What**: Add a React error boundary to catch crashes gracefully instead of white screen. Add a simple loading state.
- **Impact**: Better user experience on errors
- **Size**: S

### [ ] 014 - Add Retainer CTA aria-labels
- **Where**: `src/components/Retainer.tsx`
- **What**: Each "Contratar plan" button needs unique `aria-label` like "Contratar plan Basic" so screen readers can distinguish them
- **Impact**: Accessibility
- **Size**: S

### [ ] 015 - Add social link aria-labels in Footer
- **Where**: `src/components/Footer.tsx`
- **What**: Add `aria-label` to social media icon links (Twitter, LinkedIn, GitHub)
- **Impact**: Accessibility for icon-only links
- **Size**: S

### [ ] 016 - Improve responsive design on small screens
- **Where**: Multiple components
- **What**: Review all components at 320px width. Check text overflow, button sizing, spacing. Ensure pricing cards stack cleanly on mobile.
- **Impact**: Better mobile UX
- **Size**: M

### [ ] 017 - Add scroll-to-top button
- **Where**: `src/App.tsx` or new component
- **What**: Add a floating button that appears after scrolling down to quickly return to top
- **Impact**: Better navigation UX on long page
- **Size**: S

### [ ] 018 - Add structured data (JSON-LD)
- **Where**: `index.html`
- **What**: Add Schema.org LocalBusiness structured data for better Google search results
- **Impact**: SEO improvement
- **Size**: S

---

## P3 - Nice-to-have

### [ ] 019 - Add testimonials section
- **Where**: New component `src/components/Testimonials.tsx`
- **What**: Create a testimonials carousel or grid with client quotes to build trust
- **Impact**: Social proof and conversion
- **Size**: M

### [ ] 020 - Add blog/resources section
- **Where**: New component
- **What**: Link to blog posts or resources to improve SEO and demonstrate expertise
- **Impact**: SEO and authority
- **Size**: L

### [ ] 021 - Add cookie consent banner
- **Where**: New component
- **What**: Add GDPR-compliant cookie consent banner since the site mentions cookies policy
- **Impact**: Legal compliance for EU users
- **Size**: M

### [ ] 022 - Add page transitions and micro-interactions
- **Where**: Multiple components
- **What**: Enhance hover states, add subtle transitions on cards, improve button feedback
- **Impact**: Polish and professional feel
- **Size**: M

### [ ] 023 - Add contact form with email integration
- **Where**: New component or modify Footer
- **What**: Add a real contact form (name, email, message, plan interest) with email sending via a serverless function
- **Impact**: Real lead capture instead of dead-end CTA
- **Size**: L

### [ ] 024 - Add dark/light mode toggle
- **Where**: Multiple components
- **What**: Add a theme toggle to support light mode in addition to the current dark theme
- **Impact**: User preference support
- **Size**: L

---

## Completed
(None yet)
