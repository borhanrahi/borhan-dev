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
    <section className="relative w-full bg-black px-8 py-8 pb-16">
      <div className="mx-auto max-w-7xl py-8">
        {/* About Me Title */}
        <h2 className="font-general text-[15px] uppercase text-highlight mb-20">
          About Me
        </h2>

        <div className="grid lg:grid-cols-2 gap-4">
          {/* Left Side - Text Content */}
          <div className="space-y-12 z-10 relative">
            <h1 className="special-font font-zentry font-black text-[2.8rem] sm:text-5xl md:text-[5.5rem] leading-[0.95] tracking-[.05em] text-white max-w-[15ch]">
              FULL STACK DEVELOPER WITH 5+ YEARS OF EXPERTISE
            </h1>

            <p className="font-mono text-gray-400 text-lg leading-relaxed max-w-[50ch]">
              Hi, I&apos;m Borhan Uddin, a Full-Stack JavaScript Developer. I got
              into web development during my Electrical &amp; Electronics
              Engineering degree — what began as a side interest quickly became
              my focus after working on solar and IT system projects at IDCOL.
              Today I build modern, responsive, and high-performance web apps
              with Next.js, TailwindCSS, and MongoDB, while expanding into DevOps
              tools like Docker, Linux, and Jenkins.
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
