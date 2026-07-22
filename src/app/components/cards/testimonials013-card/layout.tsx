import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Horizontal Scroll-Snap Carousel - Testimonials React Component",
  description: "Horizontal Scroll-Snap Carousel is a production-ready testimonials React component featuring Horizontal scroll-snap carousel + prev/next arrows + dark slate...",
  keywords: ["Horizontal Scroll-Snap Carousel","Testimonials component","Testimonials React component","Testimonials Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/testimonials/testimonials013" },
  openGraph: {
    type: "website",
    url: "/components/testimonials/testimonials013",
    title: "Horizontal Scroll-Snap Carousel - Testimonials React Component",
    description: "Horizontal Scroll-Snap Carousel is a production-ready testimonials React component featuring Horizontal scroll-snap carousel + prev/next arrows + dark slate...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Horizontal Scroll-Snap Carousel - Testimonials React Component",
    description: "Horizontal Scroll-Snap Carousel is a production-ready testimonials React component featuring Horizontal scroll-snap carousel + prev/next arrows + dark slate...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Horizontal Scroll-Snap Carousel",
  "description": "Horizontal Scroll-Snap Carousel is a production-ready testimonials React component featuring Horizontal scroll-snap carousel + prev/next arrows + dark slate...",
  "url": "https://ui.mtverse.dev/components/testimonials/testimonials013",
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
