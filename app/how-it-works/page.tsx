import type { Metadata } from 'next';
import HowItWorksClient from '@/components/how-it-works/HowItWorksClient';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://puppy.instabizweb.com';

export const metadata: Metadata = {
  title: 'How It Works — Teacup Puppy Adoption in Dubai',
  description:
    'Learn how to meet, reserve, and adopt a teacup puppy in Dubai or order an imported miniature puppy with verified health certificates and passport.',
  alternates: {
    canonical: '/how-it-works',
  },
  openGraph: {
    title: 'How It Works — Teacup Puppy Adoption in Dubai | TeddyPups U.A.E.',
    description:
      'Learn how to meet, reserve, and adopt a teacup puppy in Dubai or order an imported miniature puppy.',
    url: `${BASE_URL}/how-it-works`,
    type: 'website',
  },
};

export default function HowItWorksPage() {
  const jsonLdHowTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Adopt a Teacup Puppy at TeddyPups U.A.E.',
    description:
      'A seamless 3-step guide to adopting a healthy, certified miniature teacup puppy in Dubai.',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Choose or Request Your Puppy',
        text: 'Explore our available showroom puppies or request a custom import from certified Korean and European breeders.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Bond & Verify Health Certification',
        text: 'Meet your puppy at our Downtown Dubai showroom, or receive live HD video verification along with complete vet health inspection records.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Welcome Your Puppy Home',
        text: 'Complete same-day adoption for local puppies or stress-free door-to-door import delivery with microchip and official international passport.',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowTo) }}
      />
      <HowItWorksClient />
    </>
  );
}
