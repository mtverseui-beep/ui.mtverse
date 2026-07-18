import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brutalist Offset Shadow Grid - Testimonials React Component",
  description: "Brutalist Offset Shadow Grid is a production-ready testimonials React component featuring Brutalist black/yellow offset shadow grid + Archivo Black + dashed...",
  keywords: ["Brutalist Offset Shadow Grid","Testimonials component","Testimonials React component","Testimonials Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/testimonials/testimonials007" },
  openGraph: {
    type: "website",
    url: "/components/testimonials/testimonials007",
    title: "Brutalist Offset Shadow Grid - Testimonials React Component",
    description: "Brutalist Offset Shadow Grid is a production-ready testimonials React component featuring Brutalist black/yellow offset shadow grid + Archivo Black + dashed...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Brutalist Offset Shadow Grid - Testimonials React Component",
    description: "Brutalist Offset Shadow Grid is a production-ready testimonials React component featuring Brutalist black/yellow offset shadow grid + Archivo Black + dashed...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Brutalist Offset Shadow Grid",
  "description": "Brutalist Offset Shadow Grid is a production-ready testimonials React component featuring Brutalist black/yellow offset shadow grid + Archivo Black + dashed...",
  "url": "https://ui.mtverse.dev/components/testimonials/testimonials007",
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
