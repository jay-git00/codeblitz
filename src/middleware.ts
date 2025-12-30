export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/practice/:path*",
        "/calendar/:path*",
        "/ladder/:path*",
        "/leaderboard/:path*",
        "/dashboard/:path*",
    ],
};
