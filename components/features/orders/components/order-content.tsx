import Link from "next/link";
import { getCurrentOrder } from "@/components/features/orders/server/orders";
import { OrderCart } from "./order-cart";
import { OrderStatusView } from "./order-status-view";

export async function OrderContent() {
    const order = await getCurrentOrder();

    if (!order) {
        return (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-neutral-800/70 bg-neutral-950/40 px-6 py-16 text-center">
                <p className="text-sm text-neutral-400">هنوز سفارشی ثبت نکرده‌اید</p>
                <Link
                    href="/menu"
                    className="rounded-2xl bg-amber-500 px-5 py-2.5 text-sm font-medium text-neutral-950 transition-colors hover:bg-amber-400"
                >
                    رفتن به منو
                </Link>
            </div>
        );
    }

    if (order.status === "pending") {
        return <OrderCart order={order} />;
    }

    return <OrderStatusView order={order} />;
}