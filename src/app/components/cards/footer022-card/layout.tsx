import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compact Utility Marquee Strip - Footer React Component",
  description: "Compact Utility Marquee Strip is a production-ready footer React component featuring Compact utility — single row nav + 2 rows total (Swift). Copy,...",
  keywords: ["Compact Utility Marquee Strip","Footer component","Footer React component","Footer Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/footers/footer022" },
  openGraph: {
    type: "website",
    url: "/components/footers/footer022",
    title: "Compact Utility Marquee Strip - Footer React Component",
    description: "Compact Utility Marquee Strip is a production-ready footer React component featuring Compact utility — single row nav + 2 rows total (Swift). Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Compact Utility Marquee Strip - Footer React Component",
    description: "Compact Utility Marquee Strip is a production-ready footer React component featuring Compact utility — single row nav + 2 rows total (Swift). Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Compact Utility Marquee Strip",
  "description": "Compact Utility Marquee Strip is a production-ready footer React component featuring Compact utility — single row nav + 2 rows total (Swift). Copy,...",
  "url": "https://ui.mtverse.dev/components/footers/footer022",
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
