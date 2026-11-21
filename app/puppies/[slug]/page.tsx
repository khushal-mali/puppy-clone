import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PUPPIES } from '@/data/puppies';
import { HTML_PUPPY_PROFILE } from '@/data/pageHtml';

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

  // Render the exact profile template customized for this puppy
  let html = HTML_PUPPY_PROFILE;
  if (puppy.slug !== 'maltipoo-max-male') {
    html = html.replace(/Max/g, puppy.name);
    html = html.replace(/Maltipoo/g, puppy.breed);
    html = html.replace(/maltipoo-max-male/g, puppy.slug);
    if (puppy.images[0]) {
      html = html.replace(/\/images\/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2\.webp/g, puppy.images[0]);
    }
    if (puppy.gender) {
      html = html.replace(/Boy/g, puppy.gender);
    }
    if (puppy.age) {
      html = html.replace(/3 months/g, puppy.age);
    }
    if (puppy.location) {
      html = html.replace(/Imported for you/g, puppy.location);
    }
  }

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className="contents"
    />
  );
}
