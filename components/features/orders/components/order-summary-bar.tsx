import Link from "next/link";
import type { Order } from "../types/order.type";

const priceFormatter = new Intl.NumberFormat("fa-IR");

export function OrderSummaryBar({ order }: { order: Order }) {
    const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

    if (itemCount === 0) {
        return null;
    }

    return (
        <Link
            href="/order"
            className="sticky bottom-4 mt-4 flex items-center justify-between rounded-2xl border border-amber-500/30 bg-neutral-950/95 px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur transition-colors hover:border-amber-500/60"
        >
            <span className="text-sm text-neutral-300">{itemCount} آیتم در سفارش</span>
            <span className="text-sm font-bold text-amber-400">
                {priceFormatter.format(order.finalAmount)} تومان
            </span>
        </Link>
    );
}