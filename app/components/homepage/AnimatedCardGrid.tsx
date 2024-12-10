"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);
interface Card {
  title: string;
  description: string;
  icon: string;
}

const cards: Card[] = [
  {
    title: "Innovation",
    description: "Pushing boundaries in modern development",
    icon: "🚀",
  },
  {
    title: "Technology",
    description: "Cutting-edge tools and frameworks",
    icon: "⚡",
  },
  {
    title: "Design",
    description: "Beautiful, responsive interfaces",
    icon: "🎨",
  },
  {
    title: "Performance",
    description: "Optimized for speed and efficiency",
    icon: "⚡",
  },
];

const AnimatedCardGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    cardsRef.current.forEach((card, index) => {
      if (card) {
        tl.from(card, {
          y: 100,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          delay: index * 0.1,
        });
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-8 md:grid-cols-2"
    >
      {cards.map((card, index) => (
        <div
          key={card.title}
          ref={(el) => {
            cardsRef.current[index] = el;
          }}
          className="bento-tilt_1 bg-black/50 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-black/60"
        >
          <div className="mb-4 text-4xl">{card.icon}</div>
          <h3 className="special-font mb-2 font-zentry text-2xl text-white">
            {card.title}
          </h3>
          <p className="font-robert-regular text-[#d4ff4d]">
            {card.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AnimatedCardGrid;
