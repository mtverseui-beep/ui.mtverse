import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Holographic Iridescent Conic Border - Testimonials React Component",
  description: "Holographic Iridescent Conic Border is a production-ready testimonials React component featuring Holographic iridescent rotating conic-gradient borders +...",
  keywords: ["Holographic Iridescent Conic Border","Testimonials component","Testimonials React component","Testimonials Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/testimonials/testimonials019" },
  openGraph: {
    type: "website",
    url: "/components/testimonials/testimonials019",
    title: "Holographic Iridescent Conic Border - Testimonials React Component",
    description: "Holographic Iridescent Conic Border is a production-ready testimonials React component featuring Holographic iridescent rotating conic-gradient borders +...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Holographic Iridescent Conic Border - Testimonials React Component",
    description: "Holographic Iridescent Conic Border is a production-ready testimonials React component featuring Holographic iridescent rotating conic-gradient borders +...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Holographic Iridescent Conic Border",
  "description": "Holographic Iridescent Conic Border is a production-ready testimonials React component featuring Holographic iridescent rotating conic-gradient borders +...",
  "url": "https://ui.mtverse.dev/components/testimonials/testimonials019",
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
