# Redline — Project Handoff & Current State

## Current State (2026-09-14)
- **Status:** Full functional implementation, Warm Paper UI, comprehensive README, timed demo script, and Devpost submission ready.
- **Repository:** `/Users/raphie/Documents/Hackathons/redline` (`main` branch).
- **Design Grammar:** `winsznx/closeout` (Warm Paper / Closure Ledger: `#F5F1E8` linen canvas, `#FFFEFB` surface, `#1C1B1A` carbon ink, terracotta/forest diffs).
- **Active Stage:** Stage 6 (Submission Ready).
- **Build Status:** Next.js static build `bun run build` passes cleanly with 0 errors.
- **Live Deployment:** [https://try-redline.vercel.app](https://try-redline.vercel.app) (SSO protection disabled, HTTP 200).
- **Local Dev Server:** Running on `http://localhost:3005` (HTTP 200 OK).
- **Submission Artifacts:** `README.md`, `demo-script.md`, `SUBMISSION.md` (all 0 em dashes).

## Features Implemented
1. **Company-Grade Front Door (`ui-craft` Step 4):**
   - 10-second stranger orientation with clear 2-sentence value proposition.
   - Live **Benchmark Proof Bar** comparing predatory traps against Common Paper standards ($100 cap vs 12-month fees, 90-day renewal trap vs 30-day notice, IP data grabs vs customer reservations, 5-year lock-in vs 3-year mutual NDA).
   - Single primary CTA ("Enter Redline Workbench") + 3 preset test buttons.
2. **Design Tokens & Zero-Raw-Hex Compliance (`semantic-tokens`):**
   - Complete semantic token scale in `globals.css` with 0 raw hexes across all component files.
   - `Instrument Sans` / `Inter` + `IBM Plex Mono` + `Newsreader` / `Georgia` typography stacks.
3. **Open-Standard Benchmarks:**
   - Common Paper Cloud Service Agreement v1.0 and Mutual NDA v1.0 standard rules with clause-by-clause fallback replacements.
4. **Judge-Path Presets:**
   - 3 real-world predatory benchmark contracts (Predatory SaaS MSA, Disguised Non-Compete NDA, Consulting Services Agreement) pre-loaded for 90-second evaluation.
5. **Document Ingestion:**
   - Client-side `.docx` extraction (via mammoth), plaintext upload, and paste modes.
6. **Clause Segmentation & Risk Scoring:**
   - 6-category risk analysis matrix with letter grade (A to F) and fairness score (0-100).
7. **Split Redline Workbench:**
   - Synchronized side-by-side or unified diff view with terracotta strikethrough deletions, forest green insertions, and legal rationale drawer.
8. **Native Tracked Changes (.docx) Export:**
   - Generates authentic Microsoft Word `.docx` documents containing native `<w:ins>` and `<w:del>` OpenXML tracked revisions and comments.
9. **Negotiation Artifacts:**
   - Copyable executive pushback email memo and clean revised text.

## How to Run & Verify
```bash
cd /Users/raphie/Documents/Hackathons/redline
bun run build                 # Produces optimized static production export
bun run scripts/testEngine.ts # Verifies all 3 sample audits & DOCX file generation
bun dev -p 3005               # Starts local Next.js dev server on http://localhost:3005
```
