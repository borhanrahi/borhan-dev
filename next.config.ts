import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  compress: true,
  experimental: {
    optimizeServerReact: true,
    optimizeCss: true,
  },
  scriptLoader: {
    strategy: "afterInteractive",
  },
  webpack: (config, { dev }) => {
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          minSize: 20000,
          maxSize: 70000,
          cacheGroups: {
            default: false,
            vendors: false,
            vendor: {
              name: "vendor",
              chunks: "all",
              test: /node_modules/,
              priority: 20,
            },
            common: {
              name: "common",
              minChunks: 2,
              chunks: "all",
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
        runtimeChunk: { name: "runtime" },
      };
    }
    return config;
  },
};

export default nextConfig;
