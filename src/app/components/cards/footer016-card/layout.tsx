import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter Waveform Counter - Footer React Component",
  description: "Newsletter Waveform Counter is a production-ready footer React component featuring Newsletter focused — giant form + subscriber count + wave bg (Pulse)....",
  keywords: ["Newsletter Waveform Counter","Footer component","Footer React component","Footer Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/footers/footer016" },
  openGraph: {
    type: "website",
    url: "/components/footers/footer016",
    title: "Newsletter Waveform Counter - Footer React Component",
    description: "Newsletter Waveform Counter is a production-ready footer React component featuring Newsletter focused — giant form + subscriber count + wave bg (Pulse)....",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Newsletter Waveform Counter - Footer React Component",
    description: "Newsletter Waveform Counter is a production-ready footer React component featuring Newsletter focused — giant form + subscriber count + wave bg (Pulse)....",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Newsletter Waveform Counter",
  "description": "Newsletter Waveform Counter is a production-ready footer React component featuring Newsletter focused — giant form + subscriber count + wave bg (Pulse)....",
  "url": "https://ui.mtverse.dev/components/footers/footer016",
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
