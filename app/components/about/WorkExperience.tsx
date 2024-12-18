"use client";

import { gsap } from "@/lib/gsap";
import { useRef } from "react";

import { useGsapAnimation } from "@/app/hooks/useGsapAnimation";

const experiences = [
  {
    company: "Infrastructure Development Company Limited (IDCOL)",
    period: "Aug 2021 - Oct 2024",
    responsibilities: [
      "Provided technical support for solar rooftop projects",
      "Core team member for CBS and HRMS implementation",
      "Ensured project compliance through site evaluations",
    ],
  },
  {
    company: "Freelance Full Stack Developer",
    period: "2018 - Present",
    responsibilities: [
      "Delivered 65+ successful projects on Upwork and Fiverr",
      "Specialized in React, Next.js, and Node.js development",
      "Maintained 5-star rating with 95% client satisfaction rate",
      "Built and deployed scalable web applications for clients worldwide",
    ],
  },
];

const WorkExperience = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const isMounted = useGsapAnimation((ctx) => {
    ctx.add(() => {
      gsap.from(".experience-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    });
  });

  if (!isMounted) return null;

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-black px-4 py-24 sm:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="special-font mb-12 font-zentry text-3xl font-black text-white">
          Work Experience
        </h2>

        <div className="space-y-8">
          {experiences.map((exp) => (
            <div
              key={exp.company}
              className="experience-item rounded-2xl border border-white/10 bg-[#111]/80 p-8 backdrop-blur-sm"
            >
              <div className="mb-4">
                <h3 className="font-circular-web text-2xl text-white">
                  {exp.company}
                </h3>
                <p className="font-robert-regular text-highlight">
                  {exp.period}
                </p>
              </div>
              <ul className="space-y-3 text-gray-400">
                {exp.responsibilities.map((resp, index) => (
                  <li key={index}>• {resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
