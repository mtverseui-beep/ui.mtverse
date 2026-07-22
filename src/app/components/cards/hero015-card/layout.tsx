import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scroll-Driven Cinematic Parallax - Hero React Component",
  description: "Scroll-Driven Cinematic Parallax is a production-ready hero React component featuring Scroll-driven cinematic — parallax layers + scale heading + morphing...",
  keywords: ["Scroll-Driven Cinematic Parallax","Hero component","Hero React component","Hero Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/heroes/hero015" },
  openGraph: {
    type: "website",
    url: "/components/heroes/hero015",
    title: "Scroll-Driven Cinematic Parallax - Hero React Component",
    description: "Scroll-Driven Cinematic Parallax is a production-ready hero React component featuring Scroll-driven cinematic — parallax layers + scale heading + morphing...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Scroll-Driven Cinematic Parallax - Hero React Component",
    description: "Scroll-Driven Cinematic Parallax is a production-ready hero React component featuring Scroll-driven cinematic — parallax layers + scale heading + morphing...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Scroll-Driven Cinematic Parallax",
  "description": "Scroll-Driven Cinematic Parallax is a production-ready hero React component featuring Scroll-driven cinematic — parallax layers + scale heading + morphing...",
  "url": "https://ui.mtverse.dev/components/heroes/hero015",
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
