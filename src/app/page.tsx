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
import { Shield, Sparkles, Scale, FileText, CheckCircle2 } from 'lucide-react';

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

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      {/* Sticky Header */}
      <Header
        currentStandard={currentStandard}
        onStandardChange={handleStandardChange}
        onSelectSample={handleSelectSample}
        onOpenExport={() => setIsExportModalOpen(true)}
        hasDocument={!!report}
        activeSampleId={selectedSampleId}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Document Ingestion & Quick Selector Dropzone */}
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
      <footer className="border-t border-[var(--line)] bg-[var(--panel)] py-8 px-4 sm:px-6 lg:px-8 mt-12 text-xs text-[var(--ink-secondary)]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Scale className="w-4 h-4 text-[var(--accent-gold)]" />
            <span className="font-semibold text-[var(--ink)]">Redline</span>
            <span>— Open-Standard B2B Contract Audit Engine</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px] text-[var(--ink-muted)]">
            <span>LexHack 2026 Entry</span>
            <span>•</span>
            <span>Common Paper Standards (MIT License)</span>
            <span>•</span>
            <span>Native OpenXML Tracked Changes</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
