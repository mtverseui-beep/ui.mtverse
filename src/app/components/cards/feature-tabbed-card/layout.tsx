import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tabbed Features - Features React Component",
  description: "Tabbed Features is a production-ready features React component featuring Tab switcher + animated content panels + layoutId indicator. Copy, customize, and...",
  keywords: ["Tabbed Features","Features component","Features React component","Features Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/features/feature-tabbed" },
  openGraph: {
    type: "website",
    url: "/components/features/feature-tabbed",
    title: "Tabbed Features - Features React Component",
    description: "Tabbed Features is a production-ready features React component featuring Tab switcher + animated content panels + layoutId indicator. Copy, customize, and...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Tabbed Features - Features React Component",
    description: "Tabbed Features is a production-ready features React component featuring Tab switcher + animated content panels + layoutId indicator. Copy, customize, and...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Tabbed Features",
  "description": "Tabbed Features is a production-ready features React component featuring Tab switcher + animated content panels + layoutId indicator. Copy, customize, and...",
  "url": "https://ui.mtverse.dev/components/features/feature-tabbed",
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
