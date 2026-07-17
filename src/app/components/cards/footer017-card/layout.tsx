import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "App Download QR Phone Mockup – Footer React Component",
  description: "App Download QR Phone Mockup is a production-ready footer React component featuring App download — QR code + store badges + phone mockup (Mobily). Copy,…",
  keywords: ["App Download QR Phone Mockup","Footer component","Footer React component","Footer Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/footer017-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/footer017-card",
    title: "App Download QR Phone Mockup – Footer React Component",
    description: "App Download QR Phone Mockup is a production-ready footer React component featuring App download — QR code + store badges + phone mockup (Mobily). Copy,…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "App Download QR Phone Mockup – Footer React Component",
    description: "App Download QR Phone Mockup is a production-ready footer React component featuring App download — QR code + store badges + phone mockup (Mobily). Copy,…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "App Download QR Phone Mockup",
  "description": "App Download QR Phone Mockup is a production-ready footer React component featuring App download — QR code + store badges + phone mockup (Mobily). Copy,…",
  "url": "https://www.mtverse.dev/components/cards/footer017-card",
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
