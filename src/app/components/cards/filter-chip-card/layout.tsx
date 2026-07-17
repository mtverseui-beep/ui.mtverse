import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Filter Chips – Buttons React Component",
  description: "Filter Chips is a production-ready buttons React component featuring Removable + toggle + add input. Copy, customize, and use it in Next.js projects.",
  keywords: ["Filter Chips","Buttons component","Buttons React component","Buttons Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/filter-chip-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/filter-chip-card",
    title: "Filter Chips – Buttons React Component",
    description: "Filter Chips is a production-ready buttons React component featuring Removable + toggle + add input. Copy, customize, and use it in Next.js projects.",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Filter Chips – Buttons React Component",
    description: "Filter Chips is a production-ready buttons React component featuring Removable + toggle + add input. Copy, customize, and use it in Next.js projects.",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Filter Chips",
  "description": "Filter Chips is a production-ready buttons React component featuring Removable + toggle + add input. Copy, customize, and use it in Next.js projects.",
  "url": "https://www.mtverse.dev/components/cards/filter-chip-card",
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
