export function ProfileContentFallback() {
    return (
        <div className="space-y-6">
            <div className="h-28 animate-pulse rounded-3xl bg-white/[0.04]" />
            <div className="grid grid-cols-2 gap-3">
                <div className="h-20 animate-pulse rounded-2xl bg-white/[0.04]" />
                <div className="h-20 animate-pulse rounded-2xl bg-white/[0.04]" />
            </div>
            <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="h-16 animate-pulse rounded-2xl bg-white/[0.04]" />
                ))}
            </div>
        </div>
    );
}