import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Architectural Folds – Backgrounds React Component",
  description: "Architectural Folds is a production-ready backgrounds React component featuring Quiet geometric planes · editorial hierarchy · no floating paper animation.…",
  keywords: ["Architectural Folds","Backgrounds component","Backgrounds React component","Backgrounds Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/origami-folds-bg-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/origami-folds-bg-card",
    title: "Architectural Folds – Backgrounds React Component",
    description: "Architectural Folds is a production-ready backgrounds React component featuring Quiet geometric planes · editorial hierarchy · no floating paper animation.…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Architectural Folds – Backgrounds React Component",
    description: "Architectural Folds is a production-ready backgrounds React component featuring Quiet geometric planes · editorial hierarchy · no floating paper animation.…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Architectural Folds",
  "description": "Architectural Folds is a production-ready backgrounds React component featuring Quiet geometric planes · editorial hierarchy · no floating paper animation.…",
  "url": "https://www.mtverse.dev/components/cards/origami-folds-bg-card",
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
