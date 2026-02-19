import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'ftp.goit.study' },
      { protocol: 'https', hostname: '66b1f8e71ca8ad33d4f5f63e.mockapi.io' },
    ],
  },
};

export default nextConfig;

