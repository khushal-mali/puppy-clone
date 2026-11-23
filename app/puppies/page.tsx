import type { Metadata } from 'next';
import PuppiesClient from '@/components/puppies/PuppiesClient';
import { PUPPIES } from '@/data/puppies';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://puppy.instabizweb.com';

export const metadata: Metadata = {
  title: 'Available Teacup & Miniature Puppies in Dubai',
  description:
    'Explore available teacup Maltipoos, Poodles, Cavapoos, and Pomeranians ready for loving families in Dubai and the UAE. Health-certified with international vet passports.',
  alternates: {
    canonical: '/puppies',
  },
  openGraph: {
    title: 'Available Teacup & Miniature Puppies in Dubai | TeddyPups U.A.E.',
    description:
      'Explore available teacup Maltipoos, Poodles, Cavapoos, and Pomeranians ready for loving families in Dubai and the UAE.',
    url: `${BASE_URL}/puppies`,
    type: 'website',
  },
};

export default function PuppiesPage() {
  const jsonLdItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Available Teacup Puppies in Dubai',
    description: 'Catalog of miniature and teacup puppies available at TeddyPups U.A.E.',
    numberOfItems: PUPPIES.length,
    itemListElement: PUPPIES.map((puppy, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${puppy.name} — ${puppy.breed}`,
      url: `${BASE_URL}/puppies/${puppy.slug}`,
      image: puppy.images[0]
        ? puppy.images[0].startsWith('http')
          ? puppy.images[0]
          : `${BASE_URL}${puppy.images[0]}`
        : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdItemList) }}
      />
      <PuppiesClient />
    </>
  );
}
