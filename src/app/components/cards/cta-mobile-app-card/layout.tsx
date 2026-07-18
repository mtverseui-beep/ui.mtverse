import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile App CTA - CTA React Component",
  description: "Mobile App CTA is a production-ready cta React component featuring App screenshot + features + download buttons. Copy, customize, and use it in Next.js...",
  keywords: ["Mobile App CTA","CTA component","CTA React component","CTA Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cta/cta-mobile-app" },
  openGraph: {
    type: "website",
    url: "/components/cta/cta-mobile-app",
    title: "Mobile App CTA - CTA React Component",
    description: "Mobile App CTA is a production-ready cta React component featuring App screenshot + features + download buttons. Copy, customize, and use it in Next.js...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Mobile App CTA - CTA React Component",
    description: "Mobile App CTA is a production-ready cta React component featuring App screenshot + features + download buttons. Copy, customize, and use it in Next.js...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Mobile App CTA",
  "description": "Mobile App CTA is a production-ready cta React component featuring App screenshot + features + download buttons. Copy, customize, and use it in Next.js...",
  "url": "https://ui.mtverse.dev/components/cta/cta-mobile-app",
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
