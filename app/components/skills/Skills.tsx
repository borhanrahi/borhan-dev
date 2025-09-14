"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import AnimatedTitle from "../homepage/AnimatedTitle";

interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    icon: string;
    color: string;
    level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Mastery",
    description: "Creating seamless user experiences with modern technologies",
    skills: [
      { name: "JavaScript", icon: "🟨", color: "#F7DF1E", level: "Expert" },
      { name: "CSS", icon: "🎨", color: "#264DE4", level: "Expert" },
      { name: "React.js", icon: "⚛️", color: "#61DAFB", level: "Expert" },
      { name: "Next.js", icon: "▲", color: "#000000", level: "Expert" },
      { name: "TypeScript", icon: "📘", color: "#3178C6", level: "Advanced" },
      { name: "Tailwind CSS", icon: "🎨", color: "#38B2AC", level: "Expert" },
      { name: "GSAP", icon: "🎭", color: "#88CE02", level: "Advanced" },
      {
        name: "Framer Motion",
        icon: "🎬",
        color: "#FF0055",
        level: "Advanced",
      },
      { name: "Three.js", icon: "🎮", color: "#000000", level: "Intermediate" },
    ],
  },
  {
    title: "Backend Excellence",
    description: "Building robust and scalable server-side solutions",
    skills: [
      { name: "Node.js", icon: "🟢", color: "#339933", level: "Expert" },
      { name: "Express.js", icon: "🚂", color: "#000000", level: "Advanced" },
      { name: "PostgreSQL", icon: "🐘", color: "#336791", level: "Advanced" },
      { name: "MongoDB", icon: "🍃", color: "#47A248", level: "Advanced" },
      { name: "GraphQL", icon: "📊", color: "#E535AB", level: "Intermediate" },
      { name: "REST APIs", icon: "🔌", color: "#FF6B6B", level: "Expert" },
    ],
  },
  {
    title: "DevOps & Tools",
    description: "Streamlining development and deployment workflows",
    skills: [
      { name: "Git & GitHub", icon: "🐙", color: "#F05032", level: "Expert" },
      { name: "Docker", icon: "🐳", color: "#2496ED", level: "Advanced" },
      { name: "AWS", icon: "☁️", color: "#FF9900", level: "Advanced" },
      { name: "CI/CD", icon: "🔄", color: "#40B5A4", level: "Advanced" },
      { name: "Jest", icon: "🃏", color: "#C21325", level: "Advanced" },
      { name: "Webpack", icon: "📦", color: "#8DD6F9", level: "Intermediate" },
    ],
  },
];

const getLevelColor = (level: string) => {
  const colors = {
    Beginner: "text-blue-400",
    Intermediate: "text-green-400",
    Advanced: "text-purple-400",
    Expert: "text-highlight",
  };
  return colors[level as keyof typeof colors];
};

const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context;

    const initAnimation = async () => {
      const { ScrollTrigger } = await import("@/lib/gsap");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Title animation with split text effect
        gsap.from(".skills-header", {
          opacity: 0,
          y: 20,
          duration: 1,
          ease: "power2.out",
        });

        // Animate each category with different effects
        skillCategories.forEach((_, index) => {
          const cards = document.querySelectorAll(
            `.category-${index} .skill-card`
          );

          // Category title animation
          gsap.from(`.category-${index} .category-title`, {
            opacity: 0,
            scale: 0.9,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: `.category-${index}`,
              start: "top 80%",
            },
          });

          // Skill cards staggered animation
          gsap.from(cards, {
            opacity: 0,
            scale: 0.8,
            rotationY: 45,
            duration: 1,
            stagger: {
              each: 0.1,
              from: "random",
            },
            ease: "power4.out",
            scrollTrigger: {
              trigger: `.category-${index}`,
              start: "top 80%",
            },
          });

          // Add hover animations for each card
          cards.forEach((card) => {
            card.addEventListener("mouseenter", () => {
              gsap.to(card, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              });

              // Animate the icon
              const icon = card.querySelector(".skill-icon");
              gsap.to(icon, {
                rotateY: 360,
                duration: 0.6,
                ease: "power2.inOut",
              });
            });

            card.addEventListener("mouseleave", () => {
              gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
                boxShadow: "none",
              });

              // Reset icon rotation
              const icon = card.querySelector(".skill-icon");
              gsap.set(icon, { rotateY: 0 });
            });
          });
        });

        // Optional: Add a floating animation to all cards
        gsap.to(".skill-card", {
          y: "-10px",
          duration: 2,
          ease: "power1.inOut",
          stagger: {
            each: 0.2,
            repeat: -1,
            yoyo: true,
            from: "random",
          },
        });
      }, containerRef);
    };

    initAnimation();

    return () => ctx?.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative z-10 px-4 py-32 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="skills-header mb-20 text-center">
          <p className="font-general text-sm uppercase text-highlight md:text-[15px]">
            Skills & Expertise
          </p>
          <AnimatedTitle
            title="Crafting Digital <b>E</b>xperiences <br /> With Modern <b>T</b>echnologies"
            containerClass="mt-5"
          />
        </div>

        <div className="space-y-32">
          {skillCategories.map((category, categoryIndex) => (
            <div key={category.title} className={`category-${categoryIndex}`}>
              <div className="category-title mb-12 text-center">
                <h3 className="special-font mb-3 font-zentry text-3xl font-black text-white">
                  {category.title}
                </h3>
                <p className="font-circular-web text-gray-400">
                  {category.description}
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="skill-card group relative overflow-hidden rounded-xl bg-white/5 p-6 backdrop-blur-sm"
                  >
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <span className="skill-icon text-3xl transform">
                        {skill.icon}
                      </span>
                      <span className="font-circular-web text-base font-medium text-white">
                        {skill.name}
                      </span>
                      <span
                        className={`text-xs font-medium ${getLevelColor(
                          skill.level
                        )}`}
                      >
                        {skill.level}
                      </span>
                    </div>
                    <div
                      className="absolute inset-0 opacity-0 transition-all duration-300 group-hover:opacity-20"
                      style={{
                        background: `radial-gradient(circle at center, ${skill.color}, transparent 70%)`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
