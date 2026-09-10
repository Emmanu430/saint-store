    import { PrismaClient } from "@prisma/client";

    const prisma = new PrismaClient();

    async function main() {
    await prisma.cartItem.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();

    const products = [
        {
        name: "Saint Blessed Tees",
        detail: "Ivory · Puff Print",
        price: 48,
        category: "Tees",
        badge: "New",
        image: "/products/img3.jpg",
        },
        {
        name: "Saint Swag Polo",
        detail: "Obsidian · Embroidered",
        price: 68,
        category: "Tees",
        image: "/products/img2.jpg",
        },
        {
        name: "Saint Rogue Sweat Jorts",
        detail: "Charcoal · Reflective Trim",
        price: 58,
        category: "Shorts",
        badge: "Best Seller",
        image: "/products/img1.jpg",
        },
        {
        name: "Saint Skull Cap",
        detail: "Obsidian · Debossed",
        price: 38,
        category: "Accessories",
        image: "/products/img4.jpg",
        },
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
