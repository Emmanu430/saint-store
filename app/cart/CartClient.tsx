    "use client";
    import { useState } from "react";
    import { Minus, Plus, X } from "lucide-react";

    type CartItem = {
    id: number;
    quantity: number;
    product: { id: number; name: string; detail: string; price: number };
    };

    export default function CartClient({ initialItems }: { initialItems: CartItem[] }) {
    const [items, setItems] = useState(initialItems);

    const updateQty = async (id: number, delta: number) => {
        const item = items.find((i) => i.id === id);
        if (!item) return;
        const newQty = Math.max(1, item.quantity + delta);

        setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: newQty } : i)));

        await fetch(`/api/cart/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQty }),
        });
        window.dispatchEvent(new Event("cart-updated"));
    };

    const removeItem = async (id: number) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
        await fetch(`/api/cart/${id}`, { method: "DELETE" });
        window.dispatchEvent(new Event("cart-updated"));
    };

    const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    const shipping = items.length ? 8 : 0;
    const total = subtotal + shipping;

    return (
        <main className="min-h-screen bg-obsidian text-ivory px-[6vw] pt-28 pb-24">
        <h1 className="font-display text-4xl sm:text-5xl mb-10">Your Cart</h1>

        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-14 max-w-5xl">
            <div>
            {items.length === 0 && (
                <p className="text-gunmetal text-sm py-10">
                Your cart is empty. <a href="/shop" className="text-ivory-dim underline">Go shop →</a>
                </p>
            )}

            {items.map((item) => (
                <div key={item.id} className="flex gap-5 py-6 border-b border-ivory/10">
                <div className="w-[90px] h-[110px] bg-charcoal flex-shrink-0" />
                <div className="flex-1">
                    <b className="block text-sm">{item.product.name}</b>
                    <span className="block text-xs text-ivory-dim mt-1">{item.product.detail}</span>

                    <div className="flex items-center gap-3 mt-3">
                    <button onClick={() => updateQty(item.id, -1)} className="w-6.5 h-6.5 border border-ivory/25 flex items-center justify-center cursor-pointer">
                        <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm w-5 text-center">{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="w-6.5 h-6.5 border border-ivory/25 flex items-center justify-center cursor-pointer">
                        <Plus className="w-3 h-3" />
                    </button>
                    </div>

                    <button onClick={() => removeItem(item.id)} className="flex items-center gap-1 text-[11px] text-gunmetal underline mt-3 cursor-pointer">
                    <X className="w-3 h-3" /> Remove
                    </button>
                </div>
                <div className="text-sm font-bold">${(item.product.price * item.quantity).toFixed(2)}</div>
                </div>
            ))}
            </div>

            <div className="bg-charcoal border border-ivory/10 p-7 h-fit">
            <h2 className="text-xs tracking-widest uppercase text-ivory-dim mb-5">Order Summary</h2>
            <div className="flex justify-between text-sm text-ivory-dim mb-3"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-sm text-ivory-dim mb-3"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
            <div className="flex justify-between border-t border-ivory/15 pt-4 mt-4 text-base font-bold"><span>Total</span><span>${total.toFixed(2)}</span></div>
            <button disabled={items.length === 0} className="w-full mt-6 bg-burgundy hover:bg-burgundy-bright disabled:opacity-40 disabled:cursor-not-allowed transition-colors py-4 text-xs tracking-widest uppercase font-bold cursor-pointer">
                Checkout
            </button>
            </div>
        </div>
        </main>
    );
}