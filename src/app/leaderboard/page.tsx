
import LeaderboardClient from "./LeaderboardClient";
import leaderboardData from "../../../public/leaderboard.json";
import { LeaderboardData } from "@/types/leaderboard";

export default function LeaderboardPage() {
  const data: LeaderboardData = leaderboardData;

  return (
    <div className="bg-white min-h-screen font-sans text-slate-800">
      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-slate-900 mb-8 text-center">
          Leaderboard
        </h1>
        <LeaderboardClient data={data} />
      </main>
    </div>
  );
}
