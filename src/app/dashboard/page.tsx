import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
    Trophy,
    Flame,
    Target,
    History,
    ChevronRight,
    TrendingUp,
    Clock,
    CheckCircle2
} from "lucide-react";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/auth/login");
    }

    const user = session.user as any;

    return (
        <div className="pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="mb-12">
                <h1 className="text-4xl font-bold font-outfit mb-2">Welcome back, {user.name || user.username || "Coder"}!</h1>
                <p className="text-slate-400">Here&apos;s your progress for today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard
                    icon={<Flame className="w-5 h-5 text-orange-500" />}
                    label="Current Streak"
                    value="7 Days"
                    footer="Personal best: 14 days"
                />
                <StatCard
                    icon={<CheckCircle2 className="w-5 h-5 text-green-500" />}
                    label="Problems Solved"
                    value="124"
                    footer="+12 this week"
                />
                <StatCard
                    icon={<Target className="w-5 h-5 text-indigo-500" />}
                    label="Next Milestone"
                    value="Grandmaster"
                    footer="150 ratings to go"
                />
                <StatCard
                    icon={<Trophy className="w-5 h-5 text-yellow-500" />}
                    label="Rank"
                    value="#420"
                    footer="Top 5% of users"
                />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold font-outfit">Recent Activity</h2>
                        <button className="text-sm font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                            View All <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-2">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-green-400">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold">Sum of Three Values</h4>
                                        <p className="text-xs text-slate-500">Solved 2 hours ago • Codeforces</p>
                                    </div>
                                </div>
                                <div className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded">
                                    800
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recommended Contests */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold font-outfit">Upcoming for You</h2>
                    <div className="space-y-4">
                        {[1, 2].map((i) => (
                            <div key={i} className="p-6 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
                                <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Tomorrow</div>
                                <h4 className="font-bold mb-4">Codeforces Round #960</h4>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-400 flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> 2:30 PM
                                    </span>
                                    <button className="px-4 py-2 bg-indigo-600 rounded-xl text-xs font-bold hover:bg-indigo-500 transition-colors">
                                        Set Reminder
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value, footer }: { icon: React.ReactNode, label: string, value: string, footer: string }) {
    return (
        <div className="p-6 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-indigo-500/30 transition-all group">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {icon}
                </div>
                <span className="text-sm font-medium text-slate-400">{label}</span>
            </div>
            <div className="text-3xl font-bold font-outfit mb-2">{value}</div>
            <div className="text-xs text-slate-500">{footer}</div>
        </div>
    );
}
