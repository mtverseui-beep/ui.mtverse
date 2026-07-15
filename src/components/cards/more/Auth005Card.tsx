"use client";

import { motion } from "framer-motion";
import { AuthScreenSet, type AuthShellProps, type AuthStyles } from "./auth-screen-set";

const BRAND = "Flux Labs";

const styles: AuthStyles = {
  variant: "light", accent: "#0a0a0a",
  inputClass: "w-full rounded-lg border border-slate-200 py-2.5 px-3 text-sm outline-none focus:border-slate-900",
  labelClass: "mb-1.5 block text-xs font-medium text-slate-600",
  buttonClass: "w-full rounded-lg bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-slate-800",
  secondaryButtonClass: "rounded-lg border border-slate-200",
  otpClass: "h-14 w-full rounded-lg border border-slate-200 text-center text-xl font-bold outline-none focus:border-slate-900",
  dividerLineColor: "rgba(0,0,0,0.15)", dividerTextColor: "rgba(0,0,0,0.4)",
  textColor: "#0a0a0a", subTextColor: "rgba(10,10,10,0.6)",
  linkClass: "font-semibold text-slate-900 hover:underline", hintColor: "rgba(10,10,10,0.4)",
};

function Shell({ title, description, children, footer }: AuthShellProps) {
  return (
    <section className="flex min-h-full" style={{ background: "#ffffff", fontFamily: "var(--font-manrope), system-ui, sans-serif", color: "#0a0a0a" }}>
      <div className="relative hidden w-1/2 lg:block">
        { }
        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" alt="Team" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <div className="flex items-center gap-2 text-white"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md"><svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M12 2 L22 12 L12 22 L2 12 Z" /></svg></div><span className="text-lg font-bold">{BRAND}</span></div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="max-w-md">
            <p className="text-2xl font-medium leading-snug text-white" style={{ letterSpacing: "-0.02em" }}>"Flux Labs transformed how our team collaborates. We ship 3x faster now."</p>
            <div className="mt-6 flex items-center gap-3"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80" alt="" className="h-10 w-10 rounded-full object-cover" /><div><p className="text-sm font-semibold text-white">Sarah Chen</p><p className="text-xs text-white/60">VP Engineering, Acme</p></div></div>
          </motion.div>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center px-6 py-12 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-sm">
          <h1 className="text-3xl font-bold tracking-tight" style={{ letterSpacing: "-0.03em" }}>{title}</h1>
          <p className="mt-2 text-sm text-slate-500">{description}</p>
          <div className="mt-6">{children}</div>
          {footer && <div className="mt-6 text-center text-sm text-slate-500">{footer}</div>}
        </motion.div>
      </div>
    </section>
  );
}

export function Auth005Card() {
  return <AuthScreenSet brandName={BRAND} Shell={Shell} styles={styles} />;
}
