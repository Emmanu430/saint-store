    "use client";
    import { useEffect, useState } from "react";
    import { X, Copy, Check } from "lucide-react";
    import { FaWhatsapp } from "react-icons/fa6";

    type Props = {
    open: boolean;
    onClose: () => void;
    amountLabel: string;
    reference: string;
    bank: { bank: string; accountName: string; accountNumber: string };
    onConfirm: () => void;
    supportUrl: string;
    supportLabel: string;
    };

    function Row({
    label,
    value,
    big = false,
    copyable = true,
    }: {
    label: string;
    value: string;
    big?: boolean;
    copyable?: boolean;
    }) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
        } catch {
        /* clipboard blocked, the text is still selectable */
        }
    };

    return (
        <div className="flex items-center justify-between gap-3 border-b border-ivory/10 py-3">
        <div className="min-w-0">
            <span className="block text-[10px] tracking-widest uppercase text-ivory-dim">{label}</span>
            <span className={`block truncate ${big ? "text-xl font-bold tracking-wider" : "text-sm"}`}>
            {value}
            </span>
        </div>
        {copyable && (
            <button
            type="button"
            onClick={copy}
            aria-label={`Copy ${label}`}
            className="shrink-0 text-ivory-dim hover:text-ivory cursor-pointer"
            >
            {copied ? <Check className="w-4 h-4 text-ivory" /> : <Copy className="w-4 h-4" />}
            </button>
        )}
        </div>
    );
    }

    export default function BankTransferModal({
    open,
    onClose,
    amountLabel,
    reference,
    bank,
    onConfirm,
    supportUrl,
    supportLabel,
    }: Props) {
    useEffect(() => {
        if (!open) return;
        document.body.style.overflow = "hidden";
        const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
        className="fixed inset-0 z-80 flex items-center justify-center bg-obsidian/90 px-[6vw] animate-fade-in"
        onClick={onClose}
        >
        <div
            role="dialog"
            aria-modal="true"
            aria-label="Pay by bank transfer"
            className="relative w-full max-w-sm max-h-[90vh] overflow-y-auto bg-charcoal border border-ivory/10 p-7 animate-lightbox"
            onClick={(e) => e.stopPropagation()}
        >
            <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 text-ivory-dim hover:text-ivory hover:rotate-90 transition-all duration-300 cursor-pointer"
            >
            <X className="w-5 h-5" />
            </button>

            <h2 className="font-display text-2xl">Pay by transfer</h2>
            <p className="text-ivory-dim text-xs mt-1">
            Send the exact amount, then confirm on WhatsApp.
            </p>

            <div className="mt-5 text-3xl font-bold">₦{amountLabel}</div>

            <div className="mt-3">
            <Row label="Bank" value={bank.bank} copyable={false} />
            <Row label="Account name" value={bank.accountName} copyable={false} />
            <Row label="Account number" value={bank.accountNumber} big />
            <Row label="Reference (put in narration)" value={reference} />
            </div>
            <p className="mt-4 border-l-2 border-burgundy-bright pl-3 text-[11px] leading-relaxed text-ivory-dim">
                This account is registered to a SAINT founder. Have a question before you pay?{" "}
                <a
                    href={supportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ivory underline underline-offset-2 hover:text-burgundy-bright"
                >
                    Message us on WhatsApp ({supportLabel})
                </a>
            </p>

            <ol className="mt-5 space-y-1.5 text-xs text-ivory-dim list-decimal list-inside">
            <li>Transfer the exact amount above.</li>
            <li>Add the reference in the transfer description.</li>
            <li>Tap below and attach your receipt screenshot in the chat.</li>
            </ol>

            <button
            onClick={onConfirm}
            className="mt-6 w-full flex items-center justify-center gap-2 bg-burgundy hover:bg-burgundy-bright transition-colors py-4 text-xs tracking-widest uppercase font-bold cursor-pointer"
            >
            <FaWhatsapp className="w-4 h-4" /> I&apos;ve paid, send receipt
            </button>
        </div>
        </div>
    );
}