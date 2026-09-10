    export default function CartLoading() {
    return (
        <main className="min-h-screen bg-obsidian text-ivory px-[6vw] pt-28 pb-24">
        <div className="h-10 w-48 bg-ivory/10 rounded mb-10 animate-pulse" />

        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-14 max-w-5xl">
            <div>
            {Array(2).fill(0).map((_, i) => (
                <div key={i} className="flex gap-5 py-6 border-b border-ivory/10">
                <div className="w-22.5 h-27.5 bg-charcoal animate-pulse shrink-0" />
                <div className="flex-1">
                    <div className="h-4 w-40 bg-ivory/10 rounded mb-2 animate-pulse" />
                    <div className="h-3 w-28 bg-ivory/10 rounded mb-4 animate-pulse" />
                    <div className="h-6 w-24 bg-ivory/10 rounded animate-pulse" />
                </div>
                </div>
            ))}
            </div>

            <div className="bg-charcoal border border-ivory/10 p-7 h-fit">
            <div className="h-3 w-28 bg-ivory/10 rounded mb-5 animate-pulse" />
            <div className="h-4 w-full bg-ivory/10 rounded mb-3 animate-pulse" />
            <div className="h-4 w-full bg-ivory/10 rounded mb-3 animate-pulse" />
            <div className="h-6 w-full bg-ivory/10 rounded mb-6 animate-pulse" />
            <div className="h-12 w-full bg-ivory/10 rounded animate-pulse" />
            </div>
        </div>
        </main>
    );
}