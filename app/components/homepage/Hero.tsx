"use client";

import { gsap, ScrollTrigger, TextPlugin } from "@/lib/gsap";
import { Rocket, Gamepad2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const webDevConcepts: string[] = [
  "React.js",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "GSAP",
  "Tailwind CSS",
  "Framer Motion",
  "GraphQL",
  "Node.js",
];

const splitTextIntoSpans = (element: HTMLElement): HTMLSpanElement[] => {
  const text = element.textContent || "";
  element.textContent = "";
  const spans = text.split("").map((char) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.style.display = "inline-block";
    element.appendChild(span);
    return span;
  });
  return spans;
};

const useScrambleText = (
  text: string,
  chars: string = "QWERTYUIOPASDFGHJKLZXCVBNM",
  speed: number = 30
) => {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let isMounted = true;
    let frame: number;
    let iteration = 0;
    const maxIterations = 20;

    const scramble = () => {
      if (!isMounted) return;

      const newText = text
        .split("")
        .map((char, index) => {
          if (index < iteration) {
            return text[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      setDisplayText(newText);

      if (iteration < text.length) {
        if (iteration < maxIterations) {
          iteration += 1 / 4;
        } else {
          iteration += 0.5;
        }
        frame = requestAnimationFrame(scramble);
      }
    };

    frame = requestAnimationFrame(scramble);

    return () => {
      isMounted = false;
      cancelAnimationFrame(frame);
    };
  }, [text, chars, speed]);

  return displayText;
};

const SplineScene = dynamic(() => import("./SplineScene"), {
  loading: () => <div className="h-screen w-full bg-black" />,
  ssr: false,
});

export default function GSAPWebDevHero(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const conceptsRef = useRef<HTMLDivElement>(null);
  const scrambledText = useScrambleText("DEVELOP");

  useEffect(() => {
    if (
      !containerRef.current ||
      !titleRef.current ||
      !subtitleRef.current ||
      !conceptsRef.current
    )
      return;

    const titleChars = splitTextIntoSpans(titleRef.current);
    const subtitleLines = subtitleRef.current.children;

    // Reset initial states
    gsap.set(subtitleLines, { opacity: 0 });
    gsap.set(conceptsRef.current, { opacity: 0 });

    // Initial load animations (no scroll trigger)
    const loadTl = gsap.timeline();

    loadTl
      .from(titleChars, {
        duration: 1.5,
        opacity: 0,
        y: 50,
        rotationX: 90,
        stagger: 0.05,
        ease: "back.out(1.7)",
      })
      .to(
        subtitleLines,
        {
          duration: 1.2,
          opacity: 1,
          scale: 1,
          rotation: 0,
          x: 0,
          stagger: 0.2,
          ease: "elastic.out(1, 0.8)",
        },
        "-=1"
      )
      .to(
        conceptsRef.current,
        {
          duration: 1,
          opacity: 1,
        },
        "-=0.5"
      )
      .add(() => {
        // Replace the existing concepts animation with this new one
        let currentIndex = 0;

        gsap.to(conceptsRef.current, {
          duration: 1.5,
          repeat: -1,
          repeatDelay: 1,
          onRepeat: () => {
            currentIndex = (currentIndex + 1) % webDevConcepts.length;
            gsap.to(conceptsRef.current, {
              duration: 0.75,
              opacity: 0,
              scale: 0.8,
              y: -20,
              ease: "power2.in",
              onComplete: () => {
                if (!conceptsRef.current) return;
                conceptsRef.current.textContent = webDevConcepts[currentIndex];
                gsap.to(conceptsRef.current, {
                  duration: 0.75,
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  ease: "back.out(1.7)",
                });
              },
            });
          },
        });
      });

    // Smooth scroll effect
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    scrollTl
      // Main container animation
      .to(containerRef.current, {
        rotateX: 10,
        scale: 0.9,
        y: "-15%",
        duration: 2,
        ease: "power2.inOut",
      })
      // Background parallax
      .to(
        ".background-image",
        {
          y: "-20%",
          scale: 1.2,
          duration: 2,
        },
        0
      )
      // Content container
      .to(
        ".content-container",
        {
          y: "-10%",
          opacity: 0.7,
          duration: 2,
        },
        0
      )
      // Text elements fade with slight movement
      .to(
        [titleRef.current, subtitleRef.current],
        {
          y: "-30%",
          opacity: 0,
          duration: 2,
          stagger: 0.1,
        },
        0
      )
      .to(
        conceptsRef.current,
        {
          y: "30%",
          opacity: 0,
          duration: 2,
          stagger: 0.1,
        },
        0
      )
      // Atmospheric elements
      .to(
        ".blur-orb",
        {
          y: "-30%",
          opacity: 0.15,
          scale: 1.5,
          duration: 2,
          stagger: 0.2,
        },
        0
      );

    return () => {
      loadTl.kill();
      scrollTl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black transform-gpu"
    >
      <SplineScene />

      <div className="background-gradient absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30 pointer-events-none z-10" />

      <div className="blur-orb absolute left-1/4 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl z-20 pointer-events-none" />
      <div className="blur-orb absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl z-20 pointer-events-none" />

      <div className="content-container relative mx-auto max-w-[1440px] h-full z-30 pointer-events-none">
        <div className="content-left absolute left-[5%] sm:left-[10%] top-[20%] w-[90%] sm:w-[45%]">
          <h1
            ref={titleRef}
            className="mb-8 text-6xl font-bold tracking-tighter text-white sm:text-5xl md:text-7xl lg:text-[100px]"
          >
            INNOVATE
          </h1>
          <div
            ref={subtitleRef}
            className="mb-8 text-lg text-white font-semibold sm:text-xl gap-8 md:text-2xl pl-[2px]"
          >
            <p>Master Modern Development</p>
            <p>Build the Future Web</p>
          </div>
          <div>
            <div
              ref={conceptsRef}
              className="mt-4 mb-16 text-lg font-semibold text-[#d4ff4d] sm:text-xl md:text-2xl pl-[2px] -ml-[1px] transition-all"
            >
              {webDevConcepts[0]}
            </div>
          </div>

          <div className="flex flex-row gap-4 mt-8 md:mt-16 pointer-events-auto">
            <button className="group flex w-full items-center justify-center gap-3 rounded-lg bg-white/20 px-4 py-3 text-white backdrop-blur-sm transition-all hover:bg-black/50 md:w-auto md:px-6">
              <Rocket
                className="h-5 w-5 text-[#d4ff4d] transition-transform group-hover:scale-110"
                strokeWidth={2}
              />
              <span className="font-semibold text-sm md:text-base">
                Get Started
              </span>
            </button>

            <button className="group flex w-full items-center justify-center gap-3 rounded-lg bg-[#d4ff4d]/90 px-4 py-3 text-black transition-all hover:bg-[#d4ff4d] md:w-auto md:px-6">
              <Gamepad2
                className="h-5 w-5 transition-transform group-hover:scale-110"
                strokeWidth={2}
              />
              <span className="font-semibold text-sm md:text-base">
                View Projects
              </span>
            </button>
          </div>
        </div>

        <div className="content-right absolute right-[5%] bottom-[10%] w-full sm:w-[600px] text-center">
          <h2 className="text-6xl font-bold tracking-tighter text-white sm:text-8xl md:text-9xl lg:text-[150px]">
            {scrambledText}
          </h2>
        </div>
      </div>
    </div>
  );
}
