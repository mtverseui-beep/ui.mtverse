import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dismissible Cycling Announcement - Navbar React Component",
  description: "Dismissible Cycling Announcement is a production-ready navbar React component featuring Announcement bar — dismissible cycling promos + sliding indicator...",
  keywords: ["Dismissible Cycling Announcement","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/navbars/navbar022" },
  openGraph: {
    type: "website",
    url: "/components/navbars/navbar022",
    title: "Dismissible Cycling Announcement - Navbar React Component",
    description: "Dismissible Cycling Announcement is a production-ready navbar React component featuring Announcement bar — dismissible cycling promos + sliding indicator...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Dismissible Cycling Announcement - Navbar React Component",
    description: "Dismissible Cycling Announcement is a production-ready navbar React component featuring Announcement bar — dismissible cycling promos + sliding indicator...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Dismissible Cycling Announcement",
  "description": "Dismissible Cycling Announcement is a production-ready navbar React component featuring Announcement bar — dismissible cycling promos + sliding indicator...",
  "url": "https://ui.mtverse.dev/components/navbars/navbar022",
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
