interface Project {
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  projectUrl: string;
  src: string;
  features: string[];
}

export const projects: Project[] = [
  {
    title: "AI ATS CHECKER",
    description:
      "A modern AI-powered resume analysis platform built with Next.js, featuring advanced document parsing and intelligent ATS compatibility checking with instant results.",
    longDescription:
      "An innovative AI-powered platform that revolutionizes resume optimization through advanced NLP models and intelligent ATS compatibility analysis, helping job seekers improve their chances of landing interviews.",
    techStack: ["nextjs", "typescript", "tailwindcss", "ai", "vercel", "resumebuilder", "atschecker"],
    projectUrl: "https://aiatschecker.com/",
    src: "/img/aiatschecker.webp",
    features: [
      "AI-Powered Resume Analysis - Advanced NLP models for contextual understanding",
      "ATS Compatibility Checking - Detects formatting issues and parsing blockers",
      "Job Match Scoring - Real-time compatibility analysis with job descriptions",
      "Free Resume Builder - 19 professionally designed ATS-optimized templates",
      "AI Salary Predictor - Market-rate estimates based on skills and location",
      "Multi-Format Support - Handles PDF, DOC, and DOCX files up to 10MB",
      "Instant Results - Complete analysis delivered in under 30 seconds",
      "Privacy-First Design - No signup required, no data storage, zero tracking",
      "Daily Free Usage - 10 comprehensive analyses per day at no cost",
      "Mobile-Responsive Interface - Seamless experience across all devices"
    ],
  },
  {
    title: "NEXLESS",
    description:
      "A comprehensive multi-purpose SaaS application offering modern solutions for businesses with real-time features and interactive interfaces.",
    longDescription:
      "Built with a focus on scalability and performance, NEXLESS delivers enterprise-grade solutions including real-time analytics, team collaboration tools, and automated workflow management.",
    techStack: ["nextjs", "typescript", "tailwindcss", "framer-motion"],
    projectUrl: "https://nexlessdemo.vercel.app/",
    src: "/img/nexlessdemo.jpg",
    features: [
      "Real-time data synchronization",
      "Advanced analytics dashboard",
      "Team collaboration tools",
      "Automated workflow management",
      "Responsive design across devices",
    ],
  },
  {
    title: "JADOO TRAVEL",
    description:
      "Modern travel agency website with seamless animations, interactive booking system, and responsive design for optimal user experience.",
    longDescription:
      "A feature-rich travel platform that combines beautiful design with powerful functionality, offering users an immersive experience for planning and booking their perfect vacation.",
    techStack: ["nextjs", "framer-motion", "supabase", "tailwindcss"],
    projectUrl: "https://jadoo-travel-brown.vercel.app/",
    src: "/img/jadoo.jpg",
    features: [
      "Interactive booking system",
      "Real-time availability checking",
      "Integrated payment processing",
      "Dynamic search functionality",
      "User review system",
    ],
  },
  {
    title: "BLISSFUL BALANCE",
    description:
      "A wellness and meditation platform featuring guided sessions, progress tracking, and personalized mindfulness experiences.",
    longDescription:
      "An innovative wellness platform that helps users achieve mental clarity and emotional balance through guided meditation sessions and personalized mindfulness practices.",
    techStack: ["nextjs", "prisma", "postgresql", "stripe"],
    projectUrl: "https://blissful-balance.vercel.app/",
    src: "/img/blissful.jpg",
    features: [
      "Guided meditation sessions",
      "Progress tracking dashboard",
      "Personalized recommendations",
      "Community features",
      "Premium content access",
    ],
  },
  {
    title: "OPTIHEALTH",
    description:
      "A comprehensive healthcare platform offering seamless appointment scheduling and patient management solutions.",
    longDescription:
      "A modern healthcare management system that streamlines the patient experience while providing powerful tools for healthcare providers.",
    techStack: ["nextjs", "tailwindcss", "framer-motion"],
    projectUrl: "https://optihealth-topaz.vercel.app/",
    src: "/img/optihealth.jpg",
    features: [
      "Online appointment scheduling",
      "Patient record management",
      "Telemedicine integration",
      "Automated reminders",
      "Health tracking dashboard",
    ],
  },
  {
    title: "TECH E-COMMERCE",
    description:
      "A modern e-commerce platform built with Next.js, featuring premium tech gadgets and electronics with complete shopping functionality.",
    longDescription:
      "A comprehensive e-commerce solution offering full-featured product catalog, user authentication with Appwrite, shopping cart with Redux state management, and integrated payment processing. Built with performance and scalability in mind.",
    techStack: ["nextjs", "typescript", "tailwindcss", "mongodb", "redux", "appwrite"],
    projectUrl: "https://tech-ecom-store-theta.vercel.app/",
    src: "/img/tech-ecom-store.png",
    features: [
      "Full-featured product catalog",
      "User authentication with Appwrite",
      "Shopping cart with Redux",
      "Multi-language support",
      "Advanced product search",
      "Order management system",
      "Blog system with CMS",
      "Responsive mobile-first design"
    ],
  },
];
