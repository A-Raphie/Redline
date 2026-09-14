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
    <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-[var(--panel)] border-l border-[var(--line)] shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-[var(--line)] flex items-center justify-between bg-[var(--surface)]">
        <div className="flex items-center space-x-2">
          <Scale className="w-4 h-4 text-[var(--accent-gold)]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ink)]">
            Legal Clause Inspector
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-md text-[var(--ink-secondary)] hover:text-[var(--ink)] hover:bg-[var(--surface-hover)]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Title & Category */}
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[var(--background)] border border-[var(--line)] text-[var(--accent-gold)]">
              {clause.category.replace(/_/g, ' ')}
            </span>
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
          </div>
          <h3 className="text-sm font-bold text-[var(--ink)] leading-snug">{clause.title}</h3>
          <p className="text-xs text-[var(--ink-muted)] mt-0.5">{clause.sectionNumber || 'Unnumbered Section'}</p>
        </div>

        {/* Flagged Traps */}
        {clause.issues.length > 0 && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3.5">
            <h4 className="text-xs font-semibold text-red-300 flex items-center mb-2">
              <AlertCircle className="w-3.5 h-3.5 mr-1.5 text-red-400" />
              Identified Contractual Traps ({clause.issues.length})
            </h4>
            <ul className="space-y-1.5">
              {clause.issues.map((issue, idx) => (
                <li key={idx} className="text-xs text-red-200/90 leading-relaxed flex items-start">
                  <span className="mr-2 text-red-400 font-bold">•</span>
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Open Standard Benchmark Rationale */}
        <div className="bg-[var(--surface)] border border-[var(--line)] rounded-lg p-4">
          <h4 className="text-xs font-semibold text-[var(--accent-gold)] flex items-center mb-2">
            <BookOpen className="w-3.5 h-3.5 mr-1.5" />
            Standard Benchmark: {clause.standardReference}
          </h4>
          <p className="text-xs text-[var(--ink-secondary)] leading-relaxed mb-3">
            {clause.recommendation}
          </p>

          <div className="pt-3 border-t border-[var(--line)]">
            <span className="text-[11px] font-semibold text-[var(--ink)] block mb-1">
              Commercial Negotiation Tip:
            </span>
            <p className="text-[11px] text-[var(--ink-muted)] leading-relaxed italic">
              "Tell the counterparty: 'We benchmark all commercial agreements against standard Common Paper terms. Mutual reciprocity is our board-mandated policy for procurement.'"
            </p>
          </div>
        </div>

        {/* Proposed Standard Replacement */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-semibold text-[var(--ink)] flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
              Proposed Standard Fallback Clause
            </h4>
            <span className="text-[10px] text-emerald-400 font-mono">Ready for DOCX Tracked Changes</span>
          </div>

          <div className="p-3.5 rounded-lg bg-[var(--background)] border border-[var(--line)] text-xs text-[var(--ink-secondary)] font-mono leading-relaxed whitespace-pre-wrap max-h-56 overflow-y-auto">
            {clause.proposedFallback}
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="p-4 border-t border-[var(--line)] bg-[var(--surface)] flex items-center justify-between">
        <button
          type="button"
          onClick={() => onToggleAccept(clause.id)}
          className={`w-full py-2 px-4 rounded-md text-xs font-semibold transition-all flex items-center justify-center space-x-2 ${
            clause.isAccepted
              ? 'bg-emerald-600 text-white hover:bg-emerald-500'
              : 'bg-[var(--line-highlight)] text-[var(--ink)] hover:bg-[var(--accent-gold)] hover:text-[#0b0f17]'
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
  );
};
