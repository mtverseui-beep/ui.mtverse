"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Bookmark, Clock, Share2, TrendingUp } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const SERIF = 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif';

// BlogPostCard — premium editorial article.
// Emerald + black palette with an optional serif heading. 16:9 cover image
// that zooms on hover, author avatar + name, reading time, 2-3 topic chips,
// save + share actions that reveal on hover, and a lift + shadow hover state.

const POST = {
  title: "The Quiet Productivity Movement",
  excerpt:
    "Why a wave of teams are replacing standups, sprints, and dashboards with calmer, async-first rituals — and what they’re learning along the way.",
  cover:
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80",
  author: {
    name: "Sasha Moreno",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=120&q=80",
  },
  readMins: 7,
  date: "Mar 14, 2025",
  tags: ["Design", "Productivity", "Work"],
};

export function BlogPostCard() {
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);

  return (
    <motion.div
      className="w-[clamp(280px,90vw,380px)] select-none"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* Ambient emerald glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 25% 12%, rgba(16,185,129,0.16), transparent 55%), radial-gradient(circle at 80% 90%, rgba(13,42,33,0.18), transparent 60%)",
        }}
      />

      <motion.article
        whileHover={{ y: -6 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="cs-surface group overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(13,42,33,0.4)] transition-shadow duration-300 hover:shadow-[0_40px_80px_-35px_rgba(16,185,129,0.35)]"
      >
        {/* Cover */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-emerald-950/10 dark:bg-emerald-950/30">
          <Image
            src={POST.cover}
            alt={POST.title}
            fill
            sizes="380px"
            priority
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

          {/* Trending badge */}
          <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            <TrendingUp className="h-3 w-3" strokeWidth={2.4} />
            Trending
          </span>

          {/* Save / Share actions (reveal on hover) */}
          <div className="absolute right-4 top-4 flex gap-2 opacity-0 transition-opacity duration-300 focus-within:opacity-100 group-hover:opacity-100">
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => setSaved((s) => !s)}
              aria-label={saved ? "Remove bookmark" : "Bookmark article"}
              aria-pressed={saved}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-emerald-800 backdrop-blur-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
            >
              <Bookmark
                className={`h-4 w-4 ${saved ? "fill-emerald-600 text-emerald-600" : ""}`}
                strokeWidth={2.2}
              />
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => setShared(true)}
              aria-label="Share article"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-emerald-800 backdrop-blur-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
            >
              <Share2 className="h-4 w-4" strokeWidth={2.2} />
            </motion.button>
          </div>
        </div>

        {/* Body */}
        <div className="p-5">
          {/* topic chips */}
          <div className="mb-2.5 flex flex-wrap gap-1.5">
            {POST.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-emerald-500/30 bg-emerald-500/5 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300"
              >
                {t}
              </span>
            ))}
          </div>

          {/* title */}
          <h2 className="text-[20px] font-bold leading-tight tracking-tight cs-text transition-colors duration-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-300" style={{ fontFamily: SERIF }}>
            {POST.title}
          </h2>

          {/* excerpt */}
          <p className="mt-2 line-clamp-2 text-[12.5px] leading-relaxed cs-muted">
            {POST.excerpt}
          </p>

          {/* footer: author + meta */}
          <div className="mt-4 flex items-center justify-between border-t cs-border pt-3">
            <div className="flex items-center gap-2.5">
              <div className="relative h-8 w-8 overflow-hidden rounded-full ring-1 ring-black/5 dark:ring-white/10">
                <Image src={POST.author.avatar} alt={POST.author.name} fill sizes="32px" className="object-cover" />
              </div>
              <div className="leading-tight">
                <p className="text-[12px] font-semibold cs-text">{POST.author.name}</p>
                <p className="text-[10px] cs-subtle">{POST.date}</p>
              </div>
            </div>
            <span className="flex items-center gap-1 text-[11px] font-medium cs-muted">
              <Clock className="h-3 w-3" strokeWidth={2.2} />
              {POST.readMins} min read
            </span>
          </div>
        </div>
      </motion.article>

      {/* Shared toast */}
      <AnimatePresence>
        {shared && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onAnimationComplete={() => setTimeout(() => setShared(false), 1600)}
            className="cs-surface pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border cs-border px-4 py-2 text-[12px] font-medium cs-text shadow-xl"
          >
            Link copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
