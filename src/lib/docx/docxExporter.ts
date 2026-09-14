import { Document, Paragraph, TextRun, InsertedTextRun, DeletedTextRun, HeadingLevel, Packer, AlignmentType } from 'docx';
import { Clause } from '../types';
import { computeClauseDiff } from '../engine/redlineGenerator';

export async function exportTrackedDocx(
  contractTitle: string,
  clauses: Clause[],
  standardName: string
): Promise<Blob> {
  let changeId = 1;
  const now = new Date().toISOString();
  const author = 'Redline Legal Auditor';

  const paragraphs: Paragraph[] = [];

  // Title Banner
  paragraphs.push(
    new Paragraph({
      text: contractTitle.toUpperCase(),
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    })
  );

  // Subtitle / Standard Benchmark Note
  paragraphs.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `REDLINE AUDIT REPORT & PROPOSED REVISIONS\n`,
          bold: true,
          size: 20,
          color: '64748B',
        }),
        new TextRun({
          text: `Benchmarked against: ${standardName}\n`,
          italics: true,
          size: 18,
          color: '94A3B8',
        }),
        new TextRun({
          text: `Generated on: ${new Date().toLocaleDateString('en-US', { dateStyle: 'long' })} · Author: ${author}\n`,
          size: 18,
          color: '94A3B8',
        }),
        new TextRun({
          text: `Note: Redline revisions below are native Microsoft Word tracked changes (<w:ins> and <w:del>). Review or accept/reject directly within Word.\n\n`,
          italics: true,
          size: 18,
          color: '475569',
        }),
      ],
      spacing: { after: 400 },
    })
  );

  // Iterate clauses
  for (const clause of clauses) {
    // If the clause was accepted for revision and differs from original
    if (clause.isAccepted && clause.proposedFallback !== clause.originalText) {
      // Add section title
      if (clause.title) {
        paragraphs.push(
          new Paragraph({
            text: clause.title,
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 240, after: 120 },
          })
        );
      }

      // Add audit rationale header
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `[AUDIT NOTE: `,
              bold: true,
              color: 'B45309', // Amber
              size: 18,
            }),
            new TextRun({
              text: `${clause.issues.join('; ')}. Replaced with balanced terms from ${clause.standardReference}.]`,
              italics: true,
              color: 'B45309',
              size: 18,
            }),
          ],
          spacing: { after: 120 },
        })
      );

      // Compute word diff and build tracked runs
      const diffParts = computeClauseDiff(clause.originalText, clause.proposedFallback);
      const runs: (TextRun | InsertedTextRun | DeletedTextRun)[] = [];

      for (const part of diffParts) {
        if (part.type === 'delete') {
          runs.push(
            new DeletedTextRun({
              text: part.value,
              id: changeId++,
              author,
              date: now,
            })
          );
        } else if (part.type === 'insert') {
          runs.push(
            new InsertedTextRun({
              text: part.value,
              id: changeId++,
              author,
              date: now,
            })
          );
        } else {
          runs.push(
            new TextRun({
              text: part.value,
              size: 22,
            })
          );
        }
      }

      paragraphs.push(
        new Paragraph({
          children: runs,
          spacing: { after: 240 },
        })
      );
    } else {
      // Unchanged clause
      if (clause.title) {
        paragraphs.push(
          new Paragraph({
            text: clause.title,
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          })
        );
      }

      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: clause.originalText,
              size: 22,
            }),
          ],
          spacing: { after: 200 },
        })
      );
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: paragraphs,
      },
    ],
  });

  return await Packer.toBlob(doc);
}
