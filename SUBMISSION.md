# Redline: LexHack 2026 Submission

**Live Product:** [https://try-redline.vercel.app](https://try-redline.vercel.app)  
**GitHub Repository:** [https://github.com/A-Raphie/redline](https://github.com/A-Raphie/redline)  
**Standard Benchmarked:** Common Paper Cloud Service Agreement & Mutual NDA (MIT License)  

---

### Project Tagline / One-Liner
Audit incoming B2B vendor contracts against open standards and push back with native Word tracked changes.

---

### Inspiration & Problem
Startups and operators sign enterprise vendor contracts with predatory terms every day because outside counsel costs \$800 an hour and takes three weeks to respond. Vendors routinely slip in token \$100 liability caps for themselves while leaving customer liability uncapped, sneaked non-compete clauses in routine NDAs, unilateral 20% renewal price escalations, and rights to train AI models on customer data. Non-lawyers do not understand the legalese until a breach or lawsuit occurs. We built Redline to give every startup founder and operator an attorney-grade contract redlining instrument that audits incoming terms against open, neutral standards in seconds.

---

### What It Does
- **Parses contracts 100% client-side**: Upload any vendor `.docx` or paste plaintext directly in your browser. Confidential contracts never touch a backend server or database.
- **Audits against open Common Paper standards**: Benchmarks incoming clauses against open-source, lawyer-drafted standards (Cloud Service Agreement & Mutual NDA) across 6 core risk categories.
- **Translates risk into plain English**: Replaces dense legalese with clear commercial stakes (e.g. *"The vendor limits their liability to \$100, but leaves yours unlimited"*) while retaining expandable side-by-side legal diffs for attorneys.
- **1-Click batch standardization**: Accept all recommended Common Paper standard fallbacks with a single click or toggle clauses individually.
- **Generates native Microsoft Word tracked changes**: Exports true Office OpenXML `.docx` files with `<w:ins>` and `<w:del>` tracked revisions. When opened in Microsoft Word or Google Docs, the redlines appear as native author revisions ready for counterparty counsel.
- **Drafts executive pushback emails**: Produces a ready-to-paste executive email citing section numbers and fair market standards for immediate vendor pushback.

---

### How We Built It
- **Frontend & Design System**: Built with Next.js 15 (App Router) and TypeScript. Styled using Tailwind CSS with custom semantic tokens under the Warm Paper grammar (stone-50 background, deep navy `#1B365D` headers, terracotta red `#9E2A2B` deletions, forest green `#2E7D32` insertions). Fully compliant with zero raw hexes across component code.
- **Document Parsing Engine**: Integrated `mammoth` entirely client-side to extract structured AST representations from `.docx` files without server-side compute.
- **Risk & Deviation Engine**: Implemented deterministic clause segmentation and token-level deviation analysis against Common Paper open standards.
- **Diff & OpenXML AST Synthesis**: Built a dual diff pipeline using Myers algorithm via `diff` for browser rendering, coupled with `docx` library to construct true OpenXML paragraph nodes containing `<w:ins>` (insertion) and `<w:del>` (deletion) elements with revision timestamps and author metadata.
- **Deployment**: Hosted on Vercel with automatic edge caching and SSO deployment protection disabled.

---

### Challenges We Ran Into
The biggest technical hurdle was generating genuine Microsoft Word tracked changes rather than simulated markup. Nearly every legal tech demo renders colored text spans or visual highlighters that look like redlines in the browser, but export into a flat, uneditable PDF or a Word document with background shading. Corporate legal departments reject highlighted files because their legal workflows depend entirely on native Microsoft Word "Track Changes" (`<w:ins>` and `<w:del>`). 

Bridging this gap required constructing custom OpenXML AST paragraph nodes via the `docx` library, correctly handling whitespace-sensitive character diffs, and formatting deletion runs so Microsoft Word registers them as formal author revisions.

---

### Accomplishments That We're Proud Of
- **Zero-Server Privacy Guarantee**: 100% of document parsing, risk auditing, and file generation runs directly in the client browser. No customer contract data is ever uploaded or logged.
- **True OpenXML Native Revisions**: Generates `.docx` files that Microsoft Word and Google Docs open with authentic tracked revisions intact.
- **Sub-2-Second Audit**: Delivers instant risk grading (A through F) with 1-click batch remediation across complex multi-page agreements.
- **Accessible Progressive Disclosure**: Both non-technical operators and experienced corporate attorneys find exactly what they need without cognitive overload.

---

### What We Learned
We learned that the primary bottleneck in B2B contract negotiation isn't generating creative new clauses, but reaching a trusted baseline of fairness. Enterprise legal teams are much more likely to accept standardized fallbacks from established frameworks like Common Paper than idiosyncratic text generated from a blank prompt. Standardized contracts level the playing field.

---

### What's Next for Redline
- **Additional Open Standards**: Incorporating Bonterms Cloud Terms, Y Combinator Safe agreements, and NVCA venture financing standards.
- **EU/UK GDPR Data Processing Addendum (DPA) Auditor**: Automated checking for standard contractual clauses (SCCs) and Schrems II compliance.
- **CLI & CI/CD Pipeline Integration**: Enabling engineering teams to audit vendor license terms and service contracts directly within git pull requests before purchasing SaaS tools.

---

### Judging Criteria Mapping

| LexHack 2026 Criterion | Weight | How Redline Delivers & Proves It |
| :--- | :---: | :--- |
| **Legal Innovation & Open Standards** | **30%** | Replaces opaque vendor boilerplate with open-source Common Paper standard terms (Cloud Service Agreement & Mutual NDA). Provides deterministic, verifiable risk benchmarking rather than black-box guesses. |
| **Technical Execution & OpenXML** | **25%** | Delivers genuine Microsoft Word `<w:ins>` and `<w:del>` tracked changes synthesized in memory via OpenXML AST nodes. Zero external API keys, zero server dependencies, and 100% client-side privacy. |
| **Product & User Experience** | **25%** | Progressive disclosure UI designed for both founders and general counsel. Features plain-English translations, 1-click batch fix toggles, and formatted executive pushback email memos. |
| **Practical Commercial Impact** | **20%** | Solves an immediate, expensive problem: preventing startups and SMBs from signing token liability caps, sneak non-competes, and predatory price escalation traps. |
