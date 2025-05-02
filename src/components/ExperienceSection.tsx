import React from "react";

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
  return (
    <section className="bg-[#0c0c0c] rounded-2xl p-6 sm:p-10 shadow-lg border border-gray-800 mt-10">
      <h2 className="text-2xl font-bold text-white mb-8">Experience</h2>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <a
            key={index}
            href={exp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 rounded-lg hover:bg-[#1a1a1a] transition-colors"
          >
            <div className="flex items-start gap-4">
              <img
                src={exp.image}
                alt={exp.company}
                className="w-16 h-12 rounded-md object-cover shrink-0"
              />

              <div className="flex-1 space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-white font-semibold">{exp.company}</h3>
                    <p className="text-gray-400 text-sm">{exp.role}</p>
                  </div>
                  <span className="text-gray-400 text-sm mt-2 sm:mt-0 sm:ml-4 whitespace-nowrap">
                    {exp.duration}
                  </span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
