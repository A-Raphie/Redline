export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'FAIR';

export type ClauseCategory =
  | 'LIMITATION_OF_LIABILITY'
  | 'INDEMNIFICATION'
  | 'TERM_AND_RENEWAL'
  | 'IP_AND_DATA_OWNERSHIP'
  | 'WARRANTIES_AND_SLA'
  | 'GOVERNING_LAW_AND_DISPUTES'
  | 'FEES_AND_PAYMENT'
  | 'GENERAL';

export interface Clause {
  id: string;
  sectionNumber?: string;
  title: string;
  category: ClauseCategory;
  originalText: string;
  startIndex: number;
  endIndex: number;
  riskLevel: RiskLevel;
  riskScore: number; // 0-100 (100 = most predatory)
  issues: string[];
  recommendation: string;
  proposedFallback: string;
  standardReference: string; // e.g. "Common Paper CSA v1.0 § 9"
  isAccepted: boolean;
}

export interface DiffPart {
  type: 'equal' | 'delete' | 'insert';
  value: string;
}

export interface CategorySummary {
  category: ClauseCategory;
  label: string;
  riskLevel: RiskLevel;
  clausesCount: number;
  flaggedCount: number;
  description: string;
  commonTrap: string;
}

export interface AuditReport {
  contractTitle: string;
  totalClauses: number;
  flaggedClauses: number;
  overallScore: number; // 0-100 (100 = balanced/perfect, <50 = predatory)
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  verdict: string;
  benchmarkStandard: string;
  categories: CategorySummary[];
  clauses: Clause[];
  createdAt: string;
}

export interface SampleContract {
  id: string;
  title: string;
  type: 'SAAS_MSA' | 'MUTUAL_NDA' | 'SERVICES_AGREEMENT';
  description: string;
  targetVictim: string;
  predatorySummary: string;
  text: string;
}

export type StandardType = 'SAAS_CSA' | 'MUTUAL_NDA' | 'SERVICES_PSA';
