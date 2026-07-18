import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Statistics CTA - CTA React Component",
  description: "Statistics CTA is a production-ready cta React component featuring Big numbers + animated counters + CTA below. Copy, customize, and use it in Next.js...",
  keywords: ["Statistics CTA","CTA component","CTA React component","CTA Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cta/cta-statistics" },
  openGraph: {
    type: "website",
    url: "/components/cta/cta-statistics",
    title: "Statistics CTA - CTA React Component",
    description: "Statistics CTA is a production-ready cta React component featuring Big numbers + animated counters + CTA below. Copy, customize, and use it in Next.js...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Statistics CTA - CTA React Component",
    description: "Statistics CTA is a production-ready cta React component featuring Big numbers + animated counters + CTA below. Copy, customize, and use it in Next.js...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Statistics CTA",
  "description": "Statistics CTA is a production-ready cta React component featuring Big numbers + animated counters + CTA below. Copy, customize, and use it in Next.js...",
  "url": "https://ui.mtverse.dev/components/cta/cta-statistics",
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
