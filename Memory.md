# Redline : Project Memory & Decisions Log

## Key Decisions & Context

### 2026-09-14: Ideation & Track Selection
- **Hackathon:** LexHack 2026 on Devpost.
- **Track:** Legal Automation & Workflow Innovation.
- **Concept Selection:** Idea 1: Redline (B2B Contract Redlining & Risk Audit Instrument).
- **Core Standard:** Selected **Common Paper** open-standard contracts (Cloud Service Agreement v1.0 and Mutual NDA) as the authoritative fair benchmark. Common Paper is MIT-licensed, established by standard-setting legal experts, and widely accepted across the technology startup ecosystem.

### 2026-09-14: Static Hosting Doctrine
- Enforced strict compliance with the **Raphie Static Hosting Doctrine** (Sep 2026): all document parsing, diffing, and DOCX generation must execute client-side or on serverless edge functions. Zero reliance on Railway or persistent server daemons to prevent mid-judging outages.

### 2026-09-14: Native OpenXML Tracked Changes
- Rather than exporting a flat PDF or raw text with markdown formatting, Redline will generate genuine OpenXML `.docx` files with native `<w:ins>` and `<w:del>` elements. When an evaluator or counterparty opens the file in Microsoft Word, Word will natively display the revisions in its tracked changes pane.

### 2026-09-14: Judge-Path Strategy
- Evaluator attention span is under 2 minutes. Added 3 pre-loaded benchmark contracts with 1-click execution so judges do not have to find or upload a private legal contract to see the full power of the engine.
