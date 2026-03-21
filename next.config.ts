import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fix for Vercel deployment issues
  trailingSlash: false,
  // Optimize for production
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};

export default nextConfig;
