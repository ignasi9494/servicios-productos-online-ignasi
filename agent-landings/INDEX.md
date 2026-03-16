# Think Better Landings — Agente de Optimización de Conversión

> Agente especializado en crear y optimizar landing pages de alta conversión para Think Better.
> Lee este archivo al inicio de cada ejecución.
> Last updated: 2026-03-16 (execution #001)

## Misión

Crear, testear y mejorar landing pages con diferentes ángulos de venta para identificar cuál convierte mejor. Cada ejecución usa 4 personas de experto para analizar y mejorar una variante.

## Variants Activas

| Ruta | ICP | Ángulo | Estado |
|------|-----|--------|--------|
| `/lp/saas-startup` | Founder técnico / solo founder | Velocidad + precio fijo + sin equipo | Activa desde exec #001 |
| `/lp/automatiza-tu-empresa` | Dueño pyme / director ops | ROI + ahorro de tiempo + amortización | Activa desde exec #001 |

## ICPs Identificados

| ICP | Descripción | Pain principal | Propuesta de valor |
|-----|-------------|---------------|-------------------|
| **ICP-1: Founder técnico** | Solo founder o equipo <3 personas con idea de SaaS. 25-40 años. Barcelona/España. | No tiene tiempo para construir él solo + quiere lanzar rápido | "Tu SaaS en producción en 3 semanas sin contratar" |
| **ICP-2: Dueño de pyme** | Dueño/director de empresa 5-50 empleados con procesos manuales. | Pierde dinero y tiempo en Excel/procesos manuales | "Automatiza lo que te roba horas. ROI en <6 meses" |
| **ICP-3: Startup pre-seed** | Founder buscando inversión, necesita MVP profesional para mostrar | Necesita credibilidad técnica para inversores | "MVP investor-ready en 3 semanas" *(pendiente)* |
| **ICP-4: Agencia digital** | Agencia que quiere ofrecer desarrollo a sus clientes sin equipo interno | No quiere contratar devs, quiere white-label | "Tu departamento de desarrollo externalizado" *(pendiente)* |

## Ángulos de Venta Pendientes

- [ ] `/lp/mvp-inversores` — ICP-3: MVP para inversores
- [ ] `/lp/agencia-blanca` — ICP-4: white-label para agencias
- [ ] `/lp/ecommerce` — Tiendas online + automatización
- [ ] `/lp/barcelona` — Landing geo-específica (Barcelona/Catalunya)
- [ ] `/lp/precio` — Ángulo precio/comparativa (vs contratar dev)

## Stack de Expertos (se usan en cada ejecución)

### Experto 1: CRO / Alex Hormozi
- Evalúa: headline, oferta, value stack, urgencia, risk reversal
- Pregunta clave: "¿Es la oferta lo suficientemente buena para que alguien la acepte sin pensar?"
- Métricas: CTR estimado, claridad de propuesta, especificidad de resultados

### Experto 2: Estratega de Marketing / ICP Analysis
- Evalúa: si el mensaje resuena con el ICP correcto, objeciones no cubiertas, posicionamiento
- Pregunta clave: "¿El lector de esta página siente que esta empresa entiende su problema exacto?"
- Métricas: relevancia del mensaje, cobertura de objeciones, call-to-action clarity

### Experto 3: SEO Técnico
- Evalúa: title, meta description, H1/H2 structure, keywords, schema markup
- Pregunta clave: "¿Esta página puede rankear para las queries que buscan los ICPs?"
- Keywords objetivo por variante: ver BACKLOG.md

### Experto 4: UX / Conversión
- Evalúa: estructura de página, flujo de lectura, friction points, trust signals, CTA placement
- Pregunta clave: "¿Hay algo que detenga a un visitante cualificado antes de hacer clic en el CTA?"
- Métricas: número de CTAs, posición del primer CTA, social proof placement

## Build & Deploy
```bash
npm run build
git add -A && git commit -m "Landings: <descripción>" && git push
```

## Completed Executions
| # | Date | Summary | Commit | Log File |
|---|------|---------|--------|----------|
| 1 | 2026-03-16 | Setup inicial: 2 variantes (saas-startup + automatiza-tu-empresa), estructura agente, scheduled task | - | executions/2026-03-16-001.md |
