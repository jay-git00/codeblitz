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
                        solved: false,
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

    // AtCoder Mock Data
    if (platform === "all" || platform === "atcoder") {
        problems.push(
            { id: "at-abc350-d", title: "ABC 350 - D: New Friends", difficulty: 1050, platform: "AtCoder", tags: ["Graph"], url: "..." },
            { id: "at-abc351-c", title: "Merge the balls", difficulty: 800, platform: "AtCoder", tags: ["Stack"], url: "..." }
        );
    }

    // LeetCode Mock Data
    if (platform === "all" || platform === "leetcode") {
        problems.push(
            { id: "lc-1", title: "Two Sum", difficulty: 400, platform: "LeetCode", tags: ["Array"], url: "..." },
            { id: "lc-2", title: "Add Two Numbers", difficulty: 1200, platform: "LeetCode", tags: ["Math"], url: "..." }
        );
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
