"use client";

import { AuthShell, MField, MPassword, MButton, MDivider, MSocial } from "./shared";

export function SignUp() {
  return (
    <AuthShell
      title="Create your account"
      description="Start your 14-day Meridian trial — no credit card required."
      footer={
        <>
          Already have an account?{" "}
          <a href="#" onClick={(e) => e.preventDefault()} className="text-foreground underline-offset-4 hover:underline">
            Sign in
          </a>
        </>
      }
    >
      <div className="space-y-5">
        <MField label="Full name" placeholder="Ada Lovelace" autoComplete="name" delay={0.1} />
        <MField label="Work email" type="email" placeholder="you@company.com" autoComplete="email" delay={0.15} />
        <MPassword label="Password" placeholder="Create a password" autoComplete="new-password" delay={0.2} />
        <MButton delay={0.3}>Create account</MButton>
      </div>
      <MDivider delay={0.4} />
      <MSocial delay={0.5} />
    </AuthShell>
  );
}
