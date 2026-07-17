import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compact Utility Marquee Strip – Footer React Component",
  description: "Compact Utility Marquee Strip is a production-ready footer React component featuring Compact utility — single row nav + 2 rows total (Swift). Copy,…",
  keywords: ["Compact Utility Marquee Strip","Footer component","Footer React component","Footer Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/footer022-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/footer022-card",
    title: "Compact Utility Marquee Strip – Footer React Component",
    description: "Compact Utility Marquee Strip is a production-ready footer React component featuring Compact utility — single row nav + 2 rows total (Swift). Copy,…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compact Utility Marquee Strip – Footer React Component",
    description: "Compact Utility Marquee Strip is a production-ready footer React component featuring Compact utility — single row nav + 2 rows total (Swift). Copy,…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Compact Utility Marquee Strip",
  "description": "Compact Utility Marquee Strip is a production-ready footer React component featuring Compact utility — single row nav + 2 rows total (Swift). Copy,…",
  "url": "https://www.mtverse.dev/components/cards/footer022-card",
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
