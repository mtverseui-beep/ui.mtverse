import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dark Luxury Gold Cormorant Italic – Testimonials React Component",
  description: "Dark Luxury Gold Cormorant Italic is a production-ready testimonials React component featuring Dark luxury gold serif + Cormorant Garamond + gold gradient…",
  keywords: ["Dark Luxury Gold Cormorant Italic","Testimonials component","Testimonials React component","Testimonials Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/testimonials017-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/testimonials017-card",
    title: "Dark Luxury Gold Cormorant Italic – Testimonials React Component",
    description: "Dark Luxury Gold Cormorant Italic is a production-ready testimonials React component featuring Dark luxury gold serif + Cormorant Garamond + gold gradient…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dark Luxury Gold Cormorant Italic – Testimonials React Component",
    description: "Dark Luxury Gold Cormorant Italic is a production-ready testimonials React component featuring Dark luxury gold serif + Cormorant Garamond + gold gradient…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Dark Luxury Gold Cormorant Italic",
  "description": "Dark Luxury Gold Cormorant Italic is a production-ready testimonials React component featuring Dark luxury gold serif + Cormorant Garamond + gold gradient…",
  "url": "https://www.mtverse.dev/components/cards/testimonials017-card",
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
