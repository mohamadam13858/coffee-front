"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Order, OrderStatus } from "@/components/features/orders/types/order.type";

const priceFormatter = new Intl.NumberFormat("fa-IR");
const dateFormatter = new Intl.DateTimeFormat("fa-IR", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
});

const STATUS_LABEL: Record<OrderStatus, string> = {
    pending: "در سبد",
    preparing: "در حال آماده‌سازی",
    ready: "آماده‌ی تحویل",
    delivered: "تحویل داده‌شده",
    cancelled: "لغو شده",
};

const STATUS_COLOR: Record<OrderStatus, string> = {
    pending: "text-neutral-400",
    preparing: "text-amber-400",
    ready: "text-amber-400",
    delivered: "text-emerald-400",
    cancelled: "text-red-400",
};

export function OrderHistory({ orders }: { orders: Order[] }) {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    if (orders.length === 0) {
        return (
            <p className="px-1 py-10 text-center text-sm text-neutral-500">
                هنوز سفارشی ثبت نکرده‌اید
            </p>
        );
    }

    return (
        <div className="space-y-2">
            {orders.map((order) => {
                const isExpanded = expandedId === order.id;
                const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

                return (
                    <div
                        key={order.id}
                        className="overflow-hidden rounded-2xl border border-neutral-800/70 bg-neutral-950/40"
                    >
                        <button
                            type="button"
                            onClick={() => setExpandedId(isExpanded ? null : order.id)}
                            className="flex w-full items-center justify-between px-4 py-3 text-right"
                        >
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-xs ${STATUS_COLOR[order.status]}`}>
                                        {STATUS_LABEL[order.status]}
                                    </span>
                                    <span className="text-[11px] text-neutral-600">
                                        {dateFormatter.format(new Date(order.createdAt))}
                                    </span>
                                </div>
                                <p className="mt-1 text-sm text-white">
                                    {itemCount} آیتم · {priceFormatter.format(order.finalAmount)} تومان
                                </p>
                            </div>
                            <ChevronDown
                                className={`h-4 w-4 text-neutral-500 transition-transform ${
                                    isExpanded ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        {isExpanded ? (
                            <div className="space-y-1.5 border-t border-neutral-800/70 px-4 py-3">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between text-xs">
                                        <span className="text-neutral-400">
                                            {item.product.name} × {item.quantity}
                                        </span>
                                        <span className="text-neutral-500">
                                            {priceFormatter.format(item.totalPrice)} تومان
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : null}
                    </div>
                );
            })}
        </div>
    );
}