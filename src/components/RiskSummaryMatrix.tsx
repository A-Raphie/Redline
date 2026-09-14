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
        return { bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', label: 'Balanced & Standard' };
      case 'B':
        return { bg: 'bg-blue-500/10 text-blue-400 border-blue-500/30', label: 'Low Exposure' };
      case 'C':
        return { bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30', label: 'Moderate Exposure' };
      case 'D':
        return { bg: 'bg-orange-500/10 text-orange-400 border-orange-500/30', label: 'High Unilateral Risk' };
      case 'F':
      default:
        return { bg: 'bg-red-500/15 text-red-400 border-red-500/40', label: 'Critical Asymmetric Traps' };
    }
  };

  const getRiskIcon = (level: RiskLevel) => {
    switch (level) {
      case 'CRITICAL':
        return <ShieldAlert className="w-3.5 h-3.5 text-red-400" />;
      case 'HIGH':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />;
      case 'MEDIUM':
        return <HelpCircle className="w-3.5 h-3.5 text-blue-400" />;
      case 'LOW':
      case 'FAIR':
      default:
        return <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  const gradeInfo = getGradeBadge(report.grade);

  return (
    <div className="bg-[var(--panel)] border border-[var(--line)] rounded-xl p-5 mb-8 shadow-sm">
      {/* Top Banner: Overall Score & Letter Grade */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-5 border-b border-[var(--line)] gap-4">
        <div className="flex items-center space-x-4">
          {/* Big Letter Grade Stamp */}
          <div
            className={`w-16 h-16 rounded-lg border-2 flex flex-col items-center justify-center font-bold legal-mono ${gradeInfo.bg} shadow-inner`}
          >
            <span className="text-3xl leading-none">{report.grade}</span>
            <span className="text-[9px] uppercase tracking-wider mt-0.5 font-semibold">GRADE</span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-[var(--ink)] leading-snug">{report.contractTitle}</h2>
              <span className={`text-[11px] px-2 py-0.5 rounded border font-medium ${gradeInfo.bg}`}>
                {gradeInfo.label}
              </span>
            </div>
            <p className="text-xs text-[var(--ink-secondary)] mt-1 max-w-2xl leading-relaxed">
              {report.verdict}
            </p>
          </div>
        </div>

        {/* Audit Numbers */}
        <div className="flex items-center space-x-4 self-stretch md:self-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-[var(--line)]">
          <div className="text-right">
            <div className="text-xs text-[var(--ink-muted)]">Benchmark Standard</div>
            <div className="text-xs font-medium text-[var(--accent-gold)]">{report.benchmarkStandard}</div>
          </div>

          <div className="h-8 w-px bg-[var(--line)] hidden sm:block" />

          <div className="text-right">
            <div className="text-xs text-[var(--ink-muted)]">Flagged Clauses</div>
            <div className="text-xs font-bold text-red-400">
              {report.flaggedClauses} / {report.totalClauses}
            </div>
          </div>

          <div className="h-8 w-px bg-[var(--line)] hidden sm:block" />

          <div className="text-right">
            <div className="text-xs text-[var(--ink-muted)]">Fairness Score</div>
            <div className="text-xs font-bold text-[var(--ink)] font-mono">{report.overallScore}/100</div>
          </div>
        </div>
      </div>

      {/* Category Risk Grid */}
      <div className="mt-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Layers className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            <span className="text-xs font-semibold text-[var(--ink)] uppercase tracking-wider">
              Category Risk Scorecard
            </span>
          </div>

          {/* Filter Reset */}
          {selectedCategory !== 'ALL' && (
            <button
              type="button"
              onClick={() => onSelectCategory('ALL')}
              className="text-xs text-[var(--accent-gold)] hover:underline flex items-center"
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
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[var(--surface-hover)] border-[var(--accent-gold)] shadow-md'
                    : 'bg-[var(--surface)] border-[var(--line)] hover:border-[var(--line-highlight)]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-[var(--ink)] flex items-center space-x-1.5">
                    {getRiskIcon(cat.riskLevel)}
                    <span className="truncate">{cat.label}</span>
                  </span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                      cat.flaggedCount > 0
                        ? 'bg-red-500/10 text-red-400 border-red-500/30'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    }`}
                  >
                    {cat.flaggedCount > 0 ? `${cat.flaggedCount} Flagged` : 'Standard'}
                  </span>
                </div>

                <p className="text-[11px] text-[var(--ink-secondary)] line-clamp-2 leading-relaxed mb-2">
                  {cat.description}
                </p>

                <div className="text-[10px] text-[var(--ink-muted)] pt-1.5 border-t border-[var(--line)]/60 flex items-center justify-between">
                  <span className="truncate text-amber-300/80">⚠️ {cat.commonTrap}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
