import "server-only";

import { cache } from "react";
import { getAuthCookieHeader } from "@/lib/http/auth-cookies";
import type { Order, OrderStatus } from "@/components/features/orders/types/order.type";
import { ORDER_STATUSES } from "@/components/features/orders/types/order.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

function toNumber(value: unknown): number {
    if (typeof value === "number" && !Number.isNaN(value)) {
        return value;
    }
    if (typeof value === "string") {
        const parsed = Number(value);
        if (!Number.isNaN(parsed)) {
            return parsed;
        }
    }
    return 0;
}

function isOrderStatus(value: unknown): value is OrderStatus {
    return typeof value === "string" && ORDER_STATUSES.includes(value as OrderStatus);
}

function toOrder(value: unknown): Order | null {
    if (!value || typeof value !== "object") {
        return null;
    }

    const raw = value as Record<string, unknown>;

    if (typeof raw.id !== "string") {
        return null;
    }

    const itemsRaw = Array.isArray(raw.items) ? raw.items : [];

    const items = itemsRaw
        .map((item) => {
            if (!item || typeof item !== "object") {
                return null;
            }
            const row = item as Record<string, unknown>;
            const product = row.product as Record<string, unknown> | undefined;

            if (typeof row.id !== "string" || !product || typeof product.id !== "string") {
                return null;
            }

            return {
                id: row.id,
                quantity: toNumber(row.quantity),
                unitPrice: toNumber(row.unitPrice),
                totalPrice: toNumber(row.totalPrice),
                product: {
                    id: product.id,
                    name: typeof product.name === "string" ? product.name : "",
                    imageUrl: typeof product.imageUrl === "string" ? product.imageUrl : null,
                },
            };
        })
        .filter((item): item is Order["items"][number] => item !== null);

    return {
        id: raw.id,
        status: isOrderStatus(raw.status) ? raw.status : "pending",
        totalAmount: toNumber(raw.totalAmount),
        discountAmount: toNumber(raw.discountAmount),
        finalAmount: toNumber(raw.finalAmount),
        notes: typeof raw.notes === "string" ? raw.notes : null,
        createdAt: typeof raw.createdAt === "string" ? raw.createdAt : new Date().toISOString(),
        items,
    };
}

export const getMyOrders = cache(async (): Promise<{ orders: Order[]; total: number }> => {
    const cookieHeader = await getAuthCookieHeader();

    if (!cookieHeader) {
        return { orders: [], total: 0 };
    }

    try {
        const response = await fetch(`${API_URL}/orders/my?limit=100`, {
            headers: { Cookie: cookieHeader, Accept: "application/json" },
            cache: "no-store",
        });

        if (!response.ok) {
            return { orders: [], total: 0 };
        }

        const payload: unknown = await response.json();
        const body = payload as { data?: unknown; total?: unknown };
        const rows = Array.isArray(body.data) ? body.data : [];
        const orders = rows.map(toOrder).filter((order): order is Order => order !== null);
        const total = toNumber(body.total);

        return { orders, total: total || orders.length };
    } catch {
        return { orders: [], total: 0 };
    }
});