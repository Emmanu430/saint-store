    "use client";
    import { useState, useEffect } from "react";
    import Image from "next/image";
    import { X, ChevronLeft, ChevronRight } from "lucide-react";

    const images = [
    { src: "/lookbook/img1.jpg", span: "md:row-span-3" },
    { src: "/lookbook/img2.jpg", span: "md:row-span-2" },
    { src: "/lookbook/img3.jpg", span: "md:row-span-2" },
    { src: "/lookbook/img4.jpg", span: "md:row-span-3" },
    { src: "/lookbook/img5.jpg", span: "md:col-span-2 md:row-span-2" },
    { src: "/lookbook/img6.jpg", span: "md:row-span-3" },
    { src: "/lookbook/img7.jpg", span: "md:row-span-2" },
    { src: "/lookbook/img8.jpg", span: "md:row-span-2" },
    { src: "/lookbook/img9.jpg", span: "md:row-span-3" },
    { src: "/lookbook/img11.jpg", span: "md:row-span-3" },
    { src: "/lookbook/img12.jpg", span: "md:row-span-3" },
    { src: "/lookbook/img13.jpg", span: "md:row-span-3" },
    { src: "/lookbook/img14.jpg", span: "md:row-span-3" },
    { src: "/lookbook/img15.jpg", span: "md:row-span-3" },
    { src: "/lookbook/img10.jpg", span: "md:col-span-2 md:row-span-3" },
];

    export default function LookboxClient() {
    const [active, setActive] = useState<number | null>(null);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
        if (active === null) return;
        if (e.key === "Escape") setActive(null);
        if (e.key === "ArrowRight") setActive((a) => (a! + 1) % images.length);
        if (e.key === "ArrowLeft") setActive((a) => (a! - 1 + images.length) % images.length);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [active]);

    useEffect(() => {
        document.body.style.overflow = active !== null ? "hidden" : "";
        return () => {
        document.body.style.overflow = "";
        };
    }, [active]);

    return (
        <>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 auto-rows-45 md:auto-rows-42.5 grid-flow-dense">  
                {images.map((item, i) => (
            <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative overflow-hidden bg-charcoal cursor-pointer ${item.span}`}
            >
                <Image
                src={item.src}
                alt="SAINT lookbook"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                />
            </button>
            ))}
        </div>

        {active !== null && (
            <div
            className="fixed inset-0 z-100 bg-obsidian/95 flex items-center justify-center px-[6vw]"
            onClick={() => setActive(null)}
            >
            <button
                onClick={() => setActive(null)}
                className="absolute top-6 right-[6vw] text-ivory hover:rotate-90 transition-transform duration-300 cursor-pointer"
            >
                <X className="w-7 h-7" />
            </button>

            <button
                onClick={(e) => { e.stopPropagation(); setActive((active - 1 + images.length) % images.length); }}
                className="absolute left-4 md:left-10 text-ivory hover:text-burgundy-bright cursor-pointer"
            >
                <ChevronLeft className="w-8 h-8" />
            </button>

            <div className="relative w-full max-w-2xl h-[80vh]" onClick={(e) => e.stopPropagation()}>
                <Image src={images[active].src} alt="SAINT lookbook" fill className="object-contain" />
            </div>

            <button
                onClick={(e) => { e.stopPropagation(); setActive((active + 1) % images.length); }}
                className="absolute right-4 md:right-10 text-ivory hover:text-burgundy-bright cursor-pointer"
            >
                <ChevronRight className="w-8 h-8" />
            </button>
            </div>
        )}
        </>
    );
}