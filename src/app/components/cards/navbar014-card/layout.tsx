import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ecommerce Mega Promo Column - Navbar React Component",
  description: "Ecommerce Mega Promo Column is a production-ready navbar React component featuring Mega menu ecommerce — full-width category panels + promo column +...",
  keywords: ["Ecommerce Mega Promo Column","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/navbars/navbar014" },
  openGraph: {
    type: "website",
    url: "/components/navbars/navbar014",
    title: "Ecommerce Mega Promo Column - Navbar React Component",
    description: "Ecommerce Mega Promo Column is a production-ready navbar React component featuring Mega menu ecommerce — full-width category panels + promo column +...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Ecommerce Mega Promo Column - Navbar React Component",
    description: "Ecommerce Mega Promo Column is a production-ready navbar React component featuring Mega menu ecommerce — full-width category panels + promo column +...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Ecommerce Mega Promo Column",
  "description": "Ecommerce Mega Promo Column is a production-ready navbar React component featuring Mega menu ecommerce — full-width category panels + promo column +...",
  "url": "https://ui.mtverse.dev/components/navbars/navbar014",
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
