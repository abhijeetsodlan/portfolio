import React, { useEffect, useMemo, useState } from "react";
import { useInView } from "../hooks/useInView";

interface Contribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

// CSS variables set per theme in index.css
const LEVEL_VAR = ["--c0", "--c1", "--c2", "--c3", "--c4"];

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function toWeeks(days: Contribution[]): (Contribution | null)[][] {
  if (!days.length) return [];
  const firstDow = new Date(days[0].date + "T00:00:00").getDay();
  const padded: (Contribution | null)[] = [...Array(firstDow).fill(null), ...days];
  const weeks: (Contribution | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }
  return weeks;
}

function monthLabels(weeks: (Contribution | null)[][]): { label: string; col: number }[] {
  const out: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, col) => {
    const first = week.find((d) => d?.date);
    if (!first) return;
    const m = new Date(first.date + "T00:00:00").getMonth();
    if (m !== lastMonth) {
      out.push({ label: MONTHS[m], col });
      lastMonth = m;
    }
  });
  return out;
}

const CELL = 12;
const GAP  = 3;
const STEP = CELL + GAP;

export default function GithubContributionsSection() {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [total, setTotal]     = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);
  const { ref, inView } = useInView();

  useEffect(() => {
    fetch("https://github-contributions-api.jogruber.de/v4/abhijeetsodlan?y=2026")
      .then((r) => {
        if (!r.ok) throw new Error("network");
        return r.json();
      })
      .then((d) => {
        setContributions(d.contributions ?? []);
        setTotal(d.total?.["2026"] ?? 0);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const weeks  = useMemo(() => toWeeks(contributions), [contributions]);
  const labels = useMemo(() => monthLabels(weeks), [weeks]);
  const gridW  = weeks.length * STEP - GAP;

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`rounded-2xl p-6 sm:p-10 ${inView ? "animate-fade-in-up" : "opacity-0"}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">GitHub Contributions</h2>
          {!loading && !error && (
            <p className="text-sm mt-1 text-gray-400 dark:text-gray-500">
              {total.toLocaleString()} contributions in 2026
            </p>
          )}
        </div>
        <span className="text-xs uppercase tracking-widest mt-1 text-gray-400 dark:text-gray-600">Activity</span>
      </div>

      {/* Graph card */}
      <div
        className={`rounded-xl border p-5 overflow-x-auto scrollbar-hide
          border-gray-200 bg-[#f6f8fa]
          dark:border-[#1f1f1f] dark:bg-[#0d1117]
          ${inView ? "animate-fade-in delay-200" : "opacity-0"}`}
        style={{ transition: "background-color 0.3s ease, border-color 0.3s ease" }}
      >
        {loading && (
          <div className="h-28 flex items-center justify-center">
            <span className="text-sm animate-pulse text-gray-400 dark:text-gray-600">Loading contributions…</span>
          </div>
        )}
        {error && (
          <div className="h-28 flex items-center justify-center">
            <span className="text-sm text-gray-400 dark:text-gray-600">Could not load contributions.</span>
          </div>
        )}

        {!loading && !error && weeks.length > 0 && (
          <div style={{ minWidth: gridW + 36 }}>
            {/* Month labels row */}
            <div className="flex pl-9 mb-1" style={{ gap: GAP }}>
              {weeks.map((_, wIdx) => {
                const lbl = labels.find((l) => l.col === wIdx);
                return (
                  <div
                    key={wIdx}
                    className="text-[10px] font-mono shrink-0 text-gray-400 dark:text-gray-600"
                    style={{ width: CELL }}
                  >
                    {lbl ? lbl.label : ""}
                  </div>
                );
              })}
            </div>

            {/* Day labels + week grid */}
            <div className="flex" style={{ gap: GAP }}>
              {/* Day labels */}
              <div className="flex flex-col shrink-0 mr-1" style={{ gap: GAP }}>
                {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                  <div
                    key={i}
                    className="text-[10px] font-mono flex items-center justify-end pr-1 text-gray-400 dark:text-gray-600"
                    style={{ height: CELL, width: 28 }}
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* Week columns */}
              <div className="flex" style={{ gap: GAP }}>
                {weeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col" style={{ gap: GAP }}>
                    {Array.from({ length: 7 }).map((_, dIdx) => {
                      const day = week[dIdx] ?? null;
                      return (
                        <div
                          key={dIdx}
                          title={
                            day?.date
                              ? `${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}`
                              : ""
                          }
                          className="rounded-[2px] transition-transform duration-150 hover:scale-125 cursor-default"
                          style={{
                            width: CELL,
                            height: CELL,
                            backgroundColor: day
                              ? `var(${LEVEL_VAR[day.level]})`
                              : "transparent",
                          }}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-1.5 mt-4 justify-end">
              <span className="text-[10px] mr-0.5 text-gray-400 dark:text-gray-600">Less</span>
              {[0, 1, 2, 3, 4].map((lvl) => (
                <div
                  key={lvl}
                  className="rounded-[2px]"
                  style={{ width: 10, height: 10, backgroundColor: `var(${LEVEL_VAR[lvl]})` }}
                />
              ))}
              <span className="text-[10px] ml-0.5 text-gray-400 dark:text-gray-600">More</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
