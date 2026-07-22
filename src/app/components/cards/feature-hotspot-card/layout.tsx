import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive Hotspot - Features React Component",
  description: "Interactive Hotspot is a production-ready features React component featuring Product image + clickable hotspots + tooltip popovers + pulse dots. Copy,...",
  keywords: ["Interactive Hotspot","Features component","Features React component","Features Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/features/feature-hotspot" },
  openGraph: {
    type: "website",
    url: "/components/features/feature-hotspot",
    title: "Interactive Hotspot - Features React Component",
    description: "Interactive Hotspot is a production-ready features React component featuring Product image + clickable hotspots + tooltip popovers + pulse dots. Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Interactive Hotspot - Features React Component",
    description: "Interactive Hotspot is a production-ready features React component featuring Product image + clickable hotspots + tooltip popovers + pulse dots. Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Interactive Hotspot",
  "description": "Interactive Hotspot is a production-ready features React component featuring Product image + clickable hotspots + tooltip popovers + pulse dots. Copy,...",
  "url": "https://ui.mtverse.dev/components/features/feature-hotspot",
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
