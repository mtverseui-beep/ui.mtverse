"use client";
import { useState, useRef, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Smartphone, Mail } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function OTPInputCard() {
  return (
    <motion.div className="w-[clamp(300px,92vw,420px)] select-none" initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: EASE }}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(5,150,105,0.08), transparent 55%)" }} />
      <div className="cs-surface overflow-visible rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <div className="border-b cs-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/20"><ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" strokeWidth={2.2} /></div>
            <div><h2 className="text-[14px] font-bold tracking-tight cs-text">OTP Input</h2><p className="text-[10.5px] cs-muted">Box · underline · circle — 3 variants</p></div>
          </div>
        </div>
        <div className="space-y-7 p-5">
          <BoxOTP />
          <UnderlineOTP />
          <CircleOTP />
        </div>
        <div className="border-t cs-border px-5 py-2.5 text-center"><p className="text-[9.5px] cs-subtle">Type in any field · auto-advance · backspace · paste</p></div>
      </div>
    </motion.div>
  );
}

// ── 1. Box style — cursor glow trail on auto-advance ──
function BoxOTP() {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [glowIdx, setGlowIdx] = useState(-1);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const change = (i: number, val: string) => {
    if (val && !/^\d$/.test(val)) return;
    const next = [...digits]; next[i] = val; setDigits(next);
    if (val && i < 5) {
      setGlowIdx(i + 1);
      setTimeout(() => setGlowIdx(-1), 500);
      refs.current[i + 1]?.focus();
    }
  };
  const keyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      setGlowIdx(i - 1);
      setTimeout(() => setGlowIdx(-1), 500);
      refs.current[i - 1]?.focus();
    }
  };
  const paste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const p = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (p) { setDigits(p.split("").concat(Array(6 - p.length).fill(""))); setGlowIdx(Math.min(p.length, 5)); setTimeout(() => setGlowIdx(-1), 500); refs.current[Math.min(p.length, 5)]?.focus(); }
  };

  return (
    <div>
      <div className="mb-3 flex items-center gap-1.5"><Smartphone className="h-3.5 w-3.5 cs-subtle" strokeWidth={2} /><span className="text-[10px] font-bold uppercase tracking-wider cs-subtle">1 · Box Style</span></div>
      <div className="flex justify-center gap-2" onPaste={paste}>
        {digits.map((d, i) => (
          <div key={i} className="relative">
            {/* Cursor glow trail */}
            <AnimatePresence>
              {glowIdx === i && (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1.2 }} exit={{ opacity: 0, scale: 1 }} transition={{ duration: 0.4, ease: EASE }} className="pointer-events-none absolute -inset-1.5 rounded-xl blur-md" style={{ background: "rgba(16,185,129,0.3)" }} />
              )}
            </AnimatePresence>
            {/* Wrapper animates scale — input itself is plain, no motion interference */}
            <motion.div animate={{ scale: d ? [1, 1.15, 1] : 1 }} transition={{ duration: 0.2 }}>
              <input
                ref={el => { refs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={e => change(i, e.target.value)}
                onKeyDown={e => keyDown(i, e)}
                className="h-11 w-9 rounded-xl border-2 bg-transparent text-center text-[18px] font-bold tabular-nums cs-text focus:outline-none transition-colors duration-200"
                style={{
                  borderColor: d ? "#10b981" : glowIdx === i ? "#10b981" : "var(--card-border)",
                  background: "var(--card-input-bg)",
                  boxShadow: glowIdx === i ? "0 0 12px rgba(16,185,129,0.3)" : "none",
                }}
              />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 2. Underline connected ──
function UnderlineOTP() {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [glowIdx, setGlowIdx] = useState(-1);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const change = (i: number, val: string) => {
    if (val && !/^\d$/.test(val)) return;
    const next = [...digits]; next[i] = val; setDigits(next);
    if (val && i < 5) { setGlowIdx(i + 1); setTimeout(() => setGlowIdx(-1), 500); refs.current[i + 1]?.focus(); }
  };
  const keyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) { setGlowIdx(i - 1); setTimeout(() => setGlowIdx(-1), 500); refs.current[i - 1]?.focus(); }
  };

  return (
    <div>
      <div className="mb-3 flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 cs-subtle" strokeWidth={2} /><span className="text-[10px] font-bold uppercase tracking-wider cs-subtle">2 · Underline Connected</span></div>
      <div className="flex justify-center gap-1.5">
        {digits.map((d, i) => (
          <div key={i} className="relative">
            <AnimatePresence>
              {glowIdx === i && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none absolute -inset-1 rounded-lg blur-sm" style={{ background: "rgba(139,92,246,0.2)" }} />}
            </AnimatePresence>
            <motion.div animate={{ scale: d ? [1, 1.1, 1] : 1 }} transition={{ duration: 0.15 }}>
              <input
                ref={el => { refs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={e => change(i, e.target.value)}
                onKeyDown={e => keyDown(i, e)}
                className="h-11 w-9 border-0 border-b-2 bg-transparent text-center text-[18px] font-bold tabular-nums cs-text focus:outline-none transition-colors duration-200"
                style={{ borderColor: d ? "#8b5cf6" : glowIdx === i ? "#8b5cf6" : "var(--card-border)" }}
              />
            </motion.div>
            {d && <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ type: "spring", stiffness: 400, damping: 25 }} className="absolute bottom-0 left-0 h-0.5 w-full origin-left rounded-full" style={{ background: "#8b5cf6" }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 3. Segmented circle ──
function CircleOTP() {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [glowIdx, setGlowIdx] = useState(-1);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const change = (i: number, val: string) => {
    if (val && !/^\d$/.test(val)) return;
    const next = [...digits]; next[i] = val; setDigits(next);
    if (val && i < 5) { setGlowIdx(i + 1); setTimeout(() => setGlowIdx(-1), 500); refs.current[i + 1]?.focus(); }
  };
  const keyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) { setGlowIdx(i - 1); setTimeout(() => setGlowIdx(-1), 500); refs.current[i - 1]?.focus(); }
  };

  return (
    <div>
      <div className="mb-3 flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 cs-subtle" strokeWidth={2} /><span className="text-[10px] font-bold uppercase tracking-wider cs-subtle">3 · Circle Segmented</span></div>
      <div className="flex justify-center gap-2.5">
        {digits.map((d, i) => (
          <div key={i} className="relative flex h-11 w-11 items-center justify-center">
            <AnimatePresence>
              {glowIdx === i && <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1.3, opacity: 0.4 }} exit={{ scale: 1.5, opacity: 0 }} transition={{ duration: 0.5, ease: EASE }} className="pointer-events-none absolute inset-0 rounded-full blur-md" style={{ background: "rgba(59,130,246,0.3)" }} />}
            </AnimatePresence>
            <motion.div className="absolute inset-0 rounded-full border-2" animate={{ borderColor: d ? "#3b82f6" : glowIdx === i ? "#3b82f6" : "var(--card-border)", background: d ? "rgba(59,130,246,0.08)" : "transparent" }} transition={{ duration: 0.2 }} />
            {d && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 20 }} className="pointer-events-none absolute inset-0 rounded-full" style={{ boxShadow: "0 0 12px rgba(59,130,246,0.3)" }} />}
            <motion.div animate={{ scale: d ? [1, 1.12, 1] : 1 }} transition={{ duration: 0.2 }} className="relative z-10 h-full w-full">
              <input
                ref={el => { refs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={e => change(i, e.target.value)}
                onKeyDown={e => keyDown(i, e)}
                className="h-full w-full bg-transparent text-center text-[16px] font-bold tabular-nums cs-text focus:outline-none"
              />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
