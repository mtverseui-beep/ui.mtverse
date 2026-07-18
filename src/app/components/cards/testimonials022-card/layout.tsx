import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neumorphic Soft Embossed Cards - Testimonials React Component",
  description: "Neumorphic Soft Embossed Cards is a production-ready testimonials React component featuring Neumorphic soft UI embossed cards + dual shadows + raised avatar...",
  keywords: ["Neumorphic Soft Embossed Cards","Testimonials component","Testimonials React component","Testimonials Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/testimonials/testimonials022" },
  openGraph: {
    type: "website",
    url: "/components/testimonials/testimonials022",
    title: "Neumorphic Soft Embossed Cards - Testimonials React Component",
    description: "Neumorphic Soft Embossed Cards is a production-ready testimonials React component featuring Neumorphic soft UI embossed cards + dual shadows + raised avatar...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Neumorphic Soft Embossed Cards - Testimonials React Component",
    description: "Neumorphic Soft Embossed Cards is a production-ready testimonials React component featuring Neumorphic soft UI embossed cards + dual shadows + raised avatar...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Neumorphic Soft Embossed Cards",
  "description": "Neumorphic Soft Embossed Cards is a production-ready testimonials React component featuring Neumorphic soft UI embossed cards + dual shadows + raised avatar...",
  "url": "https://ui.mtverse.dev/components/testimonials/testimonials022",
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
