    import { auth } from "@/auth";
    import { prisma } from "@/lib/prisma";
    import CartClient from "./CartClient";
    import { redirect } from "next/navigation";

    export default async function CartPage() {
    const session = await auth();
    if (!session?.user?.id) redirect("/login");

    const items = await prisma.cartItem.findMany({
        where: { userId: Number(session.user.id) },
        include: { product: true },
    });

    return <CartClient initialItems={items} />;
}