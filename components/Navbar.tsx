    "use client";
    import { useState, useEffect } from "react";
    import Link from "next/link";
    import { usePathname } from "next/navigation";
    import { useSession, signOut } from "next-auth/react";
    import { Menu, X, ShoppingBag, LogOut, LogIn, ArrowUpRight, Mail } from "lucide-react";
    import { FaTiktok, FaWhatsapp } from "react-icons/fa6";
    import Stars from "@/components/Stars";

    const linkCls =
    "relative hover:text-ivory after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-burgundy-bright after:transition-all after:duration-300 hover:after:w-full";

    const menuLinks = [
    { href: "/shop", label: "Shop" },
    { href: "/#philosophy", label: "Philosophy" },
    { href: "/#collection", label: "Collection" },
    { href: "/#lookbook", label: "Lookbook" },
    { href: "/#manifesto", label: "Manifesto" },
    ];

    function CartIcon({ count }: { count: number }) {
    return (
        <span className="relative inline-flex">
        <ShoppingBag className="w-5 h-5" />
        {count > 0 && (
            <span
            key={count}
            className="absolute -top-2 -right-2.5 min-w-4 h-4 px-1 rounded-full bg-burgundy-bright text-ivory text-[10px] leading-4 text-center tracking-normal animate-bump"
            >
            {count}
            </span>
        )}
        </span>
    );
    }

    export default function Navbar() {
    const { data: session, status } = useSession();
    const [cartCount, setCartCount] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
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

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMenuOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
        };
    }, [menuOpen]);

    const firstName = session?.user?.name?.split(" ")[0];
    const onCartPage = pathname === "/cart";

    const switchNode = onCartPage ? (
        <Link href="/shop" className={linkCls}>Shop</Link>
    ) : (
        <Link href="/cart" aria-label={`Cart, ${cartCount} items`} className="hover:text-ivory">
        <CartIcon count={cartCount} />
        </Link>
    );

    const reveal = (delay: number) => ({
        style: { transitionDelay: menuOpen ? `${delay}ms` : "0ms" },
        className: `transition-all duration-500 ${
        menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`,
    });

    return (
        <>
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[6vw] py-5 bg-linear-to-b from-obsidian to-transparent">
            <div
            aria-hidden
            className={`absolute inset-0 -z-10 bg-obsidian/85 backdrop-blur-md border-b border-ivory/10 transition-opacity duration-300 ${
                scrolled ? "opacity-100" : "opacity-0"
            }`}
            />
            <Stars count={26} seed={3} className="-z-10 fade-down" />
            <Link href="/" className="font-display text-2xl">SAINT</Link>

            {!session && (
            <ul className="hidden md:flex gap-8 text-xs tracking-widest uppercase text-ivory-dim">
                {menuLinks.map((l) => (
                <li key={l.href}><Link href={l.href} className={linkCls}>{l.label}</Link></li>
                ))}
            </ul>
            )}

            <div className="hidden md:flex items-center gap-5 text-xs tracking-widest uppercase text-ivory-dim">
            {status === "loading" ? null : session ? (
                <>
                <span className="flex items-baseline gap-2">
                    <span className="text-ivory-dim">Hi,</span>
                    <span className="font-marker text-lg normal-case tracking-normal text-ivory">
                    {firstName}
                    </span>
                </span>
                <button onClick={() => signOut({ callbackUrl: "/" })} className={`${linkCls} cursor-pointer`}>
                    Sign Out
                </button>
                {switchNode}
                </>
            ) : (
                <>
                <Link href="/login" className={linkCls}>Sign In</Link>
                <Link href="/cart" aria-label={`Cart, ${cartCount} items`} className="hover:text-ivory">
                    <CartIcon count={cartCount} />
                </Link>
                </>
            )}
            </div>

            {session ? (
            <div className="md:hidden flex items-center gap-4 text-[11px] tracking-widest uppercase text-ivory-dim">
                <span className="flex items-baseline gap-1.5 min-w-0">
                <span>Hi,</span>
                <span className="font-marker text-base normal-case tracking-normal text-ivory truncate max-w-26">
                    {firstName}
                </span>
                </span>
                {switchNode}
                <button
                onClick={() => signOut({ callbackUrl: "/" })}
                aria-label="Sign out"
                className="hover:text-ivory cursor-pointer"
                >
                <LogOut className="w-4 h-4" />
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

        {/* mobile menu (guests) */}
        <div
            aria-hidden={!menuOpen}
            inert={!menuOpen}
            className={`fixed inset-0 z-70 bg-obsidian md:hidden overflow-hidden transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
            <Stars count={45} seed={11} className="opacity-80" />
            <div className="absolute -bottom-24 -right-24 h-80 w-80 bg-[radial-gradient(closest-side,rgba(138,26,34,0.5),transparent)]" />

            <div className="relative z-10 flex h-full flex-col px-[8vw] pt-5 pb-8">
            <div className="flex items-center justify-between">
                <span className="font-display text-2xl">SAINT</span>
                <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="text-ivory cursor-pointer hover:rotate-90 transition-transform duration-300"
                >
                <X className="w-7 h-7" />
                </button>
            </div>

            <div role="navigation" aria-label="Mobile menu" className="flex flex-1 flex-col justify-center">
                {menuLinks.map((link, i) => {
                const r = reveal(120 + i * 70);
                return (
                    <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={r.style}
                    className={`group flex items-center gap-4 py-3 border-b border-ivory/10 ${r.className}`}
                    >
                    <span className="text-[11px] tracking-widest text-burgundy-bright">0{i + 1}</span>
                    <span className="font-display text-4xl text-ivory-dim group-hover:text-ivory group-active:text-ivory transition-colors">
                        {link.label}
                    </span>
                    <ArrowUpRight className="ml-auto w-5 h-5 text-ivory-dim opacity-40 group-hover:opacity-100 group-hover:text-burgundy-bright transition-all" />
                    </Link>
                );
                })}
            </div>

            <div {...reveal(520)}>
                <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-burgundy hover:bg-burgundy-bright transition-colors py-4 text-xs tracking-[0.2em] uppercase font-bold"
                >
                <LogIn className="w-4 h-4" /> Sign in / Sign up
                </Link>

                <div className="mt-6 flex items-center justify-between text-ivory-dim">
                <div className="flex items-center gap-5">
                    <a href="mailto:saxntcoulture@gmail.com" aria-label="Email" className="hover:text-ivory transition-colors">
                    <Mail className="w-5 h-5" />
                    </a>
                    <a
                    href="https://www.tiktok.com/@saxnt_coulture01"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="hover:text-ivory transition-colors"
                    >
                    <FaTiktok className="w-5 h-5" />
                    </a>
                    <a
                    href="https://wa.me/2348101719250?text=Hi,+I+have+a+question+about+SAINT"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="hover:text-ivory transition-colors"
                    >
                    <FaWhatsapp className="w-5 h-5" />
                    </a>
                </div>
                <span className="text-[10px] tracking-[0.2em] text-gunmetal">EST. 2026</span>
                </div>
            </div>
            </div>
        </div>
        </>
    );
}