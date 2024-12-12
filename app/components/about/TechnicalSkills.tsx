"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const skillCategories = [
  {
    title: "Electrical & Electronics",
    skills: [
      "Helioscope",
      "PSpice",
      "PVsyst",
      "AutoCAD",
      "MATLAB",
      "PCB Design (Proteus)",
      "MOSFET Design (T-CAD)",
    ],
  },
  {
    title: "Software Development",
    skills: [
      "JavaScript",
      "Python",
      "Node.js",
      "React.js",
      "Next.js",
      "TailwindCSS",
      "Framer Motion",
    ],
  },
];

const TechnicalSkills = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skill-category", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-black px-4 py-24 sm:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="special-font mb-12 font-zentry text-3xl font-black text-white">
          Technical Expertise
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="skill-category rounded-2xl border border-white/10 bg-[#111]/80 p-8 backdrop-blur-sm"
            >
              <h3 className="mb-6 font-circular-web text-2xl text-highlight">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-white/5 px-4 py-2 font-robert-regular text-sm text-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;
