'use client';

import React, { useState, useRef } from 'react';
import { Upload, FileText, Clipboard, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { SAMPLE_CONTRACTS } from '../lib/standards/sampleContracts';
import { parseDocumentFile, parsePlainText } from '../lib/parser/docxParser';

interface ContractDropzoneProps {
  onContractLoaded: (title: string, rawText: string) => void;
  onSelectSample: (sampleId: string) => void;
}

export const ContractDropzone: React.FC<ContractDropzoneProps> = ({
  onContractLoaded,
  onSelectSample,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste' | 'samples'>('samples');
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
      setError('Please enter or paste contract text.');
      return;
    }
    const parsed = parsePlainText(pastedText, contractTitle.trim() || 'Pasted Agreement');
    onContractLoaded(parsed.title, parsed.rawText);
  };

  return (
    <div className="bg-[var(--panel)] border border-[var(--line)] rounded-xl overflow-hidden shadow-lg mb-8">
      {/* Tab Navigation */}
      <div className="flex border-b border-[var(--line)] bg-[var(--background)]/50 px-4 pt-3 space-x-2">
        <button
          type="button"
          onClick={() => setActiveTab('samples')}
          className={`px-4 py-2 text-xs font-medium rounded-t-lg transition-colors flex items-center space-x-1.5 ${
            activeTab === 'samples'
              ? 'bg-[var(--panel)] text-[var(--ink)] border-t border-x border-[var(--line)] font-semibold text-[var(--accent-gold)]'
              : 'text-[var(--ink-secondary)] hover:text-[var(--ink)]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
          <span>Benchmark Presets (90s Judge Test)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`px-4 py-2 text-xs font-medium rounded-t-lg transition-colors flex items-center space-x-1.5 ${
            activeTab === 'upload'
              ? 'bg-[var(--panel)] text-[var(--ink)] border-t border-x border-[var(--line)] font-semibold'
              : 'text-[var(--ink-secondary)] hover:text-[var(--ink)]'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload .docx / .txt</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('paste')}
          className={`px-4 py-2 text-xs font-medium rounded-t-lg transition-colors flex items-center space-x-1.5 ${
            activeTab === 'paste'
              ? 'bg-[var(--panel)] text-[var(--ink)] border-t border-x border-[var(--line)] font-semibold'
              : 'text-[var(--ink-secondary)] hover:text-[var(--ink)]'
          }`}
        >
          <Clipboard className="w-3.5 h-3.5" />
          <span>Paste Agreement Text</span>
        </button>
      </div>

      <div className="p-6">
        {/* TAB 1: 90-Second Judge Benchmark Presets */}
        {activeTab === 'samples' && (
          <div>
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-[var(--ink)] flex items-center">
                <Sparkles className="w-4 h-4 mr-1.5 text-[var(--accent-gold)]" />
                Select a Real-World Predatory Benchmark Contract
              </h3>
              <p className="text-xs text-[var(--ink-secondary)] mt-0.5">
                Pre-loaded contracts engineered with classic vendor traps to verify the Redline audit engine in under 90 seconds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SAMPLE_CONTRACTS.map((sample) => (
                <div
                  key={sample.id}
                  onClick={() => onSelectSample(sample.id)}
                  className="group bg-[var(--surface)] hover:bg-[var(--surface-hover)] border border-[var(--line)] hover:border-[var(--accent-gold)] rounded-lg p-4 cursor-pointer transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-[var(--background)] text-[var(--accent-gold)] border border-[var(--line)]">
                        {sample.type.replace('_', ' ')}
                      </span>
                      <span className="text-[10px] text-red-400 font-mono font-medium">
                        {sample.predatorySummary.split('·')[0].trim()}
                      </span>
                    </div>
                    <h4 className="text-xs font-semibold text-[var(--ink)] group-hover:text-[var(--accent-gold)] transition-colors leading-snug mb-2">
                      {sample.title}
                    </h4>
                    <p className="text-[11px] text-[var(--ink-secondary)] line-clamp-3 leading-relaxed mb-3">
                      {sample.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[var(--line)] flex items-center justify-between text-xs text-[var(--accent-gold)] font-medium">
                    <span>Audit this agreement</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Upload File */}
        {activeTab === 'upload' && (
          <div>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-[var(--accent-gold)] bg-[var(--accent-gold-dim)]'
                  : 'border-[var(--line-highlight)] hover:border-[var(--accent-gold)] bg-[var(--surface)]/50'
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
              <div className="max-w-md mx-auto flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[var(--surface)] border border-[var(--line)] flex items-center justify-center text-[var(--accent-gold)] mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-semibold text-[var(--ink)] mb-1">
                  {isProcessing ? 'Parsing Document AST...' : 'Drop your Word (.docx) or Text (.txt) contract here'}
                </h4>
                <p className="text-xs text-[var(--ink-muted)] mb-3">
                  Parsed entirely client-side. Zero document data is stored on remote servers.
                </p>
                <span className="text-xs font-medium px-3 py-1.5 rounded-md bg-[var(--surface)] border border-[var(--line)] text-[var(--ink-secondary)] hover:text-[var(--ink)]">
                  Browse Files
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Paste Text */}
        {activeTab === 'paste' && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-[var(--ink-secondary)] mb-1">
                Agreement Title (Optional)
              </label>
              <input
                type="text"
                value={contractTitle}
                onChange={(e) => setContractTitle(e.target.value)}
                placeholder="e.g. Master Subscription Agreement with Acme Corp"
                className="w-full text-xs px-3 py-2 rounded-md bg-[var(--background)] border border-[var(--line)] text-[var(--ink)] focus:outline-none focus:border-[var(--accent-gold)]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--ink-secondary)] mb-1">
                Contract Clauses / Agreement Body
              </label>
              <textarea
                rows={6}
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder="Paste contract clauses here (e.g. SECTION 9. LIMITATION OF LIABILITY...)"
                className="w-full text-xs font-mono p-3 rounded-md bg-[var(--background)] border border-[var(--line)] text-[var(--ink)] focus:outline-none focus:border-[var(--accent-gold)] leading-relaxed"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handlePasteSubmit}
                className="px-4 py-2 rounded-md text-xs font-medium bg-[var(--accent-gold)] text-[#0b0f17] hover:bg-[var(--accent-gold-hover)] transition-all flex items-center space-x-1.5"
              >
                <span>Audit & Segment Clauses</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 rounded-md bg-red-900/20 border border-red-500/30 text-xs text-red-300 flex items-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};
