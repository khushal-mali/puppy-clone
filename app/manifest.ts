import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TeddyPups U.A.E. — Premium Teacup Puppies in Dubai',
    short_name: 'TeddyPups',
    description:
      'TeddyPups U.A.E. is a Dubai-based boutique specializing in miniature teacup puppies, Maltipoos, Poodles, and Cavapoos.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fffdf8',
    theme_color: '#783819',
    icons: [
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
