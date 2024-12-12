"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamic imports for icons
const ArrowUpRight = dynamic(() =>
  import("lucide-react").then((mod) => mod.ArrowUpRight)
);
const Github = dynamic(() => import("lucide-react").then((mod) => mod.Github));
const Linkedin = dynamic(() =>
  import("lucide-react").then((mod) => mod.Linkedin)
);
const Twitter = dynamic(() =>
  import("lucide-react").then((mod) => mod.Twitter)
);
const Heart = dynamic(() => import("lucide-react").then((mod) => mod.Heart));

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  ];

  const navLinks = ["About", "Skills", "Projects", "Contact"];

  return (
    <footer className="relative w-screen bg-black px-4 py-16 text-blue-50 sm:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Top Section */}
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="special-font font-zentry text-3xl font-black md:text-4xl">
              Let&#39;s <b>C</b>onnect
            </h2>
            <p className="mt-2 font-circular-web text-sm text-blue-50/60">
              Available for freelance work and collaborations
            </p>
          </div>

          <Link
            href="#contact"
            className="group flex items-center gap-2 rounded-full bg-highlight px-6 py-3 text-black transition-all hover:bg-highlight/90"
          >
            <span className="font-general text-xs uppercase">Get in Touch</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Middle Section */}
        <div className="mb-16 grid grid-cols-1 gap-8 border-y border-white/10 py-8 md:grid-cols-2">
          <div>
            <h3 className="font-general text-sm uppercase">Navigation</h3>
            <div className="mt-4 flex flex-wrap gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="font-circular-web text-sm text-blue-50/60 transition-colors hover:text-highlight"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-general text-sm uppercase">Social</h3>
            <div className="mt-4 flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-50/60 transition-colors hover:text-highlight"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <p className="font-circular-web text-sm text-blue-50/60">
            © {currentYear} Borhan. All rights reserved.
          </p>
          <p className="font-circular-web text-sm flex items-center gap-2">
            Built with{" "}
            <Heart
              className="h-4 w-4 text-highlight animate-pulse"
              fill="currentColor"
            />{" "}
            <span className="text-highlight">& Passion</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
