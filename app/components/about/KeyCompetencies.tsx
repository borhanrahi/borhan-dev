"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const competencies = [
  {
    title: "Full-Stack Development",
    description:
      "End-to-end delivery across Next.js, React, Node.js, MongoDB, and Docker — from responsive UIs to APIs and deployment",
    icon: "⚡",
  },
  {
    title: "Delivery at Scale",
    description:
      "100+ freelance projects completed with 60+ 5-star reviews, plus production front-end work at Triangle Services",
    icon: "🚀",
  },
  {
    title: "Agile & Requirements",
    description:
      "Tracked agile sprints and drafted BRDs at IDCOL — improved payroll efficiency by ~25% and cut HR processing time by ~35%",
    icon: "📊",
  },
  {
    title: "Problem-Solving",
    description:
      "Debugged API integrations for ~30% better data accuracy and enforced code reviews that reduced bugs by ~20%",
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
