"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import AnimatedTitle from "./AnimatedTitle";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-16 mt-24 md:mb-8 md:mt-36 flex flex-col items-center gap-5 px-4">
        <p className="font-general text-sm uppercase md:text-[15px]">
          Welcome to My Portfolio
        </p>

        <AnimatedTitle
          title="Full Stack <b>W</b>eb Developer <br /> Crafting Digital <b>E</b>xperiences"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext max-w-2xl px-4 text-center">
          <p>Hi, I&apos;m Borhan - Turning Ideas into Reality</p>
          <p className="text-gray-500">
            I specialize in building modern web applications using cutting-edge
            technologies, creating seamless experiences from frontend to backend
            development
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen mt-8 md:mt-0" id="clip">
        <div className="mask-clip-path about-image">
          <Image
            src="/img/about.webp"
            alt="Borhan - Full Stack Developer"
            fill
            className="absolute left-0 top-0 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
