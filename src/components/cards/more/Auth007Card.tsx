"use client";

import { motion } from "framer-motion";
import { AuthScreenSet, type AuthShellProps, type AuthStyles } from "./auth-screen-set";

const BRAND = "Soft";

const styles: AuthStyles = {
  variant: "light", accent: "#6366f1",
  inputClass: "w-full rounded-xl py-3 px-3 text-sm outline-none",
  labelClass: "mb-1.5 block text-xs font-medium text-slate-600",
  buttonClass: "w-full rounded-xl py-3 text-sm font-semibold text-white",
  secondaryButtonClass: "rounded-xl",
  otpClass: "h-14 w-full rounded-xl text-center text-xl font-bold outline-none",
  dividerLineColor: "#d1d5db", dividerTextColor: "#94a3b8",
  textColor: "#3b3f51", subTextColor: "#64748b",
  linkClass: "font-semibold text-indigo-600 hover:underline", hintColor: "#94a3b8",
};

function Shell({ title, description, children, footer }: AuthShellProps) {
  return (
    <section className="flex min-h-full items-center justify-center py-12" style={{ background: "#e6e7ee", fontFamily: "var(--font-manrope), system-ui, sans-serif", color: "#3b3f51" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} whileHover={{ y: -4 }} className="w-full max-w-md rounded-3xl p-8" style={{ background: "#e6e7ee", boxShadow: "14px 14px 28px #c5c6cc, -14px -14px 28px #ffffff" }}>
        <div className="mb-6 flex items-center gap-2.5"><div className="flex h-10 w-10 items-center justify-center rounded-2xl" style={{ background: "#e6e7ee", boxShadow: "inset 4px 4px 8px #c5c6cc, inset -4px -4px 8px #ffffff", color: "#6366f1" }}><svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M12 2 L22 12 L12 22 L2 12 Z" /></svg></div><span className="text-lg font-bold">{BRAND}</span></div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ letterSpacing: "-0.02em" }}>{title}</h1>
        <p className="mt-1.5 text-sm text-slate-500">{description}</p>
        <div className="mt-6 [&_input]:rounded-xl [&_input]:py-3 [&_input]:px-3 [&_input]:text-sm [&_input]:outline-none" style={{ ["--neu-shadow" as never]: "inset 4px 4px 8px #c5c6cc, inset -4px -4px 8px #ffffff" }}>{children}</div>
        {footer && <div className="mt-6 text-center text-xs text-slate-500">{footer}</div>}
      </motion.div>
    </section>
  );
}

export function Auth007Card() {
  return <AuthScreenSet brandName={BRAND} Shell={Shell} styles={styles} />;
}
