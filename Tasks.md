# Redline — Tasks & Phased Build Plan

## Phase 1: Project Setup & Core Infrastructure [MVP]
- [ ] Initialize Next.js 14 project with Tailwind CSS and TypeScript
- [ ] Configure `tailwind.config.ts` and `src/app/globals.css` with semantic color tokens
- [ ] Install core dependencies: `lucide-react`, `clsx`, `tailwind-merge`, `docx`, `mammoth`, `diff`
- [ ] Verify clean compilation with `bun run build` / `npm run build`

## Phase 2: Standards Library & Sample Contracts
- [ ] Implement Common Paper standard clause rules in `src/lib/standards/commonPaperSaaS.ts`
- [ ] Implement Common Paper Mutual NDA rules in `src/lib/standards/mutualNDA.ts`
- [ ] Create 3 realistic predatory sample contracts in `src/lib/standards/sampleContracts.ts`:
  - `aggressiveSaaS`: Unlimited customer liability, \$100 vendor cap, 60-day renewal trap, unilateral feedback ownership.
  - `unilateralNDA`: Perpetual confidentiality, one-way disclosure, non-compete injection.
  - `unfairConsulting`: Delayed payment net-90, broad indemnity for client specifications, pre-payment IP forfeiture.

## Phase 3: Parser, Segmentation & Risk Engine
- [ ] Build `src/lib/parser/docxParser.ts` to parse uploaded `.docx` and plaintext files.
- [ ] Build `src/lib/engine/clauseSegmenter.ts` to slice contracts into semantic sections.
- [ ] Build `src/lib/engine/riskAuditor.ts` to compute category risk scores (A through F) and identify predatory clauses.
- [ ] Build `src/lib/engine/redlineGenerator.ts` to produce word/character diffs against standard fallback clauses.

## Phase 4: UI Workbench & Split Redline Viewer
- [ ] Build `Header.tsx` with standard selector and 1-Click Judge Mode presets.
- [ ] Build `ContractDropzone.tsx` with drag-and-drop file upload and text paste editor.
- [ ] Build `RiskSummaryMatrix.tsx` displaying overall risk grade and 6-category breakdown.
- [ ] Build `SplitRedlineViewer.tsx` rendering side-by-side or inline redline diffs with strike-throughs and insertions.
- [ ] Build `ClauseInspector.tsx` drawer detailing Common Paper legal commentary and negotiation leverage points.

## Phase 5: Native DOCX Tracked Changes & Export
- [ ] Build `src/lib/docx/docxExporter.ts` using `docx` library with `<w:ins>` and `<w:del>` tracked revisions.
- [ ] Build `ExportModal.tsx` providing download button for `.docx` and copyable email pushback memo.
- [ ] Verify exported `.docx` opens properly in Word and Google Docs with native tracked changes.

## Phase 6: Polish, Verification & Pre-Ship Gate
- [ ] Test 90-second judge flow end-to-end.
- [ ] Add copy buttons, keyboard shortcuts, and responsive layout polish.
- [ ] Run production build and verify zero console errors or hydration mismatches.
- [ ] Update `ORCHESTRATOR.md` and `Handoff.md`.
