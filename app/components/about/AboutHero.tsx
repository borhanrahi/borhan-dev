"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const AboutHero = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <section className="relative min-h-screen w-full bg-black px-8 py-20">
      <div className="mx-auto max-w-7xl py-8">
        {/* About Me Title */}
        <h2 className="font-general text-[15px] uppercase text-highlight mb-20">
          About Me
        </h2>

        <div className="grid lg:grid-cols-2 gap-4">
          {/* Left Side - Text Content */}
          <div className="space-y-12 z-10 relative">
            <h1 className="special-font font-zentry font-black text-[2.8rem] sm:text-5xl md:text-[5.5rem] leading-[0.95] tracking-[.05em] text-white max-w-[15ch] [word-spacing:0.15em]">
              FULL STACK DEVELOPER WITH ENGINEERING BACKGROUND
            </h1>

            <p className="font-mono text-gray-400 text-lg leading-relaxed max-w-[50ch] tracking-wide [word-spacing:0.2em]">
              A passionate Full Stack Developer specializing in building
              exceptional digital experiences. Combining modern web technologies
              with engineering problem-solving skills to create innovative and
              scalable solutions.
            </p>
          </div>

          {/* Right Side - Image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="/img/borhan.jpg"
              alt="Profile picture overlooking a scenic landscape"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
