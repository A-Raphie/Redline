'use client';

import React from 'react';
import { FileText, ShieldCheck, Download, Sparkles, AlertCircle } from 'lucide-react';
import { SAMPLE_CONTRACTS } from '../lib/standards/sampleContracts';

interface HeaderProps {
  currentStandard: 'SAAS_CSA' | 'MUTUAL_NDA';
  onStandardChange: (standard: 'SAAS_CSA' | 'MUTUAL_NDA') => void;
  onSelectSample: (sampleId: string) => void;
  onOpenExport: () => void;
  hasDocument: boolean;
  activeSampleId?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentStandard,
  onStandardChange,
  onSelectSample,
  onOpenExport,
  hasDocument,
  activeSampleId,
}) => {
  return (
    <header className="border-b border-[var(--line)] bg-[var(--panel)]/95 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded border border-[var(--accent-gold)] flex items-center justify-center bg-[var(--accent-gold-dim)] text-[var(--accent-gold)] font-bold legal-mono text-sm tracking-tighter">
              RL
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold tracking-wider text-sm legal-mono text-[var(--ink)]">REDLINE</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--line)] text-[var(--ink-secondary)] legal-mono">
                  LEXHACK 2026
                </span>
              </div>
              <p className="text-[10px] text-[var(--ink-muted)] hidden sm:block">
                Open-Standard Contract Audit & Native Tracked Revisions
              </p>
            </div>
          </div>

          {/* Standards & Preset Quick Bar */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Standard Benchmark Selector */}
            <div className="flex items-center bg-[var(--background)] border border-[var(--line)] rounded-md p-0.5 text-xs">
              <button
                type="button"
                onClick={() => onStandardChange('SAAS_CSA')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  currentStandard === 'SAAS_CSA'
                    ? 'bg-[var(--surface-hover)] text-[var(--ink)] font-medium border border-[var(--line-highlight)]'
                    : 'text-[var(--ink-secondary)] hover:text-[var(--ink)]'
                }`}
              >
                Common Paper CSA
              </button>
              <button
                type="button"
                onClick={() => onStandardChange('MUTUAL_NDA')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  currentStandard === 'MUTUAL_NDA'
                    ? 'bg-[var(--surface-hover)] text-[var(--ink)] font-medium border border-[var(--line-highlight)]'
                    : 'text-[var(--ink-secondary)] hover:text-[var(--ink)]'
                }`}
              >
                Mutual NDA
              </button>
            </div>

            {/* 90-Second Judge Presets */}
            <div className="hidden md:flex items-center space-x-1 pl-2 border-l border-[var(--line)]">
              <span className="text-[11px] text-[var(--accent-gold)] flex items-center mr-1 font-medium">
                <Sparkles className="w-3 h-3 mr-1" />
                Judge Test:
              </span>
              {SAMPLE_CONTRACTS.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => onSelectSample(sample.id)}
                  className={`text-xs px-2 py-1 rounded transition-all truncate max-w-[130px] border ${
                    activeSampleId === sample.id
                      ? 'bg-[var(--accent-gold-dim)] text-[var(--accent-gold)] border-[var(--accent-gold)] font-medium'
                      : 'bg-[var(--surface)] text-[var(--ink-secondary)] border-[var(--line)] hover:border-[var(--line-highlight)] hover:text-[var(--ink)]'
                  }`}
                  title={sample.title}
                >
                  {sample.type === 'SAAS_MSA' ? 'Predatory MSA' : sample.type === 'MUTUAL_NDA' ? 'Sneak NDA' : 'Consulting'}
                </button>
              ))}
            </div>

            {/* Export Trigger */}
            <button
              type="button"
              onClick={onOpenExport}
              disabled={!hasDocument}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                hasDocument
                  ? 'bg-[var(--accent-gold)] text-[#0b0f17] hover:bg-[var(--accent-gold-hover)] shadow-sm'
                  : 'bg-[var(--surface)] text-[var(--ink-muted)] cursor-not-allowed border border-[var(--line)]'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Tracked .docx</span>
            </button>
          </div>
        </div>
      </div>

      {/* Trust & Privacy Sub-banner */}
      <div className="bg-[var(--background)]/80 border-t border-[var(--line)]/50 px-4 py-1 text-[11px] text-[var(--ink-muted)] flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="flex items-center text-emerald-400/90">
              <ShieldCheck className="w-3 h-3 mr-1" />
              100% Client-Side Privacy: Contracts never leave your browser
            </span>
            <span className="hidden sm:inline text-[var(--line-highlight)]">•</span>
            <span className="hidden sm:inline">Benchmarked against Common Paper Committee Standards (MIT)</span>
          </div>
          <div className="text-[10px] text-[var(--ink-muted)] legal-mono">
            Native Word &lt;w:ins&gt; & &lt;w:del&gt; Revisions
          </div>
        </div>
      </div>
    </header>
  );
};
