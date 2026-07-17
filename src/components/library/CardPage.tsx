import { CardShowcase } from "./CardShowcase";

interface CardPageProps {
  slug: string;
  children: React.ReactNode;
}

export function CardPage({ slug, children }: CardPageProps) {
  return <CardShowcase slug={slug}>{children}</CardShowcase>;
}