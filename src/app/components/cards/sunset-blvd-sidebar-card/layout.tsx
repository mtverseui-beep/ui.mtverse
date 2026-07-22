import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sunset Blvd Sidebar - Sidebar React Component",
  description: "Sunset Blvd Sidebar is a production-ready sidebar React component featuring Warm sunset gradient · time-of-day greeting · orange-pink-purple ·...",
  keywords: ["Sunset Blvd Sidebar","Sidebar component","Sidebar React component","Sidebar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/sidebars/sunset-blvd-sidebar" },
  openGraph: {
    type: "website",
    url: "/components/sidebars/sunset-blvd-sidebar",
    title: "Sunset Blvd Sidebar - Sidebar React Component",
    description: "Sunset Blvd Sidebar is a production-ready sidebar React component featuring Warm sunset gradient · time-of-day greeting · orange-pink-purple ·...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Sunset Blvd Sidebar - Sidebar React Component",
    description: "Sunset Blvd Sidebar is a production-ready sidebar React component featuring Warm sunset gradient · time-of-day greeting · orange-pink-purple ·...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Sunset Blvd Sidebar",
  "description": "Sunset Blvd Sidebar is a production-ready sidebar React component featuring Warm sunset gradient · time-of-day greeting · orange-pink-purple ·...",
  "url": "https://ui.mtverse.dev/components/sidebars/sunset-blvd-sidebar",
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
