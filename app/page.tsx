import type { Metadata } from 'next';
import HomeClient from '@/components/home/HomeClient';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://puppy.instabizweb.com';

export const metadata: Metadata = {
  title: 'TeddyPups U.A.E. — Premium Teacup & Toy Puppies in Dubai',
  description:
    'Dubai’s premier boutique for miniature teacup puppies. Discover Korean teacup Maltipoos, Toy Poodles, Cavapoos, and Pomeranians with international health passports.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'TeddyPups U.A.E. — Premium Teacup & Toy Puppies in Dubai',
    description:
      'Dubai’s premier boutique for miniature teacup puppies. Discover Korean teacup Maltipoos, Toy Poodles, Cavapoos, and Pomeranians.',
    url: BASE_URL,
    type: 'website',
  },
};

export default function HomePage() {
  return <HomeClient />;
}
