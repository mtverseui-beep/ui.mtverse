import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Domain Intelligence - Stack React Component",
  description: "Domain Intelligence is a production-ready stack React component featuring Swipe stack + score. Copy, customize, and use it in Next.js projects.",
  keywords: ["Domain Intelligence","Stack component","Stack React component","Stack Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/domain-category-stack" },
  openGraph: {
    type: "website",
    url: "/components/cards/domain-category-stack",
    title: "Domain Intelligence - Stack React Component",
    description: "Domain Intelligence is a production-ready stack React component featuring Swipe stack + score. Copy, customize, and use it in Next.js projects.",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Domain Intelligence - Stack React Component",
    description: "Domain Intelligence is a production-ready stack React component featuring Swipe stack + score. Copy, customize, and use it in Next.js projects.",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Domain Intelligence",
  "description": "Domain Intelligence is a production-ready stack React component featuring Swipe stack + score. Copy, customize, and use it in Next.js projects.",
  "url": "https://ui.mtverse.dev/components/cards/domain-category-stack",
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
