import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dual-Row Scroll Blur Reveal Glow – Testimonials React Component",
  description: "Dual-Row Scroll Blur Reveal Glow is a production-ready testimonials React component featuring Dual-row scroll + blur reveal title + colored glow cards.…",
  keywords: ["Dual-Row Scroll Blur Reveal Glow","Testimonials component","Testimonials React component","Testimonials Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/testimonials002-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/testimonials002-card",
    title: "Dual-Row Scroll Blur Reveal Glow – Testimonials React Component",
    description: "Dual-Row Scroll Blur Reveal Glow is a production-ready testimonials React component featuring Dual-row scroll + blur reveal title + colored glow cards.…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dual-Row Scroll Blur Reveal Glow – Testimonials React Component",
    description: "Dual-Row Scroll Blur Reveal Glow is a production-ready testimonials React component featuring Dual-row scroll + blur reveal title + colored glow cards.…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Dual-Row Scroll Blur Reveal Glow",
  "description": "Dual-Row Scroll Blur Reveal Glow is a production-ready testimonials React component featuring Dual-row scroll + blur reveal title + colored glow cards.…",
  "url": "https://www.mtverse.dev/components/cards/testimonials002-card",
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
