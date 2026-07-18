import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Warm Earthy Beige Fraunces Grain - Pricing React Component",
  description: "Warm Earthy Beige Fraunces Grain is a production-ready pricing React component featuring Warm earthy beige + Fraunces serif + grain + leaf badge (Verdant)....",
  keywords: ["Warm Earthy Beige Fraunces Grain","Pricing component","Pricing React component","Pricing Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/pricing/pricing018" },
  openGraph: {
    type: "website",
    url: "/components/pricing/pricing018",
    title: "Warm Earthy Beige Fraunces Grain - Pricing React Component",
    description: "Warm Earthy Beige Fraunces Grain is a production-ready pricing React component featuring Warm earthy beige + Fraunces serif + grain + leaf badge (Verdant)....",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Warm Earthy Beige Fraunces Grain - Pricing React Component",
    description: "Warm Earthy Beige Fraunces Grain is a production-ready pricing React component featuring Warm earthy beige + Fraunces serif + grain + leaf badge (Verdant)....",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Warm Earthy Beige Fraunces Grain",
  "description": "Warm Earthy Beige Fraunces Grain is a production-ready pricing React component featuring Warm earthy beige + Fraunces serif + grain + leaf badge (Verdant)....",
  "url": "https://ui.mtverse.dev/components/pricing/pricing018",
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
