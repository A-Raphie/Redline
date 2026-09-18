# Redline Claims & Backing Evidence Register

This register documents every user-facing claim across the Redline product surface, landing page, README, and submission documentation, verified against the deployed production build on Vercel.

**Deployed Revision:** `111b4bf` (`dpl_9116Jdgr4g9bw2RCg6hczjbjCyxR`)  
**Live Production URL:** [https://try-redline.vercel.app](https://try-redline.vercel.app)  
**Verification Date:** 2026-09-18  
**Audit Protocol:** `claims-verify`  

---

## Claims Verification Table

| # | Claim Assertion | Surface / Location | Backing Evidence & Verification Method | Verdict |
| :-: | :--- | :--- | :--- | :-: |
| 1 | "How It Works" anchor link navigates to operational workflow | Header (`src/components/Header.tsx`) | Evaluated in Chrome DevTools: link has `href="#how-it-works"` matching `<section id="how-it-works">`. Element exists and scrolls smoothly. | **TRUE** |
| 2 | "The 4 Traps" anchor link navigates to MSA trap breakdown | Header (`src/components/Header.tsx`) | Evaluated in Chrome DevTools: link has `href="#traps"` matching `<section id="traps">`. Heading: "The 4 Hidden Traps in Standard Vendor MSAs". | **TRUE** |
| 3 | "Privacy" anchor link navigates to zero-trust privacy section | Header (`src/components/Header.tsx`) | Evaluated in Chrome DevTools: link has `href="#privacy"` matching `<section id="privacy">`. Target top offset verified. | **TRUE** |
| 4 | "FAQ" anchor link navigates to legal clarifications section | Header (`src/components/Header.tsx`) | Evaluated in Chrome DevTools: link has `href="#faq"` matching `<section id="faq">`. Heading: "Frequently Asked Questions". | **TRUE** |
| 5 | Header standard switcher toggles between SaaS, NDA, and PSA | Header (`src/components/Header.tsx`) | Evaluated in Chrome DevTools: clicking buttons updates `currentStandard` across `SAAS_CSA`, `MUTUAL_NDA`, and `SERVICES_PSA` with active styling. | **TRUE** |
| 6 | "Download Redline (.docx)" header button opens export modal | Header (`src/components/Header.tsx`) | Evaluated in Chrome DevTools: button click opens `<ExportModal>` with backdrop and options. | **TRUE** |
| 7 | Enterprise SaaS MSA preset flags 6 predatory traps | Workbench (`src/lib/standards/sampleContracts.ts`) | Evaluated on live page: 6 of 7 clauses flagged with Grade F (token cap, IP grab, auto-renewal, indemnity, fee-shifting, AS IS warranty). | **TRUE** |
| 8 | Mutual NDA preset flags 3 predatory traps | Workbench (`src/lib/standards/sampleContracts.ts`) | Evaluated on live page: 3 of 4 clauses flagged with Grade F (perpetual confidentiality, sneak non-compete, unilateral fee-shifting). | **TRUE** |
| 9 | Consulting MSA preset flags 4 predatory traps | Workbench (`src/lib/standards/sampleContracts.ts`) | Evaluated on live page: 4 of 4 clauses flagged with Grade F (Net-90 payment, pre-payment IP forfeiture, client specs indemnity, token liability cap). | **TRUE** |
| 10 | Smart standard auto-detection on custom contract uploads | Parser (`src/lib/parser/docxParser.ts`) | Tested via CLI: `detectContractStandard` correctly detects NDA titles/text as `MUTUAL_NDA`, consulting/services as `SERVICES_PSA`, and SaaS as `SAAS_CSA`. | **TRUE** |
| 11 | "Accept All Common Paper Fixes" transforms score to Grade A | Scorecard (`src/components/RiskSummaryMatrix.tsx`) | Evaluated in live CDP: clicking button flips stamp from red `F GRADE` to green `A REDLINED` with "✓ All Traps Remediated (Grade A)". | **TRUE** |
| 12 | "Reset All to Vendor Terms" restores initial Grade F state | Scorecard (`src/components/RiskSummaryMatrix.tsx`) | Evaluated in live CDP: clicking button reverts clauses to vendor terms and restores `F GRADE` stamp with 0 latency. | **TRUE** |
| 13 | "Why This Matters" opens Legal Clause Inspector drawer | Viewer (`src/components/SplitRedlineViewer.tsx`) | Evaluated in live CDP: clicking button renders slide-in drawer showing commercial impact, standard citations, and negotiation leverage. | **TRUE** |
| 14 | Pressing Escape key dismisses open modals and drawers | Accessibility (`src/components/ClauseInspector.tsx` & `ExportModal.tsx`) | Evaluated in live CDP: dispatching `Escape` key event cleans up both `.fixed` overlays instantly. | **TRUE** |
| 15 | "Show legal wording & redline diff" renders word-level Myers diff | Viewer (`src/components/SplitRedlineViewer.tsx`) | Evaluated in live CDP: expands accordion rendering 51 strikethrough terracotta deletions (`<del>`) and 54 underlined forest green insertions (`<ins>`). | **TRUE** |
| 16 | Exported `.docx` files contain genuine OpenXML tracked changes | Exporter (`src/lib/docx/docxExporter.ts`) | Unzipped exported .docx buffer and inspected `word/document.xml`: verified presence of `<w:ins>`, `<w:del>`, and `w:author="Redline Legal Auditor"`. | **TRUE** |
| 17 | Executive pushback email memo ready to send to opposing counsel | Exporter (`src/components/ExportModal.tsx`) | Evaluated in live CDP: generates personalized email body citing clause numbers, commercial stakes, and fair standards with 1-click copy button. | **TRUE** |
| 18 | 100% Client-Side Privacy: zero documents uploaded to servers | Network (`src/lib/docx/docxExporter.ts`) | Monitored DevTools network log: 22/22 requests were static assets (JS, CSS, fonts). 0 POST requests, 0 telemetry calls, 0 database writes. | **TRUE** |
| 19 | Sub-2-second deterministic risk audit across multi-page contracts | Engine (`src/lib/engine/riskAuditor.ts`) | Measured on sample contracts: SaaS MSA: 19.09ms, Mutual NDA: 1.85ms, Consulting MSA: 11.74ms (all under 20ms). | **TRUE** |
| 20 | External reference and builder links are live and non-broken | Documentation (`README.md` & `SUBMISSION.md`) | Tested via curl: `try-redline.vercel.app` (200 OK), `commonpaper.com/standards/` (200 OK), `LICENSE` file present in root. | **TRUE** |
