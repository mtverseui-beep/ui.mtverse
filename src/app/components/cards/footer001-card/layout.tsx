import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevOps Topographic Contours - Footer React Component",
  description: "DevOps Topographic Contours is a production-ready footer React component featuring 6-column grid + animated status pill + dot-grid bg. Copy, customize, and...",
  keywords: ["DevOps Topographic Contours","Footer component","Footer React component","Footer Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/footers/footer001" },
  openGraph: {
    type: "website",
    url: "/components/footers/footer001",
    title: "DevOps Topographic Contours - Footer React Component",
    description: "DevOps Topographic Contours is a production-ready footer React component featuring 6-column grid + animated status pill + dot-grid bg. Copy, customize, and...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "DevOps Topographic Contours - Footer React Component",
    description: "DevOps Topographic Contours is a production-ready footer React component featuring 6-column grid + animated status pill + dot-grid bg. Copy, customize, and...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "DevOps Topographic Contours",
  "description": "DevOps Topographic Contours is a production-ready footer React component featuring 6-column grid + animated status pill + dot-grid bg. Copy, customize, and...",
  "url": "https://ui.mtverse.dev/components/footers/footer001",
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
