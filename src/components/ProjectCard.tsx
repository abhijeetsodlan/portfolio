import React from "react";
import { FaGlobe, FaApple, FaGooglePlay } from "react-icons/fa";
import { useInView } from "../hooks/useInView";

const projects = [
  {
    image: "/images/prelistLogo.png",
    title: "prelist.live",
    role: "Tool for founders and businesses — collect waitlist emails with zero backend setup.",
    webLink: "https://prelist.netlify.app",
    status: "Building",
    type: "personal",
    tags: ["Next.js", "Node.js"],
  },
  {
    image: "/images/regretsLogo.png",
    title: "regrets.in",
    role: "A platform where people anonymously share their regrets, read others' stories, and engage through likes, replies, and shares.",
    webLink: "https://regrets.in",
    type: "personal",
    tags: ["React.js", "Node.js", "MongoDB"],
  },
  {
    image: "/images/spaceinvadersLogo.png",
    title: "SpaceInvaders",
    role: "Browser-based recreation of the classic arcade shooter — built from scratch with canvas rendering.",
    webLink: "https://spaceinvaderrs.netlify.app",
    type: "personal",
    tags: ["React.js"],
  },
  {
    image: "/images/codetoimgLogo.png",
    title: "ShareCode",
    role: "Turn code snippets into shareable, beautifully styled images — no design tools needed.",
    webLink: "https://sharecodee.netlify.app/",
    type: "personal",
    tags: ["React.js", "html2canvas"],
  },
  {
    image: "https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg",
    title: "avci",
    role: "Satirical site for the Anti-Valentine Commission of India, A humorous take on Valentine's Day culture.",
    webLink: "https://avci.lol",
    type: "personal",
    tags: ["Next.js"],
  },
  {
    image: "https://ac5d.com/wp-content/uploads/2025/01/logoo-scaled.jpg",
    title: "AC5D Construction",
    role: "Connects users with general and real estate contractors — browse properties, post projects, and hire professionals.",
    appStore: "https://apps.apple.com/in/app/ac5d-construction/id6744269662",
    playStore: "https://play.google.com/store/apps/details?id=com.ac5dconstruction",
    type: "client",
    tags: ["React Native"],
  },
  {
    image: "/images/responderLogo.webp",
    title: "Wellness Responder",
    role: "School communication and incident reporting app with push notifications and role-based access control.",
    appStore: "https://apps.apple.com/us/app/wellness-responder/id1574957321",
    playStore: "coming-soon",
    type: "client",
    tags: ["React Native", "Node.js"],
  },
  {
    image: "/images/divineLogo.png",
    title: "Divine Lightfoot App",
    role: "Wellness-focused mobile app with scalable screens and integrated backend APIs for health service engagement.",
    status: "Coming Soon",
    type: "client",
    tags: ["React Native", "Laravel"],
  },
];

function StoreButtons({ project }: { project: (typeof projects)[number] }) {
  if (project.type === "personal" && project.webLink) {
    return (
      <a
        href={project.webLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border border-gray-200 dark:border-[#2a2a2a] text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-[#444] hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
      >
        <FaGlobe className="text-[10px]" />
        Visit
      </a>
    );
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {project.appStore && (
        <a
          href={project.appStore}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border border-gray-200 dark:border-[#2a2a2a] text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-[#444] hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          <FaApple className="text-[11px]" />
          App Store
        </a>
      )}
      {project.playStore === "coming-soon" ? (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border border-dashed border-gray-200 dark:border-[#2a2a2a] text-gray-400 dark:text-gray-600">
          <FaGooglePlay className="text-[10px]" />
          Play Store soon
        </span>
      ) : project.playStore ? (
        <a
          href={project.playStore}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border border-gray-200 dark:border-[#2a2a2a] text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-[#444] hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          <FaGooglePlay className="text-[10px]" />
          Play Store
        </a>
      ) : null}
    </div>
  );
}

function ProjectGroup({
  projects,
  startIndex,
  inView,
}: {
  projects: typeof import("./ProjectCard").default extends never ? never : any[];
  startIndex: number;
  inView: boolean;
}) {
  return (
    <div className="space-y-1">
      {projects.map((project, index) => (
        <div
          key={index}
          className={`flex items-start gap-4 p-4 rounded-xl border border-transparent card-hover ${
            inView ? "animate-fade-in-up" : "opacity-0"
          }`}
          style={{ animationDelay: `${(startIndex + index) * 80 + 100}ms` }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-11 h-11 rounded-lg object-cover shrink-0 mt-0.5 border border-gray-200 dark:border-[#252525]"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {project.title}
            </h3>
            <p className="text-sm mt-0.5 leading-snug text-gray-500 dark:text-gray-500">{project.role}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {project.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-[#1a1a1a] text-gray-500 dark:text-gray-400"
                >
                  {tag}
                </span>
              ))}
              {project.status === "Building" && (
                <span className="text-[11px] font-medium text-yellow-600 dark:text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10 px-2 py-0.5 rounded-full">
                  Building
                </span>
              )}
              {project.status === "Coming Soon" && (
                <span className="text-[11px] font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-400/10 px-2 py-0.5 rounded-full">
                  Coming Soon
                </span>
              )}
            </div>
            <div className="mt-2.5">
              <StoreButtons project={project} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProjectList() {
  const { ref, inView } = useInView();

  const deliveredProjects = projects.filter((p) => p.type === "client");
  const personalProjects = projects.filter((p) => p.type === "personal");

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`rounded-2xl p-6 sm:p-10 ${inView ? "animate-fade-in-up" : "opacity-0"}`}
    >
      <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Projects</h2>

      {/* Delivered */}
      <div className="mb-8">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-600 mb-3 px-4">
          Delivered
        </h3>
        <ProjectGroup projects={deliveredProjects} startIndex={0} inView={inView} />
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 dark:border-[#1e1e1e] mb-8" />

      {/* Personal */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-600 mb-3 px-4">
          Personal
        </h3>
        <ProjectGroup projects={personalProjects} startIndex={deliveredProjects.length} inView={inView} />
      </div>
    </section>
  );
}
