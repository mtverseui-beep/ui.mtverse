"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowUp, Check, ChevronLeft, ChevronRight, ChevronsUpDown, Columns3, Download, Edit3, Grid2X2, Plus, SearchX, Star, Table2, Trash2, X } from "lucide-react";
import { Initials, StatusBadge, TableChecklist, TableHeader, TableSearch, TableSelect, TableShell } from "./TableShell";
import { invoices as initialInvoices, inventory as initialInventory, markets, orders as initialOrders, organization, people as initialPeople, permissionRows, planFeatures, virtualRows, type InvoiceStatus, type OrderRecord, type OrderStatus, type PersonRecord, type PersonStatus, type TreeRecord } from "./table-data";

export type TablePreset = "compact" | "data" | "expandable" | "editable" | "switcher" | "financial" | "columns" | "tree" | "virtual" | "striped" | "responsive" | "enterprise" | "inventory" | "permissions" | "invoices" | "comparison";

export function ProfessionalTable({ preset }: { preset: TablePreset }) {
  return <TableShell>{renderPreset(preset)}</TableShell>;
}

function renderPreset(preset: TablePreset) {
  if (preset === "expandable") return <ExpandableTable />;
  if (preset === "editable") return <EditableTable />;
  if (preset === "financial") return <FinancialMarketTable />;
  if (preset === "tree") return <TreeGrid />;
  if (preset === "virtual") return <VirtualizedGrid />;
  if (preset === "enterprise") return <EnterpriseOrdersGrid />;
  if (preset === "inventory") return <InventoryTable />;
  if (preset === "permissions") return <PermissionsMatrix />;
  if (preset === "invoices") return <InvoiceLedger />;
  if (preset === "comparison") return <ComparisonMatrix />;
  return <PeopleTable variant={preset} />;
}

type PeopleVariant = "compact" | "data" | "switcher" | "columns" | "striped" | "responsive";
type PersonColumn = "name" | "email" | "role" | "status" | "team" | "region" | "lastSeen" | "spend";
const PERSON_COLUMNS: { key: PersonColumn; label: string }[] = [{ key: "name", label: "Member" }, { key: "email", label: "Email" }, { key: "role", label: "Role" }, { key: "status", label: "Status" }, { key: "team", label: "Team" }, { key: "region", label: "Region" }, { key: "lastSeen", label: "Last active" }, { key: "spend", label: "Revenue" }];

function exportCsv<T extends object>(filename: string, rows: T[]) {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]) as (keyof T)[];
  const escape = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  const csv = [keys.map(String).join(","), ...rows.map((row) => keys.map((key) => escape(row[key])).join(","))].join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const anchor = document.createElement("a"); anchor.href = url; anchor.download = filename; anchor.click(); URL.revokeObjectURL(url);
}
function PeopleTable({ variant }: { variant: PeopleVariant }) {
  const [rows, setRows] = useState(initialPeople);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | PersonStatus>("all");
  const [sort, setSort] = useState<{ key: "name" | "spend"; direction: "asc" | "desc" }>({ key: "name", direction: "asc" });
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [view, setView] = useState<"table" | "cards">("table");
  const [visible, setVisible] = useState<Set<PersonColumn>>(new Set(PERSON_COLUMNS.map((column) => column.key)));
  const compact = variant === "compact";
  const paged = variant === "data";
  const striped = variant === "striped";
  const responsive = variant === "responsive";
  const switcher = variant === "switcher";
  const configurable = variant === "columns";
  const copy = {
    compact: ["Compact density", "High-density member operations without sacrificing clarity."],
    data: ["Team directory", "Production controls for sorting, filtering, selection, export, and pagination."],
    switcher: ["Adaptive records", "Give teams an explicit choice between scan-friendly rows and visual cards."],
    columns: ["Column management", "Personalize the dataset while preserving a dependable table structure."],
    striped: ["Enterprise accounts", "Pinned identity, stable zebra rows, and wide-data navigation."],
    responsive: ["Responsive records", "Container-aware rows automatically become touch-friendly cards."],
  }[variant];
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return rows.filter((person) => (status === "all" || person.status === status) && (!needle || [person.name, person.email, person.team, person.region].some((value) => value.toLowerCase().includes(needle)))).sort((a, b) => {
      const value = sort.key === "spend" ? a.spend - b.spend : a.name.localeCompare(b.name);
      return sort.direction === "asc" ? value : -value;
    });
  }, [query, rows, sort, status]);
  const pageSize = 7;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const displayed = paged ? filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize) : filtered;
  const columns = PERSON_COLUMNS.filter((column) => visible.has(column.key) && (!compact || ["name", "email", "role", "status", "spend"].includes(column.key)) && (!responsive || ["name", "email", "role", "status", "spend"].includes(column.key)) && (!switcher || ["name", "team", "role", "status", "spend"].includes(column.key)));
  const allSelected = displayed.length > 0 && displayed.every((person) => selected.has(person.id));
  const toggleSort = (key: "name" | "spend") => setSort((current) => current.key === key ? { key, direction: current.direction === "asc" ? "desc" : "asc" } : { key, direction: "asc" });
  const toggleSelection = (id: string) => setSelected((current) => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  const toggleAll = () => setSelected((current) => allSelected ? new Set([...current].filter((id) => !displayed.some((person) => person.id === id))) : new Set([...current, ...displayed.map((person) => person.id)]));
  const removeSelected = () => { setRows((current) => current.filter((person) => !selected.has(person.id))); setSelected(new Set()); };
  const addMember = () => setRows((current) => [{ ...initialPeople[0], id: `USR-${String(current.length + 1).padStart(3, "0")}`, name: "New team member", email: `member${current.length + 1}@northstar.io`, status: "invited", spend: 0 }, ...current]);
  return (
    <div className={responsive ? "table-responsive-auto flex h-full min-h-0 flex-col" : "flex h-full min-h-0 flex-col"}>
      <TableHeader title={copy[0]} description={copy[1]}>
        <TableSearch value={query} onChange={(value) => { setQuery(value); setPage(1); }} placeholder="Search members" />
        {(paged || configurable) && <TableSelect label="Filter by status" value={status} onChange={(value) => { setStatus(value as "all" | PersonStatus); setPage(1); }} options={[{ value: "all", label: "All statuses" }, { value: "active", label: "Active" }, { value: "invited", label: "Invited" }, { value: "suspended", label: "Suspended" }]} />}
        {switcher && <div className="flex gap-1" aria-label="Choose a view"><button type="button" className="table-icon-button" aria-label="Table view" aria-pressed={view === "table"} onClick={() => setView("table")}><Table2 /></button><button type="button" className="table-icon-button" aria-label="Card view" aria-pressed={view === "cards"} onClick={() => setView("cards")}><Grid2X2 /></button></div>}
        {configurable && <ColumnMenu visible={visible} onChange={setVisible} />}
        {(paged || striped) && <button type="button" className="table-button" onClick={() => exportCsv("members.csv", filtered)}><Download /><span>Export CSV</span></button>}
        {paged && <button type="button" className="table-button table-button-primary" onClick={addMember}><Plus /><span>Add member</span></button>}
      </TableHeader>
      {paged && <div className="table-toolbar" aria-live="polite"><span className="table-summary"><strong>{filtered.length}</strong> matching members</span>{selected.size > 0 && <><span className="table-summary"><strong>{selected.size}</strong> selected</span><button type="button" className="table-button" onClick={removeSelected}><Trash2 /><span>Delete</span></button><button type="button" className="table-button" onClick={() => exportCsv("selected-members.csv", rows.filter((person) => selected.has(person.id)))}><Download /><span>Export</span></button></>}<span className="table-spacer" /></div>}
      {(switcher && view === "cards") ? <PeopleCards rows={displayed} /> : <><div className="table-desktop-only table-scroll"><table className="table-native"><caption>{copy[0]}</caption><thead><tr>{paged && <th className="w-10"><input className="table-checkbox" type="checkbox" aria-label="Select all visible members" checked={allSelected} onChange={toggleAll} /></th>}{columns.map((column) => <th key={column.key} className={striped && column.key === "name" ? "table-sticky-first" : undefined} aria-sort={sort.key === column.key ? (sort.direction === "asc" ? "ascending" : "descending") : undefined}>{column.key === "name" || column.key === "spend" ? <button type="button" className="table-sort" onClick={() => toggleSort(column.key === "name" ? "name" : "spend")}>{column.label}{sort.key === column.key ? (sort.direction === "asc" ? <ArrowUp /> : <ArrowDown />) : <ChevronsUpDown />}</button> : column.label}</th>)}</tr></thead><tbody>{displayed.map((person) => <tr key={person.id} className={`${compact ? "table-compact-row" : ""} ${striped ? "table-striped-row" : ""}`}>{paged && <td><input className="table-checkbox" type="checkbox" aria-label={`Select ${person.name}`} checked={selected.has(person.id)} onChange={() => toggleSelection(person.id)} /></td>}{columns.map((column) => <PersonCell key={column.key} column={column.key} person={person} sticky={striped && column.key === "name"} />)}</tr>)}</tbody></table>{displayed.length === 0 && <EmptyState />}</div><div className="table-mobile-only table-card-grid" role="list" aria-label="Responsive member records"><PeopleCards rows={displayed} bare /></div></>}
      {paged && <TablePagination page={currentPage} pages={totalPages} count={filtered.length} onPage={setPage} />}
    </div>
  );
}
function PersonCell({ column, person, sticky }: { column: PersonColumn; person: PersonRecord; sticky?: boolean }) {
  const className = sticky ? "table-sticky-first" : undefined;
  if (column === "name") return <td className={className}><div className="table-person"><Initials name={person.name} /><div className="table-person-copy"><div className="table-primary">{person.name}</div><div className="table-secondary table-mono">{person.id}</div></div></div></td>;
  if (column === "status") return <td><StatusBadge status={person.status} /></td>;
  if (column === "role") return <td><span className="table-primary">{person.role}</span></td>;
  if (column === "spend") return <td className="table-primary table-number">${person.spend.toLocaleString()}</td>;
  if (column === "email") return <td className="table-mono">{person.email}</td>;
  return <td>{person[column]}</td>;
}

function PeopleCards({ rows, bare = false }: { rows: PersonRecord[]; bare?: boolean }) {
  if (!rows.length) return <EmptyState />;
  const cards = rows.map((person) => <article key={person.id} role="listitem" className="table-record-card"><div className="table-person"><Initials name={person.name} /><div className="table-person-copy"><div className="table-primary">{person.name}</div><div className="table-secondary table-mono">{person.email}</div></div></div><dl><div><dt>Role</dt><dd>{person.role}</dd></div><div><dt>Status</dt><dd><StatusBadge status={person.status} /></dd></div><div><dt>Team</dt><dd>{person.team}</dd></div><div><dt>Revenue</dt><dd className="table-number">${person.spend.toLocaleString()}</dd></div></dl></article>);
  return bare ? <>{cards}</> : <div className="table-card-grid" role="list">{cards}</div>;
}

function ColumnMenu({ visible, onChange }: { visible: Set<PersonColumn>; onChange: (value: Set<PersonColumn>) => void }) {
  return <TableChecklist label={<><Columns3 /><span>Columns</span></>} options={PERSON_COLUMNS.map((column) => ({ value: column.key, label: column.label }))} selected={new Set(visible)} disabled={(value) => visible.size === 1 && visible.has(value as PersonColumn)} onToggle={(value) => { const key = value as PersonColumn; const next = new Set(visible); if (next.has(key)) next.delete(key); else next.add(key); onChange(next); }} />;
}

function EmptyState() { return <div className="table-empty"><SearchX className="mb-2 h-6 w-6" aria-hidden="true" /><strong>No matching records</strong><span>Try a different search or filter.</span></div>; }

function TablePagination({ page, pages, count, onPage }: { page: number; pages: number; count: number; onPage: (page: number) => void }) {
  return <footer className="table-footer"><span>{count} records</span><div className="table-pager"><button type="button" aria-label="Previous page" disabled={page === 1} onClick={() => onPage(page - 1)}><ChevronLeft className="mx-auto h-4 w-4" /></button>{Array.from({ length: pages }, (_, index) => index + 1).map((number) => <button type="button" key={number} aria-label={`Page ${number}`} aria-current={page === number ? "page" : undefined} onClick={() => onPage(number)}>{number}</button>)}<button type="button" aria-label="Next page" disabled={page === pages} onClick={() => onPage(page + 1)}><ChevronRight className="mx-auto h-4 w-4" /></button></div></footer>;
}

function ExpandableTable() {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set([initialPeople[0].id]));
  const rows = initialPeople.filter((person) => person.name.toLowerCase().includes(query.toLowerCase()) || person.team.toLowerCase().includes(query.toLowerCase()));
  const toggle = (id: string) => setExpanded((current) => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  return <div className="flex h-full min-h-0 flex-col"><TableHeader title="Expandable detail table" description="Review identity, access, usage, and account context without leaving the dataset."><TableSearch value={query} onChange={setQuery} placeholder="Search people or teams" /></TableHeader><div className="table-scroll"><table className="table-native"><caption>Members with expandable account details</caption><thead><tr><th className="w-10"><span className="sr-only">Expand</span></th><th>Member</th><th>Team</th><th>Role</th><th>Status</th><th>Revenue</th></tr></thead><tbody>{rows.map((person) => <Fragment key={person.id}><tr><td><button type="button" className="table-tree-toggle" aria-label={`${expanded.has(person.id) ? "Collapse" : "Expand"} ${person.name}`} aria-expanded={expanded.has(person.id)} aria-controls={`detail-${person.id}`} onClick={() => toggle(person.id)}><ChevronRight /></button></td><PersonCell column="name" person={person} /><PersonCell column="team" person={person} /><PersonCell column="role" person={person} /><PersonCell column="status" person={person} /><PersonCell column="spend" person={person} /></tr>{expanded.has(person.id) && <tr id={`detail-${person.id}`}><td colSpan={6} className="!h-auto !p-0"><div className="table-detail"><dl className="table-detail-grid"><div><dt>Primary email</dt><dd className="table-mono">{person.email}</dd></div><div><dt>Region</dt><dd>{person.region}</dd></div><div><dt>Last activity</dt><dd>{person.lastSeen}</dd></div><div><dt>Member ID</dt><dd className="table-mono">{person.id}</dd></div></dl></div></td></tr>}</Fragment>)}</tbody></table>{rows.length === 0 && <EmptyState />}</div></div>;
}
type EditableField = "name" | "email" | "role" | "spend";
function EditableTable() {
  const [rows, setRows] = useState(initialPeople);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<{ id: string; field: EditableField } | null>(null);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const filtered = rows.filter((person) => person.name.toLowerCase().includes(query.toLowerCase()) || person.email.toLowerCase().includes(query.toLowerCase()));
  const start = (person: PersonRecord, field: EditableField) => { setEditing({ id: person.id, field }); setDraft(String(person[field])); setError(""); };
  const cancel = () => { setEditing(null); setError(""); };
  const save = () => {
    if (!editing) return;
    const value = draft.trim();
    if (!value) { setError("A value is required."); return; }
    if (editing.field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) { setError("Enter a valid email address."); return; }
    if (editing.field === "spend" && (!Number.isFinite(Number(value)) || Number(value) < 0)) { setError("Revenue must be a positive number."); return; }
    setRows((current) => current.map((person) => person.id === editing.id ? { ...person, [editing.field]: editing.field === "spend" ? Number(value) : value } : person)); setEditing(null); setError("");
  };
  const fields: { key: EditableField; label: string }[] = [{ key: "name", label: "Member" }, { key: "email", label: "Email" }, { key: "role", label: "Role" }, { key: "spend", label: "Revenue" }];
  return <div className="flex h-full min-h-0 flex-col"><TableHeader title="Validated inline editing" description="Keyboard-ready cell editing with explicit save, cancel, and production validation states."><TableSearch value={query} onChange={setQuery} placeholder="Search editable records" /></TableHeader>{error && <div className="table-toolbar text-rose-500" role="alert">{error}</div>}<div className="table-scroll"><table className="table-native"><caption>Editable team records</caption><thead><tr>{fields.map((field) => <th key={field.key}>{field.label}</th>)}<th>Status</th></tr></thead><tbody>{filtered.map((person) => <tr key={person.id}>{fields.map((field) => { const active = editing?.id === person.id && editing.field === field.key; return <td key={field.key}>{active ? <div className="flex min-w-[180px] items-center gap-1"><input autoFocus className="table-edit-input" aria-label={`Edit ${field.label} for ${person.name}`} type={field.key === "spend" ? "number" : field.key === "email" ? "email" : "text"} value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") save(); if (event.key === "Escape") cancel(); }} /><div className="table-row-actions"><button type="button" aria-label="Save edit" onMouseDown={(event) => event.preventDefault()} onClick={save}><Check /></button><button type="button" aria-label="Cancel edit" onMouseDown={(event) => event.preventDefault()} onClick={cancel}><X /></button></div></div> : <button type="button" className="group flex items-center gap-2 rounded-md text-left focus-visible:outline-none" onClick={() => start(person, field.key)}><span className={field.key === "email" ? "table-mono" : field.key === "spend" ? "table-primary table-number" : "table-primary"}>{field.key === "spend" ? `$${person.spend.toLocaleString()}` : person[field.key]}</span><Edit3 className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-70 group-focus-visible:opacity-70" aria-hidden="true" /></button>}</td>; })}<PersonCell column="status" person={person} /></tr>)}</tbody></table>{filtered.length === 0 && <EmptyState />}</div><div className="table-footer" aria-live="polite">{editing ? "Editing a cell — press Enter to save or Escape to cancel." : "Select any editable value to begin."}</div></div>;
}

function Sparkline({ points, positive, label }: { points: number[]; positive: boolean; label: string }) {
  const path = points.map((value, index) => `${(index / (points.length - 1)) * 76},${24 - ((value - 35) / 45) * 22}`).join(" ");
  return <svg className="table-spark" role="img" aria-label={label} viewBox="0 0 76 24"><polyline points={path} fill="none" stroke={positive ? "#10b981" : "#f43f5e"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function FinancialMarketTable() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"symbol" | "price" | "change">("change");
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set(["NVDA", "MSFT"]));
  const rows = useMemo(() => markets.filter((market) => `${market.symbol} ${market.company}`.toLowerCase().includes(query.toLowerCase())).sort((a, b) => sort === "symbol" ? a.symbol.localeCompare(b.symbol) : b[sort] - a[sort]), [query, sort]);
  return <div className="flex h-full min-h-0 flex-col"><TableHeader title="Live market watch" description="Financial-grade scanning with tabular values, watchlists, trends, and accessible sparklines."><TableSearch value={query} onChange={setQuery} placeholder="Search symbol or company" /><TableSelect label="Sort market data" value={sort} onChange={(value) => setSort(value as typeof sort)} options={[{ value: "change", label: "Top movers" }, { value: "price", label: "Highest price" }, { value: "symbol", label: "Symbol A–Z" }]} /></TableHeader><div className="table-kpis"><div className="table-kpi"><span>Market status</span><strong className="text-emerald-500">Open</strong></div><div className="table-kpi"><span>Advancing</span><strong>{markets.filter((item) => item.change >= 0).length} assets</strong></div><div className="table-kpi"><span>Watchlist</span><strong>{watchlist.size} symbols</strong></div><div className="table-kpi"><span>Session</span><strong>Regular</strong></div></div><div className="table-scroll"><table className="table-native"><caption>Market watchlist and price movement</caption><thead><tr><th className="w-10"><span className="sr-only">Watchlist</span></th><th>Instrument</th><th>Price</th><th>Day change</th><th>Volume</th><th>Market cap</th><th>Intraday trend</th></tr></thead><tbody>{rows.map((market) => { const positive = market.change >= 0; return <tr key={market.symbol}><td><button type="button" className="table-tree-toggle" aria-label={`${watchlist.has(market.symbol) ? "Remove" : "Add"} ${market.symbol} ${watchlist.has(market.symbol) ? "from" : "to"} watchlist`} aria-pressed={watchlist.has(market.symbol)} onClick={() => setWatchlist((current) => { const next = new Set(current); if (next.has(market.symbol)) next.delete(market.symbol); else next.add(market.symbol); return next; })}><Star className={watchlist.has(market.symbol) ? "fill-amber-400 text-amber-400" : ""} /></button></td><td><div className="table-primary">{market.symbol}</div><div className="table-secondary">{market.company}</div></td><td className="table-primary table-number">${market.price.toFixed(2)}</td><td><span className={`inline-flex items-center gap-1 font-semibold table-number ${positive ? "text-emerald-500" : "text-rose-500"}`}>{positive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}{positive ? "+" : ""}{market.change.toFixed(2)}%</span></td><td className="table-number">{market.volume}</td><td className="table-number">{market.cap}</td><td><Sparkline points={market.sparkline} positive={positive} label={`${market.symbol} intraday trend ${positive ? "up" : "down"} ${Math.abs(market.change)} percent`} /></td></tr>; })}</tbody></table>{rows.length === 0 && <EmptyState />}</div></div>;
}
interface FlatTreeRow { node: TreeRecord; level: number }
function flattenTree(nodes: TreeRecord[], expanded: Set<string>, level = 0): FlatTreeRow[] {
  return nodes.flatMap((node) => [{ node, level }, ...(node.children && expanded.has(node.id) ? flattenTree(node.children, expanded, level + 1) : [])]);
}
function TreeGrid() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["engineering", "platform", "product"]));
  const [query, setQuery] = useState("");
  const rows = query ? flattenTree(organization, new Set(["engineering", "platform", "security", "product", "revenue"])).filter(({ node }) => `${node.name} ${node.role ?? ""}`.toLowerCase().includes(query.toLowerCase())) : flattenTree(organization, expanded);
  const toggle = (id: string) => setExpanded((current) => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  return <div className="flex h-full min-h-0 flex-col"><TableHeader title="Organization tree grid" description="A semantic hierarchical dataset for teams, ownership, permissions, and nested resources."><TableSearch value={query} onChange={setQuery} placeholder="Search organization" /><button type="button" className="table-button" onClick={() => setExpanded(new Set(["engineering", "platform", "security", "product", "revenue"]))}>Expand all</button><button type="button" className="table-button" onClick={() => setExpanded(new Set())}>Collapse all</button></TableHeader><div className="table-scroll"><table className="table-native" role="treegrid" aria-label="Organization hierarchy"><thead><tr><th>Name</th><th>Kind</th><th>Role</th><th>Status</th></tr></thead><tbody>{rows.map(({ node, level }) => <tr key={node.id} role="row" aria-level={level + 1} aria-expanded={node.children ? expanded.has(node.id) : undefined}><td style={{ paddingLeft: 14 + level * 28 }}><div className="flex items-center gap-2">{node.children ? <button type="button" className="table-tree-toggle" aria-label={`${expanded.has(node.id) ? "Collapse" : "Expand"} ${node.name}`} aria-expanded={expanded.has(node.id)} onClick={() => toggle(node.id)}><ChevronRight /></button> : <span className="inline-block w-[26px]" />}<Initials name={node.name} /><span className="table-primary">{node.name}</span></div></td><td><span className="table-badge">{node.type === "group" ? "Team" : "Member"}</span></td><td>{node.role ?? "—"}</td><td>{node.status ? <StatusBadge status={node.status} /> : <span className="table-secondary">{node.children?.length ?? 0} direct reports</span>}</td></tr>)}</tbody></table>{rows.length === 0 && <EmptyState />}</div></div>;
}

const VIRTUAL_ROW_HEIGHT = 44;
function VirtualizedGrid() {
  const [query, setQuery] = useState("");
  const [environment, setEnvironment] = useState("all");
  const [viewport, setViewport] = useState({ scrollTop: 0, height: 440 });
  const parentRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const rows = useMemo(() => { const needle = query.toLowerCase(); return virtualRows.filter((row) => (environment === "all" || row.environment === environment) && (!needle || `${row.id} ${row.event} ${row.actor}`.toLowerCase().includes(needle))); }, [environment, query]);
  useEffect(() => {
    const element = parentRef.current;
    if (!element) return;
    const syncViewport = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        setViewport({ scrollTop: element.scrollTop, height: element.clientHeight });
      });
    };
    const resizeObserver = new ResizeObserver(syncViewport);
    resizeObserver.observe(element);
    element.addEventListener("scroll", syncViewport, { passive: true });
    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      resizeObserver.disconnect();
      element.removeEventListener("scroll", syncViewport);
    };
  }, []);
  const overscan = 8;
  const start = Math.max(0, Math.floor(viewport.scrollTop / VIRTUAL_ROW_HEIGHT) - overscan);
  const end = Math.min(rows.length, Math.ceil((viewport.scrollTop + viewport.height) / VIRTUAL_ROW_HEIGHT) + overscan);
  const visibleRows = rows.slice(start, end);
  const resetScroll = () => { if (parentRef.current) parentRef.current.scrollTop = 0; setViewport((current) => ({ ...current, scrollTop: 0 })); };
  return <div className="flex h-full min-h-0 flex-col"><TableHeader title="Virtualized audit log" description="5,000 deterministic records with ResizeObserver-powered windowing and a bounded DOM."><TableSearch value={query} onChange={(value) => { setQuery(value); resetScroll(); }} placeholder="Search 5,000 events" /><TableSelect label="Filter environment" value={environment} onChange={(value) => { setEnvironment(value); resetScroll(); }} options={[{ value: "all", label: "All environments" }, { value: "Production", label: "Production" }, { value: "Staging", label: "Staging" }, { value: "Development", label: "Development" }]} /></TableHeader><div className="table-virtual-head" role="row"><div>Event ID</div><div>Event</div><div>Actor</div><div>Environment</div><div>Severity</div><div>Duration</div></div><div ref={parentRef} className="table-scroll" role="grid" aria-label="Virtualized audit events" aria-rowcount={rows.length}><div style={{ height: rows.length * VIRTUAL_ROW_HEIGHT, minWidth: 760, position: "relative" }}>{visibleRows.map((row, index) => { const rowIndex = start + index; return <div key={row.id} className="table-virtual-row" role="row" aria-rowindex={rowIndex + 1} style={{ height: VIRTUAL_ROW_HEIGHT, transform: `translateY(${rowIndex * VIRTUAL_ROW_HEIGHT}px)` }}><div className="table-mono table-secondary">{row.id}</div><div className="table-primary">{row.event}</div><div>{row.actor}</div><div>{row.environment}</div><div><StatusBadge status={row.severity} /></div><div className="table-number">{row.duration}</div></div>; })}</div>{rows.length === 0 && <EmptyState />}</div><div className="table-footer" aria-live="polite">{rows.length.toLocaleString()} matching events · {visibleRows.length} DOM rows</div></div>;
}

const ORDER_COLUMNS = ["customer", "channel", "status", "payment", "risk", "total", "region", "created"] as const;
type OrderColumn = typeof ORDER_COLUMNS[number];
function EnterpriseOrdersGrid() {
  const [rows, setRows] = useState(initialOrders);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | OrderStatus>("all");
  const [risk, setRisk] = useState<"all" | OrderRecord["risk"]>("all");
  const [sort, setSort] = useState<{ key: "created" | "total"; direction: "asc" | "desc" }>({ key: "created", direction: "desc" });
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [visible, setVisible] = useState<Set<OrderColumn>>(new Set(ORDER_COLUMNS));
  const [density, setDensity] = useState<"compact" | "cozy" | "comfortable">("cozy");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => { const needle = query.toLowerCase(); return rows.filter((order) => (status === "all" || order.status === status) && (risk === "all" || order.risk === risk) && (!needle || `${order.id} ${order.customer} ${order.email} ${order.region}`.toLowerCase().includes(needle))).sort((a, b) => { const comparison = sort.key === "total" ? a.total - b.total : a.id.localeCompare(b.id); return sort.direction === "asc" ? comparison : -comparison; }); }, [query, risk, rows, sort, status]);
  const pageSize = 10; const pages = Math.max(1, Math.ceil(filtered.length / pageSize)); const currentPage = Math.min(page, pages); const displayed = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const allSelected = displayed.length > 0 && displayed.every((order) => selected.has(order.id));
  const toggleAll = () => setSelected((current) => allSelected ? new Set([...current].filter((id) => !displayed.some((order) => order.id === id))) : new Set([...current, ...displayed.map((order) => order.id)]));
  const applyView = (view: "review" | "pending" | "all") => { if (view === "review") { setRisk("High"); setStatus("all"); } else if (view === "pending") { setRisk("all"); setStatus("Pending"); } else { setRisk("all"); setStatus("all"); } setPage(1); };
  const updateStatus = (id: string, value: OrderStatus) => setRows((current) => current.map((order) => order.id === id ? { ...order, status: value } : order));
  const totalRevenue = filtered.reduce((sum, order) => sum + order.total, 0);
  return <div className={`table-density-${density} flex h-full min-h-0 flex-col`}><TableHeader title="Commerce operations grid" description="Advanced filtering, saved views, selection, column control, inline updates, and expandable order intelligence."><TableSearch value={query} onChange={(value) => { setQuery(value); setPage(1); }} placeholder="Search orders or customers" /><button type="button" className="table-button" aria-pressed={risk === "High"} onClick={() => applyView("review")}>Needs review</button><button type="button" className="table-button" aria-pressed={status === "Pending"} onClick={() => applyView("pending")}>Pending</button><button type="button" className="table-button" onClick={() => exportCsv("orders.csv", filtered)}><Download /><span>Export</span></button></TableHeader>
    <div className="table-kpis"><div className="table-kpi"><span>Gross volume</span><strong>${totalRevenue.toLocaleString()}</strong></div><div className="table-kpi"><span>Orders</span><strong>{filtered.length}</strong></div><div className="table-kpi"><span>Average order</span><strong>${filtered.length ? Math.round(totalRevenue / filtered.length).toLocaleString() : 0}</strong></div><div className="table-kpi"><span>High risk</span><strong>{filtered.filter((order) => order.risk === "High").length}</strong></div></div>
    <div className="table-filter-row"><TableSelect label="Filter order status" value={status} onChange={(value) => { setStatus(value as "all" | OrderStatus); setPage(1); }} options={[{ value: "all", label: "All statuses" }, ...["Pending", "Processing", "Shipped", "Delivered", "Review"].map((value) => ({ value, label: value }))]} /><TableSelect label="Filter risk" value={risk} onChange={(value) => { setRisk(value as "all" | OrderRecord["risk"]); setPage(1); }} options={[{ value: "all", label: "All risk levels" }, { value: "Low", label: "Low risk" }, { value: "Medium", label: "Medium risk" }, { value: "High", label: "High risk" }]} /><OrderColumnMenu visible={visible} onChange={setVisible} /><div className="flex gap-1" aria-label="Row density">{(["compact", "cozy", "comfortable"] as const).map((value) => <button key={value} type="button" className="table-button capitalize" aria-pressed={density === value} onClick={() => setDensity(value)}>{value}</button>)}</div>{selected.size > 0 && <><span className="table-summary"><strong>{selected.size}</strong> selected</span><button type="button" className="table-button" onClick={() => { setRows((current) => current.filter((order) => !selected.has(order.id))); setSelected(new Set()); }}><Trash2 /><span>Delete</span></button></>}<span className="table-spacer" /><button type="button" className="table-button" onClick={() => applyView("all")}><X /><span>Reset</span></button></div>
    <div className="table-scroll"><table className="table-native"><caption>Enterprise commerce operations orders</caption><thead><tr><th className="w-10"><input className="table-checkbox" type="checkbox" aria-label="Select visible orders" checked={allSelected} onChange={toggleAll} /></th><th className="w-10"><span className="sr-only">Details</span></th><th className="table-sticky-first">Order</th>{ORDER_COLUMNS.filter((column) => visible.has(column)).map((column) => <th key={column} aria-sort={sort.key === column ? (sort.direction === "asc" ? "ascending" : "descending") : undefined}>{column === "total" || column === "created" ? <button type="button" className="table-sort" onClick={() => setSort((current) => current.key === column ? { key: column, direction: current.direction === "asc" ? "desc" : "asc" } : { key: column, direction: "asc" })}>{column}{sort.key === column ? (sort.direction === "asc" ? <ArrowUp /> : <ArrowDown />) : <ChevronsUpDown />}</button> : column}</th>)}</tr></thead><tbody>{displayed.map((order) => <Fragment key={order.id}><tr><td><input className="table-checkbox" type="checkbox" aria-label={`Select ${order.id}`} checked={selected.has(order.id)} onChange={() => setSelected((current) => { const next = new Set(current); if (next.has(order.id)) next.delete(order.id); else next.add(order.id); return next; })} /></td><td><button type="button" className="table-tree-toggle" aria-label={`${expanded === order.id ? "Collapse" : "Expand"} ${order.id}`} aria-expanded={expanded === order.id} onClick={() => setExpanded(expanded === order.id ? null : order.id)}><ChevronRight /></button></td><td className="table-sticky-first"><div className="table-primary table-mono">{order.id}</div><div className="table-secondary">{order.items} items</div></td>{ORDER_COLUMNS.filter((column) => visible.has(column)).map((column) => <OrderCell key={column} column={column} order={order} onStatus={updateStatus} />)}</tr>{expanded === order.id && <tr><td colSpan={visible.size + 3} className="!h-auto !p-0"><div className="table-detail"><dl className="table-detail-grid"><div><dt>Customer</dt><dd>{order.customer}</dd><dd className="table-secondary table-mono">{order.email}</dd></div><div><dt>Fulfillment</dt><dd>{order.items} items via {order.channel}</dd></div><div><dt>Region</dt><dd>{order.region}</dd></div><div><dt>Risk decision</dt><dd>{order.risk === "High" ? "Manual review required" : "Automated checks passed"}</dd></div></dl></div></td></tr>}</Fragment>)}</tbody></table>{displayed.length === 0 && <EmptyState />}</div><TablePagination page={currentPage} pages={pages} count={filtered.length} onPage={setPage} /></div>;
}
function OrderCell({ column, order, onStatus }: { column: OrderColumn; order: OrderRecord; onStatus: (id: string, status: OrderStatus) => void }) {
  if (column === "customer") return <td><div className="table-person"><Initials name={order.customer} /><div className="table-person-copy"><div className="table-primary">{order.customer}</div><div className="table-secondary table-mono">{order.email}</div></div></div></td>;
  if (column === "status") return <td><TableSelect compact label={`Update status for ${order.id}`} value={order.status} onChange={(value) => onStatus(order.id, value as OrderStatus)} options={["Pending", "Processing", "Shipped", "Delivered", "Review"].map((value) => ({ value, label: value }))} /></td>;
  if (column === "payment" || column === "risk") return <td><StatusBadge status={order[column]} /></td>;
  if (column === "total") return <td className="table-primary table-number">${order.total.toLocaleString()}</td>;
  return <td>{order[column]}</td>;
}

function OrderColumnMenu({ visible, onChange }: { visible: Set<OrderColumn>; onChange: (value: Set<OrderColumn>) => void }) {
  return <TableChecklist label={<><Columns3 /><span>Columns</span></>} options={ORDER_COLUMNS.map((column) => ({ value: column, label: column[0].toUpperCase() + column.slice(1) }))} selected={new Set(visible)} disabled={(value) => visible.size === 1 && visible.has(value as OrderColumn)} onToggle={(value) => { const key = value as OrderColumn; const next = new Set(visible); if (next.has(key)) next.delete(key); else next.add(key); onChange(next); }} />;
}

function InventoryTable() {
  const [rows, setRows] = useState(initialInventory);
  const [query, setQuery] = useState("");
  const [health, setHealth] = useState("all");
  const filtered = rows.filter((item) => { const state = item.stock <= item.reorderAt ? "low" : item.stock <= item.reorderAt * 2 ? "watch" : "healthy"; return (health === "all" || health === state) && `${item.sku} ${item.product} ${item.category} ${item.warehouse}`.toLowerCase().includes(query.toLowerCase()); });
  const reorder = (sku: string) => setRows((current) => current.map((item) => item.sku === sku ? { ...item, stock: item.stock + 50 } : item));
  return <div className="flex h-full min-h-0 flex-col"><TableHeader title="Inventory control center" description="Multi-warehouse stock health, reservations, reorder thresholds, and actionable inventory operations."><TableSearch value={query} onChange={setQuery} placeholder="Search products or SKU" /><TableSelect label="Filter stock health" value={health} onChange={setHealth} options={[{ value: "all", label: "All stock health" }, { value: "low", label: "Reorder now" }, { value: "watch", label: "Watch list" }, { value: "healthy", label: "Healthy" }]} /><button type="button" className="table-button" onClick={() => exportCsv("inventory.csv", filtered)}><Download /><span>Export</span></button></TableHeader><div className="table-kpis"><div className="table-kpi"><span>Inventory value</span><strong>${rows.reduce((sum, item) => sum + item.stock * item.price, 0).toLocaleString()}</strong></div><div className="table-kpi"><span>Units available</span><strong>{rows.reduce((sum, item) => sum + item.stock, 0).toLocaleString()}</strong></div><div className="table-kpi"><span>Reserved</span><strong>{rows.reduce((sum, item) => sum + item.reserved, 0)}</strong></div><div className="table-kpi"><span>Reorder alerts</span><strong className="text-rose-500">{rows.filter((item) => item.stock <= item.reorderAt).length}</strong></div></div><div className="table-scroll"><table className="table-native"><caption>Warehouse inventory and stock health</caption><thead><tr><th>Product</th><th>SKU</th><th>Warehouse</th><th>Available</th><th>Reserved</th><th>Unit price</th><th>Health</th><th><span className="sr-only">Actions</span></th></tr></thead><tbody>{filtered.map((item) => { const state = item.stock <= item.reorderAt ? "low" : item.stock <= item.reorderAt * 2 ? "medium" : "success"; return <tr key={`${item.sku}-${item.warehouse}`}><td><div className="table-primary">{item.product}</div><div className="table-secondary">{item.category}</div></td><td className="table-mono">{item.sku}</td><td>{item.warehouse}</td><td className="table-primary table-number">{item.stock}</td><td className="table-number">{item.reserved}</td><td className="table-number">${item.price.toLocaleString()}</td><td><StatusBadge status={state === "low" ? "High" : state === "medium" ? "Medium" : "Success"} /></td><td>{item.stock <= item.reorderAt ? <button type="button" className="table-button table-button-primary" onClick={() => reorder(item.sku)}><Plus /><span>Reorder 50</span></button> : <span className="table-secondary">Threshold {item.reorderAt}</span>}</td></tr>; })}</tbody></table>{filtered.length === 0 && <EmptyState />}</div></div>;
}

const PERMISSION_ROLES = ["Admin", "Editor", "Analyst", "Viewer"] as const;
function PermissionsMatrix() {
  const [scope, setScope] = useState("workspace");
  const [saved, setSaved] = useState(true);
  const [grants, setGrants] = useState<Record<string, Set<string>>>(() => ({ Admin: new Set(permissionRows), Editor: new Set(["View workspace", "Create projects", "Invite members", "Export data"]), Analyst: new Set(["View workspace", "Export data"]), Viewer: new Set(["View workspace"]) }));
  const toggle = (role: string, permission: string) => { setSaved(false); setGrants((current) => { const next = { ...current, [role]: new Set(current[role]) }; if (next[role].has(permission)) next[role].delete(permission); else next[role].add(permission); return next; }); };
  return <div className="flex h-full min-h-0 flex-col"><TableHeader title="Role permission matrix" description="Audit and change access policy across workspace roles with explicit, keyboard-ready controls."><TableSelect label="Permission scope" value={scope} onChange={setScope} options={[{ value: "workspace", label: "Workspace access" }, { value: "projects", label: "Project access" }, { value: "billing", label: "Billing access" }]} /><button type="button" className="table-button table-button-primary" onClick={() => setSaved(true)}><Check /><span>{saved ? "Policy saved" : "Save policy"}</span></button></TableHeader><div className="table-toolbar"><span className="table-summary"><strong>{scope[0].toUpperCase() + scope.slice(1)}</strong> policy · changes apply immediately in this preview</span></div><div className="table-scroll"><table className="table-native"><caption>Role and permission access matrix</caption><thead><tr><th className="table-sticky-first">Permission</th>{PERMISSION_ROLES.map((role) => <th key={role} className="text-center">{role}</th>)}</tr></thead><tbody>{permissionRows.map((permission) => <tr key={permission}><td className="table-sticky-first"><div className="table-primary">{permission}</div><div className="table-secondary">{scope} scope</div></td>{PERMISSION_ROLES.map((role) => <td key={role} className="text-center"><button type="button" className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full border transition ${grants[role].has(permission) ? "border-indigo-500 bg-indigo-500 text-white" : "border-[var(--tbl-border)] text-[var(--tbl-subtle)]"}`} aria-label={`${grants[role].has(permission) ? "Revoke" : "Grant"} ${permission} for ${role}`} aria-pressed={grants[role].has(permission)} disabled={role === "Admin"} onClick={() => toggle(role, permission)}>{grants[role].has(permission) ? <Check className="h-4 w-4" /> : <X className="h-3.5 w-3.5" />}</button></td>)}</tr>)}</tbody></table></div><div className="table-footer" aria-live="polite"><span>{saved ? "Policy changes saved." : "Unsaved permission changes."} Admin permissions are protected.</span></div></div>;
}

function InvoiceLedger() {
  const [rows, setRows] = useState(initialInvoices);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | InvoiceStatus>("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const filtered = rows.filter((invoice) => (status === "all" || invoice.status === status) && `${invoice.id} ${invoice.customer} ${invoice.email}`.toLowerCase().includes(query.toLowerCase()));
  const allSelected = filtered.length > 0 && filtered.every((invoice) => selected.has(invoice.id));
  const toggle = (id: string) => setSelected((current) => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  const markPaid = () => { setRows((current) => current.map((invoice) => selected.has(invoice.id) ? { ...invoice, status: "Paid" } : invoice)); setSelected(new Set()); };
  return <div className="flex h-full min-h-0 flex-col"><TableHeader title="Invoice ledger" description="Accounts-receivable workflow with selection, payment states, collection actions, and clean exports."><TableSearch value={query} onChange={setQuery} placeholder="Search invoices or customers" /><TableSelect label="Filter invoice status" value={status} onChange={(value) => setStatus(value as "all" | InvoiceStatus)} options={[{ value: "all", label: "All invoices" }, { value: "Paid", label: "Paid" }, { value: "Due", label: "Due" }, { value: "Overdue", label: "Overdue" }, { value: "Draft", label: "Draft" }]} /><button type="button" className="table-button" onClick={() => exportCsv("invoices.csv", filtered)}><Download /><span>Export</span></button></TableHeader><div className="table-kpis"><div className="table-kpi"><span>Outstanding</span><strong>${rows.filter((invoice) => invoice.status !== "Paid").reduce((sum, invoice) => sum + invoice.amount, 0).toLocaleString()}</strong></div><div className="table-kpi"><span>Collected</span><strong>${rows.filter((invoice) => invoice.status === "Paid").reduce((sum, invoice) => sum + invoice.amount, 0).toLocaleString()}</strong></div><div className="table-kpi"><span>Overdue</span><strong className="text-rose-500">{rows.filter((invoice) => invoice.status === "Overdue").length}</strong></div><div className="table-kpi"><span>Invoices</span><strong>{rows.length}</strong></div></div>{selected.size > 0 && <div className="table-toolbar" aria-live="polite"><span className="table-summary"><strong>{selected.size}</strong> selected</span><button type="button" className="table-button table-button-primary" onClick={markPaid}><Check /><span>Mark paid</span></button><button type="button" className="table-button" onClick={() => exportCsv("selected-invoices.csv", rows.filter((invoice) => selected.has(invoice.id)))}><Download /><span>Export</span></button><button type="button" className="table-icon-button" aria-label="Clear selection" onClick={() => setSelected(new Set())}><X /></button></div>}<div className="table-scroll"><table className="table-native"><caption>Invoice accounts receivable ledger</caption><thead><tr><th className="w-10"><input type="checkbox" className="table-checkbox" aria-label="Select all invoices" checked={allSelected} onChange={() => setSelected(allSelected ? new Set() : new Set(filtered.map((invoice) => invoice.id)))} /></th><th>Invoice</th><th>Customer</th><th>Issued</th><th>Due date</th><th>Status</th><th>Amount</th></tr></thead><tbody>{filtered.map((invoice) => <tr key={invoice.id}><td><input type="checkbox" className="table-checkbox" aria-label={`Select ${invoice.id}`} checked={selected.has(invoice.id)} onChange={() => toggle(invoice.id)} /></td><td className="table-primary table-mono">{invoice.id}</td><td><div className="table-person"><Initials name={invoice.customer} /><div className="table-person-copy"><div className="table-primary">{invoice.customer}</div><div className="table-secondary table-mono">{invoice.email}</div></div></div></td><td>{invoice.issued}</td><td>{invoice.due}</td><td><StatusBadge status={invoice.status} /></td><td className="table-primary table-number">${invoice.amount.toLocaleString()}</td></tr>)}</tbody></table>{filtered.length === 0 && <EmptyState />}</div></div>;
}

function ComparisonMatrix() {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");
  const [highlight, setHighlight] = useState("pro");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const prices = billing === "annual" ? { starter: 12, pro: 29, enterprise: 79 } : { starter: 15, pro: 36, enterprise: 99 };
  return <div className="flex h-full min-h-0 flex-col"><TableHeader title="Plan comparison matrix" description="A decision-ready feature table with sticky labels, pricing context, and clear plan emphasis."><div className="flex gap-1 rounded-xl bg-[var(--tbl-muted-bg)] p-1" aria-label="Billing period">{(["monthly", "annual"] as const).map((value) => <button type="button" key={value} className="table-button !border-0 !shadow-none capitalize" aria-pressed={billing === value} onClick={() => setBilling(value)}>{value}</button>)}</div></TableHeader><div className="table-scroll"><table className="table-native"><caption>Subscription plan feature comparison</caption><thead><tr><th className="table-sticky-first min-w-[210px]">Capability</th>{(["starter", "pro", "enterprise"] as const).map((plan) => <th key={plan} className={highlight === plan ? "bg-indigo-50 dark:bg-indigo-950/20" : undefined}><button type="button" className="w-full rounded-lg p-2 text-left" aria-pressed={highlight === plan} onClick={() => setHighlight(plan)}><span className="block capitalize text-[11px] font-bold text-[var(--tbl-text)]">{plan}</span><span className="mt-1 block text-[18px] font-bold tracking-tight text-[var(--tbl-text)]">${prices[plan]}<small className="text-[9px] font-medium text-[var(--tbl-subtle)]"> / month</small></span></button></th>)}</tr></thead><tbody>{planFeatures.map((row) => <tr key={row.feature}><td className="table-sticky-first table-primary">{row.feature}</td>{(["starter", "pro", "enterprise"] as const).map((plan) => <td key={plan} className={highlight === plan ? "bg-indigo-50/60 dark:bg-indigo-950/10" : undefined}>{row[plan] === "Included" ? <span className="inline-flex items-center gap-2 font-semibold text-emerald-600"><Check className="h-4 w-4" />Included</span> : row[plan] === "—" ? <span className="table-secondary">Not included</span> : <span className="table-primary">{row[plan]}</span>}</td>)}</tr>)}</tbody><tfoot><tr><td className="table-sticky-first border-t border-[var(--tbl-border)] p-4 text-[11px] text-[var(--tbl-subtle)]">{billing === "annual" ? "Save 20% with annual billing" : "Flexible month-to-month billing"}</td>{(["starter", "pro", "enterprise"] as const).map((plan) => <td key={plan} className="border-t border-[var(--tbl-border)] p-3"><button type="button" className={plan === "pro" ? "table-button table-button-primary w-full" : "table-button w-full"} aria-pressed={selectedPlan === plan} onClick={() => setSelectedPlan(plan)}>{selectedPlan === plan ? `${plan} selected` : `Choose ${plan}`}</button></td>)}</tr></tfoot></table></div></div>;
}
