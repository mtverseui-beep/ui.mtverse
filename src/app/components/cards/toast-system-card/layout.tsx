import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toast Notifications – Core React Component",
  description: "Toast Notifications is a production-ready core React component featuring 4 toast types · 8 presets · 6 positions · auto-dismiss · progress bar · dark/light.…",
  keywords: ["Toast Notifications","Core component","Core React component","Core Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/toast-system-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/toast-system-card",
    title: "Toast Notifications – Core React Component",
    description: "Toast Notifications is a production-ready core React component featuring 4 toast types · 8 presets · 6 positions · auto-dismiss · progress bar · dark/light.…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Toast Notifications – Core React Component",
    description: "Toast Notifications is a production-ready core React component featuring 4 toast types · 8 presets · 6 positions · auto-dismiss · progress bar · dark/light.…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Toast Notifications",
  "description": "Toast Notifications is a production-ready core React component featuring 4 toast types · 8 presets · 6 positions · auto-dismiss · progress bar · dark/light.…",
  "url": "https://www.mtverse.dev/components/cards/toast-system-card",
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
