'use client';

import React from 'react';
import { AlertCircle, CheckCircle, ShieldAlert, Filter, Check, RotateCcw } from 'lucide-react';
import { AuditReport, ClauseCategory } from '../lib/types';

interface RiskSummaryMatrixProps {
  report: AuditReport;
  selectedCategory: ClauseCategory | 'ALL';
  onSelectCategory: (category: ClauseCategory | 'ALL') => void;
  onAcceptAll: (accept: boolean) => void;
}

export const RiskSummaryMatrix: React.FC<RiskSummaryMatrixProps> = ({
  report,
  selectedCategory,
  onSelectCategory,
  onAcceptAll,
}) => {
  const allAccepted = report.clauses.every((c) => c.isAccepted);
  const someAccepted = report.clauses.some((c) => c.isAccepted);
  const acceptedCount = report.clauses.filter((c) => c.isAccepted).length;
  const isFullyRemediated = allAccepted && report.flaggedClauses > 0;
  const isDangerous = !isFullyRemediated && (report.grade === 'F' || report.grade === 'D');

  const displayGrade = isFullyRemediated ? 'A' : report.grade;
  const displayStampLabel = isFullyRemediated ? 'REDLINED' : 'GRADE';
  const displayVerdict = isFullyRemediated
    ? 'All predatory terms remediated with open standards. Attorney-ready Word file with tracked changes is ready to export.'
    : report.verdict;

  return (
    <div className="paper-card p-4 sm:p-5 mb-8 shadow-xs min-w-0 max-w-full overflow-hidden">
      {/* Top Reassuring Verdict */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-default)] min-w-0 w-full">
        <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
          {/* Grade Stamp */}
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-xl border flex flex-col items-center justify-center font-bold legal-mono transition-all duration-200 ${
              isDangerous
                ? 'bg-[var(--diff-del-bg)] text-[var(--diff-del-text)] border-[var(--diff-del-border)]'
                : 'bg-[var(--diff-ins-bg)] text-[var(--diff-ins-text)] border-[var(--diff-ins-border)]'
            }`}
          >
            <span className="text-xl sm:text-2xl leading-none">{displayGrade}</span>
            <span className="text-[8px] uppercase tracking-wider font-bold mt-0.5">{displayStampLabel}</span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <h2 className="text-sm sm:text-base font-bold text-[var(--text-primary)] break-words leading-snug">
                {report.contractTitle}
              </h2>
              <span
                className={`text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full font-bold shrink-0 transition-colors ${
                  isFullyRemediated
                    ? 'bg-[var(--diff-ins-bg)] text-[var(--diff-ins-text)] border border-[var(--diff-ins-border)]'
                    : isDangerous
                    ? 'bg-[var(--diff-del-bg)] text-[var(--diff-del-text)]'
                    : 'bg-[var(--diff-ins-bg)] text-[var(--diff-ins-text)]'
                }`}
              >
                {isFullyRemediated
                  ? `✓ All ${report.flaggedClauses} Traps Remediated (Grade A)`
                  : report.flaggedClauses > 0
                  ? `${report.flaggedClauses} Traps Flagged`
                  : 'Fair Agreement'}
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-2xl leading-relaxed">
              {displayVerdict}
            </p>
          </div>
        </div>

        {/* Batch Action & Quick Numbers */}
        <div className="flex flex-col sm:items-end gap-2 shrink-0 w-full sm:w-auto">
          <div className="text-xs text-[var(--text-muted)] flex items-center justify-between sm:justify-end">
            <span>
              {isFullyRemediated ? (
                <span className="text-[var(--diff-ins-text)] font-semibold">
                  All {report.flaggedClauses} standard fixes active
                </span>
              ) : (
                <>
                  <span className="font-bold text-[var(--text-primary)] text-sm">{report.flaggedClauses}</span> of{' '}
                  {report.totalClauses} clauses need changes
                </>
              )}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onAcceptAll(!allAccepted)}
            className={`w-full sm:w-auto px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer ${
              allAccepted
                ? 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-default)]'
                : 'bg-[var(--brand)] text-[var(--accent-foreground)] hover:opacity-90'
            }`}
          >
            {allAccepted ? (
              <>
                <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                <span>Reset All to Vendor Terms</span>
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>Accept All Common Paper Fixes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
            Filter by Topic:
          </span>
          {selectedCategory !== 'ALL' && (
            <button
              type="button"
              onClick={() => onSelectCategory('ALL')}
              className="text-xs text-[var(--brand)] hover:underline font-semibold"
            >
              Show All Topics
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => onSelectCategory('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedCategory === 'ALL'
                ? 'bg-[var(--brand)] text-[var(--accent-foreground)] shadow-xs ring-1 ring-[var(--brand)]'
                : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-default)]'
            }`}
          >
            All Clauses ({report.clauses.length})
          </button>

          {report.categories
            .filter((c) => c.clausesCount > 0)
            .map((cat) => {
              const isSelected = selectedCategory === cat.category;
              return (
                <button
                  key={cat.category}
                  type="button"
                  onClick={() => onSelectCategory(isSelected ? 'ALL' : cat.category)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                    isSelected
                      ? 'bg-[var(--brand)] text-[var(--accent-foreground)] shadow-xs ring-1 ring-[var(--brand)]'
                      : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-default)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  <span>{cat.label}</span>
                  {cat.flaggedCount > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-[var(--diff-del-bg)] text-[var(--diff-del-text)]'
                      }`}
                    >
                      {cat.flaggedCount}
                    </span>
                  )}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};
