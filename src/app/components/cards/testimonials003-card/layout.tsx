import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carousel Prev Next Blur Title – Testimonials React Component",
  description: "Carousel Prev Next Blur Title is a production-ready testimonials React component featuring Carousel with prev/next + blur reveal title (Skydda). Copy,…",
  keywords: ["Carousel Prev Next Blur Title","Testimonials component","Testimonials React component","Testimonials Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/testimonials003-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/testimonials003-card",
    title: "Carousel Prev Next Blur Title – Testimonials React Component",
    description: "Carousel Prev Next Blur Title is a production-ready testimonials React component featuring Carousel with prev/next + blur reveal title (Skydda). Copy,…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carousel Prev Next Blur Title – Testimonials React Component",
    description: "Carousel Prev Next Blur Title is a production-ready testimonials React component featuring Carousel with prev/next + blur reveal title (Skydda). Copy,…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Carousel Prev Next Blur Title",
  "description": "Carousel Prev Next Blur Title is a production-ready testimonials React component featuring Carousel with prev/next + blur reveal title (Skydda). Copy,…",
  "url": "https://www.mtverse.dev/components/cards/testimonials003-card",
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
