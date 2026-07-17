import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory Control Table – Tables React Component",
  description: "Inventory Control Table is a production-ready tables React component featuring Warehouse inventory · stock health · reservations · reorder thresholds ·…",
  keywords: ["Inventory Control Table","Tables component","Tables React component","Tables Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/inventory-table-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/inventory-table-card",
    title: "Inventory Control Table – Tables React Component",
    description: "Inventory Control Table is a production-ready tables React component featuring Warehouse inventory · stock health · reservations · reorder thresholds ·…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inventory Control Table – Tables React Component",
    description: "Inventory Control Table is a production-ready tables React component featuring Warehouse inventory · stock health · reservations · reorder thresholds ·…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Inventory Control Table",
  "description": "Inventory Control Table is a production-ready tables React component featuring Warehouse inventory · stock health · reservations · reorder thresholds ·…",
  "url": "https://www.mtverse.dev/components/cards/inventory-table-card",
  "programmingLanguage": [
    "TypeScript",
    "React",
    "CSS"
  ],
  "runtimePlatform": "Next.js",
  "codeRepository": "https://github.com/mtverse",
  "author": {
    "@type": "Organization",
    "name": "mtverse",
    "url": "https://www.mtverse.dev"
  }
};

export default function ComponentLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\u003c") }}
      />
      {children}
    </>
  );
}
