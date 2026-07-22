import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glass Pill Mega Menu Search - Navbar React Component",
  description: "Glass Pill Mega Menu Search is a production-ready navbar React component featuring Scroll-aware glass pill + search + staggered mega menu (Electric...",
  keywords: ["Glass Pill Mega Menu Search","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/navbars/navbar002" },
  openGraph: {
    type: "website",
    url: "/components/navbars/navbar002",
    title: "Glass Pill Mega Menu Search - Navbar React Component",
    description: "Glass Pill Mega Menu Search is a production-ready navbar React component featuring Scroll-aware glass pill + search + staggered mega menu (Electric...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Glass Pill Mega Menu Search - Navbar React Component",
    description: "Glass Pill Mega Menu Search is a production-ready navbar React component featuring Scroll-aware glass pill + search + staggered mega menu (Electric...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Glass Pill Mega Menu Search",
  "description": "Glass Pill Mega Menu Search is a production-ready navbar React component featuring Scroll-aware glass pill + search + staggered mega menu (Electric...",
  "url": "https://ui.mtverse.dev/components/navbars/navbar002",
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
