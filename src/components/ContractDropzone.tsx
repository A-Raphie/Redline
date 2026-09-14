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
    <div className="paper-card p-5 mb-8">
      {/* 3 Quick Benchmark Contracts */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center">
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[var(--accent-gold)]" />
            Quick Example Contracts (Click to Test)
          </h3>
          <p className="text-[11px] text-[var(--text-muted)]">
            Pre-loaded agreements featuring standard vendor traps:
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCustomUpload(!showCustomUpload)}
          className="text-xs text-[var(--brand)] hover:underline flex items-center font-semibold self-start sm:self-auto"
        >
          <span>{showCustomUpload ? 'Hide custom upload' : '+ Upload or paste your own contract'}</span>
          {showCustomUpload ? <ChevronUp className="w-3.5 h-3.5 ml-1" /> : <ChevronDown className="w-3.5 h-3.5 ml-1" />}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {SAMPLE_CONTRACTS.map((sample) => {
          const isActive = activeSampleId === sample.id;
          return (
            <button
              key={sample.id}
              type="button"
              onClick={() => onSelectSample(sample.id)}
              className={`text-left p-3 rounded-xl border transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-[var(--bg-subtle)] border-[var(--border-strong)] shadow-sm ring-1 ring-[var(--brand)]'
                  : 'bg-[var(--bg-surface)] border-[var(--border-default)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-subtle)]/40 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--brand)] border border-[var(--border-default)]">
                    {sample.type === 'SAAS_MSA' ? 'SaaS MSA' : sample.type === 'MUTUAL_NDA' ? 'Mutual NDA' : 'Consulting'}
                  </span>
                  {isActive && (
                    <span className="text-[10px] text-[var(--diff-ins-text)] font-bold flex items-center">
                      <CheckCircle2 className="w-3 h-3 mr-0.5" /> Active
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-[var(--text-primary)] leading-tight mb-1">
                  {sample.title.split('(')[0].trim()}
                </h4>
                <p className="text-[11px] text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                  {sample.description}
                </p>
              </div>

              <div className="mt-2.5 pt-2 border-t border-[var(--border-default)] text-[10px] text-[var(--diff-del-text)] font-semibold flex items-center justify-between">
                <span>{sample.predatorySummary.split('·')[0].trim()}</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Expandable Custom Upload Box */}
      {showCustomUpload && (
        <div className="mt-4 pt-4 border-t border-[var(--border-default)]">
          <div className="flex space-x-2 mb-3">
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`px-3 py-1 rounded-md text-xs font-semibold ${
                activeTab === 'upload'
                  ? 'bg-[var(--brand)] text-[var(--accent-foreground)]'
                  : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Upload .docx or .txt
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('paste')}
              className={`px-3 py-1 rounded-md text-xs font-semibold ${
                activeTab === 'paste'
                  ? 'bg-[var(--brand)] text-[var(--accent-foreground)]'
                  : 'bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Paste Text
            </button>
          </div>

          {activeTab === 'upload' ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-[var(--brand)] bg-[var(--brand-subtle)]'
                  : 'border-[var(--border-strong)] hover:border-[var(--brand)] bg-[var(--bg-subtle)]/30'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".docx,.txt,.md"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />
              <Upload className="w-6 h-6 text-[var(--brand)] mx-auto mb-2" />
              <h4 className="text-xs font-bold text-[var(--text-primary)] mb-0.5">
                {isProcessing ? 'Reading document...' : 'Click to select or drag & drop a Word (.docx) file'}
              </h4>
              <p className="text-[11px] text-[var(--text-muted)]">
                Processed 100% in your browser. Nothing is uploaded to any remote server.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <input
                type="text"
                value={contractTitle}
                onChange={(e) => setContractTitle(e.target.value)}
                placeholder="Contract Name (e.g. Master Services Agreement)"
                className="w-full text-xs px-3 py-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand)]"
              />
              <textarea
                rows={5}
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder="Paste the contract text here..."
                className="w-full text-xs font-mono p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand)]"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handlePasteSubmit}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-[var(--brand)] text-[var(--accent-foreground)] hover:opacity-90"
                >
                  Analyze Contract
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-3 p-2.5 rounded-lg bg-[var(--diff-del-bg)] text-xs text-[var(--diff-del-text)] font-medium">
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
