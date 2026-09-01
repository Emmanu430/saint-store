    import { NextResponse } from "next/server";
    import { auth } from "@/auth";
    import { prisma } from "@/lib/prisma";

    export async function GET() {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ count: 0 });

    const items = await prisma.cartItem.findMany({
        where: { userId: Number(session.user.id) },
    });

    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    return NextResponse.json({ count });
}