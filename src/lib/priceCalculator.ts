// Think Better - Automatic Price Calculator Engine
// Takes extracted questionnaire data and calculates pricing

export type ProjectType = 'landing' | 'web_corporativa' | 'ecommerce' | 'app_web' | 'saas' | 'app_movil' | 'automatizacion' | 'dashboard' | 'marketplace' | 'otro';
export type PlanSuggestion = 'launch' | 'build' | 'scale';
export type AuthLevel = 'none' | 'basic' | 'roles';
export type AdminLevel = 'none' | 'basic' | 'advanced';
export type DatabaseLevel = 'none' | 'simple' | 'complex';
export type PaymentsLevel = 'none' | 'one-time' | 'recurring';

export interface ExtractedFeatures {
  projectType: ProjectType;
  isNew: boolean;
  pages?: number;
  auth: AuthLevel;
  authSocial?: boolean;
  payments: PaymentsLevel;
  admin: AdminLevel;
  database: DatabaseLevel;
  integrations: string[];
  ai: string[]; // 'chatbot' | 'documents' | 'automation'
  languages: number;
  blog: boolean;
  ecommerce: boolean;
  inventory: boolean;
  shipping: boolean;
  pushNotifications: boolean;
  seo: boolean;
  mobilePlatforms: number; // 0, 1 (iOS or Android), 2 (both)
  screens?: number;
}

export interface ExtractedDesign {
  hasIdentity: boolean;
  style: string; // 'premium' | 'minimalista' | 'corporativo' | etc.
}

export interface ExtractedContent {
  needsCreation: boolean;
}

export interface ExtractedTimeline {
  urgentDeadline: boolean;
}

export interface QuestionnaireData {
  features: ExtractedFeatures;
  design: ExtractedDesign;
  content: ExtractedContent;
  timeline: ExtractedTimeline;
}

export interface PriceExtra {
  name: string;
  category: string;
  price: number;
  reason: string;
}

export interface PriceResult {
  suggestedPlan: PlanSuggestion;
  basePrice: number;
  extras: PriceExtra[];
  extrasTotal: number;
  totalEstimate: { min: number; max: number };
  estimatedDays: { min: number; max: number };
  includedIterations: number;
  monthlyMaintenanceEstimate: number;
}

// Base price ranges per plan
const PLAN_BASE_PRICES: Record<PlanSuggestion, { min: number; max: number }> = {
  launch: { min: 2000, max: 2000 },
  build: { min: 3500, max: 3500 },
  scale: { min: 7000, max: 7000 },
};

// Base timelines per plan (in days)
const PLAN_TIMELINES: Record<PlanSuggestion, { min: number; max: number }> = {
  launch: { min: 5, max: 7 },
  build: { min: 15, max: 20 },
  scale: { min: 30, max: 40 },
};

// Extra days per extra item, by plan
const EXTRA_DAYS_PER_ITEM: Record<PlanSuggestion, number> = {
  launch: 0.5,
  build: 2,
  scale: 3,
};

// Iterations included per plan
const PLAN_ITERATIONS: Record<PlanSuggestion, number> = {
  launch: 1,
  build: 2,
  scale: 3,
};

// Maintenance estimates per plan
const PLAN_MAINTENANCE: Record<PlanSuggestion, number> = {
  launch: 199,
  build: 199,
  scale: 199,
};

export function classifyPlan(data: QuestionnaireData): PlanSuggestion {
  const { features } = data;

  // SCALE indicators
  const scaleIndicators = [
    features.ai.length > 0,
    features.auth === 'roles',
    features.admin === 'advanced',
    features.database === 'complex',
    features.integrations.length >= 3,
    (features.screens ?? features.pages ?? 0) > 15,
    features.projectType === 'marketplace',
    features.projectType === 'saas',
    features.mobilePlatforms >= 1 && features.projectType === 'app_movil',
    features.payments === 'recurring' && features.ecommerce,
  ];
  const scaleScore = scaleIndicators.filter(Boolean).length;
  if (scaleScore >= 3) return 'scale';

  // LAUNCH indicators
  const launchIndicators = [
    features.auth === 'none',
    features.database === 'none',
    features.admin === 'none',
    features.payments === 'none',
    (features.pages ?? 0) <= 7,
    features.integrations.length === 0,
    features.ai.length === 0,
    features.projectType === 'landing' || features.projectType === 'web_corporativa',
  ];
  const launchScore = launchIndicators.filter(Boolean).length;
  if (launchScore >= 5) return 'launch';

  return 'build';
}

export function calculateExtras(data: QuestionnaireData): PriceExtra[] {
  const extras: PriceExtra[] = [];
  const { features, design, content } = data;

  // Auth
  if (features.auth === 'basic') {
    extras.push({ name: 'Autenticación básica', category: 'Auth', price: 500, reason: 'Login con email y contraseña' });
  }
  if (features.auth === 'roles') {
    extras.push({ name: 'Autenticación con roles', category: 'Auth', price: 800, reason: 'Sistema de roles y permisos' });
  }
  if (features.authSocial) {
    extras.push({ name: 'Login social (Google/GitHub)', category: 'Auth', price: 300, reason: 'Autenticación con proveedores sociales' });
  }

  // Payments
  if (features.payments === 'one-time') {
    extras.push({ name: 'Pagos únicos (Stripe)', category: 'Pagos', price: 600, reason: 'Procesamiento de pagos puntuales' });
  }
  if (features.payments === 'recurring') {
    extras.push({ name: 'Suscripciones recurrentes', category: 'Pagos', price: 900, reason: 'Cobros recurrentes con Stripe' });
  }

  // Admin
  if (features.admin === 'basic') {
    extras.push({ name: 'Panel admin básico', category: 'Admin', price: 700, reason: 'Panel de gestión simple' });
  }
  if (features.admin === 'advanced') {
    extras.push({ name: 'Panel admin avanzado', category: 'Admin', price: 1200, reason: 'Panel de gestión completo con analytics' });
  }

  // Database
  if (features.database === 'simple') {
    extras.push({ name: 'Base de datos simple', category: 'Backend', price: 400, reason: 'Menos de 10 tablas' });
  }
  if (features.database === 'complex') {
    extras.push({ name: 'Base de datos compleja', category: 'Backend', price: 800, reason: 'Más de 10 tablas con relaciones' });
  }

  // Integrations
  if (features.integrations.length > 0) {
    const integrationPrice = Math.round(features.integrations.length * 400);
    extras.push({
      name: `Integraciones API (${features.integrations.length})`,
      category: 'Integraciones',
      price: integrationPrice,
      reason: features.integrations.join(', '),
    });
  }

  // AI features
  if (features.ai.includes('chatbot')) {
    extras.push({ name: 'Chatbot IA', category: 'IA', price: 800, reason: 'Asistente conversacional con IA' });
  }
  if (features.ai.includes('documents')) {
    extras.push({ name: 'Análisis de documentos IA', category: 'IA', price: 1000, reason: 'Procesamiento inteligente de documentos' });
  }
  if (features.ai.includes('automation')) {
    extras.push({ name: 'Automatización IA', category: 'IA', price: 1200, reason: 'Flujos automatizados con IA' });
  }

  // Multi-language
  if (features.languages > 1) {
    const extraLangs = features.languages - 1;
    extras.push({
      name: `Multi-idioma (+${extraLangs} idioma${extraLangs > 1 ? 's' : ''})`,
      category: 'Contenido',
      price: extraLangs * 400,
      reason: 'Soporte para múltiples idiomas',
    });
  }

  // Blog
  if (features.blog) {
    extras.push({ name: 'Blog / CMS', category: 'Contenido', price: 500, reason: 'Sistema de publicación de contenido' });
  }

  // E-commerce
  if (features.ecommerce) {
    extras.push({ name: 'Catálogo e-commerce', category: 'E-commerce', price: 800, reason: 'Catálogo de productos con carrito' });
  }
  if (features.inventory) {
    extras.push({ name: 'Gestión de inventario', category: 'E-commerce', price: 600, reason: 'Control de stock y alertas' });
  }
  if (features.shipping) {
    extras.push({ name: 'Sistema de envíos', category: 'E-commerce', price: 500, reason: 'Cálculo de envíos y tracking' });
  }

  // Push notifications
  if (features.pushNotifications) {
    extras.push({ name: 'Notificaciones push', category: 'Funcionalidad', price: 400, reason: 'Alertas en tiempo real' });
  }

  // Mobile
  if (features.mobilePlatforms > 0) {
    extras.push({
      name: `App móvil nativa (${features.mobilePlatforms === 2 ? 'iOS + Android' : features.mobilePlatforms === 1 ? 'una plataforma' : ''})`,
      category: 'Móvil',
      price: features.mobilePlatforms * 3000,
      reason: 'Desarrollo nativo para móvil',
    });
  }

  // Design
  if (design.style === 'premium' || design.style === 'Elegante-Premium') {
    extras.push({ name: 'Diseño custom premium', category: 'Diseño', price: 500, reason: 'Diseño exclusivo de alta gama' });
  }

  // Content creation
  if (content.needsCreation) {
    extras.push({ name: 'Creación de contenido', category: 'Contenido', price: 300, reason: 'Textos, imágenes y copywriting' });
  }

  // SEO
  if (features.seo) {
    extras.push({ name: 'SEO técnico', category: 'Marketing', price: 400, reason: 'Optimización para buscadores' });
  }

  return extras;
}

export function calculatePrice(data: QuestionnaireData): PriceResult {
  const plan = classifyPlan(data);
  const extras = calculateExtras(data);
  const extrasTotal = extras.reduce((sum, e) => sum + e.price, 0);

  const base = PLAN_BASE_PRICES[plan];
  const basePrice = Math.round((base.min + base.max) / 2);

  // Urgency multiplier
  const urgencyMultiplier = data.timeline.urgentDeadline ? 1.25 : 1;
  const timeMultiplier = data.timeline.urgentDeadline ? 0.8 : 1;

  const totalRaw = basePrice + extrasTotal;
  const totalWithUrgency = Math.round(totalRaw * urgencyMultiplier);

  // Estimate range: -10% to +15%
  const totalMin = Math.round(totalWithUrgency * 0.9);
  const totalMax = Math.round(totalWithUrgency * 1.15);

  // Timeline
  const timeline = PLAN_TIMELINES[plan];
  const extraDays = Math.round(extras.length * EXTRA_DAYS_PER_ITEM[plan]);
  const daysMin = Math.round((timeline.min + extraDays) * timeMultiplier);
  const daysMax = Math.round((timeline.max + extraDays) * timeMultiplier);

  return {
    suggestedPlan: plan,
    basePrice,
    extras,
    extrasTotal,
    totalEstimate: { min: totalMin, max: totalMax },
    estimatedDays: { min: daysMin, max: daysMax },
    includedIterations: PLAN_ITERATIONS[plan],
    monthlyMaintenanceEstimate: PLAN_MAINTENANCE[plan],
  };
}
