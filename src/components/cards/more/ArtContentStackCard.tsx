"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Bookmark, ChevronRight, Download, Palette } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const SERIF = 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif';

// ArtContentStackCard — premium gallery collection.
// Ivory + bronze palette with serif headings. Three curated artworks in a
// spring stack: the active card sits front, the ones behind are scaled +
// dimmed for depth. Advancing cycles the stack with a fly-down exit. Each
// piece carries artist + gallery metadata, and a save / export action.

interface Piece {
  id: number;
  title: string;
  artist: string;
  gallery: string;
  year: number;
  medium: string;
  image: string;
}

const PIECES: Piece[] = [
  {
    id: 1,
    title: "Dithered Bloom No. 4",
    artist: "Mira Sato",
    gallery: "Hayworth Gallery, Tokyo",
    year: 2025,
    medium: "Generative print on cotton",
    image:
      "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Color Field, Slow Rain",
    artist: "Adrien Vasseur",
    gallery: "Maison Lumen, Paris",
    year: 2024,
    medium: "Oil & pigment on linen",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Industrial Sheen",
    artist: "Karl Nordström",
    gallery: "Atelier 9, Stockholm",
    year: 2025,
    medium: "Mixed media on aluminum",
    image:
      "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    title: "Quiet Geometry",
    artist: "Lia Fontaine",
    gallery: "Casa Pintada, Lisbon",
    year: 2023,
    medium: "Acrylic on board",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=900&q=80",
  },
];

const POSITIONS = [
  { scale: 1, y: 0, opacity: 1, blur: 0 },
  { scale: 0.94, y: -18, opacity: 0.55, blur: 1 },
  { scale: 0.88, y: -36, opacity: 0.25, blur: 2 },
];

export function ArtContentStackCard() {
  const [order, setOrder] = useState<number[]>([0, 1, 2]);
  const [saved, setSaved] = useState<Record<number, boolean>>({});

  const active = PIECES[order[0]];

  const advance = () => setOrder((prev) => [prev[1], prev[2], (prev[2] + 1) % PIECES.length]);

  return (
    <motion.div
      className="w-[clamp(280px,90vw,380px)] select-none"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* Ambient bronze glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 15%, rgba(180,135,81,0.22), transparent 55%), radial-gradient(circle at 80% 85%, rgba(120,93,68,0.16), transparent 60%)",
        }}
      />

      <article className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(74,58,42,0.4)]">
        {/* Collection header */}
        <header className="flex items-center justify-between px-6 pb-3 pt-5">
          <div>
            <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">
              <Palette className="h-3 w-3" strokeWidth={2.4} />
              Curated Collection
            </p>
            <h2 className="mt-1 text-[22px] font-bold leading-tight cs-text" style={{ fontFamily: SERIF }}>
              Summer Collection 2025
            </h2>
            <p className="mt-0.5 text-[11px] italic cs-muted" style={{ fontFamily: SERIF }}>
              Twelve pieces · four featured
            </p>
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            aria-label="Export collection"
            className="flex h-9 w-9 items-center justify-center rounded-full border cs-border cs-muted transition cs-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40"
          >
            <Download className="h-4 w-4" strokeWidth={1.9} />
          </motion.button>
        </header>

        {/* Stack */}
        <div className="relative h-[340px] px-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {order.slice(0, 3).map((pieceIdx, i) => {
              const piece = PIECES[pieceIdx];
              const pos = POSITIONS[i] ?? POSITIONS[2];
              const isActive = i === 0;
              return (
                <motion.div
                  key={piece.id}
                  layout
                  initial={{ opacity: 0, y: -30, scale: 0.85 }}
                  animate={{
                    opacity: pos.opacity,
                    y: pos.y,
                    scale: pos.scale,
                    filter: `blur(${pos.blur}px)`,
                    zIndex: 10 - i,
                  }}
                  exit={{ opacity: 0, y: 220, scale: 0.9, transition: { duration: 0.4, ease: EASE } }}
                  transition={{ type: "spring", stiffness: 260, damping: 26, mass: 0.9 }}
                  className="absolute inset-x-6 top-0"
                  style={{ pointerEvents: isActive ? "auto" : "none" }}
                >
                  <div className="relative h-[260px] w-full overflow-hidden rounded-xl border border-amber-900/15 bg-amber-50 shadow-[0_18px_40px_-22px_rgba(74,58,42,0.5)] dark:border-amber-100/10 dark:bg-stone-900">
                    <Image
                      src={piece.image}
                      alt={`${piece.title} by ${piece.artist}`}
                      fill
                      sizes="340px"
                      className="object-cover"
                      priority={isActive}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    {/* piece caption */}
                    <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-200">
                        {piece.year} · {piece.medium}
                      </p>
                      <h3 className="mt-1 text-[20px] font-bold leading-tight" style={{ fontFamily: SERIF }}>
                        {piece.title}
                      </h3>
                      <p className="mt-0.5 text-[12px] italic text-white/85" style={{ fontFamily: SERIF }}>
                        {piece.artist}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Metadata + actions */}
        <div className="px-6 pb-5 pt-2">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold cs-text" style={{ fontFamily: SERIF }}>
                {active.artist}
              </p>
              <p className="truncate text-[11px] cs-muted">{active.gallery}</p>
            </div>
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={() => setSaved((s) => ({ ...s, [active.id]: !s[active.id] }))}
              aria-label={saved[active.id] ? "Remove from saved" : "Save piece"}
              aria-pressed={!!saved[active.id]}
              className="flex h-9 items-center gap-1.5 rounded-full border border-amber-700/30 bg-amber-50 px-3 text-[11px] font-semibold text-amber-800 transition hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40 dark:border-amber-200/20 dark:bg-amber-500/10 dark:text-amber-200 dark:hover:bg-amber-500/20"
            >
              <Bookmark
                className={`h-3.5 w-3.5 ${saved[active.id] ? "fill-amber-600 dark:fill-amber-300" : ""}`}
                strokeWidth={2}
              />
              {saved[active.id] ? "Saved" : "Save"}
            </motion.button>
          </div>

          {/* Advance control */}
          <div className="mt-4 flex items-center justify-between border-t cs-border pt-3">
            <div className="flex items-center gap-1.5">
              {order.slice(0, 3).map((p, i) => (
                <span
                  key={`${p}-${i}`}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === 0 ? 22 : 8,
                    backgroundColor: i === 0 ? "rgba(180,135,81,0.9)" : "rgba(180,135,81,0.3)",
                  }}
                />
              ))}
            </div>
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={advance}
              className="flex items-center gap-1 rounded-full bg-stone-900 px-4 py-2 text-[12px] font-semibold text-amber-50 transition hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40 dark:bg-amber-100 dark:text-stone-900 dark:hover:bg-white"
            >
              Next piece
              <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.4} />
            </motion.button>
          </div>
        </div>
      </article>
    </motion.div>
  );
}
