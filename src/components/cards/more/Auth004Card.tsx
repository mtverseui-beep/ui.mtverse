"use client";

import { motion } from "framer-motion";
import { AuthScreenSet, type AuthShellProps, type AuthStyles } from "./auth-screen-set";

const BRAND = "The Quarterly";

const styles: AuthStyles = {
  variant: "light", accent: "#92400e",
  inputClass: "w-full border-0 border-b border-black/20 bg-transparent py-2.5 px-1 text-sm outline-none focus:border-black",
  labelClass: "mb-1.5 block text-[10px] uppercase tracking-[0.3em] text-black/50",
  buttonClass: "w-full bg-black py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#f5f0e6]",
  secondaryButtonClass: "border border-black/20 bg-transparent",
  otpClass: "h-14 w-full border-b-2 border-black/20 bg-transparent text-center text-xl font-bold outline-none focus:border-black",
  dividerLineColor: "rgba(26,22,18,0.2)", dividerTextColor: "rgba(26,22,18,0.4)",
  textColor: "#1a1612", subTextColor: "rgba(26,22,18,0.6)",
  linkClass: "text-black underline-offset-4 hover:underline", hintColor: "rgba(26,22,18,0.4)",
};

function Shell({ title, description, children, footer }: AuthShellProps) {
  return (
    <section className="relative flex min-h-full items-center justify-center py-12" style={{ background: "#f5f0e6", fontFamily: "var(--font-fraunces), Georgia, serif", color: "#1a1612" }}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-multiply" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.7 0'/></filter><rect width='300' height='300' filter='url(%23n)'/></svg>\")" }} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 w-full max-w-sm px-6">
        <div className="border-t-2 border-b border-black/30 py-3 text-center"><p className="text-[10px] uppercase tracking-[0.4em] text-black/50" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>Vol. XII · {BRAND} · Subscriber Access</p></div>
        <h1 className="my-6 text-center text-4xl font-medium tracking-tight" style={{ letterSpacing: "-0.03em", fontStyle: "italic" }}>{title}</h1>
        <p className="mb-6 text-center text-sm italic text-black/60">{description}</p>
        <div style={{ fontFamily: "var(--font-inter-tight), sans-serif" }}>{children}</div>
        {footer && <div className="mt-6 text-center text-sm italic text-black/50">{footer}</div>}
      </motion.div>
    </section>
  );
}

export function Auth004Card() {
  return <AuthScreenSet brandName={BRAND} Shell={Shell} styles={styles} />;
}
