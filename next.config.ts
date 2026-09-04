import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    qualities: [75, 90, 92],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.skyhurststudios.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      // Add your WordPress CMS domain here when ready:
      // { protocol: 'https', hostname: 'cms.skyhurststudios.com', pathname: '/**' },
    ],
  },
};

export default nextConfig;

