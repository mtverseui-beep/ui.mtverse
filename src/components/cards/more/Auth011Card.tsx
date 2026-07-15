"use client";

import { motion } from "framer-motion";
import { AuthScreenSet, type AuthShellProps, type AuthStyles } from "./auth-screen-set";

const BRAND = "Apple";

const styles: AuthStyles = {
  variant: "light", accent: "#0071e3",
  inputClass: "w-full rounded-xl border border-[#d2d2d7] bg-[#f5f5f7] py-3.5 px-4 text-sm outline-none focus:border-[#0071e3] focus:bg-white",
  labelClass: "mb-1.5 block text-xs font-medium text-[#86868b]",
  buttonClass: "w-full rounded-full bg-[#0071e3] py-3.5 text-sm font-medium text-white hover:bg-[#0077ed]",
  secondaryButtonClass: "rounded-full border border-[#d2d2d7]",
  otpClass: "h-14 w-full rounded-xl border border-[#d2d2d7] bg-[#f5f5f7] text-center text-xl font-bold outline-none focus:border-[#0071e3] focus:bg-white",
  dividerLineColor: "#d2d2d7", dividerTextColor: "#86868b",
  textColor: "#1d1d1f", subTextColor: "#86868b",
  linkClass: "text-[#0071e3] hover:underline", hintColor: "#86868b",
};

function Shell({ title, description, children, footer }: AuthShellProps) {
  return (
    <section className="flex min-h-full items-center justify-center px-6 py-12" style={{ background: "#ffffff", fontFamily: "var(--font-inter-tight), system-ui, sans-serif", color: "#1d1d1f" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-sm">
        <div className="mb-6 flex justify-center"><svg viewBox="0 0 24 24" className="h-10 w-10 fill-current"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg></div>
        <h1 className="text-center text-2xl font-semibold tracking-tight" style={{ letterSpacing: "-0.03em" }}>{title}</h1>
        <p className="mt-2 text-center text-sm text-[#86868b]">{description}</p>
        <div className="mt-6">{children}</div>
        {footer && <div className="mt-6 text-center text-xs text-[#86868b]">{footer}</div>}
      </motion.div>
    </section>
  );
}

export function Auth011Card() {
  return <AuthScreenSet brandName={BRAND} Shell={Shell} styles={styles} />;
}
