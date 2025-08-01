import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },

  // basepath is used for deploying to a github pages , when building app for github pages as static files use it.
  // for local development, you can ignore this or comment it out
  // basePath: "/webapp_for_Unity3dGame_nextjs-",
};

export default nextConfig;
