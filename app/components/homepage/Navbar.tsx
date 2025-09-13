"use client";

import dynamic from "next/dynamic";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import gsap from "gsap";

const navLinks = [
  { name: "About", path: "/about" },
  { name: "Skills", path: "/skills" },
  { name: "Services", path: "/service" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

const NavBar = () => {
  const navContainerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isNavVisible, setIsNavVisible] = useState<boolean>(true);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const { y: currentScrollY } = useWindowScroll();

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      gsap.fromTo(
        menuRef.current,
        {
          opacity: 0,
          y: -50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        }
      );
      // Animate menu links
      gsap.fromTo(
        ".mobile-nav-link",
        {
          opacity: 0,
          x: -30,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    } else {
      gsap.to(menuRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => setIsMenuOpen(false),
      });
    }
  };

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
    <>
      <div
        ref={navContainerRef}
        className={`fixed inset-x-0 top-4 z-50 h-16 transition-all duration-700 sm:inset-x-6 ${
          isNavVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        } ${
          currentScrollY > 0
            ? "bg-black/80 backdrop-blur-md"
            : ""
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

              <Link href="/contact">
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
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex h-full items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="nav-hover-btn"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-white p-2 z-50 relative"
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </nav>
        </header>
      </div>

      {/* Full Screen Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg md:hidden"
        >
          <div className="flex h-full flex-col items-center justify-center space-y-8 p-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="mobile-nav-link text-3xl font-bold text-white hover:text-highlight transition-colors duration-300 transform"
                onClick={toggleMenu}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(NavBar), {
  ssr: false,
});
