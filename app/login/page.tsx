    "use client";
    import { useState } from "react";

    export default function Login() {
    const [mode, setMode] = useState<"signin" | "signup">("signin");

    return (
        <main className="min-h-screen flex items-center justify-center px-[6vw] py-24 bg-obsidian text-ivory">
        <div className="w-full max-w-sm bg-charcoal border border-ivory/10 p-11">
            <div className="w-9 h-4.5 border-3 border-ivory rounded-full mx-auto mb-5" />
            <h1 className="font-display text-3xl text-center">SAINT</h1>
            <p className="text-center text-ivory-dim text-xs mt-2 mb-8">
            The motion never ends.
            </p>

            <div className="flex border border-ivory/15 mb-7">
            <button
                onClick={() => setMode("signin")}
                className={`flex-1 py-3 text-xs tracking-widest uppercase font-semibold ${
                mode === "signin" ? "bg-ivory text-obsidian" : "text-ivory-dim"
                }`}
            >
                Sign In
            </button>
            <button
                onClick={() => setMode("signup")}
                className={`flex-1 py-3 text-xs tracking-widest uppercase font-semibold ${
                mode === "signup" ? "bg-ivory text-obsidian" : "text-ivory-dim"
                }`}
            >
                Sign Up
            </button>
            </div>

            {mode === "signin" ? (
            <form className="flex flex-col gap-4">
                <Field label="Email" type="email" placeholder="you@email.com" />
                <Field label="Password" type="password" placeholder="••••••••" />
                <button className="mt-2 bg-burgundy hover:bg-burgundy-bright transition-colors py-3.5 text-xs tracking-widest uppercase font-bold">
                Sign In
                </button>
            </form>
            ) : (
            <form className="flex flex-col gap-4">
                <Field label="Full Name" type="text" placeholder="Your name" />
                <Field label="Email" type="email" placeholder="you@email.com" />
                <Field label="Password" type="password" placeholder="••••••••" />
                <button className="mt-2 bg-burgundy hover:bg-burgundy-bright transition-colors py-3.5 text-xs tracking-widest uppercase font-bold">
                Create Account
                </button>
            </form>
            )}

            <p className="text-center text-xs text-gunmetal mt-5">
            By continuing you agree to SAINT&apos;s Terms and Privacy Policy.
            </p>
        </div>
        </main>
    );
    }

    function Field({ label, type, placeholder }: { label: string; type: string; placeholder: string }) {
    return (
        <div>
        <label className="block text-[10px] tracking-widest uppercase text-ivory-dim mb-1.5">
            {label}
        </label>
        <input
            type={type}
            placeholder={placeholder}
            className="w-full bg-obsidian border border-ivory/15 px-3.5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-bright"
        />
        </div>
    );
}