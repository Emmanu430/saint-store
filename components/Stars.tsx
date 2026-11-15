    type Props = { count?: number; seed?: number; className?: string };

    // seeded random, so server and browser generate identical stars
    function rng(seed: number) {
    let a = seed;
    return () => {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    }

    export default function Stars({ count = 30, seed = 1, className = "" }: Props) {
    const rand = rng(seed);
    const stars = Array.from({ length: count }, () => ({
        left: rand() * 100,
        top: rand() * 100,
        size: Math.round((1.5 + rand() * 1.8) * 10) / 10,
        dur: 2.5 + rand() * 4,
        delay: -rand() * 6,
        glow: rand() > 0.8,
    }));

    return (
        <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
        {stars.map((s, i) => (
            <span
            key={i}
            className="absolute rounded-full bg-ivory animate-twinkle"
            style={{
                left: `${s.left.toFixed(2)}%`,
                top: `${s.top.toFixed(2)}%`,
                width: s.size,
                height: s.size,
                animationDuration: `${s.dur.toFixed(2)}s`,
                animationDelay: `${s.delay.toFixed(2)}s`,
                boxShadow: s.glow ? "0 0 6px 1px rgba(242,237,228,0.5)" : undefined,
            }}
            />
        ))}
        </div>
    );
}