import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glass Pill Mega Menu Search – Navbar React Component",
  description: "Glass Pill Mega Menu Search is a production-ready navbar React component featuring Scroll-aware glass pill + search + staggered mega menu (Electric…",
  keywords: ["Glass Pill Mega Menu Search","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/navbar002-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/navbar002-card",
    title: "Glass Pill Mega Menu Search – Navbar React Component",
    description: "Glass Pill Mega Menu Search is a production-ready navbar React component featuring Scroll-aware glass pill + search + staggered mega menu (Electric…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Glass Pill Mega Menu Search – Navbar React Component",
    description: "Glass Pill Mega Menu Search is a production-ready navbar React component featuring Scroll-aware glass pill + search + staggered mega menu (Electric…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Glass Pill Mega Menu Search",
  "description": "Glass Pill Mega Menu Search is a production-ready navbar React component featuring Scroll-aware glass pill + search + staggered mega menu (Electric…",
  "url": "https://www.mtverse.dev/components/cards/navbar002-card",
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
