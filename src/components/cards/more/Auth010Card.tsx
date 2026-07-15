"use client";

import { motion } from "framer-motion";
import { AuthScreenSet, type AuthShellProps, type AuthStyles } from "./auth-screen-set";

const BRAND = "NEXUS";

const styles: AuthStyles = {
  variant: "dark", accent: "#ec4899",
  inputClass: "w-full rounded border bg-black/50 py-2.5 px-3 text-sm text-cyan-300 placeholder:text-cyan-500/30 outline-none focus:border-cyan-400",
  labelClass: "mb-1.5 block text-[10px] uppercase tracking-widest text-cyan-400/70",
  buttonClass: "w-full rounded py-3 text-sm font-bold uppercase tracking-widest text-black",
  secondaryButtonClass: "rounded border border-white/10 bg-transparent",
  otpClass: "h-14 w-full rounded border bg-black/50 text-center text-xl font-bold text-cyan-300 outline-none focus:border-cyan-400",
  dividerLineColor: "rgba(236,72,153,0.15)", dividerTextColor: "rgba(6,182,212,0.4)",
  textColor: "#ffffff", subTextColor: "rgba(6,182,212,0.6)",
  linkClass: "text-cyan-400 hover:text-cyan-300", hintColor: "rgba(6,182,212,0.4)",
};

function Shell({ title, description, children, footer }: AuthShellProps) {
  return (
    <section className="relative flex min-h-full items-center justify-center overflow-hidden py-12" style={{ background: "#0a0014", fontFamily: "var(--font-jetbrains), ui-monospace, monospace" }}>
      <div className="absolute bottom-0 left-1/2 h-1/2 w-full -translate-x-1/2 opacity-30 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(236,72,153,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.4) 1px, transparent 1px)", backgroundSize: "60px 60px", transform: "perspective(500px) rotateX(60deg)", transformOrigin: "bottom center", maskImage: "linear-gradient(to top, black, transparent)" }} />
      <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(236,72,153,0.05) 2px, rgba(236,72,153,0.05) 3px)" }} />
      <div className="absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(236,72,153,0.2), transparent 70%)" }} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10 w-full max-w-md rounded-lg border bg-black/60 p-8 backdrop-blur-sm" style={{ borderColor: "rgba(236,72,153,0.4)", boxShadow: "0 0 40px -5px rgba(236,72,153,0.4)" }}>
        <div className="mb-4 flex items-center gap-2"><div className="flex h-9 w-9 items-center justify-center rounded border" style={{ borderColor: "#ec4899", boxShadow: "0 0 15px rgba(236,72,153,0.5)" }}><svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" style={{ color: "#ec4899" }}><path d="M12 2 L22 12 L12 22 L2 12 Z" /></svg></div><span className="text-lg font-bold tracking-widest text-pink-400" style={{ textShadow: "0 0 10px rgba(236,72,153,0.5)" }}>{BRAND}</span></div>
        <p className="text-[10px] uppercase tracking-[0.4em] text-pink-400/70">{`// ${title.toLowerCase().replace(/\s/g, "_")}`}</p>
        <h1 className="mt-2 text-2xl font-bold text-white" style={{ textShadow: "0 0 15px rgba(255,255,255,0.3)" }}>{title}</h1>
        <p className="mt-2 text-xs text-cyan-300/60">{description}</p>
        <div className="mt-6 [&_label]:text-[10px] [&_label]:uppercase [&_label]:tracking-widest [&_label]:text-cyan-400/70">{children}</div>
        {footer && <div className="mt-6 text-center text-[10px] text-cyan-300/60">{footer}</div>}
      </motion.div>
    </section>
  );
}

export function Auth010Card() {
  return <AuthScreenSet brandName={BRAND} Shell={Shell} styles={styles} />;
}
