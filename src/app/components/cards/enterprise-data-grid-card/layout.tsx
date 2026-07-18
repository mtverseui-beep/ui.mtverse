import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commerce Operations Grid - Tables React Component",
  description: "Commerce Operations Grid is a production-ready tables React component featuring Saved operational views · KPI summary · advanced filters · column controls ·...",
  keywords: ["Commerce Operations Grid","Tables component","Tables React component","Tables Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/tables/enterprise-data-grid" },
  openGraph: {
    type: "website",
    url: "/components/tables/enterprise-data-grid",
    title: "Commerce Operations Grid - Tables React Component",
    description: "Commerce Operations Grid is a production-ready tables React component featuring Saved operational views · KPI summary · advanced filters · column controls ·...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Commerce Operations Grid - Tables React Component",
    description: "Commerce Operations Grid is a production-ready tables React component featuring Saved operational views · KPI summary · advanced filters · column controls ·...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Commerce Operations Grid",
  "description": "Commerce Operations Grid is a production-ready tables React component featuring Saved operational views · KPI summary · advanced filters · column controls ·...",
  "url": "https://ui.mtverse.dev/components/tables/enterprise-data-grid",
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
