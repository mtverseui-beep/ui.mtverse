import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Infinite Scroll Columns Marquee - Testimonials React Component",
  description: "Infinite Scroll Columns Marquee is a production-ready testimonials React component featuring 3-column infinite scroll + logo marquee. Copy, customize, and...",
  keywords: ["Infinite Scroll Columns Marquee","Testimonials component","Testimonials React component","Testimonials Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/testimonials/testimonials" },
  openGraph: {
    type: "website",
    url: "/components/testimonials/testimonials",
    title: "Infinite Scroll Columns Marquee - Testimonials React Component",
    description: "Infinite Scroll Columns Marquee is a production-ready testimonials React component featuring 3-column infinite scroll + logo marquee. Copy, customize, and...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Infinite Scroll Columns Marquee - Testimonials React Component",
    description: "Infinite Scroll Columns Marquee is a production-ready testimonials React component featuring 3-column infinite scroll + logo marquee. Copy, customize, and...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Infinite Scroll Columns Marquee",
  "description": "Infinite Scroll Columns Marquee is a production-ready testimonials React component featuring 3-column infinite scroll + logo marquee. Copy, customize, and...",
  "url": "https://ui.mtverse.dev/components/testimonials/testimonials",
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
