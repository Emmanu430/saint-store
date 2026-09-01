    "use client";
    import { useState } from "react";
    import { useRouter } from "next/navigation";
    import { useSession } from "next-auth/react";

    const categories = ["All", "Hoodies", "Tees", "Outerwear", "Accessories"];

    type Product = {
    id: number;
    name: string;
    detail: string;
    price: number;
    category: string;
    badge: string | null;
    };

    export default function ShopClient({ products }: { products: Product[] }) {
    const [activeCategory, setActiveCategory] = useState("All");
    const { data: session } = useSession();
    const [toast, setToast] = useState("");
    const router = useRouter();

    const filtered =
        activeCategory === "All"
        ? products
        : products.filter((p) => p.category === activeCategory);

    const addToCart = async (productId: number, name: string) => {
        if (!session) {
        router.push("/login");
        return;
        }

        const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
        });

        if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.error("Add to cart failed:", res.status, data);
        setToast(data.error || "Couldn't add to cart");
        setTimeout(() => setToast(""), 2500);
        return;
        }

        setToast(`${name} added to cart`);
        window.dispatchEvent(new Event("cart-updated"));
        setTimeout(() => setToast(""), 2500);
    };

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
            <div key={p.id} className="group">
                <div className="aspect-4/5 bg-charcoal border border-ivory/10 flex items-center justify-center relative">
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
                <button
                onClick={() => addToCart(p.id, p.name)}
                className="w-full mt-3 border border-ivory/20 py-2.5 text-[11px] tracking-widest uppercase hover:bg-ivory hover:text-obsidian transition-colors cursor-pointer"
                >
                Add to Cart
                </button>
            </div>
            ))}
        </div>

        {toast && (
            <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-ivory text-obsidian px-5 py-3 text-sm font-semibold shadow-lg z-[60]">
            {toast}
            </div>
        )}
        </main>
    );
}