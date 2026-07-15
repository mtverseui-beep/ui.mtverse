"use client";

import { motion } from "framer-motion";
import { AuthScreenSet, type AuthShellProps, type AuthStyles } from "./auth-screen-set";

const BRAND = "Maison";

const styles: AuthStyles = {
  variant: "dark", accent: "#d4af37",
  inputClass: "w-full border-b border-amber-100/20 bg-transparent py-2.5 px-1 text-sm text-amber-50 placeholder:text-amber-100/30 outline-none focus:border-amber-400",
  labelClass: "mb-1.5 block text-[10px] uppercase tracking-[0.3em] text-amber-300/60",
  buttonClass: "w-full border border-amber-400/40 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-200 hover:text-black",
  secondaryButtonClass: "border border-amber-400/30 bg-transparent",
  otpClass: "h-14 w-full border-b-2 border-amber-100/20 bg-transparent text-center text-xl font-bold text-amber-50 outline-none focus:border-amber-400",
  dividerLineColor: "rgba(196,163,90,0.15)", dividerTextColor: "rgba(229,226,217,0.4)",
  textColor: "#e5e2d9", subTextColor: "rgba(229,226,217,0.5)",
  linkClass: "text-amber-200 hover:text-amber-100", hintColor: "rgba(229,226,217,0.3)",
};

function Shell({ title, description, children, footer }: AuthShellProps) {
  return (
    <section className="relative flex min-h-full items-center justify-center py-12" style={{ background: "#000000", fontFamily: "var(--font-cormorant), Georgia, serif", color: "#e5e2d9" }}>
      <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(196,163,90,0.12), transparent 70%)" }} />
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(196,163,90,0.5), transparent)" }} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 w-full max-w-sm px-6 text-center">
        <div className="mb-4 flex justify-center">
          <svg viewBox="0 0 80 80" className="h-14 w-14"><defs><linearGradient id="auth006-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#f4e5b1" /><stop offset="50%" stopColor="#d4af37" /><stop offset="100%" stopColor="#c4a35a" /></linearGradient></defs><circle cx="40" cy="40" r="38" fill="none" stroke="url(#auth006-g)" strokeWidth="1" opacity="0.4" /><path d="M22 50 L22 30 L40 46 L58 30 L58 50" fill="none" stroke="url(#auth006-g)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <p className="text-[10px] uppercase tracking-[0.5em] text-amber-300/60" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{BRAND} · Private Access</p>
        <h1 className="mt-3 text-4xl font-medium tracking-[0.05em]" style={{ fontStyle: "italic", backgroundImage: "linear-gradient(135deg, #d4af37, #f4e5b1, #c4a35a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{title}</h1>
        <p className="mt-2 text-sm italic text-amber-100/50">{description}</p>
        <div className="mt-6 text-left" style={{ fontFamily: "var(--font-inter-tight), sans-serif" }}>{children}</div>
        {footer && <div className="mt-6 text-center text-xs italic text-amber-100/40" style={{ fontFamily: "var(--font-fraunces), serif" }}>{footer}</div>}
      </motion.div>
    </section>
  );
}

export function Auth006Card() {
  return <AuthScreenSet brandName={BRAND} Shell={Shell} styles={styles} />;
}
