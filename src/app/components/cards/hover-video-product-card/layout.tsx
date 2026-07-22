import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media Product - Product React Component",
  description: "Media Product is a production-ready product React component featuring Hover video reveal. Copy, customize, and use it in Next.js projects.",
  keywords: ["Media Product","Product component","Product React component","Product Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/hover-video-product" },
  openGraph: {
    type: "website",
    url: "/components/cards/hover-video-product",
    title: "Media Product - Product React Component",
    description: "Media Product is a production-ready product React component featuring Hover video reveal. Copy, customize, and use it in Next.js projects.",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Media Product - Product React Component",
    description: "Media Product is a production-ready product React component featuring Hover video reveal. Copy, customize, and use it in Next.js projects.",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Media Product",
  "description": "Media Product is a production-ready product React component featuring Hover video reveal. Copy, customize, and use it in Next.js projects.",
  "url": "https://ui.mtverse.dev/components/cards/hover-video-product",
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
