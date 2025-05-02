import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import prelistLogo from '../../public/images/prelistLogo.png'
import codetoimgLogo from '../../public/images/codetoimgLogo.png'
import regretsLogo from '../../public/images/regretsLogo.png'
import spaceinvadersLogo from '../../public/images/spaceinvadersLogo.png'
import gojobtodayLogo from '../../public/images/gojobtodayLogo.png'

const projects = [
  {
    image: prelistLogo,
    title: "prelist.live",
    role: "Tool for founders and businesses — easily collect waitlist emails with no backend setup required.",
    link: "https://prelist.netlify.app",
    status: "Building",
  },
  {
    image: gojobtodayLogo,
    title: "GoJob.today",
    role: "An AI-powered job platform that automatically applies to the best-matching job openings on your behalf — or explore jobs manually in a fun, swipe-based interface like reels. Swipe right to apply instantly.",
    link: "https://gojobtoday.netlify.app",
    status: "Building",
  },
  {
    image: regretsLogo,
    title: "regrets.in",
    role: "A platform where people anonymously share their regrets, read others' stories, and engage through likes, replies, and shares.",
    link: "https://regrets.in",
  },
  {
    image: codetoimgLogo,
    title: "ShareCode",
    role: "Code to Image Tool",
    link: "https://sharecodee.netlify.app/",
  },
  {
    image: spaceinvadersLogo,
    title: "SpaceInvaders",
    role: "Classic shooting Game",
    link: "https://abhijeetsodlan.github.io/SpaceInvaders/",
  },
];

export default function ProjectList() {
  return (
    <section className="bg-[#0c0c0c] rounded-2xl p-6 sm:p-10 shadow-lg border border-gray-800">
      <h2 className="text-2xl font-bold text-white mb-8">Projects</h2>
      <div className="space-y-7">
        {projects.map((project, index) => (
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
                <div>
                  <h3 className="text-white font-semibold">{project.title}</h3>
                </div>
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
