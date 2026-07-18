import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ecommerce Product - Product React Component",
  description: "Ecommerce Product is a production-ready product React component featuring Zoom + quick view. Copy, customize, and use it in Next.js projects.",
  keywords: ["Ecommerce Product","Product component","Product React component","Product Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/ecommerce-product" },
  openGraph: {
    type: "website",
    url: "/components/cards/ecommerce-product",
    title: "Ecommerce Product - Product React Component",
    description: "Ecommerce Product is a production-ready product React component featuring Zoom + quick view. Copy, customize, and use it in Next.js projects.",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Ecommerce Product - Product React Component",
    description: "Ecommerce Product is a production-ready product React component featuring Zoom + quick view. Copy, customize, and use it in Next.js projects.",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Ecommerce Product",
  "description": "Ecommerce Product is a production-ready product React component featuring Zoom + quick view. Copy, customize, and use it in Next.js projects.",
  "url": "https://ui.mtverse.dev/components/cards/ecommerce-product",
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
