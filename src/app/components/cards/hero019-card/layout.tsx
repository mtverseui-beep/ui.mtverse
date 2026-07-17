import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bold Typography Floating Tags – Hero React Component",
  description: "Bold Typography Floating Tags is a production-ready hero React component featuring Magnetic field — 80 particles attracted to cursor + connection lines +…",
  keywords: ["Bold Typography Floating Tags","Hero component","Hero React component","Hero Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/hero019-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/hero019-card",
    title: "Bold Typography Floating Tags – Hero React Component",
    description: "Bold Typography Floating Tags is a production-ready hero React component featuring Magnetic field — 80 particles attracted to cursor + connection lines +…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bold Typography Floating Tags – Hero React Component",
    description: "Bold Typography Floating Tags is a production-ready hero React component featuring Magnetic field — 80 particles attracted to cursor + connection lines +…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Bold Typography Floating Tags",
  "description": "Bold Typography Floating Tags is a production-ready hero React component featuring Magnetic field — 80 particles attracted to cursor + connection lines +…",
  "url": "https://www.mtverse.dev/components/cards/hero019-card",
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
