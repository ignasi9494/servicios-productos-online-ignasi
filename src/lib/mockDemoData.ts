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

// ---------------------------------------------------------------------------
// CLIENT DASHBOARD MOCK DATA
// Used when VITE_MOCK_ROLE is set — shows realistic client experience
// ---------------------------------------------------------------------------

export function isMockDemo(): boolean {
  return !!import.meta.env.VITE_MOCK_ROLE;
}

// Total revenue from all succeeded mock payments (in cents)
export const MOCK_TOTAL_REVENUE_CENTS =
  360000 + 360000 + // mock-proj-1 deposit + final
  445000 +          // mock-proj-3 deposit (final pending)
  140000 +          // mock-proj-5 deposit
  320000 + 320000 + // mock-proj-7 deposit + final
  290000 + 290000 + 4900; // mock-proj-8 deposit + final + maintenance

export const MOCK_CLIENT_PROJECT = {
  id: 'mock-proj-1',
  name: 'Web corporativa + CRM interno',
  plan: 'build' as const,
  status: 'proposal_sent' as const,
  total_price: 720000, // cents
  base_price: 500000,
  used_iterations: 1,
  max_iterations: 3,
  created_at: daysAgo(40),
};

export interface MockMessage {
  id: string;
  content: string;
  sender_role: 'client' | 'admin' | 'system';
  sender_name: string;
  isOwn: boolean;
  created_at: string;
  attachment_url: string | null;
  read_at: string | null;
}

export const MOCK_CLIENT_MESSAGES: MockMessage[] = [
  {
    id: 'msg-1',
    content: '¡Hola! Hemos recibido tu cuestionario. Estamos analizando los requisitos de tu proyecto. Te enviaremos la propuesta definitiva en menos de 24 horas.',
    sender_role: 'admin',
    sender_name: 'Ignasi (Equipo)',
    isOwn: false,
    created_at: daysAgo(39),
    attachment_url: null,
    read_at: daysAgo(39),
  },
  {
    id: 'msg-2',
    content: 'Perfecto, muchas gracias. Estoy disponible si necesitáis más información sobre el CRM.',
    sender_role: 'client',
    sender_name: 'María García',
    isOwn: true,
    created_at: daysAgo(39),
    attachment_url: null,
    read_at: daysAgo(39),
  },
  {
    id: 'msg-3',
    content: 'Tu propuesta ya está lista en la sección de Propuestas. Incluye el stack técnico, el desglose de precios y el plan de entrega. ¡Cualquier duda nos dices!',
    sender_role: 'admin',
    sender_name: 'Ignasi (Equipo)',
    isOwn: false,
    created_at: daysAgo(38),
    attachment_url: null,
    read_at: daysAgo(38),
  },
  {
    id: 'msg-4',
    content: 'He revisado la propuesta y me gusta mucho el enfoque. Una pregunta: ¿el CRM incluye exportación de datos a Excel?',
    sender_role: 'client',
    sender_name: 'María García',
    isOwn: true,
    created_at: daysAgo(37),
    attachment_url: null,
    read_at: daysAgo(37),
  },
  {
    id: 'msg-5',
    content: 'Sí, el CRM incluirá exportación a CSV/Excel desde cualquier listado. También podemos añadir informes PDF si lo necesitas como add-on. ¿Quieres que lo añadamos al presupuesto?',
    sender_role: 'admin',
    sender_name: 'Ignasi (Equipo)',
    isOwn: false,
    created_at: daysAgo(37),
    attachment_url: null,
    read_at: daysAgo(37),
  },
  {
    id: 'msg-6',
    content: 'Por ahora con el CSV está bien, gracias. Voy a aceptar la propuesta ahora mismo.',
    sender_role: 'client',
    sender_name: 'María García',
    isOwn: true,
    created_at: daysAgo(36),
    attachment_url: null,
    read_at: daysAgo(36),
  },
];

export const MOCK_CLIENT_PROPOSAL = {
  id: 'mock-proposal-client-1',
  project_id: 'mock-proj-1',
  version: 1,
  status: 'sent' as const,
  sent_at: daysAgo(38),
  responded_at: null,
  created_at: daysAgo(38),
  stack_description: 'React + TypeScript · Node.js · PostgreSQL · Vercel',
  timeline_description: '20 días hábiles desde la aceptación y pago de entrada',
  price_breakdown_json: {
    base: 5000,
    extras: 2200,
    total: 7200,
  },
  content_md: `# Propuesta: Web corporativa + CRM interno

## Resumen ejecutivo
Desarrollaremos una web corporativa de alto impacto junto con un CRM interno personalizado para gestionar clientes, oportunidades y tareas. La solución será moderna, rápida y escalable.

## Solución propuesta

### 1. Web corporativa
- Diseño personalizado con identidad de marca
- Secciones: inicio, servicios, equipo, casos de éxito, contacto
- Formulario de contacto con notificaciones por email
- SEO técnico optimizado
- Responsive (móvil, tablet, escritorio)

### 2. CRM interno
- Panel de gestión de clientes y contactos
- Pipeline de oportunidades con etapas personalizables
- Sistema de tareas y recordatorios
- Historial de interacciones
- Exportación de datos a CSV/Excel
- Dashboard con KPIs y métricas clave

## Stack técnico
| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + TypeScript |
| Backend | Node.js + Express |
| Base de datos | PostgreSQL (Supabase) |
| Autenticación | Supabase Auth |
| Deploy | Vercel (frontend) + Supabase (backend) |

## Plan de entrega (20 días hábiles)
- **Días 1-3**: Diseño UI/UX y revisión
- **Días 4-10**: Desarrollo frontend web corporativa
- **Días 11-18**: Desarrollo CRM + integración
- **Días 19-20**: Testing, ajustes y entrega

## Precio

| Concepto | Precio |
|----------|--------|
| Plan Build (base) | 5.000 € |
| CRM personalizado (add-on) | 1.500 € |
| Integración email + notificaciones | 700 € |
| **Total** | **7.200 €** |

*Pago: 40% entrada (2.880 €) + 60% entrega (4.320 €)*

## Iteraciones incluidas
El plan Build incluye **3 rondas de revisiones** durante el desarrollo.`,
};

export const MOCK_CLIENT_PAYMENTS = [
  {
    id: 'mock-pay-client-1',
    project_id: 'mock-proj-1',
    stripe_payment_id: 'pi_mock_deposit',
    amount: 288000, // 2880€ in cents
    currency: 'eur',
    type: 'deposit' as const,
    status: 'succeeded' as const,
    created_at: daysAgo(35),
    project_name: 'Web corporativa + CRM interno',
  },
];
