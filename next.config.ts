import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "phimimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
    domains: ["phimimg.com", "image.tmdb.org", "lh3.googleusercontent.com"],
  },
  compiler: {
    emotion: true,
  },
  experimental: {
    optimizePackageImports: [
      "@chakra-ui/react",
      "@chakra-ui/icons",
      "@chakra-ui/theme",
      "@chakra-ui/system",
      "@emotion/react",
      "@emotion/styled",
      "framer-motion",
    ],
  },
  webpack: (config) => {
    config.cache = {
      type: "filesystem",
      compression: "gzip",
      allowCollectingMemory: true,
    };
    return config;
  },
};

export default nextConfig;
