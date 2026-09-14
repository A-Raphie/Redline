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
import { Scale, Download, Mail, CheckCircle2, Sparkles } from 'lucide-react';

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

  // Batch Accept or Revert all recommended standard fixes
  const handleAcceptAll = (accept: boolean) => {
    if (!report) return;
    const updatedClauses = report.clauses.map((c) => ({
      ...c,
      isAccepted: accept,
    }));
    setReport({
      ...report,
      clauses: updatedClauses,
    });
  };

  const acceptedCount = report ? report.clauses.filter((c) => c.isAccepted).length : 0;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-base)]">
      {/* Clean Sticky Header */}
      <Header
        currentStandard={currentStandard}
        onStandardChange={handleStandardChange}
        onSelectSample={handleSelectSample}
        onOpenExport={() => setIsExportModalOpen(true)}
        hasDocument={!!report}
        activeSampleId={selectedSampleId}
      />

      {/* Clean, Human-Friendly Hero */}
      <section className="border-b border-[var(--border-default)] bg-[var(--bg-surface)] py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-default)] text-xs font-semibold text-[var(--text-secondary)] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            <span>Open-Standard Contract Safety Engine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight">
            Never sign an unfair contract.
          </h1>

          <p className="mt-3 text-base text-[var(--text-secondary)] leading-relaxed">
            Upload any vendor agreement. We catch the hidden traps, explain them in plain English, and give you back an attorney-ready Word doc with fair industry standards.
          </p>
        </div>
      </section>

      {/* Main Interactive Workbench */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Compact Preset & Ingestion Dropzone */}
        <ContractDropzone
          onContractLoaded={handleContractLoaded}
          onSelectSample={handleSelectSample}
          activeSampleId={selectedSampleId}
        />

        {report && (
          <>
            {/* Reassuring Scorecard & Category Filter Chips */}
            <RiskSummaryMatrix
              report={report}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onAcceptAll={handleAcceptAll}
            />

            {/* Plain English Clause Breakdown with Progressive Legal Diff */}
            <SplitRedlineViewer
              clauses={report.clauses}
              selectedCategory={selectedCategory}
              onToggleAccept={handleToggleAccept}
              onInspectClause={setInspectedClause}
            />

            {/* Sticky Action Bottom Bar */}
            <div className="sticky bottom-4 mt-8 p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center space-x-2 text-xs text-[var(--text-primary)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--diff-ins-text)]" />
                <span className="font-semibold">
                  {acceptedCount} of {report.clauses.length} standard fixes ready to export
                </span>
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsExportModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[var(--bg-subtle)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-all flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Pushback Email</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsExportModalOpen(true)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold bg-[var(--brand)] text-[var(--accent-foreground)] hover:opacity-90 transition-all flex items-center justify-center space-x-1.5 shadow-sm cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Redlined Word Doc (.docx)</span>
                </button>
              </div>
            </div>
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
      <footer className="border-t border-[var(--border-default)] bg-[var(--bg-surface)] py-6 px-4 sm:px-6 mt-12 text-xs text-[var(--text-secondary)]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Scale className="w-4 h-4 text-[var(--brand)]" />
            <span className="font-bold text-[var(--text-primary)]">Redline</span>
            <span>: Open-Standard Contract Safety &amp; Redline Engine</span>
          </div>

          <div className="flex items-center space-x-3 text-[11px] text-[var(--text-muted)]">
            <span>LexHack 2026 Entry</span>
            <span>•</span>
            <span>Common Paper Standard Terms (MIT)</span>
            <span>•</span>
            <span>100% Client-Side Privacy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
