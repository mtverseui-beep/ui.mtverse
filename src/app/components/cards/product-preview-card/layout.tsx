import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Preview - Modals React Component",
  description: "Product Preview is a production-ready modals React component featuring Fullscreen gallery with thumbnails + crossfade transitions. Copy, customize, and use...",
  keywords: ["Product Preview","Modals component","Modals React component","Modals Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/modals/product-preview" },
  openGraph: {
    type: "website",
    url: "/components/modals/product-preview",
    title: "Product Preview - Modals React Component",
    description: "Product Preview is a production-ready modals React component featuring Fullscreen gallery with thumbnails + crossfade transitions. Copy, customize, and use...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Product Preview - Modals React Component",
    description: "Product Preview is a production-ready modals React component featuring Fullscreen gallery with thumbnails + crossfade transitions. Copy, customize, and use...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Product Preview",
  "description": "Product Preview is a production-ready modals React component featuring Fullscreen gallery with thumbnails + crossfade transitions. Copy, customize, and use...",
  "url": "https://ui.mtverse.dev/components/modals/product-preview",
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
