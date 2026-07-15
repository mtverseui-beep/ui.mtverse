"use client";
import { useState, useMemo, useCallback, useRef, useEffect, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ChevronUp, ChevronDown, ChevronsUpDown, MoreHorizontal,
  ChevronLeft, ChevronRight, ChevronRight as ExpandIcon,
  Sun, Moon, Check, X, Filter, Download, RefreshCw, Columns,
  Minus, Plus, Eye, Edit3, Copy, Trash2, Clock, Loader2,
  Package, CreditCard, Truck, ShieldAlert, Globe, User,
  AlertCircle, Star, Save,
} from "lucide-react";
import { useVirtualizer } from "@tanstack/react-virtual";

const EASE = [0.16, 1, 0.3, 1] as const;

interface GridCheckboxProps {
  checked: boolean;
  onChange: () => void;
  accent: string;
  isDark: boolean;
  indeterminate?: boolean;
}

function GridCheckbox({ checked, onChange, accent, isDark, indeterminate }: GridCheckboxProps) {
  return (
    <button
      onClick={(event) => {
        event.stopPropagation();
        onChange();
      }}
      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition"
      style={{
        borderColor: checked || indeterminate ? accent : isDark ? "#3f3f4a" : "#d4d4d8",
        background: checked || indeterminate ? accent : "transparent",
      }}
    >
      {indeterminate ? (
        <div className="h-0.5 w-2.5 rounded-full bg-white" />
      ) : checked ? (
        <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
      ) : null}
    </button>
  );
}

// ────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────
type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
type FulfillmentStatus = "unfulfilled" | "partial" | "fulfilled";
type PaymentStatus = "paid" | "pending" | "failed" | "refunded";
type RiskLevel = "low" | "medium" | "high";
type Channel = "web" | "mobile" | "pos" | "marketplace";
type Density = "compact" | "cozy" | "comfortable";

interface Order {
  id: string;
  orderId: string;
  customer: string;
  customerEmail: string;
  products: string[];
  productThumbs: string[];
  channel: Channel;
  payment: PaymentStatus;
  orderStatus: OrderStatus;
  fulfillment: FulfillmentStatus;
  risk: RiskLevel;
  total: number;
  currency: string;
  country: string;
  countryFlag: string;
  owner: string;
  ownerAvatar: string;
  createdAt: string;
  createdAtDate: string; // ISO date string for deterministic comparison
  shippingAddress: string;
  trackingNumber: string;
  paymentTimeline: { label: string; time: string; done: boolean }[];
  notes: string;
  riskAssessment: string;
  orderHistory: { action: string; time: string; user: string }[];
}

// ────────────────────────────────────────────────────────────
// Mock Data — 50 realistic ecommerce orders
// ────────────────────────────────────────────────────────────
const CUSTOMER_NAMES = ["Alex Morgan", "Sarah Chen", "James Wilson", "Emily Davis", "Michael Brown", "Jessica Taylor", "David Lee", "Lisa Anderson", "Tom Harris", "Anna Martinez", "Chris Evans", "Nina Patel", "Robert Kim", "Maria Garcia", "Daniel Foster", "Olivia Wang", "Ryan Murphy", "Sophie Turner", "Kevin Hart", "Rachel Green"];
const COUNTRIES = [
  { name: "United States", flag: "US" }, { name: "United Kingdom", flag: "GB" },
  { name: "Germany", flag: "DE" }, { name: "France", flag: "FR" },
  { name: "Japan", flag: "JP" }, { name: "Australia", flag: "AU" },
  { name: "Canada", flag: "CA" }, { name: "Brazil", flag: "BR" },
  { name: "India", flag: "IN" }, { name: "Netherlands", flag: "NL" },
];
const PRODUCTS = [
  ["Wireless Headphones Pro", "USB-C Cable"],
  ["Mechanical Keyboard", "Mouse Pad XL"],
  ["4K Monitor 27\"", "Monitor Stand"],
  ["Smart Watch Series 8", "Watch Band Sport"],
  ["Laptop Stand Aluminum", "Webcam 1080p"],
  ["Bluetooth Speaker Mini", "Carrying Case"],
  ["Gaming Mouse RGB", "Mouse Bungee"],
  ["USB Hub 7-in-1", "HDMI Cable 2m"],
  ["Desk Lamp LED", "Cable Organizer"],
  ["Phone Case Premium", "Screen Protector"],
];
const CHANNELS: Channel[] = ["web", "mobile", "pos", "marketplace"];
const ORDER_STATUSES: OrderStatus[] = ["pending", "processing", "shipped", "delivered", "cancelled", "refunded"];
const FULFILLMENT: FulfillmentStatus[] = ["unfulfilled", "partial", "fulfilled"];
const PAYMENT_STATUSES: PaymentStatus[] = ["paid", "pending", "failed", "refunded"];
const RISK_LEVELS: RiskLevel[] = ["low", "medium", "high"];
const AVATARS = CUSTOMER_NAMES.map((_, i) => `https://i.pravatar.cc/80?img=${i + 1}`);

function generateOrders(): Order[] {
  return Array.from({ length: 50 }, (_, i) => {
    const customerIdx = i % CUSTOMER_NAMES.length;
    const countryIdx = i % COUNTRIES.length;
    const productIdx = i % PRODUCTS.length;
    // Deterministic values — NO Math.random(), NO Date.now(), NO toISOString() to avoid hydration mismatch
    const daysAgo = (i * 7 + 3) % 30;
    const day = 15 - daysAgo;
    const dateStr = `2025-07-${String(day).padStart(2, "0")}`;
    const orderStatus = ORDER_STATUSES[i % ORDER_STATUSES.length];
    const fulfillment = orderStatus === "delivered" ? "fulfilled" : orderStatus === "shipped" ? "partial" : FULFILLMENT[i % 3];
    const payment = orderStatus === "refunded" ? "refunded" : orderStatus === "cancelled" ? "failed" : i % 4 === 0 ? "pending" : "paid";
    const total = ((i * 137 + 89) % 5000) + 50 + ((i * 13) % 100) / 1;
    return {
      id: String(i + 1),
      orderId: `ORD-${String(10000 + i)}`,
      customer: CUSTOMER_NAMES[customerIdx],
      customerEmail: CUSTOMER_NAMES[customerIdx].toLowerCase().replace(" ", ".") + "@email.com",
      products: PRODUCTS[productIdx],
      productThumbs: PRODUCTS[productIdx].map((_, j) => `https://picsum.photos/seed/${i}-${j}/80/80`),
      channel: CHANNELS[i % 4],
      payment,
      orderStatus,
      fulfillment,
      risk: RISK_LEVELS[i % 3],
      total,
      currency: "USD",
      country: COUNTRIES[countryIdx].name,
      countryFlag: COUNTRIES[countryIdx].flag,
      owner: CUSTOMER_NAMES[(i + 3) % CUSTOMER_NAMES.length],
      ownerAvatar: AVATARS[(i + 3) % CUSTOMER_NAMES.length],
      createdAt: dateStr,
      createdAtDate: dateStr, // string for deterministic comparison
      shippingAddress: `${100 + i} Main St, ${COUNTRIES[countryIdx].name}`,
      trackingNumber: i % 3 === 0 ? "" : `TRK${String(800000 + i * 137)}`,
      paymentTimeline: [
        { label: "Order placed", time: `${dateStr} 09:00`, done: true },
        { label: "Payment received", time: payment === "paid" ? `${dateStr} 10:00` : "", done: payment === "paid" },
        { label: "Processing", time: orderStatus !== "pending" ? `${dateStr} 11:00` : "", done: orderStatus !== "pending" },
        { label: "Shipped", time: orderStatus === "shipped" || orderStatus === "delivered" ? `${dateStr} 14:00` : "", done: orderStatus === "shipped" || orderStatus === "delivered" },
        { label: "Delivered", time: orderStatus === "delivered" ? `${dateStr} 18:00` : "", done: orderStatus === "delivered" },
      ],
      notes: i % 3 === 0 ? `Customer requested gift wrapping. Priority shipping approved by manager.` : `Standard processing. No special instructions.`,
      riskAssessment: RISK_LEVELS[i % 3] === "high" ? "Multiple failed payment attempts. IP geolocation mismatch. Recommend manual review." : RISK_LEVELS[i % 3] === "medium" ? "First-time customer with high order value. Address verification passed." : "Verified returning customer. Low risk profile.",
      orderHistory: [
        { action: "Order created", time: `${dateStr} 09:00`, user: "System" },
        { action: `Payment ${payment}`, time: `${dateStr} 10:00`, user: "Payment Gateway" },
        { action: `Status changed to ${orderStatus}`, time: `${dateStr} 14:00`, user: CUSTOMER_NAMES[(i + 5) % CUSTOMER_NAMES.length] },
      ],
    };
  });
}

// ────────────────────────────────────────────────────────────
// Style Maps
// ────────────────────────────────────────────────────────────
const ORDER_STATUS_STYLES: Record<OrderStatus, { bg: string; color: string; dot: string }> = {
  pending: { bg: "#f59e0b15", color: "#f59e0b", dot: "#f59e0b" },
  processing: { bg: "#3b82f615", color: "#3b82f6", dot: "#3b82f6" },
  shipped: { bg: "#8b5cf615", color: "#8b5cf6", dot: "#8b5cf6" },
  delivered: { bg: "#10b98115", color: "#10b981", dot: "#10b981" },
  cancelled: { bg: "#ef444415", color: "#ef4444", dot: "#ef4444" },
  refunded: { bg: "#6b728015", color: "#6b7280", dot: "#6b7280" },
};
const PAYMENT_STYLES: Record<PaymentStatus, { bg: string; color: string }> = {
  paid: { bg: "#10b98115", color: "#10b981" },
  pending: { bg: "#f59e0b15", color: "#f59e0b" },
  failed: { bg: "#ef444415", color: "#ef4444" },
  refunded: { bg: "#6b728015", color: "#6b7280" },
};
const FULFILLMENT_STYLES: Record<FulfillmentStatus, { bg: string; color: string }> = {
  unfulfilled: { bg: "#94a3b815", color: "#94a3b8" },
  partial: { bg: "#06b6d415", color: "#06b6d4" },
  fulfilled: { bg: "#10b98115", color: "#10b981" },
};
const RISK_STYLES: Record<RiskLevel, { bg: string; color: string }> = {
  low: { bg: "#10b98115", color: "#10b981" },
  medium: { bg: "#f59e0b15", color: "#f59e0b" },
  high: { bg: "#ef444415", color: "#ef4444" },
};
const CHANNEL_ICONS: Record<Channel, string> = { web: "W", mobile: "M", pos: "P", marketplace: "MK" };

const DENSITY_PADDING: Record<Density, { cell: string; header: string; rowHeight: number }> = {
  compact: { cell: "py-1.5 px-2.5", header: "py-1.5", rowHeight: 36 },
  cozy: { cell: "py-2.5 px-3", header: "py-2.5", rowHeight: 48 },
  comfortable: { cell: "py-3.5 px-3", header: "py-3", rowHeight: 56 },
};

// ────────────────────────────────────────────────────────────
// Column definitions
// ────────────────────────────────────────────────────────────
interface ColumnDef {
  key: string;
  label: string;
  visible: boolean;
  width: number;
  sortable: boolean;
  pinned?: boolean;
}

const DEFAULT_COLUMNS: ColumnDef[] = [
  { key: "orderId", label: "Order ID", visible: true, width: 110, sortable: true, pinned: true },
  { key: "customer", label: "Customer", visible: true, width: 160, sortable: true, pinned: true },
  { key: "products", label: "Products", visible: true, width: 200, sortable: false },
  { key: "channel", label: "Channel", visible: true, width: 90, sortable: true },
  { key: "payment", label: "Payment", visible: true, width: 100, sortable: true },
  { key: "orderStatus", label: "Status", visible: true, width: 120, sortable: true },
  { key: "fulfillment", label: "Fulfillment", visible: true, width: 110, sortable: true },
  { key: "risk", label: "Risk", visible: true, width: 80, sortable: true },
  { key: "total", label: "Total", visible: true, width: 100, sortable: true },
  { key: "country", label: "Country", visible: true, width: 120, sortable: true },
  { key: "owner", label: "Owner", visible: true, width: 130, sortable: true },
  { key: "createdAt", label: "Created", visible: true, width: 110, sortable: true },
  { key: "actions", label: "", visible: true, width: 50, sortable: false },
];

// ────────────────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────────────────
export function EnterpriseDataGrid() {
  const [isDark, setIsDark] = useState(true);
  const [orders, setOrders] = useState<Order[]>(generateOrders);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | null>("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [columns, setColumns] = useState<ColumnDef[]>(DEFAULT_COLUMNS);
  const [density, setDensity] = useState<Density>("cozy");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [actionMenuId, setActionMenuId] = useState<string | null>(null);
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filterStatus, setFilterStatus] = useState<Set<OrderStatus>>(new Set());
  const [filterPayment, setFilterPayment] = useState<Set<PaymentStatus>>(new Set());
  const [filterRisk, setFilterRisk] = useState<Set<RiskLevel>>(new Set());
  const [filterChannel, setFilterChannel] = useState<Set<Channel>>(new Set());
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [savedViews, setSavedViews] = useState<{ name: string; filters: string }[]>([
    { name: "High Risk Orders", filters: "risk:high" },
    { name: "Pending Payments", filters: "payment:pending" },
    { name: "Unfulfilled", filters: "fulfillment:unfulfilled" },
  ]);
  const [activeView, setActiveView] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loadingState, setLoadingState] = useState<"idle" | "loading" | "error">("idle");
  const [editingCell, setEditingCell] = useState<{ id: string; field: string } | null>(null);
  const [editValue, setEditValue] = useState("");
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; orderId: string } | null>(null);
  const [pageMenuOpen, setPageMenuOpen] = useState(false);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const columnMenuRef = useRef<HTMLDivElement>(null);

  // Theme
  const bg = isDark ? "#0a0a0f" : "#ffffff";
  const panelBg = isDark ? "#0f0f17" : "#ffffff";
  const headerBg = isDark ? "#0d0d14" : "#f8fafc";
  const rowHover = isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.02)";
  const selectedBg = isDark ? "rgba(99,102,241,0.08)" : "rgba(99,102,241,0.05)";
  const stripeBg = isDark ? "rgba(255,255,255,0.012)" : "rgba(0,0,0,0.012)";
  // For sticky cells, even rows must use solid bg (not "transparent") to prevent see-through when scrolling
  const evenRowBg = bg; // solid background for even rows
  const oddRowBg = isDark ? "#0c0c12" : "#fafafa"; // solid stripe for odd rows
  const border = isDark ? "#1f1f2a" : "#e4e4e7";
  const textPrimary = isDark ? "#fafafa" : "#09090b";
  const textSecondary = isDark ? "#a1a1aa" : "#52525b";
  const textMuted = isDark ? "#71717a" : "#a1a1aa";
  const inputBg = isDark ? "#14141c" : "#f4f4f5";
  const accent = "#6366f1";
  const dens = DENSITY_PADDING[density];

  // Close menus on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (columnMenuRef.current && !columnMenuRef.current.contains(e.target as Node)) setShowColumnMenu(false);
      setActionMenuId(null);
      setPageMenuOpen(false);
      setContextMenu(null);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setLoadingState("loading");
    setTimeout(() => { setIsRefreshing(false); setLoadingState("idle"); }, 1200);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); document.getElementById("edg-search")?.focus(); }
      if (e.key === "r" && !e.metaKey && !e.ctrlKey) { e.preventDefault(); handleRefresh(); }
      if (e.key === "Escape") { setExpandedRow(null); setActionMenuId(null); setContextMenu(null); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleRefresh]);
  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setOrders(prev => {
        const idx = prev.length > 0 ? 0 : 0;
        const next = [...prev];
        const statuses: OrderStatus[] = ["processing", "shipped", "delivered"];
        if (next[idx].orderStatus === "pending" || next[idx].orderStatus === "processing") {
          const currentIdx = statuses.indexOf(next[idx].orderStatus as any);
          if (currentIdx >= 0 && currentIdx < statuses.length - 1) {
            next[idx] = { ...next[idx], orderStatus: statuses[currentIdx + 1] };
          }
        }
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [isLive]);

  // Filter
  const filtered = useMemo(() => {
    let result = [...orders];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(o =>
        o.orderId.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(q) ||
        o.products.join(" ").toLowerCase().includes(q) ||
        o.country.toLowerCase().includes(q)
      );
    }
    if (filterStatus.size > 0) result = result.filter(o => filterStatus.has(o.orderStatus));
    if (filterPayment.size > 0) result = result.filter(o => filterPayment.has(o.payment));
    if (filterRisk.size > 0) result = result.filter(o => filterRisk.has(o.risk));
    if (filterChannel.size > 0) result = result.filter(o => filterChannel.has(o.channel));
    if (minAmount) result = result.filter(o => o.total >= parseFloat(minAmount));
    if (maxAmount) result = result.filter(o => o.total <= parseFloat(maxAmount));
    if (dateFrom) result = result.filter(o => o.createdAtDate >= dateFrom);
    if (dateTo) result = result.filter(o => o.createdAtDate <= dateTo);
    return result;
  }, [orders, search, filterStatus, filterPayment, filterRisk, filterChannel, minAmount, maxAmount, dateFrom, dateTo]);

  // Sort
  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      let cmp = 0;
      const av = (a as any)[sortKey], bv = (b as any)[sortKey];
      if (typeof av === "number") cmp = av - bv;
      else if (typeof av === "string" && typeof bv === "string") cmp = av.localeCompare(bv);
      else cmp = String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  // Pagination
  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = useCallback((key: string) => {
    if (sortKey === key) {
      setSortDir(d => d === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }, [sortKey]);

  const handleSelectAll = useCallback(() => {
    if (selected.size === paginated.length) setSelected(new Set());
    else setSelected(new Set(paginated.map(o => o.id)));
  }, [selected, paginated]);

  const handleSelect = useCallback((id: string) => {
    setSelected(prev => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  }, []);

  const handleDelete = useCallback((id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
    setSelected(prev => { const n = new Set(prev); n.delete(id); return n; });
    setActionMenuId(null);
  }, []);

  const handleDuplicate = useCallback((id: string) => {
    const order = orders.find(o => o.id === id);
    if (order) {
      const newId = String(orders.length + 1);
      setOrders(prev => [...prev, { ...order, id: newId, orderId: `ORD-${String(10000 + prev.length)}` }]);
    }
    setActionMenuId(null);
  }, [orders]);

  const handleInlineSave = useCallback((id: string, field: string, value: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, [field]: value } : o));
    setEditingCell(null);
  }, []);

  const toggleFilter = useCallback(<T,>(set: Set<T>, value: T, setter: (s: Set<T>) => void) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value); else next.add(value);
    setter(next);
    setPage(1);
  }, []);

  const visibleColumns = columns.filter(c => c.visible);
  const allSelected = selected.size === paginated.length && paginated.length > 0;
  const someSelected = selected.size > 0 && !allSelected;
  const activeFilterCount = filterStatus.size + filterPayment.size + filterRisk.size + filterChannel.size + (minAmount || maxAmount ? 1 : 0) + (dateFrom || dateTo ? 1 : 0);

  // Status badge
  const Badge = ({ label, styles }: { label: string; styles: { bg: string; color: string; dot?: string } }) => (
    <span className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[10px] font-bold capitalize" style={{ background: styles.bg, color: styles.color }}>
      {styles.dot && <span className="h-1.5 w-1.5 rounded-full" style={{ background: styles.dot }} />}
      {label}
    </span>
  );

  // Context menu handler
  const handleContextMenu = useCallback((e: React.MouseEvent, orderId: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, orderId });
  }, []);

  return (
    <div className="flex h-full min-h-full w-full overflow-hidden font-sans" style={{ background: bg, color: textPrimary }} onContextMenu={(e) => { if (contextMenu) { e.preventDefault(); setContextMenu(null); } }}>
      <div className="flex min-w-0 flex-1 flex-col">
        {/* ── Header ── */}
        <header className="flex h-14 shrink-0 items-center gap-2 px-4" style={{ borderBottom: `1px solid ${border}`, background: panelBg }}>
          <h1 className="text-[15px] font-bold" style={{ color: textPrimary }}>Orders</h1>
          <span className="rounded-md px-2 py-0.5 text-[10px] font-bold" style={{ background: `${accent}15`, color: accent }}>{filtered.length}</span>

          {/* Live indicator */}
          <button onClick={() => setIsLive(!isLive)} className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[10px] font-bold transition" style={{ background: isLive ? "#10b98115" : "transparent", color: isLive ? "#10b981" : textMuted, border: `1px solid ${isLive ? "#10b98140" : border}` }}>
            <span className={`h-1.5 w-1.5 rounded-full ${isLive ? "animate-pulse" : ""}`} style={{ background: isLive ? "#10b981" : textMuted }} />
            {isLive ? "Live" : "Paused"}
          </button>

          <div className="flex-1" />

          {/* Saved views */}
          <div className="flex items-center gap-1">
            {savedViews.map(view => (
              <button key={view.name} onClick={() => setActiveView(activeView === view.name ? null : view.name)} className="rounded-md px-2 py-1 text-[10px] font-medium transition" style={{ background: activeView === view.name ? `${accent}15` : "transparent", color: activeView === view.name ? accent : textMuted, border: `1px solid ${activeView === view.name ? accent : border}` }}>
                {view.name}
              </button>
            ))}
          </div>

          <div className="h-5 w-px" style={{ background: border }} />

          {/* Search */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: textMuted }} />
            <input id="edg-search" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search orders..." className="w-48 rounded-lg border py-1.5 pl-8 pr-8 text-[12px] outline-none focus:ring-1" style={{ background: inputBg, borderColor: border, color: textPrimary }} />
            <kbd className="absolute right-2 top-1/2 -translate-y-1/2 rounded border px-1 text-[8px] font-bold" style={{ borderColor: border, color: textMuted }}>⌘K</kbd>
          </div>

          {/* Filter */}
          <button onClick={() => setShowFilterPanel(!showFilterPanel)} className="flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[12px] font-medium transition" style={{ background: showFilterPanel || activeFilterCount > 0 ? `${accent}10` : "transparent", borderColor: showFilterPanel || activeFilterCount > 0 ? accent : border, color: showFilterPanel || activeFilterCount > 0 ? accent : textSecondary }}>
            <Filter className="h-3.5 w-3.5" />
            {activeFilterCount > 0 && <span className="flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold text-white" style={{ background: accent }}>{activeFilterCount}</span>}
          </button>

          {/* Column toggle */}
          <div ref={columnMenuRef} className="relative">
            <button onClick={(e) => { e.stopPropagation(); setShowColumnMenu(!showColumnMenu); }} className="flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[12px] font-medium transition" style={{ borderColor: border, color: textSecondary }}>
              <Columns className="h-3.5 w-3.5" />
            </button>
            <AnimatePresence>
              {showColumnMenu && (
                <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.12 }} className="absolute right-0 top-full z-50 mt-1 w-44 rounded-xl border p-1.5 shadow-xl" style={{ background: panelBg, borderColor: border }} onClick={e => e.stopPropagation()}>
                  <p className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Toggle Columns</p>
                  {columns.filter(c => c.key !== "actions").map(col => (
                    <button key={col.key} onClick={() => setColumns(prev => prev.map(c => c.key === col.key ? { ...c, visible: !c.visible } : c))} className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[12px] transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textPrimary }}>
                      <div className="flex h-4 w-4 items-center justify-center rounded border-2 transition" style={{ borderColor: col.visible ? accent : textMuted, background: col.visible ? accent : "transparent" }}>{col.visible && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />}</div>
                      {col.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Density */}
          <div className="flex items-center gap-0.5 rounded-lg p-0.5" style={{ background: inputBg }}>
            {(["compact", "cozy", "comfortable"] as Density[]).map(d => (
              <button key={d} onClick={() => setDensity(d)} className="rounded-md px-2 py-1 text-[9px] font-medium capitalize transition" style={{ background: density === d ? accent : "transparent", color: density === d ? "#fff" : textMuted }}>{d[0].toUpperCase()}</button>
            ))}
          </div>

          {/* Refresh */}
          <button onClick={handleRefresh} className="flex h-8 w-8 items-center justify-center rounded-lg border transition" style={{ borderColor: border, color: textSecondary }} title="Refresh (R)">
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
          </button>

          {/* Export */}
          <button className="flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[12px] font-medium transition hover:bg-black/5 dark:hover:bg-white/5" style={{ borderColor: border, color: textSecondary }}>
            <Download className="h-3.5 w-3.5" /> Export
          </button>

          <div className="h-5 w-px" style={{ background: border }} />
          <button onClick={() => setIsDark(!isDark)} className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </header>

        {/* ── Filter Panel ── */}
        <AnimatePresence>
          {showFilterPanel && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2, ease: EASE }} className="overflow-hidden" style={{ borderBottom: `1px solid ${border}`, background: headerBg }}>
              <div className="flex flex-wrap items-start gap-4 px-4 py-3">
                {/* Status filter */}
                <div>
                  <p className="mb-1.5 text-[9px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Order Status</p>
                  <div className="flex flex-wrap gap-1">
                    {ORDER_STATUSES.map(s => (
                      <button key={s} onClick={() => toggleFilter(filterStatus, s, setFilterStatus)} className="flex items-center gap-1 rounded-md border px-2 py-1 text-[10px] font-medium capitalize transition" style={{ background: filterStatus.has(s) ? ORDER_STATUS_STYLES[s].bg : "transparent", borderColor: filterStatus.has(s) ? ORDER_STATUS_STYLES[s].color : border, color: filterStatus.has(s) ? ORDER_STATUS_STYLES[s].color : textSecondary }}>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: ORDER_STATUS_STYLES[s].dot }} />{s}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Payment filter */}
                <div>
                  <p className="mb-1.5 text-[9px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Payment</p>
                  <div className="flex flex-wrap gap-1">
                    {PAYMENT_STATUSES.map(s => (
                      <button key={s} onClick={() => toggleFilter(filterPayment, s, setFilterPayment)} className="rounded-md border px-2 py-1 text-[10px] font-medium capitalize transition" style={{ background: filterPayment.has(s) ? PAYMENT_STYLES[s].bg : "transparent", borderColor: filterPayment.has(s) ? PAYMENT_STYLES[s].color : border, color: filterPayment.has(s) ? PAYMENT_STYLES[s].color : textSecondary }}>{s}</button>
                    ))}
                  </div>
                </div>
                {/* Risk filter */}
                <div>
                  <p className="mb-1.5 text-[9px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Risk Level</p>
                  <div className="flex flex-wrap gap-1">
                    {RISK_LEVELS.map(s => (
                      <button key={s} onClick={() => toggleFilter(filterRisk, s, setFilterRisk)} className="rounded-md border px-2 py-1 text-[10px] font-medium capitalize transition" style={{ background: filterRisk.has(s) ? RISK_STYLES[s].bg : "transparent", borderColor: filterRisk.has(s) ? RISK_STYLES[s].color : border, color: filterRisk.has(s) ? RISK_STYLES[s].color : textSecondary }}>{s}</button>
                    ))}
                  </div>
                </div>
                {/* Channel filter */}
                <div>
                  <p className="mb-1.5 text-[9px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Channel</p>
                  <div className="flex flex-wrap gap-1">
                    {CHANNELS.map(s => (
                      <button key={s} onClick={() => toggleFilter(filterChannel, s, setFilterChannel)} className="rounded-md border px-2 py-1 text-[10px] font-medium capitalize transition" style={{ background: filterChannel.has(s) ? `${accent}15` : "transparent", borderColor: filterChannel.has(s) ? accent : border, color: filterChannel.has(s) ? accent : textSecondary }}>{s}</button>
                    ))}
                  </div>
                </div>
                {/* Amount range */}
                <div>
                  <p className="mb-1.5 text-[9px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Amount Range ($)</p>
                  <div className="flex items-center gap-1">
                    <input type="number" value={minAmount} onChange={e => { setMinAmount(e.target.value); setPage(1); }} placeholder="Min" className="w-16 rounded-md border px-2 py-1 text-[11px] outline-none" style={{ background: inputBg, borderColor: border, color: textPrimary }} />
                    <span style={{ color: textMuted }}>—</span>
                    <input type="number" value={maxAmount} onChange={e => { setMaxAmount(e.target.value); setPage(1); }} placeholder="Max" className="w-16 rounded-md border px-2 py-1 text-[11px] outline-none" style={{ background: inputBg, borderColor: border, color: textPrimary }} />
                  </div>
                </div>
                {/* Date range */}
                <div>
                  <p className="mb-1.5 text-[9px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Date Range</p>
                  <div className="flex items-center gap-1">
                    <input type="date" value={dateFrom} onChange={e => { setDateFrom(e.target.value); setPage(1); }} className="rounded-md border px-2 py-1 text-[11px] outline-none" style={{ background: inputBg, borderColor: border, color: textPrimary }} />
                    <span style={{ color: textMuted }}>—</span>
                    <input type="date" value={dateTo} onChange={e => { setDateTo(e.target.value); setPage(1); }} className="rounded-md border px-2 py-1 text-[11px] outline-none" style={{ background: inputBg, borderColor: border, color: textPrimary }} />
                  </div>
                </div>
                {/* Clear */}
                {activeFilterCount > 0 && (
                  <button onClick={() => { setFilterStatus(new Set()); setFilterPayment(new Set()); setFilterRisk(new Set()); setFilterChannel(new Set()); setMinAmount(""); setMaxAmount(""); setDateFrom(""); setDateTo(""); }} className="ml-auto self-end flex items-center gap-1 text-[10px] font-medium" style={{ color: "#ef4444" }}>
                    <X className="h-3 w-3" /> Clear all
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Bulk Actions Bar ── */}
        <AnimatePresence>
          {selected.size > 0 && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 40, opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="flex items-center gap-3 px-4" style={{ background: `${accent}08`, borderBottom: `1px solid ${border}` }}>
              <span className="text-[12px] font-semibold" style={{ color: accent }}>{selected.size} selected</span>
              <div className="h-3 w-px" style={{ background: border }} />
              <button onClick={() => { setOrders(prev => prev.filter(o => !selected.has(o.id))); setSelected(new Set()); }} className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: "#ef4444" }}><Trash2 className="h-3.5 w-3.5" /> Delete</button>
              <button className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: textSecondary }}><Download className="h-3.5 w-3.5" /> Export</button>
              <button onClick={() => setSelected(new Set())} className="ml-auto flex items-center gap-1 text-[11px] font-medium" style={{ color: textMuted }}><X className="h-3.5 w-3.5" /> Clear</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Table ── */}
        <div ref={tableContainerRef} className="flex-1 overflow-auto" style={{ scrollbarWidth: "thin" }} onClick={() => { setActionMenuId(null); setContextMenu(null); }}>
          {loadingState === "loading" || isRefreshing ? (
            <div className="flex items-center justify-center py-20"><Loader2 className="h-6 w-6 animate-spin" style={{ color: accent }} /></div>
          ) : loadingState === "error" ? (
            <div className="flex flex-col items-center justify-center py-20"><AlertCircle className="mb-3 h-10 w-10" style={{ color: "#ef4444" }} /><p className="text-[14px] font-semibold" style={{ color: textPrimary }}>Failed to load orders</p><button onClick={handleRefresh} className="mt-4 rounded-lg border px-4 py-2 text-[12px] font-medium" style={{ borderColor: border, color: textSecondary }}>Retry</button></div>
          ) : paginated.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20"><Search className="mb-3 h-10 w-10" style={{ color: textMuted }} /><p className="text-[14px] font-semibold" style={{ color: textPrimary }}>No orders found</p><p className="mt-1 text-[12px]" style={{ color: textMuted }}>Try adjusting your search or filters</p></div>
          ) : (
            <table className="w-full" style={{ borderCollapse: "collapse", minWidth: visibleColumns.reduce((s, c) => s + c.width, 0) }}>
              {/* Header */}
              <thead style={{ position: "sticky", top: 0, zIndex: 10 }}>
                <tr style={{ background: headerBg, borderBottom: `2px solid ${border}` }}>
                  <th className="px-2 py-2" style={{ position: "sticky", left: 0, zIndex: 12, background: headerBg, minWidth: 40, width: 40 }}>
                    <GridCheckbox checked={allSelected} indeterminate={someSelected} onChange={handleSelectAll} accent={accent} isDark={isDark} />
                  </th>
                  <th className="px-1 py-2" style={{ position: "sticky", left: 40, zIndex: 12, background: headerBg, minWidth: 32, width: 32, boxShadow: isDark ? "2px 0 6px rgba(0,0,0,0.3)" : "2px 0 6px rgba(0,0,0,0.08)" }} />
                  {visibleColumns.map(col => {
                    const isPinned = col.pinned;
                    const pinnedBefore = visibleColumns.filter((c, i) => c.pinned && i < visibleColumns.indexOf(col)).reduce((s, c) => s + c.width, 0);
                    const leftOffset = isPinned ? pinnedBefore + 72 : 0; // 72 = 40 (checkbox) + 32 (expand)
                    const isLastPinnedCol = isPinned && !visibleColumns.some((c, j) => j > visibleColumns.indexOf(col) && c.pinned);
                    return (
                      <th key={col.key} className={`${dens.header} text-left text-[10px] font-bold uppercase tracking-wider`} style={{ color: textMuted, width: col.width, minWidth: col.width, position: isPinned ? "sticky" : "relative", left: isPinned ? leftOffset : 0, zIndex: isPinned ? 11 : 10, background: headerBg, borderRight: `1px solid ${border}`, boxShadow: isLastPinnedCol ? isDark ? "2px 0 6px rgba(0,0,0,0.3)" : "2px 0 6px rgba(0,0,0,0.08)" : "none" }}>
                        {col.sortable ? (
                          <button onClick={() => handleSort(col.key)} className="flex items-center gap-1 transition" style={{ color: sortKey === col.key ? accent : textMuted }}>
                            {col.label}
                            {sortKey === col.key ? (sortDir === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />) : <ChevronsUpDown className="h-3 w-3 opacity-40" />}
                          </button>
                        ) : col.label}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              {/* Body */}
              <tbody>
                {paginated.map((order, i) => {
                  const isExpanded = expandedRow === order.id;
                  const isSelected = selected.has(order.id);
                  const rowIndex = (page - 1) * pageSize + i;
                  return (
                    <Fragment key={order.id}>
                      <tr
                        style={{ borderBottom: `1px solid ${border}`, background: isSelected ? selectedBg : rowIndex % 2 === 0 ? evenRowBg : oddRowBg }}
                        onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = rowHover; }}
                        onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = rowIndex % 2 === 0 ? evenRowBg : oddRowBg; }}
                        onContextMenu={(e) => handleContextMenu(e, order.id)}
                      >
                        {/* Checkbox */}
                        <td className="px-2 py-1.5" style={{ position: "sticky", left: 0, zIndex: 6, background: isSelected ? selectedBg : rowIndex % 2 === 0 ? evenRowBg : oddRowBg, minWidth: 40, width: 40 }}>
                          <GridCheckbox checked={isSelected} onChange={() => handleSelect(order.id)} accent={accent} isDark={isDark} />
                        </td>
                        {/* Expand toggle */}
                        <td className="px-1 py-1.5" style={{ position: "sticky", left: 40, zIndex: 6, background: isSelected ? selectedBg : rowIndex % 2 === 0 ? evenRowBg : oddRowBg, minWidth: 32, width: 32, boxShadow: isDark ? "2px 0 6px rgba(0,0,0,0.3)" : "2px 0 6px rgba(0,0,0,0.08)" }}>
                          <button onClick={() => setExpandedRow(isExpanded ? null : order.id)} className="flex h-5 w-5 items-center justify-center rounded transition">
                            <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.15 }}><ExpandIcon className="h-3.5 w-3.5" style={{ color: textMuted }} /></motion.div>
                          </button>
                        </td>
                        {/* Columns */}
                        {visibleColumns.map(col => {
                          const isPinned = col.pinned;
                          const pinnedBefore = visibleColumns.filter((c, j) => c.pinned && j < visibleColumns.indexOf(col)).reduce((s, c) => s + c.width, 0);
                          const leftOffset = isPinned ? pinnedBefore + 72 : 0; // 72 = 40 (checkbox) + 32 (expand)
                          const cellBg = isSelected ? selectedBg : rowIndex % 2 === 0 ? evenRowBg : oddRowBg;
                          const isLastPinnedCol = isPinned && !visibleColumns.some((c, j) => j > visibleColumns.indexOf(col) && c.pinned);
                          return (
                            <td key={col.key} className={`${dens.cell} text-[12px]`} style={{ position: isPinned ? "sticky" : "relative", left: isPinned ? leftOffset : 0, zIndex: isPinned ? 5 : 0, background: cellBg, borderRight: `1px solid ${border}`, boxShadow: isLastPinnedCol ? isDark ? "2px 0 6px rgba(0,0,0,0.3)" : "2px 0 6px rgba(0,0,0,0.08)" : "none", maxWidth: col.width, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {renderCell(col.key, order, { textPrimary, textSecondary, textMuted, accent, inputBg, border, editingCell, setEditingCell, editValue, setEditValue, handleInlineSave, Badge, ORDER_STATUS_STYLES, PAYMENT_STYLES, FULFILLMENT_STYLES, RISK_STYLES, CHANNEL_ICONS })}
                            </td>
                          );
                        })}
                        {/* Actions */}
                        <td className="px-2 py-1.5" style={{ position: "sticky", right: 0, zIndex: 6, background: isSelected ? selectedBg : rowIndex % 2 === 0 ? evenRowBg : oddRowBg, boxShadow: isDark ? "-2px 0 6px rgba(0,0,0,0.3)" : "-2px 0 6px rgba(0,0,0,0.08)" }}>
                          <div className="relative">
                            <button onClick={(e) => { e.stopPropagation(); setActionMenuId(actionMenuId === order.id ? null : order.id); }} className="flex h-6 w-6 items-center justify-center rounded transition hover:bg-black/10 dark:hover:bg-white/10" style={{ color: textMuted }}>
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                            <AnimatePresence>
                              {actionMenuId === order.id && (
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.12 }} className="fixed z-[9999] w-40 rounded-xl border p-1 shadow-xl" style={{ background: panelBg, borderColor: border, right: "2rem" }} onClick={e => e.stopPropagation()}>
                                  <button onClick={() => { setActionMenuId(null); setExpandedRow(isExpanded ? null : order.id); }} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[11px] transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textPrimary }}><Eye className="h-3.5 w-3.5" style={{ color: textMuted }} /> View details</button>
                                  <button onClick={() => { setActionMenuId(null); }} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[11px] transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textPrimary }}><Edit3 className="h-3.5 w-3.5" style={{ color: textMuted }} /> Edit order</button>
                                  <button onClick={() => handleDuplicate(order.id)} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[11px] transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textPrimary }}><Copy className="h-3.5 w-3.5" style={{ color: textMuted }} /> Duplicate</button>
                                  <div className="my-1 h-px" style={{ background: border }} />
                                  <button onClick={() => handleDelete(order.id)} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[11px] transition hover:bg-rose-50 dark:hover:bg-rose-950/20" style={{ color: "#ef4444" }}><Trash2 className="h-3.5 w-3.5" /> Delete</button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </td>
                      </tr>
                      {/* Expanded row */}
                      <AnimatePresence>
                        {isExpanded && (
                          <tr key={order.id + "-detail"}>
                            <td colSpan={visibleColumns.length + 3} style={{ padding: 0, borderBottom: `1px solid ${border}` }}>
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2, ease: EASE }} style={{ overflow: "hidden", background: headerBg }}>
                                <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
                                  {/* Customer details */}
                                  <div>
                                    <p className="mb-2 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider" style={{ color: textMuted }}><User className="h-3 w-3" /> Customer</p>
                                    <p className="text-[13px] font-bold" style={{ color: textPrimary }}>{order.customer}</p>
                                    <p className="text-[11px] font-mono" style={{ color: textSecondary }}>{order.customerEmail}</p>
                                    <p className="mt-1 text-[11px]" style={{ color: textMuted }}>{order.shippingAddress}</p>
                                  </div>
                                  {/* Products */}
                                  <div>
                                    <p className="mb-2 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider" style={{ color: textMuted }}><Package className="h-3 w-3" /> Products ({order.products.length})</p>
                                    {order.products.map((p, j) => (
                                      <div key={j} className="mb-1.5 flex items-center gap-2">
                                        <img loading="lazy" src={order.productThumbs[j]} alt="" className="h-8 w-8 rounded object-cover" style={{ border: `1px solid ${border}` }} />
                                        <span className="text-[11px] font-medium" style={{ color: textPrimary }}>{p}</span>
                                      </div>
                                    ))}
                                  </div>
                                  {/* Payment timeline */}
                                  <div>
                                    <p className="mb-2 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider" style={{ color: textMuted }}><CreditCard className="h-3 w-3" /> Payment Timeline</p>
                                    {order.paymentTimeline.map((t, j) => (
                                      <div key={j} className="mb-1 flex items-center gap-2">
                                        <div className={`h-3 w-3 rounded-full border-2 ${j < order.paymentTimeline.filter(pt => pt.done).length - 1 ? "" : ""}`} style={{ borderColor: t.done ? accent : border, background: t.done ? accent : "transparent" }}>
                                          {t.done && <Check className="h-2 w-2 text-white" strokeWidth={4} />}
                                        </div>
                                        <span className="text-[10px] font-medium" style={{ color: t.done ? textPrimary : textMuted }}>{t.label}</span>
                                      </div>
                                    ))}
                                  </div>
                                  {/* Fulfillment + Risk + Notes */}
                                  <div>
                                    <p className="mb-2 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider" style={{ color: textMuted }}><Truck className="h-3 w-3" /> Fulfillment & Risk</p>
                                    <div className="mb-2 flex items-center gap-2">
                                      <Badge label={order.fulfillment} styles={FULFILLMENT_STYLES[order.fulfillment]} />
                                      <Badge label={order.risk + " risk"} styles={RISK_STYLES[order.risk]} />
                                    </div>
                                    {order.trackingNumber && <p className="text-[10px] font-mono" style={{ color: textSecondary }}>Tracking: {order.trackingNumber}</p>}
                                    <p className="mt-2 text-[10px]" style={{ color: textMuted }}>{order.notes}</p>
                                    <p className="mt-1 text-[10px] italic" style={{ color: textMuted }}>{order.riskAssessment}</p>
                                  </div>
                                  {/* Order history */}
                                  <div className="md:col-span-2 lg:col-span-4">
                                    <p className="mb-2 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider" style={{ color: textMuted }}><Clock className="h-3 w-3" /> Order History</p>
                                    <div className="flex flex-wrap gap-2">
                                      {order.orderHistory.map((h, j) => (
                                        <div key={j} className="rounded-lg border px-2.5 py-1.5" style={{ borderColor: border }}>
                                          <p className="text-[10px] font-semibold" style={{ color: textPrimary }}>{h.action}</p>
                                          <p className="text-[9px]" style={{ color: textMuted }}>{h.time} · {h.user}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            </td>
                          </tr>
                        )}
                      </AnimatePresence>
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* ── Footer / Pagination ── */}
        <footer className="flex h-12 shrink-0 items-center gap-3 px-4" style={{ borderTop: `1px solid ${border}`, background: panelBg }}>
          <div className="flex items-center gap-2">
            <span className="text-[11px]" style={{ color: textMuted }}>Rows:</span>
            <div className="relative">
              <button onClick={(e) => { e.stopPropagation(); setPageMenuOpen(!pageMenuOpen); }} className="flex items-center gap-1 rounded-md border px-2 py-1 text-[12px] outline-none transition" style={{ background: inputBg, borderColor: border, color: textPrimary }}>
                {pageSize}<ChevronDown className="h-3 w-3" style={{ color: textMuted }} />
              </button>
              <AnimatePresence>
                {pageMenuOpen && (
                  <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.12 }} className="absolute bottom-full mb-1 z-50 w-16 rounded-lg border p-1 shadow-xl" style={{ background: panelBg, borderColor: border }} onClick={e => e.stopPropagation()}>
                    {[10, 25, 50, 100].map(n => (
                      <button key={n} onClick={() => { setPageSize(n); setPage(1); setPageMenuOpen(false); }} className="flex w-full items-center justify-between rounded-md px-2 py-1 text-left text-[12px] transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: n === pageSize ? accent : textPrimary }}>{n}{n === pageSize && <Check className="h-3.5 w-3.5" style={{ color: accent }} />}</button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex-1" />
          <span className="text-[11px]" style={{ color: textSecondary }}>{sorted.length === 0 ? "0" : `${(page - 1) * pageSize + 1}-${Math.min(page * pageSize, sorted.length)}`} of {sorted.length}</span>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="flex h-7 w-7 items-center justify-center rounded-lg border transition disabled:opacity-30" style={{ borderColor: border, color: textSecondary }}><ChevronLeft className="h-4 w-4" /></button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)} className="flex h-7 min-w-7 items-center justify-center rounded-lg px-2 text-[11px] font-medium transition" style={{ background: page === p ? accent : "transparent", color: page === p ? "#fff" : textSecondary, border: `1px solid ${page === p ? accent : border}` }}>{p}</button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages || totalPages === 0} className="flex h-7 w-7 items-center justify-center rounded-lg border transition disabled:opacity-30" style={{ borderColor: border, color: textSecondary }}><ChevronRight className="h-4 w-4" /></button>
          </div>
        </footer>
      </div>

      {/* ── Context Menu ── */}
      <AnimatePresence>
        {contextMenu && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.1 }} className="fixed z-[9999] w-40 rounded-xl border p-1 shadow-xl" style={{ background: panelBg, borderColor: border, left: contextMenu.x, top: contextMenu.y }} onClick={e => e.stopPropagation()}>
            <button onClick={() => { setExpandedRow(expandedRow === contextMenu.orderId ? null : contextMenu.orderId); setContextMenu(null); }} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[11px] transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textPrimary }}><Eye className="h-3.5 w-3.5" style={{ color: textMuted }} /> View details</button>
            <button onClick={() => { setContextMenu(null); }} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[11px] transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textPrimary }}><Copy className="h-3.5 w-3.5" style={{ color: textMuted }} /> Duplicate</button>
            <div className="my-1 h-px" style={{ background: border }} />
            <button onClick={() => { handleDelete(contextMenu.orderId); setContextMenu(null); }} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[11px] transition hover:bg-rose-50 dark:hover:bg-rose-950/20" style={{ color: "#ef4444" }}><Trash2 className="h-3.5 w-3.5" /> Delete</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Cell renderer
// ────────────────────────────────────────────────────────────
function renderCell(key: string, order: Order, ctx: any) {
  const { textPrimary, textSecondary, textMuted, accent, inputBg, border, editingCell, setEditingCell, editValue, setEditValue, handleInlineSave, Badge, ORDER_STATUS_STYLES, PAYMENT_STYLES, FULFILLMENT_STYLES, RISK_STYLES, CHANNEL_ICONS } = ctx;

  const isEditing = editingCell?.id === order.id && editingCell?.field === key;

  switch (key) {
    case "orderId":
      return <span className="font-mono font-bold text-[11px]" style={{ color: accent }}>{order.orderId}</span>;
    case "customer":
      return (
        <div className="flex items-center gap-2">
          <img loading="lazy" src={order.ownerAvatar} alt="" className="h-6 w-6 rounded-full object-cover shrink-0" style={{ border: `1px solid ${border}` }} />
          <div className="min-w-0">
            <p className="truncate text-[12px] font-semibold" style={{ color: textPrimary }}>{order.customer}</p>
            <p className="truncate text-[9px] font-mono" style={{ color: textMuted }}>{order.customerEmail}</p>
          </div>
        </div>
      );
    case "products":
      return (
        <div className="flex items-center gap-1">
          {order.productThumbs.slice(0, 2).map((thumb: string, j: number) => <img loading="lazy" key={j} src={thumb} alt="" className="h-6 w-6 rounded object-cover shrink-0" style={{ border: `1px solid ${border}` }} />)}
          {order.products.length > 2 && <span className="text-[9px]" style={{ color: textMuted }}>+{order.products.length - 2}</span>}
          <span className="truncate text-[11px] ml-1" style={{ color: textSecondary }}>{order.products[0]}</span>
        </div>
      );
    case "channel":
      return <span className="flex items-center gap-1 text-[11px] font-medium uppercase" style={{ color: textSecondary }}><Globe className="h-3 w-3" style={{ color: textMuted }} />{order.channel}</span>;
    case "payment":
      return <Badge label={order.payment} styles={PAYMENT_STYLES[order.payment]} />;
    case "orderStatus":
      return isEditing ? (
        <select autoFocus value={editValue || order.orderStatus} onChange={e => setEditValue(e.target.value)} onBlur={() => handleInlineSave(order.id, "orderStatus", editValue || order.orderStatus)} className="rounded border px-1 py-0.5 text-[10px] outline-none" style={{ background: inputBg, borderColor: accent, color: textPrimary }}>
          {Object.keys(ORDER_STATUS_STYLES).map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      ) : (
        <button onClick={() => { setEditingCell({ id: order.id, field: "orderStatus" }); setEditValue(order.orderStatus); }}><Badge label={order.orderStatus} styles={ORDER_STATUS_STYLES[order.orderStatus]} /></button>
      );
    case "fulfillment":
      return <Badge label={order.fulfillment} styles={FULFILLMENT_STYLES[order.fulfillment]} />;
    case "risk":
      return <Badge label={order.risk} styles={RISK_STYLES[order.risk]} />;
    case "total":
      return <span className="font-bold tabular-nums text-[13px]" style={{ color: textPrimary }}>${order.total.toFixed(2)}</span>;
    case "country":
      return <span className="flex items-center gap-1.5 text-[11px]" style={{ color: textSecondary }}><span className="rounded px-1 text-[8px] font-bold" style={{ background: inputBg, color: textMuted }}>{order.countryFlag}</span>{order.country}</span>;
    case "owner":
      return (
        <div className="flex items-center gap-1.5">
          <img loading="lazy" src={order.ownerAvatar} alt="" className="h-5 w-5 rounded-full object-cover" />
          <span className="text-[11px] truncate" style={{ color: textSecondary }}>{order.owner}</span>
        </div>
      );
    case "createdAt":
      return <span className="text-[11px] font-mono" style={{ color: textSecondary }}>{order.createdAt}</span>;
    case "actions":
      return null;
    default:
      return <span style={{ color: textSecondary }}>{(order as any)[key]}</span>;
  }
}
