import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "https://orbital-cli-f83y.onrender.com/api/auth/:path*",
      },
    ];
  },
};

export default nextConfig;
