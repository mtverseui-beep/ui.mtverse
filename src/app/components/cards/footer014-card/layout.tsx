import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Centered Concentric Rings Brand – Footer React Component",
  description: "Centered Concentric Rings Brand is a production-ready footer React component featuring Centered brand — perfectly symmetric + concentric rings bg (Aether).…",
  keywords: ["Centered Concentric Rings Brand","Footer component","Footer React component","Footer Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/footer014-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/footer014-card",
    title: "Centered Concentric Rings Brand – Footer React Component",
    description: "Centered Concentric Rings Brand is a production-ready footer React component featuring Centered brand — perfectly symmetric + concentric rings bg (Aether).…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Centered Concentric Rings Brand – Footer React Component",
    description: "Centered Concentric Rings Brand is a production-ready footer React component featuring Centered brand — perfectly symmetric + concentric rings bg (Aether).…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Centered Concentric Rings Brand",
  "description": "Centered Concentric Rings Brand is a production-ready footer React component featuring Centered brand — perfectly symmetric + concentric rings bg (Aether).…",
  "url": "https://www.mtverse.dev/components/cards/footer014-card",
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
