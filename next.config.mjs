/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'puppy.instabizweb.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/delivery-collection',
        destination: '/how-it-works#delivery',
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/media/:segment1/:segment2/:filename',
        destination: '/images/:filename',
      },
      {
        source: '/media/:segment1/:segment2/:segment3/:filename',
        destination: '/images/:filename',
      },
      {
        source: '/media/:segment1/:filename',
        destination: '/images/:filename',
      },
    ];
  },
};

export default nextConfig;
