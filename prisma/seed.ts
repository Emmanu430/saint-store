    import { PrismaClient } from "@prisma/client";

    const prisma = new PrismaClient();

    async function main() {
    await prisma.cartItem.deleteMany();
    await prisma.product.deleteMany();

    const products = [
        {
        name: "Saint Blessed Tees",
        detail: "Ivory · Puff Print",
        price: 12000,
        category: "Tees",
        badge: "New",
        image: "/products/img3.jpg",
        colors: ["White", "Black"],
        },
        {
        name: "Saint Swag Polo",
        detail: "Obsidian · Embroidered",
        price: 25000,
        category: "Polo",
        image: "/products/img2.jpg",
        colors: ["Black", "White", "Green"],
        },
        {
        name: "Saint Rogue Sweat Jorts",
        detail: "Charcoal · Reflective Trim",
        price: 20000,
        category: "Shorts",
        badge: "Best Seller",
        image: "/products/img1.jpg",
        colors: ["Camo", "Leopard", "Red Leopard"],
        },
        {
        name: "Saint Long Sleeve",
        detail: "Obsidian · Ribbed Cuffs",
        price: 30000,
        category: "Polo",
        image: "/products/img4.jpg",
        colors: ["Black", "White"],
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
