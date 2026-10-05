"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { confirmCurrentOrder } from "../actions/order-items";
import type { Order } from "../types/order.type";
import { OrderItemRow } from "./order-item-row";

const priceFormatter = new Intl.NumberFormat("fa-IR");

export function OrderCart({ order }: { order: Order }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const onConfirm = () => {
        startTransition(async () => {
            const result = await confirmCurrentOrder();

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            toast.success("سفارش شما ثبت و برای آشپزخانه ارسال شد");
            router.refresh();
        });
    };

    return (
        <div className="space-y-4">
            <div className="space-y-3">
                {order.items.map((item) => (
                    <OrderItemRow key={item.id} item={item} />
                ))}
            </div>

            <div className="flex items-center justify-between border-t border-neutral-800/70 pt-4">
                <span className="text-sm text-neutral-400">جمع کل</span>
                <span className="text-lg font-bold text-amber-400">
                    {priceFormatter.format(order.finalAmount)} تومان
                </span>
            </div>

            <button
                type="button"
                onClick={onConfirm}
                disabled={isPending || order.items.length === 0}
                className="w-full rounded-2xl bg-amber-500 py-3 text-sm font-medium text-neutral-950 transition-colors hover:bg-amber-400 disabled:opacity-60"
            >
                {isPending ? "در حال ثبت..." : "تایید نهایی و ارسال سفارش"}
            </button>
        </div>
    );
}