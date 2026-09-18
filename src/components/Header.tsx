'use client';

import React from 'react';
import { Download, Sparkles, Scale } from 'lucide-react';
import { SAMPLE_CONTRACTS } from '../lib/standards/sampleContracts';
import { StandardType } from '../lib/types';

interface HeaderProps {
  currentStandard: StandardType;
  onStandardChange: (standard: StandardType) => void;
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Simple Title */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--brand)] text-[var(--accent-foreground)] flex items-center justify-center font-bold text-xs shadow-xs">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold tracking-tight text-base text-[var(--text-primary)]">Redline</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border-default)] font-medium">
                  LexHack 2026
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] hidden sm:block">
                Contract Safety &amp; Fair Redlines
              </p>
            </div>
          </div>

          {/* Nav Anchors for Deep Exploration */}
          <nav className="hidden xl:flex items-center space-x-5 text-xs text-[var(--text-secondary)] font-medium">
            <a href="#how-it-works" className="hover:text-[var(--text-primary)] transition-colors">
              How It Works
            </a>
            <a href="#traps" className="hover:text-[var(--text-primary)] transition-colors">
              The 4 Traps
            </a>
            <a href="#privacy" className="hover:text-[var(--text-primary)] transition-colors">
              Privacy
            </a>
            <a href="#faq" className="hover:text-[var(--text-primary)] transition-colors">
              FAQ
            </a>
          </nav>

          {/* Controls: Standard selector & Export */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {/* Agreement Type Switcher: Visible on tablet/desktop */}
            <div className="hidden md:flex items-center bg-[var(--bg-subtle)] border border-[var(--border-default)] rounded-lg p-0.5 text-xs">
              <button
                type="button"
                onClick={() => onStandardChange('SAAS_CSA')}
                className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                  currentStandard === 'SAAS_CSA'
                    ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] font-semibold shadow-xs border border-[var(--border-strong)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                SaaS Agreement
              </button>
              <button
                type="button"
                onClick={() => onStandardChange('MUTUAL_NDA')}
                className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                  currentStandard === 'MUTUAL_NDA'
                    ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] font-semibold shadow-xs border border-[var(--border-strong)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Mutual NDA
              </button>
              <button
                type="button"
                onClick={() => onStandardChange('SERVICES_PSA')}
                className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                  currentStandard === 'SERVICES_PSA'
                    ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] font-semibold shadow-xs border border-[var(--border-strong)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Services PSA
              </button>
            </div>

            {/* Export Trigger */}
            <button
              type="button"
              onClick={onOpenExport}
              disabled={!hasDocument}
              className={`flex items-center space-x-1.5 px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-xs ${
                hasDocument
                  ? 'bg-[var(--brand)] text-[var(--accent-foreground)] hover:opacity-90 cursor-pointer'
                  : 'bg-[var(--bg-subtle)] text-[var(--text-muted)] cursor-not-allowed border border-[var(--border-default)]'
              }`}
            >
              <Download className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Download Redline (.docx)</span>
              <span className="sm:hidden">Export</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
