import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stripe Floating Label Auth - Auth React Component",
  description: "Stripe Floating Label Auth is a production-ready auth React component featuring Stripe-style minimal + floating label inputs that slide up on focus + indigo...",
  keywords: ["Stripe Floating Label Auth","Auth component","Auth React component","Auth Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/auth/auth015" },
  openGraph: {
    type: "website",
    url: "/components/auth/auth015",
    title: "Stripe Floating Label Auth - Auth React Component",
    description: "Stripe Floating Label Auth is a production-ready auth React component featuring Stripe-style minimal + floating label inputs that slide up on focus + indigo...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Stripe Floating Label Auth - Auth React Component",
    description: "Stripe Floating Label Auth is a production-ready auth React component featuring Stripe-style minimal + floating label inputs that slide up on focus + indigo...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Stripe Floating Label Auth",
  "description": "Stripe Floating Label Auth is a production-ready auth React component featuring Stripe-style minimal + floating label inputs that slide up on focus + indigo...",
  "url": "https://ui.mtverse.dev/components/auth/auth015",
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
