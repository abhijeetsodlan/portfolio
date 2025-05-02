import React from "react";
import HeaderSection from "./components/HeaderSection";
import ProjectCard from "./components/ProjectCard";
import ExperienceSection from "./components/ExperienceSection";

const App = () => {
  return (
    <div className="min-h-screen bg-black bg-gradient-to-b from-[#0a0a0a] to-[#111] text-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        <HeaderSection />
        <ProjectCard/>
        <ExperienceSection />
      </div>
      <footer className="text-center text-gray-500 text-sm py-6">
    © 2025 
    </footer>
    </div>
  );
};

export default App;
