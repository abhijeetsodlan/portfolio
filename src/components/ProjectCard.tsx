import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    image: "https://source.unsplash.com/random/40x40?tech",
    title: "preList.live",
    role: "Waitlist Builder (No Backend)",
    link: "https://prelist.netlify.app",
    status: "Building",
  },
  {
    image: "https://source.unsplash.com/random/40x40?ai",
    title: "GoJobToday",
    role: "AI Job Platform",
    link: "https://gojobtoday.netlify.app",
    status: "Building",
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyRqV1aguhOOKSJCzObA65lMxK15bGqgyqoA&s",
    title: "regrets.in",
    role: "Anonymous Sharing Platform",
    link: "https://regrets.in",
  },
  {
    image: "https://source.unsplash.com/random/40x40?code",
    title: "ShareCode",
    role: "Code to Image Tool",
    link: "https://sharecodee.netlify.app/",
  },
  {
    image: "https://source.unsplash.com/random/40x40?space",
    title: "SpaceInvaders",
    role: "Classic Game",
    link: "https://abhijeetsodlan.github.io/SpaceInvaders/",
  },
];

export default function ProjectList() {
  return (
    <section className="bg-[#0c0c0c] rounded-2xl p-6 sm:p-10 shadow-lg border border-gray-800">
      <h2 className="text-2xl font-bold text-white mb-8">Projects</h2>
      <div className="space-y-7">
        {projects.map((project, index) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={project.image}
                alt={project.title}
                className="w-12 h-12 rounded-md object-cover border border-gray-700"
              />
              <div>
                <h3 className="text-white font-semibold">{project.title}</h3>
                <p className="text-gray-400 text-sm">{project.role}</p>
                {project.status === "Building" && (
                  <span className="text-yellow-400 text-xs font-medium">Building</span>
                )}
              </div>
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
              title="Visit Project"
            >
              <FaExternalLinkAlt />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
