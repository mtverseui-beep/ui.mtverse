import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timeline Features - Features React Component",
  description: "Timeline Features is a production-ready features React component featuring Vertical timeline + alternating cards + scroll-triggered animation. Copy,...",
  keywords: ["Timeline Features","Features component","Features React component","Features Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/features/feature-timeline" },
  openGraph: {
    type: "website",
    url: "/components/features/feature-timeline",
    title: "Timeline Features - Features React Component",
    description: "Timeline Features is a production-ready features React component featuring Vertical timeline + alternating cards + scroll-triggered animation. Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Timeline Features - Features React Component",
    description: "Timeline Features is a production-ready features React component featuring Vertical timeline + alternating cards + scroll-triggered animation. Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Timeline Features",
  "description": "Timeline Features is a production-ready features React component featuring Vertical timeline + alternating cards + scroll-triggered animation. Copy,...",
  "url": "https://ui.mtverse.dev/components/features/feature-timeline",
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
