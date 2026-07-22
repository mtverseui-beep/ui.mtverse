import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Integration Features - Features React Component",
  description: "Integration Features is a production-ready features React component featuring Logo grid + integration cards + hover zoom + API badges. Copy, customize, and...",
  keywords: ["Integration Features","Features component","Features React component","Features Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/features/feature-integration" },
  openGraph: {
    type: "website",
    url: "/components/features/feature-integration",
    title: "Integration Features - Features React Component",
    description: "Integration Features is a production-ready features React component featuring Logo grid + integration cards + hover zoom + API badges. Copy, customize, and...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Integration Features - Features React Component",
    description: "Integration Features is a production-ready features React component featuring Logo grid + integration cards + hover zoom + API badges. Copy, customize, and...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Integration Features",
  "description": "Integration Features is a production-ready features React component featuring Logo grid + integration cards + hover zoom + API badges. Copy, customize, and...",
  "url": "https://ui.mtverse.dev/components/features/feature-integration",
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
