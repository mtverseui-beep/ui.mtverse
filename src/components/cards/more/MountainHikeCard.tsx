"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Clock, Route, TrendingUp } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// MountainHikeCard — minimalist adventure card with a bold typographic title,
// a 3-photo fan that spreads on hover, a stats row, and a short description.
// Sage green + white palette. The arrow in the title slides out and back on
// hover, creating a premium "let's go" micro-interaction.

const PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80",
    alt: "Misty mountain peaks with forest",
  },
  {
    src: "https://images.unsplash.com/photo-1454944338482-a69bb95894af?auto=format&fit=crop&w=400&q=80",
    alt: "Wooden hiking trail through mountains",
  },
  {
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80",
    alt: "Dramatic mountain peaks landscape",
  },
];

export function MountainHikeCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="w-[clamp(300px,92vw,400px)] select-none"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* Ambient sage glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 25% 15%, rgba(90,107,63,0.15), transparent 55%), radial-gradient(circle at 80% 85%, rgba(34,197,94,0.08), transparent 60%)",
        }}
      />

      <motion.article
        className="cs-surface relative overflow-hidden rounded-[22px] border cs-border p-6 shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)] sm:p-7"
        whileHover={{ y: -6 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* ── Title with animated arrow ── */}
        <div className="mb-5">
          <h1 className="text-[44px] font-bold leading-[1.05] tracking-tight text-[#5a6b3f] dark:text-[#9bb76e] sm:text-[48px]">
            Mountain
            <br />
            Hike{" "}
            <span className="inline-block w-14 overflow-hidden align-bottom sm:w-16">
              <motion.span
                className="inline-block"
                animate={
                  isHovered
                    ? { x: [0, 80, -80, 0], opacity: [1, 0, 0, 1] }
                    : { x: 0, opacity: 1 }
                }
                transition={{
                  duration: 0.3,
                  times: [0, 0.35, 0.65, 1],
                  ease: "easeInOut",
                }}
              >
                →
              </motion.span>
            </span>
          </h1>
        </div>

        {/* ── Animated 3-photo fan ── */}
        <div className="relative mb-6 flex h-40 items-center justify-start pl-3">
          {PHOTOS.map((photo, i) => {
            const rotations = [-15, 0, 15];
            const xOffsets = [0, 70, 140];
            const restX = [0, 25, 50];
            return (
              <motion.div
                key={photo.src}
                className="absolute h-36 w-32 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900"
                animate={{
                  rotate: isHovered ? rotations[i] : 0,
                  x: isHovered ? xOffsets[i] : restX[i],
                  boxShadow: isHovered
                    ? "0 10px 30px rgba(0,0,0,0.18)"
                    : "0 4px 15px rgba(0,0,0,0.10)",
                }}
                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.04 }}
                style={{ zIndex: i + 1 }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </motion.div>
            );
          })}
        </div>

        {/* ── Stats row ── */}
        <div className="mb-3 flex items-center gap-4 text-[12.5px] cs-muted">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-[#5a6b3f] dark:text-[#9bb76e]" strokeWidth={2} />
            <span className="font-medium">~4 hours</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Route className="h-4 w-4 text-[#5a6b3f] dark:text-[#9bb76e]" strokeWidth={2} />
            <span className="font-medium">8 km</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="h-4 w-4 text-[#5a6b3f] dark:text-[#9bb76e]" strokeWidth={2} />
            <span className="font-medium">Medium Level</span>
          </div>
        </div>

        {/* ── Description ── */}
        <p className="text-[13px] leading-relaxed cs-muted">
          Hiking on a mountain blends physical challenge with natural beauty, offering sweeping views that reward every step of the climb.
        </p>
      </motion.article>
    </motion.div>
  );
}
