    import { NextResponse } from "next/server";
    import { auth } from "@/auth";
    import { prisma } from "@/lib/prisma";

    export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

    const { id } = await params;
    const { quantity } = await req.json();

    await prisma.cartItem.update({
        where: { id: Number(id) },
        data: { quantity },
    });

    return NextResponse.json({ success: true });
    }

    export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

    const { id } = await params;

    await prisma.cartItem.delete({ where: { id: Number(id) } });

    return NextResponse.json({ success: true });
}