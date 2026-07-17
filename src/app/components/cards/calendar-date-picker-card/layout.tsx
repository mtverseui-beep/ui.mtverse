import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendar & Date Picker – Core React Component",
  description: "Calendar & Date Picker is a production-ready core React component featuring Single + range mode · month navigation · time picker · quick actions ·…",
  keywords: ["Calendar & Date Picker","Core component","Core React component","Core Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/calendar-date-picker-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/calendar-date-picker-card",
    title: "Calendar & Date Picker – Core React Component",
    description: "Calendar & Date Picker is a production-ready core React component featuring Single + range mode · month navigation · time picker · quick actions ·…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calendar & Date Picker – Core React Component",
    description: "Calendar & Date Picker is a production-ready core React component featuring Single + range mode · month navigation · time picker · quick actions ·…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Calendar & Date Picker",
  "description": "Calendar & Date Picker is a production-ready core React component featuring Single + range mode · month navigation · time picker · quick actions ·…",
  "url": "https://www.mtverse.dev/components/cards/calendar-date-picker-card",
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
