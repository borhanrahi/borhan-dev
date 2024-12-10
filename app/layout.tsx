import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const circularWeb = localFont({
  src: "./fonts/circularweb-book.woff2",
  variable: "--font-circular-web",
});

const robertRegular = localFont({
  src: "./fonts/robert-regular.woff2",
  variable: "--font-robert-regular",
});

const zentry = localFont({
  src: "./fonts/zentry-regular.woff2",
  variable: "--font-zentry",
});

const general = localFont({
  src: "./fonts/general.woff2",
  variable: "--font-general",
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
        className={`${geistSans.variable} ${geistMono.variable} ${circularWeb.variable} ${robertRegular.variable} ${zentry.variable} ${general.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
