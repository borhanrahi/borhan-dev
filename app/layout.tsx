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
  display: "optional",
  preload: false,
});

const circularWeb = localFont({
  src: "./fonts/circularweb-book.woff2",
  variable: "--font-circular-web",
  display: "optional",
  preload: false,
});

const robertRegular = localFont({
  src: "./fonts/robert-regular.woff2",
  variable: "--font-robert-regular",
  display: "optional",
  preload: false,
});

const general = localFont({
  src: "./fonts/general.woff2",
  variable: "--font-general",
  display: "optional",
  preload: false,
});

export const metadata: Metadata = {
  title: "Borhan - Full Stack Developer",
  description: "Portfolio of Borhan, a Full Stack Web Developer",
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
