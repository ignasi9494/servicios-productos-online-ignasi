/**
 * Mock demo data for admin panel — used when VITE_MOCK_ROLE=admin
 * and Supabase returns empty results (no real data seeded yet).
 * This lets the admin panel look realistic during demos/dev.
 */

export interface MockProject {
  id: string;
  name: string;
  status: string;
  plan: string;
  client_id: string;
  client_name: string;
  total_price: number | null;
  base_price: number;
  created_at: string;
  used_iterations: number;
  max_iterations: number;
}

export interface MockClient {
  id: string;
  full_name: string;
  company: string | null;
  email: string | null;
  phone: string | null;
  sector: string | null;
  created_at: string;
  project_count: number;
}

const now = new Date();
const daysAgo = (n: number) => new Date(now.getTime() - n * 86400000).toISOString();

export const MOCK_CLIENTS: MockClient[] = [
  {
    id: 'mock-client-1',
    full_name: 'María García',
    company: 'García Consultoría SL',
    email: 'maria@garciaconsultoria.es',
    phone: '+34 612 345 678',
    sector: 'Consultoría',
    created_at: daysAgo(45),
    project_count: 1,
  },
  {
    id: 'mock-client-2',
    full_name: 'Carlos Martínez',
    company: 'TechStart Barcelona',
    email: 'carlos@techstart.es',
    phone: '+34 623 456 789',
    sector: 'Tecnología',
    created_at: daysAgo(38),
    project_count: 1,
  },
  {
    id: 'mock-client-3',
    full_name: 'Laura Sánchez',
    company: 'Moda Online ES',
    email: 'laura@modaonline.es',
    phone: '+34 634 567 890',
    sector: 'E-commerce',
    created_at: daysAgo(30),
    project_count: 1,
  },
  {
    id: 'mock-client-4',
    full_name: 'Javier López',
    company: 'Clínica López',
    email: 'javier@clinicalopez.com',
    phone: '+34 645 678 901',
    sector: 'Salud',
    created_at: daysAgo(22),
    project_count: 1,
  },
  {
    id: 'mock-client-5',
    full_name: 'Ana Torres',
    company: 'FoodDelivery Madrid',
    email: 'ana@fooddelivery.es',
    phone: '+34 656 789 012',
    sector: 'Hostelería',
    created_at: daysAgo(14),
    project_count: 1,
  },
  {
    id: 'mock-client-6',
    full_name: 'Roberto Fernández',
    company: 'Inmobiliaria RF',
    email: 'roberto@inmobiliariarf.es',
    phone: '+34 667 890 123',
    sector: 'Inmobiliaria',
    created_at: daysAgo(6),
    project_count: 1,
  },
];

// Prices stored in cents (Stripe convention), display divides by 100
export const MOCK_PROJECTS: MockProject[] = [
  {
    id: 'mock-proj-1',
    name: 'Web corporativa + CRM interno',
    status: 'in_development',
    plan: 'build',
    client_id: 'mock-client-1',
    client_name: 'María García',
    total_price: 720000,
    base_price: 500000,
    created_at: daysAgo(40),
    used_iterations: 1,
    max_iterations: 3,
  },
  {
    id: 'mock-proj-2',
    name: 'Plataforma SaaS de gestión de reservas',
    status: 'proposal_sent',
    plan: 'scale',
    client_id: 'mock-client-2',
    client_name: 'Carlos Martínez',
    total_price: 1850000,
    base_price: 1200000,
    created_at: daysAgo(35),
    used_iterations: 0,
    max_iterations: 5,
  },
  {
    id: 'mock-proj-3',
    name: 'Tienda online ropa y complementos',
    status: 'in_review',
    plan: 'build',
    client_id: 'mock-client-3',
    client_name: 'Laura Sánchez',
    total_price: 890000,
    base_price: 500000,
    created_at: daysAgo(28),
    used_iterations: 2,
    max_iterations: 3,
  },
  {
    id: 'mock-proj-4',
    name: 'App de citas médicas con IA',
    status: 'pending_proposal',
    plan: 'build',
    client_id: 'mock-client-4',
    client_name: 'Javier López',
    total_price: null,
    base_price: 500000,
    created_at: daysAgo(20),
    used_iterations: 0,
    max_iterations: 3,
  },
  {
    id: 'mock-proj-5',
    name: 'Landing + App pedidos restaurante',
    status: 'proposal_accepted',
    plan: 'launch',
    client_id: 'mock-client-5',
    client_name: 'Ana Torres',
    total_price: 280000,
    base_price: 150000,
    created_at: daysAgo(12),
    used_iterations: 0,
    max_iterations: 1,
  },
  {
    id: 'mock-proj-6',
    name: 'Portal inmobiliario con filtros avanzados',
    status: 'pending_proposal',
    plan: 'scale',
    client_id: 'mock-client-6',
    client_name: 'Roberto Fernández',
    total_price: null,
    base_price: 1200000,
    created_at: daysAgo(4),
    used_iterations: 0,
    max_iterations: 5,
  },
  {
    id: 'mock-proj-7',
    name: 'Dashboard analítica e-commerce',
    status: 'completed',
    plan: 'build',
    client_id: 'mock-client-3',
    client_name: 'Laura Sánchez',
    total_price: 640000,
    base_price: 500000,
    created_at: daysAgo(60),
    used_iterations: 3,
    max_iterations: 3,
  },
  {
    id: 'mock-proj-8',
    name: 'Automatización facturación + contabilidad',
    status: 'delivered',
    plan: 'build',
    client_id: 'mock-client-1',
    client_name: 'María García',
    total_price: 580000,
    base_price: 500000,
    created_at: daysAgo(75),
    used_iterations: 2,
    max_iterations: 3,
  },
];

/** Returns true when demo data should be used (VITE_MOCK_ROLE=admin and Supabase is empty) */
export function shouldUseMockData(realDataLength: number): boolean {
  return import.meta.env.VITE_MOCK_ROLE === 'admin' && realDataLength === 0;
}

/** Returns true when the ID is a mock ID (starts with 'mock-') */
export function isMockId(id: string): boolean {
  return import.meta.env.VITE_MOCK_ROLE === 'admin' && id.startsWith('mock-');
}

export interface MockProjectDetail {
  project: {
    id: string;
    name: string;
    status: string;
    plan: string;
    client_id: string;
    total_price: number | null;
    base_price: number | null;
    extras_price: number | null;
    delivery_days: number | null;
    max_iterations: number;
    used_iterations: number;
    created_at: string;
    contract_signed_at: string | null;
    internal_notes: string | null;
  };
  client: {
    id: string;
    full_name: string;
    company: string | null;
    phone: string | null;
    sector: string | null;
    email?: string;
  };
  proposals: Array<{
    id: string;
    version: number;
    content_md: string;
    status: string;
    sent_at: string | null;
  }>;
  payments: Array<{
    id: string;
    amount: number;
    type: string;
    status: string;
    created_at: string;
  }>;
  questionnaire: {
    id: string;
    messages_json: unknown;
    extracted_data_json: unknown;
    ai_summary: string | null;
    status: string;
    completed_at: string | null;
  } | null;
}

const MOCK_PROPOSALS: Record<string, MockProjectDetail['proposals']> = {
  'mock-proj-1': [
    {
      id: 'mock-prop-1',
      version: 2,
      content_md: `# Propuesta: Web Corporativa + CRM Interno\n\n## Resumen ejecutivo\nDesarrollamos una web corporativa profesional con CRM interno integrado para García Consultoría SL. El proyecto incluye portal público de captación de clientes y panel privado de gestión.\n\n## Stack tecnológico\n- **Frontend**: React 19 + TypeScript + Tailwind CSS\n- **Backend**: Supabase (PostgreSQL + Auth + Storage)\n- **CRM**: Módulo custom con pipelines, contactos, tareas\n- **Deploy**: Vercel (frontend) + Supabase cloud\n\n## Funcionalidades incluidas\n### Web pública\n- Landing con secciones: hero, servicios, equipo, casos de éxito, contacto\n- Blog/noticias con CMS\n- Formulario de captación de leads\n- SEO optimizado\n\n### CRM interno\n- Gestión de contactos y empresas\n- Pipeline de ventas con kanban\n- Tareas y recordatorios\n- Dashboard con métricas clave\n\n## Desglose de precios\n| Concepto | Precio |\n|----------|--------|\n| Plan Build base | 5.000€ |\n| CRM custom | +1.200€ |\n| Blog/CMS | +500€ |\n| SEO técnico | +400€ |\n| Diseño premium | +500€ |\n| **Total** | **7.200€** |\n\n## Timeline\n- Fase 1 (Diseño): 5 días\n- Fase 2 (Desarrollo): 15 días\n- Fase 3 (Testing): 3 días\n- **Total: 23 días hábiles**\n\n## Condiciones\n- Pago 50% inicio / 50% entrega\n- 3 iteraciones de cambios incluidas\n- Código 100% del cliente\n- Soporte 30 días post-lanzamiento`,
      status: 'accepted',
      sent_at: daysAgo(35),
    },
    {
      id: 'mock-prop-1b',
      version: 1,
      content_md: `# Propuesta inicial v1\n\nBorrador inicial para revisión interna.`,
      status: 'draft',
      sent_at: null,
    },
  ],
  'mock-proj-2': [
    {
      id: 'mock-prop-2',
      version: 1,
      content_md: `# Propuesta: Plataforma SaaS de Gestión de Reservas\n\n## Resumen ejecutivo\nPlataforma SaaS completa para gestión de reservas con panel admin, notificaciones en tiempo real y sistema de pagos integrado.\n\n## Stack tecnológico\n- **Frontend**: React 19 + TypeScript + Framer Motion\n- **Backend**: Supabase (PostgreSQL + Realtime + Edge Functions)\n- **Pagos**: Stripe (reservas + suscripciones)\n- **Notificaciones**: Resend (email) + push notifications\n\n## Funcionalidades incluidas\n- Multi-tenant (varios negocios en la misma plataforma)\n- Calendario de disponibilidad en tiempo real\n- Reservas online con pago integrado\n- Panel admin por negocio + superadmin\n- App web responsive (PWA)\n- Notificaciones email + SMS\n- Analytics de ocupación y revenue\n\n## Desglose de precios\n| Concepto | Precio |\n|----------|--------|\n| Plan Scale base | 12.000€ |\n| Auth con roles | +800€ |\n| Pagos + suscripciones | +900€ |\n| Panel admin avanzado | +1.200€ |\n| DB compleja | +800€ |\n| Notificaciones push | +400€ |\n| Multi-idioma (EN/ES) | +400€ |\n| **Total** | **16.500€** |\n\n## Timeline: 40 días hábiles`,
      status: 'sent',
      sent_at: daysAgo(5),
    },
  ],
  'mock-proj-3': [
    {
      id: 'mock-prop-3',
      version: 1,
      content_md: `# Propuesta: Tienda Online Ropa y Complementos\n\n## Resumen ejecutivo\nE-commerce completo con catálogo, carrito, checkout, gestión de pedidos e inventario.\n\n## Stack: Next.js + Stripe + Supabase\n\n## Total: 8.900€\n## Timeline: 25 días`,
      status: 'accepted',
      sent_at: daysAgo(22),
    },
  ],
};

const MOCK_PAYMENTS: Record<string, MockProjectDetail['payments']> = {
  'mock-proj-1': [
    { id: 'mock-pay-1a', amount: 360000, type: 'deposit', status: 'succeeded', created_at: daysAgo(38) },
    { id: 'mock-pay-1b', amount: 360000, type: 'final', status: 'succeeded', created_at: daysAgo(5) },
  ],
  'mock-proj-3': [
    { id: 'mock-pay-3a', amount: 445000, type: 'deposit', status: 'succeeded', created_at: daysAgo(25) },
    { id: 'mock-pay-3b', amount: 445000, type: 'final', status: 'pending', created_at: daysAgo(1) },
  ],
  'mock-proj-5': [
    { id: 'mock-pay-5a', amount: 140000, type: 'deposit', status: 'succeeded', created_at: daysAgo(10) },
  ],
  'mock-proj-7': [
    { id: 'mock-pay-7a', amount: 320000, type: 'deposit', status: 'succeeded', created_at: daysAgo(58) },
    { id: 'mock-pay-7b', amount: 320000, type: 'final', status: 'succeeded', created_at: daysAgo(15) },
  ],
  'mock-proj-8': [
    { id: 'mock-pay-8a', amount: 290000, type: 'deposit', status: 'succeeded', created_at: daysAgo(73) },
    { id: 'mock-pay-8b', amount: 290000, type: 'final', status: 'succeeded', created_at: daysAgo(20) },
    { id: 'mock-pay-8c', amount: 4900, type: 'maintenance', status: 'succeeded', created_at: daysAgo(5) },
  ],
};

const MOCK_QUESTIONNAIRES: Record<string, MockProjectDetail['questionnaire']> = {
  'mock-proj-1': {
    id: 'mock-q-1',
    messages_json: null,
    extracted_data_json: {
      projectType: 'web_corporativa',
      isNew: true,
      objective: 'Captar clientes B2B para consultoría estratégica y gestionar pipeline de ventas',
      targetAudience: 'Empresas medianas, B2B, directores y CEOs',
      features: { auth: 'roles', database: 'complex', admin: 'advanced', blog: true },
      design: { hasIdentity: true, colors: ['#1a1a2e', '#16213e'], style: 'Corporativo' },
      timeline: '1 mes',
      budget: { min: 6000, max: 9000, flexible: false },
    },
    ai_summary: 'Web corporativa con CRM interno para consultoría B2B. El cliente tiene identidad visual definida y necesita gestionar un pipeline de ventas con varios comerciales. Presupuesto ajustado pero proyecto claramente definido.',
    status: 'completed',
    completed_at: daysAgo(42),
  },
  'mock-proj-2': {
    id: 'mock-q-2',
    messages_json: null,
    extracted_data_json: {
      projectType: 'saas',
      isNew: true,
      objective: 'Plataforma SaaS multi-tenant para gestión de reservas en negocios de servicios',
      targetAudience: 'B2B: peluquerías, clínicas, gimnasios, consultores',
      features: { auth: 'roles', payments: 'recurring', pushNotifications: true, integrations: ['Google Calendar', 'WhatsApp'] },
      design: { hasIdentity: false, style: 'Moderno-Bold' },
      timeline: '2 meses',
      budget: { min: 15000, max: 20000, flexible: true },
    },
    ai_summary: 'Plataforma SaaS ambiciosa con modelo multi-tenant. El cliente tiene experiencia en el sector y conoce sus competidores. Necesita pagos recurrentes e integraciones con calendarios externos. Presupuesto realista para el scope.',
    status: 'completed',
    completed_at: daysAgo(37),
  },
};

/** Get full mock project detail for demo purposes */
export function getMockProjectDetail(projectId: string): MockProjectDetail | null {
  const mockProject = MOCK_PROJECTS.find((p) => p.id === projectId);
  if (!mockProject) return null;

  const mockClient = MOCK_CLIENTS.find((c) => c.id === mockProject.client_id);
  if (!mockClient) return null;

  const basePrice = mockProject.base_price;
  const totalPrice = mockProject.total_price;
  const extrasPrice = totalPrice != null ? totalPrice - basePrice : null;

  return {
    project: {
      id: mockProject.id,
      name: mockProject.name,
      status: mockProject.status,
      plan: mockProject.plan,
      client_id: mockProject.client_id,
      total_price: totalPrice,
      base_price: basePrice,
      extras_price: extrasPrice,
      delivery_days: mockProject.plan === 'launch' ? 7 : mockProject.plan === 'build' ? 20 : 35,
      max_iterations: mockProject.max_iterations,
      used_iterations: mockProject.used_iterations,
      created_at: mockProject.created_at,
      contract_signed_at:
        ['in_development', 'in_review', 'completed', 'delivered', 'proposal_accepted'].includes(mockProject.status)
          ? daysAgo(30)
          : null,
      internal_notes: 'Cliente con alta capacidad de decisión. Responde rápido por email.',
    },
    client: {
      id: mockClient.id,
      full_name: mockClient.full_name,
      company: mockClient.company,
      phone: mockClient.phone,
      sector: mockClient.sector,
      email: mockClient.email ?? undefined,
    },
    proposals: MOCK_PROPOSALS[projectId] ?? [],
    payments: MOCK_PAYMENTS[projectId] ?? [],
    questionnaire: MOCK_QUESTIONNAIRES[projectId] ?? null,
  };
}
