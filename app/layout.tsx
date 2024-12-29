import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/homepage/Navbar";
import Footer from "./components/homepage/Footer";
import { Suspense } from "react";
import ClientLayout from "./ClientLayout";

// Primary fonts - load these first
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const zentry = localFont({
  src: "./fonts/zentry-regular.woff2",
  variable: "--font-zentry",
  display: "swap",
  preload: true,
  fallback: ["arial"],
});

// Secondary fonts - load these after
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  preload: false,
  fallback: ["monospace"],
});

const circularWeb = localFont({
  src: "./fonts/circularweb-book.woff2",
  variable: "--font-circular-web",
  display: "swap",
  preload: false,
  fallback: ["system-ui", "sans-serif"],
});

const robertRegular = localFont({
  src: "./fonts/robert-regular.woff2",
  variable: "--font-robert-regular",
  display: "swap",
  preload: false,
  fallback: ["system-ui", "sans-serif"],
});

const general = localFont({
  src: "./fonts/general.woff2",
  variable: "--font-general",
  display: "swap",
  preload: false,
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Borhan Uddin - Full Stack Developer",
  description: "Full Stack Developer specializing in modern web development with React, Next.js, and Node.js",
  openGraph: {
    type: "website",
    url: "https://borhandev.site",
    title: "Borhan Uddin - Full Stack Developer",
    description: "Full Stack Developer specializing in modern web development with React, Next.js, and Node.js",
    siteName: "Borhan Uddin Portfolio",
    images: [
      {
        url: "/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Borhan Uddin - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@borhandev",
    creator: "@borhandev",
    title: "Borhan Uddin - Full Stack Developer",
    description: "Full Stack Developer specializing in modern web development with React, Next.js, and Node.js",
    images: ["/img/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${zentry.variable} ${geistMono.variable} ${circularWeb.variable} ${robertRegular.variable} ${general.variable}`}
        suppressHydrationWarning
      >
        <Suspense fallback={<div className="h-screen w-full bg-black" />}>
          <ClientLayout>
            <Navbar />
            {children}
            <Footer />
          </ClientLayout>
        </Suspense>
      </body>
    </html>
  );
}
