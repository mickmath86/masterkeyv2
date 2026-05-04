import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Disable browser scroll restoration — our ScrollReset component
    // handles scrolling to the top on every route change instead.
    experimental: {
        scrollRestoration: false,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.repliers.io",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "*.repliers.io",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
