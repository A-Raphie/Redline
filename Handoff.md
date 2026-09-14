# Redline — Project Handoff & Current State

## Current State (2026-09-14)
- **Status:** Full functional implementation complete and compiled.
- **Repository:** `/Users/raphie/Documents/Hackathons/redline` (`main` branch).
- **Active Stage:** Stage 4 (Verify & Polish).
- **Build Status:** Next.js static build `bun run build` passes with zero errors (`1079ms`).

## Features Implemented
1. **Core Spec Files:** `ORCHESTRATOR.md`, `PRD.md`, `Architecture.md`, `design.md`, `Tasks.md`, `Memory.md`, `Handoff.md`.
2. **Open-Standard Benchmarks:** Common Paper Cloud Service Agreement v1.0 and Mutual NDA v1.0 standard rules with clause-by-clause fallback replacements.
3. **Judge-Path Presets:** 3 real-world predatory benchmark contracts (Predatory SaaS MSA, Disguised Non-Compete NDA, Consulting Services Agreement) pre-loaded for 90-second evaluation.
4. **Document Ingestion:** Client-side `.docx` extraction (via mammoth), plaintext upload, and paste modes.
5. **Clause Segmentation & Risk Scoring:** 6-category risk analysis matrix with letter grade (A to F) and fairness score (0-100).
6. **Split Redline Workbench:** Synchronized side-by-side or unified diff view with strikethrough deletions, green insertions, and legal rationale drawer.
7. **Native Tracked Changes (.docx) Export:** Generates authentic Microsoft Word `.docx` documents containing native `<w:ins>` and `<w:del>` OpenXML tracked revisions and comments.
8. **Negotiation Artifacts:** Copyable executive pushback email memo and clean revised text.

## How to Run
```bash
cd /Users/raphie/Documents/Hackathons/redline
bun dev     # Starts local Next.js dev server on http://localhost:3000
bun run build # Produces optimized static production export
```
