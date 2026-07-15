import { DashboardShell } from "@/components/shell/DashboardShell";

/**
 * Persistent shell layout for all card routes.
 *
 * This layout wraps every /components/cards/[slug] route in a single
 * DashboardShell instance. When the user navigates between cards, only the
 * children (the card showcase) swap — the shell (sidebars, header, breadcrumbs)
 * stays mounted and never re-renders or shakes.
 *
 * This is the Next.js App Router equivalent of a persistent layout: the shell
 * renders once, and React preserves its state across route changes.
 */
export default function CardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
