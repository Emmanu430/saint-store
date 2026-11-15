    const crosses = [
    { left: "6%", size: 12, dur: 19, delay: -4, o: 0.16 },
    { left: "20%", size: 18, dur: 26, delay: -15, o: 0.12 },
    { left: "34%", size: 10, dur: 22, delay: -9, o: 0.18 },
    { left: "52%", size: 16, dur: 30, delay: -21, o: 0.1 },
    { left: "66%", size: 12, dur: 20, delay: -2, o: 0.16 },
    { left: "80%", size: 20, dur: 27, delay: -12, o: 0.11 },
    { left: "93%", size: 11, dur: 24, delay: -18, o: 0.15 },
    ];

    export function DriftingCrosses() {
    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {crosses.map((c, i) => (
            <svg
            key={i}
            viewBox="-8 -8 16 20"
            width={c.size}
            height={c.size * 1.25}
            className="absolute -bottom-6 animate-rise"
            style={{ left: c.left, animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s` }}
            >
            <path d="M-1 -7h2v5h5v2h-5v9h-2v-9h-5v-2h5z" fill="#f2ede4" fillOpacity={c.o} />
            </svg>
        ))}
        </div>
    );
    }

    export function BurgundyGlow() {
    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-16 top-1/4 h-64 w-64 md:h-96 md:w-96 animate-glow-a bg-[radial-gradient(closest-side,rgba(138,26,34,0.6),rgba(138,26,34,0.22)_55%,transparent)]" />
        <div className="absolute -right-16 bottom-0 h-56 w-56 md:h-80 md:w-80 animate-glow-b bg-[radial-gradient(closest-side,rgba(138,26,34,0.5),rgba(138,26,34,0.18)_55%,transparent)]" />
        </div>
    );
}