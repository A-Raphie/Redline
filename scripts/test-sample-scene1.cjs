// scripts/test-sample-scene1.cjs : Test a 5-second sample take of Scene 1 at native 2560x1298
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const { injectCursor, moveCursor, clickCursor, driftCursor } = require('./mac-cursor');

const TEST_DIR = path.resolve(__dirname, '../videos/redline-showcase/takes/test_sample_2k');
if (!fs.existsSync(TEST_DIR)) fs.mkdirSync(TEST_DIR, { recursive: true });

const BASE_URL = 'https://try-redline.vercel.app';

async function runSample() {
  console.log('Recording 5-second sample take of Scene 1 at 2560x1298...');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 2560, height: 1298 },
    recordVideo: {
      dir: TEST_DIR,
      size: { width: 2560, height: 1298 }
    }
  });

  const page = await context.newPage();

  try {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      document.documentElement.style.zoom = '1.45';
    });
    await injectCursor(page);
    await page.waitForTimeout(1000);

    // Dynamic targeting of headline
    const headline = page.locator('h1:has-text("Never sign an unfair contract.")').first();
    const hBox = await headline.boundingBox();
    if (hBox) {
      console.log(`Headline box: x=${hBox.x}, y=${hBox.y}, w=${hBox.width}, h=${hBox.height}`);
      await moveCursor(page, hBox.x + hBox.width * 0.4, hBox.y + hBox.height * 0.5, { steps: 22 });
    }
    await page.waitForTimeout(1200);

    // Scroll to presets
    await page.evaluate(() => window.scrollBy({ top: 380, behavior: 'smooth' }));
    await page.waitForTimeout(1200);

    // Hover over Enterprise SaaS MSA button
    const saasBtn = page.locator('button:has-text("Enterprise SaaS MSA")').first();
    const btnBox = await saasBtn.boundingBox();
    if (btnBox) {
      console.log(`SaaS Button box: x=${btnBox.x}, y=${btnBox.y}, w=${btnBox.width}, h=${btnBox.height}`);
      await moveCursor(page, btnBox.x + btnBox.width * 0.5, btnBox.y + btnBox.height * 0.5, { steps: 20 });
    }
    await page.waitForTimeout(1500);

    // Hover over Grade F stamp
    const gradeF = page.locator('div:has-text("GRADE")').first();
    const gradeBox = await gradeF.boundingBox();
    if (gradeBox) {
      console.log(`Grade F box: x=${gradeBox.x}, y=${gradeBox.y}`);
      await moveCursor(page, gradeBox.x + gradeBox.width * 0.5, gradeBox.y + gradeBox.height * 0.5, { steps: 20 });
    }
    await page.waitForTimeout(1000);

  } catch (err) {
    console.error('Error during sample take:', err);
    throw err;
  } finally {
    await page.close();
    await context.close();
    await browser.close();
  }

  // Find webm and transcode
  const files = fs.readdirSync(TEST_DIR).filter(f => f.endsWith('.webm'));
  if (files.length > 0) {
    files.sort((a, b) => fs.statSync(path.join(TEST_DIR, b)).mtimeMs - fs.statSync(path.join(TEST_DIR, a)).mtimeMs);
    const rawPath = path.join(TEST_DIR, files[0]);
    const finalMp4 = path.join(TEST_DIR, 'sample-take-2k.mp4');
    console.log('Transcoding sample to MP4...');
    execSync(`ffmpeg -y -i "${rawPath}" -c:v libx264 -pix_fmt yuv420p -crf 12 -preset medium -r 30 "${finalMp4}"`, { stdio: 'inherit' });
    console.log(`Sample take ready: ${finalMp4}`);

    // Extract middle frame
    const sampleFrame = path.resolve(__dirname, '../../../../.gemini/antigravity/brain/3d945d7d-a74e-4cef-b5f6-974a1fee8853/sample-take-2k-frame.png');
    execSync(`ffmpeg -y -ss 00:00:03.500 -i "${finalMp4}" -vframes 1 "${sampleFrame}"`, { stdio: 'inherit' });
    console.log(`Sample frame extracted: ${sampleFrame}`);
  }
}

runSample().catch(e => {
  console.error(e);
  process.exit(1);
});
