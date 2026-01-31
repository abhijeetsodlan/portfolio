import React from "react";
import HeaderSection from "./components/HeaderSection";
import ProjectCard from "./components/ProjectCard";
import ExperienceSection from "./components/ExperienceSection";
import GitHubStats from "./components/GitHubStats";
import AchievementsSection from "./components/AchievementsSection";
import GithubContributionsSection from "./components/GithubContributionsSection";

const App = () => {
  return (
    <div
    className="min-h-screen text-[#e5e5e5] font-mono py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    style={{
      backgroundColor: "#0c0c0c",
      backgroundImage: `
        radial-gradient(circle at 50% 0%, rgba(255,255,255,0.08), transparent 80%)
      `,
    }}
  >
      <div className="max-w-4xl mx-auto space-y-10">
        <HeaderSection />
        <ProjectCard/>
        <AchievementsSection />
        <GithubContributionsSection />
        <ExperienceSection />
      </div>
      <footer className="text-center text-gray-500 text-sm py-6">
    © 2026
    </footer>
    </div>
  );
};

export default App;
