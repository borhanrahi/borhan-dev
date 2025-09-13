import Skills from "@/components/skills/Skills";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills - Borhan Uddin",
  description: "Technical skills and expertise in web development, including React, Next.js, Node.js, and modern technologies.",
};

export const dynamic = 'force-static';
export const revalidate = false;

export default function SkillsPage() {
  return (
    <main className="relative min-h-screen w-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1012] via-black to-black opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,17,17,0.8),rgba(0,0,0,0.8))]" />
      </div>
      <Skills />
    </main>
  );
}
