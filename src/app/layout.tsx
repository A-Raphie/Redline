import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'REDLINE // Open-Standard B2B Contract Audit & Redline Engine',
  description:
    'Audit incoming contracts against open-standard legal frameworks (Common Paper & Bonterms). Detect predatory liability and renewal traps, and export attorney-grade .docx with native Word tracked changes.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[var(--background)] text-[var(--ink)] antialiased selection:bg-[var(--accent-gold-dim)] selection:text-[var(--accent-gold)]">
        {children}
      </body>
    </html>
  );
}
