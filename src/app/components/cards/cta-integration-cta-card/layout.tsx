import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Integration CTA – CTA React Component",
  description: "Integration CTA is a production-ready cta React component featuring Logo grid + connect your stack + API badge. Copy, customize, and use it in Next.js…",
  keywords: ["Integration CTA","CTA component","CTA React component","CTA Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/cta-integration-cta-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/cta-integration-cta-card",
    title: "Integration CTA – CTA React Component",
    description: "Integration CTA is a production-ready cta React component featuring Logo grid + connect your stack + API badge. Copy, customize, and use it in Next.js…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Integration CTA – CTA React Component",
    description: "Integration CTA is a production-ready cta React component featuring Logo grid + connect your stack + API badge. Copy, customize, and use it in Next.js…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Integration CTA",
  "description": "Integration CTA is a production-ready cta React component featuring Logo grid + connect your stack + API badge. Copy, customize, and use it in Next.js…",
  "url": "https://www.mtverse.dev/components/cards/cta-integration-cta-card",
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
