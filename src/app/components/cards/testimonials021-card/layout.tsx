import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Origami Folded 3D Perspective – Testimonials React Component",
  description: "Origami Folded 3D Perspective is a production-ready testimonials React component featuring Origami folded cards + 3D perspective hover + diagonal corner…",
  keywords: ["Origami Folded 3D Perspective","Testimonials component","Testimonials React component","Testimonials Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/testimonials021-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/testimonials021-card",
    title: "Origami Folded 3D Perspective – Testimonials React Component",
    description: "Origami Folded 3D Perspective is a production-ready testimonials React component featuring Origami folded cards + 3D perspective hover + diagonal corner…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Origami Folded 3D Perspective – Testimonials React Component",
    description: "Origami Folded 3D Perspective is a production-ready testimonials React component featuring Origami folded cards + 3D perspective hover + diagonal corner…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Origami Folded 3D Perspective",
  "description": "Origami Folded 3D Perspective is a production-ready testimonials React component featuring Origami folded cards + 3D perspective hover + diagonal corner…",
  "url": "https://www.mtverse.dev/components/cards/testimonials021-card",
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
