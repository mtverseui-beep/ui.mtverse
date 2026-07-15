"use client";

import { useState, useEffect } from "react";
import {
  Cloud,
  CloudRain,
  CloudSun,
  CloudSunRain,
  MapPin,
  Sun,
  Share2,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// AnimatedBorderWeatherCard — weather dashboard with spinning conic-gradient
// borders. Each card has an absolutely-positioned conic gradient that spins
// behind a dark inner panel, creating a living, premium border effect.
// Midnight + electric blue palette. Self-contained (no shadcn/ui deps).

const HOURLY = [
  { time: "16:00", icon: Cloud, temp: "+18°" },
  { time: "17:00", icon: Cloud, temp: "+18°" },
  { time: "18:00", icon: CloudRain, temp: "+16°" },
  { time: "19:00", icon: CloudRain, temp: "+14°" },
  { time: "20:00", icon: CloudSun, temp: "+15°" },
  { time: "21:00", icon: CloudSunRain, temp: "+14°" },
];

const DAILY = [
  { day: "Tue, 7 Sep", icon: Sun, temp: "+18°/+4°" },
  { day: "Wed, 8 Sep", icon: Cloud, temp: "+20°/+6°" },
  { day: "Thu, 9 Sep", icon: CloudRain, temp: "+17°/+3°" },
  { day: "Fri, 10 Sep", icon: Sun, temp: "+22°/+10°" },
  { day: "Sat, 11 Sep", icon: CloudRain, temp: "+16°/+5°" },
];

export function AnimatedBorderWeatherCard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Weather Dashboard",
          text: "Check out this animated weather dashboard!",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch {
      /* user cancelled */
    }
  };

  return (
    <div
      className="w-[clamp(300px,92vw,440px)] select-none"
      style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.5s ease" }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(8,11,17,0.4), transparent 55%), radial-gradient(circle at 80% 30%, rgba(9,104,229,0.15), transparent 60%)",
        }}
      />

      <div className="grid grid-cols-2 gap-3">
        {/* ── Hourly forecast — wide card, slow spinning border ── */}
        <BorderCard
          className="col-span-2"
          gradient="conic-gradient(from 45deg at 50% 50%, #080b11 0%, #1B1B26 80%, #0968e5 100%)"
          spinDuration="8s"
        >
          <div
            className="flex h-full flex-col justify-center rounded-xl p-5"
            style={{
              background:
                "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 0%, transparent 40%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.05) 0%, transparent 40%), linear-gradient(120deg, #0f0e17 0%, #1a1b26 100%)",
            }}
          >
            <div className="relative z-20 flex justify-between text-white">
              {HOURLY.map((h) => {
                const Icon = h.icon;
                return (
                  <div
                    key={h.time}
                    className="flex flex-col items-center gap-1.5 text-[11px] font-medium"
                  >
                    <span className="text-white/70">{h.time}</span>
                    <Icon className="h-5 w-5 fill-white text-white" strokeWidth={1.5} />
                    <span className="font-semibold">{h.temp}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </BorderCard>

        {/* ── Current weather — small card, fast spin ── */}
        <BorderCard
          gradient="conic-gradient(from 45deg at 50% 50%, #080b11 0%, #172033 80%, #fff 100%)"
          spinDuration="4s"
          rounded="rounded-xl"
        >
          <div className="flex h-full flex-col items-center justify-center rounded-xl bg-gradient-to-r from-[#050507] via-[#1B1B26] to-[#0d0e14] text-white">
            <div className="text-[42px] font-semibold leading-none tracking-tight">+18°C</div>
            <div className="mt-1 text-[13px] text-white/70">Cloudy +18°/+5°</div>
          </div>
        </BorderCard>

        {/* ── Time + location — small card, orange accent ── */}
        <BorderCard
          gradient="conic-gradient(from 120deg at 50% 50%, #080b11 0%, #172033 70%, #e86705 90%)"
          spinDuration="4s"
          rounded="rounded-2xl"
        >
          <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-gradient-to-r from-[#1A1B26] via-[#1B1B26] to-[#21222C] p-3 text-white">
            <div className="text-[36px] font-semibold leading-none tracking-tight">17:32</div>
            <div className="mt-1 text-[13px] text-white/70">Sun, Nov 19</div>
            <button
              type="button"
              onClick={handleShare}
              className="mt-2.5 inline-flex items-center gap-1 rounded-full bg-black/10 px-2.5 py-1 text-[11px] font-medium backdrop-blur-xl transition hover:bg-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/40"
            >
              <MapPin className="h-3 w-3" strokeWidth={2.2} />
              Tbilisi
            </button>
          </div>
        </BorderCard>

        {/* ── Daily forecast — wide card, multicolor spin ── */}
        <BorderCard
          className="col-span-2"
          gradient="conic-gradient(from 120deg at 50% 50%, #adfda2 0%, #11d3f3 50%, #2278fb 100%)"
          spinDuration="4s"
          rounded="rounded-2xl"
        >
          <div
            className="relative z-30 flex flex-col justify-center gap-2.5 rounded-2xl p-4 text-white"
            style={{
              background:
                "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 0%, transparent 40%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.05) 0%, transparent 40%), linear-gradient(120deg, #0f0e17 0%, #1a1b26 100%)",
            }}
          >
            {DAILY.map((d) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.day}
                  className="flex items-center justify-between text-[12.5px]"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 fill-white text-white" strokeWidth={1.5} />
                    <span className="text-white/90">{d.day}</span>
                  </div>
                  <span className="font-semibold">{d.temp}</span>
                </div>
              );
            })}
          </div>
        </BorderCard>
      </div>
    </div>
  );
}

// ── BorderCard — wrapper that renders the spinning conic gradient behind
//    an inner panel. The gradient is an absolutely-positioned <span> that
//    spans far beyond the card (inset-[-1000%]) and rotates infinitely.
function BorderCard({
  children,
  gradient,
  spinDuration = "4s",
  className = "",
  rounded = "rounded-xl",
}: {
  children: React.ReactNode;
  gradient: string;
  spinDuration?: string;
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      className={`relative inline-flex overflow-hidden p-px shadow-lg ${rounded} ${className}`}
    >
      {/* Spinning conic gradient — lives behind the inner panel */}
      <span
        aria-hidden
        className="absolute inset-[-1000%] animate-[spin_var(--spin-dur)_linear_infinite]"
        style={{ background: gradient, ["--spin-dur" as string]: spinDuration }}
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
