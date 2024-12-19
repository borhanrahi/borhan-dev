"use client";
import Image from "next/image";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import { useInView } from "react-intersection-observer";

interface ImageClipBoxProps {
  src: string;
  clipClass: string;
}

const ImageClipBox: React.FC<ImageClipBoxProps> = ({ src, clipClass }) => (
  <div className={`${clipClass} transform-gpu`}>
    <Image
      src={src}
      alt="Contact section image"
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      className="object-cover"
      quality={75}
      loading="lazy"
      style={{ willChange: "transform" }}
    />
  </div>
);

const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div
      id="contact"
      className="my-20 min-h-96 w-screen px-4 sm:px-10"
      ref={ref}
    >
      {inView && (
        <div className="relative rounded-lg bg-black py-16 sm:py-24 text-blue-50">
          {/* Left side images */}
          <div className="absolute -left-20 top-0 h-full w-96 overflow-visible hidden sm:block lg:left-10">
            <div className="relative h-full w-full">
              {/* Top tilted image */}
              <ImageClipBox
                src="/img/contact-1.jpg"
                clipClass="contact-clip-path-1 absolute h-[40%] w-full transform rotate-[-35deg] translate-y-[20%] translate-x-[-30%] overflow-hidden"
              />
              {/* Bottom tilted image */}
              <ImageClipBox
                src="/img/contact-2.jpg"
                clipClass="contact-clip-path-2 absolute h-[80%] mt-20 w-full transform rotate-[35deg] translate-y-[60%] translate-x-[-30%] overflow-hidden"
              />
            </div>
          </div>

          {/* Right side content */}
          <div className="absolute right-4 sm:right-10 w-60 sm:w-80 h-full lg:top-20 -top-10 sm:-top-20">
            <div className="relative h-full w-full opacity-20 sm:opacity-100">
              <ImageClipBox
                src="/img/contact-3.jpg"
                clipClass="contact-clip-path-3 absolute h-[30%] w-full md:scale-125"
              />
            </div>
          </div>

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center text-center px-2 sm:px-0">
            <p className="mb-6 sm:mb-10 font-general text-[13px] sm:text-[15px] uppercase">
              Borhan Uddin{" "}
            </p>
            <AnimatedTitle
              title="let&#39;s b<b>u</b>ild the <br /> new era of <br /> w<b>eb </b>development<b> t</b>ogether."
              containerClass="special-font text-[3.5rem] sm:!text-6xl !md:text-[6.2rem] w-full font-zentry !font-black !leading-[1.1] sm:!leading-[.9]"
            />
            <Button
              title="contact me"
              containerClass="mt-8 sm:mt-10 cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
