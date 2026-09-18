import { AuditReport, CategorySummary, Clause, ClauseCategory, RiskLevel } from '../types';
import { COMMON_PAPER_CSA_RULES, StandardBenchmarkRule } from '../standards/commonPaperSaaS';
import { COMMON_PAPER_NDA_RULES } from '../standards/mutualNDA';
import { RawSegment, segmentContract } from './clauseSegmenter';

export function auditContract(
  contractTitle: string,
  rawText: string,
  standardType: 'SAAS_CSA' | 'MUTUAL_NDA' = 'SAAS_CSA'
): AuditReport {
  const segments: RawSegment[] = segmentContract(rawText);
  const benchmarkRules: StandardBenchmarkRule[] =
    standardType === 'SAAS_CSA'
      ? COMMON_PAPER_CSA_RULES
      : [...COMMON_PAPER_NDA_RULES, ...COMMON_PAPER_CSA_RULES];

  const auditedClauses: Clause[] = segments.map((seg) => auditSingleClause(seg, benchmarkRules));

  // Calculate scores and category breakdowns
  const flaggedClauses = auditedClauses.filter((c) => c.riskLevel !== 'FAIR' && c.riskLevel !== 'LOW');
  const totalPenalty = auditedClauses.reduce((acc, c) => acc + c.riskScore, 0);

  // Overall score: Starts at 100, drops with penalties
  const overallScore = Math.max(0, Math.min(100, Math.round(100 - totalPenalty)));

  let grade: 'A' | 'B' | 'C' | 'D' | 'F' = 'A';
  if (overallScore < 50) grade = 'F';
  else if (overallScore < 65) grade = 'D';
  else if (overallScore < 80) grade = 'C';
  else if (overallScore < 90) grade = 'B';

  let verdict = 'Balanced and aligned with open standard terms.';
  if (grade === 'F') {
    verdict = 'Predatory asymmetric contract. Critical liability, indemnification, or renewal traps detected.';
  } else if (grade === 'D') {
    verdict = 'High-risk one-sided terms requiring substantial redlining before execution.';
  } else if (grade === 'C') {
    verdict = 'Moderate risk with several non-standard vendor carveouts.';
  } else if (grade === 'B') {
    verdict = 'Minor deviations from standard terms; low commercial exposure.';
  }

  const categories = summarizeCategories(auditedClauses);

  return {
    contractTitle,
    totalClauses: auditedClauses.length,
    flaggedClauses: flaggedClauses.length,
    overallScore,
    grade,
    verdict,
    benchmarkStandard:
      standardType === 'SAAS_CSA'
        ? 'Common Paper Cloud Service Agreement v1.0'
        : 'Common Paper Mutual NDA v1.0',
    categories,
    clauses: auditedClauses,
    createdAt: new Date().toISOString(),
  };
}

function auditSingleClause(segment: RawSegment, rules: StandardBenchmarkRule[]): Clause {
  const matchingRule = rules.find((r) => r.category === segment.category);

  const issues: string[] = [];
  let riskScore = 0;
  let highestSeverity: RiskLevel = 'FAIR';

  if (matchingRule) {
    for (const patternRule of matchingRule.predatoryPatterns) {
      if (patternRule.pattern.test(segment.text)) {
        issues.push(patternRule.issue);
        riskScore += patternRule.penaltyScore;

        if (patternRule.severity === 'CRITICAL') {
          highestSeverity = 'CRITICAL';
        } else if (patternRule.severity === 'HIGH' && highestSeverity !== 'CRITICAL') {
          highestSeverity = 'HIGH';
        } else if (patternRule.severity === 'MEDIUM' && highestSeverity !== 'CRITICAL' && highestSeverity !== 'HIGH') {
          highestSeverity = 'MEDIUM';
        }
      }
    }
  }

  // Cap clause risk score at 50
  riskScore = Math.min(50, riskScore);

  const fallback = matchingRule ? matchingRule.standardFallbackClause : segment.text;
  const standardRef = matchingRule ? `${matchingRule.standardName} (${matchingRule.sectionRef})` : 'Standard Custom Terms';
  const recommendation = matchingRule
    ? issues.length > 0
      ? `Replace with ${matchingRule.standardName} ${matchingRule.sectionRef} to enforce ${matchingRule.balancedPrinciple.toLowerCase()}`
      : `Terms are acceptable; conforms to ${matchingRule.standardName}.`
    : 'Standard operational language.';

  return {
    id: segment.id,
    sectionNumber: segment.sectionNumber,
    title: segment.title,
    category: segment.category,
    originalText: segment.text,
    startIndex: segment.startIndex,
    endIndex: segment.endIndex,
    riskLevel: highestSeverity,
    riskScore,
    issues,
    recommendation,
    proposedFallback: fallback,
    standardReference: standardRef,
    isAccepted: issues.length > 0, // Default to accepted if predatory issues flagged
  };
}

const CATEGORY_LABELS: Record<ClauseCategory, { label: string; desc: string; trap: string }> = {
  LIMITATION_OF_LIABILITY: {
    label: 'Limitation of Liability',
    desc: 'Caps on direct and indirect damages, lookback windows, and excluded claims.',
    trap: 'Asymmetric or token $100 vendor cap while customer liability is unlimited.',
  },
  INDEMNIFICATION: {
    label: 'Indemnification & Defense',
    desc: 'Obligation to defend against 3rd-party claims (IP infringement, data breaches).',
    trap: 'Broad customer indemnification for ordinary use with zero vendor IP defense.',
  },
  TERM_AND_RENEWAL: {
    label: 'Term & Auto-Renewal',
    desc: 'Contract duration, auto-renewal notice windows, and early exit rights.',
    trap: '60 to 90-day cancellation trap windows designed to force unintended auto-renewals.',
  },
  IP_AND_DATA_OWNERSHIP: {
    label: 'IP & Data Ownership',
    desc: 'Ownership of customer data, confidential records, and feedback licensing.',
    trap: 'Vendor claiming ownership over customer feedback, derivative data, or AI training.',
  },
  WARRANTIES_AND_SLA: {
    label: 'Warranties & SLA',
    desc: 'Performance assurances, service uptime levels, and remedy procedures.',
    trap: 'Total "AS IS" disclaimer with zero performance warranty in a paid agreement.',
  },
  GOVERNING_LAW_AND_DISPUTES: {
    label: 'Governing Law & Legal Fees',
    desc: 'Jurisdiction, arbitration, and recovery of legal costs.',
    trap: 'Unilateral fee shifting forcing customer to pay vendor legal costs.',
  },
  FEES_AND_PAYMENT: {
    label: 'Fees & Payment',
    desc: 'Invoicing schedules, payment windows, late interest, and withholding restrictions.',
    trap: 'Predatory 60-90+ day payment delays or unilateral rights to withhold fees without penalty.',
  },
  GENERAL: {
    label: 'General Provisions',
    desc: 'Miscellaneous clauses, notices, and operational definitions.',
    trap: 'Restrictive covenants or stealth non-compete clauses.',
  },
};

function summarizeCategories(clauses: Clause[]): CategorySummary[] {
  const result: CategorySummary[] = [];

  const categories: ClauseCategory[] = [
    'LIMITATION_OF_LIABILITY',
    'INDEMNIFICATION',
    'TERM_AND_RENEWAL',
    'IP_AND_DATA_OWNERSHIP',
    'WARRANTIES_AND_SLA',
    'GOVERNING_LAW_AND_DISPUTES',
    'FEES_AND_PAYMENT',
  ];

  for (const cat of categories) {
    const matched = clauses.filter((c) => c.category === cat);
    const count = matched.length;
    const flagged = matched.filter((c) => c.riskLevel !== 'FAIR' && c.riskLevel !== 'LOW').length;

    let level: RiskLevel = 'FAIR';
    if (matched.some((c) => c.riskLevel === 'CRITICAL')) level = 'CRITICAL';
    else if (matched.some((c) => c.riskLevel === 'HIGH')) level = 'HIGH';
    else if (matched.some((c) => c.riskLevel === 'MEDIUM')) level = 'MEDIUM';
    else if (count === 0) level = 'LOW';

    const info = CATEGORY_LABELS[cat];

    result.push({
      category: cat,
      label: info.label,
      riskLevel: level,
      clausesCount: count,
      flaggedCount: flagged,
      description: info.desc,
      commonTrap: info.trap,
    });
  }

  return result;
}
