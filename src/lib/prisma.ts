import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

// Only initialize Prisma if DATABASE_URL is available
export const prisma = globalForPrisma.prisma || (() => {
    if (!process.env.DATABASE_URL) {
        console.warn("DATABASE_URL not found. Prisma client will not be initialized.");
        return undefined as any;
    }
    return new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
})();

if (process.env.NODE_ENV !== "production" && prisma) {
    globalForPrisma.prisma = prisma;
}
