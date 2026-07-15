"use client";

import { useEffect, useRef, useState } from "react";

// ════════════════════════════════════════════════════════════════════════════
// Pricing004Card — extracted from Agentic template
// ════════════════════════════════════════════════════════════════════════════
// 3-tier pricing (Sandbox/Builder/Enterprise) with:
//   • RevealText headline (word-by-word blur+translate stagger)
//   • BentoCard hover glow (mouse-tracking radial gradient)
//   • Staggered entrance via IntersectionObserver
//   • Light cream theme (#F5F4F0 bg, #faf9f7 cards)

const PLANS = [
  { name: "Sandbox", price: "Free", sub: "Start experimenting", features: ["5 agents", "1,000 tasks/mo", "Community support", "Basic traces"], delay: 0 },
  { name: "Builder", price: "$49", period: "/mo", sub: "For teams shipping fast", features: ["50 agents", "100K tasks/mo", "Priority support", "Full traces + replay", "Custom tools", "REST API"], highlight: true, delay: 80 },
  { name: "Enterprise", price: "Custom", sub: "For orgs at scale", features: ["Unlimited agents", "Unlimited tasks", "Dedicated infra", "SOC 2 / HIPAA", "SLA guarantees", "Custom contracts"], delay: 140 },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function BentoCard({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl border border-black/[0.07] bg-white overflow-hidden transition-all duration-700 hover:border-black/[0.15] hover:bg-[#fafaf8] ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms, border-color 0.3s ease, background-color 0.3s ease`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,0,0,0.03), transparent 60%)" }}
      />
      {children}
    </div>
  );
}

function RevealText({ children, className = "" }: { children: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const words = children.split(" ");
  return (
    <h2 ref={ref} className={className} style={{ display: "block", overflow: "hidden" }}>
      {words.map((word, index) => (
        <span
          key={index}
          style={{
            display: "inline-block",
            opacity: visible ? 1 : 0,
            filter: visible ? "blur(0px)" : "blur(8px)",
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: visible
              ? `opacity 700ms cubic-bezier(0.16,1,0.3,1) ${index * 80}ms, filter 700ms cubic-bezier(0.16,1,0.3,1) ${index * 80}ms, transform 700ms cubic-bezier(0.16,1,0.3,1) ${index * 80}ms`
              : "none",
          }}
        >
          {word + "\u00A0"}
        </span>
      ))}
    </h2>
  );
}

export function Pricing004Card() {
  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section id="pricing" className="py-14 px-6 md:px-10 border-t border-black/[0.06] bg-[#F5F4F0]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 flex flex-col items-center">
          <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-[11px] tracking-widest font-sans text-black/40 bg-black/[0.04]">PRICING</div>
          <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05] text-black">
            Pay as your agents grow.
          </RevealText>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3" onMouseMove={handleMouse}>
          {PLANS.map((plan) => (
            <BentoCard
              key={plan.name}
              className={`p-8 flex flex-col ${plan.highlight ? "border-black/20 bg-[#F0EEE8]" : ""}`}
              delay={plan.delay}
            >
              <div className="mb-8">
                <div className="font-mono text-[11px] tracking-widest text-black/40 mb-4">{plan.name}</div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-light text-black">{plan.price}</span>
                  {plan.period && <span className="text-black/40 text-sm">{plan.period}</span>}
                </div>
                <p className="text-xs text-black/35 tracking-wide">{plan.sub}</p>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-black/55">
                    <div className="w-1 h-1 rounded-full bg-black/25 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={`w-full py-3 rounded-xl text-sm tracking-widest transition-all duration-200 ${
                  plan.highlight
                    ? "bg-[#111] text-white hover:bg-[#333]"
                    : "border border-black/10 text-black/60 hover:border-black/25 hover:text-black hover:bg-black/[0.04]"
                }`}
              >
                {plan.name === "Enterprise" ? "CONTACT SALES" : "GET STARTED"}
              </button>
            </BentoCard>
          ))}
        </div>
      </div>
    </section>
  );
}
