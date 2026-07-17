import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Typewriter Gradient Trusted Logos – Hero React Component",
  description: "Typewriter Gradient Trusted Logos is a production-ready hero React component featuring Typewriter input + gradient headline + CTAs + trusted logos…",
  keywords: ["Typewriter Gradient Trusted Logos","Hero component","Hero React component","Hero Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/hero005-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/hero005-card",
    title: "Typewriter Gradient Trusted Logos – Hero React Component",
    description: "Typewriter Gradient Trusted Logos is a production-ready hero React component featuring Typewriter input + gradient headline + CTAs + trusted logos…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Typewriter Gradient Trusted Logos – Hero React Component",
    description: "Typewriter Gradient Trusted Logos is a production-ready hero React component featuring Typewriter input + gradient headline + CTAs + trusted logos…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Typewriter Gradient Trusted Logos",
  "description": "Typewriter Gradient Trusted Logos is a production-ready hero React component featuring Typewriter input + gradient headline + CTAs + trusted logos…",
  "url": "https://www.mtverse.dev/components/cards/hero005-card",
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
