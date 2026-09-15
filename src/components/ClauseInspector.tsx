'use client';

import React from 'react';
import { X, BookOpen, AlertCircle, Check, ArrowRight, ShieldCheck, Scale } from 'lucide-react';
import { Clause } from '../lib/types';

interface ClauseInspectorProps {
  clause: Clause | null;
  onClose: () => void;
  onToggleAccept: (clauseId: string) => void;
}

export const ClauseInspector: React.FC<ClauseInspectorProps> = ({
  clause,
  onClose,
  onToggleAccept,
}) => {
  if (!clause) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/25 backdrop-blur-[2px] z-50 transition-opacity animate-in fade-in duration-150" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-[var(--bg-surface)] border-l border-[var(--border-default)] shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 border-b border-[var(--border-default)] flex items-center justify-between bg-[var(--bg-subtle)]/60">
        <div className="flex items-center space-x-2">
          <Scale className="w-4 h-4 text-[var(--brand)]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
            Legal Clause Inspector
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Title & Category */}
        <div>
          <div className="flex items-center space-x-2 mb-1.5">
            <span className="text-[10px] uppercase legal-mono px-2 py-0.5 rounded-md bg-[var(--bg-subtle)] border border-[var(--border-default)] text-[var(--brand)] font-semibold">
              {clause.category.replace(/_/g, ' ')}
            </span>
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
          </div>
          <h3 className="text-sm font-bold text-[var(--text-primary)] leading-snug">{clause.title}</h3>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">{clause.sectionNumber || 'Unnumbered Section'}</p>
        </div>

        {/* Flagged Traps */}
        {clause.issues.length > 0 && (
          <div className="bg-[var(--diff-del-bg)] border border-[var(--diff-del-border)] rounded-xl p-4">
            <h4 className="text-xs font-bold text-[var(--diff-del-text)] flex items-center mb-2">
              <AlertCircle className="w-3.5 h-3.5 mr-1.5 shrink-0" />
              Identified Contractual Traps ({clause.issues.length})
            </h4>
            <ul className="space-y-1.5">
              {clause.issues.map((issue, idx) => (
                <li key={idx} className="text-xs text-[var(--diff-del-text)] leading-relaxed flex items-start">
                  <span className="mr-2 font-bold">•</span>
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Open Standard Benchmark Rationale */}
        <div className="bg-[var(--bg-subtle)]/50 border border-[var(--border-default)] rounded-xl p-4 shadow-xs">
          <h4 className="text-xs font-bold text-[var(--brand)] flex items-center mb-2">
            <BookOpen className="w-3.5 h-3.5 mr-1.5" />
            Standard Benchmark: {clause.standardReference}
          </h4>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">
            {clause.recommendation}
          </p>

          <div className="pt-3 border-t border-[var(--border-default)]">
            <span className="text-[11px] font-bold text-[var(--text-primary)] block mb-1">
              Commercial Pushback Rationale:
            </span>
            <p className="text-[11px] text-[var(--text-muted)] leading-relaxed italic">
              &quot;We benchmark all inbound commercial agreements against standard Common Paper terms. Reciprocal liability and mutual remedies are required by procurement policy.&quot;
            </p>
          </div>
        </div>

        {/* Proposed Standard Replacement */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-[var(--text-primary)] flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-[var(--diff-ins-text)]" />
              Proposed Standard Fallback Clause
            </h4>
            <span className="text-[10px] text-[var(--diff-ins-text)] legal-mono font-semibold">Ready for DOCX Tracked Changes</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border-default)] text-xs text-[var(--text-secondary)] legal-mono leading-relaxed whitespace-pre-wrap max-h-56 overflow-y-auto shadow-inner">
            {clause.proposedFallback}
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="p-4 border-t border-[var(--border-default)] bg-[var(--bg-subtle)]/60 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onToggleAccept(clause.id)}
          className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-all flex items-center justify-center space-x-2 shadow-xs ${
            clause.isAccepted
              ? 'bg-[var(--diff-ins-bg)] text-[var(--diff-ins-text)] border border-[var(--diff-ins-border)]'
              : 'bg-[var(--brand)] text-[var(--accent-foreground)] hover:opacity-90'
          }`}
        >
          {clause.isAccepted ? (
            <>
              <Check className="w-4 h-4" />
              <span>Standard Redline Accepted (Included in Export)</span>
            </>
          ) : (
            <>
              <ArrowRight className="w-4 h-4" />
              <span>Accept Standard Redline</span>
            </>
          )}
        </button>
      </div>
    </div>
    </>
  );
};
