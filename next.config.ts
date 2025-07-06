import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Enable standalone output for Docker deployment
    output: "standalone",

    // ESLint configuration
    eslint: {
        ignoreDuringBuilds: true,
    },

    // TypeScript configuration
    typescript: {
        ignoreBuildErrors: false,
    },

    // Optimize images
    images: {
        unoptimized: false,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },

    // Compress static assets
    compress: true,

    // Optimize bundle
    experimental: {
        optimizePackageImports: ["lucide-react"],
    },
};

export default nextConfig;
