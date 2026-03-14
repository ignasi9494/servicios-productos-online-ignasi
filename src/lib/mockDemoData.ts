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
