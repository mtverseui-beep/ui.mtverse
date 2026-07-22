import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Particle Discord Stats - Footer React Component",
  description: "Community Particle Discord Stats is a production-ready footer React component featuring Community platform — stats + Discord CTA + floating particles...",
  keywords: ["Community Particle Discord Stats","Footer component","Footer React component","Footer Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/footers/footer018" },
  openGraph: {
    type: "website",
    url: "/components/footers/footer018",
    title: "Community Particle Discord Stats - Footer React Component",
    description: "Community Particle Discord Stats is a production-ready footer React component featuring Community platform — stats + Discord CTA + floating particles...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Community Particle Discord Stats - Footer React Component",
    description: "Community Particle Discord Stats is a production-ready footer React component featuring Community platform — stats + Discord CTA + floating particles...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Community Particle Discord Stats",
  "description": "Community Particle Discord Stats is a production-ready footer React component featuring Community platform — stats + Discord CTA + floating particles...",
  "url": "https://ui.mtverse.dev/components/footers/footer018",
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
