import type { Metadata } from 'next';
import './globals.css';
import { GrainOverlay }   from '@/components/ui/GrainOverlay';
import { CustomCursor }   from '@/components/ui/CustomCursor';
import { LenisProvider }  from '@/components/ui/LenisProvider';

export const metadata: Metadata = {
  title: 'SEION — AI Systems for Indian Business',
  description:
    'Custom AI systems for Indian businesses — automation workflows, live dashboards, and decision tools built around the data you already have.',
  metadataBase: new URL('https://seion.digital'),
  openGraph: {
    title: 'SEION — AI Systems for Indian Business',
    description: 'AI systems built for how India actually works.',
    url: 'https://seion.digital',
    siteName: 'SEION',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LenisProvider>
          <GrainOverlay />
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
