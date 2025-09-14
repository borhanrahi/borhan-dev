"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";
import AnimatedTitle from "../homepage/AnimatedTitle";
import {
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Twitter,
  SendIcon,
} from "lucide-react";
import Button from "../homepage/Button";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "info@borhandev.site",
    link: "mailto:info@borhandev.site",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "01714228323",
    link: "https://wa.me/8801714228323",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Remote",
    link: "#",
  },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/borhanrahi", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/borhan-uddin-rahi/", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/borhan_rahi", label: "Twitter" },
];

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate form elements
      gsap.from(".contact-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });

      gsap.from(".form-element", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.4,
      });
    }, formRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Message sent successfully!",
        });
        form.reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error: unknown) {
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : "Failed to send message",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={formRef} className="relative z-10 px-4 py-32 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <p className="font-general text-sm uppercase text-highlight md:text-[15px]">
            Get in Touch
          </p>
          <AnimatedTitle
            title="Let's <b>C</b>reate <br/> Something <b>A</b>mazing <br/> Together"
            containerClass="mt-5 !text-[3.5rem] sm:!text-6xl md:!text-[6.2rem]"
          />
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-8">
            {contactInfo.map((item) => (
              <div
                key={item.title}
                className="contact-item rounded-2xl border border-white/10 bg-[#111]/80 p-8 backdrop-blur-sm"
              >
                <div className="flex items-center gap-6">
                  <div className="rounded-full bg-[#1a1a1a] p-4">
                    <item.icon className="h-7 w-7 text-highlight" />
                  </div>
                  <div>
                    <h3 className="font-circular-web text-2xl text-white">
                      {item.title}
                    </h3>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-robert-regular text-lg text-gray-400"
                    >
                      {item.value}
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="mt-12">
              <h3 className="font-circular-web text-3xl text-white mb-8">
                Connect With Me
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-white/10 bg-[#111]/80 p-5 backdrop-blur-sm hover:bg-[#1a1a1a]"
                  >
                    <social.icon className="h-6 w-6 text-highlight" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-8 rounded-2xl border border-white/10 bg-[#111]/80 p-8 backdrop-blur-sm"
          >
            <div className="form-element">
              <label className="font-general text-lg uppercase text-gray-400 mb-4 block">
                NAME
              </label>
              <input
                name="name"
                type="text"
                className="w-full bg-[#1a1a1a] rounded-lg px-4 py-3 font-circular-web text-white outline-none"
                required
              />
            </div>

            <div className="form-element">
              <label className="font-general text-lg uppercase text-gray-400 mb-4 block">
                EMAIL
              </label>
              <input
                name="email"
                type="email"
                className="w-full bg-[#1a1a1a] rounded-lg px-4 py-3 font-circular-web text-white outline-none"
                required
              />
            </div>

            <div className="form-element">
              <label className="font-general text-lg uppercase text-gray-400 mb-4 block">
                MESSAGE
              </label>
              <textarea
                name="message"
                rows={4}
                className="w-full bg-[#1a1a1a] rounded-lg px-4 py-3 font-circular-web text-white outline-none"
                required
              />
            </div>

            {submitStatus.type && (
              <div
                className={`text-${
                  submitStatus.type === "success" ? "green-500" : "red-500"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <Button
              title={isSubmitting ? "Sending..." : "Send Message"}
              leftIcon={<SendIcon className="h-4 w-4" />}
              containerClass="w-full bg-highlight text-black hover:bg-highlight/90 font-general text-lg flex items-center justify-center gap-3"
              disabled={isSubmitting}
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;