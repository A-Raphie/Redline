'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Check, RotateCcw, AlertTriangle, Sparkles, Scale, Info } from 'lucide-react';
import { Clause, ClauseCategory, DiffPart } from '../lib/types';
import { computeClauseDiff } from '../lib/engine/redlineGenerator';

interface SplitRedlineViewerProps {
  clauses: Clause[];
  selectedCategory: ClauseCategory | 'ALL';
  onToggleAccept: (clauseId: string) => void;
  onInspectClause: (clause: Clause) => void;
}

export const SplitRedlineViewer: React.FC<SplitRedlineViewerProps> = ({
  clauses,
  selectedCategory,
  onToggleAccept,
  onInspectClause,
}) => {
  const [expandedDiffs, setExpandedDiffs] = useState<Record<string, boolean>>({});

  const toggleExpand = (clauseId: string) => {
    setExpandedDiffs((prev) => ({
      ...prev,
      [clauseId]: !prev[clauseId],
    }));
  };

  const filteredClauses =
    selectedCategory === 'ALL' ? clauses : clauses.filter((c) => c.category === selectedCategory);

  const renderDiffText = (original: string, replacement: string) => {
    const diffParts: DiffPart[] = computeClauseDiff(original, replacement);

    return (
      <div className="leading-relaxed text-xs legal-mono space-y-1 break-words">
        {diffParts.map((part, idx) => {
          if (part.type === 'delete') {
            return (
              <span
                key={idx}
                className="bg-[var(--diff-del-bg)] text-[var(--diff-del-text)] line-through px-1 py-0.5 rounded-sm mr-0.5 border-b border-[var(--diff-del-border)]"
              >
                {part.value}
              </span>
            );
          }
          if (part.type === 'insert') {
            return (
              <span
                key={idx}
                className="bg-[var(--diff-ins-bg)] text-[var(--diff-ins-text)] underline px-1 py-0.5 rounded-sm mr-0.5 font-semibold border-b border-[var(--diff-ins-border)]"
              >
                {part.value}
              </span>
            );
          }
          return <span key={idx} className="text-[var(--text-secondary)]">{part.value}</span>;
        })}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
          Contract Clauses ({filteredClauses.length})
        </h3>
        <span className="text-[11px] text-[var(--text-muted)]">
          Plain-English breakdown with 1-click standard fixes
        </span>
      </div>

      {filteredClauses.map((clause) => {
        const isPredatory = clause.riskLevel === 'CRITICAL' || clause.riskLevel === 'HIGH';
        const isExpanded = !!expandedDiffs[clause.id];

        return (
          <div
            key={clause.id}
            className={`paper-card p-4 sm:p-5 transition-all shadow-xs ${
              isPredatory ? 'border-l-4 border-l-[var(--diff-del-border)]' : 'border-l-4 border-l-[var(--diff-ins-border)]'
            }`}
          >
            {/* Header with Title and 1-Click Fix Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border-default)]">
              <div className="flex items-center space-x-2 min-w-0 flex-1">
                <span
                  className={`text-[10px] font-bold legal-mono px-2 py-0.5 rounded-md border shrink-0 ${
                    clause.riskLevel === 'CRITICAL'
                      ? 'bg-[var(--diff-del-bg)] text-[var(--diff-del-text)] border-[var(--diff-del-border)]'
                      : clause.riskLevel === 'HIGH'
                      ? 'bg-[var(--risk-high-bg)] text-[var(--risk-high)] border-[var(--risk-high-border)]'
                      : 'bg-[var(--diff-ins-bg)] text-[var(--diff-ins-text)] border-[var(--diff-ins-border)]'
                  }`}
                >
                  {clause.riskLevel} RISK
                </span>

                <h4 className="text-sm font-bold text-[var(--text-primary)] break-words leading-tight">
                  {clause.sectionNumber ? `${clause.sectionNumber}: ` : ''}
                  {clause.title}
                </h4>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 self-start sm:self-auto flex-wrap gap-y-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => onInspectClause(clause)}
                  className="text-xs px-2.5 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-all flex items-center space-x-1 cursor-pointer"
                >
                  <Info className="w-3 h-3 text-[var(--brand)]" />
                  <span>Why This Matters</span>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleAccept(clause.id)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center space-x-1 shadow-xs cursor-pointer ${
                    clause.isAccepted
                      ? 'bg-[var(--diff-ins-bg)] text-[var(--diff-ins-text)] border border-[var(--diff-ins-border)]'
                      : 'bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {clause.isAccepted ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Standard Fix Applied</span>
                    </>
                  ) : (
                    <>
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Keep Vendor Clause</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Human-First Plain English Breakdown */}
            <div className="mt-4 space-y-3">
              {/* Problem in Plain English */}
              {clause.issues.length > 0 && (
                <div className="p-3.5 rounded-xl bg-[var(--diff-del-bg)]/40 border border-[var(--diff-del-border)]/50">
                  <div className="text-xs font-bold text-[var(--diff-del-text)] flex items-center mb-1">
                    <AlertTriangle className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                    <span>The Problem in Plain English:</span>
                  </div>
                  <ul className="text-xs text-[var(--text-primary)] space-y-1 pl-5 list-disc leading-relaxed">
                    {clause.issues.map((issue, idx) => (
                      <li key={idx}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Proposed Solution in Plain English */}
              <div className="p-3.5 rounded-xl bg-[var(--diff-ins-bg)]/40 border border-[var(--diff-ins-border)]/50">
                <div className="text-xs font-bold text-[var(--diff-ins-text)] flex items-center mb-1">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                  <span>The Fair Fix ({clause.standardReference}):</span>
                </div>
                <p className="text-xs text-[var(--text-primary)] leading-relaxed pl-5">
                  {clause.recommendation}
                </p>
              </div>
            </div>

            {/* Progressive Disclosure: Accordion for Lawyer/Judge Legal Diff & Rationale */}
            <div className="mt-4 pt-3 border-t border-[var(--border-default)]">
              <button
                type="button"
                onClick={() => toggleExpand(clause.id)}
                aria-expanded={isExpanded}
                aria-controls={`diff-${clause.id}`}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center space-x-1 font-semibold transition-colors cursor-pointer"
              >
                <span>{isExpanded ? 'Hide legal wording & redline diff' : 'Show legal wording & redline diff'}</span>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {isExpanded && (
                <div id={`diff-${clause.id}`} className="mt-3 space-y-3 animate-in fade-in duration-150">
                  {/* Embedded Legal Context & Leverage Box */}
                  <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-subtle)]/40 p-3 text-xs">
                    <div className="flex items-center space-x-1.5 font-bold text-[var(--text-primary)] mb-1">
                      <Scale className="w-3.5 h-3.5 text-[var(--brand)]" />
                      <span>Negotiation Leverage Point ({clause.standardReference})</span>
                    </div>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                      Remind the vendor that Common Paper standard terms reflect balanced market consensus adopted by thousands of technology companies. Asking for mutual liability caps and standard renewal windows is standard enterprise hygiene, not an aggressive pushback.
                    </p>
                  </div>

                  {/* Side-by-Side Wording Comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Original Legal Clause */}
                    <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] p-3.5 overflow-hidden">
                      <div className="text-[10px] uppercase font-bold text-[var(--text-muted)] mb-1.5">
                        Incoming Contract Wording
                      </div>
                      <div className="text-xs legal-serif text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap break-words">
                        {clause.originalText}
                      </div>
                    </div>

                    {/* Redline Diff */}
                    <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] p-3.5 overflow-hidden">
                      <div className="text-[10px] uppercase font-bold text-[var(--diff-ins-text)] mb-1.5">
                        Proposed Redline (Common Paper)
                      </div>
                      {clause.isAccepted && clause.proposedFallback !== clause.originalText ? (
                        renderDiffText(clause.originalText, clause.proposedFallback)
                      ) : (
                        <div className="text-xs legal-serif text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap break-words">
                          {clause.originalText}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
