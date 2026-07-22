import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faceted Glass - Backgrounds React Component",
  description: "Faceted Glass is a production-ready backgrounds React component featuring Architectural SVG facets · translucent premium depth · no rotating shards. Copy,...",
  keywords: ["Faceted Glass","Backgrounds component","Backgrounds React component","Backgrounds Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/backgrounds/crystal-shards-bg" },
  openGraph: {
    type: "website",
    url: "/components/backgrounds/crystal-shards-bg",
    title: "Faceted Glass - Backgrounds React Component",
    description: "Faceted Glass is a production-ready backgrounds React component featuring Architectural SVG facets · translucent premium depth · no rotating shards. Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Faceted Glass - Backgrounds React Component",
    description: "Faceted Glass is a production-ready backgrounds React component featuring Architectural SVG facets · translucent premium depth · no rotating shards. Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Faceted Glass",
  "description": "Faceted Glass is a production-ready backgrounds React component featuring Architectural SVG facets · translucent premium depth · no rotating shards. Copy,...",
  "url": "https://ui.mtverse.dev/components/backgrounds/crystal-shards-bg",
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
