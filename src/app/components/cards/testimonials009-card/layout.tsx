import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Testimonial Play Buttons – Testimonials React Component",
  description: "Video Testimonial Play Buttons is a production-ready testimonials React component featuring Video testimonial cards with play buttons + Unsplash thumbnails…",
  keywords: ["Video Testimonial Play Buttons","Testimonials component","Testimonials React component","Testimonials Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/testimonials009-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/testimonials009-card",
    title: "Video Testimonial Play Buttons – Testimonials React Component",
    description: "Video Testimonial Play Buttons is a production-ready testimonials React component featuring Video testimonial cards with play buttons + Unsplash thumbnails…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Video Testimonial Play Buttons – Testimonials React Component",
    description: "Video Testimonial Play Buttons is a production-ready testimonials React component featuring Video testimonial cards with play buttons + Unsplash thumbnails…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Video Testimonial Play Buttons",
  "description": "Video Testimonial Play Buttons is a production-ready testimonials React component featuring Video testimonial cards with play buttons + Unsplash thumbnails…",
  "url": "https://www.mtverse.dev/components/cards/testimonials009-card",
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
