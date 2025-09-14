"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { useInView } from "react-intersection-observer";
import { 
  createOptimizedTimeline, 
  PERFORMANCE_CONFIG, 
  cleanupGsapAnimations 
} from "@/app/utils/gsapUtils";

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
      // Set initial state
      gsap.set(".stat-item", {
        y: 40,
        opacity: 0,
        scale: 0.9,
        transformOrigin: "center center",
        ...PERFORMANCE_CONFIG,
      });

      const statsTimeline = createOptimizedTimeline();
      
      statsTimeline.to(".stat-item", {
        ...PERFORMANCE_CONFIG,
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: {
          amount: 0.4,
          from: "start",
        },
        ease: "power3.out",
      });
    }

    return () => {
      cleanupGsapAnimations([".stat-item"]);
    };
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
