"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

export default function ProjectContact() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      gsap.from(".contact-content", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className="relative z-10 container mx-auto px-4 py-24 text-center"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="contact-content font-circular-web text-3xl md:text-4xl mb-6">
          Have a Project in Mind?
        </h2>
        <p className="contact-content font-robert-regular text-gray-400 mb-8">
          I&apos;m always open to discussing new projects and creative ideas.
          Let&apos;s create something amazing together.
        </p>
        <Link
          href="/contact"
          className="contact-content inline-block px-8 py-3 bg-highlight text-black rounded-full font-robert-regular hover:bg-highlight/90 transition-colors"
        >
          Let&apos;s Talk
        </Link>
      </div>
    </div>
  );
}
