"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import AnimatedTitle from "../homepage/AnimatedTitle";
import { 
  createOptimizedTimeline, 
  PERFORMANCE_CONFIG, 
  SCROLL_TRIGGER_CONFIG,
  batchAnimate,
  cleanupGsapAnimations 
} from "@/app/utils/gsapUtils";

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
  const hoverAnimations = useRef<Map<Element, gsap.core.Timeline>>(new Map());

  useEffect(() => {
    let ctx: gsap.Context;
    let floatingAnimation: gsap.core.Tween;

    const initAnimation = async () => {
      const { ScrollTrigger } = await import("@/lib/gsap");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Optimized title animation
        gsap.from(".skills-header", {
          ...PERFORMANCE_CONFIG,
          opacity: 0,
          y: 30,
          duration: 0.8,
        });

        // Consolidated ScrollTrigger for all categories
        const masterTimeline = createOptimizedTimeline({
          scrollTrigger: {
            ...SCROLL_TRIGGER_CONFIG,
            trigger: containerRef.current,
            start: "top 90%",
            end: "bottom 20%",
          },
        });

        // Batch animate all category titles
        masterTimeline.from(".category-title", {
          ...PERFORMANCE_CONFIG,
          opacity: 0,
          scale: 0.95,
          y: 20,
          duration: 0.6,
          stagger: {
            amount: 0.3,
            from: "start",
          },
        });

        // Batch animate all skill cards with optimized stagger
        masterTimeline.from(".skill-card", {
          ...PERFORMANCE_CONFIG,
          opacity: 0,
          scale: 0.9,
          y: 30,
          duration: 0.8,
          stagger: {
            amount: 1.2,
            from: "start",
            grid: "auto",
          },
        }, "-=0.4");

        // Optimized hover interactions for all cards
        const setupHoverAnimations = () => {
          const cards = document.querySelectorAll(".skill-card");
          
          cards.forEach((card) => {
            const icon = card.querySelector(".skill-icon");
            
            // Set initial 3D properties
            gsap.set([card, icon], {
              transformPerspective: 1000,
              transformStyle: "preserve-3d",
            });

            const handleMouseEnter = () => {
              // Kill any existing animations
              const existingTween = hoverAnimations.current.get(card);
              if (existingTween) existingTween.kill();

              const tween = gsap.timeline()
                .to(card, {
                  ...PERFORMANCE_CONFIG,
                  scale: 1.03,
                  y: -5,
                  duration: 0.25,
                  ease: "power2.out",
                })
                .to(icon, {
                  ...PERFORMANCE_CONFIG,
                  rotateY: 180,
                  duration: 0.4,
                  ease: "power2.inOut",
                }, 0);
              
              hoverAnimations.current.set(card, tween);
            };

            const handleMouseLeave = () => {
              const existingTween = hoverAnimations.current.get(card);
              if (existingTween) existingTween.kill();

              const tween = gsap.timeline()
                .to(card, {
                  ...PERFORMANCE_CONFIG,
                  scale: 1,
                  y: 0,
                  duration: 0.25,
                  ease: "power2.out",
                })
                .to(icon, {
                  ...PERFORMANCE_CONFIG,
                  rotateY: 0,
                  duration: 0.3,
                  ease: "power2.out",
                }, 0);
              
              hoverAnimations.current.set(card, tween);
            };

            card.addEventListener("mouseenter", handleMouseEnter);
            card.addEventListener("mouseleave", handleMouseLeave);
          });
        };
        
        // Setup hover animations after initial animation completes
        masterTimeline.call(setupHoverAnimations);

        // Optimized floating animation
        floatingAnimation = gsap.to(".skill-card", {
          ...PERFORMANCE_CONFIG,
          y: "-8px",
          duration: 3,
          ease: "sine.inOut",
          stagger: {
            each: 0.3,
            repeat: -1,
            yoyo: true,
            from: "random",
          },
        });
      }, containerRef);
    };

    initAnimation();

    return () => {
      // Enhanced cleanup
      ctx?.revert();
      
      if (floatingAnimation) {
        floatingAnimation.kill();
      }
      
      // Clean up hover animations
      hoverAnimations.current.forEach(tween => tween.kill());
      hoverAnimations.current.clear();
      
      // Clean up all GSAP animations
      cleanupGsapAnimations([
        ".skills-header",
        ".category-title", 
        ".skill-card",
        ".skill-icon"
      ]);
      
      // Remove event listeners
      const cards = document.querySelectorAll(".skill-card");
      cards.forEach(card => {
        card.removeEventListener("mouseenter", () => {});
        card.removeEventListener("mouseleave", () => {});
      });
    };
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
