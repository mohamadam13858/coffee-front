export function OrderContentFallback() {
    return (
        <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-16 animate-pulse rounded-2xl bg-white/[0.04]" />
            ))}
        </div>
    );
}