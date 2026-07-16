export type BackgroundTexture =
  | "grid"
  | "dots"
  | "lines"
  | "rings"
  | "waves"
  | "facets"
  | "network"
  | "columns"
  | "grain";

export interface BackgroundPreset {
  title: string;
  eyebrow: string;
  description: string;
  accent: string;
  secondary: string;
  lightCanvas: string;
  darkCanvas: string;
  texture: BackgroundTexture;
  darkDefault?: boolean;
}

export const backgroundPresets = {
  "aurora-mesh": { title: "Aurora Commerce", eyebrow: "Premium commerce", description: "A restrained aurora wash for product launches, conversion heroes, and editorial campaigns.", accent: "#7c3aed", secondary: "#06b6d4", lightCanvas: "#f7f8ff", darkCanvas: "#080b18", texture: "grain" },
  "particle-constellation": { title: "Executive Constellation", eyebrow: "AI & infrastructure", description: "A precise connected field that adds technical depth without competing with the message.", accent: "#4f46e5", secondary: "#38bdf8", lightCanvas: "#f8faff", darkCanvas: "#070b16", texture: "network", darkDefault: true },
  "liquid-metal": { title: "Liquid Chrome", eyebrow: "Luxury technology", description: "Polished metallic light with controlled highlights for premium product and studio launches.", accent: "#64748b", secondary: "#d8b4fe", lightCanvas: "#f7f7f8", darkCanvas: "#090a0d", texture: "rings", darkDefault: true },
  "geometric-grid": { title: "Precision Grid", eyebrow: "SaaS foundation", description: "A quiet architectural grid designed for enterprise landing pages and product storytelling.", accent: "#4f46e5", secondary: "#22d3ee", lightCanvas: "#f8fafc", darkCanvas: "#090d18", texture: "grid" },
  "neon-wave": { title: "Electric Silk", eyebrow: "Creative technology", description: "Elegant luminous ribbons for modern launches—expressive, but intentionally never cyberpunk-noisy.", accent: "#2563eb", secondary: "#d946ef", lightCanvas: "#f8f9ff", darkCanvas: "#070816", texture: "waves", darkDefault: true },
  "floating-orbs": { title: "Ambient Orbs", eyebrow: "Universal hero", description: "Soft dimensional color fields that frame headlines and calls to action across product categories.", accent: "#8b5cf6", secondary: "#f97316", lightCanvas: "#fbf9ff", darkCanvas: "#0d0918", texture: "grain" },
  "matrix-rain": { title: "Emerald Data Veil", eyebrow: "Data platforms", description: "A refined vertical data rhythm replacing novelty code rain with an enterprise-ready visual system.", accent: "#059669", secondary: "#34d399", lightCanvas: "#f4fbf8", darkCanvas: "#06110d", texture: "columns", darkDefault: true },
  "gradient-mesh": { title: "Editorial Mesh", eyebrow: "Brand campaigns", description: "A warm, art-directed mesh for editorial headlines, portfolios, and high-impact launch moments.", accent: "#db2777", secondary: "#f59e0b", lightCanvas: "#fff8fb", darkCanvas: "#180914", texture: "grain" },
  "dot-matrix": { title: "Product Dot Field", eyebrow: "Product UI", description: "A disciplined dot field with focused color—ideal behind screenshots, metrics, and feature copy.", accent: "#6366f1", secondary: "#06b6d4", lightCanvas: "#f8fafc", darkCanvas: "#090d18", texture: "dots" },
  "starfield": { title: "Midnight Spotlight", eyebrow: "Cinematic launch", description: "A calm celestial spotlight replacing warp-speed motion with premium depth and clear hierarchy.", accent: "#818cf8", secondary: "#e0e7ff", lightCanvas: "#f6f7fc", darkCanvas: "#050711", texture: "dots", darkDefault: true },
  "bokeh-lights": { title: "Luxe Bokeh", eyebrow: "Editorial luxury", description: "Soft optical color and generous negative space for hospitality, fashion, and event campaigns.", accent: "#e11d48", secondary: "#f59e0b", lightCanvas: "#fff8f6", darkCanvas: "#16090c", texture: "grain", darkDefault: true },
  "topographic": { title: "Topographic Lines", eyebrow: "Outdoor & finance", description: "Measured contour lines that communicate terrain, progress, and layered intelligence.", accent: "#059669", secondary: "#0ea5e9", lightCanvas: "#f6fbf8", darkCanvas: "#07110d", texture: "lines" },
  "holographic": { title: "Iridescent Foil", eyebrow: "Premium identity", description: "A tasteful foil glow for membership, fintech, and limited-edition product experiences.", accent: "#7c3aed", secondary: "#ec4899", lightCanvas: "#fbf9ff", darkCanvas: "#0e0917", texture: "facets" },
  "vortex-spiral": { title: "Radial Focus", eyebrow: "Conversion focus", description: "Concentric depth directs attention toward the primary message without hypnotic particle motion.", accent: "#4f46e5", secondary: "#a855f7", lightCanvas: "#f8f8ff", darkCanvas: "#090817", texture: "rings", darkDefault: true },
  "crystal-shards": { title: "Faceted Glass", eyebrow: "Architecture & design", description: "Structured translucent facets create a premium spatial backdrop for confident brand stories.", accent: "#0891b2", secondary: "#8b5cf6", lightCanvas: "#f5fbfc", darkCanvas: "#071015", texture: "facets" },
  "lava-lamp": { title: "Organic Gradient", eyebrow: "Wellness & lifestyle", description: "Calm organic color replaces retro metaballs with a sophisticated, breathable composition.", accent: "#e879f9", secondary: "#fb7185", lightCanvas: "#fff8fc", darkCanvas: "#170b16", texture: "grain" },
  "cyber-grid": { title: "Horizon Grid", eyebrow: "Future products", description: "A clean perspective horizon for technology launches, with true light and dark presentations.", accent: "#06b6d4", secondary: "#6366f1", lightCanvas: "#f5fbff", darkCanvas: "#050b13", texture: "grid", darkDefault: true },
  "origami-folds": { title: "Architectural Folds", eyebrow: "Editorial structure", description: "Quiet geometric planes create hierarchy and dimension for agencies and design-led products.", accent: "#7c3aed", secondary: "#f59e0b", lightCanvas: "#faf9f7", darkCanvas: "#100d12", texture: "facets" },
  "mesh-gradient": { title: "Signature Mesh", eyebrow: "Flagship launch", description: "A versatile, art-directed gradient system built for polished SaaS and brand hero sections.", accent: "#6366f1", secondary: "#ec4899", lightCanvas: "#f8f7ff", darkCanvas: "#0b0918", texture: "grain" },
  "aurora-borealis": { title: "Northern Gradient", eyebrow: "Climate & innovation", description: "Layered northern color with deterministic ribbons and no render-time randomness.", accent: "#10b981", secondary: "#3b82f6", lightCanvas: "#f3fbf8", darkCanvas: "#04110f", texture: "waves", darkDefault: true },
  "noise-texture": { title: "Studio Grain", eyebrow: "Editorial depth", description: "Subtle grain, vignette, and tonal light for timeless campaigns and monochrome product pages.", accent: "#475569", secondary: "#a78bfa", lightCanvas: "#f7f6f3", darkCanvas: "#0b0b0c", texture: "grain" },
  "animated-grid-glow": { title: "Grid Spotlight", eyebrow: "Enterprise platform", description: "A focused grid illumination for dashboard, infrastructure, and developer-tool storytelling.", accent: "#4f46e5", secondary: "#22d3ee", lightCanvas: "#f7f9ff", darkCanvas: "#070b16", texture: "grid", darkDefault: true },
  "floating-code": { title: "Developer Blueprint", eyebrow: "Developer experience", description: "Blueprint lines and restrained technical annotations for APIs, SDKs, and engineering products.", accent: "#2563eb", secondary: "#14b8a6", lightCanvas: "#f5f9ff", darkCanvas: "#06101a", texture: "lines", darkDefault: true },
  "network-graph": { title: "Neural Network", eyebrow: "AI systems", description: "A deterministic network layer with strong focal balance and production-friendly rendering.", accent: "#3b82f6", secondary: "#8b5cf6", lightCanvas: "#f7f9ff", darkCanvas: "#060914", texture: "network", darkDefault: true },
  "color-audio-bars": { title: "Rhythm Columns", eyebrow: "Media & culture", description: "Editorial rhythm and controlled color for music, podcast, and entertainment campaigns.", accent: "#7c3aed", secondary: "#f43f5e", lightCanvas: "#fcf8ff", darkCanvas: "#120817", texture: "columns", darkDefault: true },
  "glassmorphism-blur": { title: "Glass Atmosphere", eyebrow: "Premium software", description: "Layered atmospheric color and a single refined glass plane—never a wall of empty tiles.", accent: "#0ea5e9", secondary: "#d946ef", lightCanvas: "#f6fbff", darkCanvas: "#070b16", texture: "facets" },
  "particle-vortex": { title: "Orbital Halo", eyebrow: "Fintech & science", description: "Measured orbital rings replace the particle tornado with a calm, premium focal system.", accent: "#0891b2", secondary: "#6366f1", lightCanvas: "#f5fbfc", darkCanvas: "#050d13", texture: "rings", darkDefault: true },
  "gradient-waves": { title: "Layered Waves", eyebrow: "Fintech & services", description: "Confident layered curves for conversion sections, trust messaging, and premium service brands.", accent: "#4f46e5", secondary: "#8b5cf6", lightCanvas: "#f8f8ff", darkCanvas: "#080817", texture: "waves" },
} as const satisfies Record<string, BackgroundPreset>;

export type BackgroundPresetId = keyof typeof backgroundPresets;