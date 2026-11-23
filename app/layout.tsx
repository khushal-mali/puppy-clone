import type { Metadata, Viewport } from 'next';
import './globals.css';
import { fontFraunces, fontFigtree, fontShantell } from '@/lib/fonts';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Curtain from '@/components/layout/Curtain';
import PawCursor from '@/components/home/PawCursor';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://puppy.instabizweb.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'TeddyPups U.A.E. — Premium teacup puppies in Dubai',
    template: '%s | TeddyPups U.A.E.',
  },
  description:
    'TeddyPups U.A.E. is a Dubai-based boutique specializing in miniature teacup puppies, offering premier teacup Maltipoos, Poodles, Pomeranians, and Cavapoos with certified vet passports.',
  keywords: [
    'TeddyPups',
    'TeddyPups UAE',
    'teacup puppies Dubai',
    'teacup maltipoo Dubai',
    'toy poodle Dubai',
    'Korean teacup puppies',
    'Cavapoo Dubai',
    'Pomeranian Dubai',
    'ethical puppy breeders UAE',
    'puppy adoption Dubai',
    'buy puppy in Dubai',
    'miniature puppies UAE',
    'licensed vet passport puppy Dubai',
  ],
  authors: [{ name: 'TeddyPups U.A.E.', url: BASE_URL }],
  creator: 'TeddyPups U.A.E.',
  publisher: 'TeddyPups U.A.E.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: BASE_URL,
    siteName: 'TeddyPups U.A.E.',
    title: 'TeddyPups U.A.E. — Premium teacup puppies in Dubai',
    description:
      'TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies, offering premier teacup Maltipoos, Poodles, Pomeranians, and Cavapoos.',
    images: [
      {
        url: '/images/logo.png',
        width: 512,
        height: 512,
        alt: 'TeddyPups U.A.E. Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TeddyPups U.A.E. — Premium teacup puppies in Dubai',
    description:
      'TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies, offering premier teacup Maltipoos, Poodles, Pomeranians, and Cavapoos.',
    images: ['/images/logo.png'],
  },
  icons: {
    icon: [
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
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
  const jsonLdOrg = {
    '@context': 'https://schema.org',
    '@type': 'PetStore',
    '@id': `${BASE_URL}/#organization`,
    name: 'TeddyPups U.A.E.',
    alternateName: 'TeddyPups Dubai',
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    image: `${BASE_URL}/images/logo.png`,
    description:
      'TeddyPups U.A.E. is a premier boutique in Dubai specializing in miniature teacup puppies, including Maltipoos, Poodles, Cavapoos, and Pomeranians with international health passports.',
    telephone: '+919898124987',
    priceRange: '$$$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Downtown Dubai',
      addressRegion: 'Dubai',
      addressCountry: 'AE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.1972,
      longitude: 55.2744,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '10:00',
        closes: '21:00',
      },
    ],
    sameAs: ['https://wa.me/919898124987'],
  };

  const jsonLdWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'TeddyPups U.A.E.',
    description: 'Premium teacup and miniature puppies in Dubai',
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
  };

  return (
    <html
      lang="en"
      className={`${fontFraunces.variable} ${fontFigtree.variable} ${fontShantell.variable}`}
    >
      <head>
        <link rel="stylesheet" href="/original.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
      </head>
      <body className="bg-milk text-cocoa min-h-screen flex flex-col font-sans selection:bg-honey/30">
        <SmoothScrollProvider>
          <Curtain />
          <PawCursor />
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
