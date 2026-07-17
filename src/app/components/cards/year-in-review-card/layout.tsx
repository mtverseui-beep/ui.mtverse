import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Year in Review – Data React Component",
  description: "Year in Review is a production-ready data React component featuring KPI ring + timeline. Copy, customize, and use it in Next.js projects.",
  keywords: ["Year in Review","Data component","Data React component","Data Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/year-in-review-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/year-in-review-card",
    title: "Year in Review – Data React Component",
    description: "Year in Review is a production-ready data React component featuring KPI ring + timeline. Copy, customize, and use it in Next.js projects.",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Year in Review – Data React Component",
    description: "Year in Review is a production-ready data React component featuring KPI ring + timeline. Copy, customize, and use it in Next.js projects.",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Year in Review",
  "description": "Year in Review is a production-ready data React component featuring KPI ring + timeline. Copy, customize, and use it in Next.js projects.",
  "url": "https://www.mtverse.dev/components/cards/year-in-review-card",
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
