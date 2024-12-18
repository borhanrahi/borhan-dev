"use client";

import AnimatedTitle from "../homepage/AnimatedTitle";

export default function ProjectHero() {
  return (
    <div className="relative z-10 container mx-auto px-4 pt-32">
      <div className="mb-16 text-center">
        <p className="font-general text-sm uppercase text-highlight tracking-wider md:text-[15px]">
          Portfolio Showcase
        </p>
        <AnimatedTitle
          title="Creative <b>W</b>orks & <br/> <b>P</b>rojects"
          containerClass="mt-5"
        />
        <p className="mt-6 max-w-2xl mx-auto font-robert-regular text-gray-400">
          Explore my collection of web applications and digital experiences,
          showcasing innovative solutions and creative implementations.
        </p>
      </div>
    </div>
  );
}
