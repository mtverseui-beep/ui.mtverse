import type { NextConfig } from "next";

const oldSlugs = [
  "cinematic-folder-card",
  "glass-feature-card",
  "pricing-plan-card",
  "analytics-insight-card",
  "creator-profile-card",
  "ecommerce-product-card",
  "upload-progress-card",
  "notification-inbox-card",
  "event-booking-card",
  "ai-generation-result-card",
];

const redirects = oldSlugs.map((slug) => ({
  source: `/components/${slug}`,
  destination: `/components/cards/${slug}`,
  permanent: true,
}));

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.cosmos.so",
      },
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      },
    ],
  },
  async redirects() {
    return redirects;
  },
  // Hierarchical pretty URLs (/components/<group>/<name>) are served by the
  // physical pages at /components/cards/<name>-card. `afterFiles` rewrites run
  // only when no real file/route matches, so direct physical URLs keep working
  // and there is no rewrite loop.
  async rewrites() {
    return {
      afterFiles: [
        {
          source: "/components/:group/:name",
          destination: "/components/cards/:name-card",
        },
      ],
    };
  },
};

export default nextConfig;
