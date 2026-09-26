# Redline Showcase Demo Playbook

> LexHack 2026 Official Showcase Video Architecture & Production Playbook.
> Target Duration: **2:56 (176.1s)** · Hard Ceiling: **3:00 (180.0s)** · Format: **1080p Edge-to-Edge with Google Chrome Header & Glass HUD**.

---

## 1. Hackathon Duration Alignment

Devpost LexHack 2026 ground truth requires:
- *"A brief video (2–3 minutes) or visual walkthrough"*
- *"Presentation & Documentation (15%): How clear and compelling is the 3-minute video demonstration?"*

This showcase demo was specifically calibrated to **2 minutes 56 seconds (176.1s)**. It avoids the generic 90s-105s default and ensures maximum scoring under the 3-minute video presentation criterion without risking deductions for running over 3:00.

---

## 2. 100% Feature Coverage Matrix

| # | Feature / Capability | Role / User | Route / View | Verified Interaction & Visual Proof | Scene & Timing |
|---|---|---|---|---|---|
| **1** | **Predatory Terms Ingestion & Scorecard** | Founder / Operator | `/` | Instant audit displaying Grade F risk scorecard, 6 flagged traps, and plain-English business consequences. | Scene 1 (0.0s – 35.2s) |
| **2** | **100% Client-Side Privacy & Ingestion** | Privacy Officer | `/` & `#privacy` | Dropzone toggle for custom contract upload; 4 security cards proving zero server logs, zero cloud LLM ingestion, and local AST parsing. | Scene 2 (35.2s – 63.2s) |
| **3** | **Predatory Archetype Presets** | Corporate Counsel | `#presets` | 3 pre-loaded agreements: SaaS MSA (20% price hikes), Mutual NDA (2-year non-compete backdoor), and Consulting Agreement (Net-90 terms). | Scene 3 (63.2s – 96.4s) |
| **4** | **Open Standards Clause Diffing** | Commercial Attorney | `#liability` | Deterministic clause matching against MIT-licensed Common Paper benchmarks; "Why This Matters" drawer; visual inline additions and deletions. | Scene 4 (96.4s – 120.2s) |
| **5** | **1-Click Batch Remediation** | Operator / General Counsel | `#scorecard` | "Accept All Common Paper Fixes" button click; Myers diff engine execution; instant scorecard morph from Grade F to Grade A Redlined; reversible reset. | Scene 5 (120.2s – 142.6s) |
| **6** | **OpenXML .docx & Counter-Memo Export** | Legal Operations | `#export` | Export modal click; native Microsoft Word `.docx` download with tracked revisions; 1-click executive pushback email memo copy with visual feedback. | Scene 6 (142.6s – 176.1s) |

---

## 3. Pre-Synthesis Claims Harvest & Verification

Every sentence in the narration asserts a verifiable technical capability:

| Line / Claim | Category | Evidence Pointer | Verdict | Proof Asset |
|---|---|---|---|---|
| *"audits incoming terms against open standards in seconds"* | Capability | `src/lib/benchmarkEngine.ts` | **TRUE** | `frame-01-scene1-grade-f-scorecard.png` |
| *"one hundred percent client-side execution... zero bytes logged to a server"* | Security | `src/app/page.tsx`, `#privacy` | **TRUE** | `frame-02-scene2-privacy-security.png` |
| *"three common predatory templates... SaaS agreement... mutual NDA... consulting agreement"* | Feature | `src/data/sampleContracts.ts` | **TRUE** | `frame-03-scene3-predatory-noncompete.png` |
| *"benchmarks contracts deterministically against open-source Common Paper standards"* | Protocol | `src/data/commonPaperStandards.ts` | **TRUE** | `frame-04-scene4-common-paper-diff.png` |
| *"Clicking Accept All Common Paper Fixes runs our Myers diff engine in memory... transforms from Grade F to Grade A"* | Architecture | `src/components/Scorecard.tsx` | **TRUE** | `frame-05-scene5-grade-a-remediation.png` |
| *"synthesizes genuine Office OpenXML insertion and deletion nodes into a native Microsoft Word dot docx file... executive pushback email"* | Deliverable | `src/lib/docxExport.ts` | **TRUE** | `frame-06-scene6-docx-email-export.png` |

---

## 4. Video & Audio Engineering Specifications

- **Canvas Dimensions:** 1920 × 1080 (16:9 Edge-to-Edge)
- **Browser Window Header:** 78px Google Chrome mockup with real Scale of Justice favicon in `#1B365D` navy, live route omnibox, and active tab titles.
- **Cursor Dynamics:** `scripts/mac-cursor.js` (Apple Retina arrow/hand glyphs, quadratic Bezier curves, overshoot and settle, off-center landing, click ripples, idle drift).
- **Camera Zooms:** GSAP timeline punch-ins (1.12x – 1.20x scale) focused on key state transitions and status morphs.
- **HUD Glass Cards:** Bottom-bracket monospaced callout pills and metric stat cards in clean whitespace.
- **Voiceover Profile:** `ai33.pro` OpenSpeaker `minimax_273587280617670` ("Honest Man") at 1.085x tempo (~155 wpm).
- **Master Audio:** Broadcast loudness normalization (`-16 LUFS`) + sidechain compression ducking (`-10dB` BGM attenuation during speech).

---

## 5. File Manifest

```
videos/redline-showcase/
├── audio/
│   ├── scene-1.mp3 ... scene-6.mp3   # Raw ai33 voiceover takes
│   ├── bgm.mp3                       # Ambient electronic background music
│   ├── vo-full.wav                   # Loudness-normalized voiceover track
│   └── master-audio.mp3              # Final sidechain-ducked master audio
├── takes/
│   ├── scene-1.mp4 ... scene-6.mp4   # 1440x900 Retina browser takes (Playwright)
├── media/
│   ├── scene-1.mp4 ... scene-6.mp4   # Media assets synced for HyperFrames
├── renders/
│   ├── redline-showcase-master.mp4   # 1080p Master 12M bitrate delivery
│   └── redline-showcase-mobile.mp4   # <50MB Fast-streaming Telegram / web version
└── snapshots/
    ├── frame-01-scene1-grade-f-scorecard.png
    ├── frame-02-scene2-privacy-security.png
    ├── frame-03-scene3-predatory-noncompete.png
    ├── frame-04-scene4-common-paper-diff.png
    ├── frame-05-scene5-grade-a-remediation.png
    ├── frame-06-scene6-docx-email-export.png
    └── frame-07-scene6-brand-outro-close.png
```

---

## 6. How to Re-Record or Re-Render

```bash
# 1. Re-record browser takes against live deployment
node scripts/record-scenes.cjs

# 2. Re-mix master audio with ducking
node scripts/mix-showcase-audio.cjs

# 3. Render master video and extract verification frames
node scripts/render-and-verify.cjs
```
