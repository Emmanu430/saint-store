    "use client";
    import { useState } from "react";
    import { ShoppingBag, Minus, Plus, X, Landmark } from "lucide-react";
    import Image from "next/image";
    import Toast from "@/components/Toast";
    import BankTransferModal from "@/components/BankTransferModal";

    type CartItem = {
    id: number;
    quantity: number;
    size: string;
    color: string;
    product: { id: number; name: string; detail: string; price: number; image: string | null; colors: string[] };
    };

    const WHATSAPP_NUMBER = "2348148096799"; // no + or leading 0

    const BANK = {
    bank: "FIRST BANK PLC",
    accountName: "OYEBAMI HARMONY AYOMIKUN",
    accountNumber: "3061547806",
    };

    const SUPPORT_LABEL = "+234 814 809 6799";
    const SUPPORT_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi SAINT, I have a question before I pay."
    )}`;

    function formatNaira(amount: number) {
    return amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    export default function CartClient({ initialItems }: { initialItems: CartItem[] }) {
    const [items, setItems] = useState(initialItems);
    const [toast, setToast] = useState("");
    const [bankOpen, setBankOpen] = useState(false);
    const [reference, setReference] = useState("");

    const showToast = (msg: string, ms = 2500) => {
        setToast(msg);
        setTimeout(() => setToast(""), ms);
    };

    const updateQty = async (id: number, delta: number) => {
        const item = items.find((i) => i.id === id);
        if (!item) return;
        const newQty = Math.max(1, item.quantity + delta);

        const res = await fetch(`/api/cart/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQty }),
        });
        if (!res.ok) {
        showToast("Couldn't update quantity");
        return;
        }

        setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: newQty } : i)));
        window.dispatchEvent(new Event("cart-updated"));
    };

    const removeItem = async (id: number) => {
        const res = await fetch(`/api/cart/${id}`, { method: "DELETE" });
        if (!res.ok) {
        showToast("Couldn't remove item");
        return;
        }
        setItems((prev) => prev.filter((i) => i.id !== id));
        window.dispatchEvent(new Event("cart-updated"));
    };

    const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

    const orderLines = () =>
        items.map((i) => {
        const opts = [i.color, i.size].filter(Boolean).join(", ");
        return `• ${i.product.name}${opts ? ` (${opts})` : ""} x${i.quantity} — ₦${formatNaira(i.product.price * i.quantity)}`;
        });

    const handleCheckout = () => {
        const message = [
        "Hi SAINT, I'd like to order:",
        "",
        ...orderLines(),
        "",
        `Total: ₦${formatNaira(total)}`,
        ].join("\n");

        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
        showToast("Order sent — confirm with SAINT on WhatsApp to complete your purchase", 4000);
    };

    const openTransfer = () => {
        setReference(`SAINT-${Math.random().toString(36).slice(2, 6).toUpperCase()}`);
        setBankOpen(true);
    };

    const handleTransferPaid = () => {
        const message = [
        "Hi SAINT, I've paid by bank transfer.",
        `Reference: ${reference}`,
        "",
        ...orderLines(),
        "",
        `Total paid: ₦${formatNaira(total)}`,
        "",
        "Sending my receipt now.",
        ].join("\n");

        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
        setBankOpen(false);
        showToast("Send your receipt in the WhatsApp chat so SAINT can confirm", 4000);
    };

    return (
        <main className="min-h-screen bg-obsidian text-ivory px-[6vw] pt-28 pb-24">
        <h1 className="font-display text-4xl sm:text-5xl mb-10">Your Cart</h1>

        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-14 max-w-5xl">
            <div>
            {items.length === 0 && (
                <div className="flex flex-col items-center text-center py-20">
                <div className="w-14 h-14 rounded-full border border-ivory/15 flex items-center justify-center mb-5">
                    <ShoppingBag className="w-6 h-6 text-ivory-dim" />
                </div>
                <p className="text-ivory font-semibold mb-1">Your cart is empty</p>
                <p className="text-ivory-dim text-sm mb-6">Looks like you haven&apos;t added anything yet.</p>
                <a
                    href="/shop"
                    className="text-xs tracking-[0.2em] uppercase border border-ivory/25 px-6 py-3 hover:bg-ivory hover:text-obsidian transition-colors duration-300"
                >
                    Browse the Collection
                </a>
                </div>
            )}

            {items.map((item) => (
                <div key={item.id} className="flex gap-5 py-6 border-b border-ivory/10">
                <div className="w-22.5 h-27.5 bg-charcoal shrink-0 relative overflow-hidden">
                    {item.product.image && (
                    <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        sizes="90px"
                        className="object-cover"
                    />
                    )}
                </div>
                <div className="flex-1">
                    <b className="block text-sm">{item.product.name}</b>
                    <span className="block text-[11px] text-ivory-dim/70 mt-0.5">
                    {[item.color, item.size].filter(Boolean).join(" · ")}
                    </span>

                    <div className="flex items-center gap-3 mt-3">
                    <button
                        onClick={() => updateQty(item.id, -1)}
                        className="w-6.5 h-6.5 border border-ivory/25 flex items-center justify-center cursor-pointer"
                    >
                        <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm w-5 text-center">{item.quantity}</span>
                    <button
                        onClick={() => updateQty(item.id, 1)}
                        className="w-6.5 h-6.5 border border-ivory/25 flex items-center justify-center cursor-pointer"
                    >
                        <Plus className="w-3 h-3" />
                    </button>
                    </div>

                    <button
                    onClick={() => removeItem(item.id)}
                    className="flex items-center gap-1 text-[11px] text-gunmetal underline mt-3 cursor-pointer"
                    >
                    <X className="w-3 h-3" /> Remove
                    </button>
                </div>
                <div className="text-sm font-bold">₦{formatNaira(item.product.price * item.quantity)}</div>
                </div>
            ))}
            </div>

            <div className="bg-charcoal border border-ivory/10 p-7 h-fit">
            <h2 className="text-xs tracking-widest uppercase text-ivory-dim mb-5">Order Summary</h2>
            <div className="flex justify-between border-t border-ivory/15 pt-4 mt-4 text-base font-bold">
                <span>Total</span>
                <span>₦{formatNaira(total)}</span>
            </div>

            <button
                disabled={items.length === 0}
                onClick={handleCheckout}
                className="w-full mt-6 bg-burgundy hover:bg-burgundy-bright disabled:opacity-40 disabled:cursor-not-allowed transition-colors py-4 text-xs tracking-widest uppercase font-bold cursor-pointer"
            >
                Checkout via WhatsApp
            </button>

            <button
                disabled={items.length === 0}
                onClick={openTransfer}
                className="w-full mt-3 flex items-center justify-center gap-2 border border-ivory/25 hover:bg-ivory hover:text-obsidian disabled:opacity-40 disabled:cursor-not-allowed transition-colors py-4 text-xs tracking-widest uppercase font-bold cursor-pointer"
            >
                <Landmark className="w-4 h-4" /> Pay by transfer
            </button>

            <p className="text-[11px] text-gunmetal text-center mt-3">
                You&apos;ll confirm your order and payment directly with SAINT on WhatsApp.
            </p>
            </div>
        </div>

        <BankTransferModal
            open={bankOpen}
            onClose={() => setBankOpen(false)}
            amountLabel={formatNaira(total)}
            reference={reference}
            bank={BANK}
            onConfirm={handleTransferPaid}
            supportUrl={SUPPORT_URL}
            supportLabel={SUPPORT_LABEL}
        />

        {toast && <Toast message={toast} />}
        </main>
    );
}