    import { NextResponse } from "next/server";
    import { auth } from "@/auth";
    import { prisma } from "@/lib/prisma";

    export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    const { productId, size = "", color = "" } = await req.json();
    const userId = Number(session.user.id);

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    if (
        (product.sizes.length && !product.sizes.includes(size)) ||
        (product.colors.length && !product.colors.includes(color))
    ) {
        return NextResponse.json({ error: "Invalid size or color" }, { status: 400 });
    }

    const existing = await prisma.cartItem.findUnique({
        where: { userId_productId_size_color: { userId, productId, size, color } },
    });

    if (existing) {
        await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + 1 },
        });
    } else {
        await prisma.cartItem.create({
        data: { userId, productId, size, color, quantity: 1 },
        });
    }

    return NextResponse.json({ success: true });
}

export async function DELETE() {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    await prisma.cartItem.deleteMany({
        where: { userId: Number(session.user.id) },
    });

    return NextResponse.json({ success: true });
}