'use client';

import React, { useState } from 'react';
import { X, Download, Mail, Copy, Check, FileText, Sparkles, CheckCircle2 } from 'lucide-react';
import { AuditReport } from '../lib/types';
import { exportTrackedDocx } from '../lib/docx/docxExporter';
import { generatePushbackEmail, generateFullRedlinedDocumentText } from '../lib/engine/redlineGenerator';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: AuditReport;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  report,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  if (!isOpen) return null;

  const pushbackEmail = generatePushbackEmail(report.contractTitle, report.clauses);
  const fullText = generateFullRedlinedDocumentText(report.clauses);

  const handleDownloadDocx = async () => {
    setIsExporting(true);
    try {
      const blob = await exportTrackedDocx(report.contractTitle, report.clauses, report.benchmarkStandard);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const cleanTitle = report.contractTitle.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
      a.download = `redlined_${cleanTitle || 'contract'}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setExportComplete(true);
      setTimeout(() => setExportComplete(false), 4000);
    } catch (err) {
      console.error('Failed to export DOCX:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(pushbackEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(fullText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[var(--panel)] border border-[var(--line)] rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-4 border-b border-[var(--line)] flex items-center justify-between bg-[var(--surface)]">
          <div className="flex items-center space-x-2">
            <Download className="w-4 h-4 text-[var(--accent-gold)]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
              Export Redline & Negotiation Artifacts
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-[var(--ink-secondary)] hover:text-[var(--ink)] hover:bg-[var(--surface-hover)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Primary Action: Native DOCX */}
          <div className="bg-[var(--surface)] border border-[var(--accent-gold)]/40 rounded-lg p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-[var(--accent-gold-dim)] text-[var(--accent-gold)] border border-[var(--accent-gold)]/40">
                    NATIVE WORD TRACKED CHANGES
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">OpenXML &lt;w:ins&gt; / &lt;w:del&gt;</span>
                </div>
                <h4 className="text-sm font-bold text-[var(--ink)] mb-1">
                  Download Attorney-Ready Word Document (.docx)
                </h4>
                <p className="text-xs text-[var(--ink-secondary)] leading-relaxed max-w-md">
                  Generates an authentic Microsoft Word file with genuine revision tracking. Counterparties and judges will see native strikethroughs, green insertions, and embedded audit comments.
                </p>
              </div>

              <button
                type="button"
                onClick={handleDownloadDocx}
                disabled={isExporting}
                className="px-4 py-2.5 rounded-md text-xs font-semibold bg-[var(--accent-gold)] text-[#0b0f17] hover:bg-[var(--accent-gold-hover)] transition-all flex items-center space-x-2 shrink-0 shadow-md disabled:opacity-50"
              >
                {isExporting ? (
                  <span>Generating OpenXML...</span>
                ) : exportComplete ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#0b0f17]" />
                    <span>Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download .docx</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Secondary Action: Pushback Email Memo */}
          <div className="border border-[var(--line)] rounded-lg p-4 bg-[var(--background)]">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold text-[var(--ink)] flex items-center">
                <Mail className="w-3.5 h-3.5 mr-1.5 text-[var(--accent-gold)]" />
                Executive Pushback Email Memo (Ready to Send)
              </h4>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="text-xs px-2.5 py-1 rounded bg-[var(--surface)] border border-[var(--line)] text-[var(--ink-secondary)] hover:text-[var(--ink)] flex items-center space-x-1 transition-colors"
              >
                {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedEmail ? 'Copied to Clipboard' : 'Copy Email'}</span>
              </button>
            </div>
            <p className="text-[11px] text-[var(--ink-muted)] mb-2">
              Professional email template citing Common Paper standards to accompany your attached redlined .docx file.
            </p>
            <div className="p-3 rounded bg-[var(--panel)] border border-[var(--line)] text-[11px] font-mono text-[var(--ink-secondary)] max-h-36 overflow-y-auto leading-relaxed whitespace-pre-wrap">
              {pushbackEmail}
            </div>
          </div>

          {/* Tertiary Action: Full Revised Text */}
          <div className="flex items-center justify-between pt-2 border-t border-[var(--line)]">
            <div className="text-xs text-[var(--ink-muted)]">
              Need clean plaintext without Word markup?
            </div>
            <button
              type="button"
              onClick={handleCopyText}
              className="text-xs px-3 py-1.5 rounded bg-[var(--surface)] border border-[var(--line)] text-[var(--ink-secondary)] hover:text-[var(--ink)] flex items-center space-x-1.5 transition-colors"
            >
              {copiedText ? <Check className="w-3 h-3 text-emerald-400" /> : <FileText className="w-3 h-3" />}
              <span>{copiedText ? 'Copied Full Text' : 'Copy Clean Plaintext'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
