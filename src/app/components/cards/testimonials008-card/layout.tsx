import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Magazine Pull Quotes - Testimonials React Component",
  description: "Editorial Magazine Pull Quotes is a production-ready testimonials React component featuring Editorial magazine pull quotes + Fraunces serif + paper grain +...",
  keywords: ["Editorial Magazine Pull Quotes","Testimonials component","Testimonials React component","Testimonials Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/testimonials/testimonials008" },
  openGraph: {
    type: "website",
    url: "/components/testimonials/testimonials008",
    title: "Editorial Magazine Pull Quotes - Testimonials React Component",
    description: "Editorial Magazine Pull Quotes is a production-ready testimonials React component featuring Editorial magazine pull quotes + Fraunces serif + paper grain +...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Editorial Magazine Pull Quotes - Testimonials React Component",
    description: "Editorial Magazine Pull Quotes is a production-ready testimonials React component featuring Editorial magazine pull quotes + Fraunces serif + paper grain +...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Editorial Magazine Pull Quotes",
  "description": "Editorial Magazine Pull Quotes is a production-ready testimonials React component featuring Editorial magazine pull quotes + Fraunces serif + paper grain +...",
  "url": "https://ui.mtverse.dev/components/testimonials/testimonials008",
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
