# Redline — Tasks & Phased Build Plan

## Phase 1: Project Setup & Core Infrastructure [COMPLETED]
- [x] Initialize Next.js project with Tailwind CSS and TypeScript in `/Users/raphie/Documents/Hackathons/redline`
- [x] Configure `globals.css` with semantic color tokens (`winsznx/closeout` Warm Paper grammar)
- [x] Install core dependencies: `lucide-react`, `clsx`, `tailwind-merge`, `docx`, `mammoth`, `diff`
- [x] Verify clean compilation with `bun run build`

## Phase 2: Standards Library & Sample Contracts [COMPLETED]
- [x] Implement Common Paper standard clause rules in `src/lib/standards/commonPaperSaaS.ts`
- [x] Implement Common Paper Mutual NDA rules in `src/lib/standards/mutualNDA.ts`
- [x] Create 3 realistic predatory sample contracts in `src/lib/standards/sampleContracts.ts`:
  - `aggressiveSaaS`: Unlimited customer liability, \$100 vendor cap, 60-day renewal trap, unilateral feedback ownership.
  - `unilateralNDA`: Perpetual confidentiality, one-way disclosure, non-compete injection.
  - `unfairConsulting`: Delayed payment net-90, broad indemnity for client specifications, pre-payment IP forfeiture.

## Phase 3: Parser, Segmentation & Risk Engine [COMPLETED]
- [x] Build `src/lib/parser/docxParser.ts` to parse uploaded `.docx` and plaintext files.
- [x] Build `src/lib/engine/clauseSegmenter.ts` to slice contracts into semantic sections.
- [x] Build `src/lib/engine/riskAuditor.ts` to compute category risk scores (A through F) and identify predatory clauses.
- [x] Build `src/lib/engine/redlineGenerator.ts` to produce word/character diffs against standard fallback clauses.

## Phase 4: UI Workbench & Split Redline Viewer [COMPLETED]
- [x] Build `Header.tsx` with standard selector, judge preset buttons, and quiet export trigger.
- [x] Build company-grade **Front Door** on `src/app/page.tsx` (orients a judge in $\le 10$ seconds) with live benchmark proof bar.
- [x] Build `ContractDropzone.tsx` with warm paper styling, drag-and-drop, and preset cards.
- [x] Build `RiskSummaryMatrix.tsx` displaying overall letter grade (A/B/C/D/F) and 6-category risk breakdown with tabular numbers.
- [x] Build `SplitRedlineViewer.tsx` rendering side-by-side or unified redline diffs with terracotta deletions and forest green insertions.
- [x] Build `ClauseInspector.tsx` slide-over drawer detailing Common Paper legal commentary and negotiation leverage points.

## Phase 5: Native DOCX Tracked Changes & Export [COMPLETED]
- [x] Build `src/lib/docx/docxExporter.ts` using `docx` library with `<w:ins>` and `<w:del>` tracked revisions.
- [x] Build `ExportModal.tsx` providing direct download button for `.docx` and copyable executive pushback email memo.
- [x] Verify exported `.docx` file generation integrity via automated test script (`scripts/testEngine.ts`).

## Phase 6: Polish, Verification & Pre-Ship Gate [IN PROGRESS]
- [x] Enforce `semantic-tokens` zero-raw-hex gate check (0 raw hexes across all component files).
- [x] Test 90-second judge flow end-to-end.
- [x] Verify clean Next.js 15 production build (`bun run build` static output: 0 errors).
- [ ] Update `ORCHESTRATOR.md` and `Handoff.md`.
