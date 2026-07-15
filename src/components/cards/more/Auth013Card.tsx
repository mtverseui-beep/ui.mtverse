"use client";

import { motion } from "framer-motion";
import { AuthScreenSet, type AuthShellProps, type AuthStyles } from "./auth-screen-set";

const BRAND = "Origami";

const styles: AuthStyles = {
  variant: "light", accent: "#ec4899",
  inputClass: "w-full rounded-xl border border-stone-200 py-2.5 px-3 text-sm outline-none focus:border-pink-500",
  labelClass: "mb-1.5 block text-xs font-medium text-stone-600",
  buttonClass: "w-full rounded-xl bg-pink-500 py-3 text-sm font-semibold text-white hover:bg-pink-600",
  secondaryButtonClass: "rounded-xl border border-stone-200",
  otpClass: "h-14 w-full rounded-xl border border-stone-200 text-center text-xl font-bold outline-none focus:border-pink-500",
  dividerLineColor: "rgba(28,25,23,0.1)", dividerTextColor: "rgba(28,25,23,0.4)",
  textColor: "#1c1917", subTextColor: "rgba(28,25,23,0.6)",
  linkClass: "font-semibold text-pink-600 hover:underline", hintColor: "rgba(28,25,23,0.4)",
};

function Shell({ title, description, children, footer }: AuthShellProps) {
  return (
    <section className="flex min-h-full items-center justify-center py-12" style={{ background: "linear-gradient(180deg, #fdf6e3 0%, #fef9c3 100%)", fontFamily: "var(--font-space-grotesk), system-ui, sans-serif", color: "#1c1917" }}>
      <motion.div initial={{ opacity: 0, rotateY: -15 }} animate={{ opacity: 1, rotateY: 0 }} transition={{ duration: 0.6 }} whileHover={{ rotateY: 5, rotateX: -2, y: -4 }} className="relative w-full max-w-md" style={{ perspective: "1500px", transformStyle: "preserve-3d" }}>
        <div className="absolute right-0 top-0 h-16 w-16 origin-top-right transition-transform duration-500" style={{ background: "linear-gradient(225deg, rgba(236,72,153,0.25), transparent)", clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />
        <div className="relative overflow-hidden rounded-2xl border-2 border-stone-900/10 bg-white p-8" style={{ boxShadow: "8px 8px 0 0 rgba(236,72,153,0.2), 16px 16px 32px rgba(0,0,0,0.08)" }}>
          <div className="absolute -left-10 -top-10 h-20 w-20 rotate-45 opacity-10 bg-pink-500" />
          <div className="mb-6 flex items-center gap-2.5"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink-500 text-white"><svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M12 2 L22 12 L12 22 L2 12 Z" /></svg></div><span className="text-lg font-bold tracking-tight">{BRAND}</span></div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ letterSpacing: "-0.03em" }}>{title}</h1>
          <p className="mt-2 text-sm text-stone-600">{description}</p>
          <div className="mt-6">{children}</div>
          {footer && <div className="mt-6 text-center text-xs text-stone-600">{footer}</div>}
        </div>
      </motion.div>
    </section>
  );
}

export function Auth013Card() {
  return <AuthScreenSet brandName={BRAND} Shell={Shell} styles={styles} />;
}
