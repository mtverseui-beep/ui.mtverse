"use client";

import { motion } from "framer-motion";
import { AuthScreenSet, type AuthShellProps, type AuthStyles } from "./auth-screen-set";

const BRAND = "Bento";

const styles: AuthStyles = {
  variant: "light", accent: "#8b5cf6",
  inputClass: "w-full rounded-lg border border-slate-200 py-2.5 px-3 text-sm outline-none focus:border-violet-500",
  labelClass: "mb-1.5 block text-xs font-medium text-slate-600",
  buttonClass: "w-full rounded-lg bg-violet-600 py-3 text-sm font-semibold text-white hover:bg-violet-700",
  secondaryButtonClass: "rounded-lg border border-slate-200",
  otpClass: "h-14 w-full rounded-lg border border-slate-200 text-center text-xl font-bold outline-none focus:border-violet-500",
  dividerLineColor: "rgba(15,23,42,0.1)", dividerTextColor: "rgba(15,23,42,0.4)",
  textColor: "#0f172a", subTextColor: "rgba(15,23,42,0.6)",
  linkClass: "font-semibold text-violet-600 hover:underline", hintColor: "rgba(15,23,42,0.4)",
};

function Shell({ title, description, children, footer }: AuthShellProps) {
  return (
    <section className="flex min-h-full" style={{ background: "#f8fafc", fontFamily: "var(--font-manrope), system-ui, sans-serif", color: "#0f172a" }}>
      <div className="hidden w-1/2 items-center justify-center p-8 lg:flex">
        <div className="grid w-full max-w-md grid-cols-2 gap-3">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="col-span-2 rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-5"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white"><svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M12 2 L22 12 L12 22 L2 12 Z" /></svg></div><p className="mt-3 text-lg font-bold tracking-tight">AI-powered insights</p><p className="mt-1 text-sm text-slate-600">Get instant analytics and recommendations.</p></motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white"><svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M12 2 L22 12 L12 22 L2 12 Z" /></svg></div><p className="mt-2 text-sm font-bold">SOC 2 Type II</p><p className="text-xs text-slate-600">Enterprise security</p></motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl border border-amber-200 bg-amber-50 p-5"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-white"><svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M13 2 L3 14 H11 L9 22 L21 10 H13 L13 2Z" /></svg></div><p className="mt-2 text-sm font-bold">1-click deploy</p><p className="text-xs text-slate-600">Ship in seconds</p></motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="col-span-2 flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white"><svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M3 17 L9 11 L13 15 L21 7" stroke="white" strokeWidth="2" fill="none" /></svg></div><div><p className="text-sm font-bold">12,400+ teams</p><p className="text-xs text-slate-600">Trust {BRAND} to ship faster</p></div></motion.div>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center px-6 py-12 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-sm">
          <div className="mb-6 flex items-center gap-2.5"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white"><svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M12 2 L22 12 L12 22 L2 12 Z" /></svg></div><span className="text-lg font-bold tracking-tight">{BRAND}</span></div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ letterSpacing: "-0.03em" }}>{title}</h1>
          <p className="mt-2 text-sm text-slate-500">{description}</p>
          <div className="mt-6">{children}</div>
          {footer && <div className="mt-6 text-center text-xs text-slate-500">{footer}</div>}
        </motion.div>
      </div>
    </section>
  );
}

export function Auth016Card() {
  return <AuthScreenSet brandName={BRAND} Shell={Shell} styles={styles} />;
}
