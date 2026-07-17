import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Horizontal Scroll Features – Features React Component",
  description: "Horizontal Scroll Features is a production-ready features React component featuring Horizontal scroll-snap carousel + drag + feature cards. Copy, customize,…",
  keywords: ["Horizontal Scroll Features","Features component","Features React component","Features Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/feature-horizontal-scroll-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/feature-horizontal-scroll-card",
    title: "Horizontal Scroll Features – Features React Component",
    description: "Horizontal Scroll Features is a production-ready features React component featuring Horizontal scroll-snap carousel + drag + feature cards. Copy, customize,…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Horizontal Scroll Features – Features React Component",
    description: "Horizontal Scroll Features is a production-ready features React component featuring Horizontal scroll-snap carousel + drag + feature cards. Copy, customize,…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Horizontal Scroll Features",
  "description": "Horizontal Scroll Features is a production-ready features React component featuring Horizontal scroll-snap carousel + drag + feature cards. Copy, customize,…",
  "url": "https://www.mtverse.dev/components/cards/feature-horizontal-scroll-card",
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
