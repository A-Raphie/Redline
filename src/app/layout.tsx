import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://try-redline.vercel.app'),
  title: 'Redline — Open-Standard B2B Contract Audit & Tracked Redlines',
  description:
    'Never sign an unfair contract. Audit incoming agreements against Common Paper open standards, catch hidden liability and renewal traps, and export attorney-grade Word documents with native tracked changes.',
  keywords: [
    'contract review',
    'Common Paper',
    'Bonterms',
    'legal tech',
    'contract redlining',
    'Word tracked changes',
    'SaaS MSA',
    'liability cap audit',
  ],
  authors: [{ name: 'Redline Team (LexHack 2026)' }],
  openGraph: {
    title: 'Redline: Open-Standard B2B Contract Audit & Tracked Redlines',
    description:
      'Never sign an unfair contract. Catch hidden liability and renewal traps, and export attorney-grade Word documents with native tracked changes.',
    url: 'https://try-redline.vercel.app',
    siteName: 'Redline',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Redline: Open-Standard B2B Contract Audit',
    description:
      'Catch hidden liability and renewal traps. Export attorney-grade Word documents with native tracked changes.',
  },
};

export const viewport: Viewport = {
  themeColor: '#F5F1E8',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] antialiased selection:bg-[var(--diff-ins-bg)] selection:text-[var(--diff-ins-text)]">
        {children}
      </body>
    </html>
  );
}
