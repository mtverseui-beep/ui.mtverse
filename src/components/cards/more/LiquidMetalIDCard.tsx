"use client";

import type React from "react";
import { useState, useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { Fingerprint, RotateCw, ShieldCheck } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// LiquidMetalIDCard — refined futuristic access pass.
// Graphite + subtle cyan palette. The over-heavy metallic gradients of the
// original are replaced with a soft iridescent sheen that follows the pointer.
// Front: avatar, name, role, A-7 clearance badge, verified indicator. Back:
// QR-style code block, credential details. Flips 180° on click with a smooth
// 3D rotateY. Pointer parallax tilts the card ±8°.

export function LiquidMetalIDCard() {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [flipped, setFlipped] = useState(false);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [8, -8]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-8, 8]), { stiffness: 220, damping: 22 });

  // sheen position follows the pointer
  const sheenX = useTransform(px, [0, 1], ["0%", "100%"]);
  const sheenY = useTransform(py, [0, 1], ["0%", "100%"]);

  const handleMove = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
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
      {/* Ambient cyan glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 15%, rgba(34,211,238,0.18), transparent 55%), radial-gradient(circle at 75% 85%, rgba(99,102,241,0.12), transparent 60%)",
        }}
      />

      <div style={{ perspective: 1500 }} className="flex justify-center">
        <motion.button
          type="button"
          ref={cardRef}
          onPointerMove={handleMove}
          onPointerLeave={handleLeave}
          onClick={() => setFlipped((f) => !f)}
          aria-label={flipped ? "Flip to front of access pass" : "Flip to back of access pass"}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{ rotateX, transformStyle: "preserve-3d" }}
          className="relative h-[238px] w-[360px] max-w-full cursor-pointer rounded-[22px] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
        >
          {/* FRONT */}
          <div
            aria-hidden={flipped}
            className="absolute inset-0 overflow-hidden rounded-[22px] border border-white/10"
            style={{
              backfaceVisibility: "hidden",
              background:
                "linear-gradient(150deg, #1c1f26 0%, #11131a 38%, #0c0e14 62%, #161922 100%)",
            }}
          >
            {/* iridescent sheen following pointer */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background: useTransform(
                  [sheenX, sheenY],
                  ([x, y]) =>
                    `radial-gradient(420px circle at ${x} ${y}, rgba(103,232,249,0.16), rgba(165,180,252,0.06) 35%, transparent 60%)`,
                ),
              }}
            />
            {/* subtle conic hue drift */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-50"
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              style={{
                background:
                  "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(34,211,238,0.06) 90deg, transparent 180deg, rgba(129,140,248,0.05) 270deg, transparent 360deg)",
              }}
            />
            {/* grid texture */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* content */}
            <div className="relative flex h-full flex-col justify-between p-6">
              {/* top row: identity + status */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div
                      aria-hidden
                      className="absolute -inset-1 rounded-full opacity-70"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(34,211,238,0.5), rgba(129,140,248,0.4))",
                      }}
                    />
                    <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/15 bg-zinc-800">
                      <Image
                        src="/images/wovjixvt-400x400.jpg"
                        alt="Access pass holder avatar"
                        fill
                        sizes="56px"
                        className="object-cover grayscale-[20%]"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] font-mono uppercase tracking-[0.28em] text-cyan-300/70">
                      Holder
                    </p>
                    <h3 className="text-[19px] font-semibold leading-tight text-white">
                      Vix Clotet
                    </h3>
                    <p className="text-[11px] font-medium text-zinc-400">
                      Lead Systems Architect
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-1">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-300">
                    Verified
                  </span>
                </div>
              </div>

              {/* middle: clearance badge */}
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-cyan-300" strokeWidth={2.2} />
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-zinc-400">
                  Clearance
                </span>
                <span className="rounded-md border border-cyan-300/40 bg-cyan-300/10 px-2 py-0.5 text-[11px] font-mono font-bold tracking-widest text-cyan-200">
                  A-7
                </span>
              </div>

              {/* bottom row: credential id + flip hint */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-500">
                    Credential ID
                  </p>
                  <p className="font-mono text-[12px] tracking-wider text-zinc-300">
                    ATLAS · 2025 · 0014
                  </p>
                </div>
                <motion.span
                  className="flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider text-zinc-500"
                  animate={{ opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <RotateCw className="h-3 w-3" strokeWidth={2} />
                  Tap to flip
                </motion.span>
              </div>
            </div>
          </div>

          {/* BACK */}
          <div
            aria-hidden={!flipped}
            className="absolute inset-0 overflow-hidden rounded-[22px] border border-white/10"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background:
                "linear-gradient(210deg, #1c1f26 0%, #11131a 38%, #0c0e14 62%, #161922 100%)",
            }}
          >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background: useTransform(
                  [sheenX, sheenY],
                  ([x, y]) =>
                    `radial-gradient(420px circle at ${x} ${y}, rgba(103,232,249,0.14), transparent 60%)`,
                ),
              }}
            />
            <div className="relative flex h-full flex-col justify-between p-6">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.28em] text-cyan-300/70">
                  <Fingerprint className="h-3.5 w-3.5" strokeWidth={2.2} />
                  Secure Access
                </span>
                <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-500">
                  Issued 2025
                </span>
              </div>

              {/* QR-style code block (decorative grid) */}
              <div className="flex items-center justify-center">
                <div className="relative rounded-lg border border-white/10 bg-black/40 p-2.5">
                  <QRGrid />
                  {/* finder corners */}
                  <span className="absolute left-1.5 top-1.5 h-4 w-4 rounded-[3px] border-2 border-cyan-300" />
                  <span className="absolute right-1.5 top-1.5 h-4 w-4 rounded-[3px] border-2 border-cyan-300" />
                  <span className="absolute bottom-1.5 left-1.5 h-4 w-4 rounded-[3px] border-2 border-cyan-300" />
                </div>
              </div>

              <div className="space-y-1.5">
                <DetailRow label="Facility" value="North Vault — Floor 4" />
                <DetailRow label="Valid" value="24h · rotates 03:00 UTC" />
                <DetailRow label="Issued by" value="Atlas Security Council" />
              </div>
            </div>
          </div>
        </motion.button>
      </div>

      <AnimatePresence>
        {flipped && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-3 text-center text-[11px] cs-muted"
          >
            Tap card to return to front
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-1.5 last:border-0 last:pb-0">
      <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-zinc-500">{label}</span>
      <span className="font-mono text-[11px] text-zinc-300">{value}</span>
    </div>
  );
}

// Deterministic pseudo-QR grid — purely decorative, no encoded data.
function QRGrid() {
  const cells: boolean[] = [];
  let seed = 7;
  for (let i = 0; i < 11 * 11; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    cells.push(seed / 233280 > 0.5);
  }
  return (
    <div
      className="grid gap-[2px]"
      style={{ gridTemplateColumns: "repeat(11, 6px)", gridTemplateRows: "repeat(11, 6px)" }}
      aria-hidden
    >
      {cells.map((on, i) => (
        <span
          key={i}
          className="block rounded-[1px]"
          style={{ width: 6, height: 6, backgroundColor: on ? "rgba(103,232,249,0.85)" : "transparent" }}
        />
      ))}
    </div>
  );
}
