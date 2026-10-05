import { redirect } from "next/navigation";
import { getSelectedTable } from "@/components/features/tables/server/tables";
import { getCategories, getProducts } from "@/components/features/menu/server/menu";
import { getCurrentOrder } from "@/components/features/orders/server/orders";
import { OrderSummaryBar } from "@/components/features/orders/components/order-summary-bar";
import { CategoryBrowser } from "./category-browser";

export async function MenuContent() {
    const [selectedTable, categories, products, currentOrder] = await Promise.all([
        getSelectedTable(),
        getCategories(),
        getProducts(),
        getCurrentOrder(),
    ]);

    if (!selectedTable) {
        redirect("/");
    }

    if (selectedTable.hasActiveOrder) {
        redirect("/order");
    }

    return (
        <div className="space-y-5">
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
                میز {selectedTable.number}
            </div>

            <CategoryBrowser categories={categories} products={products} />

            {currentOrder ? <OrderSummaryBar order={currentOrder} /> : null}
        </div>
    );
}