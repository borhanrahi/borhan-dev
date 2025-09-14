import AboutHero from "@/app/components/about/AboutHero";
import WorkExperience from "@/app/components/about/WorkExperience";
import TechnicalSkills from "@/app/components/about/TechnicalSkills";
import Education from "@/app/components/about/Education";
import KeyCompetencies from "@/app/components/about/KeyCompetencies";
import Navbar from "@/app/components/homepage/Navbar";
import Footer from "@/app/components/homepage/Footer";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen w-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1012] via-black to-black opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,17,17,0.8),rgba(0,0,0,0.8))]" />
      </div>
      <Navbar />
      <AboutHero />
      <WorkExperience />
      <TechnicalSkills />
      <Education />
      <KeyCompetencies />
      <Footer />
    </main>
  );
}