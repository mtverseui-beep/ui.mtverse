import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full-Width Feature Story - Features React Component",
  description: "Full-Width Feature Story is a production-ready features React component featuring Full-bleed image + overlay text + scroll parallax + feature pillars. Copy,...",
  keywords: ["Full-Width Feature Story","Features component","Features React component","Features Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/features/feature-full-width" },
  openGraph: {
    type: "website",
    url: "/components/features/feature-full-width",
    title: "Full-Width Feature Story - Features React Component",
    description: "Full-Width Feature Story is a production-ready features React component featuring Full-bleed image + overlay text + scroll parallax + feature pillars. Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Full-Width Feature Story - Features React Component",
    description: "Full-Width Feature Story is a production-ready features React component featuring Full-bleed image + overlay text + scroll parallax + feature pillars. Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Full-Width Feature Story",
  "description": "Full-Width Feature Story is a production-ready features React component featuring Full-bleed image + overlay text + scroll parallax + feature pillars. Copy,...",
  "url": "https://ui.mtverse.dev/components/features/feature-full-width",
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
