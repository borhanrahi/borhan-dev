"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import AnimatedTitle from "../homepage/AnimatedTitle";

const ServiceHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-content", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <p className="hero-content font-general text-sm uppercase text-highlight tracking-wider md:text-[15px]">
          Professional Services
        </p>
        <AnimatedTitle
          title="Transforming Your <b>V</b>ision <br/> Into <b>D</b>igital Success"
          containerClass="mt-5"
        />
        <p className="hero-content mx-auto mt-6 max-w-2xl font-robert-regular text-base text-gray-400 md:text-lg">
          Comprehensive web development and digital solutions tailored to your
          business needs
        </p>
      </div>
    </section>
  );
};

export default ServiceHero;
