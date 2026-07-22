import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorite & Bookmark - Buttons React Component",
  description: "Favorite & Bookmark is a production-ready buttons React component featuring Heart burst + star rating + bookmark flip. Copy, customize, and use it in...",
  keywords: ["Favorite & Bookmark","Buttons component","Buttons React component","Buttons Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/buttons/bookmark-favorite" },
  openGraph: {
    type: "website",
    url: "/components/buttons/bookmark-favorite",
    title: "Favorite & Bookmark - Buttons React Component",
    description: "Favorite & Bookmark is a production-ready buttons React component featuring Heart burst + star rating + bookmark flip. Copy, customize, and use it in...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Favorite & Bookmark - Buttons React Component",
    description: "Favorite & Bookmark is a production-ready buttons React component featuring Heart burst + star rating + bookmark flip. Copy, customize, and use it in...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Favorite & Bookmark",
  "description": "Favorite & Bookmark is a production-ready buttons React component featuring Heart burst + star rating + bookmark flip. Copy, customize, and use it in...",
  "url": "https://ui.mtverse.dev/components/buttons/bookmark-favorite",
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
