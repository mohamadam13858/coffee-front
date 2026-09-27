import type { Product } from "../types/menu.type";

const priceFormatter = new Intl.NumberFormat("fa-IR");

export function ProductCard({ product }: { product: Product }) {
    const hasDiscount =
        product.discountPrice !== null && product.discountPrice < product.price;

    return (
        <div
            className={`
                flex flex-col overflow-hidden rounded-2xl border border-neutral-800/70 bg-neutral-950/40
                ${product.isAvailable ? "" : "opacity-50"}
            `}
        >
            <div className="flex h-28 items-center justify-center bg-neutral-900/60 text-xs text-neutral-600">
                {product.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    "بدون تصویر"
                )}
            </div>

            <div className="flex flex-1 flex-col gap-1 p-3">
                <p className="text-sm font-medium text-white">{product.name}</p>

                {product.description ? (
                    <p className="line-clamp-2 text-xs text-neutral-500">
                        {product.description}
                    </p>
                ) : null}

                <div className="mt-auto flex items-baseline gap-2 pt-2">
                    {hasDiscount ? (
                        <>
                            <span className="text-sm font-bold text-amber-400">
                                {priceFormatter.format(product.discountPrice as number)}
                            </span>
                            <span className="text-xs text-neutral-600 line-through">
                                {priceFormatter.format(product.price)}
                            </span>
                        </>
                    ) : (
                        <span className="text-sm font-bold text-white">
                            {priceFormatter.format(product.price)}
                        </span>
                    )}
                    <span className="text-[10px] text-neutral-500">تومان</span>
                </div>

                {!product.isAvailable ? (
                    <span className="mt-1 text-[11px] text-red-400">ناموجود</span>
                ) : null}
            </div>
        </div>
    );
}