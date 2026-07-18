import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stripe Minimal Sliding Feature Rows - Pricing React Component",
  description: "Stripe Minimal Sliding Feature Rows is a production-ready pricing React component featuring Stripe-style minimal + sliding feature rows + gradient pill...",
  keywords: ["Stripe Minimal Sliding Feature Rows","Pricing component","Pricing React component","Pricing Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/pricing/pricing011" },
  openGraph: {
    type: "website",
    url: "/components/pricing/pricing011",
    title: "Stripe Minimal Sliding Feature Rows - Pricing React Component",
    description: "Stripe Minimal Sliding Feature Rows is a production-ready pricing React component featuring Stripe-style minimal + sliding feature rows + gradient pill...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Stripe Minimal Sliding Feature Rows - Pricing React Component",
    description: "Stripe Minimal Sliding Feature Rows is a production-ready pricing React component featuring Stripe-style minimal + sliding feature rows + gradient pill...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Stripe Minimal Sliding Feature Rows",
  "description": "Stripe Minimal Sliding Feature Rows is a production-ready pricing React component featuring Stripe-style minimal + sliding feature rows + gradient pill...",
  "url": "https://ui.mtverse.dev/components/pricing/pricing011",
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
