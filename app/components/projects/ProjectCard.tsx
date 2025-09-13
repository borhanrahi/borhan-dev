import { BentoTilt, BentoCard } from "../homepage/Features";

interface ProjectCardProps {
  project: typeof import("./projectData").projects[0];
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="project-card h-full">
      <BentoTilt className="border-hsla relative overflow-hidden rounded-xl h-full flex flex-col">
        <div className="flex-shrink-0">
          <BentoCard {...project} />
        </div>
        <div className="relative z-20 bg-black/80 p-6 border-t border-white/10 flex-1 flex flex-col">
          <h3 className="font-circular-web text-lg text-highlight mb-3">
            Key Features
          </h3>
          <ul className="grid grid-cols-1 gap-2 flex-1">
            {project.features.map((feature, idx) => (
              <li
                key={idx}
                className="font-robert-regular text-sm text-gray-300 flex items-start"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-highlight/50 mr-2 mt-1.5 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </BentoTilt>
    </div>
  );
}
