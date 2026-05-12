const { chromium } = require('playwright');
const TARGET_URL = 'http://localhost:3000';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(`[pageerror] ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(`[err] ${m.text()}`);
  });

  const viewports = [
    { name: 'desktop-xl', w: 1920, h: 1080 },
    { name: 'desktop', w: 1440, h: 900 },
    { name: 'tablet', w: 820, h: 1180 },
    { name: 'mobile', w: 390, h: 844 },
    { name: 'mobile-sm', w: 360, h: 640 },
  ];

  for (const v of viewports) {
    await page.setViewportSize({ width: v.w, height: v.h });
    await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    // Sanity: check h1 doesn't overflow, all words use display font, and bounding rect doesn't clip
    const probe = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      if (!h1) return null;
      const cs = window.getComputedStyle(h1);
      const rect = h1.getBoundingClientRect();
      const parent = h1.parentElement.getBoundingClientRect();
      // Sample first inner span font-family to see if it matches h1
      const inner = h1.querySelectorAll('span span');
      const fontsInside = new Set();
      inner.forEach((el) => fontsInside.add(window.getComputedStyle(el).fontFamily));
      const overflowsParent = rect.right > parent.right + 1 || rect.left < parent.left - 1;
      return {
        font: cs.fontFamily,
        weight: cs.fontWeight,
        size: cs.fontSize,
        leading: cs.lineHeight,
        tracking: cs.letterSpacing,
        h1Width: rect.width,
        parentWidth: parent.width,
        overflowsParent,
        uniqueFonts: [...fontsInside],
      };
    });
    console.log(`\n--- ${v.name} (${v.w}x${v.h}) ---`);
    console.log(JSON.stringify(probe, null, 2));

    await page.screenshot({ path: `/tmp/devspark-typo-${v.name}-hero.png`, fullPage: false });
    await page.evaluate(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'instant' }));
    await page.waitForTimeout(800);
    await page.screenshot({ path: `/tmp/devspark-typo-${v.name}-cta.png`, fullPage: false });
  }

  console.log(`\nerrors=${errors.length}`);
  errors.forEach((e) => console.log(e));
  await browser.close();
})();
