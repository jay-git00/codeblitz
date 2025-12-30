import { getUpcomingContests } from "@/lib/contests";
import { Calendar as CalendarIcon, ExternalLink, Plus, MapPin, Clock, ArrowRight } from "lucide-react";
import { format } from "date-fns";

export default async function CalendarPage() {
    const contests = await getUpcomingContests();

    const getPlatformInfo = (host: string) => {
        if (host.includes("codeforces")) return { color: "text-blue-400 bg-blue-400/10 border-blue-400/20", label: "Codeforces" };
        if (host.includes("atcoder")) return { color: "text-red-400 bg-red-400/10 border-red-400/20", label: "AtCoder" };
        if (host.includes("leetcode")) return { color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20", label: "LeetCode" };
        if (host.includes("codechef")) return { color: "text-orange-400 bg-orange-400/10 border-orange-400/20", label: "CodeChef" };
        return { color: "text-slate-400 bg-slate-400/10 border-slate-400/20", label: host.split(".")[0] };
    };

    const getGoogleCalendarUrl = (contest: any) => {
        const start = contest.start.replace(/[-:]/g, "").split(".")[0] + "Z";
        const end = contest.end.replace(/[-:]/g, "").split(".")[0] + "Z";
        return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(contest.event)}&dates=${start}/${end}&details=Participate+here:+${encodeURIComponent(contest.href)}&location=Online&sf=true&output=xml`;
    };

    return (
        <div className="pt-32 pb-20 px-4 md:px-8 max-w-6xl mx-auto min-h-screen">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 animate-fade-in">
                <div className="max-w-2xl">
                    <h1 className="text-5xl md:text-7xl font-black font-outfit tracking-tighter mb-4 uppercase">
                        Contest <span className="text-indigo-500">Pulse</span>
                    </h1>
                    <p className="text-slate-400 text-xl leading-relaxed">
                        The beating heart of competitive programming. Synchronize your schedule with every major platform.
                    </p>
                </div>

                <div className="flex bg-slate-900/50 p-2 rounded-2xl border border-white/5 backdrop-blur-md">
                    <button className="px-6 py-3 rounded-xl bg-indigo-600 text-sm font-black shadow-lg shadow-indigo-500/10">CHRONOLOGICAL</button>
                    <button className="px-6 py-3 rounded-xl text-slate-500 text-sm font-bold hover:text-white transition-all">BY PLATFORM</button>
                </div>
            </div>

            <div className="grid gap-6">
                {contests.length === 0 ? (
                    <div className="text-center py-32 bg-slate-900/20 border border-white/5 rounded-[3rem] backdrop-blur-sm">
                        <CalendarIcon className="w-16 h-16 text-slate-700 mx-auto mb-6" />
                        <p className="text-slate-500 text-xl font-bold">The arena is quiet... for now.</p>
                    </div>
                ) : (
                    contests.map((contest, idx) => {
                        const platform = getPlatformInfo(contest.host);
                        return (
                            <div
                                key={contest.id}
                                className="group relative p-8 md:p-12 rounded-[2.5rem] bg-slate-900/40 border border-white/5 hover:border-indigo-500/30 transition-all duration-500 animate-fade-in"
                                style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center gap-10">
                                    {/* Date Column */}
                                    <div className="flex-shrink-0 lg:w-32 lg:text-center">
                                        <div className="text-sm font-black text-slate-500 uppercase tracking-[0.2em] mb-1">
                                            {format(new Date(contest.start), "MMM")}
                                        </div>
                                        <div className="text-5xl font-black font-outfit text-white leading-none">
                                            {format(new Date(contest.start), "dd")}
                                        </div>
                                    </div>

                                    <div className="flex-1 space-y-4">
                                        <div className="flex flex-wrap items-center gap-4">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${platform.color}`}>
                                                {platform.label}
                                            </span>
                                            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                                <Clock className="w-4 h-4" />
                                                {format(new Date(contest.start), "hh:mm aa")}
                                            </div>
                                        </div>

                                        <h3 className="text-2xl md:text-3xl font-bold font-outfit text-slate-200 group-hover:text-white transition-colors">
                                            {contest.event}
                                        </h3>

                                        <div className="flex items-center gap-6 text-sm font-bold text-slate-500">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-indigo-500/50" />
                                                <span>Duration: {Math.round((new Date(contest.end).getTime() - new Date(contest.start).getTime()) / 3600000)}h</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-purple-500/50" />
                                                <span>Online Arena</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 lg:flex-row">
                                        <a
                                            href={getGoogleCalendarUrl(contest)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/30 transition-all hover:scale-105"
                                            title="Add to Calendar"
                                        >
                                            <Plus className="w-6 h-6" />
                                        </a>
                                        <a
                                            href={contest.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-white text-slate-950 font-black hover:bg-slate-200 transition-all shadow-xl shadow-white/5 uppercase tracking-wider text-sm"
                                        >
                                            Register Now
                                            <ArrowRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
