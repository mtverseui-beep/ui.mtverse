"use client";

import { useId } from "react";
import { ArrowRight, Check, Layers3 } from "lucide-react";
import { BackgroundShell, useBg } from "./BackgroundShell";
import { backgroundLayouts, backgroundPresets, type BackgroundLayout, type BackgroundPreset, type BackgroundPresetId } from "./background-presets";

export function PremiumBackground({ preset }: { preset: BackgroundPresetId }) {
  const config: BackgroundPreset = backgroundPresets[preset];
  return (
    <BackgroundShell darkDefault={config.darkDefault}>
      <PremiumBackgroundScene config={config} preset={preset} />
    </BackgroundShell>
  );
}

function PremiumBackgroundScene({ config, preset }: { config: BackgroundPreset; preset: BackgroundPresetId }) {
  const { dark } = useBg();
  const id = useId().replace(/:/g, "");
  const layout = backgroundLayouts[preset];
  const foreground = dark ? "#f8fafc" : "#0f172a";
  const muted = dark ? "rgba(226,232,240,0.72)" : "#475569";
  const hairline = dark ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.10)";
  const canvas = dark ? config.darkCanvas : config.lightCanvas;

  return (
    <section data-layout={layout} data-preset={preset} className="premium-bg-root relative isolate flex h-full min-h-[440px] w-full overflow-hidden" style={{ backgroundColor: canvas, color: foreground }}>
      <style>{BACKGROUND_STYLES}</style>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="premium-bg-glow-a premium-bg-drift-a absolute h-[clamp(22rem,70cqw,58rem)] w-[clamp(22rem,70cqw,58rem)] rounded-full opacity-70 blur-[80px]" style={{ background: `radial-gradient(circle, ${config.accent}${dark ? "66" : "3d"} 0%, transparent 68%)` }} />
        <div className="premium-bg-glow-b premium-bg-drift-b absolute h-[clamp(24rem,76cqw,62rem)] w-[clamp(24rem,76cqw,62rem)] rounded-full opacity-60 blur-[90px]" style={{ background: `radial-gradient(circle, ${config.secondary}${dark ? "52" : "38"} 0%, transparent 70%)` }} />
        <TextureLayer config={config} dark={dark} id={id} />
        <div className="premium-bg-scrim absolute inset-0" style={{ background: dark ? "linear-gradient(100deg, rgba(2,6,23,0.52) 0%, rgba(2,6,23,0.08) 58%, rgba(2,6,23,0.26) 100%)" : "linear-gradient(100deg, rgba(255,255,255,0.68) 0%, rgba(255,255,255,0.10) 60%, rgba(255,255,255,0.36) 100%)" }} />
      </div>

      <div className={`premium-bg-content premium-bg-content-${layout} relative z-10 flex w-full px-[clamp(1.5rem,6cqw,5rem)] py-16`}>
        <div className="premium-bg-copy max-w-[44rem]">
          <div className="premium-bg-eyebrow mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] backdrop-blur-md" style={{ borderColor: hairline, background: dark ? "rgba(15,23,42,0.34)" : "rgba(255,255,255,0.55)", color: muted }}><Layers3 aria-hidden="true" className="h-3.5 w-3.5" style={{ color: config.accent }} />{config.eyebrow}</div>
          <h1 className="premium-bg-title max-w-[12ch] text-balance text-[clamp(2.75rem,8cqw,6.75rem)] font-semibold leading-[0.92] tracking-[-0.065em]">{config.title}</h1>
          <p className="premium-bg-description mt-6 max-w-[38rem] text-pretty text-[clamp(0.95rem,2cqw,1.18rem)] leading-7" style={{ color: muted }}>{config.description}</p>
          <div className="premium-bg-actions mt-8 flex flex-wrap items-center gap-3"><button type="button" className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 motion-reduce:transform-none" style={{ background: `linear-gradient(135deg, ${config.accent}, ${config.secondary})`, boxShadow: `0 16px 40px ${config.accent}2e` }}>Start building <ArrowRight aria-hidden="true" className="h-4 w-4" /></button><button type="button" className="inline-flex h-11 items-center rounded-full border px-5 text-sm font-semibold backdrop-blur-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" style={{ borderColor: hairline, background: dark ? "rgba(15,23,42,0.28)" : "rgba(255,255,255,0.52)", color: foreground }}>View design system</button></div>
          <div className="premium-bg-proof mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium" style={{ color: muted }}>{["Hero-ready", "CTA-ready", "Reduced motion"].map((label) => <span key={label} className="inline-flex items-center gap-1.5"><Check aria-hidden="true" className="h-3.5 w-3.5" style={{ color: config.accent }} />{label}</span>)}</div>
        </div>
        {(layout === "split-glass" || layout === "framed") && <BackgroundArtifact config={config} dark={dark} layout={layout} />}
      </div>
    </section>
  );
}

function BackgroundArtifact({ config, dark, layout }: { config: BackgroundPreset; dark: boolean; layout: BackgroundLayout }) {
  const border = dark ? "rgba(255,255,255,.13)" : "rgba(15,23,42,.10)";
  return <div aria-hidden="true" className={`premium-bg-artifact premium-bg-artifact-${layout}`} style={{ borderColor: border, background: dark ? "rgba(10,15,28,.54)" : "rgba(255,255,255,.58)", boxShadow: `0 30px 90px ${config.accent}1f` }}><div className="premium-bg-artifact-top"><span style={{ background: config.accent }} /><span style={{ background: config.secondary }} /><span /></div><div className="premium-bg-artifact-chart">{[34, 56, 44, 72, 63, 88, 78].map((height, index) => <i key={height} style={{ height: `${height}%`, background: index % 2 ? config.secondary : config.accent }} />)}</div><div className="premium-bg-artifact-metrics"><span>Conversion<strong>+28.4%</strong></span><span>Growth<strong>3.2×</strong></span></div></div>;
}


function TextureLayer({ config, dark, id }: { config: BackgroundPreset; dark: boolean; id: string }) {
  const line = dark ? "rgba(255,255,255,0.10)" : "rgba(15,23,42,0.08)";
  const faint = dark ? "rgba(255,255,255,0.045)" : "rgba(15,23,42,0.04)";

  if (config.texture === "grid") {
    return <div className="premium-bg-texture absolute inset-0 opacity-70" style={{ backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`, backgroundSize: "64px 64px", maskImage: "linear-gradient(to right, black, transparent 88%)" }} />;
  }
  if (config.texture === "dots") {
    return <div className="absolute inset-0 opacity-70" style={{ backgroundImage: `radial-gradient(circle, ${line} 1.2px, transparent 1.3px)`, backgroundSize: "24px 24px", maskImage: "radial-gradient(ellipse at 35% 45%, black 10%, transparent 74%)" }} />;
  }
  if (config.texture === "lines") {
    return <div className="premium-bg-texture absolute inset-0 opacity-80" style={{ backgroundImage: `repeating-linear-gradient(165deg, transparent 0 34px, ${line} 35px, transparent 36px 68px)`, maskImage: "linear-gradient(90deg, black, transparent 86%)" }} />;
  }
  if (config.texture === "rings") {
    return <div className="premium-bg-pulse absolute -right-[16%] top-1/2 aspect-square w-[min(78cqw,52rem)] -translate-y-1/2 rounded-full opacity-80" style={{ background: `repeating-radial-gradient(circle, transparent 0 38px, ${line} 39px 40px)`, boxShadow: `inset 0 0 120px ${config.accent}${dark ? "26" : "18"}` }} />;
  }
  if (config.texture === "grain") {
    return <div className="absolute inset-0 opacity-60" style={{ backgroundImage: `linear-gradient(115deg, transparent 20%, ${faint} 48%, transparent 72%), repeating-linear-gradient(90deg, transparent 0 3px, ${faint} 4px, transparent 5px)`, mixBlendMode: dark ? "screen" : "multiply" }} />;
  }
  if (config.texture === "columns") {
    return (
      <div className="absolute inset-x-[4%] bottom-0 top-[12%] flex items-end justify-end gap-[clamp(8px,1.6cqw,22px)] opacity-60">
        {[36, 62, 48, 78, 54, 88, 66, 42, 72, 52, 82, 60].map((height, index) => (
          <span key={height + index} className="premium-bg-column w-[clamp(8px,1.2cqw,16px)] rounded-t-full" style={{ height: `${height}%`, animationDelay: `${index * -0.7}s`, background: `linear-gradient(to top, ${config.accent}${dark ? "0d" : "12"}, ${index % 2 ? config.secondary : config.accent}${dark ? "73" : "4d"}, transparent)` }} />
        ))}
      </div>
    );
  }
  if (config.texture === "waves") {
    return (
      <svg className="premium-bg-wave absolute inset-0 h-full w-full opacity-70" viewBox="0 0 1200 700" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`${id}-wave`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={config.accent} stopOpacity={dark ? 0.08 : 0.05} />
            <stop offset="0.55" stopColor={config.accent} stopOpacity={dark ? 0.5 : 0.3} />
            <stop offset="1" stopColor={config.secondary} stopOpacity={dark ? 0.12 : 0.08} />
          </linearGradient>
        </defs>
        <path d="M-80 520 C180 250 330 650 600 390 S1010 210 1300 420 L1300 760 L-80 760Z" fill={`url(#${id}-wave)`} />
        <path d="M-80 590 C210 340 390 690 680 455 S1030 320 1300 500" fill="none" stroke={config.secondary} strokeOpacity={dark ? 0.34 : 0.22} strokeWidth="1.5" />
      </svg>
    );
  }
  if (config.texture === "facets") {
    return (
      <svg className="absolute right-0 top-0 h-full w-[72%] opacity-70" viewBox="0 0 800 700" preserveAspectRatio="xMaxYMid slice">
        <defs><linearGradient id={`${id}-facet`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={config.accent} stopOpacity={dark ? 0.28 : 0.18} /><stop offset="1" stopColor={config.secondary} stopOpacity="0.03" /></linearGradient></defs>
        <path d="M210 -40 610 40 420 300Z" fill={`url(#${id}-facet)`} stroke={line} />
        <path d="M610 40 860 180 420 300Z" fill={config.secondary} fillOpacity={dark ? 0.12 : 0.08} stroke={line} />
        <path d="M420 300 860 180 720 590Z" fill={config.accent} fillOpacity={dark ? 0.1 : 0.06} stroke={line} />
        <path d="M420 300 720 590 280 760Z" fill={`url(#${id}-facet)`} stroke={line} />
      </svg>
    );
  }
  return (
    <svg className="premium-bg-network absolute inset-0 h-full w-full opacity-75" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
      <g fill="none" stroke={line} strokeWidth="1">
        <path d="M80 550 250 410 410 480 570 280 760 360 930 170 1130 280" />
        <path d="M170 160 340 250 570 280 700 110 930 170 1060 70" />
        <path d="M250 410 340 250M410 480 760 360M760 360 930 170M760 360 1030 520" />
      </g>
      {[[80,550],[250,410],[410,480],[570,280],[760,360],[930,170],[1130,280],[170,160],[340,250],[700,110],[1060,70],[1030,520]].map(([cx, cy], index) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={index % 3 === 0 ? 5 : 3} fill={index % 2 ? config.secondary : config.accent} fillOpacity={dark ? 0.8 : 0.55} />)}
    </svg>
  );
}

const BACKGROUND_STYLES = `
  @keyframes premium-bg-drift-a { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(-4%,5%,0) scale(1.05); } }
  @keyframes premium-bg-drift-b { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(5%,-4%,0) scale(1.04); } }
  @keyframes premium-bg-texture { 0%,100% { background-position: 0 0; } 50% { background-position: 32px 18px; } }
  @keyframes premium-bg-pulse { 0%,100% { opacity: .62; } 50% { opacity: .86; } }
  @keyframes premium-bg-column { 0%,100% { transform: scaleY(.94); opacity: .72; } 50% { transform: scaleY(1); opacity: 1; } }
  @keyframes premium-bg-wave { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(-1.5%,1%,0); } }
  @keyframes premium-bg-network { 0%,100% { transform: translate3d(0,0,0); opacity: .58; } 50% { transform: translate3d(1%,-1%,0); opacity: .78; } }
  .premium-bg-drift-a { animation: premium-bg-drift-a 18s ease-in-out infinite; }
  .premium-bg-drift-b { animation: premium-bg-drift-b 22s ease-in-out infinite; }
  .premium-bg-texture { animation: premium-bg-texture 24s ease-in-out infinite; }
  .premium-bg-pulse { animation: premium-bg-pulse 12s ease-in-out infinite; }
  .premium-bg-column { transform-origin: bottom; animation: premium-bg-column 8s ease-in-out infinite; }
  .premium-bg-wave { animation: premium-bg-wave 18s ease-in-out infinite; }
  .premium-bg-network { animation: premium-bg-network 20s ease-in-out infinite; }
  .premium-bg-glow-a { right: -12%; top: -30%; }
  .premium-bg-glow-b { bottom: -38%; left: -16%; }
  .premium-bg-content { align-items: center; }
  .premium-bg-content-hero-center, .premium-bg-content-wide-center { justify-content: center; text-align: center; }
  .premium-bg-content-hero-center .premium-bg-copy, .premium-bg-content-wide-center .premium-bg-copy { display: flex; flex-direction: column; align-items: center; }
  .premium-bg-content-hero-center .premium-bg-actions, .premium-bg-content-hero-center .premium-bg-proof, .premium-bg-content-wide-center .premium-bg-actions, .premium-bg-content-wide-center .premium-bg-proof { justify-content: center; }
  .premium-bg-content-hero-center .premium-bg-title { max-width: 10ch; }
  .premium-bg-content-wide-center .premium-bg-copy { max-width: 58rem; }
  .premium-bg-content-wide-center .premium-bg-title { max-width: 15ch; font-size: clamp(2.6rem,7cqw,6rem); }
  .premium-bg-content-wide-center .premium-bg-description { max-width: 46rem; }
  .premium-bg-content-split-glass { justify-content: space-between; gap: clamp(2rem,7cqw,7rem); }
  .premium-bg-content-split-glass .premium-bg-copy { max-width: 36rem; }
  .premium-bg-content-editorial-bottom { align-items: flex-end; padding-bottom: clamp(3rem,9cqh,7rem); }
  .premium-bg-content-editorial-bottom .premium-bg-copy { max-width: 62rem; }
  .premium-bg-content-editorial-bottom .premium-bg-title { max-width: 15ch; }
  .premium-bg-content-editorial-bottom .premium-bg-description { max-width: 52rem; }
  .premium-bg-content-minimal-top { align-items: flex-start; padding-top: clamp(4rem,12cqh,8rem); }
  .premium-bg-content-minimal-top .premium-bg-title { font-family: Georgia,serif; font-weight: 500; letter-spacing: -.045em; }
  .premium-bg-content-framed { align-items: center; justify-content: center; }
  .premium-bg-content-framed .premium-bg-copy { position: relative; z-index: 2; max-width: 48rem; border: 1px solid rgba(148,163,184,.2); border-radius: 2rem; padding: clamp(1.8rem,5cqw,4rem); background: rgba(255,255,255,.12); box-shadow: 0 32px 90px rgba(15,23,42,.12); backdrop-filter: blur(22px); }
  .premium-bg-artifact { width: min(34cqw,25rem); min-width: 16rem; border: 1px solid; border-radius: 1.5rem; padding: 1.1rem; backdrop-filter: blur(24px); transform: perspective(900px) rotateY(-8deg) rotateX(3deg); }
  .premium-bg-artifact-framed { display: none; }
  .premium-bg-artifact-top { display: flex; gap: .38rem; }
  .premium-bg-artifact-top span { width: .48rem; height: .48rem; border-radius: 50%; background: rgba(148,163,184,.45); }
  .premium-bg-artifact-chart { display: flex; align-items: flex-end; gap: .65rem; height: 11rem; margin-top: 1.25rem; padding: 1rem; border-radius: 1rem; background: rgba(127,127,127,.06); }
  .premium-bg-artifact-chart i { flex: 1; min-width: .55rem; border-radius: .4rem .4rem .15rem .15rem; opacity: .7; }
  .premium-bg-artifact-metrics { display: grid; grid-template-columns: 1fr 1fr; gap: .7rem; margin-top: .8rem; }
  .premium-bg-artifact-metrics span { padding: .75rem; border-radius: .8rem; background: rgba(127,127,127,.07); font-size: .62rem; text-transform: uppercase; letter-spacing: .08em; opacity: .72; }
  .premium-bg-artifact-metrics strong { display: block; margin-top: .3rem; font-size: 1rem; letter-spacing: -.03em; opacity: 1; }
  [data-layout="hero-center"] .premium-bg-glow-a { right: 24%; top: -45%; }
  [data-layout="hero-center"] .premium-bg-glow-b { left: 30%; bottom: -55%; }
  [data-layout="split-glass"] .premium-bg-glow-a { right: -4%; top: -16%; }
  [data-layout="editorial-bottom"] .premium-bg-glow-a { right: 20%; top: -52%; }
  [data-layout="minimal-top"] .premium-bg-glow-b { left: 40%; bottom: -55%; }
  [data-layout="wide-center"] .premium-bg-scrim { background: linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.36)) !important; }
  [data-preset="matrix-rain"] .premium-bg-title, [data-preset="floating-code"] .premium-bg-title { font-family: ui-monospace,SFMono-Regular,Menlo,monospace; letter-spacing: -.055em; }
  [data-preset="bokeh-lights"] .premium-bg-copy, [data-preset="holographic"] .premium-bg-copy { text-align: center; }
  [data-preset="noise-texture"] .premium-bg-actions { margin-top: 2.5rem; }
  [data-preset="cyber-grid"] .premium-bg-copy { margin-left: auto; }
  @container (max-width: 760px) {
    .premium-bg-content { align-items: center; padding-top: 4rem; padding-bottom: 5rem; }
    .premium-bg-content-split-glass { justify-content: flex-start; }
    .premium-bg-artifact { display: none; }
    .premium-bg-content-framed .premium-bg-copy { padding: 1.6rem; border-radius: 1.4rem; }
  }
  @media (prefers-reduced-motion: reduce) {
    .premium-bg-root *, .premium-bg-root *::before, .premium-bg-root *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; }
  }
`;