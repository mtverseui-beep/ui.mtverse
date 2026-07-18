import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team Directory Data Table - Tables React Component",
  description: "Team Directory Data Table is a production-ready tables React component featuring Production search · status filters · accessible sorting · selection · bulk...",
  keywords: ["Team Directory Data Table","Tables component","Tables React component","Tables Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/tables/data-table" },
  openGraph: {
    type: "website",
    url: "/components/tables/data-table",
    title: "Team Directory Data Table - Tables React Component",
    description: "Team Directory Data Table is a production-ready tables React component featuring Production search · status filters · accessible sorting · selection · bulk...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Team Directory Data Table - Tables React Component",
    description: "Team Directory Data Table is a production-ready tables React component featuring Production search · status filters · accessible sorting · selection · bulk...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Team Directory Data Table",
  "description": "Team Directory Data Table is a production-ready tables React component featuring Production search · status filters · accessible sorting · selection · bulk...",
  "url": "https://ui.mtverse.dev/components/tables/data-table",
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
