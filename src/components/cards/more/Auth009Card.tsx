"use client";

import { motion } from "framer-motion";
import { AuthScreenSet, type AuthShellProps, type AuthStyles } from "./auth-screen-set";

const BRAND = "devkit";

const styles: AuthStyles = {
  variant: "dark", accent: "#22c55e",
  inputClass: "w-full border border-emerald-500/30 bg-black/50 py-2.5 px-3 text-sm text-emerald-400 placeholder:text-emerald-500/30 outline-none focus:border-emerald-400",
  labelClass: "mb-1.5 block text-[10px] uppercase tracking-widest text-emerald-500/60",
  buttonClass: "w-full rounded bg-emerald-500 py-3 text-sm font-bold text-black hover:bg-emerald-400",
  secondaryButtonClass: "rounded border border-emerald-500/30 bg-transparent",
  otpClass: "h-14 w-full border border-emerald-500/30 bg-black/50 text-center text-xl font-bold text-emerald-400 outline-none focus:border-emerald-400",
  dividerLineColor: "rgba(34,197,94,0.15)", dividerTextColor: "rgba(34,197,94,0.4)",
  textColor: "#22c55e", subTextColor: "rgba(34,197,94,0.6)",
  linkClass: "text-emerald-400 hover:text-emerald-300", hintColor: "rgba(34,197,94,0.4)",
};

function Shell({ title, description, children, footer }: AuthShellProps) {
  return (
    <section className="relative flex min-h-full items-center justify-center py-12" style={{ background: "#000000", fontFamily: "var(--font-jetbrains), ui-monospace, monospace", color: "#22c55e" }}>
      <div className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34,197,94,0.04) 2px, rgba(34,197,94,0.04) 3px)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(34,197,94,0.08), transparent 60%)" }} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10 w-full max-w-md rounded-lg border border-emerald-500/30 bg-black/60 p-8" style={{ boxShadow: "0 0 40px -5px rgba(34,197,94,0.2)" }}>
        <div className="mb-4 flex items-center gap-2 border-b border-emerald-500/20 pb-3"><span className="h-3 w-3 rounded-full bg-rose-500/80" /><span className="h-3 w-3 rounded-full bg-amber-500/80" /><span className="h-3 w-3 rounded-full bg-emerald-500/80" /><span className="ml-2 text-[10px] text-emerald-500/60">devkit — auth — 80x24</span></div>
        <p className="text-[10px] text-emerald-500/60 mb-2"><span className="text-emerald-400">✓</span> devkit v4.1.0 · secure shell · encrypted</p>
        <h1 className="text-2xl font-bold text-emerald-400" style={{ textShadow: "0 0 15px rgba(34,197,94,0.4)" }}>{title}</h1>
        <p className="mt-2 text-xs text-emerald-500/60">{description}</p>
        <div className="mt-6 [&_label]:text-[10px] [&_label]:uppercase [&_label]:tracking-widest [&_label]:text-emerald-500/60">{children}</div>
        {footer && <div className="mt-6 text-center text-[10px] text-emerald-500/60">{footer}</div>}
      </motion.div>
    </section>
  );
}

export function Auth009Card() {
  return <AuthScreenSet brandName={BRAND} Shell={Shell} styles={styles} />;
}
