import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Origami Folded 3D Perspective - Testimonials React Component",
  description: "Origami Folded 3D Perspective is a production-ready testimonials React component featuring Origami folded cards + 3D perspective hover + diagonal corner...",
  keywords: ["Origami Folded 3D Perspective","Testimonials component","Testimonials React component","Testimonials Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/testimonials/testimonials021" },
  openGraph: {
    type: "website",
    url: "/components/testimonials/testimonials021",
    title: "Origami Folded 3D Perspective - Testimonials React Component",
    description: "Origami Folded 3D Perspective is a production-ready testimonials React component featuring Origami folded cards + 3D perspective hover + diagonal corner...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Origami Folded 3D Perspective - Testimonials React Component",
    description: "Origami Folded 3D Perspective is a production-ready testimonials React component featuring Origami folded cards + 3D perspective hover + diagonal corner...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Origami Folded 3D Perspective",
  "description": "Origami Folded 3D Perspective is a production-ready testimonials React component featuring Origami folded cards + 3D perspective hover + diagonal corner...",
  "url": "https://ui.mtverse.dev/components/testimonials/testimonials021",
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
