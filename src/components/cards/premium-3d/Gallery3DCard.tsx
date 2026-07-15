"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// ── Client-only 3D gallery (three.js needs window/WebGL) ──
const InfiniteGallery = dynamic(() => import("./InfiniteGallery").then(m => m.default), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-full items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-white" />
        <p className="text-[11px] font-medium text-zinc-500">Loading 3D gallery…</p>
      </div>
    </div>
  ),
});

const EASE = [0.16, 1, 0.3, 1] as const;

const sampleImages = [
  { src: "/gallery-3d/1.webp", alt: "Image 1" },
  { src: "/gallery-3d/2.webp", alt: "Image 2" },
  { src: "/gallery-3d/3.webp", alt: "Image 3" },
  { src: "/gallery-3d/4.webp", alt: "Image 4" },
  { src: "/gallery-3d/5.webp", alt: "Image 5" },
  { src: "/gallery-3d/6.webp", alt: "Image 6" },
  { src: "/gallery-3d/7.webp", alt: "Image 7" },
  { src: "/gallery-3d/8.webp", alt: "Image 8" },
];

export function Gallery3DCard() {
  return (
    <motion.div
      className="relative w-full overflow-hidden rounded-lg"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
      style={{ height: "100vh", maxHeight: "100%" }}
    >
      <InfiniteGallery
        images={sampleImages}
        speed={1.2}
        zSpacing={3}
        visibleCount={12}
        falloff={{ near: 0.8, far: 14 }}
        className="h-full w-full rounded-lg overflow-hidden"
      />

      {/* Overlay title */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-3 text-center mix-blend-exclusion text-white">
        <h1 className="font-serif text-4xl md:text-7xl tracking-tight" style={{ fontFamily: "var(--font-instrument), serif" }}>
          <span className="italic">I create;</span> therefore I am
        </h1>
      </div>

      {/* Bottom hint */}
      <div className="pointer-events-none absolute bottom-6 left-0 right-0 text-center font-mono uppercase text-[11px] font-semibold text-white/80">
        <p>Use mouse wheel, arrow keys, or touch to navigate</p>
        <p className="opacity-60">Auto-play resumes after 3 seconds of inactivity</p>
      </div>
    </motion.div>
  );
}
