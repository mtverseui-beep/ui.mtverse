import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Single Featured Auto-Rotate Quote - Testimonials React Component",
  description: "Single Featured Auto-Rotate Quote is a production-ready testimonials React component featuring Single large featured auto-rotating quote + dark bg + dots...",
  keywords: ["Single Featured Auto-Rotate Quote","Testimonials component","Testimonials React component","Testimonials Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/testimonials/testimonials006" },
  openGraph: {
    type: "website",
    url: "/components/testimonials/testimonials006",
    title: "Single Featured Auto-Rotate Quote - Testimonials React Component",
    description: "Single Featured Auto-Rotate Quote is a production-ready testimonials React component featuring Single large featured auto-rotating quote + dark bg + dots...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Single Featured Auto-Rotate Quote - Testimonials React Component",
    description: "Single Featured Auto-Rotate Quote is a production-ready testimonials React component featuring Single large featured auto-rotating quote + dark bg + dots...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Single Featured Auto-Rotate Quote",
  "description": "Single Featured Auto-Rotate Quote is a production-ready testimonials React component featuring Single large featured auto-rotating quote + dark bg + dots...",
  "url": "https://ui.mtverse.dev/components/testimonials/testimonials006",
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
