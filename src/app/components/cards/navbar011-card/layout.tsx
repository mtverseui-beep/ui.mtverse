import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Icon Rail Switcher - Navbar React Component",
  description: "Dashboard Icon Rail Switcher is a production-ready navbar React component featuring Dashboard product — icon rail + workspace switcher + breadcrumb + notif...",
  keywords: ["Dashboard Icon Rail Switcher","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/navbars/navbar011" },
  openGraph: {
    type: "website",
    url: "/components/navbars/navbar011",
    title: "Dashboard Icon Rail Switcher - Navbar React Component",
    description: "Dashboard Icon Rail Switcher is a production-ready navbar React component featuring Dashboard product — icon rail + workspace switcher + breadcrumb + notif...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Dashboard Icon Rail Switcher - Navbar React Component",
    description: "Dashboard Icon Rail Switcher is a production-ready navbar React component featuring Dashboard product — icon rail + workspace switcher + breadcrumb + notif...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Dashboard Icon Rail Switcher",
  "description": "Dashboard Icon Rail Switcher is a production-ready navbar React component featuring Dashboard product — icon rail + workspace switcher + breadcrumb + notif...",
  "url": "https://ui.mtverse.dev/components/navbars/navbar011",
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
