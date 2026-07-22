import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dark Product Features - Features React Component",
  description: "Dark Product Features is a production-ready features React component featuring Dark theme + glow accents + product cards + neon borders. Copy, customize,...",
  keywords: ["Dark Product Features","Features component","Features React component","Features Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/features/feature-dark-product" },
  openGraph: {
    type: "website",
    url: "/components/features/feature-dark-product",
    title: "Dark Product Features - Features React Component",
    description: "Dark Product Features is a production-ready features React component featuring Dark theme + glow accents + product cards + neon borders. Copy, customize,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Dark Product Features - Features React Component",
    description: "Dark Product Features is a production-ready features React component featuring Dark theme + glow accents + product cards + neon borders. Copy, customize,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Dark Product Features",
  "description": "Dark Product Features is a production-ready features React component featuring Dark theme + glow accents + product cards + neon borders. Copy, customize,...",
  "url": "https://ui.mtverse.dev/components/features/feature-dark-product",
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
