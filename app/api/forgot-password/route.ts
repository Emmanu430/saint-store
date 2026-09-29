    import { NextResponse } from "next/server";
    import { prisma } from "@/lib/prisma";
    import { transporter } from "@/lib/mailer";
    import crypto from "crypto";

    export async function POST(req: Request) {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });

    // Always return success even if user not found — avoids leaking which emails are registered
    if (!user) {
        return NextResponse.json({ success: true });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 1000 * 60 * 30); // 30 min

    await prisma.user.update({
        where: { email },
        data: { resetToken: token, resetTokenExpiry: expiry },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

    await transporter.sendMail({
        from: `"SAINT" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Reset your SAINT password",
        html: `
        <p>You requested a password reset.</p>
        <p><a href="${resetUrl}">Click here to reset your password</a></p>
        <p>This link expires in 30 minutes. If you didn't request this, ignore this email.</p>
        `,
    });

    return NextResponse.json({ success: true });
}