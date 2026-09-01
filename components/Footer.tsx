    "use client";
    import { usePathname } from "next/navigation";
    export default function Footer() {
        const pathname = usePathname();
        if (pathname === "/login" || pathname === "/cart") return null;
    return (
        <footer className="flex flex-wrap justify-between items-center gap-5 px-[6vw] py-10 border-t border-ivory/10 text-ivory">
        <span className="font-display text-xl">SAINT</span>
        <ul className="flex gap-6 text-xs text-ivory-dim">
            <li><a href="#" className="hover:text-ivory">Instagram</a></li>
            <li><a href="#" className="hover:text-ivory">TikTok</a></li>
            <li><a href="#" className="hover:text-ivory">Contact</a></li>
        </ul>
        <span className="text-xs tracking-widest text-gunmetal">
            EST. 2026 — THE MOTION NEVER ENDS
        </span>
        </footer>
    );
}