import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Multi-Level Accordion Mega – Footer React Component",
  description: "Multi-Level Accordion Mega is a production-ready footer React component featuring Multi-level mega — expandable accordion categories + newsletter…",
  keywords: ["Multi-Level Accordion Mega","Footer component","Footer React component","Footer Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/footer023-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/footer023-card",
    title: "Multi-Level Accordion Mega – Footer React Component",
    description: "Multi-Level Accordion Mega is a production-ready footer React component featuring Multi-level mega — expandable accordion categories + newsletter…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Multi-Level Accordion Mega – Footer React Component",
    description: "Multi-Level Accordion Mega is a production-ready footer React component featuring Multi-level mega — expandable accordion categories + newsletter…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Multi-Level Accordion Mega",
  "description": "Multi-Level Accordion Mega is a production-ready footer React component featuring Multi-level mega — expandable accordion categories + newsletter…",
  "url": "https://www.mtverse.dev/components/cards/footer023-card",
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
