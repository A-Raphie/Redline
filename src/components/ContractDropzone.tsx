'use client';

import React, { useState, useRef } from 'react';
import { Upload, Clipboard, Sparkles, ArrowRight, FileText, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { SAMPLE_CONTRACTS } from '../lib/standards/sampleContracts';
import { parseDocumentFile, parsePlainText } from '../lib/parser/docxParser';

interface ContractDropzoneProps {
  onContractLoaded: (title: string, rawText: string) => void;
  onSelectSample: (sampleId: string) => void;
  activeSampleId?: string;
}

export const ContractDropzone: React.FC<ContractDropzoneProps> = ({
  onContractLoaded,
  onSelectSample,
  activeSampleId,
}) => {
  const [showCustomUpload, setShowCustomUpload] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [pastedText, setPastedText] = useState('');
  const [contractTitle, setContractTitle] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    try {
      const parsed = await parseDocumentFile(file);
      onContractLoaded(parsed.title, parsed.rawText);
      setShowCustomUpload(false);
    } catch (err: any) {
      setError(err.message || 'Failed to parse file. Please upload a valid .docx or .txt document.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handlePasteSubmit = () => {
    if (!pastedText.trim()) {
      setError('Please paste contract text.');
      return;
    }
    const parsed = parsePlainText(pastedText, contractTitle.trim() || 'Custom Inbound Agreement');
    onContractLoaded(parsed.title, parsed.rawText);
    setShowCustomUpload(false);
  };

  return (
    <div className="paper-card p-4 mb-6 shadow-xs min-w-0 max-w-full overflow-hidden">
      {/* Sleek, Compact Preset Selector Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0 w-full">
        <div className="flex items-center space-x-2 overflow-x-auto pb-1.5 sm:pb-0 scrollbar-none min-w-0 w-full max-w-full">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] shrink-0 flex items-center mr-1">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-[var(--accent-gold)] shrink-0" />
            Presets:
          </span>
          {SAMPLE_CONTRACTS.map((sample) => {
            const isActive = activeSampleId === sample.id;
            return (
              <button
                key={sample.id}
                type="button"
                onClick={() => onSelectSample(sample.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 shrink-0 ${
                  isActive
                    ? 'bg-[var(--brand)] text-[var(--accent-foreground)] shadow-xs'
                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-default)] hover:border-[var(--border-strong)]'
                }`}
              >
                <span>{sample.type === 'SAAS_MSA' ? 'Enterprise SaaS MSA' : sample.type === 'MUTUAL_NDA' ? 'Mutual NDA' : 'Consulting MSA'}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-[var(--diff-del-bg)] text-[var(--diff-del-text)]'}`}>
                  {sample.type === 'SAAS_MSA' ? 'Grade F' : sample.type === 'MUTUAL_NDA' ? 'Grade D-' : 'Grade F'}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setShowCustomUpload(!showCustomUpload)}
          className="text-xs text-[var(--brand)] hover:underline font-semibold flex items-center shrink-0 self-start sm:self-auto"
        >
          <span>{showCustomUpload ? 'Hide custom upload' : '+ Upload or paste your own contract'}</span>
          {showCustomUpload ? <ChevronUp className="w-3.5 h-3.5 ml-1" /> : <ChevronDown className="w-3.5 h-3.5 ml-1" />}
        </button>
      </div>

      {/* Expandable Custom Upload Drawer */}
      {showCustomUpload && (
        <div className="mt-4 pt-4 border-t border-[var(--border-default)] animate-in fade-in duration-200">
          <div className="flex border-b border-[var(--border-default)] mb-4">
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`pb-2 px-3 text-xs font-bold transition-all border-b-2 flex items-center space-x-1.5 ${
                activeTab === 'upload'
                  ? 'border-[var(--brand)] text-[var(--brand)]'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload .docx or .txt</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('paste')}
              className={`pb-2 px-3 text-xs font-bold transition-all border-b-2 flex items-center space-x-1.5 ${
                activeTab === 'paste'
                  ? 'border-[var(--brand)] text-[var(--brand)]'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Clipboard className="w-3.5 h-3.5" />
              <span>Paste Contract Text</span>
            </button>
          </div>

          {error && (
            <div className="p-3 mb-4 rounded-xl bg-[var(--diff-del-bg)] border border-[var(--diff-del-border)] text-xs text-[var(--diff-del-text)] font-semibold flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>{error}</span>
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  onSelectSample('saas-enterprise');
                  setShowCustomUpload(false);
                }}
                className="underline hover:opacity-80 font-bold shrink-0 cursor-pointer text-left"
              >
                Load Sample SaaS Agreement
              </button>
            </div>
          )}

          {activeTab === 'upload' ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-[var(--brand)] bg-[var(--brand-subtle)]/30'
                  : 'border-[var(--border-strong)] bg-[var(--bg-base)]/40 hover:bg-[var(--bg-subtle)]/40'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                accept=".docx,.txt"
                className="hidden"
              />
              <div className="w-10 h-10 rounded-full bg-[var(--brand-subtle)] text-[var(--brand)] flex items-center justify-center mx-auto mb-3">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-[var(--text-primary)] mb-1">
                {isProcessing ? 'Processing document...' : 'Click to upload or drag and drop'}
              </p>
              <p className="text-[11px] text-[var(--text-muted)]">
                Supports Microsoft Word (.docx) and plaintext (.txt) agreements
              </p>
              <div className="mt-3 inline-flex items-center space-x-1 text-[10px] text-[var(--text-secondary)] bg-[var(--bg-surface)] px-2.5 py-1 rounded-full border border-[var(--border-default)]">
                <CheckCircle2 className="w-3 h-3 text-[var(--diff-ins-text)]" />
                <span>100% In-Browser Privacy: Confidential files never touch a server</span>
              </div>
              <div className="mt-3 text-[11px] text-[var(--text-muted)]">
                Need a test file?{' '}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectSample('saas-enterprise');
                    setShowCustomUpload(false);
                  }}
                  className="text-[var(--brand)] font-semibold underline hover:opacity-80 cursor-pointer"
                >
                  Load Predatory SaaS MSA Sample
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-primary)] uppercase mb-1">
                  Agreement Title (Optional)
                </label>
                <input
                  type="text"
                  value={contractTitle}
                  onChange={(e) => setContractTitle(e.target.value)}
                  placeholder="e.g. Master Cloud Services Agreement"
                  className="w-full text-xs p-2.5 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] focus:outline-none focus:border-[var(--brand)]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[var(--text-primary)] uppercase mb-1">
                  Contract Clauses &amp; Terms
                </label>
                <textarea
                  rows={7}
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  placeholder="Paste vendor contract clauses here..."
                  className="w-full text-xs p-2.5 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] legal-mono focus:outline-none focus:border-[var(--brand)] resize-y"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handlePasteSubmit}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-[var(--brand)] text-[var(--accent-foreground)] hover:opacity-90 shadow-xs"
                >
                  Audit Pasted Contract
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
