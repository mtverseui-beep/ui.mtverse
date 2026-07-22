import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apple Minimal Spacious Large Quotes - Testimonials React Component",
  description: "Apple Minimal Spacious Large Quotes is a production-ready testimonials React component featuring Apple-style minimal spacious large quotes + SF Pro-like +...",
  keywords: ["Apple Minimal Spacious Large Quotes","Testimonials component","Testimonials React component","Testimonials Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/testimonials/testimonials015" },
  openGraph: {
    type: "website",
    url: "/components/testimonials/testimonials015",
    title: "Apple Minimal Spacious Large Quotes - Testimonials React Component",
    description: "Apple Minimal Spacious Large Quotes is a production-ready testimonials React component featuring Apple-style minimal spacious large quotes + SF Pro-like +...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Apple Minimal Spacious Large Quotes - Testimonials React Component",
    description: "Apple Minimal Spacious Large Quotes is a production-ready testimonials React component featuring Apple-style minimal spacious large quotes + SF Pro-like +...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Apple Minimal Spacious Large Quotes",
  "description": "Apple Minimal Spacious Large Quotes is a production-ready testimonials React component featuring Apple-style minimal spacious large quotes + SF Pro-like +...",
  "url": "https://ui.mtverse.dev/components/testimonials/testimonials015",
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
