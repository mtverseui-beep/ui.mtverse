import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stats Big Numbers Hybrid Grid – Testimonials React Component",
  description: "Stats Big Numbers Hybrid Grid is a production-ready testimonials React component featuring Stats + testimonials hybrid with big numbers + indigo gradient…",
  keywords: ["Stats Big Numbers Hybrid Grid","Testimonials component","Testimonials React component","Testimonials Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/testimonials010-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/testimonials010-card",
    title: "Stats Big Numbers Hybrid Grid – Testimonials React Component",
    description: "Stats Big Numbers Hybrid Grid is a production-ready testimonials React component featuring Stats + testimonials hybrid with big numbers + indigo gradient…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stats Big Numbers Hybrid Grid – Testimonials React Component",
    description: "Stats Big Numbers Hybrid Grid is a production-ready testimonials React component featuring Stats + testimonials hybrid with big numbers + indigo gradient…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Stats Big Numbers Hybrid Grid",
  "description": "Stats Big Numbers Hybrid Grid is a production-ready testimonials React component featuring Stats + testimonials hybrid with big numbers + indigo gradient…",
  "url": "https://www.mtverse.dev/components/cards/testimonials010-card",
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
