"use client";

import { gsap } from "@/lib/gsap";
import { useRef } from "react";

import { useGsapAnimation } from "@/app/hooks/useGsapAnimation";

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
          <div className="experience-item rounded-2xl border border-white/10 bg-[#111]/80 p-8 backdrop-blur-sm">
            <div className="mb-4">
              <h3 className="font-circular-web text-2xl text-white">
                Infrastructure Development Company Limited (IDCOL)
              </h3>
              <p className="font-robert-regular text-highlight">
                Aug 2021 - Present
              </p>
            </div>
            <ul className="space-y-3 text-gray-400">
              <li>• Provided technical support for solar rooftop projects</li>
              <li>• Core team member for CBS and HRMS implementation</li>
              <li>• Ensured project compliance through site evaluations</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
