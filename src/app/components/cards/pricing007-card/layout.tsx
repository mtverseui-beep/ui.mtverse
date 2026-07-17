import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brutalist Black Yellow Offset Shadow – Pricing React Component",
  description: "Brutalist Black Yellow Offset Shadow is a production-ready pricing React component featuring Brutalist black/yellow + offset hard shadows + rotated badge…",
  keywords: ["Brutalist Black Yellow Offset Shadow","Pricing component","Pricing React component","Pricing Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/pricing007-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/pricing007-card",
    title: "Brutalist Black Yellow Offset Shadow – Pricing React Component",
    description: "Brutalist Black Yellow Offset Shadow is a production-ready pricing React component featuring Brutalist black/yellow + offset hard shadows + rotated badge…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brutalist Black Yellow Offset Shadow – Pricing React Component",
    description: "Brutalist Black Yellow Offset Shadow is a production-ready pricing React component featuring Brutalist black/yellow + offset hard shadows + rotated badge…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Brutalist Black Yellow Offset Shadow",
  "description": "Brutalist Black Yellow Offset Shadow is a production-ready pricing React component featuring Brutalist black/yellow + offset hard shadows + rotated badge…",
  "url": "https://www.mtverse.dev/components/cards/pricing007-card",
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
