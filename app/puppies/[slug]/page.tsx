import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PUPPIES } from '@/data/puppies';
import PuppyDetailClient from '@/components/puppy/PuppyDetailClient';

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

  const title = `${puppy.name}, ${puppy.breed} puppy | TeddyPups U.A.E.`;
  const description = `${puppy.name}, a gorgeous ${puppy.breed} (${puppy.gender}, ${puppy.age}) at TeddyPups U.A.E. Dubai showroom. Health certified with international vet passport.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: puppy.images[0] ? [{ url: puppy.images[0] }] : [],
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

  return (
    <div data-page="pup" className="tp-page">
      <PuppyDetailClient
        puppy={puppy}
        prevPuppy={prevPuppy}
        nextPuppy={nextPuppy}
      />
    </div>
  );
}
