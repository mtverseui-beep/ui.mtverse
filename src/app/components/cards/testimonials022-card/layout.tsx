import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neumorphic Soft Embossed Cards – Testimonials React Component",
  description: "Neumorphic Soft Embossed Cards is a production-ready testimonials React component featuring Neumorphic soft UI embossed cards + dual shadows + raised avatar…",
  keywords: ["Neumorphic Soft Embossed Cards","Testimonials component","Testimonials React component","Testimonials Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/testimonials022-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/testimonials022-card",
    title: "Neumorphic Soft Embossed Cards – Testimonials React Component",
    description: "Neumorphic Soft Embossed Cards is a production-ready testimonials React component featuring Neumorphic soft UI embossed cards + dual shadows + raised avatar…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neumorphic Soft Embossed Cards – Testimonials React Component",
    description: "Neumorphic Soft Embossed Cards is a production-ready testimonials React component featuring Neumorphic soft UI embossed cards + dual shadows + raised avatar…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Neumorphic Soft Embossed Cards",
  "description": "Neumorphic Soft Embossed Cards is a production-ready testimonials React component featuring Neumorphic soft UI embossed cards + dual shadows + raised avatar…",
  "url": "https://www.mtverse.dev/components/cards/testimonials022-card",
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
