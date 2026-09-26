// scripts/record-scenes.cjs : Record 6 high-resolution scene takes for Redline Showcase
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const { injectCursor, moveCursor, clickCursor, typeCursor, driftCursor } = require('./mac-cursor');

const TAKES_DIR = path.resolve(__dirname, '../videos/redline-showcase/takes');
if (!fs.existsSync(TAKES_DIR)) fs.mkdirSync(TAKES_DIR, { recursive: true });

const BASE_URL = 'https://try-redline.vercel.app';

// Target durations in seconds (matching audio at 1.085x tempo: total 176.4s / 2m56s)
const SCENE_TARGETS = {
  1: 35.2,
  2: 28.0,
  3: 33.2,
  4: 23.8,
  5: 22.4,
  6: 33.8
};

async function recordScene(sceneNum, actionFn) {
  const name = `scene-${sceneNum}`;
  console.log(`\n========================================`);
  console.log(`🎬 Recording Scene ${sceneNum} (Target: ~${SCENE_TARGETS[sceneNum]}s)...`);
  console.log(`========================================`);

  const sceneTmpDir = path.join(TAKES_DIR, `raw-${name}`);
  if (!fs.existsSync(sceneTmpDir)) fs.mkdirSync(sceneTmpDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    recordVideo: {
      dir: sceneTmpDir,
      size: { width: 1440, height: 900 }
    }
  });

  const page = await context.newPage();
  const startTime = Date.now();

  try {
    await actionFn(page);

    const elapsed = (Date.now() - startTime) / 1000;
    const remaining = Math.max(0, SCENE_TARGETS[sceneNum] - elapsed);
    if (remaining > 0) {
      console.log(`Holding/drifting cursor for remaining ${remaining.toFixed(1)}s to match audio...`);
      await driftCursor(page, Math.round(remaining * 1000));
    }
  } catch (err) {
    console.error(`Error in scene ${sceneNum}:`, err);
    throw err;
  } finally {
    await page.close();
    await context.close();
    await browser.close();
  }

  // Find webm and transcode to MP4
  const files = fs.readdirSync(sceneTmpDir).filter(f => f.endsWith('.webm'));
  if (files.length > 0) {
    files.sort((a, b) => fs.statSync(path.join(sceneTmpDir, b)).mtimeMs - fs.statSync(path.join(sceneTmpDir, a)).mtimeMs);
    const rawPath = path.join(sceneTmpDir, files[0]);
    const finalMp4 = path.join(TAKES_DIR, `${name}.mp4`);
    console.log(`Transcoding ${name}.webm to high-quality MP4...`);
    execSync(`ffmpeg -y -i "${rawPath}" -c:v libx264 -pix_fmt yuv420p -crf 14 -preset medium -r 30 "${finalMp4}"`, { stdio: 'ignore' });
    console.log(`✅ Saved Take: ${finalMp4}`);
    fs.rmSync(sceneTmpDir, { recursive: true, force: true });
  }
}

async function runAll() {
  // ---- SCENE 1: Commercial Contracting Crisis & Front Door ----
  await recordScene(1, async (page) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await injectCursor(page);
    await page.waitForTimeout(1500);

    // Initial cursor drift on hero headline
    await moveCursor(page, 720, 220, { steps: 28 });
    await page.waitForTimeout(3000);

    // Cursor moves across subtitle
    await moveCursor(page, 720, 320, { steps: 22 });
    await page.waitForTimeout(3500);

    // Smooth scroll down to presets bar
    await page.evaluate(() => window.scrollBy({ top: 320, behavior: 'smooth' }));
    await page.waitForTimeout(2000);

    // Hover over presets
    const saasBtn = page.locator('button:has-text("Enterprise SaaS MSA")').first();
    const ndaBtn = page.locator('button:has-text("Mutual NDA")').first();
    const consultingBtn = page.locator('button:has-text("Consulting MSA")').first();

    await moveCursor(page, 450, 280, { steps: 24 });
    await page.waitForTimeout(2500);

    await moveCursor(page, 620, 280, { steps: 20 });
    await page.waitForTimeout(2500);

    await moveCursor(page, 760, 280, { steps: 20 });
    await page.waitForTimeout(2500);

    // Scroll down to scorecard stamp: Grade F
    await page.evaluate(() => window.scrollBy({ top: 220, behavior: 'smooth' }));
    await page.waitForTimeout(1800);

    // Move cursor over Grade F stamp
    await moveCursor(page, 280, 480, { steps: 26 });
    await page.waitForTimeout(3000);

    // Move to 6 Traps Flagged badge
    await moveCursor(page, 450, 450, { steps: 24 });
    await page.waitForTimeout(2500);
  });

  // ---- SCENE 2: 100% Client-Side Ingestion & Zero-Trust Privacy ----
  await recordScene(2, async (page) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await injectCursor(page);
    await page.waitForTimeout(1200);

    // Scroll slightly to dropzone
    await page.evaluate(() => window.scrollBy({ top: 240, behavior: 'smooth' }));
    await page.waitForTimeout(1000);

    // Click "+ Upload or paste your own contract"
    const uploadToggle = page.locator('button:has-text("Upload or paste your own contract")').first();
    await clickCursor(page, uploadToggle, { steps: 22 });
    await page.waitForTimeout(2000);

    // Hover over dropzone
    await moveCursor(page, 720, 480, { steps: 24 });
    await page.waitForTimeout(2500);

    // Move up to header agreement type switchers
    const headerNda = page.locator('header button:has-text("Mutual NDA")').first();
    const headerPsa = page.locator('header button:has-text("Services PSA")').first();
    const headerSaas = page.locator('header button:has-text("SaaS Agreement")').first();

    await clickCursor(page, headerNda, { steps: 22 });
    await page.waitForTimeout(1800);
    await clickCursor(page, headerPsa, { steps: 20 });
    await page.waitForTimeout(1800);
    await clickCursor(page, headerSaas, { steps: 20 });
    await page.waitForTimeout(2000);

    // Scroll down to #privacy section
    await page.evaluate(() => {
      document.querySelector('#privacy')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(2500);

    // Hover over 4 security guarantee cards
    await moveCursor(page, 400, 520, { steps: 24 });
    await page.waitForTimeout(1800);
    await moveCursor(page, 650, 520, { steps: 20 });
    await page.waitForTimeout(1800);
    await moveCursor(page, 900, 520, { steps: 20 });
    await page.waitForTimeout(2000);
  });

  // ---- SCENE 3: The 3 Predatory Presets & Progressive Disclosure UX ----
  await recordScene(3, async (page) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await injectCursor(page);
    await page.waitForTimeout(1200);

    await page.evaluate(() => window.scrollBy({ top: 260, behavior: 'smooth' }));
    await page.waitForTimeout(1000);

    // Preset 1: SaaS MSA (already active, hover and inspect filters)
    await moveCursor(page, 450, 260, { steps: 22 });
    await page.waitForTimeout(2000);

    // Filter chip: Limitation of Liability
    const liabFilter = page.locator('button:has-text("Limitation of Liability")').first();
    await clickCursor(page, liabFilter, { steps: 20 });
    await page.waitForTimeout(2200);

    const allFilter = page.locator('button:has-text("All Clauses")').first();
    await clickCursor(page, allFilter, { steps: 18 });
    await page.waitForTimeout(2000);

    // Preset 2: Mutual NDA
    const ndaBtn = page.locator('button:has-text("Mutual NDA")').first();
    await clickCursor(page, ndaBtn, { steps: 22 });
    await page.waitForTimeout(2200);

    // Scroll to Section 6: Non-Compete Backdoor
    await page.evaluate(() => window.scrollBy({ top: 480, behavior: 'smooth' }));
    await page.waitForTimeout(2500);
    await moveCursor(page, 600, 450, { steps: 24 });
    await page.waitForTimeout(3000);

    // Scroll back up and click Preset 3: Consulting MSA
    await page.evaluate(() => window.scrollBy({ top: -480, behavior: 'smooth' }));
    await page.waitForTimeout(1500);

    const consultingBtn = page.locator('button:has-text("Consulting MSA")').first();
    await clickCursor(page, consultingBtn, { steps: 22 });
    await page.waitForTimeout(2200);

    // Scroll down to Section 2 Net-90 payment
    await page.evaluate(() => window.scrollBy({ top: 400, behavior: 'smooth' }));
    await page.waitForTimeout(2500);
    await moveCursor(page, 550, 500, { steps: 24 });
    await page.waitForTimeout(3000);
  });

  // ---- SCENE 4: Open Standards vs. Prompt Engineering ----
  await recordScene(4, async (page) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await injectCursor(page);
    await page.waitForTimeout(1200);

    // Scroll down to Section 9: LIMITATION OF LIABILITY
    await page.evaluate(() => window.scrollBy({ top: 720, behavior: 'smooth' }));
    await page.waitForTimeout(1800);

    // Hover over Section 9
    await moveCursor(page, 500, 420, { steps: 24 });
    await page.waitForTimeout(2000);

    // Click "Why This Matters"
    const whyBtn = page.locator('button:has-text("Why This Matters")').first();
    await clickCursor(page, whyBtn, { steps: 22 });
    await page.waitForTimeout(3000);

    // Scroll inside drawer
    await page.evaluate(() => {
      const drawer = document.querySelector('.fixed.inset-y-0.right-0');
      if (drawer) drawer.scrollTop += 200;
    });
    await page.waitForTimeout(2500);

    // Press Escape to dismiss drawer
    await page.keyboard.press('Escape');
    await page.waitForTimeout(1500);

    // Click "Show legal wording & redline diff"
    const diffBtn = page.locator('button:has-text("Show legal wording & redline diff")').first();
    await clickCursor(page, diffBtn, { steps: 22 });
    await page.waitForTimeout(2500);

    // Scroll slightly to reveal the full redline diff
    await page.evaluate(() => window.scrollBy({ top: 220, behavior: 'smooth' }));
    await page.waitForTimeout(1500);

    // Move cursor across terracotta deletions and forest green insertions
    await moveCursor(page, 450, 620, { steps: 26 });
    await page.waitForTimeout(2500);
    await moveCursor(page, 850, 620, { steps: 24 });
    await page.waitForTimeout(2500);
  });

  // ---- SCENE 5: 1-Click Batch Remediation & Scorecard Transformation ----
  await recordScene(5, async (page) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await injectCursor(page);
    await page.waitForTimeout(1200);

    // Scroll to scorecard
    await page.evaluate(() => window.scrollBy({ top: 280, behavior: 'smooth' }));
    await page.waitForTimeout(1500);

    // Move cursor to "Accept All Common Paper Fixes"
    const acceptAllBtn = page.locator('button:has-text("Accept All Common Paper Fixes")').first();
    await moveCursor(page, 720, 380, { steps: 24 });
    await page.waitForTimeout(1800);

    // Click Accept All
    await clickCursor(page, acceptAllBtn, { steps: 20 });
    await page.waitForTimeout(2500);

    // Move cursor to transformed green "A REDLINED" stamp
    await moveCursor(page, 280, 380, { steps: 26 });
    await page.waitForTimeout(3000);

    // Move to "✓ All 6 Traps Remediated (Grade A)"
    await moveCursor(page, 480, 380, { steps: 22 });
    await page.waitForTimeout(2500);

    // Scroll down slightly to show "Standard Fix Applied" chips
    await page.evaluate(() => window.scrollBy({ top: 260, behavior: 'smooth' }));
    await page.waitForTimeout(2000);

    // Hover over "Reset All to Vendor Terms"
    const resetBtn = page.locator('button:has-text("Reset All to Vendor Terms")').first();
    await moveCursor(page, 800, 360, { steps: 24 });
    await page.waitForTimeout(2500);
  });

  // ---- SCENE 6: Authentic Microsoft Word OpenXML Revisions & Pushback Memo ----
  await recordScene(6, async (page) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await injectCursor(page);
    await page.waitForTimeout(1200);

    // First accept all fixes so export is ready
    await page.evaluate(() => window.scrollBy({ top: 280, behavior: 'smooth' }));
    await page.waitForTimeout(800);
    const acceptAllBtn = page.locator('button:has-text("Accept All Common Paper Fixes")').first();
    await acceptAllBtn.click();
    await page.waitForTimeout(1000);

    // Scroll to sticky bottom bar
    await page.evaluate(() => window.scrollBy({ top: 500, behavior: 'smooth' }));
    await page.waitForTimeout(1500);

    // Click "Download Redlined Word Doc (.docx)"
    const exportBtn = page.locator('button:has-text("Download Redlined Word Doc (.docx)")').first();
    await clickCursor(page, exportBtn, { steps: 24 });
    await page.waitForTimeout(2500);

    // Inside Export Modal: Hover over OpenXML guarantee
    await moveCursor(page, 550, 260, { steps: 24 });
    await page.waitForTimeout(2500);

    // Click Download .docx
    const downloadDocxBtn = page.locator('button:has-text("Download .docx")').first();
    await clickCursor(page, downloadDocxBtn, { steps: 22 });
    await page.waitForTimeout(2500);

    // Scroll inside export modal to Pushback Email Memo
    await page.evaluate(() => {
      const modal = document.querySelector('.fixed.inset-0')?.parentElement?.querySelector('.overflow-y-auto');
      if (modal) modal.scrollTop += 350;
    });
    await page.waitForTimeout(2500);

    // Click "Copy Email"
    const copyEmailBtn = page.locator('button:has-text("Copy Email")').first();
    await clickCursor(page, copyEmailBtn, { steps: 22 });
    await page.waitForTimeout(2500);

    // Dismiss modal via Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(1500);

    // Scroll to top and hold on clean brand hero
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await page.waitForTimeout(1500);
    await moveCursor(page, 720, 240, { steps: 24 });
    await page.waitForTimeout(3500);
  });

  console.log(`\n🎉 All 6 scene takes recorded successfully!`);
}

runAll().catch(err => {
  console.error(err);
  process.exit(1);
});
