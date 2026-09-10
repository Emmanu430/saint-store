    export default function ShopLoading() {
    return (
        <main className="pt-28 pb-24 px-[6vw] bg-obsidian text-ivory min-h-screen">
        <div className="border-b border-ivory/10 pb-10 mb-8">
            <div className="h-3 w-32 bg-ivory/10 rounded mb-3 animate-pulse" />
            <div className="h-10 w-64 bg-ivory/10 rounded mb-3 animate-pulse" />
            <div className="h-4 w-80 bg-ivory/10 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {Array(6).fill(0).map((_, i) => (
            <div key={i}>
                <div className="aspect-4/5 bg-charcoal border border-ivory/10 animate-pulse" />
                <div className="h-4 w-32 bg-ivory/10 rounded mt-4 animate-pulse" />
                <div className="h-3 w-24 bg-ivory/10 rounded mt-2 animate-pulse" />
            </div>
            ))}
        </div>
        </main>
    );
}