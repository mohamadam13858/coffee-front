import { requireUser } from "@/components/features/auth/server/session";
import { getMyOrders } from "@/components/features/profile/server/profile";
import { ProfileCard } from "./profile-card";
import { StatsRow } from "./stats-row";
import { OrderHistory } from "./order-history";

export async function ProfileContent() {
    const [user, { orders, total }] = await Promise.all([
        requireUser(),
        getMyOrders(),
    ]);

    return (
        <div className="space-y-6">
            <ProfileCard user={user} />
            <StatsRow orders={orders} total={total} />
            <div>
                <h2 className="mb-3 text-sm font-medium text-neutral-400">
                    تاریخچه‌ی سفارش‌ها
                </h2>
                <OrderHistory orders={orders} />
            </div>
        </div>
    );
}