"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { useInView } from "react-intersection-observer";

const stats = [
  { number: "50+", label: "Projects Completed" },
  { number: "30+", label: "Happy Clients" },
  { number: "5+", label: "Years Experience" },
  { number: "100%", label: "Success Rate" },
];

export default function ProjectStats() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      gsap.from(".stat-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className="relative z-10 container mx-auto px-4 py-24 border-t border-white/10"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item text-center">
            <div className="font-circular-web text-4xl md:text-5xl text-highlight mb-2">
              {stat.number}
            </div>
            <div className="font-robert-regular text-gray-400">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
