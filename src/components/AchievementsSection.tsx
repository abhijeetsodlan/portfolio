import React from "react";
import { useInView } from "../hooks/useInView";

const achievements = [
  {
    src: "/images/achievement1.png",
    alt: "Certificate of Appreciation – Performer of the Month (May 2025)",
    label: "Performer of the Month · May 2025",
  },
  {
    src: "/images/achievement2.png",
    alt: "Certificate of Appreciation – Outstanding Mobile App Developer 2025",
    label: "Outstanding Mobile App Developer · 2025",
  },
];

export default function AchievementsSection() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`rounded-2xl p-6 sm:p-10 ${inView ? "animate-fade-in-up" : "opacity-0"}`}
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Achievements</h2>
        <span className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-600">Highlights</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((item, index) => (
          <a
            key={index}
            href={item.src}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative block overflow-hidden rounded-xl border
              border-gray-200 dark:border-[#252525]
              bg-gray-50 dark:bg-[#111]
              ${inView ? "animate-scale-in" : "opacity-0"}`}
            style={{
              // Landscape 4:3 container — matches portrait image after 90deg rotation
              paddingTop: "75%",
              animationDelay: `${index * 150 + 200}ms`,
            }}
          >
            {/*
              The photo files are portrait (W × H, roughly 3:4).
              After rotating 90deg CW the visual size becomes H × W (landscape 4:3).
              To make the rotated image fill the 4:3 container:
                img.width  = containerHeight = 75% of containerWidth
                img.height = containerWidth  = 133.33% of containerHeight
              Then translate(-50%,-50%) centres it before the rotation.
            */}
            <img
              src={item.src}
              alt={item.alt}
              className="absolute object-cover"
              style={{
                top: "50%",
                left: "50%",
                width: "75%",        // = containerHeight
                height: "133.33%",   // = containerWidth
                transform: "translate(-50%, -50%) rotate(90deg)",
                transition: "transform 0.5s ease",
              }}
            />

            {/* Scale on hover — applied to a fill layer so the outer overflow:hidden clips it */}
            <div
              className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]"
              style={{ pointerEvents: "none" }}
            />

            {/* Label overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-xs text-white font-medium leading-snug">{item.label}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
