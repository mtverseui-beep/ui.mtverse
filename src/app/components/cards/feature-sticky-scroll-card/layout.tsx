import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sticky Scroll Features - Features React Component",
  description: "Sticky Scroll Features is a production-ready features React component featuring Sticky left panel + scrolling right panels + intersection reveal. Copy,...",
  keywords: ["Sticky Scroll Features","Features component","Features React component","Features Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/features/feature-sticky-scroll" },
  openGraph: {
    type: "website",
    url: "/components/features/feature-sticky-scroll",
    title: "Sticky Scroll Features - Features React Component",
    description: "Sticky Scroll Features is a production-ready features React component featuring Sticky left panel + scrolling right panels + intersection reveal. Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Sticky Scroll Features - Features React Component",
    description: "Sticky Scroll Features is a production-ready features React component featuring Sticky left panel + scrolling right panels + intersection reveal. Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Sticky Scroll Features",
  "description": "Sticky Scroll Features is a production-ready features React component featuring Sticky left panel + scrolling right panels + intersection reveal. Copy,...",
  "url": "https://ui.mtverse.dev/components/features/feature-sticky-scroll",
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
