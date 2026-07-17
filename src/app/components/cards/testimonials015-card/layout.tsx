import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apple Minimal Spacious Large Quotes – Testimonials React Component",
  description: "Apple Minimal Spacious Large Quotes is a production-ready testimonials React component featuring Apple-style minimal spacious large quotes + SF Pro-like +…",
  keywords: ["Apple Minimal Spacious Large Quotes","Testimonials component","Testimonials React component","Testimonials Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/testimonials015-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/testimonials015-card",
    title: "Apple Minimal Spacious Large Quotes – Testimonials React Component",
    description: "Apple Minimal Spacious Large Quotes is a production-ready testimonials React component featuring Apple-style minimal spacious large quotes + SF Pro-like +…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apple Minimal Spacious Large Quotes – Testimonials React Component",
    description: "Apple Minimal Spacious Large Quotes is a production-ready testimonials React component featuring Apple-style minimal spacious large quotes + SF Pro-like +…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Apple Minimal Spacious Large Quotes",
  "description": "Apple Minimal Spacious Large Quotes is a production-ready testimonials React component featuring Apple-style minimal spacious large quotes + SF Pro-like +…",
  "url": "https://www.mtverse.dev/components/cards/testimonials015-card",
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
