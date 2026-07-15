"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, Bookmark } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// BookmarkFavoriteCard — 3 unique favorite/bookmark interactions:
// 1. Heart burst — heart fills + particles explode outward
// 2. Star rating — 5 stars with hover preview + spring fill
// 3. Bookmark flip — 3D page-flip bookmark toggle

export function BookmarkFavoriteCard() {
  return (
    <motion.div className="w-[clamp(280px,88vw,380px)] select-none" initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: EASE }}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(244,63,94,0.08), transparent 55%)" }} />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <div className="border-b cs-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/10 ring-1 ring-rose-500/20"><Heart className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400" strokeWidth={2.2} /></div>
            <div><h2 className="text-[14px] font-bold tracking-tight cs-text">Favorite & Bookmark</h2><p className="text-[10.5px] cs-muted">Heart burst · star rating · bookmark flip</p></div>
          </div>
        </div>
        <div className="space-y-7 p-5">
          <HeartBurstButton />
          <StarRatingButton />
          <BookmarkFlipButton />
        </div>
        <div className="border-t cs-border px-5 py-2.5 text-center"><p className="text-[9.5px] cs-subtle">Click each — completely different interaction</p></div>
      </div>
    </motion.div>
  );
}

function HeartBurstButton() {
  const [liked, setLiked] = useState(false);
  const [particles, setParticles] = useState<{ id: number; angle: number; dist: number }[]>([]);

  const handleClick = () => {
    if (liked) { setLiked(false); return; }
    setLiked(true);
    setParticles(Array.from({ length: 10 }, (_, i) => ({ id: Date.now() + i, angle: (i / 10) * 360, dist: 35 + Math.random() * 20 })));
    setTimeout(() => setParticles([]), 700);
  };

  return (
    <div>
      <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider cs-subtle">1 · Heart Burst</label>
      <div className="relative flex items-center justify-center py-2">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <AnimatePresence>
            {particles.map(p => (
              <motion.span key={p.id} className="absolute h-2 w-2 rounded-full bg-rose-400" initial={{ x: 0, y: 0, opacity: 1, scale: 1 }} animate={{ x: Math.cos((p.angle * Math.PI) / 180) * p.dist, y: Math.sin((p.angle * Math.PI) / 180) * p.dist, opacity: 0, scale: 0.2 }} transition={{ duration: 0.6, ease: "easeOut" }} />
            ))}
          </AnimatePresence>
        </div>
        <motion.button type="button" onClick={handleClick} whileTap={{ scale: 0.85 }} className="relative flex items-center gap-2 rounded-full border cs-border cs-surface px-5 py-2.5 text-[12.5px] font-semibold cs-text transition cs-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/40">
          <motion.span animate={{ scale: liked ? [1, 1.4, 1] : 1 }} transition={{ duration: 0.3 }}>
            <Heart className={`h-5 w-5 transition-colors ${liked ? "fill-rose-500 text-rose-500" : "text-rose-400"}`} strokeWidth={2} />
          </motion.span>
          {liked ? "Liked" : "Like"}
        </motion.button>
      </div>
    </div>
  );
}

function StarRatingButton() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div>
      <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider cs-subtle">2 · Star Rating</label>
      <div className="flex items-center justify-center gap-1.5 py-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= (hover || rating);
          return (
            <motion.button key={star} type="button" whileTap={{ scale: 0.8 }} onClick={() => setRating(star)} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40 rounded" aria-label={`Rate ${star} stars`}>
              <motion.span animate={{ scale: filled ? [1, 1.3, 1] : 1, rotate: filled ? [0, -15, 0] : 0 }} transition={{ duration: 0.25 }}>
                <Star className={`h-6 w-6 transition-colors ${filled ? "fill-amber-400 text-amber-400" : "text-slate-300 dark:text-slate-600"}`} strokeWidth={1.5} />
              </motion.span>
            </motion.button>
          );
        })}
        <span className="ml-2 text-[12px] font-semibold cs-muted tabular-nums">{hover || rating}/5</span>
      </div>
    </div>
  );
}

function BookmarkFlipButton() {
  const [saved, setSaved] = useState(false);
  return (
    <div>
      <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider cs-subtle">3 · Bookmark Flip</label>
      <div className="flex items-center justify-center py-1" style={{ perspective: "600px" }}>
        <motion.button type="button" onClick={() => setSaved(s => !s)} whileTap={{ scale: 0.92 }} className="flex items-center gap-2 rounded-xl border cs-border cs-surface px-5 py-2.5 text-[12.5px] font-semibold cs-text transition cs-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40">
          <motion.span animate={{ rotateY: saved ? 360 : 0 }} transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }} style={{ transformStyle: "preserve-3d" }}>
            <Bookmark className={`h-5 w-5 transition-colors ${saved ? "fill-blue-500 text-blue-500" : "text-slate-400"}`} strokeWidth={2} />
          </motion.span>
          {saved ? "Saved" : "Save"}
        </motion.button>
      </div>
    </div>
  );
}
