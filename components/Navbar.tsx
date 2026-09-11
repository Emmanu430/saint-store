    "use client";
    import { useState, useEffect } from "react";
    import Link from "next/link";
    import { usePathname } from "next/navigation";
    import { useSession, signOut } from "next-auth/react";
    import { Menu, X } from "lucide-react";

    export default function Navbar() {
    const { data: session, status } = useSession();
    const [cartCount, setCartCount] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

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

    const switchLink = pathname === "/cart"
        ? { href: "/shop", label: "Shop" }
        : { href: "/cart", label: `Cart (${cartCount})` };

    return (
        <>
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[6vw] py-5 bg-gradient-to-b from-obsidian to-transparent">
            <Link href="/" className="font-display text-2xl">SAINT</Link>

            {!session && (
            <ul className="hidden md:flex gap-8 text-xs tracking-widest uppercase text-ivory-dim">
                <li><Link href="/shop" className="hover:text-ivory">Shop</Link></li>
                <li><Link href="/#philosophy" className="hover:text-ivory">Philosophy</Link></li>
                <li><Link href="/#collection" className="hover:text-ivory">Collection</Link></li>
                <li><Link href="/#manifesto" className="hover:text-ivory">Manifesto</Link></li>
            </ul>
            )}

            <div className="hidden md:flex items-center gap-5 text-xs tracking-widest uppercase text-ivory-dim">
            {status === "loading" ? null : session ? (
                <>
                <span className="text-ivory">
                    Hi, {session.user?.name?.split(" ")[0]}
                </span>
                <button onClick={() => signOut({ callbackUrl: "/" })} className="hover:text-ivory cursor-pointer">
                    Sign Out
                </button>
                <Link href={switchLink.href} className="hover:text-ivory">{switchLink.label}</Link>
                </>
            ) : (
                <>
                <Link href="/login" className="hover:text-ivory">Sign In</Link>
                <Link href="/cart" className="hover:text-ivory">Cart ({cartCount})</Link>
                </>
            )}
            </div>

            {session ? (
            <div className="md:hidden flex items-center gap-4 text-[11px] tracking-widest uppercase text-ivory-dim">
                <Link href={switchLink.href} className="hover:text-ivory">{switchLink.label}</Link>
                <button onClick={() => signOut({ callbackUrl: "/" })} className="hover:text-ivory cursor-pointer">
                Out
                </button>
            </div>
            ) : (
            <button
                onClick={() => setMenuOpen(true)}
                className="md:hidden text-ivory cursor-pointer"
                aria-label="Open menu"
            >
                <Menu className="w-6 h-6" />
            </button>
            )}
        </nav>

        {menuOpen && (
            <div className="fixed inset-0 z-70 bg-obsidian flex flex-col items-center justify-center gap-2 md:hidden">
            <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-5 right-[6vw] text-ivory cursor-pointer hover:rotate-90 transition-transform duration-300"
                aria-label="Close menu"
            >
                <X className="w-7 h-7" />
            </button>

            <div className="flex flex-col items-center gap-1">
                {[
                { href: "/shop", label: "Shop" },
                { href: "/#philosophy", label: "Philosophy" },
                { href: "/#collection", label: "Collection" },
                { href: "/#manifesto", label: "Manifesto" },
                { href: "/cart", label: `Cart (${cartCount})` },
                ].map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="group relative font-display text-4xl py-3 text-ivory-dim hover:text-ivory transition-colors duration-300"
                >
                    {link.label}
                    <span className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 w-0 h-0.5 bg-burgundy-bright group-hover:w-full transition-all duration-300" />
                </Link>
                ))}
            </div>

            <div className="w-16 h-px bg-ivory/15 my-6" />

            <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="text-xs tracking-[0.2em] uppercase border border-ivory/25 px-6 py-3 hover:bg-ivory hover:text-obsidian transition-colors duration-300"
            >
                Sign In
            </Link>
            </div>
        )}
        </>
    );
}