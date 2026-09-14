export function HomeContentFallback() {
    return (
        <div className="space-y-6">
            <div className="h-16 animate-pulse rounded-2xl bg-white/[0.04]" />
            <div className="h-8 w-48 animate-pulse rounded-lg bg-white/[0.04]" />
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div
                        key={index}
                        className="h-24 animate-pulse rounded-2xl bg-white/[0.04]"
                    />
                ))}
            </div>
        </div>
    );
}
