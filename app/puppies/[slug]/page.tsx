import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PUPPIES } from '@/data/puppies';
import PuppyDetailClient from '@/components/puppy/PuppyDetailClient';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://puppy.instabizweb.com';

export async function generateStaticParams() {
  return PUPPIES.map((puppy) => ({
    slug: puppy.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const puppy = PUPPIES.find((p) => p.slug === slug);

  if (!puppy) {
    return {
      title: 'Puppy Not Found',
    };
  }

  const title = `${puppy.name} (${puppy.gender}) — ${puppy.breed} Puppy in Dubai`;
  const description = `${puppy.name} is a ${puppy.age} ${puppy.breed} (${puppy.gender}) available at TeddyPups U.A.E. Dubai showroom. Microchipped, vaccinated, with an official international vet passport.`;
  const canonicalUrl = `${BASE_URL}/puppies/${puppy.slug}`;
  const imageUrl = puppy.images[0]
    ? puppy.images[0].startsWith('http')
      ? puppy.images[0]
      : `${BASE_URL}${puppy.images[0]}`
    : `${BASE_URL}/images/logo.png`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | TeddyPups U.A.E.`,
      description,
      url: canonicalUrl,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${puppy.name} - ${puppy.breed}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | TeddyPups U.A.E.`,
      description,
      images: [imageUrl],
    },
  };
}

export default async function PuppyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const puppy = PUPPIES.find((p) => p.slug === slug);

  if (!puppy) {
    notFound();
  }

  // Available puppies circular navigation matching original site
  const availableSlugs = [
    'maltipoo-max-male',
    'korean-teacup-maltipoo-female',
    'korean-teacup-poodle-female',
    'maltipoo-cavapoo-male',
    'toy-poodle-male-female',
    'maltipoo-female-2',
    'pomeranian-female',
    'copper-male',
    'shitzu-female',
    'shitzu-male',
    'maltipoo-female-1',
    'maltipoo-female',
    'korean-teacup-pomeranian-1',
    'korean-teacup-pomeranian',
    'korean-teacup-pomeranian-male',
  ];

  let prevPuppy: (typeof PUPPIES)[number];
  let nextPuppy: (typeof PUPPIES)[number];

  const availIdx = availableSlugs.indexOf(slug);
  if (availIdx !== -1) {
    const prevSlug =
      availableSlugs[(availIdx - 1 + availableSlugs.length) % availableSlugs.length];
    const nextSlug = availableSlugs[(availIdx + 1) % availableSlugs.length];
    prevPuppy = PUPPIES.find((p) => p.slug === prevSlug) || PUPPIES[0];
    nextPuppy = PUPPIES.find((p) => p.slug === nextSlug) || PUPPIES[0];
  } else {
    const currentIndex = PUPPIES.findIndex((p) => p.slug === slug);
    prevPuppy = PUPPIES[(currentIndex - 1 + PUPPIES.length) % PUPPIES.length];
    nextPuppy = PUPPIES[(currentIndex + 1) % PUPPIES.length];
  }

  const jsonLdProduct = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${puppy.name} — ${puppy.breed}`,
    description: puppy.description,
    image: puppy.images.map((img) =>
      img.startsWith('http') ? img : `${BASE_URL}${img}`
    ),
    category: 'Animals & Pet Supplies > Pet Supplies > Dogs',
    brand: {
      '@type': 'Brand',
      name: 'TeddyPups',
    },
    offers: {
      '@type': 'Offer',
      availability:
        puppy.status === 'available'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/SoldOut',
      priceCurrency: 'AED',
      url: `${BASE_URL}/puppies/${puppy.slug}`,
      itemCondition: 'https://schema.org/NewCondition',
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Breed',
        value: puppy.breed,
      },
      {
        '@type': 'PropertyValue',
        name: 'Gender',
        value: puppy.gender,
      },
      {
        '@type': 'PropertyValue',
        name: 'Age',
        value: puppy.age,
      },
      {
        '@type': 'PropertyValue',
        name: 'Location',
        value: puppy.location,
      },
      {
        '@type': 'PropertyValue',
        name: 'Health Certification',
        value: 'Verified by Licensed Veterinarian with International Passport',
      },
    ],
  };

  return (
    <div data-page="pup" className="tp-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
      />
      <PuppyDetailClient
        puppy={puppy}
        prevPuppy={prevPuppy}
        nextPuppy={nextPuppy}
      />
    </div>
  );
}
