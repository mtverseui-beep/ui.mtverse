import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cyberpunk Neon Grid Floor Glitch - Testimonials React Component",
  description: "Cyberpunk Neon Grid Floor Glitch is a production-ready testimonials React component featuring Cyberpunk neon grid floor + scanlines + neon glowing border...",
  keywords: ["Cyberpunk Neon Grid Floor Glitch","Testimonials component","Testimonials React component","Testimonials Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/testimonials/testimonials023" },
  openGraph: {
    type: "website",
    url: "/components/testimonials/testimonials023",
    title: "Cyberpunk Neon Grid Floor Glitch - Testimonials React Component",
    description: "Cyberpunk Neon Grid Floor Glitch is a production-ready testimonials React component featuring Cyberpunk neon grid floor + scanlines + neon glowing border...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Cyberpunk Neon Grid Floor Glitch - Testimonials React Component",
    description: "Cyberpunk Neon Grid Floor Glitch is a production-ready testimonials React component featuring Cyberpunk neon grid floor + scanlines + neon glowing border...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Cyberpunk Neon Grid Floor Glitch",
  "description": "Cyberpunk Neon Grid Floor Glitch is a production-ready testimonials React component featuring Cyberpunk neon grid floor + scanlines + neon glowing border...",
  "url": "https://ui.mtverse.dev/components/testimonials/testimonials023",
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
