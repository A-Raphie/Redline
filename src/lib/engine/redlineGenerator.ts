import * as Diff from 'diff';
import { Clause, DiffPart } from '../types';

export function computeClauseDiff(original: string, replacement: string): DiffPart[] {
  const changes = Diff.diffWordsWithSpace(original, replacement);

  return changes.map((change) => {
    if (change.added) {
      return { type: 'insert', value: change.value };
    }
    if (change.removed) {
      return { type: 'delete', value: change.value };
    }
    return { type: 'equal', value: change.value };
  });
}

export function generatePushbackEmail(contractTitle: string, clauses: Clause[]): string {
  const flagged = clauses.filter((c) => c.riskLevel !== 'FAIR' && c.riskLevel !== 'LOW' && c.isAccepted);

  let email = `Subject: Proposed Revisions to ${contractTitle} (Standard Alignment)\n\n`;
  email += `Hi team,\n\n`;
  email += `Thank you for sharing the ${contractTitle}. We have reviewed the terms against standard commercial practices (benchmarked against the open-source Common Paper standard agreement framework).\n\n`;
  email += `To ensure mutual protection and facilitate a prompt execution, we have prepared a clean redline attached in Word (.docx) format with tracked changes. Specifically, our key adjustments focus on:\n\n`;

  flagged.forEach((c, i) => {
    email += `${i + 1}. ${c.title || c.category} (${c.sectionNumber || 'Section'})\n`;
    email += `   - Concern: ${c.issues.join('; ')}\n`;
    email += `   - Standard Revision: Aligned with ${c.standardReference} for mutual reciprocity.\n\n`;
  });

  email += `Please review the attached tracked changes. We are ready to sign once these mutual terms are confirmed.\n\n`;
  email += `Best regards,\n[Your Name / Company]`;

  return email;
}

export function generateFullRedlinedDocumentText(clauses: Clause[]): string {
  return clauses
    .map((c) => {
      if (c.isAccepted && c.proposedFallback !== c.originalText) {
        return `[REVISED: ALIGNED WITH ${c.standardReference}]\n${c.proposedFallback}`;
      }
      return c.originalText;
    })
    .join('\n\n');
}
