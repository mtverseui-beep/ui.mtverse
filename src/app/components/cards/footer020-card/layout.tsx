import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Startup Dot Grid CTA Band – Footer React Component",
  description: "Startup Dot Grid CTA Band is a production-ready footer React component featuring Startup landing — CTA band + 3 cols + animated dots bg (Launch). Copy,…",
  keywords: ["Startup Dot Grid CTA Band","Footer component","Footer React component","Footer Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/footer020-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/footer020-card",
    title: "Startup Dot Grid CTA Band – Footer React Component",
    description: "Startup Dot Grid CTA Band is a production-ready footer React component featuring Startup landing — CTA band + 3 cols + animated dots bg (Launch). Copy,…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Startup Dot Grid CTA Band – Footer React Component",
    description: "Startup Dot Grid CTA Band is a production-ready footer React component featuring Startup landing — CTA band + 3 cols + animated dots bg (Launch). Copy,…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Startup Dot Grid CTA Band",
  "description": "Startup Dot Grid CTA Band is a production-ready footer React component featuring Startup landing — CTA band + 3 cols + animated dots bg (Launch). Copy,…",
  "url": "https://www.mtverse.dev/components/cards/footer020-card",
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
