import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brutalist Offset Shadow Grid – Testimonials React Component",
  description: "Brutalist Offset Shadow Grid is a production-ready testimonials React component featuring Brutalist black/yellow offset shadow grid + Archivo Black + dashed…",
  keywords: ["Brutalist Offset Shadow Grid","Testimonials component","Testimonials React component","Testimonials Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/testimonials007-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/testimonials007-card",
    title: "Brutalist Offset Shadow Grid – Testimonials React Component",
    description: "Brutalist Offset Shadow Grid is a production-ready testimonials React component featuring Brutalist black/yellow offset shadow grid + Archivo Black + dashed…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brutalist Offset Shadow Grid – Testimonials React Component",
    description: "Brutalist Offset Shadow Grid is a production-ready testimonials React component featuring Brutalist black/yellow offset shadow grid + Archivo Black + dashed…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Brutalist Offset Shadow Grid",
  "description": "Brutalist Offset Shadow Grid is a production-ready testimonials React component featuring Brutalist black/yellow offset shadow grid + Archivo Black + dashed…",
  "url": "https://www.mtverse.dev/components/cards/testimonials007-card",
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
