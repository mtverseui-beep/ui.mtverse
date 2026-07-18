import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bento Grid Tab Switcher Mixed - Pricing React Component",
  description: "Bento Grid Tab Switcher Mixed is a production-ready pricing React component featuring Bento grid mixed-size cards + tab switcher (Individual/Team/Ent)...",
  keywords: ["Bento Grid Tab Switcher Mixed","Pricing component","Pricing React component","Pricing Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/pricing/pricing016" },
  openGraph: {
    type: "website",
    url: "/components/pricing/pricing016",
    title: "Bento Grid Tab Switcher Mixed - Pricing React Component",
    description: "Bento Grid Tab Switcher Mixed is a production-ready pricing React component featuring Bento grid mixed-size cards + tab switcher (Individual/Team/Ent)...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Bento Grid Tab Switcher Mixed - Pricing React Component",
    description: "Bento Grid Tab Switcher Mixed is a production-ready pricing React component featuring Bento grid mixed-size cards + tab switcher (Individual/Team/Ent)...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Bento Grid Tab Switcher Mixed",
  "description": "Bento Grid Tab Switcher Mixed is a production-ready pricing React component featuring Bento grid mixed-size cards + tab switcher (Individual/Team/Ent)...",
  "url": "https://ui.mtverse.dev/components/pricing/pricing016",
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
