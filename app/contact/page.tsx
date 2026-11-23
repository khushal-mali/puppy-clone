import type { Metadata } from 'next';
import ContactClient from '@/components/contact/ContactClient';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://puppy.instabizweb.com';

export const metadata: Metadata = {
  title: 'Visit & Contact | Downtown Dubai Showroom',
  description:
    'Visit our Downtown Dubai showroom by appointment or message our concierge team on WhatsApp for teacup puppy consultations and availability.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Visit & Contact | TeddyPups U.A.E.',
    description:
      'Visit our Downtown Dubai showroom by appointment or message our concierge team on WhatsApp for puppy consultations.',
    url: `${BASE_URL}/contact`,
    type: 'website',
  },
};

export default function ContactPage() {
  const jsonLdContact = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Visit & Contact TeddyPups U.A.E.',
    description:
      'Schedule a private visit to our Downtown Dubai puppy showroom or contact us via WhatsApp.',
    mainEntity: {
      '@type': 'PetStore',
      name: 'TeddyPups U.A.E.',
      telephone: '+919898124987',
      url: BASE_URL,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Downtown Dubai',
        addressRegion: 'Dubai',
        addressCountry: 'AE',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdContact) }}
      />
      <ContactClient />
    </>
  );
}
