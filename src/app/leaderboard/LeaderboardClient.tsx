
"use client";

import { useState } from "react";
import { LeaderboardData, Score, metrics } from "@/types/leaderboard";

const LeaderboardTable = ({ scores, metric }: { scores: Score[], metric: string }) => {
  if (!scores) {
    return <div className="text-center p-8">Loading scores...</div>;
  }
  const sortedScores = [...scores].sort((a, b) => (b[metric] as number) - (a[metric] as number));

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-slate-200">
        <thead>
          <tr className="bg-slate-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Rank</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Model</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{metric}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {sortedScores.map((item, index) => (
            <tr key={item.model}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{item.model}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{(item[metric] as number).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function LeaderboardClient({ data }: { data: LeaderboardData }) {
  const [category, setCategory] = useState<keyof LeaderboardData>("embedding");
  const [language, setLanguage] = useState<"en" | "cn">("en");
  const [metric, setMetric] = useState<string>("R@1");

  const scores = data[category][language];

  return (
    <div>
      <div className="mb-8 flex justify-center items-center flex-wrap gap-4">
        <div className="flex items-center space-x-2 p-1 bg-slate-100 rounded-lg">
          {(["embedding", "caption", "agent"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                category === cat ? "bg-blue-900 text-white font-bold" : "text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-2 p-1 bg-slate-100 rounded-lg">
          {(["en", "cn"] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                language === lang ? "bg-blue-900 text-white font-bold" : "text-slate-600 hover:bg-slate-200"
              }`}
            >
              {lang === "en" ? "English" : "中文"}
            </button>
          ))}
        </div>
        <div className="relative">
          <select
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
            className="appearance-none w-full bg-slate-100 border-transparent rounded-lg py-2 pl-3 pr-10 text-sm font-medium text-slate-600 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900"
          >
            {metrics.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      <LeaderboardTable scores={scores} metric={metric} />
    </div>
  );
}
