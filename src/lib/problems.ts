export interface Problem {
    id: string;
    title: string;
    difficulty: number | string;
    platform: string;
    tags: string[];
    url: string;
    solvedCount?: number;
}

// In-memory cache for development to avoid huge re-fetches
let cfCache: Problem[] | null = null;
let lastFetch = 0;
const CACHE_TTL = 3600 * 1000; // 1 hour

export async function getProblems(
    platform: string = "all",
    query: string = "",
    sort: string = "diff_asc",
    limit: number = 100
): Promise<Problem[]> {
    let problems: Problem[] = [];

    // Codeforces Fetching
    if (platform === "all" || platform === "codeforces") {
        const now = Date.now();
        if (cfCache && (now - lastFetch < CACHE_TTL)) {
            problems.push(...cfCache);
        } else {
            try {
                const cfRes = await fetch("https://codeforces.com/api/problemset.problems", {
                    cache: 'no-store'
                });
                const cfData = await cfRes.json();
                if (cfData.status === "OK") {
                    const cfProblems = cfData.result.problems.map((p: any) => ({
                        id: `${p.contestId}${p.index}`,
                        title: p.name,
                        platform: "Codeforces",
                        difficulty: p.rating || 0,
                        tags: p.tags || [],
                        url: `https://codeforces.com/problemset/problem/${p.contestId}/${p.index}`,
                    }));
                    cfCache = cfProblems;
                    lastFetch = now;
                    problems.push(...cfProblems);
                }
            } catch (error) {
                console.error("Failed to fetch Codeforces problems", error);
                if (cfCache) problems.push(...cfCache); // Fallback to stale cache
            }
        }
    }

    // AtCoder (Mock data - replace with real API if available)
    if (platform === "all" || platform === "atcoder") {
        problems.push({
            id: "abc001_a",
            title: "Sample AtCoder Problem",
            platform: "AtCoder",
            difficulty: 800,
            tags: ["implementation"],
            url: "https://atcoder.jp/contests/abc001/tasks/abc001_a",
        });
    }

    // LeetCode (Mock data - LeetCode doesn't have a public API)
    if (platform === "all" || platform === "leetcode") {
        problems.push({
            id: "two-sum",
            title: "Two Sum",
            platform: "LeetCode",
            difficulty: 1200,
            tags: ["array", "hash-table"],
            url: "https://leetcode.com/problems/two-sum/",
        });
    }

    // Filter by Search Query
    if (query) {
        const q = query.toLowerCase();
        problems = problems.filter(p =>
            p.title.toLowerCase().includes(q) ||
            p.tags.some(t => t.toLowerCase().includes(q))
        );
    }

    // Apply sorting
    if (sort === "diff_asc") {
        problems.sort((a, b) => a.difficulty as number - (b.difficulty as number));
    } else if (sort === "diff_desc") {
        problems.sort((a, b) => b.difficulty as number - (a.difficulty as number));
    }

    // Apply limit for better performance
    return problems.slice(0, limit);
}
