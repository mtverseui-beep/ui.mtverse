import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Bar – Forms React Component",
  description: "Search Bar is a production-ready forms React component featuring Live results + highlight + keyboard nav. Copy, customize, and use it in Next.js projects.",
  keywords: ["Search Bar","Forms component","Forms React component","Forms Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/search-bar-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/search-bar-card",
    title: "Search Bar – Forms React Component",
    description: "Search Bar is a production-ready forms React component featuring Live results + highlight + keyboard nav. Copy, customize, and use it in Next.js projects.",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Search Bar – Forms React Component",
    description: "Search Bar is a production-ready forms React component featuring Live results + highlight + keyboard nav. Copy, customize, and use it in Next.js projects.",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Search Bar",
  "description": "Search Bar is a production-ready forms React component featuring Live results + highlight + keyboard nav. Copy, customize, and use it in Next.js projects.",
  "url": "https://www.mtverse.dev/components/cards/search-bar-card",
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
