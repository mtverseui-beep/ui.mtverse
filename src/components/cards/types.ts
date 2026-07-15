// Shared types for the Advanced Card Components Showcase.

export type FolderPreviewImage = {
  src: string;
  alt: string;
};

export type FolderProject = {
  id: string;
  title: string;
  status: "Synced" | "Rendering" | "Draft" | "Archived";
  itemCount: number;
  lastUpdated: string;
  accent: "cyan" | "amber" | "violet";
  previews: FolderPreviewImage[];
};

export type GlassFeature = {
  badge: string;
  title: string;
  description: string;
  imageUrl: string;
  stats: { label: string; value: string }[];
  details: { label: string; value: string }[];
};

export type PricingPlan = {
  name: string;
  price: number;
  billingPeriod: string;
  tagline: string;
  features: { label: string; included: boolean }[];
  ctaLabel: string;
  popular: boolean;
  trustMicrocopy: string;
};

export type AnalyticsPoint = {
  label: string;
  value: number;
};

export type AnalyticsInsight = {
  metric: string;
  kpi: number;
  prefix?: string;
  suffix?: string;
  deltaPct: number;
  comparison: string;
  tooltip: string;
  segments: { label: string; value: string; active: boolean }[];
  series: number[];
};

export type CreatorProfile = {
  name: string;
  role: string;
  location: string;
  verified: boolean;
  avatar: string;
  cover: string;
  followers: string;
  following: string;
  projects: string;
  skills: string[];
  works: { src: string; alt: string }[];
};

export type ProductColor = {
  name: string;
  hex: string;
};

export type EcommerceProduct = {
  title: string;
  category: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice: number;
  discountPct: number;
  stock: number;
  stockLabel: string;
  image: string;
  gallery: string[];
  colors: ProductColor[];
};

export type UploadFile = {
  id: string;
  name: string;
  size: string;
  type: "image" | "video" | "audio" | "document" | "archive";
  status: "uploading" | "processing" | "success" | "failed";
  progress: number;
  thumbnail?: string;
};

export type NotificationItem = {
  id: string;
  sender: string;
  avatar: string;
  subject: string;
  snippet: string;
  timestamp: string;
  priority: "high" | "normal" | "low";
  read: boolean;
  hasAttachment: boolean;
  threadCount?: number;
};

export type EventBooking = {
  title: string;
  category: string;
  cover: string;
  day: string;
  month: string;
  time: string;
  location: string;
  seatsLeft: number;
  totalSeats: number;
  attendees: { src: string; alt: string }[];
};

export type AIGenerationResult = {
  prompt: string;
  model: string;
  qualityScore: number;
  generationTime: string;
  resultImage: string;
  state: "completed" | "refining" | "failed";
};
