"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { useInView } from "react-intersection-observer";
import ProjectCard from "./ProjectCard";
import { projects } from "./projectData";

export default function ProjectGrid() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      gsap.from(".project-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }
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
