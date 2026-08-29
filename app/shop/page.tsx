    "use client";
    import { useState } from "react";

    const categories = ["All", "Hoodies", "Tees", "Outerwear", "Accessories"];

    const products = [
    { name: "Halo Hoodie", detail: "Obsidian · Embroidered", price: 98, category: "Hoodies", badge: "New" },
    { name: "Motion Tee", detail: "Ivory · Puff Print", price: 48, category: "Tees" },
    { name: "Grind Crewneck", detail: "Charcoal · Woven Label", price: 88, category: "Hoodies", badge: "Best Seller" },
    { name: "Legacy Jacket", detail: "Obsidian · Silver Hardware", price: 168, category: "Outerwear" },
    { name: "Faith Cap", detail: "Ivory · Debossed", price: 38, category: "Accessories" },
    { name: "Purpose Shorts", detail: "Charcoal · Reflective Trim", price: 58, category: "Accessories" },
    ];

    export default function Shop() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filtered =
        activeCategory === "All"
        ? products
        : products.filter((p) => p.category === activeCategory);

    return (
        <main className="pt-28 pb-24 px-[6vw] bg-obsidian text-ivory min-h-screen">
        <div className="border-b border-ivory/10 pb-10 mb-8">
            <span className="text-xs tracking-[0.3em] uppercase text-burgundy-bright font-bold">
            Full Collection
            </span>
            <h1 className="font-display text-5xl sm:text-6xl mt-3">Shop SAINT</h1>
            <p className="text-ivory-dim text-sm mt-3 max-w-md">
            Every piece is built around one line: the motion never ends.
            </p>
        </div>

        <div className="flex flex-wrap gap-2.5 mb-10">
            {categories.map((cat) => (
            <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4.5 py-2 rounded-full border text-xs tracking-widest uppercase transition-colors ${
                activeCategory === cat
                    ? "bg-ivory text-obsidian border-ivory"
                    : "border-ivory/20 text-ivory-dim hover:bg-ivory hover:text-obsidian"
                }`}
            >
                {cat}
            </button>
            ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filtered.map((p) => (
            <div key={p.name} className="cursor-pointer group">
                <div className="aspect-[4/5] bg-charcoal border border-ivory/10 flex items-center justify-center relative">
                {p.badge && (
                    <span className="absolute top-3.5 left-3.5 text-[10px] tracking-wide uppercase bg-burgundy px-2.5 py-1">
                    {p.badge}
                    </span>
                )}
                <span className="font-display text-6xl text-ivory/15 group-hover:text-ivory/30 transition-colors">
                    ☨
                </span>
                </div>
                <div className="flex justify-between items-start mt-3.5">
                <div>
                    <b className="text-sm">{p.name}</b>
                    <span className="block text-xs text-ivory-dim">{p.detail}</span>
                </div>
                <span className="text-sm font-bold">${p.price}</span>
                </div>
            </div>
            ))}
        </div>
        </main>
    );
}