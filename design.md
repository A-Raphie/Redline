# Redline — Design System & Screen Flows

## Style Direction: Editorial Legal Precision & Technical Instrument

Redline uses a refined, high-density legal engineering visual language that conveys institutional credibility, mathematical rigor, and attorney-level precision.

### Typography
- **Headings (Display/Editorial):** `Newsreader` or `Instrument Serif` / `Georgia` fallback for titles and section banners, giving the interface a prestigious law review / treaty character.
- **Body & UI:** `Geist Sans` or `Inter` for functional density and high legibility.
- **Code & Clause Markers:** `Geist Mono` or `JetBrains Mono` for clause tags, section indices (`§ 8.2`), risk weights, and diff snippets.

### Color Palette & Semantic Tokens
```css
:root {
  /* Canvas & Surfaces */
  --bg-primary: #0B0F17;      /* Deep obsidian ink */
  --bg-secondary: #111722;    /* Card slate */
  --bg-tertiary: #182232;     /* Hover & active state */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-medium: rgba(255, 255, 255, 0.16);

  /* Typography Tiers */
  --text-primary: #F8FAFC;    /* High-contrast parchment white */
  --text-secondary: #94A3B8;  /* Muted metadata */
  --text-muted: #64748B;      /* De-emphasized notes */

  /* Audit & Diff Status Tokens */
  --diff-delete-bg: rgba(239, 68, 68, 0.14);
  --diff-delete-text: #F87171;
  --diff-delete-border: rgba(239, 68, 68, 0.35);

  --diff-insert-bg: rgba(34, 197, 94, 0.14);
  --diff-insert-text: #4ADE80;
  --diff-insert-border: rgba(34, 197, 94, 0.35);

  --risk-critical: #EF4444;
  --risk-high: #F59E0B;
  --risk-fair: #10B981;
  --accent-gold: #E2B366;     /* Common Paper seal accent */
}
```

### Avoid-List (Mandatory Constraints)
- ❌ NO generic purple-to-blue gradient hero cards
- ❌ NO floating chatbot bubble or circular avatars
- ❌ NO rounded pill buttons with soft pastel shadows
- ❌ NO vague marketing copy ("Transform your legal workflow with AI magic")
- ❌ NO generic placeholder metrics without statutory or contractual basis

## Screen-by-Screen User Flow (Screen Build Order)

### Screen 1: Front Door & Workbench Header
- **Navigation bar:** Brand wordmark (`REDLINE // OPEN STANDARD AUDIT`), Standard Selector dropdown (`Common Paper Cloud Service Agreement v1.0`, `Common Paper Mutual NDA v1.0`), and **1-Click Judge Mode presets** (`Aggressive SaaS MSA`, `Predatory NDA`, `Unfair Consulting Agreement`).
- **Legal Notice Chip:** "Non-Attorney Computational Instrument · Benchmarked against Open Standards · 100% Client-Side Privacy".

### Screen 2: Ingestion & Quick Selector Dropzone
- Drag-and-drop zone accepting `.docx`, `.txt`, or raw copy-paste.
- Quick-switch tabs between uploaded contract and benchmark presets with instant parsing.

### Screen 3: Risk Scorecard & Executive Findings Matrix
- Prominent Letter Grade (`Grade D+` or `Grade F: Asymmetric Exposure`).
- 6-Category Risk Grid with severity chips, statutory risk explanation, and number of proposed redlines.

### Screen 4: Split Redline Workbench (Core Hero Experience)
- Two-column synchronized diff view:
  - **Left Column:** Original Incoming Contract with highlighted predatory clauses.
  - **Right Column:** Proposed Redline with inline strike-throughs and Common Paper standard clause insertions.
- Individual clause action bar: `[Accept Standard Fallback]`, `[Toggle Strike]`, `[View Rationale]`.

### Screen 5: Export Modal & Native DOCX Download
- One-click action: **"Download Tracked Changes (.docx)"** which generates a valid OpenXML document containing Microsoft Word native tracked revisions.
- Secondary action: **"Copy Executive Pushback Email"** formatted with clean bullet points and clause citations to send directly to counterparty legal counsel.
