import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { getAuthCookieHeader } from "@/lib/http/auth-cookies";
import { ORDER_ID_COOKIE } from "../constants";
import type { Order, OrderStatus } from "../types/order.type";
import { ORDER_STATUSES } from "../types/order.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
}


const ACTIVE_STATUSES: OrderStatus[] = ["pending", "preparing", "ready"];

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
        items,
    };
}

export const getCurrentOrder = cache(async (): Promise<Order | null> => {
    const cookieStore = await cookies();
    const orderId = cookieStore.get(ORDER_ID_COOKIE)?.value;

    if (!orderId) {
        return null;
    }

    const cookieHeader = await getAuthCookieHeader();

    if (!cookieHeader) {
        return null;
    }

    try {
        const response = await fetch(`${API_URL}/orders/${orderId}`, {
            headers: { Cookie: cookieHeader, Accept: "application/json" },
            cache: "no-store",
        });

        if (!response.ok) {
            return null;
        }

        const payload: unknown = await response.json();
        const order = toOrder(payload);

        if (!order || !ACTIVE_STATUSES.includes(order.status)) {
            return null;
        }

        return order;
    } catch {
        return null;
    }
});