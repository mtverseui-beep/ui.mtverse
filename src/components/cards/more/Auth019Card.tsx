"use client";

import { motion } from "framer-motion";
import { AuthScreenSet, type AuthShellProps, type AuthStyles } from "./auth-screen-set";

const BRAND = "Cipher";

const styles: AuthStyles = {
  variant: "dark", accent: "#06b6d4",
  inputClass: "w-full rounded-xl border border-white/10 bg-white/[0.05] py-2.5 px-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-cyan-400/50",
  labelClass: "mb-1.5 block text-xs font-medium text-white/60",
  buttonClass: "w-full rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 py-3 text-sm font-semibold text-white",
  secondaryButtonClass: "rounded-xl border border-white/10 bg-white/[0.05]",
  otpClass: "h-14 w-full rounded-xl border border-white/10 bg-white/[0.05] text-center text-xl font-bold text-white outline-none focus:border-cyan-400/50",
  dividerLineColor: "rgba(255,255,255,0.1)", dividerTextColor: "rgba(255,255,255,0.4)",
  textColor: "#ffffff", subTextColor: "rgba(255,255,255,0.6)",
  linkClass: "font-semibold text-cyan-300 hover:text-cyan-200", hintColor: "rgba(255,255,255,0.4)",
};

function Shell({ title, description, children, footer }: AuthShellProps) {
  return (
    <section className="relative flex min-h-full items-center justify-center py-12" style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}>
      { }
      <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=80" alt="Tech" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/70 to-indigo-900/80" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.08] p-8 backdrop-blur-2xl" style={{ boxShadow: "0 20px 60px -15px rgba(0,0,0,0.5)" }}>
        <div className="mb-6 flex items-center gap-2.5"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white"><svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M12 2 L22 12 L12 22 L2 12 Z" /></svg></div><span className="text-lg font-bold text-white">{BRAND}</span></div>
        <h1 className="text-3xl font-bold text-white" style={{ letterSpacing: "-0.03em" }}>{title}</h1>
        <p className="mt-2 text-sm text-white/60">{description}</p>
        <div className="mt-6">{children}</div>
        {footer && <div className="mt-6 text-center text-xs text-white/50">{footer}</div>}
      </motion.div>
    </section>
  );
}

export function Auth019Card() {
  return <AuthScreenSet brandName={BRAND} Shell={Shell} styles={styles} />;
}
