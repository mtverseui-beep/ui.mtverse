import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metrics Features – Features React Component",
  description: "Metrics Features is a production-ready features React component featuring Big animated counters + feature cards + gradient stat blocks. Copy, customize, and…",
  keywords: ["Metrics Features","Features component","Features React component","Features Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/feature-metrics-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/feature-metrics-card",
    title: "Metrics Features – Features React Component",
    description: "Metrics Features is a production-ready features React component featuring Big animated counters + feature cards + gradient stat blocks. Copy, customize, and…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Metrics Features – Features React Component",
    description: "Metrics Features is a production-ready features React component featuring Big animated counters + feature cards + gradient stat blocks. Copy, customize, and…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Metrics Features",
  "description": "Metrics Features is a production-ready features React component featuring Big animated counters + feature cards + gradient stat blocks. Copy, customize, and…",
  "url": "https://www.mtverse.dev/components/cards/feature-metrics-card",
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
