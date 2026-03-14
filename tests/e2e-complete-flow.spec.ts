/**
 * ============================================================
 * Think Better — Complete E2E Flow Test (Production)
 * ============================================================
 * Tests the full user journey for both roles against the live
 * Vercel deployment. Captures screenshots at every key step.
 *
 * Admin:  ignasi9494@gmail.com   / ignasi1234
 * Client: ignasiescuderolondriz@gmail.com / ignasi1234
 *
 * Run:  npm run test:e2e
 * ============================================================
 */

import { test, expect, type Page } from '@playwright/test';
import path from 'path';
import fs   from 'fs';

// ── Credentials ────────────────────────────────────────────────────────────
const ADMIN  = { email: 'ignasi9494@gmail.com',            pass: 'ignasi1234' };
const CLIENT = { email: 'ignasiescuderolondriz@gmail.com', pass: 'ignasi1234' };

// ── Screenshot helper ───────────────────────────────────────────────────────
const SS_DIR = path.join(process.cwd(), 'test-results', 'screenshots');

async function shot(page: Page, label: string) {
  fs.mkdirSync(SS_DIR, { recursive: true });
  const file = path.join(SS_DIR, `${new Date().toISOString().replace(/[:.]/g, '-')}_${label}.png`);
  await page.screenshot({ path: file, fullPage: true });
  console.log(`  📸  ${label}`);
}

// ── Login helper ────────────────────────────────────────────────────────────
async function login(page: Page, email: string, pass: string, expectedPathPrefix: string) {
  console.log(`\n🔑  Logging in as ${email}…`);
  await page.goto('/login');
  await page.waitForLoadState('networkidle');
  await shot(page, 'login-page');

  await page.fill('input[type="email"]',    email);
  await page.fill('input[type="password"]', pass);
  await page.click('button[type="submit"]');

  // Wait until we land on the expected panel (up to 20 s)
  await page.waitForURL(u => u.pathname.startsWith(expectedPathPrefix), { timeout: 20_000 });
  console.log(`  ✅  Landed on ${page.url()}`);
  await shot(page, `after-login-${expectedPathPrefix.replace('/', '')}`);
}

// ── Logout helper ───────────────────────────────────────────────────────────
async function logout(page: Page) {
  console.log('\n🚪  Logging out…');
  const btn = page.getByRole('button', { name: /cerrar sesión/i });
  await btn.click();
  await page.waitForURL('**/login', { timeout: 10_000 });
  console.log('  ✅  Back on /login');
  await shot(page, 'after-logout');
}

// ═══════════════════════════════════════════════════════════════════════════
// TEST 1 — ADMIN panel: all sections load
// ═══════════════════════════════════════════════════════════════════════════
test('ADMIN — login + all sections', async ({ page }) => {
  await login(page, ADMIN.email, ADMIN.pass, '/admin');

  const sections: Array<{ path: string; title: string | RegExp }> = [
    { path: '/admin',                title: /vista general/i       },
    { path: '/admin/proyectos',      title: /proyectos/i           },
    { path: '/admin/clientes',       title: /clientes/i            },
    { path: '/admin/mensajes',       title: /mensajes/i            },
    { path: '/admin/pagos',          title: /pagos/i               },
    { path: '/admin/analytics',      title: /analytics/i           },
    { path: '/admin/configuracion',  title: /configuraci/i         },
  ];

  for (const { path: routePath, title } of sections) {
    console.log(`\n📋  Admin → ${routePath}`);
    await page.goto(routePath);
    await page.waitForLoadState('networkidle');

    // Page should not redirect away (stays on admin)
    expect(page.url()).toContain('/admin');

    // Heading should be visible
    const heading = page.getByRole('heading', { name: title }).first();
    await expect(heading).toBeVisible({ timeout: 10_000 });
    console.log(`  ✅  Heading visible: "${await heading.textContent()}"`);

    await shot(page, `admin-${routePath.replace('/admin/', '').replace('/admin', 'home')}`);
  }

  await logout(page);
});

// ═══════════════════════════════════════════════════════════════════════════
// TEST 2 — CLIENT panel: all sections load
// ═══════════════════════════════════════════════════════════════════════════
test('CLIENT — login + all sections', async ({ page }) => {
  await login(page, CLIENT.email, CLIENT.pass, '/dashboard');

  const sections: Array<{ path: string; label: string }> = [
    { path: '/dashboard',             label: 'resumen'      },
    { path: '/dashboard/mensajes',    label: 'mensajes'     },
    { path: '/dashboard/propuestas',  label: 'propuestas'   },
    { path: '/dashboard/iteraciones', label: 'iteraciones'  },
    { path: '/dashboard/documentos',  label: 'documentos'   },
    { path: '/dashboard/preview',     label: 'preview'      },
    { path: '/dashboard/entrega',     label: 'entrega'      },
    { path: '/dashboard/pagos',       label: 'pagos'        },
    { path: '/dashboard/ajustes',     label: 'ajustes'      },
  ];

  for (const { path: routePath, label } of sections) {
    console.log(`\n📋  Client → ${routePath}`);
    await page.goto(routePath);
    await page.waitForLoadState('networkidle');

    // Should NOT have been redirected to login or admin
    expect(page.url()).toContain('/dashboard');

    // Page renders something (not blank) — check body has content
    const body = await page.locator('main, [role="main"]').first().textContent();
    expect(body).toBeTruthy();
    console.log(`  ✅  Page loaded (${body!.trim().slice(0, 60)}…)`);

    await shot(page, `client-${label}`);
  }

  await logout(page);
});

// ═══════════════════════════════════════════════════════════════════════════
// TEST 3 — ALREADY LOGGED IN visits /login → auto-redirect
// ═══════════════════════════════════════════════════════════════════════════
test('Admin already logged in — /login redirects to /admin', async ({ page }) => {
  console.log('\n🔄  Testing auto-redirect for already-authenticated admin…');

  // First, log in properly
  await login(page, ADMIN.email, ADMIN.pass, '/admin');

  // Now navigate to /login manually
  await page.goto('/login');
  await page.waitForURL(u => u.pathname.startsWith('/admin'), { timeout: 10_000 });
  console.log(`  ✅  Redirected to ${page.url()} — did not stay on /login`);
  await shot(page, 'already-logged-in-redirect');

  await logout(page);
});

// ═══════════════════════════════════════════════════════════════════════════
// TEST 4 — LOGOUT: both roles end on /login
// ═══════════════════════════════════════════════════════════════════════════
test('Logout works for admin', async ({ page }) => {
  await login(page, ADMIN.email, ADMIN.pass, '/admin');
  await logout(page);
  expect(page.url()).toContain('/login');
});

test('Logout works for client', async ({ page }) => {
  await login(page, CLIENT.email, CLIENT.pass, '/dashboard');
  await logout(page);
  expect(page.url()).toContain('/login');
});

// ═══════════════════════════════════════════════════════════════════════════
// TEST 5 — ADMIN cannot access /dashboard (gets redirected to /admin)
// ═══════════════════════════════════════════════════════════════════════════
test('Admin visiting /dashboard is redirected to /admin', async ({ page }) => {
  console.log('\n🚫  Admin should not see /dashboard…');
  await login(page, ADMIN.email, ADMIN.pass, '/admin');

  await page.goto('/dashboard');
  await page.waitForURL(u => u.pathname.startsWith('/admin'), { timeout: 10_000 });
  console.log(`  ✅  Correctly redirected to ${page.url()}`);
  await shot(page, 'admin-blocked-from-dashboard');

  await logout(page);
});

// ═══════════════════════════════════════════════════════════════════════════
// TEST 6 — SETTINGS: client can see their profile data
// ═══════════════════════════════════════════════════════════════════════════
test('Client — Ajustes shows user data', async ({ page }) => {
  await login(page, CLIENT.email, CLIENT.pass, '/dashboard');

  console.log('\n⚙️   Checking Ajustes page…');
  await page.goto('/dashboard/ajustes');
  await page.waitForLoadState('networkidle');

  // Email field should contain the client's email (read-only)
  const emailInput = page.locator('input[type="email"]');
  await expect(emailInput).toBeVisible({ timeout: 8_000 });
  const emailVal = await emailInput.inputValue();
  console.log(`  ✅  Email field shows: ${emailVal}`);
  expect(emailVal.toLowerCase()).toContain('ignasiescude');

  await shot(page, 'client-ajustes-profile');
  await logout(page);
});

// ═══════════════════════════════════════════════════════════════════════════
// TEST 7 — ADMIN: Vista General shows stats cards
// ═══════════════════════════════════════════════════════════════════════════
test('Admin — Vista General loads KPI cards', async ({ page }) => {
  await login(page, ADMIN.email, ADMIN.pass, '/admin');

  console.log('\n📊  Checking KPI cards on Admin Home…');
  await page.goto('/admin');
  await page.waitForLoadState('networkidle');

  // Should show at least one stat card (number + label)
  const cards = page.locator('[class*="rounded"]').filter({ hasText: /clientes|proyectos|facturado/i });
  const count = await cards.count();
  console.log(`  ✅  Found ${count} stat cards`);
  expect(count).toBeGreaterThan(0);

  await shot(page, 'admin-kpi-cards');
  await logout(page);
});

// ═══════════════════════════════════════════════════════════════════════════
// TEST 8 — PASSWORD RECOVERY page renders (smoke test)
// ═══════════════════════════════════════════════════════════════════════════
test('Login page — forgot password form works', async ({ page }) => {
  console.log('\n🔒  Testing forgot password flow…');
  await page.goto('/login');
  await page.waitForLoadState('networkidle');

  await page.click('button:has-text("¿Olvidaste tu contraseña?")');

  const heading = page.getByRole('heading', { name: /recuperar/i });
  await expect(heading).toBeVisible({ timeout: 5_000 });
  console.log('  ✅  Forgot password form shown');
  await shot(page, 'forgot-password-form');

  // Go back
  await page.click('button:has-text("Volver")');
  await expect(page.getByRole('button', { name: /entrar/i })).toBeVisible();
  console.log('  ✅  Back to login form');
});

// ═══════════════════════════════════════════════════════════════════════════
// TEST 9 — ADMIN Pagos: page renders with table/KPI
// ═══════════════════════════════════════════════════════════════════════════
test('Admin — Pagos page renders', async ({ page }) => {
  await login(page, ADMIN.email, ADMIN.pass, '/admin');

  console.log('\n💳  Checking Admin Pagos…');
  await page.goto('/admin/pagos');
  await page.waitForLoadState('networkidle');

  const heading = page.getByRole('heading', { name: /pagos/i }).first();
  await expect(heading).toBeVisible({ timeout: 10_000 });

  await shot(page, 'admin-pagos-full');

  // Check KPI cards exist
  const kpis = page.locator('[class*="rounded"]').filter({ hasText: /mes|total|pendiente/i });
  const kpiCount = await kpis.count();
  console.log(`  ✅  Found ${kpiCount} KPI cards on Pagos`);

  await logout(page);
});

// ═══════════════════════════════════════════════════════════════════════════
// TEST 10 — ADMIN Configuración: form fields render
// ═══════════════════════════════════════════════════════════════════════════
test('Admin — Configuración renders form', async ({ page }) => {
  await login(page, ADMIN.email, ADMIN.pass, '/admin');

  console.log('\n🔧  Checking Admin Configuración…');
  await page.goto('/admin/configuracion');
  await page.waitForLoadState('networkidle');

  const heading = page.getByRole('heading', { name: /configuraci/i }).first();
  await expect(heading).toBeVisible({ timeout: 10_000 });

  // At least one text input should be visible (company name field)
  const inputs = page.locator('input[type="text"], input:not([type])');
  await expect(inputs.first()).toBeVisible({ timeout: 8_000 });
  const inputCount = await inputs.count();
  console.log(`  ✅  ${inputCount} input fields visible on Configuración`);

  await shot(page, 'admin-configuracion-form');
  await logout(page);
});
