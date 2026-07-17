import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aurora Glass 3D Tilt Cards – Testimonials React Component",
  description: "Aurora Glass 3D Tilt Cards is a production-ready testimonials React component featuring Glassmorphism aurora blobs + 3D tilt-on-hover cards + backdrop blur.…",
  keywords: ["Aurora Glass 3D Tilt Cards","Testimonials component","Testimonials React component","Testimonials Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/testimonials011-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/testimonials011-card",
    title: "Aurora Glass 3D Tilt Cards – Testimonials React Component",
    description: "Aurora Glass 3D Tilt Cards is a production-ready testimonials React component featuring Glassmorphism aurora blobs + 3D tilt-on-hover cards + backdrop blur.…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurora Glass 3D Tilt Cards – Testimonials React Component",
    description: "Aurora Glass 3D Tilt Cards is a production-ready testimonials React component featuring Glassmorphism aurora blobs + 3D tilt-on-hover cards + backdrop blur.…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Aurora Glass 3D Tilt Cards",
  "description": "Aurora Glass 3D Tilt Cards is a production-ready testimonials React component featuring Glassmorphism aurora blobs + 3D tilt-on-hover cards + backdrop blur.…",
  "url": "https://www.mtverse.dev/components/cards/testimonials011-card",
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
