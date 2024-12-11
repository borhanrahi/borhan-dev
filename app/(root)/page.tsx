import Hero from "@/components/homepage/Hero";
import About from "@/components/homepage/About";
import Features from "@/components/homepage/Features";
import Story from "@/components/homepage/Story";
import Contact from "@/components/homepage/Contact";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
    </main>
  );
}
