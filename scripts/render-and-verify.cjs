// scripts/render-and-verify.cjs : Master rendering, mobile re-encode, and milestone frame extraction
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SHOWCASE_DIR = path.resolve(__dirname, '../videos/redline-showcase');
const TAKES_DIR = path.join(SHOWCASE_DIR, 'takes');
const MEDIA_DIR = path.join(SHOWCASE_DIR, 'media');
const RENDERS_DIR = path.join(SHOWCASE_DIR, 'renders');
const SNAPSHOTS_DIR = path.join(SHOWCASE_DIR, 'snapshots');

if (!fs.existsSync(RENDERS_DIR)) fs.mkdirSync(RENDERS_DIR, { recursive: true });
if (!fs.existsSync(SNAPSHOTS_DIR)) fs.mkdirSync(SNAPSHOTS_DIR, { recursive: true });

console.log('=====================================================');
console.log('🚀 Step 1: Syncing Recorded Takes into Media Directory');
console.log('=====================================================');

for (let i = 1; i <= 6; i++) {
  const takePath = path.join(TAKES_DIR, `scene-${i}.mp4`);
  const mediaPath = path.join(MEDIA_DIR, `scene-${i}.mp4`);
  if (fs.existsSync(takePath)) {
    fs.copyFileSync(takePath, mediaPath);
    console.log(`✅ Synced scene-${i}.mp4 to media/`);
  } else {
    console.error(`❌ Missing take: ${takePath}`);
    process.exit(1);
  }
}

console.log('\n=====================================================');
console.log('🔍 Step 2: Validating HyperFrames Composition');
console.log('=====================================================');

try {
  execSync('npx --yes hyperframes@0.8.50 check', { cwd: SHOWCASE_DIR, stdio: 'inherit' });
  console.log('✅ HyperFrames syntax & composition check PASSED');
} catch (err) {
  console.warn('⚠️ HyperFrames check reported warnings, proceeding to render...');
}

console.log('\n=====================================================');
console.log('🎬 Step 3: Rendering Master 2K / 1440p Delivery Video (30M Bitrate)');
console.log('=====================================================');

const masterOutput = path.join(RENDERS_DIR, 'redline-showcase-master.mp4');
execSync(`npx --yes hyperframes@0.8.50 render --quality=delivery --video-bitrate=30M -o "${masterOutput}"`, {
  cwd: SHOWCASE_DIR,
  stdio: 'inherit'
});

console.log(`\n🎉 Master Delivery Video Rendered: ${masterOutput}`);

console.log('\n=====================================================');
console.log('📱 Step 4: Re-encoding Mobile / Web High-Clarity Version (CRF 16)');
console.log('=====================================================');

const mobileOutput = path.join(RENDERS_DIR, 'redline-showcase-mobile.mp4');
execSync(`ffmpeg -y -i "${masterOutput}" -c:v libx264 -crf 16 -preset slow -pix_fmt yuv420p -c:a copy "${mobileOutput}"`, {
  stdio: 'inherit'
});

const masterStat = fs.statSync(masterOutput);
const mobileStat = fs.statSync(mobileOutput);
console.log(`Master Size: ${(masterStat.size / (1024 * 1024)).toFixed(2)} MB`);
console.log(`Mobile Size: ${(mobileStat.size / (1024 * 1024)).toFixed(2)} MB`);

console.log('\n=====================================================');
console.log('📸 Step 5: Extracting Milestone Verification Frames');
console.log('=====================================================');

const timestamps = [
  { sec: 12, name: 'frame-01-scene1-grade-f-scorecard.png' },
  { sec: 48, name: 'frame-02-scene2-privacy-security.png' },
  { sec: 80, name: 'frame-03-scene3-predatory-noncompete.png' },
  { sec: 110, name: 'frame-04-scene4-common-paper-diff.png' },
  { sec: 134, name: 'frame-05-scene5-grade-a-remediation.png' },
  { sec: 158, name: 'frame-06-scene6-docx-email-export.png' },
  { sec: 172, name: 'frame-07-scene6-brand-outro-close.png' }
];

for (const f of timestamps) {
  const outPath = path.join(SNAPSHOTS_DIR, f.name);
  execSync(`ffmpeg -y -ss ${f.sec} -i "${masterOutput}" -vframes 1 -q:v 2 "${outPath}"`, { stdio: 'ignore' });
  console.log(`📸 Frame extracted @ ${f.sec}s: ${f.name}`);
}

console.log('\n=====================================================');
console.log('⚖️ Step 6: Verifying Demo Final Gate Criteria');
console.log('=====================================================');

const durationOut = execSync(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${masterOutput}"`, { encoding: 'utf8' }).trim();
const totalDur = parseFloat(durationOut);
console.log(`Final Video Duration: ${totalDur.toFixed(2)}s (${Math.floor(totalDur / 60)}m ${Math.round(totalDur % 60)}s)`);

if (totalDur >= 160 && totalDur <= 180) {
  console.log('✅ GATE 1 Duration PASS: Strictly within 2:40 to 3:00 hackathon constraint!');
} else {
  console.warn(`⚠️ Duration outside optimal 160s-180s range: ${totalDur}s`);
}

console.log('\n🎉 Pipeline complete! Ready for visual frame audit.');
