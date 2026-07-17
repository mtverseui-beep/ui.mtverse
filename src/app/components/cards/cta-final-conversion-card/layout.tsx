import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Final Conversion CTA – CTA React Component",
  description: "Final Conversion CTA is a production-ready cta React component featuring Last-chance CTA + urgency + gradient + full-width. Copy, customize, and use it in…",
  keywords: ["Final Conversion CTA","CTA component","CTA React component","CTA Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/cta-final-conversion-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/cta-final-conversion-card",
    title: "Final Conversion CTA – CTA React Component",
    description: "Final Conversion CTA is a production-ready cta React component featuring Last-chance CTA + urgency + gradient + full-width. Copy, customize, and use it in…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Final Conversion CTA – CTA React Component",
    description: "Final Conversion CTA is a production-ready cta React component featuring Last-chance CTA + urgency + gradient + full-width. Copy, customize, and use it in…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Final Conversion CTA",
  "description": "Final Conversion CTA is a production-ready cta React component featuring Last-chance CTA + urgency + gradient + full-width. Copy, customize, and use it in…",
  "url": "https://www.mtverse.dev/components/cards/cta-final-conversion-card",
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
