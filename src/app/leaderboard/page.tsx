import LeaderboardClient from "./LeaderboardClient";
import leaderboardData from "../../../public/leaderboard.json";
import { LeaderboardData } from "@/types/leaderboard";
import { Github } from "lucide-react";

export default function LeaderboardPage() {
  const data: LeaderboardData = leaderboardData;

  return (
    <div className="bg-white min-h-screen font-sans text-slate-800">
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="text-xl font-bold text-slate-900">
              PhotoBench
            </a>
            <div className="flex items-center space-x-6">
              <a href="/leaderboard" className="text-navy-blue hover:underline">
                Leaderboard
              </a>
              <a href="#" className="text-navy-blue hover:underline">
                Paper
              </a>
              <a
                href="https://github.com/LaVieEnRose365/PhotoBench/"
                className="text-navy-blue hover:underline flex items-center"
              >
                <Github className="w-5 h-5 mr-1" />
                Github
              </a>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-slate-900 mb-8 text-center">
          Leaderboard
        </h1>
        <LeaderboardClient data={data} />
        <p className="text-center text-slate-600 mt-8">
          The leaderboard is updated in real-time. If you want to know the performance of any models we haven't covered, 
          you can send an email to <a href="mailto:crimsonflag@sjtu.edu.cn" className="text-navy-blue hover:underline">crimsonflag@sjtu.edu.cn</a> or <a href="mailto: shanrong@sjtu.edu.cn" className="text-navy-blue hover:underline">shanrong@sjtu.edu.cn</a> with the subject "PhotoBench".
        </p>
      </main>
    </div>
  );
}
