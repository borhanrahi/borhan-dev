import { gsap } from "@/lib/gsap";

// Performance configuration for all animations
export const PERFORMANCE_CONFIG = {
  force3D: true,
  lazy: true,
  immediateRender: false,
  overwrite: "auto" as const,
  ease: "power2.out",
};

// Optimized ScrollTrigger defaults
export const SCROLL_TRIGGER_CONFIG = {
  fastScrollEnd: true,
  preventOverlaps: true,
  invalidateOnRefresh: true,
  refreshPriority: -1,
};

// Create lightweight animation with performance optimizations
const createLightweightAnimation = (
  element: string | Element,
  properties: gsap.TweenVars,
  scrollTrigger?: object
) => {
  return {
    ...PERFORMANCE_CONFIG,
    ...properties,
    scrollTrigger: scrollTrigger
      ? {
          ...SCROLL_TRIGGER_CONFIG,
          ...scrollTrigger,
        }
      : undefined,
  };
};

// Batch animation utility for multiple elements
export const batchAnimate = (
  selector: string,
  animation: gsap.TweenVars,
  stagger = 0.1
) => {
  return gsap.from(selector, {
    ...PERFORMANCE_CONFIG,
    ...animation,
    stagger: {
      amount: stagger,
      from: "start",
    },
  });
};

// Timeline with performance optimizations
export const createOptimizedTimeline = (config?: gsap.TimelineVars) => {
  return gsap.timeline({
    ...config,
    lazy: true,
    smoothChildTiming: true,
  });
};

// Mouse interaction utilities
export const createMouseInteraction = (
  element: HTMLElement,
  config: {
    rotationIntensity?: number;
    duration?: number;
    ease?: string;
  } = {}
) => {
  const { rotationIntensity = 10, duration = 0.1, ease = "none" } = config;
  
  // Set initial 3D properties
  gsap.set(element, {
    transformPerspective: 500,
    transformStyle: "preserve-3d",
  });

  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const xPos = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;

    const rotateX = ((yPos - centerY) / centerY) * -rotationIntensity;
    const rotateY = ((xPos - centerX) / centerX) * rotationIntensity;

    gsap.to(element, {
      duration,
      rotateX,
      rotateY,
      ease,
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      duration: 0.6,
      rotateX: 0,
      rotateY: 0,
      ease: "power2.out",
    });
  };

  return { handleMouseMove, handleMouseLeave };
};

// Optimized animation presets
export const optimizedGsapAnimation = {
  fadeUp: (element: string | Element, delay = 0) =>
    createLightweightAnimation(element, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay,
      clearProps: "transform",
    }),

  fadeIn: (element: string | Element, delay = 0) =>
    createLightweightAnimation(element, {
      opacity: 0,
      duration: 0.5,
      delay,
    }),

  slideUp: (element: string | Element, delay = 0) =>
    createLightweightAnimation(element, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay,
      clearProps: "transform",
    }),

  scaleIn: (element: string | Element, delay = 0) =>
    createLightweightAnimation(element, {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      delay,
      clearProps: "transform",
    }),

  slideInLeft: (element: string | Element, delay = 0) =>
    createLightweightAnimation(element, {
      x: -50,
      opacity: 0,
      duration: 0.7,
      delay,
      clearProps: "transform",
    }),

  slideInRight: (element: string | Element, delay = 0) =>
    createLightweightAnimation(element, {
      x: 50,
      opacity: 0,
      duration: 0.7,
      delay,
      clearProps: "transform",
    }),

  // Staggered animations
  staggerFadeUp: (selector: string, stagger = 0.1) =>
    batchAnimate(selector, {
      y: 30,
      opacity: 0,
      duration: 0.6,
    }, stagger),

  staggerScaleIn: (selector: string, stagger = 0.1) =>
    batchAnimate(selector, {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
    }, stagger),
};

// Cleanup utility
export const cleanupGsapAnimations = (elements: (string | Element)[]) => {
  elements.forEach(element => {
    gsap.killTweensOf(element);
    gsap.set(element, { clearProps: "all" });
  });
};