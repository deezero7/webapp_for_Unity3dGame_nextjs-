import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  basePath: "/webapp_for_Unity3dGame_nextjs-",
};

export default nextConfig;
