import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { itemId, type, title, platform, url } = await req.json();
        const userId = (session.user as any).id;

        const existingFavorite = await prisma.favorite.findUnique({
            where: {
                userId_itemId_type: {
                    userId,
                    itemId,
                    type,
                },
            },
        });

        if (existingFavorite) {
            await prisma.favorite.delete({
                where: { id: existingFavorite.id },
            });
            return NextResponse.json({ message: "Removed from favorites", action: "removed" });
        } else {
            await prisma.favorite.create({
                data: {
                    userId,
                    itemId,
                    type,
                    title,
                    platform,
                    url,
                },
            });
            return NextResponse.json({ message: "Added to favorites", action: "added" });
        }
    } catch (error: any) {
        console.error("Favorite toggle error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = (session.user as any).id;
        const favorites = await prisma.favorite.findMany({
            where: { userId },
        });

        return NextResponse.json({ favorites });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
