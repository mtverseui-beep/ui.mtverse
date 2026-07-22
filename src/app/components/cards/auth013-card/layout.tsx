import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Origami Folded Auth - Auth React Component",
  description: "Origami Folded Auth is a production-ready auth React component featuring Origami folded card 3D perspective hover + diagonal corner accents + Space Grotesk....",
  keywords: ["Origami Folded Auth","Auth component","Auth React component","Auth Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/auth/auth013" },
  openGraph: {
    type: "website",
    url: "/components/auth/auth013",
    title: "Origami Folded Auth - Auth React Component",
    description: "Origami Folded Auth is a production-ready auth React component featuring Origami folded card 3D perspective hover + diagonal corner accents + Space Grotesk....",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Origami Folded Auth - Auth React Component",
    description: "Origami Folded Auth is a production-ready auth React component featuring Origami folded card 3D perspective hover + diagonal corner accents + Space Grotesk....",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Origami Folded Auth",
  "description": "Origami Folded Auth is a production-ready auth React component featuring Origami folded card 3D perspective hover + diagonal corner accents + Space Grotesk....",
  "url": "https://ui.mtverse.dev/components/auth/auth013",
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
