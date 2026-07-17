import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Preview – Modals React Component",
  description: "Product Preview is a production-ready modals React component featuring Fullscreen gallery with thumbnails + crossfade transitions. Copy, customize, and use…",
  keywords: ["Product Preview","Modals component","Modals React component","Modals Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/product-preview-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/product-preview-card",
    title: "Product Preview – Modals React Component",
    description: "Product Preview is a production-ready modals React component featuring Fullscreen gallery with thumbnails + crossfade transitions. Copy, customize, and use…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Preview – Modals React Component",
    description: "Product Preview is a production-ready modals React component featuring Fullscreen gallery with thumbnails + crossfade transitions. Copy, customize, and use…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Product Preview",
  "description": "Product Preview is a production-ready modals React component featuring Fullscreen gallery with thumbnails + crossfade transitions. Copy, customize, and use…",
  "url": "https://www.mtverse.dev/components/cards/product-preview-card",
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
