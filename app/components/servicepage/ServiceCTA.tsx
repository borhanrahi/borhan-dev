"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const ServiceCTA = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-content", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-[#111]"
    >
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="cta-content font-zentry text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-6">
          Ready to Start Your Project?
        </h2>
        <p className="cta-content font-robert-regular text-gray-400 mb-12 max-w-2xl mx-auto">
          Let&apos;s discuss how we can help bring your vision to life with our
          professional web development services.
        </p>
        <Link
          href="/contact"
          className="cta-content group inline-flex items-center gap-2 bg-highlight/90 hover:bg-highlight 
                   text-black px-6 py-3 rounded-full transition-all duration-300"
        >
          <span className="font-general text-sm uppercase">Get Started</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

export default ServiceCTA;
