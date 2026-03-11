import React from "react";
import { useInView } from "../hooks/useInView";

const experiences = [
  {
    image: "https://leavecode.com/wp-content/uploads/2022/09/logo-01.png",
    company: "LeaveCode Technologies",
    link: "https://leavecode.com",
    role: "Mobile Application Developer",
    duration: "June 2024 – Present",
  },
];

export default function ExperienceSection() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`rounded-2xl p-6 sm:p-10 ${inView ? "animate-fade-in-up" : "opacity-0"}`}
    >
      <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Experience</h2>

      <div className="space-y-2">
        {experiences.map((exp, index) => (
          <a
            key={index}
            href={exp.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-start gap-4 p-4 rounded-xl border border-transparent card-hover ${
              inView ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: `${index * 100 + 150}ms` }}
          >
            <img
              src={exp.image}
              alt={exp.company}
              className="w-11 h-11 rounded-lg object-cover shrink-0 bg-white p-1 border border-gray-200 dark:border-[#252525]"
            />

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-100">
                    {exp.company}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-500">{exp.role}</p>
                </div>
                <span className="text-xs sm:text-sm whitespace-nowrap mt-0.5 text-gray-400 dark:text-gray-600">
                  {exp.duration}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
