import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Borhan Dev - Full Stack Developer & UI/UX Designer",
  description: "Professional full-stack developer specializing in React, Next.js, Node.js, and modern web technologies. Creating exceptional digital experiences with clean code and innovative design.",
  keywords: ["full stack developer", "react developer", "next.js", "web development", "UI/UX design", "javascript", "typescript"],
  authors: [{ name: "Borhan" }],
  creator: "Borhan",
  publisher: "Borhan Dev",
  openGraph: {
    title: "Borhan Dev - Full Stack Developer & UI/UX Designer",
    description: "Professional full-stack developer specializing in React, Next.js, Node.js, and modern web technologies.",
    url: "https://borhandev.me/",
    siteName: "Borhan Dev",
    images: [
      {
        url: "/img/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Borhan Dev - Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Borhan Dev - Full Stack Developer & UI/UX Designer",
    description: "Professional full-stack developer specializing in React, Next.js, Node.js, and modern web technologies.",
    images: ["/img/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
