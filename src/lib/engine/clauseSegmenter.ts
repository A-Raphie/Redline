import { ClauseCategory } from '../types';

export interface RawSegment {
  id: string;
  sectionNumber?: string;
  title: string;
  text: string;
  startIndex: number;
  endIndex: number;
  category: ClauseCategory;
}

const CATEGORY_KEYWORDS: Record<ClauseCategory, { titleKeywords: RegExp[]; bodyKeywords: RegExp[] }> = {
  LIMITATION_OF_LIABILITY: {
    titleKeywords: [/limitation\s+of\s+liability/i, /liability\s+cap/i, /damages/i],
    bodyKeywords: [
      /aggregate\s+liability/i,
      /consequential\s+damages/i,
      /punitive\s+damages/i,
      /maximum\s+liability/i,
      /exceed\s+(?:the\s+total|fees\s+paid)/i,
    ],
  },
  INDEMNIFICATION: {
    titleKeywords: [/indemnif/i, /defense/i, /hold\s+harmless/i],
    bodyKeywords: [
      /defend,\s+indemnify/i,
      /hold\s+harmless/i,
      /third-party\s+claim/i,
      /infringement\s+claim/i,
      /indemnifying\s+party/i,
    ],
  },
  TERM_AND_RENEWAL: {
    titleKeywords: [/term/i, /renewal/i, /termination/i, /duration/i],
    bodyKeywords: [
      /automatic\s+renewal/i,
      /renew\s+for\s+additional/i,
      /prior\s+written\s+notice/i,
      /days\s+prior\s+to\s+renewal/i,
      /material\s+breach/i,
      /terminate\s+for\s+convenience/i,
    ],
  },
  IP_AND_DATA_OWNERSHIP: {
    titleKeywords: [/intellectual\s+property/i, /customer\s+data/i, /ownership/i, /feedback/i, /proprietary\s+rights/i],
    bodyKeywords: [
      /right,\s+title,\s+and\s+interest/i,
      /work\s+made\s+for\s+hire/i,
      /grant\s+provider\s+a\s+license/i,
      /train\s+machine\s+learning/i,
      /feedback,\s+improvements/i,
      /assigns\s+all\s+rights/i,
    ],
  },
  WARRANTIES_AND_SLA: {
    titleKeywords: [/warrant/i, /disclaimer/i, /service\s+level/i, /sla/i],
    bodyKeywords: [
      /"as\s+is"/i,
      /without\s+warranties\s+of\s+any\s+kind/i,
      /merchantability/i,
      /fitness\s+for\s+a\s+particular\s+purpose/i,
      /uptime\s+guarantee/i,
    ],
  },
  GOVERNING_LAW_AND_DISPUTES: {
    titleKeywords: [/governing\s+law/i, /jurisdiction/i, /dispute\s+resolution/i, /arbitration/i, /venue/i],
    bodyKeywords: [
      /governed\s+by\s+the\s+laws\s+of/i,
      /exclusive\s+venue/i,
      /personal\s+jurisdiction/i,
      /attorney(?:'s)?\s+fees/i,
      /prevailing\s+party/i,
      /waives\s+trial\s+by\s+jury/i,
    ],
  },
  GENERAL: {
    titleKeywords: [],
    bodyKeywords: [],
  },
};

export function segmentContract(fullText: string): RawSegment[] {
  // Regex to detect standard section boundaries:
  // "SECTION 1. TITLE", "ARTICLE IV. TITLE", "1.1 Title", or standalone bold headers
  const sectionHeaderRegex = /(?:^|\n\n)(?:SECTION\s+(\d+(?:\.\d+)?)|ARTICLE\s+([IVXLCDM]+|\d+)|(\d+\.\d+|\d+\.)(?!\d))\s*[.:\-–—]?\s*([A-Z\s&,–\-\/]{3,60})(?:\n|$)/gm;

  const matches: { index: number; length: number; sectionNumber?: string; title: string }[] = [];
  let match: RegExpExecArray | null;

  while ((match = sectionHeaderRegex.exec(fullText)) !== null) {
    const sectionNum = match[1] || match[2] || match[3] || '';
    const title = match[4]?.trim() || 'Untitled Section';
    matches.push({
      index: match.index,
      length: match[0].length,
      sectionNumber: sectionNum.trim(),
      title,
    });
  }

  // If no formal headers found, fall back to paragraph-based segmentation
  if (matches.length < 2) {
    const paragraphs = fullText.split(/\n\s*\n/);
    let cursor = 0;
    const segments: RawSegment[] = [];

    paragraphs.forEach((para, idx) => {
      const cleanPara = para.trim();
      if (cleanPara.length < 30) {
        cursor += para.length + 2;
        return;
      }

      const firstLine = cleanPara.split('\n')[0].substring(0, 50);
      const category = classifyClauseCategory(firstLine, cleanPara);

      segments.push({
        id: `clause-${idx + 1}`,
        sectionNumber: `§ ${idx + 1}`,
        title: firstLine,
        text: cleanPara,
        startIndex: cursor,
        endIndex: cursor + para.length,
        category,
      });

      cursor += para.length + 2;
    });

    return segments;
  }

  // Build segments from detected headers
  const segments: RawSegment[] = [];
  for (let i = 0; i < matches.length; i++) {
    const current = matches[i];
    const next = matches[i + 1];

    const startIndex = current.index;
    const endIndex = next ? next.index : fullText.length;
    const segmentText = fullText.substring(startIndex, endIndex).trim();

    const category = classifyClauseCategory(current.title, segmentText);

    segments.push({
      id: `clause-${i + 1}`,
      sectionNumber: current.sectionNumber ? `Section ${current.sectionNumber}` : undefined,
      title: current.title,
      text: segmentText,
      startIndex,
      endIndex,
      category,
    });
  }

  return segments;
}

export function classifyClauseCategory(title: string, body: string): ClauseCategory {
  const combined = `${title}\n${body}`;

  // Check title matches first (highest precision)
  for (const [cat, rules] of Object.entries(CATEGORY_KEYWORDS) as [ClauseCategory, typeof CATEGORY_KEYWORDS[ClauseCategory]][]) {
    if (cat === 'GENERAL') continue;
    for (const titleRx of rules.titleKeywords) {
      if (titleRx.test(title)) {
        return cat;
      }
    }
  }

  // Check body matches
  let bestCategory: ClauseCategory = 'GENERAL';
  let highestScore = 0;

  for (const [cat, rules] of Object.entries(CATEGORY_KEYWORDS) as [ClauseCategory, typeof CATEGORY_KEYWORDS[ClauseCategory]][]) {
    if (cat === 'GENERAL') continue;
    let score = 0;
    for (const bodyRx of rules.bodyKeywords) {
      if (bodyRx.test(combined)) {
        score++;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestCategory = cat;
    }
  }

  return bestCategory;
}
