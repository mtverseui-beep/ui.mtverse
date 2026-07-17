import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Background Video CTA – CTA React Component",
  description: "Background Video CTA is a production-ready cta React component featuring Video bg + overlay text + CTA + immersive. Copy, customize, and use it in Next.js…",
  keywords: ["Background Video CTA","CTA component","CTA React component","CTA Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/cta-background-video-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/cta-background-video-card",
    title: "Background Video CTA – CTA React Component",
    description: "Background Video CTA is a production-ready cta React component featuring Video bg + overlay text + CTA + immersive. Copy, customize, and use it in Next.js…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Background Video CTA – CTA React Component",
    description: "Background Video CTA is a production-ready cta React component featuring Video bg + overlay text + CTA + immersive. Copy, customize, and use it in Next.js…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Background Video CTA",
  "description": "Background Video CTA is a production-ready cta React component featuring Video bg + overlay text + CTA + immersive. Copy, customize, and use it in Next.js…",
  "url": "https://www.mtverse.dev/components/cards/cta-background-video-card",
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
