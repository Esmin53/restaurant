import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://ki3uenrsend2fbcx.public.blob.vercel-storage.com/**')],
  },
};

export default nextConfig;
