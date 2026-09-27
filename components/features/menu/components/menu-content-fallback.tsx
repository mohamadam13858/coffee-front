export function MenuContentFallback() {
    return (
        <div className="space-y-4">
            <div className="h-10 animate-pulse rounded-2xl bg-white/[0.04]" />
            <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="h-9 w-20 shrink-0 animate-pulse rounded-full bg-white/[0.04]"
                    />
                ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="h-44 animate-pulse rounded-2xl bg-white/[0.04]"
                    />
                ))}
            </div>
        </div>
    );
}