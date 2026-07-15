"use client";

import { motion } from "framer-motion";
import { AuthScreenSet, type AuthShellProps, type AuthStyles } from "./auth-screen-set";

const BRAND = "Playform";

const styles: AuthStyles = {
  variant: "light", accent: "#d946ef",
  inputClass: "w-full rounded-xl border border-slate-200 py-3 px-3 text-sm outline-none focus:border-fuchsia-500",
  labelClass: "mb-1.5 block text-xs font-medium text-slate-600",
  buttonClass: "w-full rounded-xl bg-gradient-to-r from-fuchsia-500 to-blue-500 py-3 text-sm font-semibold text-white",
  secondaryButtonClass: "rounded-xl border border-slate-200",
  otpClass: "h-14 w-full rounded-xl border border-slate-200 text-center text-xl font-bold outline-none focus:border-fuchsia-500",
  dividerLineColor: "rgba(15,23,42,0.1)", dividerTextColor: "rgba(15,23,42,0.4)",
  textColor: "#0a0a0a", subTextColor: "rgba(10,10,10,0.6)",
  linkClass: "font-semibold text-fuchsia-600 hover:underline", hintColor: "rgba(10,10,10,0.4)",
};

function Shell({ title, description, children, footer }: AuthShellProps) {
  return (
    <section className="flex min-h-full" style={{ background: "#fafafa", fontFamily: "var(--font-manrope), system-ui, sans-serif", color: "#0a0a0a" }}>
      <div className="relative hidden w-1/2 items-center justify-center overflow-hidden lg:flex" style={{ background: "linear-gradient(135deg, #f0abfc 0%, #c4b5fd 50%, #93c5fd 100%)" }}>
        <motion.div className="absolute left-1/4 top-1/4 h-24 w-24 rounded-2xl bg-white/40 backdrop-blur-sm" animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute right-1/4 top-1/3 h-32 w-32 rounded-full bg-white/30 backdrop-blur-sm" animate={{ y: [0, 30, 0], x: [0, -15, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-1/4 left-1/3 h-20 w-20 rotate-45 bg-white/40 backdrop-blur-sm" animate={{ y: [0, -15, 0], rotate: [45, 60, 45] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 px-12 text-center text-white">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-white/30 backdrop-blur-md"><svg viewBox="0 0 24 24" className="h-8 w-8 fill-white"><path d="M12 2 L22 12 L12 22 L2 12 Z" /></svg></div>
          <h2 className="text-3xl font-bold tracking-tight" style={{ letterSpacing: "-0.02em" }}>Welcome to your<br />creative space.</h2>
          <p className="mt-3 text-base text-white/80">Where ideas take shape.</p>
        </motion.div>
      </div>
      <div className="flex flex-1 items-center justify-center px-6 py-12 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-sm">
          <div className="mb-6 flex items-center gap-2.5"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-400 to-blue-400 text-white"><svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M12 2 L22 12 L12 22 L2 12 Z" /></svg></div><span className="text-lg font-bold">{BRAND}</span></div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ letterSpacing: "-0.03em" }}>{title}</h1>
          <p className="mt-2 text-sm text-slate-500">{description}</p>
          <div className="mt-6">{children}</div>
          {footer && <div className="mt-6 text-center text-xs text-slate-500">{footer}</div>}
        </motion.div>
      </div>
    </section>
  );
}

export function Auth018Card() {
  return <AuthScreenSet brandName={BRAND} Shell={Shell} styles={styles} />;
}
