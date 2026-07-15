"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

// ════════════════════════════════════════════════════════════════════════════
// Hero006Card — exact copy from Minimalist Hero Section template (hero7.tsx + page.tsx)
// ════════════════════════════════════════════════════════════════════════════
// Centered hero with:
//   • Radial gradient background: white → indigo (#6366f1) — from page.tsx
//   • Headline "Premium Notion Templates for productivity" — fades up (0.2s)
//   • Description — fades up (0.4s)
//   • "Browse Templates" button — fades up (0.6s)
//   • 5 avatar stack + 5 stars + 4.9 rating + "from 500+ reviews" — fades up (0.8s)
//
// All values are the exact defaults from hero7.tsx. The radial gradient bg is
// the exact one from page.tsx.

const HEADING = "Premium Notion Templates for productivity";
const DESCRIPTION = "Beautifully designed, professionally crafted Notion templates to boost your productivity and streamline your workflow. Ready to use, easy to customize.";

const AVATARS = [
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp", alt: "Avatar 1" },
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp", alt: "Avatar 2" },
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp", alt: "Avatar 3" },
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp", alt: "Avatar 4" },
  { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp", alt: "Avatar 5" },
];

const RATING = 4.9;
const REVIEW_COUNT = 500;

export function Hero006Card() {
  return (
    <div className="relative min-h-full w-full overflow-hidden">
      {/* ── Exact radial gradient background from page.tsx ── */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #6366f1 100%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10">
        <section className="py-32">
          <div className="container text-center max-w-5xl mx-auto px-6">
            <div className="mx-auto flex max-w-5xl flex-col gap-6">
              {/* Headline */}
              <motion.h1
                className="text-3xl font-extrabold lg:text-6xl tracking-tight text-balance text-zinc-950"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                {HEADING}
              </motion.h1>

              {/* Description */}
              <motion.p
                className="text-zinc-600 text-balance lg:text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              >
                {DESCRIPTION}
              </motion.p>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            >
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center justify-center mt-10 h-11 px-8 rounded-md text-sm font-medium bg-zinc-950 text-white hover:bg-zinc-800 transition-colors"
              >
                Browse Templates
              </a>
            </motion.div>

            {/* Avatar stack + star rating */}
            <motion.div
              className="mx-auto mt-10 flex w-fit flex-col items-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            >
              <span className="mx-4 inline-flex items-center -space-x-4">
                {AVATARS.map((avatar, index) => (
                  <span
                    key={index}
                    className="inline-block size-14 rounded-full border-2 border-white overflow-hidden"
                  >
                    { }
                    <img
                      src={avatar.src}
                      alt={avatar.alt}
                      className="w-full h-full object-cover"
                    />
                  </span>
                ))}
              </span>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="size-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="mr-1 font-semibold text-zinc-950">{RATING.toFixed(1)}</span>
                </div>
                <p className="text-zinc-600 text-left font-medium">from {REVIEW_COUNT}+ reviews</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
