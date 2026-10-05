"use client";

import { useMemo, useState } from "react";
import { ChevronRight, LayoutGrid } from "lucide-react";
import type { Category, Product } from "../types/menu.type";
import { ProductCard } from "./product-card";
import { ProductDetailSheet } from "./product-detail-sheet";

export function CategoryBrowser({
    categories,
    products,
}: {
    categories: Category[];
    products: Product[];
}) {
    const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const activeCategory = useMemo(
        () => categories.find((category) => category.id === activeCategoryId) ?? null,
        [categories, activeCategoryId],
    );

    const visibleProducts = useMemo(() => {
        if (!activeCategoryId) {
            return [];
        }
        return products.filter((product) => product.categoryId === activeCategoryId);
    }, [products, activeCategoryId]);

    if (categories.length === 0) {
        return (
            <p className="px-1 py-10 text-center text-sm text-neutral-500">
                هنوز دسته‌بندی‌ای ثبت نشده است
            </p>
        );
    }

    if (!activeCategory) {
        return (
            <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => {
                    const itemCount = products.filter(
                        (product) => product.categoryId === category.id,
                    ).length;

                    return (
                        <button
                            key={category.id}
                            type="button"
                            onClick={() => setActiveCategoryId(category.id)}
                            className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-neutral-800/70 bg-neutral-950/40 px-3 py-8 text-center transition-colors hover:border-amber-500/40 hover:bg-amber-500/5"
                        >
                            <LayoutGrid className="h-6 w-6 text-amber-400" />
                            <span className="text-sm font-medium text-white">
                                {category.name}
                            </span>
                            <span className="text-[11px] text-neutral-500">
                                {itemCount} آیتم
                            </span>
                        </button>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <button
                type="button"
                onClick={() => setActiveCategoryId(null)}
                className="flex items-center gap-1 text-sm text-neutral-400 transition-colors hover:text-white"
            >
                <ChevronRight className="h-4 w-4" />
                بازگشت به دسته‌بندی‌ها
            </button>

            <p className="text-base font-bold text-white">{activeCategory.name}</p>

            {visibleProducts.length === 0 ? (
                <p className="px-1 py-10 text-center text-sm text-neutral-500">
                    محصولی در این دسته‌بندی نیست
                </p>
            ) : (
                <div className="grid grid-cols-2 gap-3">
                    {visibleProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onClick={() => setSelectedProduct(product)}
                        />
                    ))}
                </div>
            )}

            {selectedProduct ? (
                <ProductDetailSheet
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            ) : null}
        </div>
    );
}