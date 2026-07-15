"use client";

import { motion } from "framer-motion";
import { AuthScreenSet, type AuthShellProps, type AuthStyles } from "./auth-screen-set";

// ════════════════════════════════════════════════════════════════════════════
// Auth002 — Aurora glassmorphism with 6-screen tab set
// Deep purple-black bg + 3 animated aurora blobs + glass card with backdrop
// blur + fade-up staggered fields + gradient CTA. Inter Tight font.
// ════════════════════════════════════════════════════════════════════════════

const BRAND = "Aurora";

const styles: AuthStyles = {
  inputClass: "w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 px-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-violet-400/50",
  labelClass: "mb-1.5 block text-xs font-medium text-white/60",
  buttonClass: "w-full rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 py-3 text-sm font-semibold text-white",
  secondaryButtonClass: "rounded-xl border border-white/10 bg-white/[0.03]",
  otpClass: "h-14 w-full rounded-xl border border-white/10 bg-white/[0.03] text-center text-xl font-bold text-white outline-none focus:border-violet-400/50",
  dividerLineColor: "rgba(255,255,255,0.1)",
  dividerTextColor: "rgba(255,255,255,0.4)",
  textColor: "#ffffff",
  subTextColor: "rgba(255,255,255,0.6)",
  linkClass: "text-violet-300 hover:text-violet-200",
  hintColor: "rgba(255,255,255,0.4)",
  variant: "dark",
  accent: "#a855f7",
};

function Shell({ title, description, children, footer }: AuthShellProps) {
  return (
    <section
      className="relative flex min-h-full items-center justify-center overflow-hidden py-12"
      style={{ background: "radial-gradient(ellipse at top, #1e1b4b 0%, #0f0a26 50%, #050217 100%)", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}
    >
      <motion.div className="absolute -top-32 left-1/4 h-[400px] w-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(168,85,247,0.3), transparent 60%)", filter: "blur(60px)" }} animate={{ x: [0, 80, 0], y: [0, 60, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(6,182,212,0.25), transparent 60%)", filter: "blur(70px)" }} animate={{ x: [0, -60, 0], y: [0, -40, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.05] p-8 backdrop-blur-2xl" style={{ boxShadow: "0 20px 60px -15px rgba(168,85,247,0.3)" }}>
        <div className="mb-6 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 text-white"><svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M12 2 L22 12 L12 22 L2 12 Z" /></svg></div>
          <span className="text-lg font-bold text-white">{BRAND}</span>
        </div>
        <h1 className="text-3xl font-bold text-white" style={{ letterSpacing: "-0.03em" }}>{title}</h1>
        <p className="mt-2 text-sm text-white/60">{description}</p>
        <div className="mt-6">{children}</div>
        {footer && <div className="mt-6 text-center text-sm">{footer}</div>}
      </motion.div>
    </section>
  );
}

export function Auth002Card() {
  return <AuthScreenSet brandName={BRAND} Shell={Shell} styles={styles} />;
}
