    "use client";
    import { usePathname } from "next/navigation";
    import Stars from "@/components/Stars";
    import { Mail } from "lucide-react";
import { FaTiktok, FaWhatsapp } from "react-icons/fa6";

const iconLink = "inline-flex items-center gap-2 hover:text-ivory transition-colors";

    export default function Footer() {
    const pathname = usePathname();
    if (pathname === "/login" || pathname === "/cart") return null;

    return (
        <footer className="relative isolate overflow-hidden flex flex-wrap justify-between items-center gap-5 px-[6vw] py-10 border-t border-ivory/10 text-ivory">
        <Stars count={34} seed={7} className="-z-10 fade-up" />
        <span className="font-display text-xl">SAINT</span>
        <ul className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-ivory-dim">
            <li>
                <a href="mailto:saxntcoulture@gmail.com" className={iconLink}>
                <Mail className="w-4 h-4" /> Mail
                </a>
            </li>
            <li>
                <a href="https://www.tiktok.com/@saxnt_coulture01" target="_blank" rel="noopener noreferrer" className={iconLink}>
                <FaTiktok className="w-3.5 h-3.5" /> TikTok
                </a>
            </li>
            <li>
                <a href="https://wa.me/2348101719250?text=Hi,+I+have+a+question+about+SAINT" target="_blank" rel="noopener noreferrer" className={iconLink}>
                <FaWhatsapp className="w-4 h-4" /> Contact
                </a>
            </li>
            <li>
                <a href="https://wa.me/2348148096799?text=Hi,+I+have+a+question+about+SAINT" target="_blank" rel="noopener noreferrer" className={iconLink}>
                <FaWhatsapp className="w-4 h-4" /> Contact (Co-founder)
                </a>
            </li>
            </ul>
        <span className="text-xs tracking-widest text-gunmetal">
            EST. 2026 — THE MOTION NEVER ENDS
        </span>
        </footer>
    );
}