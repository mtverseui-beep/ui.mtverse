import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bg Image Staggered Blur Serif - Hero React Component",
  description: "Bg Image Staggered Blur Serif is a production-ready hero React component featuring Bg image + staggered blur-in + serif headline + scroll indicator...",
  keywords: ["Bg Image Staggered Blur Serif","Hero component","Hero React component","Hero Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/heroes/hero011" },
  openGraph: {
    type: "website",
    url: "/components/heroes/hero011",
    title: "Bg Image Staggered Blur Serif - Hero React Component",
    description: "Bg Image Staggered Blur Serif is a production-ready hero React component featuring Bg image + staggered blur-in + serif headline + scroll indicator...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Bg Image Staggered Blur Serif - Hero React Component",
    description: "Bg Image Staggered Blur Serif is a production-ready hero React component featuring Bg image + staggered blur-in + serif headline + scroll indicator...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Bg Image Staggered Blur Serif",
  "description": "Bg Image Staggered Blur Serif is a production-ready hero React component featuring Bg image + staggered blur-in + serif headline + scroll indicator...",
  "url": "https://ui.mtverse.dev/components/heroes/hero011",
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
