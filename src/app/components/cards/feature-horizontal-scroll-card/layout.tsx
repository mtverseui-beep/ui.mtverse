import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Horizontal Scroll Features - Features React Component",
  description: "Horizontal Scroll Features is a production-ready features React component featuring Horizontal scroll-snap carousel + drag + feature cards. Copy, customize,...",
  keywords: ["Horizontal Scroll Features","Features component","Features React component","Features Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/features/feature-horizontal-scroll" },
  openGraph: {
    type: "website",
    url: "/components/features/feature-horizontal-scroll",
    title: "Horizontal Scroll Features - Features React Component",
    description: "Horizontal Scroll Features is a production-ready features React component featuring Horizontal scroll-snap carousel + drag + feature cards. Copy, customize,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Horizontal Scroll Features - Features React Component",
    description: "Horizontal Scroll Features is a production-ready features React component featuring Horizontal scroll-snap carousel + drag + feature cards. Copy, customize,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Horizontal Scroll Features",
  "description": "Horizontal Scroll Features is a production-ready features React component featuring Horizontal scroll-snap carousel + drag + feature cards. Copy, customize,...",
  "url": "https://ui.mtverse.dev/components/features/feature-horizontal-scroll",
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
