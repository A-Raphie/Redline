'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Scale, 
  Download, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  Cpu, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  EyeOff,
  ArrowRight
} from 'lucide-react';

export const ProductStorySections: React.FC = () => {
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({ 0: true });

  const toggleFaq = (index: number) => {
    setOpenFaqs(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const FAQS = [
    {
      q: 'What is Common Paper and why does Redline use it?',
      a: 'Common Paper publishes open-source standard legal agreements (MIT licensed), drafted and reviewed by a committee of dozens of leading commercial attorneys. Thousands of technology companies use them as fair market consensus. Redline uses these standards as a neutral, trusted benchmark instead of arbitrary subjective criteria.'
    },
    {
      q: 'Why benchmark against open standards instead of using generic AI prompts?',
      a: 'General LLMs frequently hallucinate unenforceable terms, introduce unpredictable wording, and send sensitive enterprise contracts to external model servers. Redline uses structured, deterministic benchmarking against verified legal standards, guaranteeing enforceable language with zero hallucination risk.'
    },
    {
      q: 'Are the exported Word files native tracked changes?',
      a: 'Yes. Redline does not export simulated visual highlights. It generates genuine Office OpenXML <w:ins> and <w:del> revision tags with tracked-change author attribution and comment cards. When your counterpart opens the document in Microsoft Word or Google Docs, they can natively click Accept or Reject on each individual change.'
    },
    {
      q: 'Is my contract data kept private?',
      a: '100% private. Redline runs entirely in your browser. Document parsing, clause extraction, standard benchmarking, and Word docx assembly all execute client-side in local JavaScript. Zero contract text is ever sent to a remote backend or used for training.'
    },
    {
      q: 'Can I audit contracts other than SaaS agreements and NDAs?',
      a: 'Yes. The engine tests standard commercial legal categories: Limitation of Liability, Indemnification, Term & Renewal, IP Rights, Warranties, Governing Law, and Fees & Payment. You can upload consulting agreements, service orders, or master services agreements.'
    }
  ];

  const TRAPS = [
    {
      title: 'Predatory Liability Caps',
      category: 'Limitation of Liability',
      predatory: 'Vendor caps its total liability at $100 or 1 month of fees, while leaving customer liability completely uncapped.',
      fairFix: 'Mutual 12-month aggregate fee cap with standard mutual carve-outs for confidentiality breaches and third-party indemnity.',
      standard: 'Common Paper CSA v1.0 § 9'
    },
    {
      title: 'Stealth Auto-Renewal Windows',
      category: 'Term & Renewal',
      predatory: 'Contract automatically locks customer into 24-month renewals unless written notice is delivered 90 days before expiry.',
      fairFix: 'Reasonable 30-day notice period with automatic reminder notices and no hidden fee escalations.',
      standard: 'Common Paper CSA v1.0 § 5'
    },
    {
      title: 'Telemetry & Customer Data Grabs',
      category: 'IP & Data Rights',
      predatory: 'Vendor receives perpetual, royalty-free rights to use customer inputs, confidential documents, and telemetry to train internal models.',
      fairFix: 'Customer retains 100% exclusive ownership of customer data. Vendor may process data solely to provide the contracted services.',
      standard: 'Common Paper CSA v1.0 § 4'
    },
    {
      title: 'Unilateral Contract Modifications',
      category: 'Modifications & Terms',
      predatory: 'Vendor reserves right to alter pricing, SLAs, security controls, or contract terms at any time by updating a public web URL.',
      fairFix: 'All material terms require written mutual amendments signed by authorized representatives of both parties.',
      standard: 'Common Paper CSA v1.0 § 14'
    }
  ];

  return (
    <div className="mt-16 space-y-20 min-w-0 max-w-full">
      {/* 1. How It Works (3 Steps) */}
      <section id="how-it-works" className="border-t border-[var(--border-default)] pt-12 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-default)] text-xs font-semibold text-[var(--text-secondary)] mb-3">
            <Cpu className="w-3.5 h-3.5 text-[var(--brand)]" />
            <span>Operational Workflow</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
            How Redline Works
          </h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
            From predatory vendor agreement to an attorney-ready Word redline in under 60 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="paper-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold font-mono text-[var(--brand)]">01 / INGEST</span>
                  <ArrowRight className="w-3 h-3 text-[var(--text-muted)] hidden md:inline" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-[var(--bg-subtle)] flex items-center justify-center text-[var(--brand)] border border-[var(--border-default)]">
                  <FileText className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">
                Upload or Paste Contract
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Drop in a Microsoft Word .docx or paste agreement text. Client-side extractors parse the document into discrete legal clauses without sending data over the network.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[var(--border-default)] text-[11px] font-semibold text-[var(--text-muted)] flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--diff-ins-text)]" />
              <span>Full .docx &amp; plaintext support</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="paper-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold font-mono text-[var(--accent-gold)]">02 / BENCHMARK</span>
                  <ArrowRight className="w-3 h-3 text-[var(--text-muted)] hidden md:inline" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-[var(--bg-subtle)] flex items-center justify-center text-[var(--accent-gold)] border border-[var(--border-default)]">
                  <Scale className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">
                Open-Standard Risk Audit
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Clauses are benchmarked against vetted Common Paper standard terms. Asymmetric liabilities, hidden indemnities, and lock-in renewals are flagged with letter grades and plain-English rationales.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[var(--border-default)] text-[11px] font-semibold text-[var(--text-muted)] flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--diff-ins-text)]" />
              <span>Common Paper CSA, NDA &amp; PSA Rules</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="paper-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold font-mono text-[var(--diff-ins-text)]">03 / EXPORT</span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-[var(--bg-subtle)] flex items-center justify-center text-[var(--diff-ins-text)] border border-[var(--border-default)]">
                  <Download className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">
                Native Word .docx Redlines
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Export an authentic Microsoft Word document formatted with native tracked changes (&lt;w:ins&gt; and &lt;w:del&gt;) and an executive pushback email memo ready to send to opposing counsel.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[var(--border-default)] text-[11px] font-semibold text-[var(--text-muted)] flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--diff-ins-text)]" />
              <span>Genuine OpenXML tracked changes</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The 4 Predatory Traps We Catch */}
      <section id="traps" className="border-t border-[var(--border-default)] pt-12 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--diff-del-bg)] border border-[var(--diff-del-border)] text-xs font-semibold text-[var(--diff-del-text)] mb-3">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            <span>Predatory Clause Detection</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
            The 4 Hidden Traps in Standard Vendor MSAs
          </h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
            Enterprise vendors rely on customer deal fatigue to slip one-sided terms past review. Redline replaces them with market standard terms automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TRAPS.map((trap, idx) => (
            <div key={idx} className="paper-card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold legal-mono px-2 py-0.5 rounded-md bg-[var(--bg-subtle)] text-[var(--brand)] border border-[var(--border-default)]">
                  {trap.category}
                </span>
                <span className="text-[11px] text-[var(--text-muted)] font-mono">
                  {trap.standard}
                </span>
              </div>

              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                {trap.title}
              </h3>

              {/* Predatory vs Fair Grid */}
              <div className="space-y-2.5 text-xs">
                <div className="rounded-xl border border-[var(--diff-del-border)] bg-[var(--diff-del-bg)]/40 p-3">
                  <div className="text-[10px] uppercase font-bold text-[var(--diff-del-text)] mb-1 flex items-center space-x-1">
                    <span>Predatory Vendor Language</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {trap.predatory}
                  </p>
                </div>

                <div className="rounded-xl border border-[var(--diff-ins-border)] bg-[var(--diff-ins-bg)]/40 p-3">
                  <div className="text-[10px] uppercase font-bold text-[var(--diff-ins-text)] mb-1 flex items-center space-x-1">
                    <span>Common Paper Fair Replacement</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {trap.fairFix}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. 100% Client-Side Privacy & Architecture */}
      <section id="privacy" className="border-t border-[var(--border-default)] pt-12 scroll-mt-20">
        <div className="paper-card p-6 sm:p-8 bg-[var(--bg-surface)]">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-default)] text-xs font-semibold text-[var(--brand)] mb-4">
                <Lock className="w-3.5 h-3.5" />
                <span>Zero-Trust Legal Privacy</span>
              </div>
              <h2 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight mb-3">
                100% Client-Side Privacy Architecture
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                Confidential corporate contracts, pricing exhibits, and IP provisions should never be uploaded to third-party cloud servers or used to train proprietary language models.
              </p>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Redline operates entirely inside your local browser tab. The parser, risk scorer, and native Word docx generator execute via Web Workers and local JavaScript memory. Once you close the tab, zero footprint remains.
              </p>
            </div>

            {/* Architecture Proof Points */}
            <div className="w-full lg:w-auto shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] flex items-start space-x-2.5">
                <ShieldCheck className="w-4 h-4 text-[var(--diff-ins-text)] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[var(--text-primary)]">Zero Server Storage</div>
                  <div className="text-[11px] text-[var(--text-muted)] mt-0.5">No database, no S3 buckets, no telemetry.</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] flex items-start space-x-2.5">
                <Cpu className="w-4 h-4 text-[var(--brand)] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[var(--text-primary)]">In-Browser AST Engine</div>
                  <div className="text-[11px] text-[var(--text-muted)] mt-0.5">Local regex segmentation &amp; scoring.</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] flex items-start space-x-2.5">
                <EyeOff className="w-4 h-4 text-[var(--brand-strong)] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[var(--text-primary)]">No Model Training</div>
                  <div className="text-[11px] text-[var(--text-muted)] mt-0.5">Your agreements are never used as training data.</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] flex items-start space-x-2.5">
                <Download className="w-4 h-4 text-[var(--accent-gold)] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[var(--text-primary)]">Direct Blob Export</div>
                  <div className="text-[11px] text-[var(--text-muted)] mt-0.5">DOCX zip stream assembled locally.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Frequently Asked Questions */}
      <section id="faq" className="border-t border-[var(--border-default)] pt-12 pb-6 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-default)] text-xs font-semibold text-[var(--text-secondary)] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            <span>Clarifications</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
            Everything you need to know about open standards, tracked changes, and legal workflows.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = !!openFaqs[index];
            return (
              <div key={index} className="paper-card overflow-hidden transition-all">
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 text-left flex items-center justify-between space-x-4 cursor-pointer hover:bg-[var(--bg-subtle)]/40 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                    {faq.q}
                  </span>
                  <span className="shrink-0 text-[var(--text-muted)]">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-default)]/60 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
