// scripts/gen-vo.cjs : Generate 6 scene VO audio tracks via ai33.pro "Honest Man"
const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const KEY = readFileSync('/Users/raphie/.agents/skills/vo-ai33/SKILL.md', 'utf8').match(/sk_sp9[A-Za-z0-9]+/)[0];
const VOICE_ID = 'minimax_273587280617670'; // Honest Man

const AUDIO_DIR = path.resolve(__dirname, '../videos/redline-showcase/audio');
if (!existsSync(AUDIO_DIR)) mkdirSync(AUDIO_DIR, { recursive: true });

const voRaw = readFileSync(path.resolve(__dirname, '../vo.txt'), 'utf8');
const scenes = voRaw.split('\n\n').map(s => s.trim()).filter(Boolean);

console.log(`Found ${scenes.length} scenes in vo.txt`);

async function main() {
  const tasks = [];
  for (let i = 0; i < scenes.length; i++) {
    console.log(`Submitting Scene ${i + 1} (${scenes[i].split(' ').length} words)...`);
    const body = new URLSearchParams({
      text: scenes[i],
      voice_id: VOICE_ID,
      speed: '1.0'
    });

    const res = await fetch('https://api.ai33.pro/v3/text-to-speech', {
      method: 'POST',
      headers: { 'xi-api-key': KEY },
      body
    });

    const data = await res.json();
    if (!data.task_id) {
      console.error(`Error submitting scene ${i + 1}:`, data);
      throw new Error(`Failed to submit scene ${i + 1}`);
    }
    console.log(`Scene ${i + 1} task: ${data.task_id}`);
    tasks.push({ scene: i + 1, taskId: data.task_id });
  }

  writeFileSync(path.join(AUDIO_DIR, 'tasks.json'), JSON.stringify(tasks, null, 2));
  console.log(`\nAll ${tasks.length} tasks submitted. Polling for audio completion...`);

  // Poll tasks
  const done = {};
  const deadline = Date.now() + 300000; // 5 min timeout
  while (Object.keys(done).length < tasks.length && Date.now() < deadline) {
    for (const t of tasks) {
      if (done[t.taskId]) continue;
      const res = await fetch(`https://api.ai33.pro/v1/task/${t.taskId}`, {
        headers: { 'xi-api-key': KEY }
      });
      const data = await res.json();
      if (data.status === 'done') {
        const audioUrl = data.metadata.audio_url;
        const outPath = path.join(AUDIO_DIR, `scene-${t.scene}.mp3`);
        execSync(`curl -s -o "${outPath}" "${audioUrl}"`);
        done[t.taskId] = outPath;
        console.log(`Scene ${t.scene} audio downloaded: ${outPath}`);
      } else if (data.status === 'error') {
        console.error(`Scene ${t.scene} error:`, data);
        done[t.taskId] = 'ERROR';
      }
    }
    if (Object.keys(done).length < tasks.length) {
      await new Promise(r => setTimeout(r, 4000));
    }
  }

  console.log(`\nVoiceover generation complete: ${Object.keys(done).length}/${tasks.length} ready.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
