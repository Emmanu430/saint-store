    "use client";
    import { useState, useEffect } from "react";
    import Link from "next/link";
    import { useSession, signOut } from "next-auth/react";

    export default function Navbar() {
    const { data: session, status } = useSession();
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        if (!session) {
        setCartCount(0);
        return;
        }
    const fetchCount = () => {
        fetch("/api/cart/count")
        .then((res) => res.json())
        .then((data) => setCartCount(data.count))
        .catch(() => setCartCount(0));
    };

    fetchCount();
    window.addEventListener("cart-updated", fetchCount);
    return () => window.removeEventListener("cart-updated", fetchCount);
    }, [session]);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[6vw] py-5 bg-gradient-to-b from-obsidian to-transparent">
        <Link href="/" className="font-display text-2xl">SAINT</Link>
        <ul className="hidden md:flex gap-8 text-xs tracking-widest uppercase text-ivory-dim">
            <li><Link href="/shop" className="hover:text-ivory">Shop</Link></li>
            <li><Link href="/#philosophy" className="hover:text-ivory">Philosophy</Link></li>
            <li><Link href="/#manifesto" className="hover:text-ivory">Manifesto</Link></li>
        </ul>
        <div className="flex items-center gap-5 text-xs tracking-widest uppercase text-ivory-dim">
            {status === "loading" ? null : session ? (
            <>
                <span className="text-ivory hidden sm:inline">
                Hi, {session.user?.name?.split(" ")[0]}
                </span>
                <button onClick={() => signOut({ callbackUrl: "/" })} className="hover:text-ivory">
                Sign Out
                </button>
            </>
            ) : (
            <Link href="/login" className="hover:text-ivory">Sign In</Link>
            )}
            <Link href="/cart" className="hover:text-ivory">Cart ({cartCount})</Link>
        </div>
        </nav>
    );
}