"use client";

import { AuthShell, MField, MPassword, MButton, MDivider, MSocial } from "./shared";

export function SignIn() {
  return (
    <AuthShell
      title="Welcome back"
      description="Sign in to your Meridian workspace to view your dashboards."
      footer={
        <>
          New here?{" "}
          <a href="#" onClick={(e) => e.preventDefault()} className="text-foreground underline-offset-4 hover:underline">
            Create an account
          </a>
        </>
      }
    >
      <div className="space-y-5">
        <MField label="Email" type="email" placeholder="you@company.com" autoComplete="email" delay={0.1} />
        <MPassword
          label="Password"
          autoComplete="current-password"
          delay={0.2}
          hint={
            <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Forgot password?
            </a>
          }
        />
        <MButton delay={0.3}>Sign in</MButton>
      </div>
      <MDivider delay={0.4} />
      <MSocial delay={0.5} />
    </AuthShell>
  );
}
