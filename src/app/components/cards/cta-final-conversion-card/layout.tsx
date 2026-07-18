import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Final Conversion CTA - CTA React Component",
  description: "Final Conversion CTA is a production-ready cta React component featuring Last-chance CTA + urgency + gradient + full-width. Copy, customize, and use it in...",
  keywords: ["Final Conversion CTA","CTA component","CTA React component","CTA Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cta/cta-final-conversion" },
  openGraph: {
    type: "website",
    url: "/components/cta/cta-final-conversion",
    title: "Final Conversion CTA - CTA React Component",
    description: "Final Conversion CTA is a production-ready cta React component featuring Last-chance CTA + urgency + gradient + full-width. Copy, customize, and use it in...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Final Conversion CTA - CTA React Component",
    description: "Final Conversion CTA is a production-ready cta React component featuring Last-chance CTA + urgency + gradient + full-width. Copy, customize, and use it in...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Final Conversion CTA",
  "description": "Final Conversion CTA is a production-ready cta React component featuring Last-chance CTA + urgency + gradient + full-width. Copy, customize, and use it in...",
  "url": "https://ui.mtverse.dev/components/cta/cta-final-conversion",
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
