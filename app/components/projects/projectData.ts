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
];
