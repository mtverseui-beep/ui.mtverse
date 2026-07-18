import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Floating Dock Radial FAB - Navbar React Component",
  description: "Floating Dock Radial FAB is a production-ready navbar React component featuring Announcement + dock hybrid — dismissible promo + floating pill dock + FAB...",
  keywords: ["Floating Dock Radial FAB","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/navbars/navbar030" },
  openGraph: {
    type: "website",
    url: "/components/navbars/navbar030",
    title: "Floating Dock Radial FAB - Navbar React Component",
    description: "Floating Dock Radial FAB is a production-ready navbar React component featuring Announcement + dock hybrid — dismissible promo + floating pill dock + FAB...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Floating Dock Radial FAB - Navbar React Component",
    description: "Floating Dock Radial FAB is a production-ready navbar React component featuring Announcement + dock hybrid — dismissible promo + floating pill dock + FAB...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Floating Dock Radial FAB",
  "description": "Floating Dock Radial FAB is a production-ready navbar React component featuring Announcement + dock hybrid — dismissible promo + floating pill dock + FAB...",
  "url": "https://ui.mtverse.dev/components/navbars/navbar030",
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
