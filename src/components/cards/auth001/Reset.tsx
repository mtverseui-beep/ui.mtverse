"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { AuthShell, MPassword, MButton } from "./shared";

const RULES = [
  { label: "8+ characters", test: (v: string) => v.length >= 8 },
  { label: "Uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "Number or symbol", test: (v: string) => /[0-9!@#$%^&*]/.test(v) },
];

export function Reset() {
  const [pw, setPw] = useState("");
  const passed = RULES.filter((r) => r.test(pw)).length;

  return (
    <AuthShell
      title="Set a new password"
      description="Choose a strong password you haven't used before on Meridian."
      footer={
        <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-1.5 text-foreground underline-offset-4 hover:underline">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
        </a>
      }
    >
      <div className="space-y-5">
        <div className="m-fade-up" style={{ animationDelay: "0.1s" }}>
          <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">New password</label>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Enter a new password"
            autoComplete="new-password"
            className="w-full border border-foreground/15 bg-transparent px-3 py-2.5 text-sm transition-colors focus:border-foreground/40 focus:outline-none"
          />
          {/* Strength segments */}
          <div className="mt-3 flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-1 flex-1 bg-foreground/10">
                <span className="block h-full transition-all duration-300" style={{ width: passed > i ? "100%" : "0%", background: "var(--foreground)" }} />
              </span>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {RULES.map((r) => {
              const ok = r.test(pw);
              return (
                <span key={r.label} className="font-mono text-[11px] uppercase tracking-wider" style={{ color: ok ? "var(--foreground)" : "var(--muted-foreground)", opacity: ok ? 1 : 0.5 }}>
                  {ok ? "✓" : "·"} {r.label}
                </span>
              );
            })}
          </div>
        </div>

        <MPassword label="Confirm password" placeholder="Re-enter your password" autoComplete="new-password" delay={0.2} />
        <MButton delay={0.3}>Reset password</MButton>
      </div>
    </AuthShell>
  );
}
