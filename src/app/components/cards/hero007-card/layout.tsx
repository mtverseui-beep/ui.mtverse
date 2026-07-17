import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pastel Animated Birds Butterflies – Hero React Component",
  description: "Pastel Animated Birds Butterflies is a production-ready hero React component featuring Pastel bg + animated birds/butterflies/leaves/clouds + stats…",
  keywords: ["Pastel Animated Birds Butterflies","Hero component","Hero React component","Hero Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/hero007-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/hero007-card",
    title: "Pastel Animated Birds Butterflies – Hero React Component",
    description: "Pastel Animated Birds Butterflies is a production-ready hero React component featuring Pastel bg + animated birds/butterflies/leaves/clouds + stats…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pastel Animated Birds Butterflies – Hero React Component",
    description: "Pastel Animated Birds Butterflies is a production-ready hero React component featuring Pastel bg + animated birds/butterflies/leaves/clouds + stats…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Pastel Animated Birds Butterflies",
  "description": "Pastel Animated Birds Butterflies is a production-ready hero React component featuring Pastel bg + animated birds/butterflies/leaves/clouds + stats…",
  "url": "https://www.mtverse.dev/components/cards/hero007-card",
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
