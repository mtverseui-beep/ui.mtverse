import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meridian Split-Panel Auth - Auth React Component",
  description: "Meridian Split-Panel Auth is a production-ready auth React component featuring Meridian split-panel auth set: sign in/up, forgot, reset, OTP, two-step....",
  keywords: ["Meridian Split-Panel Auth","Auth component","Auth React component","Auth Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/auth/auth001" },
  openGraph: {
    type: "website",
    url: "/components/auth/auth001",
    title: "Meridian Split-Panel Auth - Auth React Component",
    description: "Meridian Split-Panel Auth is a production-ready auth React component featuring Meridian split-panel auth set: sign in/up, forgot, reset, OTP, two-step....",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Meridian Split-Panel Auth - Auth React Component",
    description: "Meridian Split-Panel Auth is a production-ready auth React component featuring Meridian split-panel auth set: sign in/up, forgot, reset, OTP, two-step....",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Meridian Split-Panel Auth",
  "description": "Meridian Split-Panel Auth is a production-ready auth React component featuring Meridian split-panel auth set: sign in/up, forgot, reset, OTP, two-step....",
  "url": "https://ui.mtverse.dev/components/auth/auth001",
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
