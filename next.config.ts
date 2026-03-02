import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/ann-design-site",
  assetPrefix: "/ann-design-site/",
};

export default nextConfig;