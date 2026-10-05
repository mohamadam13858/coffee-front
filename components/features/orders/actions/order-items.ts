"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getAuthCookieHeader } from "@/lib/http/auth-cookies";
import { ORDER_ID_COOKIE } from "../constants";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type OrderActionResult =
    | { success: true }
    | { success: false; message: string };

async function getOrderContext() {
    const cookieHeader = await getAuthCookieHeader();
    const cookieStore = await cookies();
    const orderId = cookieStore.get(ORDER_ID_COOKIE)?.value;
    return { cookieHeader, orderId };
}

async function extractErrorMessage(response: Response, fallback: string): Promise<string> {
    try {
        const body = await response.json();
        if (Array.isArray(body?.message)) {
            return body.message.join("، ");
        }
        if (typeof body?.message === "string") {
            return body.message;
        }
    } catch {
     
    }
    return fallback;
}

export async function updateOrderItemQuantity(
    itemId: string,
    quantity: number,
): Promise<OrderActionResult> {
    const { cookieHeader, orderId } = await getOrderContext();

    if (!cookieHeader || !orderId || !API_URL) {
        return { success: false, message: "سفارشی یافت نشد" };
    }

    try {
        const response = await fetch(`${API_URL}/orders/${orderId}/items/${itemId}`, {
            method: "PATCH",
            headers: { Cookie: cookieHeader, "Content-Type": "application/json" },
            body: JSON.stringify({ quantity }),
        });

        if (!response.ok) {
            return { success: false, message: await extractErrorMessage(response, "به‌روزرسانی انجام نشد") };
        }
    } catch {
        return { success: false, message: "ارتباط با سرور برقرار نشد" };
    }

    revalidatePath("/order");
    return { success: true };
}

export async function removeOrderItem(itemId: string): Promise<OrderActionResult> {
    const { cookieHeader, orderId } = await getOrderContext();

    if (!cookieHeader || !orderId || !API_URL) {
        return { success: false, message: "سفارشی یافت نشد" };
    }

    try {
        const response = await fetch(`${API_URL}/orders/${orderId}/items/${itemId}`, {
            method: "DELETE",
            headers: { Cookie: cookieHeader },
        });

        if (!response.ok) {
            return { success: false, message: await extractErrorMessage(response, "حذف انجام نشد") };
        }
    } catch {
        return { success: false, message: "ارتباط با سرور برقرار نشد" };
    }

    revalidatePath("/order");
    return { success: true };
}

export async function confirmCurrentOrder(): Promise<OrderActionResult> {
    const { cookieHeader, orderId } = await getOrderContext();

    if (!cookieHeader || !orderId || !API_URL) {
        return { success: false, message: "سفارشی یافت نشد" };
    }

    try {
        const response = await fetch(`${API_URL}/orders/${orderId}/confirm`, {
            method: "POST",
            headers: { Cookie: cookieHeader },
        });

        if (!response.ok) {
            return { success: false, message: await extractErrorMessage(response, "تایید سفارش انجام نشد") };
        }
    } catch {
        return { success: false, message: "ارتباط با سرور برقرار نشد" };
    }

    revalidatePath("/order");
    revalidatePath("/menu");
    return { success: true };
}