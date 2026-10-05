import "server-only";

import { cache } from "react";
import { getAuthCookieHeader } from "@/lib/http/auth-cookies";
import type { Category, Product } from "../types/menu.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

function toNumber(value: unknown): number | null {
    if (typeof value === "number" && !Number.isNaN(value)) {
        return value;
    }
    if (typeof value === "string" && value.trim() !== "") {
        const parsed = Number(value);
        return Number.isNaN(parsed) ? null : parsed;
    }
    return null;
}

function resolveImageUrl(imageUrl: unknown): string | null {
    if (typeof imageUrl !== "string" || imageUrl.trim() === "") {
        return null;
    }
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
        return imageUrl;
    }
    return `${API_URL}${imageUrl}`;
}

function toCategory(value: unknown): Category | null {
    if (!value || typeof value !== "object") {
        return null;
    }

    const category = value as Record<string, unknown>;

    if (typeof category.id !== "string" || typeof category.name !== "string") {
        return null;
    }

    return {
        id: category.id,
        name: category.name,
        description:
            typeof category.description === "string" ? category.description : null,
        imageUrl: resolveImageUrl(category.imageUrl),
        orderIndex: toNumber(category.orderIndex) ?? 0,
    };
}

function toProduct(value: unknown): Product | null {
    if (!value || typeof value !== "object") {
        return null;
    }

    const product = value as Record<string, unknown>;
    const price = toNumber(product.price);

    if (
        typeof product.id !== "string" ||
        typeof product.name !== "string" ||
        typeof product.categoryId !== "string" ||
        price === null
    ) {
        return null;
    }

    return {
        id: product.id,
        name: product.name,
        description:
            typeof product.description === "string" ? product.description : null,
        price,
        discountPrice: toNumber(product.discountPrice),
        isAvailable: product.isAvailable !== false,
        isActive: product.isActive !== false,
        stock: toNumber(product.stock) ?? 0,
        imageUrl: resolveImageUrl(product.imageUrl),
        categoryId: product.categoryId,
    };
}

export const getCategories = cache(async (): Promise<Category[]> => {
    const cookieHeader = await getAuthCookieHeader();

    if (!cookieHeader) {
        return [];
    }

    try {
        const response = await fetch(`${API_URL}/menu/categories`, {
            headers: { Cookie: cookieHeader, Accept: "application/json" },
            cache: "no-store",
        });

        if (!response.ok) {
            return [];
        }

        const payload: unknown = await response.json();
        const rows = Array.isArray(payload) ? payload : [];

        return rows
            .map(toCategory)
            .filter((category): category is Category => category !== null)
            .sort((a, b) => a.orderIndex - b.orderIndex);
    } catch {
        return [];
    }
});

export const getProducts = cache(async (): Promise<Product[]> => {
    const cookieHeader = await getAuthCookieHeader();

    if (!cookieHeader) {
        return [];
    }

    try {
        const response = await fetch(`${API_URL}/menu/products?limit=100`, {
            headers: { Cookie: cookieHeader, Accept: "application/json" },
            cache: "no-store",
        });

        if (!response.ok) {
            return [];
        }

        const payload: unknown = await response.json();
        const data = (payload as { data?: unknown })?.data;
        const rows = Array.isArray(data) ? data : [];

        return rows
            .map(toProduct)
            .filter((product): product is Product => product !== null)
            .filter((product) => product.isActive);
    } catch {
        return [];
    }
});