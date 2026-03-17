import React, { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useInView } from "../hooks/useInView";

const projects = [
  {
    image: "/images/prelistLogo.png",
    title: "prelist.live",
    role: "Tool for founders and businesses — easily collect waitlist emails with no backend setup required.",
    link: "https://prelist.netlify.app",
    status: "Building",
    type: "personal",
  },
  {
    image: "/images/regretsLogo.png",
    title: "regrets.in",
    role: "A platform where people anonymously share their regrets, read others' stories, and engage through likes, replies, and shares.",
    link: "https://regrets.in",
    type: "personal",
  },
  {
    image: "/images/spaceinvadersLogo.png",
    title: "SpaceInvaders",
    role: "Classic shooting Game",
    link: "https://spaceinvaderrs.netlify.app",
    type: "personal",
  },
  {
    image: "/images/codetoimgLogo.png",
    title: "ShareCode",
    role: "Code to Image Tool",
    link: "https://sharecodee.netlify.app/",
    type: "personal",
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg",
    title: "avci",
    role: "Anti valentine commision of india",
    link: "https://avci.lol",
    type: "personal",
  },
  {
    image: "https://ac5d.com/wp-content/uploads/2025/01/logoo-scaled.jpg",
    title: "AC5D Construction",
    role: "An app that connects users with general and real estate contractors, streamlining property browsing, project posting, and professional hiring.",
    link: "https://apps.apple.com/in/app/ac5d-construction/id6744269662",
    type: "client",
  },
  {
    image: "/images/responderLogo.webp",
    title: "Wellness Responder",
    role: "Mobile app for improved school communication and incident reporting. Tech Stack: React Native, Laravel. Push notifications and role-based access control.",
    link: "https://apps.apple.com/us/app/wellness-responder/id1574957321",
    type: "client",
  },
  {
    image: "/images/divineLogo.png",
    title: "Divine Lightfoot App",
    role: "Wellness-focused app improving engagement with health-related services. Tech Stack: React Native, Laravel. Built scalable mobile screens and integrated backend APIs.",
    status: "Coming Soon",
    link: "#",
    type: "client",
  },
];

export default function ProjectList() {
  const [selectedType, setSelectedType] = useState<"personal" | "client">("personal");
  const { ref, inView } = useInView();

  const filteredProjects = projects.filter((p) => p.type === selectedType);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`rounded-2xl p-6 sm:p-10 ${inView ? "animate-fade-in-up" : "opacity-0"}`}
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Projects</h2>

      {/* Toggle Buttons */}
      <div className="flex gap-3 mb-8">
        {(["personal", "client"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedType === type
                ? "bg-gray-900 text-white dark:bg-white dark:text-black shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-[#2a2a2a] bg-transparent hover:border-gray-400 dark:hover:border-[#3a3a3a]"
            }`}
          >
            {type === "personal" ? "Personal" : "Delivered"}
          </button>
        ))}
      </div>

      {/* Projects List */}
      <div className="space-y-1">
        {filteredProjects.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-start gap-4 p-4 rounded-xl border border-transparent card-hover ${
              inView ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: `${index * 80 + 100}ms` }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-11 h-11 rounded-lg object-cover shrink-0 mt-0.5 border border-gray-200 dark:border-[#252525]"
            />

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center gap-2">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-100 truncate">
                  {project.title}
                </h3>
                <FaExternalLinkAlt className="text-gray-300 dark:text-gray-700 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors shrink-0 text-xs" />
              </div>
              <p className="text-sm mt-0.5 leading-snug text-gray-500 dark:text-gray-500">{project.role}</p>
              {project.status === "Building" && (
                <span className="inline-block mt-1.5 text-[11px] font-medium text-yellow-600 dark:text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10 px-2 py-0.5 rounded-full">
                  Building
                </span>
              )}
              {project.status === "Coming Soon" && (
                <span className="inline-block mt-1.5 text-[11px] font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-400/10 px-2 py-0.5 rounded-full">
                  Coming Soon
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
