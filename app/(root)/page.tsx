import "gsap-unlocker";

// import Hero from "@/components/homepage/Hero";
import About from "@/components/homepage/About";
import Features from "@/components/homepage/Features";
import Story from "@/components/homepage/Story";
import Contact from "@/components/homepage/Contact";
import Footer from "@/components/homepage/Footer";
import Navbar from "@/components/homepage/Navbar";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      {/* <Hero /> */}
      <About />
      <Features />
      <Story />
      <Contact />
      <Footer />
    </main>
  );
}
