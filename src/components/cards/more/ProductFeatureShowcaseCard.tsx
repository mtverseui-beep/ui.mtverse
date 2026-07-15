"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Image from "next/image";
import { BatteryFull, Bluetooth, ChevronDown, Cpu, Gauge, Headphones, Sparkles, Volume2 } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// ProductFeatureShowcaseCard — premium product feature showcase.
// Soft white + blue palette. A large product image up top with tab-based
// feature switching (AnimatePresence crossfade), and an expandable specs
// accordion beneath. Device-preview feel with a soft reflection.

type FeatureId = "audio" | "anc" | "battery" | "connect";

interface Feature {
  id: FeatureId;
  label: string;
  icon: typeof Headphones;
  tagline: string;
  image: string;
  specs: { label: string; value: string }[];
}

const FEATURES: Feature[] = [
  {
    id: "audio",
    label: "Audio",
    icon: Volume2,
    tagline: "Studio-grade 40mm drivers tuned by engineers.",
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80",
    specs: [
      { label: "Driver", value: "40mm titanium" },
      { label: "Frequency", value: "20 Hz – 40 kHz" },
      { label: "Codec", value: "LDAC · aptX HD" },
    ],
  },
  {
    id: "anc",
    label: "ANC",
    icon: Gauge,
    tagline: "Adaptive noise cancellation reads the room 200×/sec.",
    image:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80",
    specs: [
      { label: "Modes", value: "Adaptive · Off · Transparency" },
      { label: "Reduction", value: "Up to −42 dB" },
      { label: "Mics", value: "6-mic array" },
    ],
  },
  {
    id: "battery",
    label: "Battery",
    icon: BatteryFull,
    tagline: "All-day listening with a 10-minute quick charge.",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80",
    specs: [
      { label: "Playtime", value: "40 hours (ANC on)" },
      { label: "Quick charge", value: "10 min = 5 hours" },
      { label: "Charging", value: "USB-C · Qi wireless" },
    ],
  },
  {
    id: "connect",
    label: "Connect",
    icon: Bluetooth,
    tagline: "Multipoint Bluetooth 5.3 with low-latency mode.",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80",
    specs: [
      { label: "Bluetooth", value: "5.3 · LE Audio" },
      { label: "Multipoint", value: "2 devices" },
      { label: "Latency", value: "38 ms game mode" },
    ],
  },
];

export function ProductFeatureShowcaseCard() {
  const [active, setActive] = useState<FeatureId>("audio");
  const [openSpec, setOpenSpec] = useState<number | null>(0);

  const feature = FEATURES.find((f) => f.id === active) ?? FEATURES[0];

  return (
    <motion.div
      className="w-[clamp(280px,90vw,380px)] select-none"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* Ambient blue glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 25% 12%, rgba(59,130,246,0.16), transparent 55%), radial-gradient(circle at 80% 88%, rgba(14,165,233,0.12), transparent 60%)",
        }}
      />

      <article className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(15,23,42,0.35)]">
        {/* Product image with crossfade */}
        <div className="relative h-[220px] w-full overflow-hidden bg-gradient-to-b from-sky-50 to-white dark:from-sky-950/40 dark:to-zinc-900">
          <AnimatePresence mode="wait">
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="absolute inset-0"
            >
              <Image
                src={feature.image}
                alt={`${feature.label} feature preview`}
                fill
                sizes="380px"
                priority
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent dark:from-zinc-900/70" />
            </motion.div>
          </AnimatePresence>

          {/* product badge */}
          <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700 backdrop-blur-sm dark:bg-zinc-900/70 dark:text-sky-300">
            <Headphones className="h-3 w-3" strokeWidth={2.4} />
            Aura Pro
          </div>
          <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-blue-500/15 px-2 py-0.5 text-[9.5px] font-semibold text-blue-700 dark:text-sky-200">
            <Sparkles className="h-2.5 w-2.5" strokeWidth={2.4} />
            New
          </div>

          {/* tagline overlay */}
          <p className="absolute inset-x-4 bottom-3 text-[12px] font-medium text-blue-900/80 dark:text-sky-100/80">
            {feature.tagline}
          </p>
        </div>

        {/* Tabs */}
        <LayoutGroup id="feature-tabs">
          <div className="flex border-b cs-border">
            {FEATURES.map((f) => {
              const isActive = f.id === active;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    setActive(f.id);
                    setOpenSpec(0);
                  }}
                  className="relative flex flex-1 flex-col items-center gap-1 px-1 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40"
                  aria-pressed={isActive}
                >
                  <f.icon
                    className={`h-4 w-4 transition ${isActive ? "text-blue-600 dark:text-sky-300" : "cs-subtle"}`}
                    strokeWidth={2.2}
                  />
                  <span
                    className={`text-[10.5px] font-semibold transition ${
                      isActive ? "cs-text" : "cs-muted"
                    }`}
                  >
                    {f.label}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="feature-underline"
                      className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-blue-500"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        {/* Specs accordion */}
        <div className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[13px] font-bold cs-text">Specifications</h3>
            <span className="flex items-center gap-1 text-[10px] font-medium cs-subtle">
              <Cpu className="h-3 w-3" strokeWidth={2.2} />
              {feature.specs.length} details
            </span>
          </div>
          <div className="space-y-1.5">
            {feature.specs.map((spec, i) => {
              const open = openSpec === i;
              return (
                <div
                  key={spec.label}
                  className={`overflow-hidden rounded-xl border transition-colors ${
                    open
                      ? "border-blue-300/60 bg-blue-50/50 dark:border-blue-500/30 dark:bg-blue-500/5"
                      : "cs-border"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenSpec(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between px-3 py-2.5 text-left transition cs-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40"
                  >
                    <span className="text-[12.5px] font-semibold cs-text">{spec.label}</span>
                    <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
                      <ChevronDown className="h-4 w-4 text-blue-600 dark:text-sky-300" strokeWidth={2.2} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="px-3 pb-3 text-[12px] font-medium text-blue-700 dark:text-sky-200">
                          {spec.value}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            className="mt-3 w-full rounded-xl bg-gradient-to-r from-blue-500 to-sky-500 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:from-blue-600 hover:to-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40"
          >
            Pre-order — $349
          </motion.button>
        </div>
      </article>
    </motion.div>
  );
}
