    "use client";
    import { useState } from "react";
    import { useRouter } from "next/navigation";
    import { useSession } from "next-auth/react";
    import Image from "next/image";
    import { ShoppingCart  } from "lucide-react";
    import Toast from "@/components/Toast";
    import Reveal from "@/components/Reveal";
    import { ShoppingBag, Check } from "lucide-react";

    const categories = ["All", "Tees", "Shorts", "Polo"];

    type Product = {
    id: number;
    name: string;
    detail: string;
    price: number;
    category: string;
    badge: string | null;
    image: string | null;
    colors: string[];
    sizes: string[];
    };

    type Selection = { size?: string; color?: string };

    // no options -> "", one option -> auto-picked, several -> whatever the user chose (or undefined)
    const resolve = (options: string[], chosen?: string) =>
    options.length === 0 ? "" : chosen ?? (options.length === 1 ? options[0] : undefined);

    export default function ShopClient({ products }: { products: Product[] }) {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selection, setSelection] = useState<Record<number, Selection>>({});
    const { data: session } = useSession();
    const [toast, setToast] = useState("");
    const [justAdded, setJustAdded] = useState<number | null>(null);
    const router = useRouter();

    const filtered =
        activeCategory === "All"
        ? products
        : products.filter((p) => p.category === activeCategory);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(""), 2500);
    };

    const pick = (id: number, key: "size" | "color", value: string) =>
        setSelection((prev) => ({ ...prev, [id]: { ...prev[id], [key]: value } }));

    const addToCart = async (p: Product) => {
        if (!session) {
        setJustAdded(p.id);
        setTimeout(() => setJustAdded((cur) => (cur === p.id ? null : cur)), 1400);
        router.push("/login");
        return;
        }

        const sel = selection[p.id] ?? {};
        const size = resolve(p.sizes, sel.size);
        const color = resolve(p.colors, sel.color);

        const missing = [size === undefined && "size", color === undefined && "color"]
        .filter(Boolean)
        .join(" and ");
        if (missing) {
        showToast(`Please select a ${missing}`);
        return;
        }

        const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: p.id, size, color }),
        });

        if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.error("Add to cart failed:", res.status, data);
        showToast(data.error || "Couldn't add to cart");
        return;
        }

        showToast(`${p.name} added to cart`);
        window.dispatchEvent(new Event("cart-updated"));
    };

    const chip = (active: boolean) =>
    `px-2 py-1 text-[10px] tracking-wide uppercase border transition-colors cursor-pointer ${
        active
        ? "bg-ivory text-obsidian border-ivory"
        : "border-ivory/20 text-ivory-dim hover:border-ivory/60"
    }`;

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

        {filtered.length === 0 ? (
            <div className="flex flex-col items-center text-center py-24">
            <span className="font-display text-5xl text-ivory/15 mb-4">☨</span>
            <p className="text-ivory font-semibold mb-1">Nothing here yet</p>
            <p className="text-ivory-dim text-sm">No pieces in this category right now — check back soon.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p, i) => {
                const sel = selection[p.id] ?? {};
                const selectedColor = resolve(p.colors, sel.color);
                const selectedSize = resolve(p.sizes, sel.size);

                return (
                <Reveal key={p.id} delay={(i % 3) * 100} className="h-full">
                    <div className="group flex h-full flex-col transition-transform duration-300 hover:-translate-y-1">
                    <div className="aspect-4/5 bg-charcoal border border-ivory/10 relative overflow-hidden">
                        {p.image ? (
                        <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                        ) : (
                        <span className="flex items-center justify-center h-full font-display text-6xl text-ivory/15">
                            ☨
                        </span>
                        )}
                    </div>

                    <div className="flex justify-between items-start mt-3.5">
                        <div>
                        <b className="text-sm">{p.name}</b>
                        <span className="block text-xs text-ivory-dim">{p.detail}</span>
                        </div>
                        <span className="text-sm font-bold">₦{p.price.toLocaleString()}</span>
                    </div>

                    {p.colors.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                        {p.colors.map((c) => (
                            <button
                            key={c}
                            type="button"
                            onClick={() => pick(p.id, "color", c)}
                            className={chip(selectedColor === c)}
                            >
                            {c}
                            </button>
                        ))}
                        </div>
                    )}

                    {p.sizes.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                        {p.sizes.map((s) => (
                            <button
                            key={s}
                            type="button"
                            onClick={() => pick(p.id, "size", s)}
                            className={`${chip(selectedSize === s)} min-w-9 text-center`}
                            >
                            {s}
                            </button>
                        ))}
                        </div>
                    )}

                    <div className="mt-auto pt-3">
                        <button
                            onClick={() => addToCart(p)}
                            className={`w-full flex items-center justify-center gap-2 border py-2.5 text-[11px] tracking-widest uppercase transition-all duration-300 active:scale-[0.98] cursor-pointer ${
                            justAdded === p.id
                                ? "bg-burgundy border-burgundy text-ivory"
                                : "border-ivory/20 hover:bg-ivory hover:text-obsidian"
                            }`}
                        >
                            {justAdded === p.id ? (
                            <><Check className="w-4 h-4" /> Added</>
                            ) : (
                            <><ShoppingBag className="w-4 h-4" /> Add to Cart</>
                            )}
                        </button>
                        </div>
                    </div>
                </Reveal>
                );
            })}
            </div>
        )}

        {toast && <Toast message={toast} />}
        </main>
    );
}