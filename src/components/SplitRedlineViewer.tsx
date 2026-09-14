'use client';

import React, { useState } from 'react';
import { Check, Info, AlertTriangle, Split, Eye, RotateCcw } from 'lucide-react';
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
  const [viewMode, setViewMode] = useState<'split' | 'unified'>('split');

  const filteredClauses =
    selectedCategory === 'ALL' ? clauses : clauses.filter((c) => c.category === selectedCategory);

  const renderDiffText = (original: string, replacement: string) => {
    const diffParts: DiffPart[] = computeClauseDiff(original, replacement);

    return (
      <div className="leading-relaxed text-xs legal-mono space-y-1">
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
    <div className="paper-card overflow-hidden">
      {/* Viewer Header */}
      <div className="px-5 py-3.5 border-b border-[var(--border-default)] bg-[var(--bg-subtle)]/70 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center">
            <Split className="w-3.5 h-3.5 mr-1.5 text-[var(--brand)]" />
            Interactive Redline Workbench ({filteredClauses.length} Clauses)
          </h3>
          <span className="text-[11px] text-[var(--text-muted)] hidden sm:inline">
            Side-by-side comparison against Common Paper standard terms
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg p-0.5 text-xs shadow-xs">
          <button
            type="button"
            onClick={() => setViewMode('split')}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center space-x-1 ${
              viewMode === 'split'
                ? 'bg-[var(--bg-subtle)] text-[var(--text-primary)] font-semibold border border-[var(--border-strong)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Split className="w-3 h-3" />
            <span>Split View</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('unified')}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center space-x-1 ${
              viewMode === 'unified'
                ? 'bg-[var(--bg-subtle)] text-[var(--text-primary)] font-semibold border border-[var(--border-strong)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Unified Diff</span>
          </button>
        </div>
      </div>

      {/* Clause Rows */}
      <div className="divide-y divide-[var(--border-default)]">
        {filteredClauses.map((clause) => {
          const isPredatory = clause.riskLevel === 'CRITICAL' || clause.riskLevel === 'HIGH';

          return (
            <div
              key={clause.id}
              className={`p-5 transition-colors ${
                isPredatory ? 'bg-[var(--diff-del-bg)]/25' : 'hover:bg-[var(--bg-subtle)]/30'
              }`}
            >
              {/* Clause Header & Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-[var(--border-default)] gap-2">
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-[10px] font-bold legal-mono px-2 py-0.5 rounded-md border ${
                      clause.riskLevel === 'CRITICAL'
                        ? 'bg-[var(--diff-del-bg)] text-[var(--diff-del-text)] border-[var(--diff-del-border)]'
                        : clause.riskLevel === 'HIGH'
                        ? 'bg-[var(--risk-high-bg)] text-[var(--risk-high)] border-[var(--risk-high-border)]'
                        : 'bg-[var(--diff-ins-bg)] text-[var(--diff-ins-text)] border-[var(--diff-ins-border)]'
                    }`}
                  >
                    {clause.riskLevel} RISK
                  </span>

                  <span className="text-xs font-bold text-[var(--text-primary)]">
                    {clause.sectionNumber ? `${clause.sectionNumber}: ` : ''}
                    {clause.title}
                  </span>

                  <span className="text-[10px] text-[var(--text-muted)] legal-mono uppercase font-medium">
                    [{clause.category.replace(/_/g, ' ')}]
                  </span>
                </div>

                {/* Right Action Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => onInspectClause(clause)}
                    className="text-xs px-2.5 py-1 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-all flex items-center space-x-1 shadow-xs"
                  >
                    <Info className="w-3 h-3 text-[var(--brand)]" />
                    <span>Legal Commentary</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleAccept(clause.id)}
                    className={`text-xs px-3 py-1 rounded-lg font-semibold transition-all flex items-center space-x-1 shadow-xs ${
                      clause.isAccepted
                        ? 'bg-[var(--diff-ins-bg)] text-[var(--diff-ins-text)] border border-[var(--diff-ins-border)]'
                        : 'bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {clause.isAccepted ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Redline Applied</span>
                      </>
                    ) : (
                      <>
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Keep Original</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Traps Callout if flagged */}
              {clause.issues.length > 0 && (
                <div className="mb-3 p-3 rounded-lg bg-[var(--diff-del-bg)] border border-[var(--diff-del-border)] flex items-start space-x-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-[var(--diff-del-text)] shrink-0 mt-0.5" />
                  <div className="text-xs text-[var(--diff-del-text)] leading-relaxed">
                    <span className="font-bold">Flagged Traps: </span>
                    {clause.issues.join(' · ')}
                  </div>
                </div>
              )}

              {/* VIEW MODE 1: SPLIT VIEW */}
              {viewMode === 'split' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Left: Original Incoming Clause */}
                  <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 flex flex-col justify-between shadow-xs">
                    <div>
                      <div className="text-[10px] uppercase legal-mono tracking-wider text-[var(--text-muted)] mb-2 flex items-center justify-between border-b border-[var(--border-default)] pb-1.5">
                        <span>Original Inbound Text</span>
                        {isPredatory && <span className="text-[var(--diff-del-text)] font-semibold">⚠️ Predatory Terms</span>}
                      </div>
                      <div className="text-xs legal-serif text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap">
                        {clause.originalText}
                      </div>
                    </div>
                  </div>

                  {/* Right: Redline / Common Paper Replacement */}
                  <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 flex flex-col justify-between shadow-xs">
                    <div>
                      <div className="text-[10px] uppercase legal-mono tracking-wider text-[var(--brand)] mb-2 flex items-center justify-between border-b border-[var(--border-default)] pb-1.5">
                        <span className="font-semibold">
                          {clause.isAccepted ? 'Proposed Common Paper Redline' : 'Original Text Maintained'}
                        </span>
                        <span className="text-[var(--diff-ins-text)] font-semibold">
                          {clause.isAccepted ? 'Standard Aligned' : 'Unchanged'}
                        </span>
                      </div>

                      {clause.isAccepted && clause.proposedFallback !== clause.originalText ? (
                        renderDiffText(clause.originalText, clause.proposedFallback)
                      ) : (
                        <div className="text-xs legal-serif text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">
                          {clause.originalText}
                        </div>
                      )}
                    </div>

                    <div className="text-[10px] text-[var(--text-muted)] pt-2 mt-3 border-t border-[var(--border-default)] legal-mono">
                      Standard Reference: <span className="text-[var(--brand)] font-semibold">{clause.standardReference}</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* VIEW MODE 2: UNIFIED DIFF VIEW */
                <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 shadow-xs">
                  <div className="text-[10px] uppercase legal-mono tracking-wider text-[var(--brand)] mb-2 font-semibold">
                    Unified Redline (Strike-Throughs &amp; Insertions)
                  </div>
                  {clause.isAccepted && clause.proposedFallback !== clause.originalText ? (
                    renderDiffText(clause.originalText, clause.proposedFallback)
                  ) : (
                    <div className="text-xs legal-serif text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">
                      {clause.originalText}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
