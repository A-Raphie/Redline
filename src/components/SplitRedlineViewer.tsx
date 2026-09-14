'use client';

import React, { useState } from 'react';
import { Check, X, Info, AlertTriangle, ShieldAlert, CheckCircle, Split, Eye, RotateCcw } from 'lucide-react';
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
      <div className="leading-relaxed text-xs font-mono space-y-1">
        {diffParts.map((part, idx) => {
          if (part.type === 'delete') {
            return (
              <span
                key={idx}
                className="bg-red-500/20 text-red-300 line-through px-0.5 rounded mr-0.5 border-b border-red-500/40"
              >
                {part.value}
              </span>
            );
          }
          if (part.type === 'insert') {
            return (
              <span
                key={idx}
                className="bg-emerald-500/20 text-emerald-300 underline px-0.5 rounded mr-0.5 font-medium border-b border-emerald-500/40"
              >
                {part.value}
              </span>
            );
          }
          return <span key={idx} className="text-[var(--ink-secondary)]">{part.value}</span>;
        })}
      </div>
    );
  };

  return (
    <div className="bg-[var(--panel)] border border-[var(--line)] rounded-xl overflow-hidden shadow-sm">
      {/* Viewer Header */}
      <div className="px-5 py-3.5 border-b border-[var(--line)] bg-[var(--surface)] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--ink)] flex items-center">
            <Split className="w-3.5 h-3.5 mr-1.5 text-[var(--accent-gold)]" />
            Interactive Redline Workbench ({filteredClauses.length} Clauses)
          </h3>
          <span className="text-[11px] text-[var(--ink-muted)] hidden sm:inline">
            Side-by-side comparison against Common Paper standard terms
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-[var(--background)] border border-[var(--line)] rounded-md p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setViewMode('split')}
            className={`px-2.5 py-1 rounded transition-colors flex items-center space-x-1 ${
              viewMode === 'split'
                ? 'bg-[var(--surface-hover)] text-[var(--ink)] font-medium border border-[var(--line-highlight)]'
                : 'text-[var(--ink-secondary)] hover:text-[var(--ink)]'
            }`}
          >
            <Split className="w-3 h-3" />
            <span>Split View</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('unified')}
            className={`px-2.5 py-1 rounded transition-colors flex items-center space-x-1 ${
              viewMode === 'unified'
                ? 'bg-[var(--surface-hover)] text-[var(--ink)] font-medium border border-[var(--line-highlight)]'
                : 'text-[var(--ink-secondary)] hover:text-[var(--ink)]'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Unified Diff</span>
          </button>
        </div>
      </div>

      {/* Clause Rows */}
      <div className="divide-y divide-[var(--line)]">
        {filteredClauses.map((clause) => {
          const isPredatory = clause.riskLevel === 'CRITICAL' || clause.riskLevel === 'HIGH';

          return (
            <div
              key={clause.id}
              className={`p-5 transition-colors ${
                isPredatory ? 'bg-red-500/[0.02]' : 'hover:bg-[var(--surface)]/40'
              }`}
            >
              {/* Clause Header & Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-[var(--line)]/50 gap-2">
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                      clause.riskLevel === 'CRITICAL'
                        ? 'bg-red-500/15 text-red-400 border-red-500/30'
                        : clause.riskLevel === 'HIGH'
                        ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                        : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                    }`}
                  >
                    {clause.riskLevel} RISK
                  </span>

                  <span className="text-xs font-semibold text-[var(--ink)]">
                    {clause.sectionNumber ? `${clause.sectionNumber}: ` : ''}
                    {clause.title}
                  </span>

                  <span className="text-[10px] text-[var(--ink-muted)] legal-mono uppercase">
                    [{clause.category.replace(/_/g, ' ')}]
                  </span>
                </div>

                {/* Right Action Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => onInspectClause(clause)}
                    className="text-xs px-2.5 py-1 rounded bg-[var(--surface)] border border-[var(--line)] text-[var(--ink-secondary)] hover:text-[var(--ink)] hover:border-[var(--accent-gold)] transition-colors flex items-center space-x-1"
                  >
                    <Info className="w-3 h-3 text-[var(--accent-gold)]" />
                    <span>Legal Commentary</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleAccept(clause.id)}
                    className={`text-xs px-3 py-1 rounded font-medium transition-all flex items-center space-x-1 ${
                      clause.isAccepted
                        ? 'bg-emerald-600/90 hover:bg-emerald-500 text-white shadow-sm'
                        : 'bg-[var(--surface)] border border-[var(--line)] text-[var(--ink-secondary)] hover:text-[var(--ink)]'
                    }`}
                  >
                    {clause.isAccepted ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Redline Applied</span>
                      </>
                    ) : (
                      <>
                        <RotateCcw className="w-3 h-3" />
                        <span>Keep Original</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Traps Callout if flagged */}
              {clause.issues.length > 0 && (
                <div className="mb-3 p-2.5 rounded bg-red-950/20 border border-red-500/30 flex items-start space-x-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-red-200/90 leading-relaxed">
                    <span className="font-semibold text-red-300">Flagged Traps: </span>
                    {clause.issues.join(' · ')}
                  </div>
                </div>
              )}

              {/* VIEW MODE 1: SPLIT VIEW */}
              {viewMode === 'split' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Left: Original Incoming Clause */}
                  <div className="rounded-lg border border-[var(--line)] bg-[var(--background)] p-3.5 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-mono tracking-wider text-[var(--ink-muted)] mb-2 flex items-center justify-between">
                        <span>Original Inbound Text</span>
                        {isPredatory && <span className="text-red-400">⚠️ Predatory Terms</span>}
                      </div>
                      <div className="text-xs font-mono text-[var(--ink-secondary)] leading-relaxed whitespace-pre-wrap">
                        {clause.originalText}
                      </div>
                    </div>
                  </div>

                  {/* Right: Redline / Common Paper Replacement */}
                  <div className="rounded-lg border border-[var(--line)] bg-[var(--background)] p-3.5 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-mono tracking-wider text-[var(--accent-gold)] mb-2 flex items-center justify-between">
                        <span>
                          {clause.isAccepted ? 'Proposed Common Paper Redline' : 'Original Text Maintained'}
                        </span>
                        <span className="text-emerald-400 font-semibold">
                          {clause.isAccepted ? 'Standard Aligned' : 'Unchanged'}
                        </span>
                      </div>

                      {clause.isAccepted && clause.proposedFallback !== clause.originalText ? (
                        renderDiffText(clause.originalText, clause.proposedFallback)
                      ) : (
                        <div className="text-xs font-mono text-[var(--ink-secondary)] leading-relaxed whitespace-pre-wrap">
                          {clause.originalText}
                        </div>
                      )}
                    </div>

                    <div className="text-[10px] text-[var(--ink-muted)] pt-2 mt-2 border-t border-[var(--line)]/50">
                      Standard Reference: <span className="text-[var(--accent-gold)]">{clause.standardReference}</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* VIEW MODE 2: UNIFIED DIFF VIEW */
                <div className="rounded-lg border border-[var(--line)] bg-[var(--background)] p-4">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-[var(--accent-gold)] mb-2">
                    Unified Redline (Strike-Throughs & Insertions)
                  </div>
                  {clause.isAccepted && clause.proposedFallback !== clause.originalText ? (
                    renderDiffText(clause.originalText, clause.proposedFallback)
                  ) : (
                    <div className="text-xs font-mono text-[var(--ink-secondary)] leading-relaxed whitespace-pre-wrap">
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
