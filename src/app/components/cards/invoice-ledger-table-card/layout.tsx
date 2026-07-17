import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invoice Ledger Table – Tables React Component",
  description: "Invoice Ledger Table is a production-ready tables React component featuring Receivables KPIs · invoice status filtering · row selection · mark-paid workflow…",
  keywords: ["Invoice Ledger Table","Tables component","Tables React component","Tables Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/invoice-ledger-table-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/invoice-ledger-table-card",
    title: "Invoice Ledger Table – Tables React Component",
    description: "Invoice Ledger Table is a production-ready tables React component featuring Receivables KPIs · invoice status filtering · row selection · mark-paid workflow…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Invoice Ledger Table – Tables React Component",
    description: "Invoice Ledger Table is a production-ready tables React component featuring Receivables KPIs · invoice status filtering · row selection · mark-paid workflow…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Invoice Ledger Table",
  "description": "Invoice Ledger Table is a production-ready tables React component featuring Receivables KPIs · invoice status filtering · row selection · mark-paid workflow…",
  "url": "https://www.mtverse.dev/components/cards/invoice-ledger-table-card",
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
