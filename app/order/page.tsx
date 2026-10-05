import { Suspense } from "react";
import { OrderContent } from "@/components/features/orders/components/order-content";
import { OrderContentFallback } from "@/components/features/orders/components/order-content-fallback";
import { OrderShell } from "@/components/features/orders/components/order-shell";

export default function OrderPage() {
    return (
        <OrderShell>
            <Suspense fallback={<OrderContentFallback />}>
                <OrderContent />
            </Suspense>
        </OrderShell>
    );
}