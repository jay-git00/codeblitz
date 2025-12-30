export interface Contest {
    id: number;
    event: string;
    host: string;
    href: string;
    start: string;
    end: string;
}

export async function getUpcomingContests(): Promise<Contest[]> {
    const username = process.env.CLIST_USERNAME;
    const apiKey = process.env.CLIST_API_KEY;

    if (!username || !apiKey) {
        console.warn("Clist credentials missing, using mock data");
        return getMockContests();
    }

    try {
        const now = new Date().toISOString();
        const url = `https://clist.by/api/v2/contest/?order_by=start&start__gt=${now}&limit=50&username=${username}&api_key=${apiKey}`;

        const res = await fetch(url, { next: { revalidate: 3600 } });
        if (!res.ok) throw new Error("Failed to fetch contests");

        const data = await res.json();
        return data.objects.map((obj: any) => ({
            id: obj.id,
            event: obj.event,
            host: obj.host,
            href: obj.href,
            start: obj.start,
            end: obj.end,
        }));
    } catch (error) {
        console.error("Error fetching contests:", error);
        return getMockContests();
    }
}

function getMockContests(): Contest[] {
    const now = new Date();
    return [
        {
            id: 1,
            event: "Codeforces Round #950 (Div. 2)",
            host: "codeforces.com",
            href: "https://codeforces.com/contests",
            start: new Date(now.getTime() + 86400000).toISOString(),
            end: new Date(now.getTime() + 86400000 + 7200000).toISOString(),
        },
        {
            id: 2,
            event: "AtCoder Beginner Contest 350",
            host: "atcoder.jp",
            href: "https://atcoder.jp/contests",
            start: new Date(now.getTime() + 172800000).toISOString(),
            end: new Date(now.getTime() + 172800000 + 6000000).toISOString(),
        },
        {
            id: 3,
            event: "LeetCode Weekly Contest 400",
            host: "leetcode.com",
            href: "https://leetcode.com/contest",
            start: new Date(now.getTime() + 259200000).toISOString(),
            end: new Date(now.getTime() + 259200000 + 5400000).toISOString(),
        },
    ];
}
