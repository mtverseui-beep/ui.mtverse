import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adaptive Table & Cards - Tables React Component",
  description: "Adaptive Table & Cards is a production-ready tables React component featuring User-controlled table/card presentation · responsive card grid · search · rich...",
  keywords: ["Adaptive Table & Cards","Tables component","Tables React component","Tables Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/tables/card-table-switcher" },
  openGraph: {
    type: "website",
    url: "/components/tables/card-table-switcher",
    title: "Adaptive Table & Cards - Tables React Component",
    description: "Adaptive Table & Cards is a production-ready tables React component featuring User-controlled table/card presentation · responsive card grid · search · rich...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Adaptive Table & Cards - Tables React Component",
    description: "Adaptive Table & Cards is a production-ready tables React component featuring User-controlled table/card presentation · responsive card grid · search · rich...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Adaptive Table & Cards",
  "description": "Adaptive Table & Cards is a production-ready tables React component featuring User-controlled table/card presentation · responsive card grid · search · rich...",
  "url": "https://ui.mtverse.dev/components/tables/card-table-switcher",
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
