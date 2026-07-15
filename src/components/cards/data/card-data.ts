import type {
  FolderProject,
  GlassFeature,
  PricingPlan,
  AnalyticsInsight,
  CreatorProfile,
  EcommerceProduct,
  UploadFile,
  NotificationItem,
  EventBooking,
  AIGenerationResult,
} from "../types";

// All Unsplash URLs use the stable images.unsplash.com hostname configured in next.config.ts.
// Each URL includes a fixed width/height (w/q params) so images load consistently.

export const folderProject: FolderProject = {
  id: "prj-aurora-9",
  title: "Unlocking Your Creative Potential",
  status: "Synced",
  itemCount: 42,
  lastUpdated: "Updated 2h ago",
  accent: "cyan",
  // Five premium HD cinematic portrait stills — portrait orientation,
  // rendered at 100×160 inside the folder. Dramatic, atmospheric, film-grade.
  previews: [
    {
      src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=400&q=85",
      alt: "Cinematic portrait — creative director in studio light",
    },
    {
      src: "https://images.unsplash.com/photo-1492288991661-058aa541ff43?auto=format&fit=crop&w=400&q=85",
      alt: "Cinematic portrait — photographer at golden hour",
    },
    {
      src: "https://images.unsplash.com/photo-1487621167305-5d248087c724?auto=format&fit=crop&w=400&q=85",
      alt: "Cinematic portrait — focused craftsperson at work",
    },
    {
      src: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=400&q=85",
      alt: "Cinematic portrait — visionary in dramatic key light",
    },
    {
      src: "https://images.unsplash.com/photo-1496440737103-cd596325d314?auto=format&fit=crop&w=400&q=85",
      alt: "Cinematic portrait — atmospheric lone silhouette",
    },
  ],
};

export const glassFeature: GlassFeature = {
  badge: "New",
  title: "Realtime Collaboration",
  description:
    "Edit, comment and review design files together with sub-50ms cursor sync. Built on a CRDT engine that never conflicts.",
  imageUrl:
    "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80",
  stats: [
    { label: "Active teams", value: "12.4k" },
    { label: "Avg latency", value: "38ms" },
    { label: "Uptime", value: "99.99%" },
  ],
  details: [
    { label: "Engine", value: "CRDT (Yjs fork)" },
    { label: "Max editors", value: "200 / file" },
    { label: "Version history", value: "Unlimited" },
    { label: "Offline mode", value: "Full replay" },
  ],
};

export const pricingPlan: PricingPlan = {
  name: "Studio",
  price: 39,
  billingPeriod: "per editor / month",
  tagline: "For growing product teams shipping daily.",
  features: [
    { label: "Unlimited projects & files", included: true },
    { label: "Realtime collaboration (200 editors)", included: true },
    { label: "Version history & branching", included: true },
    { label: "Advanced analytics dashboard", included: true },
    { label: "SSO + SCIM provisioning", included: true },
    { label: "Priority human support", included: true },
    { label: "Dedicated success manager", included: false },
  ],
  ctaLabel: "Start 14-day trial",
  popular: true,
  trustMicrocopy: "No credit card required · Cancel anytime",
};

export const analyticsInsight: AnalyticsInsight = {
  metric: "Monthly Recurring Revenue",
  kpi: 184320,
  prefix: "$",
  suffix: "",
  deltaPct: 12.4,
  comparison: "vs. $164,012 last month",
  tooltip:
    "Driven by 312 net new subscriptions and a 4.1% expansion in the Studio tier. Churn held flat at 1.8%.",
  segments: [
    { label: "7D", value: "+4.2%", active: false },
    { label: "30D", value: "+12.4%", active: true },
    { label: "90D", value: "+28.9%", active: false },
    { label: "1Y", value: "+112%", active: false },
  ],
  series: [38, 42, 40, 48, 52, 49, 58, 64, 61, 72, 78, 74, 86, 94, 91, 100],
};

export const creatorProfile: CreatorProfile = {
  name: "Mara Okonkwo",
  role: "Visual Director & 3D Artist",
  location: "Lagos, Nigeria",
  verified: true,
  avatar:
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80",
  cover:
    "https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=1200&q=80",
  followers: "84.2k",
  following: "612",
  projects: "138",
  skills: ["3D Motion", "Art Direction", "Houdini", "Octane", "Color"],
  works: [
    {
      src: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=400&q=80",
      alt: "Surreal 3D render of a floating crystal form",
    },
    {
      src: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=400&q=80",
      alt: "Abstract iridescent liquid sculpture",
    },
    {
      src: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80",
      alt: "Neon character design in violet light",
    },
    {
      src: "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=400&q=80",
      alt: "Studio portrait with dramatic cyan rim light",
    },
  ],
};

export const ecommerceProduct: EcommerceProduct = {
  title: "Aria Pro — Wireless Noise-Cancelling Headphones",
  category: "Audio · Over-Ear",
  rating: 4.8,
  reviewCount: 2143,
  price: 249,
  originalPrice: 329,
  discountPct: 24,
  stock: 7,
  stockLabel: "Only 7 left in stock",
  image:
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80",
  ],
  colors: [
    { name: "Obsidian", hex: "#0f1115" },
    { name: "Sand", hex: "#c9b89a" },
    { name: "Cobalt", hex: "#1e3a8a" },
    { name: "Crimson", hex: "#b91c1c" },
  ],
};

export const uploadFiles: UploadFile[] = [
  {
    id: "f1",
    name: "hero-banner-v4.psd",
    size: "48.2 MB",
    type: "image",
    status: "success",
    progress: 100,
    thumbnail:
      "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "f2",
    name: "launch-trailer-60fps.mov",
    size: "312 MB",
    type: "video",
    status: "processing",
    progress: 100,
    thumbnail:
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "f3",
    name: "soundtrack-master.wav",
    size: "86.4 MB",
    type: "audio",
    status: "uploading",
    progress: 64,
  },
  {
    id: "f4",
    name: "brand-guidelines.pdf",
    size: "12.1 MB",
    type: "document",
    status: "failed",
    progress: 38,
  },
  {
    id: "f5",
    name: "source-assets.zip",
    size: "540 MB",
    type: "archive",
    status: "uploading",
    progress: 22,
  },
];

export const notifications: NotificationItem[] = [
  {
    id: "n1",
    sender: "Sofia Marchetti",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    subject: "Approved the Aurora storyboard",
    snippet:
      "Looks perfect — ship it to the render farm tonight. I left two small notes on frame 14 and 27.",
    timestamp: "2m ago",
    priority: "high",
    read: false,
    hasAttachment: true,
    threadCount: 4,
  },
  {
    id: "n2",
    sender: "Render Farm",
    avatar:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=120&q=80",
    subject: "Job #4821 completed in 14m 22s",
    snippet:
      "All 312 frames exported at 4K. Average GPU utilisation was 91% across the cluster.",
    timestamp: "18m ago",
    priority: "normal",
    read: false,
    hasAttachment: false,
  },
  {
    id: "n3",
    sender: "Daniel Cho",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    subject: "Re: Color script feedback",
    snippet:
      "Can we push the teal in act two a bit warmer? It's reading a touch cold against the amber keys.",
    timestamp: "1h ago",
    priority: "normal",
    read: true,
    hasAttachment: false,
    threadCount: 2,
  },
  {
    id: "n4",
    sender: "Finance Bot",
    avatar:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=120&q=80",
    subject: "October invoice is ready",
    snippet:
      "Your Studio plan invoice for $1,053.00 has been generated and emailed to billing@studio.co.",
    timestamp: "Yesterday",
    priority: "low",
    read: true,
    hasAttachment: true,
  },
];

export const eventBooking: EventBooking = {
  title: "Frontier Design Summit 2026",
  category: "Conference · 2 days",
  cover:
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
  day: "14",
  month: "MAR",
  time: "09:30 – 18:00 WAT",
  location: "Eko Convention Center, Lagos",
  seatsLeft: 23,
  totalSeats: 480,
  attendees: [
    {
      src: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=120&q=80",
      alt: "Attendee portrait of a smiling man",
    },
    {
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80",
      alt: "Attendee portrait of a woman with red hair",
    },
    {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      alt: "Attendee portrait of a man in a denim shirt",
    },
    {
      src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
      alt: "Attendee portrait of a woman with glasses",
    },
  ],
};

export const aiGenerationResult: AIGenerationResult = {
  prompt:
    "A lone astronaut discovering a bioluminescent forest on an alien moon, volumetric fog, cinematic, 35mm, amber and teal grade",
  model: "Aurora-XL · v4.2",
  qualityScore: 94,
  generationTime: "8.4s",
  resultImage:
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
  state: "completed",
};
