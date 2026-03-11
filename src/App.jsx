import React, { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa6";
import HeaderSection from "./components/HeaderSection";
import ProjectCard from "./components/ProjectCard";
import ExperienceSection from "./components/ExperienceSection";
import AchievementsSection from "./components/AchievementsSection";
import GithubContributionsSection from "./components/GithubContributionsSection";
import { useTheme } from "./hooks/useTheme";

function ThemeToggle({ isDark, toggle }) {
  const [spinning, setSpinning] = useState(false);

  const handleClick = () => {
    if (spinning) return;
    setSpinning(true);
    toggle();
    setTimeout(() => setSpinning(false), 450);
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Toggle theme"
      className="fixed top-5 right-5 z-50 w-9 h-9 flex items-center justify-center rounded-full border cursor-pointer
        bg-white/80 border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-white hover:border-gray-300
        dark:bg-[#111]/80 dark:border-[#2a2a2a] dark:text-gray-400 dark:hover:text-white dark:hover:bg-[#1a1a1a]"
      style={{ backdropFilter: "blur(8px)", transition: "background-color 0.2s, border-color 0.2s, color 0.2s" }}
    >
      <span className={spinning ? "animate-icon-spin" : ""} style={{ display: "flex" }}>
        {isDark ? <FaSun size={14} /> : <FaMoon size={14} />}
      </span>
    </button>
  );
}

const App = () => {
  const { isDark, toggle } = useTheme();

  return (
    <div
      className="min-h-screen font-mono py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden
        text-gray-800 dark:text-[#e5e5e5]"
      style={{
        backgroundColor: "var(--page-bg)",
        backgroundImage: `
          radial-gradient(ellipse 80% 40% at 50% -10%, var(--radial-top), transparent),
          radial-gradient(ellipse 60% 30% at 80% 100%, var(--radial-bottom), transparent)
        `,
        transition: "background-color 0.3s ease",
      }}
    >
      {/* Dot grid */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(var(--dot-color), var(--dot-opacity)) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <ThemeToggle isDark={isDark} toggle={toggle} />

      <div className="relative max-w-4xl mx-auto space-y-2">
        <HeaderSection />
        <hr className="border-gray-200 dark:border-[#1a1a1a]" />
        <ProjectCard />
        <hr className="border-gray-200 dark:border-[#1a1a1a]" />
        <AchievementsSection />
        <hr className="border-gray-200 dark:border-[#1a1a1a]" />
        <GithubContributionsSection />
        <hr className="border-gray-200 dark:border-[#1a1a1a]" />
        <ExperienceSection />
      </div>

      {/* Osho quote */}
      <div className="relative max-w-4xl mx-auto px-6 sm:px-10 py-10">
        <p className="text-sm italic leading-relaxed text-gray-400 dark:text-gray-500 border-l-2 border-orange-400/50 pl-4">
          "A man truly becomes a man the day he accepts that he alone is responsible for what he is."
          <span className="not-italic block mt-2 text-xs text-orange-400/70 tracking-widest uppercase">— Osho</span>
        </p>
      </div>

      <footer className="relative text-center text-xs py-8 tracking-widest uppercase text-gray-400 dark:text-gray-600">
        © 2026
      </footer>
    </div>
  );
};

export default App;
