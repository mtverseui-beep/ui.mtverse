import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stripe Minimal Sliding Quote Rows – Testimonials React Component",
  description: "Stripe Minimal Sliding Quote Rows is a production-ready testimonials React component featuring Stripe-style minimal sliding quote rows + indigo accent +…",
  keywords: ["Stripe Minimal Sliding Quote Rows","Testimonials component","Testimonials React component","Testimonials Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/testimonials024-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/testimonials024-card",
    title: "Stripe Minimal Sliding Quote Rows – Testimonials React Component",
    description: "Stripe Minimal Sliding Quote Rows is a production-ready testimonials React component featuring Stripe-style minimal sliding quote rows + indigo accent +…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stripe Minimal Sliding Quote Rows – Testimonials React Component",
    description: "Stripe Minimal Sliding Quote Rows is a production-ready testimonials React component featuring Stripe-style minimal sliding quote rows + indigo accent +…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Stripe Minimal Sliding Quote Rows",
  "description": "Stripe Minimal Sliding Quote Rows is a production-ready testimonials React component featuring Stripe-style minimal sliding quote rows + indigo accent +…",
  "url": "https://www.mtverse.dev/components/cards/testimonials024-card",
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
