"use client";

import { motion } from "framer-motion";
import { AuthScreenSet, type AuthShellProps, type AuthStyles } from "./auth-screen-set";

const BRAND = "Hologram";

const styles: AuthStyles = {
  variant: "dark", accent: "#8338ec",
  inputClass: "w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 px-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/30",
  labelClass: "mb-1.5 block text-xs font-medium text-white/60",
  buttonClass: "w-full rounded-xl py-3 text-sm font-bold text-black",
  secondaryButtonClass: "rounded-xl border border-white/10 bg-white/[0.03]",
  otpClass: "h-14 w-full rounded-xl border border-white/10 bg-white/[0.03] text-center text-xl font-bold text-white outline-none focus:border-white/30",
  dividerLineColor: "rgba(255,255,255,0.1)", dividerTextColor: "rgba(255,255,255,0.4)",
  textColor: "#ffffff", subTextColor: "rgba(255,255,255,0.6)",
  linkClass: "font-semibold text-white hover:underline", hintColor: "rgba(255,255,255,0.4)",
};

function Shell({ title, description, children, footer }: AuthShellProps) {
  return (
    <section className="relative flex min-h-full items-center justify-center py-12" style={{ background: "#0a0a0f", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative w-full max-w-md rounded-2xl p-px" style={{ background: "linear-gradient(135deg, #ff006e, #8338ec, #3a86ff, #06ffa5)", backgroundSize: "200% 200%", animation: "holo-auth-shift 6s ease infinite" }}>
        <div className="relative rounded-2xl p-8" style={{ background: "rgba(10,10,15,0.92)", backdropFilter: "blur(20px)" }}>
          <div className="mb-6 flex items-center gap-2.5"><div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: "linear-gradient(135deg, #ff006e, #8338ec, #3a86ff, #06ffa5)", backgroundSize: "200% 200%", animation: "holo-auth-shift 4s ease infinite" }}><svg viewBox="0 0 24 24" className="h-5 w-5 fill-white"><path d="M12 2 L22 12 L12 22 L2 12 Z" /></svg></div><span className="text-lg font-bold text-white" style={{ background: "linear-gradient(135deg, #ff006e, #8338ec, #3a86ff, #06ffa5)", backgroundSize: "200% 200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "holo-auth-shift 4s ease infinite" }}>{BRAND}</span></div>
          <h1 className="text-3xl font-bold text-white" style={{ letterSpacing: "-0.03em" }}>{title}</h1>
          <p className="mt-2 text-sm text-white/60">{description}</p>
          <div className="mt-6">{children}</div>
          {footer && <div className="mt-6 text-center text-xs text-white/50">{footer}</div>}
        </div>
      </motion.div>
      <style>{`@keyframes holo-auth-shift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }`}</style>
    </section>
  );
}

export function Auth008Card() {
  return <AuthScreenSet brandName={BRAND} Shell={Shell} styles={styles} />;
}
