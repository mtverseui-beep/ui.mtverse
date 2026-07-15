"use client";

// ════════════════════════════════════════════════════════════════════════════
// Auth001Card — "Meridian" auth set (monochrome split-panel) · 6 screens
// ════════════════════════════════════════════════════════════════════════════
// A cohesive auth design system: Sign In · Sign Up · Forgot · Reset · OTP ·
// Two-Step. This entry is the interactive preview — a segmented switcher that
// renders each screen; the Code tab exposes every screen as its own file.
// Screens live in ../auth001/{SignIn,SignUp,Forgot,Reset,Otp,TwoStep,shared}.

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { SignIn } from "../auth001/SignIn";
import { SignUp } from "../auth001/SignUp";
import { Forgot } from "../auth001/Forgot";
import { Reset } from "../auth001/Reset";
import { Otp } from "../auth001/Otp";
import { TwoStep } from "../auth001/TwoStep";

const SCREENS = [
  { id: "signin", label: "Sign In", C: SignIn },
  { id: "signup", label: "Sign Up", C: SignUp },
  { id: "forgot", label: "Forgot", C: Forgot },
  { id: "reset", label: "Reset", C: Reset },
  { id: "otp", label: "OTP", C: Otp },
  { id: "twostep", label: "Two-Step", C: TwoStep },
] as const;

export function Auth001Card() {
  const [active, setActive] = useState<string>("signin");
  const Active = SCREENS.find((s) => s.id === active)?.C ?? SignIn;

  return (
    <div className="flex min-h-full w-full flex-col bg-background text-foreground">
      {/* Screen switcher — monochrome segmented control (Meridian) */}
      <div className="sticky top-0 z-30 flex items-center gap-3 overflow-x-auto border-b border-foreground/10 bg-background/80 px-4 py-2.5 backdrop-blur-md [scrollbar-width:none]">
        <span className="flex shrink-0 items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
          Meridian
        </span>
        <span className="h-4 w-px shrink-0 bg-foreground/10" />
        <LayoutGroup id="auth001-tabs">
          <div className="flex items-center gap-0.5">
            {SCREENS.map((s) => {
              const isActive = active === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className="relative shrink-0 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest outline-none transition-colors"
                >
                  {isActive && (
                    <motion.span
                      layoutId="auth001-active"
                      className="absolute inset-0 bg-foreground"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? "text-background" : "text-muted-foreground hover:text-foreground"}`}>
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </div>

      {/* Active screen */}
      <div className="min-h-0 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="h-full"
          >
            <Active />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
