import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staggered Fade Avatar Stack Stars - Hero React Component",
  description: "Staggered Fade Avatar Stack Stars is a production-ready hero React component featuring Staggered fade-up + avatar stack + star rating (Minimalist). Copy,...",
  keywords: ["Staggered Fade Avatar Stack Stars","Hero component","Hero React component","Hero Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/heroes/hero006" },
  openGraph: {
    type: "website",
    url: "/components/heroes/hero006",
    title: "Staggered Fade Avatar Stack Stars - Hero React Component",
    description: "Staggered Fade Avatar Stack Stars is a production-ready hero React component featuring Staggered fade-up + avatar stack + star rating (Minimalist). Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Staggered Fade Avatar Stack Stars - Hero React Component",
    description: "Staggered Fade Avatar Stack Stars is a production-ready hero React component featuring Staggered fade-up + avatar stack + star rating (Minimalist). Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Staggered Fade Avatar Stack Stars",
  "description": "Staggered Fade Avatar Stack Stars is a production-ready hero React component featuring Staggered fade-up + avatar stack + star rating (Minimalist). Copy,...",
  "url": "https://ui.mtverse.dev/components/heroes/hero006",
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
