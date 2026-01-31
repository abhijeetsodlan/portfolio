import React from "react";

export default function AchievementsSection() {
  return (
    <section className="rounded-2xl p-6 sm:p-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Achievements</h2>
        <span className="text-xs uppercase tracking-widest text-gray-500">Highlights</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <a
          href="/images/achievement1.png"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative mx-auto flex w-full max-w-[320px] h-[220px] items-center justify-center sm:max-w-[360px] sm:h-[240px]"
        >
          <img
            src="/images/achievement1.png"
            alt="Certificate of Appreciation - Performer of the Month (May 2025)"
            className="h-[320px] w-[220px] rounded-xl object-cover rotate-90 sm:h-[360px] sm:w-[240px]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-xl bg-gradient-to-t from-black/80 via-black/40 to-transparent px-3 py-2 text-xs text-gray-100 opacity-0 shadow-[0_-8px_20px_rgba(0,0,0,0.5)] group-hover:opacity-100">
            Performer of the Month (May 2025)
          </div>
        </a>

        <a
          href="/images/achievement2.png"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative mx-auto flex w-full max-w-[320px] h-[220px] items-center justify-center sm:max-w-[360px] sm:h-[240px]"
        >
          <img
            src="/images/achievement2.png"
            alt="Certificate of Appreciation - Outstanding Mobile App Developer (2025)"
            className="h-[320px] w-[220px] rounded-xl object-cover rotate-90 sm:h-[360px] sm:w-[240px]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-xl bg-gradient-to-t from-black/80 via-black/40 to-transparent px-3 py-2 text-xs text-gray-100 opacity-0 shadow-[0_-8px_20px_rgba(0,0,0,0.5)] group-hover:opacity-100">
            Outstanding Mobile App Developer (2025)
          </div>
        </a>
      </div>
    </section>
  );
}
