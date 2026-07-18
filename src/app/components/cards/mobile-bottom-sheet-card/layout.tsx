import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile Bottom Sheet - Modals React Component",
  description: "Mobile Bottom Sheet is a production-ready modals React component featuring Bottom slide-up sheet with drag handle + snap points + swipe to dismiss. Copy,...",
  keywords: ["Mobile Bottom Sheet","Modals component","Modals React component","Modals Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/modals/mobile-bottom-sheet" },
  openGraph: {
    type: "website",
    url: "/components/modals/mobile-bottom-sheet",
    title: "Mobile Bottom Sheet - Modals React Component",
    description: "Mobile Bottom Sheet is a production-ready modals React component featuring Bottom slide-up sheet with drag handle + snap points + swipe to dismiss. Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Mobile Bottom Sheet - Modals React Component",
    description: "Mobile Bottom Sheet is a production-ready modals React component featuring Bottom slide-up sheet with drag handle + snap points + swipe to dismiss. Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Mobile Bottom Sheet",
  "description": "Mobile Bottom Sheet is a production-ready modals React component featuring Bottom slide-up sheet with drag handle + snap points + swipe to dismiss. Copy,...",
  "url": "https://ui.mtverse.dev/components/modals/mobile-bottom-sheet",
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
