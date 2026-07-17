import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bento Grid Mixed Size Tiles – Testimonials React Component",
  description: "Bento Grid Mixed Size Tiles is a production-ready testimonials React component featuring Bento grid mixed-size tiles + featured large + hover glow + Quote…",
  keywords: ["Bento Grid Mixed Size Tiles","Testimonials component","Testimonials React component","Testimonials Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/testimonials018-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/testimonials018-card",
    title: "Bento Grid Mixed Size Tiles – Testimonials React Component",
    description: "Bento Grid Mixed Size Tiles is a production-ready testimonials React component featuring Bento grid mixed-size tiles + featured large + hover glow + Quote…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bento Grid Mixed Size Tiles – Testimonials React Component",
    description: "Bento Grid Mixed Size Tiles is a production-ready testimonials React component featuring Bento grid mixed-size tiles + featured large + hover glow + Quote…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Bento Grid Mixed Size Tiles",
  "description": "Bento Grid Mixed Size Tiles is a production-ready testimonials React component featuring Bento grid mixed-size tiles + featured large + hover glow + Quote…",
  "url": "https://www.mtverse.dev/components/cards/testimonials018-card",
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
