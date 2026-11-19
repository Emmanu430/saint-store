    import { NextResponse } from "next/server";
    import { auth } from "@/auth";
    import { prisma } from "@/lib/prisma";

    export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

    const { id } = await params;
    const { quantity } = await req.json();

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
        return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
    }

    const { count } = await prisma.cartItem.updateMany({
        where: { id: Number(id), userId: Number(session.user.id) },
        data: { quantity },
    });
    if (!count) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ success: true });
    }

    export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

    const { id } = await params;

    const { count } = await prisma.cartItem.deleteMany({
        where: { id: Number(id), userId: Number(session.user.id) },
    });
    if (!count) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ success: true });
}