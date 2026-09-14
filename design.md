# Redline — Design System & Screen Flows

## Style Grammar: winsznx/closeout (Closure Ledger / Warm Paper)

Redline mirrors the proven hackathon-winning design language of **`winsznx/closeout`** (pushed Sep 13, 2026). In commercial contracting and legal practice, agreements are reviewed as black ink on off-white linen paper, striking out predatory clauses in terracotta ink and inserting standardized terms in forest green ink. This replaces generic dark-mode SaaS styling with an attorney-grade, credible instrument.

### Typography
- **Headings & Body UI:** `Instrument Sans` / `Inter` (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`) for crisp legibility.
- **Contract Clauses & Prose:** `Newsreader` / `Georgia` / `Times New Roman` for authentic legal document typography.
- **Diff Snippets, Section Markers & Metrics:** `IBM Plex Mono` / `ui-monospace` for clause tags, section indices (`§ 8.2`), risk weights, and diff snippets.

### Color Palette & Semantic Tokens (from `winsznx/closeout`)
```css
:root {
  /* Elevation ladder — base < surface < subtle < overlay */
  --bg-base: #F5F1E8;             /* Warm linen paper canvas */
  --bg-surface: #FFFEFB;          /* Crisp off-white card surface */
  --bg-subtle: #EEE8DE;           /* Muted hover & inset surface */
  --bg-surface-strong: #E4DDD1;   /* Container & table header */
  --bg-overlay: #FFFFFF;          /* Modals, popovers, drawers */

  /* Text tiers — exactly three */
  --text-primary: #1C1B1A;        /* Rich carbon black ink */
  --text-secondary: #55504A;      /* Warm slate secondary text */
  --text-muted: #7C756D;          /* Stone muted metadata */

  /* Border scale — crisp paper lines */
  --border-default: #D8D0C4;      /* Hairline ledger border */
  --border-strong: #BEB4A7;       /* Hover / active boundary */

  /* Brand slate & accent */
  --brand: #382F42;               /* Deep aubergine/slate */
  --brand-strong: #2B2433;        /* Deepest aubergine */
  --brand-subtle: #F0ECF4;        /* Soft aubergine tint */
  --accent: #1C1B1A;              /* Primary action ink */
  --accent-foreground: #FFFEFB;   /* Card off-white on accent */

  /* Amber / Gold accent */
  --accent-gold: #B67A24;
  --accent-gold-subtle: #F7EEDB;
  --accent-gold-strong: #8C5D17;

  /* Redline Diff Tokens — Terracotta (del/trap) and Forest (ins/remedy) */
  --diff-del-bg: #FAE3DA;
  --diff-del-text: #B83E23;
  --diff-del-border: #E76545;

  --diff-ins-bg: #E1F0E8;
  --diff-ins-text: #1D5C43;
  --diff-ins-border: #2F7A5D;

  /* Risk Scale */
  --risk-critical: #B83E23;
  --risk-critical-bg: #FAE3DA;
  --risk-high: #945C10;
  --risk-high-bg: #F7EEDB;
  --risk-medium: #275570;
  --risk-medium-bg: #E3EDF2;
  --risk-low: #1D5C43;
  --risk-low-bg: #E1F0E8;

  /* Geometry & Radii */
  --radius-input: 8px;
  --radius-card: 14px;
  --radius-pill: 999px;
}
```

### Avoid-List (Mandatory Constraints)
- ❌ NO generic purple-to-blue gradient hero cards
- ❌ NO dark obsidian background default
- ❌ NO floating chatbot bubble or circular avatars
- ❌ NO rounded pill buttons with soft pastel shadows
- ❌ NO vague marketing copy ("Transform your legal workflow with AI magic")
- ❌ NO raw hex values in component files (`semantic-tokens` gate)

---

## Screen-by-Screen User Flow (Screen Build Order)

### Screen 1: The Front Door (ui-craft Step 4)
- **Orientation Hook (<= 10s rule):**
  - Headline: *"Audit incoming B2B contracts against open standards. Push back with native Word tracked changes."*
  - Plain-English explainer: *"Redline parses vendor MSAs, NDAs, and SaaS agreements against Common Paper standard terms to flag predatory liability caps, unilateral indemnities, and perpetual renewals. Accept open-standard fallbacks in one click and export an attorney-ready .docx with real Microsoft Word tracked revisions."*
- **Visible Proof Bar:**
  - $100 Token Liability vs 12-Month Fees (Common Paper CSA §8.1)
  - 90-Day Trap vs 30-Day Notice (Common Paper CSA §6.2)
  - Data Rights vs Training Grabs (Common Paper CSA §4.1)
  - 5-Year Lock-in vs 3-Year NDA (Common Paper NDA §3)
- **Single Primary CTA:** "Enter Redline Workbench" + 3 preset test buttons.

### Screen 2: Header & Preset Navigation
- Brand wordmark with deep aubergine badge (`RL`), Standard Selector (`Common Paper CSA` vs `Mutual NDA`), and **1-Click Judge Mode presets** (`Predatory MSA`, `Sneak NDA`, `Consulting`).
- Trust & Privacy Bar: "100% Client-Side Privacy: Contracts never leave your browser • Native Word <w:ins> & <w:del> Revisions".

### Screen 3: Ingestion & Quick Selector Dropzone
- Drag-and-drop zone accepting `.docx`, `.txt`, or raw copy-paste.
- Quick-switch tabs between uploaded contract and benchmark presets with instant client-side parsing.

### Screen 4: Risk Summary Matrix
- Prominent Letter Grade (`Grade F: Severe Asymmetric Exposure` / `Grade A: Balanced & Standard`).
- 6-Category Risk Grid with severity chips, statutory risk explanation, and tabular-numbers fairness score.

### Screen 5: Split Redline Workbench (Core Hero Experience)
- Two-column synchronized diff view:
  - **Left Column:** Original Incoming Contract with Newsreader legal serif typography.
  - **Right Column:** Proposed Redline with IBM Plex Mono strikethroughs (Terracotta) and Common Paper insertions (Forest Green).
- Action buttons: `[Accept Standard Fallback]` / `[Keep Original]`, `[Legal Commentary]`.

### Screen 6: Clause Inspector Drawer
- Slide-over drawer on warm surface (`--bg-surface`) breaking down the exact trigger rule, standard violation rationale, commercial pushback tip, and proposed fallback.

### Screen 7: Export Modal & Native DOCX Download
- **"Download Tracked Changes (.docx)"** with native OpenXML `<w:ins>` and `<w:del>` elements.
- **"Copy Executive Pushback Email"** formatted with clean bullet points and clause citations.

## Folds Used
- Screen 1: Centered editorial hero with full-width benchmark proof bar. (Sacrificed: generic split text-left/visual-right illustration).
- Screen 2: Split redline ledger workbench with sticky navigation and right-side inspection drawer.
