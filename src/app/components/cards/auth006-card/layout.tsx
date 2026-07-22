import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dark Luxury Gold Auth - Auth React Component",
  description: "Dark Luxury Gold Auth is a production-ready auth React component featuring Dark luxury gold serif centered + Cormorant Garamond + gold sweep CTA + monogram....",
  keywords: ["Dark Luxury Gold Auth","Auth component","Auth React component","Auth Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/auth/auth006" },
  openGraph: {
    type: "website",
    url: "/components/auth/auth006",
    title: "Dark Luxury Gold Auth - Auth React Component",
    description: "Dark Luxury Gold Auth is a production-ready auth React component featuring Dark luxury gold serif centered + Cormorant Garamond + gold sweep CTA + monogram....",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Dark Luxury Gold Auth - Auth React Component",
    description: "Dark Luxury Gold Auth is a production-ready auth React component featuring Dark luxury gold serif centered + Cormorant Garamond + gold sweep CTA + monogram....",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Dark Luxury Gold Auth",
  "description": "Dark Luxury Gold Auth is a production-ready auth React component featuring Dark luxury gold serif centered + Cormorant Garamond + gold sweep CTA + monogram....",
  "url": "https://ui.mtverse.dev/components/auth/auth006",
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
