import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bento Grid Split Auth - Auth React Component",
  description: "Bento Grid Split Auth is a production-ready auth React component featuring Bento grid split + 4 feature tiles left + sign-in form right + mixed card sizes....",
  keywords: ["Bento Grid Split Auth","Auth component","Auth React component","Auth Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/auth/auth016" },
  openGraph: {
    type: "website",
    url: "/components/auth/auth016",
    title: "Bento Grid Split Auth - Auth React Component",
    description: "Bento Grid Split Auth is a production-ready auth React component featuring Bento grid split + 4 feature tiles left + sign-in form right + mixed card sizes....",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Bento Grid Split Auth - Auth React Component",
    description: "Bento Grid Split Auth is a production-ready auth React component featuring Bento grid split + 4 feature tiles left + sign-in form right + mixed card sizes....",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Bento Grid Split Auth",
  "description": "Bento Grid Split Auth is a production-ready auth React component featuring Bento grid split + 4 feature tiles left + sign-in form right + mixed card sizes....",
  "url": "https://ui.mtverse.dev/components/auth/auth016",
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
