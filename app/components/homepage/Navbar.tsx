"use client";

import dynamic from "next/dynamic";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";

const NavBar = () => {
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [isNavVisible, setIsNavVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    const handleScroll = () => {
      if (!navContainerRef.current) return;

      if (currentScrollY === 0) {
        setIsNavVisible(true);
        navContainerRef.current.classList.remove("floating-nav");
      } else if (currentScrollY > lastScrollY) {
        setIsNavVisible(false);
        navContainerRef.current.classList.add("floating-nav");
      } else if (currentScrollY < lastScrollY) {
        setIsNavVisible(true);
        navContainerRef.current.classList.add("floating-nav");
      }
      setLastScrollY(currentScrollY);
    };

    handleScroll();
  }, [currentScrollY, lastScrollY]);

  return (
    <div
      ref={navContainerRef}
      className={`fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6 ${
        isNavVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0"
      }`}
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <Link href="/">
              <Image
                src="/img/logo.png"
                alt="logo"
                width={40}
                height={40}
                className="w-10"
                priority
              />
            </Link>

            <Button
              id="product-button"
              title="Available"
              rightIcon={
                <div className="animate-pulse">
                  <TiLocationArrow className="text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                </div>
              }
              containerClass="bg-green-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {["About", "Skills", "Projects", "Contact"].map((item, index) => (
                <Link
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default dynamic(() => Promise.resolve(NavBar), {
  ssr: false,
});
