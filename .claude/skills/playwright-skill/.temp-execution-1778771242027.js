const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const TARGET_URL = 'http://localhost:3001';
const OUT_DIR = 'C:\\tmp\\devspark\\screens';

const routes = [
  '/',
  '/about-us',
  '/services',
  '/services/web-development-service',
  '/services/ui-ux-design-service',
  '/services/graphic-design-service',
  '/projects',
  '/blogs',
  '/contact-us',
  '/terms-of-service',
  '/privacy-policy',
  '/accessibility',
];

const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'desktop', width: 1440, height: 900 },
];

function slug(p) {
  return p === '/' ? 'home' : p.replace(/^\/|\/$/g, '').replace(/\//g, '_');
}

(async () => {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const report = [];

  for (const vp of viewports) {
    console.log('\n=== ' + vp.name.toUpperCase() + ' (' + vp.width + 'x' + vp.height + ') ===');
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    for (const route of routes) {
      const consoleErrors = [];
      const requestFailures = [];
      page.on('pageerror', (e) => consoleErrors.push('pageerror: ' + e.message));
      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push('console: ' + msg.text());
      });
      page.on('requestfailed', (req) => {
        const f = req.failure();
        requestFailures.push(req.url() + ' (' + (f && f.errorText) + ')');
      });

      const url = TARGET_URL + route;
      const slugName = slug(route);

      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      } catch (e) {
        console.log('  ' + route + '  -- goto failed: ' + e.message.slice(0, 80));
        page.removeAllListeners('pageerror');
        page.removeAllListeners('console');
        page.removeAllListeners('requestfailed');
        continue;
      }

      try {
        await page.evaluate(() => document.fonts ? document.fonts.ready : Promise.resolve());
      } catch (e) {}
      await page.waitForTimeout(900);

      const metrics = await page.evaluate(() => {
        const doc = document.documentElement;
        const body = document.body;
        const scrollWidth = Math.max(doc.scrollWidth, body.scrollWidth);
        const clientWidth = doc.clientWidth;
        const scrollHeight = Math.max(doc.scrollHeight, body.scrollHeight);
        const wide = [];
        const all = document.querySelectorAll('body *');
        for (const el of all) {
          const rect = el.getBoundingClientRect();
          if (rect.width > clientWidth + 1 && rect.left < clientWidth) {
            wide.push({
              tag: el.tagName.toLowerCase(),
              cls: (el.className || '').toString().slice(0, 70),
              width: Math.round(rect.width),
              left: Math.round(rect.left),
            });
            if (wide.length >= 5) break;
          }
        }
        const imgs = Array.from(document.querySelectorAll('img'));
        const brokenImgs = imgs
          .filter((img) => img.complete && img.naturalWidth === 0)
          .map((img) => img.currentSrc || img.src);
        return {
          scrollWidth,
          clientWidth,
          scrollHeight,
          hasHorizontalScroll: scrollWidth > clientWidth + 1,
          wideElements: wide,
          brokenImages: brokenImgs,
          imageCount: imgs.length,
        };
      });

      const screenshotPath = path.join(OUT_DIR, vp.name + '_' + slugName + '.png');
      await page.screenshot({ path: screenshotPath, fullPage: true });

      const issues = [];
      if (metrics.hasHorizontalScroll) {
        const culprits = metrics.wideElements
          .map((w) => w.tag + '.' + (w.cls.split(' ')[0] || '') + '(' + w.width + 'px)')
          .join(', ');
        issues.push('H-SCROLL ' + metrics.scrollWidth + '>' + metrics.clientWidth + ' [' + culprits + ']');
      }
      if (metrics.brokenImages.length > 0) {
        issues.push('BROKEN-IMG ' + metrics.brokenImages.length);
      }
      if (consoleErrors.length > 0) {
        issues.push('ERR ' + consoleErrors.length);
      }
      if (requestFailures.length > 0) {
        issues.push('REQ-FAIL ' + requestFailures.length);
      }

      const status = issues.length === 0 ? 'OK' : issues.join(' | ');
      console.log(
        '  ' + route.padEnd(38) + '  h=' + metrics.scrollHeight + 'px  imgs=' + metrics.imageCount + '  ' + status
      );

      report.push({
        viewport: vp.name,
        route,
        metrics,
        consoleErrors,
        requestFailures,
      });

      page.removeAllListeners('pageerror');
      page.removeAllListeners('console');
      page.removeAllListeners('requestfailed');
    }

    await context.close();
  }

  fs.writeFileSync(path.join(OUT_DIR, 'report.json'), JSON.stringify(report, null, 2));
  console.log('\nReport: ' + OUT_DIR + '\\report.json');
  console.log('Screenshots: ' + OUT_DIR);

  await browser.close();
})();
