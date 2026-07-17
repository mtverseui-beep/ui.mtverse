import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Warm Earthy Fraunces Grain Leaf – Testimonials React Component",
  description: "Warm Earthy Fraunces Grain Leaf is a production-ready testimonials React component featuring Warm earthy beige + Fraunces serif + paper grain + leaf badge +…",
  keywords: ["Warm Earthy Fraunces Grain Leaf","Testimonials component","Testimonials React component","Testimonials Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/testimonials016-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/testimonials016-card",
    title: "Warm Earthy Fraunces Grain Leaf – Testimonials React Component",
    description: "Warm Earthy Fraunces Grain Leaf is a production-ready testimonials React component featuring Warm earthy beige + Fraunces serif + paper grain + leaf badge +…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Warm Earthy Fraunces Grain Leaf – Testimonials React Component",
    description: "Warm Earthy Fraunces Grain Leaf is a production-ready testimonials React component featuring Warm earthy beige + Fraunces serif + paper grain + leaf badge +…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Warm Earthy Fraunces Grain Leaf",
  "description": "Warm Earthy Fraunces Grain Leaf is a production-ready testimonials React component featuring Warm earthy beige + Fraunces serif + paper grain + leaf badge +…",
  "url": "https://www.mtverse.dev/components/cards/testimonials016-card",
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
