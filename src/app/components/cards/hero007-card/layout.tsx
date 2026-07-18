import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pastel Animated Birds Butterflies - Hero React Component",
  description: "Pastel Animated Birds Butterflies is a production-ready hero React component featuring Pastel bg + animated birds/butterflies/leaves/clouds + stats...",
  keywords: ["Pastel Animated Birds Butterflies","Hero component","Hero React component","Hero Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/heroes/hero007" },
  openGraph: {
    type: "website",
    url: "/components/heroes/hero007",
    title: "Pastel Animated Birds Butterflies - Hero React Component",
    description: "Pastel Animated Birds Butterflies is a production-ready hero React component featuring Pastel bg + animated birds/butterflies/leaves/clouds + stats...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Pastel Animated Birds Butterflies - Hero React Component",
    description: "Pastel Animated Birds Butterflies is a production-ready hero React component featuring Pastel bg + animated birds/butterflies/leaves/clouds + stats...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Pastel Animated Birds Butterflies",
  "description": "Pastel Animated Birds Butterflies is a production-ready hero React component featuring Pastel bg + animated birds/butterflies/leaves/clouds + stats...",
  "url": "https://ui.mtverse.dev/components/heroes/hero007",
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
