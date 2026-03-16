import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Zap,
  Clock,
  ArrowRight,
  BarChart3,
  Shield,
  FlaskConical,
  Bug,
  Target,
} from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePageMeta } from '../../hooks/usePageMeta';

export function TestingReactVitest() {
  usePageTitle(
    'Testing en React con Vitest y Testing Library: guía práctica para equipos SaaS — Think Better',
  );
  usePageMeta(
    'Guía completa de testing en React para equipos SaaS. Cómo configurar Vitest y Testing Library, qué testear y qué no, unit tests, integration tests, mocking de Supabase/Stripe, y caso real: de 0 a 80% cobertura en 2 semanas.',
  );

  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline:
        'Testing en React con Vitest y Testing Library: guía práctica para equipos SaaS',
      description:
        'Guía práctica para implementar una estrategia de testing en React usando Vitest y Testing Library. Configuración, unit tests, integration tests, mocking de APIs externas y métricas reales de equipos SaaS.',
      datePublished: '2026-03-16',
      dateModified: '2026-03-16',
      author: {
        '@type': 'Organization',
        name: 'Think Better',
        url: 'https://servicios-productos-online-ignasi.vercel.app/',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Think Better',
        logo: {
          '@type': 'ImageObject',
          url: 'https://servicios-productos-online-ignasi.vercel.app/favicon.svg',
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id':
          'https://servicios-productos-online-ignasi.vercel.app/blog/testing-react-vitest-testing-library',
      },
    };
    const script = document.createElement('script');
    script.id = 'article-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      const existing = document.getElementById('article-schema');
      if (existing) existing.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-sm border-b border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-emerald-400 font-semibold text-lg">
            Think Better
          </Link>
          <Link
            to="/blog"
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al blog
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20">
                TESTING
              </span>
              <span className="flex items-center gap-1.5 text-zinc-500 text-sm">
                <Clock className="w-4 h-4" />
                13 min de lectura
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Testing en React con Vitest y Testing Library: guía práctica para equipos SaaS
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed mb-6">
              El 68% de los bugs en producción se encuentran primero por los usuarios, no por el equipo.
              Esta guía muestra cómo configurar una estrategia de testing real para React — sin
              perder semanas escribiendo tests que no aportan valor.
            </p>
            <div className="flex items-center gap-2 text-zinc-500 text-sm">
              <span>Think Better</span>
              <span>·</span>
              <span>16 mar 2026</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-24">
        <div className="max-w-4xl mx-auto article-body">

          {/* Stat highlight */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-zinc-900 border border-zinc-800 p-8 mb-12 text-center"
          >
            <div className="text-5xl font-black text-emerald-400 mb-2">68%</div>
            <div className="text-zinc-300 text-lg">
              de los bugs en producción los descubren los usuarios, no el equipo de desarrollo
            </div>
            <div className="text-zinc-500 text-sm mt-2">Fuente: State of Software Quality Report 2025</div>
          </motion.div>

          {/* Por qué Vitest */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-4">Por qué Vitest en lugar de Jest en 2026</h2>
            <p className="text-zinc-400 mb-6">
              Durante años, Jest fue el estándar para testing en React. Pero con la adopción masiva
              de Vite como bundler, Vitest se ha convertido en la opción natural: misma API que Jest
              (migración 1-1), pero hasta 5× más rápido gracias al motor ESM nativo.
            </p>

            {/* Comparison cards */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-zinc-700 flex items-center justify-center">
                    <Code2 className="w-4 h-4 text-zinc-300" />
                  </div>
                  <span className="font-bold text-zinc-300">Jest</span>
                </div>
                <ul className="space-y-2 text-sm text-zinc-400">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    Requiere transpilación extra con Vite/ESM
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    Config separada de vite.config.ts
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    Más lento en proyectos grandes (CJS overhead)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    Ecosistema maduro y amplia documentación
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl bg-zinc-900 border border-emerald-500/30 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="font-bold text-emerald-400">Vitest</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Recomendado</span>
                </div>
                <ul className="space-y-2 text-sm text-zinc-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    Comparte config con vite.config.ts
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    ESM nativo — sin transpilación adicional
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    Watch mode inteligente (HMR-aware)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    API 100% compatible con Jest
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
              <div className="text-xs text-zinc-500 mb-3 font-mono">Terminal — instalación</div>
              <pre className="text-sm text-emerald-300 font-mono overflow-x-auto whitespace-pre-wrap">{`npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom`}</pre>
            </div>
          </motion.section>

          {/* Configuración */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-4">Configuración en vite.config.ts</h2>
            <p className="text-zinc-400 mb-6">
              Lo mejor de Vitest es que se configura dentro de tu propio <code className="text-emerald-400 bg-zinc-800 px-1 rounded">vite.config.ts</code>. Sin
              fichero jest.config separado, sin babel.config, sin sorpresas.
            </p>
            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 mb-6">
              <div className="text-xs text-zinc-500 mb-3 font-mono">vite.config.ts</div>
              <pre className="text-sm text-zinc-300 font-mono overflow-x-auto">{`/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,          // describe/it/expect sin imports
    environment: 'jsdom',   // simula el DOM del navegador
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      reporter: ['text', 'html'],
      exclude: ['node_modules/', 'src/test/'],
    },
  },
});`}</pre>
            </div>

            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
              <div className="text-xs text-zinc-500 mb-3 font-mono">src/test/setup.ts</div>
              <pre className="text-sm text-zinc-300 font-mono overflow-x-auto">{`import '@testing-library/jest-dom';
// Matchers como .toBeInTheDocument(), .toHaveValue(), etc.`}</pre>
            </div>
          </motion.section>

          {/* La pirámide de testing */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-4">La pirámide de testing para SaaS: qué testear y qué no</h2>
            <p className="text-zinc-400 mb-6">
              El error más común de los equipos que empiezan a testear: intentar cubrir
              todo al 100% desde el día uno. El resultado es una suite de tests lenta, frágil,
              y que nadie mantiene. La regla es simple: testea en proporción al riesgo de negocio.
            </p>

            <div className="space-y-4 mb-8">
              {/* Unit tests */}
              <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <FlaskConical className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-white">Unit Tests (60%)</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Más rápidos — ms por test</span>
                    </div>
                    <p className="text-zinc-400 text-sm mb-3">
                      Funciones puras, hooks personalizados, utilidades de negocio. Son los más
                      baratos de escribir y los que más rápido dan feedback.
                    </p>
                    <div className="text-sm text-zinc-500">
                      <strong className="text-zinc-300">Qué testear:</strong> calculadoras de precio,
                      validaciones de formulario, transformaciones de datos, hooks como <code className="text-emerald-400 bg-zinc-800 px-1 rounded">useAuth</code>,
                      lógica de permisos, formatters.
                    </div>
                  </div>
                </div>
              </div>

              {/* Integration tests */}
              <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-white">Integration Tests (30%)</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">Moderados — segundos por test</span>
                    </div>
                    <p className="text-zinc-400 text-sm mb-3">
                      Componentes con sus hooks y contextos. Simulas el comportamiento real del
                      usuario: clicks, inputs, respuestas de API mockeadas.
                    </p>
                    <div className="text-sm text-zinc-500">
                      <strong className="text-zinc-300">Qué testear:</strong> formularios de login/registro,
                      flujo de checkout, componentes de listado con filtros, modales de confirmación,
                      páginas completas con providers mockeados.
                    </div>
                  </div>
                </div>
              </div>

              {/* E2E tests */}
              <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-white">E2E Tests (10%)</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">Lentos — minutos por suite</span>
                    </div>
                    <p className="text-zinc-400 text-sm mb-3">
                      Solo para los flujos críticos de negocio: registro → primer login,
                      checkout completo, flujo de onboarding. Con Playwright o Cypress contra
                      entorno staging.
                    </p>
                    <div className="text-sm text-zinc-500">
                      <strong className="text-zinc-300">Qué testear:</strong> el camino feliz del
                      usuario principal. Si falla este test, el negocio para.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-amber-500/5 border border-amber-500/20 p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-amber-300 mb-1">Qué NO testear</div>
                  <p className="text-zinc-400 text-sm">
                    Librerías de terceros (Supabase, Stripe), implementaciones internas de componentes
                    de UI (clases CSS, snapshots), lógica que cambia con cada refactor, código
                    generado automáticamente. Cada test que escribes tiene un coste de mantenimiento — elige bien.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Unit test ejemplo */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-4">Unit tests: funciones puras y hooks</h2>
            <p className="text-zinc-400 mb-6">
              Empieza siempre por las funciones de negocio: calculadoras de precio, validaciones,
              transformaciones. Son las más fáciles de testear y las que dan más confianza.
            </p>

            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 mb-4">
              <div className="text-xs text-zinc-500 mb-3 font-mono">src/lib/priceCalculator.test.ts</div>
              <pre className="text-sm text-zinc-300 font-mono overflow-x-auto">{`import { describe, it, expect } from 'vitest';
import { calculatePrice } from './priceCalculator';

describe('calculatePrice', () => {
  it('returns base price for starter plan', () => {
    expect(calculatePrice({ plan: 'starter' })).toBe(2000);
  });

  it('adds addons to base price', () => {
    const result = calculatePrice({
      plan: 'pro',
      addons: ['mobile', 'analytics'],
    });
    expect(result).toBeGreaterThan(3500);
  });

  it('never returns negative price', () => {
    const result = calculatePrice({ plan: 'starter', discount: 9999 });
    expect(result).toBeGreaterThanOrEqual(0);
  });
});`}</pre>
            </div>

            <p className="text-zinc-400 mb-4">
              Para hooks personalizados, usa <code className="text-emerald-400 bg-zinc-800 px-1 rounded">renderHook</code> de Testing Library:
            </p>

            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
              <div className="text-xs text-zinc-500 mb-3 font-mono">src/hooks/useCounter.test.ts</div>
              <pre className="text-sm text-zinc-300 font-mono overflow-x-auto">{`import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('starts at zero by default', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('increments correctly', () => {
    const { result } = renderHook(() => useCounter(10));
    act(() => result.current.increment());
    expect(result.current.count).toBe(11);
  });
});`}</pre>
            </div>
          </motion.section>

          {/* Integration tests */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-4">Integration tests: componentes con Testing Library</h2>
            <p className="text-zinc-400 mb-6">
              La filosofía de Testing Library es clave: testea lo que el usuario ve, no los
              detalles de implementación. Nunca accedas a props o estado interno — solo
              a lo que el DOM muestra.
            </p>

            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 mb-6">
              <div className="text-xs text-zinc-500 mb-3 font-mono">src/components/LoginForm.test.tsx</div>
              <pre className="text-sm text-zinc-300 font-mono overflow-x-auto">{`import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { LoginForm } from './LoginForm';

// Mock Supabase — nunca llames a la BD real en tests
vi.mock('../lib/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn().mockResolvedValue({
        data: { user: { id: '123', email: 'test@test.com' } },
        error: null,
      }),
    },
  },
}));

describe('LoginForm', () => {
  it('submits with valid credentials', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), 'test@test.com');
    await user.type(screen.getByLabelText(/contraseña/i), 'password123');
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    });
  });

  it('shows error on invalid credentials', async () => {
    const { supabase } = await import('../lib/supabase');
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValueOnce({
      data: { user: null, session: null },
      error: { message: 'Invalid credentials', status: 400 },
    });

    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email/i), 'wrong@test.com');
    await user.type(screen.getByLabelText(/contraseña/i), 'wrongpass');
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(screen.getByText(/credenciales inválidas/i)).toBeInTheDocument();
    });
  });
});`}</pre>
            </div>

            <div className="rounded-2xl bg-emerald-500/5 border border-emerald-500/20 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-emerald-300 mb-1">Regla de oro: getByRole sobre getByTestId</div>
                  <p className="text-zinc-400 text-sm">
                    Prioriza <code className="text-emerald-400 bg-zinc-800 px-1 rounded">getByRole</code>,{' '}
                    <code className="text-emerald-400 bg-zinc-800 px-1 rounded">getByLabelText</code>,{' '}
                    <code className="text-emerald-400 bg-zinc-800 px-1 rounded">getByText</code> sobre{' '}
                    <code className="text-zinc-500 bg-zinc-800 px-1 rounded">getByTestId</code>. Los primeros
                    reflejan cómo un usuario real (o lector de pantalla) interactúa con la UI. Los tests
                    con <code className="text-zinc-500 bg-zinc-800 px-1 rounded">data-testid</code> son más
                    frágiles y menos accesibles.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Mocking Supabase y Stripe */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-4">Mocking de servicios externos: Supabase y Stripe</h2>
            <p className="text-zinc-400 mb-6">
              Nunca llames a Supabase ni a Stripe en tests unitarios o de integración. Los
              mocks te permiten controlar exactamente qué devuelve cada servicio y testear todos
              los casos edge sin costes ni efectos secundarios.
            </p>

            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 mb-6">
              <div className="text-xs text-zinc-500 mb-3 font-mono">src/test/mocks/supabase.ts — mock factory</div>
              <pre className="text-sm text-zinc-300 font-mono overflow-x-auto">{`import { vi } from 'vitest';

export const mockSupabase = {
  auth: {
    getUser: vi.fn().mockResolvedValue({
      data: { user: { id: 'user-123', email: 'test@test.com' } },
    }),
    signOut: vi.fn().mockResolvedValue({ error: null }),
  },
  from: vi.fn(() => ({
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({
      data: { id: 'proj-1', name: 'Mi SaaS', status: 'in_development' },
      error: null,
    }),
    insert: vi.fn().mockResolvedValue({ error: null }),
    update: vi.fn().mockReturnThis(),
  })),
};

// En cada test que lo necesite:
vi.mock('../../lib/supabase', () => ({ supabase: mockSupabase }));`}</pre>
            </div>

            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
              <div className="text-xs text-zinc-500 mb-3 font-mono">src/components/PaymentButton.test.tsx — mock Stripe</div>
              <pre className="text-sm text-zinc-300 font-mono overflow-x-auto">{`import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { PaymentButton } from './PaymentButton';

// Mock el módulo de Stripe — no cargues Stripe.js en tests
vi.mock('../lib/stripe', () => ({
  redirectToCheckout: vi.fn().mockResolvedValue({ error: null }),
}));

describe('PaymentButton', () => {
  it('redirects to Stripe on click', async () => {
    const { redirectToCheckout } = await import('../lib/stripe');
    const user = userEvent.setup();

    render(<PaymentButton priceId="price_xxx" amount={2000} />);
    await user.click(screen.getByRole('button', { name: /pagar/i }));

    await waitFor(() => {
      expect(redirectToCheckout).toHaveBeenCalledWith({
        priceId: 'price_xxx',
      });
    });
  });
});`}</pre>
            </div>
          </motion.section>

          {/* Tabla: herramientas de testing */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-4">Stack de testing recomendado para React SaaS</h2>
            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden mb-6">
              <div className="grid grid-cols-3 gap-0 text-sm font-bold text-zinc-400 border-b border-zinc-800 px-6 py-3">
                <span>Herramienta</span>
                <span>Para qué</span>
                <span>Alternativa</span>
              </div>
              {[
                { tool: 'Vitest', use: 'Test runner + assertions', alt: 'Jest' },
                { tool: 'Testing Library', use: 'Render y query de componentes', alt: 'Enzyme (deprecated)' },
                { tool: 'user-event', use: 'Simular interacciones de usuario', alt: 'fireEvent (más limitado)' },
                { tool: 'MSW (Mock Service Worker)', use: 'Interceptar requests HTTP reales', alt: 'vi.mock del cliente HTTP' },
                { tool: 'Playwright', use: 'Tests E2E en navegador real', alt: 'Cypress' },
                { tool: 'Istanbul / v8', use: 'Coverage reports', alt: 'nyc' },
              ].map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-3 gap-0 px-6 py-4 text-sm ${i % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-950'} border-b border-zinc-800/50`}
                >
                  <span className="font-mono text-emerald-400">{row.tool}</span>
                  <span className="text-zinc-300">{row.use}</span>
                  <span className="text-zinc-500">{row.alt}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* MSW */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-4">MSW: mocking de red a nivel de Service Worker</h2>
            <p className="text-zinc-400 mb-6">
              Mock Service Worker (MSW) intercepta las requests reales del navegador en lugar de
              mockear módulos. Funciona igual en tests y en el navegador — el código de producción
              no cambia en absoluto.
            </p>

            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 mb-6">
              <div className="text-xs text-zinc-500 mb-3 font-mono">src/test/handlers.ts</div>
              <pre className="text-sm text-zinc-300 font-mono overflow-x-auto">{`import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock la Edge Function de Supabase
  http.post('*/functions/v1/questionnaire-chat', () => {
    return HttpResponse.json({
      reply: '¡Hola! ¿Cuál es el objetivo principal de tu proyecto?',
      step: 1,
    });
  }),

  // Mock el endpoint de Stripe
  http.post('*/create-checkout-session', () => {
    return HttpResponse.json({
      url: 'https://checkout.stripe.com/pay/test_xxx',
    });
  }),
];`}</pre>
            </div>

            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
              <div className="text-xs text-zinc-500 mb-3 font-mono">src/test/setup.ts — activar MSW</div>
              <pre className="text-sm text-zinc-300 font-mono overflow-x-auto">{`import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());`}</pre>
            </div>
          </motion.section>

          {/* Caso real */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6">Caso real: de 0 a 80% de cobertura en 2 semanas</h2>

            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-8 mb-6">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="text-xs text-zinc-500 mb-2 uppercase tracking-wider">Empresa</div>
                  <div className="text-white font-bold">InvoiceFlow (SaaS de facturación B2B)</div>
                  <div className="text-zinc-400 text-sm mt-1">12 desarrolladores · React + Supabase · 3 años de deuda técnica</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500 mb-2 uppercase tracking-wider">Problema</div>
                  <div className="text-white font-bold">2,4 bugs en producción/semana</div>
                  <div className="text-zinc-400 text-sm mt-1">0% de cobertura de tests · Deploy con miedo</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Cobertura antes', value: '0%', color: 'text-red-400' },
                  { label: 'Cobertura después', value: '81%', color: 'text-emerald-400' },
                  { label: 'Bugs prod/semana', value: '0.3', color: 'text-emerald-400', suffix: '(-87%)' },
                  { label: 'Tiempo total setup', value: '2 sem', color: 'text-cyan-400' },
                ].map((m, i) => (
                  <div key={i} className="rounded-xl bg-zinc-800/50 p-4 text-center">
                    <div className={`text-2xl font-black ${m.color}`}>{m.value}</div>
                    {m.suffix && <div className="text-xs text-emerald-400">{m.suffix}</div>}
                    <div className="text-zinc-500 text-xs mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg">Plan de 2 semanas seguido</h3>
              {[
                {
                  week: 'Semana 1',
                  tasks: [
                    'Instalar Vitest + Testing Library + MSW. Configuración básica.',
                    'Testear todas las funciones de negocio puras (calculadoras, validaciones): 40 tests en 2 días.',
                    'Testear el formulario de login y el de creación de facturas con user-event.',
                    'Configurar coverage en CI (GitHub Actions) — falla si baja de 40%.',
                  ],
                  coverage: '~45%',
                },
                {
                  week: 'Semana 2',
                  tasks: [
                    'Integration tests para los 5 flujos críticos de negocio con MSW.',
                    'Testear casos de error: red caída, sesión expirada, datos inválidos.',
                    'Añadir Playwright para E2E del flujo de pago en staging.',
                    'Aumentar umbral de coverage en CI a 75%.',
                  ],
                  coverage: '~81%',
                },
              ].map((w, i) => (
                <div key={i} className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-white">{w.week}</h4>
                    <span className="text-sm px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Cobertura al final: {w.coverage}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {w.tasks.map((t, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-zinc-400">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.section>

          {/* 5 errores */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6">5 errores de testing que destrozan tu productividad</h2>
            <div className="space-y-4">
              {[
                {
                  n: '01',
                  title: 'Testear detalles de implementación',
                  desc: 'Tests que se rompen cada vez que refactorizas sin cambiar comportamiento. Señal: tus tests acceden a props internas, estado de componentes o clases CSS.',
                  fix: 'Testea solo lo que el usuario ve: texto renderizado, errores mostrados, redirecciones, llamadas a APIs.',
                },
                {
                  n: '02',
                  title: 'Snapshot tests masivos',
                  desc: 'Los snapshots parecen fáciles al principio pero se vuelven un infierno: cualquier cambio de CSS los rompe y acabas haciendo "update snapshots" sin leerlos.',
                  fix: 'Usa snapshots solo para outputs complejos y estables (renderizado de Markdown, generación de PDFs). Para UI normal, usa assertions específicas.',
                },
                {
                  n: '03',
                  title: 'No mockear servicios externos',
                  desc: 'Tests que hacen llamadas reales a Supabase/Stripe. Resultado: tests lentos, flaky por red, efectos secundarios en producción y costes de API.',
                  fix: 'Siempre mockea servicios externos en unit/integration tests. Reserva las llamadas reales para E2E en staging.',
                },
                {
                  n: '04',
                  title: 'Objetivo de 100% de cobertura',
                  desc: 'Perseguir el 100% lleva a testear getters triviales y código autogenerado. Tiempo desperdiciado que podría ir a features.',
                  fix: 'Define umbrales realistas: 70-80% para negocio central, 50% para UI. Enfócate en el código que cambia y el que tiene más riesgo.',
                },
                {
                  n: '05',
                  title: 'No correr tests en CI',
                  desc: 'Tests que solo corren localmente "cuando me acuerdo". El primer PR que llega a producción sin pasar por tests los hace inútiles.',
                  fix: 'Configura GitHub Actions o similar para correr tests en cada PR. Bloquea el merge si fallan.',
                },
              ].map((e, i) => (
                <div key={i} className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl font-black text-zinc-700 shrink-0">{e.n}</div>
                    <div>
                      <div className="font-bold text-white mb-1">{e.title}</div>
                      <p className="text-zinc-400 text-sm mb-3">{e.desc}</p>
                      <div className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span className="text-emerald-300">{e.fix}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Árbol de decisión */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-4">
              <BarChart3 className="inline w-6 h-6 text-emerald-400 mr-2 -mt-1" />
              Árbol de decisión: ¿qué tipo de test escribo?
            </h2>
            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-4 text-sm">
              {[
                {
                  q: '¿Es una función pura sin UI?',
                  a: '→ Unit test con Vitest. Sin render, solo import + assert.',
                },
                {
                  q: '¿Es un hook personalizado con estado?',
                  a: '→ Unit test con renderHook de Testing Library.',
                },
                {
                  q: '¿Es un componente con lógica de usuario (click, submit)?',
                  a: '→ Integration test con render + userEvent + mock de servicios externos.',
                },
                {
                  q: '¿Es un flujo completo que cruza páginas y servicios reales?',
                  a: '→ E2E test con Playwright contra entorno staging.',
                },
                {
                  q: '¿Es solo presentación (CSS, layout, sin lógica)?',
                  a: '→ No testees. El coste supera el beneficio. Cúbrelo con revisión visual.',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{item.q}</div>
                    <div className="text-zinc-400 mt-0.5">{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Checklist */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6">Checklist: testing listo para producción</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                'Vitest instalado y configurado en vite.config.ts',
                'jsdom como environment + setup con jest-dom',
                'Scripts "test" y "test:coverage" en package.json',
                'Tests de todas las funciones de negocio críticas',
                'Integration tests para formularios de login y registro',
                'Mocks de Supabase y Stripe (nunca llamadas reales)',
                'MSW configurado para interceptar requests HTTP',
                'Coverage mínimo del 70% en código de negocio',
                'CI/CD bloquea merge si tests fallan',
                'Al menos 1 test E2E del flujo de pago en staging',
                'No snapshot tests para componentes de UI general',
                'Convención de nombres: *.test.tsx junto al componente',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span className="text-zinc-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="rounded-3xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 border border-emerald-500/20 p-8 text-center"
          >
            <Bug className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">
              ¿Quieres un SaaS construido con tests desde el día uno?
            </h3>
            <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
              En Think Better entregamos código con cobertura de tests, CI/CD configurado y
              documentación técnica. Sin deuda técnica desde el primer commit.
            </p>
            <Link
              to="/cuestionario"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 transition-colors"
            >
              Descubrir el precio de mi proyecto
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
