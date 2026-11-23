import type { Metadata } from 'next';
import FAQClient from '@/components/faq/FAQClient';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://puppy.instabizweb.com';

export const metadata: Metadata = {
  title: 'Questions & Answers | Puppy Adoption Dubai',
  description:
    'Frequently asked questions about health certifications, vaccinations, showroom visits, puppy delivery, and international imports at TeddyPups U.A.E.',
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'Questions & Answers | TeddyPups U.A.E.',
    description:
      'Frequently asked questions about health certifications, vaccinations, showroom visits, and puppy care.',
    url: `${BASE_URL}/faq`,
    type: 'website',
  },
};

export default function FAQPage() {
  return <FAQClient />;
}
