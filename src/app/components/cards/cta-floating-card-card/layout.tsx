import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Floating Card CTA - CTA React Component",
  description: "Floating Card CTA is a production-ready cta React component featuring Glassmorphism floating card + gradient bg + glow. Copy, customize, and use it in...",
  keywords: ["Floating Card CTA","CTA component","CTA React component","CTA Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cta/cta-floating-card" },
  openGraph: {
    type: "website",
    url: "/components/cta/cta-floating-card",
    title: "Floating Card CTA - CTA React Component",
    description: "Floating Card CTA is a production-ready cta React component featuring Glassmorphism floating card + gradient bg + glow. Copy, customize, and use it in...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Floating Card CTA - CTA React Component",
    description: "Floating Card CTA is a production-ready cta React component featuring Glassmorphism floating card + gradient bg + glow. Copy, customize, and use it in...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Floating Card CTA",
  "description": "Floating Card CTA is a production-ready cta React component featuring Glassmorphism floating card + gradient bg + glow. Copy, customize, and use it in...",
  "url": "https://ui.mtverse.dev/components/cta/cta-floating-card",
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
