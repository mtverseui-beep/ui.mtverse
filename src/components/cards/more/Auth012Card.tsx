"use client";

import { motion } from "framer-motion";
import { AuthScreenSet, type AuthShellProps, type AuthStyles } from "./auth-screen-set";

const BRAND = "Verdant";

const styles: AuthStyles = {
  variant: "light", accent: "#92400e",
  inputClass: "w-full border-0 border-b border-amber-900/20 bg-transparent py-2.5 px-1 text-sm outline-none focus:border-amber-700",
  labelClass: "mb-1.5 block text-[10px] uppercase tracking-[0.3em] text-amber-800/60",
  buttonClass: "w-full rounded-xl py-3 text-sm font-semibold text-[#f0e9dc]",
  secondaryButtonClass: "border border-amber-900/20 bg-transparent",
  otpClass: "h-14 w-full border-b-2 border-amber-900/20 bg-transparent text-center text-xl font-bold outline-none focus:border-amber-700",
  dividerLineColor: "rgba(146,64,14,0.2)", dividerTextColor: "rgba(146,64,14,0.4)",
  textColor: "#2d2418", subTextColor: "rgba(92,74,50,0.8)",
  linkClass: "text-amber-900 font-medium hover:underline", hintColor: "rgba(92,74,50,0.5)",
};

function Shell({ title, description, children, footer }: AuthShellProps) {
  return (
    <section className="relative flex min-h-full items-center justify-center py-12" style={{ background: "#f0e9dc", fontFamily: "var(--font-fraunces), Georgia, serif", color: "#2d2418" }}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-multiply" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/></filter><rect width='300' height='300' filter='url(%23n)'/></svg>\")" }} />
      <div className="absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(217,119,6,0.15), transparent 70%)" }} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 w-full max-w-sm px-6">
        <div className="mb-4 flex justify-center"><div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "rgba(217,119,6,0.1)" }}><svg viewBox="0 0 24 24" className="h-6 w-6 fill-amber-700"><path d="M12 2C7 6 7 14 12 22C17 14 17 6 12 2Z" /></svg></div></div>
        <p className="text-center text-[10px] uppercase tracking-[0.4em] text-amber-700/70" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{BRAND} · Gardener Portal</p>
        <h1 className="mt-3 text-center text-3xl font-medium tracking-tight" style={{ letterSpacing: "-0.02em", fontStyle: "italic" }}>{title}</h1>
        <p className="mt-2 text-center text-sm italic text-amber-800/60">{description}</p>
        <div className="mt-6" style={{ fontFamily: "var(--font-inter-tight), sans-serif" }}>{children}</div>
        {footer && <div className="mt-6 text-center text-xs italic text-amber-800/60" style={{ fontFamily: "var(--font-fraunces), serif" }}>{footer}</div>}
      </motion.div>
    </section>
  );
}

export function Auth012Card() {
  return <AuthScreenSet brandName={BRAND} Shell={Shell} styles={styles} />;
}
