import React from "react";

export default function GithubContributionsSection() {
  return (
    <section className="rounded-2xl p-6 sm:p-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">GitHub Contributions</h2>
        <span className="text-xs uppercase tracking-widest text-gray-500">Activity</span>
      </div>

      <div className="w-full overflow-x-auto">
        <img
          src="https://ghchart.rshah.org/219a3f/abhijeetsodlan"
          alt="GitHub contributions chart for abhijeetsodlan"
          className="inline-block min-w-[720px] rounded-xl border border-[#1f1f1f] bg-[#0e0e0e] p-3"
          style={{ filter: "invert(1) hue-rotate(180deg)" }}
        />
      </div>
    </section>
  );
}
