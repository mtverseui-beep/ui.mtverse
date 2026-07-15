"use client";

import { ArrowLeft, ShieldCheck } from "lucide-react";
import { AuthShell, MOtp, MButton } from "./shared";

export function TwoStep() {
  return (
    <AuthShell
      title="Two-step verification"
      description="Enter the 6-digit code from your authenticator app to finish signing in."
      footer={
        <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-1.5 text-foreground underline-offset-4 hover:underline">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
        </a>
      }
    >
      <div className="space-y-6">
        <div className="m-fade-up flex items-center gap-3 border border-foreground/10 bg-foreground/[0.02] p-3 text-sm text-muted-foreground" style={{ animationDelay: "0.05s" }}>
          <ShieldCheck className="h-5 w-5 shrink-0 text-foreground" strokeWidth={1.75} />
          Protected by two-factor authentication.
        </div>
        <MOtp delay={0.1} />
        <label className="m-fade-up flex items-center gap-2 text-sm text-muted-foreground" style={{ animationDelay: "0.2s" }}>
          <input type="checkbox" className="h-4 w-4 border-foreground/20 accent-foreground" />
          Trust this device for 30 days
        </label>
        <MButton delay={0.3}>Verify &amp; continue</MButton>
        <p className="m-fade-up text-center text-sm text-muted-foreground" style={{ animationDelay: "0.4s" }}>
          Lost access?{" "}
          <a href="#" onClick={(e) => e.preventDefault()} className="font-mono text-xs uppercase tracking-widest text-foreground underline-offset-4 hover:underline">
            Use a backup code
          </a>
        </p>
      </div>
    </AuthShell>
  );
}
