import { defineConfig, devices } from '@playwright/test';

/**
 * Production E2E config — runs against the live Vercel deployment.
 * Usage: npx playwright test --config=playwright.prod.config.ts
 *   or:  npm run test:e2e
 */
export default defineConfig({
  testDir: './tests',
  testMatch: '**/e2e-*.spec.ts',
  fullyParallel: false,   // serial for E2E flows that share state
  retries: 1,
  workers: 1,
  timeout: 60_000,        // each test step can take up to 60s on prod

  reporter: [
    ['list'],             // live step output in terminal
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],

  use: {
    baseURL: 'https://servicios-productos-online-ignasi.vercel.app',
    viewport: { width: 1280, height: 900 },
    screenshot: 'on',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 20_000,
    navigationTimeout: 30_000,
  },

  projects: [
    {
      name: 'Chrome Desktop',
      use: { ...devices['Desktop Chrome'], headless: true },
    },
  ],
  // No webServer block — tests against the already-deployed Vercel URL
});
