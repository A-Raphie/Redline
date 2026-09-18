import { StandardBenchmarkRule } from './commonPaperSaaS';

export const COMMON_PAPER_NDA_RULES: StandardBenchmarkRule[] = [
  {
    category: 'TERM_AND_RENEWAL',
    standardName: 'Common Paper Mutual NDA v1.0',
    sectionRef: 'Section 4 (Duration of Confidentiality)',
    balancedPrinciple:
      'Confidentiality obligations endure for a fixed reasonable commercial duration (typically 2 to 3 years from disclosure), except for trade secrets which endure as long as they remain trade secrets under law.',
    predatoryPatterns: [
      {
        pattern: /confidentiality\s+obligations.{0,60}(?:shall\s+)?(?:continue\s+in\s+perpetuity|remain\s+perpetual|never\s+expire|perpetual|without\s+limitation\s+of\s+time)/i,
        issue: 'Perpetual confidentiality obligation for general business discussions, creating permanent indefinite liability.',
        severity: 'HIGH',
        penaltyScore: 25,
      },
    ],
    standardFallbackClause:
      'Section 4. Term & Survival. Each party’s duty to protect Confidential Information under this Agreement will survive for three (3) years from the date of disclosure. Trade secrets will remain protected for so long as they qualify as trade secrets under applicable trade secret law.',
    attorneyCommentary:
      'Perpetual confidentiality on routine pitch decks and exploratory conversations creates permanent tracking liabilities. Standard industry practice is 2 to 3 years.',
  },
  {
    category: 'GENERAL',
    standardName: 'Common Paper Mutual NDA v1.0',
    sectionRef: 'Section 6 (Non-Solicit & Restrictive Covenants)',
    balancedPrinciple:
      'An NDA must restrict ONLY the disclosure of confidential information, and must NEVER sneak in non-compete or non-solicitation restrictions.',
    predatoryPatterns: [
      {
        pattern: /recipient\s+shall\s+not.{0,60}(?:compete\s+with|solicit|hire\s+any\s+employee|develop\s+competing)/i,
        issue: 'Hidden non-compete / non-solicit backdoor sneaked into a standard mutual non-disclosure agreement.',
        severity: 'CRITICAL',
        penaltyScore: 40,
      },
    ],
    standardFallbackClause:
      'Section 6. Independent Development. This Agreement does not restrict either party from independently developing, procuring, or marketing products or services that may be competitive with those of the Disclosing Party, provided that the Receiving Party does not use or reference the Disclosing Party’s Confidential Information in connection therewith.',
    attorneyCommentary:
      'One of the most predatory traps in early-stage founder discussions: an investor or enterprise counterpart buries a non-solicit or non-compete clause inside what was labeled an "ordinary mutual NDA".',
  },
  {
    category: 'GOVERNING_LAW_AND_DISPUTES',
    standardName: 'Common Paper Mutual NDA v1.0',
    sectionRef: 'Section 8 (Dispute Resolution & Legal Fees)',
    balancedPrinciple:
      'Bilateral dispute resolution and mutual prevailing-party attorney fees. Neither party should unilaterally pay opposing counsel fees.',
    predatoryPatterns: [
      {
        pattern: /(?:recipient|customer|contractor|client|either\s+party)\s+shall\s+pay\s+all\s+(?:legal\s+costs|court\s+costs|attorney(?:'s)?\s+fees|costs\s+and\s+expenses).{0,80}(?:incurred\s+by\s+(?:company|provider|client|disclosing\s+party)|enforcement\s+action)/i,
        issue: 'Unilateral fee shifting: One party forced to pay counterpart legal fees in enforcement actions without prevailing party reciprocity.',
        severity: 'HIGH',
        penaltyScore: 25,
      },
    ],
    standardFallbackClause:
      'Section 8. Governing Law & Dispute Resolution. This Agreement will be governed by the laws of the State of Delaware. In any dispute arising out of this Agreement, the prevailing party shall be entitled to recover its reasonable attorney fees and court costs.',
    attorneyCommentary:
      'Fee-shifting must always be mutual to the prevailing party. Unilateral fee shifting creates severe leverage imbalances in commercial discussions.',
  },
];

