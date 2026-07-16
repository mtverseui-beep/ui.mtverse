export type PersonStatus = "active" | "invited" | "suspended";
export type PersonRole = "Admin" | "Editor" | "Analyst" | "Viewer";

export interface PersonRecord {
  id: string;
  name: string;
  email: string;
  role: PersonRole;
  status: PersonStatus;
  team: string;
  region: string;
  lastSeen: string;
  spend: number;
}

const NAMES = ["Alex Morgan", "Sarah Chen", "James Wilson", "Emily Davis", "Michael Brown", "Jessica Taylor", "David Lee", "Lisa Anderson", "Tom Harris", "Anna Martinez", "Chris Evans", "Nina Patel", "Robert Kim", "Maria Garcia", "Daniel Foster", "Olivia Wang", "Ryan Murphy", "Sophie Turner"];
const TEAMS = ["Platform", "Design", "Revenue", "Operations", "Security", "Growth"];
const REGIONS = ["North America", "Europe", "Asia Pacific"];
const ROLES: PersonRole[] = ["Admin", "Editor", "Analyst", "Viewer"];
const STATUSES: PersonStatus[] = ["active", "active", "invited", "active", "suspended"];

export const people: PersonRecord[] = NAMES.map((name, index) => ({
  id: `USR-${String(index + 1).padStart(3, "0")}`,
  name,
  email: `${name.toLowerCase().replace(" ", ".")}@northstar.io`,
  role: ROLES[index % ROLES.length],
  status: STATUSES[index % STATUSES.length],
  team: TEAMS[index % TEAMS.length],
  region: REGIONS[index % REGIONS.length],
  lastSeen: index % 5 === 2 ? "Invitation pending" : `${index * 7 + 2} min ago`,
  spend: 840 + ((index * 1739) % 12400),
}));

export interface MarketRecord {
  symbol: string;
  company: string;
  price: number;
  change: number;
  volume: string;
  cap: string;
  sparkline: number[];
}
export const markets: MarketRecord[] = [
  { symbol: "NVDA", company: "NVIDIA", price: 875.3, change: 2.6, volume: "45.6M", cap: "$2.16T", sparkline: [54, 58, 57, 62, 66, 65, 71, 76] },
  { symbol: "MSFT", company: "Microsoft", price: 415.2, change: 1.38, volume: "21.4M", cap: "$3.08T", sparkline: [44, 48, 53, 50, 57, 61, 64, 68] },
  { symbol: "AAPL", company: "Apple", price: 182.52, change: 1.3, volume: "52.3M", cap: "$2.83T", sparkline: [62, 59, 57, 61, 58, 65, 63, 67] },
  { symbol: "AMZN", company: "Amazon", price: 178.15, change: -0.25, volume: "35.7M", cap: "$1.85T", sparkline: [66, 64, 60, 63, 58, 55, 57, 54] },
  { symbol: "META", company: "Meta Platforms", price: 502.95, change: -0.75, volume: "15.3M", cap: "$1.28T", sparkline: [71, 68, 66, 69, 62, 64, 59, 57] },
  { symbol: "TSLA", company: "Tesla", price: 248.5, change: 3.72, volume: "89.2M", cap: "$791B", sparkline: [42, 46, 51, 48, 56, 62, 61, 72] },
  { symbol: "GOOGL", company: "Alphabet", price: 142.68, change: -0.85, volume: "28.1M", cap: "$1.78T", sparkline: [67, 63, 65, 59, 61, 55, 57, 52] },
  { symbol: "NFLX", company: "Netflix", price: 612.4, change: 0.69, volume: "8.7M", cap: "$265B", sparkline: [48, 53, 50, 56, 59, 58, 63, 65] },
];

export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Review";
export interface OrderRecord {
  id: string;
  customer: string;
  email: string;
  channel: "Web" | "Mobile" | "Marketplace";
  status: OrderStatus;
  payment: "Paid" | "Pending" | "Refunded";
  risk: "Low" | "Medium" | "High";
  total: number;
  created: string;
  region: string;
  items: number;
}
const ORDER_STATUSES: OrderStatus[] = ["Pending", "Processing", "Shipped", "Delivered", "Review"];
export const orders: OrderRecord[] = Array.from({ length: 48 }, (_, index) => ({
  id: `ORD-${10482 + index}`,
  customer: NAMES[index % NAMES.length],
  email: `${NAMES[index % NAMES.length].toLowerCase().replace(" ", ".")}@email.com`,
  channel: (["Web", "Mobile", "Marketplace"] as const)[index % 3],
  status: ORDER_STATUSES[index % ORDER_STATUSES.length],
  payment: (["Paid", "Paid", "Pending", "Refunded"] as const)[index % 4],
  risk: (["Low", "Low", "Medium", "High"] as const)[index % 4],
  total: 129 + ((index * 347) % 4800),
  created: `Jul ${String(28 - (index % 24)).padStart(2, "0")}, 2026`,
  region: REGIONS[index % REGIONS.length],
  items: 1 + (index % 6),
}));

export interface TreeRecord { id: string; name: string; type: "group" | "person"; role?: string; status?: PersonStatus; children?: TreeRecord[] }
export const organization: TreeRecord[] = [
  { id: "engineering", name: "Engineering", type: "group", children: [
    { id: "platform", name: "Platform", type: "group", children: [
      { id: "alex", name: "Alex Morgan", type: "person", role: "Principal Engineer", status: "active" },
      { id: "sarah", name: "Sarah Chen", type: "person", role: "Senior Engineer", status: "active" },
    ] },
    { id: "security", name: "Security", type: "group", children: [
      { id: "david", name: "David Lee", type: "person", role: "Security Lead", status: "active" },
      { id: "james", name: "James Wilson", type: "person", role: "Security Analyst", status: "invited" },
    ] },
  ] },
  { id: "product", name: "Product & Design", type: "group", children: [
    { id: "emily", name: "Emily Davis", type: "person", role: "Product Director", status: "active" },
    { id: "jessica", name: "Jessica Taylor", type: "person", role: "Design Lead", status: "active" },
  ] },
  { id: "revenue", name: "Revenue", type: "group", children: [
    { id: "anna", name: "Anna Martinez", type: "person", role: "VP Revenue", status: "active" },
    { id: "tom", name: "Tom Harris", type: "person", role: "Account Executive", status: "suspended" },
  ] },
];

export const virtualRows = Array.from({ length: 5000 }, (_, index) => ({
  id: `EVT-${String(index + 1).padStart(5, "0")}`,
  event: ["Deployment completed", "API key rotated", "Invoice processed", "Member invited", "Policy evaluated"][index % 5],
  actor: NAMES[index % NAMES.length],
  environment: (["Production", "Staging", "Development"] as const)[index % 3],
  severity: (["Info", "Success", "Warning"] as const)[index % 3],
  duration: `${42 + ((index * 19) % 850)} ms`,
}));

export interface InventoryRecord { sku: string; product: string; category: string; warehouse: string; stock: number; reserved: number; reorderAt: number; price: number }
export const inventory: InventoryRecord[] = Array.from({ length: 20 }, (_, index) => ({
  sku: `SKU-${String(4200 + index)}`,
  product: ["Studio headphones", "Mechanical keyboard", "4K display", "Travel charger", "Ergonomic mouse", "Laptop stand", "Conference camera", "USB-C dock"][index % 8],
  category: ["Audio", "Accessories", "Displays", "Power"][index % 4],
  warehouse: ["San Francisco", "Amsterdam", "Singapore"][index % 3],
  stock: 4 + ((index * 17) % 96),
  reserved: 1 + ((index * 7) % 18),
  reorderAt: 18 + (index % 4) * 4,
  price: 49 + ((index * 83) % 850),
}));

export type InvoiceStatus = "Paid" | "Due" | "Overdue" | "Draft";
export interface InvoiceRecord { id: string; customer: string; email: string; issued: string; due: string; status: InvoiceStatus; amount: number }
export const invoices: InvoiceRecord[] = Array.from({ length: 18 }, (_, index) => ({
  id: `INV-${String(2081 + index)}`,
  customer: NAMES[index % NAMES.length],
  email: `${NAMES[index % NAMES.length].toLowerCase().replace(" ", ".")}@company.io`,
  issued: `Jul ${String(2 + (index % 18)).padStart(2, "0")}, 2026`,
  due: `Aug ${String(2 + (index % 18)).padStart(2, "0")}, 2026`,
  status: (["Paid", "Due", "Overdue", "Draft", "Paid"] as const)[index % 5],
  amount: 620 + ((index * 941) % 9200),
}));

export const permissionRows = ["View workspace", "Create projects", "Manage billing", "Invite members", "Export data", "Manage security"] as const;
export const planFeatures = [
  { feature: "Team members", starter: "5", pro: "Unlimited", enterprise: "Unlimited" },
  { feature: "Storage", starter: "10 GB", pro: "1 TB", enterprise: "Custom" },
  { feature: "Audit history", starter: "7 days", pro: "1 year", enterprise: "Unlimited" },
  { feature: "SSO / SAML", starter: "—", pro: "Add-on", enterprise: "Included" },
  { feature: "Support", starter: "Community", pro: "Priority", enterprise: "Dedicated" },
  { feature: "Data residency", starter: "—", pro: "—", enterprise: "Included" },
];
