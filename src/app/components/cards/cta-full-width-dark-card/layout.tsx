import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full-Width Dark CTA - CTA React Component",
  description: "Full-Width Dark CTA is a production-ready cta React component featuring Full-bleed dark section + gradient text + dual CTA. Copy, customize, and use it in...",
  keywords: ["Full-Width Dark CTA","CTA component","CTA React component","CTA Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cta/cta-full-width-dark" },
  openGraph: {
    type: "website",
    url: "/components/cta/cta-full-width-dark",
    title: "Full-Width Dark CTA - CTA React Component",
    description: "Full-Width Dark CTA is a production-ready cta React component featuring Full-bleed dark section + gradient text + dual CTA. Copy, customize, and use it in...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Full-Width Dark CTA - CTA React Component",
    description: "Full-Width Dark CTA is a production-ready cta React component featuring Full-bleed dark section + gradient text + dual CTA. Copy, customize, and use it in...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Full-Width Dark CTA",
  "description": "Full-Width Dark CTA is a production-ready cta React component featuring Full-bleed dark section + gradient text + dual CTA. Copy, customize, and use it in...",
  "url": "https://ui.mtverse.dev/components/cta/cta-full-width-dark",
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
