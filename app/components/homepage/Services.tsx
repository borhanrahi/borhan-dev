"use client";

import { gsap } from "@/lib/gsap";
import { useEffect, useRef } from "react";
import { 
  createOptimizedTimeline, 
  PERFORMANCE_CONFIG, 
  SCROLL_TRIGGER_CONFIG,
  cleanupGsapAnimations 
} from "@/app/utils/gsapUtils";
import {
  Code2,
  Palette,
  ShoppingCart,
  Laptop,
  ArrowUpRight,
} from "lucide-react";
import AnimatedTitle from "./AnimatedTitle";
import { BentoTilt } from "./Features";
import Link from "next/link";

const services = [
  {
    icon: <Code2 className="h-8 w-8" />,
    title: "Web Development",
    description:
      "Building scalable web applications using modern technologies like Next.js, React, Node.js, and TypeScript.",
  },
  {
    icon: <Palette className="h-8 w-8" />,
    title: "UI/UX Development",
    description:
      "Creating responsive and intuitive user interfaces with Tailwind CSS, GSAP animations, and modern design principles.",
  },
  {
    icon: <ShoppingCart className="h-8 w-8" />,
    title: "Ecommerce Solutions",
    description:
      "Building custom online stores with secure payment integration, inventory management, and seamless shopping experiences.",
  },
  {
    icon: <Laptop className="h-8 w-8" />,
    title: "Technical Solutions",
    description:
      "Developing custom solutions and integrating third-party services for complex business requirements.",
  },
];

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state for cards
      gsap.set(".service-card", {
        y: 60,
        opacity: 0,
        scale: 0.95,
        rotateX: 10,
        transformOrigin: "center center",
        ...PERFORMANCE_CONFIG,
      });

      // Set initial state for icons
      gsap.set(".service-icon", {
        rotation: 0,
        transformOrigin: "center center",
        ...PERFORMANCE_CONFIG,
      });

      // Animate cards on scroll
      const cardsTimeline = createOptimizedTimeline({
        scrollTrigger: {
          ...SCROLL_TRIGGER_CONFIG,
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      });

      cardsTimeline.to(".service-card", {
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
        ease: "power2.out",
      });

      // Optimized icon rotation
      const iconTimeline = createOptimizedTimeline({
        repeat: -1,
        ease: "none",
      });

      iconTimeline.to(".service-icon", {
        ...PERFORMANCE_CONFIG,
        rotation: 360,
        duration: 25,
        ease: "none",
      });
    }, containerRef);

    return () => {
      ctx.revert();
      cleanupGsapAnimations([".service-card", ".service-icon"]);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative  flex flex-col justify-center bg-black"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />

      <div className="relative py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
          <div>
            <p className="font-general text-sm uppercase text-highlight tracking-wider md:text-[15px]">
              What I Do
            </p>
            <AnimatedTitle
              title="Transforming Ideas Into <br/> <b>D</b>igital <b>R</b>eality"
              containerClass="mt-5"
            />
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <BentoTilt key={index} className="service-card">
                <div
                  className="bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm p-8 rounded-xl
                             border border-white/10 hover:border-highlight/30 transition-all duration-300
                             shadow-lg shadow-black/20 hover:shadow-highlight/5"
                >
                  <div className="service-icon-wrapper mb-8 relative w-fit">
                    <div className="absolute inset-0 bg-highlight/20 blur-xl rounded-full" />
                    <div
                      className="service-icon relative rounded-xl bg-[#111]/80 p-4 text-highlight
                                  shadow-lg shadow-highlight/10"
                    >
                      {service.icon}
                    </div>
                  </div>

                  <h3 className="font-zentry text-2xl text-white font-bold mb-6 tracking-wide">
                    {service.title}
                  </h3>
                  <p
                    className="font-robert-regular text-base text-gray-100 leading-7 tracking-wide
                              [text-shadow:_0_1px_1px_rgb(0_0_0_/_40%)]"
                  >
                    {service.description}
                  </p>
                </div>
              </BentoTilt>
            ))}
          </div>

          <div className="flex justify-end mt-12">
            <Link
              href="/servicepage"
              className="group flex items-center gap-2 bg-highlight/10 hover:bg-highlight/20 
                       text-highlight px-4 py-2 rounded-full transition-all duration-300
                       border border-highlight/20 hover:border-highlight/40"
            >
              <span className="text-sm font-medium">View All Services</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
