import { Trophy, Medal, ArrowUp, ArrowDown, User } from "lucide-react";

export default function LeaderboardPage() {
    const leaders = [
        { rank: 1, name: "PARDHU California ethical hacker", solved: 4502, streak: 120, rating: 3804, avatar: "T" },
        { rank: 2, name: "nithin", solved: 3982, streak: 85, rating: 3652, avatar: "B" },
        { rank: 3, name: "Ganesh the new insta influencer", solved: 3721, streak: 45, rating: 3591, avatar: "R" },
        { rank: 4, name: "Vikas 1cr package", solved: 3510, streak: 32, rating: 3482, avatar: "K" },
        { rank: 5, name: "Pranav the AI", solved: 3421, streak: 14, rating: 3421, avatar: "E" },
    ];

    return (
        <div className="pt-24 pb-12 px-4 md:px-8 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-bold font-outfit mb-2">Global Leaderboard</h1>
                    <p className="text-slate-400">The world's most elite competitive programmers.</p>
                </div>
                <div className="flex items-center gap-4 p-2 bg-slate-900 border border-white/10 rounded-2xl">
                    <button className="px-6 py-2 rounded-xl bg-indigo-600 text-sm font-bold shadow-lg shadow-indigo-500/20">Global</button>
                    <button className="px-6 py-2 rounded-xl text-slate-400 text-sm font-medium hover:text-white transition-colors">Regional</button>
                </div>
            </div>

            <div className="bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-white/5 border-b border-white/5">
                            <th className="px-8 py-5 text-xs font-bold uppercase text-slate-500 tracking-wider">Rank</th>
                            <th className="px-8 py-5 text-xs font-bold uppercase text-slate-500 tracking-wider">User</th>
                            <th className="px-8 py-5 text-xs font-bold uppercase text-slate-500 tracking-wider">Solved</th>
                            <th className="px-8 py-5 text-xs font-bold uppercase text-slate-500 tracking-wider">Streak</th>
                            <th className="px-8 py-5 text-xs font-bold uppercase text-slate-500 tracking-wider">Rating</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {leaders.map((user) => (
                            <tr key={user.name} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-2">
                                        {user.rank === 1 && <Medal className="w-5 h-5 text-yellow-500" />}
                                        {user.rank === 2 && <Medal className="w-5 h-5 text-slate-300" />}
                                        {user.rank === 3 && <Medal className="w-5 h-5 text-amber-700" />}
                                        <span className={`text-lg font-bold font-outfit ${user.rank <= 3 ? "text-white" : "text-slate-500"}`}>
                                            #{user.rank}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-lg ${user.rank === 1 ? "bg-yellow-500/20 text-yellow-500" : "bg-slate-800 text-slate-400"
                                            }`}>
                                            {user.avatar}
                                        </div>
                                        <span className="font-bold group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{user.name}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6 font-mono text-slate-300">
                                    {user.solved}
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-1.5 text-orange-400 font-bold">
                                        <span>{user.streak}d</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-right md:text-left">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono font-bold">
                                        {user.rating}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-12 flex items-center justify-center gap-4">
                <button className="px-6 py-3 rounded-2xl bg-slate-900 border border-white/10 text-slate-400 text-sm font-bold hover:text-white transition-all">
                    Show More
                </button>
            </div>
        </div>
    );
}
