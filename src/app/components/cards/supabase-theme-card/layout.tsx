import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Supabase Theme – Agents React Component",
  description: "Supabase Theme is a production-ready agents React component featuring Tinte Supabase theme demo. Copy, customize, and use it in Next.js projects.",
  keywords: ["Supabase Theme","Agents component","Agents React component","Agents Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/supabase-theme-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/supabase-theme-card",
    title: "Supabase Theme – Agents React Component",
    description: "Supabase Theme is a production-ready agents React component featuring Tinte Supabase theme demo. Copy, customize, and use it in Next.js projects.",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Supabase Theme – Agents React Component",
    description: "Supabase Theme is a production-ready agents React component featuring Tinte Supabase theme demo. Copy, customize, and use it in Next.js projects.",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Supabase Theme",
  "description": "Supabase Theme is a production-ready agents React component featuring Tinte Supabase theme demo. Copy, customize, and use it in Next.js projects.",
  "url": "https://www.mtverse.dev/components/cards/supabase-theme-card",
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
