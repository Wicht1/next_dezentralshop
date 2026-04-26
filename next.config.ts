import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dezentralshop.ch",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
