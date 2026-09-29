    "use client";
    import { useState } from "react";

    export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        });
        setLoading(false);
        setSent(true);
    };

    return (
        <main className="min-h-screen flex items-center justify-center px-[6vw] pt-20 pb-10 bg-obsidian text-ivory">
        <div className="w-full max-w-sm bg-charcoal border border-ivory/10 p-8">
            <h1 className="font-display text-3xl text-center">SAINT</h1>
            <p className="text-center text-ivory-dim text-xs mt-2 mb-8">Reset your password</p>

            {sent ? (
            <p className="text-center text-sm text-ivory-dim">
                If an account exists for that email, a reset link has been sent. Check your inbox.
            </p>
            ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                <label className="block text-[10px] tracking-widest uppercase text-ivory-dim mb-1.5">
                    Email
                </label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full bg-obsidian border border-ivory/15 px-3.5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-bright"
                />
                </div>
                <button
                disabled={loading}
                className="mt-2 bg-burgundy hover:bg-burgundy-bright disabled:opacity-50 transition-colors py-3.5 text-xs tracking-widest uppercase font-bold"
                >
                {loading ? "Sending..." : "Send Reset Link"}
                </button>
            </form>
            )}
        </div>
        </main>
    );
}