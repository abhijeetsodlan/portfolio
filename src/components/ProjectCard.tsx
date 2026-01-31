import React, { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

// Local images (served from /public)

const projects = [
  {
    image: "/images/prelistLogo.png",
    title: "prelist.live",
    role: "Tool for founders and businesses - easily collect waitlist emails with no backend setup required.",
    link: "https://prelist.netlify.app",
    status: "Building",
    type: "personal",
  },
  {
    image: "/images/regretsLogo.png",
    title: "regrets.in",
    role: "A platform where people anonymously share their regrets, read others' stories, and engage through likes, replies, and shares.",
    link: "https://regrets.in",
    status: "Temporarily Closed",
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
    image: "/images/spaceinvadersLogo.png",
    title: "SpaceInvaders",
    role: "Classic shooting Game",
    link: "https://abhijeetsodlan.github.io/SpaceInvaders/",
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
    role: "Wellness-focused app improving engagement with health-related services. Tech Stack: React Native, Laravel. Built scalable mobile screens and integrated backend APIs. Coming soon.",
    status: "Coming Soon",
    link: "#",
    type: "client",
  },
];

export default function ProjectList() {
  const [selectedType, setSelectedType] = useState<"personal" | "client">("personal");

  const filteredProjects = projects.filter((p) => p.type === selectedType);

  return (
    <section className="rounded-2xl p-6 sm:p-10">
      <h2 className="text-2xl font-bold text-white mb-6">Projects</h2>

      {/* Toggle Buttons */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setSelectedType("personal")}
          className={`px-4 py-2 rounded-full font-medium transition ${
            selectedType === "personal"
              ? "bg-white text-black"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
        >
          Personal
        </button>
        <button
          onClick={() => setSelectedType("client")}
          className={`px-4 py-2 rounded-full font-medium transition ${
            selectedType === "client"
              ? "bg-white text-black"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
        >
          Delivered
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {filteredProjects.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 rounded-lg hover:bg-[#1a1a1a] transition-colors"
          >
            <div className="flex items-start gap-4">
              <img
                src={project.image}
                alt={project.title}
                className="w-12 h-12 rounded-md object-cover border border-gray-700 shrink-0"
              />

              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-white font-semibold">{project.title}</h3>
                  <FaExternalLinkAlt className="text-gray-400 mt-1 shrink-0" />
                </div>

                <p className="text-gray-400 text-sm">{project.role}</p>

                {project.status === "Building" && (
                  <span className="text-yellow-400 text-xs font-medium">Building</span>
                )}
                {project.status === "Coming Soon" && (
                  <span className="text-yellow-400 text-xs font-medium">Coming Soon</span>
                )}
                {project.status === "Temporarily Closed" && (
                  <span className="text-red-400 text-xs font-medium">Temporarily Closed</span>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}


