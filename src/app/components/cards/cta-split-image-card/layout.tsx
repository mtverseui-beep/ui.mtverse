import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Split Image CTA - CTA React Component",
  description: "Split Image CTA is a production-ready cta React component featuring Left image + right CTA panel + Unsplash photo. Copy, customize, and use it in Next.js...",
  keywords: ["Split Image CTA","CTA component","CTA React component","CTA Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cta/cta-split-image" },
  openGraph: {
    type: "website",
    url: "/components/cta/cta-split-image",
    title: "Split Image CTA - CTA React Component",
    description: "Split Image CTA is a production-ready cta React component featuring Left image + right CTA panel + Unsplash photo. Copy, customize, and use it in Next.js...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Split Image CTA - CTA React Component",
    description: "Split Image CTA is a production-ready cta React component featuring Left image + right CTA panel + Unsplash photo. Copy, customize, and use it in Next.js...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Split Image CTA",
  "description": "Split Image CTA is a production-ready cta React component featuring Left image + right CTA panel + Unsplash photo. Copy, customize, and use it in Next.js...",
  "url": "https://ui.mtverse.dev/components/cta/cta-split-image",
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
