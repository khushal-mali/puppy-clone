import type { MetadataRoute } from 'next';
import { PUPPIES } from '@/data/puppies';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://puppy.instabizweb.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Core static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/puppies`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/happy-families`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/how-it-works`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Dynamic puppy profile pages
  const puppyPages: MetadataRoute.Sitemap = PUPPIES.map((puppy) => ({
    url: `${BASE_URL}/puppies/${puppy.slug}`,
    lastModified: currentDate,
    changeFrequency: puppy.status === 'available' ? 'daily' : 'weekly',
    priority: puppy.status === 'available' ? 0.85 : 0.65,
  }));

  return [...staticPages, ...puppyPages];
}
