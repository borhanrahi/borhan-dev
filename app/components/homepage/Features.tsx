"use client";

import { useState, useRef, ReactNode } from "react";
import { TiLocationArrow } from "react-icons/ti";
import Image from "next/image";
import { throttle } from "lodash";
import { useInView } from "react-intersection-observer";

interface BentoTiltProps {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps {
  src: string;
  title: ReactNode;
  description?: string;
  techStack?: string[];
  projectUrl?: string;
}

interface CursorPosition {
  x: number;
  y: number;
}

export const BentoTilt: React.FC<BentoTiltProps> = ({
  children,
  className = "",
}) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = throttle((event: React.MouseEvent) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    setTransformStyle(
      `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`
    );
  }, 16);

  return (
    <div
      ref={itemRef}
      className={`${className} transform-gpu`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTransformStyle("")}
      style={{
        transform: transformStyle,
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
    >
      {children}
    </div>
  );
};

export const BentoCard: React.FC<BentoCardProps> = ({
  src,
  title,
  description,
  techStack,
  projectUrl,
}) => {
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({
    x: 0,
    y: 0,
  });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      <div className="absolute inset-0">
        <Image
          src={src}
          alt={typeof title === "string" ? title : "Project Image"}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
          {techStack && (
            <div className="mt-4 flex flex-wrap gap-2">
              {techStack.map((tech, index) => (
                <span
                  key={index}
                  className="cursor-pointer rounded-full bg-black/30 px-3 py-1 text-xs text-highlight transition-colors hover:bg-blue-500/50"
                >
                  #{tech}
                </span>
              ))}
            </div>
          )}
        </div>

        {projectUrl && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-20"
            >
              Visit Site
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

const Features: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="bg-black pb-52" ref={ref}>
      {inView && (
        <div className="container mx-auto px-3 md:px-10">
          <div className="px-5 py-32">
            <p className="font-circular-web text-lg text-blue-50">
              Featured Projects
            </p>
            <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
              Explore my latest work and projects, showcasing a diverse range of
              web applications built with modern technologies and creative
              solutions.
            </p>
          </div>

          <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
            <BentoCard
              src="/imageoneone.jpg"
              title={
                <>
                  Project <b>O</b>ne
                </>
              }
              description="A modern web application featuring real-time data visualization and interactive user interfaces."
              techStack={["nextjs", "typescript", "tailwindcss", "gsap"]}
              projectUrl="https://project-one.com"
            />
          </BentoTilt>

          <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
            <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
              <BentoCard
                src="/imageoneone.jpg"
                title={
                  <>
                    Project <b>T</b>wo
                  </>
                }
                description="Interactive dashboard with real-time analytics and data visualization."
                techStack={["react", "redux", "chartjs", "firebase"]}
                projectUrl="https://project-two.com"
              />
            </BentoTilt>

            <BentoTilt className="bento-tilt_1 ms-32 md:col-span-1 md:ms-0">
              <BentoCard
                src="/imageoneone.jpg"
                title={
                  <>
                    Project <b>T</b>hree
                  </>
                }
                description="E-commerce platform with advanced filtering and search capabilities."
                techStack={["nextjs", "prisma", "postgresql", "stripe"]}
                projectUrl="https://project-three.com"
              />
            </BentoTilt>

            <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
              <BentoCard
                src="/imageoneone.jpg"
                title={
                  <>
                    Project <b>F</b>our
                  </>
                }
                description="Social media dashboard with real-time messaging and notifications."
                techStack={["react", "socket.io", "mongodb", "express"]}
                projectUrl="https://project-four.com"
              />
            </BentoTilt>

            <BentoTilt className="bento-tilt_2">
              <div className="flex size-full flex-col justify-between bg-black p-5">
                <h1 className="bento-title special-font max-w-64 text-highlight">
                  Visit Site
                </h1>
                <TiLocationArrow className="m-5 scale-[5] self-end text-highlight" />
              </div>
            </BentoTilt>

            <BentoTilt className="bento-tilt_2">
              <Image
                src="/imageoneone.jpg"
                alt="Project preview"
                fill
                className="size-full object-cover object-center"
              />
            </BentoTilt>
          </div>
        </div>
      )}
    </section>
  );
};

export default Features;
