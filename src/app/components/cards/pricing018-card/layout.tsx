import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Warm Earthy Beige Fraunces Grain – Pricing React Component",
  description: "Warm Earthy Beige Fraunces Grain is a production-ready pricing React component featuring Warm earthy beige + Fraunces serif + grain + leaf badge (Verdant).…",
  keywords: ["Warm Earthy Beige Fraunces Grain","Pricing component","Pricing React component","Pricing Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/pricing018-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/pricing018-card",
    title: "Warm Earthy Beige Fraunces Grain – Pricing React Component",
    description: "Warm Earthy Beige Fraunces Grain is a production-ready pricing React component featuring Warm earthy beige + Fraunces serif + grain + leaf badge (Verdant).…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Warm Earthy Beige Fraunces Grain – Pricing React Component",
    description: "Warm Earthy Beige Fraunces Grain is a production-ready pricing React component featuring Warm earthy beige + Fraunces serif + grain + leaf badge (Verdant).…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Warm Earthy Beige Fraunces Grain",
  "description": "Warm Earthy Beige Fraunces Grain is a production-ready pricing React component featuring Warm earthy beige + Fraunces serif + grain + leaf badge (Verdant).…",
  "url": "https://www.mtverse.dev/components/cards/pricing018-card",
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
