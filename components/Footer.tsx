    "use client";
    import { usePathname } from "next/navigation";
    export default function Footer() {
        const pathname = usePathname();
        if (pathname === "/login" || pathname === "/cart") return null;
    return (
        <footer className="flex flex-wrap justify-between items-center gap-5 px-[6vw] py-10 border-t border-ivory/10 text-ivory">
        <span className="font-display text-xl">SAINT</span>
        <ul className="flex gap-6 text-xs text-ivory-dim">
            <li><a href="mailto:saxntcoulture@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-ivory">Mail</a></li>
            <li><a  href="https://www.tiktok.com/@saxnt_coulture01?_r=1&_t=ZS-99O9hQEk5Qt" target="_blank" rel="noopener noreferrer" className="hover:text-ivory">TikTok</a></li>
            <li><a href="https://wa.me/2348101719250?text=Hi,+I+have+a+question+about+SAINT" target="_blank" rel="noopener noreferrer" className="hover:text-ivory">Contact</a></li>
            <li><a href="https://wa.me/2348148096799?text=Hi,+I+have+a+question+about+SAINT" target="_blank" rel="noopener noreferrer" className="hover:text-ivory">Contact (Co-founder)</a></li>
        </ul>
        <span className="text-xs tracking-widest text-gunmetal">
            EST. 2026 — THE MOTION NEVER ENDS
        </span>
        </footer>
    );
}