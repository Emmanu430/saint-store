    import { PrismaClient } from "@prisma/client";

    const prisma = new PrismaClient();

    async function main() {
    const products = [
        { name: "Halo Hoodie", detail: "Obsidian · Embroidered", price: 98, category: "Hoodies", badge: "New" },
        { name: "Motion Tee", detail: "Ivory · Puff Print", price: 48, category: "Tees" },
        { name: "Grind Crewneck", detail: "Charcoal · Woven Label", price: 88, category: "Hoodies", badge: "Best Seller" },
        { name: "Legacy Jacket", detail: "Obsidian · Silver Hardware", price: 168, category: "Outerwear" },
        { name: "Faith Cap", detail: "Ivory · Debossed", price: 38, category: "Accessories" },
        { name: "Purpose Shorts", detail: "Charcoal · Reflective Trim", price: 58, category: "Accessories" },
    ];

    for (const p of products) {
        await prisma.product.create({ data: p });
    }

    console.log("Seeded products.");
    }

    main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
