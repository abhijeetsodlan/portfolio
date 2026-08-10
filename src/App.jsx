import React, { useState } from "react";
import { FaSun, FaMoon, FaXTwitter, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa6";
import HeaderSection from "./components/HeaderSection";
import ProjectCard from "./components/ProjectCard";
import ExperienceSection from "./components/ExperienceSection";
import AchievementsSection from "./components/AchievementsSection";
import GithubContributionsSection from "./components/GithubContributionsSection";
import { useTheme } from "./hooks/useTheme";

const SHOW_ACHIEVEMENTS = false;
const SHOW_EXPERIENCE = false;

function ThemeToggle({ isDark, toggle }) {
  const [spinning, setSpinning] = useState(false);

  const handleClick = () => {
    if (spinning) return;
    setSpinning(true);
    toggle();
    setTimeout(() => setSpinning(false), 450);
  };

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

const OSHO_QUOTE =
  "A man truly becomes a man the day he accepts that he alone is responsible for whatever he is.";
const contactSocials = [
  {
    href: "https://twitter.com/AbhijeetSodlan",
    icon: <FaXTwitter />,
    label: "Twitter",
  },
  {
    href: "https://www.linkedin.com/in/abhijeet-sodlan-82753533b/",
    icon: <FaLinkedin />,
    label: "LinkedIn",
  },
  {
    href: "https://github.com/abhijeetsodlan",
    icon: <FaGithub />,
    label: "GitHub",
  },
  {
    href: "https://www.instagram.com/abhijeetsodlan",
    icon: <FaInstagram />,
    label: "Instagram",
  },
];

function ContactSection() {
  return (
    <section className="relative max-w-4xl mx-auto px-6 sm:px-10 py-10">
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-600">
          Available for projects
        </p>
        <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:whitespace-nowrap dark:text-white">
          Hire me to build your next web or mobile app.
        </h2>
        <a
          href="mailto:abhijeet.pushingcode@gmail.com"
          className="mt-3 inline-block text-sm font-medium text-gray-600 transition-colors hover:text-gray-950 dark:text-gray-400 dark:hover:text-white"
        >
          abhijeet.pushingcode@gmail.com
        </a>

        <div className="mt-4 flex gap-3 text-lg text-gray-400 dark:text-gray-500">
          {contactSocials.map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:text-gray-900 dark:border-[#252525] dark:bg-[#111]/60 dark:hover:border-[#3a3a3a] dark:hover:text-white"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </section>
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
      <div className="animate-fade-in-up">
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
          {SHOW_ACHIEVEMENTS && (
            <>
              <hr className="border-gray-200 dark:border-[#1a1a1a]" />
              <AchievementsSection />
            </>
          )}
          <hr className="border-gray-200 dark:border-[#1a1a1a]" />
          <GithubContributionsSection />
          {SHOW_EXPERIENCE && (
            <>
              <hr className="border-gray-200 dark:border-[#1a1a1a]" />
              <ExperienceSection />
            </>
          )}
        </div>

        <ContactSection />

        {/* Osho quote */}
        <div className="relative max-w-4xl mx-auto px-6 sm:px-10 py-10">
          <p className="text-sm italic leading-relaxed text-gray-400 dark:text-gray-500 border-l-2 border-orange-400/50 pl-4">
            "{OSHO_QUOTE}"
            <span className="not-italic block mt-2 text-xs text-orange-400/70 tracking-widest uppercase">- Osho</span>
          </p>
        </div>

        <footer className="relative text-center text-xs py-8 tracking-widest uppercase text-gray-400 dark:text-gray-600">
          (c) 2026
        </footer>
      </div>
    </div>
  );
};

export default App;
