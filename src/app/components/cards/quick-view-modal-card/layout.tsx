import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quick View Modal - Modals React Component",
  description: "Quick View Modal is a production-ready modals React component featuring Product quick view with image + price + color swatches + add to cart. Copy,...",
  keywords: ["Quick View Modal","Modals component","Modals React component","Modals Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/modals/quick-view-modal" },
  openGraph: {
    type: "website",
    url: "/components/modals/quick-view-modal",
    title: "Quick View Modal - Modals React Component",
    description: "Quick View Modal is a production-ready modals React component featuring Product quick view with image + price + color swatches + add to cart. Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Quick View Modal - Modals React Component",
    description: "Quick View Modal is a production-ready modals React component featuring Product quick view with image + price + color swatches + add to cart. Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Quick View Modal",
  "description": "Quick View Modal is a production-ready modals React component featuring Product quick view with image + price + color swatches + add to cart. Copy,...",
  "url": "https://ui.mtverse.dev/components/modals/quick-view-modal",
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
