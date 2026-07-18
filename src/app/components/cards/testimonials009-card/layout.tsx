import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Testimonial Play Buttons - Testimonials React Component",
  description: "Video Testimonial Play Buttons is a production-ready testimonials React component featuring Video testimonial cards with play buttons + Unsplash thumbnails...",
  keywords: ["Video Testimonial Play Buttons","Testimonials component","Testimonials React component","Testimonials Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/testimonials/testimonials009" },
  openGraph: {
    type: "website",
    url: "/components/testimonials/testimonials009",
    title: "Video Testimonial Play Buttons - Testimonials React Component",
    description: "Video Testimonial Play Buttons is a production-ready testimonials React component featuring Video testimonial cards with play buttons + Unsplash thumbnails...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Video Testimonial Play Buttons - Testimonials React Component",
    description: "Video Testimonial Play Buttons is a production-ready testimonials React component featuring Video testimonial cards with play buttons + Unsplash thumbnails...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Video Testimonial Play Buttons",
  "description": "Video Testimonial Play Buttons is a production-ready testimonials React component featuring Video testimonial cards with play buttons + Unsplash thumbnails...",
  "url": "https://ui.mtverse.dev/components/testimonials/testimonials009",
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
