import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rspneus.com.br',
        port: '',
        pathname: '/**/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
