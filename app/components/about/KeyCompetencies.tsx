"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const competencies = [
  {
    title: "Technical Expertise",
    description:
      "Strong foundation in EEE principles and industrial applications, combined with full-stack development skills",
    icon: "⚡",
  },
  {
    title: "Project Management",
    description:
      "Experience managing complex projects in both engineering and software development environments",
    icon: "📊",
  },
  {
    title: "Communication",
    description:
      "Excellent verbal and written communication skills in Bengali and English",
    icon: "💬",
  },
  {
    title: "Problem-Solving",
    description:
      "Strong analytical skills with efficient technical and operational issue resolution",
    icon: "🔧",
  },
];

const KeyCompetencies = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".competency-card", {
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
          Key Competencies
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {competencies.map((comp) => (
            <div
              key={comp.title}
              className="competency-card rounded-2xl border border-white/10 bg-[#111]/80 p-8 backdrop-blur-sm"
            >
              <div className="mb-4 text-4xl">{comp.icon}</div>
              <h3 className="mb-3 font-circular-web text-xl text-white">
                {comp.title}
              </h3>
              <p className="font-robert-regular text-gray-400">
                {comp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyCompetencies;
