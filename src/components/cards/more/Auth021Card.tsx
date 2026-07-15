"use client";

import { motion } from "framer-motion";
import { AuthScreenSet, type AuthShellProps, type AuthStyles } from "./auth-screen-set";

const BRAND = "Launch";

const styles: AuthStyles = {
  variant: "light", accent: "#f97316",
  inputClass: "w-full rounded-lg border border-slate-200 bg-white py-2.5 px-3 text-sm outline-none focus:border-orange-500",
  labelClass: "mb-1.5 block text-xs font-medium text-slate-700",
  buttonClass: "w-full rounded-lg bg-gradient-to-r from-orange-500 to-rose-500 py-3 text-sm font-semibold text-white",
  secondaryButtonClass: "rounded-lg border border-slate-200 bg-white",
  otpClass: "h-14 w-full rounded-lg border border-slate-200 bg-white text-center text-xl font-bold outline-none focus:border-orange-500",
  dividerLineColor: "rgba(15,23,42,0.1)", dividerTextColor: "rgba(15,23,42,0.4)",
  textColor: "#0f172a", subTextColor: "rgba(15,23,42,0.6)",
  linkClass: "font-semibold text-orange-600 hover:underline", hintColor: "rgba(15,23,42,0.4)",
};

function Shell({ title, description, children, footer }: AuthShellProps) {
  return (
    <section className="relative flex min-h-full items-center justify-center overflow-hidden py-12" style={{ background: "linear-gradient(135deg, #fff7ed 0%, #fef3c7 25%, #fed7aa 50%, #fecaca 75%, #fbcfe8 100%)", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <motion.div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(249,115,22,0.3), transparent 70%)", filter: "blur(50px)" }} animate={{ x: [0, 60, 0], y: [0, -40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(236,72,153,0.25), transparent 70%)", filter: "blur(60px)" }} animate={{ x: [0, -50, 0], y: [0, 40, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10 w-full max-w-md rounded-3xl border border-white/60 bg-white/70 p-8 backdrop-blur-2xl" style={{ boxShadow: "0 20px 60px -15px rgba(249,115,22,0.25)" }}>
        <div className="mb-6 flex items-center gap-2.5"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 text-white"><svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M12 2 L22 12 L12 22 L2 12 Z" /></svg></div><span className="text-lg font-bold tracking-tight text-slate-900">{BRAND}</span></div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900" style={{ letterSpacing: "-0.03em" }}>{title}</h1>
        <p className="mt-2 text-sm text-slate-600">{description}</p>
        <div className="mt-6">{children}</div>
        {footer && <div className="mt-6 text-center text-xs text-slate-600">{footer}</div>}
      </motion.div>
    </section>
  );
}

export function Auth021Card() {
  return <AuthScreenSet brandName={BRAND} Shell={Shell} styles={styles} />;
}
