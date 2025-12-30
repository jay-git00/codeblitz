import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        // Generate a 6-digit OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

        // Store OTP in database
        await prisma.verificationCode.deleteMany({
            where: { email }
        });

        await prisma.verificationCode.create({
            data: {
                email,
                code: otp,
                expires,
            },
        });

        // Check if Resend API key is configured
        const resendApiKey = process.env.RESEND_API_KEY;
        const isEmailConfigured = resendApiKey && !resendApiKey.includes('your-');

        if (isEmailConfigured) {
            try {
                const resend = new Resend(resendApiKey);

                await resend.emails.send({
                    from: 'CodeBlitz <onboarding@resend.dev>', // Use your verified domain later
                    to: email,
                    subject: 'Your CodeBlitz Verification Code',
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0f172a; color: #e2e8f0; border-radius: 10px;">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h1 style="color: #818cf8; margin: 0;">CodeBlitz</h1>
                                <p style="color: #94a3b8; margin-top: 10px;">Competitive Programming Portal</p>
                            </div>
                            
                            <div style="background-color: #1e293b; padding: 30px; border-radius: 8px; text-align: center;">
                                <h2 style="color: #f1f5f9; margin-top: 0;">Email Verification</h2>
                                <p style="color: #cbd5e1; margin-bottom: 30px;">Your verification code is:</p>
                                
                                <div style="background-color: #312e81; padding: 20px; border-radius: 8px; margin: 20px 0;">
                                    <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #818cf8;">${otp}</span>
                                </div>
                                
                                <p style="color: #94a3b8; font-size: 14px; margin-top: 30px;">
                                    This code will expire in 10 minutes.
                                </p>
                                <p style="color: #94a3b8; font-size: 14px;">
                                    If you didn't request this code, please ignore this email.
                                </p>
                            </div>
                            
                            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #334155;">
                                <p style="color: #64748b; font-size: 12px; margin: 0;">
                                    © 2025 CodeBlitz. All rights reserved.
                                </p>
                            </div>
                        </div>
                    `,
                });

                console.log(`✅ OTP sent to ${email}: ${otp}`);

                return NextResponse.json(
                    { message: "Verification code sent successfully" },
                    { status: 200 }
                );
            } catch (emailError: any) {
                console.error("Email send error:", emailError);
                // Fall through to development mode
            }
        }

        // Development mode: Return OTP in response
        console.log(`\n==========================================`);
        console.log(`🔧 DEVELOPMENT MODE - Email not configured`);
        console.log(`VERIFICATION CODE FOR ${email}: ${otp}`);
        console.log(`==========================================\n`);

        return NextResponse.json(
            {
                message: "Development mode: OTP generated",
                devMode: true,
                otp: otp,
                hint: "Configure RESEND_API_KEY in .env for real email delivery. Get it from https://resend.com"
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("OTP send error:", error);
        return NextResponse.json(
            { error: "Failed to send verification code." },
            { status: 500 }
        );
    }
}
