import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    localPatterns: [
      { pathname: '/images/**' },
      { pathname: '/file.svg' },
      { pathname: '/globe.svg' },
      { pathname: '/next.svg' },
      { pathname: '/vercel.svg' },
      { pathname: '/window.svg' },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
