"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Minus, Plus, Trash2 } from "lucide-react";
import { removeOrderItem, updateOrderItemQuantity } from "../actions/order-items";
import type { OrderItem } from "../types/order.type";

const priceFormatter = new Intl.NumberFormat("fa-IR");

export function OrderItemRow({ item }: { item: OrderItem }) {
    const [isPending, startTransition] = useTransition();
    const [quantity, setQuantity] = useState(item.quantity);

    const onRemove = () => {
        startTransition(async () => {
            const result = await removeOrderItem(item.id);
            if (!result.success) {
                toast.error(result.message);
            }
        });
    };

    const changeQuantity = (next: number) => {
        if (next < 1) {
            onRemove();
            return;
        }

        const previous = quantity;
        setQuantity(next);

        startTransition(async () => {
            const result = await updateOrderItemQuantity(item.id, next);
            if (!result.success) {
                toast.error(result.message);
                setQuantity(previous);
            }
        });
    };

    return (
        <div className="flex items-center gap-3 rounded-2xl border border-neutral-800/70 bg-neutral-950/40 p-3">
            <div className="flex-1">
                <p className="text-sm font-medium text-white">{item.product.name}</p>
                <p className="mt-0.5 text-xs text-neutral-500">
                    {priceFormatter.format(item.unitPrice)} تومان
                </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-neutral-800 px-1.5 py-1">
                <button
                    type="button"
                    onClick={() => changeQuantity(quantity - 1)}
                    disabled={isPending}
                    className="flex h-6 w-6 items-center justify-center rounded-full text-neutral-300 disabled:opacity-40"
                >
                    <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-5 text-center text-sm text-white">{quantity}</span>
                <button
                    type="button"
                    onClick={() => changeQuantity(quantity + 1)}
                    disabled={isPending}
                    className="flex h-6 w-6 items-center justify-center rounded-full text-neutral-300 disabled:opacity-40"
                >
                    <Plus className="h-3.5 w-3.5" />
                </button>
            </div>

            <button
                type="button"
                onClick={onRemove}
                disabled={isPending}
                className="text-neutral-600 transition-colors hover:text-red-400 disabled:opacity-40"
                aria-label="حذف"
            >
                <Trash2 className="h-4 w-4" />
            </button>
        </div>
    );
}