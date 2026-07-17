import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bento Grid Tab Switcher Mixed – Pricing React Component",
  description: "Bento Grid Tab Switcher Mixed is a production-ready pricing React component featuring Bento grid mixed-size cards + tab switcher (Individual/Team/Ent)…",
  keywords: ["Bento Grid Tab Switcher Mixed","Pricing component","Pricing React component","Pricing Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/pricing016-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/pricing016-card",
    title: "Bento Grid Tab Switcher Mixed – Pricing React Component",
    description: "Bento Grid Tab Switcher Mixed is a production-ready pricing React component featuring Bento grid mixed-size cards + tab switcher (Individual/Team/Ent)…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bento Grid Tab Switcher Mixed – Pricing React Component",
    description: "Bento Grid Tab Switcher Mixed is a production-ready pricing React component featuring Bento grid mixed-size cards + tab switcher (Individual/Team/Ent)…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Bento Grid Tab Switcher Mixed",
  "description": "Bento Grid Tab Switcher Mixed is a production-ready pricing React component featuring Bento grid mixed-size cards + tab switcher (Individual/Team/Ent)…",
  "url": "https://www.mtverse.dev/components/cards/pricing016-card",
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
