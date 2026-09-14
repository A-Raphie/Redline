# Redline — PRD (Product Requirements Document)

## Problem
Commercial contracting is systematically biased against startups, freelancers, and small businesses. Inbound vendor agreements, client Master Services Agreements (MSAs), and non-disclosure agreements (NDAs) frequently contain one-sided, predatory terms: unlimited liability for the customer, zero vendor liability, unilateral indemnification, perpetual confidentiality, and 60-day auto-renewal traps. Hiring an attorney to review and redline a single agreement costs \$500 to \$2,000 and takes days, leading 85%+ of small businesses to sign blind.

While open-standard legal agreements (like **Common Paper** and **Bonterms**) exist to establish balanced, mutually fair terms, there is no accessible, developer-grade instrument that takes an incoming contract, audits its clauses against open standards, highlights predatory risks, and outputs an attorney-grade `.docx` file with native Microsoft Word tracked changes and battle-tested fallback clauses.

## Personas
- **Primary:** Startup Founders, Freelancers, and Small Business Operators who receive inbound vendor or customer contracts and need to spot red flags and push back with professional redlines immediately.
- **Secondary:** In-house counsel and operations/procurement leads who need a fast first-pass compliance scan before deep legal review.
- **Evaluator / Judge Persona:** Legal tech, compliance, and enterprise software judges (e.g. PwC Compliance, Stripe Product, SAP AI Scientist) evaluating real-world utility, precision, and technical rigor.

## Jobs to be Done
1. **Instant Inbound Audit:** Drag & drop any contract (`.docx` or `.txt` or paste) $\rightarrow$ get an instant, deterministic risk score across 6 key risk categories.
2. **Standard Benchmark Matching:** Automatically identify aggressive deviations from the **Common Paper Cloud Service Agreement (CSA)** and **Mutual NDA (MNDA)** standards.
3. **Interactive Side-by-Side Redline:** Inspect original contract clauses alongside suggested fallback clause replacements with granular accept/reject controls.
4. **Native Tracked-Change Export:** Export a real `.docx` document with native OpenXML tracked revisions (`<w:ins>` and `<w:del>`) ready to email back to the counterparty.

## Scope & Non-Goals
### In Scope (v1 MVP)
- Client-side document parsing (`.docx` via mammoth/docx extraction and plaintext).
- 3 Pre-loaded benchmark contracts for instant 90-second judge evaluation.
- 6-Category Risk Matrix:
  - *Limitation of Liability*
  - *Indemnification & Defense*
  - *Term, Auto-Renewal & Termination*
  - *Intellectual Property & Customer Data Ownership*
  - *Governing Law & Dispute Jurisdiction*
  - *Warranties, Service Levels & Remedies*
- Interactive Split Redline Viewer with inline diff toggles.
- Client-side OpenXML DOCX generator producing native tracked revisions.
- Copyable Executive Summary & Email Pushback Template.

### Non-Goals (Explicit Exclusions)
- Providing formal legal representation or creating an attorney-client relationship (clear disclaimer prominently rendered).
- Cloud user account / database storage of sensitive contracts (zero data persistence guarantees client confidentiality).
- Persistent daemon backend or complex multi-agent orchestration requiring paid server infrastructure.

## Success Metrics & Kill Criteria
- **90-Second Judge Test:** A judge can load the app, select an aggressive sample contract, inspect the redlines, and download the tracked `.docx` within 90 seconds.
- **File Fidelity:** Downloaded `.docx` files must open without error in Microsoft Word, Google Docs, and LibreOffice with native revision markings visible.
- **Kill Criterion:** If native `.docx` tracked-change generation is corrupted across desktop Word versions, fall back to highlighted standard text export with detailed redline markup notes.
