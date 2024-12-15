"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import DynamicWrapper from "../DynamicWrapper";
import {
  Code2,
  Palette,
  ShoppingCart,
  Laptop,
  Globe,
  Database,
  ShoppingBag,
  Smartphone,
  Network,
} from "lucide-react";

const services = [
  {
    icon: <Code2 className="h-8 w-8" />,
    title: "Web Development",
    description:
      "Building scalable web applications using cutting-edge technologies. Specializing in modern frameworks and architectures to deliver high-performance, SEO-friendly applications that provide exceptional user experiences. From simple landing pages to complex enterprise solutions.",
    technologies: [
      "Next.js",
      "React",
      "Node.js",
      "TypeScript",
      "TailwindCSS",
      "MongoDB",
      "PostgreSQL",
    ],
    features: [
      "Single Page Applications with seamless navigation",
      "Server-Side Rendering for optimal performance",
      "RESTful & GraphQL API Integration",
      "Advanced Performance Optimization & Caching",
      "Secure Authentication & Authorization",
      "Responsive Design Implementation",
      "SEO & Web Vitals Optimization",
      "CI/CD Pipeline Setup",
    ],
    highlight: "Featured",
  },
  {
    icon: <ShoppingBag className="h-8 w-8" />,
    title: "Shopify Development",
    description:
      "Expert Shopify development services delivering custom e-commerce solutions. Creating unique shopping experiences with custom themes, apps, and optimized checkout flows. Focus on conversion optimization and seamless user experience across all devices.",
    technologies: [
      "Shopify",
      "Hydrogen",
      "JavaScript",
      "React",
      "Node.js",
      "Shopify API",
      "GraphQL",
    ],
    features: [
      "Custom Theme Development from scratch",
      "Third-party App Integration & Custom App Development",
      "Advanced Payment Gateway Implementation",
      "Store Speed & Performance Optimization",
      "Custom Product Page Templates",
      "Automated Inventory Management",
      "Analytics & Conversion Tracking",
      "Mobile-First Shopping Experience",
    ],
    highlight: "Popular",
  },
  {
    icon: <Palette className="h-8 w-8" />,
    title: "UI/UX Development",
    description:
      "Creating immersive user interfaces that combine aesthetic appeal with functional design. Implementing modern design principles with cutting-edge animation technologies to deliver engaging, interactive experiences that keep users coming back.",
    technologies: [
      "Tailwind CSS",
      "GSAP",
      "Framer Motion",
      "Three.js",
      "CSS3",
      "Figma",
      "Adobe XD",
    ],
    features: [
      "Responsive & Adaptive Layouts",
      "Complex Animation Systems",
      "Interactive User Interface Components",
      "Design System Architecture",
      "Accessibility Implementation (WCAG)",
      "Cross-browser Compatibility",
      "Micro-interactions & Transitions",
      "Performance-Optimized Animations",
    ],
  },
  {
    icon: <ShoppingCart className="h-8 w-8" />,
    title: "E-commerce Solutions",
    description:
      "End-to-end e-commerce solutions focusing on conversion optimization and seamless shopping experiences. Implementing secure payment systems, inventory management, and analytics to drive sales and improve customer satisfaction.",
    technologies: [
      "Stripe",
      "PayPal",
      "WooCommerce",
      "Shopify",
      "Next.js Commerce",
      "Analytics",
    ],
    features: [
      "Multi-Payment Gateway Integration",
      "Real-time Inventory Management",
      "Order Processing Automation",
      "Advanced Analytics Implementation",
      "Customer Account Management",
      "Wishlist & Cart Functionality",
      "Product Search & Filtering",
      "Abandoned Cart Recovery",
    ],
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "WordPress Development",
    description:
      "Professional WordPress solutions with focus on scalability and performance. Building custom themes and plugins that extend WordPress functionality while maintaining security and ease of use. Perfect for content-rich websites and e-commerce platforms.",
    technologies: [
      "WordPress",
      "PHP",
      "WooCommerce",
      "ACF",
      "MySQL",
      "JavaScript",
      "REST API",
    ],
    features: [
      "Custom Theme Development with Modern Stack",
      "Advanced Plugin Development & Integration",
      "WooCommerce Store Customization",
      "Security Hardening & Optimization",
      "Custom Post Types & Taxonomies",
      "Multilingual Support Implementation",
      "Performance & Caching Setup",
      "Automated Backup Solutions",
    ],
  },
  {
    icon: <Database className="h-8 w-8" />,
    title: "Backend Development",
    description:
      "Robust backend architecture design and implementation focusing on scalability, security, and performance. Building reliable APIs and microservices that power modern web applications. Expertise in database design and cloud infrastructure.",
    technologies: [
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Docker",
      "AWS",
      "GraphQL",
      "Express",
    ],
    features: [
      "RESTful & GraphQL API Architecture",
      "Microservices Implementation",
      "Database Design & Optimization",
      "Cloud Infrastructure Setup",
      "Real-time Data Processing",
      "Authentication & Authorization Systems",
      "API Documentation & Testing",
      "Scalable Architecture Design",
    ],
  },
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: "Mobile-First Development",
    description:
      "Creating responsive web applications with a mobile-first approach. Focusing on progressive enhancement and optimal performance across all devices. Implementing modern PWA features for native-like mobile experiences.",
    technologies: [
      "PWA",
      "React Native",
      "Service Workers",
      "IndexedDB",
      "Workbox",
      "Web Push API",
    ],
    features: [
      "Progressive Web App Development",
      "Offline Functionality Implementation",
      "Touch-Optimized Interfaces",
      "Native Feature Integration",
      "Push Notification Systems",
      "App-like Experience Design",
      "Cross-Platform Compatibility",
      "Performance Optimization for Mobile",
    ],
  },
  {
    icon: <Laptop className="h-8 w-8" />,
    title: "Technical Solutions",
    description:
      "Comprehensive technical solutions for complex business requirements. Integrating third-party services, implementing automation, and optimizing workflows to improve efficiency and reduce operational costs.",
    technologies: [
      "API Integration",
      "Cloud Services",
      "DevOps",
      "CI/CD",
      "Docker",
      "Kubernetes",
    ],
    features: [
      "Third-party System Integration",
      "Business Process Automation",
      "Technical Consultation & Planning",
      "Infrastructure Monitoring",
      "Data Migration & Synchronization",
      "Scalability Implementation",
      "Security Audit & Implementation",
      "Performance Optimization",
    ],
  },
  {
    icon: <Network className="h-8 w-8" />,
    title: "System Integration & API Development",
    description:
      "Seamless integration of diverse systems and platforms through custom API development and middleware solutions. Specializing in creating robust connections between different software systems, databases, and third-party services to streamline business operations.",
    technologies: [
      "REST APIs",
      "GraphQL",
      "WebSockets",
      "Message Queues",
      "OAuth",
      "Microservices",
      "ESB",
      "Apache Kafka",
    ],
    features: [
      "Custom API Design & Development",
      "Legacy System Integration",
      "Real-time Data Synchronization",
      "Middleware Development",
      "API Gateway Implementation",
      "Event-Driven Architecture",
      "Integration Testing & Monitoring",
      "Documentation & Developer Support",
    ],
  },
];

const ServiceGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: {
          each: 0.2,
          from: "start",
        },
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center+=100",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <DynamicWrapper>
      <section
        ref={containerRef}
        className="relative py-20 px-4 sm:px-6 lg:px-8"
        suppressHydrationWarning
      >
        <div className="mx-auto max-w-7xl" suppressHydrationWarning>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            suppressHydrationWarning
          >
            {services.map((service) => (
              <div
                key={`service-${service.title
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="service-card group relative overflow-hidden rounded-2xl bg-gradient-to-br 
                           from-[#0a0a0a] to-[#1a1a1a] transition-all duration-500 hover:shadow-2xl 
                           hover:shadow-highlight/10 hover:-translate-y-1 h-full"
                suppressHydrationWarning
              >
                {/* Highlight Badge */}
                {service.highlight && (
                  <div className="absolute top-4 right-4 z-10">
                    <span
                      className="inline-flex items-center rounded-full bg-highlight/10 px-3 py-1
                                   text-xs font-medium text-highlight ring-1 ring-inset ring-highlight/20"
                    >
                      {service.highlight}
                    </span>
                  </div>
                )}

                {/* Card Content */}
                <div className="relative p-8">
                  {/* Icon with Glow Effect */}
                  <div className="relative mb-6 w-14 h-14">
                    <div className="absolute inset-0 bg-highlight/20 blur-xl rounded-full" />
                    <div
                      className="relative flex items-center justify-center h-full rounded-xl 
                                  bg-[#111]/80 text-highlight transform transition-transform 
                                  duration-500 group-hover:scale-110"
                    >
                      {service.icon}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-zentry text-2xl text-white font-bold mb-4">
                    {service.title}
                  </h3>
                  <p className="font-robert-regular text-gray-400 mb-6">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="mb-6">
                    <h4 className="font-robert-regular text-sm text-highlight mb-3">
                      Key Features
                    </h4>
                    <ul className="grid grid-cols-1 gap-2">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="font-robert-regular text-sm text-gray-300 flex items-center"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-highlight/50 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technology Stack */}
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-robert-regular bg-white/5 text-gray-300 
                                 px-3 py-1 rounded-full border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Animated Border Gradient */}
                <div
                  className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-highlight/30 
                              transition-colors duration-500"
                />

                {/* Hover Gradient Overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </DynamicWrapper>
  );
};

export default ServiceGrid;
