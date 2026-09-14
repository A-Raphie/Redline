import Link from 'next/link';
import { Scale, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-12 h-12 rounded-2xl bg-[var(--brand)] text-[var(--accent-foreground)] flex items-center justify-center font-bold text-lg mb-4 shadow-sm">
        <Scale className="w-6 h-6" />
      </div>
      <h1 className="text-2xl font-extrabold tracking-tight mb-2">Page Not Found</h1>
      <p className="text-xs text-[var(--text-secondary)] max-w-sm mb-6 leading-relaxed">
        The contract or page you are looking for does not exist. Return to the main redlining workbench to audit agreements.
      </p>
      <Link
        href="/"
        className="px-4 py-2 rounded-xl text-xs font-semibold bg-[var(--brand)] text-[var(--accent-foreground)] hover:opacity-90 transition-all flex items-center space-x-1.5 shadow-xs"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Redline Workbench</span>
      </Link>
    </div>
  );
}
