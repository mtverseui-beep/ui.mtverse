import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bento CTA - CTA React Component",
  description: "Bento CTA is a production-ready cta React component featuring Mixed-size bento grid + CTA tiles + hover glow. Copy, customize, and use it in Next.js projects.",
  keywords: ["Bento CTA","CTA component","CTA React component","CTA Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cta/cta-bento" },
  openGraph: {
    type: "website",
    url: "/components/cta/cta-bento",
    title: "Bento CTA - CTA React Component",
    description: "Bento CTA is a production-ready cta React component featuring Mixed-size bento grid + CTA tiles + hover glow. Copy, customize, and use it in Next.js projects.",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Bento CTA - CTA React Component",
    description: "Bento CTA is a production-ready cta React component featuring Mixed-size bento grid + CTA tiles + hover glow. Copy, customize, and use it in Next.js projects.",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Bento CTA",
  "description": "Bento CTA is a production-ready cta React component featuring Mixed-size bento grid + CTA tiles + hover glow. Copy, customize, and use it in Next.js projects.",
  "url": "https://ui.mtverse.dev/components/cta/cta-bento",
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
