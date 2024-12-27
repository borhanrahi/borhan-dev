"use client";

import { gsap } from "@/lib/gsap";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { throttle } from "lodash";
import Link from "next/link";

import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";

const FloatingImage: React.FC = () => {
  const frameRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleMouseMove = throttle((e: MouseEvent) => {
      const element = frameRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const xPos = e.clientX - rect.left;
      const yPos = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((yPos - centerY) / centerY) * -10;
      const rotateY = ((xPos - centerX) / centerX) * 10;

      element.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }, 16);

    const handleMouseLeave = () => {
      const element = frameRef.current;
      if (element) {
        gsap.to(element, {
          duration: 0.3,
          rotateX: 0,
          rotateY: 0,
          ease: "power1.inOut",
        });
      }
    };

    const element = frameRef.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);
      element.addEventListener("mouseup", handleMouseLeave);
      element.addEventListener("mouseenter", handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
        element.removeEventListener("mouseup", handleMouseLeave);
        element.removeEventListener("mouseenter", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div id="story" className="min-h-dvh w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-[15px]">
          Full Stack Development Journey
        </p>

        <div className="relative size-full">
          <AnimatedTitle
            title="the st<b>o</b>ry of <br /> my j<b>o</b>urney"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <Image
                  ref={frameRef}
                  src="/img/myjourney.jpg"
                  alt="entrance"
                  width={1920}
                  height={1080}
                  className="object-contain transform-gpu"
                  style={{ willChange: "transform" }}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1920px"
                />
              </div>
            </div>

            <svg
              className="invisible absolute size-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="8"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="flt_tag"
                  />
                  <feComposite
                    in="SourceGraphic"
                    in2="flt_tag"
                    operator="atop"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start">
            <p className="mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start">
              Where code meets creativity, I craft digital experiences. Explore
              the journey of a passionate full-stack developer turning ideas
              into reality.
            </p>

            <Link href="/projects">
              <Button
                id="realm-btn"
                title="view projects"
                containerClass="mt-5"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingImage;
