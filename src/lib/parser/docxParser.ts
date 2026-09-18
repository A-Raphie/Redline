import mammoth from 'mammoth';

export interface ParseResult {
  title: string;
  rawText: string;
  wordCount: number;
  paragraphCount: number;
  fileName?: string;
}

export async function parseDocumentFile(file: File): Promise<ParseResult> {
  const fileName = file.name;
  const isDocx = fileName.toLowerCase().endsWith('.docx');
  const isTxt = fileName.toLowerCase().endsWith('.txt') || fileName.toLowerCase().endsWith('.md');

  if (isDocx) {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    const rawText = result.value || '';
    const paragraphs = rawText.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
    const words = rawText.trim().split(/\s+/).filter(Boolean);

    // Extract probable title from first line or file name
    const firstLine = rawText.split('\n')[0]?.trim() || fileName.replace(/\.[^/.]+$/, '');

    return {
      title: firstLine.length > 5 && firstLine.length < 120 ? firstLine : fileName.replace(/\.[^/.]+$/, ''),
      rawText,
      wordCount: words.length,
      paragraphCount: paragraphs.length,
      fileName,
    };
  }

  if (isTxt) {
    const rawText = await file.text();
    const paragraphs = rawText.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
    const words = rawText.trim().split(/\s+/).filter(Boolean);
    const firstLine = rawText.split('\n')[0]?.trim() || fileName.replace(/\.[^/.]+$/, '');

    return {
      title: firstLine.length > 5 && firstLine.length < 120 ? firstLine : fileName.replace(/\.[^/.]+$/, ''),
      rawText,
      wordCount: words.length,
      paragraphCount: paragraphs.length,
      fileName,
    };
  }

  throw new Error('Unsupported file format. Please upload a .docx or .txt file.');
}

export function parsePlainText(text: string, title = 'Custom Uploaded Agreement'): ParseResult {
  const clean = text.trim();
  const paragraphs = clean.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
  const words = clean.split(/\s+/).filter(Boolean);
  const firstLine = clean.split('\n')[0]?.trim();

  return {
    title: firstLine && firstLine.length > 5 && firstLine.length < 100 ? firstLine : title,
    rawText: clean,
    wordCount: words.length,
    paragraphCount: paragraphs.length,
  };
}

import { StandardType } from '../types';

export function detectContractStandard(title: string, text: string): StandardType {
  const combined = `${title}\n${text.slice(0, 2000)}`.toLowerCase();

  // Check NDA indicators
  if (
    /non-disclosure|confidentiality\s+agreement|mutual\s+nda|\bnda\b|proprietary\s+information/i.test(combined)
  ) {
    return 'MUTUAL_NDA';
  }

  // Check Consulting / Services indicators
  if (
    /consulting|independent\s+contractor|professional\s+services|statement\s+of\s+work|\bsow\b|contractor\s+agreement/i.test(combined) &&
    !/cloud\s+service|software\s+as\s+a\s+service|\bsaas\b/i.test(combined)
  ) {
    return 'SERVICES_PSA';
  }

  // Default to SaaS CSA
  return 'SAAS_CSA';
}

