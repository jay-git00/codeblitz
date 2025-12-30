import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
    try {
        const emailUser = process.env.EMAIL_USER;
        const emailPassword = process.env.EMAIL_PASSWORD;

        // Check if credentials exist
        if (!emailUser || !emailPassword) {
            return NextResponse.json({
                success: false,
                error: "EMAIL_USER or EMAIL_PASSWORD not found in .env file",
                emailUser: emailUser ? "✓ Set" : "✗ Missing",
                emailPassword: emailPassword ? "✓ Set" : "✗ Missing",
            });
        }

        // Try to create transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: emailUser,
                pass: emailPassword,
            },
        });

        // Verify connection
        await transporter.verify();

        return NextResponse.json({
            success: true,
            message: "Email configuration is working!",
            emailUser: emailUser,
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
            hint: "Make sure you're using a Gmail App Password, not your regular password. Get it from: https://myaccount.google.com/apppasswords",
        });
    }
}
