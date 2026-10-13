"use client";

import { gsap } from "@/lib/gsap";
import { useRef } from "react";

import { useGsapAnimation } from "@/app/hooks/useGsapAnimation";

const experiences = [
  {
    company: "Triangle Services Ltd.",
    role: "Assistant Software Engineer",
    location: "Dhaka, BD (On-site)",
    period: "Oct 2025 - Present",
    responsibilities: [
      "Built and maintained front-end features using Next.js — responsive UI and reusable components",
      "Integrated REST APIs and implemented CMS-driven pages using Payload CMS",
    ],
  },
  {
    company: "IDCOL – Infrastructure Development Company Ltd.",
    role: "Officer (Technical)",
    location: "Dhaka, BD",
    period: "Aug 2021 - Sep 2024",
    responsibilities: [
      "Represented IDCOL during the design and development of internal Core Banking (CBS) and HRMS systems, drafting and refining the Business Requirements Document (BRD)",
      "Reviewed vendor codebases and enforced internal security standards, reducing bugs by ~20%",
      "Tracked agile sprints and improved payroll processing efficiency by ~25%, helping reduce HR processing time by ~35% post-HRMS launch",
      "Inspected and maintained 50+ rooftop solar systems and collaborated on an internal monitoring dashboard",
      "Debugged API integrations, improving data accuracy by ~30%, and conducted onboarding for 5+ internal teams",
    ],
  },
  {
    company: "Freelance",
    role: "Full-Stack Developer",
    location: "Remote",
    period: "Apr 2018 - Present",
    responsibilities: [
      "Built modern apps with Next.js, React, TailwindCSS, MongoDB, and Framer Motion",
      "Completed 100+ client projects, earning 60+ 5-star reviews",
      "Delivered fast, scalable apps with Stripe, Appwrite auth, and CMS integration",
      "Enhanced SEO by ~35% on 20+ WordPress theme customizations",
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
      className="relative w-full bg-black px-4 py-4 sm:px-10"
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
                  {exp.role}
                </p>
                <p className="font-robert-regular text-sm text-gray-500">
                  {exp.period} • {exp.location}
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
