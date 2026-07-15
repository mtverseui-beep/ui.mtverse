"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Check, AlertCircle, Eye, EyeOff, Phone, CreditCard } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// AnimatedFloatingInputCard — 3 premium variants:
// 1. Box float — label floats up inside a bordered box with focus glow
// 2. Underline — minimal underline that animates from center on focus
// 3. Glass — frosted glass input with floating label + inner shadow

export function AnimatedFloatingInputCard() {
  return (
    <motion.div className="w-[clamp(300px,92vw,420px)] select-none" initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: EASE }}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(59,130,246,0.08), transparent 55%)" }} />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <div className="border-b cs-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 ring-1 ring-blue-500/20"><Mail className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" strokeWidth={2.2} /></div>
            <div><h2 className="text-[14px] font-bold tracking-tight cs-text">Floating Inputs</h2><p className="text-[10.5px] cs-muted">Box float · underline · glass — 3 variants</p></div>
          </div>
        </div>

        <div className="space-y-7 p-5">
          {/* 1. Box float variant */}
          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider cs-subtle">1 · Box Float + Validation</label>
            <BoxFloatInput />
          </div>

          {/* 2. Underline variant */}
          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider cs-subtle">2 · Animated Underline</label>
            <UnderlineInput />
          </div>

          {/* 3. Glass variant */}
          <div>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider cs-subtle">3 · Frosted Glass</label>
            <GlassInput />
          </div>
        </div>

        <div className="border-t cs-border px-5 py-2.5 text-center"><p className="text-[9.5px] cs-subtle">Type in each field — 3 completely different input styles</p></div>
      </div>
    </motion.div>
  );
}

// ── 1. Box Float — label floats up inside bordered box with glow ──
function BoxFloatInput() {
  const [val, setVal] = useState("");
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const error = touched && val.length > 0 && !valid;
  const floated = focused || val.length > 0;
  const borderColor = error ? "#ef4444" : valid && val ? "#10b981" : focused ? "#3b82f6" : "var(--card-border)";

  return (
    <div className="relative">
      <motion.div aria-hidden className="pointer-events-none absolute -inset-0.5 rounded-xl blur-md" animate={{ opacity: focused ? 1 : 0 }} transition={{ duration: 0.2 }} style={{ background: error ? "rgba(239,68,68,0.15)" : valid && val ? "rgba(16,185,129,0.12)" : "rgba(59,130,246,0.12)" }} />
      <div className="relative flex items-center rounded-xl border-2 transition-colors duration-200" style={{ borderColor, background: "var(--card-input-bg)" }}>
        <div className="pl-3.5">
          <Mail className={`h-4 w-4 transition-colors duration-200 ${error ? "text-rose-500" : valid && val ? "text-emerald-500" : focused ? "text-blue-500" : "text-slate-400 dark:text-slate-500"}`} strokeWidth={2} />
        </div>
        <div className="relative flex-1 px-3">
          {/* Floating label — absolute positioned, sits above input when floated */}
          <label
            className="pointer-events-none absolute left-3 font-medium transition-all duration-200"
            style={{
              top: floated ? "4px" : "50%",
              transform: floated ? "translateY(0)" : "translateY(-50%)",
              fontSize: floated ? "9px" : "13px",
              color: error ? "#ef4444" : focused ? "#3b82f6" : "var(--card-text-muted)",
            }}
          >
            Email Address
          </label>
          <input
            type="email"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => { setFocused(false); setTouched(true); }}
            className="w-full bg-transparent text-[13px] cs-text focus:outline-none"
            style={{ paddingTop: floated ? "18px" : "12px", paddingBottom: floated ? "4px" : "12px" }}
          />
        </div>
        <div className="pr-3">
          {valid && val && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 20 }}><Check className="h-4 w-4 text-emerald-500" strokeWidth={2.4} /></motion.div>}
          {error && <AlertCircle className="h-4 w-4 text-rose-500" strokeWidth={2} />}
        </div>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-1.5 flex items-center gap-1.5 text-[10.5px] text-rose-500">
            <AlertCircle className="h-3 w-3" strokeWidth={2.2} /> Please enter a valid email
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── 2. Underline — minimal, underline grows from center on focus ──
function UnderlineInput() {
  const [val, setVal] = useState("");
  const [focused, setFocused] = useState(false);
  const floated = focused || val.length > 0;

  return (
    <div className="relative">
      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder=" "
        className="peer w-full border-0 border-b-2 bg-transparent py-2.5 text-[13px] cs-text focus:outline-none"
        style={{ borderColor: "var(--card-border)" }}
      />
      <label
        className="pointer-events-none absolute left-0 font-medium transition-all duration-200"
        style={{
          top: floated ? "-12px" : "50%",
          transform: floated ? "translateY(0) scale(0.85)" : "translateY(-50%)",
          color: focused ? "#8b5cf6" : "var(--card-text-muted)",
          transformOrigin: "left",
        }}
      >
        Username
      </label>
      {/* Animated underline — grows from center */}
      <motion.div
        className="absolute bottom-0 h-0.5 rounded-full"
        style={{ background: "linear-gradient(90deg, #8b5cf6, #6366f1)" }}
        initial={false}
        animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
        transition={{ duration: 0.3, ease: EASE }}
        // Center origin so it grows from center
      />
      <style>{`.peer:focus { border-color: transparent !important; }`}</style>
      {/* Full-width underline replacement */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: focused ? "transparent" : "var(--card-border)" }} />
    </div>
  );
}

// ── 3. Glass — frosted glass with floating label + inner shadow ──
function GlassInput() {
  const [val, setVal] = useState("");
  const [focused, setFocused] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const floated = focused || val.length > 0;

  return (
    <div className="relative overflow-hidden rounded-xl" style={{ background: focused ? "rgba(59,130,246,0.06)" : "var(--card-input-bg)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: `1px solid ${focused ? "rgba(59,130,246,0.3)" : "var(--card-border)"}`, boxShadow: focused ? "inset 0 2px 4px rgba(59,130,246,0.08)" : "inset 0 1px 2px rgba(0,0,0,0.04)" }}>
      <div className="flex items-center">
        <div className="pl-3.5">
          <Lock className={`h-4 w-4 transition-colors ${focused ? "text-blue-500" : "text-slate-400 dark:text-slate-500"}`} strokeWidth={2} />
        </div>
        <div className="relative flex-1 px-3">
          <label
            className="pointer-events-none absolute left-3 font-medium transition-all duration-200"
            style={{
              top: floated ? "4px" : "50%",
              transform: floated ? "translateY(0)" : "translateY(-50%)",
              fontSize: floated ? "9px" : "13px",
              color: focused ? "#3b82f6" : "var(--card-text-muted)",
            }}
          >
            Password
          </label>
          <input
            type={showPw ? "text" : "password"}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full bg-transparent text-[13px] cs-text focus:outline-none"
            style={{ paddingTop: floated ? "18px" : "12px", paddingBottom: floated ? "4px" : "12px" }}
          />
        </div>
        <button type="button" onClick={() => setShowPw(v => !v)} className="pr-3.5 text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-300">
          {showPw ? <EyeOff className="h-4 w-4" strokeWidth={2} /> : <Eye className="h-4 w-4" strokeWidth={2} />}
        </button>
      </div>
    </div>
  );
}
