import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Warm Editorial Grain Outlined - Footer React Component",
  description: "Warm Editorial Grain Outlined is a production-ready footer React component featuring Giant bg text + warm beige + 4 columns + social icons (Lumina). Copy,...",
  keywords: ["Warm Editorial Grain Outlined","Footer component","Footer React component","Footer Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/footers/footer005" },
  openGraph: {
    type: "website",
    url: "/components/footers/footer005",
    title: "Warm Editorial Grain Outlined - Footer React Component",
    description: "Warm Editorial Grain Outlined is a production-ready footer React component featuring Giant bg text + warm beige + 4 columns + social icons (Lumina). Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Warm Editorial Grain Outlined - Footer React Component",
    description: "Warm Editorial Grain Outlined is a production-ready footer React component featuring Giant bg text + warm beige + 4 columns + social icons (Lumina). Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Warm Editorial Grain Outlined",
  "description": "Warm Editorial Grain Outlined is a production-ready footer React component featuring Giant bg text + warm beige + 4 columns + social icons (Lumina). Copy,...",
  "url": "https://ui.mtverse.dev/components/footers/footer005",
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
