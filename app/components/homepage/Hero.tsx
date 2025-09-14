"use client";

import { gsap, ScrollTrigger, TextPlugin } from "@/lib/gsap";
import { useEffect, useRef, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { 
  createOptimizedTimeline, 
  PERFORMANCE_CONFIG, 
  SCROLL_TRIGGER_CONFIG,
  cleanupGsapAnimations 
} from "@/app/utils/gsapUtils";
import Link from "next/link";

// Lazy load icons
const Rocket = dynamic(() => import("lucide-react").then((mod) => mod.Rocket), {
  loading: () => <div className="w-5 h-5" />,
  ssr: true,
});

const Gamepad2 = dynamic(
  () => import("lucide-react").then((mod) => mod.Gamepad2),
  {
    loading: () => <div className="w-5 h-5" />,
    ssr: true,
  }
);

// Lazy load SplineScene with suspense
const SplineScene = dynamic(() => import("./SplineScene"), {
  loading: () => null,
  ssr: false,
});

// Pre-register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Move constants outside component
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
  chars: string = "QWERTYUIOPASDFGHJKLZXCVBNM"
) => {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let isMounted = true;
    let frame: number;
    let iteration = 0;

    const scramble = () => {
      if (!isMounted) return;

      requestAnimationFrame(() => {
        const newText = text
          .split("")
          .map((char, index) =>
            index < iteration
              ? text[index]
              : chars[Math.floor(Math.random() * chars.length)]
          )
          .join("");

        setDisplayText(newText);

        if (iteration < text.length) {
          iteration += iteration < 20 ? 0.25 : 0.5;
          frame = requestAnimationFrame(scramble);
        }
      });
    };

    scramble();
    return () => {
      isMounted = false;
      cancelAnimationFrame(frame);
    };
  }, [text, chars]);

  return displayText;
};

// Pre-compute static class strings to reduce runtime concatenation
const STATIC_CLASSES = {
  container: "relative h-screen w-full overflow-hidden bg-black transform-gpu",
  gradient:
    "background-gradient absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30 pointer-events-none z-10",
  contentContainer:
    "content-container relative mx-auto max-w-[1440px] h-full z-30 pointer-events-none",
} as const;

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

    // Reset initial states with performance config
    gsap.set(subtitleLines, { opacity: 0, ...PERFORMANCE_CONFIG });
    gsap.set(conceptsRef.current, { opacity: 0, ...PERFORMANCE_CONFIG });
    gsap.set(titleChars, { transformOrigin: "center bottom" });

    // Initial load animations with optimized timeline
    const loadTl = createOptimizedTimeline();

    loadTl
      .from(titleChars, {
        ...PERFORMANCE_CONFIG,
        duration: 1.2,
        opacity: 0,
        y: 50,
        rotationX: 90,
        stagger: {
          amount: 0.3,
          from: "start",
        },
        ease: "back.out(1.7)",
      })
      .to(
        subtitleLines,
        {
          ...PERFORMANCE_CONFIG,
          duration: 1,
          opacity: 1,
          scale: 1,
          rotation: 0,
          x: 0,
          stagger: {
            amount: 0.4,
            from: "start",
          },
          ease: "power2.out",
        },
        "-=0.8"
      )
      .to(
        conceptsRef.current,
        {
          ...PERFORMANCE_CONFIG,
          duration: 0.8,
          opacity: 1,
        },
        "-=0.4"
      )
      .add(() => {
        // Optimized concepts cycling animation
        let currentIndex = 0;
        let conceptsAnimation: gsap.core.Tween;

        const cycleConcepts = () => {
          conceptsAnimation = gsap.to(conceptsRef.current, {
            ...PERFORMANCE_CONFIG,
            duration: 1.2,
            repeat: -1,
            repeatDelay: 0.8,
            onRepeat: () => {
              currentIndex = (currentIndex + 1) % webDevConcepts.length;
              gsap.to(conceptsRef.current, {
                ...PERFORMANCE_CONFIG,
                duration: 0.4,
                opacity: 0,
                scale: 0.9,
                y: -15,
                ease: "power2.in",
                onComplete: () => {
                  if (!conceptsRef.current) return;
                  conceptsRef.current.textContent = webDevConcepts[currentIndex];
                  gsap.to(conceptsRef.current, {
                    ...PERFORMANCE_CONFIG,
                    duration: 0.5,
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    ease: "power2.out",
                  });
                },
              });
            },
          });
          
          // Store reference for cleanup
          loadTl.conceptsAnimation = conceptsAnimation;
        };
        
        cycleConcepts();
      });

    // Optimized scroll effect
    const scrollTl = createOptimizedTimeline({
      scrollTrigger: {
        ...SCROLL_TRIGGER_CONFIG,
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
      },
    });

    scrollTl
      // Main container animation with performance config
      .to(containerRef.current, {
        ...PERFORMANCE_CONFIG,
        rotateX: 8,
        scale: 0.92,
        y: "-12%",
        duration: 1.8,
        ease: "power2.out",
      })
      // Background parallax (optimized)
      .to(
        ".background-image",
        {
          ...PERFORMANCE_CONFIG,
          y: "-18%",
          scale: 1.15,
          duration: 1.8,
        },
        0
      )
      // Content container (batch animation)
      .to(
        ".content-container",
        {
          ...PERFORMANCE_CONFIG,
          y: "-8%",
          opacity: 0.75,
          duration: 1.8,
        },
        0
      )
      // Text elements with optimized stagger
      .to(
        [titleRef.current, subtitleRef.current],
        {
          ...PERFORMANCE_CONFIG,
          y: "-25%",
          opacity: 0,
          duration: 1.8,
          stagger: {
            amount: 0.2,
            from: "start",
          },
        },
        0
      )
      .to(
        conceptsRef.current,
        {
          ...PERFORMANCE_CONFIG,
          y: "25%",
          opacity: 0,
          duration: 1.8,
        },
        0
      )
      // Atmospheric elements (if they exist)
      .to(
        ".blur-orb",
        {
          ...PERFORMANCE_CONFIG,
          y: "-25%",
          opacity: 0.2,
          scale: 1.3,
          duration: 1.8,
          stagger: {
            amount: 0.4,
            from: "random",
          },
        },
        0
      );

    return () => {
      // Enhanced cleanup
      loadTl.kill();
      scrollTl.kill();
      
      // Kill any remaining concept animations
      if (loadTl.conceptsAnimation) {
        loadTl.conceptsAnimation.kill();
      }
      
      // Clean up all GSAP animations on elements
      const elementsToCleanup = [
        containerRef.current,
        titleRef.current,
        subtitleRef.current,
        conceptsRef.current,
        ...titleChars,
        ...Array.from(subtitleLines),
      ].filter((element): element is HTMLElement => element !== null);
      
      if (elementsToCleanup.length > 0) {
        cleanupGsapAnimations(elementsToCleanup);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={STATIC_CLASSES.container}>
      <Suspense fallback={<div className="h-screen w-full bg-black" />}>
        <SplineScene />
      </Suspense>

      <div className={STATIC_CLASSES.gradient} />

      <div className={STATIC_CLASSES.contentContainer}>
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
            <Link href="/contact" passHref>
              <button className="group flex w-full items-center justify-center gap-3 rounded-lg bg-white/20 px-4 py-3 text-white backdrop-blur-sm transition-all hover:bg-black/50 md:w-auto md:px-6">
                <Rocket
                  className="h-5 w-5 text-[#d4ff4d] transition-transform group-hover:scale-110"
                  strokeWidth={2}
                />
                <span className="font-semibold text-sm md:text-base">
                  Get Started
                </span>
              </button>
            </Link>

            <Link href="/projects" passHref>
              <button className="group flex w-full items-center justify-center gap-3 rounded-lg bg-[#d4ff4d]/90 px-4 py-3 text-black transition-all hover:bg-[#d4ff4d] md:w-auto md:px-6">
                <Gamepad2
                  className="h-5 w-5 transition-transform group-hover:scale-110"
                  strokeWidth={2}
                />
                <span className="font-semibold text-sm md:text-base">
                  View Projects
                </span>
              </button>
            </Link>
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
