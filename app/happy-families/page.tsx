import type { Metadata } from 'next';
import HappyFamiliesClient from '@/components/happy-families/HappyFamiliesClient';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://puppy.instabizweb.com';

export const metadata: Metadata = {
  title: 'Happy Families — Testimonials & Puppy Adoption Stories',
  description:
    'Heartwarming moments and testimonials from families who welcomed a Teddy Pup into their Dubai and UAE homes. Real photos, real stories.',
  alternates: {
    canonical: '/happy-families',
  },
  openGraph: {
    title: 'Happy Families | TeddyPups U.A.E.',
    description:
      'Heartwarming moments and testimonials from families who welcomed a Teddy Pup into their Dubai and UAE homes.',
    url: `${BASE_URL}/happy-families`,
    type: 'website',
  },
};

export default function HappyFamiliesPage() {
  const jsonLdCollection = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Happy Families — TeddyPups U.A.E.',
    description:
      'Testimonials and gallery of happy families who adopted teacup puppies from TeddyPups in Dubai.',
    url: `${BASE_URL}/happy-families`,
    publisher: {
      '@type': 'PetStore',
      name: 'TeddyPups U.A.E.',
      url: BASE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCollection) }}
      />
      <HappyFamiliesClient />
    </>
  );
}
