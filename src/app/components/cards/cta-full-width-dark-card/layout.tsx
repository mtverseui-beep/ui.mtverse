import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full-Width Dark CTA – CTA React Component",
  description: "Full-Width Dark CTA is a production-ready cta React component featuring Full-bleed dark section + gradient text + dual CTA. Copy, customize, and use it in…",
  keywords: ["Full-Width Dark CTA","CTA component","CTA React component","CTA Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/cta-full-width-dark-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/cta-full-width-dark-card",
    title: "Full-Width Dark CTA – CTA React Component",
    description: "Full-Width Dark CTA is a production-ready cta React component featuring Full-bleed dark section + gradient text + dual CTA. Copy, customize, and use it in…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Full-Width Dark CTA – CTA React Component",
    description: "Full-Width Dark CTA is a production-ready cta React component featuring Full-bleed dark section + gradient text + dual CTA. Copy, customize, and use it in…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Full-Width Dark CTA",
  "description": "Full-Width Dark CTA is a production-ready cta React component featuring Full-bleed dark section + gradient text + dual CTA. Copy, customize, and use it in…",
  "url": "https://www.mtverse.dev/components/cards/cta-full-width-dark-card",
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
