import Link from "next/link";
import { getProblems, Problem } from "@/lib/problems";
import { Search, Filter, Star, ChevronRight, Hash, ExternalLink, Trophy } from "lucide-react";
import { PracticeFilters } from "@/components/PracticeFilters";

export default async function PracticePage({
    searchParams,
}: {
    searchParams: Promise<{ platform?: string; q?: string; sort?: string }>;
}) {
    const sp = await searchParams;
    const selectedPlatform = sp.platform || "all";
    const searchQuery = sp.q || "";
    const selectedSort = sp.sort || "diff_asc";
    const problems = await getProblems(selectedPlatform, searchQuery, selectedSort);

    return (
        <div className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
            <div className="flex flex-col gap-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-6xl font-black font-outfit tracking-tighter mb-4 uppercase">
                            The <span className="text-indigo-500">Problemset</span>
                        </h1>
                        <p className="text-slate-400 text-lg">Curated lists from across the web. Sharpen your skills one problem at a time.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="px-5 py-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                            <span className="text-indigo-400 font-bold uppercase tracking-widest text-xs">{problems.length} Problems Found</span>
                        </div>
                    </div>
                </div>

                {/* Filters and Controls */}
                <div className="grid lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3 space-y-6">
                        <PracticeFilters
                            selectedPlatform={selectedPlatform}
                            searchQuery={searchQuery}
                            selectedSort={selectedSort}
                        />

                        <div className="bg-slate-900/30 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-white/5 bg-white/[0.02]">
                                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Problem Details</th>
                                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Tier</th>
                                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Source</th>
                                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {problems.map((problem) => (
                                            <tr key={problem.id} className="hover:bg-indigo-500/[0.03] transition-colors group">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-start gap-4">
                                                        <button className="mt-1 text-slate-700 hover:text-yellow-500 transition-colors">
                                                            <Star className="w-4 h-4" />
                                                        </button>
                                                        <div>
                                                            <h4 className="font-bold text-slate-200 group-hover:text-white transition-colors text-base">
                                                                {problem.title}
                                                            </h4>
                                                            <div className="flex flex-wrap gap-2 mt-3">
                                                                {problem.tags.slice(0, 3).map(tag => (
                                                                    <span key={tag} className="px-2.5 py-1 rounded-lg text-[9px] font-black bg-white/5 text-slate-400 border border-white/5 uppercase tracking-wider">
                                                                        {tag}
                                                                    </span>
                                                                ))}
                                                                {problem.tags.length > 3 && (
                                                                    <span className="text-[9px] font-black text-slate-600 mt-1">
                                                                        +{problem.tags.length - 3} MORE
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className={`px-4 py-1.5 rounded-xl text-xs font-black tracking-widest ${typeof problem.difficulty === 'number'
                                                        ? (problem.difficulty > 2000 ? 'bg-red-500/10 text-red-500' : problem.difficulty > 1200 ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500')
                                                        : 'bg-indigo-500/10 text-indigo-400'
                                                        }`}>
                                                        {problem.difficulty}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="text-sm font-bold text-slate-500 tracking-tight">{problem.platform}</span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <a href={problem.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-indigo-500/50 text-xs font-bold text-slate-300 transition-all group/btn">
                                                        SOLVE NOW
                                                        <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-y-[-1px] group-hover/btn:translate-x-[1px] transition-transform" />
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <aside className="space-y-8">
                        {/* Quick Stats */}
                        <div className="p-8 rounded-[2.5rem] bg-slate-900/30 border border-white/5 backdrop-blur-sm">
                            <h3 className="text-lg font-bold font-outfit mb-6 flex items-center gap-3">
                                <Trophy className="w-5 h-5 text-yellow-500" />
                                Your Stats
                            </h3>
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 text-sm font-medium">Solved Overall</span>
                                    <span className="text-white font-bold">124</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 text-sm font-medium">Current Streak</span>
                                    <span className="text-orange-500 font-bold">7 Days</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Global Rank</span>
                                    <span className="text-indigo-400 font-bold">#4,201</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
