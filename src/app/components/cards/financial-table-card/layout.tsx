import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Market Intelligence Table - Tables React Component",
  description: "Market Intelligence Table is a production-ready tables React component featuring Watchlist interactions · market KPIs · top-mover sorting · tabular finance...",
  keywords: ["Market Intelligence Table","Tables component","Tables React component","Tables Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/tables/financial-table" },
  openGraph: {
    type: "website",
    url: "/components/tables/financial-table",
    title: "Market Intelligence Table - Tables React Component",
    description: "Market Intelligence Table is a production-ready tables React component featuring Watchlist interactions · market KPIs · top-mover sorting · tabular finance...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Market Intelligence Table - Tables React Component",
    description: "Market Intelligence Table is a production-ready tables React component featuring Watchlist interactions · market KPIs · top-mover sorting · tabular finance...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Market Intelligence Table",
  "description": "Market Intelligence Table is a production-ready tables React component featuring Watchlist interactions · market KPIs · top-mover sorting · tabular finance...",
  "url": "https://ui.mtverse.dev/components/tables/financial-table",
  "programmingLanguage": [
    "TypeScript",
    "React",
    "CSS"
  ],
  "runtimePlatform": "Next.js",
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
