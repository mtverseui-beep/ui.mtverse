"use client";

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { AuthShell, MOtp, MButton } from "./shared";

export function Otp() {
  const [s, setS] = useState(30);
  useEffect(() => {
    if (s <= 0) return;
    const t = setTimeout(() => setS((x) => x - 1), 1000);
    return () => clearTimeout(t);
  }, [s]);

  return (
    <AuthShell
      title="Verify your email"
      description="Enter the 6-digit code we sent to a•••@company.com to continue."
      footer={
        <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-1.5 text-foreground underline-offset-4 hover:underline">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
        </a>
      }
    >
      <div className="space-y-6">
        <MOtp delay={0.1} />
        <MButton delay={0.2}>Verify code</MButton>
        <p className="m-fade-up text-center text-sm text-muted-foreground" style={{ animationDelay: "0.3s" }}>
          {s > 0 ? (
            <>
              Resend code in <span className="font-mono font-semibold text-foreground tabular-nums">0:{String(s).padStart(2, "0")}</span>
            </>
          ) : (
            <button type="button" onClick={() => setS(30)} className="font-mono text-xs uppercase tracking-widest text-foreground underline-offset-4 hover:underline">
              Resend code
            </button>
          )}
        </p>
      </div>
    </AuthShell>
  );
}
