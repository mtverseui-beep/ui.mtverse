"use client";

import type React from "react";
import { useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Dribbble,
  Github,
  Globe,
  Mail,
  RotateCw,
  Sparkles,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// ProfileFlipCard — polished profile flip.
// Slate + violet palette. The over-large edit form is replaced with a compact
// portfolio/contact back. Smooth 3D rotateY flip with backface-hidden, gentle
// pointer tilt on hover. Mobile-friendly height. Realistic creator content.

const WORKS = [
  {
    src: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=300&q=80",
    alt: "Editorial poster design series",
  },
  {
    src: "https://images.unsplash.com/photo-1542744095-291d1f67b221?auto=format&fit=crop&w=300&q=80",
    alt: "Brand identity mockup on stationery",
  },
  {
    src: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=300&q=80",
    alt: "Mobile app interface concept",
  },
];

const STATS = [
  { label: "Projects", value: "148" },
  { label: "Clients", value: "62" },
  { label: "Awards", value: "9" },
] as const;

export function ProfileFlipCard() {
  const [flipped, setFlipped] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });

  const handleMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      px.set((e.clientX - rect.left) / rect.width);
      py.set((e.clientY - rect.top) / rect.height);
    },
    [px, py],
  );
  const handleLeave = useCallback(() => {
    px.set(0.5);
    py.set(0.5);
  }, [px, py]);

  return (
    <motion.div
      className="w-[clamp(280px,90vw,380px)] select-none"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* Ambient violet glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 28% 18%, rgba(139,92,246,0.18), transparent 55%), radial-gradient(circle at 78% 88%, rgba(99,102,241,0.12), transparent 60%)",
        }}
      />

      <div style={{ perspective: 1500 }} className="flex justify-center">
        <motion.div
          ref={ref}
          role="button"
          tabIndex={0}
          onPointerMove={handleMove}
          onPointerLeave={handleLeave}
          onClick={() => setFlipped((f) => !f)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setFlipped((f) => !f);
            }
          }}
          aria-label={flipped ? "Flip to front of profile card" : "Flip to back of profile card"}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          style={{ rotateX, transformStyle: "preserve-3d" }}
          className="relative h-[440px] w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40"
        >
          {/* FRONT */}
          <FrontFace hidden={flipped} />
          {/* BACK */}
          <BackFace hidden={!flipped} />
        </motion.div>
      </div>

      {/* hint */}
      <motion.p
        className="mt-3 flex items-center justify-center gap-1.5 text-[11px] cs-muted"
        animate={{ opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <RotateCw className="h-3 w-3" strokeWidth={2.2} />
        {flipped ? "Tap to view profile" : "Tap to view contact & work"}
      </motion.p>
    </motion.div>
  );
}

function FrontFace({ hidden }: { hidden: boolean }) {
  return (
    <div
      aria-hidden={hidden}
      className="cs-surface absolute inset-0 flex flex-col overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(15,23,42,0.4)]"
      style={{ backfaceVisibility: "hidden" }}
    >
      {/* cover */}
      <div className="relative h-24 w-full overflow-hidden bg-gradient-to-br from-violet-500 via-indigo-500 to-purple-600">
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.25), transparent 45%)",
          }}
        />
        <span className="absolute left-4 top-3 inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
          <Sparkles className="h-2.5 w-2.5" strokeWidth={2.4} />
          Available for work
        </span>
      </div>

      {/* avatar */}
      <div className="relative -mt-10 flex justify-center">
        <div className="relative">
          <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-zinc-200 shadow-lg dark:border-zinc-900 dark:bg-zinc-800">
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
              alt="Profile portrait of Lena Park"
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-violet-500 dark:border-zinc-900">
            <BadgeCheck className="h-3.5 w-3.5 text-white" strokeWidth={2.4} />
          </span>
        </div>
      </div>

      {/* identity */}
      <div className="px-6 pt-2 text-center">
        <h2 className="text-[20px] font-bold leading-tight cs-text">Lena Park</h2>
        <p className="mt-0.5 text-[12px] font-medium text-violet-600 dark:text-violet-300">
          Brand & Product Designer
        </p>
        <p className="mt-2 text-[11.5px] leading-snug cs-muted">
          Crafting calm, considered interfaces for ambitious teams. Currently at
          Atlas — formerly Pixel & Co.
        </p>
      </div>

      {/* stats */}
      <div className="mx-6 mt-4 grid grid-cols-3 divide-x cs-border rounded-xl border bg-violet-50/40 dark:bg-violet-500/5">
        {STATS.map((s) => (
          <div key={s.label} className="py-2 text-center">
            <p className="text-[16px] font-bold tabular-nums cs-text">{s.value}</p>
            <p className="text-[9px] uppercase tracking-wider cs-subtle">{s.label}</p>
          </div>
        ))}
      </div>

      {/* socials */}
      <div className="mt-auto flex gap-2 px-6 pb-5 pt-4">
        <SocialButton label="Dribbble" href="https://dribbble.com">
          <Dribbble className="h-4 w-4 text-pink-500" strokeWidth={2} />
        </SocialButton>
        <SocialButton label="GitHub" href="https://github.com">
          <Github className="h-4 w-4 cs-text" strokeWidth={2} />
        </SocialButton>
        <SocialButton label="Website" href="https://example.com">
          <Globe className="h-4 w-4 text-violet-600 dark:text-violet-300" strokeWidth={2} />
        </SocialButton>
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 py-2.5 text-[12px] font-semibold text-white transition hover:from-violet-600 hover:to-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40"
        >
          Hire me
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} />
        </motion.button>
      </div>
    </div>
  );
}

function BackFace({ hidden }: { hidden: boolean }) {
  return (
    <div
      aria-hidden={hidden}
      className="cs-surface absolute inset-0 flex flex-col overflow-hidden rounded-[22px] border cs-border p-6 shadow-[0_30px_70px_-35px_rgba(15,23,42,0.4)]"
      style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
    >
      <header className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-600 dark:text-violet-300">
            Selected Work
          </p>
          <h3 className="text-[18px] font-bold leading-tight cs-text">Portfolio & Contact</h3>
        </div>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-300">
          <Sparkles className="h-4 w-4" strokeWidth={2.2} />
        </span>
      </header>

      {/* thumbnails */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {WORKS.map((w, i) => (
          <motion.div
            key={w.src}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: EASE }}
            className="group relative aspect-square overflow-hidden rounded-lg border cs-border"
          >
            <Image
              src={w.src}
              alt={w.alt}
              fill
              sizes="100px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </motion.div>
        ))}
      </div>

      {/* contact rows */}
      <div className="mt-4 space-y-2">
        <ContactRow icon={Mail} label="hello@lenapark.studio" tone="text-violet-600 dark:text-violet-300" />
        <ContactRow icon={Globe} label="lenapark.studio" tone="text-sky-600 dark:text-sky-300" />
        <ContactRow icon={Dribbble} label="dribbble.com/lenapark" tone="text-pink-500" />
      </div>

      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        className="mt-auto w-full rounded-xl border cs-border bg-violet-50/60 py-2.5 text-[12px] font-semibold text-violet-700 transition cs-hover dark:bg-violet-500/10 dark:text-violet-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40"
      >
        Download résumé (PDF)
      </motion.button>
    </div>
  );
}

function SocialButton({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileTap={{ scale: 0.92 }}
      className="flex h-10 w-10 items-center justify-center rounded-xl border cs-border transition cs-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40"
    >
      {children}
    </motion.a>
  );
}

function ContactRow({
  icon: Icon,
  label,
  tone,
}: {
  icon: typeof Mail;
  label: string;
  tone: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg border cs-border px-3 py-2">
      <Icon className={`h-4 w-4 ${tone}`} strokeWidth={2} />
      <span className="truncate text-[12px] font-medium cs-text">{label}</span>
    </div>
  );
}
