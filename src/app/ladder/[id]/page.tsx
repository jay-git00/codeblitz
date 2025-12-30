import { ChevronLeft, CheckCircle2, Circle, ExternalLink, Play } from "lucide-react";
import Link from "next/link";

export default async function LadderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    // Mock problems for the beginner ladder
    const problems = [
        { id: "cf-4a", title: "Watermelon", platform: "Codeforces", status: "solved", rating: 800 },
        { id: "cf-71a", title: "Way Too Long Words", platform: "Codeforces", status: "solved", rating: 800 },
        { id: "cf-231a", title: "Team", platform: "Codeforces", status: "solved", rating: 800 },
        { id: "cf-158a", title: "Next Round", platform: "Codeforces", status: "unsolved", rating: 800 },
        { id: "cf-282a", title: "Bit++", platform: "Codeforces", status: "unsolved", rating: 800 },
        { id: "cf-50a", title: "Domino piling", platform: "Codeforces", status: "unsolved", rating: 800 },
    ];

    return (
        <div className="pt-24 pb-12 px-4 md:px-8 max-w-5xl mx-auto">
            <Link href="/ladder" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 group">
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Ladders
            </Link>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-bold font-outfit mb-2 capitalize">{id.replace("-", " ")} Ladder</h1>
                    <p className="text-slate-400">Complete these core problems to master the level.</p>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-bold text-green-400 font-outfit">3/50</div>
                    <div className="text-xs text-slate-500 uppercase font-bold tracking-widest">Problems Completed</div>
                </div>
            </div>

            <div className="grid gap-3">
                {problems.map((pb, idx) => (
                    <div
                        key={pb.id}
                        className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${pb.status === "solved"
                            ? "bg-green-500/5 border-green-500/10"
                            : "bg-slate-900/40 border-white/5 hover:border-white/10"
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-mono text-slate-600 w-4">#{idx + 1}</span>
                            {pb.status === "solved" ? (
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                            ) : (
                                <Circle className="w-5 h-5 text-slate-700 hover:text-slate-500 transition-colors cursor-pointer" />
                            )}
                            <div>
                                <h4 className="font-bold group-hover:text-indigo-400 transition-colors">{pb.title}</h4>
                                <div className="flex gap-3 mt-1">
                                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">{pb.platform}</span>
                                    <span className="text-[10px] text-slate-400 font-mono">Rating: {pb.rating}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {pb.status !== "solved" && (
                                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-xs font-bold hover:bg-indigo-500 transition-all">
                                    <Play className="w-3 h-3 fill-current" />
                                    Solve
                                </button>
                            )}
                            <a
                                href={`https://codeforces.com/problemset/problem/${pb.id.replace('cf-', '').replace(/(\d+)([a-z])/i, '$1/$2')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 rounded-lg bg-white/5 text-slate-500 hover:text-white transition-colors"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
