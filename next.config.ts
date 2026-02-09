import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
    localPatterns: [
      {
        // Allow local images (including those with query strings)
        pathname: '/**/*',
      },
    ],
  },

  experimental: {
    // If you aren't using Turbopack by default, this is safe to remove.
    turbo: true,
  },
};

export default nextConfig;
