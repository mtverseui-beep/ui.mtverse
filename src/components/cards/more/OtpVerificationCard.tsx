"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, RotateCcw, Check } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// OtpVerificationCard — "Send Code" button with countdown timer + resend.
// 1. Send code — starts a 60s countdown with circular SVG progress ring
// 2. Countdown — ring depletes, number ticks down, button disabled
// 3. Resend — becomes active when countdown reaches 0, spring pulse

export function OtpVerificationCard() {
  const [state, setState] = useState<"idle" | "counting" | "done">("idle");
  const [seconds, setSeconds] = useState(60);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const R = 16, C = 2 * Math.PI * R;

  const handleSend = () => {
    if (state !== "idle" && state !== "done") return;
    setState("counting");
    setSeconds(60);
    intervalRef.current = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setState("done");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  const progress = state === "counting" ? ((60 - seconds) / 60) * 100 : state === "done" ? 100 : 0;
  const canResend = state === "done" || state === "idle";

  return (
    <motion.div className="w-[clamp(280px,88vw,380px)] select-none" initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: EASE }}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(5,150,105,0.08), transparent 55%)" }} />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <div className="border-b cs-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/20"><Phone className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" strokeWidth={2.2} /></div>
            <div><h2 className="text-[14px] font-bold tracking-tight cs-text">OTP Verification</h2><p className="text-[10.5px] cs-muted">Send code · countdown ring · resend</p></div>
          </div>
        </div>
        <div className="space-y-7 p-5">
          {/* Status text */}
          <p className="text-center text-[11.5px] cs-muted">
            {state === "idle" && "Click send to receive a verification code"}
            {state === "counting" && `Code sent! Resend in ${seconds}s`}
            {state === "done" && "Ready to resend code"}
          </p>

          {/* Button with progress ring */}
          <motion.button type="button" onClick={handleSend} disabled={!canResend} whileTap={canResend ? { scale: 0.97 } : undefined} animate={state === "done" ? { scale: [1, 1.03, 1] } : {}} transition={state === "done" ? { duration: 1.5, repeat: Infinity } : {}} className="relative flex w-full items-center justify-center gap-3 rounded-xl py-3 text-[13px] font-semibold text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 disabled:opacity-60" style={{ background: state === "done" ? "#059669" : "#2563eb" }}>
            <span className="relative z-10 flex items-center gap-3">
              {/* SVG progress ring */}
              <div className="relative flex h-9 w-9 items-center justify-center">
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 40 40">
                  <circle cx="20" cy="20" r={R} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5" />
                  {state !== "idle" && <circle cx="20" cy="20" r={R} fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C - (progress / 100) * C} />}
                </svg>
                <div className="relative z-10">
                  {state === "idle" && <Phone className="h-4 w-4" strokeWidth={2.2} />}
                  {state === "counting" && <span className="text-[9px] font-bold tabular-nums">{seconds}</span>}
                  {state === "done" && <RotateCcw className="h-4 w-4" strokeWidth={2.4} />}
                </div>
              </div>
              <AnimatePresence mode="wait">
                {state === "idle" && <motion.span key="send" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Send Code</motion.span>}
                {state === "counting" && <motion.span key="wait" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Waiting…</motion.span>}
                {state === "done" && <motion.span key="resend" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Resend Code</motion.span>}
              </AnimatePresence>
            </span>
          </motion.button>
        </div>
        <div className="border-t cs-border px-5 py-2.5 text-center"><p className="text-[9.5px] cs-subtle">60s countdown · auto-enables resend when done</p></div>
      </div>
    </motion.div>
  );
}
