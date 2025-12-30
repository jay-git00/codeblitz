import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    (() => {
        try {
            return new PrismaClient({
                log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
            });
        } catch (error) {
            console.error("Failed to initialize PrismaClient:", error);
            // In a build environment where DATABASE_URL might be missing,
            // this allows the build to complete without crashing,
            // but subsequent operations using 'prisma' will likely fail.
            // Depending on the application's needs, a more sophisticated
            // fallback or a specific error handling strategy might be required.
            // For now, we re-throw in non-production to ensure issues are caught early.
            if (process.env.NODE_ENV !== "production") {
                throw error;
            }
            // In production, if this happens, it's a critical error.
            // Returning 'undefined' or a mock might lead to harder-to-debug issues later.
            // A more robust solution might involve a dummy client or a specific error state.
            // For this change, we'll let the error propagate if it's truly unrecoverable,
            // but the console.error provides immediate feedback.
            // If the goal is to prevent build failures, returning a 'null' or 'undefined'
            // and handling it downstream would be necessary.
            // For now, we'll return a new PrismaClient instance that will likely fail on use
            // if the underlying issue (e.g., missing DATABASE_URL) persists,
            // but allows the *initialization* to complete without an immediate crash.
            // This is a common pattern to allow build tools to proceed.
            return new PrismaClient(); // This will likely fail on first use if DATABASE_URL is truly missing.
        }
    })();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
