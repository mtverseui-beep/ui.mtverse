import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dark Luxury Gold Cormorant Serif – Pricing React Component",
  description: "Dark Luxury Gold Cormorant Serif is a production-ready pricing React component featuring Dark luxury gold sweep + Cormorant serif + corner flourishes…",
  keywords: ["Dark Luxury Gold Cormorant Serif","Pricing component","Pricing React component","Pricing Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/pricing010-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/pricing010-card",
    title: "Dark Luxury Gold Cormorant Serif – Pricing React Component",
    description: "Dark Luxury Gold Cormorant Serif is a production-ready pricing React component featuring Dark luxury gold sweep + Cormorant serif + corner flourishes…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dark Luxury Gold Cormorant Serif – Pricing React Component",
    description: "Dark Luxury Gold Cormorant Serif is a production-ready pricing React component featuring Dark luxury gold sweep + Cormorant serif + corner flourishes…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Dark Luxury Gold Cormorant Serif",
  "description": "Dark Luxury Gold Cormorant Serif is a production-ready pricing React component featuring Dark luxury gold sweep + Cormorant serif + corner flourishes…",
  "url": "https://www.mtverse.dev/components/cards/pricing010-card",
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
