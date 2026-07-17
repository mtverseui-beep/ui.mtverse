import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Icon Rail Switcher – Navbar React Component",
  description: "Dashboard Icon Rail Switcher is a production-ready navbar React component featuring Dashboard product — icon rail + workspace switcher + breadcrumb + notif…",
  keywords: ["Dashboard Icon Rail Switcher","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/navbar011-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/navbar011-card",
    title: "Dashboard Icon Rail Switcher – Navbar React Component",
    description: "Dashboard Icon Rail Switcher is a production-ready navbar React component featuring Dashboard product — icon rail + workspace switcher + breadcrumb + notif…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dashboard Icon Rail Switcher – Navbar React Component",
    description: "Dashboard Icon Rail Switcher is a production-ready navbar React component featuring Dashboard product — icon rail + workspace switcher + breadcrumb + notif…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Dashboard Icon Rail Switcher",
  "description": "Dashboard Icon Rail Switcher is a production-ready navbar React component featuring Dashboard product — icon rail + workspace switcher + breadcrumb + notif…",
  "url": "https://www.mtverse.dev/components/cards/navbar011-card",
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
