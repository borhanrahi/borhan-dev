import Hero from "./components/homepage/Hero";
import About from "./components/homepage/About";
import Services from "./components/homepage/Services";
import Navbar from "./components/homepage/Navbar";
import Footer from "./components/homepage/Footer";
import Story from "./components/homepage/Story";
import Contact from "./components/homepage/Contact";
import Features from "./components/homepage/Features";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Features />
      <Story />
      <Contact />
      <Footer />
    </main>
  );
}
