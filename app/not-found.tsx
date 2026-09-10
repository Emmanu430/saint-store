    import Link from "next/link";

    export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center text-center px-[6vw] bg-obsidian text-ivory">
        <span className="font-display text-3xl text-burgundy-bright mb-2">404</span>
        <h1 className="text-2xl font-bold mb-3">This page doesn&apos;t exist.</h1>
        <p className="text-ivory-dim text-sm mb-8 max-w-sm">
            The motion never ends, but this page apparently did.
        </p>
        <Link
            href="/shop"
            className="text-xs tracking-[0.2em] uppercase border border-ivory/25 px-6 py-3 hover:bg-ivory hover:text-obsidian transition-colors duration-300"
        >
            Back to Shop
        </Link>
        </main>
    );
}