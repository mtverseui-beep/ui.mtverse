import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dual Action CTA - CTA React Component",
  description: "Dual Action CTA is a production-ready cta React component featuring Two side-by-side CTA buttons + comparison. Copy, customize, and use it in Next.js...",
  keywords: ["Dual Action CTA","CTA component","CTA React component","CTA Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cta/cta-dual-action" },
  openGraph: {
    type: "website",
    url: "/components/cta/cta-dual-action",
    title: "Dual Action CTA - CTA React Component",
    description: "Dual Action CTA is a production-ready cta React component featuring Two side-by-side CTA buttons + comparison. Copy, customize, and use it in Next.js...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Dual Action CTA - CTA React Component",
    description: "Dual Action CTA is a production-ready cta React component featuring Two side-by-side CTA buttons + comparison. Copy, customize, and use it in Next.js...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Dual Action CTA",
  "description": "Dual Action CTA is a production-ready cta React component featuring Two side-by-side CTA buttons + comparison. Copy, customize, and use it in Next.js...",
  "url": "https://ui.mtverse.dev/components/cta/cta-dual-action",
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
