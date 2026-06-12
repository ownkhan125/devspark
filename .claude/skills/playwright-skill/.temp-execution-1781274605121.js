const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3000';
const POSTS = [
  'feed-07',   // magazine cover — the one in the screenshot
  'feed-02',   // 3D prism — iris accent
  'feed-01',   // editorial manifesto
  'story-04', // ember poster — 9:16 verify on tall format
];

const VIEWPORTS = [
  { name: 'mobile-375',  width: 375,  height: 800  },
  { name: 'tablet-768',  width: 768,  height: 1024 },
  { name: 'laptop-1280', width: 1280, height: 900  },
  { name: 'desk-1440',   width: 1440, height: 900  },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const consoleErrors = [];

  for (const slug of POSTS) {
    for (const vp of VIEWPORTS) {
      const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
      const page = await ctx.newPage();
      page.on('console', m => { if (m.type() === 'error') consoleErrors.push(`${slug}@${vp.name}: ${m.text()}`); });

      const r = await page.goto(`${TARGET_URL}/social-media-posts/${slug}`, { waitUntil: 'networkidle', timeout: 20000 });
      if (!r?.ok()) {
        console.log(`SKIP ${slug}@${vp.name}: status ${r?.status()}`);
        await ctx.close();
        continue;
      }

      // Wait for the live-preview iframe to render
      await page.waitForSelector('iframe[title*="live preview"]', { timeout: 8000 }).catch(() => {});
      await page.waitForTimeout(1200);

      // Locate the badge & the stage; report their bounding boxes
      const badge = page.getByText('Live preview', { exact: false }).first();
      const stage = page.locator('iframe[title*="live preview"]').first();

      const bb = await badge.boundingBox();
      const sb = await stage.boundingBox();

      // Visibility check: is the badge fully within viewport and NOT hidden by stage?
      // Compute overlap area: if badge overlaps stage, ensure z-index lifts it.
      let overlap = null;
      if (bb && sb) {
        const ox = Math.max(0, Math.min(bb.x + bb.width, sb.x + sb.width) - Math.max(bb.x, sb.x));
        const oy = Math.max(0, Math.min(bb.y + bb.height, sb.y + sb.height) - Math.max(bb.y, sb.y));
        overlap = { x: ox, y: oy, area: ox * oy };
      }

      const visible = await badge.isVisible();
      console.log(`${slug.padEnd(28)} ${vp.name.padEnd(12)} badge=${visible ? 'YES' : 'no '} bb=${bb ? `${Math.round(bb.x)},${Math.round(bb.y)} ${Math.round(bb.width)}x${Math.round(bb.height)}` : 'null'} stage=${sb ? `${Math.round(sb.x)},${Math.round(sb.y)} ${Math.round(sb.width)}x${Math.round(sb.height)}` : 'null'} overlap=${overlap?.area || 0}px²`);

      const shotPath = `C:/Users/General/Documents/GitHub/devspark/.tmp/badge-${slug}-${vp.name}.png`;
      await page.screenshot({ path: shotPath, clip: bb && sb ? {
        x: Math.max(0, Math.min(bb.x, sb.x) - 30),
        y: Math.max(0, Math.min(bb.y, sb.y) - 30),
        width: Math.min(vp.width, Math.max(bb.x + bb.width, sb.x + sb.width) + 30) - Math.max(0, Math.min(bb.x, sb.x) - 30),
        height: Math.min(vp.height - 1, Math.max(bb.y + bb.height, Math.min(sb.y + sb.height, vp.height - 1)) + 30) - Math.max(0, Math.min(bb.y, sb.y) - 30),
      } : undefined });

      await ctx.close();
    }
  }

  console.log('\nConsole errors:', consoleErrors.length === 0 ? 'none' : consoleErrors.length);
  consoleErrors.forEach(e => console.log('  - ' + e));

  await browser.close();
})();
