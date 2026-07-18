import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neumorphic Team Grid - Profile React Component",
  description: "Neumorphic Team Grid is a production-ready profile React component featuring Neumorphic shadows + filter. Copy, customize, and use it in Next.js projects.",
  keywords: ["Neumorphic Team Grid","Profile component","Profile React component","Profile Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/neumorphic-profile-grid" },
  openGraph: {
    type: "website",
    url: "/components/cards/neumorphic-profile-grid",
    title: "Neumorphic Team Grid - Profile React Component",
    description: "Neumorphic Team Grid is a production-ready profile React component featuring Neumorphic shadows + filter. Copy, customize, and use it in Next.js projects.",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Neumorphic Team Grid - Profile React Component",
    description: "Neumorphic Team Grid is a production-ready profile React component featuring Neumorphic shadows + filter. Copy, customize, and use it in Next.js projects.",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Neumorphic Team Grid",
  "description": "Neumorphic Team Grid is a production-ready profile React component featuring Neumorphic shadows + filter. Copy, customize, and use it in Next.js projects.",
  "url": "https://ui.mtverse.dev/components/cards/neumorphic-profile-grid",
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
