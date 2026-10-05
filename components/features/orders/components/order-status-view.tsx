import type { Order } from "../types/order.type";

const priceFormatter = new Intl.NumberFormat("fa-IR");

const STATUS_LABEL: Record<string, string> = {
    preparing: "در حال آماده‌سازی",
    ready: "آماده‌ی تحویل",
};

export function OrderStatusView({ order }: { order: Order }) {
    return (
        <div className="space-y-4">
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-4 text-center">
                <p className="text-sm text-amber-300">
                    {STATUS_LABEL[order.status] ?? order.status}
                </p>
            </div>

            <div className="space-y-2">
                {order.items.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between rounded-2xl border border-neutral-800/70 bg-neutral-950/40 px-4 py-3"
                    >
                        <span className="text-sm text-white">
                            {item.product.name} × {item.quantity}
                        </span>
                        <span className="text-sm text-neutral-400">
                            {priceFormatter.format(item.totalPrice)} تومان
                        </span>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between border-t border-neutral-800/70 pt-4">
                <span className="text-sm text-neutral-400">جمع کل</span>
                <span className="text-lg font-bold text-amber-400">
                    {priceFormatter.format(order.finalAmount)} تومان
                </span>
            </div>
        </div>
    );
}