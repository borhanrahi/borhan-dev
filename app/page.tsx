import Hero from "@/components/homepage/Hero";
import About from "@/components/homepage/About";
import Features from "@/components/homepage/Features";
import Story from "@/components/homepage/Story";
import Contact from "@/components/homepage/Contact";
import Services from "@/components/homepage/Services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Borhan Uddin - Full Stack Developer",
  description: "Full Stack Developer specializing in modern web development with React, Next.js, and Node.js. Creating innovative digital solutions.",
};

export const dynamic = 'force-static';
export const revalidate = false;

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Hero />
      <About />
      <Services />
      <Features />
      <Story />
      <Contact />
    </main>
  );
}