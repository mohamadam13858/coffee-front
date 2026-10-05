import type { Order } from "@/components/features/orders/types/order.type";

const priceFormatter = new Intl.NumberFormat("fa-IR");

export function StatsRow({ orders, total }: { orders: Order[]; total: number }) {
    const totalSpent = orders
        .filter((order) => order.status !== "cancelled")
        .reduce((sum, order) => sum + order.finalAmount, 0);

    return (
        <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-neutral-800/70 bg-neutral-950/40 p-4">
                <p className="text-2xl font-bold text-white">{total}</p>
                <p className="mt-1 text-xs text-neutral-500">تعداد سفارش‌ها</p>
            </div>
            <div className="rounded-2xl border border-neutral-800/70 bg-neutral-950/40 p-4">
                <p className="text-lg font-bold text-amber-400">
                    {priceFormatter.format(totalSpent)}
                </p>
                <p className="mt-1 text-xs text-neutral-500">تومان خرج‌شده</p>
            </div>
        </div>
    );
}