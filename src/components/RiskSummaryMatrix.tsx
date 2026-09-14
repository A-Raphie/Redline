'use client';

import React from 'react';
import { AlertCircle, CheckCircle, ShieldAlert, Filter } from 'lucide-react';
import { AuditReport, ClauseCategory } from '../lib/types';

interface RiskSummaryMatrixProps {
  report: AuditReport;
  selectedCategory: ClauseCategory | 'ALL';
  onSelectCategory: (category: ClauseCategory | 'ALL') => void;
}

export const RiskSummaryMatrix: React.FC<RiskSummaryMatrixProps> = ({
  report,
  selectedCategory,
  onSelectCategory,
}) => {
  const isDangerous = report.grade === 'F' || report.grade === 'D';

  return (
    <div className="paper-card p-5 mb-8">
      {/* Top Reassuring Verdict */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-default)]">
        <div className="flex items-center space-x-4">
          {/* Grade Stamp */}
          <div
            className={`w-14 h-14 rounded-xl border flex flex-col items-center justify-center font-bold legal-mono ${
              isDangerous
                ? 'bg-[var(--diff-del-bg)] text-[var(--diff-del-text)] border-[var(--diff-del-border)]'
                : 'bg-[var(--diff-ins-bg)] text-[var(--diff-ins-text)] border-[var(--diff-ins-border)]'
            }`}
          >
            <span className="text-2xl leading-none">{report.grade}</span>
            <span className="text-[8px] uppercase tracking-wider font-bold mt-0.5">GRADE</span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-[var(--text-primary)]">{report.contractTitle}</h2>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  isDangerous
                    ? 'bg-[var(--diff-del-bg)] text-[var(--diff-del-text)]'
                    : 'bg-[var(--diff-ins-bg)] text-[var(--diff-ins-text)]'
                }`}
              >
                {report.flaggedClauses > 0 ? `${report.flaggedClauses} Traps Flagged` : 'Fair Agreement'}
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-2xl leading-relaxed">
              {report.verdict}
            </p>
          </div>
        </div>

        {/* Quick Numbers */}
        <div className="flex items-center space-x-4 self-start sm:self-auto text-xs text-[var(--text-muted)]">
          <div>
            <span className="font-bold text-[var(--text-primary)] text-sm">{report.flaggedClauses}</span> of{' '}
            {report.totalClauses} clauses need changes
          </div>
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

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onSelectCategory('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedCategory === 'ALL'
                ? 'bg-[var(--brand)] text-[var(--accent-foreground)] shadow-xs'
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
                      ? 'bg-[var(--brand)] text-[var(--accent-foreground)] shadow-xs'
                      : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-default)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  <span>{cat.label}</span>
                  {cat.flaggedCount > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isSelected
                          ? 'bg-[var(--accent-foreground)] text-[var(--brand)]'
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
