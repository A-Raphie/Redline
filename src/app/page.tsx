'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { ContractDropzone } from '../components/ContractDropzone';
import { RiskSummaryMatrix } from '../components/RiskSummaryMatrix';
import { SplitRedlineViewer } from '../components/SplitRedlineViewer';
import { ClauseInspector } from '../components/ClauseInspector';
import { ExportModal } from '../components/ExportModal';
import { SAMPLE_CONTRACTS } from '../lib/standards/sampleContracts';
import { auditContract } from '../lib/engine/riskAuditor';
import { AuditReport, Clause, ClauseCategory } from '../lib/types';
import { Shield, Sparkles, Scale, FileText, CheckCircle2, ArrowDown, Lock, CheckCircle, AlertTriangle } from 'lucide-react';

export default function Home() {
  const [currentStandard, setCurrentStandard] = useState<'SAAS_CSA' | 'MUTUAL_NDA'>('SAAS_CSA');
  const [selectedSampleId, setSelectedSampleId] = useState<string>('aggressive-saas-msa');
  const [contractTitle, setContractTitle] = useState<string>('Vendor Master Cloud Services Agreement');
  const [rawText, setRawText] = useState<string>('');
  const [report, setReport] = useState<AuditReport | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ClauseCategory | 'ALL'>('ALL');
  const [inspectedClause, setInspectedClause] = useState<Clause | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  // Initial load: Pre-load the first sample contract for instant 90-second judge path
  useEffect(() => {
    const defaultSample = SAMPLE_CONTRACTS[0];
    if (defaultSample) {
      setContractTitle(defaultSample.title);
      setRawText(defaultSample.text);
      const audited = auditContract(defaultSample.title, defaultSample.text, 'SAAS_CSA');
      setReport(audited);
      setSelectedSampleId(defaultSample.id);
    }
  }, []);

  // Handle Standard Change
  const handleStandardChange = (standard: 'SAAS_CSA' | 'MUTUAL_NDA') => {
    setCurrentStandard(standard);
    if (rawText) {
      const audited = auditContract(contractTitle, rawText, standard);
      setReport(audited);
    }
  };

  // Handle Sample Contract Selection
  const handleSelectSample = (sampleId: string) => {
    const sample = SAMPLE_CONTRACTS.find((s) => s.id === sampleId);
    if (sample) {
      setSelectedSampleId(sample.id);
      setContractTitle(sample.title);
      setRawText(sample.text);
      const standard = sample.type === 'MUTUAL_NDA' ? 'MUTUAL_NDA' : 'SAAS_CSA';
      setCurrentStandard(standard);
      const audited = auditContract(sample.title, sample.text, standard);
      setReport(audited);
      setSelectedCategory('ALL');
      setInspectedClause(null);

      // Smooth scroll to workbench
      const workbenchEl = document.getElementById('workbench');
      if (workbenchEl) {
        workbenchEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Handle Custom Contract Upload or Paste
  const handleContractLoaded = (title: string, text: string) => {
    setSelectedSampleId('');
    setContractTitle(title);
    setRawText(text);
    const audited = auditContract(title, text, currentStandard);
    setReport(audited);
    setSelectedCategory('ALL');
    setInspectedClause(null);

    const workbenchEl = document.getElementById('workbench');
    if (workbenchEl) {
      workbenchEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Toggle Redline Acceptance for a specific clause
  const handleToggleAccept = (clauseId: string) => {
    if (!report) return;
    const updatedClauses = report.clauses.map((c) =>
      c.id === clauseId ? { ...c, isAccepted: !c.isAccepted } : c
    );
    setReport({
      ...report,
      clauses: updatedClauses,
    });
    if (inspectedClause && inspectedClause.id === clauseId) {
      setInspectedClause({
        ...inspectedClause,
        isAccepted: !inspectedClause.isAccepted,
      });
    }
  };

  const scrollToWorkbench = () => {
    const workbenchEl = document.getElementById('workbench');
    if (workbenchEl) {
      workbenchEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-base)]">
      {/* Sticky Header */}
      <Header
        currentStandard={currentStandard}
        onStandardChange={handleStandardChange}
        onSelectSample={handleSelectSample}
        onOpenExport={() => setIsExportModalOpen(true)}
        hasDocument={!!report}
        activeSampleId={selectedSampleId}
      />

      {/* STEP 4: The Company-Grade Front Door (Orients a stranger in <= 10 seconds) */}
      <section className="border-b border-[var(--border-default)] bg-[var(--bg-surface)] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--brand-subtle)] border border-[var(--border-default)] text-[11px] font-semibold text-[var(--brand)] mb-5 legal-mono">
            <Scale className="w-3.5 h-3.5" />
            <span>OPEN-STANDARD B2B CONTRACT AUDIT · LEXHACK 2026</span>
          </div>

          {/* Value Claim Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight max-w-4xl mx-auto">
            Audit inbound contracts against open standards. Push back with native Word tracked changes.
          </h1>

          {/* 2-Sentence Plain English Explainer */}
          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
            Redline benchmarks vendor MSAs, NDAs, and SaaS agreements against Common Paper standard terms to eliminate predatory liability caps, unilateral indemnities, and perpetual renewal traps. Accept open-source fallbacks in one click and export an attorney-ready .docx with real Microsoft Word tracked revisions.
          </p>

          {/* Single Primary CTA */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={scrollToWorkbench}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[var(--brand)] text-[var(--accent-foreground)] font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer group"
            >
              <span>Enter Redline Workbench</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <div className="text-xs text-[var(--text-muted)] flex items-center space-x-2">
              <span>Or test preset:</span>
              <div className="inline-flex items-center space-x-1">
                {SAMPLE_CONTRACTS.map((sample) => (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleSelectSample(sample.id)}
                    className={`text-xs px-2.5 py-1 rounded-md border font-medium transition-all ${
                      selectedSampleId === sample.id
                        ? 'bg-[var(--diff-del-bg)] text-[var(--diff-del-text)] border-[var(--diff-del-border)] font-semibold'
                        : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] border-[var(--border-default)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {sample.type === 'SAAS_MSA' ? 'SaaS MSA' : sample.type === 'MUTUAL_NDA' ? 'Mutual NDA' : 'Consulting'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Benchmark Proof Bar (Numbers backed by Common Paper standards) */}
          <div className="mt-12 pt-10 border-t border-[var(--border-default)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            <div className="p-4 rounded-xl bg-[var(--bg-base)] border border-[var(--border-default)] shadow-xs">
              <div className="text-[10px] uppercase font-bold text-[var(--diff-del-text)] legal-mono mb-1">
                Liability Cap Trap
              </div>
              <div className="text-sm font-bold text-[var(--text-primary)] mb-1">
                $100 Cap vs 12-Month Fees
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Common Paper CSA §8.1 enforces mutual 12-month fee caps. Predatory drafts silently cap vendor exposure at $100 while keeping customer liability unlimited.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-base)] border border-[var(--border-default)] shadow-xs">
              <div className="text-[10px] uppercase font-bold text-[var(--diff-del-text)] legal-mono mb-1">
                Renewal Trap
              </div>
              <div className="text-sm font-bold text-[var(--text-primary)] mb-1">
                90-Day Window vs 30-Day
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Common Paper CSA §6.2 requires standard 30-day notice. Vendor agreements bury 90-day deadlines to lock buyers into mandatory annual price escalations.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-base)] border border-[var(--border-default)] shadow-xs">
              <div className="text-[10px] uppercase font-bold text-[var(--diff-del-text)] legal-mono mb-1">
                IP Forfeiture Trap
              </div>
              <div className="text-sm font-bold text-[var(--text-primary)] mb-1">
                Data Rights vs Training Grabs
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Common Paper CSA §4.1 reserves all Customer Data rights. Modern SaaS vendors sneak irrevocable licenses to train proprietary models on confidential inputs.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[var(--bg-base)] border border-[var(--border-default)] shadow-xs">
              <div className="text-[10px] uppercase font-bold text-[var(--diff-del-text)] legal-mono mb-1">
                Survival Asymmetry
              </div>
              <div className="text-sm font-bold text-[var(--text-primary)] mb-1">
                5-Year Lock-in vs 3-Year NDA
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                Common Paper NDA §3 standardizes mutual 3-year term. Inbound drafts impose unilateral 5-year non-competes and perpetual trade secret restrictions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area (Interactive Redline Workbench) */}
      <main id="workbench" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-20">
        {/* Ingestion & Preset Dropzone */}
        <ContractDropzone
          onContractLoaded={handleContractLoaded}
          onSelectSample={handleSelectSample}
        />

        {report && (
          <>
            {/* Risk Summary Scorecard */}
            <RiskSummaryMatrix
              report={report}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            {/* Interactive Split Redline Workbench */}
            <SplitRedlineViewer
              clauses={report.clauses}
              selectedCategory={selectedCategory}
              onToggleAccept={handleToggleAccept}
              onInspectClause={setInspectedClause}
            />
          </>
        )}
      </main>

      {/* Clause Inspector Drawer */}
      <ClauseInspector
        clause={inspectedClause}
        onClose={() => setInspectedClause(null)}
        onToggleAccept={handleToggleAccept}
      />

      {/* Export & DOCX Download Modal */}
      {report && (
        <ExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          report={report}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-[var(--border-default)] bg-[var(--bg-surface)] py-8 px-4 sm:px-6 lg:px-8 mt-16 text-xs text-[var(--text-secondary)]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Scale className="w-4 h-4 text-[var(--brand)]" />
            <span className="font-bold text-[var(--text-primary)]">Redline</span>
            <span>: Open-Standard B2B Contract Audit &amp; Tracked Revisions</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px] text-[var(--text-muted)]">
            <span>LexHack 2026 Entry</span>
            <span>•</span>
            <span>Common Paper Standard Frameworks (MIT)</span>
            <span>•</span>
            <span>Native OpenXML Tracked Changes</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
