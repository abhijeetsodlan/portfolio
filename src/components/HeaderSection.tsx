import React, { useEffect, useState } from "react";
import {
  FaXTwitter,
  FaLinkedin,
  FaInstagram,
  FaRegEnvelope,
  FaGithub,
  FaLeaf,
  FaArrowUpRightFromSquare,
  FaChevronDown,
} from "react-icons/fa6";

const socials = [
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
    href: "mailto:abhijeet.pushingcode@gmail.com",
    icon: <FaRegEnvelope />,
    label: "Email",
  },
  {
    href: "https://www.instagram.com/abhijeetsodlan",
    icon: <FaInstagram />,
    label: "Instagram",
  },
];

const SHOW_RESUME = false;

export default function HeaderSection() {
  const [showScrollCue, setShowScrollCue] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollCue(window.scrollY < 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight * 0.85, behavior: "smooth" });
  };

  return (
    <section className="rounded-2xl p-6 sm:p-10">
      <div className="space-y-5">
        {/* Avatar */}
        <div className="animate-fade-in-up">
          <img
            src="/images/osho.avif"
            alt="Abhijeet"
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-[#252525]"
          />
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white flex items-center gap-3 animate-fade-in-up">
          Hi, I'm Abhijeet
          <span
            className="text-4xl select-none"
            style={{
              display: "inline-block",
              animation: "fadeInUp 0.6s 0.2s cubic-bezier(0.22,1,0.36,1) both",
            }}
          >
            👋
          </span>
        </h1>

        {/* Social Icons */}
        <div className="flex gap-4 text-lg animate-fade-in-up delay-200 text-gray-400 dark:text-gray-500">
          {socials.map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:scale-110 hover:-translate-y-0.5"
              style={{ display: "inline-block" }}
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Description */}
        <p className="text-[15px] leading-relaxed max-w-xl animate-fade-in-up delay-300 text-gray-500 dark:text-gray-400">
          I build for the web and mobile. React.js, Next.js, Node.js, React Native.
          22 with 2+ years in the field. When I'm not at a screen, I'm on a
          farm, usually near a loud tractor or a quiet Osho book.{" "}
        </p>

        {/* Climate note */}
        <div
          className="inline-flex max-w-xl items-start gap-3 rounded-2xl border border-emerald-200/70 bg-emerald-50/70 px-4 py-3 text-sm leading-relaxed text-emerald-800 animate-fade-in-up delay-400
            dark:border-emerald-500/15 dark:bg-emerald-500/10 dark:text-emerald-200"
        >
          <FaLeaf className="mt-0.5 shrink-0 text-emerald-500 dark:text-emerald-300" />
          <div>
            <p>
              Building with a little more care for the planet: save trees,
              protect green spaces, and keep climate change in the conversation.
            </p>
            <a
              href="https://earthsos.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 transition-colors hover:text-emerald-900 dark:text-emerald-300 dark:hover:text-emerald-100"
            >
              Visit EarthSOS
              <FaArrowUpRightFromSquare className="text-[10px]" />
            </a>
          </div>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-gray-500 animate-fade-in-up delay-500 dark:text-gray-400">
          I have a blog website where I vomit my thoughts and opinions on different topics, here is the website link: {" "}
          <a
            href="https://rednotebook.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            The Red NoteBook
          </a>
        </p>
        {SHOW_RESUME && (
          <div className="animate-fade-in-up delay-500">
            <a
              href="/Abhijeet_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold active:scale-95 transition-all duration-200
                  bg-gray-900 text-white hover:bg-gray-700
                  dark:bg-white dark:text-black dark:hover:bg-gray-100"
            >
              View Resume
            </a>
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={scrollToContent}
        aria-label="Scroll down"
        className={`mx-auto mt-10 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:text-gray-800 dark:border-[#252525] dark:text-gray-500 dark:hover:border-[#3a3a3a] dark:hover:text-white ${
          showScrollCue ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <FaChevronDown className="animate-scroll-cue" />
      </button>
    </section>
  );
}
