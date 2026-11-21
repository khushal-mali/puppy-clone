import type { Metadata, Viewport } from 'next';
import './globals.css';
import { fontFraunces, fontFigtree, fontShantell } from '@/lib/fonts';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://puppy.instabizweb.com'),
  title: {
    default: 'TeddyPups U.A.E. — Premium teacup puppies in Dubai',
    template: '%s | TeddyPups U.A.E.',
  },
  description:
    'TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies, offering premier teacup Maltipoos, Poodles, Pomeranians and Cavapoos.',
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: 'https://puppy.instabizweb.com',
    siteName: 'TeddyPups U.A.E.',
    title: 'TeddyPups U.A.E. — Premium teacup puppies in Dubai',
    description:
      'TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies, offering premier teacup puppies in Dubai.',
    images: [
      {
        url: '/images/logo.png',
        width: 128,
        height: 128,
        alt: 'TeddyPups U.A.E. Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TeddyPups U.A.E. — Premium teacup puppies in Dubai',
    description:
      'TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies.',
    images: ['/images/logo.png'],
  },
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#fffdf8',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-pup="live"
      className={`${fontFraunces.variable} ${fontFigtree.variable} ${fontShantell.variable}`}
    >
      <head>
        <link rel="stylesheet" href="/original.css" />
      </head>
      <body className="bg-milk text-cocoa min-h-screen flex flex-col font-sans selection:bg-honey/30">
        <SmoothScrollProvider>
          <Header />
          <main id="main" className="relative pt-[var(--header-h)] outline-none flex-1">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
