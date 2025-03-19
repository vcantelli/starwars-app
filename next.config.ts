import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lumiere-a.akamaihd.net',
      },
    ]
  },
};


export default nextConfig;
