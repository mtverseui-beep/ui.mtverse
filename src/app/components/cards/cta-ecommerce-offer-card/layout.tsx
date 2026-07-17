import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ecommerce Offer CTA – CTA React Component",
  description: "Ecommerce Offer CTA is a production-ready cta React component featuring Discount + countdown timer + shop now + sale. Copy, customize, and use it in Next.js…",
  keywords: ["Ecommerce Offer CTA","CTA component","CTA React component","CTA Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/cta-ecommerce-offer-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/cta-ecommerce-offer-card",
    title: "Ecommerce Offer CTA – CTA React Component",
    description: "Ecommerce Offer CTA is a production-ready cta React component featuring Discount + countdown timer + shop now + sale. Copy, customize, and use it in Next.js…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ecommerce Offer CTA – CTA React Component",
    description: "Ecommerce Offer CTA is a production-ready cta React component featuring Discount + countdown timer + shop now + sale. Copy, customize, and use it in Next.js…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Ecommerce Offer CTA",
  "description": "Ecommerce Offer CTA is a production-ready cta React component featuring Discount + countdown timer + shop now + sale. Copy, customize, and use it in Next.js…",
  "url": "https://www.mtverse.dev/components/cards/cta-ecommerce-offer-card",
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
