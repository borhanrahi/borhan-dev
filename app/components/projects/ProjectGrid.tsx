"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { useInView } from "react-intersection-observer";
import { 
  createOptimizedTimeline, 
  PERFORMANCE_CONFIG, 
  cleanupGsapAnimations 
} from "@/app/utils/gsapUtils";
import ProjectCard from "./ProjectCard";
import { projects } from "./projectData";

export default function ProjectGrid() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      // Set initial state
      gsap.set(".project-card", {
        y: 60,
        opacity: 0,
        scale: 0.95,
        rotateX: 5,
        transformOrigin: "center center",
        ...PERFORMANCE_CONFIG,
      });

      const projectsTimeline = createOptimizedTimeline();
      
      projectsTimeline.to(".project-card", {
        ...PERFORMANCE_CONFIG,
        y: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: {
          amount: 0.4,
          from: "start",
        },
        ease: "power3.out",
      });
    }

    return () => {
      cleanupGsapAnimations([".project-card"]);
    };
  }, [inView]);

  return (
    <div ref={ref} className="relative z-10 container mx-auto px-4 pb-32">
      <div className="grid gap-10 md:grid-cols-2 lg:gap-12">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
}
