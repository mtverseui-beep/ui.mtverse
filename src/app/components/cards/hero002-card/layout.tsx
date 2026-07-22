import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Badge Gradient Headline Avatars - Hero React Component",
  description: "Badge Gradient Headline Avatars is a production-ready hero React component featuring Badge + gradient headline + CTAs + avatar social proof. Copy,...",
  keywords: ["Badge Gradient Headline Avatars","Hero component","Hero React component","Hero Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/heroes/hero002" },
  openGraph: {
    type: "website",
    url: "/components/heroes/hero002",
    title: "Badge Gradient Headline Avatars - Hero React Component",
    description: "Badge Gradient Headline Avatars is a production-ready hero React component featuring Badge + gradient headline + CTAs + avatar social proof. Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Badge Gradient Headline Avatars - Hero React Component",
    description: "Badge Gradient Headline Avatars is a production-ready hero React component featuring Badge + gradient headline + CTAs + avatar social proof. Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Badge Gradient Headline Avatars",
  "description": "Badge Gradient Headline Avatars is a production-ready hero React component featuring Badge + gradient headline + CTAs + avatar social proof. Copy,...",
  "url": "https://ui.mtverse.dev/components/heroes/hero002",
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
