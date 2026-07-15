"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { BadgeCheck, MapPin, UserPlus, MessageCircle, Send, Check } from "lucide-react";
import { creatorProfile } from "./data/card-data";

const EASE = [0.16, 1, 0.3, 1] as const;

const SERIF = 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif';

// CreatorProfileCard — warm editorial magazine aesthetic. Height is kept
// compact (cover 110px, avatar 72px, tighter padding) so the expandable
// message area never causes page scroll.

export function CreatorProfileCard() {
  const creator = creatorProfile;
  const [following, setFollowing] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);

  // Stronger tilt for premium 3D feel.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), { stiffness: 170, damping: 18 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), { stiffness: 170, damping: 18 });

  const coverX = useTransform(px, [0, 1], [-12, 12]);
  const coverY = useTransform(py, [0, 1], [-8, 8]);
  const coverScale = useSpring(1.12, { stiffness: 200, damping: 30 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };
  const handleLeave = () => { px.set(0.5); py.set(0.5); };

  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  return (
    <motion.div
      className="relative w-[clamp(280px,90vw,380px)] select-none"
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* Warm ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-12 -z-10 rounded-[48px] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(234,88,12,0.22), transparent 55%), radial-gradient(circle at 75% 80%, rgba(217,119,6,0.18), transparent 60%)",
        }}
      />

      <motion.article
        className="relative overflow-hidden rounded-[20px] border border-amber-200/60 bg-gradient-to-b from-amber-50 to-white shadow-[0_40px_90px_-40px_rgba(0,0,0,0.12)] dark:border-amber-900/30 dark:from-[#1a120c] dark:via-[#140d08] dark:to-[#0a0807] dark:shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]"
        style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handleLeave}
      >
        {/* Cover — 120px, premium parallax + richer overlay */}
        <div className="relative h-[120px] overflow-hidden">
          <motion.div className="absolute inset-0" style={{ x: coverX, y: coverY, scale: coverScale }}>
            <Image src={creator.cover} alt={`${creator.name} cover image`} fill sizes="380px" className="object-cover" priority />
          </motion.div>
          {/* Premium multi-stop overlay — dark at edges for text legibility */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(120,53,15,0.32) 0%, transparent 35%, transparent 55%, var(--card-surface) 100%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,0,0,0.18), transparent 60%)",
            }}
          />
          <span
            className="absolute left-4 top-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-50/95 dark:text-amber-50/95"
            style={{ fontFamily: SERIF }}
          >
            <span className="h-px w-4 bg-amber-50/60" />
            Profile · Issue 04
          </span>
        </div>

        <div className="relative px-5">
          {/* Avatar — refined border + halo glow */}
          <div className="relative -mt-10 flex items-end justify-between">
            <div className="relative">
              {/* Animated halo glow */}
              <motion.div
                aria-hidden
                className="absolute -inset-2.5 -z-10 rounded-full blur-md"
                animate={{
                  background: [
                    "radial-gradient(circle, rgba(234,88,12,0.55), transparent 70%)",
                    "radial-gradient(circle, rgba(245,158,11,0.55), transparent 70%)",
                    "radial-gradient(circle, rgba(217,119,6,0.55), transparent 70%)",
                    "radial-gradient(circle, rgba(234,88,12,0.55), transparent 70%)",
                  ],
                  scale: [1, 1.08, 1],
                }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative h-[72px] w-[72px] overflow-hidden rounded-full border-[3px] border-amber-50 bg-amber-50 shadow-[0_8px_20px_-6px_rgba(234,88,12,0.4)] dark:border-[#1a120c] dark:bg-[#0a0807]">
                <Image src={creator.avatar} alt={`${creator.name} avatar`} fill sizes="72px" className="object-cover" />
                {/* Inner gloss */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"
                />
              </div>
              {/* Verified badge — premium gradient + ring */}
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 18, delay: 0.3 }}
                className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-[2.5px] border-amber-50 bg-gradient-to-br from-amber-400 to-orange-500 shadow-[0_4px_10px_-2px_rgba(234,88,12,0.6)] dark:border-[#1a120c]"
              >
                <BadgeCheck className="h-3.5 w-3.5 text-white" strokeWidth={2.6} />
              </motion.div>
            </div>

            <motion.button
              type="button"
              onClick={() => setFollowing((v) => !v)}
              aria-pressed={following}
              whileTap={{ scale: 0.95 }}
              className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-semibold shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40 ${
                following
                  ? "border border-amber-400/50 bg-amber-400/10 text-amber-700 dark:text-amber-300"
                  : "bg-gradient-to-r from-amber-400 to-orange-500 text-stone-950 shadow-[0_6px_16px_-6px_rgba(234,88,12,0.6)] hover:shadow-[0_8px_20px_-6px_rgba(234,88,12,0.75)]"
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={following ? "following" : "follow"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1.5"
                >
                  {following ? (
                    <>
                      <Check className="h-3 w-3" strokeWidth={2.8} />
                      Following
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-3 w-3" strokeWidth={2.6} />
                      Follow
                    </>
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Identity */}
          <header className="mt-3">
            <h2 className="text-[22px] font-semibold leading-tight text-stone-900 dark:text-amber-50" style={{ fontFamily: SERIF }}>
              {creator.name}
            </h2>
            <p className="mt-0.5 text-[12.5px] italic text-amber-700/70 dark:text-amber-200/65" style={{ fontFamily: SERIF }}>
              {creator.role}
            </p>
            <p className="mt-1 flex items-center gap-1 text-[11.5px] text-stone-500 dark:text-amber-100/45">
              <MapPin className="h-3 w-3" strokeWidth={1.9} />
              {creator.location}
            </p>
          </header>

          {/* Metrics — refined dividers */}
          <div className="mt-3 grid grid-cols-3">
            {[
              { label: "Followers", value: creator.followers },
              { label: "Following", value: creator.following },
              { label: "Works", value: creator.projects },
            ].map((m, i, arr) => (
              <div
                key={m.label}
                className={`px-2 text-center ${i !== 0 ? "border-l border-amber-200/50 dark:border-amber-900/30" : ""}`}
              >
                <div className="text-[16px] font-semibold text-stone-900 tabular-nums dark:text-amber-50" style={{ fontFamily: SERIF }}>
                  {m.value}
                </div>
                <div className="text-[9.5px] uppercase tracking-wider text-stone-400 dark:text-amber-200/45">{m.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 h-px w-full bg-amber-200/50 dark:bg-amber-900/30" />

          {/* Skills — refined pills */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {creator.skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.05, ease: EASE }}
                className="rounded-full border border-amber-300/40 bg-gradient-to-b from-amber-100/60 to-amber-50/30 px-2.5 py-0.5 text-[10.5px] font-medium text-amber-800 shadow-sm dark:border-amber-900/40 dark:from-amber-950/40 dark:to-amber-950/10 dark:text-amber-200/85"
                style={{ fontFamily: SERIF }}
              >
                {skill}
              </motion.span>
            ))}
          </div>

          {/* Featured work — better grid, hover zoom, grayscale-to-color */}
          <div className="mt-3">
            <div className="mb-1.5 flex items-center justify-between">
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-700/70 dark:text-amber-300/70" style={{ fontFamily: SERIF }}>
                Selected Works
              </h3>
              <span className="text-[10px] text-stone-400 dark:text-amber-100/35">{creator.works.length} pieces</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {creator.works.map((w, i) => (
                <motion.div
                  key={w.src}
                  className="group/work relative aspect-square overflow-hidden rounded-md border border-amber-200/40 shadow-sm dark:border-amber-900/30"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease: EASE }}
                >
                  <Image
                    src={w.src}
                    alt={w.alt}
                    fill
                    sizes="80px"
                    className="object-cover grayscale-[55%] transition-all duration-500 group-hover/work:scale-110 group-hover/work:grayscale-0"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-amber-950/40 to-transparent opacity-0 transition-opacity duration-300 group-hover/work:opacity-100"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Message input — compact */}
          <AnimatePresence initial={false}>
            {messageOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="mt-3 rounded-lg border border-amber-200/40 bg-amber-50/70 p-2.5 shadow-inner dark:border-amber-900/30 dark:bg-amber-950/25">
                  <textarea
                    ref={messageRef}
                    rows={1}
                    aria-label={`Message ${creator.name}`}
                    placeholder={`Message ${creator.name.split(" ")[0]}…`}
                    className="w-full resize-none bg-transparent text-[12px] text-stone-900 placeholder-stone-400 focus:outline-none dark:text-amber-50 dark:placeholder-amber-200/35"
                  />
                  <div className="mt-1.5 flex items-center justify-between">
                    <span className="text-[10px] text-stone-400 dark:text-amber-100/35">Replies within a day</span>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => { if (messageRef.current) messageRef.current.value = ""; setMessageOpen(false); }}
                      className="flex cursor-pointer items-center gap-1 rounded-md bg-gradient-to-r from-amber-400 to-orange-500 px-2.5 py-1 text-[11px] font-semibold text-stone-950 shadow-sm transition hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40"
                    >
                      <Send className="h-2.5 w-2.5" strokeWidth={2.4} />Send
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="mt-3 mb-4 flex gap-2">
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => setFollowing((v) => !v)}
              className={`flex-1 cursor-pointer rounded-lg py-2 text-[12.5px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40 ${
                following
                  ? "border border-amber-400/50 bg-amber-400/10 text-amber-700 dark:text-amber-300"
                  : "bg-gradient-to-r from-amber-400 to-orange-500 text-stone-950 shadow-[0_8px_20px_-8px_rgba(234,88,12,0.7)] hover:shadow-[0_10px_24px_-8px_rgba(234,88,12,0.85)]"
              }`}
            >
              {following ? "Following" : "Follow"}
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => { setMessageOpen((v) => !v); setTimeout(() => messageRef.current?.focus(), 100); }}
              aria-expanded={messageOpen}
              className="flex-1 cursor-pointer rounded-lg border border-amber-300/50 bg-amber-50/60 py-2 text-[12.5px] font-semibold text-amber-800 transition cs-hover hover:border-amber-400/70 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-100/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/30"
            >
              <span className="flex items-center justify-center gap-1.5">
                <MessageCircle className="h-3.5 w-3.5" strokeWidth={2} />Message
              </span>
            </motion.button>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}
