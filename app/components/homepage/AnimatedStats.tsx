"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";
import { 
  createOptimizedTimeline, 
  PERFORMANCE_CONFIG, 
  SCROLL_TRIGGER_CONFIG,
  cleanupGsapAnimations 
} from "@/app/utils/gsapUtils";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTitleProps {
  title: string;
  containerClass?: string;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
  title,
  containerClass,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state with performance optimizations
      gsap.set(".animated-word", {
        opacity: 0,
        rotateY: -15,
        rotateX: 15,
        y: 30,
        transformOrigin: "center center",
        ...PERFORMANCE_CONFIG,
      });

      const titleAnimation = createOptimizedTimeline({
        scrollTrigger: {
          ...SCROLL_TRIGGER_CONFIG,
          trigger: containerRef.current,
          start: "top 85%",
          end: "center 70%",
          toggleActions: "play none none reverse",
        },
      });

      titleAnimation.to(
        ".animated-word",
        {
          ...PERFORMANCE_CONFIG,
          opacity: 1,
          rotateY: 0,
          rotateX: 0,
          y: 0,
          duration: 0.8,
          stagger: {
            amount: 0.3,
            from: "start",
          },
        },
        0
      );
    }, containerRef);

    return () => {
      ctx.revert();
      cleanupGsapAnimations([".animated-word"]);
    };
  }, []);

  return (
    <div ref={containerRef} className={clsx("animated-title", containerClass)}>
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {line.split(" ").map((word, idx) => (
            <span
              key={idx}
              className="animated-word"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;
