"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bookmark, Heart, Star } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

function normalizeRating(value: number, fallback = 0) {
  const safeValue = Number.isFinite(value) ? value : fallback;
  return Math.max(0, Math.min(5, Math.round(safeValue)));
}

export interface BookmarkFavoriteCardProps {
  liked?: boolean;
  defaultLiked?: boolean;
  rating?: number;
  defaultRating?: number;
  saved?: boolean;
  defaultSaved?: boolean;
  onLikedChange?: (liked: boolean) => void;
  onRatingChange?: (rating: number) => void;
  onSavedChange?: (saved: boolean) => void;
}

export function BookmarkFavoriteCard({
  liked: likedProp,
  defaultLiked = false,
  rating: ratingProp,
  defaultRating = 0,
  saved: savedProp,
  defaultSaved = false,
  onLikedChange,
  onRatingChange,
  onSavedChange,
}: BookmarkFavoriteCardProps = {}) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const feedbackId = useId();
  const [internalLiked, setInternalLiked] = useState(Boolean(defaultLiked));
  const [internalRating, setInternalRating] = useState(() => normalizeRating(defaultRating));
  const [internalSaved, setInternalSaved] = useState(Boolean(defaultSaved));
  const [feedback, setFeedback] = useState("");
  const liked = Boolean(likedProp ?? internalLiked);
  const rating = normalizeRating(ratingProp ?? internalRating);
  const saved = Boolean(savedProp ?? internalSaved);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const announce = (message: string) => {
    if (feedbackTimerRef.current !== null) clearTimeout(feedbackTimerRef.current);
    setFeedback(message);
    feedbackTimerRef.current = setTimeout(() => {
      setFeedback("");
      feedbackTimerRef.current = null;
    }, 3000);
  };
  const changeLiked = (next: boolean) => {
    if (likedProp === undefined) setInternalLiked(next);
    onLikedChange?.(next);
    announce(next ? "Added to favorites." : "Removed from favorites.");
  };
  const changeRating = (next: number) => {
    const normalized = normalizeRating(next);
    if (ratingProp === undefined) setInternalRating(normalized);
    onRatingChange?.(normalized);
    announce(normalized === 0 ? "Rating cleared." : `Rated ${normalized} out of 5.`);
  };
  const changeSaved = (next: boolean) => {
    if (savedProp === undefined) setInternalSaved(next);
    onSavedChange?.(next);
    announce(next ? "Bookmark saved." : "Bookmark removed.");
  };

  useEffect(() => () => {
    if (feedbackTimerRef.current !== null) clearTimeout(feedbackTimerRef.current);
  }, []);

  return (
    <motion.div className="relative w-[min(380px,calc(100vw-2rem))] select-none" initial={shouldReduceMotion ? false : { opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, ease: EASE }}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(244,63,94,0.08), transparent 55%)" }} />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <div className="border-b cs-border px-4 py-4 sm:px-5">
          <div className="flex items-center gap-2.5">
            <div aria-hidden className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/10 ring-1 ring-rose-500/20"><Heart className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400" strokeWidth={2.2} /></div>
            <div><h2 className="text-[14px] font-bold tracking-tight cs-text">Favorite & Bookmark</h2><p className="text-[10.5px] cs-muted">Heart burst · star rating · bookmark flip</p></div>
          </div>
        </div>
        <div className="space-y-7 p-4 sm:p-5" aria-describedby={feedbackId}>
          <HeartBurstButton liked={liked} onChange={changeLiked} shouldReduceMotion={shouldReduceMotion} />
          <StarRatingButton rating={rating} onChange={changeRating} shouldReduceMotion={shouldReduceMotion} />
          <BookmarkFlipButton saved={saved} onChange={changeSaved} shouldReduceMotion={shouldReduceMotion} />
          <p id={feedbackId} role="status" aria-live="polite" aria-atomic="true" className="sr-only">{feedback}</p>
        </div>
        <div className="border-t cs-border px-4 py-2.5 text-center sm:px-5"><p className="text-[9.5px] cs-subtle">Toggle favorite · choose rating · save bookmark</p></div>
      </div>
    </motion.div>
  );
}

function HeartBurstButton({ liked, onChange, shouldReduceMotion }: { liked: boolean; onChange: (liked: boolean) => void; shouldReduceMotion: boolean }) {
  const [particles, setParticles] = useState<{ id: number; angle: number; dist: number }[]>([]);
  const clearParticlesTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const particleSequenceRef = useRef(0);

  const clearParticles = useCallback(() => {
    if (clearParticlesTimer.current !== null) clearTimeout(clearParticlesTimer.current);
    clearParticlesTimer.current = null;
    setParticles([]);
  }, []);

  useEffect(() => () => {
    if (clearParticlesTimer.current !== null) clearTimeout(clearParticlesTimer.current);
  }, []);

  const handleClick = () => {
    const next = !liked;
    onChange(next);
    clearParticles();
    if (!next || shouldReduceMotion) return;
    const sequence = ++particleSequenceRef.current;
    setParticles(Array.from({ length: 10 }, (_, index) => ({ id: sequence * 100 + index, angle: (index / 10) * 360, dist: 35 + Math.random() * 20 })));
    clearParticlesTimer.current = setTimeout(() => {
      setParticles([]);
      clearParticlesTimer.current = null;
    }, 700);
  };

  return (
    <section aria-labelledby="heart-burst-label">
      <h3 id="heart-burst-label" className="mb-2 text-[10px] font-bold uppercase tracking-wider cs-subtle">1 · Heart Burst</h3>
      <div className="relative flex items-center justify-center py-2">
        <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <AnimatePresence initial={false}>
            {particles.map((particle) => (
              <motion.span key={particle.id} className="absolute h-2 w-2 rounded-full bg-rose-400" initial={{ x: 0, y: 0, opacity: 1, scale: 1 }} animate={{ x: Math.cos((particle.angle * Math.PI) / 180) * particle.dist, y: Math.sin((particle.angle * Math.PI) / 180) * particle.dist, opacity: 0, scale: 0.2 }} transition={{ duration: 0.6, ease: "easeOut" }} />
            ))}
          </AnimatePresence>
        </div>
        <motion.button type="button" aria-label={liked ? "Remove from favorites" : "Add to favorites"} aria-pressed={liked} onClick={handleClick} whileTap={shouldReduceMotion ? undefined : { scale: 0.85 }} className="cs-surface relative flex items-center gap-2 rounded-full border cs-border px-5 py-2.5 text-[12.5px] font-semibold cs-text transition-colors motion-reduce:transition-none cs-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-rose-300 dark:focus-visible:ring-offset-slate-950">
          <motion.span aria-hidden animate={{ scale: liked && !shouldReduceMotion ? [1, 1.4, 1] : 1 }} transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}>
            <Heart className={`h-5 w-5 transition-colors motion-reduce:transition-none ${liked ? "fill-rose-500 text-rose-500" : "text-rose-400"}`} strokeWidth={2} />
          </motion.span>
          {liked ? "Liked" : "Like"}
        </motion.button>
      </div>
    </section>
  );
}

function StarRatingButton({ rating, onChange, shouldReduceMotion }: { rating: number; onChange: (rating: number) => void; shouldReduceMotion: boolean }) {
  const [hover, setHover] = useState(0);
  const preview = hover || rating;

  return (
    <section aria-labelledby="star-rating-label">
      <h3 id="star-rating-label" className="mb-2 text-[10px] font-bold uppercase tracking-wider cs-subtle">2 · Star Rating</h3>
      <div className="flex flex-wrap items-center justify-center gap-y-1 py-1">
        <RadioGroupPrimitive.Root aria-labelledby="star-rating-label" value={rating > 0 ? String(rating) : ""} onValueChange={(value) => onChange(normalizeRating(Number(value)))} onPointerLeave={() => setHover(0)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setHover(0); }} orientation="horizontal" loop={false} className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => {
            const filled = star <= preview;
            return (
              <RadioGroupPrimitive.Item key={star} value={String(star)} aria-label={`${star} star${star === 1 ? "" : "s"}`} onPointerEnter={() => setHover(star)} onFocus={() => setHover(star)} className="rounded p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-amber-300 dark:focus-visible:ring-offset-slate-950">
                <motion.span aria-hidden className="block" animate={{ scale: filled && !shouldReduceMotion ? [1, 1.25, 1] : 1, rotate: filled && !shouldReduceMotion ? [0, -12, 0] : 0 }} transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.22 }}>
                  <Star className={`h-6 w-6 transition-colors motion-reduce:transition-none ${filled ? "fill-amber-400 text-amber-400" : "text-slate-300 dark:text-slate-600"}`} strokeWidth={1.5} />
                </motion.span>
              </RadioGroupPrimitive.Item>
            );
          })}
        </RadioGroupPrimitive.Root>
        <output aria-live="off" className="ml-2 min-w-[4.5rem] text-[12px] font-semibold cs-muted tabular-nums">{hover ? `Preview ${preview}/5` : `${rating}/5`}</output>
      </div>
    </section>
  );
}

function BookmarkFlipButton({ saved, onChange, shouldReduceMotion }: { saved: boolean; onChange: (saved: boolean) => void; shouldReduceMotion: boolean }) {
  return (
    <section aria-labelledby="bookmark-flip-label">
      <h3 id="bookmark-flip-label" className="mb-2 text-[10px] font-bold uppercase tracking-wider cs-subtle">3 · Bookmark Flip</h3>
      <div className="flex items-center justify-center py-1" style={{ perspective: "600px" }}>
        <motion.button type="button" aria-label={saved ? "Remove bookmark" : "Save bookmark"} aria-pressed={saved} onClick={() => onChange(!saved)} whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }} className="cs-surface flex items-center gap-2 rounded-xl border cs-border px-5 py-2.5 text-[12.5px] font-semibold cs-text transition-colors motion-reduce:transition-none cs-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-blue-300 dark:focus-visible:ring-offset-slate-950">
          <motion.span aria-hidden animate={{ rotateY: saved && !shouldReduceMotion ? 360 : 0 }} transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }} style={{ transformStyle: "preserve-3d" }}>
            <Bookmark className={`h-5 w-5 transition-colors motion-reduce:transition-none ${saved ? "fill-blue-500 text-blue-500" : "text-slate-400 dark:text-slate-500"}`} strokeWidth={2} />
          </motion.span>
          {saved ? "Saved" : "Save"}
        </motion.button>
      </div>
    </section>
  );
}
