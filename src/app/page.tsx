import { redirect } from "next/navigation";
import { premiumRoutes } from "@/components/cards-data/cards";

export default function Home() {
  redirect(premiumRoutes[0]?.href ?? "/components/premium/sticky-agent-cards");
}
