import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dark Luxury Gold Cormorant Serif - Pricing React Component",
  description: "Dark Luxury Gold Cormorant Serif is a production-ready pricing React component featuring Dark luxury gold sweep + Cormorant serif + corner flourishes...",
  keywords: ["Dark Luxury Gold Cormorant Serif","Pricing component","Pricing React component","Pricing Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/pricing/pricing010" },
  openGraph: {
    type: "website",
    url: "/components/pricing/pricing010",
    title: "Dark Luxury Gold Cormorant Serif - Pricing React Component",
    description: "Dark Luxury Gold Cormorant Serif is a production-ready pricing React component featuring Dark luxury gold sweep + Cormorant serif + corner flourishes...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Dark Luxury Gold Cormorant Serif - Pricing React Component",
    description: "Dark Luxury Gold Cormorant Serif is a production-ready pricing React component featuring Dark luxury gold sweep + Cormorant serif + corner flourishes...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Dark Luxury Gold Cormorant Serif",
  "description": "Dark Luxury Gold Cormorant Serif is a production-ready pricing React component featuring Dark luxury gold sweep + Cormorant serif + corner flourishes...",
  "url": "https://ui.mtverse.dev/components/pricing/pricing010",
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
