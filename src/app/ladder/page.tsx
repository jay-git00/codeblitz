import { Trophy, Star, ChevronRight, Lock, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function LadderPage() {
    const ladders = [
        {
            id: "beginner",
            title: "Beginner's Ascent",
            description: "Master the basics of implementation and logic. For ratings 800 - 1000.",
            problems: 50,
            completed: 12,
            color: "from-green-500 to-emerald-600",
            icon: <Star className="w-5 h-5" />,
        },
        {
            id: "apprentice",
            title: "Apprentice Path",
            description: "Dive into basic data structures and math. For ratings 1000 - 1200.",
            problems: 75,
            completed: 0,
            color: "from-blue-500 to-indigo-600",
            icon: <Trophy className="w-5 h-5" />,
        },
        {
            id: "specialist",
            title: "Specialist Sprint",
            description: "Advanced graph algorithms and DP techniques. For ratings 1200 - 1400.",
            problems: 100,
            completed: 0,
            color: "from-purple-500 to-pink-600",
            icon: <Trophy className="w-5 h-5" />,
            locked: true,
        },
    ];

    return (
        <div className="pt-24 pb-12 px-4 md:px-8 max-w-5xl mx-auto">
            <div className="mb-12">
                <h1 className="text-4xl font-bold font-outfit mb-2">CodeBlitz Ladders</h1>
                <p className="text-slate-400">Structured paths to master competitive programming step-by-step.</p>
            </div>

            <div className="grid gap-6">
                {ladders.map((ladder) => (
                    <div
                        key={ladder.id}
                        className={`group relative overflow-hidden rounded-3xl border border-white/5 bg-slate-900/40 p-8 transition-all ${ladder.locked ? "opacity-75 grayscale" : "hover:border-white/20 hover:bg-slate-900/60"
                            }`}
                    >
                        {/* Background Accent */}
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${ladder.color} opacity-10 blur-3xl -z-10`} />

                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${ladder.color} flex items-center justify-center shadow-lg`}>
                                {ladder.icon}
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                    <h3 className="text-2xl font-bold font-outfit">{ladder.title}</h3>
                                    {ladder.locked && <Lock className="w-4 h-4 text-slate-500" />}
                                </div>
                                <p className="text-slate-400 mb-6 max-w-lg">{ladder.description}</p>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                                        <span>Progress: {ladder.completed}/{ladder.problems} Solved</span>
                                        <span>{Math.round((ladder.completed / ladder.problems) * 100)}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full bg-gradient-to-r ${ladder.color} transition-all duration-500`}
                                            style={{ width: `${(ladder.completed / ladder.problems) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex-shrink-0">
                                {ladder.locked ? (
                                    <button className="px-8 py-3 rounded-2xl bg-slate-800 text-slate-500 font-bold cursor-not-allowed">
                                        Locked
                                    </button>
                                ) : (
                                    <Link
                                        href={`/ladder/${ladder.id}`}
                                        className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-white text-slate-950 font-bold hover:bg-slate-200 transition-all shadow-xl shadow-white/5"
                                    >
                                        Continue
                                        <ChevronRight className="w-4 h-4" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-16 p-8 rounded-3xl bg-indigo-600/10 border border-indigo-500/20 text-center">
                <h4 className="text-xl font-bold mb-4 font-outfit">How do ladders work?</h4>
                <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Each ladder is a curated selection of problems from platforms like Codeforces and AtCoder.
                    Complete one level to unlock the next. Your progress is automatically synced with your global solving streak.
                </p>
            </div>
        </div>
    );
}
