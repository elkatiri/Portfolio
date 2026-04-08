import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ahmedelkatiri.vercel.app"),
  title: "Ahmed Elkatiri | Full Stack Developer – Développeur Web, مطور ويب",
  description:
    "Ahmed Elkatiri – Full Stack Developer specializing in Next.js, React, Laravel, MERN & SaaS. Développeur web full stack au Maroc. مطور ويب متكامل أحمد الكثيري.",
  keywords: [
    // English
    "Ahmed Elkatiri",
    "Full Stack Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "Laravel Developer",
    "MERN Stack Developer",
    "SaaS Developer",
    "Frontend Developer",
    "Backend Developer",
    // French
    "Développeur web",
    "Développeur full stack",
    "Développeur React",
    "Développeur Next.js",
    "Développeur Laravel",
    "Développeur web Maroc",
    // Arabic
    "أحمد الكاتري",
    "مطور ويب",
    "مطور متكامل",
    "مطور ويب المغرب",
    "مبرمج مواقع",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ahmed Elkatiri | Full Stack Developer",
    description:
      "Full Stack Developer specializing in Next.js, React, Laravel, MERN & SaaS applications.",
    url: "/",
    siteName: "Ahmed Elkatiri",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ahmed Elkatiri",
              alternateName: ["أحمد الكثيري", "Ahmed El Katiri"],
              url: "https://ahmedelkatiri.vercel.app",
              jobTitle: "Full Stack Developer",
              knowsAbout: [
                "React",
                "Next.js",
                "Laravel",
                "Node.js",
                "MongoDB",
                "SaaS",
              ],
              sameAs: [
                "https://github.com/elkatiri",
                "https://www.linkedin.com/in/ahmed-elkatiri-a0347b3b2/",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
