import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expandable Detail Table - Tables React Component",
  description: "Expandable Detail Table is a production-ready tables React component featuring Keyboard-accessible disclosures · account context · semantic relationships ·...",
  keywords: ["Expandable Detail Table","Tables component","Tables React component","Tables Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/tables/expandable-rows-table" },
  openGraph: {
    type: "website",
    url: "/components/tables/expandable-rows-table",
    title: "Expandable Detail Table - Tables React Component",
    description: "Expandable Detail Table is a production-ready tables React component featuring Keyboard-accessible disclosures · account context · semantic relationships ·...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Expandable Detail Table - Tables React Component",
    description: "Expandable Detail Table is a production-ready tables React component featuring Keyboard-accessible disclosures · account context · semantic relationships ·...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Expandable Detail Table",
  "description": "Expandable Detail Table is a production-ready tables React component featuring Keyboard-accessible disclosures · account context · semantic relationships ·...",
  "url": "https://ui.mtverse.dev/components/tables/expandable-rows-table",
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
