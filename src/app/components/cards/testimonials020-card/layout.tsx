import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industry Verticals Comparison - Testimonials React Component",
  description: "Industry Verticals Comparison is a production-ready testimonials React component featuring Industry verticals comparison + 4 categories with icons +...",
  keywords: ["Industry Verticals Comparison","Testimonials component","Testimonials React component","Testimonials Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/testimonials/testimonials020" },
  openGraph: {
    type: "website",
    url: "/components/testimonials/testimonials020",
    title: "Industry Verticals Comparison - Testimonials React Component",
    description: "Industry Verticals Comparison is a production-ready testimonials React component featuring Industry verticals comparison + 4 categories with icons +...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Industry Verticals Comparison - Testimonials React Component",
    description: "Industry Verticals Comparison is a production-ready testimonials React component featuring Industry verticals comparison + 4 categories with icons +...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Industry Verticals Comparison",
  "description": "Industry Verticals Comparison is a production-ready testimonials React component featuring Industry verticals comparison + 4 categories with icons +...",
  "url": "https://ui.mtverse.dev/components/testimonials/testimonials020",
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
