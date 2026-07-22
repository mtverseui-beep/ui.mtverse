import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Chatbot Orb - Agents React Component",
  description: "AI Chatbot Orb is a production-ready agents React component featuring Animated orb → morph to chat panel · hue-rotate · direct debit card · message bubbles....",
  keywords: ["AI Chatbot Orb","Agents component","Agents React component","Agents Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/premium/ai-chatbot" },
  openGraph: {
    type: "website",
    url: "/components/premium/ai-chatbot",
    title: "AI Chatbot Orb - Agents React Component",
    description: "AI Chatbot Orb is a production-ready agents React component featuring Animated orb → morph to chat panel · hue-rotate · direct debit card · message bubbles....",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "AI Chatbot Orb - Agents React Component",
    description: "AI Chatbot Orb is a production-ready agents React component featuring Animated orb → morph to chat panel · hue-rotate · direct debit card · message bubbles....",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "AI Chatbot Orb",
  "description": "AI Chatbot Orb is a production-ready agents React component featuring Animated orb → morph to chat panel · hue-rotate · direct debit card · message bubbles....",
  "url": "https://ui.mtverse.dev/components/premium/ai-chatbot",
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
