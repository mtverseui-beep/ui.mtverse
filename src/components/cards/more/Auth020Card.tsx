"use client";

import { motion } from "framer-motion";
import { AuthScreenSet, type AuthShellProps, type AuthStyles } from "./auth-screen-set";

const BRAND = "Dot Grid";

const styles: AuthStyles = {
  variant: "light", accent: "#10b981",
  inputClass: "w-full rounded-lg border border-slate-200 py-2.5 px-3 text-sm outline-none focus:border-emerald-500",
  labelClass: "mb-1.5 block text-xs font-medium text-slate-600",
  buttonClass: "w-full rounded-lg bg-emerald-500 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600",
  secondaryButtonClass: "rounded-lg border border-slate-200",
  otpClass: "h-14 w-full rounded-lg border border-slate-200 text-center text-xl font-bold outline-none focus:border-emerald-500",
  dividerLineColor: "rgba(15,23,42,0.1)", dividerTextColor: "rgba(15,23,42,0.4)",
  textColor: "#0a0a0a", subTextColor: "rgba(10,10,10,0.6)",
  linkClass: "font-semibold text-emerald-600 hover:underline", hintColor: "rgba(10,10,10,0.4)",
};

function Shell({ title, description, children, footer }: AuthShellProps) {
  return (
    <section className="relative flex min-h-full items-center justify-center py-12" style={{ background: "#ffffff", fontFamily: "var(--font-inter-tight), system-ui, sans-serif", color: "#0a0a0a" }}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.4]" style={{ backgroundImage: "radial-gradient(rgba(16,185,129,0.15) 1px, transparent 1px)", backgroundSize: "24px 24px", maskImage: "radial-gradient(ellipse at center, black, transparent 70%)" }} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10 w-full max-w-xs px-6">
        <div className="mb-6 flex justify-center"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white"><svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M12 2 L22 12 L12 22 L2 12 Z" /></svg></div></div>
        <h1 className="text-center text-2xl font-semibold tracking-tight" style={{ letterSpacing: "-0.03em" }}>{title}</h1>
        <p className="mt-1.5 text-center text-sm text-slate-500">{description}</p>
        <div className="mt-6">{children}</div>
        {footer && <div className="mt-6 text-center text-xs text-slate-500">{footer}</div>}
      </motion.div>
    </section>
  );
}

export function Auth020Card() {
  return <AuthScreenSet brandName={BRAND} Shell={Shell} styles={styles} />;
}
