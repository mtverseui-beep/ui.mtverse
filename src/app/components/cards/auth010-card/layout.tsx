import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cyberpunk Neon Auth - Auth React Component",
  description: "Cyberpunk Neon Auth is a production-ready auth React component featuring Cyberpunk neon grid floor + scanlines + neon glowing border + magenta/cyan. Copy,...",
  keywords: ["Cyberpunk Neon Auth","Auth component","Auth React component","Auth Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/auth/auth010" },
  openGraph: {
    type: "website",
    url: "/components/auth/auth010",
    title: "Cyberpunk Neon Auth - Auth React Component",
    description: "Cyberpunk Neon Auth is a production-ready auth React component featuring Cyberpunk neon grid floor + scanlines + neon glowing border + magenta/cyan. Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Cyberpunk Neon Auth - Auth React Component",
    description: "Cyberpunk Neon Auth is a production-ready auth React component featuring Cyberpunk neon grid floor + scanlines + neon glowing border + magenta/cyan. Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Cyberpunk Neon Auth",
  "description": "Cyberpunk Neon Auth is a production-ready auth React component featuring Cyberpunk neon grid floor + scanlines + neon glowing border + magenta/cyan. Copy,...",
  "url": "https://ui.mtverse.dev/components/auth/auth010",
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
