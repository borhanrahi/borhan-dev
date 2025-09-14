"use client";

import {
  useState,
  useRef,
  ReactNode,
  Suspense,
  lazy,
  useCallback,
  useMemo,
} from "react";
import { TiLocationArrow } from "react-icons/ti";
import Image from "next/image";
import { throttle } from "lodash";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

const LazyDotLottieReact = lazy(() =>
  import("@lottiefiles/dotlottie-react").then((mod) => ({
    default: mod.DotLottieReact,
  }))
);

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

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (!itemRef.current) return;

    const rect = itemRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width;
    const relativeY = (event.clientY - rect.top) / rect.height;

    requestAnimationFrame(() => {
      setTransformStyle(
        `perspective(700px) rotateX(${(relativeY - 0.5) * 5}deg) rotateY(${
          (relativeX - 0.5) * -5
        }deg) scale3d(.95, .95, .95)`
      );
    });
  }, []);

  const throttledHandleMouseMove = useMemo(
    () => throttle(handleMouseMove, 16),
    [handleMouseMove]
  );

  return (
    <div
      ref={itemRef}
      className={`${className} transform-gpu`}
      onMouseMove={throttledHandleMouseMove}
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

      <div className="absolute inset-0 bg-black/60" />

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
            className="border border-white/20 relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-highlight"
          >
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(212, 255, 77, 0.5), #00000026)`,
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
          <div className="px-5 py-4">
            <p className="font-circular-web text-lg text-blue-50">
              Featured Projects
            </p>
            <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
              Explore my latest work and projects, showcasing a diverse range of
              web applications built with modern technologies and creative
              solutions.
            </p>
          </div>

          <BentoTilt className="border border-white/20 relative mb-7 h-[50vh] w-full overflow-hidden rounded-md md:h-[65vh]">
            <BentoCard
              src="/img/nexlessdemo.jpg"
              title={
                <>
                  NEX<b>LESS</b>
                </>
              }
              description="A comprehensive multi-purpose SaaS application offering modern solutions for businesses with real-time features and interactive interfaces."
              techStack={[
                "nextjs",
                "typescript",
                "tailwindcss",
                "framer-motion",
              ]}
              projectUrl="https://nexlessdemo.vercel.app/"
            />
          </BentoTilt>

          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-3 md:gap-7">
            <BentoTilt className="border border-white/20 relative h-[50vh] overflow-hidden rounded-md md:row-span-2 md:h-auto">
              <BentoCard
                src="/img/jadoo.jpg"
                title={
                  <>
                    JADOO <b>TRAVEL</b>
                  </>
                }
                description="Modern travel agency website with seamless animations, interactive booking system, and responsive design for optimal user experience."
                techStack={[
                  "nextjs",
                  "framer-motion",
                  "supabase",
                  "tailwindcss",
                ]}
                projectUrl="https://jadoo-travel-brown.vercel.app/"
              />
            </BentoTilt>

            <BentoTilt className="border border-white/20 relative h-[50vh] overflow-hidden rounded-md md:h-auto">
              <BentoCard
                src="/img/blissful.jpg"
                title={
                  <>
                    BLISSFUL <b>BALANCE</b>
                  </>
                }
                description="A wellness and meditation platform featuring guided sessions, progress tracking, and personalized mindfulness experiences."
                techStack={["nextjs", "prisma", "postgresql", "stripe"]}
                projectUrl="https://blissful-balance.vercel.app/"
              />
            </BentoTilt>

            <BentoTilt className="border border-white/20 relative h-[50vh] overflow-hidden rounded-md md:h-auto">
              <BentoCard
                src="/img/optihealth.jpg"
                title={
                  <>
                    OPTI<b>HEALTH</b>
                  </>
                }
                description="A comprehensive healthcare platform offering seamless appointment scheduling and patient management solutions."
                techStack={["nextjs", "tailwindcss", "framer-motion"]}
                projectUrl="https://optihealth-topaz.vercel.app/"
              />
            </BentoTilt>

            <BentoTilt className="border border-white/20 relative h-[50vh] overflow-hidden rounded-md md:h-auto">
              <Link href="/projects" className="block size-full">
                <div className="flex size-full flex-col justify-between bg-gradient-to-br from-black to-zinc-900 p-7 transition-all hover:opacity-90">
                  <div className="space-y-3">
                    <h1 className="bento-title special-font text-highlight">
                      My Projects
                    </h1>
                    <p className="text-sm text-blue-50/80 max-w-[250px]">
                      Explore my portfolio of web applications, open-source
                      projects, and creative experiments.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs text-highlight/80">
                        #portfolio
                      </span>
                      <span className="text-xs text-highlight/80">
                        #showcase
                      </span>
                      <span className="text-xs text-highlight/80">#code</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-highlight">
                    <TiLocationArrow className="scale-150 animate-pulse" />
                    <span className="text-sm font-medium">View All</span>
                  </div>
                </div>
              </Link>
            </BentoTilt>

            <BentoTilt className="border border-white/20 relative h-[50vh] overflow-hidden rounded-md md:h-auto">
              <div className="relative size-full">
                <Suspense fallback={<div className="size-full bg-zinc-900" />}>
                  <LazyDotLottieReact
                    src="https://lottie.host/f997005c-fede-4f6b-90d6-9ff05a38bf43/JpvWzvZdHy.lottie"
                    loop
                    autoplay
                    className="size-full scale-140"
                  />
                </Suspense>
              </div>
            </BentoTilt>
          </div>
        </div>
      )}
    </section>
  );
};

export default Features;
