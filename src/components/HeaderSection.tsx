import React from "react";
import {
  FaXTwitter,
  FaLinkedin,
  FaInstagram,
  FaRegEnvelope,
  FaGithub,
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

export default function HeaderSection() {
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
          21 with 1.5+ years in the field. When I'm not at a screen, I'm on a
          farm, usually near a loud tractor or a quiet Osho book.{" "}
          <em className="text-gray-400 dark:text-gray-500">(oshopaglu)</em>
        </p>

        {/* Resume */}
        <div className="animate-fade-in-up delay-400">
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
      </div>
    </section>
  );
}
