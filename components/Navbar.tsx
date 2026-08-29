    import Link from "next/link";

    export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[6vw] py-5 bg-gradient-to-b from-obsidian to-transparent">
        <Link href="/" className="font-display text-2xl">SAINT</Link>
        <ul className="hidden md:flex gap-8 text-xs tracking-widest uppercase text-ivory-dim">
            <li><Link href="/shop" className="hover:text-ivory">Shop</Link></li>
            <li><Link href="/#philosophy" className="hover:text-ivory">Philosophy</Link></li>
            <li><Link href="/#manifesto" className="hover:text-ivory">Manifesto</Link></li>
        </ul>
        <div className="flex gap-5 text-xs tracking-widest uppercase text-ivory-dim">
            <Link href="/login" className="hover:text-ivory">Sign In</Link>
            <Link href="/cart" className="hover:text-ivory">Cart (0)</Link>
        </div>
        </nav>
    );
}