import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Warm Editorial Grain Outlined – Footer React Component",
  description: "Warm Editorial Grain Outlined is a production-ready footer React component featuring Giant bg text + warm beige + 4 columns + social icons (Lumina). Copy,…",
  keywords: ["Warm Editorial Grain Outlined","Footer component","Footer React component","Footer Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/footer005-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/footer005-card",
    title: "Warm Editorial Grain Outlined – Footer React Component",
    description: "Warm Editorial Grain Outlined is a production-ready footer React component featuring Giant bg text + warm beige + 4 columns + social icons (Lumina). Copy,…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Warm Editorial Grain Outlined – Footer React Component",
    description: "Warm Editorial Grain Outlined is a production-ready footer React component featuring Giant bg text + warm beige + 4 columns + social icons (Lumina). Copy,…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Warm Editorial Grain Outlined",
  "description": "Warm Editorial Grain Outlined is a production-ready footer React component featuring Giant bg text + warm beige + 4 columns + social icons (Lumina). Copy,…",
  "url": "https://www.mtverse.dev/components/cards/footer005-card",
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
