"use client";

import { useState } from "react";
import { ArrowLeft, MailCheck } from "lucide-react";
import { AuthShell, MField, MButton } from "./shared";

export function Forgot() {
  const [sent, setSent] = useState(false);
  return (
    <AuthShell
      title={sent ? "Check your inbox" : "Forgot password?"}
      description={
        sent
          ? "We've sent a password reset link to your email. It expires in 30 minutes."
          : "Enter the email tied to your Meridian account and we'll send a reset link."
      }
      footer={
        <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-1.5 text-foreground underline-offset-4 hover:underline">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
        </a>
      }
    >
      {sent ? (
        <div className="m-fade-up space-y-5">
          <div className="flex items-center gap-4 border border-foreground/10 bg-foreground/[0.02] p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-foreground text-background">
              <MailCheck className="h-5 w-5" />
            </span>
            <p className="text-sm text-muted-foreground">Didn&apos;t get it? Check spam, or resend below.</p>
          </div>
          <button type="button" onClick={() => setSent(false)} className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground">
            Use a different email
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          <MField label="Email" type="email" placeholder="you@company.com" autoComplete="email" delay={0.1} />
          <div onClick={() => setSent(true)}>
            <MButton delay={0.2}>Send reset link</MButton>
          </div>
        </div>
      )}
    </AuthShell>
  );
}
