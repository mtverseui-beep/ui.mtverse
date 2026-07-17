import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industry Verticals Comparison – Testimonials React Component",
  description: "Industry Verticals Comparison is a production-ready testimonials React component featuring Industry verticals comparison + 4 categories with icons +…",
  keywords: ["Industry Verticals Comparison","Testimonials component","Testimonials React component","Testimonials Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/testimonials020-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/testimonials020-card",
    title: "Industry Verticals Comparison – Testimonials React Component",
    description: "Industry Verticals Comparison is a production-ready testimonials React component featuring Industry verticals comparison + 4 categories with icons +…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Industry Verticals Comparison – Testimonials React Component",
    description: "Industry Verticals Comparison is a production-ready testimonials React component featuring Industry verticals comparison + 4 categories with icons +…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Industry Verticals Comparison",
  "description": "Industry Verticals Comparison is a production-ready testimonials React component featuring Industry verticals comparison + 4 categories with icons +…",
  "url": "https://www.mtverse.dev/components/cards/testimonials020-card",
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
