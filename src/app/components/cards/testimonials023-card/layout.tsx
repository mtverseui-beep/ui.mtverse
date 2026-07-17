import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cyberpunk Neon Grid Floor Glitch – Testimonials React Component",
  description: "Cyberpunk Neon Grid Floor Glitch is a production-ready testimonials React component featuring Cyberpunk neon grid floor + scanlines + neon glowing border…",
  keywords: ["Cyberpunk Neon Grid Floor Glitch","Testimonials component","Testimonials React component","Testimonials Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/testimonials023-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/testimonials023-card",
    title: "Cyberpunk Neon Grid Floor Glitch – Testimonials React Component",
    description: "Cyberpunk Neon Grid Floor Glitch is a production-ready testimonials React component featuring Cyberpunk neon grid floor + scanlines + neon glowing border…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyberpunk Neon Grid Floor Glitch – Testimonials React Component",
    description: "Cyberpunk Neon Grid Floor Glitch is a production-ready testimonials React component featuring Cyberpunk neon grid floor + scanlines + neon glowing border…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Cyberpunk Neon Grid Floor Glitch",
  "description": "Cyberpunk Neon Grid Floor Glitch is a production-ready testimonials React component featuring Cyberpunk neon grid floor + scanlines + neon glowing border…",
  "url": "https://www.mtverse.dev/components/cards/testimonials023-card",
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
