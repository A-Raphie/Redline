'use client';

import React from 'react';
import { ShieldCheck, Download, Sparkles, Scale } from 'lucide-react';
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
    <header className="border-b border-[var(--border-default)] bg-[var(--bg-surface)]/95 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--brand)] text-[var(--accent-foreground)] flex items-center justify-center font-bold legal-mono text-xs tracking-wider shadow-sm">
              RL
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold tracking-wide text-sm legal-mono text-[var(--text-primary)]">REDLINE</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border-default)] legal-mono font-medium">
                  LEXHACK 2026
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] hidden sm:block">
                Open-Standard Contract Audit & Native Word Tracked Changes
              </p>
            </div>
          </div>

          {/* Standards & Preset Quick Bar */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Standard Benchmark Selector */}
            <div className="flex items-center bg-[var(--bg-subtle)] border border-[var(--border-default)] rounded-lg p-0.5 text-xs">
              <button
                type="button"
                onClick={() => onStandardChange('SAAS_CSA')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  currentStandard === 'SAAS_CSA'
                    ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] font-semibold shadow-xs border border-[var(--border-strong)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Common Paper CSA
              </button>
              <button
                type="button"
                onClick={() => onStandardChange('MUTUAL_NDA')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  currentStandard === 'MUTUAL_NDA'
                    ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] font-semibold shadow-xs border border-[var(--border-strong)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Mutual NDA
              </button>
            </div>

            {/* 90-Second Judge Presets */}
            <div className="hidden md:flex items-center space-x-1.5 pl-3 border-l border-[var(--border-default)]">
              <span className="text-[11px] text-[var(--accent-gold)] flex items-center mr-1 font-semibold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 mr-1" />
                Judge Preset:
              </span>
              {SAMPLE_CONTRACTS.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => onSelectSample(sample.id)}
                  className={`text-xs px-2.5 py-1 rounded-md transition-all border ${
                    activeSampleId === sample.id
                      ? 'bg-[var(--diff-del-bg)] text-[var(--diff-del-text)] border-[var(--diff-del-border)] font-semibold shadow-xs'
                      : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-default)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
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
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                hasDocument
                  ? 'bg-[var(--brand)] text-[var(--accent-foreground)] hover:opacity-90 shadow-sm'
                  : 'bg-[var(--bg-subtle)] text-[var(--text-muted)] cursor-not-allowed border border-[var(--border-default)]'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Tracked .docx</span>
            </button>
          </div>
        </div>
      </div>

      {/* Trust & Privacy Sub-banner */}
      <div className="bg-[var(--bg-subtle)]/70 border-t border-[var(--border-default)] px-4 py-1 text-[11px] text-[var(--text-secondary)] flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="flex items-center text-[var(--diff-ins-text)] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              100% Client-Side Privacy: Contracts never leave your browser
            </span>
            <span className="hidden sm:inline text-[var(--border-strong)]">•</span>
            <span className="hidden sm:inline text-[var(--text-muted)]">Benchmarked against Common Paper Committee Standards (MIT)</span>
          </div>
          <div className="text-[10px] text-[var(--text-muted)] legal-mono">
            Native Word &lt;w:ins&gt; &amp; &lt;w:del&gt; Revisions
          </div>
        </div>
      </div>
    </header>
  );
};
