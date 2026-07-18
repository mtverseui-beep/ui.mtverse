import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comparison Table Sticky Column - Pricing React Component",
  description: "Comparison Table Sticky Column is a production-ready pricing React component featuring Single-column comparison table + sticky feature col + checkmarks...",
  keywords: ["Comparison Table Sticky Column","Pricing component","Pricing React component","Pricing Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/pricing/pricing015" },
  openGraph: {
    type: "website",
    url: "/components/pricing/pricing015",
    title: "Comparison Table Sticky Column - Pricing React Component",
    description: "Comparison Table Sticky Column is a production-ready pricing React component featuring Single-column comparison table + sticky feature col + checkmarks...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Comparison Table Sticky Column - Pricing React Component",
    description: "Comparison Table Sticky Column is a production-ready pricing React component featuring Single-column comparison table + sticky feature col + checkmarks...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Comparison Table Sticky Column",
  "description": "Comparison Table Sticky Column is a production-ready pricing React component featuring Single-column comparison table + sticky feature col + checkmarks...",
  "url": "https://ui.mtverse.dev/components/pricing/pricing015",
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
