import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/webp"],
  },
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizeServerReact: true,
    optimizeCss: true,
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  webpack: (config, { dev }) => {
    // Production optimizations
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        moduleIds: "deterministic",
        splitChunks: {
          chunks: "all",
          minSize: 20000,
          maxSize: 70000,
          cacheGroups: {
            default: false,
            vendors: false,
            framework: {
              name: "framework",
              chunks: "all",
              test: /[\/]node_modules[\/](react|react-dom|next)[\/]/,
              priority: 40,
              enforce: true,
            },
            lib: {
              test: /[\/]node_modules[\/]/,
              name(module: { context: string }) {
                const match = module.context.match(
                  /[\/]node_modules[\/](.*?)([\/]|$)/
                );
                return match ? `npm.${match[1].replace("@", "")}` : "vendor";
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            commons: {
              name: "commons",
              minChunks: 2,
              priority: 20,
            },
            shared: {
              name(module: { context: string }, chunks: { name: string }[]) {
                return `shared.${chunks.map((c) => c.name).join(".")}`;;
              },
              priority: 10,
              minChunks: 2,
              reuseExistingChunk: true,
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
