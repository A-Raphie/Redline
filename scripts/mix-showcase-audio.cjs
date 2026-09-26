// scripts/mix-showcase-audio.cjs : Assemble broadcast master audio for Redline Showcase
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const AUDIO_DIR = path.resolve(__dirname, '../videos/redline-showcase/audio');

function getDuration(file) {
  const out = execSync(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${file}"`, { encoding: 'utf8' });
  return parseFloat(out.trim());
}

// Scene timeline in seconds (matching SCENE_TARGETS in record-scenes.cjs)
const sceneBeats = [
  { scene: 1, file: 'scene-1.mp3', startSec: 0.0, targetDur: 35.2 },
  { scene: 2, file: 'scene-2.mp3', startSec: 35.2, targetDur: 28.0 },
  { scene: 3, file: 'scene-3.mp3', startSec: 63.2, targetDur: 33.2 },
  { scene: 4, file: 'scene-4.mp3', startSec: 96.4, targetDur: 23.8 },
  { scene: 5, file: 'scene-5.mp3', startSec: 120.2, targetDur: 22.4 },
  { scene: 6, file: 'scene-6.mp3', startSec: 142.6, targetDur: 33.8 }
];

const totalDurationSec = 176.4;

console.log('=====================================================');
console.log(`🎙️  Mixing Master Audio for Redline (Target: ${totalDurationSec}s / 2m56s)`);
console.log('=====================================================');

// Step 1: Time-stretch each VO scene with atempo=1.085 to fit natural cadence
const processedScenes = [];
for (const b of sceneBeats) {
  const rawPath = path.join(AUDIO_DIR, b.file);
  const pacedPath = path.join(AUDIO_DIR, `scene-${b.scene}-paced.wav`);
  const rawDur = getDuration(rawPath);
  console.log(`Pacing Scene ${b.scene} (${rawDur.toFixed(2)}s raw)...`);
  execSync(`ffmpeg -y -i "${rawPath}" -filter:a "atempo=1.085" "${pacedPath}"`, { stdio: 'ignore' });
  const pacedDur = getDuration(pacedPath);
  const startMs = Math.round(b.startSec * 1000);
  console.log(`  -> Paced Dur: ${pacedDur.toFixed(2)}s | Start: ${b.startSec.toFixed(1)}s (${startMs}ms)`);
  processedScenes.push({
    ...b,
    pacedPath,
    pacedDur,
    startMs
  });
}

// Step 2: Assemble adelay filter complex for vo-full.wav
const inputs = processedScenes.map(s => `-i "${s.pacedPath}"`).join(' ');
const delayFilters = processedScenes.map((s, idx) => `[${idx}:a]adelay=${s.startMs}|${s.startMs}[a${idx}]`).join(';');
const mixInputs = processedScenes.map((_, idx) => `[a${idx}]`).join('');
const filterComplex = `${delayFilters};${mixInputs}amix=inputs=${processedScenes.length}:normalize=0,loudnorm=I=-16:TP=-1.5:LRA=10[vo]`;

const voFullWav = path.join(AUDIO_DIR, 'vo-full.wav');
console.log('\nAssembling vo-full.wav with broadcast loudness normalization (-16 LUFS)...');
execSync(`ffmpeg -y ${inputs} -filter_complex "${filterComplex}" -map "[vo]" -t ${totalDurationSec} "${voFullWav}"`, { stdio: 'inherit' });

// Step 3: Duck background music under vo-full.wav using sidechain compression
const bgmPath = path.join(AUDIO_DIR, 'bgm.mp3');
const masterAudioPath = path.join(AUDIO_DIR, 'master-audio.mp3');
const outroStart = totalDurationSec - 3.5;

console.log('\nMixing master-audio.mp3 with sidechain compression ducking (-10dB during speech)...');
const duckFilter = `[1:a]atrim=0:${totalDurationSec},asetpts=PTS-STARTPTS,afade=t=in:ss=0:d=1.5,afade=t=out:st=${outroStart}:d=3.0,volume=0.18[bgm];[bgm][0:a]sidechaincompress=threshold=0.03:ratio=4:attack=50:release=350[ducked_bgm];[0:a][ducked_bgm]amix=inputs=2:duration=first:normalize=0[out]`;

execSync(`ffmpeg -y -i "${voFullWav}" -i "${bgmPath}" -filter_complex "${duckFilter}" -map "[out]" -b:a 256k -t ${totalDurationSec} "${masterAudioPath}"`, { stdio: 'inherit' });

const finalDur = getDuration(masterAudioPath);
console.log(`\n🎉 Master audio generated successfully: ${masterAudioPath}`);
console.log(`Final master audio duration: ${finalDur.toFixed(2)}s`);
