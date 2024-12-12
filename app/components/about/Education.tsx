"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const educationData = [
  {
    degree: "B.Sc. in Electrical & Electronics Engineering (EEE)",
    institution: "United International University",
    year: "2020",
    specialization: "Major in Power",
  },
  {
    degree: "HSC (Higher Secondary Certificate)",
    institution: "Naogaon Govt. College",
    year: "2013",
    specialization: "Science",
  },
  {
    degree: "SSC (Secondary School Certificate)",
    institution: "Naogaon K.D. Govt. High School",
    year: "2011",
    specialization: "Science",
  },
];

const Education = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".education-item", {
        x: -30,
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
          Education
        </h2>

        <div className="space-y-8">
          {educationData.map((edu) => (
            <div
              key={edu.degree}
              className="education-item rounded-2xl border border-white/10 bg-[#111]/80 p-8 backdrop-blur-sm"
            >
              <div className="flex flex-col gap-2">
                <h3 className="font-circular-web text-2xl text-white">
                  {edu.degree}
                </h3>
                <p className="font-robert-regular text-highlight">
                  {edu.institution}
                </p>
                <div className="flex gap-4 text-gray-400">
                  <span>{edu.year}</span>
                  <span>•</span>
                  <span>{edu.specialization}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
