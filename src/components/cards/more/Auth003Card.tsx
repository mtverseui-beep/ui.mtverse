"use client";

import { motion } from "framer-motion";
import { AuthScreenSet, type AuthShellProps, type AuthStyles } from "./auth-screen-set";

// ════════════════════════════════════════════════════════════════════════════
// Auth003 — Brutalist auth set (6 screens with tab switcher)
// Off-white + heavy black borders + offset hard shadows + Archivo Black.
// ════════════════════════════════════════════════════════════════════════════

const BRAND = "BRUTAL";

const styles: AuthStyles = {
  variant: "light",
  accent: "#facc15",
  inputClass: "w-full border-2 border-black bg-white py-2.5 px-3 text-sm font-medium outline-none focus:bg-yellow-50",
  labelClass: "mb-1 block text-xs font-bold uppercase tracking-widest text-black/70",
  buttonClass: "w-full border-2 border-black bg-yellow-300 py-3 text-sm font-bold uppercase tracking-widest text-black",
  secondaryButtonClass: "rounded-none border-2 border-black bg-white",
  otpClass: "h-14 w-full border-2 border-black bg-white text-center text-xl font-bold outline-none focus:bg-yellow-50",
  dividerLineColor: "rgba(0,0,0,0.15)",
  dividerTextColor: "rgba(0,0,0,0.4)",
  textColor: "#0a0a0a",
  subTextColor: "rgba(0,0,0,0.6)",
  linkClass: "text-black font-bold underline",
  hintColor: "rgba(0,0,0,0.4)",
};

function Shell({ title, description, children, footer }: AuthShellProps) {
  return (
    <section className="relative flex min-h-full items-center justify-center py-12" style={{ background: "#fefce8", fontFamily: "var(--font-archivo), system-ui, sans-serif", color: "#0a0a0a" }}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10 w-full max-w-md border-2 border-black bg-white p-8" style={{ boxShadow: "12px 12px 0 0 #000" }}>
        <div className="mb-6 flex items-center gap-2">
          <div className="h-8 w-8 border-2 border-black bg-yellow-300" />
          <span className="text-xl font-black uppercase tracking-tight">{BRAND}</span>
        </div>
        <h1 className="text-3xl font-black uppercase leading-[0.9]" style={{ letterSpacing: "-0.04em" }}>{title}</h1>
        <p className="mt-2 text-sm text-black/70">{description}</p>
        <div className="mt-6">{children}</div>
        {footer && <div className="mt-6 text-center text-sm text-black/60">{footer}</div>}
      </motion.div>
    </section>
  );
}

export function Auth003Card() {
  return <AuthScreenSet brandName={BRAND} Shell={Shell} styles={styles} />;
}
