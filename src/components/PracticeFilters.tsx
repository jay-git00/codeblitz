"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function PracticeFilters({
    selectedPlatform,
    searchQuery,
    selectedSort
}: {
    selectedPlatform: string;
    searchQuery: string;
    selectedSort: string;
}) {
    const router = useRouter();

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSort = e.target.value;
        router.push(`/practice?platform=${selectedPlatform}&q=${searchQuery}&sort=${newSort}`);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
                <form action="/practice" className="relative flex-1">
                    <input type="hidden" name="platform" value={selectedPlatform} />
                    <input type="hidden" name="sort" value={selectedSort} />
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                        type="text"
                        name="q"
                        defaultValue={searchQuery}
                        placeholder="Search by title, tag, or ID..."
                        className="w-full bg-slate-900/50 border border-white/10 rounded-[1.5rem] py-4 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all font-medium"
                    />
                    {searchQuery && (
                        <Link
                            href={`/practice?platform=${selectedPlatform}&sort=${selectedSort}`}
                            className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 hover:text-white"
                        >
                            CLEAR
                        </Link>
                    )}
                </form>

                <div className="flex items-center">
                    <select
                        name="sort"
                        defaultValue={selectedSort}
                        onChange={handleSortChange}
                        className="bg-slate-900 border border-white/10 rounded-[1.5rem] px-8 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/40 appearance-none cursor-pointer"
                    >
                        <option value="diff_asc">Difficulty: Low to High</option>
                        <option value="diff_desc">Difficulty: High to Low</option>
                    </select>
                </div>
            </div>

            {/* Platform Shortcuts */}
            <div className="flex flex-wrap gap-3">
                <PlatformTab label="All Platforms" value="all" active={selectedPlatform === "all"} searchQuery={searchQuery} sort={selectedSort} />
                <PlatformTab label="Codeforces" value="codeforces" active={selectedPlatform === "codeforces"} searchQuery={searchQuery} sort={selectedSort} />
                <PlatformTab label="AtCoder" value="atcoder" active={selectedPlatform === "atcoder"} searchQuery={searchQuery} sort={selectedSort} />
                <PlatformTab label="LeetCode" value="leetcode" active={selectedPlatform === "leetcode"} searchQuery={searchQuery} sort={selectedSort} />
                <PlatformTab label="CodeChef" value="codechef" active={selectedPlatform === "codechef"} searchQuery={searchQuery} sort={selectedSort} />
            </div>
        </div>
    );
}

export function PlatformTab({ label, value, active, searchQuery, sort }: { label: string; value: string; active: boolean; searchQuery: string; sort: string }) {
    return (
        <Link
            href={`/practice?platform=${value}${searchQuery ? `&q=${searchQuery}` : ''}${sort ? `&sort=${sort}` : ''}`}
            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all border ${active
                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                : "bg-slate-900/50 border-white/5 text-slate-500 hover:text-white hover:border-white/20"
                }`}
        >
            {label}
        </Link>
    );
}
