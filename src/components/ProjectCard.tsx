import React, { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

// Local images
import prelistLogo from "../../public/images/prelistLogo.png";
import codetoimgLogo from "../../public/images/codetoimgLogo.png";
import regretsLogo from "../../public/images/regretsLogo.png";
import spaceinvadersLogo from "../../public/images/spaceinvadersLogo.png";
import gojobtodayLogo from "../../public/images/gojobtodayLogo.png";

const projects = [
  {
    image: prelistLogo,
    title: "prelist.live",
    role: "Tool for founders and businesses — easily collect waitlist emails with no backend setup required.",
    link: "https://prelist.netlify.app",
    status: "Building",
    type: "personal",
  },
  {
    image: gojobtodayLogo,
    title: "GoJob.today",
    role: "An AI-powered job platform that automatically applies to the best-matching job openings on your behalf — or explore jobs manually in a fun, swipe-based interface like reels.",
    link: "https://gojobtoday.netlify.app",
    status: "Building",
    type: "personal",
  },
  {
    image: regretsLogo,
    title: "regrets.in",
    role: "A platform where people anonymously share their regrets, read others' stories, and engage through likes, replies, and shares.",
    link: "https://regrets.in",
    type: "personal",
  },
  {
    image: codetoimgLogo,
    title: "ShareCode",
    role: "Code to Image Tool",
    link: "https://sharecodee.netlify.app/",
    type: "personal",
  },
  {
    image: spaceinvadersLogo,
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
                src={typeof project.image === "string" ? project.image : project.image.src}
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
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
