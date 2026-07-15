"use client";

import { motion } from "framer-motion";
import { AuthScreenSet, type AuthShellProps, type AuthStyles } from "./auth-screen-set";

const BRAND = "Polaris";

const styles: AuthStyles = {
  variant: "light", accent: "#6366f1",
  inputClass: "w-full rounded-lg border border-slate-200 py-2.5 px-3 text-sm outline-none focus:border-indigo-500",
  labelClass: "mb-1.5 block text-xs font-medium text-slate-600",
  buttonClass: "w-full rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-sm font-semibold text-white",
  secondaryButtonClass: "rounded-lg border border-slate-200",
  otpClass: "h-14 w-full rounded-lg border border-slate-200 text-center text-xl font-bold outline-none focus:border-indigo-500",
  dividerLineColor: "rgba(15,23,42,0.1)", dividerTextColor: "rgba(15,23,42,0.4)",
  textColor: "#0f172a", subTextColor: "rgba(15,23,42,0.6)",
  linkClass: "font-semibold text-indigo-600 hover:underline", hintColor: "rgba(15,23,42,0.4)",
};

function Shell({ title, description, children, footer }: AuthShellProps) {
  return (
    <section className="relative flex min-h-full items-center justify-center py-12" style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #6366f1 100%)", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <svg className="absolute inset-0 h-full w-full opacity-30" preserveAspectRatio="none" viewBox="0 0 1440 800"><defs><linearGradient id="aurora-g1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#a855f7" stopOpacity="0" /><stop offset="50%" stopColor="#a855f7" stopOpacity="0.5" /><stop offset="100%" stopColor="#a855f7" stopOpacity="0" /></linearGradient></defs>{[0,1,2,3].map(i => <motion.path key={i} d={`M -200 ${200+i*150} C 300 ${100+i*150}, 700 ${300+i*150}, 1100 ${150+i*150} S 1700 ${250+i*150}, 1900 ${200+i*150}`} fill="none" stroke="url(#aurora-g1)" strokeWidth="2" animate={{ d: [`M -200 ${200+i*150} C 300 ${100+i*150}, 700 ${300+i*150}, 1100 ${150+i*150} S 1700 ${250+i*150}, 1900 ${200+i*150}`, `M -200 ${250+i*150} C 300 ${150+i*150}, 700 ${250+i*150}, 1100 ${200+i*150} S 1700 ${300+i*150}, 1900 ${250+i*150}`, `M -200 ${200+i*150} C 300 ${100+i*150}, 700 ${300+i*150}, 1100 ${150+i*150} S 1700 ${250+i*150}, 1900 ${200+i*150}`]}} transition={{ duration: 8+i*2, repeat: Infinity, ease: "easeInOut" }} />)}</svg>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10 w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-6 flex items-center gap-2.5"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white"><svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M12 2 L22 12 L12 22 L2 12 Z" /></svg></div><span className="text-lg font-bold tracking-tight text-slate-900">{BRAND}</span></div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900" style={{ letterSpacing: "-0.03em" }}>{title}</h1>
        <p className="mt-2 text-sm text-slate-500">{description}</p>
        <div className="mt-6">{children}</div>
        {footer && <div className="mt-6 text-center text-xs text-slate-500">{footer}</div>}
      </motion.div>
    </section>
  );
}

export function Auth017Card() {
  return <AuthScreenSet brandName={BRAND} Shell={Shell} styles={styles} />;
}
