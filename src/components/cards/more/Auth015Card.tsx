"use client";

import { motion } from "framer-motion";
import { AuthScreenSet, type AuthShellProps, type AuthStyles } from "./auth-screen-set";

const BRAND = "Payflow";

const styles: AuthStyles = {
  variant: "light", accent: "#635bff",
  inputClass: "w-full rounded-lg border border-slate-200 py-3 px-3 text-sm outline-none focus:border-indigo-500",
  labelClass: "mb-1.5 block text-xs font-medium text-slate-600",
  buttonClass: "w-full rounded-lg py-3 text-sm font-semibold text-white",
  secondaryButtonClass: "rounded-lg border border-slate-200",
  otpClass: "h-14 w-full rounded-lg border border-slate-200 text-center text-xl font-bold outline-none focus:border-indigo-500",
  dividerLineColor: "rgba(0,0,0,0.1)", dividerTextColor: "rgba(0,0,0,0.4)",
  textColor: "#0a2540", subTextColor: "rgba(10,37,64,0.6)",
  linkClass: "font-semibold text-indigo-600 hover:underline", hintColor: "rgba(10,37,64,0.4)",
};

function Shell({ title, description, children, footer }: AuthShellProps) {
  return (
    <section className="flex min-h-full items-center justify-center py-12" style={{ background: "#ffffff", fontFamily: "var(--font-inter-tight), system-ui, sans-serif", color: "#0a2540" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-sm px-6">
        <div className="mb-6 flex items-center gap-2.5"><div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: "linear-gradient(135deg, #635bff, #00d4ff)" }}><svg viewBox="0 0 24 24" className="h-5 w-5 fill-white"><path d="M12 2 L22 12 L12 22 L2 12 Z" /></svg></div><span className="text-lg font-bold tracking-tight">{BRAND}</span></div>
        <h1 className="text-3xl font-semibold tracking-tight" style={{ letterSpacing: "-0.03em" }}>{title}</h1>
        <p className="mt-2 text-sm text-slate-500">{description}</p>
        <div className="mt-6">{children}</div>
        {footer && <div className="mt-6 text-center text-xs text-slate-500">{footer}</div>}
      </motion.div>
    </section>
  );
}

export function Auth015Card() {
  return <AuthScreenSet brandName={BRAND} Shell={Shell} styles={styles} />;
}
