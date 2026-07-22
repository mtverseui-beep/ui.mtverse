import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dual-Row Scroll Blur Reveal Glow - Testimonials React Component",
  description: "Dual-Row Scroll Blur Reveal Glow is a production-ready testimonials React component featuring Dual-row scroll + blur reveal title + colored glow cards....",
  keywords: ["Dual-Row Scroll Blur Reveal Glow","Testimonials component","Testimonials React component","Testimonials Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/testimonials/testimonials002" },
  openGraph: {
    type: "website",
    url: "/components/testimonials/testimonials002",
    title: "Dual-Row Scroll Blur Reveal Glow - Testimonials React Component",
    description: "Dual-Row Scroll Blur Reveal Glow is a production-ready testimonials React component featuring Dual-row scroll + blur reveal title + colored glow cards....",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Dual-Row Scroll Blur Reveal Glow - Testimonials React Component",
    description: "Dual-Row Scroll Blur Reveal Glow is a production-ready testimonials React component featuring Dual-row scroll + blur reveal title + colored glow cards....",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Dual-Row Scroll Blur Reveal Glow",
  "description": "Dual-Row Scroll Blur Reveal Glow is a production-ready testimonials React component featuring Dual-row scroll + blur reveal title + colored glow cards....",
  "url": "https://ui.mtverse.dev/components/testimonials/testimonials002",
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
