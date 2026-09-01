    import { NextResponse } from "next/server";
    import { auth } from "@/auth";
    import { prisma } from "@/lib/prisma";

    export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    const { productId } = await req.json();

    const existing = await prisma.cartItem.findUnique({
        where: {
        userId_productId: {
            userId: Number(session.user.id),
            productId,
        },
        },
    });

    if (existing) {
        await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + 1 },
        });
    } else {
        await prisma.cartItem.create({
        data: {
            userId: Number(session.user.id),
            productId,
            quantity: 1,
        },
        });
    }

    return NextResponse.json({ success: true });
}