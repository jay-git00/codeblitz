import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, password, username, name } = await req.json();

        if (!email || !password || !username) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                username,
                name: name || username,
            },
        });

        return NextResponse.json(
            { message: "User created successfully", user: { id: user.id } },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Registration error details:", error);

        // Check for Prisma connection errors
        if (error.message?.includes("connection") || error.message?.includes("DNS resolution")) {
            return NextResponse.json(
                { error: "Database connection failed. Please check your DATABASE_URL in the .env file." },
                { status: 503 }
            );
        }

        return NextResponse.json(
            { error: "Internal server error during registration" },
            { status: 500 }
        );
    }
}
