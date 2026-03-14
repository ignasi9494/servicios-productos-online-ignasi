/**
 * Generates public/og-image.png (1200x630) using Playwright.
 * Run: node scripts/generate-og-image.mjs
 */
import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px;
    height: 630px;
    background: #09090b;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  /* Grid background */
  body::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(16,185,129,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(16,185,129,0.04) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  /* Radial glow */
  body::after {
    content: '';
    position: absolute;
    top: -200px;
    left: 50%;
    transform: translateX(-50%);
    width: 800px;
    height: 600px;
    background: radial-gradient(ellipse, rgba(16,185,129,0.12) 0%, transparent 70%);
    pointer-events: none;
  }

  .container {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 0 80px;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(16,185,129,0.1);
    border: 1px solid rgba(16,185,129,0.25);
    border-radius: 100px;
    padding: 8px 20px;
    margin-bottom: 32px;
  }

  .badge-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #10b981;
  }

  .badge-text {
    font-size: 16px;
    color: #10b981;
    font-weight: 500;
    letter-spacing: 0.02em;
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 24px;
  }

  .logo-icon {
    width: 36px;
    height: 36px;
    color: #10b981;
  }

  .logo-text {
    font-size: 28px;
    font-weight: 700;
    color: #ffffff;
  }

  h1 {
    font-size: 64px;
    font-weight: 800;
    line-height: 1.1;
    color: #ffffff;
    margin-bottom: 20px;
    letter-spacing: -0.02em;
  }

  h1 span {
    background: linear-gradient(135deg, #10b981, #22d3ee);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    font-size: 22px;
    color: #a1a1aa;
    line-height: 1.5;
    max-width: 700px;
    margin: 0 auto 40px;
  }

  .pills {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .pill {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 100px;
    padding: 8px 18px;
    font-size: 15px;
    color: #a1a1aa;
  }
</style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <svg class="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" y1="19" x2="20" y2="19"></line>
      </svg>
      <span class="logo-text">Think Better</span>
    </div>

    <div class="badge">
      <span class="badge-dot"></span>
      <span class="badge-text">Estudio AI-first · Barcelona</span>
    </div>

    <h1>Tu producto digital,<br>listo en <span>semanas</span></h1>

    <p>Desarrollo web y apps con IA. Propuesta en 24h, entrega en tiempo récord.</p>

    <div class="pills">
      <span class="pill">React · Next.js</span>
      <span class="pill">Supabase · Stripe</span>
      <span class="pill">Claude AI · Gemini</span>
      <span class="pill">desde 1.900€</span>
    </div>
  </div>
</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(html, { waitUntil: 'networkidle' });

const outputPath = resolve(__dirname, '../public/og-image.png');
await page.screenshot({ path: outputPath, type: 'png' });
await browser.close();

console.log('✅ og-image.png generated at public/og-image.png');
