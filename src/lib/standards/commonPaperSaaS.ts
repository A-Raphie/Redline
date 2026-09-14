import { ClauseCategory } from '../types';

export interface StandardBenchmarkRule {
  category: ClauseCategory;
  standardName: string;
  sectionRef: string;
  balancedPrinciple: string;
  predatoryPatterns: {
    pattern: RegExp;
    issue: string;
    severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
    penaltyScore: number;
  }[];
  standardFallbackClause: string;
  attorneyCommentary: string;
}

export const COMMON_PAPER_CSA_RULES: StandardBenchmarkRule[] = [
  {
    category: 'LIMITATION_OF_LIABILITY',
    standardName: 'Common Paper Cloud Service Agreement v1.0',
    sectionRef: 'Section 9 (Limitation of Liability)',
    balancedPrinciple:
      'Mutual aggregate liability capped at the fees paid or payable by Customer in the 12 months preceding the incident. Mutual waiver of indirect and consequential damages.',
    predatoryPatterns: [
      {
        pattern: /customer(?:'s)?\s+liability\s+(?:shall\s+be\s+)?unlimited/i,
        issue: 'Asymmetric liability: Customer has unlimited liability while Vendor liability is capped.',
        severity: 'CRITICAL',
        penaltyScore: 35,
      },
      {
        pattern: /provider(?:'s)?\s+(?:total\s+)?aggregate\s+liability.{0,80}(?:\$100|\$50|one\s+hundred\s+dollars|fifty\s+dollars)/i,
        issue: 'Nominal token liability cap ($100 or less) rendering vendor obligations legally illusory.',
        severity: 'CRITICAL',
        penaltyScore: 30,
      },
      {
        pattern: /in\s+no\s+event\s+shall\s+provider\s+be\s+liable.{0,100}even\s+if\s+advised\s+of\s+the\s+possibility/i,
        issue: 'Unilateral waiver of consequential damages benefiting solely the Provider without reciprocity.',
        severity: 'HIGH',
        penaltyScore: 20,
      },
      {
        pattern: /liability.{0,60}capped\s+at.{0,40}(?:one\s+month|thirty\s+days|fees\s+paid\s+in\s+prior\s+month)/i,
        issue: 'Extremely compressed 1-month lookback liability cap rather than standard 12-month period.',
        severity: 'HIGH',
        penaltyScore: 20,
      },
    ],
    standardFallbackClause:
      'Section 9. Limitation of Liability. (a) Cap on Direct Damages. EXCEPT FOR EXCLUDED CLAIMS (SECTION 9(c)), EACH PARTY’S MAXIMUM AGGREGATE LIABILITY ARISING OUT OF OR RELATING TO THIS AGREEMENT WILL BE LIMITED TO THE TOTAL FEES PAID OR PAYABLE BY CUSTOMER UNDER THIS AGREEMENT IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO LIABILITY.\n\n(b) Waiver of Consequential Damages. EXCEPT FOR EXCLUDED CLAIMS, NEITHER PARTY WILL BE LIABLE TO THE OTHER FOR ANY INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES, OR LOST PROFITS, LOSS OF USE, OR BUSINESS INTERRUPTION, WHETHER IN CONTRACT, TORT, OR OTHERWISE.\n\n(c) Excluded Claims. "Excluded Claims" means any claim arising from: (i) either party’s indemnification obligations under Section 10; (ii) breach of confidentiality obligations under Section 8; or (iii) gross negligence or willful misconduct.',
    attorneyCommentary:
      'Common Paper CSA Section 9 establishes strict mutual reciprocity. A 12-month fees lookback cap is the global standard for SaaS procurement. Token caps ($100) or unilateral caps create existential asymmetry for the customer.',
  },
  {
    category: 'INDEMNIFICATION',
    standardName: 'Common Paper Cloud Service Agreement v1.0',
    sectionRef: 'Section 10 (Indemnification)',
    balancedPrinciple:
      'Mutual indemnification: Provider defends Customer against third-party intellectual property infringement claims. Customer defends Provider against illegal or infringing Customer Data.',
    predatoryPatterns: [
      {
        pattern: /customer\s+shall\s+defend.{0,50}indemnify.{0,50}hold\s+harmless.{0,150}(?:any\s+and\s+all\s+claims|regardless\s+of\s+cause|arising\s+from\s+use)/i,
        issue: 'Broad, one-sided indemnity requiring Customer to hold Vendor harmless for ordinary system use.',
        severity: 'CRITICAL',
        penaltyScore: 35,
      },
      {
        pattern: /provider\s+disclaims\s+(?:all\s+)?indemnif(?:y|ication)|no\s+obligation\s+to\s+indemnify/i,
        issue: 'Complete absence of vendor IP infringement indemnification, exposing Customer to copyright/patent lawsuits.',
        severity: 'CRITICAL',
        penaltyScore: 30,
      },
      {
        pattern: /indemnify.{0,80}(?:including\s+negligence\s+of\s+provider|sole\s+negligence)/i,
        issue: 'Landmine clause requiring Customer to indemnify Vendor even for Vendor’s own negligence.',
        severity: 'CRITICAL',
        penaltyScore: 40,
      },
    ],
    standardFallbackClause:
      'Section 10. Indemnification. (a) By Provider. Provider will defend Customer and its officers, directors, and employees against any third-party claim, suit, or proceeding alleging that the Cloud Service infringes or misappropriates any third-party patent, copyright, trademark, or trade secret, and Provider will indemnify Customer for damages, costs, and reasonable attorney fees finally awarded against Customer.\n\n(b) By Customer. Customer will defend Provider against any third-party claim alleging that Customer Data infringes a third-party intellectual property right or violates applicable privacy law.\n\n(c) Procedures. The indemnified party must: (i) provide prompt written notice of the claim; (ii) grant sole control of defense and settlement (subject to no admission of liability without consent); and (iii) provide reasonable cooperation at indemnifying party’s expense.',
    attorneyCommentary:
      'A software vendor must stand behind the intellectual property of their service. Never accept a SaaS contract where the vendor disclaims IP defense, or where customer indemnifies vendor for vendor’s own operational negligence.',
  },
  {
    category: 'TERM_AND_RENEWAL',
    standardName: 'Common Paper Cloud Service Agreement v1.0',
    sectionRef: 'Section 11 (Term & Termination)',
    balancedPrinciple:
      'Subscription automatically renews unless either party gives at least 30 days prior written notice. Automatic price hikes capped or subject to renegotiation.',
    predatoryPatterns: [
      {
        pattern: /(?:sixty|ninety|60|90)\s+(?:calendar\s+)?days.{0,50}(?:prior\s+to|before\s+renewal|written\s+notice)/i,
        issue: 'Auto-renewal trap: Requires 60 to 90 days advance written notice to cancel, designed to lock in unintended renewals.',
        severity: 'HIGH',
        penaltyScore: 25,
      },
      {
        pattern: /increase\s+fees.{0,50}(?:at\s+any\s+time|sole\s+discretion|by\s+(?:15%|20%|25%))/i,
        issue: 'Unilateral uncontrolled price escalation on renewal without customer termination rights.',
        severity: 'HIGH',
        penaltyScore: 20,
      },
      {
        pattern: /no\s+right\s+to\s+terminate\s+for\s+convenience|early\s+termination\s+fee\s+equal\s+to\s+remaining/i,
        issue: 'Draconian early termination acceleration clause requiring 100% payout of unaccrued future contract years.',
        severity: 'MEDIUM',
        penaltyScore: 15,
      },
    ],
    standardFallbackClause:
      'Section 11. Term, Renewal & Termination. (a) Term. The initial subscription term begins on the Effective Date and continues for twelve (12) months. This Agreement will automatically renew for successive twelve (12) month periods unless either party provides written notice of non-renewal at least thirty (30) days prior to the expiration of the then-current term.\n\n(b) Price Adjustments. Any price adjustment upon renewal shall not exceed 5% of the prior term fees and requires at least sixty (60) days prior written notice from Provider.\n\n(c) Termination for Cause. Either party may terminate this Agreement immediately upon written notice if the other party materially breaches this Agreement and fails to cure such breach within thirty (30) days of receipt of written notice.',
    attorneyCommentary:
      '30-day notice is standard across modern enterprise SaaS. 60 or 90 day auto-renewal windows are procurement traps designed to force annual renewals on customers who missed a calendar reminder 3 months before year end.',
  },
  {
    category: 'IP_AND_DATA_OWNERSHIP',
    standardName: 'Common Paper Cloud Service Agreement v1.0',
    sectionRef: 'Section 6 (Customer Data & IP)',
    balancedPrinciple:
      'Customer owns all Customer Data and confidential inputs. Vendor receives limited right to host and transmit data solely to deliver the service. Feedback is licensed non-exclusively without transferring underlying IP.',
    predatoryPatterns: [
      {
        pattern: /(?:provider|vendor)\s+shall\s+own\s+all\s+(?:right,\s+title,\s+and\s+interest|intellectual\s+property).{0,80}(?:feedback|suggestions|customer\s+data)/i,
        issue: 'Predatory IP assignment: Vendor claims permanent ownership over customer feedback, derivative workflows, or configurations.',
        severity: 'CRITICAL',
        penaltyScore: 35,
      },
      {
        pattern: /unrestricted,\s+irrevocable,\s+perpetual,\s+royalty-free\s+license\s+to\s+(?:use|monetize|commercialize)\s+customer\s+data/i,
        issue: 'Vendor grabs irrevocable perpetual rights to commercialize or monetize confidential Customer Data.',
        severity: 'CRITICAL',
        penaltyScore: 35,
      },
      {
        pattern: /train(?:ing)?\s+(?:our|machine\s+learning|ai|foundation)\s+models.{0,60}without\s+compensation/i,
        issue: 'Undisclosed AI model training on customer confidential data without explicit opt-in or governance controls.',
        severity: 'HIGH',
        penaltyScore: 25,
      },
    ],
    standardFallbackClause:
      'Section 6. Intellectual Property & Customer Data. (a) Customer Data. As between the parties, Customer owns all right, title, and interest in and to Customer Data. Customer grants Provider a non-exclusive, non-transferable, royalty-free license to host, copy, and transmit Customer Data solely to the extent necessary to provide the Cloud Service to Customer under this Agreement.\n\n(b) AI & Model Training. Provider will not use Customer Data (including prompts, inputs, or generated outputs) to train, refine, or fine-tune any general-purpose artificial intelligence or machine learning models without Customer’s express prior written consent.\n\n(c) Feedback. If Customer provides feedback or suggestions regarding the Cloud Service, Customer grants Provider a non-exclusive, perpetual, irrevocable, royalty-free license to use such feedback without restriction, provided that Provider does not identify Customer as the source.',
    attorneyCommentary:
      'Startups must protect their proprietary data from being absorbed into vendor training sets or IP claims. Common Paper explicitly restricts data usage strictly to service provision.',
  },
  {
    category: 'WARRANTIES_AND_SLA',
    standardName: 'Common Paper Cloud Service Agreement v1.0',
    sectionRef: 'Section 7 (Warranties & Remedies)',
    balancedPrinciple:
      'Vendor warrants the software will operate in material conformity with documentation and applicable uptime SLAs. Remedies include cure, service credits, or pro-rata refund.',
    predatoryPatterns: [
      {
        pattern: /service\s+is\s+provided\s+"as\s+is"\s+and\s+"as\s+available"\s+without\s+warranties\s+of\s+any\s+kind/i,
        issue: 'Total "AS IS" disclaimer in a paid enterprise contract, disclaiming even basic operational functionality.',
        severity: 'MEDIUM',
        penaltyScore: 20,
      },
      {
        pattern: /disclaims\s+all\s+warranties.{0,50}including\s+without\s+limitation\s+merchantability/i,
        issue: 'Blanket disclaimer of all warranties without any performance standard or uptime guarantee.',
        severity: 'MEDIUM',
        penaltyScore: 15,
      },
    ],
    standardFallbackClause:
      'Section 7. Warranties & Remedies. (a) Performance Warranty. Provider warrants that during the subscription term, the Cloud Service will operate in all material respects in accordance with the applicable Documentation.\n\n(b) Remedy. If Provider breaches Section 7(a), Customer must notify Provider in writing within thirty (30) days of the breach. Provider will, at its option and expense: (i) modify the Cloud Service so it conforms to the warranty; or (ii) provide a workaround. If Provider cannot achieve either within thirty (30) days of notice, Customer may terminate this Agreement and receive a pro-rata refund of any prepaid, unused fees.',
    attorneyCommentary:
      'In a paid B2B agreement, "AS IS" disclaimers without performance warranties are unacceptable. Customers are paying for reliable software and deserve a clear remedy if the service fails to function.',
  },
  {
    category: 'GOVERNING_LAW_AND_DISPUTES',
    standardName: 'Common Paper Cloud Service Agreement v1.0',
    sectionRef: 'Section 13 (Governing Law & Disputes)',
    balancedPrinciple:
      'Neutral commercial jurisdiction (e.g. Delaware or mutual state), mutual waiver of jury trial, and bilateral attorney fees only if prevailing party.',
    predatoryPatterns: [
      {
        pattern: /customer\s+shall\s+pay\s+all\s+(?:attorney(?:'s)?\s+fees|legal\s+costs)\s+incurred\s+by\s+provider/i,
        issue: 'Unilateral attorney fee shifting: Customer pays vendor legal fees regardless of who prevails.',
        severity: 'HIGH',
        penaltyScore: 25,
      },
      {
        pattern: /exclusive\s+jurisdiction.{0,50}(?:foreign|offshore|distant|unfavorable)/i,
        issue: 'Asymmetric or foreign venue selection designed to make dispute litigation prohibitively expensive.',
        severity: 'MEDIUM',
        penaltyScore: 15,
      },
    ],
    standardFallbackClause:
      'Section 13. Governing Law & Dispute Resolution. This Agreement will be governed by the laws of the State of Delaware, without regard to its conflict of laws principles. The parties consent to the personal jurisdiction and exclusive venue of the state and federal courts located in New Castle County, Delaware. In any dispute arising out of this Agreement, the prevailing party shall be entitled to recover its reasonable attorney fees and costs.',
    attorneyCommentary:
      'Fee-shifting must always be mutual to the prevailing party. Never agree to a clause where one party pays the other party’s legal fees simply upon demand.',
  },
];
