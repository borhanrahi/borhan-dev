"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import {
  Code,
  Rocket,
  Clock,
  Shield,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import ScrollTrigger from "gsap/ScrollTrigger";

const ServiceOverview = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      const elements = gsap.utils.toArray(".overview-content");

      elements.forEach((element) => {
        gsap.from(element as Element, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          scrollTrigger: {
            trigger: element as Element,
            start: "top 80%",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const benefits = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Full-Stack Expertise",
      description:
        "Comprehensive development solutions from front-end to back-end, eliminating the need for multiple developers.",
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Modern Technologies",
      description:
        "Utilizing cutting-edge frameworks and tools like React, Next.js, and TailwindCSS for optimal performance.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Quick Delivery",
      description:
        "Fast turnaround times without compromising on quality or attention to detail.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Solutions",
      description:
        "Implementation of robust security measures and best practices for peace of mind.",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Clear Communication",
      description:
        "Regular updates and open communication throughout the development process.",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Quality Guaranteed",
      description:
        "Money-back guarantee ensuring your complete satisfaction with the final product.",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="overview-content text-center mb-16">
          <h2 className="font-zentry text-3xl md:text-4xl text-white mb-6">
            Why Choose My Services?
          </h2>
          <p className="font-robert-regular text-gray-400 max-w-2xl mx-auto">
            With over 5 years of experience in web development, I specialize in
            creating modern, scalable, and user-friendly applications that
            deliver exceptional results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="overview-content group p-6 rounded-xl bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]
                         hover:shadow-xl hover:shadow-highlight/10 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-highlight/10 text-highlight">
                  {benefit.icon}
                </div>
              </div>
              <h3 className="font-zentry text-xl text-white mb-4">
                {benefit.title}
              </h3>
              <p className="font-robert-regular text-gray-400">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceOverview;
