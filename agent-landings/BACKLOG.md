# Think Better Landings — Backlog de Mejoras

> El agente elige el ítem de mayor prioridad no completado en cada ejecución.
> Después del análisis de expertos, puede añadir nuevos ítems.
> Last updated: 2026-03-16

---

## P0 — Tracking y Medición (sin datos no hay optimización)

### [ ] LP-001 — Añadir PostHog tracking por variante
- **Dónde**: `src/pages/lp/LpSaasStartup.tsx`, `LpAutomatizaEmpresa.tsx`
- **Qué**: Emitir evento `lp_cta_click` con prop `variant: 'saas-startup' | 'automatiza-empresa'` en cada botón CTA. También `lp_page_view` con variante al montar.
- **Por qué**: Sin tracking no sabemos qué variante convierte mejor
- **Tamaño**: S

### [ ] LP-002 — Añadir JSON-LD schema en ambas variantes
- **Dónde**: `src/pages/lp/*.tsx`
- **Qué**: Schema de tipo `Service` + `LocalBusiness` en cada variante. Adaptar descripción al ICP.
- **Por qué**: SEO estructurado mejora el CTR en resultados de búsqueda
- **Tamaño**: S

---

## P1 — Conversión (mejoras directas en CTA rate)

### [ ] LP-003 — Calculadora interactiva de ROI en /lp/automatiza-tu-empresa
- **Dónde**: `src/pages/lp/LpAutomatizaEmpresa.tsx`
- **Qué**: Input de horas/semana que calcula automáticamente: coste anual (25€/h × horas × 40 sem), ahorro estimado con la app, tiempo de amortización del plan Starter. Resultado visible en tiempo real.
- **Por qué**: Personalización = conversión. El usuario ve su ROI específico.
- **Tamaño**: M

### [ ] LP-004 — Añadir banda de testimonios reales en /lp/saas-startup
- **Dónde**: `src/pages/lp/LpSaasStartup.tsx`
- **Qué**: 3 testimonios con nombre, empresa, resultado y foto/avatar. Colocar justo antes del pricing.
- **Por qué**: Social proof en el momento de decisión de precio aumenta conversión.
- **Tamaño**: S

### [ ] LP-005 — Sección de comparativa explícita "vs contratar un dev"
- **Dónde**: `/lp/saas-startup`
- **Qué**: Tabla 3 columnas: Contratar dev senior / Agencia tradicional / Think Better. Filas: precio, tiempo, código tuyo, soporte, riesgo.
- **Por qué**: Los founders técnicos evalúan activamente estas alternativas. Poner la comparativa elimina esa objeción.
- **Tamaño**: S

### [ ] LP-006 — Exit intent o sticky CTA bar
- **Dónde**: Ambas variantes
- **Qué**: Barra fija en bottom mobile con "Calcular precio gratis →". Solo visible en mobile y cuando el usuario ha scrollado >50% de la página.
- **Por qué**: Mobile convierte menos por scroll fatigue. Un CTA sticky reduce esa fricción.
- **Tamaño**: S

### [ ] LP-007 — Sección de objeciones estilo FAQ expandido en automatiza-empresa
- **Dónde**: `LpAutomatizaEmpresa.tsx`
- **Qué**: Ampliar las preguntas. Añadir: "¿Tenemos que cambiar nuestros sistemas actuales?", "¿Qué pasa si cambia el proceso interno?", "¿Podemos ver un demo antes de comprometer?"
- **Por qué**: Las pymes tienen más objeciones que los founders. Necesitan más rassurance.
- **Tamaño**: S

---

## P2 — Nuevas variantes

### [ ] LP-008 — Crear /lp/mvp-inversores
- **ICP**: Founder pre-seed buscando ronda de financiación
- **Ángulo**: "Tu MVP listo para mostrar a inversores. Sin un equipo técnico."
- **Diferencial vs saas-startup**: Enfasis en credibilidad/profesionalismo/escalabilidad, no en velocidad
- **Keywords**: "mvp para inversores", "mvp startup financiación", "prototipo inversor"
- **Tamaño**: L

### [ ] LP-009 — Crear /lp/agencia-blanca
- **ICP**: Agencia de marketing/diseño que quiere ofrecer desarrollo a sus clientes
- **Ángulo**: "Tu departamento de desarrollo sin contratar. White-label."
- **Diferencial**: Marca blanca, precio especial para agencias, flujo diferente
- **Keywords**: "desarrollo white label agencias", "subcontratar desarrollo web España"
- **Tamaño**: L

### [ ] LP-010 — Crear /lp/ecommerce
- **ICP**: Negocio con tienda física o e-commerce básico que quiere herramientas propias
- **Ángulo**: "Tu tienda + tus herramientas propias. Sin pagar Shopify para siempre."
- **Keywords**: "software a medida ecommerce", "app gestión pedidos propia"
- **Tamaño**: L

### [ ] LP-011 — Crear /lp/barcelona
- **ICP**: Empresas en Barcelona/Catalunya buscando empresa de desarrollo local
- **Ángulo**: Localización + presencialidad + catalán/castellano
- **Keywords**: "empresa desarrollo software Barcelona", "programadores Barcelona", "app medida Barcelona"
- **Tamaño**: M

---

## P3 — SEO y Distribución

### [ ] LP-012 — Añadir sitemap entries para todas las variantes /lp/*
- **Dónde**: `public/sitemap.xml`
- **Qué**: Una entrada por cada variante con `<priority>0.7</priority>`
- **Tamaño**: XS

### [ ] LP-013 — Meta Open Graph específico por variante
- **Dónde**: `src/pages/lp/*.tsx` (usePageMeta)
- **Qué**: og:title, og:description, og:image adaptados al ICP de cada variante
- **Tamaño**: S

### [ ] LP-014 — Hreflang para variante en catalán
- **Dónde**: index.html o per-page
- **Qué**: Para /lp/barcelona considerar versión en catalán si el tráfico lo justifica
- **Tamaño**: M

---

## Keywords por Variante (para SEO Experto)

### /lp/saas-startup
- Primary: "lanzar saas en españa", "desarrollar saas barato", "estudio desarrollo saas barcelona"
- Secondary: "construir saas sin equipo", "mvp saas precio fijo", "tiempo lanzar saas"
- Long tail: "cuanto cuesta construir un saas en españa 2026", "alternativa contratar programador saas"

### /lp/automatiza-tu-empresa
- Primary: "automatizar procesos empresa software", "software a medida pymes españa"
- Secondary: "app medida empresa barcelona", "digitalizar procesos empresa precio"
- Long tail: "cuanto cuesta software a medida para empresa", "automatizar tareas manuales empresa pequeña"

### /lp/mvp-inversores (pendiente)
- Primary: "mvp para inversores startups", "prototipo startup financiación españa"
- Secondary: "hacer mvp profesional barcelona", "desarrollo mvp precio fijo"
