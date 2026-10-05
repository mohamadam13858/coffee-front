"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Minus, Plus, X } from "lucide-react";
import type { Product } from "../types/menu.type";
import { addToOrder } from "@/components/features/orders/actions/add-to-order";

const priceFormatter = new Intl.NumberFormat("fa-IR");

export function ProductDetailSheet({
    product,
    onClose,
}: {
    product: Product;
    onClose: () => void;
}) {
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const [isPending, startTransition] = useTransition();

    const unitPrice =
        product.discountPrice !== null && product.discountPrice < product.price
            ? product.discountPrice
            : product.price;

    const isOrderable = product.isAvailable && product.stock > 0;

    const onAdd = () => {
        if (!isOrderable) {
            return;
        }

        startTransition(async () => {
            const result = await addToOrder(product.id, quantity);

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            toast.success(`${quantity} عدد ${product.name} به سفارش اضافه شد`);
            router.refresh();
            onClose();
        });
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center"
            onClick={onClose}
        >
            <div
                onClick={(event) => event.stopPropagation()}
                className="w-full max-w-sm rounded-t-3xl border border-neutral-800 bg-neutral-950 p-6 sm:rounded-3xl"
            >
                <div className="mb-4 flex items-start justify-between">
                    <h3 className="text-lg font-bold text-white">{product.name}</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-neutral-500 hover:text-white"
                        aria-label="بستن"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {product.imageUrl ? (
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="mb-4 h-40 w-full rounded-2xl object-cover"
                    />
                ) : null}

                {product.description ? (
                    <p className="mb-5 text-sm leading-6 text-neutral-400">
                        {product.description}
                    </p>
                ) : null}

                {!isOrderable ? (
                    <p className="mb-5 rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-400">
                        این محصول موقتاً ناموجود است
                    </p>
                ) : (
                    <div className="mb-5 flex items-center justify-between">
                        <span className="text-lg font-bold text-amber-400">
                            {priceFormatter.format(unitPrice)} تومان
                        </span>

                        <div className="flex items-center gap-3 rounded-full border border-neutral-800 px-2 py-1">
                            <button
                                type="button"
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                disabled={quantity <= 1}
                                className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-300 disabled:opacity-30"
                            >
                                <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-5 text-center text-sm text-white">
                                {quantity}
                            </span>
                            <button
                                type="button"
                                onClick={() =>
                                    setQuantity((q) => Math.min(product.stock, q + 1))
                                }
                                disabled={quantity >= product.stock}
                                className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-300 disabled:opacity-30"
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                )}

                <button
                    type="button"
                    onClick={onAdd}
                    disabled={isPending || !isOrderable}
                    className="w-full rounded-2xl bg-amber-500 py-3 text-sm font-medium text-neutral-950 transition-colors hover:bg-amber-400 disabled:opacity-60"
                >
                    {isPending ? "در حال افزودن..." : "افزودن به سفارش"}
                </button>
            </div>
        </div>
    );
}