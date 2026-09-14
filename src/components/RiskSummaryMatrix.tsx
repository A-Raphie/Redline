'use client';

import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, HelpCircle, Layers, Filter } from 'lucide-react';
import { AuditReport, ClauseCategory, RiskLevel } from '../lib/types';

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
  const getGradeBadge = (grade: string) => {
    switch (grade) {
      case 'A':
        return {
          bg: 'bg-[var(--risk-low-bg)] text-[var(--risk-low)] border-[var(--risk-low-border)]',
          label: 'Balanced & Standard',
        };
      case 'B':
        return {
          bg: 'bg-[var(--risk-medium-bg)] text-[var(--risk-medium)] border-[var(--risk-medium-border)]',
          label: 'Low Exposure',
        };
      case 'C':
        return {
          bg: 'bg-[var(--risk-high-bg)] text-[var(--risk-high)] border-[var(--risk-high-border)]',
          label: 'Moderate Exposure',
        };
      case 'D':
        return {
          bg: 'bg-[var(--risk-high-bg)] text-[var(--risk-high)] border-[var(--risk-high-border)]',
          label: 'High Unilateral Risk',
        };
      case 'F':
      default:
        return {
          bg: 'bg-[var(--diff-del-bg)] text-[var(--diff-del-text)] border-[var(--diff-del-border)]',
          label: 'Critical Asymmetric Traps',
        };
    }
  };

  const getRiskIcon = (level: RiskLevel) => {
    switch (level) {
      case 'CRITICAL':
        return <ShieldAlert className="w-3.5 h-3.5 text-[var(--risk-critical)]" />;
      case 'HIGH':
        return <AlertTriangle className="w-3.5 h-3.5 text-[var(--risk-high)]" />;
      case 'MEDIUM':
        return <HelpCircle className="w-3.5 h-3.5 text-[var(--risk-medium)]" />;
      case 'LOW':
      case 'FAIR':
      default:
        return <CheckCircle className="w-3.5 h-3.5 text-[var(--risk-low)]" />;
    }
  };

  const gradeInfo = getGradeBadge(report.grade);

  return (
    <div className="paper-card p-5 mb-8">
      {/* Top Banner: Overall Score & Letter Grade */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-5 border-b border-[var(--border-default)] gap-4">
        <div className="flex items-center space-x-4">
          {/* Big Letter Grade Stamp */}
          <div
            className={`w-16 h-16 rounded-xl border-2 flex flex-col items-center justify-center font-bold legal-mono ${gradeInfo.bg} shadow-xs`}
          >
            <span className="text-3xl leading-none">{report.grade}</span>
            <span className="text-[9px] uppercase tracking-wider mt-0.5 font-bold">GRADE</span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-[var(--text-primary)] leading-snug">{report.contractTitle}</h2>
              <span className={`text-[11px] px-2 py-0.5 rounded-md border font-semibold ${gradeInfo.bg}`}>
                {gradeInfo.label}
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-2xl leading-relaxed">
              {report.verdict}
            </p>
          </div>
        </div>

        {/* Audit Numbers */}
        <div className="flex items-center space-x-5 self-stretch md:self-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-[var(--border-default)]">
          <div className="text-right">
            <div className="text-[11px] text-[var(--text-muted)] font-medium">Benchmark Standard</div>
            <div className="text-xs font-bold text-[var(--brand)]">{report.benchmarkStandard}</div>
          </div>

          <div className="h-8 w-px bg-[var(--border-default)] hidden sm:block" />

          <div className="text-right">
            <div className="text-[11px] text-[var(--text-muted)] font-medium">Flagged Clauses</div>
            <div className="text-xs font-bold text-[var(--diff-del-text)] tabular-num">
              {report.flaggedClauses} / {report.totalClauses}
            </div>
          </div>

          <div className="h-8 w-px bg-[var(--border-default)] hidden sm:block" />

          <div className="text-right">
            <div className="text-[11px] text-[var(--text-muted)] font-medium">Fairness Score</div>
            <div className="text-xs font-bold text-[var(--text-primary)] legal-mono tabular-num">
              {report.overallScore}/100
            </div>
          </div>
        </div>
      </div>

      {/* Category Risk Grid */}
      <div className="mt-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Layers className="w-3.5 h-3.5 text-[var(--brand)]" />
            <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
              Category Risk Scorecard
            </span>
          </div>

          {/* Filter Reset */}
          {selectedCategory !== 'ALL' && (
            <button
              type="button"
              onClick={() => onSelectCategory('ALL')}
              className="text-xs text-[var(--brand)] hover:underline flex items-center font-medium"
            >
              <Filter className="w-3 h-3 mr-1" />
              Showing filtered category (Click to show all)
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {report.categories.map((cat) => {
            const isSelected = selectedCategory === cat.category;
            return (
              <div
                key={cat.category}
                onClick={() => onSelectCategory(isSelected ? 'ALL' : cat.category)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[var(--bg-subtle)] border-[var(--border-strong)] shadow-sm'
                    : 'bg-[var(--bg-surface)] border-[var(--border-default)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-subtle)]/40 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-[var(--text-primary)] flex items-center space-x-1.5">
                    {getRiskIcon(cat.riskLevel)}
                    <span className="truncate">{cat.label}</span>
                  </span>
                  <span
                    className={`text-[10px] legal-mono px-1.5 py-0.5 rounded-md border font-semibold ${
                      cat.flaggedCount > 0
                        ? 'bg-[var(--diff-del-bg)] text-[var(--diff-del-text)] border-[var(--diff-del-border)]'
                        : 'bg-[var(--diff-ins-bg)] text-[var(--diff-ins-text)] border-[var(--diff-ins-border)]'
                    }`}
                  >
                    {cat.flaggedCount > 0 ? `${cat.flaggedCount} Flagged` : 'Standard'}
                  </span>
                </div>

                <p className="text-[11px] text-[var(--text-secondary)] line-clamp-2 leading-relaxed mb-2">
                  {cat.description}
                </p>

                <div className="text-[10px] text-[var(--text-muted)] pt-1.5 border-t border-[var(--border-default)] flex items-center justify-between">
                  <span className="truncate text-[var(--risk-high)] font-medium">⚠️ {cat.commonTrap}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
